# NoteNest – Personal Notes Management App

NoteNest is a simple full-stack notes management application built using React and Node.js. It allows users to securely create, view, edit, and delete their personal notes.

Each user's notes are associated with their account, ensuring that users can only access and manage their own notes.

## Features

- **User Authentication:** Sign up and log in using email and password.
- **Password Security:** Passwords are hashed using bcrypt before being stored.
- **JWT Authentication:** Secure API endpoints using JSON Web Tokens.
- **Create Notes:** Create personal notes with a title and content.
- **View Notes:** View all notes belonging to the logged-in user.
- **Edit Notes:** Update existing notes.
- **Delete Notes:** Delete personal notes.
- **User Data Isolation:** Users cannot access or modify notes belonging to other users.
- **Input Validation:** Basic validation for API requests.
- **Error Handling:** Handle authentication, validation, and server errors.

## Tech Stack

**Frontend**
- React.js
- Vite
- Bootstrap
- Axios
- React Router DOM

**Backend**
- Node.js
- Express.js
- JWT (jsonwebtoken)
- bcryptjs
- Mongoose

**Database**
- MongoDB Atlas

## Project Structure

```text
NoteNest/
│
├── backend/
│   ├── config/
│   │   └── db.js
│   │
│   ├── controllers/
│   │   ├── authController.js
│   │   └── noteController.js
│   │
│   ├── middleware/
│   │   ├── authMiddleware.js
│   │   └── errorMiddleware.js
│   │
│   ├── models/
│   │   ├── User.js
│   │   └── Note.js
│   │
│   ├── routes/
│   │   ├── authRoutes.js
│   │   └── noteRoutes.js
│   │
│   ├── .env
│   ├── .gitignore
│   ├── server.js
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx
│   │   │   ├── NoteCard.jsx
│   │   │   └── ProtectedRoute.jsx
│   │   │
│   │   ├── context/
│   │   │   └── AuthContext.jsx
│   │   │
│   │   ├── pages/
│   │   │   ├── Login.jsx
│   │   │   ├── Signup.jsx
│   │   │   └── Dashboard.jsx
│   │   │
│   │   ├── services/
│   │   │   └── api.js
│   │   │
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   │
│   ├── .env
│   └── package.json
│
└── README.md
```

## Prerequisites

Make sure you have the following installed:

- Node.js (v18 or above)
- npm
- MongoDB Atlas account
- Git (optional)

## Installation and Setup

### 1. Clone the repository

```bash
git clone <repository-url>
cd NoteNest
```

If you already have the project locally, simply open its root directory in the terminal.

### 2. Backend Setup

Navigate to the backend directory:

```bash
cd backend
```

Install dependencies:

```bash
npm install
```

Create a `.env` file inside the `backend` directory:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

**MongoDB Configuration:**

1. Create a free cluster on MongoDB Atlas.
2. Create a database user with a username and password.
3. Configure Network Access to allow your development machine's IP.
4. Get the MongoDB connection string from Connect → Drivers.
5. Replace the placeholder in `MONGO_URI` with your actual connection string.

Make sure special characters in your database password are URL-encoded.

Start the backend server:

```bash
npm run dev
```

The backend will run at:

```text
http://localhost:5000
```

### 3. Frontend Setup

Open another terminal and navigate to the frontend directory:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Create a `.env` file inside the `frontend` directory:

```env
VITE_API_URL=http://localhost:5000/api
```

Start the React development server:

```bash
npm run dev
```

The frontend will run at:

```text
http://localhost:5173
```

### 4. Run the Application

Both servers must be running simultaneously.

| Service | URL |
|---|---|
| React Frontend | http://localhost:5173 |
| Node.js Backend | http://localhost:5000 |

Open the frontend URL in your browser to start using NoteNest.

## API Endpoints

All endpoints are prefixed with `/api`.

### Authentication APIs

| Method | Endpoint | Description |
|---|---|---|
| POST | `/auth/signup` | Register a new user |
| POST | `/auth/login` | Authenticate an existing user |

### Notes APIs

All notes endpoints require a valid JWT token in the Authorization header.

```text
Authorization: Bearer <JWT_TOKEN>
```

| Method | Endpoint | Description |
|---|---|---|
| GET | `/notes` | Get all notes of the logged-in user |
| POST | `/notes` | Create a new note |
| PUT | `/notes/:id` | Update an existing note |
| DELETE | `/notes/:id` | Delete a note |

### Example API Requests

**Register a user**

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

**Login**

```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

**Create a note**

```json
{
  "title": "My First Note",
  "content": "This is my first personal note."
}
```

## Authentication and Data Security

- User passwords are hashed using bcryptjs before being stored in MongoDB.
- JWT tokens are generated after successful registration and login.
- Protected routes verify JWT tokens before allowing access.
- Each note contains an `owner` field referencing its creator's user ID.
- The backend uses the authenticated user's ID from the verified JWT to filter note queries.
- Update and delete operations check both the note ID and its owner ID.

This ensures that users cannot access, update, or delete notes belonging to other users, even if they know another note's ID.

## Error Handling

The application handles common errors, including:

- Missing or invalid input fields.
- Duplicate email registration.
- Incorrect login credentials.
- Missing, invalid, or expired JWT tokens.
- Notes that do not exist or do not belong to the requesting user.
- Database validation and server errors.

## Future Improvements

- Search and filter notes.
- Add note categories and tags.
- Rich-text note editor.
- Password reset functionality.
- Secure HttpOnly cookie-based authentication.
- Pagination for notes.

## License

This project is developed for learning and educational purposes.