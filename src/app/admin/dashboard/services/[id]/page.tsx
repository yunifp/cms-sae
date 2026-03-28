/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useState } from 'react';
import { ArrowLeft, Upload, Save, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useRouter, useParams } from 'next/navigation';

export default function EditServicePage() {
  const router = useRouter();
  const params = useParams();
  const [isLoading, setIsLoading] = useState(false);

  // Pre-filled mock data
  const [formData, setFormData] = useState({
    name: "Desain Arsitektur & Interior",
    desc: "Merancang konsep visual dan tata ruang fungsional yang disesuaikan dengan kebutuhan dan karakter klien.",
    status: "Aktif"
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      router.push('/admin/dashboard/services');
    }, 2000);
  };

  return (
    <div className="flex flex-col gap-8 font-sans pb-12">
      
      {/* Header & Back Button */}
      <div className="flex flex-col gap-4">
        <Link 
          href="/admin/dashboard/services" 
          className="flex items-center gap-2 text-gray-400 hover:text-[#DDF247] transition-colors w-fit text-sm"
        >
          <ArrowLeft className="w-4 h-4" /> Kembali ke Daftar Layanan
        </Link>
        <div>
          <h1 className="text-3xl font-semibold text-white mb-1">Edit Layanan</h1>
          <p className="text-sm text-gray-400">ID Layanan: {params.id}</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Kolom Kiri: Form Utama */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          <div className="bg-[#181A1F] border border-white/5 p-8 rounded-sm flex flex-col gap-6">
            <h3 className="text-lg font-medium text-white border-b border-white/5 pb-4">Informasi Layanan</h3>
            
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
                value={formData.desc}
                onChange={(e) => setFormData({...formData, desc: e.target.value})}
                className="w-full bg-[#121418] border border-white/10 text-white px-4 py-3 focus:outline-none focus:border-[#DDF247]/50 rounded-sm text-sm transition-colors resize-none"
              />
            </div>
          </div>
        </div>

        {/* Kolom Kanan: Pengaturan & Upload */}
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

          {/* Upload Image Placeholder */}
          <div className="bg-[#181A1F] border border-white/5 p-8 rounded-sm flex flex-col gap-4">
            <h3 className="text-lg font-medium text-white border-b border-white/5 pb-4">Media Layanan</h3>
            <div className="border-2 border-dashed border-[#DDF247]/30 bg-[#DDF247]/5 rounded-sm p-8 flex flex-col items-center justify-center gap-3 cursor-pointer group">
              <span className="text-xs text-[#DDF247] font-medium tracking-widest uppercase">Ganti Gambar</span>
            </div>
          </div>

          {/* Action Buttons */}
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
              Batalkan
            </Button>
          </div>
        </div>

      </form>
    </div>
  );
}