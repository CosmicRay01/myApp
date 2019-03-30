pipeline {
    agent {
        node {
            label 'seproject1'
        }

    }
    options {
        disableConcurrentBuilds()
    }
    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }
        stage('Dependencies') {
            steps {
                dir(path: 'frontend') {
                    sh 'npm install'
                }
            }
        }
    /*  stage('Test') {
            steps {
                dir(path: 'frontend') {
                    sh 'node_modules/.bin/ng lint'
                    sh 'node_modules/.bin/ng test --watch=false --browsers ChromeHeadless'
                }
            }
        } */
        stage('Build') {
            steps {
                dir(path: 'frontend') {
                    sh 'node_modules/.bin/ng build --prod'
                }
            }
        }
        stage('Deploy') {
            steps {
                script {
                    if(env.BRANCH_NAME == 'master'){
                        sh 'rm -rf /var/www/html/*'
                        sh 'cp -a frontend/dist/myApp/. /var/www/html/'
                    }
                }
            }
        } 
    }
}
