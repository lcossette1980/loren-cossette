import { HeroSection } from "@/components/sections/home/HeroSection";
import { RoutingLanes } from "@/components/sections/home/RoutingLanes";
import { ImpactMetrics } from "@/components/sections/home/ImpactMetrics";
import { EngagementModes } from "@/components/sections/home/EngagementModes";
import { FeaturedProjects } from "@/components/sections/home/FeaturedProjects";
import { ActivityFeed } from "@/components/sections/home/ActivityFeed";
import { AboutTeaser } from "@/components/sections/home/AboutTeaser";
import { TechShowcase } from "@/components/sections/home/TechShowcase";
import { IndependentValidation } from "@/components/sections/home/IndependentValidation";
import { FooterCTA } from "@/components/sections/home/FooterCTA";
import { getActivity } from "@/data/activity";

// Re-fetch the Multco activity feed every hour
export const revalidate = 3600;

export default async function Home() {
  const activityEntries = await getActivity();

  return (
    <>
      <HeroSection />
      <RoutingLanes />
      <FeaturedProjects />
      <ActivityFeed entries={activityEntries} limit={6} />
      <ImpactMetrics />
      <IndependentValidation />
      <EngagementModes />
      <AboutTeaser />
      <TechShowcase />
      <FooterCTA />
    </>
  );
}
