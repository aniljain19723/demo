
# Paytm Registration App (Node.js + Nginx) with Jenkins CI/CD

This repo contains a minimal Node.js app (Express) that serves a Paytm‑style registration form behind Nginx. A Jenkins pipeline builds a Docker image, pushes it to Docker Hub, and deploys it locally.

## Project Structure
```
paytm-registration-app/
├── Dockerfile
├── Jenkinsfile
├── nginx.conf
├── app.js
├── package.json
├── .dockerignore
├── .gitignore
└── views/
    └── register.html
```

## Quick Start (Locally without Jenkins)
```bash
docker build -t paytm-registration:local .
docker run -d --name paytm-registration -p 8080:80 paytm-registration:local
# Open http://localhost:8080
```

## Jenkins Pipeline (End‑to‑End)
1. **Create Jenkins credentials** for Docker Hub:
   - ID: `dockerhub-creds`
   - Username/Password: your Docker Hub account

2. **Ensure Jenkins agent can run Docker** (Docker installed and the Jenkins user in the `docker` group).

3. **Use a Multibranch Pipeline** or Pipeline from SCM so Jenkins checks out this repo. The Jenkinsfile assumes `checkout scm`.

4. **Set this environment variable in Jenkins (optional)** or edit `Jenkinsfile`:
   - `DOCKER_IMAGE`: e.g. `yourdockerhubusername/paytm-registration`

5. **Run the pipeline**. It will:
   - Build Docker image
   - Login to Docker Hub
   - Push `:BUILD_NUMBER` and `:latest` tags
   - (Re)deploy locally on the Jenkins agent: container `paytm-registration` exposed on port `8080`

## App URLs
- App: `http://localhost:8080`
- Form action posts to `/register` and echoes submitted data.

## Notes
- The Dockerfile runs **Node and Nginx in the same container** for simplicity.
- If you prefer separate containers, use a `docker-compose.yml` and a dedicated Nginx container that proxies to the app container.
