/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { motion } from "framer-motion";
import { Home, ChevronLeft, ChevronRight, ImageIcon } from "lucide-react";
import { FaInstagram, FaFacebookF, FaTwitter } from "react-icons/fa";
import Image from "next/image";
import Link from "next/link";

// Import Swiper
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

// Import Swiper bundle CSS
import "swiper/swiper-bundle.css";

export function Team({ teams }: { teams: any[] }) {
  const IMAGE_BASE_URL = 'httpa://api.saeboemi.com/';

  // Fallback jika data kosong
  const displayTeams = teams && teams.length > 0 ? teams : [];

  return (
    <section className="w-full bg-[#4A5159] py-24 px-4 lg:px-12 relative overflow-hidden">
      <div className="container mx-auto">
        
        {/* Header Section */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-2 text-sm tracking-widest uppercase font-medium text-[#DDF247] mb-4"
          >
            <Home className="h-4 w-4" />
            <span>Tim Kami</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-normal leading-tight text-white"
          >
            Kenali Tim Ahli Kami di Balik Terwujudnya Hunian Impian Anda
          </motion.h2>
        </div>

        {/* Slider Section */}
        <div className="relative group">
          {displayTeams.length > 0 ? (
            <Swiper
              modules={[Navigation, Pagination, Autoplay]}
              spaceBetween={30}
              slidesPerView={1}
              loop={displayTeams.length >= 3} 
              autoplay={{ delay: 4000, disableOnInteraction: false }}
              pagination={{ clickable: true, dynamicBullets: true }}
              navigation={{
                nextEl: ".next-team",
                prevEl: ".prev-team",
              }}
              breakpoints={{
                640: { slidesPerView: 2 },
                1024: { slidesPerView: 3 },
              }}
              className="team-swiper !pb-14"
            >
              {displayTeams.map((member, index) => (
                <SwiperSlide key={member.id || index}>
                  <div className="flex flex-col group/item bg-white/5 p-4 rounded-sm border border-white/5 hover:border-white/10 transition-colors h-full">
                    
                    {/* Member Image */}
                    <div className="relative w-full aspect-[4/5] mb-6 overflow-hidden bg-[#181A1F]">
                      {member.image ? (
                        <Image
                          src={`${IMAGE_BASE_URL}${member.image}`}
                          alt={member.name}
                          fill
                          className="object-cover object-center transition-transform duration-700 group-hover/item:scale-105"
                          unoptimized
                        />
                      ) : (
                        <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-600 gap-2">
                           <ImageIcon className="w-12 h-12" />
                           <span className="text-[10px] uppercase tracking-widest">No Photo</span>
                        </div>
                      )}
                    </div>

                    {/* Member Info */}
                    <div className="flex justify-between items-start gap-2 mb-4">
                      <h3 className="text-white text-xl font-medium leading-tight">
                        {member.name}
                      </h3>
                      <span className="text-[#DDF247] text-[10px] font-medium uppercase tracking-wider shrink-0 mt-1 border border-[#DDF247]/30 px-2 py-0.5 rounded-full">
                        {member.role}
                      </span>
                    </div>

                    <hr className="border-white/10 mb-4" />

                    <p className="text-gray-300 text-sm leading-relaxed mb-6 flex-grow italic">
                      &quot;{member.description}&quot;
                    </p>

                    {/* Social Links Dinamis */}
                    <div className="flex items-center gap-3">
                      {member.instagram && (
                        <Link href={member.instagram} target="_blank" className="w-9 h-9 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-[#DDF247] hover:text-black hover:border-[#DDF247] transition-all duration-300">
                          <FaInstagram className="w-4 h-4" />
                        </Link>
                      )}
                      {member.facebook && (
                        <Link href={member.facebook} target="_blank" className="w-9 h-9 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-[#DDF247] hover:text-black hover:border-[#DDF247] transition-all duration-300">
                          <FaFacebookF className="w-4 h-4" />
                        </Link>
                      )}
                      {member.twitter && (
                        <Link href={member.twitter} target="_blank" className="w-9 h-9 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-[#DDF247] hover:text-black hover:border-[#DDF247] transition-all duration-300">
                          <FaTwitter className="w-4 h-4" />
                        </Link>
                      )}
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          ) : (
            <div className="text-center py-20 text-white/50 border border-dashed border-white/10 rounded-sm">
              Belum ada data anggota tim.
            </div>
          )}

          {/* Navigation Buttons */}
          <button className="prev-team absolute top-1/2 -left-4 lg:-left-12 z-20 -translate-y-1/2 w-10 h-10 bg-[#DDF247] text-black rounded-full flex items-center justify-center shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110">
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button className="next-team absolute top-1/2 -right-4 lg:-right-12 z-20 -translate-y-1/2 w-10 h-10 bg-[#DDF247] text-black rounded-full flex items-center justify-center shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110">
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
      </div>

      <style jsx global>{`
        .team-swiper .swiper-pagination-bullet {
          background: white !important;
          opacity: 0.3;
        }
        .team-swiper .swiper-pagination-bullet-active {
          background: #DDF247 !important;
          opacity: 1;
          width: 20px;
          border-radius: 4px;
        }
      `}</style>
    </section>
  );
}