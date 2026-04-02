// src/app/admin/dashboard/posts/[id]/edit/page.tsx

/* eslint-disable @typescript-eslint/no-explicit-any */
import { getPostsAPI } from "@/services/postApi";
import EditPostClient from "./EditPostClient";

// Fungsi wajib untuk Static Site Generation (SSG) pada dynamic routes
export async function generateStaticParams() {
  const posts = await getPostsAPI();

  if (!posts || posts.length === 0) return [];
  
  return posts.map((post: any) => ({
    // Pastikan ini menggunakan 'id' jika API kamu mereturn ID dalam bentuk angka,
    // Jika tidak ada id, fallback ke slug.
    id: post.id ? post.id.toString() : post.slug.toString(), 
  }));
}

// Komponen Server yang me-render Client Component
export default function EditPostPage() {
  return <EditPostClient />;
}