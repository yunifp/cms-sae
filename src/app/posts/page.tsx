import { PageHeader } from "@/components/sections/about/PageHeader";
import { Contact } from "@/components/sections/home/Contact";
import { PostShowcase } from "@/components/sections/posts/PostShowCase";

export const metadata = {
  title: "Blog & News | Kombong - Home Builder Contractor",
  description: "Read our latest news, tips, and insights about construction and renovations.",
};

export default function PostsPage() {
  return (
    <>
      <PageHeader 
        title="Blog & News"
        breadcrumbs={[
          { name: "HOME", href: "/" },
          { name: "POSTS", href: "/posts" }
        ]}
        // Gambar latar belakang yang relevan dengan artikel/berita (bisa disesuaikan)
        bgImage="https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=2070&auto=format&fit=crop" 
      />

      {/* Menampilkan daftar post */}
      <PostShowcase />
      
      {/* Memanggil komponen Contact seperti di halaman lain */}
      <Contact/>
    </>
  );
}