pipeline {
    agent any

    environment {
        DOCKER_IMAGE_BACKEND = "sdeogi/IfSae-BE"
        DOCKER_IMAGE_FRONTEND = "sdeogi/IfSae-FE"
        DOCKER_TAG = "${BUILD_NUMBER}"
        DOCKER_REGISTRY = 'https://registry.hub.docker.com'
    }

    stages {
        // Checkout
        stage('Checkout') {
            steps {
                echo "Checking out the repository..."
                deleteDir()
                checkout scm
                sh 'ls -la'
                echo "Checkout completed."
            }
        }
        // SonarQube
        stage('SonarQube Analysis') {
            when {
                anyOf {
                    branch 'develop-BE'
                    branch 'develop-FE'
                }
            }
            steps {
                echo "Running SonarQube analysis..."
                withSonarQubeEnv('SonarQube') {
                    dir('ifsavedog-BE') {
                        sh 'chmod +x ./gradlew'
                        sh './gradlew clean'
                        sh './gradlew sonarqube'
                    }
                }
                echo "SonarQube analysis completed."
            }
        }
        // 환경준비
        stage('Prepare Environment') {
            steps {
                echo "Preparing environment..."
                script {
                    // 환경 설정 함수
                    def prepareEnv = { envFile, directory, dockerImage ->
                        sh """
                            mkdir -p "$WORKSPACE/${directory}"
                            cp "${envFile}" "$WORKSPACE/${directory}/.env"
                            echo "DOCKER_TAG=${DOCKER_TAG}" >> "$WORKSPACE/${directory}/.env"
                            echo "DOCKER_IMAGE=${dockerImage}" >> "$WORKSPACE/${directory}/.env"
                            cat "$WORKSPACE/${directory}/.env"
                        """
                    }
                    // 브랜치 별 별도 준비
                    if (env.BRANCH_NAME == 'develop-BE') {
                        withCredentials([file(credentialsId: 'IfSae-back-env-file', variable: 'ENV_FILE_BACKEND')]) {
                            prepareEnv(ENV_FILE_BACKEND, 'back-end', DOCKER_IMAGE_BACKEND)
                        }
                    } else if (env.BRANCH_NAME == 'develop-FE') {
                        withCredentials([file(credentialsId: 'IfSae-front-env-file', variable: 'ENV_FILE_FRONTEND')]) {
                            prepareEnv(ENV_FILE_FRONTEND, 'front-end', DOCKER_IMAGE_FRONTEND)
                        }
                    }
                }
                echo "Environment preparation completed."
            }
        }
        // 도커 이미지 빌드
        stage('Build Docker Images') {
            parallel {
                stage('Build Backend') {
                    when { branch 'develop-BE' }
                    steps {
                        echo "Building backend Docker image..."
                        script {
                            buildDockerImage(DOCKER_IMAGE_BACKEND, 'back-end')
                        }
                    }
                }
                stage('Build Frontend') {
                    when { branch 'develop-FE' }
                    steps {
                        echo "Building frontend Docker image..."
                        script {
                            buildDockerImage(DOCKER_IMAGE_FRONTEND, 'front-end')
                        }
                    }
                }
            }
        }
        // 도커 이미지 푸쉬
        stage('Push Docker Images') {
            steps {
                echo "Pushing Docker images to registry..."
                script {
                    docker.withRegistry("${DOCKER_REGISTRY}", 'docker-hub-credentials') {
                        if (env.BRANCH_NAME == 'develop-BE') {
                            docker.image("${DOCKER_IMAGE_BACKEND}:${DOCKER_TAG}").push()
                            docker.image("${DOCKER_IMAGE_BACKEND}:latest").push()
                        } else if (env.BRANCH_NAME == 'develop-FE') {
                            docker.image("${DOCKER_IMAGE_FRONTEND}:${DOCKER_TAG}").push()
                            docker.image("${DOCKER_IMAGE_FRONTEND}:latest").push()
                        }
                    }
                }
            }
        }
        // 배포
        stage('Deploy to EC2') {
            when {
                anyOf {
                    branch 'develop-BE'
                    branch 'develop-FE'
                }
            }
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
        // 테스트
        stage('Test') {
            steps {
                echo 'Jenkins Mattermost Connection'
            }
        }
    }
    // MM 알람
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
// 공통 Docker 이미지 빌드를 위한 함수 정의
def buildDockerImage(imageName, directory) {
    dir(directory) {
        sh "docker build -t ${imageName}:${DOCKER_TAG} ."
    }
}