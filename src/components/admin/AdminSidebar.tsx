"use client";

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { LayoutDashboard, FileText, Info, LogOut, Wrench, HelpCircle, Monitor, BarChart3, SquareStack, Star, PhoneCall, Users, User } from 'lucide-react';

export function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const menuItems = [
    { name: 'Dashboard', icon: LayoutDashboard, path: '/admin/dashboard' },
    { name: 'Kelola Hero', icon: Monitor, path: '/admin/dashboard/hero' },
    { name: 'Kelola Keunggulan', icon: BarChart3, path: '/admin/dashboard/advantage' },
    { name: 'Statistik Layanan', icon: SquareStack, path: '/admin/dashboard/services/settings' },
    { name: 'Kelola Kontak', icon: PhoneCall, path: '/admin/dashboard/contact-settings' },
    { name: 'Kelola Testimoni', icon: Star, path: '/admin/dashboard/testimonials' },
    { name: 'Kelola Tentang Kami', icon: Info, path: '/admin/dashboard/abouts' },
    { name: 'Kelola Tim', icon: Users, path: '/admin/dashboard/abouts/team' },
    { name: 'Kelola Proyek', icon: Wrench, path: '/admin/dashboard/projects' },
    { name: 'Kelola Layanan', icon: Wrench, path: '/admin/dashboard/services' },
    { name: 'Kelola Artikel', icon: FileText, path: '/admin/dashboard/posts' },
    { name: 'Kelola FAQ', icon: HelpCircle, path: '/admin/dashboard/faqs' }, 
    { name: 'Kelola User', icon: User, path: '/admin/dashboard/users' },
  ];

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    router.replace('/admin/login');
  };

  return (
    <aside className="w-64 bg-[#181A1F] border-r border-white/5 h-screen flex flex-col sticky top-0 hidden md:flex shrink-0">
      {/* Logo Area - Tetap (Static) */}
      <div className="h-20 flex items-center px-8 border-b border-white/5 shrink-0">
        <h2 className="text-2xl font-semibold text-[#DDF247] tracking-tight">Saeboemi.</h2>
      </div>

      {/* Menu Links - Bagian ini yang bisa Scroll */}
      <div className="flex-1 py-8 px-4 flex flex-col gap-2 overflow-y-auto scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent hover:scrollbar-thumb-white/20 transition-all">
        <p className="text-xs text-gray-500 font-medium tracking-widest uppercase mb-4 px-4 shrink-0">Menu Utama</p>

        {menuItems.map((item) => {
          const isActive = pathname === item.path;
          return (
            <Link
              key={item.path}
              href={item.path}
              className={`flex items-center gap-3 px-4 py-3 rounded-sm transition-all duration-300 shrink-0 ${isActive
                  ? 'bg-[#DDF247]/10 text-[#DDF247]'
                  : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`}
            >
              <item.icon className="w-5 h-5" />
              <span className="font-medium text-sm">{item.name}</span>
            </Link>
          );
        })}
      </div>

      {/* Logout Area - Tetap di Bawah (Static) */}
      <div className="p-4 border-t border-white/5 shrink-0">
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-sm text-red-400 hover:text-red-300 hover:bg-red-400/10 transition-all duration-300"
        >
          <LogOut className="w-5 h-5" />
          <span className="font-medium text-sm">Keluar</span>
        </button>
      </div>

      {/* CSS Inline untuk scrollbar halus */}
      <style jsx>{`
        div::-webkit-scrollbar {
          width: 4px;
        }
        div::-webkit-scrollbar-track {
          background: transparent;
        }
        div::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.05);
          border-radius: 10px;
        }
        div:hover::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.1);
        }
      `}</style>
    </aside>
  );
}