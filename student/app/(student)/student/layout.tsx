import { StudentSidebar } from '@/src/components/layout/StudentSidebar';
import { StudentTopbar } from '@/src/components/layout/StudentTopbar';

export default function StudentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-schooly-bg">
      <StudentSidebar />
      <StudentTopbar />
      <main className="lg:ml-64 pt-16">
        <div className="p-6">{children}</div>
      </main>
    </div>
  );
}
