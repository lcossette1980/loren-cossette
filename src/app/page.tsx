import { HeroSection } from "@/components/sections/home/HeroSection";
import { AboutTeaser } from "@/components/sections/home/AboutTeaser";
import { ImpactMetrics } from "@/components/sections/home/ImpactMetrics";
import { FeaturedProjects } from "@/components/sections/home/FeaturedProjects";
import { TechShowcase } from "@/components/sections/home/TechShowcase";
import { FooterCTA } from "@/components/sections/home/FooterCTA";

export default function Home() {
  return (
    <>
      <HeroSection />
      <AboutTeaser />
      <ImpactMetrics />
      <FeaturedProjects />
      <TechShowcase />
      <FooterCTA />
    </>
  );
}
