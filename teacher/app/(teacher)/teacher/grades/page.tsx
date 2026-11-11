'use client';

import { useState } from 'react';
import { Save, AlertCircle } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/src/components/ui/Card';
import { Select } from '@/src/components/ui/Select';
import { Input } from '@/src/components/ui/Input';
import { Button } from '@/src/components/ui/Button';
import { calculateLetterGrade } from '@/src/lib/utils';

export default function GradesPage() {
  // TODO: Fetch from API
  const assignedClasses: any[] = [];
  const assignedSubjects: any[] = [];
  const students: any[] = [];

  const [selectedClass, setSelectedClass] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('');
  const [selectedTerm, setSelectedTerm] = useState('');
  const [selectedExamType, setSelectedExamType] = useState<'Midterm' | 'Final'>('Final');
  const [grades, setGrades] = useState<Record<string, { obtained: string; max: string }>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});

  const filteredSubjects = selectedClass
    ? assignedSubjects.filter((s: any) => s.classId === selectedClass)
    : [];

  const enrolledStudents = selectedClass
    ? students.filter((s: any) => s.classId === selectedClass)
    : [];

  const handleMarksChange = (studentId: string, field: 'obtained' | 'max', value: string) => {
    setGrades(prev => ({
      ...prev,
      [studentId]: {
        ...prev[studentId],
        [field]: value,
      },
    }));
    
    // Clear error for this student
    setErrors(prev => {
      const newErrors = { ...prev };
      delete newErrors[studentId];
      return newErrors;
    });
  };

  const validateGrades = () => {
    const newErrors: Record<string, string> = {};
    
    Object.entries(grades).forEach(([studentId, grade]) => {
      const obtained = parseFloat(grade.obtained);
      const max = parseFloat(grade.max);
      
      if (grade.obtained && grade.max) {
        if (isNaN(obtained) || isNaN(max)) {
          newErrors[studentId] = 'Invalid number';
        } else if (obtained < 0 || max <= 0) {
          newErrors[studentId] = 'Marks must be positive';
        } else if (obtained > max) {
          newErrors[studentId] = 'Obtained cannot exceed max';
        }
      }
    });
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSaveGrades = () => {
    if (!selectedClass || !selectedSubject) {
      alert('Please select class and subject');
      return;
    }

    if (!validateGrades()) {
      alert('Please fix validation errors before saving');
      return;
    }

    // TODO: Send to backend API
    console.log('Saving grades:', {
      classId: selectedClass,
      subjectId: selectedSubject,
      term: selectedTerm,
      examType: selectedExamType,
      grades,
    });
    
    alert('Grades saved successfully! (Mock - will connect to backend in Phase 2)');
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-schooly-text">Student Grades</h1>
        <p className="text-schooly-text-secondary mt-1">Enter and manage student grades</p>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="text-sm text-schooly-text-secondary mb-2 block">Class</label>
              <Select value={selectedClass} onChange={(e) => {
                setSelectedClass(e.target.value);
                setSelectedSubject('');
                setGrades({});
              }}>
                <option value="">Select Class</option>
                {assignedClasses.map((cls: any) => (
                  <option key={cls.id} value={cls.id}>{cls.name}</option>
                ))}
              </Select>
            </div>

            <div>
              <label className="text-sm text-schooly-text-secondary mb-2 block">Subject</label>
              <Select
                value={selectedSubject}
                onChange={(e) => {
                  setSelectedSubject(e.target.value);
                  setGrades({});
                }}
                disabled={!selectedClass}
              >
                <option value="">Select Subject</option>
                {filteredSubjects.map((sub: any) => (
                  <option key={sub.id} value={sub.id}>{sub.code} - {sub.name}</option>
                ))}
              </Select>
            </div>

            <div>
              <label className="text-sm text-schooly-text-secondary mb-2 block">Term</label>
              <Select value={selectedTerm} onChange={(e) => setSelectedTerm(e.target.value)}>
                <option value="">Select Term</option>
                {/* TODO: Fetch terms from API */}
              </Select>
            </div>

            <div>
              <label className="text-sm text-schooly-text-secondary mb-2 block">Exam Type</label>
              <Select value={selectedExamType} onChange={(e) => setSelectedExamType(e.target.value as any)}>
                <option value="Midterm">Midterm</option>
                <option value="Final">Final</option>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Grades Table */}
      {selectedClass && selectedSubject && enrolledStudents.length > 0 ? (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Enter Grades</CardTitle>
              <Button onClick={handleSaveGrades} className="flex items-center gap-2">
                <Save className="h-4 w-4" />
                Save All Grades
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-schooly-border">
                    <th className="text-left py-3 px-4 text-sm font-semibold text-schooly-text">Student ID</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-schooly-text">Name</th>
                    <th className="text-center py-3 px-4 text-sm font-semibold text-schooly-text">Marks Obtained</th>
                    <th className="text-center py-3 px-4 text-sm font-semibold text-schooly-text">Max Marks</th>
                    <th className="text-center py-3 px-4 text-sm font-semibold text-schooly-text">Percentage</th>
                    <th className="text-center py-3 px-4 text-sm font-semibold text-schooly-text">Grade</th>
                    <th className="text-center py-3 px-4 text-sm font-semibold text-schooly-text">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {enrolledStudents.map((student: any) => {
                    const studentGrade = grades[student.id] || { obtained: '', max: '' };
                    const obtained = parseFloat(studentGrade.obtained);
                    const max = parseFloat(studentGrade.max);
                    const percentage = !isNaN(obtained) && !isNaN(max) && max > 0
                      ? ((obtained / max) * 100).toFixed(1)
                      : '-';
                    const letterGrade = percentage !== '-' ? calculateLetterGrade(parseFloat(percentage)) : '-';
                    const status = percentage !== '-' ? (parseFloat(percentage) >= 50 ? 'Passed' : 'Failed') : '-';
                    const hasError = errors[student.id];

                    return (
                      <tr key={student.id} className="border-b border-schooly-border hover:bg-schooly-bg-card">
                        <td className="py-3 px-4 text-sm text-schooly-text-secondary">{student.studentId}</td>
                        <td className="py-3 px-4 text-sm text-schooly-text">
                          {student.fullName || `${student.firstName || ''} ${student.lastName || ''}`.trim()}
                        </td>
                        <td className="py-3 px-4">
                          <Input
                            type="number"
                            placeholder="0"
                            value={studentGrade.obtained}
                            onChange={(e) => handleMarksChange(student.id, 'obtained', e.target.value)}
                            className={`text-center ${hasError ? 'border-red-500' : ''}`}
                            min="0"
                          />
                        </td>
                        <td className="py-3 px-4">
                          <Input
                            type="number"
                            placeholder="100"
                            value={studentGrade.max}
                            onChange={(e) => handleMarksChange(student.id, 'max', e.target.value)}
                            className={`text-center ${hasError ? 'border-red-500' : ''}`}
                            min="1"
                          />
                        </td>
                        <td className="py-3 px-4 text-center text-sm font-semibold text-schooly-primary">
                          {percentage}%
                        </td>
                        <td className="py-3 px-4 text-center">
                          <span className={`px-2 py-1 rounded text-xs font-semibold ${
                            letterGrade !== '-' && letterGrade !== 'F'
                              ? 'bg-green-500/10 text-green-400'
                              : letterGrade === 'F'
                              ? 'bg-red-500/10 text-red-400'
                              : 'bg-schooly-bg-secondary text-schooly-text-secondary'
                          }`}>
                            {letterGrade}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-center">
                          <span className={`px-2 py-1 rounded text-xs font-semibold ${
                            status === 'Passed'
                              ? 'bg-green-500/10 text-green-400'
                              : status === 'Failed'
                              ? 'bg-red-500/10 text-red-400'
                              : 'bg-schooly-bg-secondary text-schooly-text-secondary'
                          }`}>
                            {status}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {Object.keys(errors).length > 0 && (
              <div className="mt-4 p-4 bg-red-500/10 border border-red-500/20 rounded-lg flex items-start gap-2">
                <AlertCircle className="h-5 w-5 text-red-400 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-red-400">Validation Errors</p>
                  <p className="text-sm text-red-300 mt-1">Please fix the errors in the table above</p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardContent className="py-12 text-center">
            <p className="text-schooly-text-secondary">Select a class and subject to view students and enter grades</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
