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

        // check git vrsioning check

        stage('Install') {
            steps {
                sh 'npm ci'
            }
        }

        stage('Lint') {
            steps {
                sh 'npm run lint'
            }
        }

        stage('Build') {
            steps {
                sh 'npm run build'
            }
        }

        stage('Generate Semantic Version') {
            steps {
                script {

                    def latestTag = sh(
                        script: "git describe --tags --abbrev=0 || echo v1.0.0",
                        returnStdout: true
                    ).trim()

                    def cleanVersion = latestTag.replace("v", "")
                    def parts = cleanVersion.tokenize(".")

                    def major = parts[0].toInteger()
                    def minor = parts[1].toInteger()
                    def patch = parts[2].toInteger()

                    def commitMsg = sh(
                        script: "git log -1 --pretty=%B",
                        returnStdout: true
                    ).trim()

                    if (commitMsg.contains("BREAKING CHANGE")) {
                        major++
                        minor = 0
                        patch = 0
                    } else if (commitMsg.startsWith("feat")) {
                        minor++
                        patch = 0
                    } else {
                        patch++
                    }

                    env.VERSION = "v${major}.${minor}.${patch}"
                    env.IMAGE = "${REPO}:${env.VERSION}"
                }
            }
        }

        stage('Build & Push Docker Image') {

            agent any

            steps {
                script {

                    docker.withRegistry('https://index.docker.io/v1/', 'docker-registry-creds') {

                        def app = docker.build("${env.IMAGE}", "--build-arg MONGODB_URI=${MONGODB_URI} .")

                        app.push(env.VERSION)
                        app.push("latest")
                    }

                    sh "git tag ${env.VERSION}"
                    sh "git push origin ${env.VERSION}"
                }
            }
        }
    }
}