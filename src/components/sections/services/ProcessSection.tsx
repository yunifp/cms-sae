"use client";

import { motion } from "framer-motion";
import { Sun, ArrowRight } from "lucide-react";

export function ProcessSection() {
  const steps = [
    {
      step: "TAHAP 1",
      title: "Konsultasi Awal",
      desc: "Diskusi mendalam mengenai visi desain, kebutuhan ruang, dan penentuan estimasi budget awal agar perencanaan proyek lebih terarah dan realistis.",
    },
    {
      step: "TAHAP 2",
      title: "Desain & Perencanaan",
      desc: "Pembuatan konsep arsitektur, gambar kerja, tata ruang interior, hingga penyusunan Rencana Anggaran Biaya (RAB) yang sangat detail dan transparan.",
    },
    {
      step: "TAHAP 3",
      title: "Proses Konstruksi",
      desc: "Eksekusi pembangunan di lapangan oleh tim ahli dengan pengawasan ketat, material berkualitas, dan laporan progres berkala kepada klien.",
    },
  ];

  return (
    <section className="w-full bg-[#0B0F14] py-28 px-4 lg:px-12">
      <div className="container mx-auto">

        {/* HEADER */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center justify-center gap-2 text-sm tracking-widest uppercase font-medium text-[#DDF247] mb-6"
          >
            <Sun className="h-4 w-4" />
            <span>Cara Kerja Kami</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-normal text-white leading-tight"
          >
            Langkah Mudah Mewujudkan <br /> Hunian Impian Anda
          </motion.h2>
        </div>

        {/* CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {steps.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2 }}
              className="bg-white/[0.03] border border-white/5 p-10 min-h-[260px]"
            >
              <p className="text-[#DDF247] text-xs tracking-widest mb-6">
                {item.step}
              </p>

              <h3 className="text-white text-xl font-medium mb-4">
                {item.title}
              </h3>

              <p className="text-white/50 text-sm leading-relaxed">
                {item.desc}
              </p>
            </motion.div>
          ))}
        </div>

        {/* TIMELINE */}
        <div className="relative flex items-center justify-between">

          {/* LINE */}
          <div className="absolute top-1/2 left-0 w-full border-t border-dashed border-white/20" />

          {[0, 1, 2].map((_, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 + i * 0.2 }}
              className="relative z-10"
            >
              <div className="w-14 h-14 rounded-full border border-white/40 flex items-center justify-center bg-[#0B0F14]">
                <ArrowRight className="w-4 h-4 text-white" />
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}