"use client";

import { motion } from "framer-motion";
import { Home } from "lucide-react";
import { FaInstagram, FaFacebookF, FaTwitter } from "react-icons/fa";
import Image from "next/image";
import Link from "next/link";

export function Team() {
  const teamMembers = [
    {
      name: "Rangga Pradana",
      role: "CEO & Arsitek Utama",
      description:
        "Berpengalaman merancang hunian estetis yang fungsional. Fokus pada detail dan efisiensi ruang untuk memastikan setiap desain sesuai dengan gaya hidup dan karakter klien kami.",
      image:
        "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=1974&auto=format&fit=crop",
    },
    {
      name: "Andini Larasati",
      role: "Direktur Operasional",
      description:
        "Memastikan seluruh tahapan proyek berjalan lancar, mulai dari perencanaan hingga serah terima. Berkomitmen penuh pada transparansi proses dan manajemen waktu yang presisi.",
      image:
        "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?q=80&w=2070&auto=format&fit=crop",
    },
    {
      name: "Dimas Anggara",
      role: "Kepala Tim Konstruksi",
      description:
        "Ahli dalam manajemen lapangan dan perhitungan struktur. Mengawasi setiap detail pengerjaan untuk menjamin kualitas material, keamanan bangunan, dan budget yang tetap terkontrol.",
      image:
        "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=1974&auto=format&fit=crop",
    },
  ];

  return (
    <section className="w-full bg-[#4A5159] py-24 px-4 lg:px-12">
      <div className="container mx-auto">
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
            Kenali Tim Ahli Kami di Balik <br className="hidden md:block" /> Terwujudnya Hunian Impian Anda
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {teamMembers.map((member, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className="flex flex-col group"
            >
              <div className="relative w-full aspect-[4/5] mb-6 overflow-hidden">
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>

              <div className="flex justify-between items-end mb-4">
                <h3 className="text-white text-2xl font-medium">
                  {member.name}
                </h3>
                <span className="text-[#DDF247] text-sm">
                  {member.role}
                </span>
              </div>

              <hr className="border-white/20 mb-4" />

              <p className="text-gray-300 text-sm leading-relaxed mb-6">
                {member.description}
              </p>

              <div className="flex items-center gap-3">
                {[FaInstagram, FaFacebookF, FaTwitter].map((Icon, i) => (
                  <Link
                    key={i}
                    href="#"
                    className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-[#DDF247] hover:text-black hover:border-[#DDF247] transition-all duration-300 hover:scale-110"
                  >
                    <Icon className="w-4 h-4" />
                  </Link>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}