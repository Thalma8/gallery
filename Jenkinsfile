pipeline {
    agent any

    environment {
        // Define environment variables if needed
        EMAIL_RECIPIENT = 'thandiethalma@gmail.com'
    }

    stages {
        stage('Checkout Code') {
            steps {
                git branch: 'master', url: 'https://github.com/Thalma8/gallery'
            }
        }

        stage('Install Dependencies') {
            steps {
                script {
                    // Ensure that Node.js version 18.18.0 is installed and used
                    sh 'nvm install 18.18.0'
                    sh 'nvm use 18.18.0'
                    sh 'npm install'
                }
            }
        }
        
        stage('Run Tests') {
            steps {
                script {
                    try {
                        sh 'npm test'
                    } catch (err) {
                        // Send an email notification if tests fail
                        mail to: "${env.EMAIL_RECIPIENT}",
                             subject: "Jenkins: Tests failed for Gallery project",
                             body: "The test stage failed during the build. Please check the Jenkins logs for more details."
                        // Re-throw the error to mark the build as failed
                        error "Tests failed, stopping pipeline."
                    }
                }
            }
        }
        
        stage('Build and Deploy') {
            steps {
                script {
                    // Optionally, start your server in the background
                    sh 'node server.js &'
                }
            }
        }

        stage('Deploy to Render') {
            steps {
                script {
                    sh '''
                    curl -X POST https://api.render.com/deploy/srv-cvl8is1r0fns738b33c0?key=d0Ye1qran6g
                    '''
                }
            }
        }
    }
}
