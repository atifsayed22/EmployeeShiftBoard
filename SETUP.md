# Setup Guide

## Prerequisites
- Node.js (v16+)
- MongoDB (local or Atlas)

## Step-by-Step Setup

### 1. Install Dependencies

```bash
# Backend
cd server
npm install

# Frontend
cd ../frontend/vite-project
npm install
```

### 2. Environment Variables

**Create `server/.env`:**
```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/shift-board
JWT_SECRET=your_secret_key_here
```

**Create `frontend/vite-project/.env`:**
```env
VITE_API_URL=http://localhost:5000/api
```

### 3. Seed Database

```bash
cd server
npm run seed
```

This creates:
- Admin: `hire-me@anshumat.org` / `HireMe@2025!`
- Employee: `john.doe@company.com` / `Password@123`

### 4. Start Servers

**Terminal 1 - Backend:**
```bash
cd server
npm start
```
Backend runs on: http://localhost:5000

**Terminal 2 - Frontend:**
```bash
cd frontend/vite-project
npm run dev
```
Frontend runs on: http://localhost:5173

### 5. Test It

1. Open http://localhost:5173
2. Login with: `hire-me@anshumat.org` / `HireMe@2025!`
3. Create a shift (must be 4+ hours)
4. View shifts in the table

## Testing Business Rules

### Test 1: Minimum 4 Hours
- Try creating a shift from 9:00 AM to 11:00 AM
- Should fail: "Minimum shift is 4 hours"

### Test 2: No Overlaps
- Create shift: 9:00 AM to 5:00 PM ✅
- Try creating: 2:00 PM to 7:00 PM
- Should fail: "Shift overlaps existing shift"

### Test 3: Role Access
- Login as admin → See all shifts
- Login as employee → See only their shifts

## Postman Testing

1. Import `Employee_Shift_Board.postman_collection.json`
2. Run "Login - Admin" (saves token automatically)
3. Get employee ID from "Get All Employees"
4. Update `employeeId` variable in collection
5. Test all endpoints

## Troubleshooting

**MongoDB not running?**
- Start MongoDB: `mongod`
- Or use MongoDB Atlas connection string

**Port already in use?**
- Change `PORT` in `server/.env`
- Update `VITE_API_URL` in frontend `.env`

**CORS errors?**
- Backend already configured for localhost:5173
- If using different port, update `server/app.js`

## Ready to Submit

✅ All features working  
✅ Business rules validated  
✅ Demo credentials ready  
✅ Documentation complete  

**Assignment Name:** Employee Shift Board
