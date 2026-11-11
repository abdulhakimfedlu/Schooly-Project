import { AdminSidebar } from '@/src/components/layout/AdminSidebar';
import { AdminTopbar } from '@/src/components/layout/AdminTopbar';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-schooly-bg">
      <AdminSidebar />
      <AdminTopbar />
      <main className="lg:ml-64 pt-16">
        <div className="p-6">{children}</div>
      </main>
    </div>
  );
}