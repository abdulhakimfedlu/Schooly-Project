'use client';

import { useState, useMemo } from 'react';
import { Calendar, TrendingUp } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/src/components/ui/Card';
import { Select } from '@/src/components/ui/Select';
import { Badge } from '@/src/components/ui/Badge';
import { useAcademicHistory } from '@/src/hooks/useAcademicHistory';
import { ErrorState, LoadingState } from '@/src/components/ui/PageState';
import { formatDate } from '@/src/lib/utils';

export default function HistoryPage() {
  const [selectedTerm, setSelectedTerm] = useState('All');

  const { data: academicHistory, loading, error, refetch } = useAcademicHistory();

  // Filter academic history
  const filteredHistory = useMemo(() => {
    if (selectedTerm === 'All') return academicHistory;
    return academicHistory.filter((term) => term.id === selectedTerm);
  }, [academicHistory, selectedTerm]);

  if (loading) {
    return <LoadingState message="Loading academic history..." />;
  }

  if (error) {
    return <ErrorState message={error} onRetry={refetch} />;
  }

  if (academicHistory.length === 0) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-schooly-text">Academic History</h1>
          <p className="text-schooly-text-secondary mt-1">
            View your historical academic performance across all terms
          </p>
        </div>
        <Card>
          <CardContent className="py-12 text-center">
            <p className="text-schooly-text-secondary">No academic terms available</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Calculate overall statistics
  const overallAverage = (
    academicHistory.reduce((acc, term) => acc + (term.overallAverage ?? 0), 0) /
    academicHistory.length
  ).toFixed(1);

  const totalSubjects = academicHistory.reduce(
    (acc, term) => acc + (term.totalSubjects ?? 0),
    0
  );

  const totalPassed = academicHistory.reduce(
    (acc, term) => acc + (term.passedSubjects ?? 0),
    0
  );

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-schooly-text">Academic History</h1>
        <p className="text-schooly-text-secondary mt-1">
          View your historical academic performance across all terms
        </p>
      </div>

      {/* Overall Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-schooly-text-secondary">
                  Overall Average
                </p>
                <p className="text-3xl font-bold text-schooly-primary mt-2">
                  {overallAverage}%
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
            <p className="text-sm text-schooly-text-secondary">
              Total Subjects Taken
            </p>
            <p className="text-3xl font-bold text-schooly-text mt-2">
              {totalSubjects}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <p className="text-sm text-schooly-text-secondary">Total Passed</p>
            <p className="text-3xl font-bold text-green-400 mt-2">
              {totalPassed}/{totalSubjects}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Filter */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center gap-3">
            <Calendar className="h-5 w-5 text-schooly-text-secondary" />
            <Select
              value={selectedTerm}
              onChange={(e) => setSelectedTerm(e.target.value)}
              className="flex-1"
            >
              <option value="All">All Academic Terms</option>
              {academicHistory.map((term) => (
                <option key={term.id} value={term.id}>
                  {term.name} ({term.academicYear})
                </option>
              ))}
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Academic History */}
      <div className="space-y-4">
        {filteredHistory.map((term) => (
          <Card key={term.id}>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle>{term.name}</CardTitle>
                  <p className="text-sm text-schooly-text-secondary mt-1">
                    {term.academicYear}
                  </p>
                </div>
                <Badge
                  variant={
                    term.status === 'Current'
                      ? 'success'
                      : term.status === 'Completed'
                        ? 'default'
                        : 'info'
                  }
                >
                  {term.status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="p-4 bg-schooly-bg-secondary rounded-lg">
                  <p className="text-sm text-schooly-text-secondary">Period</p>
                  <p className="text-sm font-medium text-schooly-text mt-2">
                    {formatDate(term.startDate)} - {formatDate(term.endDate)}
                  </p>
                </div>

                <div className="p-4 bg-schooly-bg-secondary rounded-lg">
                  <p className="text-sm text-schooly-text-secondary">
                    Overall Average
                  </p>
                  <p className="text-2xl font-bold text-schooly-primary mt-2">
                    {term.overallAverage ?? 0}%
                  </p>
                </div>

                <div className="p-4 bg-schooly-bg-secondary rounded-lg">
                  <p className="text-sm text-schooly-text-secondary">
                    Total Subjects
                  </p>
                  <p className="text-2xl font-bold text-schooly-text mt-2">
                    {term.totalSubjects ?? 0}
                  </p>
                </div>

                <div className="p-4 bg-schooly-bg-secondary rounded-lg">
                  <p className="text-sm text-schooly-text-secondary">
                    Passed / Failed
                  </p>
                  <p className="text-2xl font-bold text-schooly-text mt-2">
                    <span className="text-green-400">{term.passedSubjects ?? 0}</span> /{' '}
                    <span className="text-red-400">{term.failedSubjects ?? 0}</span>
                  </p>
                </div>
              </div>

              {/* Performance Indicator */}
              <div className="mt-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-schooly-text-secondary">
                    Performance
                  </span>
                  <span className="text-sm font-medium text-schooly-text">
                    {term.overallAverage ?? 0}%
                  </span>
                </div>
                <div className="w-full bg-schooly-bg-secondary rounded-full h-2">
                  <div
                    className="bg-schooly-primary h-2 rounded-full transition-all"
                    style={{ width: `${term.overallAverage ?? 0}%` }}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Performance Trend */}
      <Card>
        <CardHeader>
          <CardTitle>Performance Trend Over Time</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[...academicHistory]
              .sort(
                (a, b) =>
                  new Date(a.startDate).getTime() - new Date(b.startDate).getTime()
              )
              .map((term, index, array) => {
                const isImprovement =
                  index > 0 &&
                  (term.overallAverage ?? 0) > (array[index - 1].overallAverage ?? 0);
                const isDecline =
                  index > 0 &&
                  (term.overallAverage ?? 0) < (array[index - 1].overallAverage ?? 0);

                return (
                  <div
                    key={term.id}
                    className="flex items-center justify-between p-4 bg-schooly-bg-secondary rounded-lg"
                  >
                    <div>
                      <p className="font-medium text-schooly-text">{term.name}</p>
                      <p className="text-sm text-schooly-text-secondary mt-1">
                        {term.academicYear}
                      </p>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <p className="text-2xl font-bold text-schooly-text">
                          {(term.overallAverage ?? 0)}%
                        </p>
                        {index > 0 && (
                          <p
                            className={`text-sm ${
                              isImprovement
                                ? 'text-green-400'
                                : isDecline
                                  ? 'text-red-400'
                                  : 'text-schooly-text-secondary'
                            }`}
                          >
                            {isImprovement
                              ? `↑ ${(
                                  (term.overallAverage ?? 0) -
                                  (array[index - 1].overallAverage ?? 0)
                                ).toFixed(1)}%`
                              : isDecline
                                ? `↓ ${(
                                    (array[index - 1].overallAverage ?? 0) -
                                    (term.overallAverage ?? 0)
                                  ).toFixed(1)}%`
                                : '→ No change'}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
