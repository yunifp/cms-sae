/* eslint-disable @typescript-eslint/no-explicit-any */
import { PageHeader } from "@/components/sections/about/PageHeader";
import { ProjectDetailBody } from "@/components/sections/projects/ProjectDetailBody";
import { notFound } from "next/navigation";
import { getProjectByIdAPI } from "@/services/projectApi";

export const metadata = {
  title: "Project Details | Saeboemi Studio",
  description: "Detailed view of Saeboemi Studio's construction and renovation projects.",
};

export default async function ProjectDetailPage({ 
  params 
}: { 
  params: Promise<{ id: string }> 
}) {
  const resolvedParams = await params;
  const projectId = resolvedParams.id;
  
  if (!projectId) return notFound();

  const projectData = await getProjectByIdAPI(projectId);

  if (!projectData) {
    notFound();
  }

  // Cari gambar dengan tipe 'thumbnail' dari data proyek
  // Jika tidak ada, biarkan PageHeader menggunakan fallback Unsplash-nya
  const headerImage = projectData.images?.find((img: any) => img.type === 'thumbnail')?.url;

  return (
    <>
      <PageHeader 
        title={projectData.title} // Gunakan judul proyek asli
        breadcrumbs={[
          { name: "HOME", href: "/" },
          { name: "PROJECTS", href: "/projects" },
          { name: projectData.title.toUpperCase(), href: "#" } 
        ]}
        // Kirim path gambar dari DB (PageHeader akan otomatis gabung dengan BASE_URL)
        bgImage={headerImage} 
      />
      
      <ProjectDetailBody project={projectData} />
    </>
  );
}