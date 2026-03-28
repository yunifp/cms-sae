import { Faq } from "@/components/sections/about/Faq";
import { PageHeader } from "@/components/sections/about/PageHeader";
import { Services } from "@/components/sections/home/Services";
import { ProcessSection } from "@/components/sections/services/ProcessSection";
import { SoeBoemi } from "@/components/sections/services/SoeBoemi";
import { WhyChooseUs } from "@/components/sections/services/WhyChooseUs";

export const metadata = {
  title: "Services | Kombong - Home Builder Contractor",
  description: "Discover our comprehensive range of construction and renovation services.",
};

export default function ServicesPage() {
  return (
    <>
      <PageHeader 
        title="Services"
        breadcrumbs={[
          { name: "HOME", href: "/" },
          { name: "SERVICES", href: "/services" }
        ]}
        bgImage="https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=2071&auto=format&fit=crop" 
      />

      <SoeBoemi />
      <WhyChooseUs/>
      <Services/>
      <ProcessSection />
      <Faq/>
    </>
  );
}