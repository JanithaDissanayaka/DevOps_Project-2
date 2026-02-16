pipeline {
    agent any

    tools {
        nodejs 'NodeJS'
    }

    environment {
    MONGODB_URI = credentials('MONGODB_URI')
    IMAGE='janithadissanayaka/web-app:v1'
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

        stage('create Docker image'){
            agent {
                docker {
                    image 'docker:cli'
                    args '-u root -v /var/run/docker.sock:/var/run/docker.sock'
                }
            }            
            steps{
                script{
                    docker.withRegistry('https://index.docker.io/v1/', 'docker-registry-creds') {
                    def app = docker.build("${IMAGE}", "--build-arg MONGODB_URI=${MONGODB_URI} .")
                    app.push()                   
                }
            }
        }


    }
}
}