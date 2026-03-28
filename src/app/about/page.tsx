import { CtaBanner } from "@/components/sections/about/CtaBanner";
import { Expertise } from "@/components/sections/about/Expertise";
import { Faq } from "@/components/sections/about/Faq";
import { PageHeader } from "@/components/sections/about/PageHeader";
import { Team } from "@/components/sections/about/Team";
import { AboutMission } from "@/components/sections/home/AboutMission";


export const metadata = {
  title: "About Us | Kombong - Home Builder Contractor",
  description: "Learn more about Kombong's mission, our expert team, and our construction experience.",
};

export default function AboutPage() {
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
      <AboutMission />
      <Team />        
      <Expertise />   
      <CtaBanner /> 
      <Faq />
    </>
  );
}