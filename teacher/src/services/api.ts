/**
 * API Service Layer
 * 
 * Centralized API communication for the Teacher Portal.
 * All endpoints connect to the Express backend.
 */

import { Teacher, Class, Subject, Student, Grade } from '@/src/types';

// Base API URL - configured via environment variables
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api/v1';

/**
 * Helper function for making API requests with proper error handling
 */
async function apiRequest<T>(endpoint: string, options?: RequestInit): Promise<T> {
  const token = typeof window !== 'undefined' ? localStorage.getItem('teacher_token') : null;
  
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
 * Teacher Services
 */
export const teacherService = {
  /**
   * Get current teacher profile
   */
  async getProfile(): Promise<Teacher> {
    return apiRequest<Teacher>('/teachers/me');
  },

  /**
   * Update teacher profile
   */
  async updateProfile(data: Partial<Teacher>): Promise<Teacher> {
    return apiRequest<Teacher>('/teachers/me', {
      method: 'PATCH',
      body: JSON.stringify(data),
    });
  },
};

/**
 * Classes Services
 */
export const classesService = {
  /**
   * Get all assigned classes for current teacher
   */
  async getAssignedClasses(): Promise<Class[]> {
    return apiRequest<Class[]>('/teachers/me/classes');
  },

  /**
   * Get class details by ID
   */
  async getClassById(id: string): Promise<Class> {
    return apiRequest<Class>(`/classes/${id}`);
  },

  /**
   * Get students in a class
   */
  async getClassStudents(classId: string): Promise<Student[]> {
    return apiRequest<Student[]>(`/classes/${classId}/students`);
  },
};

/**
 * Subjects Services
 */
export const subjectsService = {
  /**
   * Get all assigned subjects for current teacher
   */
  async getAssignedSubjects(): Promise<Subject[]> {
    return apiRequest<Subject[]>('/teachers/me/subjects');
  },

  /**
   * Get subject details
   */
  async getSubjectById(id: string): Promise<Subject> {
    return apiRequest<Subject>(`/subjects/${id}`);
  },
};

/**
 * Students Services
 */
export const studentsService = {
  /**
   * Get students for a specific subject
   */
  async getStudentsBySubject(subjectId: string): Promise<Student[]> {
    return apiRequest<Student[]>(`/subjects/${subjectId}/students`);
  },

  /**
   * Get student details
   */
  async getStudentById(id: string): Promise<Student> {
    return apiRequest<Student>(`/students/${id}`);
  },
};

/**
 * Grades Services
 */
export const gradesService = {
  /**
   * Get grades for a specific class/subject
   */
  async getGrades(filters: { classId?: string; subjectId?: string }): Promise<Grade[]> {
    const params = new URLSearchParams();
    if (filters.classId) params.append('classId', filters.classId);
    if (filters.subjectId) params.append('subjectId', filters.subjectId);
    const query = params.toString() ? `?${params.toString()}` : '';
    return apiRequest<Grade[]>(`/grades${query}`);
  },

  /**
   * Create or update a grade
   */
  async saveGrade(data: Partial<Grade>): Promise<Grade> {
    if (data.id) {
      return apiRequest<Grade>(`/grades/${data.id}`, {
        method: 'PATCH',
        body: JSON.stringify(data),
      });
    }
    return apiRequest<Grade>('/grades', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  /**
   * Bulk create/update grades
   */
  async bulkSaveGrades(grades: Partial<Grade>[]): Promise<Grade[]> {
    return apiRequest<Grade[]>('/grades/bulk', {
      method: 'POST',
      body: JSON.stringify({ grades }),
    });
  },
};

/**
 * Academic Terms Services
 */
export const academicTermsService = {
  /**
   * Get all academic terms
   */
  async getAllTerms() {
    return apiRequest('/academic-terms');
  },

  /**
   * Get active term
   */
  async getActiveTerm() {
    return apiRequest('/academic-terms/active');
  },
};

export { apiRequest };
