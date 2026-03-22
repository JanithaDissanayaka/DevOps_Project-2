pipeline {
    agent any

    tools {
        nodejs 'NodeJS'
    }

    environment {
        MONGODB_URI = credentials('MONGODB_URI')
        REPO = "your-dockerhub-username/your-repo-name"
        AWS_REGION = 'your-aws-region'
        CLUSTER_NAME = 'your-cluster-name'
    }

    stages {

        stage('Install Dependencies') {
            steps { sh 'npm install' }
        }

        stage('Run Lint') {
            steps { sh 'npm run lint' }
        }

        stage('Take the Version') {
            steps {
                script {
                    def packageJson = readJSON file: 'package.json'
                    env.VERSION = packageJson.version
                    echo "Version from package.json: ${env.VERSION}"
                }
            }
        }

        stage('Build') {
            steps { sh 'npm run build' }
        }

        stage('Archive Build') {
            steps {
                archiveArtifacts artifacts: '.next/**', fingerprint: true
            }
        }

        stage('Check Version Change') {
            steps {
                script {
                    def currentVersion = readJSON(file: 'package.json').version
                    def previousPackageJson = sh(script: "git show HEAD~1:package.json", returnStdout: true).trim()
                    def previousVersion = readJSON(text: previousPackageJson).version

                    echo "Current Version: ${currentVersion}"
                    echo "Previous Version: ${previousVersion}"

                    if (currentVersion != previousVersion) {
                        env.VERSION_CHANGED = "true"
                        env.VERSION = currentVersion
                        echo "Version has changed. Proceeding with build."
                    } else {
                        env.VERSION_CHANGED = "false"
                        echo "Version has not changed."
                    }
                }
            }
        }

        stage('Build Image') {
            when {
                anyOf {
                    expression { env.VERSION_CHANGED == "true" }
                    changeset "package.json"
                    changeset "app/**"
                    changeset "Dockerfile"
                }
            }
            steps {
                script {
                    echo "Building Docker image version ${env.VERSION}"

                    withCredentials([usernamePassword(
                        credentialsId: 'docker-registry-creds',
                        usernameVariable: 'DOCKER_USER',
                        passwordVariable: 'DOCKER_PASS'
                    )]) {

                        sh """
                            echo \$DOCKER_PASS | docker login -u \$DOCKER_USER --password-stdin

                            # 🔐 No secrets passed into image
                            docker build \
                            -t \$REPO:app-\${VERSION} .

                            docker push \$REPO:app-\${VERSION}

                            docker logout
                        """
                    }
                }
            }
        }

        stage('Update K8s files in GitOps repo') {
            when {
                anyOf {
                    expression { env.VERSION_CHANGED == "true" }
                }
            }

            steps {
                withCredentials([usernamePassword(
                    credentialsId: 'github_access_token',
                    usernameVariable: 'GITHUB_USER',
                    passwordVariable: 'GITHUB_TOKEN'
                )]) {

                    sh """
                        rm -rf gitops-repo

                        # 🔐 Safe clone (no token in URL)
                        git clone https://github.com/your-github-username/your-gitops-repo.git gitops-repo
                        cd gitops-repo

                        git config credential.helper store
                        echo "https://\$GITHUB_USER:\$GITHUB_TOKEN@github.com" > ~/.git-credentials

                        IMAGE_TAG=\${REPO}:app-\${VERSION}

                        sed -i "s|image:.*|image: \${IMAGE_TAG}|g" web.yaml

                        git config user.email "ci@example.com"
                        git config user.name "ci-bot"

                        git add web.yaml
                        git commit -m "Update image to \${IMAGE_TAG}" || echo "No changes to commit"

                        git push origin main
                    """
                }
            }
        }

        stage('Provision Infrastructure (Terraform)') {
            when {
                anyOf {
                    changeset "terraform/*.tf"
                    changeset "terraform/*.tfvars"
                    expression { currentBuild.number == 1 }
                }
            }

            agent {
                docker {
                    image 'your-dockerhub-username/terraform-eks:latest'
                    args '--entrypoint="" -u root'
                }
            }

            steps {
                withCredentials([
                    [$class: 'AmazonWebServicesCredentialsBinding', credentialsId: 'AWS_CREDENTIALS']
                ]) {

                    dir('terraform') {
                        sh '''
                            terraform init

                            # ⚠️ Auto-approve for demo (be careful in real prod)
                            terraform apply -auto-approve

                            aws eks update-kubeconfig \
                                --region $AWS_REGION \
                                --name $CLUSTER_NAME

                            kubectl get nodes
                        '''
                    }
                }
            }
        }

        stage('Deploy to EKS with Ansible') {
            agent {
                docker {
                    image 'your-dockerhub-username/ansible-k8s-aws:latest'
                    args '-u root -v /var/run/docker.sock:/var/run/docker.sock'
                }
            }

            steps {
                withCredentials([
                    [$class: 'AmazonWebServicesCredentialsBinding', credentialsId: 'AWS_CREDENTIALS']
                ]) {

                    sh '''
                        sed -i 's/community.general.yaml/yaml/g' ansible/ansible.cfg

                        aws eks update-kubeconfig \
                            --region $AWS_REGION \
                            --name $CLUSTER_NAME \
                            --kubeconfig $WORKSPACE/kubeconfig

                        export KUBECONFIG=$WORKSPACE/kubeconfig

                        cd ansible
                        ansible-playbook Deploy-cluster.yaml

                        kubectl apply -f argocd.yaml

                        kubectl get pods
                    '''
                }
            }
        }

        stage('Show Application Links') {
            agent {
                docker {
                    image 'your-dockerhub-username/terraform-eks:latest'
                    args '--entrypoint="" -u root'
                }
            }

            steps {
                withCredentials([
                    [$class: 'AmazonWebServicesCredentialsBinding', credentialsId: 'AWS_CREDENTIALS']
                ]) {
                    sh '''
                        export KUBECONFIG=$WORKSPACE/kubeconfig

                        echo "===== Application Access Links ====="

                        echo "Web App:"
                        kubectl get svc web-service -o jsonpath='{.status.loadBalancer.ingress[0].hostname}' || true
                        echo

                        echo "Mongo Express:"
                        kubectl get svc mongo-express-service -o jsonpath='{.status.loadBalancer.ingress[0].hostname}' || true
                        echo

                        echo "ArgoCD:"
                        kubectl get svc argocd-server -n argocd -o jsonpath='{.status.loadBalancer.ingress[0].hostname}' || true
                        echo

                        echo "Grafana:"
                        kubectl get svc grafana -n prometheus -o jsonpath='{.status.loadBalancer.ingress[0].hostname}' || true
                        echo

                        echo "====================================="
                    '''
                }
            }
        }
    }
}