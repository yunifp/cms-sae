"use client";

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { Fragment } from 'react';

// Menentukan tipe data untuk props (agar TypeScript aman)
interface PageHeaderProps {
  title: string;
  breadcrumbs: { name: string; href: string }[];
  bgImage: string;
}

export function PageHeader({ title, breadcrumbs, bgImage }: PageHeaderProps) {
  return (
    <section className="relative w-full h-[350px] md:h-[450px] flex items-center justify-center overflow-hidden">
      
      {/* Background Image dengan Next/Image */}
      <div className="absolute inset-0 z-0">
        <Image 
          src={bgImage}
          alt={title}
          fill
          className="object-cover object-center"
          priority // Prioritaskan loading untuk gambar header
        />
        {/* Overlay Gelap agar teks terbaca */}
        <div className="absolute inset-0 bg-black/60" />
      </div>

      {/* Konten Teks */}
      <div className="relative z-10 text-center flex flex-col items-center gap-4 px-4">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl lg:text-6xl font-normal text-white"
        >
          {title}
        </motion.h1>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex items-center gap-2 text-xs md:text-sm tracking-widest uppercase text-gray-400 font-medium"
        >
          {breadcrumbs.map((crumb, index) => (
            <Fragment key={index}>
              {index > 0 && <span className="text-gray-600">-</span>}
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