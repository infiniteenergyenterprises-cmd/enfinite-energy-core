"use client";
import { ArrowRight, Home, Building2, Factory, Sun, Zap } from 'lucide-react';
import Link from 'next/link';
import { usePageContent, PageContentData } from '@/hooks/usePageContent';

export function SolutionCard({ 
  cardKey, 
  fallback, 
  icon, 
  slug 
}: { 
  cardKey: string, 
  fallback: PageContentData, 
  icon: React.ReactNode, 
  slug: string 
}) {
  const content = usePageContent(cardKey, fallback);
  
  return (
    <div className="flex-shrink-0 flex flex-col bg-white rounded-xl overflow-visible shadow-[0_2px_15px_rgba(0,0,0,0.06)] border border-gray-100 hover:shadow-xl transition-shadow w-[78vw] sm:w-auto snap-center">
      <div className="relative h-44 sm:h-48 rounded-t-xl overflow-hidden">
        <img
          src={content.imageUrl}
          alt={content.title}
          className="w-full h-full object-cover rounded-t-xl"
        />
        <div className="absolute -bottom-6 left-6 z-10 w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-[0_4px_10px_rgba(0,0,0,0.1)] text-amber-500">
          {icon}
        </div>
      </div>

      <div className="pt-10 px-5 sm:px-6 pb-6 flex-1 flex flex-col rounded-b-xl">
        <h3 className="font-bold text-base sm:text-lg text-[#0A192F] mb-3">
          {content.title}
        </h3>
        <p className="text-xs sm:text-[13.5px] text-gray-500 mb-6 leading-relaxed flex-1">
          {content.description}
        </p>
        <Link href={slug} className="mt-auto text-primary font-bold flex items-center gap-1.5 text-[13px] hover:text-orange-600 transition-colors">
          View Solutions
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
}

export function SolutionsGrid() {
  const contentHeader = usePageContent('SOL_GRID', {
    title: 'Smart Solutions For Every Need',
    description: 'Customized solar solutions for residential, commercial and industrial needs.'
  });
  const solutions = [
    {
      key: 'SOL_CARD_RESIDENTIAL',
      icon: <Home className="w-5 h-5" />,
      slug: "/solutions/residential",
      fallback: {
        imageUrl: "https://images.unsplash.com/photo-1611365892117-00ac5ef43c90?q=80&w=800",
        title: "Residential Solar",
        description: "Power your home and reduce electricity bills with rooftop solar."
      }
    },
    {
      key: 'SOL_CARD_COMMERCIAL',
      icon: <Building2 className="w-5 h-5" />,
      slug: "/solutions/commercial",
      fallback: {
        imageUrl: "https://images.unsplash.com/photo-1592833159155-c62df1b65634?q=80&w=800",
        title: "Commercial Solar",
        description: "Smart energy solutions for offices, shops and commercial spaces."
      }
    },
    {
      key: 'SOL_CARD_INDUSTRIAL',
      icon: <Factory className="w-5 h-5" />,
      slug: "/solutions/industrial",
      fallback: {
        imageUrl: "https://images.unsplash.com/photo-1521618755572-156ae0cdd74d?q=80&w=800",
        title: "Industrial Solar",
        description: "High-capacity systems for factories and large-scale operations."
      }
    },
    {
      key: 'SOL_CARD_AGRICULTURE',
      icon: <Sun className="w-5 h-5" />,
      slug: "/solutions/agriculture",
      fallback: {
        imageUrl: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=800",
        title: "Agriculture Solar",
        description: "Solar water pumps and irrigation solutions for Indian farmers."
      }
    },
    {
      key: 'SOL_CARD_EV',
      icon: <Zap className="w-5 h-5" />,
      slug: "/solutions/ev-charging",
      fallback: {
        imageUrl: "https://images.unsplash.com/photo-1593941707882-a5bba14938c7?q=80&w=800",
        title: "EV Charging",
        description: "Sustainable EV charging solutions for a green and clean future."
      }
    }
  ];

  return (
    <section className="py-8 px-4 sm:px-4 lg:px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <div className="text-primary font-bold text-[13px] uppercase tracking-wider mb-3">
            OUR SOLAR SOLUTIONS
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#0A192F] mb-4">
            {contentHeader.title}
          </h2>
          <p className="text-sm sm:text-[15px] text-gray-500 max-w-2xl mx-auto">
            {contentHeader.description}
          </p>
        </div>

        {/* Mobile: horizontal scroll | Tablet+: grid */}
        <div className="flex sm:grid sm:grid-cols-2 lg:grid-cols-5 overflow-x-auto sm:overflow-x-visible pb-6 sm:pb-0 gap-5 sm:gap-6 snap-x snap-mandatory sm:snap-none -mx-4 px-4 sm:mx-0 sm:px-0 scrollbar-none">
          {solutions.map((solution) => (
            <SolutionCard 
              key={solution.key}
              cardKey={solution.key}
              fallback={solution.fallback}
              icon={solution.icon}
              slug={solution.slug}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
