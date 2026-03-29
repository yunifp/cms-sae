/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useEffect } from 'react';
import { Plus, Trash2, X, Upload } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTeam } from '@/hooks/useTeam';
import { motion, AnimatePresence } from 'framer-motion';

export default function ManageTeamPage() {
  const { teams, isLoading, fetchTeams, addMember, removeMember } = useTeam();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState("");
  const [formData, setFormData] = useState({
    name: "", role: "", description: "", instagram: "", facebook: "", twitter: ""
  });

  useEffect(() => { fetchTeams(); }, [fetchTeams]);

  const handleFileChange = (e: any) => {
    if (e.target.files[0]) {
      setFile(e.target.files[0]);
      setPreview(URL.createObjectURL(e.target.files[0]));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const data = new FormData();
    Object.entries(formData).forEach(([key, val]) => data.append(key, val));
    if (file) data.append('image', file);

    const success = await addMember(data);
    if (success) {
      setIsModalOpen(false);
      setFormData({ name: "", role: "", description: "", instagram: "", facebook: "", twitter: "" });
      setPreview(""); setFile(null);
      fetchTeams();
    }
  };

  return (
    <div className="flex flex-col gap-8 text-white">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-semibold">Kelola Tim</h1>
          <p className="text-gray-400 text-sm">Atur anggota tim yang tampil di landing page.</p>
        </div>
        <Button onClick={() => setIsModalOpen(true)} className="bg-[#DDF247] text-black hover:bg-[#c5db38]">
          <Plus className="w-5 h-5 mr-2" /> Tambah Anggota
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {teams.map((member) => (
          <div key={member.id} className="bg-[#181A1F] border border-white/5 p-6 rounded-sm relative group">
            <button 
              onClick={() => confirm('Hapus?') && removeMember(member.id).then(fetchTeams)}
              className="absolute top-4 right-4 text-gray-500 hover:text-red-500 transition-colors"
            >
              <Trash2 className="w-5 h-5" />
            </button>
            <img 
              src={`http://127.0.0.1:5001${member.image}`} 
              className="w-20 h-20 object-cover rounded-full mb-4 border-2 border-[#DDF247]/20" 
              alt={member.name} 
            />
            <h3 className="font-medium text-lg">{member.name}</h3>
            <p className="text-[#DDF247] text-xs uppercase mb-3">{member.role}</p>
            <p className="text-gray-400 text-sm italic line-clamp-2">"{member.description}"</p>
          </div>
        ))}
      </div>

      {/* Modal Form */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <motion.form 
              onSubmit={handleSubmit}
              initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
              className="bg-[#181A1F] border border-white/10 p-8 rounded-sm max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            >
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-medium">Tambah Anggota Tim</h3>
                <button type="button" onClick={() => setIsModalOpen(false)}><X className="w-6 h-6" /></button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col gap-4">
                   <div className="relative aspect-square bg-[#121418] border border-white/10 flex items-center justify-center overflow-hidden rounded-sm group">
                      {preview ? <img src={preview} className="w-full h-full object-cover" alt="Preview" /> : <Upload className="text-gray-600" />}
                      <label className="absolute inset-0 cursor-pointer flex items-center justify-center bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity">
                        <span className="text-xs">Pilih Foto</span>
                        <input type="file" className="hidden" onChange={handleFileChange} />
                      </label>
                   </div>
                </div>

                <div className="flex flex-col gap-4">
                  <input placeholder="Nama Lengkap" required className="bg-[#121418] border border-white/10 p-3 text-sm rounded-sm" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
                  <input placeholder="Jabatan (Role)" required className="bg-[#121418] border border-white/10 p-3 text-sm rounded-sm" value={formData.role} onChange={e => setFormData({...formData, role: e.target.value})} />
                  <textarea placeholder="Deskripsi Singkat" rows={4} className="bg-[#121418] border border-white/10 p-3 text-sm rounded-sm resize-none" value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} />
                </div>
              </div>
              
              <div className="grid grid-cols-3 gap-4 mt-6">
                <input placeholder="Instagram Link" className="bg-[#121418] border border-white/10 p-3 text-sm rounded-sm" value={formData.instagram} onChange={e => setFormData({...formData, instagram: e.target.value})} />
                <input placeholder="Facebook Link" className="bg-[#121418] border border-white/10 p-3 text-sm rounded-sm" value={formData.facebook} onChange={e => setFormData({...formData, facebook: e.target.value})} />
                <input placeholder="Twitter Link" className="bg-[#121418] border border-white/10 p-3 text-sm rounded-sm" value={formData.twitter} onChange={e => setFormData({...formData, twitter: e.target.value})} />
              </div>

              <Button type="submit" disabled={isLoading} className="w-full bg-[#DDF247] text-black mt-8 py-6 font-bold">
                {isLoading ? "Menyimpan..." : "Simpan Anggota"}
              </Button>
            </motion.form>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}