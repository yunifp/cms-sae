/* eslint-disable react/no-unescaped-entities */
"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Edit, Trash2, Home, X, AlertTriangle, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

// Mock data layanan
const dummyServices = [
  { id: 1, name: "Desain Arsitektur & Interior", status: "Aktif", desc: "Merancang konsep visual dan tata ruang fungsional yang disesuaikan dengan kebutuhan dan karakter klien." },
  { id: 2, name: "Konstruksi Bangunan", status: "Aktif", desc: "Layanan bangun rumah dari nol dengan manajemen terstruktur, material standar terbaik, dan budget terkontrol." },
  { id: 3, name: "Renovasi Eksterior & Interior", status: "Nonaktif", desc: "Memberikan wajah baru untuk hunian Anda melalui perbaikan struktur maupun pembaruan estetika." },
];

export default function ManageServicesPage() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [previewService, setPreviewService] = useState<any | null>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [deleteService, setDeleteService] = useState<any | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = () => {
    setIsDeleting(true);
    // Simulasi API delete
    setTimeout(() => {
      setIsDeleting(false);
      setDeleteService(null);
    }, 1500);
  };

  return (
    <div className="flex flex-col gap-8 font-sans relative">
      
      {/* Header Halaman */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-semibold text-white mb-2">Kelola Layanan</h1>
          <p className="text-gray-400 text-sm">Atur daftar jasa arsitektur dan konstruksi yang ditawarkan.</p>
        </div>
        
        {/* Integrasi Link ke halaman service baru */}
        <Button asChild className="bg-[#DDF247] text-black hover:bg-[#c5db38] rounded-sm px-6 py-5 font-medium flex items-center gap-2 w-fit">
          <Link href="/admin/dashboard/services/new">
            <Plus className="w-5 h-5" />
            Tambah Layanan
          </Link>
        </Button>
      </div>

      {/* Grid Card Layanan */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {dummyServices.map((service, index) => (
          <motion.div 
            key={service.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
            className="bg-[#181A1F] border border-white/5 p-6 rounded-sm flex flex-col gap-4 group hover:border-white/10 transition-colors"
          >
            <div className="w-12 h-12 rounded-full bg-[#DDF247]/10 flex items-center justify-center text-[#DDF247]">
              <Home className="w-6 h-6" />
            </div>
            
            <div className="flex-1">
              <h3 className="text-xl font-medium text-white mb-2">{service.name}</h3>
              <p className="text-sm text-gray-400 leading-relaxed line-clamp-2">{service.desc}</p>
            </div>

            <div className="flex items-center justify-between mt-4 pt-4 border-t border-white/5">
              <span className={`text-xs px-3 py-1 font-medium rounded-full ${
                service.status === 'Aktif' 
                  ? 'bg-green-500/10 text-green-400 border border-green-500/20' 
                  : 'bg-red-500/10 text-red-400 border border-red-500/20'
              }`}>
                {service.status}
              </span>
              <div className="flex gap-2">
                <button 
                  onClick={() => setPreviewService(service)}
                  className="p-2 text-gray-400 hover:text-white transition-colors bg-white/5 rounded-sm"
                  title="Preview"
                >
                  <Eye className="w-4 h-4" />
                </button>
                <Link 
                  href={`/admin/dashboard/services/${service.id}/edit`}
                  className="p-2 text-gray-400 hover:text-[#DDF247] transition-colors bg-white/5 rounded-sm"
                  title="Edit"
                >
                  <Edit className="w-4 h-4" />
                </Link>
                <button 
                  onClick={() => setDeleteService(service)}
                  className="p-2 text-gray-400 hover:text-red-400 transition-colors bg-white/5 rounded-sm"
                  title="Hapus"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* --- MODAL PREVIEW --- */}
      <AnimatePresence>
        {previewService && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-[#181A1F] border border-white/10 w-full max-w-lg rounded-sm overflow-hidden flex flex-col shadow-2xl"
            >
              <div className="flex items-center justify-between p-6 border-b border-white/5">
                <h3 className="text-xl font-medium text-white">Preview Layanan</h3>
                <button onClick={() => setPreviewService(null)} className="text-gray-400 hover:text-white transition-colors">
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="p-6 flex flex-col gap-6 text-center items-center">
                <div className="w-full h-40 bg-[#121418] rounded-sm border border-white/5 flex items-center justify-center text-gray-500 mb-2">
                  [ Gambar Cover Layanan ]
                </div>
                <div>
                  <h4 className="text-2xl font-semibold text-white mb-2">{previewService.name}</h4>
                  <span className={`text-xs px-3 py-1 font-medium rounded-full ${
                    previewService.status === 'Aktif' 
                      ? 'bg-green-500/10 text-green-400 border border-green-500/20' 
                      : 'bg-red-500/10 text-red-400 border border-red-500/20'
                  }`}>
                    Status: {previewService.status}
                  </span>
                </div>
                <div className="w-full text-left bg-[#121418] p-4 rounded-sm border border-white/5">
                  <p className="text-gray-500 mb-1 text-sm">Deskripsi Layanan</p>
                  <p className="text-gray-300 text-sm leading-relaxed">{previewService.desc}</p>
                </div>
              </div>
              <div className="p-6 border-t border-white/5 bg-[#121418] flex justify-end">
                <Button onClick={() => setPreviewService(null)} variant="outline" className="border-white/10 text-gray-300 hover:bg-white/5 rounded-sm">Tutup Preview</Button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* --- MODAL KONFIRMASI DELETE (SIMETRIS) --- */}
      <AnimatePresence>
        {deleteService && (
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
                <h3 className="text-2xl font-medium text-white">Hapus Layanan?</h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  Anda yakin ingin menghapus layanan <span className="text-white font-medium">"{deleteService.name}"</span>? Tindakan ini tidak dapat dibatalkan.
                </p>
              </div>
              
              {/* BUTTONS SIMETRIS DENGAN FLEX-1 */}
              <div className="p-6 border-t border-white/5 bg-[#121418] flex gap-4">
                <Button 
                  onClick={() => setDeleteService(null)} 
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