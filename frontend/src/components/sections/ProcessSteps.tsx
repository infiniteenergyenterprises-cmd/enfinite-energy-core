import React from 'react';
import { ClipboardCheck, PenTool, CheckCircle, PenTool as Wrench, Wrench as Tool } from 'lucide-react';

export function ProcessSteps() {
  const steps = [
    {
      step: "Step 01",
      title: "Free Site Survey",
      desc: "We visit your site and analyze your energy needs",
      icon: <ClipboardCheck className="w-8 h-8 text-primary" />
    },
    {
      step: "Step 02",
      title: "Custom Design",
      desc: "We design a customized solar solution for you",
      icon: <PenTool className="w-8 h-8 text-primary" />
    },
    {
      step: "Step 03",
      title: "Approvals & Subsidy",
      desc: "We handle all approvals & subsidy documentation",
      icon: <CheckCircle className="w-8 h-8 text-primary" />
    },
    {
      step: "Step 04",
      title: "Installation",
      desc: "Professional installation by expert team",
      icon: <Wrench className="w-8 h-8 text-primary" />
    },
    {
      step: "Step 05",
      title: "Maintenance",
      desc: "Regular monitoring & maintenance support",
      icon: <Tool className="w-8 h-8 text-primary" />
    }
  ];

  return (
    <section className="py-12 px-8 bg-gray-50 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-brand-blue mb-2">Our Simple 5 Step Process</h2>
          <p className="text-gray-500">From consultation to clean energy - we make it easy!</p>
        </div>

        <div className="relative">
          {/* Connecting Line */}
          <div className="absolute top-5 sm:top-12 left-0 right-0 h-0.5 bg-gray-200 border-t border-dashed border-gray-300"></div>
          
          <div className="grid grid-cols-5 gap-1 sm:gap-8 relative z-10">
            {steps.map((item, index) => (
              <div key={index} className="group flex flex-col items-center text-center">
                <div className="w-10 h-10 sm:w-24 sm:h-24 rounded-full bg-[#0A192F] border-2 sm:border-4 border-white shadow-md flex flex-col items-center justify-center mb-2 sm:mb-6 relative group-hover:-translate-y-1 sm:group-hover:-translate-y-2 group-hover:shadow-xl group-hover:shadow-primary/20 group-hover:border-primary/20 transition-all duration-300">
                  {React.cloneElement(item.icon, { className: "w-4 h-4 sm:w-8 sm:h-8 text-primary group-hover:text-white transition-colors duration-300" })}
                </div>
                <div className="text-primary font-bold text-[7px] sm:text-xs mb-0.5 sm:mb-1 uppercase tracking-wider">{item.step}</div>
                <h3 className="font-bold text-brand-blue text-[8px] sm:text-sm mb-1 sm:mb-2 leading-none">{item.title}</h3>
                <p className="text-[6.5px] sm:text-xs text-gray-500 px-0.5 leading-tight line-clamp-2 sm:line-clamp-none">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
