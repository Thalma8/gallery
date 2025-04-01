pipeline {
    agent any

    environment {
        NODE_VERSION = "18"  // Use a compatible Node.js version
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
                    sh 'npm install'
                }
            }
        }

        stage('Build and Deploy') {
            steps {
                script {
                    sh 'node server.js &'
                }
            }
        }

        // stage('Test Execution') {
        //     steps {
        //         script {
        //             try {
        //                 sh 'npm test'
        //             } catch (Exception e) {
        //                 mail to: 'thandiethalma@gmail.com',
        //                      subject: 'Test Failed in Jenkins Pipeline',
        //                      body: 'Tests have failed. Check Jenkins logs for details.'
        //                 error('Tests failed. Stopping pipeline.')
        //             }
        //         }
        //     }
        // }

        

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
