pipeline {
    agent any
    stages {
        stage('NPM Install') {
            steps {
                sh 'yarn install'
            }
        }
        stage('Test & Coverage') {
            steps {
                sh 'yarn run cov'
            }
        }

        stage('Lint'){
            steps {
                sh './node_modules/.bin/eslint app lib backgroundScript --ignore-path .build.eslintignore'
            }
        }
        stage('Build') {
            steps {
                sh 'yarn run build'
            }
        }
        stage('Package') {
            steps {
                sh 'tar -zcvf enzyme.tar.gz build/'
            }
        }
    }
    post {
        success {
            googlechatnotification url: 'https://chat.googleapis.com/v1/spaces/AAAAYTPBltI/messages?key=AIzaSyDdI0hCZtE6vySjMm-WEfRq3CPzqKqqsHI&token=7reUovkwzb3W0fXTkRZ0WFj1lGusO5OmyWbB_dRCMqY%3D', message: '${JOB_NAME} is ${BUILD_STATUS} by ${CHANGE_AUTHOR} [ SUCCESS ]', sameThreadNotification: true
        }
            failure {
            googlechatnotification url: 'https://chat.googleapis.com/v1/spaces/AAAAYTPBltI/messages?key=AIzaSyDdI0hCZtE6vySjMm-WEfRq3CPzqKqqsHI&token=7reUovkwzb3W0fXTkRZ0WFj1lGusO5OmyWbB_dRCMqY%3D', message: '${JOB_NAME} is ${BUILD_STATUS} by ${CHANGE_AUTHOR} [ FAIL ] ', sameThreadNotification: true

        }

    }
}
