# Employee Shift Board

A full-stack MERN app for managing employee shifts with role-based access.

## Tech Stack
- **Backend:** Node.js, Express, MongoDB, JWT
- **Frontend:** React (Vite), Custom CSS

## Features
- JWT authentication with admin/user roles
- Create, view, and delete shifts
- Business rules: 4-hour minimum, no overlaps
- Users see only their shifts, admins see all

## Demo Accounts

**Admin:**
- Email: `hire-me@anshumat.org`
- Password: `HireMe@2025!`

**Employee:**
- Email: `john.doe@company.com`
- Password: `Password@123`

## Quick Start

1. **Install dependencies:**
```bash
cd server && npm install
cd ../frontend/vite-project && npm install
```

2. **Setup environment variables** (see SETUP.md)

3. **Seed database:**
```bash
cd server
npm run seed
```

4. **Start servers:**
```bash
# Terminal 1 - Backend
cd server
npm start

# Terminal 2 - Frontend
cd frontend/vite-project
npm run dev
```

5. **Open browser:** http://localhost:5173

6. **Login** with admin credentials above

## Project Structure
```
server/               # Backend
├── controllers/      # Route handlers
├── services/        # Business logic
├── models/          # MongoDB schemas
├── routes/          # API routes
├── middlewares/     # Auth & role checks
└── config/          # DB connection

frontend/vite-project/
├── src/
│   ├── pages/       # Login, Dashboard
│   ├── components/  # Protected routes
│   ├── context/     # Auth state
│   └── api/         # Axios setup
```

## Documentation
- **API Docs:** See `API_DOCS.md`
- **Setup Guide:** See `SETUP.md`
- **Postman:** Import `Employee_Shift_Board.postman_collection.json`

## Assignment
This project is for the **Employee Shift Board** full-stack developer assignment.
