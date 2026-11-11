export interface User {
  id: string;
  fullName: string;
  email: string;
  role: 'ADMIN' | 'TEACHER' | 'STUDENT';
  isActive: boolean;
}

export interface Student {
  id: string;
  userId: string;
  studentId: string;
  classId: string | null;
  department: string;
  enrollmentDate: string;
  fullName?: string;
  email?: string;
}

export interface Teacher {
  id: string;
  userId: string;
  employeeId: string;
  department: string;
  specialization: string;
  fullName?: string;
  email?: string;
}

export interface Class {
  id: string;
  name: string;
  code: string;
  gradeLevel: string;
  section: string;
  academicYear: string;
}

export interface Subject {
  id: string;
  name: string;
  code: string;
  description: string;
  creditHours: number;
}

export interface AcademicTerm {
  id: string;
  name: string;
  academicYear: string;
  startDate: string;
  endDate: string;
  isActive: boolean;
}

export interface Grade {
  id: string;
  studentId: string;
  subjectId: string;
  teacherId: string;
  classId: string;
  academicTermId: string;
  assessmentName: string;
  marksObtained: number;
  maximumMarks: number;
  percentage: number;
  letterGrade: string;
}

export interface DashboardStats {
  totalStudents: number;
  totalTeachers: number;
  totalClasses: number;
  totalSubjects: number;
}