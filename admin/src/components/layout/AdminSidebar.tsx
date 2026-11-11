'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, Users, GraduationCap, BookOpen, FolderOpen, Calendar, ClipboardList, Settings } from 'lucide-react';
import { cn } from '@/src/lib/utils';

const navigation = [
  { name: 'Dashboard', href: '/admin/dashboard', icon: LayoutDashboard },
  { name: 'Students', href: '/admin/students', icon: Users },
  { name: 'Teachers', href: '/admin/teachers', icon: GraduationCap },
  { name: 'Classes', href: '/admin/classes', icon: FolderOpen },
  { name: 'Subjects', href: '/admin/subjects', icon: BookOpen },
  { name: 'Academic Terms', href: '/admin/terms', icon: Calendar },
  { name: 'Grades', href: '/admin/grades', icon: ClipboardList },
];

export function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed left-0 top-0 z-40 h-screen w-64 bg-schooly-bg-secondary border-r border-schooly-border hidden lg:block">
      <div className="flex flex-col h-full">
        <div className="flex items-center gap-2 px-6 py-6 border-b border-schooly-border">
          <div className="w-8 h-8 rounded-lg bg-schooly-primary flex items-center justify-center">
            <span className="text-schooly-bg font-bold text-lg">S</span>
          </div>
          <span className="text-xl font-bold text-schooly-text">Schooly</span>
          <span className="text-xs text-schooly-primary ml-auto bg-schooly-primary/10 px-2 py-1 rounded">Admin</span>
        </div>

        <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
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

        <div className="px-6 py-4 border-t border-schooly-border">
          <Link
            href="/admin/settings"
            className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-schooly-text-secondary hover:bg-schooly-bg-card hover:text-schooly-text transition-colors"
          >
            <Settings className="h-5 w-5" />
            Settings
          </Link>
        </div>
      </div>
    </aside>
  );
}