/* eslint-disable react/no-unescaped-entities */
"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Search, Edit, Trash2, Eye, X, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

// Mock data artikel (diperluas dengan slug, excerpt, tags, dan status)
const dummyPosts = [
  { id: 1, title: "5 Tips Renovasi Rumah dengan Budget Minim", slug: "5-tips-renovasi-rumah", date: "15 Maret 2026", views: 124, status: "Published", tags: "Renovasi, Budget, Tips", excerpt: "Pelajari cara merenovasi rumah impian Anda tanpa harus menguras kantong." },
  { id: 2, title: "Tren Desain Interior yang Akan Populer di 2026", slug: "tren-desain-interior-2026", date: "10 Maret 2026", views: 89, status: "Published", tags: "Interior, Desain, Tren", excerpt: "Dari warna hangat hingga material ramah lingkungan, temukan tren desain interior terbaru." },
  { id: 3, title: "Panduan Memilih Material Atap Terbaik", slug: "memilih-material-atap-terbaik", date: "05 Maret 2026", views: 210, status: "Draft", tags: "Konstruksi, Atap, Material", excerpt: "Jangan salah pilih! Berikut panduan memilih material atap tahan lama." },
  { id: 4, title: "Pentingnya Pondasi yang Kuat", slug: "pentingnya-pondasi-kuat", date: "28 Februari 2026", views: 56, status: "Published", tags: "Struktur, Pondasi", excerpt: "Pahami pentingnya struktur pondasi untuk keamanan jangka panjang." },
];

export default function ManagePostsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  
  // State untuk Modals
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [previewPost, setPreviewPost] = useState<any | null>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [deletePost, setDeletePost] = useState<any | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = () => {
    setIsDeleting(true);
    setTimeout(() => {
      setIsDeleting(false);
      setDeletePost(null);
    }, 1500);
  };

  return (
    <div className="flex flex-col gap-8 font-sans relative">
      
      {/* Header Halaman */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-semibold text-white mb-2">Kelola Artikel</h1>
          <p className="text-gray-400 text-sm">Update berita, panduan, dan wawasan terbaru untuk klien.</p>
        </div>
        <Button asChild className="bg-[#DDF247] text-black hover:bg-[#c5db38] rounded-sm px-6 py-5 font-medium">
          <Link href="/admin/dashboard/posts/new" className="flex items-center gap-2">
            <Plus className="w-5 h-5" /> Tambah Artikel
          </Link>
        </Button>
      </div>

      {/* Toolbar */}
      <div className="bg-[#181A1F] border border-white/5 p-4 rounded-sm flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative w-full sm:w-96">
          <Search className="absolute inset-y-0 left-3 my-auto h-4 w-4 text-gray-500" />
          <input 
            type="text" 
            placeholder="Cari judul artikel atau tags..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-[#121418] border border-white/10 text-white pl-10 pr-4 py-2.5 focus:outline-none focus:border-[#DDF247]/50 rounded-sm text-sm"
          />
        </div>
        <div className="flex gap-2 w-full sm:w-auto">
          <select className="bg-[#121418] border border-white/10 text-white px-4 py-2.5 rounded-sm text-sm focus:outline-none focus:border-[#DDF247]/50 w-full sm:w-auto appearance-none">
            <option value="all">Semua Status</option>
            <option value="published">Published</option>
            <option value="draft">Draft</option>
          </select>
        </div>
      </div>

      {/* Tabel Data */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-[#181A1F] border border-white/5 rounded-sm overflow-hidden overflow-x-auto">
        <table className="w-full text-left text-sm text-gray-400">
          <thead className="text-xs text-gray-500 uppercase bg-[#121418] border-b border-white/5">
            <tr>
              <th className="px-6 py-4 font-medium">Judul Artikel</th>
              <th className="px-6 py-4 font-medium">Tanggal</th>
              <th className="px-6 py-4 font-medium">Status</th>
              <th className="px-6 py-4 font-medium">Dilihat</th>
              <th className="px-6 py-4 font-medium text-right">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {dummyPosts.map((post) => (
              <tr key={post.id} className="hover:bg-white/[0.02] transition-colors">
                <td className="px-6 py-4 font-medium text-white max-w-xs truncate">{post.title}</td>
                <td className="px-6 py-4 whitespace-nowrap">{post.date}</td>
                <td className="px-6 py-4">
                  <span className={`px-3 py-1 text-xs font-medium rounded-full ${
                    post.status === 'Published' ? 'bg-green-500/10 text-green-400 border border-green-500/20' : 'bg-gray-500/10 text-gray-400 border border-gray-500/20'
                  }`}>
                    {post.status}
                  </span>
                </td>
                <td className="px-6 py-4 flex items-center gap-2 mt-1"><Eye className="w-4 h-4 text-gray-500" /> {post.views}</td>
                <td className="px-6 py-4 text-right">
                  <div className="flex justify-end gap-2">
                    <button onClick={() => setPreviewPost(post)} className="p-2 text-gray-400 hover:text-white transition-colors bg-white/5 rounded-sm" title="Preview">
                      <Eye className="w-4 h-4" />
                    </button>
                    <Link href={`/admin/dashboard/posts/${post.id}/edit`} className="p-2 text-gray-400 hover:text-[#DDF247] transition-colors bg-white/5 rounded-sm" title="Edit">
                      <Edit className="w-4 h-4" />
                    </Link>
                    <button onClick={() => setDeletePost(post)} className="p-2 text-gray-400 hover:text-red-400 transition-colors bg-white/5 rounded-sm" title="Hapus">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </motion.div>

      {/* --- MODAL PREVIEW --- */}
      <AnimatePresence>
        {previewPost && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }}
              className="bg-[#181A1F] border border-white/10 w-full max-w-2xl rounded-sm overflow-hidden flex flex-col shadow-2xl"
            >
              <div className="flex items-center justify-between p-6 border-b border-white/5">
                <h3 className="text-xl font-medium text-white">Preview Artikel</h3>
                <button onClick={() => setPreviewPost(null)} className="text-gray-400 hover:text-white transition-colors"><X className="w-5 h-5" /></button>
              </div>
              <div className="p-6 flex flex-col gap-6">
                <div className="w-full h-48 bg-[#121418] rounded-sm border border-white/5 flex items-center justify-center text-gray-500">
                  [ Gambar Cover Artikel ]
                </div>
                <div>
                  <h4 className="text-2xl font-semibold text-white mb-2">{previewPost.title}</h4>
                  <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                    <span>{previewPost.date}</span>
                    <span>•</span>
                    <span className="text-[#DDF247]">Tags: {previewPost.tags}</span>
                    <span>•</span>
                    <span>Slug: /{previewPost.slug}</span>
                  </div>
                </div>
                <div>
                  <p className="text-gray-500 mb-1 text-sm">Kutipan Singkat (Excerpt)</p>
                  <p className="text-gray-300 text-sm leading-relaxed">{previewPost.excerpt}</p>
                </div>
              </div>
              <div className="p-6 border-t border-white/5 bg-[#121418] flex justify-end">
                <Button onClick={() => setPreviewPost(null)} variant="outline" className="border-white/10 text-gray-300 hover:bg-white/5 rounded-sm">Tutup</Button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* --- MODAL KONFIRMASI DELETE --- */}
      <AnimatePresence>
        {deletePost && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }}
              className="bg-[#181A1F] border border-red-500/20 w-full max-w-md rounded-sm overflow-hidden flex flex-col shadow-2xl"
            >
              <div className="p-8 flex flex-col items-center text-center gap-4">
                <div className="w-16 h-16 rounded-full bg-red-500/10 flex items-center justify-center text-red-500 mb-2">
                  <AlertTriangle className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-medium text-white">Hapus Artikel?</h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  Anda yakin ingin menghapus artikel <span className="text-white font-medium">"{deletePost.title}"</span>? Tindakan ini tidak dapat dibatalkan.
                </p>
              </div>
              <div className="p-6 border-t border-white/5 bg-[#121418] flex gap-4">
                <Button onClick={() => setDeletePost(null)} disabled={isDeleting} variant="outline" className="flex-1 border-white/10 text-gray-300 hover:bg-white/5 rounded-sm h-11">
                  Batal
                </Button>
                <Button onClick={handleDelete} disabled={isDeleting} className="flex-1 bg-red-500 text-white hover:bg-red-600 rounded-sm h-11">
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