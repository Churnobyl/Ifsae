pipeline {
    agent any

    tools {
        nodejs 'NodeJS 20.15.0'
    }

    environment {
        DOCKER_IMAGE_BACKEND = "sdeogi/ifsae-be"
        DOCKER_IMAGE_FRONTEND = "sdeogi/ifsae-fe"
        DOCKER_IMAGE_DATA = "sdeogi/ifsae-data"
        DOCKER_REGISTRY = 'https://registry.hub.docker.com'
    }

    stages {
        stage('Checkout') {
            steps {
                echo "Checkout stage"
                deleteDir()
                checkout scm
            }
        }

        stage('SonarQube Analysis') {
            when {
                expression { env.BRANCH_NAME == 'develop-BE' }
            }
            steps {
                echo "SonarQube analysis stage."
                withSonarQubeEnv('SonarQube') {
                    dir('ifsavedog-BE') {
                        sh 'chmod +x ./gradlew'
                        sh './gradlew sonar'
                    }
                }
            }
        }

        stage('Prepare Environment') {
            steps {
                echo "Preparing environment stage"
                script {
                    prepareEnvironment(env.BRANCH_NAME)
                }
            }
        }

        stage('Copy Dockerfile') {
            steps {
                echo "Copy Dockerfile stage"
                script {
                    def remotePath = "/var/jenkins_home/workspace/IfSae_${env.BRANCH_NAME}/Dockerfile"
                    sshagent(['jenkins-ssh-key']) {
                        sh """
                            scp -o StrictHostKeyChecking=no ubuntu@j11a508.p.ssafy.io:${remotePath} ${WORKSPACE}/Dockerfile
                        """
                    }
                }
            }
        }

        stage('Build') {
            parallel {
                stage('Build Backend') {
                    when {
                        expression { env.BRANCH_NAME == 'develop-BE' }
                    }
                    steps {
                        dir('ifsavedog-BE') {
                            sh './gradlew build -x test'
                            sh "cp build/libs/ifsae-0.0.1-SNAPSHOT.jar ${WORKSPACE}/app.jar"
                            sh "docker build --no-cache -t ${DOCKER_IMAGE_BACKEND}:latest -f ${WORKSPACE}/Dockerfile ${WORKSPACE}"
                        }
                    }
                }

                stage('Build Frontend') {
                    when {
                        expression { env.BRANCH_NAME == 'develop-FE' }
                    }
                    steps {
                        dir('ifsavedog-FE') {
                            sh "docker build --no-cache -t ${DOCKER_IMAGE_FRONTEND}:latest ."
                        }
                    }
                }

                stage('Build Data') {
                    when {
                        expression { env.BRANCH_NAME == 'develop-DATA' }
                    }
                    steps {
                        script {
                            validateAndBuildDockerImage(DOCKER_IMAGE_DATA, "${WORKSPACE}")
                        }
                    }
                }
            }
        }

        stage('Push Docker Images') {
            steps {
                echo "Push Docker Images stage"
                script {
                    withDockerRegistry([ credentialsId: 'docker-hub-credentials', url: '' ]) {
                        if (env.BRANCH_NAME == 'develop-BE') {
                            sh "docker push ${DOCKER_IMAGE_BACKEND}:latest"
                        } else if (env.BRANCH_NAME == 'develop-FE') {
                            sh "docker push ${DOCKER_IMAGE_FRONTEND}:latest"
                        } else if (env.BRANCH_NAME == 'develop-DATA') {
                            sh "docker push ${DOCKER_IMAGE_DATA}:latest"
                        }
                    }
                }
            }
        }

        stage('Deploy to EC2') {
            steps {
                echo "Deploying to EC2 stage"
                sshagent(['jenkins-ssh-key']) {
                    sh """
                        ssh -o StrictHostKeyChecking=no ubuntu@j11a508.p.ssafy.io '
                        cd /home/ubuntu/
                        docker-compose up -d --build
                        '
                    """
                }
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
            echo "Cleaning workspace"
            cleanWs()
        }
    }
}

def prepareEnvironment(branch) {
    if (branch == 'develop-BE') {
        withCredentials([file(credentialsId: 'IfSae-back-env-file', variable: 'ENV_FILE_BACKEND')]) {
            prepareEnv(env.ENV_FILE_BACKEND, DOCKER_IMAGE_BACKEND)
        }
    } else if (branch == 'develop-FE') {
        withCredentials([file(credentialsId: 'IfSae-front-env-file', variable: 'ENV_FILE_FRONTEND')]) {
            prepareEnv(env.ENV_FILE_FRONTEND, DOCKER_IMAGE_FRONTEND)
        }
    } else if (branch == 'develop-DATA') {
        withCredentials([file(credentialsId: 'IfSae-data-env-file', variable: 'ENV_FILE_DATA')]) {
            prepareEnv(env.ENV_FILE_DATA, DOCKER_IMAGE_DATA)
        }
    }
}

def prepareEnv(envFile, dockerImage) {
    sh '''
        cp "$ENV_FILE_BACKEND" "$WORKSPACE/.env"
        chmod 775 "$WORKSPACE/.env"
    '''
}