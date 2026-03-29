import { PageHeader } from "@/components/sections/about/PageHeader";
import { Contact } from "@/components/sections/home/Contact";
import { ProjectShowcase } from "@/components/sections/projects/ProjectShowcase";
import { getContactSettingsAPI } from "@/services/contactSettingApi";
import { getProjectsAPI } from "@/services/projectApi"; // Ubah jalur import ke sini

export const metadata = {
  title: "Projects | Kombong - Home Builder Contractor",
  description: "Explore our latest construction and renovation projects.",
};

export default async function ProjectsPage() {
   const [
      projects,
      contactData
    ] = await Promise.all([
      getProjectsAPI(),
      getContactSettingsAPI()
    ]);
  return (
    <>
      <PageHeader 
        title="Projects"
        breadcrumbs={[
          { name: "HOME", href: "/" },
          { name: "PROJECTS", href: "/projects" }
        ]}
        bgImage="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=2070&auto=format&fit=crop" 
      />
      <ProjectShowcase projects={projects} />
      <Contact data={contactData} />
    </>
  );
}