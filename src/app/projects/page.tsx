import { PageHeader } from "@/components/sections/about/PageHeader";
import { Contact } from "@/components/sections/home/Contact";
import { ProjectShowcase } from "@/components/sections/projects/ProjectShowcase";

// Metadata SEO
export const metadata = {
  title: "Projects | Kombong - Home Builder Contractor",
  description: "Explore our latest construction and renovation projects.",
};

export default function ProjectsPage() {
  return (
    <>
      {/* Kita panggil ulang PageHeader, tinggal ganti isinya! */}
      <PageHeader 
        title="Projects"
        breadcrumbs={[
          { name: "HOME", href: "/" },
          { name: "PROJECTS", href: "/projects" }
        ]}
        // Gambar latar belakang atap kayu sesuai dengan desain
        bgImage="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=2070&auto=format&fit=crop" 
      />

      {/* Detail proyek yang baru saja kita buat */}
      <ProjectShowcase />
       <Contact/>
    </>
  );
}