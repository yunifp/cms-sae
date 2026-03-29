/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { FolderKanban, FileText, Wrench, ImageIcon, ArrowRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useDashboard } from '@/hooks/useDashboard';

export default function DashboardOverview() {
  const { statsData, isLoading, fetchDashboardStats } = useDashboard();
  const IMAGE_BASE_URL = 'httpa://api.saeboemi.com/';

  useEffect(() => {
    fetchDashboardStats();
  }, [fetchDashboardStats]);

  // Logika penentuan URL Gambar (Sama dengan ProjectShowcase)
  const getProjectThumb = () => {
    if (!statsData?.latestProject) return null;
    const project = statsData.latestProject;
    
    // Cari gambar dengan type 'thumbnail' di dalam array images
    const thumbPath = project.images?.find((img: any) => img.type === 'thumbnail')?.url || project.imageUrl;
    
    if (!thumbPath) return null;
    return thumbPath.startsWith('http') ? thumbPath : `${IMAGE_BASE_URL}${thumbPath}`;
  };

  const latestThumb = getProjectThumb();

  const stats = [
    { 
      title: "Total Proyek", 
      value: statsData?.totalProjects || "0", 
      icon: FolderKanban, color: "text-blue-400", bg: "bg-blue-400/10" 
    },
    { 
      title: "Layanan Aktif", 
      value: statsData?.activeServices || "0", 
      icon: Wrench, color: "text-[#DDF247]", bg: "bg-[#DDF247]/10" 
    },
    { 
      title: "Total Artikel", 
      value: statsData?.totalPosts || "0", 
      icon: FileText, color: "text-purple-400", bg: "bg-purple-400/10" 
    },
  ];

  if (isLoading) {
    return <div className="p-8 text-white animate-pulse">Memuat...</div>;
  }

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-3xl font-semibold text-white mb-2">Dashboard Overview</h1>
        <p className="text-gray-400 text-sm">Ringkasan statistik website Saeboemi Studio.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="lg:col-span-2 bg-[#181A1F] border border-white/5 p-6 rounded-sm"
        >
          <h3 className="text-xl font-medium text-white mb-6">Proyek Terbaru</h3>
          
          {statsData?.latestProject ? (
            <div className="flex flex-col md:flex-row gap-6 p-4 bg-[#121418] rounded-sm border border-white/5 group relative">
              <div className="relative w-full md:w-48 h-32 overflow-hidden rounded-sm bg-[#181A1F] flex items-center justify-center border border-white/5">
                {latestThumb ? (
                  <Image 
                    src={latestThumb} 
                    alt={statsData.latestProject.title}
                    fill
                    className="object-cover"
                    unoptimized
                  />
                ) : (
                  <ImageIcon className="text-gray-600 w-8 h-8" />
                )}
              </div>
              <div className="flex flex-col justify-center gap-2">
                <span className="text-[#DDF247] text-xs font-medium uppercase tracking-widest">
                  {statsData.latestProject.category}
                </span>
                <h4 className="text-xl font-medium text-white">{statsData.latestProject.title}</h4>
                <p className="text-gray-400 text-sm line-clamp-1">{statsData.latestProject.location}</p>
                <Link 
                  href={`/admin/dashboard/projects/${statsData.latestProject.id}/edit`}
                  className="mt-2 text-[#DDF247] text-xs flex items-center gap-1 hover:underline"
                >
                  Edit Proyek <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            </div>
          ) : (
            <div className="text-gray-400 text-sm flex items-center justify-center h-40 border-2 border-dashed border-white/5 rounded-sm">
              Data proyek belum tersedia.
            </div>
          )}
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-[#181A1F] border border-white/5 p-6 rounded-sm"
        >
          <h3 className="text-xl font-medium text-white mb-6">Catatan Cepat</h3>
          <textarea 
            placeholder="Tulis catatan di sini..."
            className="w-full bg-[#121418] border border-white/10 text-white p-4 h-40 focus:outline-none focus:border-[#DDF247]/50 rounded-sm text-sm resize-none transition-colors"
          />
        </motion.div>
      </div>
    </div>
  );
}