'use client';

import React, { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import { LayoutDashboard, Image as ImageIcon, Users, Settings, LogOut, ChevronLeft, TrendingUp, Sun, Video, MapPin, Layers, Award, Newspaper, Briefcase, Globe } from 'lucide-react';

const navItems = [
  { href: '/admin',           label: 'Dashboard',        icon: LayoutDashboard },
  { href: '/admin/leads',     label: 'Lead Management',  icon: TrendingUp },
  { href: '/admin/all',       label: 'All Sections',     icon: Layers },
  { href: '/admin/solutions', label: 'Solutions Page',   icon: Sun },
  { href: '/admin/our-work',  label: 'Our Work Page',    icon: Award },
  { href: '/admin/news',      label: 'News & Events',    icon: Newspaper },
  { href: '/admin/careers',   label: 'Careers Page',     icon: Briefcase },
  { href: '/admin/pages',     label: 'About & Contact',  icon: Globe },
  { href: '/admin/visitors',  label: 'Visitor Logs',     icon: Users },
  { href: '/admin/settings',  label: 'Settings',         icon: Settings },
];

function getCookie(name: string) {
  if (typeof document === 'undefined') return '';
  const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
  return match ? match[2] : '';
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router   = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (pathname === '/admin/login') return;
    if (getCookie('admin_auth') !== 'enfinite_admin_ok') {
      router.replace('/admin/login');
      return;
    }

    // Global fetch patch for Admin Panel to attach token to all API requests
    const originalFetch = window.fetch;
    window.fetch = async (...args) => {
      let [resource, config] = args;
      const url = typeof resource === 'string' ? resource : (resource instanceof Request ? resource.url : '');
      
      if (url.includes('/api/')) {
        const token = localStorage.getItem('adminToken');
        if (token) {
          config = config || {};
          if (config.headers instanceof Headers) {
            config.headers.set('Authorization', `Bearer ${token}`);
          } else {
            config.headers = { ...config.headers, 'Authorization': `Bearer ${token}` };
          }
          args[1] = config;
        }
      }
      return originalFetch(...args);
    };

    return () => {
      window.fetch = originalFetch;
    };
  }, [pathname, router]);

  const handleLogout = () => {
    document.cookie = 'admin_auth=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    router.replace('/admin/login');
  };

  if (pathname === '/admin/login') return <>{children}</>;

  return (
    <div className="flex h-screen w-full overflow-hidden" style={{background:'#0a0f1e'}}>

      {/* ── Sidebar ── */}
      <aside className="w-60 bg-[#0B1E3D] flex flex-col shrink-0 hidden md:flex">
        {/* Logo */}
        <div className="px-5 pt-6 pb-4 border-b border-white/8">
          <Link href="/" className="flex items-center gap-1.5 text-xs text-white/40 hover:text-white/70 mb-5 transition-colors">
            <ChevronLeft className="w-3.5 h-3.5" /> Back to site
          </Link>
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-gradient-to-br from-amber-400 to-orange-500 rounded-xl flex items-center justify-center shrink-0 shadow-lg shadow-amber-400/20">
              <Sun className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="font-black text-white text-sm leading-tight">Admin Portal</p>
              <p className="text-[10px] text-white/35 leading-tight mt-0.5">Enfinite Energy</p>
            </div>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto scrollbar-hide">
          {navItems.map(item => {
            const active = pathname === item.href;
            return (
              <Link key={item.href} href={item.href}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                  active
                    ? 'bg-amber-400/15 text-amber-400 border border-amber-400/20'
                    : 'text-white/50 hover:text-white hover:bg-white/6'
                }`}>
                <item.icon className={`w-4 h-4 ${active ? 'text-amber-400' : ''}`} />
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* User */}
        <div className="px-3 pb-4 border-t border-white/8 pt-3">
          <div className="flex items-center gap-3 px-3 py-2 mb-1">
            <div className="w-8 h-8 rounded-full bg-amber-400/20 flex items-center justify-center shrink-0">
              <span className="text-amber-400 font-black text-xs">M</span>
            </div>
            <div>
              <p className="text-xs font-black text-white leading-tight">Manish02</p>
              <p className="text-[10px] text-white/35">Administrator</p>
            </div>
          </div>
          <button onClick={handleLogout}
            className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-bold text-white/40 hover:text-red-400 hover:bg-red-500/8 transition-all">
            <LogOut className="w-3.5 h-3.5" /> Sign Out
          </button>
        </div>
      </aside>

      {/* ── Main ── */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden">
        {/* Topbar */}
        <header className="border-b px-6 py-3 flex items-center justify-between shrink-0" style={{background:'rgba(255,255,255,0.03)',borderColor:'rgba(255,255,255,0.06)'}}>
          <div className="font-black text-white md:hidden text-sm">Admin Portal</div>
          <div className="hidden md:flex items-center gap-2">
            <span className="text-xs text-gray-400 font-semibold">
              {navItems.find(n => n.href === pathname)?.label || 'Admin'}
            </span>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              <span className="text-xs font-semibold text-gray-400">Live</span>
            </div>
            <Link href="/" target="_blank"
              className="text-xs font-bold text-gray-400 hover:text-amber-500 transition-colors">
              View Site →
            </Link>
            <button onClick={handleLogout}
              className="text-xs font-bold text-gray-400 hover:text-red-500 transition-colors">
              Logout
            </button>
          </div>
        </header>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-5 md:p-8" style={{background:'#0a0f1e'}}>
          {children}
        </div>
      </main>
    </div>
  );
}
