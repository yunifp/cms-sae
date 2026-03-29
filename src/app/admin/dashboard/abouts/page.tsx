/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { useState, useEffect } from 'react';
import { Save, Upload, Info, Star, MessageSquare, CheckCircle2, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAboutSettings } from '@/hooks/useAboutSettings';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

export default function AboutSettingsPage() {
  const { aboutData, isLoading, fetchAboutSettings, updateAboutSettings } = useAboutSettings();
  const [isSaving, setIsSaving] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false); // State untuk modal
  
  const IMAGE_BASE_URL = 'httpa://api.saeboemi.com/';

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    rating: "",
    missions: ["", "", ""]
  });

  const [previews, setPreviews] = useState({ top: "", bottom: "" });
  const [files, setFiles] = useState<{ top: File | null, bottom: File | null }>({ top: null, bottom: null });

  useEffect(() => {
    fetchAboutSettings();
  }, [fetchAboutSettings]);

  useEffect(() => {
    if (aboutData) {
      setFormData({
        title: aboutData.title,
        description: aboutData.description,
        rating: aboutData.rating,
        missions: JSON.parse(aboutData.missions)
      });
      setPreviews({
        top: aboutData.imageTop ? `${IMAGE_BASE_URL}${aboutData.imageTop}` : "",
        bottom: aboutData.imageBottom ? `${IMAGE_BASE_URL}${aboutData.imageBottom}` : ""
      });
    }
  }, [aboutData]);

  const handleMissionChange = (val: string, index: number) => {
    const newMissions = [...formData.missions];
    newMissions[index] = val;
    setFormData({ ...formData, missions: newMissions });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, type: 'top' | 'bottom') => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setFiles({ ...files, [type]: file });
      setPreviews({ ...previews, [type]: URL.createObjectURL(file) });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    
    const data = new FormData();
    data.append('title', formData.title);
    data.append('description', formData.description);
    data.append('rating', formData.rating);
    data.append('missions', JSON.stringify(formData.missions));
    
    if (files.top) data.append('imageTop', files.top);
    if (files.bottom) data.append('imageBottom', files.bottom);

    const success = await updateAboutSettings(data);
    if (success) {
      setShowSuccessModal(true);
      // Sembunyikan modal otomatis setelah 3 detik jika user tidak menutupnya
      setTimeout(() => setShowSuccessModal(false), 3000);
    }
    setIsSaving(false);
  };

  if (isLoading && !aboutData) return <div className="text-white p-8 animate-pulse">Memuat pengaturan...</div>;

  return (
    <div className="flex flex-col gap-8 pb-12 relative">
      
      {/* SUCCESS MODAL */}
      <AnimatePresence>
        {showSuccessModal && (
          <div className="fixed inset-0 z-[99] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="bg-[#181A1F] border border-[#DDF247]/20 p-8 rounded-sm max-w-sm w-full shadow-2xl flex flex-col items-center text-center gap-4 relative"
            >
              <button 
                onClick={() => setShowSuccessModal(false)}
                className="absolute top-4 right-4 text-gray-500 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
              
              <div className="w-16 h-16 bg-[#DDF247]/10 rounded-full flex items-center justify-center text-[#DDF247] mb-2">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              
              <h3 className="text-xl font-medium text-white">Berhasil Disimpan</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                Pengaturan halaman "Tentang Kami" telah diperbarui dan langsung diterapkan di website.
              </p>
              
              <Button 
                onClick={() => setShowSuccessModal(false)}
                className="mt-2 w-full bg-[#DDF247] text-black hover:bg-[#c5db38] font-semibold py-6"
              >
                Tutup
              </Button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <div>
        <h1 className="text-3xl font-semibold text-white mb-2">Pengaturan Halaman Tentang</h1>
        <p className="text-gray-400 text-sm">Sesuaikan konten narasi, misi, dan gambar perusahaan.</p>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 flex flex-col gap-6">
          <div className="bg-[#181A1F] border border-white/5 p-8 rounded-sm flex flex-col gap-6">
            <h3 className="flex items-center gap-2 text-lg font-medium text-white border-b border-white/5 pb-4">
              <Info className="w-5 h-5 text-[#DDF247]" /> Konten Utama
            </h3>
            
            <div className="flex flex-col gap-2">
              <label className="text-sm text-gray-400">Judul Besar</label>
              <input 
                type="text" 
                value={formData.title}
                onChange={(e) => setFormData({...formData, title: e.target.value})}
                className="w-full bg-[#121418] border border-white/10 text-white px-4 py-3 rounded-sm text-sm focus:border-[#DDF247]/50 outline-none transition-colors"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm text-gray-400">Deskripsi / Narasi</label>
              <textarea 
                rows={6}
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                className="w-full bg-[#121418] border border-white/10 text-white px-4 py-3 rounded-sm text-sm focus:border-[#DDF247]/50 outline-none resize-none transition-colors"
              />
            </div>
          </div>

          <div className="bg-[#181A1F] border border-white/5 p-8 rounded-sm flex flex-col gap-6">
            <h3 className="flex items-center gap-2 text-lg font-medium text-white border-b border-white/5 pb-4">
              <MessageSquare className="w-5 h-5 text-[#DDF247]" /> Misi Perusahaan
            </h3>
            {formData.missions.map((mission, idx) => (
              <div key={idx} className="flex flex-col gap-2">
                <label className="text-xs text-gray-500 uppercase tracking-wider">Misi {idx + 1}</label>
                <textarea 
                  rows={2}
                  value={mission}
                  onChange={(e) => handleMissionChange(e.target.value, idx)}
                  className="w-full bg-[#121418] border border-white/10 text-white px-4 py-3 rounded-sm text-sm focus:border-[#DDF247]/50 outline-none resize-none transition-colors"
                />
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-6">
          <div className="bg-[#181A1F] border border-white/5 p-8 rounded-sm flex flex-col gap-6">
            <h3 className="flex items-center gap-2 text-lg font-medium text-white border-b border-white/5 pb-4">
              <Star className="w-5 h-5 text-[#DDF247]" /> Statistik
            </h3>
            <div className="flex flex-col gap-2">
              <label className="text-sm text-gray-400">Rating Kepuasan (ex: 4.8)</label>
              <input 
                type="text" 
                value={formData.rating}
                onChange={(e) => setFormData({...formData, rating: e.target.value})}
                className="w-full bg-[#121418] border border-white/10 text-white px-4 py-3 rounded-sm text-sm outline-none focus:border-[#DDF247]/50 transition-colors"
              />
            </div>
          </div>

          <div className="bg-[#181A1F] border border-white/5 p-8 rounded-sm flex flex-col gap-6">
            <h3 className="text-lg font-medium text-white border-b border-white/5 pb-4">Media Visual</h3>
            
            <div className="flex flex-col gap-4">
              <label className="text-sm text-gray-400">Gambar Atas (300px height)</label>
              <div className="relative h-32 w-full bg-[#121418] rounded-sm overflow-hidden border border-white/10 group">
                {previews.top && <Image src={previews.top} alt="Top" fill className="object-cover" unoptimized />}
                <label className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 group-hover:opacity-100 cursor-pointer transition-opacity">
                  <Upload className="w-6 h-6 text-white" />
                  <input type="file" className="hidden" onChange={(e) => handleFileChange(e, 'top')} />
                </label>
              </div>

              <label className="text-sm text-gray-400 mt-2">Gambar Bawah</label>
              <div className="relative h-32 w-full bg-[#121418] rounded-sm overflow-hidden border border-white/10 group">
                {previews.bottom && <Image src={previews.bottom} alt="Bottom" fill className="object-cover" unoptimized />}
                <label className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 group-hover:opacity-100 cursor-pointer transition-opacity">
                  <Upload className="w-6 h-6 text-white" />
                  <input type="file" className="hidden" onChange={(e) => handleFileChange(e, 'bottom')} />
                </label>
              </div>
            </div>
          </div>

          <Button 
            type="submit"
            onClick={handleSubmit}
            disabled={isSaving}
            className="w-full bg-[#DDF247] text-black hover:bg-[#c5db38] py-7 font-bold rounded-sm flex items-center justify-center gap-2"
          >
            <Save className="w-5 h-5" />
            {isSaving ? "Menyimpan..." : "Simpan Perubahan"}
          </Button>
        </div>
      </form>
    </div>
  );
}