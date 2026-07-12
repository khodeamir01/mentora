# Mentora

A full-featured Learning Management System (LMS) built with **Node.js**, **Express.js**, **MongoDB**, **Mongoose**, and **EJS** following the MVC architecture.

Mentora provides a complete online learning platform where students can purchase courses, access lessons, read articles, communicate through tickets, and interact with educational content. The project focuses on implementing real-world backend concepts such as authentication, authorization, role-based access control, payment integration, and business logic.

---

## Features

### Authentication & Authorization

* Local Authentication
* Google OAuth 2.0 Login
* JWT Authentication (Access Token & Refresh Token)
* Refresh Token stored securely using Redis
* Password hashing with bcrypt
* CAPTCHA protection during login
* Role-Based Access Control (RBAC)

---

### User Roles

* Admin
* Teacher
* Author
* Student

Each role has its own dashboard and permissions.

---

### Course Management

* Create and manage courses
* Create course sessions
* Upload course thumbnails
* Upload lesson videos
* Premium & free lesson support
* Student enrollment after successful payment
* Course access based on enrollment
* Student count for each course

---

### Learning Experience

* Shopping Cart
* Zarinpal Payment Gateway
* Payment Verification
* Purchased course access
* Free lesson preview for guests and non-enrolled users

---

### Content Management

* Article Management
* Categories
* Tags
* Author-based publishing
* Dynamic course rating calculated from user reviews

---

### Comment System

* Add comments
* Reply to comments
* Delete comments
* Nested replies

---

### Ticket System

* User ticket management
* Automatic email notifications using Nodemailer

---

### User Profile

* Avatar upload
* Profile editing
* My Courses page

---

### Search & Navigation

* Course search
* Category filtering
* Pagination

---

### Validation & Error Handling

* Request validation using Yup
* Global Error Handler
* Payment Error Handling
* Validation Error Handling

---

### File Upload

* Image Upload
* Video Upload
* Multer Integration

---

## Tech Stack

### Backend

* Node.js
* Express.js
* MongoDB
* Mongoose

### Authentication

* Passport.js
* Google OAuth
* JWT
* bcrypt

### Storage

* Redis

### Validation

* Yup

### Upload

* Multer

### Payment

* Zarinpal

### Email

* Nodemailer

### Template Engine

* EJS

### Version Control

* Git
* GitHub

---

## Project Structure

```text
controllers/
middlewares/
models/
routes/
validators/
utils/
public/
views/
config/
```

Following the MVC architecture for better maintainability and scalability.

---

## Backend Concepts Implemented

* MVC Architecture
* RESTful Routing
* Authentication & Authorization
* Role-Based Access Control (RBAC)
* JWT Authentication
* Refresh Token Workflow
* Payment Integration
* File Upload
* Request Validation
* Error Handling
* Pagination
* Search & Filtering
* Business Logic Implementation

---

## Security

* Password hashing with bcrypt
* HTTP-only Cookies
* Google OAuth Authentication
* CAPTCHA Verification
* Request Validation using Yup
* Role-Based Authorization

---

## Future Improvements

* Docker Support
* Unit & Integration Testing
* API Documentation (Swagger)
* Rate Limiting
* Helmet
* Input Sanitization
* CI/CD Pipeline

---

## Installation

```bash
git clone https://github.com/your-username/mentora.git

cd mentora

npm install

npm run dev
```

---

## Environment Variables

Create a `.env` file and configure the following:

```env
PORT=

MONGO_URI=

ACCESS_TOKEN_SECRET_KEY=

REFRESH_TOKEN_SECRET_KEY=

ACCESS_TOKEN_EXPIRES_IN_SECONDS=

REFRESH_TOKEN_EXPIRES_IN_SECONDS=

GOOGLE_CLIENT_ID=

GOOGLE_CLIENT_SECRET=

REDIS_URL=

ZARINPAL_MERCHANT_ID=

EMAIL_USER=

EMAIL_PASS=
```

---

## License

This project was developed for educational purposes and portfolio demonstration.
