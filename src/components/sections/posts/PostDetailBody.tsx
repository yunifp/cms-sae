/* eslint-disable @next/next/no-img-element */
import Link from "next/link";

// Mock data untuk keperluan rekomendasi
const DUMMY_POSTS = [
  {
    slug: "5-tips-renovasi-rumah",
    title: "5 Tips Renovasi Rumah dengan Budget Minim",
    date: "15 Maret 2026",
    image: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?q=80&w=600&auto=format&fit=crop"
  },
  {
    slug: "tren-desain-interior-2026",
    title: "Tren Desain Interior yang Akan Populer di 2026",
    date: "10 Maret 2026",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=600&auto=format&fit=crop"
  },
  {
    slug: "memilih-material-atap-terbaik",
    title: "Panduan Memilih Material Atap Terbaik untuk Iklim Tropis",
    date: "05 Maret 2026",
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=600&auto=format&fit=crop"
  }
];

interface PostDetailBodyProps {
  currentSlug: string;
  currentTitle: string;
}

export function PostDetailBody({ currentSlug, currentTitle }: PostDetailBodyProps) {
  // Filter postingan untuk rekomendasi (kecuali postingan yang sedang dibaca)
  const recommendedPosts = DUMMY_POSTS.filter(post => post.slug !== currentSlug).slice(0, 3);

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="flex flex-col lg:flex-row gap-12">
          
          {/* Main Content Area */}
          <div className="w-full lg:w-2/3">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              {currentTitle}
            </h1>
            <div className="aspect-video w-full bg-gray-200 rounded-xl mb-8 overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=1200&auto=format&fit=crop" 
                alt={currentTitle} 
                className="w-full h-full object-cover"
              />
            </div>
            
            <div className="prose prose-lg max-w-none text-gray-600">
              <p>
                Membangun atau merenovasi rumah seringkali menjadi tantangan tersendiri, terutama jika menyangkut manajemen waktu dan pengelolaan anggaran. Oleh karena itu, penting untuk merencanakan setiap langkah dengan matang bersama tim ahli yang sudah berpengalaman di bidangnya.
              </p>
              <h3 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Poin Penting Konstruksi</h3>
              <p>
                Salah satu kunci utama dalam konstruksi adalah pemilihan material yang tepat. Material berkualitas tinggi tidak hanya menjamin estetika, tetapi juga kekuatan dan ketahanan bangunan dalam jangka waktu yang panjang. Selain itu, pengawasan lapangan (quality control) yang ketat sangat dibutuhkan untuk menghindari kesalahan teknis.
              </p>
              <p>
                Di Saeboemi Studio, kami selalu memastikan bahwa proses rancang bangun berjalan secara transparan. Klien akan dilibatkan dalam tahap perencanaan untuk memastikan desain sesuai dengan visi mereka, sementara eksekusi di lapangan diserahkan kepada tenaga kerja profesional kami.
              </p>
              {/* Tambahkan konten panjang lainnya di sini */}
            </div>
          </div>

          {/* Sidebar Area - Recommended Posts */}
          <div className="w-full lg:w-1/3">
            <div className="bg-gray-50 p-6 rounded-xl border border-gray-100 sticky top-24">
              <h3 className="text-xl font-bold text-gray-900 mb-6 border-b pb-4">
                Artikel Terkait
              </h3>
              
              <div className="flex flex-col gap-6">
                {recommendedPosts.map((post) => (
                  <Link href={`/posts/${post.slug}`} key={post.slug} className="group flex gap-4 items-center">
                    <div className="w-24 h-24 rounded-lg overflow-hidden shrink-0">
                      <img 
                        src={post.image} 
                        alt={post.title}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                      />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 line-clamp-2 group-hover:text-yellow-600 transition-colors">
                        {post.title}
                      </h4>
                      <p className="text-sm text-gray-500 mt-1">{post.date}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}