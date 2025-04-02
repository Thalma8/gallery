pipeline {
    agent any

    environment {
        EMAIL_RECIPIENT = 'thandiethalma@gmail.com'
        SLACK_WEBHOOK_URL = 'https://hooks.slack.com/services/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'
        // Replace the URL below with your actual Render URL
        RENDER_URL = 'https://your-app.render.com'
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
                    // Ensure Node.js version 18.18.0 is installed and used
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
                    // Optionally, start your server in the background (if needed)
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
        
        stage('Notify Slack') {
            steps {
                script {
                    // Build the Slack message
                    def slackMessage = """
                    {
                      "text": "Build *#${env.BUILD_ID}* has been successfully deployed! View the site here: ${env.RENDER_URL}"
                    }
                    """
                    // Send the Slack message using curl
                    sh "curl -X POST -H 'Content-type: application/json' --data '${slackMessage}' ${env.SLACK_WEBHOOK_URL}"
                }
            }
        }
    }
}
