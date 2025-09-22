IQAC Website

A simple IQAC website with an Express backend for collecting feedback.

Quick start

- npm install
- npm start

Backend runs on http://localhost:5000

Environment

Create a `.env` file to override the default MongoDB URI:

MONGO_URI=mongodb://127.0.0.1:27017/iqac_db

API
- POST /feedback → save feedback { name, email, message }
- GET /feedback → list feedback (JSON)

Deploying to GitHub
1) Initialize git and commit:
- git init
- git add .
- git commit -m "Initial commit: IQAC site with feedback backend"
2) Create a GitHub repo (via UI) named `iqac-website`.
3) Add remote and push:
- git branch -M main
- git remote add origin https://github.com/<your-username>/iqac-website.git
- git push -u origin main

Do not commit `.env`.

