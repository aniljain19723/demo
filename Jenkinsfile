
pipeline {
  agent any

  environment {
    // Set this to your Docker Hub repo (e.g. username/repo)
    DOCKER_IMAGE = credentials('') ? '' : 'itguruanil/paytm-registration' // fallback text, edit if needed
    // Docker Hub username/password stored in Jenkins as 'dockerhub-creds'
    DOCKER_HUB_CREDENTIALS = credentials('dockerhub-creds')
    // If you prefer to hardcode: DOCKER_IMAGE = 'yourdockerhubusername/paytm-registration'
  }

  options {
    timestamps()
    ansiColor('xterm')
  }

  stages {
    stage('Checkout') {
      steps {
        // In Multibranch Pipelines, this will check out the repo containing this Jenkinsfile
        checkout scm
      }
    }

    stage('Build Docker Image') {
      steps {
        sh '''
          echo "Docker version:"
          docker version
          echo "Building image ${DOCKER_IMAGE}:${BUILD_NUMBER} ..."
          docker build -t ${DOCKER_IMAGE}:${BUILD_NUMBER} .
        '''
      }
    }

    stage('Login to Docker Hub') {
      steps {
        sh '''
          echo "${DOCKER_HUB_CREDENTIALS_PSW}" | docker login -u "${DOCKER_HUB_CREDENTIALS_USR}" --password-stdin
        '''
      }
    }

    stage('Push to Docker Hub') {
      steps {
        sh '''
          docker push ${DOCKER_IMAGE}:${BUILD_NUMBER}
          docker tag ${DOCKER_IMAGE}:${BUILD_NUMBER} ${DOCKER_IMAGE}:latest
          docker push ${DOCKER_IMAGE}:latest
        '''
      }
    }

    stage('Deploy Locally') {
      steps {
        sh '''
          set -eux
          docker rm -f paytm-registration || true
          docker run -d --name paytm-registration -p 8080:80 ${DOCKER_IMAGE}:latest
          docker ps --filter "name=paytm-registration"
        '''
      }
    }
  }

  post {
    success {
      echo "Deployed successfully. Access: http://localhost:8080"
    }
    always {
      sh 'docker images | head -n 10 || true'
    }
  }
}
