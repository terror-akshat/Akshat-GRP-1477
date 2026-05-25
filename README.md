# Smart Hospital OPD Management System

This repository contains a MERN-style hospital management application focused on OPD/IPD workflows. The project is designed to reduce patient waiting time and manual errors by digitizing registration, profile history, ward management, document uploads, and billing.

## Project Overview

The application is split into a React frontend and an Express/MongoDB backend, with Redis available for caching or supporting services in the containerized setup.

Core features implemented in the repository include:

- staff authentication and protected routes
- patient registration and profile/history views
- OPD and IPD record management
- ward and bed management
- billing and printable hospital bill flows
- file upload support for patient-related documents

## Repository Structure

```text
.
|-- backend/
|   |-- Controllers/        # Request handlers and business logic
|   |-- Databse/            # MongoDB connection setup
|   |-- Models/             # Mongoose schemas/models
|   |-- Routes/             # Express route modules
|   |-- config/             # Redis configuration
|   |-- cloudnary/          # Cloudinary integration
|   |-- uploads/            # Local uploaded files
|   |-- index.js            # Backend entry point
|   `-- package.json
|-- frontend/
|   |-- public/             # Static assets
|   |-- src/
|   |   |-- components/     # Reusable UI pieces
|   |   |-- context/        # Auth context
|   |   |-- pages/          # Route-level pages
|   |   |-- axios.js        # API client setup
|   |   `-- App.jsx         # Frontend routing
|   `-- package.json
|-- docker-compose.yml      # Multi-container local setup
|-- prompt.md               # Original project/problem statement
|-- justfication.md         # Evaluation comparison write-up
`-- README.md
```

## Running the Code

### Option 1: Run locally

Prerequisites:

- Node.js 18+
- npm
- MongoDB connection string
- Redis server

Backend setup:

```bash
cd backend
npm install
```

Create `backend/.env` with the values used by the server:

```env
MONGO_URL=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
FRONTEND_URL=http://localhost:5173
REDIS_URI=redis://127.0.0.1:6379
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

Start the backend:

```bash
npm run dev
```

Frontend setup:

```bash
cd frontend
npm install
```

Create `frontend/.env` if you want to override the default API URL:

```env
VITE_BACKEND_URL=http://localhost:3000
```

Start the frontend:

```bash
npm run dev
```

Default local URLs:

- Frontend: `http://localhost:5173`
- Backend API base: `http://localhost:3000/api`

### Option 2: Run with Docker Compose

This repo includes:

- `frontend/Dockerfile`
- `backend/Dockerfile`
- `docker-compose.yml`

From the repository root:

```bash
docker compose up --build
```

Container URLs:

- Frontend: `http://localhost:5173`
- Backend API: `http://localhost:3000/api`
- Redis: `redis://localhost:6379`

Notes:

- Docker Compose reads `backend/.env` for secrets such as `MONGO_URL`, `JWT_SECRET`, and Cloudinary credentials.
- In containers, the backend uses `PORT=3000`, `FRONTEND_URL=http://localhost:5173`, and `REDIS_URI=redis://redis:6379`.
- The frontend Docker image is built with `VITE_BACKEND_URL=http://localhost:3000`.

## Running Checks and Tests

Frontend checks:

```bash
cd frontend
npm run lint
npm run build
```

Backend checks:

```bash
cd backend
npm start
```

Testing status:

- The frontend has lint and build scripts available.
- The backend `npm test` script is still a placeholder and does not run automated tests yet.
- There is currently no repository-wide automated test suite.

## Brief Explanation of the Evaluation

The file [justfication.md](/c:/Users/Akshat%20Agarwal/Desktop/Akshat-GRP-1477/justfication.md) contains a short comparative evaluation between two responses labeled GPT and Gemini.

In that evaluation:

- both responses are scored across correctness, relevance, completeness, style, helpfulness, creativity, and coherence
- GPT is judged as the better overall response because it scores better on completeness, helpfulness, structure, and coherence
- Gemini is noted as slightly stronger in correctness and creativity
- the final verdict says GPT is "slightly better"

For the original implementation requirements and scope of the project, see [prompt.md](/c:/Users/Akshat%20Agarwal/Desktop/Akshat-GRP-1477/prompt.md).
