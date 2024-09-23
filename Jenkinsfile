pipeline {
    agent any

    environment {
        DOCKER_IMAGE_BACKEND = "sdeogi/ifsae-be"
        DOCKER_IMAGE_FRONTEND = "sdeogi/ifsae-fe"
        DOCKER_TAG = "${BUILD_NUMBER}"
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
                    // JAR 파일 존재 여부를 확인하는 로그 추가
                    // 테스트 할 경우: sh './gradlew build'
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
                        echo "Copying Dockerfile from EC2..."
                        sshagent(['jenkins-ssh-key']) {
                            sh """
                                scp -o StrictHostKeyChecking=no ubuntu@j11a508.p.ssafy.io:/home/ubuntu/Dockerfile ${WORKSPACE}/Dockerfile
                            """
                        }
                        // Dockerfile 복사 후 확인하는 로그 추가
                        sh 'ls -la ${WORKSPACE}/Dockerfile'  // Dockerfile 위치 및 파일 확인
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
                    pushDockerImage(env.BRANCH_NAME)
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

def validateAndBuildDockerImage(imageName, directory) {
    dir(directory) {
        // Gradle 빌드 후 JAR 파일을 Dockerfile 경로로 복사하는 단계
        echo "Copying JAR file to Dockerfile context..."
        sh 'ls -la ./ifsavedog-BE/build/libs/'  // JAR 파일 존재 확인
        sh "cp ./ifsavedog-BE/build/libs/ifsavedog-be-0.0.1-SNAPSHOT.jar ${directory}/app.jar"
        sh 'ls -la ${directory}/app.jar'  // 복사된 JAR 파일 확인

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