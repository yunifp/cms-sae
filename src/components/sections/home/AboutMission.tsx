/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { motion } from 'framer-motion';
import { Home } from 'lucide-react';

export function AboutMission({ data }: { data: any }) {
  if (!data) return null;

  const missions = JSON.parse(data.missions);
  const IMAGE_BASE_URL = 'httpa://api.saeboemi.com/';

  return (
    <section className="w-full bg-[#121418] py-20 px-4 lg:px-12">
      <div className="container mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
        <div className="flex flex-col gap-6">
          <motion.div 
            className="w-full h-[300px] bg-cover bg-center"
            style={{ backgroundImage: `url('${IMAGE_BASE_URL}${data.imageTop}')` }}
          />
          <motion.div className="grid grid-cols-2 h-[250px]">
            <div className="bg-[#f4f4f4] flex flex-col justify-center px-8 lg:px-12">
              <h3 className="text-5xl font-light text-black mb-2">{data.rating}<span className="text-3xl">/5</span></h3>
              <p className="text-gray-600 text-sm leading-snug">Rating Kepuasan <br /> Klien Kami</p>
            </div>
            <div 
              className="bg-cover bg-center h-full"
              style={{ backgroundImage: `url('${IMAGE_BASE_URL}${data.imageBottom}')` }}
            />
          </motion.div>
        </div>

        <div className="flex flex-col gap-8 lg:pl-8">
          <motion.div>
            <div className="flex items-center gap-2 text-sm tracking-widest uppercase font-medium text-[#DDF247] mb-4">
              <Home className="h-4 w-4" />
              <span>Tentang Kami</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-normal leading-tight text-white mb-6 whitespace-pre-line">
              {data.title}
            </h2>
            <p className="text-gray-400 text-sm md:text-base leading-relaxed mb-8">
              {data.description}
            </p>

            <h4 className="text-white text-xl font-medium mb-6">Misi Kami :</h4>
            <div className="flex flex-col gap-4">
              {missions.map((mission: string, index: number) => (
                <div key={index} className="bg-white/[0.03] border border-white/10 p-6">
                  <p className="text-gray-400 text-sm leading-relaxed">{mission}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}