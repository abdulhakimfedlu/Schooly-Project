import { BookOpen, Users } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/src/components/ui/Card';

export default function SubjectsPage() {
  // TODO: Fetch subjects from API
  const assignedSubjects: any[] = [];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-schooly-text">My Subjects</h1>
        <p className="text-schooly-text-secondary mt-1">Subjects you are teaching</p>
      </div>

      {assignedSubjects.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {assignedSubjects.map((subject) => {

            return (
              <Card key={subject.id}>
                <CardHeader>
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-10 h-10 rounded-lg bg-schooly-primary/10 flex items-center justify-center">
                      <BookOpen className="h-5 w-5 text-schooly-primary" />
                    </div>
                  </div>
                  <CardTitle>{subject.name}</CardTitle>
                  <p className="text-sm text-schooly-text-secondary">{subject.code}</p>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="p-3 bg-schooly-bg-secondary rounded-lg">
                      <p className="text-xs text-schooly-text-secondary">Class</p>
                      <p className="text-sm font-medium text-schooly-text mt-1">{subject.className}</p>
                    </div>

                    <div className="flex items-center justify-between p-3 bg-schooly-bg-secondary rounded-lg">
                      <div className="flex items-center gap-2">
                        <Users className="h-4 w-4 text-schooly-primary" />
                        <span className="text-sm text-schooly-text">Enrolled</span>
                      </div>
                      <span className="text-sm font-semibold text-schooly-text">{subject.studentCount || 0}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      ) : (
        <Card>
          <CardContent className="py-12 text-center">
            <BookOpen className="h-12 w-12 text-schooly-text-secondary mx-auto mb-4" />
            <p className="text-schooly-text font-medium mb-2">No Subjects Assigned</p>
            <p className="text-sm text-schooly-text-secondary">You don&apos;t have any subjects assigned yet</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
