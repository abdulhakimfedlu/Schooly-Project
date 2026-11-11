'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  GraduationCap,
  BookOpen,
  BarChart3,
  History,
  User,
} from 'lucide-react';
import { cn } from '@/src/lib/utils';

const navigation = [
  { name: 'Dashboard', href: '/student/dashboard', icon: LayoutDashboard },
  { name: 'My Grades', href: '/student/grades', icon: GraduationCap },
  { name: 'My Subjects', href: '/student/subjects', icon: BookOpen },
  { name: 'Analytics', href: '/student/analytics', icon: BarChart3 },
  { name: 'Academic History', href: '/student/history', icon: History },
  { name: 'Profile', href: '/student/profile', icon: User },
];

export function StudentSidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed left-0 top-0 z-40 h-screen w-64 bg-schooly-bg-secondary border-r border-schooly-border hidden lg:block">
      <div className="flex flex-col h-full">
        {/* Logo */}
        <div className="flex items-center gap-2 px-6 py-6 border-b border-schooly-border">
          <div className="w-8 h-8 rounded-lg bg-schooly-primary flex items-center justify-center">
            <span className="text-schooly-bg font-bold text-lg">S</span>
          </div>
          <span className="text-xl font-bold text-schooly-text">Schooly</span>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto scrollbar-thin">
          {navigation.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;

            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  'flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors',
                  isActive
                    ? 'bg-schooly-primary/10 text-schooly-primary'
                    : 'text-schooly-text-secondary hover:bg-schooly-bg-card hover:text-schooly-text'
                )}
              >
                <Icon className="h-5 w-5" />
                {item.name}
              </Link>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-schooly-border">
          <p className="text-xs text-schooly-text-secondary">
            © 2024 Schooly. Student Portal
          </p>
        </div>
      </div>
    </aside>
  );
}
