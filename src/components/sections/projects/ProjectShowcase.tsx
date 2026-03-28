"use client";

import { motion } from 'framer-motion';
import { User, Bookmark, Map, FileText, Play } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export function ProjectShowcase() {
  return (
    <section className="w-full bg-[#121418] py-24 px-4 lg:px-12">
      <div className="container mx-auto flex flex-col gap-12">
        
        {/* Top Section: Title & Details Box */}
        <div className="grid grid-cols-1 lg:grid-cols-[1.5fr_1fr] gap-12 items-start">
          
          {/* Kiri: Judul Proyek */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex flex-col gap-6"
          >
            <span className="text-sm tracking-widest uppercase font-medium text-[#DDF247]">
              Proyek 1
            </span>
            
            {/* Judul dibungkus Link agar bisa diklik ke halaman detail */}
            <Link href="/projects/luxury-home" className="hover:text-gray-300 transition-colors w-fit">
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-normal leading-tight text-white">
                Pembangunan Hunian Tropis Modern
              </h2>
            </Link>

            <div className="flex items-center gap-3 text-gray-400 mt-4">
              <FileText className="w-5 h-5 text-[#DDF247]" />
              <span className="text-sm tracking-widest uppercase">Tahun : 2023</span>
            </div>
          </motion.div>

          {/* Kanan: Info Box Gelap */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-[#181A1F] p-8 flex flex-col gap-6"
          >
            {/* Client Info */}
            <div className="flex items-center gap-4 border-b border-white/10 pb-4">
              <User className="w-5 h-5 text-[#DDF247] shrink-0" />
              <span className="text-sm text-gray-300 uppercase tracking-widest">Klien : Keluarga Pratama</span>
            </div>
            
            {/* Category Info */}
            <div className="flex items-center gap-4 border-b border-white/10 pb-4">
              <Bookmark className="w-5 h-5 text-[#DDF247] shrink-0" />
              <span className="text-sm text-gray-300 uppercase tracking-widest">Konstruksi Rumah Tinggal</span>
            </div>
            
            {/* Location Info */}
            <div className="flex items-center gap-4">
              <Map className="w-5 h-5 text-[#DDF247] shrink-0" />
              <span className="text-sm text-gray-300 uppercase tracking-widest">Lokasi : Bandung, Jawa Barat</span>
            </div>
          </motion.div>

        </div>

        {/* Bottom Section: Gambar Video Besar */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative w-full h-[50vh] min-h-[400px] lg:h-[700px] overflow-hidden group cursor-pointer rounded-sm"
        >
          {/* Link transparan yang membungkus seluruh area gambar agar bisa diklik */}
          <Link href="/projects/luxury-home" className="absolute inset-0 z-20" aria-label="Lihat Detail Proyek" />
          
          {/* Gambar dengan efek zoom tipis saat di-hover */}
          <Image 
            src="https://images.unsplash.com/photo-1600607686527-6fb886090705?q=80&w=2069&auto=format&fit=crop" 
            alt="Pembangunan Hunian Tropis Modern"
            fill
            className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
            sizes="(max-width: 1024px) 100vw, 80vw"
          />
          
          {/* Overlay gelap agar tombol play menonjol */}
          <div className="absolute inset-0 bg-black/20 transition-colors duration-500 group-hover:bg-black/40 z-10 pointer-events-none" />
          
          {/* Tombol Play */}
          <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
            <div className="w-20 h-20 md:w-24 md:h-24 rounded-full border-2 border-[#DDF247] flex items-center justify-center text-[#DDF247] transition-transform duration-300 group-hover:scale-110 bg-black/20 backdrop-blur-sm">
              <Play className="w-8 h-8 md:w-10 md:h-10 ml-2 fill-current" />
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}