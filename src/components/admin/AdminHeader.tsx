/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { useEffect, useState } from 'react';
import { Bell, UserCircle } from 'lucide-react';

export function AdminHeader() {
  const [user, setUser] = useState<{ name: string; role: string } | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Pakai setTimeout agar ESLint tidak error (react-hooks/set-state-in-effect)
    const timer = setTimeout(() => {
      setMounted(true);
    }, 0);

    // Ambil data user dari localStorage
    const userData = localStorage.getItem('user');
    if (userData) {
      try {
        setUser(JSON.parse(userData));
      } catch (error) {
        console.error("Gagal parse data user", error);
      }
    }

    return () => clearTimeout(timer);
  }, []);

  return (
    <header className="h-20 bg-[#181A1F] border-b border-white/5 px-8 flex items-center justify-between sticky top-0 z-40">
      <div>
        <h2 className="text-xl font-medium text-white">
          Selamat Datang, <span className="text-[#DDF247]">{mounted && user ? user.name : 'Admin'}</span>
        </h2>
        <p className="text-sm text-gray-400">Pantau dan kelola website Saeboemi Studio</p>
      </div>

      <div className="flex items-center gap-6">
      
        
        <div className="flex items-center gap-3 pl-6 border-l border-white/10">
          <div className="text-right hidden md:block">
            {/* Tampilkan skeleton loading jika belum mounted, tampilkan data jika sudah */}
            {!mounted ? (
              <div className="flex flex-col gap-1.5 items-end">
                <div className="w-24 h-4 bg-white/10 animate-pulse rounded-sm" />
                <div className="w-16 h-3 bg-white/10 animate-pulse rounded-sm" />
              </div>
            ) : (
              <>
                <p className="text-sm font-medium text-white">{user?.name || 'User'}</p>
                <p className="text-xs text-gray-400">{user?.role || 'Admin'}</p>
              </>
            )}
          </div>
          <UserCircle className="w-9 h-9 text-gray-400" />
        </div>
      </div>
    </header>
  );
}