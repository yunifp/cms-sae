/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useEffect } from 'react';
import { Save, Upload, BarChart3, Users, Plus, Trash2, CheckCircle2, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAdvantageSettings } from '@/hooks/useAdvantageSettings';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

export default function AdvantageSettingsPage() {
  const { advantageData, isLoading, fetchAdvantageSettings, updateAdvantageSettings } = useAdvantageSettings();
  const [isSaving, setIsSaving] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const IMAGE_BASE_URL = 'httpa://api.saeboemi.com/';

  // 1. Inisialisasi state dengan nilai default yang aman
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    totalClients: 0,
    skills: [] as any[]
  });

  const [preview, setPreview] = useState("");
  const [file, setFile] = useState<File | null>(null);

  useEffect(() => {
    fetchAdvantageSettings();
  }, [fetchAdvantageSettings]);

  useEffect(() => {
    if (advantageData) {
      setFormData({
        title: advantageData.title || "",
        description: advantageData.description || "",
        totalClients: advantageData.totalClients || 0,
        skills: advantageData.skills ? JSON.parse(advantageData.skills) : []
      });
      if (advantageData.imageUrl) setPreview(`${IMAGE_BASE_URL}${advantageData.imageUrl}`);
    }
  }, [advantageData]);

  // 2. Perbaikan logika handleSkillChange untuk menghindari NaN
  const handleSkillChange = (index: number, field: string, value: any) => {
    const updatedSkills = [...formData.skills];
    if (field === 'value') {
      const numValue = parseInt(value);
      updatedSkills[index][field] = isNaN(numValue) ? 0 : numValue;
    } else {
      updatedSkills[index][field] = value;
    }
    setFormData({ ...formData, skills: updatedSkills });
  };

  const addSkill = () => {
    setFormData({ ...formData, skills: [...formData.skills, { name: "", value: 0 }] });
  };

  const removeSkill = (index: number) => {
    setFormData({ ...formData, skills: formData.skills.filter((_, i) => i !== index) });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    
    const data = new FormData();
    data.append('title', formData.title);
    data.append('description', formData.description);
    data.append('totalClients', formData.totalClients.toString());
    data.append('skills', JSON.stringify(formData.skills));
    if (file) data.append('image', file);

    const success = await updateAdvantageSettings(data);
    if (success) {
      setShowSuccessModal(true);
      setTimeout(() => setShowSuccessModal(false), 3000);
    }
    setIsSaving(false);
  };

  if (isLoading && !advantageData) return <div className="text-white p-8 animate-pulse">Memuat...</div>;

  return (
    <div className="flex flex-col gap-8 pb-12 relative text-white">
      
      {/* MODAL SUKSES */}
      <AnimatePresence>
        {showSuccessModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} className="bg-[#181A1F] border border-[#DDF247]/20 p-8 rounded-sm max-w-sm w-full shadow-2xl flex flex-col items-center text-center gap-4 relative">
              <button onClick={() => setShowSuccessModal(false)} className="absolute top-4 right-4 text-gray-500 hover:text-white"><X className="w-5 h-5" /></button>
              <div className="w-16 h-16 bg-[#DDF247]/10 rounded-full flex items-center justify-center text-[#DDF247] mb-2"><CheckCircle2 className="w-10 h-10" /></div>
              <h3 className="text-xl font-medium text-white">Berhasil Disimpan</h3>
              <p className="text-gray-400 text-sm leading-relaxed">Data keunggulan Saeboemi telah diperbarui.</p>
              <Button onClick={() => setShowSuccessModal(false)} className="mt-2 w-full bg-[#DDF247] text-black hover:bg-[#c5db38] font-semibold py-6">Tutup</Button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <div>
        <h1 className="text-3xl font-semibold text-white mb-2">Kelola Keunggulan</h1>
        <p className="text-gray-400 text-sm">Sesuaikan angka statistik dan bar keahlian tim.</p>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 flex flex-col gap-6">
          
          {/* BAGIAN SKILLS */}
          <div className="bg-[#181A1F] border border-white/5 p-8 rounded-sm flex flex-col gap-6">
            <h3 className="flex items-center gap-2 text-lg font-medium text-white border-b border-white/5 pb-4">
              <BarChart3 className="w-5 h-5 text-[#DDF247]" /> Persentase Keahlian
            </h3>
            
            {formData.skills.map((skill: any, index: number) => (
              <div key={index} className="flex flex-col md:flex-row gap-4 items-end bg-[#121418] p-4 rounded-sm border border-white/5">
                <div className="flex-1 flex flex-col gap-2 w-full">
                  <label className="text-xs text-gray-500">Nama Keahlian</label>
                  <input 
                    type="text" 
                    value={skill.name || ""} 
                    onChange={(e) => handleSkillChange(index, 'name', e.target.value)} 
                    className="w-full bg-[#181A1F] border border-white/10 text-white px-4 py-2 rounded-sm text-sm focus:border-[#DDF247]/50 outline-none" 
                    placeholder="Contoh: Desain Interior" 
                  />
                </div>
                <div className="w-full md:w-32 flex flex-col gap-2">
                  <label className="text-xs text-gray-500">Nilai (%)</label>
                  <input 
                    type="number" 
                    // 3. Tambahkan fallback agar tidak NaN
                    value={skill.value ?? 0} 
                    onChange={(e) => handleSkillChange(index, 'value', e.target.value)} 
                    className="w-full bg-[#181A1F] border border-white/10 text-white px-4 py-2 rounded-sm text-sm focus:border-[#DDF247]/50 outline-none" 
                  />
                </div>
                <button type="button" onClick={() => removeSkill(index)} className="p-2 text-red-400 hover:bg-red-400/10 rounded-sm transition-colors mb-0.5">
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            ))}
            <Button type="button" onClick={addSkill} variant="outline" className="border-dashed border-white/10 text-gray-400 hover:text-white hover:bg-white/5 py-6">
              <Plus className="w-4 h-4 mr-2" /> Tambah Keahlian
            </Button>
          </div>

          {/* TEKS UTAMA */}
          <div className="bg-[#181A1F] border border-white/5 p-8 rounded-sm flex flex-col gap-6">
            <h3 className="text-lg font-medium text-white border-b border-white/5 pb-4">Teks Konten</h3>
            <div className="flex flex-col gap-2">
              <label className="text-sm text-gray-400">Judul</label>
              <textarea rows={2} value={formData.title} onChange={(e) => setFormData({...formData, title: e.target.value})} className="w-full bg-[#121418] border border-white/10 text-white px-4 py-3 rounded-sm text-sm focus:border-[#DDF247]/50 outline-none resize-none" />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-sm text-gray-400">Deskripsi</label>
              <textarea rows={4} value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})} className="w-full bg-[#121418] border border-white/10 text-white px-4 py-3 rounded-sm text-sm focus:border-[#DDF247]/50 outline-none resize-none" />
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-6">
          {/* STATISTIK KLIEN */}
          <div className="bg-[#181A1F] border border-white/5 p-8 rounded-sm flex flex-col gap-6">
            <h3 className="flex items-center gap-2 text-lg font-medium text-white border-b border-white/5 pb-4">
              <Users className="w-5 h-5 text-[#DDF247]" /> Statistik Klien
            </h3>
            <div className="flex flex-col gap-2">
              <label className="text-sm text-gray-400">Total Klien Puas</label>
              <input 
                type="number" 
                // 4. Tambahkan fallback agar tidak NaN
                value={formData.totalClients ?? 0} 
                onChange={(e) => {
                  const val = parseInt(e.target.value);
                  setFormData({ ...formData, totalClients: isNaN(val) ? 0 : val });
                }} 
                className="w-full bg-[#121418] border border-white/10 text-white px-4 py-3 rounded-sm text-sm outline-none focus:border-[#DDF247]/50" 
              />
            </div>
          </div>

          {/* GAMBAR */}
          <div className="bg-[#181A1F] border border-white/5 p-8 rounded-sm flex flex-col gap-6">
            <h3 className="text-lg font-medium text-white border-b border-white/5 pb-4">Gambar Pendukung</h3>
            <div className="relative aspect-square w-full bg-[#121418] rounded-sm overflow-hidden border border-white/10 group">
              {preview ? <Image src={preview} alt="Advantage" fill className="object-cover" unoptimized /> : <div className="flex items-center justify-center h-full text-gray-600 italic text-sm">Belum ada gambar</div>}
              <label className="absolute inset-0 flex items-center justify-center bg-black/60 opacity-0 group-hover:opacity-100 cursor-pointer transition-opacity">
                <Upload className="w-8 h-8 text-white" />
                <input type="file" className="hidden" onChange={(e: any) => {
                  if (e.target.files[0]) {
                    setFile(e.target.files[0]);
                    setPreview(URL.createObjectURL(e.target.files[0]));
                  }
                }} />
              </label>
            </div>
          </div>

          <Button type="submit" disabled={isSaving} className="w-full bg-[#DDF247] text-black hover:bg-[#c5db38] py-8 font-bold rounded-sm flex items-center justify-center gap-2 transition-all">
            <Save className="w-5 h-5" /> {isSaving ? "Menyimpan..." : "Simpan Perubahan"}
          </Button>
        </div>
      </form>
    </div>
  );
}