import React from 'react';
import { ArrowRight, MapPin } from 'lucide-react';
import Link from 'next/link';

export interface ProjectType {
  image: string;
  tag: string;
  title: string;
  location: string;
  capacity: string;
  savings: string;
}

interface FeaturedProjectsProps {
  projects?: ProjectType[];
}

export function FeaturedProjects({ projects: propProjects }: FeaturedProjectsProps) {
  const defaultProjects: ProjectType[] = [
    {
      image: "https://images.unsplash.com/photo-1611365892117-00ac5ef43c90?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      tag: "RESIDENTIAL",
      title: "10kW Rooftop Project",
      location: "Lucknow, Uttar Pradesh",
      capacity: "10 kW",
      savings: "₹1.2 Lakh"
    },
    {
      image: "https://images.unsplash.com/photo-1592833159155-c62df1b65634?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      tag: "COMMERCIAL",
      title: "50kW Commercial Project",
      location: "Noida, Uttar Pradesh",
      capacity: "50 kW",
      savings: "₹6.5 Lakh"
    },
    {
      image: "https://images.unsplash.com/photo-1521618755572-156ae0cdd74d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      tag: "INDUSTRIAL",
      title: "500kW Industrial Project",
      location: "Pune, Maharashtra",
      capacity: "500 kW",
      savings: "₹45 Lakh"
    },
    {
      image: "https://images.unsplash.com/photo-1613665813446-82a78c468a1d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      tag: "GOVT. PROJECT",
      title: "1MW Govt. Project",
      location: "Rajasthan",
      capacity: "1 MW",
      savings: "₹98 Lakh"
    }
  ];

  const projects = propProjects || defaultProjects;

  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8 bg-gray-50/50">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-[#0A192F] mb-4">
              Featured Projects
            </h2>
            <p className="text-lg text-gray-500 max-w-2xl">
              Delivering high-efficiency solar solutions across homes, businesses, and industries.
            </p>
          </div>
          <Link href="/our-work" className="group flex items-center gap-2 text-primary font-bold hover:text-orange-600 transition-colors">
            View all projects
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {projects.map((project, index) => (
            <div 
              key={index} 
              className="group bg-white rounded-2xl overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.05)] hover:shadow-[0_10px_30px_rgba(0,0,0,0.1)] transition-all duration-300 flex flex-col border border-gray-100"
            >
              <div className="h-[220px] relative overflow-hidden">
                <img 
                  src={project.image} 
                  alt={project.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out" 
                />
                <div className="absolute top-4 left-4 bg-primary text-white text-xs font-bold px-3 py-1.5 rounded shadow-sm tracking-wider">
                  {project.tag}
                </div>
              </div>
              
              <div className="p-6 flex flex-col flex-1">
                <h3 className="font-bold text-lg text-[#0A192F] mb-2 line-clamp-1">{project.title}</h3>
                
                <div className="flex items-center gap-1.5 text-gray-500 text-sm mb-6">
                  <MapPin className="w-4 h-4 text-gray-400" />
                  <span className="line-clamp-1">{project.location}</span>
                </div>
                
                <div className="mt-auto grid grid-cols-2 gap-4 pt-4 border-t border-gray-100">
                  <div>
                    <div className="text-[11px] text-gray-400 font-semibold uppercase tracking-wider mb-1">Capacity</div>
                    <div className="font-bold text-[#0A192F]">{project.capacity}</div>
                  </div>
                  <div>
                    <div className="text-[11px] text-gray-400 font-semibold uppercase tracking-wider mb-1">Annual Savings</div>
                    <div className="font-bold text-green-600">{project.savings}</div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
