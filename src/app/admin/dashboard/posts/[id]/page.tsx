"use client";

import { useState } from 'react';
import { ArrowLeft, Save, } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useRouter, useParams } from 'next/navigation';

export default function EditPostPage() {
  const router = useRouter();
  const params = useParams();
  const [isLoading, setIsLoading] = useState(false);

  // Pre-filled mock data
  const [formData, setFormData] = useState({
    title: "5 Tips Renovasi Rumah dengan Budget Minim",
    slug: "5-tips-renovasi-rumah",
    tags: "Renovasi, Budget, Tips",
    excerpt: "Pelajari cara merenovasi rumah impian Anda tanpa harus menguras kantong.",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Di sini tempat konten utamanya ditulis...",
    status: "published"
  });

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
      
      <div className="flex flex-col gap-4">
        <Link href="/admin/dashboard/posts" className="flex items-center gap-2 text-gray-400 hover:text-[#DDF247] transition-colors w-fit text-sm">
          <ArrowLeft className="w-4 h-4" /> Kembali ke Daftar Artikel
        </Link>
        <div>
          <h1 className="text-3xl font-semibold text-white mb-1">Edit Artikel</h1>
          <p className="text-sm text-gray-400">ID: {params.id}</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Kolom Kiri: Form Utama */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          <div className="bg-[#181A1F] border border-white/5 p-8 rounded-sm flex flex-col gap-6">
            <h3 className="text-lg font-medium text-white border-b border-white/5 pb-4">Konten Artikel</h3>
            
            <div className="flex flex-col gap-2">
              <label className="text-sm text-gray-400">Judul Artikel</label>
              <input 
                type="text" required value={formData.title} onChange={(e) => setFormData({...formData, title: e.target.value})}
                className="w-full bg-[#121418] border border-white/10 text-white px-4 py-3 focus:outline-none focus:border-[#DDF247]/50 rounded-sm text-sm"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm text-gray-400">Kutipan Singkat (Excerpt)</label>
              <textarea 
                rows={3} required value={formData.excerpt} onChange={(e) => setFormData({...formData, excerpt: e.target.value})}
                className="w-full bg-[#121418] border border-white/10 text-white px-4 py-3 focus:outline-none focus:border-[#DDF247]/50 rounded-sm text-sm resize-none"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm text-gray-400">Isi Konten Utama</label>
              <textarea 
                rows={15} required value={formData.content} onChange={(e) => setFormData({...formData, content: e.target.value})}
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
                type="text" required value={formData.slug} onChange={(e) => setFormData({...formData, slug: e.target.value})}
                className="w-full bg-[#121418] border border-white/10 text-white px-4 py-3 focus:outline-none focus:border-[#DDF247]/50 rounded-sm text-sm"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm text-gray-400">Tags / Kategori</label>
              <input 
                type="text" required value={formData.tags} onChange={(e) => setFormData({...formData, tags: e.target.value})}
                className="w-full bg-[#121418] border border-white/10 text-white px-4 py-3 focus:outline-none focus:border-[#DDF247]/50 rounded-sm text-sm"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm text-gray-400">Status Publish</label>
              <select value={formData.status} onChange={(e) => setFormData({...formData, status: e.target.value})} className="w-full bg-[#121418] border border-white/10 text-white px-4 py-3 focus:outline-none focus:border-[#DDF247]/50 rounded-sm text-sm appearance-none">
                <option value="draft">Draft</option>
                <option value="published">Published</option>
              </select>
            </div>
          </div>

          <div className="bg-[#181A1F] border border-white/5 p-8 rounded-sm flex flex-col gap-4">
            <h3 className="text-lg font-medium text-white border-b border-white/5 pb-4">Cover Image</h3>
            <div className="border-2 border-dashed border-[#DDF247]/30 bg-[#DDF247]/5 rounded-sm p-8 flex flex-col items-center justify-center gap-3 cursor-pointer group">
              <span className="text-xs text-[#DDF247] font-medium tracking-widest uppercase">Ganti Gambar</span>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <Button type="submit" disabled={isLoading} className="w-full bg-[#DDF247] text-black hover:bg-[#c5db38] rounded-sm py-7 font-bold flex items-center gap-2">
              {isLoading ? "Menyimpan..." : <><Save className="w-5 h-5" /> Simpan Perubahan</>}
            </Button>
            <Button type="button" variant="outline" onClick={() => router.back()} className="w-full border-white/10 text-gray-400 hover:bg-white/5 rounded-sm py-7 font-medium">
              Batalkan
            </Button>
          </div>

        </div>
      </form>
    </div>
  );
}