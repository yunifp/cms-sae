/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { motion } from 'framer-motion';
import { Home, ArrowRight, ImageIcon } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

// Tambahkan props settings di sini
export function Services({ services, settings }: { services: any[], settings: any }) {
  const IMAGE_BASE_URL = 'httpa://api.saeboemi.com/';

  // 1. Ambil data stats dari JSON string settings
  // Jika data belum ada di DB, gunakan fallback data statis agar tidak kosong
  const stats = settings?.stats ? JSON.parse(settings.stats) : [
    { value: "5+", label: "Tahun\nPengalaman", isDark: false },
    { value: "4.8/5", label: "Rating Kepuasan\nPelanggan", isDark: true },
    { value: "50+", label: "Proyek\nSelesai", isDark: false },
    { value: "100%", label: "Transparansi\nAnggaran", isDark: false },
  ];

  return (
    <section className="w-full bg-[#4A5159] py-24 px-4 lg:px-12">
      <div className="container mx-auto">
        
        {/* Header Section - Dinamis dari Settings */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-16">
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-2 text-sm tracking-widest uppercase font-medium text-[#DDF247] mb-6"
          >
            <Home className="h-4 w-4" />
            <span>Layanan Kami</span>
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-5xl font-normal leading-tight text-white mb-6 whitespace-pre-line"
          >
            {settings?.title || "Temukan Layanan Spesialis \n dari Saeboemi Studio"}
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-gray-300 text-sm md:text-base leading-relaxed"
          >
            {settings?.description || "Kami hadir untuk memberikan solusi menyeluruh bagi kebutuhan hunian Anda. Dari tahap perencanaan konsep, desain arsitektur, hingga eksekusi konstruksi di lapangan."}
          </motion.p>
        </div>

        {/* Services Grid (Daftar Layanan) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {services && services.length > 0 ? (
            services.map((service, index) => (
              <motion.div 
                key={service.id || index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="flex flex-col gap-6 group"
              >
                <Link href={`/services/${service.slug}`} className="relative w-full aspect-square overflow-hidden bg-[#181A1F] block rounded-sm">
                  {service.imageUrl ? (
                    <Image 
                      src={`${IMAGE_BASE_URL}${service.imageUrl}`} 
                      alt={service.name}
                      fill
                      className="object-cover bg-center transition-transform duration-700 group-hover:scale-110"
                      sizes="(max-width: 768px) 100vw, 33vw"
                      unoptimized
                    />
                  ) : (
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-600 gap-2">
                      <ImageIcon className="w-12 h-12" />
                      <span className="text-xs uppercase tracking-widest">Tidak ada gambar</span>
                    </div>
                  )}
                </Link>
                
                <div>
                  <Link href={`/services/${service.slug}`}>
                    <h3 className="text-white text-xl font-medium mb-3 hover:text-[#DDF247] transition-colors">{service.name}</h3>
                  </Link>
                  <p className="text-gray-400 text-sm leading-relaxed mb-6 line-clamp-3">
                    {service.description}
                  </p>
                  
                  <Link 
                    href={`/services/${service.slug}`}
                    className="inline-flex items-center gap-3 text-sm text-white hover:text-[#DDF247] transition-colors"
                  >
                    Pelajari Lebih Lanjut 
                    <span className="p-1.5 rounded-full border border-current transition-colors">
                      <ArrowRight className="w-4 h-4" />
                    </span>
                  </Link>
                </div>
              </motion.div>
            ))
          ) : (
            <div className="col-span-full text-center text-gray-400">
              Belum ada layanan yang tersedia.
            </div>
          )}
        </div>

        <hr className="border-white/20 mb-20" />

        {/* Stats Grid - Dinamis dari Settings */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
          {stats.map((stat: any, index: number) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15 }}
              className={`
                flex flex-col items-center justify-center text-center p-8 md:p-12 h-full min-h-[250px]
                ${stat.isDark ? 'bg-[#181A1F]' : 'bg-[#98A2A8]'} 
              `}
            >
              <h4 className={`text-5xl md:text-6xl font-light mb-4 ${stat.isDark ? 'text-[#DDF247]' : 'text-white'}`}>
                {stat.value}
              </h4>
              <p className={`text-sm md:text-base whitespace-pre-line leading-relaxed ${stat.isDark ? 'text-gray-400' : 'text-white/80'}`}>
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}