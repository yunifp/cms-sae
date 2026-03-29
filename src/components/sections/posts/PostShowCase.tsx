/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { BookOpen, ArrowRight, ImageIcon } from "lucide-react";
import Image from "next/image";

export function PostShowcase({ posts }: { posts: any[] }) {
  const IMAGE_BASE_URL = 'httpa://api.saeboemi.com/';

  return (
    <section className="w-full bg-[#121418] py-24 px-4 lg:px-12">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8 mb-12">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex flex-col gap-4"
          >
            <div className="flex items-center gap-2 text-sm tracking-widest uppercase font-medium text-[#DDF247]">
              <BookOpen className="h-4 w-4" />
              <span>Artikel Kami</span>
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-normal text-white">
              Berita & Wawasan Terbaru
            </h2>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {posts.map((post, idx) => (
            <motion.div 
              key={post.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.15 }}
              className="bg-[#1A1D24] border border-[#2A2D34] overflow-hidden group flex flex-col"
            >
              <Link href={`/posts/${post.slug}`} className="block relative aspect-[4/3] overflow-hidden bg-[#121418]">
                {post.imageUrl ? (
                   <Image 
                    src={`${IMAGE_BASE_URL}${post.imageUrl}`} 
                    alt={post.title}
                    fill
                    className="object-cover bg-center transition-transform duration-700 group-hover:scale-110"
                    unoptimized
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <ImageIcon className="w-12 h-12 text-gray-700" />
                  </div>
                )}
              </Link>
              
              <div className="p-6 md:p-8 flex flex-col flex-grow">
                <div className="text-sm text-[#DDF247] font-medium mb-4 tracking-wide uppercase">
                  {new Date(post.createdAt).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}
                </div>
                
                <Link href={`/posts/${post.slug}`} className="block group/title">
                  <h3 className="text-xl md:text-2xl font-normal text-white mb-4 group-hover/title:text-[#DDF247] transition-colors line-clamp-2">
                    {post.title}
                  </h3>
                </Link>
                
                <p className="text-gray-400 mb-8 line-clamp-3 flex-grow font-light leading-relaxed">
                  {post.excerpt}
                </p>
                
                <Link 
                  href={`/posts/${post.slug}`}
                  className="inline-flex items-center text-white font-medium hover:text-[#DDF247] transition-colors mt-auto w-fit border-b border-transparent hover:border-[#DDF247] pb-1"
                >
                  Baca Artikel
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}