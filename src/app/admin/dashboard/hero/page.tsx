/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { useState, useEffect } from 'react';
import { Save, Upload, Type, Link as LinkIcon, MapPin, CheckCircle2, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useHeroSettings } from '@/hooks/useHeroSettings';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

export default function HeroSettingsPage() {
  const { heroData, isLoading, fetchHeroSettings, updateHeroSettings } = useHeroSettings();
  const [isSaving, setIsSaving] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const IMAGE_BASE_URL = 'httpa://api.saeboemi.com/';

  const [formData, setFormData] = useState({
    title: "",
    subtitle: "",
    description: "",
    location: "",
    buttonText: "",
    buttonLink: ""
  });

  const [preview, setPreview] = useState("");
  const [file, setFile] = useState<File | null>(null);

  useEffect(() => {
    fetchHeroSettings();
  }, [fetchHeroSettings]);

  useEffect(() => {
    if (heroData) {
      setFormData({
        title: heroData.title,
        subtitle: heroData.subtitle,
        description: heroData.description,
        location: heroData.location,
        buttonText: heroData.buttonText,
        buttonLink: heroData.buttonLink
      });
      if (heroData.imageUrl) setPreview(`${IMAGE_BASE_URL}${heroData.imageUrl}`);
    }
  }, [heroData]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      setFile(selectedFile);
      setPreview(URL.createObjectURL(selectedFile));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    
    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => data.append(key, value));
    if (file) data.append('image', file);

    const success = await updateHeroSettings(data);
    if (success) {
      setShowSuccessModal(true);
      setTimeout(() => setShowSuccessModal(false), 3000);
    }
    setIsSaving(false);
  };

  if (isLoading && !heroData) return <div className="text-white p-8 animate-pulse">Memuat pengaturan hero...</div>;

  return (
    <div className="flex flex-col gap-8 pb-12 relative">
      
      {/* SUCCESS MODAL */}
      <AnimatePresence>
        {showSuccessModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }}
              className="bg-[#181A1F] border border-[#DDF247]/20 p-8 rounded-sm max-w-sm w-full shadow-2xl flex flex-col items-center text-center gap-4 relative"
            >
              <button onClick={() => setShowSuccessModal(false)} className="absolute top-4 right-4 text-gray-500 hover:text-white"><X className="w-5 h-5" /></button>
              <div className="w-16 h-16 bg-[#DDF247]/10 rounded-full flex items-center justify-center text-[#DDF247] mb-2"><CheckCircle2 className="w-10 h-10" /></div>
              <h3 className="text-xl font-medium text-white">Hero Diperbarui</h3>
              <p className="text-gray-400 text-sm leading-relaxed">Tampilan utama website Anda telah berhasil diperbarui.</p>
              <Button onClick={() => setShowSuccessModal(false)} className="mt-2 w-full bg-[#DDF247] text-black hover:bg-[#c5db38] font-semibold py-6">Tutup</Button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <div>
        <h1 className="text-3xl font-semibold text-white mb-2">Pengaturan Hero Section</h1>
        <p className="text-gray-400 text-sm">Kelola teks utama dan gambar latar belakang landing page.</p>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 flex flex-col gap-6">
          <div className="bg-[#181A1F] border border-white/5 p-8 rounded-sm flex flex-col gap-6">
            <h3 className="flex items-center gap-2 text-lg font-medium text-white border-b border-white/5 pb-4">
              <Type className="w-5 h-5 text-[#DDF247]" /> Konten Teks
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col gap-2">
                <label className="text-sm text-gray-400">Label Atas (Kiri)</label>
                <input type="text" value={formData.subtitle} onChange={(e) => setFormData({...formData, subtitle: e.target.value})} className="w-full bg-[#121418] border border-white/10 text-white px-4 py-3 rounded-sm text-sm focus:border-[#DDF247]/50 outline-none" placeholder="ex: Arsitektur & Konstruksi" />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-sm text-gray-400">Lokasi (Kanan)</label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                  <input type="text" value={formData.location} onChange={(e) => setFormData({...formData, location: e.target.value})} className="w-full bg-[#121418] border border-white/10 text-white pl-10 pr-4 py-3 rounded-sm text-sm focus:border-[#DDF247]/50 outline-none" />
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm text-gray-400">Judul Utama (H1)</label>
              <textarea rows={2} value={formData.title} onChange={(e) => setFormData({...formData, title: e.target.value})} className="w-full bg-[#121418] border border-white/10 text-white px-4 py-3 rounded-sm text-sm focus:border-[#DDF247]/50 outline-none resize-none" />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm text-gray-400">Deskripsi Singkat</label>
              <textarea rows={4} value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})} className="w-full bg-[#121418] border border-white/10 text-white px-4 py-3 rounded-sm text-sm focus:border-[#DDF247]/50 outline-none resize-none" />
            </div>
          </div>

          <div className="bg-[#181A1F] border border-white/5 p-8 rounded-sm flex flex-col gap-6">
            <h3 className="flex items-center gap-2 text-lg font-medium text-white border-b border-white/5 pb-4">
              <LinkIcon className="w-5 h-5 text-[#DDF247]" /> Tombol Aksi (CTA)
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col gap-2">
                <label className="text-sm text-gray-400">Teks Tombol</label>
                <input type="text" value={formData.buttonText} onChange={(e) => setFormData({...formData, buttonText: e.target.value})} className="w-full bg-[#121418] border border-white/10 text-white px-4 py-3 rounded-sm text-sm focus:border-[#DDF247]/50 outline-none" />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-sm text-gray-400">Link Tujuan</label>
                <input type="text" value={formData.buttonLink} onChange={(e) => setFormData({...formData, buttonLink: e.target.value})} className="w-full bg-[#121418] border border-white/10 text-white px-4 py-3 rounded-sm text-sm focus:border-[#DDF247]/50 outline-none" />
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-6">
          <div className="bg-[#181A1F] border border-white/5 p-8 rounded-sm flex flex-col gap-6">
            <h3 className="text-lg font-medium text-white border-b border-white/5 pb-4">Background Hero</h3>
            <div className="relative aspect-[4/3] w-full bg-[#121418] rounded-sm overflow-hidden border border-white/10 group">
              {preview ? <Image src={preview} alt="Hero Preview" fill className="object-cover" unoptimized /> : <div className="flex items-center justify-center h-full text-gray-600 italic text-sm">Belum ada gambar</div>}
              <label className="absolute inset-0 flex items-center justify-center bg-black/60 opacity-0 group-hover:opacity-100 cursor-pointer transition-opacity">
                <Upload className="w-8 h-8 text-white" />
                <input type="file" className="hidden" onChange={handleFileChange} accept="image/*" />
              </label>
            </div>
            <p className="text-[10px] text-gray-500 uppercase tracking-widest text-center">Rekomendasi ukuran: 1920x1080px</p>
          </div>

          <Button type="submit" disabled={isSaving} className="w-full bg-[#DDF247] text-black hover:bg-[#c5db38] py-8 font-bold rounded-sm flex items-center justify-center gap-2">
            <Save className="w-5 h-5" /> {isSaving ? "Menyimpan..." : "Simpan Perubahan"}
          </Button>
        </div>
      </form>
    </div>
  );
}