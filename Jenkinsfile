
pipeline {
    agent any

    stages {
        stage('Clone or Pull') {
            steps {
                script {
                    if (fileExists('api-absekol-backeend')) {
                        dir('api-absekol-backeend') {
                            sh 'git fetch'
                            sh 'git checkout main'
                            sh 'git pull origin main'
                        }
                    } else {
                        sh 'git clone -b main https://github.com/Ranur-react/api-absekol-backeend.git'
                    }
                }
            }
        }
        stage('Copy .env File') {
            steps {
                script {
                    sh 'cat /mnt/env-aset/wabot/absekol.env'
                    sh 'cp /mnt/env-aset/wabot/absekol.env api-absekol-backeend/.env'
                    sh 'cat api-absekol-backeend/.env'
                }
            }
        }
        stage('Container Renewal') {
            steps {
                script {
                    try {
                        sh 'docker stop node2'
                        sh 'docker rm node2'
                    } catch (Exception e) {
                        echo "Container node2 was not running or could not be stopped/removed: ${e}"
                    }
                }
            }
        }
        stage('Image Renewal') {
            steps {
                script {
                    try {
                        sh 'docker rmi absekol-api'
                    } catch (Exception e) {
                        echo "Image absekol-api could not be removed: ${e}"
                    }
                }
            }
        }
        stage('Build Docker New Image') {
            steps {
                dir('api-absekol-backeend') {
                    sh 'docker build -t absekol-api .'
                }
            }
        }
        stage('Run New Container') {
            steps {
                sh 'docker run -d --name node2 -p 3002:3002 absekol-api'
            }
        }
    }
    post {
        always {
            echo 'This will always run'
        }
        success {
            echo 'This will run only if successful'
        }
        failure {
            echo 'This will run only if failed'
        }
    }
}
