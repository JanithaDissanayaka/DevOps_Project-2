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
                expression { env.VERSION_CHANGED == "true" }
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
    /*below code is for only try to update the k8s manifest file in the ArgoCD repo, 
    you can remove this stage if you don't want to update the manifest file in the ArgoCD repo*/
        stage('Update K8s Manifest') {
            steps {
                sh '''
                rm -rf ArgoCD

                git clone git@github.com:JanithaDissanayaka/ArgoCD.git
                cd ArgoCD

                IMAGE_TAG=${REPO}:carsale-${VERSION}

                sed -i "s|image:.*|image: ${IMAGE_TAG}|g" web.yaml

                git config user.email "jenkins@example.com"
                git config user.name "jenkins"

                git add web.yaml
                git commit -m "Update image version to ${IMAGE_TAG}" || echo "No changes to commit"

                git push origin main
                '''
            }
        }
    }
}