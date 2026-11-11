/**
 * API Service Layer
 * 
 * Centralized API communication for the Student Portal.
 * All endpoints connect to the Express backend.
 */

import { Student, Subject, Grade, AcademicTerm } from '@/src/types';

// Base API URL - configured via environment variables
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api/v1';

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface AuthResponse {
  token: string;
  user: Student;
}

/**
 * Token helpers for authenticating requests to the shared Express backend.
 */
export const authToken = {
  get(): string | null {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem('student_token');
  },
  set(token: string): void {
    if (typeof window === 'undefined') return;
    localStorage.setItem('student_token', token);
  },
  clear(): void {
    if (typeof window === 'undefined') return;
    localStorage.removeItem('student_token');
  },
};

/**
 * Helper function for making API requests with proper error handling
 */
async function apiRequest<T>(endpoint: string, options?: RequestInit): Promise<T> {
  const token = typeof window !== 'undefined' ? localStorage.getItem('student_token') : null;
  
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
      ...options?.headers,
    },
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: 'Request failed' }));
    throw new Error(error.message || `API Error: ${response.statusText}`);
  }

  const data = await response.json();
  return data.data || data;
}

/**
 * Student Services
 */
export const studentService = {
  /**
   * Get current student profile
   */
  async getProfile(): Promise<Student> {
    return apiRequest<Student>('/students/me');
  },

  /**
   * Update student profile
   */
  async updateProfile(data: Partial<Student>): Promise<Student> {
    return apiRequest<Student>('/students/me', {
      method: 'PATCH',
      body: JSON.stringify(data),
    });
  },
};

/**
 * Subjects Services
 */
export const subjectsService = {
  /**
   * Get all enrolled subjects
   */
  async getEnrolledSubjects(): Promise<Subject[]> {
    return apiRequest<Subject[]>('/students/me/subjects');
  },

  /**
   * Get single subject details
   */
  async getSubjectById(id: string): Promise<Subject | null> {
    return apiRequest<Subject>(`/subjects/${id}`);
  },
};

/**
 * Grades Services
 */
export const gradesService = {
  /**
   * Get all grades for current student
   */
  async getAllGrades(): Promise<Grade[]> {
    return apiRequest<Grade[]>('/students/me/grades');
  },

  /**
   * Get grades by subject
   */
  async getGradesBySubject(subjectId: string): Promise<Grade[]> {
    return apiRequest<Grade[]>(`/students/me/grades?subjectId=${subjectId}`);
  },

  /**
   * Get grades by term
   */
  async getGradesByTerm(termId: string): Promise<Grade[]> {
    return apiRequest<Grade[]>(`/students/me/grades?termId=${termId}`);
  },
};

/**
 * Academic History Services
 */
export const academicHistoryService = {
  /**
   * Get all academic terms
   */
  async getAllTerms(): Promise<AcademicTerm[]> {
    return apiRequest<AcademicTerm[]>('/academic-terms');
  },

  /**
   * Get single term details
   */
  async getTermById(id: string): Promise<AcademicTerm | null> {
    return apiRequest<AcademicTerm>(`/academic-terms/${id}`);
  },
};

/**
 * Analytics Services
 */
export const analyticsService = {
  /**
   * Get performance analytics
   */
  async getPerformanceAnalytics() {
    return apiRequest<{
      overallAverage: number;
      highestScore: number;
      lowestScore: number;
      totalSubjects: number;
      passedSubjects: number;
      failedSubjects: number;
    }>('/students/me/analytics');
  },
};

/**
 * Authentication Services
 * Prepares the portal for the shared Express backend authentication.
 * Endpoints are placeholders to be confirmed against the backend contract.
 */
export const authService = {
  /**
   * Authenticate student and store the session token.
   */
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    return apiRequest<AuthResponse>('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });
  },

  /**
   * Log out the current student and clear the session token.
   */
  async logout(): Promise<void> {
    try {
      await apiRequest('/auth/logout', { method: 'POST' });
    } finally {
      authToken.clear();
    }
  },

  /**
   * Clear the stored session token without calling the backend.
   */
  clearToken(): void {
    authToken.clear();
  },
};

export { apiRequest };
