'use client';

import { TrendingUp, TrendingDown, Award, Target } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/src/components/ui/Card';
import { PerformanceTrendChart } from '@/src/components/charts/PerformanceTrendChart';
import { SubjectComparisonChart } from '@/src/components/charts/SubjectComparisonChart';
import { GradeDistributionChart } from '@/src/components/charts/GradeDistributionChart';
import { ErrorState, LoadingState } from '@/src/components/ui/PageState';
import { useGrades } from '@/src/hooks/useGrades';
import { useSubjects } from '@/src/hooks/useSubjects';
import { useAnalytics } from '@/src/hooks/useAnalytics';

export default function AnalyticsPage() {
  const { data: grades, loading: gradesLoading, error: gradesError } = useGrades();
  const { data: subjects, loading: subjectsLoading } = useSubjects();
  const { data: analytics, loading: analyticsLoading, error: analyticsError } = useAnalytics();

  const loading = gradesLoading || subjectsLoading || analyticsLoading;
  const error = gradesError || analyticsError;

  if (loading) {
    return <LoadingState message="Loading analytics..." />;
  }

  if (error) {
    return <ErrorState message={error} />;
  }

  const finalGrades = grades.filter((g) => g.examType === 'Final');

  const overallAverage = analytics?.overallAverage ?? (finalGrades.length > 0
    ? (finalGrades.reduce((acc, grade) => acc + grade.percentage, 0) / finalGrades.length).toFixed(1)
    : null);
  const highestScore = analytics?.highestScore ?? (finalGrades.length > 0 ? Math.max(...finalGrades.map((g) => g.percentage)) : null);
  const lowestScore = analytics?.lowestScore ?? (finalGrades.length > 0 ? Math.min(...finalGrades.map((g) => g.percentage)) : null);
  const passedSubjects = analytics?.passedSubjects ?? finalGrades.filter((g) => g.status === 'Passed').length;

  const sortedSubjects = [...(subjects ?? [])].sort(
    (a, b) => (b.averageMarks ?? 0) - (a.averageMarks ?? 0)
  );
  const strongestSubject = sortedSubjects[0];

  const insights: { id: string; type: 'success' | 'warning' | 'info'; title: string; description: string }[] = [];
  if (strongestSubject) {
    insights.push({
      id: '1',
      type: 'success' as const,
      title: 'Strong Performance',
      description: `You're excelling in ${strongestSubject.name} with ${strongestSubject.averageMarks}% average.`,
    });
  }
  if (finalGrades.length > 0) {
    insights.push({
      id: '2',
      type: 'info' as const,
      title: 'Consistent Progress',
      description: 'Track your performance over time using real academic data.',
    });
    insights.push({
      id: '3',
      type: 'success' as const,
      title: 'High Pass Rate',
      description: `You've passed ${passedSubjects} out of ${finalGrades.length} subjects this term.`,
    });
  }

  if (grades.length === 0 && subjects.length === 0) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-schooly-text">Analytics</h1>
          <p className="text-schooly-text-secondary mt-1">
            Comprehensive analysis of your academic performance
          </p>
        </div>
        <Card>
          <CardContent className="py-12 text-center">
            <p className="text-schooly-text-secondary">No academic data available</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-schooly-text">Analytics</h1>
        <p className="text-schooly-text-secondary mt-1">
          Comprehensive analysis of your academic performance
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-schooly-text-secondary">
                  Overall Average
                </p>
                <p className="text-3xl font-bold text-schooly-primary mt-2">
                  {overallAverage !== null ? `${overallAverage}%` : '--'}
                </p>
              </div>
              <div className="w-12 h-12 rounded-lg bg-schooly-primary/10 flex items-center justify-center">
                <TrendingUp className="h-6 w-6 text-schooly-primary" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-schooly-text-secondary">Highest Score</p>
                <p className="text-3xl font-bold text-green-400 mt-2">
                  {highestScore !== null ? `${highestScore}%` : '--'}
                </p>
              </div>
              <div className="w-12 h-12 rounded-lg bg-green-500/10 flex items-center justify-center">
                <Award className="h-6 w-6 text-green-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-schooly-text-secondary">Lowest Score</p>
                <p className="text-3xl font-bold text-yellow-400 mt-2">
                  {lowestScore !== null ? `${lowestScore}%` : '--'}
                </p>
              </div>
              <div className="w-12 h-12 rounded-lg bg-yellow-500/10 flex items-center justify-center">
                <TrendingDown className="h-6 w-6 text-yellow-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-schooly-text-secondary">
                  Passed Subjects
                </p>
                <p className="text-3xl font-bold text-schooly-text mt-2">
                  {finalGrades.length > 0 ? `${passedSubjects}/${finalGrades.length}` : '--'}
                </p>
              </div>
              <div className="w-12 h-12 rounded-lg bg-blue-500/10 flex items-center justify-center">
                <Target className="h-6 w-6 text-blue-400" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Performance Trend</CardTitle>
          </CardHeader>
          <CardContent>
            <PerformanceTrendChart data={[]} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Subject Comparison</CardTitle>
          </CardHeader>
          <CardContent>
            <SubjectComparisonChart subjects={subjects ?? []} />
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Grade Distribution</CardTitle>
        </CardHeader>
        <CardContent>
          <GradeDistributionChart grades={grades} />
        </CardContent>
      </Card>

      {/* Academic Insights */}
      <Card>
        <CardHeader>
          <CardTitle>Academic Insights</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {insights.length === 0 ? (
              <p className="text-schooly-text-secondary">No insights available</p>
            ) : (
              insights.map((insight) => (
                <div
                  key={insight.id}
                  className={`p-4 rounded-lg ${
                    insight.type === 'success'
                      ? 'bg-green-500/10 border border-green-500/20'
                      : insight.type === 'warning'
                        ? 'bg-yellow-500/10 border border-yellow-500/20'
                        : 'bg-blue-500/10 border border-blue-500/20'
                  }`}
                >
                  <h4 className="font-semibold text-schooly-text">{insight.title}</h4>
                  <p className="text-sm text-schooly-text-secondary mt-1">
                    {insight.description}
                  </p>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>

      {/* Strongest Subject */}
      <Card>
        <CardHeader>
          <CardTitle>Strongest Subject</CardTitle>
        </CardHeader>
        <CardContent>
          {!strongestSubject ? (
            <p className="text-schooly-text-secondary">No subject data available</p>
          ) : (
            <div className="flex items-center justify-between p-6 bg-schooly-bg-secondary rounded-lg">
              <div>
                <p className="text-lg font-semibold text-schooly-text">
                  {strongestSubject.name}
                </p>
                <p className="text-sm text-schooly-text-secondary mt-1">
                  {strongestSubject.code} • {strongestSubject.teacher}
                </p>
              </div>
              <div className="text-right">
                <p className="text-3xl font-bold text-schooly-primary">
                  {strongestSubject.averageMarks}%
                </p>
                <p className="text-sm text-schooly-text-secondary mt-1">
                  {strongestSubject.letterGrade}
                </p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
