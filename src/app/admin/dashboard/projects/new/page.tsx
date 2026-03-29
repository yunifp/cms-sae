/* eslint-disable @next/next/no-img-element */
"use client";

import { useState } from 'react';
import { ArrowLeft, Save, Upload } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useProjects } from '@/hooks/useProjects';

export default function NewProjectPage() {
  const router = useRouter();
  const { createProject, isLoading } = useProjects();

  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);
  const [thumbnailPreview, setThumbnailPreview] = useState<string | null>(null);
  
  const [galleryFiles, setGalleryFiles] = useState<File[]>([]);
  const [galleryPreviews, setGalleryPreviews] = useState<string[]>([]);

  const [formData, setFormData] = useState({
    title: "",
    client: "",
    location: "",
    year: new Date().getFullYear().toString(),
    status: "perencanaan",
    category: "arsitektur",
    description: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleThumbnailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setThumbnailFile(file);
      setThumbnailPreview(URL.createObjectURL(file));
    }
  };

  const handleGalleryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files).slice(0, 5);
      setGalleryFiles(filesArray);
      
      const previews = filesArray.map(file => URL.createObjectURL(file));
      setGalleryPreviews(previews);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const data = new FormData();
    data.append('title', formData.title);
    data.append('client', formData.client);
    data.append('location', formData.location);
    data.append('year', formData.year);
    data.append('status', formData.status);
    data.append('category', formData.category);
    data.append('description', formData.description);
    
    if (thumbnailFile) {
      data.append('thumbnail', thumbnailFile);
    }

    galleryFiles.forEach(file => {
      data.append('gallery', file);
    });

    const success = await createProject(data);
    if (success) {
      router.push('/admin/dashboard/projects');
    } else {
      alert("Gagal menyimpan proyek");
    }
  };

  return (
    <div className="flex flex-col gap-8 font-sans pb-12">
      <div className="flex flex-col gap-4">
        <Link href="/admin/dashboard/projects" className="flex items-center gap-2 text-gray-400 hover:text-[#DDF247] w-fit text-sm">
          <ArrowLeft className="w-4 h-4" /> Kembali ke Daftar Proyek
        </Link>
        <h1 className="text-3xl font-semibold text-white">Tambah Proyek Baru</h1>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 flex flex-col gap-6">
          <div className="bg-[#181A1F] border border-white/5 p-8 rounded-sm flex flex-col gap-6">
            <h3 className="text-lg font-medium text-white border-b border-white/5 pb-4">Informasi Utama</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col gap-2">
                <label className="text-sm text-gray-400">Nama Proyek</label>
                <input name="title" value={formData.title} onChange={handleChange} type="text" required className="w-full bg-[#121418] border border-white/10 text-white px-4 py-3 focus:outline-none focus:border-[#DDF247]/50 rounded-sm text-sm" />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-sm text-gray-400">Lokasi</label>
                <input name="location" value={formData.location} onChange={handleChange} type="text" required className="w-full bg-[#121418] border border-white/10 text-white px-4 py-3 focus:outline-none focus:border-[#DDF247]/50 rounded-sm text-sm" />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col gap-2">
                <label className="text-sm text-gray-400">Nama Klien</label>
                <input name="client" value={formData.client} onChange={handleChange} type="text" required className="w-full bg-[#121418] border border-white/10 text-white px-4 py-3 focus:outline-none focus:border-[#DDF247]/50 rounded-sm text-sm" />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-sm text-gray-400">Tahun Selesai</label>
                <input name="year" value={formData.year} onChange={handleChange} type="number" required className="w-full bg-[#121418] border border-white/10 text-white px-4 py-3 focus:outline-none focus:border-[#DDF247]/50 rounded-sm text-sm" />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm text-gray-400">Ringkasan Proyek</label>
              <textarea name="description" value={formData.description} onChange={handleChange} rows={6} required className="w-full bg-[#121418] border border-white/10 text-white px-4 py-3 focus:outline-none focus:border-[#DDF247]/50 rounded-sm text-sm resize-none" />
            </div>
          </div>
          
          <div className="bg-[#181A1F] border border-white/5 p-8 rounded-sm flex flex-col gap-4">
             <h3 className="text-lg font-medium text-white border-b border-white/5 pb-4">Gallery Detail (Max 5)</h3>
             <label className="border-2 border-dashed border-white/10 rounded-sm p-8 flex flex-col items-center justify-center gap-3 hover:border-[#DDF247]/30 transition-all cursor-pointer">
                <Upload className="w-6 h-6 text-gray-400" />
                <p className="text-xs text-gray-400 uppercase">Klik untuk upload gambar detail</p>
                <input type="file" multiple className="hidden" accept="image/*" onChange={handleGalleryChange} />
             </label>
             {galleryPreviews.length > 0 && (
               <div className="grid grid-cols-5 gap-2 mt-4">
                 {galleryPreviews.map((src, i) => (
                   <img key={i} src={src} className="w-full h-20 object-cover rounded-sm" alt="Gallery preview" />
                 ))}
               </div>
             )}
          </div>
        </div>

        <div className="flex flex-col gap-6">
          <div className="bg-[#181A1F] border border-white/5 p-8 rounded-sm flex flex-col gap-6">
            <h3 className="text-lg font-medium text-white border-b border-white/5 pb-4">Klasifikasi</h3>
            <div className="flex flex-col gap-2">
              <label className="text-sm text-gray-400">Status Proyek</label>
              <select name="status" value={formData.status} onChange={handleChange} className="w-full bg-[#121418] border border-white/10 text-white px-4 py-3 rounded-sm text-sm appearance-none">
                <option value="selesai">Selesai</option>
                <option value="proses">Sedang Berjalan</option>
                <option value="perencanaan">Tahap Perencanaan</option>
              </select>
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-sm text-gray-400">Kategori</label>
              <select name="category" value={formData.category} onChange={handleChange} className="w-full bg-[#121418] border border-white/10 text-white px-4 py-3 rounded-sm text-sm appearance-none">
                <option value="arsitektur">Arsitektur</option>
                <option value="konstruksi">Konstruksi</option>
                <option value="interior">Interior</option>
                <option value="renovasi">Renovasi</option>
              </select>
            </div>
          </div>
          
          <div className="bg-[#181A1F] border border-white/5 p-8 rounded-sm flex flex-col gap-4">
             <h3 className="text-lg font-medium text-white border-b border-white/5 pb-4">Thumbnail Proyek</h3>
             <label className="border-2 border-dashed border-white/10 rounded-sm p-8 flex flex-col items-center justify-center gap-3 hover:border-[#DDF247]/30 transition-all cursor-pointer">
                {thumbnailPreview ? (
                  <img src={thumbnailPreview} alt="Preview" className="w-full h-40 object-cover rounded-sm" />
                ) : (
                  <>
                    <Upload className="w-6 h-6 text-gray-400" />
                    <p className="text-xs text-gray-400 uppercase">Upload Thumbnail</p>
                  </>
                )}
                <input type="file" className="hidden" accept="image/*" onChange={handleThumbnailChange} />
             </label>
          </div>

          <div className="flex flex-col gap-3">
            <Button type="submit" disabled={isLoading} className="w-full bg-[#DDF247] text-black hover:bg-[#c5db38] py-7 font-bold flex items-center gap-2">
              {isLoading ? "Menyimpan..." : <><Save className="w-5 h-5" /> Simpan Proyek</>}
            </Button>
            <Button type="button" onClick={() => router.back()} variant="outline" className="w-full border-white/10 text-gray-400 hover:bg-white/5 py-7">Batalkan</Button>
          </div>
        </div>
      </form>
    </div>
  );
}