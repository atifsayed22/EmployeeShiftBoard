# API Documentation

Base URL: `http://localhost:5000/api`

---

## 🔐 Authentication

### Login
**POST** `/login`

Get a JWT token to access protected routes.

```json
// Request
{
  "email": "hire-me@anshumat.org",
  "password": "HireMe@2025!"
}

// Response
{
  "token": "eyJhbGciOiJIUzI1NiIsInR...",
  "user": {
    "_id": "675...",
    "name": "Admin User",
    "email": "hire-me@anshumat.org",
    "role": "admin"
  }
}
```

---

## 👥 Employees

### Get All Employees
**GET** `/employees`

**Headers:** `Authorization: Bearer <token>`

```json
// Response
[
  {
    "_id": "675...",
    "name": "John Doe",
    "employeeCode": "EMP101",
    "department": "Engineering",
    "role": "user"
  }
]
```

---

## 📅 Shifts

### Create Shift
**POST** `/shifts` (Admin only)

**Headers:** `Authorization: Bearer <token>`

```json
// Request
{
  "employeeId": "675...",
  "date": "2025-12-15",
  "startTime": "09:00",
  "endTime": "17:00"
}

// Success Response
{
  "_id": "676...",
  "employee": "675...",
  "date": "2025-12-15",
  "startAt": "2025-12-15T09:00:00.000Z",
  "endAt": "2025-12-15T17:00:00.000Z"
}

// Error Examples
{ "message": "Minimum shift is 4 hours" }
{ "message": "Shift overlaps existing shift" }
```

**Rules:**
- Shift must be at least 4 hours
- Cannot overlap with existing shifts for same employee

### Get Shifts
**GET** `/shifts`

**Headers:** `Authorization: Bearer <token>`

**Query Params (optional):**
- `date` - Filter by date (YYYY-MM-DD)
- `employee` - Filter by employee ID (Admin only)

```json
// Response
[
  {
    "_id": "676...",
    "employee": {
      "_id": "675...",
      "name": "John Doe"
    },
    "date": "2025-12-15",
    "startAt": "2025-12-15T09:00:00.000Z",
    "endAt": "2025-12-15T17:00:00.000Z"
  }
]
```

**Note:** Normal users automatically see only their own shifts.

### Delete Shift
**DELETE** `/shifts/:id` (Admin only)

**Headers:** `Authorization: Bearer <token>`

```json
// Response
{ "message": "Shift deleted" }
```

---

## Error Responses

All errors return:
```json
{
  "message": "Error description here"
}
```

Common status codes:
- `400` - Bad request / Validation error
- `401` - Unauthorized (no token or invalid token)
- `403` - Forbidden (not admin)
- `404` - Not found
- `409` - Conflict (overlapping shift)
- `500` - Server error
