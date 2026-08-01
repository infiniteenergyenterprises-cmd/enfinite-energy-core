

'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { FileText, ChevronRight, Mail, Phone, AlertTriangle, Search, Printer, Copy, Check, ChevronUp, BookOpen } from 'lucide-react';

const sections = [
  {
    id: 'acceptance', title: '1. Acceptance of Terms',
    content: [
      { subtitle: 'Agreement', text: 'By accessing or using the Enfinite Energy website (enfiniteenergy.in) or engaging our solar installation and consultation services, you agree to be bound by these Terms of Service. If you do not agree to these terms, please discontinue use of our website and services immediately.' },
      { subtitle: 'Modifications', text: 'Enfinite Energy Pvt. Ltd. reserves the right to modify these terms at any time. We will notify users of significant changes by posting a notice on our website. Continued use of our services after any such changes constitutes acceptance of the new terms.' },
    ],
  },
  {
    id: 'services', title: '2. Our Services',
    content: [
      { subtitle: 'Scope of Services', text: 'Enfinite Energy provides solar energy solutions including site assessment, system design, equipment supply, installation, net metering application assistance, government subsidy documentation support (PM Surya Ghar, PMKUSUM), and after-sales maintenance services across Bihar, UP, and surrounding regions.' },
      { subtitle: 'Service Availability', text: 'Our services are currently available in select districts including Kaimur, Bhabua, Mohania, Rohtas, Aurangabad, Varanasi, Chandauli, and surrounding areas. Service availability in specific locations is subject to change based on operational capacity.' },
      { subtitle: 'Quotes & Proposals', text: 'All quotes provided by Enfinite Energy are estimates based on information provided by the customer and initial site assessment. Final pricing may vary following detailed site survey, load analysis, and material availability at the time of installation.' },
    ],
  },
  {
    id: 'customer-obligations', title: '3. Customer Responsibilities',
    content: [
      { subtitle: 'Accurate Information', text: 'You agree to provide accurate, complete, and up-to-date information when requesting services, including your electricity bill details, property measurements, DISCOM consumer number, and ownership documents required for subsidy applications.' },
      { subtitle: 'Site Access', text: 'You agree to provide our engineers and installation teams reasonable access to your property at scheduled times for site assessment, installation, inspection, and maintenance visits.' },
      { subtitle: 'Structural Responsibility', text: 'Customers are responsible for ensuring that their roof or mounting structure is structurally sound and capable of supporting solar panel installation. Enfinite Energy will conduct a structural assessment, but the customer bears ultimate responsibility for their property\'s structural condition.' },
    ],
  },
  {
    id: 'payment', title: '4. Payment Terms',
    content: [
      { subtitle: 'Payment Schedule', text: 'Standard payment terms involve an advance payment upon order confirmation, a milestone payment upon delivery of materials, and a final payment upon completion of installation and commissioning. Specific payment schedules will be agreed upon in writing for each project.' },
      { subtitle: 'Subsidy Credits', text: 'Government subsidies (under PM Surya Ghar and other schemes) are credited directly to the customer\'s bank account by the government agency after verification. Enfinite Energy assists with documentation but does not guarantee subsidy approval, as the decision rests with the respective government authority.' },
      { subtitle: 'Cancellation', text: 'Cancellations after materials have been procured may be subject to restocking fees. Please contact us as early as possible if you need to modify or cancel a confirmed order.' },
    ],
  },
  {
    id: 'warranty', title: '5. Warranty & Guarantees',
    content: [
      { subtitle: 'Panel Warranty', text: 'Solar panels supplied by Enfinite Energy carry a 25-year linear performance warranty and 10-year product workmanship warranty from the respective manufacturers. Enfinite Energy facilitates warranty claims but the warranty obligation rests with the panel manufacturer.' },
      { subtitle: 'Installation Warranty', text: 'Enfinite Energy provides a 2-year workmanship warranty on installation quality, covering defects arising from improper installation. This does not cover damage caused by extreme weather events, unauthorized modifications, or negligence.' },
      { subtitle: 'Inverter & Battery Warranty', text: 'Inverters and battery storage systems carry manufacturer warranties ranging from 5–10 years depending on brand and model. Warranty terms will be specified in your project documentation.' },
    ],
  },
  {
    id: 'limitation', title: '6. Limitation of Liability',
    content: [
      { subtitle: 'No Guarantee of Savings', text: 'While we provide savings estimates based on historical data and standard calculations, actual energy savings may vary due to weather conditions, consumption patterns, grid availability, and other factors beyond our control. These estimates are not guaranteed financial commitments.' },
      { subtitle: 'Maximum Liability', text: 'To the maximum extent permitted by applicable Indian law, Enfinite Energy\'s total liability for any claim arising from our services shall not exceed the amount paid by the customer for the specific service giving rise to the claim.' },
      { subtitle: 'Force Majeure', text: 'Enfinite Energy shall not be liable for delays or failures in performance resulting from acts beyond our reasonable control, including natural disasters, government actions, supply chain disruptions, or other force majeure events.' },
    ],
  },
  {
    id: 'intellectual-property', title: '7. Intellectual Property',
    content: [
      { subtitle: 'Website Content', text: 'All content on the Enfinite Energy website, including text, images, logos, graphics, and technical documentation, is owned by or licensed to Enfinite Energy Pvt. Ltd. and is protected under Indian copyright law. You may not reproduce or distribute our content without written permission.' },
    ],
  },
  {
    id: 'governing-law', title: '8. Governing Law & Disputes',
    content: [
      { subtitle: 'Jurisdiction', text: 'These Terms of Service are governed by the laws of India. Any disputes arising from these terms or our services shall be subject to the exclusive jurisdiction of the courts of Kaimur District, Bihar, India.' },
      { subtitle: 'Dispute Resolution', text: 'We encourage customers to first contact us directly to resolve any disputes. We are committed to fair and prompt resolution of all customer concerns.' },
    ],
  },
];

export default function TermsOfServicePage() {
  const [activeSection, setActiveSection] = useState('acceptance');
  const [searchQuery, setSearchQuery] = useState('');
  const [readProgress, setReadProgress] = useState(0);
  const [copied, setCopied] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  // Reading progress
  useEffect(() => {
    const handleScroll = () => {
      const el = document.documentElement;
      const scrollTop = el.scrollTop || document.body.scrollTop;
      const scrollHeight = el.scrollHeight - el.clientHeight;
      const progress = scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0;
      setReadProgress(Math.min(100, progress));
      setShowScrollTop(scrollTop > 400);

      // Active section detection
      sections.forEach(s => {
        const el = document.getElementById(s.id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 140 && rect.bottom > 140) setActiveSection(s.id);
        }
      });
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleCopy = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  const filteredSections = sections.map(s => ({
    ...s,
    content: s.content.filter(c =>
      !searchQuery ||
      c.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.text.toLowerCase().includes(searchQuery.toLowerCase())
    ),
  })).filter(s => !searchQuery || s.content.length > 0 || s.title.toLowerCase().includes(searchQuery.toLowerCase()));

  const totalMatches = filteredSections.reduce((acc, s) => acc + s.content.length, 0);

  return (
    <div className="min-h-screen bg-[#F8FAFC] pt-20">
      {/* Reading Progress Bar */}
      <div className="fixed top-0 left-0 right-0 z-[100] h-1 bg-gray-100">
        <div
          className="h-full bg-gradient-to-r from-amber-400 to-orange-500 transition-all duration-150"
          style={{ width: `${readProgress}%` }}
        />
      </div>

      {/* Hero */}
      <section className="relative bg-[#0B1E3D] py-16 px-4 overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-400/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />
        <div className="relative max-w-5xl mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-6">
            <div>
              <div className="flex items-center gap-3 mb-5">
                <div className="w-12 h-12 rounded-2xl bg-amber-400/10 border border-amber-400/20 flex items-center justify-center">
                  <FileText className="w-6 h-6 text-amber-400" />
                </div>
                <div>
                  <p className="text-amber-400 text-xs font-black uppercase tracking-widest">Legal Document</p>
                  <p className="text-white/40 text-xs">Last Updated: July 28, 2026</p>
                </div>
              </div>
              <h1 className="text-4xl sm:text-5xl font-black text-white mb-4 leading-tight">Terms of Service</h1>
              <p className="text-gray-300 text-sm max-w-xl leading-relaxed">
                These terms govern your use of the Enfinite Energy website and the solar installation and related services we provide.
              </p>
              
              {/* Key Highlight */}
              <div className="mt-6 flex items-start gap-3 bg-amber-400/10 border border-amber-400/20 rounded-xl px-5 py-4 max-w-xl">
                <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                <p className="text-amber-300 text-xs leading-relaxed">
                  By requesting a quote, booking a site visit, or placing an order with Enfinite Energy, you agree to be bound by these terms.
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-3 shrink-0">
              <button
                onClick={() => window.print()}
                className="flex items-center gap-2 px-4 py-2.5 bg-white/5 border border-white/10 hover:bg-white/10 text-white text-xs font-black rounded-xl transition-all"
              >
                <Printer className="w-4 h-4" /> Print
              </button>
              <button
                onClick={handleCopy}
                className={`flex items-center gap-2 px-4 py-2.5 text-xs font-black rounded-xl transition-all ${copied ? 'bg-emerald-500/20 border border-emerald-500/30 text-emerald-400' : 'bg-white/5 border border-white/10 hover:bg-white/10 text-white'}`}
              >
                {copied ? <><Check className="w-4 h-4" /> Copied!</> : <><Copy className="w-4 h-4" /> Copy Link</>}
              </button>
            </div>
          </div>

          {/* Search Bar */}
          <div className="mt-6 flex items-center bg-white/5 border border-white/10 rounded-xl overflow-hidden max-w-lg">
            <Search className="w-4 h-4 text-gray-400 ml-4 shrink-0" />
            <input
              type="text"
              placeholder="Search within these terms..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="flex-1 px-3 py-3 text-sm text-white placeholder-gray-500 bg-transparent outline-none"
            />
            {searchQuery && (
              <span className="pr-4 text-xs text-amber-400 font-black">{totalMatches} match{totalMatches !== 1 ? 'es' : ''}</span>
            )}
          </div>

          {/* Reading Progress Text */}
          <div className="mt-4 flex items-center gap-3">
            <div className="flex-1 max-w-xs h-1.5 bg-white/10 rounded-full overflow-hidden">
              <div className="h-full bg-amber-400 rounded-full transition-all" style={{ width: `${readProgress}%` }} />
            </div>
            <span className="text-xs text-gray-400 font-semibold">{Math.round(readProgress)}% read</span>
          </div>
        </div>
      </section>

      {/* Content */}
      <div className="max-w-5xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">

          {/* Sidebar */}
          <div className="hidden lg:block lg:col-span-1">
            <div className="sticky top-28 space-y-3">
              <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm">
                <p className="text-xs font-black uppercase tracking-widest text-gray-400 mb-4 flex items-center gap-2">
                  <BookOpen className="w-3.5 h-3.5" /> Contents
                </p>
                <nav className="space-y-1">
                  {sections.map(s => (
                    <a
                      key={s.id}
                      href={`#${s.id}`}
                      className={`flex items-center gap-2 text-xs py-2 px-3 rounded-xl border-l-2 transition-all font-semibold ${
                        activeSection === s.id
                          ? 'bg-amber-50 border-amber-400 text-amber-600'
                          : 'border-transparent text-gray-500 hover:bg-gray-50 hover:text-gray-700'
                      }`}
                    >
                      {activeSection === s.id && <span className="w-1.5 h-1.5 rounded-full bg-amber-400 shrink-0" />}
                      {s.title}
                    </a>
                  ))}
                </nav>
              </div>

              {/* Quick Info */}
              <div className="bg-amber-50 border border-amber-100 rounded-2xl p-4">
                <p className="text-xs font-black text-amber-700 uppercase tracking-wider mb-2">Quick Info</p>
                <div className="space-y-2 text-xs text-amber-600">
                  <p>📅 Updated: July 28, 2026</p>
                  <p>🏢 Enfinite Energy Pvt. Ltd.</p>
                  <p>📍 Kaimur, Bihar, India</p>
                </div>
              </div>

              <Link
                href="/privacy-policy"
                className="flex items-center justify-between w-full px-4 py-3 bg-[#0B1E3D] hover:bg-[#112e57] text-white text-xs font-black rounded-xl transition-all"
              >
                Privacy Policy <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Main Content */}
          <div ref={contentRef} className="lg:col-span-3 space-y-12">
            {searchQuery && filteredSections.length === 0 && (
              <div className="bg-white border border-gray-100 rounded-2xl p-10 text-center shadow-sm">
                <Search className="w-10 h-10 text-gray-200 mx-auto mb-3" />
                <p className="text-gray-400 font-semibold">No results found for "{searchQuery}"</p>
              </div>
            )}

            {filteredSections.map(section => (
              <div key={section.id} id={section.id} className="scroll-mt-32">
                <div className="flex items-center gap-3 mb-6">
                  <span className="w-8 h-8 rounded-xl bg-amber-400 text-[#0B1E3D] font-black text-xs flex items-center justify-center shrink-0">
                    {section.id.split('-')[0].slice(0, 2).toUpperCase()}
                  </span>
                  <h2 className="text-xl font-black text-[#0B1E3D]">{section.title}</h2>
                </div>
                <div className="space-y-4 pl-11">
                  {section.content.map((item, i) => (
                    <div key={i} className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm hover:shadow-md hover:border-amber-100 transition-all">
                      <h3 className="text-sm font-black text-[#0B1E3D] mb-2 flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-400 shrink-0" />
                        {item.subtitle}
                      </h3>
                      <p className="text-sm text-gray-500 leading-relaxed">
                        {searchQuery
                          ? item.text.split(new RegExp(`(${searchQuery})`, 'gi')).map((part, j) =>
                              part.toLowerCase() === searchQuery.toLowerCase()
                                ? <mark key={j} className="bg-amber-200 text-amber-800 rounded px-0.5">{part}</mark>
                                : part
                            )
                          : item.text}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            ))}

            {/* Contact */}
            <div className="bg-gradient-to-br from-[#0B1E3D] to-[#112e57] rounded-2xl p-8 text-white">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-amber-400/10 border border-amber-400/20 rounded-xl flex items-center justify-center">
                  <AlertTriangle className="w-5 h-5 text-amber-400" />
                </div>
                <div>
                  <h2 className="text-lg font-black">Questions About These Terms?</h2>
                  <p className="text-gray-400 text-xs">Our team is happy to assist</p>
                </div>
              </div>
              <p className="text-gray-300 text-sm mb-6 leading-relaxed">
                If you have questions about our Terms of Service or need clarification on any clause, reach us directly.
              </p>
              <div className="grid sm:grid-cols-2 gap-3">
                <a href="mailto:info@enfiniteenergy.in" className="flex items-center gap-3 bg-white/5 border border-white/10 hover:border-amber-400/30 hover:bg-amber-400/5 rounded-xl px-4 py-3 text-sm text-gray-300 hover:text-amber-400 transition-all">
                  <Mail className="w-4 h-4 text-amber-400 shrink-0" />
                  <span className="text-xs font-semibold break-all">info@enfiniteenergy.in</span>
                </a>
                <a href="tel:+917480018007" className="flex items-center gap-3 bg-white/5 border border-white/10 hover:border-amber-400/30 hover:bg-amber-400/5 rounded-xl px-4 py-3 text-sm text-gray-300 hover:text-amber-400 transition-all">
                  <Phone className="w-4 h-4 text-amber-400 shrink-0" />
                  <span className="text-xs font-semibold">+91 74800 18007</span>
                </a>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-400 pt-2 border-t border-gray-100">
              <Link href="/privacy-policy" className="flex items-center gap-1 text-amber-500 hover:text-amber-600 font-semibold">
                Privacy Policy <ChevronRight className="w-4 h-4" />
              </Link>
              <span>·</span>
              <Link href="/" className="hover:text-gray-600 transition-colors">Back to Home</Link>
              <span>·</span>
              <button onClick={handleCopy} className="hover:text-gray-600 transition-colors">
                {copied ? '✓ Copied!' : 'Copy Link'}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll to Top */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 z-50 w-12 h-12 bg-[#0B1E3D] hover:bg-amber-400 text-white hover:text-[#0B1E3D] rounded-full shadow-2xl flex items-center justify-center transition-all duration-300 border border-white/10"
        >
          <ChevronUp className="w-5 h-5" />
        </button>
      )}
    </div>
  );
}

