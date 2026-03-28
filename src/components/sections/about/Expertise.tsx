"use client";

import { motion } from 'framer-motion';
import { Home, Check, Sun } from 'lucide-react';
import Image from 'next/image';

export function Expertise() {
  const skills = [
    "Desain Arsitektur",
    "Renovasi Rumah",
    "Perencanaan Struktur",
    "Manajemen Proyek",
    "Desain Interior",
    "Rancang Bangun"
  ];

  return (
    <section className="w-full bg-[#121418] py-24 px-4 lg:px-12">
      <div className="container mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        
        {/* Kolom Kiri: Konten Teks */}
        <div className="flex flex-col">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-2 text-sm tracking-widest uppercase font-medium text-[#DDF247] mb-6">
              <Home className="h-4 w-4" />
              <span>Keahlian & Pengalaman</span>
            </div>
            
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-normal leading-tight text-white mb-8">
              Memberikan Keahlian <br /> Terbaik di Setiap Proyek
            </h2>
            
            <p className="text-gray-400 text-sm md:text-base leading-relaxed mb-10">
              Dengan pengalaman mendalam di bidang arsitektur, konstruksi, dan interior, Saeboemi Studio siap mewujudkan visi Anda. Kami memastikan setiap detail dirancang dengan cermat, dieksekusi secara profesional, dan tetap berada dalam kendali anggaran Anda dengan proses yang transparan dari awal hingga serah terima kunci.
            </p>

            {/* Grid Checklist */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-4 mb-10">
              {skills.map((skill, index) => (
                <div key={index} className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-[#DDF247]" />
                  <span className="text-gray-300 text-sm md:text-base">{skill}</span>
                </div>
              ))}
            </div>

            <hr className="border-white/10 mb-8" />

            {/* Note Bottom */}
            <div className="flex items-start gap-4">
              <Sun className="w-8 h-8 text-[#DDF247] shrink-0" />
              <p className="text-gray-500 text-sm leading-relaxed">
                Kami berdedikasi untuk menciptakan ruang yang tidak hanya memukau secara visual, tetapi juga sangat nyaman dan fungsional untuk menunjang aktivitas Anda sehari-hari.
              </p>
            </div>
          </motion.div>
        </div>

        {/* Kolom Kanan: Gambar & Overlay */}
        <motion.div 
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="relative w-full h-[600px] lg:h-[750px] overflow-hidden rounded-sm"
        >
          <Image 
            src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070&auto=format&fit=crop"
            alt="Keahlian Konstruksi Saeboemi"
            fill
            className="object-cover object-center"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
          
          {/* Teks Overlay 50+ */}
          <div className="absolute top-12 left-8 md:top-16 md:left-12">
            <h3 className="text-white text-5xl md:text-6xl font-light tracking-tight mb-2">
              50 +
            </h3>
            <p className="text-white/80 text-lg font-light tracking-wide">
              Klien Puas
            </p>
          </div>
        </motion.div>

      </div>
    </section>
  );
}