/* eslint-disable react/no-unescaped-entities */
"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Search, Edit, Trash2, Eye, X, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

// Mock data proyek
const dummyProjects = [
  { id: 1, title: "Pembangunan Hunian Tropis Modern", client: "Keluarga Pratama", year: "2023", status: "Selesai", desc: "Proyek hunian eksklusif dengan pencahayaan alami maksimal dan tata ruang terbuka." , location: "Jakarta"  },
  { id: 2, title: "Hunian Eksklusif Pemandangan Pegunungan", client: "Keluarga Kusuma", year: "2024", status: "Proses", desc: "Desain split-level untuk menyesuaikan kontur tanah perbukitan di area Lembang." , location: "Lembang" },
  { id: 3, title: "Renovasi Interior Kantor Tech", client: "PT. Digital Solusi", year: "2024", status: "Perencanaan", desc: "Konsep open-space dengan elemen industrial modern untuk meningkatkan produktivitas." , location: "Bandung" },
  { id: 4, title: "Desain Arsitektur Villa Lembang", client: "Bpk. Hendra", year: "2023", status: "Selesai", desc: "Perencanaan villa peristirahatan keluarga dengan material kayu dominan." , location: "Lembang" },
  { id: 5, title: "Ekspansi Bangunan Komersial", client: "CV. Makmur Jaya", year: "2024", status: "Proses", desc: "Penambahan lantai dan area retail untuk ekspansi bisnis ritel." , location: "Surabaya" },
];

export default function ProjectsManagePage() {
  const [searchTerm, setSearchTerm] = useState('');
  
  // State untuk Modals
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [previewProject, setPreviewProject] = useState<any | null>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [deleteProject, setDeleteProject] = useState<any | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = () => {
    setIsDeleting(true);
    // Simulasi API delete
    setTimeout(() => {
      setIsDeleting(false);
      setDeleteProject(null);
      // Di dunia nyata, trigger fetch data ulang di sini
    }, 1500);
  };

  return (
    <div className="flex flex-col gap-8 font-sans relative">
      
      {/* Header Halaman */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-semibold text-white mb-2">Kelola Proyek</h1>
          <p className="text-gray-400 text-sm">Atur dan pantau daftar portofolio proyek Saeboemi Studio.</p>
        </div>
        
        {/* Integrasi Link ke halaman project baru */}
        <Button asChild className="bg-[#DDF247] text-black hover:bg-[#c5db38] rounded-sm px-6 py-5 font-medium flex items-center gap-2 w-fit">
          <Link href="/admin/dashboard/projects/new">
            <Plus className="w-5 h-5" />
            Tambah Proyek
          </Link>
        </Button>
      </div>

      {/* Toolbar (Search & Filter) */}
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
        <div className="flex gap-2 w-full sm:w-auto">
          <select className="bg-[#121418] border border-white/10 text-white px-4 py-2.5 rounded-sm text-sm focus:outline-none focus:border-[#DDF247]/50 w-full sm:w-auto appearance-none">
            <option value="all">Semua Status</option>
            <option value="selesai">Selesai</option>
            <option value="proses">Proses</option>
            <option value="perencanaan">Perencanaan</option>
          </select>
        </div>
      </div>

      {/* Tabel Data */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-[#181A1F] border border-white/5 rounded-sm overflow-hidden overflow-x-auto"
      >
        <table className="w-full text-left text-sm text-gray-400">
          <thead className="text-xs text-gray-500 uppercase bg-[#121418] border-b border-white/5">
            <tr>
              <th scope="col" className="px-6 py-4 font-medium">Nama Proyek</th>
              <th scope="col" className="px-6 py-4 font-medium">Klien</th>
              <th scope="col" className="px-6 py-4 font-medium">Tahun</th>
              <th scope="col" className="px-6 py-4 font-medium">Status</th>
              <th scope="col" className="px-6 py-4 font-medium text-right">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {dummyProjects.map((project) => (
              <tr key={project.id} className="hover:bg-white/[0.02] transition-colors">
                <td className="px-6 py-4 font-medium text-white whitespace-nowrap">
                  {project.title}
                </td>
                <td className="px-6 py-4">
                  {project.client}
                </td>
                <td className="px-6 py-4">
                  {project.year}
                </td>
                <td className="px-6 py-4">
                  <span className={`px-3 py-1 text-xs font-medium rounded-full ${
                    project.status === 'Selesai' ? 'bg-green-500/10 text-green-400 border border-green-500/20' :
                    project.status === 'Proses' ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20' :
                    'bg-yellow-500/10 text-yellow-400 border border-yellow-500/20'
                  }`}>
                    {project.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-right flex items-center justify-end gap-2">
                  <button onClick={() => setPreviewProject(project)} className="p-2 text-gray-400 hover:text-white transition-colors rounded-sm hover:bg-white/5" title="Preview">
                    <Eye className="w-4 h-4" />
                  </button>
                  <Link href={`/admin/dashboard/projects/${project.id}/edit`} className="p-2 text-gray-400 hover:text-[#DDF247] transition-colors rounded-sm hover:bg-white/5" title="Edit">
                    <Edit className="w-4 h-4" />
                  </Link>
                  <button onClick={() => setDeleteProject(project)} className="p-2 text-gray-400 hover:text-red-400 transition-colors rounded-sm hover:bg-red-400/10" title="Hapus">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        
        {/* Pagination Dummy */}
        <div className="p-4 border-t border-white/5 flex items-center justify-between text-sm text-gray-500 bg-[#121418]">
          <span>Menampilkan 1 hingga 5 dari 5 entri</span>
          <div className="flex gap-1">
            <button className="px-3 py-1 border border-white/10 rounded-sm hover:bg-white/5 disabled:opacity-50" disabled>Sebel.</button>
            <button className="px-3 py-1 bg-[#DDF247] text-black font-medium rounded-sm">1</button>
            <button className="px-3 py-1 border border-white/10 rounded-sm hover:bg-white/5 disabled:opacity-50" disabled>Lanjut</button>
          </div>
        </div>
      </motion.div>

      {/* --- MODAL PREVIEW --- */}
      <AnimatePresence>
        {previewProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-[#181A1F] border border-white/10 w-full max-w-2xl rounded-sm overflow-hidden flex flex-col shadow-2xl"
            >
              <div className="flex items-center justify-between p-6 border-b border-white/5">
                <h3 className="text-xl font-medium text-white">Preview Proyek</h3>
                <button onClick={() => setPreviewProject(null)} className="text-gray-400 hover:text-white transition-colors">
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="p-6 flex flex-col gap-6">
                <div className="w-full h-48 bg-[#121418] rounded-sm border border-white/5 flex items-center justify-center text-gray-500">
                  [ Gambar Utama Proyek ]
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-gray-500 mb-1">Nama Proyek</p>
                    <p className="text-white font-medium">{previewProject.title}</p>
                  </div>
                  <div>
                    <p className="text-gray-500 mb-1">Klien</p>
                    <p className="text-white font-medium">{previewProject.client}</p>
                  </div>
                  <div>
                    <p className="text-gray-500 mb-1">Lokasi</p>
                    <p className="text-white font-medium">{previewProject.location}</p>
                  </div>
                  <div>
                    <p className="text-gray-500 mb-1">Tahun & Status</p>
                    <p className="text-white font-medium">{previewProject.year} - <span className="text-[#DDF247]">{previewProject.status}</span></p>
                  </div>
                </div>
                <div>
                  <p className="text-gray-500 mb-1 text-sm">Ringkasan Deskripsi</p>
                  <p className="text-gray-300 text-sm leading-relaxed">{previewProject.desc}</p>
                </div>
              </div>
              <div className="p-6 border-t border-white/5 bg-[#121418] flex justify-end">
                <Button onClick={() => setPreviewProject(null)} variant="outline" className="border-white/10 text-gray-300 hover:bg-white/5 rounded-sm">Tutup Preview</Button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* --- MODAL KONFIRMASI DELETE (DISEMPURNAKAN) --- */}
      <AnimatePresence>
        {deleteProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-[#181A1F] border border-red-500/20 w-full max-w-md rounded-sm overflow-hidden flex flex-col shadow-2xl"
            >
              <div className="p-8 flex flex-col items-center text-center gap-4">
                <div className="w-16 h-16 rounded-full bg-red-500/10 flex items-center justify-center text-red-500 mb-2">
                  <AlertTriangle className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-medium text-white">Hapus Proyek?</h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  Anda yakin ingin menghapus proyek <span className="text-white font-medium">"{deleteProject.title}"</span>? Tindakan ini tidak dapat dibatalkan dan data akan hilang permanen.
                </p>
              </div>
              
              {/* BUTTONS SIMETRIS DENGAN FLEX-1 */}
              <div className="p-6 border-t border-white/5 bg-[#121418] flex gap-4">
                <Button 
                  onClick={() => setDeleteProject(null)} 
                  disabled={isDeleting}
                  variant="outline" 
                  className="flex-1 border-white/10 text-gray-300 hover:bg-white/5 hover:text-white rounded-sm h-11"
                >
                  Batal
                </Button>
                <Button 
                  onClick={handleDelete} 
                  disabled={isDeleting}
                  className="flex-1 bg-red-500 text-white hover:bg-red-600 rounded-sm h-11"
                >
                  {isDeleting ? "Menghapus..." : "Ya, Hapus"}
                </Button>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}