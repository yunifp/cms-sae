"use client";

import { motion } from 'framer-motion';
import { Home } from 'lucide-react';

export function AboutMission() {
  const missions = [
    "Memberikan layanan desain arsitektur dan interior yang inovatif, fungsional, dan sesuai dengan karakter serta kebutuhan ruang setiap klien.",
    "Menjalankan proses konstruksi dan renovasi dengan standar kualitas tinggi, material terbaik, serta manajemen waktu yang sangat disiplin.",
    "Mengedepankan transparansi dalam setiap tahap pengerjaan dan merancang solusi cerdas agar budget tetap terkontrol tanpa mengorbankan hasil akhir."
  ];

  return (
    <section className="w-full bg-[#121418] py-20 px-4 lg:px-12">
      <div className="container mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
        
        {/* Kolom Kiri: Komposisi Gambar */}
        <div className="flex flex-col gap-6">
          {/* Gambar Atas (Atap Kayu) */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="w-full h-[300px] bg-cover bg-center"
            style={{ backgroundImage: "url('https://images.unsplash.com/photo-1600566752355-35792bedcfea?q=80&w=2070&auto=format&fit=crop')" }}
          />
          
          {/* Grid Bawah: Box Putih Rating & Gambar Bawah */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="grid grid-cols-2 h-[250px]"
          >
            {/* Box Rating Putih */}
            <div className="bg-[#f4f4f4] flex flex-col justify-center px-8 lg:px-12">
              <h3 className="text-5xl font-light text-black mb-2">4.8<span className="text-3xl">/5</span></h3>
              <p className="text-gray-600 text-sm leading-snug">Rating Kepuasan <br /> Klien Kami</p>
            </div>
            {/* Gambar Patio */}
            <div 
              className="bg-cover bg-center h-full"
              style={{ backgroundImage: "url('https://images.unsplash.com/photo-1600607686527-6fb886090705?q=80&w=2069&auto=format&fit=crop')" }}
            />
          </motion.div>
        </div>

        {/* Kolom Kanan: Teks & Misi */}
        <div className="flex flex-col gap-8 lg:pl-8">
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-2 text-sm tracking-widest uppercase font-medium text-[#DDF247] mb-4">
              <Home className="h-4 w-4" />
              <span>Tentang Kami</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-normal leading-tight text-white mb-6">
              Mewujudkan Hunian <br /> Impian Anda Bersama
            </h2>
            <p className="text-gray-400 text-sm md:text-base leading-relaxed mb-8">
              Saeboemi Studio adalah mitra tepercaya Anda yang berbasis di Bandung untuk segala kebutuhan Architecture, Construction, dan Interior. Kami berkomitmen menghadirkan solusi bangun dan renovasi rumah yang tidak hanya mengutamakan estetika, tetapi juga fungsionalitas, dengan kontrol budget yang ketat dan proses pengerjaan yang transparan dari awal hingga akhir.
            </p>

            <h4 className="text-white text-xl font-medium mb-6">Misi Kami :</h4>
            
            <div className="flex flex-col gap-4">
              {missions.map((mission, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.15 }}
                  className="bg-white/[0.03] border border-white/10 p-6 hover:bg-white/[0.05] transition-colors"
                >
                  <p className="text-gray-400 text-sm leading-relaxed">
                    {mission}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

      </div>
    </section>
  );
}