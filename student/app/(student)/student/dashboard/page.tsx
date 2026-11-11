'use client';

import { TrendingUp, BookOpen, Award, Target } from 'lucide-react';
import { StatCard } from '@/src/features/dashboard/StatCard';
import { PerformanceChart } from '@/src/features/dashboard/PerformanceChart';
import { RecentGrades } from '@/src/features/dashboard/RecentGrades';
import { SubjectPerformance } from '@/src/features/dashboard/SubjectPerformance';
import { ErrorState, LoadingState } from '@/src/components/ui/PageState';
import { useStudent } from '@/src/hooks/useStudent';
import { useGrades } from '@/src/hooks/useGrades';
import { useSubjects } from '@/src/hooks/useSubjects';

export default function DashboardPage() {
  const { loading: studentLoading, error: studentError } = useStudent();
  const { data: grades, loading: gradesLoading, error: gradesError, refetch: refetchGrades } = useGrades();
  const { data: subjects, loading: subjectsLoading, error: subjectsError, refetch: refetchSubjects } = useSubjects();

  const loading = studentLoading || gradesLoading || subjectsLoading;
  const error = studentError || gradesError || subjectsError;

  if (loading) {
    return <LoadingState message="Loading dashboard..." />;
  }

  if (error) {
    return (
      <ErrorState
        message={error}
        onRetry={() => {
          refetchGrades();
          refetchSubjects();
        }}
      />
    );
  }

  const finalGrades = grades.filter((g) => g.examType === 'Final');
  const overallAverage =
    finalGrades.length > 0
      ? (finalGrades.reduce((acc, grade) => acc + grade.percentage, 0) / finalGrades.length).toFixed(1)
      : null;
  const highestScore =
    finalGrades.length > 0 ? Math.max(...finalGrades.map((g) => g.percentage)) : null;
  const passedSubjects = finalGrades.filter((g) => g.status === 'Passed').length;

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-schooly-text">Dashboard</h1>
        <p className="text-schooly-text-secondary mt-1">
          Your academic performance overview
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Overall Average"
          value={overallAverage ? `${overallAverage}%` : '--'}
          icon={TrendingUp}
          trend={{ value: '2.5% from last term', isPositive: true }}
        />
        <StatCard
          title="Enrolled Subjects"
          value={subjects.length}
          icon={BookOpen}
        />
        <StatCard
          title="Highest Score"
          value={highestScore !== null ? `${highestScore}%` : '--'}
          icon={Award}
        />
        <StatCard
          title="Passed Subjects"
          value={finalGrades.length > 0 ? `${passedSubjects}/${finalGrades.length}` : '--'}
          icon={Target}
        />
      </div>

      {/* Charts and Details */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <PerformanceChart />
        <SubjectPerformance subjects={subjects} />
      </div>

      {/* Recent Grades */}
      <RecentGrades grades={grades} />
    </div>
  );
}
