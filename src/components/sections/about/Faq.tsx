/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { motion } from 'framer-motion';
import { Home } from 'lucide-react';
import Image from 'next/image';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

// Tambahkan parameter faqs di sini
export function Faq({ faqs }: { faqs: any[] }) {
  
  // Jika tidak ada data dari database, kita tampilkan pesan atau return null
  if (!faqs || faqs.length === 0) {
    return (
      <section className="w-full bg-[#121418] py-24 px-4 lg:px-12">
        <div className="container mx-auto text-center text-gray-500">
          Belum ada pertanyaan FAQ yang ditambahkan.
        </div>
      </section>
    );
  }

  return (
    <section className="w-full bg-[#121418] py-24 px-4 lg:px-12">
      <div className="container mx-auto">
        
        {/* Header Title */}
        <div className="max-w-4xl mb-16">
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-2 text-sm tracking-widest uppercase font-medium text-[#DDF247] mb-6"
          >
            <Home className="h-4 w-4" />
            <span>Pertanyaan yang Sering Diajukan</span>
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-normal leading-tight text-white"
          >
            Semua Informasi yang Perlu Anda Ketahui Tentang Layanan Kami
          </motion.h2>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          
          {/* Kolom Kiri: Gambar & Kontak */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex flex-col gap-6"
          >
            <div className="relative w-full h-[300px] md:h-[400px] overflow-hidden rounded-sm">
              <Image 
                src="https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=2071&auto=format&fit=crop" 
                alt="Proyek Konstruksi Saeboemi"
                fill
                className="object-cover object-center"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
            <p className="text-gray-300 text-sm md:text-base">
              Ada pertanyaan lain? <a href="mailto:studiosaboemi@gmail.com" className="text-[#DDF247] hover:underline">studiosaboemi@gmail.com</a>
            </p>
          </motion.div>

          {/* Kolom Kanan: Accordion FAQ Dinamis */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <Accordion type="single" collapsible className="w-full flex flex-col gap-4">
              {faqs.map((faq) => (
                <AccordionItem 
                  key={faq.id} 
                  value={`item-${faq.id}`} 
                  className="border-none bg-[#181A1F] px-6 py-2 rounded-sm"
                >
                  <AccordionTrigger className="text-white text-base md:text-lg font-medium hover:no-underline hover:text-[#DDF247] text-left">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-400 text-sm md:text-base leading-relaxed">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </motion.div>

        </div>

      </div>
    </section>
  );
}