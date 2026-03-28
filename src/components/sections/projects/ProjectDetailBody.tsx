"use client";

import { motion } from 'framer-motion';
import { User, Bookmark, Map, FileText } from 'lucide-react';
import Image from 'next/image';

export function ProjectDetailBody() {
  return (
    <section className="w-full bg-[#121418] py-24 px-4 lg:px-12">
      {/* max-w-5xl agar paragraf tidak terlalu melebar dan nyaman dibaca */}
      <div className="container mx-auto max-w-5xl flex flex-col gap-16">
        
        {/* Top Header & Box (Mirip Showcase) */}
        <div className="grid grid-cols-1 md:grid-cols-[1.5fr_1fr] gap-12 items-start">
          <div className="flex flex-col gap-4">
            <span className="text-sm tracking-widest uppercase font-medium text-[#DDF247]">
              Detail Proyek
            </span>
            <h2 className="text-4xl md:text-5xl lg:text-5xl font-normal leading-tight text-white">
              Hunian Eksklusif Pemandangan Pegunungan
            </h2>
            <div className="flex items-center gap-3 text-gray-400 mt-2">
              <FileText className="w-5 h-5 text-[#DDF247]" />
              <span className="text-sm tracking-widest uppercase">Tahun : 2024</span>
            </div>
          </div>

          <div className="bg-[#181A1F] p-8 flex flex-col gap-6 w-full">
            <div className="flex items-center gap-4 border-b border-white/10 pb-4">
              <User className="w-5 h-5 text-[#DDF247] shrink-0" />
              <span className="text-sm text-gray-300 uppercase tracking-widest truncate">Klien : Keluarga Kusuma</span>
            </div>
            <div className="flex items-center gap-4 border-b border-white/10 pb-4">
              <Bookmark className="w-5 h-5 text-[#DDF247] shrink-0" />
              <span className="text-sm text-gray-300 uppercase tracking-widest truncate">Konstruksi & Arsitektur</span>
            </div>
            <div className="flex items-center gap-4">
              <Map className="w-5 h-5 text-[#DDF247] shrink-0" />
              <span className="text-sm text-gray-300 uppercase tracking-widest truncate">Lokasi : Lembang, Bandung</span>
            </div>
          </div>
        </div>

        {/* Project Overview */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col gap-6"
        >
          <h3 className="text-white text-2xl font-medium">Ringkasan Proyek</h3>
          <p className="text-gray-400 leading-relaxed text-sm md:text-base">
            Proyek ini bertujuan untuk menciptakan hunian eksklusif yang menyatu harmonis dengan lingkungan alam sekitarnya. Saeboemi Studio dipercaya untuk menangani keseluruhan proses mulai dari perencanaan arsitektur, desain interior, hingga eksekusi konstruksi di lapangan. Fokus utama kami adalah memastikan setiap ruang berfungsi optimal, memiliki pencahayaan alami yang baik, serta direalisasikan dengan manajemen budget yang ketat.
          </p>
        </motion.div>

        {/* 2 Column Image Grid */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          <div className="relative w-full aspect-[4/3] rounded-sm overflow-hidden">
            <Image src="https://images.unsplash.com/photo-1510798831971-661eb04b3739?q=80&w=2000&auto=format&fit=crop" alt="Eksterior Rumah Pemandangan Pegunungan" fill className="object-cover" sizes="(max-width: 768px) 100vw, 50vw" />
          </div>
          <div className="relative w-full aspect-[4/3] rounded-sm overflow-hidden">
            <Image src="https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?q=80&w=2070&auto=format&fit=crop" alt="Interior Rumah" fill className="object-cover" sizes="(max-width: 768px) 100vw, 50vw" />
          </div>
        </motion.div>

        {/* Middle Text Content */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col gap-6"
        >
          <p className="text-gray-400 leading-relaxed text-sm md:text-base">
            Desain arsitektur difokuskan pada pemanfaatan bukaan besar untuk memaksimalkan sirkulasi udara alami dan pencahayaan matahari. Pemilihan material seperti kayu solid dan batu alam memberikan sentuhan hangat sekaligus mempertahankan daya tahan struktur di daerah dengan curah hujan cukup tinggi.
          </p>
          <p className="text-gray-400 leading-relaxed text-sm md:text-base">
            Selama proses konstruksi, kami menerapkan sistem pengawasan yang terstruktur. Klien selalu mendapatkan laporan progres harian secara transparan, mencakup pemakaian material hingga penyerapan anggaran. Hal ini memberikan ketenangan pikiran bagi klien bahwa proyek berjalan sesuai rencana.
          </p>
        </motion.div>

        {/* 3 Column Image Grid */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {/* Gambar Balcony */}
          <div className="relative w-full aspect-[3/4] rounded-sm overflow-hidden">
             <Image src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070&auto=format&fit=crop" alt="Area Balkon" fill className="object-cover" sizes="(max-width: 768px) 100vw, 33vw" />
          </div>
          {/* Gambar Living Room Frame */}
          <div className="relative w-full aspect-[3/4] rounded-sm overflow-hidden">
             <Image src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=1974&auto=format&fit=crop" alt="Ruang Keluarga" fill className="object-cover" sizes="(max-width: 768px) 100vw, 33vw" />
          </div>
          {/* Gambar Plants/Corner */}
          <div className="relative w-full aspect-[3/4] rounded-sm overflow-hidden">
             <Image src="https://images.unsplash.com/photo-1598928506311-c55ded91a20c?q=80&w=2070&auto=format&fit=crop" alt="Detail Interior" fill className="object-cover" sizes="(max-width: 768px) 100vw, 33vw" />
          </div>
        </motion.div>

        {/* Challenges & Solutions */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col gap-6"
        >
          <h3 className="text-white text-2xl font-medium">Tantangan & Solusi</h3>
          <p className="text-gray-400 leading-relaxed text-sm md:text-base">
            Tantangan utama dalam proyek ini adalah kontur tanah yang cukup miring di area Lembang. Solusinya, tim Saeboemi merancang struktur pondasi bertingkat (split-level) yang kokoh tanpa mengorbankan estetika desain. Pendekatan ini tidak hanya mengamankan struktur bangunan, tetapi juga meminimalisir pengerjaan galian tanah (cut and fill), sehingga efisiensi material dan anggaran tetap terjaga dengan sangat baik.
          </p>
        </motion.div>

      </div>
    </section>
  );
}