 🚀 DevOps Pipeline on AWS EKS with Jenkins & ArgoCD

This project demonstrates a complete end-to-end DevOps pipeline to deploy a Next.js Car Rental Application on Amazon EKS using modern DevOps practices like CI/CD, GitOps, and Infrastructure as Code.

It showcases how an application moves from development to production in an automated and scalable cloud environment.

---

📌 Project Overview

I built this project to gain hands-on experience in:

* CI/CD automation
* GitOps workflows
* Kubernetes deployments
* Cloud infrastructure provisioning
* Monitoring and observability

---

🏗️ Architecture

Developer → GitHub → Jenkins (CI) → Docker Hub → GitOps Repo → ArgoCD → AWS EKS

---

⚙️ Pipeline Workflow

🔹 Step 1: Build & Push Docker Image 

* Developed a full-stack Next.js car rental application
* Containerized the application using Docker
* Configured Jenkins CI pipeline
* Implemented smart build logic (build only when required)
* Auto versioning based on `package.json`
* Pushed images to Docker Hub


🔹 Step 2: GitOps Deployment with ArgoCD 

* Implemented GitOps approach using ArgoCD
* Jenkins updates Kubernetes manifests in a separate repo
* ArgoCD automatically syncs and deploys to EKS cluster


🔹 Step 3: Repository Management 

* Maintained two repositories:

  * App source code + Jenkins pipeline
  * Kubernetes manifests (GitOps repo)


🔹 Step 4: AWS Infrastructure 

* Deployed on Amazon EKS
* Used Terraform to provision infrastructure
* Used Ansible for configuration management


🔹 Step 5: Database & Storage 

* Deployed MongoDB as StatefulSet
* Used Persistent Volumes for data durability
* Integrated Mongo Express for DB management


🔹 Step 6: Monitoring 

* Set up Prometheus & Grafana
* Monitored:

  * CPU usage
  * Memory usage
  * Pod health
  * Node metrics


🔹 Step 7: Routing 

* Configured NGINX Ingress Controller
* Managed external access to the application

---

 Optimization

* Implemented conditional builds in Jenkins
* Avoided unnecessary image rebuilds
* Improved pipeline efficiency and speed

---

 🧠 What I Learned

* CI/CD pipeline design and implementation
* GitOps workflow using ArgoCD
* Kubernetes (stateless & stateful apps)
* Infrastructure as Code (Terraform & Ansible)
* Monitoring and observability with Prometheus & Grafana

---

🛠️ Tech Stack

* **Frontend & Backend**: Next.js
* **CI/CD**: Jenkins
* **Containerization**: Docker
* **Orchestration**: Kubernetes (EKS)
* **GitOps**: ArgoCD
* **IaC**: Terraform, Ansible
* **Database**: MongoDB
* **Monitoring**: Prometheus, Grafana
* **Routing**: NGINX


This project helped me understand how real-world DevOps pipelines work by integrating multiple tools into a complete production-ready workflow.


ArgoCD repository Link: https://github.com/JanithaDissanayaka/ArgoCD.git
