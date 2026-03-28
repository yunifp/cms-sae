"use client";

import { usePathname } from 'next/navigation';
import { Navbar } from '@/components/shared/Navbar';
import { Footer } from '@/components/shared/Footer';

export default function ClientLayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  
  // Mengecek apakah kita sedang berada di halaman admin atau login admin
  const isAdminRoute = pathname?.startsWith('/admin');

  return (
    <>
      {/* Navbar hanya muncul jika BUKAN di rute admin */}
      {!isAdminRoute && <Navbar />}
      
      <main className="flex-grow">
        {children}
      </main>
      
      {/* Footer hanya muncul jika BUKAN di rute admin */}
      {!isAdminRoute && <Footer />}
    </>
  );
}