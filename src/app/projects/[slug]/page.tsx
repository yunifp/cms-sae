import { PageHeader } from "@/components/sections/about/PageHeader";
import { ProjectDetailBody } from "@/components/sections/projects/ProjectDetailBody";
import { notFound } from "next/navigation";

// 1. MOCK DATABASE (Data Sementara sebelum ada DB Asli)
const DUMMY_PROJECTS = [
  {
    slug: "luxury-home", // Ini yang dicocokkan dengan URL
    title: "Luxury Home Mountain View Estate",
  },
  {
    slug: "urban-oasis",
    title: "Urban Oasis Renovation",
  }
];

// 2. SIMULASI FETCH API
async function getProject(slug: string) {
  const project = DUMMY_PROJECTS.find((p) => p.slug === slug);
  return project || null;
}

export const metadata = {
  title: "Project Details | Kombong",
  description: "Detailed view of Kombong's construction and renovation projects.",
};

// 3. MAIN PAGE COMPONENT
export default async function ProjectDetailPage({ 
  params 
}: { 
  params: Promise<{ slug: string }> 
}) {
  const resolvedParams = await params;
  const projectSlug = resolvedParams.slug;
  
  // Panggil "API" kita
  const projectData = await getProject(projectSlug);

  // Jika URL ngawur (slug tidak ada di database), lemparkan ke halaman 404
  if (!projectData) {
    notFound();
  }

  return (
    <>
      <PageHeader 
        title="Project Details"
        breadcrumbs={[
          { name: "HOME", href: "/" },
          { name: "PROJECTS", href: "/projects" },
          { name: projectData.title.toUpperCase(), href: "#" } 
        ]}
        bgImage="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=2070&auto=format&fit=crop" 
      />
      
      <ProjectDetailBody />
    </>
  );
}