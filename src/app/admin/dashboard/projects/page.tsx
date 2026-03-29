/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Search, Edit, Trash2, Eye, X, AlertTriangle, ImageIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useProjects } from '@/hooks/useProjects';

export default function ProjectsManagePage() {
  const { projects, isLoading, fetchProjects, deleteProject } = useProjects();
  const IMAGE_BASE_URL = 'httpa://api.saeboemi.com/';

  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [previewProject, setPreviewProject] = useState<any | null>(null);
  const [projectToDelete, setProjectToDelete] = useState<any | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedSearch(searchTerm), 500);
    return () => clearTimeout(timer);
  }, [searchTerm]);

  useEffect(() => {
    fetchProjects(debouncedSearch, statusFilter);
  }, [debouncedSearch, statusFilter, fetchProjects]);

  const handleDelete = async () => {
    if (!projectToDelete) return;
    setIsDeleting(true);
    const success = await deleteProject(projectToDelete.id);
    if (success) {
      setProjectToDelete(null);
      fetchProjects(debouncedSearch, statusFilter);
    }
    setIsDeleting(false);
  };

  const getThumbnailUrl = (images: { type: string; url: string }[]) => {
    const thumb = images?.find((img) => img.type === 'thumbnail');
    return thumb ? `${IMAGE_BASE_URL}${thumb.url}` : null;
  };

  return (
    <div className="flex flex-col gap-8 font-sans relative">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-semibold text-white mb-2">Kelola Proyek</h1>
          <p className="text-gray-400 text-sm">Atur dan pantau daftar portofolio proyek Saeboemi Studio.</p>
        </div>
        <Button asChild className="bg-[#DDF247] text-black hover:bg-[#c5db38] rounded-sm px-6 py-5 font-medium flex items-center gap-2 w-fit">
          <Link href="/admin/dashboard/projects/new">
            <Plus className="w-5 h-5" /> Tambah Proyek
          </Link>
        </Button>
      </div>

      <div className="bg-[#181A1F] border border-white/5 p-4 rounded-sm flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative w-full sm:w-96">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-4 w-4 text-gray-500" />
          </div>
          <input 
            type="text" 
            placeholder="Cari nama proyek atau klien..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-[#121418] border border-white/10 text-white pl-10 pr-4 py-2.5 focus:outline-none focus:border-[#DDF247]/50 transition-colors rounded-sm text-sm"
          />
        </div>
        <select 
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="bg-[#121418] border border-white/10 text-white px-4 py-2.5 rounded-sm text-sm focus:outline-none focus:border-[#DDF247]/50 appearance-none"
        >
          <option value="all">Semua Status</option>
          <option value="selesai">Selesai</option>
          <option value="proses">Proses</option>
          <option value="perencanaan">Perencanaan</option>
        </select>
      </div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-[#181A1F] border border-white/5 rounded-sm overflow-x-auto">
        <table className="w-full text-left text-sm text-gray-400">
          <thead className="text-xs text-gray-500 uppercase bg-[#121418] border-b border-white/5">
            <tr>
              <th className="px-6 py-4 font-medium">Nama Proyek</th>
              <th className="px-6 py-4 font-medium">Klien</th>
              <th className="px-6 py-4 font-medium">Tahun</th>
              <th className="px-6 py-4 font-medium">Status</th>
              <th className="px-6 py-4 font-medium text-right">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {isLoading && projects.length === 0 ? (
              <tr><td colSpan={5} className="p-8 text-center">Memuat data...</td></tr>
            ) : projects.length === 0 ? (
              <tr><td colSpan={5} className="p-8 text-center">Tidak ada proyek ditemukan.</td></tr>
            ) : (
              projects.map((p) => (
                <tr key={p.id} className="hover:bg-white/[0.02]">
                  <td className="px-6 py-4 font-medium text-white">{p.title}</td>
                  <td className="px-6 py-4">{p.client}</td>
                  <td className="px-6 py-4">{p.year}</td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 text-xs font-medium rounded-full capitalize ${
                      p.status === 'selesai' ? 'bg-green-500/10 text-green-400 border border-green-500/20' :
                      p.status === 'proses' ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20' :
                      'bg-yellow-500/10 text-yellow-400 border border-yellow-500/20'
                    }`}>
                      {p.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right flex items-center justify-end gap-2">
                    <button onClick={() => setPreviewProject(p)} className="p-2 text-gray-400 hover:text-white rounded-sm hover:bg-white/5"><Eye className="w-4 h-4" /></button>
                    <Link href={`/admin/dashboard/projects/${p.id}/edit`} className="p-2 text-gray-400 hover:text-[#DDF247] rounded-sm hover:bg-white/5"><Edit className="w-4 h-4" /></Link>
                    <button onClick={() => setProjectToDelete(p)} className="p-2 text-gray-400 hover:text-red-400 rounded-sm hover:bg-red-400/10"><Trash2 className="w-4 h-4" /></button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </motion.div>

      <AnimatePresence>
        {previewProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }}
              className="bg-[#181A1F] border border-white/10 w-full max-w-2xl rounded-sm overflow-hidden flex flex-col"
            >
              <div className="flex items-center justify-between p-6 border-b border-white/5">
                <h3 className="text-xl font-medium text-white">Preview Proyek</h3>
                <button onClick={() => setPreviewProject(null)} className="text-gray-400 hover:text-white"><X className="w-5 h-5" /></button>
              </div>
              <div className="p-6 flex flex-col gap-6">
                
                <div className="w-full h-64 bg-[#121418] rounded-sm border border-white/5 overflow-hidden flex items-center justify-center">
                  {getThumbnailUrl(previewProject.images) ? (
                    <img 
                      src={getThumbnailUrl(previewProject.images)!} 
                      alt={previewProject.title} 
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="flex flex-col items-center gap-2 text-gray-600">
                      <ImageIcon className="w-12 h-12" />
                      <p className="text-xs uppercase tracking-widest">Tidak ada gambar</p>
                    </div>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div><p className="text-gray-500 mb-1">Nama Proyek</p><p className="text-white font-medium">{previewProject.title}</p></div>
                  <div><p className="text-gray-500 mb-1">Klien</p><p className="text-white font-medium">{previewProject.client}</p></div>
                  <div><p className="text-gray-500 mb-1">Lokasi</p><p className="text-white font-medium">{previewProject.location}</p></div>
                  <div><p className="text-gray-500 mb-1">Tahun & Status</p><p className="text-white font-medium">{previewProject.year} - <span className="text-[#DDF247] uppercase">{previewProject.status}</span></p></div>
                </div>
                <div><p className="text-gray-500 mb-1 text-sm">Ringkasan Deskripsi</p><p className="text-gray-300 text-sm leading-relaxed">{previewProject.description}</p></div>
              </div>
              <div className="p-6 border-t border-white/5 bg-[#121418] flex justify-end">
                <Button onClick={() => setPreviewProject(null)} variant="outline" className="border-white/10 text-gray-300 hover:bg-white/5 rounded-sm">Tutup Preview</Button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {projectToDelete && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="bg-[#181A1F] border border-red-500/20 w-full max-w-md rounded-sm overflow-hidden flex flex-col shadow-2xl">
              <div className="p-8 flex flex-col items-center text-center gap-4">
                <div className="w-16 h-16 rounded-full bg-red-500/10 flex items-center justify-center text-red-500 mb-2">
                  <AlertTriangle className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-medium text-white">Hapus Proyek?</h3>
                <p className="text-gray-400 text-sm">Anda yakin ingin menghapus <span className="text-white">&quot;{projectToDelete.title}&quot;</span>?</p>
              </div>
              <div className="p-6 border-t border-white/5 bg-[#121418] flex gap-4">
                <Button onClick={() => setProjectToDelete(null)} disabled={isDeleting} variant="outline" className="flex-1 border-white/10 text-gray-300 rounded-sm">Batal</Button>
                <Button onClick={handleDelete} disabled={isDeleting} className="flex-1 bg-red-500 text-white rounded-sm">{isDeleting ? "Menghapus..." : "Ya, Hapus"}</Button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}