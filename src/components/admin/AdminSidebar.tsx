"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, FolderKanban, FileText, Settings, LogOut, Wrench } from 'lucide-react';

export function AdminSidebar() {
  const pathname = usePathname();

  const menuItems = [
    { name: 'Dashboard', icon: LayoutDashboard, path: '/admin/dashboard' },
    { name: 'Kelola Proyek', icon: FolderKanban, path: '/admin/dashboard/projects' },
    { name: 'Kelola Layanan', icon: Wrench, path: '/admin/dashboard/services' },
    { name: 'Kelola Artikel', icon: FileText, path: '/admin/dashboard/posts' },
    { name: 'Pengaturan', icon: Settings, path: '/admin/dashboard/settings' },
  ];

  return (
    <aside className="w-64 bg-[#181A1F] border-r border-white/5 h-screen flex flex-col sticky top-0 hidden md:flex">
      {/* Logo Area */}
      <div className="h-20 flex items-center px-8 border-b border-white/5">
        <h2 className="text-2xl font-semibold text-[#DDF247] tracking-tight">Saeboemi.</h2>
      </div>

      {/* Menu Links */}
      <div className="flex-1 py-8 px-4 flex flex-col gap-2">
        <p className="text-xs text-gray-500 font-medium tracking-widest uppercase mb-4 px-4">Menu Utama</p>
        
        {menuItems.map((item) => {
          const isActive = pathname === item.path;
          return (
            <Link 
              key={item.path} 
              href={item.path}
              className={`flex items-center gap-3 px-4 py-3 rounded-sm transition-all duration-300 ${
                isActive 
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

      {/* Logout Area */}
      <div className="p-4 border-t border-white/5">
        <Link 
          href="/admin/login"
          className="flex items-center gap-3 px-4 py-3 rounded-sm text-red-400 hover:text-red-300 hover:bg-red-400/10 transition-all duration-300"
        >
          <LogOut className="w-5 h-5" />
          <span className="font-medium text-sm">Keluar</span>
        </Link>
      </div>
    </aside>
  );
}