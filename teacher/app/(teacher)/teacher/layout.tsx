import { TeacherSidebar } from '@/src/components/layout/TeacherSidebar';
import { TeacherTopbar } from '@/src/components/layout/TeacherTopbar';

export default function TeacherLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-schooly-bg">
      <TeacherSidebar />
      <TeacherTopbar />
      <main className="lg:ml-64 pt-16">
        <div className="p-6">{children}</div>
      </main>
    </div>
  );
}
