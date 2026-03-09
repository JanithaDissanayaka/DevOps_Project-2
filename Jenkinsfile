pipeline {
    agent any

    tools {
        nodejs 'NodeJS'
    }

    environment {
        MONGODB_URI = credentials('MONGODB_URI')
        REPO = "janithadissanayaka/learn"
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

        stage('Check Version Change'){
            steps{
                script{
                    def currentVersion = readJSON(file: 'package.json').version
                    def previousPackageJson= sh(script: "git show HEAD~1:package.json", returnStdout: true).trim()
                    def previousVersion = readJSON(text: previousPackageJson).version
                    echo "Current Version: ${currentVersion}"
                    echo "Previous Version: ${previousVersion}"
                    if (currentVersion != previousVersion) {
                        env.VERSION_CHANGED = "true"
                        env.VERSION = currentVersion
                        echo "Version has changed. Proceeding with the build."
                    } else {
                        env.VERSION_CHANGED = "false"
                        echo "Version has not changed. Skipping the build."
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
                    echo "Building the docker image version ${env.VERSION}"

                    withCredentials([usernamePassword(
                        credentialsId: 'docker-registry-creds',
                        usernameVariable: 'DOCKER_USER',
                        passwordVariable: 'DOCKER_PASS'
                    )]) {

                        sh """
                            echo $DOCKER_PASS | docker login -u $DOCKER_USER --password-stdin

                            docker build \
                            -t $REPO:carsale-${VERSION} \
                            --build-arg MONGODB_URI=${MONGODB_URI} .

                            docker push $REPO:carsale-${VERSION}

                            docker logout
                        """
                    }
                }
            }
        }

        stage('Update K8s files in ArgoCD repo') {
            when {
                anyOf {
                    expression { env.VERSION_CHANGED == "true" }
                }
            }

            steps {
                withCredentials([usernamePassword(
                    credentialsId: 'github_access_key',
                    usernameVariable: 'GITHUB_USER',
                    passwordVariable: 'GITHUB_TOKEN'
                )]) {

                    sh """
                    rm -rf ArgoCD

                    git clone https://\$GITHUB_USER:\$GITHUB_TOKEN@github.com/JanithaDissanayaka/ArgoCD.git
                    cd ArgoCD

                    IMAGE_TAG=${REPO}:carsale-${VERSION}

                    sed -i "s|image:.*|image: \${IMAGE_TAG}|g" web.yaml

                    git config user.email "jenkins@example.com"
                    git config user.name "jenkins"

                    git add web.yaml
                    git commit -m "Update image version to \${IMAGE_TAG}" || echo "No changes to commit"

                    git push origin main
                    """
                }
            }
        }

        stage('Provision Server') {
    agent {
        docker {
            image 'bitnami/kubectl:latest'
            args '-u root'
        }
    }

    steps {
        withCredentials([
            [$class: 'AmazonWebServicesCredentialsBinding', credentialsId: 'AWS_CREDENTIALS']
        ]) {

            dir('Terraform') {
                sh '''
                    terraform init
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
    }
}

/* stage('Provision Server') {
            agent {
                docker {
                    image 'hashicorp/terraform:1.6'
                    args '--entrypoint="" -u root'
                }
            }
            steps {
                withCredentials([
                    [$class: 'AmazonWebServicesCredentialsBinding', credentialsId: 'AWS_CRED']
                ]) {
                    dir('Terraform') {
                        sh '''

                            # 1. Install AWS CLI and curl (needed for kubectl)
                            apk add --no-cache aws-cli curl ca-certificates openssl 
                            update-ca-certificates

                            # 2. Install kubectl manually
                            curl -LO "https://dl.k8s.io/release/$(curl -L -s https://dl.k8s.io/release/stable.txt)/bin/linux/amd64/kubectl"
                            chmod +x kubectl
                            mv kubectl /usr/local/bin/

                            # 3. Run Terraform
                            terraform init
                            terraform apply --auto-approve
                            
                            # 4. Update Kubeconfig
                            sleep 60
                            aws eks update-kubeconfig --region $AWS_REGION --name $CLUSTER_NAME --kubeconfig $WORKSPACE/kubeconfig
                            
                            # 5. Verify connectivity
                            kubectl get nodes --kubeconfig $WORKSPACE/kubeconfig
                        '''
                    }
                }
            }
        }

        stage('Deploy to EKS with Ansible') {
                    agent {
                        docker {
                            image 'docker:cli'
                            args '-u root -v /var/run/docker.sock:/var/run/docker.sock'
                        }
                    }
                    steps {
                        withCredentials([
                            usernamePassword(
                                credentialsId: 'docker-registry-creds',
                                usernameVariable: 'DOCKER_USER',
                                passwordVariable: 'DOCKER_PASS'
                            ),
                            [$class: 'AmazonWebServicesCredentialsBinding', credentialsId: 'AWS_CRED']

                        ]) {
                            sh '''
                                # 1. Install dependencies
                                apk add --no-cache python3 py3-pip curl
                                pip3 install ansible kubernetes --break-system-packages
                                apk add --no-cache python3 py3-pip curl aws-cli

                                # 2. Install kubectl
                                curl -LO "https://dl.k8s.io/release/$(curl -L -s https://dl.k8s.io/release/stable.txt)/bin/linux/amd64/kubectl"
                                install -o root -g root -m 0755 kubectl /usr/local/bin/kubectl

                                # 3. Setup Environment
                                export KUBECONFIG=$WORKSPACE/kubeconfig
                                
                                AUTH_STRING=$(echo -n "$DOCKER_USER:$DOCKER_PASS" | base64)
                                export DOCKER_CONFIG_JSON=$(echo -n '{"auths":{"https://index.docker.io/v1/":{"username":"'$DOCKER_USER'","password":"'$DOCKER_PASS'","email":"email@example.com","auth":"'$AUTH_STRING'"} }}' | base64 -w 0)

                                # --- CRITICAL FIX ---
                                # Force Ansible to use standard YAML output (bypasses the broken config plugin)
                                sed -i 's/community.general.yaml/yaml/g' Ansible/ansible.cfg
                                # --------------------

                                # 4. Run Ansible
                                export KUBECONFIG=$WORKSPACE/kubeconfig
                                cd Ansible                        
                                ansible-playbook deploy-to-eks-cluster.yaml
                            '''
                        }
                    }
                }
*/
