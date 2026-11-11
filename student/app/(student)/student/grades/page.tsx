'use client';

import { useState, useMemo } from 'react';
import { Search } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/src/components/ui/Card';
import { Input } from '@/src/components/ui/Input';
import { Select } from '@/src/components/ui/Select';
import { GradesTable } from '@/src/features/grades/GradesTable';
import { ErrorState, LoadingState } from '@/src/components/ui/PageState';
import { useGrades } from '@/src/hooks/useGrades';

export default function GradesPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [examTypeFilter, setExamTypeFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');

  const { data: grades, loading, error, refetch } = useGrades();

  // Calculate statistics
  const overallAverage = useMemo(() => {
    const finalGrades = grades.filter((g) => g.examType === 'Final');
    return finalGrades.length > 0
      ? (finalGrades.reduce((acc, grade) => acc + grade.percentage, 0) / finalGrades.length).toFixed(1)
      : '0';
  }, [grades]);

  const gradeDistribution = useMemo(() => {
    const gradesList = ['A+', 'A', 'A-', 'B+', 'B', 'B-', 'C+', 'C', 'C-', 'F'];
    return gradesList.map((grade) => ({
      grade,
      count: grades.filter((g) => g.letterGrade === grade).length,
    }));
  }, [grades]);

  // Filter grades
  const filteredGrades = useMemo(() => {
    return grades.filter((grade) => {
      const matchesSearch =
        (grade.subjectName ?? '')
          .toLowerCase()
          .includes(searchQuery.toLowerCase()) ||
        (grade.subjectCode ?? '')
          .toLowerCase()
          .includes(searchQuery.toLowerCase());
      const matchesExamType =
        examTypeFilter === 'All' || grade.examType === examTypeFilter;
      const matchesStatus = statusFilter === 'All' || grade.status === statusFilter;

      return matchesSearch && matchesExamType && matchesStatus;
    });
  }, [grades, searchQuery, examTypeFilter, statusFilter]);

  if (loading) {
    return <LoadingState message="Loading grades..." />;
  }

  if (error) {
    return (
      <ErrorState message={error} onRetry={refetch} />
    );
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-schooly-text">My Grades</h1>
        <p className="text-schooly-text-secondary mt-1">
          View all your academic grades and performance
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardContent className="pt-6">
            <p className="text-sm text-schooly-text-secondary">Overall Average</p>
            <p className="text-3xl font-bold text-schooly-primary mt-2">
              {overallAverage}%
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <p className="text-sm text-schooly-text-secondary">Total Grades</p>
            <p className="text-3xl font-bold text-schooly-text mt-2">
              {grades.length}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <p className="text-sm text-schooly-text-secondary">Passed</p>
            <p className="text-3xl font-bold text-green-400 mt-2">
              {grades.filter((g) => g.status === 'Passed').length}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Grade Distribution */}
      <Card>
        <CardHeader>
          <CardTitle>Grade Distribution</CardTitle>
        </CardHeader>
        <CardContent>
          {grades.length === 0 ? (
            <div className="py-12 text-center">
              <p className="text-schooly-text-secondary">No grades available</p>
            </div>
          ) : (
            <div className="flex flex-wrap gap-3">
              {gradeDistribution
                .filter((item) => item.count > 0)
                .map((item) => (
                  <div
                    key={item.grade}
                    className="flex items-center gap-2 px-4 py-2 bg-schooly-bg-secondary rounded-lg border border-schooly-border"
                  >
                    <span className="font-semibold text-schooly-primary">
                      {item.grade}
                    </span>
                    <span className="text-schooly-text-secondary">×</span>
                    <span className="font-medium text-schooly-text">{item.count}</span>
                  </div>
                ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-schooly-text-secondary" />
              <Input
                placeholder="Search by subject or code..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select
              value={examTypeFilter}
              onChange={(e) => setExamTypeFilter(e.target.value)}
            >
              <option value="All">All Exam Types</option>
              <option value="Final">Final</option>
              <option value="Midterm">Midterm</option>
              <option value="Quiz">Quiz</option>
              <option value="Assignment">Assignment</option>
            </Select>
            <Select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="All">All Status</option>
              <option value="Passed">Passed</option>
              <option value="Failed">Failed</option>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Grades Table */}
      <Card>
        <CardHeader>
          <CardTitle>All Grades ({filteredGrades.length})</CardTitle>
        </CardHeader>
        <CardContent>
          {filteredGrades.length > 0 ? (
            <GradesTable grades={filteredGrades} />
          ) : (
            <div className="py-12 text-center">
              <p className="text-schooly-text-secondary">No grades found</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
