"use client";

import { useEffect, useRef } from 'react';
import { motion, useInView, useMotionValue, useTransform, animate } from 'framer-motion';
import { Home } from 'lucide-react';

const AnimatedNumber = ({ value }: { value: number }) => {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.round(latest));

  useEffect(() => {
    if (inView) {
      animate(count, value, { duration: 1.5, ease: "easeOut" });
    }
  }, [inView, count, value]);

  return <motion.span ref={ref}>{rounded}</motion.span>;
};

// --- Komponen Utama Section Advantage ---
export function Advantage() {
  const skills = [
    { name: 'Arsitektur & Struktur', value: 90 },
    { name: 'Mekanikal & Elektrikal', value: 85 },
    { name: 'Desain & Interior', value: 98 },
  ];

  return (
    <section className="w-full bg-[#121418] py-20 px-4 lg:px-12">
      <div className="container mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        
        {/* Kolom Kiri: Teks dan Progress Bars */}
        <div className="flex flex-col gap-8">
          
          {/* Header Kecil */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-2 text-sm tracking-widest uppercase font-medium text-[#DDF247]"
          >
            <Home className="h-4 w-4" />
            <span>Kontraktor & Arsitektur</span>
          </motion.div>

          {/* Judul & Deskripsi */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-normal leading-tight text-white mb-6">
              Keunggulan <br /> Saeboemi
            </h2>
            <p className="text-gray-400 max-w-md text-base leading-relaxed">
              Solusi bangun dan renovasi rumah dengan budget yang terkontrol, proses pengerjaan yang transparan, dan hasil akhir yang maksimal.
            </p>
          </motion.div>

          {/* Progress Bars */}
          <div className="mt-4 flex flex-col gap-6">
            {skills.map((skill, index) => (
              <div key={skill.name}>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-white font-medium text-lg">{skill.name}</span>
                  <span className="text-[#DDF247] font-bold text-lg">
                    <AnimatedNumber value={skill.value} />%
                  </span>
                </div>
                
                {/* Background Bar (Kosong) */}
                <div className="h-10 w-full bg-white/5 rounded-sm overflow-hidden relative">
                  {/* Foreground Bar (Terisi) */}
                  <motion.div
                    initial={{ width: "0%" }}
                    whileInView={{ width: `${skill.value}%` }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 1.5, ease: "easeOut", delay: 0.1 * index }}
                    className="absolute top-0 left-0 h-full bg-[#A3B1B8]" // Warna abu-abu terang sesuai gambar
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Kolom Kanan: Gambar dan Overlay */}
        <motion.div 
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative h-[600px] w-full rounded-sm overflow-hidden"
        >
          {/* Gambar Rumah Dummy */}
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{ 
              backgroundImage: "url('https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070&auto=format&fit=crop')",
            }}
          />
          
          {/* Teks Overlay Klien Puas */}
          <div className="absolute top-12 left-8 md:top-16 md:left-12">
            <h3 className="text-white text-5xl md:text-6xl font-light tracking-tight mb-2">
              <AnimatedNumber value={50} /> +
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