# Schooly Backend - Setup Guide

## ✅ What's Implemented

### Database Schema (PostgreSQL + Drizzle ORM)
- Users (with role-based access: ADMIN, TEACHER, STUDENT)
- Students
- Teachers
- Classes
- Subjects
- Teacher Assignments
- Academic Terms
- Grades

### Authentication & Authorization
- JWT-based authentication
- Password hashing with bcrypt
- Role-based access control
- Protected routes

### API Modules
- **Auth**: Login, register, get current user
- **Students**: Profile, grades
- **Teachers**: Profile, assigned classes, assigned subjects, class students
- **Classes**: Get all classes, get class by ID
- **Subjects**: Get all subjects, get subject by ID
- **Grades**: Create, update, fetch grades (with teacher authorization)
- **Academic Terms**: Get all terms, get active term

### Security Features
- Teacher can only manage grades for assigned classes/subjects
- Students can only view their own grades
- Input validation for grade marks
- Centralized error handling
- CORS configuration

## 📋 Setup Instructions

### 1. Fill Environment Variables

Edit `.env` file and add your credentials:

```env
PORT=5000
NODE_ENV=development

DATABASE_URL=postgresql://username:password@host:port/database

JWT_SECRET=your-very-secret-jwt-key-here
JWT_EXPIRES_IN=7d

CLIENT_URL=http://localhost:3000
```

### 2. Generate Migration Files

```bash
npm run db:generate
```

### 3. Apply Migrations to Database

```bash
npm run db:push
```

Or use migrate command:
```bash
npm run db:migrate
```

### 4. Start the Server

Development mode (with auto-restart):
```bash
npm run dev
```

Production mode:
```bash
npm start
```

Server will run on: `http://localhost:5000`

## 🔗 API Endpoints

### Authentication
- `POST /api/v1/auth/register` - Register new user
- `POST /api/v1/auth/login` - Login
- `GET /api/v1/auth/me` - Get current user (requires auth)

### Students (Requires STUDENT role)
- `GET /api/v1/students/me` - Get student profile
- `GET /api/v1/students/me/grades` - Get student grades
- `GET /api/v1/students/me/grades?termId=xxx` - Filter by term

### Teachers (Requires TEACHER role)
- `GET /api/v1/teachers/me` - Get teacher profile
- `GET /api/v1/teachers/me/classes` - Get assigned classes
- `GET /api/v1/teachers/me/subjects` - Get assigned subjects
- `GET /api/v1/teachers/classes/:classId/students` - Get class students

### Grades (Requires auth)
- `POST /api/v1/grades` - Create grade (TEACHER only)
- `PATCH /api/v1/grades/:gradeId` - Update grade (TEACHER only)
- `GET /api/v1/grades` - Get grades (filtered by role and query params)
- `GET /api/v1/grades?classId=xxx&subjectId=xxx&academicTermId=xxx`

### Classes, Subjects, Terms (Requires auth)
- `GET /api/v1/classes` - Get all classes
- `GET /api/v1/classes/:classId` - Get class by ID
- `GET /api/v1/subjects` - Get all subjects
- `GET /api/v1/subjects/:subjectId` - Get subject by ID
- `GET /api/v1/academic-terms` - Get all terms
- `GET /api/v1/academic-terms/active` - Get active term

## 🧪 Testing the API

### 1. Create a Test User

```bash
POST http://localhost:5000/api/v1/auth/register
Content-Type: application/json

{
  "fullName": "Test Teacher",
  "email": "teacher@test.com",
  "password": "password123",
  "role": "TEACHER"
}
```

### 2. Login

```bash
POST http://localhost:5000/api/v1/auth/login
Content-Type: application/json

{
  "email": "teacher@test.com",
  "password": "password123"
}
```

Response will include `token`. Use it in Authorization header:
```
Authorization: Bearer <your-token-here>
```

### 3. Test Protected Routes

```bash
GET http://localhost:5000/api/v1/auth/me
Authorization: Bearer <your-token>
```

## 📦 Dependencies Added

- `drizzle-orm` - Database ORM
- `postgres` - PostgreSQL client
- `bcryptjs` - Password hashing
- `jsonwebtoken` - JWT authentication
- `express-validator` - Input validation
- `drizzle-kit` - Database migrations (dev)

## 🔒 Security Notes

- Never commit `.env` file
- JWT_SECRET should be a strong random string
- Database credentials are never exposed in responses
- All grade operations validate teacher assignments
- Password hashes are never returned in API responses

## 🚀 Next Steps

1. Add seed data script for testing
2. Connect frontend applications
3. Add more validation rules
4. Implement admin module
5. Add API rate limiting
6. Add request logging
7. Add comprehensive error messages

## 🐛 Troubleshooting

**Database connection error:**
- Verify DATABASE_URL is correct
- Check PostgreSQL is running
- Verify database exists

**JWT errors:**
- Ensure JWT_SECRET is set
- Check token is being sent in Authorization header
- Verify token hasn't expired

**Permission errors:**
- Check user role matches required role
- Verify teacher assignments exist in database
- Check student/teacher records are properly linked to users
