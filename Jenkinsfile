pipeline {
    agent any

    tools {
        nodejs 'NodeJS'
    }

    stages {
        stage('Install') {
            steps {
                script{
                    echo "Installing dependencies ..."
                    sh 'npm ci'
                }
            }
        }
        stage('Test') {
            steps {
                script{
                    echo "Running Test ..."
                    sh 'npm test || true'
                }
            }
        }
        stage('Build') {
            steps {
                script{
                    echo "Building ..."
                    sh 'npm run build'
                }
            }
        }
    }
}