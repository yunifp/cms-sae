"use client";

import { useState, useEffect } from 'react';
import { ArrowLeft, Upload, Save, X, Plus, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useRouter, useParams } from 'next/navigation';
import { useServices } from '@/hooks/useServices';
import Image from 'next/image';

export default function EditServicePage() {
  const router = useRouter();
  const params = useParams();
  const { fetchServiceById, updateService, isLoading } = useServices();
  const IMAGE_BASE_URL = 'httpa://api.saeboemi.com/';

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isFetchingData, setIsFetchingData] = useState(true);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    status: "Aktif",
  });

  const [features, setFeatures] = useState<string[]>([""]);

  useEffect(() => {
    const loadService = async () => {
      if (params.id) {
        const data = await fetchServiceById(params.id as string);
        if (data) {
          setFormData({
            name: data.name,
            description: data.description,
            status: data.status,
          });
          
          if (data.imageUrl) {
            setImagePreview(`${IMAGE_BASE_URL}${data.imageUrl}`);
          }

          if (data.features) {
             try {
               const parsedFeatures = JSON.parse(data.features);
               setFeatures(parsedFeatures.length > 0 ? parsedFeatures : [""]);
             } catch {
               setFeatures([""]);
             }
          }
        } else {
          router.push('/admin/dashboard/services');
        }
      }
      setIsFetchingData(false);
    };
    loadService();
  }, [params.id, fetchServiceById, router]);

  const handleAddFeature = () => {
    setFeatures([...features, ""]);
  };

  const handleRemoveFeature = (index: number) => {
    const newFeatures = features.filter((_, i) => i !== index);
    setFeatures(newFeatures.length > 0 ? newFeatures : [""]);
  };

  const handleFeatureChange = (text: string, index: number) => {
    const newFeatures = [...features];
    newFeatures[index] = text;
    setFeatures(newFeatures);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const data = new FormData();
    data.append('name', formData.name);
    data.append('description', formData.description);
    data.append('status', formData.status);
    
    const validFeatures = features.filter(f => f.trim() !== "");
    data.append('features', JSON.stringify(validFeatures));

    if (imageFile) {
      data.append('image', imageFile);
    }

    const success = await updateService(params.id as string, data);
    if (success) {
      router.push('/admin/dashboard/services');
    } else {
      alert("Gagal memperbarui layanan");
    }
  };

  if (isFetchingData) return <div className="text-white text-center py-20 animate-pulse">Memuat data layanan...</div>;

  return (
    <div className="flex flex-col gap-8 font-sans pb-12">
      
      <div className="flex flex-col gap-4">
        <Link 
          href="/admin/dashboard/services" 
          className="flex items-center gap-2 text-gray-400 hover:text-[#DDF247] transition-colors w-fit text-sm"
        >
          <ArrowLeft className="w-4 h-4" /> Kembali ke Daftar Layanan
        </Link>
        <h1 className="text-3xl font-semibold text-white">Edit Layanan</h1>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        <div className="lg:col-span-2 flex flex-col gap-6">
          <div className="bg-[#181A1F] border border-white/5 p-8 rounded-sm flex flex-col gap-6">
            <h3 className="text-lg font-medium text-white border-b border-white/5 pb-4">Informasi Utama</h3>
            
            <div className="flex flex-col gap-2">
              <label className="text-sm text-gray-400">Nama Layanan</label>
              <input 
                type="text" 
                required
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                className="w-full bg-[#121418] border border-white/10 text-white px-4 py-3 focus:outline-none focus:border-[#DDF247]/50 rounded-sm text-sm transition-colors"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm text-gray-400">Deskripsi Lengkap</label>
              <textarea 
                rows={6}
                required
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                className="w-full bg-[#121418] border border-white/10 text-white px-4 py-3 focus:outline-none focus:border-[#DDF247]/50 rounded-sm text-sm transition-colors resize-none"
              />
            </div>
          </div>

          <div className="bg-[#181A1F] border border-white/5 p-8 rounded-sm flex flex-col gap-6">
            <div className="flex items-center justify-between border-b border-white/5 pb-4">
              <h3 className="text-lg font-medium text-white">Daftar Fitur Layanan</h3>
              <Button type="button" onClick={handleAddFeature} variant="outline" className="h-8 px-3 bg-white/5 border-white/10 text-xs">
                 <Plus className="w-3 h-3 mr-1" /> Tambah Poin
              </Button>
            </div>
            
            <div className="flex flex-col gap-3">
              {features.map((feature, index) => (
                <div key={index} className="flex gap-2 items-center">
                   <div className="w-6 h-6 rounded-full bg-white/5 flex items-center justify-center text-xs text-gray-400 shrink-0">
                     {index + 1}
                   </div>
                   <input 
                      type="text" 
                      value={feature}
                      onChange={(e) => handleFeatureChange(e.target.value, index)}
                      className="w-full bg-[#121418] border border-white/10 text-white px-4 py-2 focus:outline-none focus:border-[#DDF247]/50 rounded-sm text-sm"
                   />
                   <button type="button" onClick={() => handleRemoveFeature(index)} className="p-2 text-gray-500 hover:text-red-400 hover:bg-red-400/10 rounded-sm transition-colors">
                     <Trash2 className="w-4 h-4" />
                   </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-6">
          
          <div className="bg-[#181A1F] border border-white/5 p-8 rounded-sm flex flex-col gap-6">
            <h3 className="text-lg font-medium text-white border-b border-white/5 pb-4">Klasifikasi</h3>
            
            <div className="flex flex-col gap-2">
              <label className="text-sm text-gray-400">Status Layanan</label>
              <select 
                value={formData.status}
                onChange={(e) => setFormData({...formData, status: e.target.value})}
                className="w-full bg-[#121418] border border-white/10 text-white px-4 py-3 focus:outline-none focus:border-[#DDF247]/50 rounded-sm text-sm transition-colors appearance-none"
              >
                <option value="Aktif">Aktif</option>
                <option value="Nonaktif">Nonaktif</option>
              </select>
            </div>
          </div>

          <div className="bg-[#181A1F] border border-white/5 p-8 rounded-sm flex flex-col gap-4">
            <h3 className="text-lg font-medium text-white border-b border-white/5 pb-4">Media Layanan</h3>
            <label className="border-2 border-dashed border-white/10 rounded-sm p-4 flex flex-col items-center justify-center gap-3 hover:border-[#DDF247]/30 transition-colors cursor-pointer group relative overflow-hidden h-40">
              {imagePreview ? (
                <Image src={imagePreview} alt="Preview" fill className="object-cover" unoptimized />
              ) : (
                <Upload className="w-8 h-8 text-gray-400" />
              )}
              <input type="file" className="hidden" accept="image/*" onChange={handleImageChange} />
            </label>
          </div>

          <div className="flex flex-col gap-3">
            <Button 
              type="submit" 
              disabled={isLoading}
              className="w-full bg-[#DDF247] text-black hover:bg-[#c5db38] rounded-sm py-7 font-bold flex items-center gap-2"
            >
              {isLoading ? "Menyimpan Perubahan..." : <><Save className="w-5 h-5" /> Simpan Perubahan</>}
            </Button>
            <Button 
              type="button"
              variant="outline"
              onClick={() => router.back()}
              className="w-full border-white/10 text-gray-400 hover:bg-white/5 rounded-sm py-7 font-medium"
            >
              <X className="w-5 h-5 mr-2" /> Batalkan
            </Button>
          </div>
        </div>

      </form>
    </div>
  );
}