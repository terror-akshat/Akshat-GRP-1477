You are developing a hospital management system to reduce the waiting time of patient and manual error.

## Context and Role

As a MERN stack developer working of smart hospital OPD management system, you are responsible for designing and implementing end to end OPD system, with 3 layered architectures like Frontend, Backend, Database.  The system must have all the core operation of hospital OPD work flow which help reducing waiting time and manual error.

## Recommended Tech Stack

### Frontend

- React.js for UI
- Material UI for making segments
- Motion for animation
- Axios
- React router Dom

### Backend

- Node.js
- Express.js
- JWT for authentication and authorization
- bcrypt
- Express Rate limiter
- REST api
- Role based Authentication (RBAC)

### Database

- Mongo DB atlas

### File Upload

- Cloudinary

### Microservice

- Docker
- Docker-compose

## Requirements

- The system includes all these thing as given below.
- Login/Signup (role-based doctor, staff)
- Core requirements like

1. Upload OPD/IPD documents in image or PDF format using Cloudinary.
2. Bed management system
3. Patient profile history
4. Curd operation for bed and ward management
5. Billing system
6. Patient registration form

## Inputs

### Signup for staff and doctor

- username
- Password
- Gmail
- Contact number.

### Login for staff and doctor

- email
- password.

### Patient registration form

- Patient name
- Contact number
- Email (optional)
- Profile photo

## Database design

### Doctor Collection

- Doctor_id
- name
- contact_number
- email

### Staff Collection

- staff_id
- doctor_id
- Name
- contact_number
- email

### Patient Collection

- Patient_id
- Doctor_id
- Name
- Email (optional)
- Contact
- Address
- OPD_file_id
- IPD_file_id

### Ward Collection

- Ward_id
- Ward_no
- Bed_count
- Patient_id : List
- Status

### Billing Collections

- patientId,
- doctorId,
- amount,
- paymentMode,
- paymentStatus,
- invoiceNumber,
- services: [],
- createdAt

## Pages for frontend

- Login
- Signup
- Patient registration form
- Dashboard
- Doctor profile
- Staff profile
- Billing page
- Patient history
- Queue system page
- Ward management

## Api for Backend

### Authentication/authorization

- POST api/auth/login
- POST api/auth/singup
- POST api/auth/logout

### Patient API

- GET api/patients
- POST api/patients
- PUT /api/patients/:id
- DELETE /api/patients/:id
- GET /api/patients/:id

## Additional Feature

### Rest api

- Token management System
- Middleware Setup
- Becrypt for password

### Dashboard

- Patient count
- Revenue system for patient counts as per weeks, months, year
- Occupied vs available beds

### Search and filter

- Use search and filter option for filtering the patient data.
- Use phone number, name to filter out the patient data.
- Based upon the payment status.

## Security Problems

- CORS setup
- Mongo sanitizes
- XSS protection
- API validation
- Request validation

## Docker Implementation

- Make a Docker file for Frontend and Backend using image node:18 or latest, expose port 3000 for frontend and 5000 for backend,
- Integrate docker-compose file for integrating these services named as frontend, backend, database which is connected with same network as a bridge for no conflict.
- Add a dockerignore file for stopping extra file to be pushed to the production.

## Efficiency

- The system must handle 1000+ patient data without crashing, the backend system must be scalable enough so that handle multiple hospital at a same time. Use Rate limiting for handling Ddos attack.
- Optimizing the system for getting low latency.
- Implement Docker for reduce the system dependable, it can run in any OS without fails to make consistency in environment.

## Error handling

- The input field have validation like, email is unique also user regex, password should be more then 6 letter and one upper case is mandatory.
- Login for add validation in user field and pass the credential to the database check if the credential if true so token is generated and saved in local storage for session management else pop a message with valid reason for fail.
- Use try catch for every api handling to grace fully shut the program if occurred.
- Add logs to trace the actual error stack path.

## Documentation.

- Add a proper Readme.md which help to know the about the project,
- Add a proper implementation.md which help to know about the flow and core modules of the project
- Add a proper docker.md file which help to know about the docker and docker-compose which all services.

## Final

Developed this system with proper code setup for all requirements, pages.
