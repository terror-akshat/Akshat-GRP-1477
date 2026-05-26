## Prompt

You are developing a Hospital OPD System to reduce patient waiting time, improve hospital core operations efficiency, and minimize manual errors in daily hospital operations.

--- 

## Objective

The objective of this project is to develop a Hostpital OPD System that helps hospitals reduce patient waiting time, improve core operations, and minimize manual errors. The system will digitize core  hospital operation like patient registration, queue management, billing, ward and bed management, and patient record handling through a secure and user-friendly platform so that every hospital can use the system properly.
The project is built using the MERN stack to provide a fast and scalable solution for managing hospital OPD/IPD workflows.

## Context and Role

As a MERN stack developer working on a smart hospital OPD management system, you are responsible for designing and implementing end to end OPD system, with 3 layered architectures like Frontend, Backend, Database. The system must have all the core operation of hospital OPD work flow which help reducing waiting time and manual error.

## Recommended Tech Stack

# Frontend
- React.js for UI
- building reusable UI components
- Motion for animation
- Axios for connecting backend and frontend
- React router Dom for routing 

# Backend
- Node.js
- Express.js
- JWT for authentication and authorization
- bcrypt for password identification
- Express Rate limiter
- REST API for data manupulation 
- Role based Authentication (RBAC)

# Database
- Mongo DB atlas

# File Upload
- Cloudinary

# DevOps/Development
- Docker
- Docker-compose

---

## Requirements
1. Authentication & Authorization

- Roles
```
- master
- staff
```

- Features

```
- Singup
- Login
- Logout
- Jwt token management
- Protected route
```

2. OPD/IPD Management

- Patient management
```
- patient registration
- patient profile
- patient history tracking
- search and filter
- upload OPD/IPD Document(image/pdf)

- Ward & Bed Management

```
- Create Ward
- Update Ward
- Delete Ward
- Bed Allocation
- Occupied vs Available Bed Tracking

- Billing System

```
- Generate Invoice
- Payment Status Tracking
- Payment Mode
- Service-based Billing
```

## Frontend Pages

1. Login
2. Signup
3. Patient registration form
4. Dashboard
5. Doctor profile
6. Staff profile
7. Billing page
8. Patient history
9. Queue system page
10. Ward management
11. Error/404 page

## Inputs/Output Validations

1 Signup
Fields
- username
- Password
- Contact number.
Rules
- Password must contain at least 6 characters.
- Contact number validation using regex.

2 Login
- Validate the credential username and password.
- Generate the token and stored into local storage for session management.
- Return meaningful error response and proper HTTP status codes if authentication fails.

3 Patient registration field
- Patient name
- Contact number
- Address
- Email (optional)
- Profile photo

## Database design

Doctor Collection
- Doctor_id
- name
- addresss
- contact_number
- email

Staff Collection
- staff_id
- doctor_id
- Name
- addresss
- contact_number
- email

Patient Collection
- Patient_id
- Doctor_id
- Name
- Email (optional)
- Contact
- Address
- OPD_file_id
- IPD_file_id

Ward Collection
- Ward_id
- Ward_no
- Bed_count
- Patient_id : List
- Status

Billing Collections
- patientId,
- doctorId,
- amount,
- paymentMode,
- paymentStatus,
- invoiceNumber,
- services: [],
- createdAt

## Rest Api Requirements

Rest api is used for controlling the data and connectivity for fronend and backend

# Authentication/authorization
- POST api/auth/login
- POST api/auth/singup
- POST api/auth/logout

# Patient API
- GET api/patients
- POST api/patients
- PUT /api/patients/:id
- DELETE /api/patients/:id
- GET /api/patients/:id

# Ward Api
- GET api/ward
- GET api/ward/:patient_id

# Security Problems
- CORS setup
- Mongo sanitizes
- XSS protection
- API validation
- Request validation

## Docker Implementation

- Make a Docker file for Frontend and Backend using image node:18 or latest, expose port 3000 for frontend and 5000 for backend,
- Integrate docker-compose file for integrating these services named as frontend, backend, database which is connected with same network as a bridge for no conflict.
- Add a .dockerignore file for stopping extra file to be pushed to the production.

## Performance & Scalability

- The system must handle 1000+ patient data without crashing; the backend system must be scalable enough so that handle multiple hospital at a same time. Use Rate limiting for handling Ddos attack.
- Optimizing the system for getting low latency.
- Implement Docker for reduce the system dependable, it can run in any OS without fails to make consistency in environment.
- Use MongoDB indexing for faster search
- Use lazy loading in frontend

## Error handling

- Use centralized error handling middleware
- Use try-catch blocks in all API controllers
- Return meaningful HTTP status codes
- Add logging for debugging and error tracing
- Handle validation and database errors gracefully
{
"success": false,
"message": "Invalid credentials"
}

## Documentation

- Add a proper Readme.md which help to know the about the project,
- Add a proper implementation.md which help to know about the flow and core modules of the project
- Add a proper docker.md file which help to know about the docker and docker-compose which all services.

## Final Deliverables

Develop the complete system with:
- Proper folder structure
- Clean and reusable code
- Responsive frontend
- RESTful backend APIs
- Secure authentication
- Dockerized deployment
- Error handling
- Validation
- Documentation
- Production-ready architecture