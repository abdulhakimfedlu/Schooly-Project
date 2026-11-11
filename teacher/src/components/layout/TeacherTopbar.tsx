'use client';

import { Bell, Menu } from 'lucide-react';

export function TeacherTopbar() {
  // TODO: Fetch teacher data from API
  const teacherName = 'Teacher';
  const teacherDepartment = 'Loading...';

  return (
    <header className="fixed top-0 right-0 left-0 lg:left-64 z-30 h-16 bg-schooly-bg-secondary border-b border-schooly-border">
      <div className="flex items-center justify-between h-full px-6">
        <div className="flex items-center gap-4">
          <button className="lg:hidden text-schooly-text">
            <Menu className="h-6 w-6" />
          </button>
          <div>
            <h1 className="text-lg font-semibold text-schooly-text">
              Welcome, {teacherName}!
            </h1>
            <p className="text-xs text-schooly-text-secondary">
              {teacherDepartment}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <button className="relative p-2 text-schooly-text-secondary hover:text-schooly-text hover:bg-schooly-bg-card rounded-lg">
            <Bell className="h-5 w-5" />
          </button>

          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-schooly-primary flex items-center justify-center">
              <span className="text-schooly-bg font-semibold text-sm">T</span>
            </div>
            <div className="hidden md:block">
              <p className="text-sm font-medium text-schooly-text">{teacherName}</p>
              <p className="text-xs text-schooly-text-secondary">Teacher Portal</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
