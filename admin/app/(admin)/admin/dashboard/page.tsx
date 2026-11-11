'use client';

import { Users, GraduationCap, FolderOpen, BookOpen } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/src/components/ui/Card';

export default function DashboardPage() {
  // TODO: Fetch real data from API
  const stats = {
    totalStudents: 0,
    totalTeachers: 0,
    totalClasses: 0,
    totalSubjects: 0,
  };

  const recentActivity: any[] = [];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-schooly-text">Dashboard</h1>
        <p className="text-schooly-text-secondary mt-1">School administration overview</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-schooly-text-secondary">Total Students</p>
                <p className="text-3xl font-bold text-schooly-text mt-2">{stats.totalStudents}</p>
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
                <p className="text-sm text-schooly-text-secondary">Total Teachers</p>
                <p className="text-3xl font-bold text-schooly-text mt-2">{stats.totalTeachers}</p>
              </div>
              <div className="w-12 h-12 rounded-lg bg-blue-500/10 flex items-center justify-center">
                <GraduationCap className="h-6 w-6 text-blue-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-schooly-text-secondary">Total Classes</p>
                <p className="text-3xl font-bold text-schooly-text mt-2">{stats.totalClasses}</p>
              </div>
              <div className="w-12 h-12 rounded-lg bg-green-500/10 flex items-center justify-center">
                <FolderOpen className="h-6 w-6 text-green-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-schooly-text-secondary">Total Subjects</p>
                <p className="text-3xl font-bold text-schooly-text mt-2">{stats.totalSubjects}</p>
              </div>
              <div className="w-12 h-12 rounded-lg bg-purple-500/10 flex items-center justify-center">
                <BookOpen className="h-6 w-6 text-purple-400" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          {recentActivity.length > 0 ? (
            <div className="space-y-4">
              {recentActivity.map((activity) => (
                <div key={activity.id} className="flex items-center justify-between py-2 border-b border-schooly-border last:border-0">
                  <div>
                    <p className="text-sm text-schooly-text">{activity.action}</p>
                    <p className="text-xs text-schooly-text-secondary">{activity.name}</p>
                  </div>
                  <span className="text-xs text-schooly-text-secondary">{activity.time}</span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-schooly-text-secondary text-center py-8">No recent activity</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}