'use client';

import {
  User,
  Mail,
  Phone,
  Calendar,
  BookOpen,
  MapPin,
  Hash,
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/src/components/ui/Card';
import { Badge } from '@/src/components/ui/Badge';
import { useStudent } from '@/src/hooks/useStudent';
import { ErrorState, LoadingState } from '@/src/components/ui/PageState';
import { getInitials, formatDate } from '@/src/lib/utils';

export default function ProfilePage() {
  const { data: student, loading, error } = useStudent();

  if (loading) {
    return <LoadingState message="Loading profile..." />;
  }

  if (error || !student) {
    return <ErrorState message={error || 'Profile not available'} />;
  }

  const fullNameParts = (student.fullName || '').split(' ');
  const firstName = fullNameParts[0] || '';
  const lastName = fullNameParts.slice(1).join(' ') || '';

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-schooly-text">Student Profile</h1>
        <p className="text-schooly-text-secondary mt-1">
          View and manage your personal information
        </p>
      </div>

      {/* Profile Card */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-6">
            {/* Avatar */}
            <div className="flex-shrink-0">
              <div className="w-32 h-32 rounded-2xl bg-schooly-primary flex items-center justify-center">
                <span className="text-schooly-bg font-bold text-5xl">
                  {getInitials(firstName, lastName)}
                </span>
              </div>
            </div>

            {/* Basic Info */}
            <div className="flex-1">
              <div className="flex items-start justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-schooly-text">
                    {firstName} {lastName}
                  </h2>
                  <p className="text-schooly-text-secondary mt-1">
                    {student.studentId}
                  </p>
                </div>
                <Badge
                  variant={
                    student.status === 'Active'
                      ? 'success'
                      : student.status === 'Inactive'
                        ? 'error'
                        : 'default'
                  }
                >
                  {student.status}
                </Badge>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                <div className="flex items-center gap-3 p-3 bg-schooly-bg-secondary rounded-lg">
                  <Mail className="h-5 w-5 text-schooly-primary" />
                  <div>
                    <p className="text-xs text-schooly-text-secondary">Email</p>
                    <p className="text-sm font-medium text-schooly-text">
                      {student.email}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 bg-schooly-bg-secondary rounded-lg">
                  <Phone className="h-5 w-5 text-schooly-primary" />
                  <div>
                    <p className="text-xs text-schooly-text-secondary">Phone</p>
                    <p className="text-sm font-medium text-schooly-text">
                      {student.phone}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Personal Information */}
      <Card>
        <CardHeader>
          <CardTitle>Personal Information</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-lg bg-schooly-primary/10 flex items-center justify-center flex-shrink-0">
                <User className="h-5 w-5 text-schooly-primary" />
              </div>
              <div>
                <p className="text-sm text-schooly-text-secondary">Full Name</p>
                <p className="text-base font-medium text-schooly-text mt-1">
                  {firstName} {lastName}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-lg bg-schooly-primary/10 flex items-center justify-center flex-shrink-0">
                <Hash className="h-5 w-5 text-schooly-primary" />
              </div>
              <div>
                <p className="text-sm text-schooly-text-secondary">Student ID</p>
                <p className="text-base font-medium text-schooly-text mt-1">
                  {student.studentId}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-lg bg-schooly-primary/10 flex items-center justify-center flex-shrink-0">
                <Mail className="h-5 w-5 text-schooly-primary" />
              </div>
              <div>
                <p className="text-sm text-schooly-text-secondary">Email Address</p>
                <p className="text-base font-medium text-schooly-text mt-1">
                  {student.email}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-lg bg-schooly-primary/10 flex items-center justify-center flex-shrink-0">
                <Phone className="h-5 w-5 text-schooly-primary" />
              </div>
              <div>
                <p className="text-sm text-schooly-text-secondary">Phone Number</p>
                <p className="text-base font-medium text-schooly-text mt-1">
                  {student.phone}
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Academic Information */}
      <Card>
        <CardHeader>
          <CardTitle>Academic Information</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-lg bg-schooly-primary/10 flex items-center justify-center flex-shrink-0">
                <BookOpen className="h-5 w-5 text-schooly-primary" />
              </div>
              <div>
                <p className="text-sm text-schooly-text-secondary">Class</p>
                  <p className="text-base font-medium text-schooly-text mt-1">
                    {student.className}
                  </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-lg bg-schooly-primary/10 flex items-center justify-center flex-shrink-0">
                <MapPin className="h-5 w-5 text-schooly-primary" />
              </div>
              <div>
                <p className="text-sm text-schooly-text-secondary">Department</p>
                <p className="text-base font-medium text-schooly-text mt-1">
                  {student.department}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-lg bg-schooly-primary/10 flex items-center justify-center flex-shrink-0">
                <Calendar className="h-5 w-5 text-schooly-primary" />
              </div>
              <div>
                <p className="text-sm text-schooly-text-secondary">
                  Enrollment Date
                </p>
                <p className="text-base font-medium text-schooly-text mt-1">
                  {formatDate(student.enrollmentDate)}
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Account Status */}
      <Card>
        <CardHeader>
          <CardTitle>Account Status</CardTitle>
        </CardHeader>
        <CardContent>
          <div
            className={`p-6 rounded-lg ${
              student.status === 'Active'
                ? 'bg-green-500/10 border border-green-500/20'
                : 'bg-red-500/10 border border-red-500/20'
            }`}
          >
            <div className="flex items-center gap-3">
              <Badge
                variant={student.status === 'Active' ? 'success' : 'error'}
                className="text-base px-4 py-2"
              >
                {student.status}
              </Badge>
              <div>
                <p className="font-semibold text-schooly-text">
                  {student.status === 'Active'
                    ? 'Your account is active'
                    : 'Your account is not active'}
                </p>
                <p className="text-sm text-schooly-text-secondary mt-1">
                  {student.status === 'Active'
                    ? 'You have full access to all academic services and resources.'
                    : 'Please contact administration for assistance.'}
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
