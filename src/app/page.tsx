import { Hero } from "@/components/sections/home/Hero";
import { Advantage } from "@/components/sections/home/Advantage";
import { WhyChooseUs } from "@/components/sections/home/WhyChooseUs";
import { AboutMission } from "@/components/sections/home/AboutMission";
import { Services } from "@/components/sections/services/Services";
import { RecentProjects } from "@/components/sections/home/RecentProjects";
import { Testimonials } from "@/components/sections/home/Testimonials";
import { Contact } from "@/components/sections/home/Contact";

// Import API Services
import { getServicesAPI, } from "@/services/serviceApi";
import { getAboutSettingsAPI } from "@/services/aboutApi";
import { getHeroSettingsAPI } from "@/services/heroApi";
import { getAdvantageSettingsAPI } from "@/services/advantageApi";
import { getServiceSettingsAPI } from "@/services/serviceSettingApi";
import { getProjectsAPI } from "@/services/projectApi";
import { getTestimonialsAPI } from "@/services/testimonialApi";
import { getContactSettingsAPI } from "@/services/contactSettingApi";

export default async function Home() {
  // 1. Ambil semua data secara parallel agar loading halaman cepat
  const [
    heroData,
    advantageData,
    services,
    serviceSettings, // Data statistik & header layanan
    aboutData,
    projects,
    testimonials,
    contactData
  ] = await Promise.all([
    getHeroSettingsAPI(),
    getAdvantageSettingsAPI(),
    getServicesAPI(),
    getServiceSettingsAPI(),
    getAboutSettingsAPI(),
    getProjectsAPI(),
    getTestimonialsAPI(),
    getContactSettingsAPI()
  ]);

  return (
    <>
      {/* 2. Distribusikan data ke masing-masing komponen */}
      <Hero data={heroData} />

      <Advantage data={advantageData} />

      <WhyChooseUs />

      <AboutMission data={aboutData} />

      {/* 3. Kirim services DAN settings ke komponen Services */}
      <Services services={services} settings={serviceSettings} />

      <RecentProjects projects={projects} />
      <Testimonials data={testimonials} />
      <Contact data={contactData} />
    </>
  );
}