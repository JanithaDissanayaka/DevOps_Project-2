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

        stage('Checkout') {
            steps {
                checkout([
                    $class: 'GitSCM',
                    branches: [[name: '*/main']],
                    userRemoteConfigs: [[
                        url: 'https://github.com/JanithaDissanayaka/DevOps_Project-2.git',
                        credentialsId: 'github_access_key'
                    ]],
                    extensions: [
                        [$class: 'CloneOption', shallow: false, depth: 0, noTags: false]
                    ]
                ])
            }
        }

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

                    // Ensure tags are fetched
                    sh "git fetch --tags"

                    def latestTag = sh(
                        script: "git describe --tags --abbrev=0 2>/dev/null || echo v1.0.0",
                        returnStdout: true
                    ).trim()

                    echo "Latest tag: ${latestTag}"

                    def cleanVersion = latestTag.replace("v", "")
                    def parts = cleanVersion.tokenize(".")

                    def major = parts[0].toInteger()
                    def minor = parts[1].toInteger()
                    def patch = parts[2].toInteger()

                    def commitMsg = sh(
                        script: "git log -1 --pretty=%B",
                        returnStdout: true
                    ).trim()

                    echo "Commit message: ${commitMsg}"

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

                    echo "New version: ${env.VERSION}"
                }
            }
        }

        stage('Build & Push Docker Image') {
            steps {
                script {

                    docker.withRegistry('https://index.docker.io/v1/', 'docker-registry-creds') {

                        def app = docker.build(
                            "${env.IMAGE}",
                            "--build-arg MONGODB_URI=${MONGODB_URI} ."
                        )

                        app.push(env.VERSION)
                        app.push("latest")
                    }

                    withCredentials([usernamePassword(
                        credentialsId: 'github_access_key',
                        usernameVariable: 'GIT_USER',
                        passwordVariable: 'GIT_PASS'
                    )]) {

                        sh """
                            git config user.email "jenkins@local"
                            git config user.name "Jenkins CI"

                            git fetch --tags

                            if git ls-remote --tags origin | grep ${env.VERSION}; then
                                echo "Tag ${env.VERSION} already exists on remote. Skipping tag creation."
                            else
                                git tag ${env.VERSION}
                                git push https://${GIT_USER}:${GIT_PASS}@github.com/JanithaDissanayaka/DevOps_Project-2.git ${env.VERSION}
                            fi
                        """
                    }

                    echo "Docker image pushed and tag handled successfully."
                }
            }
        }
    }
}