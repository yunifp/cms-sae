// src/app/admin/dashboard/posts/[id]/edit/EditPostClient.tsx

"use client";

import { useState, useEffect } from 'react';
import { ArrowLeft, Upload, Save, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useRouter, useParams } from 'next/navigation';
import { usePosts } from '@/hooks/usePosts';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import 'react-quill-new/dist/quill.snow.css';

const ReactQuill = dynamic(() => import('react-quill-new'), { ssr: false });

export default function EditPostClient() {
  const router = useRouter();
  const params = useParams();
  const { fetchPostById, updatePost, isLoading } = usePosts();
  const IMAGE_BASE_URL = 'httpa://api.saeboemi.com/';

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isFetchingData, setIsFetchingData] = useState(true);

  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    excerpt: "",
    content: "",
    category: "",
    status: "Draft",
  });

  useEffect(() => {
    const loadPost = async () => {
      if (params.id) {
        const data = await fetchPostById(params.id as string);
        if (data) {
          setFormData({
            title: data.title,
            slug: data.slug,
            excerpt: data.excerpt,
            content: data.content,
            category: data.category,
            status: data.status,
          });
          
          if (data.imageUrl) {
            setImagePreview(`${IMAGE_BASE_URL}${data.imageUrl}`);
          }
        } else {
          router.push('/admin/dashboard/posts');
        }
      }
      setIsFetchingData(false);
    };
    loadPost();
  }, [params.id, fetchPostById, router]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleContentChange = (content: string) => {
    setFormData(prev => ({ ...prev, content }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const data = new FormData();
    data.append('title', formData.title);
    data.append('slug', formData.slug);
    data.append('excerpt', formData.excerpt);
    data.append('content', formData.content);
    data.append('category', formData.category);
    data.append('status', formData.status);

    if (imageFile) {
      data.append('image', imageFile);
    }

    const success = await updatePost(params.id as string, data);
    if (success) {
      router.push('/admin/dashboard/posts');
    } else {
      alert("Gagal memperbarui artikel");
    }
  };

  if (isFetchingData) return <div className="text-white text-center py-20 animate-pulse">Memuat data artikel...</div>;

  return (
    <div className="flex flex-col gap-8 font-sans pb-12 w-full">
      
      <style>{`
        .quill-dark .ql-toolbar.ql-snow {
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-top-left-radius: 0.125rem;
          border-top-right-radius: 0.125rem;
          background-color: #181A1F;
        }
        .quill-dark .ql-container.ql-snow {
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-top: none;
          border-bottom-left-radius: 0.125rem;
          border-bottom-right-radius: 0.125rem;
          background-color: #121418;
          color: white;
          font-family: inherit;
        }
        .quill-dark .ql-editor {
          min-height: 300px;
        }
        .quill-dark .ql-snow .ql-stroke {
          stroke: #9CA3AF;
        }
        .quill-dark .ql-snow .ql-fill, .quill-dark .ql-snow .ql-stroke.ql-fill {
          fill: #9CA3AF;
        }
        .quill-dark .ql-snow .ql-picker {
          color: #9CA3AF;
        }
        .quill-dark .ql-snow .ql-picker-options {
          background-color: #181A1F;
          border: 1px solid rgba(255, 255, 255, 0.1);
        }
        .quill-dark .ql-snow .ql-picker-item:hover, .quill-dark .ql-snow .ql-picker-item.ql-selected {
          color: #DDF247;
        }
      `}</style>

      <div className="flex flex-col gap-4">
        <Link 
          href="/admin/dashboard/posts" 
          className="flex items-center gap-2 text-gray-400 hover:text-[#DDF247] transition-colors w-fit text-sm"
        >
          <ArrowLeft className="w-4 h-4" /> Kembali ke Daftar Artikel
        </Link>
        <h1 className="text-3xl font-semibold text-white">Edit Artikel</h1>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8 w-full">
        
        <div className="lg:col-span-2 flex flex-col gap-6 min-w-0">
          <div className="bg-[#181A1F] border border-white/5 p-8 rounded-sm flex flex-col gap-6 w-full">
            
            <div className="flex flex-col gap-2 w-full">
              <label className="text-sm text-gray-400">Judul Artikel</label>
              <input 
                type="text" 
                name="title"
                required
                value={formData.title}
                onChange={handleChange}
                className="w-full bg-[#121418] border border-white/10 text-white px-4 py-3 focus:outline-none focus:border-[#DDF247]/50 rounded-sm text-sm"
              />
            </div>

            <div className="flex flex-col gap-2 w-full">
              <label className="text-sm text-gray-400">Kutipan Singkat (Excerpt)</label>
              <textarea 
                name="excerpt"
                rows={3}
                required
                value={formData.excerpt}
                onChange={handleChange}
                className="w-full bg-[#121418] border border-white/10 text-white px-4 py-3 focus:outline-none focus:border-[#DDF247]/50 rounded-sm text-sm resize-none"
              />
            </div>

            <div className="flex flex-col gap-2 w-full">
              <label className="text-sm text-gray-400 mb-2">Konten Artikel</label>
              <div className="quill-dark w-full max-w-full overflow-hidden">
                <ReactQuill 
                  theme="snow" 
                  value={formData.content} 
                  onChange={handleContentChange}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-6 min-w-0">
          <div className="bg-[#181A1F] border border-white/5 p-8 rounded-sm flex flex-col gap-6 w-full">
            
            <div className="flex flex-col gap-2 w-full">
              <label className="text-sm text-gray-400">URL Slug</label>
              <input 
                type="text" 
                name="slug"
                value={formData.slug}
                onChange={handleChange}
                className="w-full bg-[#121418] border border-white/10 text-white px-4 py-3 focus:outline-none focus:border-[#DDF247]/50 rounded-sm text-sm"
              />
            </div>

            <div className="flex flex-col gap-2 w-full">
              <label className="text-sm text-gray-400">Kategori / Tags</label>
              <input 
                type="text" 
                name="category"
                required
                value={formData.category}
                onChange={handleChange}
                className="w-full bg-[#121418] border border-white/10 text-white px-4 py-3 focus:outline-none focus:border-[#DDF247]/50 rounded-sm text-sm"
              />
            </div>

            <div className="flex flex-col gap-2 w-full">
              <label className="text-sm text-gray-400">Status</label>
              <select 
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="w-full bg-[#121418] border border-white/10 text-white px-4 py-3 focus:outline-none focus:border-[#DDF247]/50 rounded-sm text-sm appearance-none"
              >
                <option value="Draft">Draft</option>
                <option value="Published">Published</option>
              </select>
            </div>
          </div>

          <div className="bg-[#181A1F] border border-white/5 p-8 rounded-sm flex flex-col gap-4 w-full">
            <h3 className="text-lg font-medium text-white border-b border-white/5 pb-4">Cover Artikel</h3>
            <label className="border-2 border-dashed border-white/10 rounded-sm p-4 flex flex-col items-center justify-center gap-3 hover:border-[#DDF247]/30 transition-colors cursor-pointer relative overflow-hidden h-40">
              {imagePreview ? (
                <Image src={imagePreview} alt="Preview" fill className="object-cover" unoptimized />
              ) : (
                <Upload className="w-8 h-8 text-gray-400" />
              )}
              <input type="file" className="hidden" accept="image/*" onChange={handleImageChange} />
            </label>
          </div>

          <div className="flex flex-col gap-3 w-full">
            <Button 
              type="submit" 
              disabled={isLoading}
              className="w-full bg-[#DDF247] text-black hover:bg-[#c5db38] rounded-sm py-7 font-bold flex items-center gap-2"
            >
              <Save className="w-5 h-5" /> {isLoading ? "Menyimpan Perubahan..." : "Simpan Perubahan"}
            </Button>
            <Button 
              type="button"
              variant="outline"
              onClick={() => router.back()}
              className="w-full border-white/10 text-gray-400 hover:bg-white/5 rounded-sm py-7 font-medium"
            >
              <X className="w-5 h-5 mr-2" /> Batalkan
            </Button>
          </div>
        </div>

      </form>
    </div>
  );
}