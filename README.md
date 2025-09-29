# 📝 Todo List Backend API

## 🚀 Description
This is a **complete backend system for a Todo List application** built with **Node.js, Express, MongoDB, and JWT authentication**.

### ✨ Features:
- 🔐 **User Authentication** - Registration & Login with JWT
- 📝 **Full CRUD Operations** - Create, Read, Update, Delete todos
- 👥 **Todo Assignment** - Assign todos to other users
- 🔒 **Access Control** - Only creators can edit/delete, assigned users can view
- 🔍 **Search & Filter** - Pagination, status filtering, and text search
- 🔔 **Notifications** - Console notifications when users are assigned todos

---

## 🛠️ Tech Stack
- **Backend:** Node.js with Express.js
- **Database:** MongoDB with Mongoose
- **Authentication:** JWT (JSON Web Tokens)
- **Password Hashing:** bcryptjs
- **Environment Config:** dotenv

---

## 📦 Installation & Setup

### 1. Clone the repository
```bash
git clone https://github.com/Alokjha2004/Assignment.git
cd Assignment
```

### 2. Install dependencies
```bash
npm install
```

### 3. Environment Configuration
Create a `.env` file in the root directory:
```env
PORT=4000
MONGO_URI= "your_mongodb_connection"
JWT_SECRET=your_super_secret_jwt_key_here
```

### 4. Start the server
```bash
npm start
```

The server will run on `http://localhost:4000`

---

## 📁 Project Structure
```
Assignment/
├── controllers/           # Business logic
│   ├── auth.controller.js    # Authentication logic
│   └── todo.controller.js    # Todo operations
├── middleware/           # Custom middleware
│   └── auth.middleware.js    # JWT verification
├── models/              # Database schemas
│   ├── user.model.js        # User schema
│   └── todo.model.js        # Todo schema
├── routes/              # API routes
│   ├── auth.route.js        # Auth endpoints
│   └── todo.route.js        # Todo endpoints
├── lib/                 # Utilities
│   └── db.js               # Database connection
├── index.js            # Entry point
├── package.json        # Dependencies
└── .env               # Environment variables
```

---

## 🛣️ API Endpoints

### 🔐 Authentication Routes
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/signup` | Register new user |
| POST | `/api/auth/login` | User login |

### 📝 Todo Routes (Protected)
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/todos` | Get all todos (with filters) |
| POST | `/api/todos` | Create new todo |
| GET | `/api/todos/:id` | Get specific todo |
| PATCH | `/api/todos/:id` | Update todo |
| DELETE | `/api/todos/:id` | Delete todo |


---

## 📋 Data Models

### User Model
```javascript
{
  name: String (required),
  email: String (required, unique),
  password: String (required, hashed)
}
```

### Todo Model
```javascript
{
  title: String (required),
  description: String,
  status: String (pending/completed/in-progress),
  dueDate: Date,
  createdBy: ObjectId (User reference),
  assignedTo: ObjectId (User reference),
  createdAt: Date,
  updatedAt: Date
}
```

---


## 👨‍💻 Author
**Alok Jha** - [GitHub](https://github.com/Alokjha2004)
