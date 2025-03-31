pipeline {
    agent any

    stages {
        // Checkout code from GitHub
        stage('Checkout') {
            steps {
                git branch: 'master', url: 'https://github.com/Thalma8/gallery'
            }
        }

        // Install dependencies
        stage('Install Dependencies') {
            steps {
                sh 'npm install'
            }
        }

        // Run tests (if you add them later)
        stage('Test') {
            steps {
                sh 'npm test' // Will fail if no tests exist (optional)
            }
        }

        // Deploy to Render (via GitHub trigger)
        stage('Deploy to Render') {
            steps {
                echo 'Render auto-deploys when changes are pushed to GitHub.'
            }
        }
    }

    post {
        success {
            echo 'Pipeline succeeded! Check Render for deployment.'
        }
        failure {
            echo 'Pipeline failed. Check logs.'
        }
    }
}