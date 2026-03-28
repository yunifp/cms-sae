"use client";

import { motion } from "framer-motion";

export function WhyChooseUs() {
  const features = [
    {
      title: "Keahlian & Pengalaman",
      desc: "Tim arsitek dan kontraktor kami memiliki jam terbang tinggi dalam menangani berbagai proyek hunian dan komersial.",
    },
    {
      title: "Material Berkualitas",
      desc: "Kami selalu menggunakan bahan bangunan standar terbaik untuk menjamin keawetan dan struktur yang kokoh.",
    },
    {
      title: "Solusi Desain Kustom",
      desc: "Setiap desain disesuaikan dengan kebutuhan ruang, gaya hidup, dan karakteristik unik dari setiap klien.",
    },
    {
      title: "Budget Terkontrol",
      desc: "Perencanaan anggaran (RAB) yang transparan dan efisien, memastikan tidak ada pembengkakan biaya di tengah jalan.",
    },
    {
      title: "Kepuasan Klien Prioritas",
      desc: "Komunikasi responsif dan laporan progres berkala untuk memastikan klien selalu tenang dan puas dengan hasilnya.",
    },
    {
      title: "Desain Ramah Lingkungan",
      desc: "Menerapkan pendekatan desain yang memaksimalkan sirkulasi udara dan cahaya alami untuk efisiensi energi.",
    },
    {
      title: "Pengerjaan Tepat Waktu",
      desc: "Manajemen proyek yang disiplin memastikan setiap tahapan konstruksi selesai sesuai dengan jadwal yang disepakati.",
    },
    {
      title: "Standar Keamanan Tinggi",
      desc: "Keselamatan kerja di lapangan adalah hal mutlak untuk melindungi para pekerja dan menjamin kualitas bangunan Anda.",
    },
  ];

  return (
    <section className="w-full bg-[#0E1116] py-28 px-4 lg:px-12 border-b border-white/5">
      <div className="container mx-auto">

        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-20"
        >
          <p className="text-xs tracking-[0.2em] uppercase text-[#DDF247] mb-4">
            Kenapa Memilih Kami
          </p>

          <h2 className="text-4xl md:text-5xl lg:text-6xl text-white font-light leading-tight">
            Mengapa Kami Menjadi <br /> Pilihan Terbaik Anda
          </h2>
        </motion.div>

        {/* GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              viewport={{ once: true }}
              className="group relative p-8 bg-white/[0.02] border border-white/5 hover:border-[#DDF247]/40 transition-all duration-300"
            >
              {/* ICON CIRCLE */}
              <div className="w-14 h-14 rounded-full border border-white/10 flex items-center justify-center mb-6 group-hover:border-[#DDF247] transition">
                <div className="w-2 h-2 bg-[#DDF247] rounded-full" />
              </div>

              {/* TITLE */}
              <h3 className="text-white text-lg font-medium mb-4">
                {item.title}
              </h3>

              {/* DESC */}
              <p className="text-white/50 text-sm leading-relaxed">
                {item.desc}
              </p>

              {/* HOVER GLOW */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition pointer-events-none">
                <div className="absolute inset-0 bg-gradient-to-b from-[#DDF247]/5 to-transparent" />
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}