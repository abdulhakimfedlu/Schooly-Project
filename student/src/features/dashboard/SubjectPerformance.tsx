import { Card, CardHeader, CardTitle, CardContent } from '@/src/components/ui/Card';
import { EmptyState } from '@/src/components/ui/PageState';
import { Subject } from '@/src/types';

interface SubjectPerformanceProps {
  subjects: Subject[];
}

export function SubjectPerformance({ subjects }: SubjectPerformanceProps) {
  const sortedSubjects = [...subjects].sort(
    (a, b) => (b.averageMarks ?? 0) - (a.averageMarks ?? 0)
  );

  const strongest = sortedSubjects[0];
  const needsImprovement = sortedSubjects[sortedSubjects.length - 1];

  if (subjects.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Subject Performance</CardTitle>
        </CardHeader>
        <CardContent>
          <EmptyState title="No subject data" />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Subject Performance</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* Strongest Subject */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-schooly-text-secondary">
                Strongest Subject
              </span>
              <span className="text-sm font-semibold text-green-400">
                {strongest.letterGrade}
              </span>
            </div>
            <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-lg">
              <p className="font-semibold text-schooly-text">{strongest.name}</p>
              <p className="text-sm text-schooly-text-secondary mt-1">
                Average: {strongest.averageMarks}%
              </p>
            </div>
          </div>

          {/* Needs Improvement */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-schooly-text-secondary">
                Needs Improvement
              </span>
              <span className="text-sm font-semibold text-yellow-400">
                {needsImprovement.letterGrade}
              </span>
            </div>
            <div className="p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
              <p className="font-semibold text-schooly-text">
                {needsImprovement.name}
              </p>
              <p className="text-sm text-schooly-text-secondary mt-1">
                Average: {needsImprovement.averageMarks}%
              </p>
            </div>
          </div>

          {/* All Subjects Progress */}
          <div>
            <p className="text-sm text-schooly-text-secondary mb-3">
              All Subjects
            </p>
            <div className="space-y-3">
              {subjects.map((subject) => (
                <div key={subject.id}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm text-schooly-text">{subject.code}</span>
                    <span className="text-sm font-medium text-schooly-text">
                      {subject.averageMarks}%
                    </span>
                  </div>
                  <div className="w-full bg-schooly-bg-secondary rounded-full h-2">
                    <div
                      className="bg-schooly-primary h-2 rounded-full transition-all"
                      style={{ width: `${subject.averageMarks}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
