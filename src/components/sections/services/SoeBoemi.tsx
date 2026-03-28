"use client";

import { motion } from "framer-motion";
import { Home, Check } from "lucide-react";
import Image from "next/image";

export function SoeBoemi() {
  const items = [
    "Rekam Jejak Proyek yang Terbukti Sukses",
    "Tim Arsitek dan Tukang yang Ahli & Berpengalaman",
    "Solusi Menyeluruh yang Disesuaikan dengan Budget",
    "Penggunaan Material Berkualitas Sesuai Standar",
    "Layanan Komunikatif, Transparan, dan Tepat Waktu",
  ];

  return (
    <section className="w-full bg-[#121418] py-24 px-4 lg:px-12 border-b border-white/5">
      <div className="container mx-auto">

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex flex-col"
          >
            <div className="flex items-center gap-2 text-sm tracking-widest uppercase font-medium text-[#DDF247] mb-6">
              <Home className="h-4 w-4" />
              <span>Layanan Saeboemi Studio</span>
            </div>

            <h2 className="text-4xl md:text-5xl lg:text-6xl font-normal leading-tight text-white mb-8">
              Keunggulan Utama <br /> & Nilai Tambah Kami
            </h2>

            <div className="flex flex-col gap-6">
              {items.map((item, i) => (
                <div
                  key={i}
                  className="flex items-start gap-4 border-b border-white/10 pb-4"
                >
                  <div className="mt-1">
                    <Check className="w-5 h-5 text-[#DDF247]" />
                  </div>
                  <p className="text-gray-400 text-sm md:text-base leading-relaxed">
                    {item}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="grid grid-cols-2 gap-6"
          >
            <div className="relative w-full h-[320px] md:h-[420px] overflow-hidden rounded-sm">
              <Image
                src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200"
                alt="worker"
                fill
                className="object-cover"
              />
            </div>

            <div className="relative w-full h-[320px] md:h-[420px] overflow-hidden rounded-sm">
              <Image
                src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200"
                alt="house"
                fill
                className="object-cover"
              />
            </div>
          </motion.div>

        </div>

        {/* Bagian Logo Placeholder di Bawah */}
        <div className="mt-20 pt-10 border-t border-white/10 flex flex-wrap items-center justify-between gap-8">
          {["ULTRA", "QC", "XR2", "AWARD", "MEGA", "LOGOIPSUM"].map((logo, i) => (
            <span
              key={i}
              className="text-white/40 text-sm tracking-widest uppercase font-light"
            >
              {logo}
            </span>
          ))}
        </div>

      </div>
    </section>
  );
}