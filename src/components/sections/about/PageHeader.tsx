"use client";

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { Fragment } from 'react';

interface PageHeaderProps {
  title: string;
  breadcrumbs: { name: string; href: string }[];
  bgImage?: string; // Buat opsional
}

export function PageHeader({ title, breadcrumbs, bgImage }: PageHeaderProps) {
  const IMAGE_BASE_URL = 'httpa://api.saeboemi.com/';
  
  // Logika Fallback: Jika bgImage tidak ada atau default, gunakan Unsplash
  const finalImage = bgImage 
    ? (bgImage.startsWith('http') ? bgImage : `${IMAGE_BASE_URL}${bgImage}`)
    : "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop";

  return (
    <section className="relative w-full h-[350px] md:h-[450px] flex items-center justify-center overflow-hidden bg-[#181A1F]">
      
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image 
          src={finalImage}
          alt={title}
          fill
          className="object-cover object-center"
          priority
          unoptimized // Gunakan jika gambar dari backend sering berubah/external
        />
        <div className="absolute inset-0 bg-black/70" />
      </div>

      {/* Konten Teks */}
      <div className="relative z-10 text-center flex flex-col items-center gap-4 px-4">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl lg:text-6xl font-normal text-white uppercase tracking-tight"
        >
          {title}
        </motion.h1>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex items-center gap-3 text-[10px] md:text-xs tracking-[0.2em] uppercase text-gray-400 font-medium"
        >
          {breadcrumbs.map((crumb, index) => (
            <Fragment key={index}>
              {index > 0 && <span className="text-gray-600">/</span>}
              <Link 
                href={crumb.href} 
                className="hover:text-[#DDF247] transition-colors"
              >
                {crumb.name}
              </Link>
            </Fragment>
          ))}
        </motion.div>
      </div>

    </section>
  );
}