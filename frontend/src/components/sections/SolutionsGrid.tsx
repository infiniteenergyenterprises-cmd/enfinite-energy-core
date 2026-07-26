import React from 'react';
import { ArrowRight, Home, Building2, Factory, LayoutGrid } from 'lucide-react';
import Link from 'next/link';

export function SolutionsGrid() {
  const solutions = [
    {
      icon: <Home className="w-5 h-5 text-primary" />,
      image: "https://images.unsplash.com/photo-1611365892117-00ac5ef43c90?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      title: "Residential Solar",
      slug: "/solutions/residential",
      description: "Reduce electricity bills and increase savings with premium rooftop solar systems. Enjoy uninterrupted power supply and contribute to a greener environment while significantly cutting down your monthly energy costs.",
      isList: false
    },
    {
      icon: <Building2 className="w-5 h-5 text-primary" />,
      image: "https://images.unsplash.com/photo-1592833159155-c62df1b65634?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      title: "Commercial Solar",
      slug: "/solutions/commercial",
      description: "Sustainable energy solutions for offices, malls, and schools. We help businesses lower operational expenses and achieve their sustainability goals with high-efficiency commercial solar plants tailored to your needs.",
      isList: false
    },
    {
      icon: <Factory className="w-5 h-5 text-primary" />,
      image: "https://images.unsplash.com/photo-1521618755572-156ae0cdd74d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      title: "Industrial Solar",
      slug: "/solutions/industrial",
      description: "High capacity solar systems designed specifically for factories and heavy industries. Maximize your ROI with robust solar installations that ensure reliable performance and massive long-term energy savings.",
      isList: false
    },
    {
      icon: <LayoutGrid className="w-5 h-5 text-primary" />,
      image: "https://images.unsplash.com/photo-1613665813446-82a78c468a1d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      title: "Our Services",
      slug: "/solutions",
      features: ["Installation & Commissioning", "Battery Storage Solutions", "EV Charging Stations", "Subsidy Documentation", "AMC & Maintenance"],
      isList: true
    }
  ];

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <div className="text-primary font-bold text-[13px] uppercase tracking-wider mb-3">
            OUR SOLAR SOLUTIONS
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-[#0A192F] mb-4">
            Smart Solutions For Every Need
          </h2>
          <p className="text-[15px] text-gray-500 max-w-2xl mx-auto">
            Customized solar solutions for residential, commercial and industrial needs.
          </p>
        </div>

        <div className="flex md:grid md:grid-cols-2 lg:grid-cols-4 overflow-x-auto md:overflow-x-visible pb-6 md:pb-0 gap-6 snap-x snap-mandatory -mx-4 px-4 sm:mx-0 sm:px-0 scrollbar-none">
          {solutions.map((solution, index) => (
            <div key={index} className="flex-shrink-0 flex flex-col bg-white rounded-xl overflow-visible shadow-[0_2px_15px_rgba(0,0,0,0.06)] border border-gray-100 hover:shadow-xl transition-shadow w-[80vw] sm:w-[310px] md:w-auto shrink-0 snap-center">
              
              {/* Image Section */}
              <div className="relative h-48 rounded-t-xl overflow-visible">
                <img 
                  src={solution.image} 
                  alt={solution.title} 
                  className="w-full h-full object-cover rounded-t-xl" 
                />
                <div className="absolute -bottom-6 left-6 z-10 w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-[0_4px_10px_rgba(0,0,0,0.1)]">
                  {solution.icon}
                </div>
              </div>

              {/* Content Section */}
              <div className="pt-10 px-6 pb-6 flex-1 flex flex-col rounded-b-xl">
                <h3 className="font-bold text-lg text-[#0A192F] mb-3">
                  {solution.title}
                </h3>
                
                {solution.isList ? (
                  <ul className="mb-6 space-y-2.5 flex-1 pl-1">
                    {solution.features?.map((feature, i) => (
                      <li key={i} className="flex items-center gap-2.5 text-[13px] text-gray-600">
                        <div className="w-1 h-1 rounded-full bg-gray-400 shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-[13.5px] text-gray-500 mb-6 leading-relaxed flex-1">
                    {solution.description}
                  </p>
                )}
                
                <Link href={solution.slug} className="mt-auto text-primary font-bold flex items-center gap-1.5 text-[13px] hover:text-orange-600 transition-colors">
                  Learn More
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>

            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
