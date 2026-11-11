'use client';

import { Bell, Menu, LogOut } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface AdminTopbarProps {
  adminName?: string;
}

export function AdminTopbar({ adminName = 'Admin' }: AdminTopbarProps) {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem('admin_token');
    router.push('/login');
  };

  return (
    <header className="fixed top-0 right-0 left-0 lg:left-64 z-30 h-16 bg-schooly-bg-secondary border-b border-schooly-border">
      <div className="flex items-center justify-between h-full px-6">
        <div className="flex items-center gap-4">
          <button className="lg:hidden text-schooly-text">
            <Menu className="h-6 w-6" />
          </button>
          <div>
            <h1 className="text-lg font-semibold text-schooly-text">
              Admin Dashboard
            </h1>
            <p className="text-xs text-schooly-text-secondary">
              Manage your school system
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <button className="relative p-2 text-schooly-text-secondary hover:text-schooly-text hover:bg-schooly-bg-card rounded-lg">
            <Bell className="h-5 w-5" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-schooly-primary rounded-full"></span>
          </button>

          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-schooly-primary flex items-center justify-center">
              <span className="text-schooly-bg font-semibold text-sm">A</span>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 text-sm text-schooly-text-secondary hover:text-red-400 transition-colors"
            >
              <LogOut className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}