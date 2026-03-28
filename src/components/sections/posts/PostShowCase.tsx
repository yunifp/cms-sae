"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { BookOpen, ArrowRight } from "lucide-react";

// Mock data untuk daftar postingan/artikel
const DUMMY_POSTS = [
  {
    slug: "5-tips-renovasi-rumah",
    title: "5 Tips Renovasi Rumah dengan Budget Minim",
    excerpt: "Pelajari cara merenovasi rumah impian Anda tanpa harus menguras kantong dengan tips praktis berikut.",
    date: "15 Maret 2026",
    image: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?q=80&w=600&auto=format&fit=crop"
  },
  {
    slug: "tren-desain-interior-2026",
    title: "Tren Desain Interior yang Akan Populer di 2026",
    excerpt: "Dari warna hangat hingga material ramah lingkungan, temukan tren desain interior terbaru tahun ini.",
    date: "10 Maret 2026",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=600&auto=format&fit=crop"
  },
  {
    slug: "memilih-material-atap-terbaik",
    title: "Panduan Memilih Material Atap Terbaik untuk Iklim Tropis",
    excerpt: "Jangan salah pilih! Berikut adalah panduan memilih material atap yang tahan lama untuk cuaca tropis.",
    date: "05 Maret 2026",
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=600&auto=format&fit=crop"
  },
  {
    slug: "pentingnya-pondasi-kuat",
    title: "Mengapa Pondasi yang Kuat Adalah Kunci Bangunan Tahan Gempa",
    excerpt: "Pondasi bukan sekadar alas bangunan. Pahami pentingnya struktur pondasi untuk keamanan jangka panjang.",
    date: "28 Februari 2026",
    image: "https://images.unsplash.com/photo-1541888086925-920a061d4b60?q=80&w=600&auto=format&fit=crop"
  },
  {
    slug: "cara-memilih-kontraktor",
    title: "Cara Tepat Memilih Kontraktor untuk Bangun Rumah Anda",
    excerpt: "Tips jitu memilih kontraktor terpercaya agar proyek rumah impian Anda selesai tepat waktu dan sesuai standar.",
    date: "20 Februari 2026",
    image: "https://images.unsplash.com/photo-1504307651254-35680f356f27?q=80&w=600&auto=format&fit=crop"
  },
  {
    slug: "inovasi-beton-ramah-lingkungan",
    title: "Mengenal Inovasi Beton Ramah Lingkungan di Era Modern",
    excerpt: "Industri konstruksi kini beralih ke material hijau. Apa itu beton ramah lingkungan dan apa keuntungannya?",
    date: "12 Februari 2026",
    image: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?q=80&w=600&auto=format&fit=crop"
  }
];

export function PostShowcase() {
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
              <BookOpen className="h-4 w-4" />
              <span>Artikel Kami</span>
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-normal text-white">
              Berita & Wawasan Terbaru
            </h2>
          </motion.div>
        </div>

        {/* Grid Card List Artikel */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {DUMMY_POSTS.map((post, idx) => (
            <motion.div 
              key={post.slug}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.15 }} // Efek stagger (muncul berurutan)
              className="bg-[#1A1D24] border border-[#2A2D34] overflow-hidden group flex flex-col"
            >
              
              {/* Thumbnail Gambar */}
              <Link href={`/posts/${post.slug}`} className="block relative aspect-[4/3] overflow-hidden">
                <div 
                  className="w-full h-full bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                  style={{ backgroundImage: `url('${post.image}')` }}
                />
              </Link>
              
              {/* Konten Card */}
              <div className="p-6 md:p-8 flex flex-col flex-grow">
                <div className="text-sm text-[#DDF247] font-medium mb-4 tracking-wide uppercase">
                  {post.date}
                </div>
                
                <Link href={`/posts/${post.slug}`} className="block group/title">
                  <h3 className="text-xl md:text-2xl font-normal text-white mb-4 group-hover/title:text-[#DDF247] transition-colors line-clamp-2">
                    {post.title}
                  </h3>
                </Link>
                
                <p className="text-gray-400 mb-8 line-clamp-3 flex-grow font-light leading-relaxed">
                  {post.excerpt}
                </p>
                
                {/* Tombol Baca Artikel */}
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