import React from 'react';
import { ArrowRight, MapPin, Phone, Mail, Star, Sun } from 'lucide-react';
import Link from 'next/link';

export function Footer() {
  return (
    <>
      {/* Call To Action Banner placed above the footer globally */}
      <section className="py-8 md:py-10 px-4 sm:px-4 lg:px-6 bg-white mt-auto" id="cta-section">
        <div className="max-w-7xl mx-auto">
          {/* Outer Container with Background Image and Gradient */}
          <div className="relative rounded-2xl overflow-hidden shadow-2xl bg-[#0A192F]">
            <div className="absolute inset-0">
              <img 
                src="/18.png" 
                alt="Solar Panels" 
                className="w-full h-full object-cover opacity-50"
              />
              <div className="absolute inset-0 bg-[#0B1E3D]/80"></div>
            </div>
            
            <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between p-5 sm:p-6 md:p-8 lg:p-10 gap-6 md:gap-8 border border-white/5 rounded-2xl">
              
              {/* Left side */}
              <div className="flex-1 max-w-2xl">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-white text-[11px] font-bold uppercase tracking-wider mb-4 backdrop-blur-sm">
                  <span className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse"></span>
                  Let's Build a Greener Tomorrow
                </div>
                <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-extrabold text-white mb-3 tracking-tight leading-tight">
                  Get Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-primary">Free Site Survey</span>
                </h2>
                <p className="text-gray-300 text-sm md:text-[15px] mb-6 leading-relaxed max-w-xl">
                  Our certified experts will visit your location, assess your energy needs, and provide a customized solar solution.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Link href="/contact" className="inline-flex items-center justify-center gap-2 bg-primary hover:bg-orange-500 text-[#0A192F] font-bold px-6 py-3 rounded-full transition-all duration-300 shadow-[0_0_15px_rgba(245,158,11,0.3)] hover:shadow-[0_0_20px_rgba(245,158,11,0.5)] transform hover:-translate-y-0.5 text-sm">
                    Get Free Quote
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                  <a href="tel:+917480018007" className="inline-flex items-center justify-center gap-2 bg-transparent border border-white/30 hover:bg-white/10 text-white font-bold px-6 py-3 rounded-full transition-all duration-300 text-sm">
                    Talk to Expert
                  </a>
                </div>
              </div>
              
              {/* Divider */}
              <div className="hidden md:block w-px h-48 bg-gradient-to-b from-transparent via-white/20 to-transparent"></div>
              
              {/* Right side */}
              <div className="flex-1 max-w-sm w-full bg-yellow-500/10 backdrop-blur-md border border-yellow-500/20 p-6 rounded-xl shadow-xl">
                <h3 className="text-xl font-bold text-white mb-1.5">Need Help?</h3>
                <p className="text-gray-400 text-xs mb-5">
                  Talk to our solar experts today!
                </p>
                
                <div className="space-y-4">
                  <a href="tel:+917480018007" className="flex items-center gap-4 text-white hover:text-orange-400 transition-colors group">
                    <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-orange-500/20 group-hover:text-orange-400 transition-all shrink-0">
                      <Phone className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-[10px] text-gray-400 uppercase tracking-wider mb-0.5">Call Us</div>
                      <div className="font-bold text-base tracking-wide">+91 74800 18007</div>
                    </div>
                  </a>
                  
                  <a href="mailto:infiniteenergyenterprises@gmail.com" className="flex items-center gap-4 text-white hover:text-orange-400 transition-colors group">
                    <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-orange-500/20 group-hover:text-orange-400 transition-all shrink-0">
                      <Mail className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-[10px] text-gray-400 uppercase tracking-wider mb-0.5">Email Us</div>
                      <div className="font-bold text-[15px] tracking-wide">infiniteenergyenterprises@gmail.com</div>
                    </div>
                  </a>
                </div>
              </div>
              
            </div>
          </div>
        </div>
      </section>

      {/* Main Footer Content */}
      <footer className="bg-[#0B1E3D] text-white pt-8 pb-0 border-t border-[#F5A623]/20 relative overflow-hidden">
        {/* Background glow effects */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#F5A623]/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 relative z-10">
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-12 gap-x-4 gap-y-8 lg:gap-12 mb-12">
            
            {/* Company Info */}
            <div className="col-span-2 lg:col-span-4 pr-0 lg:pr-8">
              <div className="flex items-center gap-2 mb-4 group cursor-pointer w-fit">
                <img src="/LOGO.png" alt="EnfiniteEnergy Logo" className="h-12 w-auto object-contain bg-white rounded-lg p-1" />
                <span className="text-2xl font-bold tracking-tight text-white">EnfiniteEnergy</span>
              </div>
              <p className="text-white/60 text-xs sm:text-sm leading-relaxed max-w-sm mb-4 pr-4">
                Enfinite Energy Pvt. Ltd. delivers smart, reliable and sustainable solar solutions for homes, businesses, industries and agriculture across India.
              </p>
              
              <div className="flex gap-3">
                <a href="#" className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-[#F5A623] hover:text-[#0B1E3D] hover:border-[#F5A623] transition-all text-gray-300">
                  <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24"><path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z"/></svg>
                </a>
                <a href="https://www.linkedin.com/in/infinite-energy-94a59b426/" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-[#F5A623] hover:text-[#0B1E3D] hover:border-[#F5A623] transition-all text-gray-300">
                  <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                </a>
                <a href="https://www.instagram.com/infiniteenergy.in?igsh=MXZybWMyZzc3ZmVrbw==" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-[#F5A623] hover:text-[#0B1E3D] hover:border-[#F5A623] transition-all text-gray-300">
                  <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
                </a>
              </div>
            </div>
 
            {/* Quick Links */}
            <div className="col-span-1 lg:col-span-2" id="footer-quick-links">
              <h4 className="font-bold text-base mb-3 sm:mb-6 text-white uppercase tracking-wider text-[11px] sm:text-xs">Quick Links</h4>
              <ul className="space-y-2 sm:space-y-3.5 text-white/60 text-xs sm:text-[15px]">
                <li><Link href="/" className="hover:text-[#F5A623] transition-all inline-block">Home</Link></li>
                <li><Link href="/solutions" className="hover:text-[#F5A623] transition-all inline-block">Solutions</Link></li>
                <li><Link href="/our-work" className="hover:text-[#F5A623] transition-all inline-block">Projects</Link></li>
                <li><Link href="/company" className="hover:text-[#F5A623] transition-all inline-block">About Us</Link></li>
                <li><Link href="/contact" className="hover:text-[#F5A623] transition-all inline-block">Contact Us</Link></li>
              </ul>
            </div>
 
            {/* Solutions */}
            <div className="col-span-1 lg:col-span-2">
              <h4 className="font-bold text-base mb-3 sm:mb-6 text-white uppercase tracking-wider text-[11px] sm:text-xs">Solutions</h4>
              <ul className="space-y-2 sm:space-y-3.5 text-white/60 text-xs sm:text-[15px]">
                <li><Link href="/solutions#residential" className="hover:text-[#F5A623] transition-all inline-block">Residential</Link></li>
                <li><Link href="/solutions#commercial" className="hover:text-[#F5A623] transition-all inline-block">Commercial</Link></li>
                <li><Link href="/solutions#industrial" className="hover:text-[#F5A623] transition-all inline-block">Industrial</Link></li>
                <li><Link href="/solutions#agriculture" className="hover:text-[#F5A623] transition-all inline-block">Agriculture</Link></li>
                <li><Link href="/solutions#ev-charging" className="hover:text-[#F5A623] transition-all inline-block">EV Charging</Link></li>
              </ul>
            </div>
 
            {/* Resources */}
            <div className="col-span-1 lg:col-span-2">
              <h4 className="font-bold text-base mb-3 sm:mb-6 text-white uppercase tracking-wider text-[11px] sm:text-xs">Resources</h4>
              <ul className="space-y-2 sm:space-y-3.5 text-white/60 text-xs sm:text-[15px]">
                <li><Link href="/resources/blog" className="hover:text-[#F5A623] transition-all inline-block">Blog</Link></li>
                <li><Link href="/resources/faqs" className="hover:text-[#F5A623] transition-all inline-block">FAQs</Link></li>
                <li><Link href="/resources/case-studies" className="hover:text-[#F5A623] transition-all inline-block">Case Studies</Link></li>
                <li><Link href="/resources/brochure" className="hover:text-[#F5A623] transition-all inline-block">Brochure</Link></li>
                <li><Link href="/resources/calculator" className="hover:text-[#F5A623] transition-all inline-block">Calculator</Link></li>
              </ul>
            </div>
 
            {/* Contact */}
            <div className="col-span-2 sm:col-span-2 lg:col-span-2 mt-4 sm:mt-0">
              <h4 className="font-bold text-base mb-3 sm:mb-6 text-white uppercase tracking-wider text-[11px] sm:text-xs">Contact Us</h4>
              <ul className="space-y-2.5 sm:space-y-4 text-xs sm:text-sm">
                <li className="flex items-start gap-2.5">
                  <MapPin className="w-4 h-4 text-[#F5A623] shrink-0 mt-0.5" />
                  <span className="text-white/60 leading-relaxed">Bhabua, Mohania, Kaimur, Bihar 821109</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Phone className="w-4 h-4 text-[#F5A623] shrink-0" />
                  <a href="tel:+917480018007" className="text-white/60 hover:text-[#F5A623] transition-colors">+91 74800 18007</a>
                </li>
                <li className="flex items-center gap-2.5">
                  <Mail className="w-4 h-4 text-[#F5A623] shrink-0" />
                  <a href="mailto:infiniteenergyenterprises@gmail.com" className="text-white/60 hover:text-[#F5A623] transition-colors truncate">infiniteenergyenterprises@gmail.com</a>
                </li>
              </ul>
            </div>
            
          </div>
        </div>
 
        <div className="max-w-7xl mx-auto px-4 sm:px-4 lg:px-6 py-6 border-t border-white/10 relative z-10">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-3 sm:gap-4">
            <p className="text-white/50 text-xs sm:text-sm text-center sm:text-left">© 2024 Enfinite Energy Pvt. Ltd. All Rights Reserved.</p>
            <div className="flex gap-6 text-sm text-white/50">
              <Link href="/privacy-policy" className="hover:text-[#F5A623] transition-colors">Privacy Policy</Link>
              <Link href="/terms-of-service" className="hover:text-[#F5A623] transition-colors">Terms of Service</Link>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
