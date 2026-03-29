/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { motion } from 'framer-motion';
import { CheckCircle2, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export function ServiceDetailBody({ service }: { service: any }) {
  const IMAGE_BASE_URL = 'httpa://api.saeboemi.com/';

  // Parse string JSON fitur dari backend ke dalam array
  let featuresList: string[] = [];
  try {
    if (service.features) {
      featuresList = JSON.parse(service.features);
    }
  } catch (e) {
    // Abaikan jika error parsing
  }

  const coverImage = service.imageUrl 
    ? `${IMAGE_BASE_URL}${service.imageUrl}` 
    : "https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=2071&auto=format&fit=crop"; // Fallback image

  return (
    <section className="w-full bg-[#121418] py-24 px-4 lg:px-12">
      <div className="container mx-auto max-w-5xl flex flex-col gap-16">
        
        {/* Judul & Overview */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex flex-col gap-6"
          >
            <h2 className="text-3xl md:text-4xl font-normal leading-tight text-white">
              Solusi Menyeluruh untuk {service.name}
            </h2>
            <p className="text-gray-400 leading-relaxed whitespace-pre-wrap">
              {service.description}
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-[#181A1F] border border-white/5 p-8 rounded-sm"
          >
            <h3 className="text-xl font-medium text-white mb-6">Apa yang Anda Dapatkan:</h3>
            <ul className="flex flex-col gap-4">
              {featuresList && featuresList.length > 0 ? (
                featuresList.map((feature: string, idx: number) => (
                  <li key={idx} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-[#DDF247] shrink-0 mt-0.5" />
                    <span className="text-gray-300">{feature}</span>
                  </li>
                ))
              ) : (
                <li className="text-gray-500 italic">Belum ada rincian layanan.</li>
              )}
            </ul>
          </motion.div>
        </div>

        {/* Gambar Ekstra / Proses */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="w-full aspect-[21/9] bg-cover bg-center rounded-sm overflow-hidden"
          style={{ backgroundImage: `url('${coverImage}')` }}
        />

        {/* CTA Bawah */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-[#DDF247] p-10 md:p-16 rounded-sm flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left"
        >
          <div>
            <h3 className="text-2xl md:text-3xl font-semibold text-black mb-2">Siap Memulai Proyek Anda?</h3>
            <p className="text-black/70">Diskusikan kebutuhan {service.name.toLowerCase()} Anda bersama tim ahli kami.</p>
          </div>
          <Button asChild className="bg-black text-white hover:bg-gray-800 rounded-none px-8 py-6 font-semibold shrink-0">
            <Link href="https://wa.link/w7chgd">
              Konsultasi Sekarang <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </motion.div>

      </div>
    </section>
  );
}