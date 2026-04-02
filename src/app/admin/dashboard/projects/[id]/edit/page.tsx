// src/app/admin/dashboard/projects/[id]/edit/page.tsx

/* eslint-disable @typescript-eslint/no-explicit-any */
import { getProjectsAPI } from "@/services/projectApi";
import EditProjectClient from "./EditProjectClient";

// Wajib untuk Static Site Generation (SSG) pada dynamic route
export async function generateStaticParams() {
  const projects = await getProjectsAPI();

  if (!projects || projects.length === 0) return [];
  
  return projects.map((project: any) => ({
    // Pastikan ini dikonversi menjadi string, sesuai dengan kebutuhan Next.js params
    id: project.id.toString(), 
  }));
}

export default function EditProjectPage() {
  return <EditProjectClient />;
}