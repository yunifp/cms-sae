"use client";

import { useState, useEffect } from 'react';
import { Plus, Trash2, Star, User, Save, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTestimonials } from '@/hooks/useTestimonials';
import { motion, AnimatePresence } from 'framer-motion';

export default function TestimonialsAdmin() {
  const { testimonials, fetchTestimonials, addTestimonial, deleteTestimonial } = useTestimonials();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({ name: "", title: "", review: "", rating: 5 });

  useEffect(() => { fetchTestimonials(); }, [fetchTestimonials]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const success = await addTestimonial(formData);
    if (success) {
      setIsModalOpen(false);
      setFormData({ name: "", title: "", review: "", rating: 5 });
      fetchTestimonials();
    }
  };

  const handleDelete = async (id: number) => {
    if (confirm("Hapus testimoni ini?")) {
      const success = await deleteTestimonial(id);
      if (success) fetchTestimonials();
    }
  };

  return (
    <div className="flex flex-col gap-8 text-white">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-semibold">Kelola Testimoni</h1>
          <p className="text-gray-400 text-sm">Daftar feedback dari klien Saeboemi Studio.</p>
        </div>
        <Button onClick={() => setIsModalOpen(true)} className="bg-[#DDF247] text-black hover:bg-[#c5db38]">
          <Plus className="w-5 h-5 mr-2" /> Tambah Testimoni
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {testimonials.map((t) => (
          <div key={t.id} className="bg-[#181A1F] border border-white/5 p-6 flex flex-col gap-4 relative group">
            <button onClick={() => handleDelete(t.id)} className="absolute top-4 right-4 text-gray-600 hover:text-red-500 transition-colors">
              <Trash2 className="w-5 h-5" />
            </button>
            <div className="flex gap-1">
              {[...Array(t.rating)].map((_, i) => <Star key={i} className="w-3 h-3 fill-[#DDF247] text-[#DDF247]" />)}
            </div>
            <h3 className="font-medium text-lg leading-tight">{t.title}</h3>
            <p className="text-gray-400 text-sm line-clamp-4 italic">{t.review}</p>
            <p className="text-[#DDF247] text-sm font-bold">— {t.name}</p>
          </div>
        ))}
      </div>

      {/* MODAL TAMBAH */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <motion.form onSubmit={handleSubmit} initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="bg-[#181A1F] border border-white/10 p-8 rounded-sm max-w-lg w-full flex flex-col gap-6 shadow-2xl">
              <div className="flex justify-between items-center border-b border-white/5 pb-4">
                <h3 className="text-xl font-medium">Tambah Testimoni Baru</h3>
                <button type="button" onClick={() => setIsModalOpen(false)}><X className="w-6 h-6" /></button>
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-xs text-gray-500 uppercase">Nama Klien</label>
                <div className="relative"><User className="absolute left-3 top-3 w-4 h-4 text-gray-500" />
                  <input required value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className="w-full bg-[#121418] border border-white/10 pl-10 pr-4 py-3 text-sm focus:border-[#DDF247]/50 outline-none" />
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-xs text-gray-500 uppercase">Judul Testimoni</label>
                <input required value={formData.title} onChange={(e) => setFormData({...formData, title: e.target.value})} className="w-full bg-[#121418] border border-white/10 px-4 py-3 text-sm focus:border-[#DDF247]/50 outline-none" placeholder="Contoh: Kualitas sangat baik" />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-xs text-gray-500 uppercase">Review</label>
                <textarea required rows={4} value={formData.review} onChange={(e) => setFormData({...formData, review: e.target.value})} className="w-full bg-[#121418] border border-white/10 px-4 py-3 text-sm focus:border-[#DDF247]/50 outline-none resize-none" />
              </div>
              <Button type="submit" className="w-full bg-[#DDF247] text-black py-7 font-bold"><Save className="w-5 h-5 mr-2" /> Simpan Testimoni</Button>
            </motion.form>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}