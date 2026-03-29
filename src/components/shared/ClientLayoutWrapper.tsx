/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { usePathname } from 'next/navigation';
import { Navbar } from '@/components/shared/Navbar';
import { Footer } from '@/components/shared/Footer';

export default function ClientLayoutWrapper({
  children,
  services, // Terima data services
}: {
  children: React.ReactNode;
  services: any[]; // Definisi tipe data
}) {
  const pathname = usePathname();
  
  // Mengecek apakah kita sedang berada di halaman admin
  const isAdminRoute = pathname?.startsWith('/admin');

  return (
    <>
      {!isAdminRoute && <Navbar />}
      
      <main className="flex-grow">
        {children}
      </main>
      
      {/* Kirim data services ke Footer agar list layanan jadi dinamis */}
      {!isAdminRoute && <Footer services={services} />}
    </>
  );
}