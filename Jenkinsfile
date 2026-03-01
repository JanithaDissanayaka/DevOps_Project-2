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

        stage('Install') {
            steps {
                echo "Installing dependencies ..."
                sh 'npm ci'
            }
        }

        stage('Test') {
            steps {
                echo "Running Test ..."
                sh 'npm test'
            }
        }

        stage('Build') {
            steps {
                echo "Building ..."
                sh 'npm run build'
            }
        }

        stage('Generate Docker Version') {

            when {
                anyOf {
                    changeset "**/src/**"
                    changeset "Dockerfile"
                    changeset "package.json"
                }
            }

            agent {
                docker {
                    image 'docker:cli'
                    args '-u root -v /var/run/docker.sock:/var/run/docker.sock'
                }
            }

            steps {
                script {

                    // Get latest git commit count (simple & reliable versioning)
                    def versionNumber = sh(
                        script: "git rev-list --count HEAD",
                        returnStdout: true
                    ).trim()

                    env.VERSION = "v${versionNumber}"
                    env.IMAGE = "${REPO}:${env.VERSION}"

                    echo "Generated Docker Version: ${env.VERSION}"
                }
            }
        }

        stage('Create Docker Image') {

            when {
                anyOf {
                    changeset "**/src/**"
                    changeset "Dockerfile"
                    changeset "package.json"
                }
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

                        def app = docker.build("${IMAGE}", "--build-arg MONGODB_URI=${MONGODB_URI} .")

                        // Push version tag (v1, v2, v3...)
                        app.push("${env.VERSION}")

                        // Push latest tag
                        app.push("latest")
                    }
                }
            }
        }
    }
}