

'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { Shield, ChevronRight, Mail, Phone, Search, Printer, Copy, Check, ChevronUp, BookOpen } from 'lucide-react';

const sections = [
  {
    id: 'information-we-collect', title: '1. Information We Collect',
    content: [
      { subtitle: 'Personal Information', text: 'When you contact us, request a quote, or fill out a form on our website, we may collect personal information such as your full name, mobile number, email address, property address, and details about your electricity consumption and property type.' },
      { subtitle: 'Automatically Collected Information', text: 'When you visit our website, we automatically collect certain technical information including your IP address, browser type, operating system, referring URLs, pages visited, and time spent on pages. This data is used to improve our website performance and user experience.' },
      { subtitle: 'Communication Data', text: 'If you contact us via phone, WhatsApp, or email, we may retain records of that communication to provide better customer service and follow up on your solar consultation requests.' },
    ],
  },
  {
    id: 'how-we-use', title: '2. How We Use Your Information',
    content: [
      { subtitle: 'Service Delivery', text: 'We use your information primarily to respond to your inquiries, schedule site assessments, prepare custom solar proposals, process subsidy documentation, and manage your installation project from start to finish.' },
      { subtitle: 'Communication', text: 'We may use your contact details to send you updates about government solar subsidies (PM Surya Ghar, PMKUSUM), promotions, new product launches, and service reminders relevant to your solar system.' },
      { subtitle: 'Legal Compliance', text: 'We may process your information to comply with applicable laws in India, including GST invoicing requirements, MNRE registration records, and SBPDCL net metering applications.' },
    ],
  },
  {
    id: 'data-sharing', title: '3. Information Sharing',
    content: [
      { subtitle: 'We Do Not Sell Your Data', text: 'Enfinite Energy does not sell, rent, or trade your personal information to third parties for their commercial purposes. Your data is yours.' },
      { subtitle: 'Trusted Partners', text: 'We may share limited information with government agencies (MNRE, SBPDCL, Bihar RECO) for subsidy processing, with banks for solar loan applications, and with our certified installation teams — only as required to complete your project.' },
      { subtitle: 'Legal Requirements', text: 'We may disclose your information if required to do so by law, court order, or government authority, or to protect the rights and safety of Enfinite Energy, our customers, and the public.' },
    ],
  },
  {
    id: 'data-security', title: '4. Data Security',
    content: [
      { subtitle: 'Security Measures', text: 'We implement industry-standard security measures including encrypted data transmission (HTTPS/TLS), secure cloud storage, and restricted internal access to protect your personal information against unauthorized access, disclosure, or loss.' },
      { subtitle: 'Limitations', text: 'While we take data security seriously, no method of internet transmission or electronic storage is 100% secure. We continuously work to improve our security practices but cannot guarantee absolute security.' },
    ],
  },
  {
    id: 'your-rights', title: '5. Your Rights',
    content: [
      { subtitle: 'Access & Correction', text: 'You have the right to access the personal information we hold about you and request corrections if any information is inaccurate or incomplete.' },
      { subtitle: 'Deletion', text: 'You may request deletion of your personal data from our systems at any time by contacting us at info@enfiniteenergy.in, subject to legal retention requirements.' },
      { subtitle: 'Opt-Out', text: 'You can opt out of receiving marketing communications from us at any time by replying "STOP" to any SMS, clicking "Unsubscribe" in emails, or contacting us directly.' },
    ],
  },
  {
    id: 'cookies', title: '6. Cookies & Tracking',
    content: [
      { subtitle: 'Use of Cookies', text: 'Our website uses cookies and similar technologies to enhance your browsing experience, remember your preferences, analyze site traffic, and deliver relevant content. You can control cookie settings through your browser preferences.' },
    ],
  },
  {
    id: 'updates', title: '7. Policy Updates',
    content: [
      { subtitle: 'Policy Changes', text: 'We may update this Privacy Policy from time to time to reflect changes in our practices or applicable laws. We will post the updated policy on this page with a revised "Last Updated" date. Continued use of our website after changes constitutes acceptance of the updated policy.' },
    ],
  },
];

export default function PrivacyPolicyPage() {
  const [activeSection, setActiveSection] = useState('information-we-collect');
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
                  <Shield className="w-6 h-6 text-amber-400" />
                </div>
                <div>
                  <p className="text-amber-400 text-xs font-black uppercase tracking-widest">Legal Document</p>
                  <p className="text-white/40 text-xs">Last Updated: July 28, 2026</p>
                </div>
              </div>
              <h1 className="text-4xl sm:text-5xl font-black text-white mb-4 leading-tight">Privacy Policy</h1>
              <p className="text-gray-300 text-sm max-w-xl leading-relaxed">
                At Enfinite Energy Pvt. Ltd., we are committed to protecting your personal information and your right to privacy.
              </p>
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
              placeholder="Search within this policy..."
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
                href="/terms-of-service"
                className="flex items-center justify-between w-full px-4 py-3 bg-[#0B1E3D] hover:bg-[#112e57] text-white text-xs font-black rounded-xl transition-all"
              >
                Terms of Service <ChevronRight className="w-4 h-4" />
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
                  <Mail className="w-5 h-5 text-amber-400" />
                </div>
                <div>
                  <h2 className="text-lg font-black">Contact Us About Privacy</h2>
                  <p className="text-gray-400 text-xs">We respond within 24 hours</p>
                </div>
              </div>
              <p className="text-gray-300 text-sm mb-6 leading-relaxed">
                Questions or concerns about this Privacy Policy or how we handle your data? Reach us directly.
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
              <Link href="/terms-of-service" className="flex items-center gap-1 text-amber-500 hover:text-amber-600 font-semibold">
                Terms of Service <ChevronRight className="w-4 h-4" />
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

