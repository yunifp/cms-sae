/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useState, useEffect } from 'react';
import { ArrowLeft, Upload, Save, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useRouter, useParams } from 'next/navigation';

export default function EditProjectPage() {
  const router = useRouter();
  const params = useParams();
  const [isLoading, setIsLoading] = useState(false);

  // State untuk nyimpen data form (Simulasi pre-filled data)
  const [formData, setFormData] = useState({
    title: "Pembangunan Hunian Tropis Modern",
    client: "Keluarga Pratama",
    year: 2023,
    description: "Proyek ini bertujuan untuk menciptakan hunian eksklusif yang menyatu harmonis dengan lingkungan alam sekitarnya.",
    status: "selesai",
    category: "konstruksi"
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulasi update data
    setTimeout(() => {
      setIsLoading(false);
      router.push('/admin/dashboard/projects');
    }, 2000);
  };

  return (
    <div className="flex flex-col gap-8 font-sans pb-12">
      
      {/* Header & Back Button */}
      <div className="flex flex-col gap-4">
        <Link 
          href="/admin/dashboard/projects" 
          className="flex items-center gap-2 text-gray-400 hover:text-[#DDF247] transition-colors w-fit text-sm"
        >
          <ArrowLeft className="w-4 h-4" /> Kembali ke Daftar Proyek
        </Link>
        <div>
          <h1 className="text-3xl font-semibold text-white mb-1">Edit Proyek</h1>
          <p className="text-sm text-gray-400">ID Proyek: {params.id}</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Kolom Kiri: Form Detail */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          <div className="bg-[#181A1F] border border-white/5 p-8 rounded-sm flex flex-col gap-6">
            <h3 className="text-lg font-medium text-white border-b border-white/5 pb-4">Informasi Utama</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col gap-2">
                <label className="text-sm text-gray-400">Nama Proyek</label>
                <input 
                  type="text" 
                  required
                  placeholder="Proyek Hunian Tropis Modern"
                  className="w-full bg-[#121418] border border-white/10 text-white px-4 py-3 focus:outline-none focus:border-[#DDF247]/50 rounded-sm text-sm transition-colors"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-sm text-gray-400">Lokasi</label>
                <input 
                  type="text" 
                  required
                  placeholder="Bandung, Jawa Barat"
                  className="w-full bg-[#121418] border border-white/10 text-white px-4 py-3 focus:outline-none focus:border-[#DDF247]/50 rounded-sm text-sm transition-colors"
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col gap-2">
                <label className="text-sm text-gray-400">Nama Klien</label>
                <input 
                  type="text" 
                  required
                  value={formData.client}
                  onChange={(e) => setFormData({...formData, client: e.target.value})}
                  className="w-full bg-[#121418] border border-white/10 text-white px-4 py-3 focus:outline-none focus:border-[#DDF247]/50 rounded-sm text-sm transition-colors"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-sm text-gray-400">Tahun Selesai</label>
                <input 
                  type="number" 
                  value={formData.year}
                  onChange={(e) => setFormData({...formData, year: parseInt(e.target.value)})}
                  className="w-full bg-[#121418] border border-white/10 text-white px-4 py-3 focus:outline-none focus:border-[#DDF247]/50 rounded-sm text-sm transition-colors"
                />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm text-gray-400">Ringkasan Proyek</label>
              <textarea 
                rows={6}
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                className="w-full bg-[#121418] border border-white/10 text-white px-4 py-3 focus:outline-none focus:border-[#DDF247]/50 rounded-sm text-sm transition-colors resize-none"
              />
            </div>
          </div>
        </div>

        {/* Kolom Kanan: Meta Data & Upload */}
        <div className="flex flex-col gap-6">
          
          <div className="bg-[#181A1F] border border-white/5 p-8 rounded-sm flex flex-col gap-6">
            <h3 className="text-lg font-medium text-white border-b border-white/5 pb-4">Klasifikasi</h3>
            
            <div className="flex flex-col gap-2">
              <label className="text-sm text-gray-400">Status Proyek</label>
              <select 
                value={formData.status}
                onChange={(e) => setFormData({...formData, status: e.target.value})}
                className="w-full bg-[#121418] border border-white/10 text-white px-4 py-3 focus:outline-none focus:border-[#DDF247]/50 rounded-sm text-sm transition-colors appearance-none"
              >
                <option value="selesai">Selesai</option>
                <option value="proses">Sedang Berjalan</option>
                <option value="perencanaan">Tahap Perencanaan</option>
              </select>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm text-gray-400">Kategori</label>
              <select 
                value={formData.category}
                onChange={(e) => setFormData({...formData, category: e.target.value})}
                className="w-full bg-[#121418] border border-white/10 text-white px-4 py-3 focus:outline-none focus:border-[#DDF247]/50 rounded-sm text-sm transition-colors appearance-none"
              >
                <option value="arsitektur">Arsitektur</option>
                <option value="konstruksi">Konstruksi</option>
                <option value="interior">Interior</option>
                <option value="renovasi">Renovasi</option>
              </select>
            </div>
          </div>

          <div className="bg-[#181A1F] border border-white/5 p-8 rounded-sm flex flex-col gap-4">
            <h3 className="text-lg font-medium text-white border-b border-white/5 pb-4">Media Proyek</h3>
            <div className="border-2 border-dashed border-[#DDF247]/30 bg-[#DDF247]/5 rounded-sm p-8 flex flex-col items-center justify-center gap-3 cursor-pointer group">
              <span className="text-xs text-[#DDF247] font-medium tracking-widest uppercase">Ganti Gambar</span>
            </div>
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
              Batalkan
            </Button>
          </div>
        </div>

      </form>
    </div>
  );
}