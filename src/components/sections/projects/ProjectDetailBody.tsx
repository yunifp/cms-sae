/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { motion } from 'framer-motion';
import { User, Bookmark, Map, FileText } from 'lucide-react';
import Image from 'next/image';

export function ProjectDetailBody({ project }: { project: any }) {
  const IMAGE_BASE_URL = 'httpa://api.saeboemi.com/';
  
  let galleryImages = project.images
    ?.filter((img: any) => img.type === 'detail')
    .map((img: any) => `${IMAGE_BASE_URL}${img.url}`) || [];

  if (galleryImages.length === 0 && project.imageUrl) {
    galleryImages = [`${IMAGE_BASE_URL}${project.imageUrl}`];
  }

  const topGridImages = galleryImages.slice(0, 2);
  const bottomGridImages = galleryImages.slice(2, 5);

  return (
    <section className="w-full bg-[#121418] py-24 px-4 lg:px-12">
      <div className="container mx-auto max-w-5xl flex flex-col gap-16">
        
        <div className="grid grid-cols-1 md:grid-cols-[1.5fr_1fr] gap-12 items-start">
          <div className="flex flex-col gap-4">
            <span className="text-sm tracking-widest uppercase font-medium text-[#DDF247]">
              Detail Proyek
            </span>
            <h2 className="text-4xl md:text-5xl lg:text-5xl font-normal leading-tight text-white">
              {project.title}
            </h2>
            <div className="flex items-center gap-3 text-gray-400 mt-2">
              <FileText className="w-5 h-5 text-[#DDF247]" />
              <span className="text-sm tracking-widest uppercase">Tahun : {project.year}</span>
            </div>
          </div>

          <div className="bg-[#181A1F] p-8 flex flex-col gap-6 w-full">
            <div className="flex items-center gap-4 border-b border-white/10 pb-4">
              <User className="w-5 h-5 text-[#DDF247] shrink-0" />
              <span className="text-sm text-gray-300 uppercase tracking-widest truncate">Klien : {project.client}</span>
            </div>
            <div className="flex items-center gap-4 border-b border-white/10 pb-4">
              <Bookmark className="w-5 h-5 text-[#DDF247] shrink-0" />
              <span className="text-sm text-gray-300 uppercase tracking-widest truncate">{project.category}</span>
            </div>
            <div className="flex items-center gap-4">
              <Map className="w-5 h-5 text-[#DDF247] shrink-0" />
              <span className="text-sm text-gray-300 uppercase tracking-widest truncate">Lokasi : {project.location}</span>
            </div>
          </div>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col gap-6"
        >
          <h3 className="text-white text-2xl font-medium">Ringkasan Proyek</h3>
          <p className="text-gray-400 leading-relaxed text-sm md:text-base whitespace-pre-wrap">
            {project.description}
          </p>
        </motion.div>

        {topGridImages.length > 0 && (
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className={`grid grid-cols-1 ${topGridImages.length > 1 ? 'md:grid-cols-2' : ''} gap-6`}
          >
            {topGridImages.map((src: string, i: number) => (
              <div key={i} className="relative w-full aspect-[4/3] rounded-sm overflow-hidden bg-[#181A1F]">
                <Image src={src} alt={`Gallery Top ${i + 1}`} fill className="object-cover" sizes="(max-width: 768px) 100vw, 50vw" unoptimized />
              </div>
            ))}
          </motion.div>
        )}

        {bottomGridImages.length > 0 && (
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className={`grid grid-cols-1 md:grid-cols-${bottomGridImages.length} gap-6`}
          >
            {bottomGridImages.map((src: string, i: number) => (
              <div key={i} className="relative w-full aspect-[3/4] rounded-sm overflow-hidden bg-[#181A1F]">
                 <Image src={src} alt={`Gallery Bottom ${i + 1}`} fill className="object-cover" sizes="(max-width: 768px) 100vw, 33vw" unoptimized />
              </div>
            ))}
          </motion.div>
        )}

      </div>
    </section>
  );
}