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

        stage('Lint') {
            steps {
                echo "Running Lint Check ..."
                sh 'npm run lint'
            }
        }

        stage('Build') {
            steps {
                echo "Building Next.js App ..."
                sh 'npm run build'
            }
        }

        stage('Generate Semantic Version') {

            when {
                expression {
                    def changedFiles = sh(
                        script: "git diff --name-only HEAD~1 HEAD",
                        returnStdout: true
                    ).trim()

                    return changedFiles.split("\n").any { file ->
                        file.startsWith("app/") ||
                        file.startsWith("src/") ||
                        file == "Dockerfile" ||
                        file == "package.json"
                    }
                }
            }

            steps {
                script {

                    // Get latest tag (if none exists start from v1.0.0)
                    def latestTag = sh(
                        script: "git describe --tags --abbrev=0 || echo v1.0.0",
                        returnStdout: true
                    ).trim()

                    echo "Latest tag: ${latestTag}"

                    def cleanVersion = latestTag.replace("v", "")
                    def parts = cleanVersion.tokenize(".")

                    def major = parts[0].toInteger()
                    def minor = parts[1].toInteger()
                    def patch = parts[2].toInteger()

                    // Get last commit message
                    def commitMsg = sh(
                        script: "git log -1 --pretty=%B",
                        returnStdout: true
                    ).trim()

                    echo "Commit message: ${commitMsg}"

                    if (commitMsg.contains("BREAKING CHANGE")) {
                        major += 1
                        minor = 0
                        patch = 0
                    } else if (commitMsg.startsWith("feat")) {
                        minor += 1
                        patch = 0
                    } else if (commitMsg.startsWith("fix")) {
                        patch += 1
                    } else {
                        patch += 1
                    }

                    env.VERSION = "v${major}.${minor}.${patch}"
                    env.IMAGE = "${REPO}:${env.VERSION}"

                    echo "New version: ${env.VERSION}"
                }
            }
        }

        stage('Build & Push Docker Image') {

            when {
                expression {
                    def changedFiles = sh(
                        script: "git diff --name-only HEAD~1 HEAD",
                        returnStdout: true
                    ).trim()

                    return changedFiles.split("\n").any { file ->
                        file.startsWith("app/") ||
                        file.startsWith("src/") ||
                        file == "Dockerfile" ||
                        file == "package.json"
                    }
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

                        def app = docker.build("${env.IMAGE}", "--build-arg MONGODB_URI=${MONGODB_URI} .")

                        app.push(env.VERSION)
                        app.push("latest")
                    }

                    echo "Docker image pushed: ${env.IMAGE}"

                    // Create and push git tag
                    sh "git tag ${env.VERSION}"
                    sh "git push origin ${env.VERSION}"
                }
            }
        }
    }
}