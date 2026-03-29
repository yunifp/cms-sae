/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { motion } from 'framer-motion';
import { Home, Star } from 'lucide-react';

export function Testimonials({ data }: { data: any[] }) {
  // Gunakan data dari props, jika kosong tampilkan array kosong
  const reviews = data || [];

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
          {reviews.length > 0 ? (
            reviews.map((review: any, index: number) => (
              <motion.div 
                key={review.id || index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-[#181A1F] p-8 md:p-10 flex flex-col gap-6 h-full"
              >
                {/* Stars dinamis berdasarkan rating dari database */}
                <div className="flex gap-1">
                  {[...Array(review.rating || 5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-[#DDF247] text-[#DDF247]" />
                  ))}
                </div>
                
                <h3 className="text-white text-lg md:text-xl font-medium">
                  {review.title}
                </h3>
                
                <p className="text-gray-400 text-sm leading-relaxed mb-4 flex-grow italic">
                  &quot;{review.review}&quot;
                </p>
                
                <div className="flex flex-col">
                  <p className="text-[#DDF247] text-sm font-bold tracking-wide uppercase">
                    — {review.name}
                  </p>
                </div>
              </motion.div>
            ))
          ) : (
            <div className="col-span-full py-20 text-center text-gray-600 border border-dashed border-white/5">
              Belum ada testimoni yang ditampilkan.
            </div>
          )}
        </div>

      </div>
    </section>
  );
}