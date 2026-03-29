/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Link from "next/link";

interface PostDetailBodyProps {
  post: any;
  allPosts: any[];
}

export function PostDetailBody({ post, allPosts }: PostDetailBodyProps) {
  const IMAGE_BASE_URL = 'httpa://api.saeboemi.com/';
  
  // Filter rekomendasi (kecuali yang sedang dibaca)
  const recommendedPosts = allPosts
    .filter(item => item.slug !== post.slug)
    .slice(0, 3);

  return (
    <section className="py-20 bg-white overflow-hidden">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="flex flex-col lg:flex-row gap-12">
          
          {/* Main Content Area */}
          <div className="w-full lg:w-2/3 min-w-0"> {/* min-w-0 penting untuk flex child agar tidak meluap */}
            <div className="flex items-center gap-3 mb-4">
              <span className="bg-yellow-100 text-yellow-700 text-xs font-bold px-3 py-1 uppercase tracking-wider rounded-full">
                {post.category}
              </span>
              <span className="text-gray-400 text-sm">
                {new Date(post.createdAt).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}
              </span>
            </div>
            
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 leading-tight break-words">
              {post.title}
            </h1>

            <div className="aspect-video w-full bg-gray-200 rounded-xl mb-8 overflow-hidden relative">
              {post.imageUrl ? (
                <img 
                  src={`${IMAGE_BASE_URL}${post.imageUrl}`} 
                  alt={post.title} 
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-400 uppercase tracking-widest bg-gray-100">
                  No Image
                </div>
              )}
            </div>
            
            {/* RENDER RICH TEXT HTML */}
            <div className="prose prose-lg max-w-none text-gray-600 prose-headings:text-gray-900 prose-strong:text-gray-900 break-words">
              {/* Kutipan Singkat sebagai pembuka */}
              <p className="text-xl font-medium text-gray-800 border-l-4 border-yellow-500 pl-6 my-8 italic leading-relaxed">
                {post.excerpt}
              </p>
              
              {/* Isi Utama - Pastikan tidak ada whitespace-pre agar tidak memaksa baris panjang ke kanan */}
              <div 
                className="rich-text-content"
                dangerouslySetInnerHTML={{ __html: post.content }} 
              />
            </div>
          </div>

          {/* Sidebar Area - Recommended Posts */}
          <div className="w-full lg:w-1/3">
            <div className="bg-gray-50 p-6 rounded-xl border border-gray-100 sticky top-24">
              <h3 className="text-xl font-bold text-gray-900 mb-6 border-b pb-4">
                Artikel Terkait
              </h3>
              
              <div className="flex flex-col gap-6">
                {recommendedPosts.length > 0 ? (
                  recommendedPosts.map((item) => (
                    <Link href={`/posts/${item.slug}`} key={item.id} className="group flex gap-4 items-center">
                      <div className="w-24 h-24 rounded-lg overflow-hidden shrink-0 bg-gray-200">
                        {item.imageUrl && (
                          <img 
                            src={`${IMAGE_BASE_URL}${item.imageUrl}`} 
                            alt={item.title}
                            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                          />
                        )}
                      </div>
                      <div className="min-w-0 flex-1">
                        <h4 className="font-semibold text-gray-900 line-clamp-2 group-hover:text-yellow-600 transition-colors">
                          {item.title}
                        </h4>
                        <p className="text-sm text-gray-500 mt-1">
                           {new Date(item.createdAt).toLocaleDateString('id-ID', { month: 'short', year: 'numeric' })}
                        </p>
                      </div>
                    </Link>
                  ))
                ) : (
                  <p className="text-gray-400 italic text-sm">Tidak ada artikel terkait.</p>
                )}
              </div>
            </div>
          </div>

        </div>
      </div>

      <style jsx global>{`
        .rich-text-content p {
          margin-bottom: 1.25rem;
          line-height: 1.75;
        }
        .rich-text-content img {
          max-width: 100%;
          height: auto;
          border-radius: 0.5rem;
        }
        /* Menghapus paksaan pre-wrap jika ada dari quill */
        .rich-text-content * {
          white-space: normal !important;
          word-break: break-word !important;
        }
      `}</style>
    </section>
  );
}