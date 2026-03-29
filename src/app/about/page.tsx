import { CtaBanner } from "@/components/sections/about/CtaBanner";
import { Expertise } from "@/components/sections/about/Expertise";
import { Faq } from "@/components/sections/about/Faq";
import { PageHeader } from "@/components/sections/about/PageHeader";
import { Team } from "@/components/sections/about/Team";
import { AboutMission } from "@/components/sections/home/AboutMission";
import { getAboutSettingsAPI } from "@/services/aboutApi";
import { getFaqsAPI } from "@/services/faqApi"; // 1. Import fetch FAQ
import { getTeamsAPI } from "@/services/teamApi";

export const metadata = {
  title: "About Us | Saeboemi Studio",
  description: "Learn more about Saeboemi's mission, our expert team, and our construction experience.",
};

export default async function AboutPage() {
  // 2. Ambil data secara parallel (About Settings & FAQ)
  const [aboutData, faqs, teams] = await Promise.all([
    getAboutSettingsAPI(),
    getFaqsAPI(),
    getTeamsAPI()
  ]);

  return (
    <>
      <PageHeader 
        title="About Us"
        breadcrumbs={[
          { name: "HOME", href: "/" },
          { name: "ABOUT US", href: "/about" }
        ]}
        bgImage="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070&auto=format&fit=crop" 
      />
      
      <AboutMission data={aboutData} />
      
      <Team teams={teams} />;     
      <Expertise />   
      <CtaBanner /> 

      <Faq faqs={faqs} />
    </>
  );
}