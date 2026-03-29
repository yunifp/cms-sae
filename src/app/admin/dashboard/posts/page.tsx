/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Edit, Trash2, FileText, X, AlertTriangle, Eye, ImageIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Image from 'next/image';
import { usePosts } from '@/hooks/usePosts';

export default function ManagePostsPage() {
  const { posts, fetchPosts, deletePost } = usePosts();
  const IMAGE_BASE_URL = 'httpa://api.saeboemi.com/';

  const [previewPost, setPreviewPost] = useState<any | null>(null);
  const [postToDelete, setPostToDelete] = useState<any | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  const handleDelete = async () => {
    if (!postToDelete) return;
    setIsDeleting(true);
    const success = await deletePost(postToDelete.id);
    if (success) {
      setPostToDelete(null);
      fetchPosts();
    }
    setIsDeleting(false);
  };

  return (
    <div className="flex flex-col gap-8 font-sans relative">
      
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-semibold text-white mb-2">Kelola Artikel</h1>
          <p className="text-gray-400 text-sm">Atur daftar berita dan blog.</p>
        </div>
        
        <Button asChild className="bg-[#DDF247] text-black hover:bg-[#c5db38] rounded-sm px-6 py-5 font-medium flex items-center gap-2 w-fit">
          <Link href="/admin/dashboard/posts/new">
            <Plus className="w-5 h-5" />
            Tambah Artikel
          </Link>
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.length === 0 ? (
           <p className="text-gray-400 col-span-full">Belum ada artikel yang ditambahkan.</p>
        ) : (
          posts.map((post, index) => (
            <motion.div 
              key={post.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              className="bg-[#181A1F] border border-white/5 p-6 rounded-sm flex flex-col gap-4 group hover:border-white/10 transition-colors"
            >
              <div className="w-full h-40 rounded-sm overflow-hidden relative bg-[#121418] mb-2 flex items-center justify-center">
                {post.imageUrl ? (
                  <Image src={`${IMAGE_BASE_URL}${post.imageUrl}`} alt={post.title} fill className="object-cover" unoptimized />
                ) : (
                  <FileText className="w-8 h-8 text-gray-600" />
                )}
                <div className="absolute top-2 right-2 bg-black/70 backdrop-blur-sm px-2 py-1 rounded-sm text-[10px] text-white uppercase tracking-widest border border-white/10">
                  {post.category}
                </div>
              </div>
              
              <div className="flex-1">
                <h3 className="text-lg font-medium text-white mb-2 line-clamp-2">{post.title}</h3>
                <p className="text-sm text-gray-400 leading-relaxed line-clamp-2">{post.excerpt}</p>
              </div>

              <div className="flex items-center justify-between mt-2 pt-4 border-t border-white/5">
                <span className={`text-xs px-3 py-1 font-medium rounded-full ${
                  post.status === 'Published' 
                    ? 'bg-green-500/10 text-green-400 border border-green-500/20' 
                    : 'bg-yellow-500/10 text-yellow-400 border border-yellow-500/20'
                }`}>
                  {post.status}
                </span>
                <div className="flex gap-2">
                  <button 
                    onClick={() => setPreviewPost(post)}
                    className="p-2 text-gray-400 hover:text-white transition-colors bg-white/5 rounded-sm"
                  >
                    <Eye className="w-4 h-4" />
                  </button>
                  <Link 
                    href={`/admin/dashboard/posts/${post.id}/edit`}
                    className="p-2 text-gray-400 hover:text-[#DDF247] transition-colors bg-white/5 rounded-sm"
                  >
                    <Edit className="w-4 h-4" />
                  </Link>
                  <button 
                    onClick={() => setPostToDelete(post)}
                    className="p-2 text-gray-400 hover:text-red-400 transition-colors bg-white/5 rounded-sm"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))
        )}
      </div>

      <AnimatePresence>
        {previewPost && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-[#181A1F] border border-white/10 w-full max-w-2xl rounded-sm overflow-hidden flex flex-col shadow-2xl max-h-[90vh] overflow-y-auto"
            >
              <div className="flex items-center justify-between p-6 border-b border-white/5">
                <h3 className="text-xl font-medium text-white">Preview Artikel</h3>
                <button onClick={() => setPreviewPost(null)} className="text-gray-400 hover:text-white transition-colors">
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="p-6 flex flex-col gap-6">
                <div className="w-full h-64 bg-[#121418] rounded-sm border border-white/5 flex items-center justify-center text-gray-500 relative overflow-hidden">
                   {previewPost.imageUrl ? (
                     <Image src={`${IMAGE_BASE_URL}${previewPost.imageUrl}`} alt={previewPost.title} fill className="object-cover" unoptimized />
                   ) : (
                     <div className="flex flex-col items-center gap-2">
                       <ImageIcon className="w-8 h-8" />
                       <span className="text-xs uppercase tracking-widest">Tidak ada gambar</span>
                     </div>
                   )}
                </div>
                <div>
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-[#DDF247] text-xs uppercase tracking-widest font-medium px-2 py-1 bg-[#DDF247]/10 rounded-sm">{previewPost.category}</span>
                    <span className="text-gray-500 text-xs">{new Date(previewPost.createdAt).toLocaleDateString('id-ID')}</span>
                  </div>
                  <h4 className="text-2xl font-semibold text-white mb-2">{previewPost.title}</h4>
                  <p className="text-sm text-gray-400 italic border-l-2 border-white/20 pl-4 py-1 mb-4">{previewPost.excerpt}</p>
                  
                  {/* PERHATIKAN BAGIAN INI - Kita menggunakan dangerouslySetInnerHTML */}
                  <div 
                    className="text-gray-300 text-sm leading-relaxed whitespace-pre-wrap prose prose-invert max-w-none"
                    dangerouslySetInnerHTML={{ __html: previewPost.content }}
                  />
                  {/* SELESAI PERUBAHAN */}
                  
                </div>
              </div>
              <div className="p-6 border-t border-white/5 bg-[#121418] flex justify-end">
                <Button onClick={() => setPreviewPost(null)} variant="outline" className="border-white/10 text-gray-300 hover:bg-white/5 rounded-sm">Tutup Preview</Button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {postToDelete && (
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
                <h3 className="text-2xl font-medium text-white">Hapus Artikel?</h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  Anda yakin ingin menghapus artikel <span className="text-white font-medium">"{postToDelete.title}"</span>?
                </p>
              </div>
              <div className="p-6 border-t border-white/5 bg-[#121418] flex gap-4">
                <Button 
                  onClick={() => setPostToDelete(null)} 
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