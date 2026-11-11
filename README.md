# 🎓 Schooly - School Management System

A comprehensive school management system with separate portals for administrators, teachers, and students. Built with modern web technologies and a focus on clean design and user experience.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Node](https://img.shields.io/badge/node-%3E%3D18.0.0-brightgreen.svg)
![PostgreSQL](https://img.shields.io/badge/postgresql-16-blue.svg)

## 📋 Overview

Schooly is a full-stack school management platform that provides:

- **Admin Portal**: Manage students, teachers, classes, subjects, grades, and academic terms
- **Teacher Portal**: View assigned classes, manage student grades, track performance
- **Student Portal**: View grades, analyze performance, track academic progress

## 🏗️ Architecture

```
schooly/
├── admin/          # Admin Portal (Next.js 16)
├── teacher/        # Teacher Portal (Next.js 16)
├── student/        # Student Portal (Next.js 16)
└── backend/        # REST API (Express.js + PostgreSQL)
```

## 🚀 Tech Stack

### Frontend
- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **UI Components**: Custom component library
- **Icons**: Lucide React

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js 5
- **Database**: PostgreSQL
- **ORM**: Drizzle ORM
- **Authentication**: JWT
- **Validation**: Express Validator

## 🎨 Design System

All portals share a consistent dark theme:
- Primary Color: `#C6FF4D` (Lime Green)
- Background: `#0B0D0B` (Dark)
- Cards: `#171C17`
- Text: `#F5F7F2`

## 📦 Installation

### Prerequisites
- Node.js >= 18.0.0
- PostgreSQL >= 14
- npm or yarn

### 1. Clone the Repository
```bash
git clone https://github.com/abdulhakimfedlu/Schooly-Project.git
cd Schooly-Project
```

### 2. Backend Setup

```bash
cd backend
npm install
```

Create `.env` file:
```env
PORT=5000
NODE_ENV=development

DB_USER=postgres
DB_PASSWORD=your_password
DB_HOST=localhost
DB_PORT=5432
DB_NAME=Schooly

DATABASE_URL=postgresql://postgres:your_password@localhost:5432/Schooly

JWT_SECRET=your_jwt_secret_key
JWT_EXPIRES_IN=7d

CLIENT_URL=http://localhost:3000
```

Create the database:
```sql
CREATE DATABASE "Schooly";
```

Push schema to database:
```bash
npm run db:push
```

Start the backend:
```bash
npm run dev
```

### 3. Admin Portal Setup

```bash
cd admin
npm install
```

Create `.env.local`:
```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api/v1
```

Start the dev server:
```bash
npm run dev
```

Access at: `http://localhost:3000`

### 4. Teacher Portal Setup

```bash
cd teacher
npm install
```

Create `.env.local`:
```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api/v1
```

Start the dev server:
```bash
npm run dev
```

Access at: `http://localhost:3001` (change port if needed)

### 5. Student Portal Setup

```bash
cd student
npm install
```

Create `.env.local`:
```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api/v1
```

Start the dev server:
```bash
npm run dev
```

Access at: `http://localhost:3002` (change port if needed)

## 🗂️ Database Schema

### Core Tables
- **users**: Authentication and base user info
- **students**: Student-specific data
- **teachers**: Teacher-specific data
- **classes**: Class/section information
- **subjects**: Course subjects
- **academic_terms**: Academic calendar
- **grades**: Student grade records
- **teacher_assignments**: Teacher-subject-class mappings

## 🔐 API Endpoints

### Authentication
- `POST /api/v1/auth/register` - Register new user
- `POST /api/v1/auth/login` - User login
- `GET /api/v1/auth/me` - Get current user

### Students (Admin only)
- `GET /api/v1/students` - List all students
- `POST /api/v1/students` - Create student
- `GET /api/v1/students/:id` - Get student details
- `PATCH /api/v1/students/:id` - Update student
- `DELETE /api/v1/students/:id` - Delete student

### Teachers (Admin only)
- `GET /api/v1/teachers` - List all teachers
- `POST /api/v1/teachers` - Create teacher
- `GET /api/v1/teachers/:id` - Get teacher details
- `PATCH /api/v1/teachers/:id` - Update teacher

### Classes (Admin only)
- `GET /api/v1/classes` - List all classes
- `POST /api/v1/classes` - Create class
- `GET /api/v1/classes/:id` - Get class details

### Subjects (Admin only)
- `GET /api/v1/subjects` - List all subjects
- `POST /api/v1/subjects` - Create subject

### Academic Terms (Admin only)
- `GET /api/v1/academic-terms` - List all terms
- `POST /api/v1/academic-terms` - Create term
- `PATCH /api/v1/academic-terms/:id` - Update term

### Grades
- `GET /api/v1/grades` - Get grades (filtered by role)
- `POST /api/v1/grades` - Submit grade (Teacher/Admin)
- `GET /api/v1/grades/:id` - Get grade details

## 👥 User Roles

### Admin
- Full system access
- Manage all users, classes, subjects
- View all grades and analytics
- Configure academic terms

### Teacher
- View assigned classes and students
- Submit and update grades
- View class performance analytics

### Student
- View personal grades
- Access performance analytics
- View enrolled subjects
- Track academic history

## 🔒 Security

- ✅ Environment variables for credentials
- ✅ `.gitignore` configured to exclude `.env` files
- ✅ JWT-based authentication
- ✅ Password hashing with bcrypt
- ✅ Role-based access control
- ✅ Input validation on all endpoints

## 🚧 Current Status

### ✅ Completed
- Database schema and models
- Backend API with all CRUD operations
- Authentication system
- All three frontend portals (UI)
- Empty states and loading indicators
- API service layer in frontends

### 🔄 In Progress
- Frontend-backend integration
- Real-time data fetching
- Form submissions
- Error handling

### 📝 Upcoming
- Login/authentication pages
- Route protection
- File uploads (profile pictures)
- Email notifications
- Reports and exports (PDF)
- Dashboard analytics charts

## 🛠️ Development

### Backend Commands
```bash
npm run dev          # Start with watch mode
npm start            # Start production
npm run db:generate  # Generate migrations
npm run db:push      # Push schema to DB
npm run db:studio    # Open Drizzle Studio
```

### Frontend Commands (all portals)
```bash
npm run dev          # Start dev server
npm run build        # Build for production
npm start            # Start production server
npm run lint         # Run ESLint
```

## 📄 License

MIT License - feel free to use this project for learning or commercial purposes.

## 👨‍💻 Author

**Abdulhakim Fedlu**
- GitHub: [@abdulhakimfedlu](https://github.com/abdulhakimfedlu)

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

## 📞 Support

For support, create an issue in the GitHub repository.

---

**Note**: This is an active development project. The system is functional but integration between frontend and backend is ongoing. Check the repository for updates.
