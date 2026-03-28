import { Hero } from "@/components/sections/home/Hero";
import { Advantage } from "@/components/sections/home/Advantage";
import { WhyChooseUs } from "@/components/sections/home/WhyChooseUs";
import { AboutMission } from "@/components/sections/home/AboutMission";
import { Services } from "@/components/sections/home/Services";
import { RecentProjects } from "@/components/sections/home/RecentProjects";
import { Testimonials } from "@/components/sections/home/Testimonials";
import { Contact } from "@/components/sections/home/Contact"; // Import baru

export default function Home() {
  return (
    <>
      <Hero />
      <Advantage />
      <WhyChooseUs />
      <AboutMission />
      <Services />
      <RecentProjects />
      <Testimonials />
      <Contact /> 
    </>
  );
}