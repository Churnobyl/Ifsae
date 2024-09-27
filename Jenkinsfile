pipeline {
    agent any

    tools {
        nodejs 'NodeJS 20.15.0'
    }

    environment {
        DOCKER_IMAGE_BACKEND = "sdeogi/ifsae-be"
        DOCKER_IMAGE_FRONTEND = "sdeogi/ifsae-fe"
        DOCKER_IMAGE_DATA = "sdeogi/ifsae-data"
        DOCKER_TAG = "${env.BUILD_NUMBER}"
        DOCKER_REGISTRY = 'https://registry.hub.docker.com'
    }

    stages {
        stage('Checkout') {
            steps {
                echo "Checking out the repository..."
                deleteDir()
                checkout scm
            }
        }

        stage('SonarQube Analysis') {
            when {
                expression { env.BRANCH_NAME == 'develop-BE' }
            }
            steps {
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

        stage('Build') {
            parallel {
                stage('Build BE') {
                    when {
                        expression { env.BRANCH_NAME == 'develop-BE' }
                    }
                    steps {
                        echo "Building JAR file for BE..."
                        dir('ifsavedog-BE') {
                            sh './gradlew build -x test'
                        }
                        echo "BE JAR build completed."
                    }
                }

                stage('Build FE') {
                    when {
                        expression { env.BRANCH_NAME == 'develop-FE' }
                    }
                    steps {
                        // echo "Building FE (React)..."
                        // dir('ifsavedog-FE') {
                        //     sh 'npm install --legacy-peer-deps'
                        //     sh 'npm run build'
                        // }
                        // echo "FE build and deployment completed."
                    }
                }

                stage('Build DATA') {
                    when {
                        expression { env.BRANCH_NAME == 'develop-DATA' }
                    }
                    steps {
                        echo "Building DATA..."
                        // 데이터 관련 빌드 작업 추가 가능
                        echo "Data build completed."
                    }
                }
            }
        }

        stage('Copy Dockerfile') {
            steps {
                script {
                    def remotePath = "/var/jenkins_home/workspace/IfSae_${env.BRANCH_NAME}/Dockerfile"
                    echo "Copying Dockerfile from EC2 for branch: ${env.BRANCH_NAME}..."

                    sshagent(['jenkins-ssh-key']) {
                        sh """
                            scp -o StrictHostKeyChecking=no ubuntu@j11a508.p.ssafy.io:${remotePath} ${WORKSPACE}/Dockerfile
                        """
                    }
                }
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
                            // validateAndBuildDockerImage(DOCKER_IMAGE_FRONTEND, "${WORKSPACE}")
                            echo "Building Docker image ${DOCKER_IMAGE_FRONTEND}:${DOCKER_TAG}..."
                            sh "docker build --no-cache -t ${DOCKER_IMAGE_FRONTEND}:${DOCKER_TAG} ."
                            echo "Docker image build completed."
                        }
                    }
                }

                stage('Build Data') {
                    when {
                        expression { env.BRANCH_NAME == 'develop-DATA' }
                    }
                    steps {
                        echo "Building data Docker image..."
                        script {
                            validateAndBuildDockerImage(DOCKER_IMAGE_DATA, "${WORKSPACE}")
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
                        if (env.BRANCH_NAME == 'develop-BE') {
                            sh "docker push ${DOCKER_IMAGE_BACKEND}:${DOCKER_TAG}"
                            sh "docker tag ${DOCKER_IMAGE_BACKEND}:${DOCKER_TAG} ${DOCKER_IMAGE_BACKEND}:latest"
                            sh "docker push ${DOCKER_IMAGE_BACKEND}:latest"
                        } else if (env.BRANCH_NAME == 'develop-FE') {
                            sh "docker push ${DOCKER_IMAGE_FRONTEND}:${DOCKER_TAG}"
                            sh "docker tag ${DOCKER_IMAGE_FRONTEND}:${DOCKER_TAG} ${DOCKER_IMAGE_FRONTEND}:latest"
                            sh "docker push ${DOCKER_IMAGE_FRONTEND}:latest"
                        } else if (env.BRANCH_NAME == 'develop-DATA') {
                            sh "docker push ${DOCKER_IMAGE_DATA}:${DOCKER_TAG}"
                            sh "docker tag ${DOCKER_IMAGE_DATA}:${DOCKER_TAG} ${DOCKER_IMAGE_DATA}:latest"
                            sh "docker push ${DOCKER_IMAGE_DATA}:latest"
                        }
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
                        docker-compose up -d --build
                        '
                    """
                }
                echo "Deployment completed."
            }
        }

        stage('Cleanup') {
            steps {
                echo "Cleaning up old Docker images..."
                sh '''
                    docker images | grep 'sdeogi/ifsae-be' | grep -v 'latest' | awk '{print $3}' | xargs docker rmi -f
                    docker images | grep 'sdeogi/ifsae-fe' | grep -v 'latest' | awk '{print $3}' | xargs docker rmi -f
                    docker images | grep 'sdeogi/ifsae-data' | grep -v 'latest' | awk '{print $3}' | xargs docker rmi -f
                '''
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
        sh "cp ./ifsavedog-BE/build/libs/ifsae-0.0.1-SNAPSHOT.jar ${directory}/app.jar"
        sh "ls -la ${directory}/app.jar"  // 복사된 JAR 파일 확인

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
    } else if (branch == 'develop-DATA') {
        withCredentials([file(credentialsId: 'IfSae-data-env-file', variable: 'ENV_FILE_DATA')]) {
            echo "Using data environment file."
            prepareEnv(env.ENV_FILE_DATA, DOCKER_IMAGE_DATA)
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
