"use client";

import React, { useState, useEffect, useRef } from 'react';
import { 
  ChevronRight, ChevronLeft, MapPin, Search, ChevronDown, CheckCircle2, 
  FileText, Download, Award, Zap, TrendingUp, Droplets, TreePine, 
  Sun, Factory, Building2, Shield, Calendar, Map, Check, Clock, Home, CloudRain, X, ArrowRight, Users
} from 'lucide-react';
import { useLeadModal } from '@/context/LeadModalContext';
import { ProjectGallery } from '@/components/sections/ProjectGallery';
import { ProjectPerformance } from '@/components/sections/ProjectPerformance';
import { ActiveLocations } from '@/components/sections/ActiveLocations';
import { VideoBlog } from '@/components/sections/VideoBlog';
import India from '@react-map/india';
import { usePageContent } from '@/hooks/usePageContent';

export default function OurWorkPage() {
  const { openModal } = useLeadModal();
  
  // Custom ProjectCard for our-work page
  const ProjectCard = ({ projDef, setSelectedProject }: any) => {
    const content = usePageContent(projDef.key, projDef.fallback);
    const proj = {
      tag: projDef.fallback.tag,
      color: projDef.fallback.color,
      title: content.title || projDef.fallback.title,
      loc: projDef.fallback.loc,
      cap: projDef.fallback.cap,
      cost: projDef.fallback.cost,
      save: projDef.fallback.save,
      img: content.imageUrl || projDef.fallback.img,
      desc: content.description || projDef.fallback.desc
    };

    return (
      <div onClick={() => setSelectedProject(proj)} className="w-[85vw] sm:w-[320px] shrink-0 snap-start bg-white rounded-xl overflow-hidden border border-gray-200 hover:border-emerald-500/50 hover:shadow-lg transition-all group cursor-pointer">
        <div className="h-36 relative">
          <img src={proj.img} alt={proj.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
          <div className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded text-[8px] font-black uppercase text-white shadow-sm tracking-wider z-10" style={{ backgroundColor: proj.tag === 'Commercial' ? '#3B82F6' : proj.tag === 'Industrial' ? '#8B5CF6' : proj.tag === 'Agriculture' ? '#10B981' : '#F97316' }}>
            {proj.tag}
          </div>
        </div>
        <div className="p-4">
          <h3 className="font-bold text-[13px] text-gray-900 mb-1.5 group-hover:text-emerald-600 transition-colors line-clamp-1">{proj.title}</h3>
          <p className="text-gray-500 text-[10px] flex items-center gap-1 mb-3"><MapPin className="w-3 h-3 text-emerald-500" /> {proj.loc}</p>
          <div className="grid grid-cols-2 gap-2 mb-3">
            <div className="bg-gray-50 rounded p-1.5 border border-gray-100">
              <p className="text-gray-400 text-[8px] uppercase font-bold tracking-wider mb-0.5">Capacity</p>
              <p className="font-bold text-[11px] text-gray-900">{proj.cap}</p>
            </div>
            <div className="bg-gray-50 rounded p-1.5 border border-gray-100">
              <p className="text-gray-400 text-[8px] uppercase font-bold tracking-wider mb-0.5">{proj.tag === 'Agriculture' ? 'Daily Output' : 'Yearly Savings'}</p>
              <p className="font-bold text-[11px] text-emerald-600">{proj.save}</p>
            </div>
          </div>
          <div className="text-emerald-600 font-semibold text-[10px] flex items-center gap-1 group-hover:gap-2 transition-all">View Case Study <ArrowRight className="w-3 h-3" /></div>
        </div>
      </div>
    );
  };
  const [activeFilter, setActiveFilter] = useState('All Projects');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('Sort By');
  const [selectedProject, setSelectedProject] = useState<any>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [selectedState, setSelectedState] = useState('All States');
  const [activeClientTab, setActiveClientTab] = useState('All Clients');

  // Prevent background scrolling when modal is open
  useEffect(() => {
    if (selectedProject) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [selectedProject]);

  const categories = ['All Projects', 'Residential', 'Commercial', 'Industrial', 'Agriculture', 'Government', 'Institutional'];

  const featuredProjects = [
    { key: 'PROJ_100KW', color: 'bg-blue-500', fallback: { tag: 'Commercial', title: '100kW Commercial Project', loc: 'Noida, Uttar Pradesh', cap: '100 kW', cost: '₹12.5 Lakhs', save: '₹1.5 Lakhs/yr', img: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80' } },
    { key: 'PROJ_500KW', color: 'bg-purple-500', fallback: { tag: 'Industrial', title: '500kW Industrial Plant', loc: 'Surat, Gujarat', cap: '500 kW', cost: '₹40 Lakhs', save: '₹6.5 Lakhs/yr', img: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&q=80' } },
    { key: 'PROJ_10HP', color: 'bg-green-500', fallback: { tag: 'Agriculture', title: '20HP Solar Water Pump', loc: 'Hisar, Haryana', cap: '20 HP', cost: '₹2.85 Lakhs', save: '₹1.2 Lakhs/yr', img: 'https://images.unsplash.com/photo-1592982537447-7440770cbfc9?w=800&q=80' } },
    { key: 'PROJ_250KW', color: 'bg-orange-500', fallback: { tag: 'Government', title: '250kW Govt. Building', loc: 'Bhopal, Madhya Pradesh', cap: '250 kW', cost: '₹28 Lakhs', save: '₹3.5 Lakhs/yr', img: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80' } },
    { key: 'PROJ_5KW', color: 'bg-teal-500', fallback: { tag: 'Residential', title: '10kW Premium Home Solar', loc: 'Jaipur, Rajasthan', cap: '10 kW', cost: '₹4.5 Lakhs', save: '₹90,000/yr', img: '/17.png' } },
    { key: 'PROJ_50KW', color: 'bg-pink-500', fallback: { tag: 'Institutional', title: '50kW University Campus', loc: 'Pune, Maharashtra', cap: '50 kW', cost: '₹22 Lakhs', save: '₹4.2 Lakhs/yr', img: '/hero-bg.png' } }
  ].map(p => {
    // We can't call hooks inside a regular map/filter callback directly in the render body 
    // unless we extract a component for it. Wait, I will just extract a component for the card below!
    return p;
  });



  const docs = [
    { name: "Site Survey Report", type: "PDF" },
    { name: "System Design", type: "PDF" },
    { name: "Installation Photos", type: "ZIP" },
    { name: "Electrical Drawing", type: "PDF" },
    { name: "Completion Certificate", type: "PDF" },
    { name: "Warranty Certificate", type: "PDF" }
  ];

  // Compute filtered and sorted projects
  let filteredProjects = featuredProjects.filter(proj => {
    // 1. Category Filter
    if (activeFilter !== 'All Projects' && proj.fallback.tag !== activeFilter) {
      return false;
    }
    // 2. Search Filter
    if (searchQuery.trim() !== '') {
      const query = searchQuery.toLowerCase();
      if (!proj.fallback.title.toLowerCase().includes(query) && !proj.fallback.loc.toLowerCase().includes(query)) {
        return false;
      }
    }
    return true;
  });

  // 3. Sorting
  if (sortBy === 'Capacity') {
    filteredProjects.sort((a, b) => {
      // Very basic parser to sort by the numeric part of the capacity string (e.g. "500 kW" -> 500)
      const parseCap = (capStr: string) => parseInt(capStr.replace(/\D/g, '')) || 0;
      return parseCap(b.fallback.cap) - parseCap(a.fallback.cap);
    });
  } else if (sortBy === 'Newest') {
    // Just for demonstration, if "Newest" is selected, we reverse the original array
    // (creating a copy first because reverse mutates)
    filteredProjects = [...filteredProjects].reverse();
  }

  const activeIndexRef = useRef(0);
  
  useEffect(() => {
    activeIndexRef.current = activeIndex;
  }, [activeIndex]);

  // Auto-scroll logic for the featured projects carousel
  useEffect(() => {
    if (filteredProjects.length <= 1) return;
    const interval = setInterval(() => {
      if (scrollRef.current) {
        const { scrollWidth, clientWidth, scrollLeft } = scrollRef.current;
        const maxScroll = scrollWidth - clientWidth;
        if (maxScroll <= 0) return;

        const maxIndex = filteredProjects.length - 1;
        let nextIndex = activeIndexRef.current + 1;
        if (nextIndex > maxIndex) nextIndex = 0;
        
        const targetScroll = maxIndex > 0 ? (nextIndex / maxIndex) * maxScroll : 0;
        scrollRef.current.scrollTo({ left: targetScroll, behavior: 'smooth' });
      }
    }, 3000);
    return () => clearInterval(interval);
  }, [filteredProjects]);

  const handleScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      const maxScroll = scrollWidth - clientWidth;
      if (maxScroll <= 0) {
        setActiveIndex(0);
        return;
      }
      const maxIndex = filteredProjects.length - 1;
      const proportion = scrollLeft / maxScroll;
      const index = Math.round(proportion * maxIndex);
      setActiveIndex(index);
    }
  };

  const heroContent = usePageContent('WORK_HERO', {
    title: 'Our Work\nReal Projects.\nReal Impact.',
    description: 'Every project we deliver reflects our commitment to quality, performance and a sustainable future.',
    imageUrl: '/17.png'
  });

  return (
    <div className="bg-gray-50 min-h-screen font-sans text-gray-900">
      
      {/* 1. Hero Section */}
      <section className="relative pt-12 pb-32 px-4 sm:px-4 lg:px-6 bg-[#0B1120] border-b border-gray-200">
        <div className="absolute inset-0 bg-cover bg-center opacity-60" style={{ backgroundImage: `url("${heroContent.imageUrl || '/17.png'}")` }}></div>
        <div className="absolute inset-0 bg-gradient-to-r from-[#0B1120]/90 via-[#0B1120]/40 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B1120]/80 via-transparent to-transparent"></div>
        
        <div className="relative z-10 max-w-7xl mx-auto flex flex-col justify-center h-full pt-8 md:pt-12">
          <h1 className="text-4xl md:text-5xl font-black text-white mb-2 leading-tight tracking-tight drop-shadow-lg whitespace-pre-line">
            {heroContent.title}
          </h1>
          <p className="text-base text-gray-300 max-w-xl mb-6 mt-4 font-medium whitespace-pre-line">
            {heroContent.description}
          </p>
          <div className="flex flex-wrap gap-3">
            <button onClick={() => document.getElementById('featured-projects')?.scrollIntoView({ behavior: 'smooth' })} className="bg-primary hover:brightness-110 text-[#0A192F] font-bold py-3 px-6 text-sm rounded flex items-center gap-2 transition-colors cursor-pointer">
              Explore Projects <ChevronRight className="w-4 h-4" />
            </button>
            <button onClick={() => openModal('CONTACT')} className="bg-[#1F2937]/80 hover:bg-[#374151] backdrop-blur-md border border-gray-600 text-white font-bold py-3 px-6 text-sm rounded flex items-center gap-2 transition-colors">
              <Calendar className="w-4 h-4" /> Book Free Site Survey
            </button>
          </div>
        </div>

        {/* Stats Banner Overlapping Bottom */}
        <div className="absolute -bottom-10 md:-bottom-14 left-0 right-0 z-20 flex justify-center w-full px-4">
          <div className="w-full max-w-5xl bg-white rounded-lg shadow-xl py-2 px-2 md:py-3 md:px-5 grid grid-cols-3 md:grid-cols-5 gap-1 md:gap-4 text-center divide-x divide-gray-200 border border-gray-200">
            <div className="px-1 md:px-2">
              <div className="flex justify-center mb-1 md:mb-2"><div className="w-6 h-6 md:w-8 md:h-8 rounded-full bg-emerald-100 flex items-center justify-center"><CheckCircle2 className="w-3 h-3 md:w-4 md:h-4 text-emerald-600" /></div></div>
              <p className="text-sm md:text-xl font-black text-gray-900">1200+</p>
              <p className="text-[7px] md:text-[10px] uppercase font-bold text-gray-500 leading-none mt-0.5">Projects Completed</p>
            </div>
            <div className="px-1 md:px-2">
              <div className="flex justify-center mb-1 md:mb-2"><div className="w-6 h-6 md:w-8 md:h-8 rounded-full bg-amber-100 flex items-center justify-center"><Zap className="w-3 h-3 md:w-4 md:h-4 text-amber-600" /></div></div>
              <p className="text-sm md:text-xl font-black text-gray-900">45+ MW</p>
              <p className="text-[7px] md:text-[10px] uppercase font-bold text-gray-500 leading-none mt-0.5">Installed Capacity</p>
            </div>
            <div className="px-1 md:px-2 hidden md:block">
              <div className="flex justify-center mb-1 md:mb-2"><div className="w-6 h-6 md:w-8 md:h-8 rounded-full bg-blue-100 flex items-center justify-center"><MapPin className="w-3 h-3 md:w-4 md:h-4 text-blue-600" /></div></div>
              <p className="text-sm md:text-xl font-black text-gray-900">18+</p>
              <p className="text-[7px] md:text-[10px] uppercase font-bold text-gray-500 leading-none mt-0.5">States Covered</p>
            </div>
            <div className="px-1 md:px-2 hidden md:block">
              <div className="flex justify-center mb-1 md:mb-2"><div className="w-6 h-6 md:w-8 md:h-8 rounded-full bg-purple-100 flex items-center justify-center"><Check className="w-3 h-3 md:w-4 md:h-4 text-purple-600" /></div></div>
              <p className="text-sm md:text-xl font-black text-gray-900">15,000+</p>
              <p className="text-[7px] md:text-[10px] uppercase font-bold text-gray-500 leading-none mt-0.5">Happy Clients</p>
            </div>
            <div className="px-1 md:px-2">
              <div className="flex justify-center mb-1 md:mb-2"><div className="w-6 h-6 md:w-8 md:h-8 rounded-full bg-orange-100 flex items-center justify-center"><Award className="w-3 h-3 md:w-4 md:h-4 text-orange-600" /></div></div>
              <p className="text-sm md:text-xl font-black text-gray-900">15+</p>
              <p className="text-[7px] md:text-[10px] uppercase font-bold text-gray-500 leading-none mt-0.5">Years Exp.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Filter Bar */}
      <section id="featured-projects" className="pt-24 pb-8 px-4 sm:px-4 lg:px-6 max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row justify-between gap-4 items-center mb-8">
          <div className="flex flex-wrap gap-2 justify-center lg:justify-start">
            {categories.map((cat) => (
              <button 
                key={cat}
                onClick={() => setActiveFilter(cat)}
                className={`px-3 py-1.5 rounded-full text-[11px] font-bold transition-all border ${activeFilter === cat ? 'bg-emerald-600 text-white border-emerald-600 shadow-md shadow-emerald-500/20' : 'bg-white text-gray-600 border-gray-200 hover:text-gray-900 hover:bg-gray-50'}`}
              >
                {cat}
              </button>
            ))}
          </div>
          <div className="flex gap-3 w-full lg:w-auto">
            <div className="relative flex-grow lg:flex-grow-0">
              <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input 
                type="text" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search projects..." 
                className="w-full lg:w-56 bg-white border border-gray-300 text-xs text-gray-900 rounded-md pl-8 pr-3 py-1.5 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 shadow-sm" 
              />
            </div>
            <div className="relative hidden sm:block">
              <select 
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="appearance-none bg-white border border-gray-300 text-xs text-gray-900 rounded-md pl-3 pr-8 py-1.5 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 cursor-pointer shadow-sm"
              >
                <option>Sort By</option>
                <option>Newest</option>
                <option>Capacity</option>
              </select>
              <ChevronDown className="w-3.5 h-3.5 absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Featured Projects Grid */}
        <div className="mb-4">
          <h2 className="text-xl font-bold text-gray-900">Featured Projects</h2>
        </div>

        <div 
          ref={scrollRef}
          onScroll={handleScroll}
          className="flex overflow-x-auto gap-4 pb-2 snap-x snap-mandatory [scrollbar-width:none] [&::-webkit-scrollbar]:hidden relative"
        >
          {filteredProjects.length > 0 ? (
            filteredProjects.map((projDef, idx) => (
              <ProjectCard key={idx} projDef={projDef} setSelectedProject={setSelectedProject} />
            ))
          ) : (
            <div className="w-full text-center py-12 bg-white rounded-xl border border-gray-200">
              <p className="text-gray-500 font-medium">No projects found matching your criteria.</p>
            </div>
          )}
        </div>

        {/* Pagination Dots */}
        {filteredProjects.length > 1 && (
          <div className="flex justify-center gap-2 mt-4 mb-6">
            {filteredProjects.map((_, idx) => (
              <button
                key={idx}
                onClick={() => {
                  if (scrollRef.current) {
                    const { scrollWidth, clientWidth } = scrollRef.current;
                    const maxScroll = scrollWidth - clientWidth;
                    const maxIndex = filteredProjects.length - 1;
                    const targetScroll = (idx / maxIndex) * maxScroll;
                    scrollRef.current.scrollTo({ left: targetScroll, behavior: 'smooth' });
                    setActiveIndex(idx);
                  }
                }}
                className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${activeIndex === idx ? 'bg-primary scale-125' : 'bg-gray-300 hover:bg-gray-400'}`}
                aria-label={`Go to project ${idx + 1}`}
              />
            ))}
          </div>
        )}  
      </section>

      {/* 3.5 Active Locations */}
      <ActiveLocations />

      {/* 3.6 Video Blog */}
      <VideoBlog />

      <ProjectGallery />

      {/* 4. Premium Map Dashboard */}
      <section className="py-8 px-4 sm:px-4 lg:px-6 max-w-[1400px] mx-auto">
        <div className="bg-[#0B1120] rounded-2xl border border-white/5 p-4 lg:p-6 shadow-2xl flex flex-col gap-6">
          
          {/* Top Row: Map & Project Distribution */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* Left: Map Engine (2 Columns) */}
            <div className="lg:col-span-2 relative flex flex-col">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-2xl font-bold text-white mb-1">Projects Across <span className="text-emerald-500">India</span></h3>
                  <p className="text-sm text-gray-400">Delivering clean energy solutions across the nation.</p>
                </div>
                <div className="flex items-center gap-2 bg-[#0A192F] border border-white/10 rounded-md px-3 py-1.5 shadow-sm">
                  <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)]"></div>
                  <span className="text-xs font-medium text-gray-300">18 States <span className="text-gray-500 mx-1">|</span> 320+ Cities</span>
                </div>
              </div>

              <div className="flex-grow flex flex-col sm:flex-row justify-center items-center sm:items-start w-full relative min-h-[360px] mt-4">
                {/* Subtle Background Glow */}
                <div className="absolute inset-0 bg-emerald-500/5 blur-3xl rounded-full transform scale-75 opacity-70"></div>
                
                <div className="relative z-10 transform scale-[0.9] sm:scale-100 hover:scale-[1.02] transition-transform duration-500 origin-top drop-shadow-2xl mt-2">
                  <India 
                    type="select-single"
                    size={390}
                    mapColor="#0A192F" // Darker base to match screenshot
                    strokeColor="#10B981" // Vibrant Emerald Green strokes
                    strokeWidth={1}
                    hoverColor="#059669" 
                    hints={true}
                    hintBackgroundColor="#111827"
                    hintTextColor="#10B981"
                    hintPadding="8px 12px"
                    hintBorderRadius={6}
                    cityColors={{
                      'UP': '#10B981', // Uttar Pradesh (Green)
                      'Uttar Pradesh': '#10B981', 
                      'BR': '#10B981', // Bihar (Green)
                      'Bihar': '#10B981',
                      'MH': '#10B981', // Maharashtra
                      'Maharashtra': '#10B981',
                      'RJ': '#10B981', // Rajasthan
                      'Rajasthan': '#10B981',
                      'GJ': '#10B981', // Gujarat
                      'Gujarat': '#10B981',
                      'MP': '#F59E0B', // Madhya Pradesh (Orange)
                      'Madhya Pradesh': '#F59E0B',
                      'TN': '#10B981', // Tamil Nadu
                      'Tamil Nadu': '#10B981',
                      'KA': '#10B981', // Karnataka
                      'Karnataka': '#10B981',
                      'KL': '#3B82F6', // Kerala (Blue)
                      'Kerala': '#3B82F6',
                      'JK': '#3B82F6', // J&K (Blue)
                      'Jammu and Kashmir': '#3B82F6',
                      'HP': '#3B82F6', // HP (Blue)
                      'Himachal Pradesh': '#3B82F6',
                      'UT': '#3B82F6', // Uttarakhand
                      'Uttarakhand': '#3B82F6',
                      'CG': '#F59E0B', // Chhattisgarh
                      'Chhattisgarh': '#F59E0B',
                      'JH': '#F59E0B', // Jharkhand
                      'Jharkhand': '#F59E0B'
                    }}
                  />
                </div>

                {/* Custom Legend absolute positioned bottom left */}
                <div className="relative mt-2 sm:absolute sm:bottom-4 sm:left-0 flex flex-row sm:flex-col justify-center sm:justify-start gap-4 sm:gap-3 z-20 w-full sm:w-auto">
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)]"></div>
                    <span className="text-[11px] sm:text-xs font-medium text-gray-300">Completed</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.8)]"></div>
                    <span className="text-[11px] sm:text-xs font-medium text-gray-300">In Progress</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.8)]"></div>
                    <span className="text-[11px] sm:text-xs font-medium text-gray-300">Upcoming</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Project Distribution (1 Column) */}
            <div className="bg-[#0A192F] rounded-xl border border-white/5 p-4 lg:p-5 shadow-inner flex flex-col">
              <h3 className="text-lg font-bold text-white mb-4">Project Distribution</h3>
              
              {/* Stats Grid */}
              <div className="grid grid-cols-2 gap-4 mb-5">
                <div className="flex gap-3">
                  <div className="w-8 h-8 rounded-full border border-emerald-500/30 flex items-center justify-center shrink-0 mt-0.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  </div>
                  <div>
                    <p className="text-[10px] text-gray-400 font-medium">Completed Projects</p>
                    <p className="text-lg font-bold text-emerald-500">850+</p>
                  </div>
                </div>
                
                <div className="flex gap-3">
                  <div className="w-8 h-8 rounded-full border border-amber-500/30 flex items-center justify-center shrink-0 mt-0.5">
                    <div className="w-3 h-3 rounded-full border-2 border-amber-500 flex items-center justify-center">
                      <div className="w-1 h-1 rounded-full bg-amber-500"></div>
                    </div>
                  </div>
                  <div>
                    <p className="text-[10px] text-gray-400 font-medium">In Progress</p>
                    <p className="text-lg font-bold text-amber-500">220+</p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="w-8 h-8 rounded-full border border-blue-500/30 flex items-center justify-center shrink-0 mt-0.5">
                    <Clock className="w-4 h-4 text-blue-500" />
                  </div>
                  <div>
                    <p className="text-[10px] text-gray-400 font-medium">Upcoming Projects</p>
                    <p className="text-lg font-bold text-blue-500">130+</p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="w-8 h-8 rounded-full border border-emerald-500/30 flex items-center justify-center shrink-0 mt-0.5">
                    <Zap className="w-4 h-4 text-emerald-500" />
                  </div>
                  <div>
                    <p className="text-[10px] text-gray-400 font-medium">Total Installed Capacity</p>
                    <p className="text-lg font-bold text-emerald-500">45+ MW</p>
                  </div>
                </div>
              </div>

              {/* State Selector */}
              <div className="mb-4">
                <label className="text-[11px] text-gray-400 block mb-1.5">Select a State</label>
                <select 
                  value={selectedState}
                  onChange={(e) => setSelectedState(e.target.value)}
                  className="w-full bg-[#0B1120] border border-white/10 text-xs text-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-emerald-500/50 appearance-none cursor-pointer">
                  <option>All States</option>
                  <option>Maharashtra</option>
                  <option>Uttar Pradesh</option>
                  <option>Rajasthan</option>
                </select>
              </div>

              {/* Top States List */}
              <div className="flex-grow flex flex-col">
                <div className="flex justify-between items-center mb-3">
                  <h4 className="text-[11px] font-bold text-white">Top States by Projects</h4>
                  <span onClick={() => alert('Viewing All States Data')} className="text-[10px] text-emerald-500 font-medium cursor-pointer hover:text-emerald-400 flex items-center gap-1">View All States <ArrowRight className="w-3 h-3" /></span>
                </div>
                
                <div className="flex flex-col gap-2 flex-grow justify-between">
                  {/* Item */}
                  <div className="flex items-center gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0"></div>
                    <span className="text-[11px] text-gray-300 w-24 truncate">Maharashtra</span>
                    <div className="flex-grow bg-white/5 h-1.5 rounded-full overflow-hidden">
                      <div className="bg-emerald-500 h-full rounded-full" style={{ width: '85%' }}></div>
                    </div>
                    <span className="text-[11px] text-white font-medium w-6 text-right">150</span>
                  </div>
                  
                  {/* Item */}
                  <div className="flex items-center gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0"></div>
                    <span className="text-[11px] text-gray-300 w-24 truncate">Uttar Pradesh</span>
                    <div className="flex-grow bg-white/5 h-1.5 rounded-full overflow-hidden">
                      <div className="bg-emerald-500 h-full rounded-full" style={{ width: '70%' }}></div>
                    </div>
                    <span className="text-[11px] text-white font-medium w-6 text-right">125</span>
                  </div>

                  {/* Item */}
                  <div className="flex items-center gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0"></div>
                    <span className="text-[11px] text-gray-300 w-24 truncate">Rajasthan</span>
                    <div className="flex-grow bg-white/5 h-1.5 rounded-full overflow-hidden">
                      <div className="bg-emerald-500 h-full rounded-full" style={{ width: '55%' }}></div>
                    </div>
                    <span className="text-[11px] text-white font-medium w-6 text-right">92</span>
                  </div>

                  {/* Item */}
                  <div className="flex items-center gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0"></div>
                    <span className="text-[11px] text-gray-300 w-24 truncate">Gujarat</span>
                    <div className="flex-grow bg-white/5 h-1.5 rounded-full overflow-hidden">
                      <div className="bg-emerald-500 h-full rounded-full" style={{ width: '45%' }}></div>
                    </div>
                    <span className="text-[11px] text-white font-medium w-6 text-right">68</span>
                  </div>

                  {/* Item */}
                  <div className="flex items-center gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0"></div>
                    <span className="text-[11px] text-gray-300 w-24 truncate">Bihar</span>
                    <div className="flex-grow bg-white/5 h-1.5 rounded-full overflow-hidden">
                      <div className="bg-emerald-500 h-full rounded-full" style={{ width: '25%' }}></div>
                    </div>
                    <span className="text-[11px] text-white font-medium w-6 text-right">42</span>
                  </div>

                  {/* Item */}
                  <div className="flex items-center gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-amber-500 shrink-0"></div>
                    <span className="text-[11px] text-gray-300 w-24 truncate">Madhya Pradesh</span>
                    <div className="flex-grow bg-white/5 h-1.5 rounded-full overflow-hidden">
                      <div className="bg-amber-500 h-full rounded-full" style={{ width: '22%' }}></div>
                    </div>
                    <span className="text-[11px] text-white font-medium w-6 text-right">38</span>
                  </div>

                  {/* Item */}
                  <div className="flex items-center gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0"></div>
                    <span className="text-[11px] text-gray-300 w-24 truncate">Tamil Nadu</span>
                    <div className="flex-grow bg-white/5 h-1.5 rounded-full overflow-hidden">
                      <div className="bg-emerald-500 h-full rounded-full" style={{ width: '20%' }}></div>
                    </div>
                    <span className="text-[11px] text-white font-medium w-6 text-right">35</span>
                  </div>

                  {/* Item */}
                  <div className="flex items-center gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0"></div>
                    <span className="text-[11px] text-gray-300 w-24 truncate">Karnataka</span>
                    <div className="flex-grow bg-white/5 h-1.5 rounded-full overflow-hidden">
                      <div className="bg-emerald-500 h-full rounded-full" style={{ width: '18%' }}></div>
                    </div>
                    <span className="text-[11px] text-white font-medium w-6 text-right">32</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Row: Stats Bar */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3 lg:gap-4 mt-2">
            {/* Stat 1 */}
            <div className="bg-[#0A192F] border border-white/5 rounded-xl p-4 flex items-center gap-4 hover:border-emerald-500/30 transition-colors">
              <div className="w-10 h-10 rounded-full border border-emerald-500/20 flex items-center justify-center shrink-0 bg-emerald-500/10">
                <Sun className="w-5 h-5 text-emerald-500" />
              </div>
              <div className="flex flex-col">
                <span className="text-lg font-bold text-white leading-tight">1200+</span>
                <span className="text-[10px] text-gray-300 mt-1">Total Projects</span>
                <span className="text-[9px] text-gray-500">Across India</span>
              </div>
            </div>

            {/* Stat 2 */}
            <div className="bg-[#0A192F] border border-white/5 rounded-xl p-4 flex items-center gap-4 hover:border-emerald-500/30 transition-colors">
              <div className="w-10 h-10 rounded-full border border-emerald-500/20 flex items-center justify-center shrink-0 bg-emerald-500/10">
                <Zap className="w-5 h-5 text-emerald-500" />
              </div>
              <div className="flex flex-col">
                <span className="text-lg font-bold text-white leading-tight">45+ MW</span>
                <span className="text-[10px] text-gray-300 mt-1">Installed Capacity</span>
                <span className="text-[9px] text-gray-500">Clean Energy Installed</span>
              </div>
            </div>

            {/* Stat 3 */}
            <div className="bg-[#0A192F] border border-white/5 rounded-xl p-4 flex items-center gap-4 hover:border-emerald-500/30 transition-colors">
              <div className="w-10 h-10 rounded-full border border-emerald-500/20 flex items-center justify-center shrink-0 bg-emerald-500/10">
                <TreePine className="w-5 h-5 text-emerald-500" />
              </div>
              <div className="flex flex-col">
                <span className="text-lg font-bold text-white leading-tight">15,000+</span>
                <span className="text-[10px] text-gray-300 mt-1">Tonnes of CO2 Saved</span>
                <span className="text-[9px] text-gray-500">Environment Impact</span>
              </div>
            </div>

            {/* Stat 4 */}
            <div className="bg-[#0A192F] border border-white/5 rounded-xl p-4 flex items-center gap-4 hover:border-emerald-500/30 transition-colors">
              <div className="w-10 h-10 rounded-full border border-emerald-500/20 flex items-center justify-center shrink-0 bg-emerald-500/10">
                <span className="text-emerald-500 font-bold">₹</span>
              </div>
              <div className="flex flex-col">
                <span className="text-lg font-bold text-white leading-tight">₹25+ Cr</span>
                <span className="text-[10px] text-gray-300 mt-1">Annual Savings</span>
                <span className="text-[9px] text-gray-500">For Our Customers</span>
              </div>
            </div>

            {/* Stat 5 */}
            <div className="bg-[#0A192F] border border-white/5 rounded-xl p-4 flex items-center gap-4 hover:border-emerald-500/30 transition-colors col-span-2 md:col-span-1">
              <div className="w-10 h-10 rounded-full border border-emerald-500/20 flex items-center justify-center shrink-0 bg-emerald-500/10">
                <Users className="w-5 h-5 text-emerald-500" />
              </div>
              <div className="flex flex-col">
                <span className="text-lg font-bold text-white leading-tight">15,000+</span>
                <span className="text-[10px] text-gray-300 mt-1">Happy Customers</span>
                <span className="text-[9px] text-gray-500">Across the Nation</span>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 5. Split Section: Performance & Documents */}
      <ProjectPerformance />

      {/* 6. Key Achievements */}
      <section className="py-8 bg-[#0B1120] border-t border-white/5 relative overflow-hidden">
        {/* Subtle background decoration */}
        <div className="absolute top-0 right-0 w-1/3 h-full bg-amber-500/5 -skew-x-12 transform origin-top-right"></div>
        
        <div className="max-w-[1400px] mx-auto px-4 sm:px-4 lg:px-6 relative z-10">
          <div className="text-center mb-8">
            <h3 className="text-xl font-black text-white mb-1">Our Key Achievements</h3>
            <p className="text-sm text-gray-400">Setting new benchmarks in India's solar landscape.</p>
          </div>
          
          <div className="grid grid-cols-2 lg:grid-cols-5 gap-3 lg:gap-4">
            <div onClick={() => openModal('CONTACT')} className="bg-[#0A192F] rounded-xl p-4 lg:p-5 border border-white/5 shadow-lg hover:border-amber-500/30 transition-all flex flex-col items-center text-center group cursor-pointer">
              <div className="w-10 h-10 rounded-lg bg-amber-500/10 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                <Building2 className="w-5 h-5 text-amber-500" />
              </div>
              <p className="text-2xl font-black text-white mb-1">1.2 MW</p>
              <p className="text-[10px] text-gray-400 uppercase font-bold tracking-widest">Largest Rooftop</p>
            </div>

            <div onClick={() => openModal('CONTACT')} className="bg-[#0A192F] rounded-xl p-4 lg:p-5 border border-white/5 shadow-lg hover:border-amber-500/30 transition-all flex flex-col items-center text-center group cursor-pointer">
              <div className="w-10 h-10 rounded-lg bg-amber-500/10 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                <Factory className="w-5 h-5 text-amber-500" />
              </div>
              <p className="text-2xl font-black text-white mb-1">5 MW</p>
              <p className="text-[10px] text-gray-400 uppercase font-bold tracking-widest">Largest Plant</p>
            </div>

            <div onClick={() => openModal('CONTACT')} className="bg-[#0A192F] rounded-xl p-4 lg:p-5 border border-white/5 shadow-lg hover:border-amber-500/30 transition-all flex flex-col items-center text-center group cursor-pointer">
              <div className="w-10 h-10 rounded-lg bg-amber-500/10 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                <Map className="w-5 h-5 text-amber-500" />
              </div>
              <p className="text-2xl font-black text-white mb-1">750+</p>
              <p className="text-[10px] text-gray-400 uppercase font-bold tracking-widest">Pumps Installed</p>
            </div>

            <div onClick={() => openModal('CONTACT')} className="bg-[#0A192F] rounded-xl p-4 lg:p-5 border border-white/5 shadow-lg hover:border-amber-500/30 transition-all flex flex-col items-center text-center group cursor-pointer">
              <div className="w-10 h-10 rounded-lg bg-amber-500/10 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                <Clock className="w-5 h-5 text-amber-500" />
              </div>
              <p className="text-2xl font-black text-white mb-1">7 Days</p>
              <p className="text-[10px] text-gray-400 uppercase font-bold tracking-widest">Fastest Install</p>
            </div>

            <div onClick={() => openModal('CONTACT')} className="bg-[#0A192F] rounded-xl p-4 lg:p-5 border border-white/5 shadow-lg hover:border-amber-500/30 transition-all flex flex-col items-center text-center group col-span-2 lg:col-span-1 cursor-pointer">
              <div className="w-10 h-10 rounded-lg bg-amber-500/10 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                <Award className="w-5 h-5 text-amber-500" />
              </div>
              <p className="text-2xl font-black text-white mb-1">2023</p>
              <p className="text-[10px] text-gray-400 uppercase font-bold tracking-widest">Excellence Award</p>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Our Clients */}
      <section className="py-8 bg-[#0B1120] border-t border-white/5">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-4 lg:px-6">
          <div className="flex flex-col lg:flex-row justify-between items-center mb-6 gap-6">
            <div className="text-center lg:text-left">
              <h3 className="text-xl font-black text-white mb-1">Trusted by Industry Leaders</h3>
              <p className="text-sm text-gray-400">Powering India's top enterprises with reliable solar energy.</p>
            </div>
            
            {/* Premium Pill Tabs - Dark Theme */}
            <div className="flex flex-wrap justify-center bg-[#0A192F] rounded-full p-1 border border-white/5 text-[11px] font-bold overflow-hidden shadow-inner">
               <button 
                 onClick={() => setActiveClientTab('All Clients')}
                 className={`${activeClientTab === 'All Clients' ? 'bg-amber-500 text-[#0B1120] shadow-md' : 'text-gray-400 hover:text-white hover:bg-white/5'} px-4 py-1.5 rounded-full flex items-center gap-1.5 transition-all`}>
                 <Building2 className="w-3 h-3"/> All Clients
               </button>
               <button 
                 onClick={() => setActiveClientTab('Residential')}
                 className={`${activeClientTab === 'Residential' ? 'bg-amber-500 text-[#0B1120] shadow-md' : 'text-gray-400 hover:text-white hover:bg-white/5'} px-4 py-1.5 rounded-full flex items-center gap-1.5 transition-all`}>
                 <Home className="w-3 h-3"/> Residential
               </button>
               <button 
                 onClick={() => setActiveClientTab('Industrial')}
                 className={`${activeClientTab === 'Industrial' ? 'bg-amber-500 text-[#0B1120] shadow-md' : 'text-gray-400 hover:text-white hover:bg-white/5'} px-4 py-1.5 rounded-full flex items-center gap-1.5 transition-all`}>
                 <Factory className="w-3 h-3"/> Industrial
               </button>
            </div>
          </div>
          
          {/* Logo Carousel Container - Dark Theme */}
          <div className="bg-[#0A192F] rounded-xl p-6 shadow-2xl border border-white/5 flex items-center justify-between relative group max-w-5xl mx-auto">
            <div className="flex w-full justify-center items-center px-4 gap-6 md:gap-12 lg:gap-16 grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-500 cursor-pointer">
              {/* Filtered logos adapted for dark theme */}
              {(activeClientTab === 'All Clients' || activeClientTab === 'Industrial') && (
                <div onClick={() => window.open('https://adani.com', '_blank')} className="text-xl font-black text-white hover:scale-105 transition-transform">adani<span className="font-medium text-[9px] block leading-none mt-1 text-blue-400 tracking-widest uppercase">Solar</span></div>
              )}
              {(activeClientTab === 'All Clients' || activeClientTab === 'Industrial' || activeClientTab === 'Residential') && (
                <div onClick={() => window.open('https://tatapower.com', '_blank')} className="text-xl font-black text-white hover:scale-105 transition-transform">TATA<span className="font-medium text-[9px] block leading-none mt-1 text-blue-500 tracking-widest uppercase">Power</span></div>
              )}
              {(activeClientTab === 'All Clients' || activeClientTab === 'Residential') && (
                <div onClick={() => window.open('https://waaree.com', '_blank')} className="text-xl font-black text-white hover:scale-105 transition-transform">WAAREE<span className="font-medium text-[9px] block text-amber-500 leading-none mt-1 tracking-wider uppercase">Solar</span></div>
              )}
              {(activeClientTab === 'All Clients' || activeClientTab === 'Industrial') && (
                <div onClick={() => window.open('https://vikramsolar.com', '_blank')} className="text-xl font-black text-white hover:scale-105 transition-transform">vikram</div>
              )}
              {(activeClientTab === 'All Clients' || activeClientTab === 'Residential') && (
                <div onClick={() => window.open('https://luminousindia.com', '_blank')} className="text-xl font-black text-white hidden md:block hover:scale-105 transition-transform">LUMINOUS<span className="text-yellow-500 block text-[9px] leading-none mt-1 tracking-widest uppercase">Solar</span></div>
              )}
              {(activeClientTab === 'All Clients' || activeClientTab === 'Industrial') && (
                <div onClick={() => window.open('https://longi.com', '_blank')} className="text-xl font-black text-white hidden lg:block hover:scale-105 transition-transform">LONGi<span className="font-medium text-[9px] block leading-none mt-1 text-red-500 tracking-widest uppercase">Solar</span></div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* 8. Bottom CTA */}
      <section className="py-8 px-4 sm:px-4 lg:px-6 bg-[#0B1120]">
        <div className="max-w-7xl mx-auto bg-[#0A192F] border border-white/10 rounded-2xl p-6 md:p-8 shadow-2xl flex flex-col md:flex-row items-center justify-between relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1509391366360-1e97f52ce23b?w=2000&q=80')] opacity-5 bg-cover bg-center"></div>
          
          <div className="relative z-10 mb-4 md:mb-0">
            <h2 className="text-xl md:text-2xl font-black text-white mb-2">Have a Project in Mind?</h2>
            <p className="text-xs text-gray-400">Let's build a clean and sustainable future together. Get a free consultation!</p>
          </div>
          <div className="relative z-10 flex flex-col sm:flex-row gap-3 w-full md:w-auto">
            <button onClick={() => openModal('CONTACT')} className="bg-amber-500 hover:bg-amber-400 text-[#0B1120] font-black py-2.5 px-5 text-sm rounded-lg shadow-lg flex items-center justify-center gap-2 transition-colors">
              Get Free Quote
            </button>
            <button onClick={() => openModal('CONTACT')} className="bg-transparent border border-white/20 hover:border-amber-500 hover:text-amber-500 text-white font-bold py-2.5 px-5 text-sm rounded-lg flex items-center justify-center gap-2 transition-colors">
              Book Site Survey
            </button>
          </div>
        </div>
      </section>
      
      {/* Project Details Modal */}
      {selectedProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4 py-8">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-gray-900/60 backdrop-blur-sm transition-opacity"
            onClick={() => setSelectedProject(null)}
          ></div>
          
          {/* Modal Content - Split Layout */}
          <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-5xl max-h-[90vh] overflow-hidden animate-in fade-in zoom-in-95 duration-200 flex flex-col md:flex-row">
            
            {/* Left Side: Image */}
            <div className="md:w-1/2 relative h-64 md:h-auto shrink-0 bg-gray-900">
              <img src={selectedProject.img} alt={selectedProject.title} className="w-full h-full object-cover opacity-90" />
              <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-gray-900/80 via-gray-900/20 to-transparent"></div>
              <div className="absolute bottom-8 left-8 right-8">
                <div className="inline-block px-3 py-1.5 rounded-full text-[10px] font-black uppercase text-white shadow-sm tracking-wider mb-4" style={{ backgroundColor: selectedProject.tag === 'Commercial' ? '#3B82F6' : selectedProject.tag === 'Industrial' ? '#8B5CF6' : selectedProject.tag === 'Agriculture' ? '#10B981' : '#F97316' }}>
                  {selectedProject.tag}
                </div>
                <div className="flex gap-4 text-white/80">
                  <div className="flex items-center gap-1.5"><FileText className="w-4 h-4" /> <span className="text-xs font-bold uppercase tracking-wider">Case Study</span></div>
                </div>
              </div>
            </div>
            
            {/* Right Side: Content */}
            <div className="md:w-1/2 p-6 sm:p-10 bg-white relative overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
              {/* Close Button */}
              <button 
                onClick={() => setSelectedProject(null)}
                className="absolute top-6 right-6 z-10 p-2 bg-gray-100 hover:bg-gray-200 rounded-full text-gray-500 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <h2 className="text-3xl font-black text-gray-900 leading-tight mb-2 pr-10">{selectedProject.title}</h2>
              <p className="text-gray-500 flex items-center gap-2 mb-8 font-medium"><MapPin className="w-4 h-4 text-gray-400" /> {selectedProject.loc}</p>
              
              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="bg-primary/5 p-5 rounded-2xl border border-primary/20 shadow-sm shadow-primary/10">
                  <p className="text-2xl font-black text-primary mb-1">{selectedProject.save}</p>
                  <p className="text-[10px] uppercase font-bold text-gray-500 flex items-center gap-1.5"><TrendingUp className="w-3.5 h-3.5 text-primary"/> Yearly Savings</p>
                </div>
                <div className="bg-gray-50 p-5 rounded-2xl border border-gray-100 shadow-sm">
                  <p className="text-2xl font-black text-gray-900 mb-1">{selectedProject.cap}</p>
                  <p className="text-[10px] uppercase font-bold text-gray-500 flex items-center gap-1.5"><Zap className="w-3.5 h-3.5 text-gray-400"/> System Capacity</p>
                </div>
                <div className="bg-gray-50 p-5 rounded-2xl border border-gray-100 shadow-sm col-span-2 flex items-center justify-between">
                  <div>
                    <p className="text-[10px] uppercase font-bold text-gray-500 mb-1">Total Project Cost</p>
                    <p className="text-xl font-black text-gray-900">{selectedProject.cost}</p>
                  </div>
                  <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center shadow-sm">
                    <Clock className="w-5 h-5 text-primary" />
                  </div>
                </div>
              </div>
              
              <div className="mb-10">
                <h3 className="text-sm uppercase tracking-wider font-bold text-gray-900 mb-3 border-b border-gray-100 pb-2">Project Overview</h3>
                <p className="text-sm text-gray-600 leading-relaxed mb-3">This state-of-the-art {selectedProject.cap} solar installation in {selectedProject.loc} showcases our commitment to delivering high-performance renewable energy solutions.</p>
                <p className="text-sm text-gray-600 leading-relaxed">The system is meticulously designed to maximize energy yield and provide substantial cost savings, paying for itself in under 4 years. By switching to solar, the client significantly reduced their carbon footprint while securing energy independence.</p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-3 pt-6 border-t border-gray-100 mt-auto">
                <button onClick={() => { setSelectedProject(null); openModal('CONTACT'); }} className="flex-1 py-3.5 px-5 rounded-xl font-bold text-[#0A192F] bg-primary hover:brightness-110 transition-all shadow-lg shadow-primary/20 flex items-center justify-center gap-2">Book Similar Project <ChevronRight className="w-4 h-4" /></button>
                <button onClick={() => setSelectedProject(null)} className="py-3.5 px-6 rounded-xl font-bold text-gray-600 bg-gray-100 hover:bg-gray-200 transition-colors text-center">Close</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

