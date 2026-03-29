/* eslint-disable @next/next/no-img-element */
"use client";

import { useState, useEffect } from 'react';
import { ArrowLeft, Save, Upload } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useRouter, useParams } from 'next/navigation';
import { useProjects } from '@/hooks/useProjects';

interface ProjectImage {
  type: string;
  url: string;
}

export default function EditProjectPage() {
  const router = useRouter();
  const params = useParams();
  const { fetchProjectById, updateProject, isLoading } = useProjects();
  const IMAGE_BASE_URL = 'httpa://api.saeboemi.com/';

  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);
  const [thumbnailPreview, setThumbnailPreview] = useState<string | null>(null);
  
  const [galleryFiles, setGalleryFiles] = useState<File[]>([]);
  const [galleryPreviews, setGalleryPreviews] = useState<string[]>([]);
  const [isFetchingData, setIsFetchingData] = useState(true);
  
  const [formData, setFormData] = useState({
    title: "", client: "", location: "", year: 2024,
    status: "selesai", category: "arsitektur", description: ""
  });

  useEffect(() => {
    const loadProject = async () => {
      if (params.id) {
        const data = await fetchProjectById(params.id as string);
        if (data) {
          setFormData({
            title: data.title,
            client: data.client,
            location: data.location,
            year: data.year,
            status: data.status,
            category: data.category,
            description: data.description
          });
          
          if (data.images && Array.isArray(data.images)) {
            const thumb = data.images.find((img: ProjectImage) => img.type === 'thumbnail');
            if (thumb) setThumbnailPreview(`${IMAGE_BASE_URL}${thumb.url}`);

            const galleryImgs = data.images.filter((img: ProjectImage) => img.type === 'detail');
            if (galleryImgs.length > 0) {
              setGalleryPreviews(galleryImgs.map((img: ProjectImage) => `${IMAGE_BASE_URL}${img.url}`));
            }
          }
        } else {
          router.push('/admin/dashboard/projects');
        }
      }
      setIsFetchingData(false);
    };
    loadProject();
  }, [params.id, fetchProjectById, router]);

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
      setGalleryPreviews(filesArray.map(file => URL.createObjectURL(file)));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const data = new FormData();
    data.append('title', formData.title);
    data.append('client', formData.client);
    data.append('location', formData.location);
    data.append('year', formData.year.toString());
    data.append('status', formData.status);
    data.append('category', formData.category);
    data.append('description', formData.description);
    
    if (thumbnailFile) {
      data.append('thumbnail', thumbnailFile);
    }
    galleryFiles.forEach(file => {
      data.append('gallery', file);
    });

    const success = await updateProject(params.id as string, data);
    if (success) {
      router.push('/admin/dashboard/projects');
    } else {
      alert("Gagal memperbarui proyek");
    }
  };

  if (isFetchingData) return <div className="text-white text-center py-20 animate-pulse">Memuat data proyek...</div>;

  return (
    <div className="flex flex-col gap-8 font-sans pb-12">
      <div className="flex flex-col gap-4">
        <Link href="/admin/dashboard/projects" className="flex items-center gap-2 text-gray-400 hover:text-[#DDF247] w-fit text-sm">
          <ArrowLeft className="w-4 h-4" /> Kembali
        </Link>
        <h1 className="text-3xl font-semibold text-white">Edit Proyek</h1>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 flex flex-col gap-6">
          <div className="bg-[#181A1F] border border-white/5 p-8 rounded-sm flex flex-col gap-6">
            <h3 className="text-lg font-medium text-white border-b border-white/5 pb-4">Informasi Utama</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col gap-2">
                <label className="text-sm text-gray-400">Nama Proyek</label>
                <input name="title" value={formData.title} onChange={handleChange} type="text" required className="w-full bg-[#121418] border border-white/10 text-white px-4 py-3 rounded-sm text-sm" />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-sm text-gray-400">Lokasi</label>
                <input name="location" value={formData.location} onChange={handleChange} type="text" required className="w-full bg-[#121418] border border-white/10 text-white px-4 py-3 rounded-sm text-sm" />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col gap-2">
                <label className="text-sm text-gray-400">Nama Klien</label>
                <input name="client" value={formData.client} onChange={handleChange} type="text" required className="w-full bg-[#121418] border border-white/10 text-white px-4 py-3 rounded-sm text-sm" />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-sm text-gray-400">Tahun Selesai</label>
                <input name="year" value={formData.year} onChange={handleChange} type="number" required className="w-full bg-[#121418] border border-white/10 text-white px-4 py-3 rounded-sm text-sm" />
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-sm text-gray-400">Ringkasan</label>
              <textarea name="description" value={formData.description} onChange={handleChange} rows={6} required className="w-full bg-[#121418] border border-white/10 text-white px-4 py-3 rounded-sm text-sm resize-none" />
            </div>
          </div>
          
          <div className="bg-[#181A1F] border border-white/5 p-8 rounded-sm flex flex-col gap-4">
             <h3 className="text-lg font-medium text-white border-b border-white/5 pb-4">Gallery Detail (Max 5)</h3>
             <label className="border-2 border-dashed border-white/10 rounded-sm p-4 flex flex-col items-center justify-center cursor-pointer hover:border-[#DDF247]/30 transition-all">
                <Upload className="w-6 h-6 text-gray-400" />
                <p className="text-xs text-gray-400 uppercase mt-2">Update Gallery Baru</p>
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
            <select name="status" value={formData.status} onChange={handleChange} className="w-full bg-[#121418] border border-white/10 text-white px-4 py-3 rounded-sm text-sm">
              <option value="selesai">Selesai</option>
              <option value="proses">Sedang Berjalan</option>
              <option value="perencanaan">Tahap Perencanaan</option>
            </select>
          </div>

          <div className="bg-[#181A1F] border border-white/5 p-8 rounded-sm flex flex-col gap-4">
             <h3 className="text-lg font-medium text-white border-b border-white/5 pb-4">Thumbnail Proyek</h3>
             <label className="border-2 border-dashed border-white/10 rounded-sm p-4 flex flex-col items-center justify-center cursor-pointer hover:border-[#DDF247]/30 transition-all">
                {thumbnailPreview ? (
                  <img src={thumbnailPreview} className="w-full h-40 object-cover rounded-sm" alt="Thumbnail preview" />
                ) : (
                  <Upload className="w-8 h-8 text-gray-400" />
                )}
                <input type="file" className="hidden" accept="image/*" onChange={handleThumbnailChange} />
             </label>
          </div>

          <Button type="submit" disabled={isLoading} className="w-full bg-[#DDF247] text-black py-7 font-bold flex items-center gap-2">
            <Save className="w-5 h-5" /> {isLoading ? "Menyimpan..." : "Simpan Perubahan"}
          </Button>
        </div>
      </form>
    </div>
  );
}