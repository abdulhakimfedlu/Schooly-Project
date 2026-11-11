'use client';

import { useState } from 'react';
import { Bell, Menu, LogOut, Settings, User as UserIcon } from 'lucide-react';
import { useStudent } from '@/src/hooks/useStudent';
import { authService } from '@/src/services/api';
import { getInitials } from '@/src/lib/utils';
import { EmptyState } from '@/src/components/ui/PageState';

export function StudentTopbar() {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const { data: student, loading, error } = useStudent();

  const handleSignOut = async () => {
    await authService.logout();
    setShowProfile(false);
  };

  const initials = student ? getInitials(student.fullName?.split(' ')[0] || '', student.fullName?.split(' ')[1] || '') : '??';

  return (
    <header className="fixed top-0 right-0 left-0 lg:left-64 z-30 h-16 bg-schooly-bg-secondary border-b border-schooly-border">
      <div className="flex items-center justify-between h-full px-6">
        {/* Left side */}
        <div className="flex items-center gap-4">
          <button className="lg:hidden text-schooly-text hover:text-schooly-primary transition-colors">
            <Menu className="h-6 w-6" />
          </button>
          <div>
            {loading ? (
              <p className="text-lg font-semibold text-schooly-text-secondary animate-pulse">
                Loading...
              </p>
            ) : error ? (
              <p className="text-lg font-semibold text-schooly-text-secondary">
                Welcome back
              </p>
            ) : (
              <>
                <h1 className="text-lg font-semibold text-schooly-text">
                  Welcome back, {student?.fullName?.split(' ')[0] || 'Student'}!
                </h1>
                {student?.className && (
                  <p className="text-xs text-schooly-text-secondary">
                    {student.className}
                  </p>
                )}
              </>
            )}
          </div>
        </div>

        {/* Right side */}
        <div className="flex items-center gap-4">
          {/* Notifications */}
          <div className="relative">
            <button
              onClick={() => {
                setShowNotifications(!showNotifications);
                setShowProfile(false);
              }}
              className="relative p-2 text-schooly-text-secondary hover:text-schooly-text hover:bg-schooly-bg-card rounded-lg transition-colors"
            >
              <Bell className="h-5 w-5" />
            </button>

            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 bg-schooly-bg-card border border-schooly-border rounded-xl shadow-xl overflow-hidden">
                <div className="p-4 border-b border-schooly-border">
                  <h3 className="font-semibold text-schooly-text">Notifications</h3>
                </div>
                <div className="p-6">
                  <EmptyState title="No notifications" />
                </div>
              </div>
            )}
          </div>

          {/* Profile */}
          <div className="relative">
            <button
              onClick={() => {
                setShowProfile(!showProfile);
                setShowNotifications(false);
              }}
              className="flex items-center gap-3 p-2 hover:bg-schooly-bg-card rounded-lg transition-colors"
            >
              <div className="w-8 h-8 rounded-full bg-schooly-primary flex items-center justify-center">
                <span className="text-schooly-bg font-semibold text-sm">
                  {initials}
                </span>
              </div>
              {!loading && !error && student ? (
                <div className="hidden md:block text-left">
                  <p className="text-sm font-medium text-schooly-text">
                    {student.fullName}
                  </p>
                  {student.studentId && (
                    <p className="text-xs text-schooly-text-secondary">
                      {student.studentId}
                    </p>
                  )}
                </div>
              ) : null}
            </button>

            {showProfile && (
              <div className="absolute right-0 mt-2 w-56 bg-schooly-bg-card border border-schooly-border rounded-xl shadow-xl overflow-hidden">
                <div className="p-4 border-b border-schooly-border">
                  {loading ? (
                    <p className="text-schooly-text-secondary animate-pulse">Loading profile...</p>
                  ) : student ? (
                    <>
                      <p className="font-semibold text-schooly-text">
                        {student.fullName}
                      </p>
                      {student.email && (
                        <p className="text-xs text-schooly-text-secondary mt-1">
                          {student.email}
                        </p>
                      )}
                    </>
                  ) : (
                    <p className="text-schooly-text-secondary">Profile unavailable</p>
                  )}
                </div>
                <div className="p-2">
                  {!loading && student && (
                    <>
                      <button className="w-full flex items-center gap-3 px-3 py-2 text-sm text-schooly-text hover:bg-schooly-bg-secondary rounded-lg transition-colors">
                        <UserIcon className="h-4 w-4" />
                        My Profile
                      </button>
                      <button className="w-full flex items-center gap-3 px-3 py-2 text-sm text-schooly-text hover:bg-schooly-bg-secondary rounded-lg transition-colors">
                        <Settings className="h-4 w-4" />
                        Settings
                      </button>
                    </>
                  )}
                </div>
                <div className="p-2 border-t border-schooly-border">
                  <button
                    onClick={handleSignOut}
                    className="w-full flex items-center gap-3 px-3 py-2 text-sm text-red-400 hover:bg-red-500/10 rounded-lg transition-colors disabled:opacity-50"
                    disabled={loading}
                  >
                    <LogOut className="h-4 w-4" />
                    Sign Out
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
