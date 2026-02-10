# 📚 Student Management System API

A RESTful API for managing student records, built with **TypeScript**, **Express.js**, and **MongoDB**.

---

## 🚀 Tech Stack

| Technology   | Purpose               |
| ------------ | --------------------- |
| TypeScript   | Type-safe development |
| Express.js   | Web framework         |
| MongoDB      | Database              |
| Mongoose     | ODM for MongoDB       |
| JWT          | Authentication        |
| bcrypt       | Password hashing      |
| dotenv       | Environment variables |

---

## 📁 Project Structure

```
Student-management-system-API/
├── src/
│   ├── config/         # Database configuration
│   ├── controllers/    # Request handlers
│   ├── middlewares/     # Auth & validation middleware
│   ├── models/         # Mongoose schemas
│   ├── routes/         # API route definitions
│   ├── utils/          # Helper utilities
│   ├── app.ts          # Express app setup
│   └── server.ts       # Server entry point
├── .gitignore
├── package.json
├── tsconfig.json
└── README.md
```

---

## ⚙️ Prerequisites

- [Node.js](https://nodejs.org/) (v18 or higher)
- [MongoDB](https://www.mongodb.com/) (local or Atlas)
- npm or yarn

---

## 🛠️ Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/Harikrishnan-gm/student-management-system-api.git
   cd Student-management-system-API
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up environment variables**

   Create a `.env` file inside the `src/` directory:

   ```env
   PORT=5000
   MONGO_URI=mongodb://localhost:27017/student_management
   JWT_SECRET=your_jwt_secret_key
   ```

4. **Run the server**

   ```bash
   npx ts-node-dev src/server.ts
   ```

   The server will start at `http://localhost:5000`

---

## 📡 API Endpoints

### Auth

| Method | Endpoint         | Description        |
| ------ | ---------------- | ------------------ |
| POST   | `/api/auth/register` | Register a new user |
| POST   | `/api/auth/login`    | Login & get token   |

### Students

| Method | Endpoint             | Description            |
| ------ | -------------------- | ---------------------- |
| GET    | `/api/students`      | Get all students       |
| GET    | `/api/students/:id`  | Get a student by ID    |
| POST   | `/api/students`      | Create a new student   |
| PUT    | `/api/students/:id`  | Update a student       |
| DELETE | `/api/students/:id`  | Delete a student       |

> **Note:** Protected routes require a valid JWT token in the `Authorization` header:
> `Authorization: Bearer <your_token>`

---

## 🔐 Environment Variables

| Variable     | Description                  | Example                                      |
| ------------ | ---------------------------- | -------------------------------------------- |
| `PORT`       | Server port                  | `5000`                                       |
| `MONGO_URI`  | MongoDB connection string    | `mongodb://localhost:27017/student_management` |
| `JWT_SECRET` | Secret key for JWT signing   | `my_super_secret_key`                        |

---

## 📜 Scripts

```bash
# Run in development mode
npx ts-node-dev src/server.ts

# Build for production
npx tsc

# Run production build
node dist/server.js
```

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/new-feature`)
3. Commit your changes (`git commit -m 'Add new feature'`)
4. Push to the branch (`git push origin feature/new-feature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the [ISC License](https://opensource.org/licenses/ISC).
