/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { motion } from 'framer-motion';
import { User, Bookmark, Map, FileText, ImageIcon } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export function ProjectShowcase({ projects }: { projects: any[] }) {
  const IMAGE_BASE_URL = 'httpa://api.saeboemi.com/';

  return (
    <section className="w-full bg-[#121418] py-24 px-4 lg:px-12">
      <div className="container mx-auto flex flex-col gap-24">
        {projects.length === 0 ? (
          <div className="text-white text-center">Belum ada proyek.</div>
        ) : (
          projects.map((project, index) => {
            const thumbUrl = project.images?.find((img: any) => img.type === 'thumbnail')?.url || project.imageUrl;

            return (
              <div key={project.id} className="flex flex-col gap-12">
                <div className="grid grid-cols-1 lg:grid-cols-[1.5fr_1fr] gap-12 items-start">
                  <motion.div 
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="flex flex-col gap-6"
                  >
                    <span className="text-sm tracking-widest uppercase font-medium text-[#DDF247]">
                      Proyek {index + 1}
                    </span>
                    <Link href={`/projects/${project.id}`} className="hover:text-gray-300 transition-colors w-fit">
                      <h2 className="text-4xl md:text-5xl lg:text-6xl font-normal leading-tight text-white">
                        {project.title}
                      </h2>
                    </Link>
                    <div className="flex items-center gap-3 text-gray-400 mt-4">
                      <FileText className="w-5 h-5 text-[#DDF247]" />
                      <span className="text-sm tracking-widest uppercase">Tahun : {project.year}</span>
                    </div>
                  </motion.div>

                  <motion.div 
                    initial={{ opacity: 0, x: 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="bg-[#181A1F] p-8 flex flex-col gap-6"
                  >
                    <div className="flex items-center gap-4 border-b border-white/10 pb-4">
                      <User className="w-5 h-5 text-[#DDF247] shrink-0" />
                      <span className="text-sm text-gray-300 uppercase tracking-widest">Klien : {project.client}</span>
                    </div>
                    <div className="flex items-center gap-4 border-b border-white/10 pb-4">
                      <Bookmark className="w-5 h-5 text-[#DDF247] shrink-0" />
                      <span className="text-sm text-gray-300 uppercase tracking-widest">{project.category}</span>
                    </div>
                    <div className="flex items-center gap-4">
                      <Map className="w-5 h-5 text-[#DDF247] shrink-0" />
                      <span className="text-sm text-gray-300 uppercase tracking-widest">Lokasi : {project.location}</span>
                    </div>
                  </motion.div>
                </div>

                <motion.div 
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="relative w-full h-[50vh] min-h-[400px] lg:h-[700px] overflow-hidden group cursor-pointer rounded-sm bg-[#181A1F] flex items-center justify-center"
                >
                  <Link href={`/projects/${project.id}`} className="absolute inset-0 z-20" aria-label="Lihat Detail Proyek" />
                  
                  {thumbUrl ? (
                    <Image 
                      src={thumbUrl.startsWith('http') ? thumbUrl : `${IMAGE_BASE_URL}${thumbUrl}`} 
                      alt={project.title}
                      fill
                      className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
                      sizes="(max-width: 1024px) 100vw, 80vw"
                      unoptimized
                    />
                  ) : (
                    <div className="flex flex-col items-center justify-center text-gray-600 gap-2">
                      <ImageIcon className="w-16 h-16" />
                      <span className="text-sm uppercase tracking-widest">Tidak ada gambar</span>
                    </div>
                  )}

                  <div className="absolute inset-0 bg-black/20 transition-colors duration-500 group-hover:bg-black/40 z-10 pointer-events-none" />
                  
                </motion.div>
              </div>
            );
          })
        )}
      </div>
    </section>
  );
}