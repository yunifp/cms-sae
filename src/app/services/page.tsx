import { Faq } from "@/components/sections/about/Faq";
import { PageHeader } from "@/components/sections/about/PageHeader";
import { Services } from "@/components/sections/services/Services";
import { ProcessSection } from "@/components/sections/services/ProcessSection";
import { SoeBoemi } from "@/components/sections/services/SoeBoemi";
import { WhyChooseUs } from "@/components/sections/services/WhyChooseUs";
import { getServicesAPI } from "@/services/serviceApi";
import { getFaqsAPI } from "@/services/faqApi"; // 1. Import fungsi fetch FAQ
import { getServiceSettingsAPI } from "@/services/serviceSettingApi";

export const metadata = {
  title: "Layanan | Saeboemi Studio",
  description: "Temukan berbagai layanan arsitektur dan konstruksi terbaik dari Saeboemi Studio.",
};

export default async function ServicesPage() {
  // 2. Ambil data secara parallel agar lebih efisien
  const [services, faqs, serviceSettings] = await Promise.all([
    getServicesAPI(),
    getFaqsAPI(),
    getServiceSettingsAPI()
  ]);

  return (
    <>
      <PageHeader 
        title="Layanan Kami"
        breadcrumbs={[
          { name: "BERANDA", href: "/" },
          { name: "LAYANAN", href: "/services" }
        ]}
        bgImage="https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=2071&auto=format&fit=crop" 
      />

      <SoeBoemi />
      <WhyChooseUs />
      <Services services={services} settings={serviceSettings} /> 
      <ProcessSection />
      <Faq faqs={faqs} />
    </>
  );
}