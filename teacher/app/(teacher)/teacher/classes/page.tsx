import { Users, BookOpen } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/src/components/ui/Card';

export default function ClassesPage() {
  // TODO: Fetch classes from API
  const assignedClasses: any[] = [];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-schooly-text">My Classes</h1>
        <p className="text-schooly-text-secondary mt-1">View and manage your assigned classes</p>
      </div>

      {assignedClasses.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {assignedClasses.map((cls) => {

            return (
              <Card key={cls.id}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle>{cls.name}</CardTitle>
                      <p className="text-sm text-schooly-text-secondary mt-1">{cls.code}</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-3 bg-schooly-bg-secondary rounded-lg">
                      <div className="flex items-center gap-2">
                        <Users className="h-4 w-4 text-schooly-primary" />
                        <span className="text-sm text-schooly-text">Students</span>
                      </div>
                      <span className="text-sm font-semibold text-schooly-text">{cls.studentCount || 0}</span>
                    </div>

                    <div className="flex items-center justify-between p-3 bg-schooly-bg-secondary rounded-lg">
                      <div className="flex items-center gap-2">
                        <BookOpen className="h-4 w-4 text-schooly-primary" />
                        <span className="text-sm text-schooly-text">Subjects</span>
                      </div>
                      <span className="text-sm font-semibold text-schooly-text">{cls.subjectCount || 0}</span>
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
            <Users className="h-12 w-12 text-schooly-text-secondary mx-auto mb-4" />
            <p className="text-schooly-text font-medium mb-2">No Classes Assigned</p>
            <p className="text-sm text-schooly-text-secondary">You don&apos;t have any classes assigned yet</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
