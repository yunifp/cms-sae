"use client";

import { Home, ArrowRight } from 'lucide-react';
import { motion, Variants } from 'framer-motion';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export function Hero() {
  const fadeUpVariant: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
  };

  return (
    // Background gelap di luar gambar agar serasi dengan navbar
    <section className="w-full bg-[#121418] pb-12 pt-4 px-4 lg:px-12">
      
      {/* Container Gambar Utama */}
      <div className="relative w-full h-[85vh] min-h-[600px] rounded-sm overflow-hidden">
        
        {/* Background Image dengan Parallax effect ringan (opsional) */}
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ 
            backgroundImage: "url('https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=2075&auto=format&fit=crop')",
          }}
        />
        
        {/* Overlay gradient gelap agar teks terbaca */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/80" />

        {/* Konten Hero */}
        <div className="relative z-10 w-full h-full flex flex-col justify-between p-6 lg:p-16 text-white">
          
          {/* Header Kecil (Kiri & Kanan) */}
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={fadeUpVariant}
            className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4"
          >
            <div className="flex items-center gap-2 text-sm tracking-widest uppercase font-medium">
              <Home className="h-4 w-4" />
              <span>Arsitektur & Konstruksi</span>
            </div>
            
            <div className="flex items-center gap-4 text-sm font-light">
              <span className="font-bold text-lg">Bandung</span>
              <div className="w-12 h-[1px] bg-white/50" />
              <span className="max-w-[150px] leading-tight text-gray-300">
                Solusi Bangun & Renovasi Rumah
              </span>
            </div>
          </motion.div>

          {/* Area Teks Utama & Tombol di Bawah */}
          <div className="mt-auto max-w-5xl">
            <motion.h1 
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
              className="text-4xl md:text-6xl lg:text-7xl font-normal leading-tight mb-12"
            >
              Wujudkan Rumah Impian <br className="hidden md:block" /> Bersama Saeboemi Studio
            </motion.h1>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
              className="flex flex-col md:flex-row items-start md:items-end justify-between gap-8"
            >
              <p className="text-gray-300 max-w-2xl text-sm md:text-base leading-relaxed">
                Kami hadir memberikan layanan Architecture, Construction, dan Interior. Solusi terbaik untuk bangun dan renovasi rumah dengan budget yang terkontrol dan proses pengerjaan yang transparan. Mari rencanakan hunian impianmu dari sekarang.
              </p>

              <Button 
                asChild 
                className="bg-[#DDF247] text-black hover:bg-[#c5db38] rounded-none px-8 py-6 font-semibold shrink-0"
              >
                <Link href="/explore">
                  Konsultasi Sekarang <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}