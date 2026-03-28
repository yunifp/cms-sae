import { AdminSidebar } from '@/components/admin/AdminSidebar';
import { AdminHeader } from '@/components/admin/AdminHeader';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#0B0F14] flex font-sans text-white">
      {/* Sidebar - Fix di kiri */}
      <AdminSidebar />

      {/* Area Kanan (Header + Konten) */}
      <div className="flex-1 flex flex-col min-w-0">
        <AdminHeader />
        
        {/* Konten Utama yang akan berubah-ubah (Page) */}
        <main className="flex-1 p-8 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}