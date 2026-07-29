"use client";

import React from 'react';
import { Settings, Shield, HeadphonesIcon, LayoutDashboard, Sun, Zap, CheckCircle, HeartHandshake, Banknote } from 'lucide-react';
import { usePageContent } from '@/hooks/usePageContent';

export function WhyChooseUs() {
  const features = [
    {
      icon: <Sun className="w-8 h-8 text-primary" />,
      content: usePageContent('HOME_WHY_CHOOSE_1', { title: "Premium Quality Components", description: "Only Tier-1 solar panels, inverters, and accessories from trusted global manufacturers." })
    },
    {
      icon: <Settings className="w-8 h-8 text-primary" />,
      content: usePageContent('HOME_WHY_CHOOSE_2', { title: "Certified Installation Team", description: "Experienced engineers and certified technicians ensure safe and professional installation." })
    },
    {
      icon: <CheckCircle className="w-8 h-8 text-primary" />,
      content: usePageContent('HOME_WHY_CHOOSE_3', { title: "Customized Solar Design", description: "Every project is designed according to your roof, energy usage, and future requirements." })
    },
    {
      icon: <LayoutDashboard className="w-8 h-8 text-primary" />,
      content: usePageContent('HOME_WHY_CHOOSE_4', { title: "Smart Energy Monitoring", description: "Track live energy generation, electricity savings, and system health from your smartphone." })
    },
    {
      icon: <Zap className="w-8 h-8 text-primary" />,
      content: usePageContent('HOME_WHY_CHOOSE_5', { title: "Fast Installation", description: "Quick project execution with minimal disruption and complete quality assurance." })
    },
    {
      icon: <Banknote className="w-8 h-8 text-primary" />,
      content: usePageContent('HOME_WHY_CHOOSE_6', { title: "Govt. Subsidy Assistance", description: "Complete support for subsidy applications, approvals, and net-metering documentation." })
    },
    {
      icon: <Shield className="w-8 h-8 text-primary" />,
      content: usePageContent('HOME_WHY_CHOOSE_7', { title: "Annual Maintenance", description: "Regular maintenance, system inspection, cleaning, and dedicated technical support." })
    },
    {
      icon: <HeartHandshake className="w-8 h-8 text-primary" />,
      content: usePageContent('HOME_WHY_CHOOSE_8', { title: "Lifetime Relationship", description: "Our commitment continues long after installation with responsive service and expert guidance." })
    }
  ];

  return (
    <section className="py-12 px-4 sm:px-4 lg:px-6 bg-gray-50 relative overflow-hidden">
      {/* Decorative background element */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 -left-24 w-96 h-96 bg-brand-blue/5 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-12 sm:mb-8 max-w-4xl mx-auto">
          <div className="inline-block px-4 py-1.5 rounded-full bg-brand-blue/5 text-brand-blue font-semibold text-sm mb-4 border border-brand-blue/10">
            Our Advantage
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#0A192F] tracking-tight mb-6">
            Why Choose <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-orange-500">Enfinite Energy</span>?
          </h2>
          <p className="text-base sm:text-lg text-gray-600">
            Delivering intelligent solar solutions with advanced technology, certified professionals, and exceptional customer service.
          </p>
        </div>

        {/* Responsive grid: 1 col mobile → 2 col tablet → 4 col desktop */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group bg-[#0A192F] rounded-2xl p-6 shadow-lg hover:shadow-2xl hover:shadow-primary/20 hover:-translate-y-1.5 transition-all duration-300 border border-white/5 relative overflow-hidden"
            >
              {/* Subtle hover gradient background */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/0 to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

              <div className="relative z-10 w-14 h-14 rounded-xl bg-white/5 flex items-center justify-center mb-5 group-hover:bg-primary group-hover:scale-110 transition-all duration-300 shadow-inner">
                {React.cloneElement(feature.icon as React.ReactElement<{className?: string}>, { className: "w-7 h-7 text-primary group-hover:text-white transition-colors duration-300" })}
              </div>
              <h3 className="relative z-10 text-base sm:text-lg font-bold text-white mb-2">{feature.content.title}</h3>
              <p className="relative z-10 text-sm text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors">
                {feature.content.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
