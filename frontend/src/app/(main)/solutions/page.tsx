"use client";

import React, { useState, useEffect } from 'react';
import { ArrowRight, CheckCircle2, Battery, Zap, Sun, Home, Settings, Shield, Wrench, Leaf, Monitor, X, Check, MapPin, Star } from 'lucide-react';
import { useLeadModal } from '@/context/LeadModalContext';
import Link from 'next/link';
import { usePageContent, PageContentData } from '@/hooks/usePageContent';

function ApplicationCard({ appDef, setSelectedApp }: any) {
  const content = usePageContent(appDef.key, appDef.fallback);
  const data = {
    img: content.imageUrl || appDef.fallback.img,
    title: content.title || appDef.fallback.title,
    desc: content.description || appDef.fallback.desc,
    features: appDef.fallback.features // Keep hardcoded features for now
  };
  return (
    <div onClick={() => setSelectedApp(data)} className="relative h-64 rounded-xl overflow-hidden group cursor-pointer shadow-md border border-gray-100/10">
      <img src={data.img} alt={data.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent flex flex-col justify-end"></div>
      <div className="absolute inset-0 bg-amber-500/0 group-hover:bg-amber-500/20 transition-colors duration-300 z-10"></div>
      <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center text-white z-20">
        <span className="font-semibold text-sm drop-shadow-md">{data.title}</span>
        <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity transform group-hover:translate-x-1" />
      </div>
    </div>
  );
}

function ProjectCardComp({ projDef, setSelectedProject }: any) {
  const content = usePageContent(projDef.key, projDef.fallback);
  const data = {
    tag: projDef.fallback.tag,
    title: content.title || projDef.fallback.title,
    loc: projDef.fallback.loc,
    cap: projDef.fallback.cap,
    save: projDef.fallback.save,
    img: content.imageUrl || projDef.fallback.img,
    desc: content.description || projDef.fallback.desc,
    highlight: projDef.fallback.highlight
  };
  
  return (
    <div onClick={() => setSelectedProject(data)} className="bg-white rounded-xl shadow-[0_2px_15px_rgba(0,0,0,0.06)] border border-gray-100 overflow-hidden flex flex-col group w-[300px] md:w-auto shrink-0 snap-start cursor-pointer hover:shadow-xl transition-all">
      <div className="relative h-48 overflow-hidden">
        <img src={data.img} alt={data.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
        <div className="absolute top-4 left-4">
          <span className="bg-amber-500 text-white text-[10px] font-bold px-3 py-1 rounded-sm uppercase tracking-wider shadow-sm">{data.tag}</span>
        </div>
      </div>
      <div className="p-6 flex-1 flex flex-col">
        <h3 className="font-bold text-lg mb-2 text-[#0A192F] group-hover:text-amber-500 transition-colors">{data.title}</h3>
        <p className="text-gray-500 text-[13px] flex items-center gap-1.5 mb-6"><MapPin className="w-3.5 h-3.5 text-amber-500" /> {data.loc}</p>
        <div className="flex items-center justify-between mt-auto pt-5 border-t border-gray-100">
          <div>
            <div className="text-[10px] text-gray-400 font-bold uppercase tracking-wider mb-1">Capacity</div>
            <div className="font-bold text-[#0A192F] text-sm">{data.cap}</div>
          </div>
          <div className="text-right">
            <div className="text-[10px] text-gray-400 font-bold uppercase tracking-wider mb-1">{data.tag === 'AGRICULTURE' ? 'Daily Output' : 'Annual Savings'}</div>
            <div className="font-bold text-green-600 text-sm">{data.save}</div>
          </div>
        </div>
        <div className="mt-6 flex items-center gap-1.5 text-amber-500 font-bold text-[13px] group-hover:text-amber-600 transition-colors">
          View Details <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
        </div>
      </div>
    </div>
  );
}

export default function SolutionsPage() {
  const { openModal } = useLeadModal();
  const [selectedApp, setSelectedApp] = useState<{img: string, title: string, desc: string, features: string[]} | null>(null);
  const [selectedProject, setSelectedProject] = useState<{tag: string, title: string, loc: string, cap: string, save: string, img: string, desc: string, highlight: string} | null>(null);

  useEffect(() => {
    if (selectedApp || selectedProject) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; }
  }, [selectedApp, selectedProject]);

  const projects = [
    { key: 'PROJ_5KW', fallback: { tag: "RESIDENTIAL", title: "5kW On-Grid System", loc: "Lucknow, Uttar Pradesh", cap: "5 kW", save: "₹62,000", img: "https://images.unsplash.com/photo-1613665813446-82a78c468a1d?w=800&q=80", desc: "A beautifully integrated residential solar system providing clean energy to a 4-bedroom villa. The system features premium monocrystalline panels and a smart inverter with mobile monitoring.", highlight: "Reduced monthly electricity bill by 92%" } },
    { key: 'PROJ_100KW', fallback: { tag: "COMMERCIAL", title: "100kW Rooftop System", loc: "Indore, Madhya Pradesh", cap: "100 kW", save: "₹12,50,000", img: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80", desc: "Commercial rooftop installation for a manufacturing unit. The system is designed to handle heavy day-time loads, significantly reducing the dependency on grid power and expensive diesel generators.", highlight: "ROI achieved in just 3.5 years" } },
    { key: 'PROJ_500KW', fallback: { tag: "INDUSTRIAL", title: "500kW Industrial Plant", loc: "Pune, Maharashtra", cap: "500 kW", save: "₹65,00,000", img: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&q=80", desc: "A massive industrial solar power plant setup on factory roofs. Engineered with heavy-duty mounting structures to withstand high wind speeds and harsh industrial environments.", highlight: "Offsetting 600 tons of CO2 annually" } },
    { key: 'PROJ_10HP', fallback: { tag: "AGRICULTURE", title: "10HP Solar Water Pump", loc: "Nagaur, Rajasthan", cap: "10 HP", save: "1,20,000 Ltrs", img: "https://images.unsplash.com/photo-1592982537447-7440770cbfc9?w=800&q=80", desc: "An off-grid solar water pumping system empowering local farmers with reliable daytime irrigation. Features a high-efficiency submersible pump and automated controller.", highlight: "Zero diesel costs for irrigation" } }
  ];

  const applications = [
    { key: 'APP_HOMES', fallback: { img: "https://images.unsplash.com/photo-1613665813446-82a78c468a1d?q=80&w=500", title: "Homes & Villas", desc: "Transform your home with a customized solar rooftop solution. Reduce your electricity bills by up to 90% and increase your property value.", features: ["Net Metering Support", "Aesthetic Design", "25-Year Warranty", "Smart App Monitoring"] } },
    { key: 'APP_OFFICES', fallback: { img: "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=500", title: "Offices & Buildings", desc: "Power your commercial spaces with smart solar installations. Benefit from tax savings, accelerated depreciation, and a sustainable brand image.", features: ["High ROI", "Tax Benefits", "Uninterrupted Power", "Scalable Systems"] } },
    { key: 'APP_FACTORIES', fallback: { img: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=500", title: "Factories & Industries", desc: "Heavy-duty industrial solar plants designed to sustain massive loads. Hedge against rising commercial tariffs and achieve your CSR goals.", features: ["Heavy Load Support", "Grid Synchronization", "Custom Structures", "Zero Maintenance"] } },
    { key: 'APP_FARMS', fallback: { img: "https://images.unsplash.com/photo-1592982537447-7440770cbfc9?q=80&w=500", title: "Farms & Agriculture", desc: "Empowering farmers with off-grid solar water pumps. Eliminate expensive diesel costs and ensure reliable water supply during the day.", features: ["Zero Fuel Cost", "Government Subsidies", "Durable Pumps", "High Discharge"] } },
    { key: 'APP_EV', fallback: { img: "https://images.unsplash.com/photo-1593941707882-a5bba14938c7?q=80&w=500", title: "EV Charging Stations", desc: "The future is electric. We integrate solar power with EV charging stations to provide 100% clean, emission-free charging for all vehicles.", features: ["Clean Charging", "Future-proof", "Commercial Usage", "Fast Charging Support"] } }
  ];

  return (
    <div className="bg-white min-h-screen text-[#0A192F]">
      {/* 1. Hero Banner */}
      <section className="relative pt-32 pb-32 px-4 sm:px-4 lg:px-6 bg-[#0A192F] text-white overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-top" style={{ backgroundImage: 'url("/images/16.png")' }}></div>
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="relative z-10 max-w-7xl mx-auto">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-white">
            Our Solar Solutions
          </h1>
          <p className="text-lg text-gray-100 max-w-2xl leading-relaxed font-medium">
            Comprehensive solar solutions for homes, businesses, industries and agriculture. Customized, efficient and future-ready.
          </p>
        </div>
      </section>

      {/* 2. Solution Cards */}
      <section className="relative z-20 max-w-7xl mx-auto px-4 sm:px-4 lg:px-6 -mt-8">
        <div className="flex overflow-x-auto snap-x snap-mandatory pb-6 gap-6 md:grid md:grid-cols-3 lg:grid-cols-5 md:overflow-x-visible md:pb-0 scrollbar-hide">
          {/* Card 1 */}
          <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden flex flex-col group w-[290px] md:w-auto shrink-0 snap-start">
            <div className="h-40 overflow-hidden relative">
              <img src="https://images.unsplash.com/photo-1613665813446-82a78c468a1d?w=500&q=80" alt="Residential" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
            </div>
            <div className="p-6 pt-8 flex-1 flex flex-col relative">
              <div className="absolute -top-5 left-4 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-md">
                <Home className="w-5 h-5 text-[#0A192F]" />
              </div>
              <h3 className="font-bold text-lg mb-2">Residential Solar</h3>
              <p className="text-gray-500 text-sm mb-4 flex-1 leading-relaxed">Power your home and reduce electricity bills with rooftop solar.</p>
              <Link href="/solutions/residential" className="text-amber-500 font-semibold text-sm flex items-center gap-1 group-hover:text-amber-600">View Solutions <ArrowRight className="w-4 h-4" /></Link>
            </div>
          </div>
          {/* Card 2 */}
          <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden flex flex-col group w-[290px] md:w-auto shrink-0 snap-start">
            <div className="h-40 overflow-hidden relative">
              <img src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=500&q=80" alt="Commercial" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
            </div>
            <div className="p-6 pt-8 flex-1 flex flex-col relative">
              <div className="absolute -top-5 left-4 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-md">
                <Settings className="w-5 h-5 text-[#0A192F]" />
              </div>
              <h3 className="font-bold text-lg mb-2">Commercial Solar</h3>
              <p className="text-gray-500 text-sm mb-4 flex-1 leading-relaxed">Smart energy solutions for offices, shops and commercial spaces.</p>
              <Link href="/solutions/commercial" className="text-amber-500 font-semibold text-sm flex items-center gap-1 group-hover:text-amber-600">View Solutions <ArrowRight className="w-4 h-4" /></Link>
            </div>
          </div>
          {/* Card 3 */}
          <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden flex flex-col group w-[290px] md:w-auto shrink-0 snap-start">
            <div className="h-40 overflow-hidden relative">
              <img src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=500&q=80" alt="Industrial" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
            </div>
            <div className="p-6 pt-8 flex-1 flex flex-col relative">
              <div className="absolute -top-5 left-4 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-md">
                <Settings className="w-5 h-5 text-[#0A192F]" />
              </div>
              <h3 className="font-bold text-lg mb-2">Industrial Solar</h3>
              <p className="text-gray-500 text-sm mb-4 flex-1 leading-relaxed">High-capacity systems for factories and large-scale operations.</p>
              <Link href="/solutions/industrial" className="text-amber-500 font-semibold text-sm flex items-center gap-1 group-hover:text-amber-600">View Solutions <ArrowRight className="w-4 h-4" /></Link>
            </div>
          </div>
          {/* Card 4 */}
          <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden flex flex-col group w-[290px] md:w-auto shrink-0 snap-start">
            <div className="h-40 overflow-hidden relative">
              <img src="https://images.unsplash.com/photo-1592982537447-7440770cbfc9?w=500&q=80" alt="Agriculture" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
            </div>
            <div className="p-6 pt-8 flex-1 flex flex-col relative">
              <div className="absolute -top-5 left-4 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-md">
                <Sun className="w-5 h-5 text-[#0A192F]" />
              </div>
              <h3 className="font-bold text-lg mb-2">Agriculture Solar</h3>
              <p className="text-gray-500 text-sm mb-4 flex-1 leading-relaxed">Solar water pumps and irrigation solutions for Indian farmers.</p>
              <Link href="/solutions/agriculture" className="text-amber-500 font-semibold text-sm flex items-center gap-1 group-hover:text-amber-600">View Solutions <ArrowRight className="w-4 h-4" /></Link>
            </div>
          </div>
          {/* Card 5 */}
          <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden flex flex-col group w-[290px] md:w-auto shrink-0 snap-start">
            <div className="h-40 overflow-hidden relative">
              <img src="https://images.unsplash.com/photo-1593941707882-a5bba14938c7?w=500&q=80" alt="EV Charging" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
            </div>
            <div className="p-6 pt-8 flex-1 flex flex-col relative">
              <div className="absolute -top-5 left-4 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-md">
                <Zap className="w-5 h-5 text-[#0A192F]" />
              </div>
              <h3 className="font-bold text-lg mb-2">EV Charging</h3>
              <p className="text-gray-500 text-sm mb-4 flex-1 leading-relaxed">Sustainable EV charging solutions for a green and clean future.</p>
              <Link href="/solutions/ev-charging" className="text-amber-500 font-semibold text-sm flex items-center gap-1 group-hover:text-amber-600">View Solutions <ArrowRight className="w-4 h-4" /></Link>
            </div>
          </div>
        </div>
      </section>

      {/* 3. How Our Solutions Work */}
      <section className="py-12 px-4 sm:px-4 lg:px-6 max-w-7xl mx-auto text-center">
        <div className="text-amber-500 font-bold text-sm uppercase tracking-wider mb-2">OUR SOLAR SYSTEMS & FUNCTIONS</div>
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-[#0A192F]">How Our Solutions Work</h2>
        <p className="text-gray-500 max-w-2xl mx-auto mb-8">Smartly designed systems with advanced functions to deliver maximum efficiency and long-term savings.</p>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Diagram */}
          <div className="relative">
             <img src="/images/15.png" alt="Solar Working Diagram" className="w-full rounded-2xl shadow-lg" />
          </div>
          
          {/* Right Content */}
          <div className="space-y-8 text-left">
            <div className="flex gap-4">
              <div className="w-12 h-12 rounded-full bg-amber-50 flex items-center justify-center shrink-0 border border-amber-100">
                <Sun className="w-6 h-6 text-amber-500" />
              </div>
              <div>
                <h4 className="font-bold text-lg mb-1 text-[#0A192F]">Energy Generation</h4>
                <p className="text-gray-500 text-sm leading-relaxed">Solar panels capture sunlight and generate clean DC electricity.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-12 h-12 rounded-full bg-amber-50 flex items-center justify-center shrink-0 border border-amber-100">
                <Zap className="w-6 h-6 text-amber-500" />
              </div>
              <div>
                <h4 className="font-bold text-lg mb-1 text-[#0A192F]">Power Conversion</h4>
                <p className="text-gray-500 text-sm leading-relaxed">Inverter converts DC power into AC power for your use.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-12 h-12 rounded-full bg-amber-50 flex items-center justify-center shrink-0 border border-amber-100">
                <Battery className="w-6 h-6 text-amber-500" />
              </div>
              <div>
                <h4 className="font-bold text-lg mb-1 text-[#0A192F]">Energy Storage (Optional)</h4>
                <p className="text-gray-500 text-sm leading-relaxed">Battery stores excess energy for backup during grid outages or night time.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-12 h-12 rounded-full bg-amber-50 flex items-center justify-center shrink-0 border border-amber-100">
                <Home className="w-6 h-6 text-amber-500" />
              </div>
              <div>
                <h4 className="font-bold text-lg mb-1 text-[#0A192F]">Smart Distribution</h4>
                <p className="text-gray-500 text-sm leading-relaxed">Power is distributed to run your appliances, machines and equipment efficiently.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-12 h-12 rounded-full bg-amber-50 flex items-center justify-center shrink-0 border border-amber-100">
                <Monitor className="w-6 h-6 text-amber-500" />
              </div>
              <div>
                <h4 className="font-bold text-lg mb-1 text-[#0A192F]">Monitoring & Control</h4>
                <p className="text-gray-500 text-sm leading-relaxed">Monitor performance in real-time with our smart monitoring system & mobile app.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Key Features */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-4 lg:px-6 text-center">
          <div className="text-amber-500 font-bold text-sm uppercase tracking-wider mb-2">KEY FEATURES</div>
          <h2 className="text-3xl md:text-4xl font-bold mb-8 text-[#0A192F]">Built for Performance. Designed for You.</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
            {[
              { icon: Sun, title: "High Efficiency", desc: "Premium quality components for maximum output." },
              { icon: Settings, title: "Custom Solutions", desc: "Tailored systems as per your energy needs." },
              { icon: Shield, title: "Durable & Reliable", desc: "Built to last with strong and corrosion resistant materials." },
              { icon: Wrench, title: "Low Maintenance", desc: "Minimal maintenance with long-term reliability." },
              { icon: Zap, title: "Cost Effective", desc: "Reduce electricity bills and increase savings." },
              { icon: Leaf, title: "Eco-Friendly", desc: "100% clean energy with zero carbon emissions." }
            ].map((feature, idx) => (
              <div key={idx} className="flex flex-col items-center">
                <div className="w-16 h-16 rounded-full border border-amber-200 bg-white shadow-sm flex items-center justify-center mb-4">
                  <feature.icon className="w-8 h-8 text-amber-500" />
                </div>
                <h4 className="font-bold text-sm mb-2 text-[#0A192F]">{feature.title}</h4>
                <p className="text-gray-500 text-xs px-2 leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. One Solution. Multiple Applications. */}
      <section className="py-12 px-4 sm:px-4 lg:px-6 max-w-7xl mx-auto text-center">
        <div className="text-amber-500 font-bold text-sm uppercase tracking-wider mb-2">WHERE WE MAKE AN IMPACT</div>
        <h2 className="text-3xl md:text-4xl font-bold mb-8 text-[#0A192F]">One Solution. Multiple Applications.</h2>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {applications.map((appDef, idx) => (
            <ApplicationCard key={idx} appDef={appDef} setSelectedApp={setSelectedApp} />
          ))}
        </div>
      </section>

      {/* 6. Process */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-4 lg:px-6 text-center">
          <div className="text-amber-500 font-bold text-sm uppercase tracking-wider mb-2">OUR PROCESS</div>
          <h2 className="text-3xl md:text-4xl font-bold mb-10 text-[#0A192F]">Simple Steps. Powerful Results.</h2>
          
          <div className="relative grid grid-cols-3 gap-x-2 gap-y-6 md:flex md:flex-row md:justify-between">
            {/* Connecting line */}
            <div className="hidden md:block absolute top-6 left-[8%] right-[8%] h-[2px] border-t-2 border-dashed border-amber-300 -z-0"></div>
            
            {[
              { num: "01", title: "Consultation", desc: "We understand your energy needs." },
              { num: "02", title: "Site Assessment", desc: "Our experts analyze your site." },
              { num: "03", title: "Custom Design", desc: "We design the best solution for you." },
              { num: "04", title: "Installation", desc: "Professional installation with safety." },
              { num: "05", title: "Commissioning", desc: "System testing & handover." },
              { num: "06", title: "Support & Maintenance", desc: "We're always here for you." }
            ].map((step, idx) => (
              <div key={idx} className="flex flex-col items-center relative z-10 w-full md:w-1/6 mb-0">
                <div className="w-9 h-9 md:w-12 md:h-12 rounded-full bg-amber-500 text-white font-bold flex items-center justify-center mb-2 md:mb-6 text-xs md:text-lg shadow-lg ring-4 ring-white">
                  {step.num}
                </div>
                <h4 className="font-bold text-[11px] md:text-sm mb-1 md:mb-2 text-[#0A192F] leading-tight">{step.title}</h4>
                <p className="text-gray-500 text-[9px] md:text-xs px-1 md:px-4 leading-normal">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. Success Stories */}
      <section className="py-12 px-4 sm:px-4 lg:px-6 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center md:items-end mb-8 gap-4">
          <div className="text-center md:text-left">
            <div className="text-amber-500 font-bold text-sm uppercase tracking-wider mb-2">SUCCESS STORIES</div>
            <h2 className="text-3xl md:text-4xl font-bold text-[#0A192F]">Real Projects. Real Impact.</h2>
          </div>
          <a href="/our-work" className="text-amber-500 font-semibold flex items-center gap-1 hover:text-amber-600">View All Projects <ArrowRight className="w-4 h-4" /></a>
        </div>
        
        <div className="flex overflow-x-auto snap-x snap-mandatory pb-6 gap-6 md:grid md:grid-cols-2 lg:grid-cols-4 md:overflow-x-visible md:pb-0 scrollbar-hide -mx-4 px-4 md:mx-0 md:px-0">
          {projects.map((projDef, idx) => (
            <ProjectCardComp key={idx} projDef={projDef} setSelectedProject={setSelectedProject} />
          ))}
        </div>
      </section>

      {/* 8. Certifications */}
      <section className="py-8 bg-gray-50 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-4 lg:px-6 text-center">
          <div className="text-amber-500 font-bold text-[13px] uppercase tracking-wider mb-10">CERTIFIED QUALITY. TRUSTED PARTNERS.</div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {[
              { name: "MNRE", desc: "Approved", icon: Shield },
              { name: "ISO", desc: "9001:2015", icon: CheckCircle2 },
              { name: "BIS", desc: "Certified", icon: Settings },
              { name: "ALMM", desc: "Approved", icon: Zap },
              { name: "IEC", desc: "Certified", icon: Wrench },
              { name: "NSIC", desc: "Registered", icon: Home }
            ].map((cert, idx) => (
              <div key={idx} className="bg-[#0A192F] border border-[#112240] hover:border-amber-500 p-5 rounded-2xl shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col items-center justify-center group">
                <div className="w-12 h-12 bg-[#112240] rounded-full flex items-center justify-center mb-3 shadow-sm transition-transform group-hover:scale-110 group-hover:bg-amber-500/20 duration-300">
                  <cert.icon className="w-6 h-6 text-amber-400 group-hover:text-amber-300 transition-colors" />
                </div>
                <div className="font-black text-xl text-white leading-tight mb-1 tracking-tight">{cert.name}</div>
                <div className="text-[10px] uppercase tracking-wider text-gray-400 group-hover:text-amber-400 transition-colors font-semibold">{cert.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Application Modal */}
      {selectedApp && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm" onClick={() => setSelectedApp(null)}>
          <div 
            className="bg-white rounded-3xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto flex flex-col md:flex-row relative animate-in fade-in zoom-in duration-300"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button 
              onClick={() => setSelectedApp(null)}
              className="absolute top-4 right-4 z-10 w-10 h-10 bg-black/20 md:bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center hover:bg-black/40 md:hover:bg-white transition-colors hover:text-red-500 text-white md:text-gray-500 border border-white/40 shadow-sm"
            >
              <X className="w-5 h-5" />
            </button>
            
            {/* Left: Image */}
            <div className="w-full md:w-[45%] h-56 md:h-auto relative shrink-0">
              <img src={selectedApp.img} alt={selectedApp.title} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-transparent to-[#0A192F]/80 md:to-transparent opacity-80 md:opacity-100"></div>
            </div>
            
            {/* Right: Content */}
            <div className="w-full md:w-[55%] p-6 md:p-10 bg-white flex flex-col justify-center relative">
              {/* Decorative background element */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-amber-100 rounded-bl-[100px] opacity-30 pointer-events-none"></div>
              
              <div className="inline-block px-3 py-1 rounded-full bg-amber-50 text-amber-600 font-bold text-[10px] uppercase tracking-wider mb-3 border border-amber-100 w-fit relative z-10">
                Application Detail
              </div>
              <h3 className="text-2xl md:text-3xl font-extrabold text-[#0A192F] mb-3 relative z-10">{selectedApp.title}</h3>
              <p className="text-gray-600 leading-relaxed mb-6 relative z-10 text-sm md:text-[15px]">
                {selectedApp.desc}
              </p>
              
              <div className="mb-8 relative z-10">
                <h4 className="font-bold text-[#0A192F] mb-3 text-xs uppercase tracking-wide flex items-center gap-2">
                  <div className="w-8 h-[1px] bg-amber-300"></div> Key Benefits
                </h4>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2.5">
                  {selectedApp.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-2.5">
                      <div className="w-5 h-5 rounded-full bg-amber-100 flex items-center justify-center shrink-0">
                        <Check className="w-3 h-3 text-amber-600 font-bold" />
                      </div>
                      <span className="text-[13px] text-gray-700 font-semibold">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <button 
                onClick={() => {
                  setSelectedApp(null);
                  openModal('CONTACT');
                }}
                className="bg-amber-500 hover:bg-amber-400 text-white font-bold py-3.5 px-6 rounded-xl transition-all shadow-lg shadow-amber-500/30 flex items-center justify-center gap-2 w-full md:w-auto relative z-10 group"
              >
                Get Started Now
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Project Detail Modal */}
      {selectedProject && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-[#0A192F]/90 backdrop-blur-md" onClick={() => setSelectedProject(null)}>
          <div 
            className="bg-white rounded-3xl shadow-2xl w-full max-w-5xl overflow-hidden flex flex-col md:flex-row relative animate-in zoom-in-95 fade-in duration-300"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button 
              onClick={() => setSelectedProject(null)}
              className="absolute top-4 right-4 z-20 w-10 h-10 bg-black/10 md:bg-gray-100 backdrop-blur-md rounded-full flex items-center justify-center hover:bg-black/20 md:hover:bg-gray-200 transition-colors text-white md:text-gray-600 border border-white/20 md:border-transparent"
            >
              <X className="w-5 h-5" />
            </button>
            
            {/* Left: Image Hero */}
            <div className="w-full md:w-[45%] h-56 md:h-auto relative shrink-0">
              <img src={selectedProject.img} alt={selectedProject.title} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-b from-[#0A192F]/90 via-transparent to-transparent md:to-[#0A192F]/40"></div>
              
              <div className="absolute bottom-5 md:top-6 md:bottom-auto left-5 md:left-6 right-5">
                <div className="inline-block px-3 py-1.5 rounded-md bg-amber-500 text-white font-bold text-[10px] uppercase tracking-wider shadow-md">
                  {selectedProject.tag}
                </div>
              </div>
            </div>
            
            {/* Right: Content */}
            <div className="w-full md:w-[55%] p-6 md:p-10 bg-white flex flex-col relative justify-center">
              
              <h3 className="text-2xl md:text-3xl font-extrabold text-[#0A192F] mb-1.5">{selectedProject.title}</h3>
              <p className="text-gray-500 text-sm flex items-center gap-1.5 mb-6"><MapPin className="w-4 h-4 text-amber-500" /> {selectedProject.loc}</p>
              
              <p className="text-gray-600 leading-relaxed mb-8 text-sm md:text-[15px]">
                {selectedProject.desc}
              </p>
              
              {/* Highlight Banner */}
              <div className="bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-100/50 rounded-2xl p-4 mb-8 flex items-center gap-4 shadow-sm">
                <div className="w-12 h-12 bg-amber-500 rounded-full flex items-center justify-center shrink-0 shadow-md">
                  <Star className="w-6 h-6 text-white fill-white" />
                </div>
                <div>
                  <p className="text-[11px] text-amber-600 font-bold uppercase tracking-wider mb-0.5">Project Highlight</p>
                  <p className="text-[#0A192F] font-bold text-sm md:text-base">{selectedProject.highlight}</p>
                </div>
              </div>
              
              {/* Stats Grid */}
              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="border border-gray-100 rounded-xl p-4 text-center bg-gray-50 hover:bg-white hover:shadow-md hover:border-amber-200 transition-all">
                  <p className="text-gray-400 text-[10px] uppercase font-bold tracking-wider mb-1">System Capacity</p>
                  <p className="font-black text-xl text-[#0A192F]">{selectedProject.cap}</p>
                </div>
                <div className="border border-gray-100 rounded-xl p-4 text-center bg-gray-50 hover:bg-white hover:shadow-md hover:border-amber-200 transition-all">
                  <p className="text-gray-400 text-[10px] uppercase font-bold tracking-wider mb-1">{selectedProject.tag === 'AGRICULTURE' ? 'Daily Output' : 'Annual Savings'}</p>
                  <p className="font-black text-xl text-amber-600">{selectedProject.save}</p>
                </div>
              </div>
              
              <button 
                onClick={() => {
                  setSelectedProject(null);
                  openModal('CONTACT');
                }}
                className="w-full bg-amber-500 hover:bg-amber-400 text-white font-bold py-4 rounded-xl transition-all flex items-center justify-center gap-2 group mt-2"
              >
                Get a Similar Quote
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
