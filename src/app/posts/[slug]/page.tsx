import { PageHeader } from "@/components/sections/about/PageHeader";
import { PostDetailBody } from "@/components/sections/posts/PostDetailBody";
import { notFound } from "next/navigation";

// MOCK DATABASE (Bisa diganti dengan fetch API/CMS nantinya)
const DUMMY_POSTS = [
  {
    slug: "5-tips-renovasi-rumah",
    title: "5 Tips Renovasi Rumah dengan Budget Minim",
  },
  {
    slug: "tren-desain-interior-2024",
    title: "Tren Desain Interior yang Akan Populer di 2024",
  },
  {
    slug: "memilih-material-atap-terbaik",
    title: "Panduan Memilih Material Atap Terbaik untuk Iklim Tropis",
  }
];

async function getPost(slug: string) {
  const post = DUMMY_POSTS.find((p) => p.slug === slug);
  return post || null;
}

export const metadata = {
  title: "Post Details | Kombong",
  description: "Read full article on Kombong construction blog.",
};

export default async function PostDetailPage({ 
  params 
}: { 
  params: Promise<{ slug: string }> 
}) {
  const resolvedParams = await params;
  const postSlug = resolvedParams.slug;
  
  const postData = await getPost(postSlug);

  if (!postData) {
    notFound();
  }

  return (
    <>
      <PageHeader 
        title="Post Details"
        breadcrumbs={[
          { name: "HOME", href: "/" },
          { name: "POSTS", href: "/posts" },
          { name: postData.title.toUpperCase(), href: "#" } 
        ]}
        bgImage="https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=2070&auto=format&fit=crop" 
      />
      
      {/* Mengirimkan slug saat ini agar bisa memfilter 'rekomendasi postingan' */}
      <PostDetailBody currentSlug={postSlug} currentTitle={postData.title} />
    </>
  );
}