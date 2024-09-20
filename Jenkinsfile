pipeline {
    agent any

    environment {
        DOCKER_IMAGE_BACKEND = "sdeogi/IfSae-BE"
        DOCKER_IMAGE_FRONTEND = "sdeogi/IfSae-FE"
        DOCKER_TAG = "${BUILD_NUMBER}"
        DOCKER_REGISTRY = 'https://registry.hub.docker.com'
    }

    stages {
        stage('Checkout') {
            steps {
                echo "Checking out the repository..."
                deleteDir() // Clean up workspace
                checkout([$class: 'GitSCM',
                    branches: [[name: '*/dev-cicd']],
                    userRemoteConfigs: [[url: 'https://lab.ssafy.com/s11-bigdata-recom-sub1/S11P21A508.git',
                                         credentialsId: 'jenkins-gitlab']]])
                sh 'ls -la'
                echo "Checkout completed."
            }
        }

        stage('SonarQube Analysis') {
            steps {
                echo "Running SonarQube analysis..."
                withSonarQubeEnv('SonarQube') { // SonarQube server name
                    sh './gradlew sonar'
                }
                echo "SonarQube analysis completed."
            }
        }

        stage('Prepare Environment') {
            steps {
                echo "Preparing environment..."
                withCredentials([
                    file(credentialsId: 'IfSae-back-env-file', variable: 'ENV_FILE_BACKEND'),
                    file(credentialsId: 'IfSae-front-env-file', variable: 'ENV_FILE_FRONTEND')
                ]) {
                    sh '''
                        echo "Copying and preparing .env files..."
                        mkdir -p "$WORKSPACE/back-end" "$WORKSPACE/front-end"
                        cp "$ENV_FILE_BACKEND" "$WORKSPACE/back-end/.env"
                        cp "$ENV_FILE_FRONTEND" "$WORKSPACE/front-end/.env"
                        
                        echo "Adding DOCKER_TAG to .env files..."
                        echo "DOCKER_TAG=${DOCKER_TAG}" >> "$WORKSPACE/back-end/.env"
                        echo "DOCKER_TAG=${DOCKER_TAG}" >> "$WORKSPACE/front-end/.env"
                        
                        echo "Adding DOCKER_IMAGE to .env files..."
                        echo "DOCKER_IMAGE=${DOCKER_IMAGE_BACKEND}" >> "$WORKSPACE/back-end/.env"
                        echo "DOCKER_IMAGE=${DOCKER_IMAGE_FRONTEND}" >> "$WORKSPACE/front-end/.env"
                        
                        echo "Final .env files:"
                        cat "$WORKSPACE/back-end/.env"
                        cat "$WORKSPACE/front-end/.env"
                    '''
                }
                echo "Environment preparation completed."
            }
        }

        stage('Build Docker Images') {
            parallel {
                stage('Build Backend') {
                    steps {
                        echo "Building backend Docker image..."
                        dir('back-end') {
                            sh 'docker build -t ${DOCKER_IMAGE_BACKEND}:${DOCKER_TAG} .'
                        }
                    }
                }
                stage('Build Frontend') {
                    steps {
                        echo "Building frontend Docker image..."
                        dir('front-end') {
                            sh 'docker build -t ${DOCKER_IMAGE_FRONTEND}:${DOCKER_TAG} .'
                        }
                    }
                }
            }
        }

        stage('Push Docker Images') {
            steps {
                echo "Pushing Docker images to registry..."
                script {
                    docker.withRegistry("${DOCKER_REGISTRY}", 'docker-hub-credentials') {
                        docker.image("${DOCKER_IMAGE_BACKEND}:${DOCKER_TAG}").push()
                        docker.image("${DOCKER_IMAGE_BACKEND}:latest").push()
                        docker.image("${DOCKER_IMAGE_FRONTEND}:${DOCKER_TAG}").push()
                        docker.image("${DOCKER_IMAGE_FRONTEND}:latest").push()
                    }
                }
            }
        }

        stage('Deploy to EC2') {
            steps {
                echo "Deploying to EC2..."
                sshagent(['jenkins-ssh-key']) {
                    sh """
                        ssh -o StrictHostKeyChecking=no ubuntu@j11a508.p.ssafy.io '
                        cd /home/ubuntu/
                        docker-compose down
                        docker-compose pull
                        docker-compose up -d --build
                        '
                    """
                }
                echo "Deployment completed."
            }
        }

        stage('Test') {
            steps {
                echo 'Jenkins Mattermost Connection'
            }
        }
    }

    post {
        success {
            script {
                mattermostSend(
                    color: 'good',
                    message: "빌드 성공"
                )
            }
        }
        failure {
            script {
                mattermostSend(
                    color: 'danger',
                    message: "빌드 실패"
                )
            }
        }
        always {
            echo "Cleaning workspace..."
            cleanWs()  // Clean workspace after job is done
            echo "Workspace cleaned."
        }
    }
}