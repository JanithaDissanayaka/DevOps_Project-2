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
                    def previousVersion= sh(script: "git show HEAD~1:package.json | jq -r '.version'", returnStdout: true).trim()
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
    }
}