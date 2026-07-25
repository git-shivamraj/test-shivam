# Hello User - Basic MERN Web Application

A clean, basic **MERN (MongoDB, Express, React, Node.js)** greeting website where users can enter their name and submit custom greetings.

---

##  Project Structure

```
test-project/
├── backend/
│   ├── config/db.js          # MongoDB connection
│   ├── models/User.js        # User model (name, message, timestamp)
│   ├── routes/userRoutes.js  # Express routes (/api/users)
│   ├── server.js             # Express server
│   ├── .env.example          # Backend environment variables template
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── components/       # Header, UserForm, and UserList components
│   │   ├── App.jsx           # Main React App component
│   │   ├── index.css        
│   │   └── main.jsx
│   ├── .env.example          # Frontend environment variables template
│   ├── index.html
│   └── package.json
│
└── README.md
```

---

## How to Run the Project

### 1. Start MongoDB
Ensure MongoDB is running locally (e.g. `docker run -d -p 27017:27017 mongo` or local MongoDB service).

### 2. Run Backend API
```bash
cd backend
npm install
npm run dev
```
> Running on `http://localhost:5000`

### 3. Run Frontend Web App
Open a new terminal window:
```bash
cd frontend
npm install
npm run dev
```
> Running on `http://localhost:5173`

---

##  API Endpoints

- `GET /api/users`: Fetch all user greetings
- `POST /api/users`: Create a new user greeting (`{ "name": "Alex", "message": "Hello!" }`)
- `DELETE /api/users/:id`: Delete a user greeting by ID
- `GET /api/health`: Check server health status
