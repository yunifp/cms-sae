import { PageHeader } from "@/components/sections/about/PageHeader";
import { PostDetailBody } from "@/components/sections/posts/PostDetailBody";
import { notFound } from "next/navigation";
import { getPostBySlugAPI, getPostsAPI } from "@/services/postApi";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Post Details | Saeboemi Studio",
  description: "Read full article on Saeboemi construction blog.",
};

export default async function PostDetailPage({ 
  params 
}: { 
  params: Promise<{ slug: string }> 
}) {
  const resolvedParams = await params;
  const postSlug = resolvedParams.slug;

  if (!postSlug) return notFound();
  
  const [postData, allPosts] = await Promise.all([
    getPostBySlugAPI(postSlug),
    getPostsAPI()
  ]);

  if (!postData) {
    notFound();
  }

  return (
    <>
      <PageHeader 
        // Menggunakan judul artikel asli agar lebih relevan bagi pembaca
        title={postData.title} 
        breadcrumbs={[
          { name: "HOME", href: "/" },
          { name: "POSTS", href: "/posts" },
          { name: postData.title.toUpperCase(), href: "#" } 
        ]}
        // Cukup kirim path-nya, PageHeader akan menggabungkan dengan IMAGE_BASE_URL
        bgImage={postData.imageUrl} 
      />
      
      <PostDetailBody post={postData} allPosts={allPosts} />
    </>
  );
}