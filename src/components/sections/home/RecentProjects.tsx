"use client";

import { motion } from 'framer-motion';
import { Home, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export function RecentProjects() {
  // Array gambar dummy dari Unsplash
  const images = {
    top: [
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=2075&auto=format&fit=crop", // Rumah modern kiri
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=2070&auto=format&fit=crop", // Rumah kayu kanan
    ],
    bottom: [
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop", // Gedung biru
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=1000&auto=format&fit=crop", // Gedung hijau
      "https://images.unsplash.com/photo-1515263487990-61b07816b324?q=80&w=2070&auto=format&fit=crop", // Balkon/atap
    ]
  };

  return (
    <section className="w-full bg-[#121418] py-24 px-4 lg:px-12">
      <div className="container mx-auto">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8 mb-12">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex flex-col gap-4"
          >
            <div className="flex items-center gap-2 text-sm tracking-widest uppercase font-medium text-[#DDF247]">
              <Home className="h-4 w-4" />
              <span>Portofolio Kami</span>
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-normal text-white">
              Proyek Terbaru
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <Button asChild className="bg-[#DDF247] text-black hover:bg-white hover:text-black rounded-none px-6 py-6 font-semibold transition-colors duration-300">
              <Link href="/projects">
                Lihat Selengkapnya <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </motion.div>
        </div>

        {/* Gallery Grid */}
        <div className="flex flex-col gap-4 md:gap-6">
          {/* Top Row (2 items) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            {images.top.map((img, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.2 }}
                className="w-full h-[300px] md:h-[450px] bg-cover bg-center overflow-hidden group cursor-pointer"
              >
                <div 
                  className="w-full h-full bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                  style={{ backgroundImage: `url('${img}')` }}
                />
              </motion.div>
            ))}
          </div>
          
          {/* Bottom Row (3 items) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
            {images.bottom.map((img, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 + (idx * 0.2) }}
                className="w-full h-[250px] md:h-[350px] bg-cover bg-center overflow-hidden group cursor-pointer"
              >
                <div 
                  className="w-full h-full bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                  style={{ backgroundImage: `url('${img}')` }}
                />
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}