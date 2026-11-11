const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api/v1';

class ApiService {
  private token: string | null = null;

  setToken(token: string) {
    this.token = token;
    if (typeof window !== 'undefined') {
      localStorage.setItem('admin_token', token);
    }
  }

  getToken(): string {
    if (this.token) return this.token;
    if (typeof window !== 'undefined') {
      return localStorage.getItem('admin_token') || '';
    }
    return '';
  }

  clearToken() {
    this.token = null;
    if (typeof window !== 'undefined') {
      localStorage.removeItem('admin_token');
    }
  }

  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const url = `${API_BASE_URL}${endpoint}`;
    const token = this.getToken();

    const headers: HeadersInit = {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
      ...options.headers,
    };

    const response = await fetch(url, { ...options, headers });

    if (response.status === 401) {
      this.clearToken();
      if (typeof window !== 'undefined') {
        window.location.href = '/login';
      }
    }

    if (!response.ok) {
      const error = await response.json().catch(() => ({ message: 'Request failed' }));
      throw new Error(error.message || 'Request failed');
    }

    return response.json();
  }

  // Auth
  async login(email: string, password: string) {
    const result = await this.request<{ data: { token: string; user: any } }>('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
    this.setToken(result.data.token);
    return result.data;
  }

  async getCurrentUser() {
    return this.request<{ data: any }>('/auth/me');
  }

  async registerUser(data: { fullName: string; email: string; password: string; role: string }) {
    return this.request<{ data: any }>('/auth/register', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  // Students
  async getStudents() {
    return this.request<{ data: any[] }>('/students');
  }

  async createStudent(data: any) {
    return this.request<{ data: any }>('/students', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  // Teachers
  async getTeachers() {
    return this.request<{ data: any[] }>('/teachers');
  }

  async createTeacher(data: any) {
    return this.request<{ data: any }>('/teachers', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  // Classes
  async getClasses() {
    return this.request<{ data: any[] }>('/classes');
  }

  async createClass(data: any) {
    return this.request<{ data: any }>('/classes', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  // Subjects
  async getSubjects() {
    return this.request<{ data: any[] }>('/subjects');
  }

  async createSubject(data: any) {
    return this.request<{ data: any }>('/subjects', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  // Academic Terms
  async getTerms() {
    return this.request<{ data: any[] }>('/academic-terms');
  }

  async createTerm(data: any) {
    return this.request<{ data: any }>('/academic-terms', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async updateTerm(id: string, data: any) {
    return this.request<{ data: any }>(`/academic-terms/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(data),
    });
  }

  // Grades
  async getGrades(filters?: { classId?: string; subjectId?: string; studentId?: string }) {
    const params = new URLSearchParams();
    if (filters?.classId) params.append('classId', filters.classId);
    if (filters?.subjectId) params.append('subjectId', filters.subjectId);
    if (filters?.studentId) params.append('studentId', filters.studentId);
    const query = params.toString() ? `?${params.toString()}` : '';
    return this.request<{ data: any[] }>(`/grades${query}`);
  }
}

export const api = new ApiService();