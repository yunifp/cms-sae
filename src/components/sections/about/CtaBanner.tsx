"use client";

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

export function CtaBanner() {
  return (
    <section className="w-full bg-[#181A1F] py-16 px-4 lg:px-12 border-y border-white/5">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
        
        <motion.h2 
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl lg:text-5xl font-normal text-white text-center md:text-left"
        >
          Mari Diskusikan Rencana Proyek Anda Bersama Kami
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
        >
          <Button asChild className="bg-[#DDF247] text-black hover:bg-white hover:text-black rounded-none px-8 py-6 font-semibold transition-colors duration-300">
            <Link href="https://wa.link/w7chgd">
              Hubungi Tim Kami <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </motion.div>

      </div>
    </section>
  );
}