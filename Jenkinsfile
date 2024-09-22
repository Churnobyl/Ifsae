pipeline {
    agent any

    environment {
        DOCKER_IMAGE_BACKEND = "sdeogi/ifSae-be"
        DOCKER_IMAGE_FRONTEND = "sdeogi/ifSae-fe"
        DOCKER_TAG = "${BUILD_NUMBER}"
        DOCKER_REGISTRY = 'https://registry.hub.docker.com'
    }

    stages {
        // 체크아웃
        stage('Checkout') {
            steps {
                echo "Checking out the repository..."
                deleteDir()
                checkout scm
                sh 'ls -la'
                echo "Checkout completed."
            }
        }

        // SonarQube 분석
        stage('SonarQube Analysis') {
            when {
                anyOf {
                    expression { env.BRANCH_NAME == 'develop-BE' }
                    expression { env.BRANCH_NAME == 'develop-FE' }
                }
            }
            steps {
                echo "Running SonarQube analysis..."
                withSonarQubeEnv('SonarQube') {
                    dir('ifsavedog-BE') {
                        sh 'chmod +x ./gradlew'
                        sh './gradlew clean'
                        sh './gradlew sonar'
                    }
                }
                echo "SonarQube analysis completed."
            }
        }

        // 환경 설정
        stage('Prepare Environment') {
            steps {
                echo "Preparing environment..."
                script {
                    prepareEnvironment(env.BRANCH_NAME)
                }
                echo "Environment preparation completed."
            }
        }

        // 도커 이미지 생성
        stage('Build Docker Images') {
            parallel {
                stage('Build Backend') {
                    when {
                        expression { env.BRANCH_NAME == 'develop-BE' }
                    }
                    steps {
                        echo "Building backend Docker image..."
                        script {
                            buildDockerImage(DOCKER_IMAGE_BACKEND, 'IfSae_develop-BE')
                        }
                    }
                }
                stage('Build Frontend') {
                    when {
                        expression { env.BRANCH_NAME == 'develop-FE' }
                    }
                    steps {
                        echo "Building frontend Docker image..."
                        script {
                            buildDockerImage(DOCKER_IMAGE_FRONTEND, 'IfSae_develop-FE')
                        }
                    }
                }
            }
        }

        // 도커 이미지 push
        stage('Push Docker Images') {
            steps {
                echo "Pushing Docker images to registry..."
                script {
                    pushDockerImage(env.BRANCH_NAME)
                }
            }
        }

        // EC2 배포
        stage('Deploy to EC2') {
            when {
                anyOf {
                    expression { env.BRANCH_NAME == 'develop-BE' }
                    expression { env.BRANCH_NAME == 'develop-FE' }
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
            cleanWs()
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

// 공통 환경 설정 함수 정의
def prepareEnvironment(branch) {
    if (branch == 'develop-BE') {
        withCredentials([file(credentialsId: 'IfSae-back-env-file', variable: 'ENV_FILE_BACKEND')]) {
            echo "Using backend environment file."
            prepareEnv(env.ENV_FILE_BACKEND, DOCKER_IMAGE_BACKEND)
        }
    } else if (branch == 'develop-FE') {
        withCredentials([file(credentialsId: 'IfSae-front-env-file', variable: 'ENV_FILE_FRONTEND')]) {
            echo "Using frontend environment file."
            prepareEnv(env.ENV_FILE_FRONTEND, DOCKER_IMAGE_FRONTEND)
        }
    }
}

// 환경 파일 복사 및 설정 함수
def prepareEnv(envFile, dockerImage) {
    sh """
        echo 'Preparing ENV_FILE: ${envFile}'
        touch ${WORKSPACE}/.env
        cp ${envFile} ${WORKSPACE}/.env
        echo DOCKER_TAG=${DOCKER_TAG} >> ${WORKSPACE}/.env
        echo DOCKER_IMAGE=${dockerImage} >> ${WORKSPACE}/.env
    """
    sh "chmod 775 ${WORKSPACE}/.env"
}

// 공통 Docker 이미지 푸쉬 함수 정의
def pushDockerImage(branch) {
    docker.withRegistry("${DOCKER_REGISTRY}", 'docker-hub-credentials') {
        if (branch == 'develop-BE') {
            docker.image("${DOCKER_IMAGE_BACKEND}:${DOCKER_TAG}").push()
            docker.image("${DOCKER_IMAGE_BACKEND}:latest").push()
        } else if (branch == 'develop-FE') {
            docker.image("${DOCKER_IMAGE_FRONTEND}:${DOCKER_TAG}").push()
            docker.image("${DOCKER_IMAGE_FRONTEND}:latest").push()
        }
    }
}