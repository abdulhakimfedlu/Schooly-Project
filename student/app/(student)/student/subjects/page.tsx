'use client';

import { useState, useMemo } from 'react';
import { Search, BookOpen } from 'lucide-react';
import { Card, CardContent } from '@/src/components/ui/Card';
import { Input } from '@/src/components/ui/Input';
import { SubjectCard } from '@/src/features/subjects/SubjectCard';
import { SubjectDetailsModal } from '@/src/features/subjects/SubjectDetailsModal';
import { useSubjects } from '@/src/hooks/useSubjects';
import { useGrades } from '@/src/hooks/useGrades';
import { ErrorState, LoadingState } from '@/src/components/ui/PageState';
import { Subject } from '@/src/types';

export default function SubjectsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSubject, setSelectedSubject] = useState<Subject | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data: subjects, loading, error, refetch } = useSubjects();
  const { data: grades } = useGrades();

  // Filter subjects
  const filteredSubjects = useMemo(() => {
    return subjects.filter(
      (subject) =>
        subject.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        subject.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (subject.teacher ?? '')
          .toLowerCase()
          .includes(searchQuery.toLowerCase())
    );
  }, [subjects, searchQuery]);

  if (loading) {
    return <LoadingState message="Loading subjects..." />;
  }

  if (error) {
    return <ErrorState message={error} onRetry={refetch} />;
  }

  const handleViewDetails = (subject: Subject) => {
    setSelectedSubject(subject);
    setIsModalOpen(true);
  };

  // Calculate statistics
  const totalCreditHours = subjects.reduce(
    (acc, subject) => acc + subject.creditHours,
    0
  );
  const averageGrade =
    subjects.length > 0
      ? (subjects.reduce((acc, subject) => acc + (subject.averageMarks ?? 0), 0) /
          subjects.length).toFixed(1)
      : '0';

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-schooly-text">My Subjects</h1>
        <p className="text-schooly-text-secondary mt-1">
          View all your enrolled subjects and performance
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-schooly-text-secondary">
                  Enrolled Subjects
                </p>
                <p className="text-3xl font-bold text-schooly-text mt-2">
                  {subjects.length}
                </p>
              </div>
              <div className="w-12 h-12 rounded-lg bg-schooly-primary/10 flex items-center justify-center">
                <BookOpen className="h-6 w-6 text-schooly-primary" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <p className="text-sm text-schooly-text-secondary">Total Credit Hours</p>
            <p className="text-3xl font-bold text-schooly-text mt-2">
              {totalCreditHours}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <p className="text-sm text-schooly-text-secondary">Average Grade</p>
            <p className="text-3xl font-bold text-schooly-primary mt-2">
              {averageGrade}%
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Search */}
      <Card>
        <CardContent className="pt-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-schooly-text-secondary" />
            <Input
              placeholder="Search by subject name, code, or instructor..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Subjects Grid */}
      {subjects.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center">
            <p className="text-schooly-text-secondary">No subjects available</p>
          </CardContent>
        </Card>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredSubjects.map((subject) => (
              <SubjectCard
                key={subject.id}
                subject={subject}
                onViewDetails={handleViewDetails}
              />
            ))}
          </div>

          {filteredSubjects.length === 0 && (
            <Card>
              <CardContent className="py-12 text-center">
                <p className="text-schooly-text-secondary">No subjects found</p>
              </CardContent>
            </Card>
          )}
        </>
      )}

      <SubjectDetailsModal
        subject={selectedSubject}
        grades={grades ?? []}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}
