You are developing a hospital management system to reduce the waiting time of patient and manual error. 

## Context and Role

As a MERN stack developer working of smart hospital OPD management system, you are responsible for designing and implementing end to end OPD system, with 3 layered architectures like Frontend, Backend, Database.  The system must have all the core operation of hospital OPD work flow which help reducing waiting time and manual error. 

## Recommended Tech Stack

### Frontend

â€¢	React.js for UI
â€¢	Material UI for making segments
â€¢	Motion for animation
â€¢	Axios
â€¢	React router Dom

### Backend 

â€¢	Node.js 
â€¢	Express.js
â€¢	JWT for authentication and authorization 
â€¢	bcrypt
â€¢	Express Rate limiter
â€¢	REST api
â€¢	Role based Authentication (RBAC)

### Database

â€¢	Mongo DB atlas

### File Upload 

â€¢	Cloudinary 

### Microservice

â€¢	Docker
â€¢	Docker-compose

## Requirements 

â€¢	The system includes all these thing as given below. 
â€¢	Login/Signup (role-based doctor, staff)
â€¢	Core requirements like

1.	Upload OPD/IPD documents in image or PDF format using Cloudinary.
2.	Bed management system 
3.	Patient profile history 
4.	Curd operation for bed and ward management
5.	Billing system
6.	Patient registration form

## Inputs

### Signup for staff and doctor

â€¢	username 
â€¢	Password
â€¢	Gmail 
â€¢	Contact number. 

### Login for staff and doctor 

â€¢	email 
â€¢	password.

### Patient registration form 

â€¢	Patient name
â€¢	Contact number
â€¢	Email (optional)
â€¢	Profile photo

## Database design

### Doctor Collection

â€¢	Doctor_id
â€¢	name
â€¢	contact_number
â€¢	email 

### Staff Collection 

â€¢	staff_id
â€¢	doctor_id
â€¢	Name
â€¢	contact_number
â€¢	email

### Patient Collection

â€¢	Patient_id
â€¢	Doctor_id
â€¢	Name
â€¢	Email (optional)
â€¢	Contact 
â€¢	Address
â€¢	OPD_file_id
â€¢	IPD_file_id

### Ward Collection

â€¢	Ward_id
â€¢	Ward_no
â€¢	Bed_count
â€¢	Patient_id : List
â€¢	Status

### Billing Collections 

â€¢	patientId,
doctorId,
â€¢	amount,
â€¢	paymentMode,
â€¢	paymentStatus,
â€¢	invoiceNumber,
â€¢	services: [],
â€¢	createdAt

## Pages for frontend

â€¢	Login 
â€¢	Signup
â€¢	Patient registration form
â€¢	Dashboard 
â€¢	Doctor profile 
â€¢	Staff profile
â€¢	Billing page
â€¢	Patient history 
â€¢	Queue system page
â€¢	Ward management 

## Api for Backend 

### Authentication/authorization 

â€¢	POST api/auth/login
â€¢	POST api/auth/singup
â€¢	POST api/auth/logout

### Patient API

â€¢	GET api/patients
â€¢	POST api/patients
â€¢	PUT /api/patients/:id
DELETE /api/patients/:id
GET /api/patients/:id

## Additional Feature 

### Rest api

â€¢	Token management System
â€¢	Middleware Setup 
â€¢	Becrypt for password 

### Dashboard 

â€¢	Patient count 
â€¢	Revenue system for patient counts as per weeks, months, year
â€¢	Occupied vs available beds

### Search and filter 

â€¢	Use search and filter option for filtering the patient data. 
â€¢	Use phone number, name to filter out the patient data. â€˜
â€¢	Based upon the payment status. 

## Security Problems

â€¢	CORS setup 
â€¢	Mongo sanitizes 
â€¢	XSS protection 
â€¢	API validation 
â€¢	Request validation

## Docker Implementation 

â€¢	Make a Docker file for Frontend and Backend using image node:18 or latest, expose port 3000 for frontend and 5000 for backend, 
â€¢	Integrate docker-compose file for integrating these services named as frontend, backend, database which is connected with same network as a bridge for no conflict. 
â€¢	Add a dockerignore file for stopping extra file to be pushed to the production. 

## Efficiency

â€¢	The system must handle 1000+ patient data without crashing, the backend system must be scalable enough so that handle multiple hospital at a same time. Use Rate limiting for handling Ddos attack. 
â€¢	Optimizing the system for getting low latency. 
â€¢	Implement Docker for reduce the system dependable, it can run in any OS without fails to make consistency in environment.

## Error handling 

â€¢	The input field have validation like, email is unique also user regex, password should be more then 6 letter and one upper case is mandatory. 
â€¢	Login for add validation in user field and pass the credential to the database check if the credential if true so token is generated and saved in local storage for session management else pop a message with valid reason for fail.
â€¢	Use try catch for every api handling to grace fully shut the program if occurred. 
â€¢	Add logs to trace the actual error stack path. 

## Documentation. 

â€¢	Add a proper Readme.md which help to know the about the project, 
â€¢	Add a proper implementation.md which help to know about the flow and core modules of the project
â€¢	Add a proper docker.md file which help to know about the docker and docker-compose which all services.

## Final 

Developed this system with proper code setup for all requirements, pages. 
