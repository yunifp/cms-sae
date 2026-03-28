"use client";

import { motion } from 'framer-motion';
import { Home, Star } from 'lucide-react';

export function Testimonials() {
  const reviews = [
    { title: "Kualitas Pengerjaan Luar Biasa", author: "Reza Mahendra" },
    { title: "Melampaui Ekspektasi", author: "Dina Karmila" },
    { title: "Hasil yang Memuaskan", author: "Budi Santoso" },
    { title: "Tim yang Bisa Diandalkan", author: "Andi Pratama" },
    { title: "Sangat Perhatian pada Detail", author: "Siska Saraswati" },
    { title: "Profesional dan Transparan", author: "Faisal Akbar" },
  ];

  const dummyText = "Kerja sama dengan Saeboemi Studio sangat menyenangkan. Mulai dari perencanaan desain hingga eksekusi di lapangan, semuanya berjalan transparan dan sesuai dengan budget yang disepakati di awal. Timnya sangat komunikatif dan profesional dalam mewujudkan hunian impian kami.";

  return (
    <section className="w-full bg-[#121418] py-24 px-4 lg:px-12">
      <div className="container mx-auto">
        
        {/* Header Centered */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-16">
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-2 text-sm tracking-widest uppercase font-medium text-[#DDF247] mb-6"
          >
            <Home className="h-4 w-4" />
            <span>Testimoni</span>
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-normal leading-tight text-white"
          >
            Klien Puas, <br /> Kebanggaan Kami
          </motion.h2>
        </div>

        {/* Testimonial Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviews.map((review, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              // Background sedikit lebih terang dari #121418 agar bentuk kotaknya terlihat
              className="bg-[#181A1F] p-8 md:p-10 flex flex-col gap-6"
            >
              {/* 5 Stars */}
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-[#DDF247] text-[#DDF247]" />
                ))}
              </div>
              
              <h3 className="text-white text-lg md:text-xl font-medium">
                {review.title}
              </h3>
              
              <p className="text-gray-400 text-sm leading-relaxed mb-4 flex-grow">
                {dummyText}
              </p>
              
              <p className="text-gray-300 text-sm font-medium">
                {review.author}
              </p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}