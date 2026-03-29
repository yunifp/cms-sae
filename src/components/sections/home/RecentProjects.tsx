/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { motion } from 'framer-motion';
import { Home, ArrowRight, ImageIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Image from 'next/image';

export function RecentProjects({ projects }: { projects: any[] }) {
  const IMAGE_BASE_URL = 'httpa://api.saeboemi.com/';

  // Kita ambil 5 proyek terbaru agar grid terisi maksimal
  // Jika database hanya punya 3, slice akan otomatis menyesuaikan
  const latestProjects = projects.slice(0, 5);
  
  // Baris Atas: Ambil 2 proyek pertama
  const topRow = latestProjects.slice(0, 2);
  // Baris Bawah: Ambil sisanya (proyek ke 3, 4, dan 5)
  const bottomRow = latestProjects.slice(2, 5);

  const getThumbnail = (project: any) => {
    const thumb = project.images?.find((img: any) => img.type === 'thumbnail');
    return thumb ? `${IMAGE_BASE_URL}${thumb.url}` : null;
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
          {/* Baris Atas (2 Items) */}
          <div className={`grid grid-cols-1 ${topRow.length > 1 ? 'md:grid-cols-2' : ''} gap-4 md:gap-6`}>
            {topRow.map((project, idx) => (
              <motion.div 
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.2 }}
                className="relative w-full h-[300px] md:h-[450px] overflow-hidden group cursor-pointer rounded-sm bg-[#181A1F]"
              >
                <Link href={`/projects/${project.id}`}>
                  {getThumbnail(project) ? (
                    <Image 
                      src={getThumbnail(project)!}
                      alt={project.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                      unoptimized
                    />
                  ) : (
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-600 gap-2">
                      <ImageIcon className="w-12 h-12" />
                      <span className="text-xs uppercase tracking-widest">No Image</span>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-8">
                    <p className="text-[#DDF247] text-sm uppercase tracking-widest mb-2">{project.category}</p>
                    <h3 className="text-white text-2xl font-medium">{project.title}</h3>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
          
          {/* Baris Bawah (Up to 3 Items) */}
          {bottomRow.length > 0 && (
            <div className={`grid grid-cols-1 md:grid-cols-${bottomRow.length} gap-4 md:gap-6`}>
              {bottomRow.map((project, idx) => (
                <motion.div 
                  key={project.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 + (idx * 0.2) }}
                  className="relative w-full h-[250px] md:h-[350px] overflow-hidden group cursor-pointer rounded-sm bg-[#181A1F]"
                >
                  <Link href={`/projects/${project.id}`}>
                    {getThumbnail(project) ? (
                      <Image 
                        src={getThumbnail(project)!}
                        alt={project.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                        unoptimized
                      />
                    ) : (
                      <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-600 gap-2">
                        <ImageIcon className="w-10 h-10" />
                        <span className="text-[10px] uppercase tracking-widest">No Image</span>
                      </div>
                    )}
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                      <p className="text-[#DDF247] text-xs uppercase tracking-widest mb-1">{project.category}</p>
                      <h3 className="text-white text-lg font-medium">{project.title}</h3>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          )}
        </div>

      </div>
    </section>
  );
}