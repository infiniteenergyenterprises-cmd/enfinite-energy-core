export const dynamic = 'force-dynamic';
export const revalidate = 0;
'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Zap, Leaf, Users, TrendingUp, CheckCircle2, ArrowRight, Sun,
  Building2, Sprout, Heart, MapPin, Phone, Mail, Download,
  Lightbulb, Target, Eye, BookOpen, Handshake, HardHat,
  Cpu, Wifi, BarChart3, Battery, Wrench, Settings,
  GraduationCap, TreePine, Home, Factory, School,
  Landmark, Stethoscope, Tractor, Clock, Award, Shield, X
} from 'lucide-react';

/* ─── DATA ─── */
const journey = [
  { year: '2021', title: 'Company Founded', desc: 'Started with a vision to make solar energy accessible to every Indian household and business.' },
  { year: '2022', title: '100+ Installations', desc: 'Rapid expansion across NCR with residential rooftop and small commercial solar projects.' },
  { year: '2023', title: 'Commercial Expansion', desc: 'Partnered with factories, schools and government institutions for large-scale solar projects.' },
  { year: '2024', title: 'Government Tie-ups', desc: 'Partnered with state DISCOMs and registered under PM Surya Ghar Yojana subsidy program.' },
  { year: '2025', title: '1000+ Installations', desc: 'Pan-India presence with 8+ office locations, 5+ states and 500+ channel partners.' },
  { year: 'Future', title: 'Pan-India Scale-up', desc: 'Targeting 10,000+ installations and 500 MW installed capacity by 2027.' },
];

const impactStats = [
  { val: '5,000+',    shortVal: '5K+',    label: 'Solar Installations', shortLabel: 'Solar Inst.', icon: <Sun       className="w-5 h-5 text-amber-400" />,   color: 'bg-amber-400/10 border-amber-400/20 text-white hover:border-amber-400/50', desc: 'Over 5,000 homes, factories, and schools powered across India, cutting down carbon footprints and utility dependency.' },
  { val: '50 MW+',    shortVal: '50MW+',  label: 'Installed Capacity',  shortLabel: 'Capacity',    icon: <Zap       className="w-5 h-5 text-blue-400" />,    color: 'bg-blue-400/10 border-blue-400/20 text-white hover:border-blue-400/50', desc: 'Over 50 Megawatts of premium solar power systems designed, engineered, and commissioned to date.' },
  { val: '₹15 Cr+',   shortVal: '₹15Cr+', label: 'Customer Savings',    shortLabel: 'Savings',     icon: <TrendingUp className="w-5 h-5 text-emerald-400"/>,color: 'bg-emerald-400/10 border-emerald-400/20 text-white hover:border-emerald-400/50', desc: 'Our clients have saved upwards of ₹15 Crores in electricity expenditures. Calculate your savings today!' },
  { val: '20+',       shortVal: '20+',    label: 'Cities Served',       shortLabel: 'Cities',      icon: <MapPin    className="w-5 h-5 text-purple-400" />, color: 'bg-purple-400/10 border-purple-400/20 text-white hover:border-purple-400/50', desc: 'Serving NCR, Uttar Pradesh, Bihar, Haryana, and beyond with local service centers.' },
  { val: '15,000+',   shortVal: '15K+',   label: 'Happy Customers',     shortLabel: 'Customers',   icon: <Heart     className="w-5 h-5 text-pink-400" />,    color: 'bg-pink-400/10 border-pink-400/20 text-white hover:border-pink-400/50', desc: 'Highly rated customer support, timely maintenance, and dependable installations.' },
  { val: '18K Tons',  shortVal: '18K T',  label: 'CO₂ Reduced',         shortLabel: 'CO₂ Saved',   icon: <Leaf      className="w-5 h-5 text-green-400" />,   color: 'bg-green-400/10 border-green-400/20 text-white hover:border-green-400/50', desc: 'Equivalent to planting thousands of trees, preventing harmful emissions every single year.' },
];

const industries = [
  { label: 'Residential',  img: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=300&q=80',  grad: 'from-orange-600/80', desc: 'Rooftop solar systems designed for houses and residential societies. Cuts monthly bills by up to 90% and increases property value.' },
  { label: 'Commercial',   img: 'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=300&q=80',  grad: 'from-blue-700/80', desc: 'Bespoke energy solutions for offices, showrooms, and corporate campuses looking to fulfill green targets and lower operational overheads.'   },
  { label: 'Industrial',   img: 'https://images.unsplash.com/photo-1565008576549-57569a49371d?w=300&q=80',  grad: 'from-gray-700/80', desc: 'High-capacity solar setups for heavy engineering, manufacturing plants, and warehousing facilities with large available roof spaces.'   },
  { label: 'Agriculture',  img: 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=300&q=80',  grad: 'from-green-700/80', desc: 'Solar pumps, drip-irrigation support systems, and decentralized microgrids to assist farmers with continuous, low-cost daylight power.'  },
  { label: 'Government',   img: 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=300&q=80',  grad: 'from-purple-700/80', desc: 'Grid-connected solar installations for public offices, community centers, and municipal corporations under direct tender systems.' },
  { label: 'Schools',      img: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=300&q=80',  grad: 'from-cyan-700/80', desc: 'Solar setups for educational institutions, engineering colleges, and public schools to run green campuses and lower school utility budgets.'   },
  { label: 'Hospitals',    img: 'https://images.unsplash.com/photo-1586773860418-d37222d8fce3?w=300&q=80',  grad: 'from-red-700/80', desc: '24/7 solar backup solutions combined with battery banks, ensuring life-saving healthcare units run on continuous, reliable clean energy.'    },
  { label: 'Factories',    img: 'https://images.unsplash.com/photo-1513828742140-ccaa28f3eda0?w=300&q=80',  grad: 'from-amber-800/80', desc: 'Zero-downtime grid-tied solar grids designed to withstand heavy machinery startups and run operations at minimum tariff.'  },
];

const services = [
  { icon: <Lightbulb className="w-5 h-5 text-amber-500"  />, label: 'Consultation',    desc: 'Expert solar analysis',          bg: 'bg-amber-50/40 border-amber-100 hover:bg-amber-50', details: 'Schedule a call with our solar energy consultants. We analyze your electricity bills, structural details, and suggest the right solar size.' },
  { icon: <MapPin     className="w-5 h-5 text-blue-500"   />, label: 'Site Survey',     desc: 'Rooftop mapping & checks',        bg: 'bg-blue-50/40 border-blue-100 hover:bg-blue-50', details: 'Our local engineers visit your property to evaluate shade structures, roof load capacity, and plan cable layouts.' },
  { icon: <Settings   className="w-5 h-5 text-purple-500" />, label: 'System Design',   desc: 'Customized engineering design',   bg: 'bg-purple-50/40 border-purple-100 hover:bg-purple-50', details: 'Using advanced 3D shading software, we design a customized CAD layout for maximum solar irradiation absorption.' },
  { icon: <Award      className="w-5 h-5 text-emerald-500"/>, label: 'Subsidy Support', desc: 'Govt subsidy facilitation',     bg: 'bg-emerald-50/40 border-emerald-100 hover:bg-emerald-50', details: 'Complete end-to-end guidance for the PM Surya Ghar Yojana. We upload documentation, perform checks, and get your subsidies approved.' },
  { icon: <HardHat    className="w-5 h-5 text-orange-500" />, label: 'Installation',    desc: 'Safe & certified installation',   bg: 'bg-orange-50/40 border-orange-100 hover:bg-orange-50', details: 'Fast, secure, and professional installation by certified workers adhering to highest safety protocols.' },
  { icon: <Wifi       className="w-5 h-5 text-cyan-500"   />, label: 'Net Metering',    desc: 'Grid connection assistance',      bg: 'bg-cyan-50/40 border-cyan-100 hover:bg-cyan-50', details: 'Export excess energy back to the grid. We facilitate the DISCOM liaison, bi-directional meter testing, and final connection.' },
  { icon: <BarChart3  className="w-5 h-5 text-indigo-500" />, label: 'Monitoring App',  desc: 'Real-time performance tracking',  bg: 'bg-indigo-50/40 border-indigo-100 hover:bg-indigo-50', details: 'Get access to our EnfiniteEnergy App. Monitor daily generation, lifetime savings, and carbon reduction directly on your phone.' },
  { icon: <Wrench     className="w-5 h-5 text-red-500"    />, label: 'Maintenance',     desc: 'Periodic cleaning & service',    bg: 'bg-red-50/40 border-red-100 hover:bg-red-50', details: 'Keep your solar panels operating at peak efficiency. We offer scheduled water cleaning, structural health checks, and wiring tests.' },
  { icon: <Phone      className="w-5 h-5 text-teal-500"   />, label: 'AMC Support',     desc: 'Annual maintenance contracts',    bg: 'bg-teal-50/40 border-teal-100 hover:bg-teal-50', details: 'Worry-free annual contracts covering all components, regular cleanup visits, diagnostic support, and instant part replacements.' },
  { icon: <Clock      className="w-5 h-5 text-pink-500"   />, label: '24/7 Assistance', desc: 'Instant support helpline',        bg: 'bg-pink-50/40 border-pink-100 hover:bg-pink-50', details: 'Got a query or noticed a drop in performance? Our emergency technician team is available around the clock to support.' },
];

const howWeWork = [
  { num: '01', title: 'Understand Your Needs',  desc: 'Our experts visit and analyse your energy consumption patterns', details: 'We analyze your past 12 months electricity bills to draft the optimal solar generation scope.'  },
  { num: '02', title: 'Site Survey',             desc: 'Rooftop area, shade analysis and electrical infrastructure check', details: 'Checking structural suitability, shade from nearby trees, and panel orientation plans.'  },
  { num: '03', title: 'Custom Design',           desc: 'Solar system designed specifically for your space & load', details: '3D modeling of your roof to place panels with optimal angles for maximum year-round generation.'         },
  { num: '04', title: 'Professional Install',    desc: 'Certified engineers install with strict quality checks', details: 'Safe installation using structure testing, DC cabling management, and safety grounding.'           },
  { num: '05', title: 'Testing & Commission',    desc: 'Full performance testing before system goes live', details: 'Rigorous voltage and component testing before obtaining DISCOM approval for net metering.'                 },
  { num: '06', title: 'Live Monitoring',         desc: 'Real-time app & dedicated support for the system lifetime', details: 'Handing over app logins to track solar power generation statistics 24/7.'        },
];

const techFeatures = [
  { icon: <Cpu       className="w-5 h-5 text-blue-400"   />, label: 'AI Energy Monitoring',  bg: 'bg-blue-500/10   border-blue-500/20', desc: 'Predictive generation modeling and fault detection using on-site hardware intelligence.'   },
  { icon: <BarChart3 className="w-5 h-5 text-emerald-400"/>, label: 'Smart Inverters',        bg: 'bg-emerald-400/10 border-emerald-400/20', desc: 'High-performance MPPT inverters converting DC to AC power with 98% efficiency.'},
  { icon: <Sun       className="w-5 h-5 text-amber-400"  />, label: 'Tier-1 Solar Panels',   bg: 'bg-amber-400/10  border-amber-400/20', desc: 'Monocrystalline half-cut cells offering top power conversion even in low-light conditions.'   },
  { icon: <Battery   className="w-5 h-5 text-purple-400" />, label: 'Battery Storage',        bg: 'bg-purple-400/10 border-purple-400/20', desc: 'Scalable hybrid storage packs for uninterrupted power during night grid outages.'  },
  { icon: <Wifi      className="w-5 h-5 text-cyan-400"   />, label: 'IoT Integration',        bg: 'bg-cyan-400/10   border-cyan-400/20', desc: 'Cellular and Wi-Fi linked remote data hubs pushing solar generation analytics directly to cloud.'    },
  { icon: <Settings  className="w-5 h-5 text-pink-400"   />, label: 'Remote Diagnostics',     bg: 'bg-pink-400/10   border-pink-400/20', desc: 'Instant warning updates received by our central desk in case of array performance degradation.'    },
  { icon: <TrendingUp className="w-5 h-5 text-orange-400"/>, label: 'Performance Alerts',     bg: 'bg-orange-400/10 border-orange-400/20', desc: 'Proactive user alerts in case of dirt accumulation or structural shading on arrays.'  },
  { icon: <Zap       className="w-5 h-5 text-yellow-400" />, label: 'EV Charging Ready',      bg: 'bg-yellow-400/10 border-yellow-400/20', desc: 'Smart bi-directional grid interface allowing direct solar power routing to electric vehicles.'  },
];

const certifications = [
  { label: 'MNRE Approved',   sub: 'Ministry of New & Renewable Energy', ico: '🏛️', desc: 'Fully certified and authorized channel partner of the Ministry of New & Renewable Energy, Govt of India.' },
  { label: 'ALMM Listed',     sub: 'Approved Models & Manufacturers List', ico: '📋', desc: 'Our modules are verified and selected from the Approved List of Models and Manufacturers, ensuring premium quality.' },
  { label: 'ISO 9001:2015',   sub: 'Quality Management System',           ico: '✅', desc: 'Certified for high-end international quality management system standards in engineering and maintenance.' },
  { label: 'ISO 14001',       sub: 'Environmental Management System',      ico: '🌱', desc: 'Adhering to strict eco-friendly waste management and green standards throughout operations.' },
  { label: 'IEC Certified',   sub: 'International Electrotechnical',       ico: '⚡', desc: 'Solar modules successfully pass rigorous international electrotechnical safety and lifetime durability tests.' },
  { label: '25 Yr Warranty',  sub: 'Performance guarantee on panels',      ico: '🛡️', desc: 'Backed by a linear power output performance warranty, guaranteeing at least 80% output after 25 years.' },
];

const team = [
  { name: 'Rajesh Sharma', role: 'Founder & CEO',    exp: '15+ years in renewable energy sector',         img: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=400&fit=crop&q=80', bio: 'Rajesh oversees strategic growth at Enfinite Energy, bringing over 15 years of project delivery experience in clean utilities.' },
  { name: 'Neha Verma',    role: 'CTO',              exp: 'Expert in solar technology & innovation',       img: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop&q=80', bio: 'Neha leads our R&D wing, focusing on smart grid integrations, AI energy monitors, and structural safety algorithms.' },
  { name: 'Amit Mehta',    role: 'COO',              exp: 'Operations leader with strong execution record', img: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&h=400&fit=crop&q=80', bio: 'Amit manages our end-to-end site survey operations, logistics, supply chains, and consumer relations divisions.' },
  { name: 'Vikram Singh',  role: 'Head – Projects',  exp: 'Ensures quality delivery on every project',     img: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&q=80', bio: 'Vikram coordinates on-site installers, local wiring partners, safety engineers, and DISCOM commissions.' },
];

const locations = [
  { city: 'Gurugram',  state: 'Haryana',         pin: '122001', type: 'HQ'     },
  { city: 'Delhi NCR', state: 'Delhi',            pin: '110001', type: 'Office' },
  { city: 'Noida',     state: 'Uttar Pradesh',    pin: '201301', type: 'Office' },
  { city: 'Vranshi',   state: 'Uttar Pradesh',    pin: '',       type: 'Office' },
  { city: 'Mumbai',    state: 'Maharashtra',      pin: '400001', type: 'Office' },
  { city: 'Bengaluru', state: 'Karnataka',        pin: '560001', type: 'Office' },
  { city: 'Bhabua',    state: 'Bihar',            pin: '821109', type: 'Office' },
  { city: 'Mohania',   state: 'Bihar',            pin: '821101', type: 'Office' },
];

export default function CompanyPage() {
  const [activeJ, setActiveJ] = useState(0);
  const [cmsStats,  setCmsStats]  = useState<{val:string;label:string}[]|null>(null);
  const [cmsTeam,   setCmsTeam]   = useState<any[]|null>(null);
  const [heroTitle, setHeroTitle] = useState("Powering India's Sustainable Future");
  const [heroDesc,  setHeroDesc]  = useState('We are a team of passionate engineers, sales professionals, and sustainability advocates committed to making solar energy accessible to every Indian.');
  const [heroImg,   setHeroImg]   = useState('');
  const [cmsFounder, setCmsFounder] = useState<any|null>(null);

  useEffect(() => {
    fetch((process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api') + '/content?t=' + Date.now(), { cache: 'no-store' })
      .then(r => r.json())
      .then(d => {
        const map = d.map || {};
        if (map['ABOUT_STATS'])    { try { setCmsStats(JSON.parse(map['ABOUT_STATS'].description || '[]')); } catch {} }
        if (map['ABOUT_TEAM'])     { try { setCmsTeam(JSON.parse(map['ABOUT_TEAM'].description || '[]')); } catch {} }
        if (map['ABOUT_FOUNDER'])  { try { setCmsFounder(JSON.parse(map['ABOUT_FOUNDER'].description || '{}')); } catch {} }
        if (map['ABOUT_HERO']) {
          if (map['ABOUT_HERO'].title)       setHeroTitle(map['ABOUT_HERO'].title);
          if (map['ABOUT_HERO'].description) setHeroDesc(map['ABOUT_HERO'].description);
          if (map['ABOUT_HERO'].imageUrl)    setHeroImg(map['ABOUT_HERO'].imageUrl);
        }
      })
      .catch(() => {});
  }, []);

  // Use CMS data if available, else fallback to hardcoded
  const displayStats = cmsStats && cmsStats.length > 0 ? cmsStats : impactStats.map(s => ({ val: s.val, label: s.label }));
  const displayTeam  = cmsTeam  && cmsTeam.length  > 0 ? cmsTeam  : team;
  const fallbackFounder = {
    name: 'Rajesh Sharma',
    role: 'Founder & CEO',
    img: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=400&fit=crop&q=80',
    bio: 'Rajesh oversees strategic growth at Enfinite Energy, bringing over 15 years of project delivery experience in clean utilities. His vision is to make solar energy accessible to every Indian household and business. Under his leadership, the company has grown from a visionary startup to one of India\'s most trusted solar energy solutions providers.'
  };
  const displayFounder = cmsFounder && cmsFounder.name ? cmsFounder : fallbackFounder;

  /* Modal state */
  const [modalContent, setModalContent] = useState<{ title: string; subtitle?: string; desc: string; type?: string } | null>(null);
  const [showSurveyForm, setShowSurveyForm] = useState(false);
  const [prefilledService, setPrefilledService] = useState('');

  // Form State
  const [formData, setFormData] = useState({ name: '', phone: '', address: '', solarNeed: '3kW - 5kW (Medium Home)' });
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleOpenDetail = (title: string, desc: string, subtitle?: string, type?: string) => {
    setModalContent({ title, desc, subtitle, type });
  };

  const handleOpenSurvey = (serviceName: string) => {
    setPrefilledService(serviceName);
    setFormData(prev => ({ ...prev, address: `Requesting details for: ${serviceName}` }));
    setShowSurveyForm(true);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
    setTimeout(() => {
      setFormSubmitted(false);
      setShowSurveyForm(false);
      setFormData({ name: '', phone: '', address: '', solarNeed: '3kW - 5kW (Medium Home)' });
    }, 2500);
  };

  return (
    <div className="bg-white min-h-screen text-gray-900">

      {/* ══ HERO ══ */}
      <section className="relative pt-12 pb-12 bg-[#0B1E3D] overflow-hidden">
        <div className="absolute inset-0 bg-[url('/20.png')] bg-cover bg-center opacity-85" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0B1E3D]/95 via-[#0B1E3D]/65 to-transparent" />
        <div className="absolute top-10 left-8 w-80 h-80 bg-[#F5A623]/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-16 w-60 h-60 bg-blue-500/10 rounded-full blur-3xl" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-4 lg:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">

            {/* Left */}
            <div>
              <div className="inline-flex items-center gap-2 bg-[#F5A623]/10 border border-[#F5A623]/30 text-[#F5A623] text-[10px] font-black uppercase tracking-widest px-4 py-1.5 rounded-full mb-5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#F5A623] animate-pulse" /> About Enfinite Energy
              </div>
              <h1 className="text-4xl md:text-5xl font-black text-white leading-tight mb-4">
                {heroTitle}
              </h1>
              <p className="text-white/60 text-sm leading-relaxed mb-7 max-w-lg">
                {heroDesc}
                Enfinite Energy is on a mission to accelerate India's transition to clean energy with smart, reliable and affordable solar solutions — from homes and hospitals to factories and farms.
              </p>
              <div className="flex flex-wrap gap-3">
                <button onClick={() => handleOpenSurvey('General Solar Consultation')} className="bg-[#F5A623] text-[#0B1E3D] font-black px-6 py-3 rounded-xl hover:brightness-110 transition-all shadow-lg shadow-[#F5A623]/20 text-sm flex items-center gap-2">
                  Get a Free Quote <ArrowRight className="w-4 h-4" />
                </button>
                <Link href="/our-work">
                  <button className="border border-white/20 text-white hover:border-[#F5A623]/50 hover:text-[#F5A623] font-bold px-6 py-3 rounded-xl transition-all text-sm flex items-center gap-2">
                    Our Projects <ArrowRight className="w-4 h-4" />
                  </button>
                </Link>
              </div>

              {/* Trust highlights */}
              <div className="mt-8 flex flex-wrap gap-5 border-t border-white/10 pt-6">
                {[
                  { text: '90% Bill Savings', desc: 'Lower electricity costs' },
                  { text: 'Govt Subsidy Support', desc: 'Registered MNRE channel partner' },
                  { text: '25-Year Warranty', desc: 'Long-term performance guarantee' }
                ].map((item, i) => (
                  <div key={i} onClick={() => handleOpenDetail(item.text, 'We tailor our technology to reduce power dependency and unlock maximum financial savings.', 'Key Benefit')} className="flex items-start gap-2 max-w-[170px] cursor-pointer hover:opacity-80 transition-opacity">
                    <CheckCircle2 className="w-4 h-4 text-[#F5A623] shrink-0 mt-0.5" />
                    <div>
                      <p className="text-xs font-black text-white leading-tight">{item.text}</p>
                      <p className="text-[10px] text-white/45 mt-0.5 leading-snug">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right — Mission/Vision/Values/Commitment 2×2 */}
            <div className="grid grid-cols-2 gap-3">
              {[
                { icon: <Target  className="w-5 h-5 text-[#F5A623]" />, title: 'Our Mission', desc: 'Move clean solar energy accessible to every home and business across India.' },
                { icon: <Eye     className="w-5 h-5 text-blue-400"  />, title: 'Our Vision',  desc: "Be India's most trusted and innovative renewable energy company." },
                { icon: <BookOpen className="w-5 h-5 text-emerald-400"/>, title: 'Our Values', desc: 'Integrity, Innovation, Sustainability and Excellence — in every project.' },
                { icon: <Handshake className="w-5 h-5 text-pink-400"/>, title: 'Our Commitment', desc: 'We deliver beyond expectations and stand by every installation we do.' },
              ].map((c,i) => (
                <div key={i} onClick={() => handleOpenDetail(c.title, c.desc, 'Our Core Values')} className="backdrop-blur-sm bg-white/5 border border-white/10 hover:border-[#F5A623]/30 hover:bg-white/10 rounded-xl p-4 transition-all cursor-pointer">
                  <div className="mb-2">{c.icon}</div>
                  <p className="text-xs font-black text-white mb-1">{c.title}</p>
                  <p className="text-[11px] text-white/50 leading-relaxed">{c.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══ IMPACT STATS BAR ══ */}
      <section className="max-w-7xl mx-auto px-4 sm:px-4 lg:px-6 -mt-5 relative z-10 mb-8">
        <div className="bg-[#0B1E3D] border border-white/10 rounded-xl px-4 py-3 shadow-2xl">
          <div className="grid grid-cols-6 gap-1 md:gap-3">
            {displayStats.map((s,i) => (
              <div key={i} className="rounded-md border border-white/10 p-0.5 md:px-2 md:py-2.5 text-center hover:scale-[1.03] transition-all bg-white/5 cursor-default">
                <p className="text-[9px] sm:text-base font-black text-white leading-none">{s.val}</p>
                <p className="text-[5.5px] sm:text-[10px] text-white/50 mt-0.5 leading-none font-medium uppercase tracking-wider">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ COMPANY STORY ══ */}
      <section className="max-w-7xl mx-auto px-4 sm:px-4 lg:px-6 mb-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          {/* Left Text */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <div className="w-6 h-[2px] bg-[#F5A623] shrink-0" />
              <p className="text-[#F5A623] text-xs font-black uppercase tracking-widest leading-none">Who We Are</p>
            </div>
            <h2 className="text-2xl md:text-3xl font-black text-gray-900 mb-4 leading-tight">
              Empowering Lives with<br />
              <span className="text-[#F5A623]">Sustainable Energy Solutions</span>
            </h2>
            <div className="text-sm text-gray-600 space-y-3.5 leading-relaxed font-medium">
              <p className="text-base text-gray-800 font-semibold leading-relaxed">
                Founded in 2021, Enfinite Energy has grown from a visionary startup to one of India's most trusted solar energy solutions providers. We specialize in designing, engineering, installing, and maintaining premium rooftop and ground-mounted solar power systems across residential, commercial, and agricultural sectors.
              </p>
              <p className="text-[13px] md:text-sm text-gray-500">
                We believe that transitioning to clean energy is a powerful economic opportunity. By tailoring our state-of-the-art solar technology to the unique consumption patterns of each client, we help reduce monthly electricity bills by up to 90%. As an authorized MNRE channel partner under the PM Surya Ghar Yojana program, we guide customers seamlessly through government subsidies and net metering integrations.
              </p>
              <p className="text-[13px] md:text-sm text-gray-500">
                With a strong presence across 8 cities and 5 states, including dedicated local offices in Bhabua, Mohania, and Varanasi, we are deeply committed to regional development. Every project we undertake is backed by a 25-year performance warranty and managed by our certified engineers to ensure long-term reliability.
              </p>
            </div>
          </div>
          {/* Right Image */}
          <div onClick={() => handleOpenSurvey('Site Assessment')} className="relative rounded-xl overflow-hidden shadow-xl border border-gray-100 aspect-video lg:aspect-[4/3] group bg-[#0B1E3D] cursor-pointer">
            <img 
              src="/17.png" 
              alt="Enfinite Energy Corporate Story" 
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0B1E3D]/50 to-transparent pointer-events-none" />
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-all">
              <p className="bg-[#F5A623] text-[#0B1E3D] font-black text-xs px-4 py-2 rounded-xl shadow flex items-center gap-1.5"><Sun className="w-4 h-4 animate-spin"/> Book Site Survey Now</p>
            </div>
          </div>
        </div>
      </section>

      {/* ══ FOUNDER SECTION ══ */}
      <section className="max-w-7xl mx-auto px-4 sm:px-4 lg:px-6 mb-12">
        <div className="bg-white border border-gray-100 rounded-3xl p-8 md:p-14 shadow-lg relative min-h-[450px] flex items-center">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#F5A623]/10 rounded-full blur-3xl pointer-events-none -translate-y-1/2 translate-x-1/2" />
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-14 items-center relative z-10 w-full">
            <div className="md:col-span-5 flex justify-center shrink-0">
              <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-2xl overflow-hidden ring-4 ring-white shadow-xl group">
                <img src={displayFounder.img} alt={displayFounder.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B1E3D]/80 via-transparent to-transparent opacity-80" />
                <div className="absolute bottom-5 left-5 text-white">
                  <p className="font-black text-2xl">{displayFounder.name}</p>
                  <p className="text-base text-[#F5A623] font-bold">{displayFounder.role}</p>
                </div>
              </div>
            </div>
            <div className="md:col-span-7 py-4">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-[2px] bg-[#F5A623] shrink-0" />
                <p className="text-[#F5A623] text-sm font-black uppercase tracking-widest leading-none">A Message From The Founder</p>
              </div>
              <h2 className="text-2xl md:text-4xl font-black text-gray-900 mb-5 leading-tight">
                Driving the <span className="text-[#F5A623]">Solar Revolution</span>
              </h2>
              <div className="text-gray-600 space-y-5 text-lg leading-relaxed">
                {displayFounder.bio.split('\n').map((para: string, idx: number) => (
                  <p key={idx}>{para}</p>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══ OUR JOURNEY ══ */}
      <section id="journey" className="max-w-7xl mx-auto px-4 sm:px-4 lg:px-6 mb-12">
        <div className="mb-7 flex flex-col sm:flex-row items-start sm:items-end justify-between gap-2 sm:gap-0">
          <div>
            <p className="text-[#F5A623] text-[10px] font-black uppercase tracking-widest mb-1">Our Journey</p>
            <h2 className="text-xl sm:text-2xl font-black text-gray-900 leading-tight">From Startup to Solar Leader</h2>
          </div>
          <span className="text-[11px] sm:text-xs text-gray-400 font-bold sm:font-semibold whitespace-nowrap">2021 &rarr; 2025 &amp; Beyond</span>
        </div>

        {/* Timeline dots */}
        <div className="relative mb-4">
          <div className="absolute top-4 md:top-6 left-[6%] right-[6%] md:left-0 md:right-0 h-0.5 bg-gradient-to-r from-transparent via-[#F5A623]/60 to-transparent" />
          <div className="grid grid-cols-6 gap-1 md:gap-3">
            {journey.map((j,i) => (
              <button key={i} onClick={()=>setActiveJ(i)}
                className={`flex flex-col items-center gap-1.5 md:gap-2 transition-all group ${activeJ===i?'':'opacity-60 hover:opacity-90'}`}>
                <div className={`w-8 h-8 md:w-12 md:h-12 rounded-full flex items-center justify-center text-[10px] md:text-xs font-black border-2 transition-all relative z-10 ${activeJ===i ? 'bg-[#F5A623] border-[#F5A623] text-[#0B1E3D] scale-110 shadow-lg shadow-[#F5A623]/30' : 'bg-white border-gray-200 text-gray-600'}`}>
                  {j.year==='Future'?'🚀':j.year.slice(2)}
                </div>
                <span className={`text-[8px] md:text-[10px] font-black uppercase tracking-wide ${activeJ===i?'text-[#F5A623]':'text-gray-400'}`}>{j.year}</span>
              </button>
            ))}
          </div>
        </div>
        {/* Detail card */}
        <div onClick={() => handleOpenSurvey(`Inquiry based on ${journey[activeJ].year} Milestone`)} className="bg-gradient-to-r from-[#0B1E3D] to-[#1a3260] border border-white/10 rounded-2xl p-6 flex items-start gap-5 cursor-pointer hover:brightness-110 transition-all">
          <div className="w-12 h-12 rounded-xl bg-[#F5A623] text-[#0B1E3D] flex items-center justify-center font-black text-sm shrink-0 shadow-lg shadow-[#F5A623]/30">
            {journey[activeJ].year==='Future'?'🚀':journey[activeJ].year.slice(2)}
          </div>
          <div>
            <p className="text-[10px] text-[#F5A623] font-black uppercase tracking-widest mb-1">{journey[activeJ].year} Milestone</p>
            <h3 className="text-base font-black text-white mb-1">{journey[activeJ].title}</h3>
            <p className="text-sm text-white/55 leading-relaxed">{journey[activeJ].desc}</p>
          </div>
        </div>
      </section>

      {/* ══ WHERE WE WORK + INDUSTRIES ══ */}
      <section className="bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-4 lg:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

            {/* Where We Work */}
            <div className="relative overflow-hidden bg-gradient-to-br from-[#0B1E3D] to-[#1a3260] border border-white/10 rounded-2xl p-6 shadow-lg">
              <div className="absolute top-0 right-0 w-56 h-56 bg-[#F5A623]/10 rounded-full blur-3xl pointer-events-none" />
              <div className="relative z-10">
                <p className="text-[#F5A623] text-[10px] font-black uppercase tracking-widest mb-1">Where We Work</p>
                <h3 className="text-xl font-black text-white mb-3">Spreading Clean Energy<br />Across India</h3>
                <div className="grid grid-cols-2 gap-1.5 mb-4">
                  {['Projects across 10+ States','50+ Cities and Growing','500+ Channel Partners','Pan-India Expansion Underway'].map((f,i)=>(
                    <div key={i} className="flex items-center gap-2 text-white/65 text-xs">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />{f}
                    </div>
                  ))}
                </div>
                {/* Locations grid */}
                <div className="grid grid-cols-2 gap-2 mb-4">
                  {locations.map((loc,i)=>(
                    <div key={i} onClick={() => handleOpenSurvey(`Survey for ${loc.city} (${loc.state})`)} className="bg-white/5 border border-white/10 rounded-lg px-3 py-2 flex items-center gap-2 cursor-pointer hover:bg-white/10 hover:border-[#F5A623]/35 transition-all">
                      <MapPin className="w-3 h-3 text-[#F5A623] shrink-0" />
                      <div className="min-w-0">
                        <p className="text-xs font-black text-white truncate">
                          {loc.city}{loc.pin?` – ${loc.pin}`:''}
                        </p>
                        <p className="text-[9px] text-white/40">{loc.state} · {loc.type}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <Link href="/our-work">
                  <button className="bg-[#F5A623] text-[#0B1E3D] font-black text-sm px-5 py-2.5 rounded-xl hover:brightness-110 transition-all flex items-center gap-2">
                    View Our Projects <ArrowRight className="w-4 h-4" />
                  </button>
                </Link>
              </div>
            </div>

            {/* Industries */}
            <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-lg">
              <p className="text-[#F5A623] text-[10px] font-black uppercase tracking-widest mb-1">Industries We Serve</p>
              <h3 className="text-xl font-black text-gray-900 mb-4">Solar For Every Sector</h3>
              <div className="grid grid-cols-4 gap-2">
                {industries.map((ind,i)=>(
                  <div key={i} onClick={() => handleOpenDetail(ind.label, ind.desc, 'Solutions Sector', 'industry')} className="group relative rounded-xl overflow-hidden aspect-square cursor-pointer">
                    <img src={ind.img} alt={ind.label} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                    <div className={`absolute inset-0 bg-gradient-to-t ${ind.grad} to-transparent`} />
                    <div className="absolute inset-x-0 bottom-0 pb-1.5 text-center">
                      <p className="text-white font-black text-[10px] drop-shadow">{ind.label}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══ SERVICES + HOW WE WORK ══ */}
      <section className="max-w-7xl mx-auto px-4 sm:px-4 lg:px-6 py-6 sm:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          
          {/* Services */}
          <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm flex flex-col">
            <p className="text-[#F5A623] text-[10px] font-black uppercase tracking-widest mb-1">Our Services Ecosystem</p>
            <h3 className="text-xl font-black text-gray-900 mb-3">Everything Solar. Under One Roof.</h3>
            <div className="grid grid-cols-2 gap-2.5 mb-4">
              {services.map((s,i)=>(
                <div key={i} onClick={() => handleOpenDetail(s.label, s.details, 'Service Details', 'service')} className={`rounded-xl border p-3 flex items-center gap-3 transition-all hover:scale-[1.02] cursor-pointer ${s.bg}`}>
                  <div className="w-9 h-9 rounded-lg bg-white flex items-center justify-center border border-black/5 shadow-sm shrink-0">
                    {s.icon}
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs font-black text-gray-800 leading-tight">{s.label}</p>
                    <p className="text-[10px] text-gray-500 mt-0.5 leading-snug">{s.desc}</p>
                  </div>
                </div>
              ))}
            </div>
            {/* Guarantee strip */}
            <div className="bg-[#0B1E3D] rounded-xl py-3 px-4 grid grid-cols-3 gap-3 text-center mt-auto">
              {[{v:'₹0 Cost',l:'Site Survey'},{v:'25 Year',l:'Panel Warranty'},{v:'24/7',l:'Customer Support'}].map((g,i)=>(
                <div key={i} onClick={() => handleOpenSurvey(`${g.l} Inquiry`)} className="cursor-pointer hover:opacity-80 transition-opacity">
                  <p className="text-sm font-black text-[#F5A623]">{g.v}</p>
                  <p className="text-[9px] text-white/50 uppercase tracking-wide mt-0.5">{g.l}</p>
                </div>
              ))}
            </div>
          </div>

          {/* How We Work */}
          <div className="relative overflow-hidden bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-100 rounded-2xl p-6 shadow-sm">
            <div className="absolute top-0 right-0 w-48 h-48 bg-[#F5A623]/15 rounded-full blur-3xl pointer-events-none" />
            <div className="relative z-10">
              <p className="text-[#F5A623] text-[10px] font-black uppercase tracking-widest mb-1">How We Work</p>
              <h3 className="text-xl font-black text-gray-900 mb-4">Our 6-Step Process</h3>
              <div className="flex flex-col gap-2.5">
                {howWeWork.map((s,i)=>(
                  <div key={i} onClick={() => handleOpenDetail(s.title, s.details, `Step ${s.num}`)} className="flex items-start gap-3 group cursor-pointer">
                    <div className="relative flex flex-col items-center shrink-0">
                      <div className="w-8 h-8 rounded-full bg-[#F5A623] text-[#0B1E3D] font-black text-xs flex items-center justify-center shadow-md shadow-[#F5A623]/30 group-hover:scale-110 transition-transform">{s.num}</div>
                      {i<howWeWork.length-1 && <div className="w-0.5 h-4 bg-gradient-to-b from-[#F5A623]/50 to-transparent mt-1" />}
                    </div>
                    <div className="pt-1">
                      <p className="text-sm font-black text-gray-900 leading-snug">{s.title}</p>
                      <p className="text-[11px] text-gray-500 mt-0.5 leading-relaxed">{s.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══ TECHNOLOGY + CERTIFICATIONS ══ */}
      <section className="bg-gray-50 py-6 sm:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-4 lg:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

            {/* Technology */}
            <div className="relative overflow-hidden bg-gradient-to-br from-[#0B1E3D] to-[#16304f] border border-white/10 rounded-2xl p-6 shadow-lg">
              <div className="absolute top-0 right-0 w-48 h-48 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-40 h-40 bg-[#F5A623]/10 rounded-full blur-3xl pointer-events-none" />
              <div className="relative z-10">
                <p className="text-[#F5A623] text-[10px] font-black uppercase tracking-widest mb-1">Our Technology</p>
                <h3 className="text-xl font-black text-white mb-1">Smart Solutions.</h3>
                <p className="text-xl font-black text-[#F5A623] mb-4">Superior Performance.</p>
                <div className="grid grid-cols-4 gap-2.5 mb-5">
                  {techFeatures.map((t,i)=>(
                    <div key={i} onClick={() => handleOpenDetail(t.label, t.desc, 'Core Technology')} className={`border rounded-xl p-2.5 text-center hover:scale-105 transition-all cursor-pointer ${t.bg}`}>
                      <div className="flex justify-center mb-1.5">{t.icon}</div>
                      <p className="text-[9px] font-black text-white/75 leading-tight">{t.label}</p>
                    </div>
                  ))}
                </div>
                <div className="border-t border-white/10 pt-4 grid grid-cols-3 gap-3 text-center">
                  {[{v:'99.5%',l:'System Uptime'},{v:'25 Yr',l:'Panel Lifetime'},{v:'10 Yr',l:'Inverter Life'}].map((s,i)=>(
                    <div key={i} className="bg-white/5 border border-white/10 rounded-xl p-3">
                      <p className="text-lg font-black text-[#F5A623]">{s.v}</p>
                      <p className="text-[10px] text-white/40 uppercase tracking-wide">{s.l}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Certifications */}
            <div className="bg-[#0B1E3D] border border-white/10 rounded-2xl p-6 shadow-lg flex flex-col relative overflow-hidden">
              <div className="absolute top-0 right-0 w-48 h-48 bg-[#F5A623]/5 rounded-full blur-3xl pointer-events-none" />
              <div className="relative z-10 flex flex-col flex-1">
                <p className="text-[#F5A623] text-[10px] font-black uppercase tracking-widest mb-1">Quality & Certifications</p>
                <h3 className="text-xl font-black text-white mb-1">Certified. Trusted.</h3>
                <p className="text-xl font-black text-[#F5A623] mb-4">Committed to Quality.</p>
                <div className="grid grid-cols-3 gap-3 flex-1">
                  {certifications.map((c,i)=>(
                    <div key={i} onClick={() => handleOpenDetail(c.label, c.desc, 'Official Certification')} className="bg-white/5 border border-white/10 rounded-xl p-3 text-center hover:border-[#F5A623]/50 hover:bg-white/10 hover:scale-105 transition-all group cursor-pointer flex flex-col items-center justify-center gap-1">
                      <div className="text-2xl">{c.ico}</div>
                      <p className="text-xs font-black text-white leading-snug text-center">{c.label}</p>
                      <p className="text-[9px] text-white/50 leading-tight text-center">{c.sub}</p>
                    </div>
                  ))}
                </div>
                <a href="/company-profile.pdf" download className="mt-4">
                  <button className="w-full flex items-center justify-center gap-2 bg-[#F5A623] hover:brightness-110 text-[#0B1E3D] font-black text-sm py-3 rounded-xl transition-all shadow-md">
                    <Download className="w-4 h-4" /> Download Company Profile
                  </button>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>



      {/* ══ LEADERSHIP TEAM ══ */}
      <section id="leadership" className="max-w-7xl mx-auto px-4 sm:px-4 lg:px-6 py-12 scroll-mt-12">
        <div className="mb-8 flex flex-col sm:flex-row items-start sm:items-end justify-between gap-3 sm:gap-0">
          <div>
            <p className="text-[#F5A623] text-[10px] font-black uppercase tracking-widest mb-1">Meet Our Leadership</p>
            <h2 className="text-xl sm:text-2xl font-black text-gray-900 leading-tight">The People Behind the Power</h2>
            <p className="text-xs sm:text-sm text-gray-500 mt-1">Expert leaders, passionate about India&apos;s clean energy future every single day.</p>
          </div>
          <Link href="/careers">
            <button className="border border-[#0B1E3D] text-[#0B1E3D] hover:bg-[#0B1E3D] hover:text-white font-bold text-xs sm:text-sm px-4 py-2 sm:px-5 sm:py-2.5 rounded-xl transition-all flex items-center gap-2 whitespace-nowrap">
              Join Our Team <ArrowRight className="w-4 h-4" />
            </button>
          </Link>
        </div>
        <div className="flex overflow-x-auto snap-x snap-mandatory pb-4 gap-4 md:grid md:grid-cols-4 lg:grid-cols-5 md:overflow-x-visible md:pb-0 scrollbar-hide">
          {displayTeam.map((t,i)=>(
            <div key={i} onClick={() => handleOpenDetail(t.name, t.bio, `${t.role} (${t.exp})`, 'member')} className="bg-white border border-gray-100 rounded-2xl p-5 text-center shadow-sm hover:shadow-md hover:-translate-y-1 transition-all group cursor-pointer w-[245px] md:w-auto shrink-0 snap-start flex flex-col items-center">
              <div className="w-24 h-24 mx-auto rounded-full overflow-hidden border-3 border-[#F5A623]/20 mb-3 group-hover:border-[#F5A623]/60 transition-all shrink-0">
                <img src={t.img} alt={t.name} className="w-full h-full object-cover" />
              </div>
              <h3 className="text-sm font-black text-gray-900">{t.name}</h3>
              <p className="text-[11px] text-[#F5A623] font-bold mt-0.5">{t.role}</p>
              <p className="text-[10px] text-gray-500 mt-1.5 leading-relaxed line-clamp-3 h-[45px]">{t.bio || t.exp}</p>
              <div className="flex justify-center gap-2 mt-3" onClick={(e)=>e.stopPropagation()}>
                <a href={t.linkedin || "https://linkedin.com"} target="_blank" rel="noreferrer" className="w-7 h-7 bg-blue-50 border border-blue-100 rounded-lg flex items-center justify-center text-blue-600 hover:bg-blue-100 transition-all text-[10px] font-black">in</a>
                <a href={t.email ? `mailto:${t.email}` : `mailto:infiniteenergyenterprises@gmail.com?subject=Inquiry to ${t.name}`} className="w-7 h-7 bg-gray-50 border border-gray-100 rounded-lg flex items-center justify-center text-gray-500 hover:bg-gray-100 transition-all">
                  <Mail className="w-3 h-3" />
                </a>
              </div>
            </div>
          ))}

          {/* Team photo dark card */}
          <div className="relative overflow-hidden bg-gradient-to-br from-[#0B1E3D] to-[#1a3260] rounded-2xl p-5 shadow-lg flex flex-col justify-between w-[245px] md:w-auto shrink-0 snap-start">
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?w=400&q=80')] bg-cover bg-center opacity-15" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0B1E3D] via-[#0B1E3D]/80 to-transparent" />
            <div className="relative z-10 flex flex-col h-full justify-between">
              <div>
                <p className="text-[#F5A623] text-[10px] font-black uppercase tracking-widest mb-2">Our Strength</p>
                <p className="text-xs text-white/60 leading-relaxed">Our greatest asset is our dedicated team of 500+ solar professionals.</p>
              </div>
              <Link href="/careers">
                <button className="w-full mt-4 bg-[#F5A623] text-[#0B1E3D] font-black text-xs py-2.5 rounded-xl hover:brightness-110 transition-all flex items-center justify-center gap-1.5">
                  View Open Roles <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ══ CSR / SUSTAINABILITY ══ */}
      <section className="bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-4 lg:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">

            {/* Big CSR card */}
            <div onClick={() => handleOpenDetail('Solar for a Better India', 'We are dedicated to sustainable corporate models. We offset emissions, plant trees locally in Bihar and NCR, and fund scholarships.', 'CSR Mission')} className="lg:col-span-2 relative overflow-hidden bg-gradient-to-br from-[#0B1E3D] to-[#16304f] border border-white/10 rounded-2xl p-7 shadow-lg cursor-pointer hover:brightness-110 transition-all">
              <div className="absolute top-0 right-0 w-56 h-56 bg-white/10 rounded-full blur-3xl pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-40 h-40 bg-black/10 rounded-full blur-3xl pointer-events-none" />
              <div className="relative z-10">
                <p className="text-[#F5A623] text-[10px] font-black uppercase tracking-widest mb-2">Corporate Social Responsibility</p>
                <h3 className="text-2xl font-black text-white mb-2">Solar for a Better India 🌱</h3>
                <p className="text-white/65 text-sm leading-relaxed mb-5 max-w-lg">
                  Beyond business, we plant 10 trees for every installation, run free solar education workshops for rural communities, and support girl child education through our Clean Earth Foundation.
                </p>
                <div className="grid grid-cols-3 gap-3">
                  {[{v:'50,000+',l:'Trees Planted',i:<TreePine className="w-4 h-4"/>},{v:'200+',l:'Villages Reached',i:<Home className="w-4 h-4"/>},{v:'18K Tons',l:'CO₂ Offset',i:<Leaf className="w-4 h-4"/>}].map((s,i)=>(
                    <div key={i} className="bg-white/10 border border-white/15 rounded-xl p-3.5 text-center">
                      <div className="flex justify-center text-[#F5A623] mb-1.5">{s.i}</div>
                      <p className="text-lg font-black text-white">{s.v}</p>
                      <p className="text-[10px] text-white/50 uppercase tracking-wide mt-0.5">{s.l}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* CSR pillars */}
            <div className="flex flex-col gap-3">
              {[
                { icon:<GraduationCap className="w-5 h-5 text-blue-400"/>, title:'Solar Education', desc:'Free workshops for rural students and farmers on solar energy benefits.', bg:'bg-[#0B1E3D] border-white/10' },
                { icon:<Heart className="w-5 h-5 text-pink-400"/>, title:'Girl Child Initiative', desc:'Scholarships for girl students in STEM via the Clean Earth Foundation.', bg:'bg-[#0B1E3D] border-white/10' },
                { icon:<Sprout className="w-5 h-5 text-emerald-400"/>, title:'Green Planet Drive', desc:'10 trees are planted for every single solar installation we complete.', bg:'bg-[#0B1E3D] border-white/10' },
              ].map((c,i)=>(
                <div key={i} onClick={() => handleOpenDetail(c.title, c.desc, 'CSR Pillar')} className={`border rounded-xl p-4 flex items-start gap-3 hover:scale-[1.02] hover:border-[#F5A623]/40 transition-all cursor-pointer ${c.bg}`}>
                  <div className="shrink-0 mt-0.5">{c.icon}</div>
                  <div>
                    <p className="text-sm font-black text-white">{c.title}</p>
                    <p className="text-[11px] text-white/50 mt-0.5 leading-relaxed">{c.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══ BOTTOM CTA ══ */}
      <section className="max-w-7xl mx-auto px-4 sm:px-4 lg:px-6 py-12">
        <div className="relative rounded-2xl overflow-hidden bg-[#0B1E3D]">
          {/* Background image */}
          <div className="absolute inset-0 bg-[url('/21.png')] bg-cover bg-center opacity-85" />
          {/* Dark gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#0B1E3D]/95 via-[#0B1E3D]/70 to-transparent" />
          <div className="absolute top-0 left-1/4 w-80 h-40 bg-[#F5A623]/15 rounded-full blur-3xl pointer-events-none" />
          
          <div className="relative z-10 px-8 py-10 text-left md:max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-[#F5A623]/10 border border-[#F5A623]/30 text-[#F5A623] text-[10px] font-black uppercase tracking-widest px-4 py-1.5 rounded-full mb-5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#F5A623] animate-pulse" /> Start Your Solar Journey Today
            </div>
            <h2 className="text-3xl md:text-4xl font-black text-white mb-3 leading-tight">
              Ready to Go Solar?<br /><span className="text-[#F5A623]">Let's Get Started!</span>
            </h2>
            <p className="text-white/60 text-sm mb-7 leading-relaxed max-w-xl">
              Lower electricity bills by up to 90%. Trusted by 15,000+ customers. 25-year performance warranty. 24/7 expert support.
            </p>
            <div className="flex flex-wrap gap-4 mb-8">
              <button onClick={() => handleOpenSurvey('Bottom CTA Quote')} className="bg-[#F5A623] text-[#0B1E3D] font-black px-8 py-3.5 rounded-xl hover:brightness-110 transition-all shadow-xl shadow-[#F5A623]/25 text-sm flex items-center gap-2">
                Get a Free Quote <ArrowRight className="w-4 h-4" />
              </button>
              <button onClick={() => handleOpenSurvey('Site Survey request')} className="border border-white/20 bg-white/5 text-white hover:border-[#F5A623]/60 hover:text-[#F5A623] font-bold px-8 py-3.5 rounded-xl transition-all text-sm flex items-center gap-2">
                <Phone className="w-4 h-4" /> Book a Site Survey
              </button>
            </div>
            {/* Footer stats row */}
            <div className="border-t border-white/10 pt-6 grid grid-cols-3 md:grid-cols-6 gap-4 max-w-3xl">
              {[{v:'5,000+',l:'Installations'},{v:'50 MW+',l:'Capacity'},{v:'20+',l:'Cities'},{v:'15K+',l:'Customers'},{v:'18K Tons',l:'CO₂ Reduced'},{v:'24/7',l:'Support'}].map((s,i)=>(
                <div key={i} onClick={() => handleOpenDetail(s.l, `Our verified milestone: ${s.v} achieved nationwide.`, 'Milestone Status')} className="text-left cursor-pointer hover:opacity-85">
                  <p className="text-base font-black text-[#F5A623]">{s.v}</p>
                  <p className="text-[10px] text-white/45 uppercase tracking-wide mt-0.5">{s.l}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════ MODALS (CLICKABLE INTERACTIVE SYSTEM) ══════════════════════ */}
      
      {/* 1. Universal Detail Modal */}
      {modalContent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-[#0B1E3D] border border-white/10 rounded-2xl w-full max-w-md p-6 relative shadow-2xl animate-fade-in text-white">
            <button onClick={() => setModalContent(null)} className="absolute top-4 right-4 text-white/60 hover:text-white transition-colors">
              <X className="w-5 h-5" />
            </button>
            {modalContent.subtitle && (
              <p className="text-[#F5A623] text-[10px] font-black uppercase tracking-widest mb-1">{modalContent.subtitle}</p>
            )}
            <h3 className="text-xl font-black mb-3">{modalContent.title}</h3>
            <p className="text-white/70 text-sm leading-relaxed mb-6">{modalContent.desc}</p>
            <div className="flex gap-3">
              {modalContent.type === 'stat' && (
                <Link href="/our-work" className="flex-1">
                  <button onClick={() => setModalContent(null)} className="w-full bg-[#F5A623] text-[#0B1E3D] font-black py-2.5 rounded-xl hover:brightness-110 transition-all text-xs">
                    View Real Projects
                  </button>
                </Link>
              )}
              {modalContent.type === 'industry' && (
                <button onClick={() => { setModalContent(null); handleOpenSurvey(`Survey for ${modalContent.title}`); }} className="flex-1 bg-[#F5A623] text-[#0B1E3D] font-black py-2.5 rounded-xl hover:brightness-110 transition-all text-xs">
                  Request Solar Survey
                </button>
              )}
              {modalContent.type === 'service' && (
                <button onClick={() => { setModalContent(null); handleOpenSurvey(`Book Service: ${modalContent.title}`); }} className="flex-1 bg-[#F5A623] text-[#0B1E3D] font-black py-2.5 rounded-xl hover:brightness-110 transition-all text-xs">
                  Book This Service Now
                </button>
              )}
              <button onClick={() => setModalContent(null)} className="flex-1 border border-white/20 text-white font-bold py-2.5 rounded-xl hover:bg-white/5 transition-all text-xs">
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 2. Site Survey Form Modal */}
      {showSurveyForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-[#0B1E3D] border border-white/10 rounded-2xl w-full max-w-md p-6 relative shadow-2xl text-white">
            <button onClick={() => setShowSurveyForm(false)} className="absolute top-4 right-4 text-white/60 hover:text-white transition-colors">
              <X className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#F5A623] animate-pulse" />
              <p className="text-[#F5A623] text-[9px] font-black uppercase tracking-widest">Interactive Solar Desk</p>
            </div>
            <h3 className="text-lg font-black mb-1">Request Site Survey</h3>
            <p className="text-white/50 text-xs mb-4">Prefilled: <span className="text-white font-bold">{prefilledService || 'General site survey'}</span></p>

            {formSubmitted ? (
              <div className="py-8 text-center">
                <div className="w-12 h-12 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center mx-auto mb-3 text-emerald-400">✓</div>
                <h4 className="font-black text-sm">Request Submitted Successfully!</h4>
                <p className="text-white/50 text-xs mt-1">Our executive will reach out to you within 24 hours.</p>
              </div>
            ) : (
              <form onSubmit={handleFormSubmit} className="space-y-3.5">
                <div>
                  <label className="block text-[10px] uppercase font-bold text-white/60 mb-1">Full Name</label>
                  <input required type="text" placeholder="Enter your name" value={formData.name} onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))} className="w-full bg-white/5 border border-white/15 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#F5A623]" />
                </div>
                <div>
                  <label className="block text-[10px] uppercase font-bold text-white/60 mb-1">Phone Number</label>
                  <input required type="tel" placeholder="Enter mobile number" value={formData.phone} onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))} className="w-full bg-white/5 border border-white/15 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#F5A623]" />
                </div>
                <div>
                  <label className="block text-[10px] uppercase font-bold text-white/60 mb-1">Install Address / Sector Notes</label>
                  <textarea required rows={2} placeholder="Rooftop size, location address..." value={formData.address} onChange={(e) => setFormData(prev => ({ ...prev, address: e.target.value }))} className="w-full bg-white/5 border border-white/15 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#F5A623]" />
                </div>
                <div>
                  <label className="block text-[10px] uppercase font-bold text-white/60 mb-1">Required Capacity</label>
                  <select value={formData.solarNeed} onChange={(e) => setFormData(prev => ({ ...prev, solarNeed: e.target.value }))} className="w-full bg-[#0B1E3D] border border-white/15 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#F5A623]">
                    <option>1kW - 3kW (Small Home)</option>
                    <option>3kW - 5kW (Medium Home)</option>
                    <option>5kW - 10kW (Large Home / Shop)</option>
                    <option>10kW+ (Commercial / Industrial)</option>
                  </select>
                </div>
                <button type="submit" className="w-full bg-[#F5A623] hover:brightness-110 text-[#0B1E3D] font-black text-xs py-3 rounded-xl transition-all shadow-md mt-2">
                  Confirm Site Survey Request
                </button>
              </form>
            )}
          </div>
        </div>
      )}

    </div>
  );
}

