pipeline {
    agent any

    tools {
        nodejs 'NodeJS'
    }

    environment {
        MONGODB_URI = credentials('MONGODB_URI')
        IMAGE = 'janithadissanayaka/learn'
        APP_NAME = 'carsale'
        VERSION = ''
    }

    stages {

        stage('Checkout') {
            steps {
                checkout scm
                sh 'git fetch --tags'
            }
        }

        stage('Install') {
            steps {
                echo "Installing dependencies ..."
                sh 'npm ci'
            }
        }

        stage('Test') {
            steps {
                echo "Running Test ..."
                sh 'npm test || true'
            }
        }

        stage('Build') {
            steps {
                echo "Building ..."
                sh 'npm run build'
            }
        }

        stage('Get Git Tag') {
            steps {
                script {
                    try {
                        VERSION = sh(
                            script: "git describe --tags --abbrev=0",
                            returnStdout: true
                        ).trim()

                        echo "Version detected: ${VERSION}"
                    } catch (err) {
                        echo "No Git tag found. Skipping Docker build."
                        VERSION = ''
                    }
                }
            }
        }

        stage('Create Docker Image') {
            when {
                expression { return env.VERSION?.trim() }
            }

            agent {
                docker {
                    image 'docker:cli'
                    args '-u root -v /var/run/docker.sock:/var/run/docker.sock'
                }
            }

            steps {
                script {
                    docker.withRegistry('https://index.docker.io/v1/', 'docker-registry-creds') {

                        def FULL_TAG = "${APP_NAME}.${VERSION}"

                        def app = docker.build(
                            "${IMAGE}:${FULL_TAG}",
                            "--build-arg MONGODB_URI=${MONGODB_URI} ."
                        )

                        app.push()
                    }
                }
            }
        }
    }
}
