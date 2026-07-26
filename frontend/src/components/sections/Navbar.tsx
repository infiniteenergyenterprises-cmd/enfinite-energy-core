'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Phone, ChevronDown, MessageCircle, Menu, X, Sun } from 'lucide-react';
import { Button } from '../ui/Button';

export function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname() || '';

  React.useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  const getLinkClass = (path: string) => {
    // Exact match for home, startsWith for subpages
    const isActive = path === '/' ? pathname === '/' : pathname.startsWith(path);
    return `transition-all duration-200 py-8 text-xs font-black uppercase tracking-wider border-b-2 ${
      isActive 
        ? 'text-[#F5A623] border-[#F5A623]' 
        : 'text-gray-600 hover:text-[#F5A623] border-transparent'
    }`;
  };

  return (
    <nav className="fixed w-full z-50 bg-white/95 backdrop-blur-sm border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Logo */}
          <Link href="/" className="flex flex-shrink-0 items-center gap-2 group">
            <img src="/LOGO.png" alt="EnfiniteEnergy Logo" className="h-12 w-auto object-contain" />
            <span className="text-xl font-bold tracking-tight text-brand-blue">EnfiniteEnergy</span>
          </Link>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-8">
          <Link href="/" className={getLinkClass('/')}>Home</Link>
          <Link href="/solutions" className={getLinkClass('/solutions')}>Solutions</Link>
          <Link href="/our-work" className={getLinkClass('/our-work')}>Our Work</Link>
          <Link href="/news" className={getLinkClass('/news')}>News & Events</Link>
          <Link href="/careers" className={getLinkClass('/careers')}>Careers</Link>
          <Link href="/company" className={getLinkClass('/company')}>About</Link>
          <Link href="/contact" className={getLinkClass('/contact')}>Contact</Link>
        </div>

        {/* Header Right Side */}
        <div className="hidden lg:flex items-center gap-4">
          <a href="tel:+919876543210" className="flex items-center gap-2 text-[#0B1E3D] hover:text-[#F5A623] bg-gray-50 border border-gray-200/60 hover:border-[#F5A623]/30 px-4.5 py-2.5 rounded-xl font-black text-xs transition-all shadow-sm">
            <Phone className="w-4 h-4 text-[#F5A623]" />
            <span>Call Now</span>
          </a>
        </div>

        {/* Mobile Menu Toggle */}
        <div className="lg:hidden">
          <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="p-2">
            {isMobileMenuOpen ? <X className="w-6 h-6 text-brand-blue" /> : <Menu className="w-6 h-6 text-brand-blue" />}
          </button>
        </div>
      </div>
      
      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-white border-t border-gray-100 p-4 shadow-lg absolute w-full">
           <div className="flex flex-col gap-4 font-semibold text-brand-blue">
             <Link href="/" onClick={() => setIsMobileMenuOpen(false)}>Home</Link>
             <Link href="/solutions" onClick={() => setIsMobileMenuOpen(false)}>Solutions</Link>
             <Link href="/our-work" onClick={() => setIsMobileMenuOpen(false)}>Our Work</Link>
             <Link href="/news" onClick={() => setIsMobileMenuOpen(false)}>News & Events</Link>
             <Link href="/company" onClick={() => setIsMobileMenuOpen(false)}>About</Link>
             <Link href="/careers" onClick={() => setIsMobileMenuOpen(false)}>Careers</Link>
             <Link href="/contact" onClick={() => setIsMobileMenuOpen(false)}>Contact</Link>
             <a href="tel:+919876543210" className="w-full flex items-center justify-center gap-2 bg-[#F5A623] text-white py-3 rounded-xl font-black text-xs transition-all uppercase tracking-wider mt-2 shadow-sm">
               <Phone className="w-4 h-4" />
               Call Now
             </a>
           </div>
        </div>
      )}
    </nav>
  );
}
