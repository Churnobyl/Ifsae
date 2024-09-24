pipeline {
    agent any

    environment {
        DOCKER_IMAGE_BACKEND = "sdeogi/ifsae-be"
        DOCKER_IMAGE_FRONTEND = "sdeogi/ifsae-fe"
        DOCKER_TAG = "${env.BUILD_NUMBER}"
        DOCKER_REGISTRY = 'https://registry.hub.docker.com'
    }

    stages {
        stage('Checkout') {
            steps {
                echo "Checking out the repository..."
                deleteDir()
                checkout scm
                sh 'ls -la'
            }
        }

        stage('SonarQube Analysis') {
            when {
                anyOf {
                    expression { env.BRANCH_NAME == 'develop-BE' }
                    expression { env.BRANCH_NAME == 'develop-FE' }
                }
            }
            steps {
                echo "Setting executable permission for gradlew..."
                sh 'chmod +x ./ifsavedog-BE/gradlew'  // 실행 권한 추가
                echo "Running SonarQube analysis..."
                withSonarQubeEnv('SonarQube') {
                    dir('ifsavedog-BE') {
                        sh './gradlew sonar'
                    }
                }
                echo "SonarQube analysis completed."
            }
        }

        stage('Prepare Environment') {
            steps {
                echo "Preparing environment..."
                script {
                    prepareEnvironment(env.BRANCH_NAME)
                }
                echo "Environment preparation completed."
            }
        }

        stage('Build JAR') {
            steps {
                echo "Building JAR file with Gradle (skipping tests)..."
                dir('ifsavedog-BE') {
                    sh './gradlew build -x test'  // 테스트를 건너뛰고 JAR 빌드
                    sh 'ls -la build/libs/'  // 빌드 후 JAR 파일 위치 확인
                }
                echo "JAR build completed."
            }
        }

        stage('Build Docker Images') {
            parallel {
                stage('Build Backend') {
                    when {
                        expression { env.BRANCH_NAME == 'develop-BE' }
                    }
                    steps {
                        echo "Building backend Docker image..."
                        script {
                            validateAndBuildDockerImage(DOCKER_IMAGE_BACKEND, "${WORKSPACE}")
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
                            validateAndBuildDockerImage(DOCKER_IMAGE_FRONTEND, "${WORKSPACE}")
                        }
                    }
                }
            }
        }

        stage('Push Docker Images') {
            steps {
                echo "Pushing Docker images to registry..."
                script {
                    withDockerRegistry([ credentialsId: 'docker-hub-credentials', url: '' ]) {
                        sh "docker push ${DOCKER_IMAGE_BACKEND}:${DOCKER_TAG}"
                        sh "docker tag ${DOCKER_IMAGE_BACKEND}:${DOCKER_TAG} ${DOCKER_IMAGE_BACKEND}:latest"  // 태그를 latest로 지정
                        sh "docker push ${DOCKER_IMAGE_BACKEND}:latest"
                    }
                }
            }
        }

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
                        docker-compose up -d --build
                        '
                    """
                }
                echo "Deployment completed."
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
    }
}

def validateAndBuildDockerImage(imageName, directory) {
    dir(directory) {
        // Docker 이미지 빌드
        echo "Building Docker image ${imageName}:${DOCKER_TAG}..."
        sh "docker build --no-cache -t ${imageName}:${DOCKER_TAG} -f ${directory}/Dockerfile ${directory}"
        echo "Docker image build completed."
    }
}

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

def prepareEnv(envFile, dockerImage) {
    sh """
        echo 'Preparing ENV_FILE: ${envFile}'
        cp ${envFile} ${WORKSPACE}/.env
        echo DOCKER_TAG=${DOCKER_TAG} >> ${WORKSPACE}/.env
        echo DOCKER_IMAGE=${dockerImage} >> ${WORKSPACE}/.env
        chmod 775 ${WORKSPACE}/.env
    """
}