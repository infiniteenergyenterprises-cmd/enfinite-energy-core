import { HeroSection } from "@/components/sections/HeroSection";
import { StatsBar } from "@/components/sections/StatsBar";
import { WhyChooseUs } from "@/components/sections/WhyChooseUs";
import { ProcessSteps } from "@/components/sections/ProcessSteps";
import { SolutionsGrid } from "@/components/sections/SolutionsGrid";
import { AgricultureSolar } from "@/components/sections/AgricultureSolar";
import { FeaturedProjects } from "@/components/sections/FeaturedProjects";
import { SavingsCalculator } from "@/components/sections/SavingsCalculator";
import { Testimonials } from "@/components/sections/Testimonials";
import { NewsAndEvents } from "@/components/sections/NewsAndEvents";
import { CallToAction } from "@/components/sections/CallToAction";
import { ProjectGallery } from "@/components/sections/ProjectGallery";

export default function Home() {
  return (
    <div className="flex flex-col bg-white">
      <HeroSection />
      <StatsBar />
      <WhyChooseUs />
      <ProcessSteps />
      <SolutionsGrid />
      <AgricultureSolar />
      <FeaturedProjects />
      <ProjectGallery limit={2} />
      <SavingsCalculator />
      <Testimonials />
      <NewsAndEvents />
    </div>
  );
}
