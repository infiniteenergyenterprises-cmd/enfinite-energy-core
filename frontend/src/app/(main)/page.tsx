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
import { UpcomingEvents } from "@/components/sections/UpcomingEvents";
import { CallToAction } from "@/components/sections/CallToAction";
import { ProjectGallery } from "@/components/sections/ProjectGallery";
import { SuryaGharScheme } from "@/components/sections/SuryaGharScheme";
import { ActiveLocations } from "@/components/sections/ActiveLocations";
import { VideoBlog } from "@/components/sections/VideoBlog";
import { MarketUpdateWidget } from "@/components/news/MarketUpdateWidget";

import { PageContentProvider } from "@/components/utils/ContentProvider";

export default async function Home() {
  let initialData = {};
  try {
    const res = await fetch((process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api') + '/content', { cache: 'no-store' });
    if (res.ok) {
      const data = await res.json();
      initialData = data.map || {};
    }
  } catch (err) {}

  return (
    <PageContentProvider initialData={initialData}>
      <div className="flex flex-col bg-white">
        <HeroSection />
        <StatsBar />
        <SuryaGharScheme />
        <ActiveLocations />
        <WhyChooseUs />
        <ProcessSteps />
        <SolutionsGrid />
        <AgricultureSolar />
        <FeaturedProjects />
        <VideoBlog />
        <ProjectGallery limit={2} />
        <SavingsCalculator />
        {/* Upcoming Events — above Testimonials */}
        <UpcomingEvents />
        <Testimonials />
        {/* Solar Market Update — above News section */}
        <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8">
          <MarketUpdateWidget />
        </div>
        {/* Latest News & Events */}
        <NewsAndEvents />
        <CallToAction />
      </div>
    </PageContentProvider>
  );
}
