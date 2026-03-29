/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Home, ArrowRight } from 'lucide-react';
import { motion, Variants } from 'framer-motion';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export function Hero({ data }: { data: any }) {
  // Jika data belum ditarik dari API, kita bisa return null atau skeleton
  if (!data) return null;

  const IMAGE_BASE_URL = 'httpa://api.saeboemi.com/';
  
  // Logika Gambar: Gunakan dari database atau fallback ke gambar default Unsplash
  const bgImage = data.imageUrl 
    ? `${IMAGE_BASE_URL}${data.imageUrl}` 
    : 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=2075&auto=format&fit=crop';

  const fadeUpVariant: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
  };

  return (
    <section className="w-full bg-[#121418] pb-12 pt-4 px-4 lg:px-12">
      
      <div className="relative w-full h-[85vh] min-h-[600px] rounded-sm overflow-hidden">
        
        {/* Background Image Dinamis */}
        <div 
          className="absolute inset-0 bg-cover bg-center transition-all duration-700"
          style={{ backgroundImage: `url('${bgImage}')` }}
        />
        
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/80" />

        <div className="relative z-10 w-full h-full flex flex-col justify-between p-6 lg:p-16 text-white">
          
          {/* Header Kecil Dinamis */}
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={fadeUpVariant}
            className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4"
          >
            <div className="flex items-center gap-2 text-sm tracking-widest uppercase font-medium text-[#DDF247]">
              <Home className="h-4 w-4" />
              <span>{data.subtitle || "Arsitektur & Konstruksi"}</span>
            </div>
            
            <div className="flex items-center gap-4 text-sm font-light">
              <span className="font-bold text-lg">{data.location || "Bandung"}</span>
              <div className="w-12 h-[1px] bg-white/50" />
              <span className="max-w-[150px] leading-tight text-gray-300">
                Solusi Bangun & Renovasi Rumah
              </span>
            </div>
          </motion.div>

          <div className="mt-auto max-w-5xl">
            {/* Judul Utama Dinamis */}
            <motion.h1 
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
              className="text-4xl md:text-6xl lg:text-7xl font-normal leading-tight mb-12 whitespace-pre-line"
            >
              {data.title}
            </motion.h1>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
              className="flex flex-col md:flex-row items-start md:items-end justify-between gap-8"
            >
              {/* Deskripsi Dinamis */}
              <p className="text-gray-300 max-w-2xl text-sm md:text-base leading-relaxed">
                {data.description}
              </p>

              {/* Button Dinamis */}
              <Button 
                asChild 
                className="bg-[#DDF247] text-black hover:bg-[#c5db38] rounded-none px-8 py-6 font-semibold shrink-0"
              >
                <Link href={data.buttonLink || "/explore"}>
                  {data.buttonText || "Konsultasi Sekarang"} <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}