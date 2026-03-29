"use client";

import { motion } from 'framer-motion';
import { Home, ArrowRight, UserCircle2, SlidersHorizontal, Watch } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export function WhyChooseUs() {
  const features = [
    {
      title: "Kualitas Pengerjaan Terbaik",
      description: "Dikerjakan oleh tim ahli dan tukang berpengalaman untuk memastikan hasil akhir yang presisi, kokoh, dan tahan lama sesuai standar konstruksi.",
      icon: UserCircle2,
    },
    {
      title: "Desain Sesuai Kebutuhan",
      description: "Kami menyesuaikan desain arsitektur dan interior dengan selera gaya hidup Anda, kebutuhan ruang, serta budget yang tersedia.",
      icon: SlidersHorizontal,
    },
    {
      title: "Pengerjaan Tepat Waktu",
      description: "Manajemen proyek yang transparan dan terukur memastikan pembangunan atau renovasi rumah Anda selesai tepat pada waktunya.",
      icon: Watch,
    }
  ];

  return (
    <section className="w-full bg-[#121418] py-20 px-4 lg:px-12">
      <div className="container mx-auto">
        
        {/* Top Header Row */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8 mb-16">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex flex-col gap-4"
          >
            <div className="flex items-center gap-2 text-sm tracking-widest uppercase font-medium text-[#DDF247]">
              <Home className="h-4 w-4" />
              <span>Kenapa Memilih Kami</span>
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-normal leading-tight text-white">
              Meningkatkan Standar <br className="hidden md:block" /> Kualitas Konstruksi
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <Button asChild className="bg-[#DDF247] text-black hover:bg-white hover:text-black rounded-none px-6 py-6 font-semibold transition-colors duration-300">
              <Link href="https://wa.link/w7chgd">
                Konsultasi Sekarang <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </motion.div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
          {features.map((feature, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className="flex flex-col gap-6"
            >
              <div className="w-16 h-16 rounded-full border border-white/20 flex items-center justify-center text-white">
                <feature.icon className="w-6 h-6 font-light" />
              </div>
              <h3 className="text-white text-xl font-medium">{feature.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Separator Line */}
        <hr className="border-white/10 mb-16" />

      
        {/* <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative w-full h-[60vh] min-h-[400px] overflow-hidden group cursor-pointer"
        >
          <div 
            className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
            style={{ backgroundImage: "url('https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=2070&auto=format&fit=crop')" }}
          />
          <div className="absolute inset-0 bg-black/40 transition-colors duration-500 group-hover:bg-black/50" />
          
   
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-24 h-24 rounded-full border-2 border-[#DDF247] flex items-center justify-center text-[#DDF247] transition-transform duration-300 group-hover:scale-110">
              <Play className="w-8 h-8 ml-2 fill-current" />
            </div>
          </div>
        </motion.div> */}

      </div>
    </section>
  );
}