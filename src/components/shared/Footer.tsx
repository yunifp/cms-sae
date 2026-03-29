/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export function Footer({ services }: { services: any[] }) {
  // Ambil maksimal 5 layanan agar footer tetap rapi
  const footerServices = services?.slice(0, 5) || [];

  return (
    <footer className="w-full bg-[#181A1F] pt-20 pb-10 px-4 lg:px-12 border-t border-white/5">
      <div className="container mx-auto">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          {/* Kolom 1: Brand Info */}
          <div className="flex flex-col gap-4">
            <div>
              <h2 className="text-3xl font-semibold text-white tracking-tight mb-1">Saeboemi</h2>
              <p className="text-xs text-gray-400 tracking-widest uppercase">Studio Arsitektur & Konstruksi</p>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed mt-4">
              Solusi terbaik untuk bangun dan renovasi rumah. Kami mengutamakan kualitas dengan budget yang terkontrol dan proses pengerjaan yang sepenuhnya transparan.
            </p>
          </div>

          {/* Kolom 2: Services Links (DINAMIS) */}
          <div className="flex flex-col gap-6">
            <h3 className="text-white text-xl font-medium">Layanan Kami</h3>
            <ul className="flex flex-col gap-4">
              {footerServices.length > 0 ? (
                footerServices.map((service: any) => (
                  <li key={service.id}>
                    <Link 
                      href={`/services/${service.slug}`} 
                      className="text-gray-400 hover:text-[#DDF247] text-sm transition-colors uppercase tracking-widest"
                    >
                      {service.name}
                    </Link>
                  </li>
                ))
              ) : (
                <li className="text-gray-600 text-xs italic">Belum ada layanan tersedia</li>
              )}
            </ul>
          </div>

          {/* Kolom 3: Contact Info */}
          <div className="flex flex-col gap-6">
            <h3 className="text-white text-xl font-medium">Informasi Kontak</h3>
            <div className="flex flex-col gap-4 text-sm text-gray-400">
              <p>Jl. Jalaprang No.24, Sukaluyu,<br />Kec. Cibeunying Kaler, Kota Bandung,<br />Jawa Barat 40123, Indonesia</p>
              <p>Telepon: +62 811-0000-0000</p>
              <p>Email: studiosaboemi@gmail.com</p>
            </div>
          </div>

          {/* Kolom 4: Newsletter */}
          <div className="flex flex-col gap-6">
            <h3 className="text-white text-xl font-medium">Info Terbaru</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              Berlangganan buletin kami untuk mendapatkan informasi terbaru dan tips seputar dunia konstruksi.
            </p>
            
            <form className="flex w-full mt-2" onSubmit={(e) => e.preventDefault()}>
              <input 
                type="email" 
                placeholder="Email Anda" 
                required
                className="flex-1 bg-white text-black px-4 py-3 outline-none text-sm min-w-0"
              />
              <button 
                type="submit" 
                className="bg-[#DDF247] px-4 py-3 text-black hover:bg-[#c5db38] transition-colors flex items-center justify-center"
              >
                <ArrowRight className="w-5 h-5" />
              </button>
            </form>
          </div>

        </div>

        <hr className="border-white/10 mb-8" />

        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-400">
          <p>Copyright © 2026 Saeboemi Studio</p>
          <p>Designed by SaeBoemi</p>
        </div>

      </div>
    </footer>
  );
}