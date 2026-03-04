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

        stage('Build Image') {
            steps { 
                script {
                    echo "Building the docker image"
                    withCredentials([usernamePassword(
                        credentialsId: 'docker-registry-creds',
                        usernameVariable: 'DOCKER_USER',
                        passwordVariable: 'DOCKER_PASS'
                    )]) {
                        sh """
                            echo $DOCKER_PASS | docker login -u $DOCKER_USER --password-stdin
                            docker build -t $REPO:carsale$VERSION --build-arg MONGODB_URI=${MONGODB_URI} .
                            
                        """
                        
                    }

                }
             }
        }
    }
}