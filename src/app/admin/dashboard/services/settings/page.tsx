/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useEffect } from 'react';
import { Save, Type, CheckCircle2, X, LayoutGrid, Palette } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useServiceSettings } from '@/hooks/useServiceSettings';
import { motion, AnimatePresence } from 'framer-motion';

export default function ServiceSettingsPage() {
  const { settings, isLoading, fetchSettings, updateSettings } = useServiceSettings();
  const [isSaving, setIsSaving] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    stats: [] as any[]
  });

  useEffect(() => {
    fetchSettings();
  }, [fetchSettings]);

  useEffect(() => {
    if (settings) {
      setFormData({
        title: settings.title || "",
        description: settings.description || "",
        stats: settings.stats ? JSON.parse(settings.stats) : []
      });
    }
  }, [settings]);

  const handleStatChange = (index: number, field: string, value: any) => {
    const updatedStats = [...formData.stats];
    updatedStats[index][field] = value;
    setFormData({ ...formData, stats: updatedStats });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    
    const payload = {
      title: formData.title,
      description: formData.description,
      stats: JSON.stringify(formData.stats)
    };

    const success = await updateSettings(payload);
    if (success) {
      setShowSuccessModal(true);
      setTimeout(() => setShowSuccessModal(false), 3000);
    }
    setIsSaving(false);
  };

  if (isLoading && !settings) return <div className="text-white p-8 animate-pulse">Memuat pengaturan layanan...</div>;

  return (
    <div className="flex flex-col gap-8 pb-12 relative text-white">
      
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
              <h3 className="text-xl font-medium text-white">Berhasil Disimpan</h3>
              <p className="text-gray-400 text-sm leading-relaxed">Statistik dan Header layanan telah diperbarui.</p>
              <Button onClick={() => setShowSuccessModal(false)} className="mt-2 w-full bg-[#DDF247] text-black hover:bg-[#c5db38] font-semibold py-6">Tutup</Button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <div>
        <h1 className="text-3xl font-semibold text-white mb-2">Statistik & Header Layanan</h1>
        <p className="text-gray-400 text-sm">Kelola teks intro layanan dan 4 kotak angka statistik di bawahnya.</p>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* KOLOM KIRI: HEADER TEXT */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          <div className="bg-[#181A1F] border border-white/5 p-8 rounded-sm flex flex-col gap-6">
            <h3 className="flex items-center gap-2 text-lg font-medium text-white border-b border-white/5 pb-4">
              <Type className="w-5 h-5 text-[#DDF247]" /> Konten Header
            </h3>
            
            <div className="flex flex-col gap-2">
              <label className="text-sm text-gray-400">Judul Besar (H2)</label>
              <textarea 
                rows={2} 
                value={formData.title} 
                onChange={(e) => setFormData({...formData, title: e.target.value})} 
                className="w-full bg-[#121418] border border-white/10 text-white px-4 py-3 rounded-sm text-sm focus:border-[#DDF247]/50 outline-none resize-none" 
                placeholder="Gunakan \n untuk baris baru"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm text-gray-400">Deskripsi Pendek</label>
              <textarea 
                rows={4} 
                value={formData.description} 
                onChange={(e) => setFormData({...formData, description: e.target.value})} 
                className="w-full bg-[#121418] border border-white/10 text-white px-4 py-3 rounded-sm text-sm focus:border-[#DDF247]/50 outline-none resize-none" 
              />
            </div>
          </div>

          {/* BAGIAN STATISTIK (4 KOTAK) */}
          <div className="bg-[#181A1F] border border-white/5 p-8 rounded-sm flex flex-col gap-6">
            <h3 className="flex items-center gap-2 text-lg font-medium text-white border-b border-white/5 pb-4">
              <LayoutGrid className="w-5 h-5 text-[#DDF247]" /> Pengaturan 4 Kotak Statistik
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {formData.stats.map((stat, index) => (
                <div key={index} className="p-6 bg-[#121418] border border-white/5 rounded-sm flex flex-col gap-4">
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-bold text-[#DDF247] uppercase tracking-widest">Kotak {index + 1}</span>
                    <label className="flex items-center gap-2 cursor-pointer group">
                      <span className="text-xs text-gray-500 group-hover:text-gray-300">Tema Gelap</span>
                      <input 
                        type="checkbox" 
                        checked={stat.isDark} 
                        onChange={(e) => handleStatChange(index, 'isDark', e.target.checked)}
                        className="w-4 h-4 accent-[#DDF247]"
                      />
                    </label>
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="text-[10px] text-gray-500 uppercase">Nilai (Value)</label>
                    <input 
                      type="text" 
                      value={stat.value} 
                      onChange={(e) => handleStatChange(index, 'value', e.target.value)}
                      className="bg-[#181A1F] border border-white/10 text-white px-3 py-2 rounded-sm text-sm focus:border-[#DDF247]/50 outline-none"
                      placeholder="Contoh: 50+"
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="text-[10px] text-gray-500 uppercase">Label (Gunakan \n untuk baris baru)</label>
                    <textarea 
                      rows={2}
                      value={stat.label} 
                      onChange={(e) => handleStatChange(index, 'label', e.target.value)}
                      className="bg-[#181A1F] border border-white/10 text-white px-3 py-2 rounded-sm text-sm focus:border-[#DDF247]/50 outline-none resize-none"
                      placeholder="Contoh: Proyek\nSelesai"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* KOLOM KANAN: PREVIEW INFO & BUTTON */}
        <div className="flex flex-col gap-6">
          <div className="bg-[#181A1F] border border-white/5 p-8 rounded-sm flex flex-col gap-6">
            <h3 className="flex items-center gap-2 text-lg font-medium text-white border-b border-white/5 pb-4">
              <Palette className="w-5 h-5 text-[#DDF247]" /> Informasi Visual
            </h3>
            <div className="space-y-4 text-sm text-gray-400">
              <p>• <strong className="text-white">Tema Gelap Aktif:</strong> Kotak akan berwarna Hitam (#181A1F) dengan teks Hijau.</p>
              <p>• <strong className="text-white">Tema Gelap Mati:</strong> Kotak akan berwarna Abu-abu (#98A2A8) dengan teks Putih.</p>
              <p>• <strong className="text-white">Break Line:</strong> Ketik <code className="text-[#DDF247]">\n</code> di dalam label untuk memindah teks ke baris baru di website.</p>
            </div>
          </div>

          <Button 
            type="submit" 
            disabled={isSaving} 
            className="w-full bg-[#DDF247] text-black hover:bg-[#c5db38] py-8 font-bold rounded-sm flex items-center justify-center gap-2"
          >
            <Save className="w-5 h-5" /> {isSaving ? "Menyimpan..." : "Simpan Statistik"}
          </Button>
        </div>
      </form>
    </div>
  );
}