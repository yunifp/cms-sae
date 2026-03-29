/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, HelpCircle, X, Save } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useFaqs } from '@/hooks/useFaqs';
import { motion, AnimatePresence } from 'framer-motion';

export default function ManageFaqPage() {
  const { faqs, isLoading, fetchFaqs, createFaq, updateFaq, deleteFaq } = useFaqs();
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedFaq, setSelectedFaq] = useState<any>(null);
  const [formData, setFormData] = useState({ question: "", answer: "" });

  useEffect(() => { fetchFaqs(); }, [fetchFaqs]);

  const openModal = (faq: any = null) => {
    if (faq) {
      setSelectedFaq(faq);
      setFormData({ question: faq.question, answer: faq.answer });
    } else {
      setSelectedFaq(null);
      setFormData({ question: "", answer: "" });
    }
    setIsModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    let success = false;
    if (selectedFaq) {
      success = await updateFaq(selectedFaq.id, formData);
    } else {
      success = await createFaq(formData);
    }

    if (success) {
      setIsModalOpen(false);
      fetchFaqs();
    }
  };

  const handleDelete = async (id: number) => {
    if (confirm("Hapus pertanyaan ini?")) {
      const success = await deleteFaq(id);
      if (success) fetchFaqs();
    }
  };

  return (
    <div className="flex flex-col gap-8 pb-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-semibold text-white mb-2">Kelola FAQ</h1>
          <p className="text-gray-400 text-sm">Tambahkan pertanyaan yang sering diajukan klien.</p>
        </div>
        <Button onClick={() => openModal()} className="bg-[#DDF247] text-black hover:bg-[#c5db38] rounded-sm px-6 py-6 font-bold flex items-center gap-2">
          <Plus className="w-5 h-5" /> Tambah FAQ
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {faqs.map((faq, index) => (
          <motion.div 
            key={faq.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className="bg-[#181A1F] border border-white/5 p-6 rounded-sm flex flex-col md:flex-row md:items-center justify-between gap-6 group hover:border-white/10"
          >
            <div className="flex gap-4">
              <div className="w-10 h-10 rounded-full bg-[#DDF247]/10 flex items-center justify-center shrink-0">
                <HelpCircle className="w-5 h-5 text-[#DDF247]" />
              </div>
              <div>
                <h3 className="text-white font-medium mb-1">{faq.question}</h3>
                <p className="text-gray-400 text-sm line-clamp-2">{faq.answer}</p>
              </div>
            </div>
            <div className="flex gap-2 shrink-0">
              <button onClick={() => openModal(faq)} className="p-2 text-gray-400 hover:text-[#DDF247] bg-white/5 rounded-sm transition-colors">
                <Edit className="w-4 h-4" />
              </button>
              <button onClick={() => handleDelete(faq.id)} className="p-2 text-gray-400 hover:text-red-400 bg-white/5 rounded-sm transition-colors">
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* MODAL TAMBAH/EDIT */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-[#181A1F] border border-white/10 w-full max-w-xl rounded-sm overflow-hidden flex flex-col shadow-2xl"
            >
              <div className="flex items-center justify-between p-6 border-b border-white/5">
                <h3 className="text-xl font-medium text-white">{selectedFaq ? "Edit FAQ" : "Tambah FAQ Baru"}</h3>
                <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-white transition-colors">
                  <X className="w-5 h-5" />
                </button>
              </div>
              <form onSubmit={handleSubmit} className="p-6 flex flex-col gap-6">
                <div className="flex flex-col gap-2">
                  <label className="text-sm text-gray-400">Pertanyaan</label>
                  <input 
                    type="text" 
                    required
                    value={formData.question}
                    onChange={(e) => setFormData({...formData, question: e.target.value})}
                    className="w-full bg-[#121418] border border-white/10 text-white px-4 py-3 rounded-sm text-sm focus:border-[#DDF247]/50 outline-none"
                    placeholder="Contoh: Apakah ada biaya survei?"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-sm text-gray-400">Jawaban</label>
                  <textarea 
                    rows={5}
                    required
                    value={formData.answer}
                    onChange={(e) => setFormData({...formData, answer: e.target.value})}
                    className="w-full bg-[#121418] border border-white/10 text-white px-4 py-3 rounded-sm text-sm focus:border-[#DDF247]/50 outline-none resize-none"
                    placeholder="Berikan jawaban lengkap di sini..."
                  />
                </div>
                <div className="flex gap-3 mt-2">
                  <Button type="button" onClick={() => setIsModalOpen(false)} variant="outline" className="flex-1 border-white/10 text-gray-300 hover:bg-white/5 rounded-sm h-12">
                    Batal
                  </Button>
                  <Button type="submit" disabled={isLoading} className="flex-1 bg-[#DDF247] text-black hover:bg-[#c5db38] rounded-sm h-12 font-bold">
                    <Save className="w-4 h-4 mr-2" /> {selectedFaq ? "Simpan Perubahan" : "Tambah FAQ"}
                  </Button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}