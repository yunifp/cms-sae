/* eslint-disable @next/next/no-img-element */
"use client";

import { motion } from 'framer-motion';
import { Home, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export function Contact() {
    return (
        <section className="w-full bg-[#121418] py-24 px-4 lg:px-12">
            <div className="container mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

                {/* Kolom Kiri: Teks CTA */}
                <div className="flex flex-col gap-8">
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                    >
                        <div className="flex items-center gap-2 text-sm tracking-widest uppercase font-medium text-[#DDF247] mb-6">
                            <Home className="h-4 w-4" />
                            <span>Hubungi Kami</span>
                        </div>

                        <h2 className="text-4xl md:text-5xl lg:text-6xl font-normal leading-tight text-white mb-8">
                            Mari Wujudkan <br /> Hunian Impian <br /> Anda Bersama
                        </h2>

                        <div className="flex flex-col gap-6 text-gray-400 text-sm md:text-base leading-relaxed mb-8">
                            <p>
                                Punya rencana untuk membangun dari nol atau merenovasi rumah? Jangan ragu untuk mendiskusikannya dengan tim ahli kami di Saeboemi Studio.
                            </p>
                            <p>
                                Kami siap membantu Anda merancang konsep yang estetis dan fungsional, dengan jaminan proses pengerjaan yang transparan serta anggaran yang sepenuhnya dapat dikontrol. Jadwalkan konsultasi Anda hari ini!
                            </p>
                        </div>

                        <Button asChild className="bg-[#DDF247] text-black hover:bg-white hover:text-black rounded-none px-8 py-6 font-semibold transition-colors duration-300 w-fit">
                            <Link href="/contact">
                                Konsultasi Sekarang <ArrowRight className="ml-2 h-4 w-4" />
                            </Link>
                        </Button>
                    </motion.div>
                </div>

                <motion.div
                    initial={{ opacity: 0, x: 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="relative w-full h-[400px] md:h-[500px] lg:h-[600px] overflow-hidden rounded-sm"
                >
                    <img
                        src="https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=1974&auto=format&fit=crop"
                        alt="Proyek Konstruksi Saeboemi Studio"
                        className="w-full h-full object-cover object-center"
                    />
                </motion.div>
            </div>
        </section>
    );
}