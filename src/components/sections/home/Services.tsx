"use client";

import { motion } from 'framer-motion';
import { Home, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export function Services() {
  const services = [
    {
      title: "Desain Arsitektur & Interior",
      description: "Kami merancang konsep visual dan tata ruang yang estetis sekaligus fungsional, disesuaikan dengan karakter gaya hidup dan kebutuhan spesifik Anda.",
      image: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=2071&auto=format&fit=crop", // Gambar arsitektur
    },
    {
      title: "Konstruksi Bangunan",
      description: "Layanan bangun rumah dari nol dengan material berkualitas, manajemen proyek yang terstruktur, dan estimasi biaya yang sangat transparan.",
      image: "https://images.unsplash.com/photo-1531834685032-c34bf0d84c77?q=80&w=2087&auto=format&fit=crop", // Gambar konstruksi
    },
    {
      title: "Renovasi Eksterior & Interior",
      description: "Memberikan wajah baru untuk hunian Anda melalui perbaikan struktur, ekspansi ruangan, hingga pembaruan desain interior yang lebih modern.",
      image: "https://images.unsplash.com/photo-1581094288338-2314dddb7ece?q=80&w=2070&auto=format&fit=crop", // Gambar renovasi
    }
  ];

  const stats = [
    { value: "5+", label: "Tahun\nPengalaman", isDark: false },
    { value: "4.8/5", label: "Rating Kepuasan\nPelanggan", isDark: true },
    { value: "50+", label: "Proyek\nSelesai", isDark: false },
    { value: "100%", label: "Transparansi\nAnggaran", isDark: false },
  ];

  return (
    // Background slate grey sesuai gambar
    <section className="w-full bg-[#4A5159] py-24 px-4 lg:px-12">
      <div className="container mx-auto">
        
        {/* Header Section */}
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
            className="text-4xl md:text-5xl lg:text-5xl font-normal leading-tight text-white mb-6"
          >
            Temukan Layanan Spesialis <br className="hidden md:block" /> dari Saeboemi Studio
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-gray-300 text-sm md:text-base leading-relaxed"
          >
            Kami hadir untuk memberikan solusi menyeluruh bagi kebutuhan hunian Anda. Dari tahap perencanaan konsep, desain arsitektur, hingga eksekusi konstruksi di lapangan.
          </motion.p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {services.map((service, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className="flex flex-col gap-6 group"
            >
              {/* Image Container */}
              <div className="w-full aspect-square overflow-hidden bg-gray-800">
                <div 
                  className="w-full h-full bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                  style={{ backgroundImage: `url('${service.image}')` }}
                />
              </div>
              
              {/* Text Content */}
              <div>
                <h3 className="text-white text-xl font-medium mb-3">{service.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed mb-6">
                  {service.description}
                </p>
                
                {/* Learn More Link */}
                <Link 
                  href={`/services/${service.title.toLowerCase().replace(/ /g, '-')}`}
                  className="inline-flex items-center gap-3 text-sm text-white hover:text-[#DDF247] transition-colors"
                >
                  Pelajari Lebih Lanjut 
                  <span className="p-1.5 rounded-full border border-current transition-colors">
                    <ArrowRight className="w-4 h-4" />
                  </span>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Divider */}
        <hr className="border-white/20 mb-20" />

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
          {stats.map((stat, index) => (
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