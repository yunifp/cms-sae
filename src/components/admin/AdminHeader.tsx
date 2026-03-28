"use client";

import { Bell, UserCircle } from 'lucide-react';

export function AdminHeader() {
  return (
    <header className="h-20 bg-[#181A1F] border-b border-white/5 px-8 flex items-center justify-between sticky top-0 z-40">
      <div>
        <h2 className="text-xl font-medium text-white">Selamat Datang, Admin</h2>
        <p className="text-sm text-gray-400">Pantau dan kelola website Saeboemi Studio</p>
      </div>

      <div className="flex items-center gap-6">
        <button className="relative text-gray-400 hover:text-white transition-colors">
          <Bell className="w-5 h-5" />
          <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-[#DDF247] rounded-full border-2 border-[#181A1F]"></span>
        </button>
        
        <div className="flex items-center gap-3 pl-6 border-l border-white/10">
          <div className="text-right hidden md:block">
            <p className="text-sm font-medium text-white">Rangga P.</p>
            <p className="text-xs text-gray-400">Super Admin</p>
          </div>
          <UserCircle className="w-9 h-9 text-gray-400" />
        </div>
      </div>
    </header>
  );
}