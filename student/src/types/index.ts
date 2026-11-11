// User-related types (matching backend schema)
export interface User {
  id: string;
  fullName: string;
  email: string;
  role: 'ADMIN' | 'TEACHER' | 'STUDENT';
  isActive: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface Student {
  id: string;
  userId: string;
  studentId: string;
  classId: string | null;
  department: string | null;
  enrollmentDate: string;
  // Joined fields from user
  fullName?: string;
  email?: string;
  isActive?: boolean;
  // UI-specific fields
  className?: string;
  phone?: string;
  status?: 'Active' | 'Inactive' | 'Graduated' | 'Suspended';
}

export interface Subject {
  id: string;
  name: string;
  code: string;
  description: string | null;
  creditHours: number;
  // UI-specific fields
  teacher?: string;
  teacherName?: string;
  averageMarks?: number;
  letterGrade?: string;
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
  // Joined/UI fields
  subjectName?: string;
  subjectCode?: string;
  examType?: 'Midterm' | 'Final' | 'Quiz' | 'Assignment';
  examDate?: string;
  term?: string;
  academicYear?: string;
  status?: 'Passed' | 'Failed';
}

export interface AcademicTerm {
  id: string;
  name: string;
  academicYear: string;
  startDate: string;
  endDate: string;
  isActive: boolean;
  // UI-specific fields
  overallAverage?: number;
  totalSubjects?: number;
  passedSubjects?: number;
  failedSubjects?: number;
  status?: 'Current' | 'Completed' | 'Upcoming';
}

// Analytics types
export interface PerformanceData {
  month: string;
  average: number;
}

export interface SubjectPerformance {
  subject: string;
  average: number;
}

export interface GradeDistribution {
  grade: string;
  count: number;
}

export interface AcademicInsight {
  id: string;
  type: 'success' | 'warning' | 'info';
  title: string;
  description: string;
}
