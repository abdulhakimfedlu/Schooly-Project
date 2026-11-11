// User-related types (matching backend schema)
export interface User {
  id: string;
  fullName: string;
  email: string;
  role: 'ADMIN' | 'TEACHER' | 'STUDENT';
  isActive: boolean;
}

export interface Teacher {
  id: string;
  userId: string;
  employeeId: string;
  department: string;
  specialization: string | null;
  // Joined fields from user
  fullName?: string;
  email?: string;
  phone?: string;
  isActive?: boolean;
  // Backwards compatibility
  firstName?: string;
  lastName?: string;
  teacherId?: string;
  status?: 'Active' | 'Inactive';
}

export interface Class {
  id: string;
  name: string;
  code: string;
  gradeLevel: string;
  section: string;
  academicYear: string;
  // UI-specific fields
  studentCount?: number;
  assignedSubjects?: string[];
}

export interface Subject {
  id: string;
  name: string;
  code: string;
  description: string | null;
  creditHours: number;
  // UI-specific fields
  classId?: string;
  className?: string;
}

export interface Student {
  id: string;
  userId: string;
  studentId: string;
  classId: string | null;
  department: string | null;
  enrollmentDate: string;
  // Joined fields
  fullName?: string;
  email?: string;
  // Backwards compatibility
  firstName?: string;
  lastName?: string;
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
  // Backwards compatibility
  term?: string;
  examType?: 'Midterm' | 'Final' | 'Quiz' | 'Assignment';
  maxMarks?: number;
  status?: 'Passed' | 'Failed';
}
