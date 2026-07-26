"use client";

import React from 'react';
import { notFound } from 'next/navigation';
import { ArrowRight, ArrowDown, CheckCircle2, Zap, Sun, Check } from 'lucide-react';
import { useLeadModal } from '@/context/LeadModalContext';
import { use } from 'react';

// Data dictionary for solutions
const solutionsData = {
  'residential': {
    title: 'Residential Solar Workflow',
    formType: 'Residential Solar',
    subtitle: 'Power your home with clean energy and reduce electricity bills significantly.',
    image: 'https://images.unsplash.com/photo-1613665813446-82a78c468a1d?w=1600&q=80',
    description: 'Transform your home into a sustainable powerhouse. Our residential solar rooftop systems are designed to seamlessly integrate with your home architecture while maximizing energy generation.',
    benefits: ['Up to 90% reduction in electricity bills', 'Protection against rising energy costs', 'Increased property value', 'Clean, renewable energy for a greener tomorrow'],
    workflow: [
      { title: 'Consultation', desc: 'We assess your energy needs.' },
      { title: 'Custom Design', desc: 'Engineered for your home.' },
      { title: 'Installation', desc: 'Quick & safe deployment.' },
      { title: 'Savings', desc: 'Connect to grid & save.' }
    ]
  },
  'commercial': {
    title: 'Commercial Solar Workflow',
    formType: 'Commercial Solar',
    subtitle: 'Smart energy solutions for offices, shops, malls, and commercial spaces.',
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=1600&q=80',
    description: 'Businesses consume high amounts of energy during the day. Our commercial solar solutions allow you to generate your own electricity, drastically lowering operational costs and improving your bottom line.',
    benefits: ['Significant reduction in operational expenses', 'High Return on Investment (ROI)', 'Tax benefits and accelerated depreciation', 'Enhanced brand image through sustainability'],
    workflow: [
      { title: 'Energy Audit', desc: 'Analysis of consumption.' },
      { title: 'Engineering', desc: 'High-capacity design.' },
      { title: 'Execution', desc: 'No business disruption.' },
      { title: 'Maintenance', desc: '24/7 performance tracking.' }
    ]
  },
  'industrial': {
    title: 'Industrial Solar Workflow',
    formType: 'Industrial Solar',
    subtitle: 'High-capacity systems designed for factories and large-scale manufacturing.',
    image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=1600&q=80',
    description: 'Industries require robust, heavy-duty energy solutions. We build massive, highly efficient solar power plants that can sustain heavy machinery and reduce grid dependency.',
    benefits: ['Massive savings on high-tariff industrial electricity', 'Reliable power for uninterrupted manufacturing', 'Hedge against future tariff hikes', 'Fulfill corporate sustainability goals (CSR)'],
    workflow: [
      { title: 'Feasibility', desc: 'Structural & shadow analysis.' },
      { title: 'Modeling', desc: 'Detailed ROI calculations.' },
      { title: 'Installation', desc: 'Heavy-duty structures.' },
      { title: 'Handover', desc: 'Testing & synchronization.' }
    ]
  },
  'agriculture': {
    title: 'Agriculture Solar Workflow',
    formType: 'Agriculture Solar',
    subtitle: 'Solar water pumps and off-grid irrigation solutions for farmers.',
    image: 'https://images.unsplash.com/photo-1592982537447-7440770cbfc9?w=1600&q=80',
    description: 'Empowering farmers with reliable solar water pumps. Run heavy tubewells completely free of grid electricity and expensive diesel generators.',
    benefits: ['Zero electricity bills for irrigation', 'Eliminate expensive diesel costs', 'Reliable water supply during daytime', 'Government subsidies available'],
    workflow: [
      { title: 'Assessment', desc: 'Water table & requirement.' },
      { title: 'Selection', desc: 'Choosing right pump capacity.' },
      { title: 'Deployment', desc: 'Quick farm installation.' },
      { title: 'Testing', desc: 'Maximum water discharge.' }
    ]
  },
  'ev-charging': {
    title: 'EV Charging Workflow',
    formType: 'EV Charging Stations',
    subtitle: 'Sustainable EV charging infrastructure powered by solar energy.',
    image: 'https://images.unsplash.com/photo-1593941707882-a5bba14938c7?w=1600&q=80',
    description: 'The future of transportation is electric. We integrate solar power with EV charging stations to provide 100% clean, emission-free charging for homes and commercial parking lots.',
    benefits: ['Charge vehicles using free solar energy', 'Attract customers to your commercial space', 'Future-proof infrastructure', 'Zero carbon footprint from source to wheel'],
    workflow: [
      { title: 'Gathering', desc: 'Determine charger types.' },
      { title: 'Integration', desc: 'Solar canopy design.' },
      { title: 'Safety', desc: 'Strict electrical standards.' },
      { title: 'Network', desc: 'Software & billing setup.' }
    ]
  }
};

export default function SolutionDetail({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = use(params);
  const slug = resolvedParams.slug;
  const { openModal } = useLeadModal();

  // Validate slug
  const solution = solutionsData[slug as keyof typeof solutionsData];

  if (!solution) {
    notFound();
  }

  return (
    <div className="bg-[#0A192F] min-h-screen pt-28">
      <style>{`
        @keyframes slideRight {
          0% { transform: translateX(0); opacity: 0.3; }
          50% { transform: translateX(12px); opacity: 1; }
          100% { transform: translateX(0); opacity: 0.3; }
        }
        .animate-slide-right {
          animation: slideRight 1.5s infinite ease-in-out;
        }
        @keyframes slideDown {
          0% { transform: translateY(0); opacity: 0.3; }
          50% { transform: translateY(12px); opacity: 1; }
          100% { transform: translateY(0); opacity: 0.3; }
        }
        .animate-slide-down {
          animation: slideDown 1.5s infinite ease-in-out;
        }
      `}</style>

      {/* 1. Header (No Image Hero) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-16">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-900/30 border border-amber-500/30 text-amber-400 font-bold text-xs uppercase tracking-wider mb-4">
          <Zap className="w-4 h-4" />
          <span>Proven Process</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-4">
          {solution.title}
        </h1>
        <p className="text-lg text-gray-300 max-w-2xl mx-auto">
          {solution.subtitle}
        </p>
      </div>

      {/* 2. Animated Workflow Section */}
      <section className="py-12 bg-[#0A192F] border-b border-[#112240]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-0 relative">
            
            {solution.workflow.map((step, idx) => (
              <React.Fragment key={idx}>
                {/* Step Card */}
                <div className="relative z-10 flex flex-col items-center text-center w-full lg:w-1/4 bg-[#112240] p-6 rounded-2xl shadow-xl border border-white/5 hover:border-amber-500/50 hover:-translate-y-1 transition-all duration-300 group">
                  <div className="w-16 h-16 rounded-full bg-amber-500 flex items-center justify-center mb-4 text-2xl font-black text-white shadow-[0_0_15px_rgba(249,115,22,0.4)] group-hover:scale-110 transition-transform">
                    {idx + 1}
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">{step.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">{step.desc}</p>
                </div>

                {/* Animated Arrow (Desktop -> Right, Mobile -> Down) */}
                {idx < solution.workflow.length - 1 && (
                  <div className="flex justify-center items-center lg:w-16">
                    {/* Desktop Arrow */}
                    <ArrowRight className="hidden lg:block w-8 h-8 text-amber-500 animate-slide-right" />
                    {/* Mobile Arrow */}
                    <ArrowDown className="block lg:hidden w-8 h-8 text-amber-500 animate-slide-down my-2" />
                  </div>
                )}
              </React.Fragment>
            ))}
            
          </div>
        </div>
      </section>

      {/* 3. Details & Form */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto bg-white rounded-t-3xl mt-4 relative z-10">
        <div className="flex flex-col lg:flex-row gap-12 items-center">
          
          {/* Left Side: Image with Decorative Elements */}
          <div className="lg:w-1/2 relative group">
            <div className="absolute -inset-4 bg-gradient-to-r from-amber-500/10 to-amber-500/10 rounded-[2rem] blur-xl group-hover:blur-2xl transition-all duration-500 opacity-70"></div>
            <img src={solution.image} alt={solution.title} className="relative w-full h-auto object-cover rounded-[2rem] shadow-2xl z-10" />
            
            {/* Floating Badge */}
            <div className="absolute -bottom-4 -right-4 z-20 bg-white p-2.5 rounded-xl shadow-xl flex items-center gap-3 border border-gray-100 animate-bounce" style={{ animationDuration: '3s' }}>
              <div className="w-8 h-8 bg-amber-50 rounded-full flex items-center justify-center">
                <CheckCircle2 className="w-4 h-4 text-amber-500" />
              </div>
              <div>
                <p className="text-[10px] text-gray-500 font-bold uppercase tracking-wider leading-none">Quality Assured</p>
                <p className="text-[#0A192F] font-black text-sm leading-tight mt-0.5">100% Premium</p>
              </div>
            </div>
          </div>

          {/* Right Side: Content */}
          <div className="lg:w-1/2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-600 font-bold text-[11px] uppercase tracking-wider mb-4 border border-blue-100">
              Why Choose Us
            </div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-[#0A192F] mb-6 leading-tight">
              Transform Your Space with <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-yellow-600">Smart Energy</span>
            </h2>
            <p className="text-gray-600 text-[17px] leading-relaxed mb-8">
              {solution.description}
            </p>
            
            <div className="relative mb-12">
              {/* Vibrant background orbs for glassmorphism */}
              <div className="absolute top-0 left-0 w-32 h-32 bg-amber-400/30 rounded-full blur-3xl"></div>
              <div className="absolute bottom-0 right-0 w-32 h-32 bg-amber-500/20 rounded-full blur-3xl"></div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 relative z-10">
                {solution.benefits.map((benefit, idx) => (
                  <div key={idx} className="flex items-start gap-3 bg-[#0A192F]/90 backdrop-blur-xl p-5 rounded-2xl border border-white/20 hover:border-amber-400/50 shadow-xl hover:shadow-[0_8px_30px_rgba(249,115,22,0.3)] hover:-translate-y-1 transition-all duration-300 group">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center shrink-0 mt-0 shadow-[0_0_15px_rgba(249,115,22,0.5)] group-hover:scale-110 transition-transform">
                      <Check className="w-5 h-5 text-white" />
                    </div>
                    <span className="text-white font-bold text-[14px] leading-snug pt-1">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 4. Final Full-Width CTA */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto bg-gradient-to-br from-[#0A192F] to-[#112240] rounded-[2rem] p-10 md:p-16 shadow-2xl relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-10 border border-white/10">
          {/* Decorative circles */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/3"></div>
          
          <div className="relative z-10 md:w-2/3 text-center md:text-left">
            <h3 className="text-3xl md:text-4xl font-extrabold text-white mb-4">Ready to Get Started?</h3>
            <p className="text-gray-300 text-lg leading-relaxed">
              Take the first step towards a sustainable future. Fill out the form and our experts will contact you with a customized plan.
            </p>
          </div>
          
          <div className="relative z-10 md:w-1/3 flex justify-center md:justify-end">
            <button 
              onClick={() => openModal(solution.formType)}
              className="bg-amber-500 hover:bg-amber-400 text-white font-bold py-4 px-8 rounded-full transition-all shadow-[0_0_20px_rgba(249,115,22,0.4)] flex items-center justify-center gap-2 hover:-translate-y-1 whitespace-nowrap"
            >
              Get Your Free Quote
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
