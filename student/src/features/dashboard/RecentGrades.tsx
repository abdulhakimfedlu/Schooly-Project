import { Card, CardHeader, CardTitle, CardContent } from '@/src/components/ui/Card';
import { Badge } from '@/src/components/ui/Badge';
import { EmptyState } from '@/src/components/ui/PageState';
import { formatDate } from '@/src/lib/utils';
import { Grade } from '@/src/types';

interface RecentGradesProps {
  grades: Grade[];
}

export function RecentGrades({ grades }: RecentGradesProps) {
  const recentGrades = grades
    .filter((grade) => grade.examType === 'Final')
    .slice(0, 5);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Grades</CardTitle>
      </CardHeader>
      <CardContent>
        {recentGrades.length === 0 ? (
          <EmptyState title="No recent grades" />
        ) : (
          <div className="space-y-4">
            {recentGrades.map((grade) => (
              <div
                key={grade.id}
                className="flex items-center justify-between py-3 border-b border-schooly-border last:border-0"
              >
                <div className="flex-1">
                  <p className="font-medium text-schooly-text">
                    {grade.subjectName ?? 'Unknown Subject'}
                  </p>
                  <p className="text-sm text-schooly-text-secondary">
                    {grade.examType ?? 'N/A'} •{' '}
                    {grade.examDate ? formatDate(grade.examDate) : 'N/A'}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <p className="font-semibold text-schooly-text">
                      {grade.marksObtained}/{grade.maximumMarks}
                    </p>
                    <p className="text-sm text-schooly-text-secondary">
                      {grade.percentage}%
                    </p>
                  </div>
                  <Badge variant={grade.status === 'Passed' ? 'success' : 'error'}>
                    {grade.letterGrade}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
