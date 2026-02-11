# Student Management System API

A RESTful API for managing student records and tasks, built with **Node.js**, **Express**, **TypeScript**, and **MongoDB**.

This project implements a system where an **Admin** can manage students and assign tasks, and **Students** can log in to view and complete their assigned tasks.

## Technologies

- **Node.js** & **Express** (Backend Framework)
- **TypeScript** (Type Safety)
- **MongoDB** & **Mongoose** (Database)
- **JWT** (Authentication - No sessions/cookies)
- **Bcrypt** (Password Hashing)

---

## Setup & Installation

### 1. Prerequisites
- Node.js (v14+)
- MongoDB (Local or Atlas URL)

### 2. Installation
```bash
# Clone the repository
git clone https://github.com/Harikrishnan-gm/student-management-system-api.git
cd student-management-system-api

# Install dependencies
npm install
```

### 3. Environment Variables
Create a `.env` file in the root directory:

```env
PORT=5000
MONGO_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/student-management
JWT_SECRET=your_secure_secret_key
```

### 4. Running the Server

```bash
# Development Mode (Auto-restart)
npm run dev

# Build & Start Production
npm run build
npm start
```
The server will start at: `http://localhost:5000`

---

## API Documentation

### Base URL (Local): `http://localhost:5000/api`


### 1. Authentication

#### Admin Login
- **Endpoint**: `POST /auth/admin/login`
- **Body**:
  ```json
  {
    "email": "admin@school.com",
    "password": "adminpassword"
  }
  ```
- **Response**:
  ```json
  {
    "_id": "651a...",
    "name": "Admin User",
    "email": "admin@school.com",
    "role": "admin",
    "token": "eyJhbGciOiJIUzI1Ni..."
  }
  ```

#### Student Login
- **Endpoint**: `POST /auth/student/login`
- **Body**:
  ```json
  {
    "email": "student@school.com",
    "password": "password123"
  }
  ```

---

### 2. Admin Panel (Requires Admin Token)
**Header**: `Authorization: Bearer <token>`

#### Add Student
- **Endpoint**: `POST /admin/add-student`
- **Body**:
  ```json
  {
    "name": "John Doe",
    "email": "john@school.com",
    "password": "password123",
    "department": "Computer Science"
  }
  ```
- **Response**:
  ```json
  {
    "_id": "651b...",
    "name": "John Doe",
    "email": "john@school.com",
    "role": "student"
  }
  ```

#### Assign Task
- **Endpoint**: `POST /admin/assign-task`
- **Body**:
  ```json
  {
    "title": "Complete Assignment 1",
    "description": "Solve all problems in chapter 1",
    "dueDate": "2026-12-31",
    "assignedTo": "651b..." // Student ID
  }
  ```

#### Get All Students
- **Endpoint**: `GET /admin/students`

#### Get All Tasks
- **Endpoint**: `GET /admin/tasks`

---

### 3. Student Interface (Requires Student Token)
**Header**: `Authorization: Bearer <token>`

#### Get My Tasks
- **Endpoint**: `GET /student/tasks`
- **Response**:
  ```json
  [
    {
      "_id": "651c...",
      "title": "Complete Assignment 1",
      "status": "pending",
      "dueDate": "2026-12-31T00:00:00.000Z"
    },
    {
      "_id": "651d...",
      "title": "Old Assignment",
      "status": "overdue", 
      "dueDate": "2023-01-01T00:00:00.000Z"
    }
  ]
  ```
  *Note: The system automatically updates tasks to `overdue` if the due date has passed.*

#### Update Task Status
- **Endpoint**: `PUT /student/tasks/:id/complete`
- **Response**:
  ```json
  {
    "_id": "651c...",
    "title": "Complete Assignment 1",
    "status": "completed"
  }
  ```

---

## Project Structure

```
src/
├── config/         # Database connection
├── controllers/    # API Logic (Admin, Student, Auth)
├── middlewares/    # Auth & Role verification
├── models/         # Mongoose Schemas (User, Task)
├── routes/         # API Routes
├── app.ts          # Express App Setup
└── server.ts       # Server Entry Point
```



