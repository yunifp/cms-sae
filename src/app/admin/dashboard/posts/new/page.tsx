"use client";

import { useState } from 'react';
import { ArrowLeft, Upload, Save, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function NewPostPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      router.push('/admin/dashboard/posts');
    }, 2000);
  };

  return (
    <div className="flex flex-col gap-8 font-sans pb-12">
      
      {/* Header */}
      <div className="flex flex-col gap-4">
        <Link href="/admin/dashboard/posts" className="flex items-center gap-2 text-gray-400 hover:text-[#DDF247] transition-colors w-fit text-sm">
          <ArrowLeft className="w-4 h-4" /> Kembali ke Daftar Artikel
        </Link>
        <h1 className="text-3xl font-semibold text-white">Tulis Artikel Baru</h1>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Kolom Kiri: Form Utama */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          <div className="bg-[#181A1F] border border-white/5 p-8 rounded-sm flex flex-col gap-6">
            <h3 className="text-lg font-medium text-white border-b border-white/5 pb-4">Konten Artikel</h3>
            
            <div className="flex flex-col gap-2">
              <label className="text-sm text-gray-400">Judul Artikel</label>
              <input 
                type="text" required placeholder="Contoh: 5 Tips Renovasi Rumah..."
                className="w-full bg-[#121418] border border-white/10 text-white px-4 py-3 focus:outline-none focus:border-[#DDF247]/50 rounded-sm text-sm"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm text-gray-400">Kutipan Singkat (Excerpt)</label>
              <textarea 
                rows={3} required placeholder="Tulis 1-2 kalimat ringkasan artikel untuk ditampilkan di card..."
                className="w-full bg-[#121418] border border-white/10 text-white px-4 py-3 focus:outline-none focus:border-[#DDF247]/50 rounded-sm text-sm resize-none"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm text-gray-400">Isi Konten Utama (Mendukung Markdown / HTML)</label>
              <textarea 
                rows={15} required placeholder="Tulis isi lengkap artikel Anda di sini..."
                className="w-full bg-[#121418] border border-white/10 text-white px-4 py-3 focus:outline-none focus:border-[#DDF247]/50 rounded-sm text-sm resize-y"
              />
            </div>
          </div>
        </div>

        {/* Kolom Kanan: Meta Data & Upload */}
        <div className="flex flex-col gap-6">
          
          <div className="bg-[#181A1F] border border-white/5 p-8 rounded-sm flex flex-col gap-6">
            <h3 className="text-lg font-medium text-white border-b border-white/5 pb-4">Meta & SEO</h3>
            
            <div className="flex flex-col gap-2">
              <label className="text-sm text-gray-400">URL Slug</label>
              <input 
                type="text" required placeholder="contoh-judul-artikel"
                className="w-full bg-[#121418] border border-white/10 text-white px-4 py-3 focus:outline-none focus:border-[#DDF247]/50 rounded-sm text-sm"
              />
              <span className="text-[10px] text-gray-500">Karakter unik URL (tanpa spasi).</span>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm text-gray-400">Tags / Kategori</label>
              <input 
                type="text" required placeholder="Contoh: Tips, Interior, Konstruksi"
                className="w-full bg-[#121418] border border-white/10 text-white px-4 py-3 focus:outline-none focus:border-[#DDF247]/50 rounded-sm text-sm"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm text-gray-400">Status Publish</label>
              <select className="w-full bg-[#121418] border border-white/10 text-white px-4 py-3 focus:outline-none focus:border-[#DDF247]/50 rounded-sm text-sm appearance-none">
                <option value="draft">Draft (Simpan Sementara)</option>
                <option value="published">Published (Terbitkan)</option>
              </select>
            </div>
          </div>

          <div className="bg-[#181A1F] border border-white/5 p-8 rounded-sm flex flex-col gap-4">
            <h3 className="text-lg font-medium text-white border-b border-white/5 pb-4">Cover Image</h3>
            <div className="border-2 border-dashed border-white/10 rounded-sm p-8 flex flex-col items-center justify-center gap-3 hover:border-[#DDF247]/30 transition-colors cursor-pointer group">
              <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-[#DDF247]/10 transition-colors">
                <Upload className="w-6 h-6 text-gray-400 group-hover:text-[#DDF247]" />
              </div>
              <p className="text-xs text-gray-400 text-center uppercase tracking-widest">Unggah Gambar</p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col gap-3">
            <Button type="submit" disabled={isLoading} className="w-full bg-[#DDF247] text-black hover:bg-[#c5db38] rounded-sm py-7 font-bold flex items-center gap-2">
              {isLoading ? "Menyimpan..." : <><Save className="w-5 h-5" /> Simpan Artikel</>}
            </Button>
            <Button type="button" variant="outline" onClick={() => router.back()} className="w-full border-white/10 text-gray-400 hover:bg-white/5 rounded-sm py-7 font-medium">
              <X className="w-5 h-5 mr-2" /> Batalkan
            </Button>
          </div>

        </div>
      </form>
    </div>
  );
}