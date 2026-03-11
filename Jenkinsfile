pipeline {
    agent any

    tools {
        nodejs 'NodeJS'
    }

    environment {
        MONGODB_URI = credentials('MONGODB_URI')
        REPO = "janithadissanayaka/learn"
        AWS_REGION = 'ap-south-1'
        CLUSTER_NAME = 'car-sale'
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
            when {
                anyOf {
                    changeset "terraform/*.tf"
                    changeset "terraform/*.tfvars"
                    expression { currentBuild.number == 1 }
                }
            }

        agent {
                docker {
                    image 'janithadissanayaka/terraform-eks:latest'
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

        stage('deploy to eks with ansible'){
    agent {
        docker {
            image 'janithadissanayaka/ansible-k8s-aws:latest'
            args '-u root -v /var/run/docker.sock:/var/run/docker.sock'
        }
    }

    steps {
        withCredentials([
            [$class: 'AmazonWebServicesCredentialsBinding', credentialsId: 'AWS_CREDENTIALS']
        ]) {

            sh '''
                
                               # Fix ansible output plugin issue
                sed -i 's/community.general.yaml/yaml/g' ansible/ansible.cfg

                # Configure kubeconfig for EKS
                aws eks update-kubeconfig \
                    --region ap-south-1 \
                    --name car-sale \
                    --kubeconfig $WORKSPACE/kubeconfig

                export KUBECONFIG=$WORKSPACE/kubeconfig

                # Verify cluster connection
                kubectl get nodes

                # Run Ansible
                cd ansible
                ansible-playbook Deploy-cluster.yaml
            '''
        }
    }
}


    }
}


