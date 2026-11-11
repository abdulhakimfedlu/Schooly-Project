import { Users, BookOpen, ClipboardList, TrendingUp } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/src/components/ui/Card';

export default function DashboardPage() {
  // TODO: Fetch real data from API
  const totalStudents = 0;
  const totalClasses = 0;
  const totalSubjects = 0;
  const assignedClasses: any[] = [];
  const recentGrades: any[] = [];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-schooly-text">Dashboard</h1>
        <p className="text-schooly-text-secondary mt-1">Overview of your teaching activities</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-schooly-text-secondary">Assigned Classes</p>
                <p className="text-3xl font-bold text-schooly-text mt-2">{totalClasses}</p>
              </div>
              <div className="w-12 h-12 rounded-lg bg-schooly-primary/10 flex items-center justify-center">
                <Users className="h-6 w-6 text-schooly-primary" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-schooly-text-secondary">Total Students</p>
                <p className="text-3xl font-bold text-schooly-text mt-2">{totalStudents}</p>
              </div>
              <div className="w-12 h-12 rounded-lg bg-blue-500/10 flex items-center justify-center">
                <TrendingUp className="h-6 w-6 text-blue-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-schooly-text-secondary">Assigned Subjects</p>
                <p className="text-3xl font-bold text-schooly-text mt-2">{totalSubjects}</p>
              </div>
              <div className="w-12 h-12 rounded-lg bg-green-500/10 flex items-center justify-center">
                <BookOpen className="h-6 w-6 text-green-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-schooly-text-secondary">Grades Recorded</p>
                <p className="text-3xl font-bold text-schooly-text mt-2">{recentGrades.length}</p>
              </div>
              <div className="w-12 h-12 rounded-lg bg-purple-500/10 flex items-center justify-center">
                <ClipboardList className="h-6 w-6 text-purple-400" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Assigned Classes</CardTitle>
          </CardHeader>
          <CardContent>
            {assignedClasses.length > 0 ? (
              <div className="space-y-4">
                {assignedClasses.map((cls) => (
                  <div key={cls.id} className="flex items-center justify-between p-4 bg-schooly-bg-secondary rounded-lg">
                    <div>
                      <p className="font-medium text-schooly-text">{cls.name}</p>
                      <p className="text-sm text-schooly-text-secondary">{cls.code}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-schooly-text">{cls.studentCount} students</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-schooly-text-secondary text-center py-8">No classes assigned yet</p>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Grade Activity</CardTitle>
          </CardHeader>
          <CardContent>
            {recentGrades.length > 0 ? (
              <div className="space-y-4">
                {recentGrades.map((grade) => (
                  <div key={grade.id} className="flex items-center justify-between p-4 bg-schooly-bg-secondary rounded-lg">
                    <div>
                      <p className="font-medium text-schooly-text">{grade.studentName}</p>
                      <p className="text-sm text-schooly-text-secondary">{grade.subjectCode} - {grade.examType}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-schooly-primary">{grade.percentage}%</p>
                      <p className="text-xs text-schooly-text-secondary">{grade.letterGrade}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-schooly-text-secondary text-center py-8">No recent grades</p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
