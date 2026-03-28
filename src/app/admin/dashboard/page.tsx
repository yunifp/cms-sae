"use client";

import { motion } from 'framer-motion';
import { FolderKanban, FileText, Wrench, Users } from 'lucide-react';

export default function DashboardOverview() {
  const stats = [
    { title: "Total Proyek", value: "24", icon: FolderKanban, color: "text-blue-400", bg: "bg-blue-400/10" },
    { title: "Layanan Aktif", value: "4", icon: Wrench, color: "text-[#DDF247]", bg: "bg-[#DDF247]/10" },
    { title: "Total Artikel", value: "12", icon: FileText, color: "text-purple-400", bg: "bg-purple-400/10" },
    { title: "Pengunjung Bulan Ini", value: "1.2k", icon: Users, color: "text-green-400", bg: "bg-green-400/10" },
  ];

  return (
    <div className="flex flex-col gap-8">
      
      {/* Header Halaman */}
      <div>
        <h1 className="text-3xl font-semibold text-white mb-2">Dashboard Overview</h1>
        <p className="text-gray-400 text-sm">Ringkasan statistik website Saeboemi Studio.</p>
      </div>

      {/* Card Statistik */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-[#181A1F] border border-white/5 p-6 rounded-sm flex items-center gap-4 hover:border-white/10 transition-colors"
          >
            <div className={`w-14 h-14 rounded-full flex items-center justify-center ${stat.bg}`}>
              <stat.icon className={`w-6 h-6 ${stat.color}`} />
            </div>
            <div>
              <p className="text-gray-400 text-sm mb-1">{stat.title}</p>
              <h3 className="text-3xl font-medium text-white">{stat.value}</h3>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Area Tambahan (Bisa untuk Tabel Proyek Terbaru atau Grafik nanti) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-4">
        
        {/* Aktivitas Terbaru */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="lg:col-span-2 bg-[#181A1F] border border-white/5 p-6 rounded-sm"
        >
          <h3 className="text-xl font-medium text-white mb-6">Proyek Terbaru</h3>
          <div className="text-gray-400 text-sm flex items-center justify-center h-40 border-2 border-dashed border-white/5 rounded-sm">
            Data proyek belum tersedia.
          </div>
        </motion.div>

        {/* Info Cepat */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-[#181A1F] border border-white/5 p-6 rounded-sm"
        >
          <h3 className="text-xl font-medium text-white mb-6">Catatan Cepat</h3>
          <div className="text-gray-400 text-sm flex items-center justify-center h-40 border-2 border-dashed border-white/5 rounded-sm">
            Belum ada catatan.
          </div>
        </motion.div>

      </div>
    </div>
  );
}