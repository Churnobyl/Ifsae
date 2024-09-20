pipeline {
    agent any

    environment {
        DOCKER_REGISTRY = 'https://registry.hub.docker.com'
        DOCKER_TAG = "${BUILD_NUMBER}"
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

        // 소나큐브 분석
        stage('SonarQube Analysis') {
            steps {
                script {
                    def projectDir = getProjectDirectory()
                    echo "Running SonarQube analysis for directory: ${projectDir}"
                    withSonarQubeEnv('SonarQube') {
                        dir(projectDir) {
                            sh 'chmod +x ./gradlew'
                            sh './gradlew clean'
                            sh './gradlew sonarqube'
                        }
                    }
                }
                echo "SonarQube analysis completed."
            }
        }

        // 환경 준비
        stage('Prepare Environment') {
            steps {
                script {
                    def projectDir = getProjectDirectory()
                    def dockerImage = getDockerImage()
                    def envFile = getEnvFile()

                    echo "Preparing environment for ${projectDir}"
                    sh """
                        mkdir -p $WORKSPACE/${projectDir}
                        cp $envFile $WORKSPACE/${projectDir}/.env
                        echo "DOCKER_TAG=${DOCKER_TAG}" >> $WORKSPACE/${projectDir}/.env
                        echo "DOCKER_IMAGE=${dockerImage}" >> $WORKSPACE/${projectDir}/.env
                        cat $WORKSPACE/${projectDir}/.env
                    """
                    echo "Environment preparation completed."
                }
            }
        }

        // 도커 이미지 빌드
        stage('Build Docker Images') {
            steps {
                script {
                    def projectDir = getProjectDirectory()
                    def dockerImage = getDockerImage()

                    echo "Building Docker image for ${projectDir}"
                    buildDockerImage(dockerImage, projectDir)
                }
            }
        }

        // 도커 이미지 푸쉬
        stage('Push Docker Images') {
            steps {
                script {
                    def dockerImage = getDockerImage()
                    echo "Pushing Docker image: ${dockerImage}"

                    docker.withRegistry("$DOCKER_REGISTRY", 'docker-hub-credentials') {
                        docker.image("${dockerImage}:${DOCKER_TAG}").push()
                        docker.image("${dockerImage}:latest").push()
                    }
                }
            }
        }

        // 배포
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

        // 테스트
        stage('Test') {
            steps {
                echo 'Jenkins Mattermost Connection'
            }
        }
    }

    // 알림
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

// 브랜치에 따라 디렉토리 설정
def getProjectDirectory() {
    if (env.BRANCH_NAME == 'develop-BE') {
        return 'IfSae_develop-BE'
    } else if (env.BRANCH_NAME == 'develop-FE') {
        return 'IfSae_develop-FE'
    } else {
        error "Unsupported branch: ${env.BRANCH_NAME}"
    }
}

// 브랜치에 따라 Docker 이미지 설정
def getDockerImage() {
    if (env.BRANCH_NAME == 'develop-BE') {
        return "sdeogi/IfSae-BE"
    } else if (env.BRANCH_NAME == 'develop-FE') {
        return "sdeogi/IfSae-FE"
    } else {
        error "Unsupported branch: ${env.BRANCH_NAME}"
    }
}

// 브랜치에 따라 환경 파일 설정
def getEnvFile() {
    if (env.BRANCH_NAME == 'develop-BE') {
        return 'IfSae-back-env-file'
    } else if (env.BRANCH_NAME == 'develop-FE') {
        return 'IfSae-front-env-file'
    } else {
        error "Unsupported branch: ${env.BRANCH_NAME}"
    }
}