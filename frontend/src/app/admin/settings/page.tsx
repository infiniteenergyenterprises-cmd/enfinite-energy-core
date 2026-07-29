import React from 'react';
import { Settings, Shield, Bell, Key, Zap } from 'lucide-react';

export const metadata = {
  title: 'Settings | Admin Portal',
};

export default function SettingsPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-12">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-bold mb-4">
            <Zap className="w-3.5 h-3.5" /> Core Configuration
          </div>
          <h1 className="text-3xl font-black text-white flex items-center gap-3 tracking-tight">
            Settings
          </h1>
          <p className="text-sm text-white/50 mt-2 font-medium">Configure global preferences, security, and notification policies.</p>
        </div>
      </div>
      
      <div className="bg-white/5 border border-white/10 rounded-3xl p-16 text-center backdrop-blur-xl shadow-2xl relative overflow-hidden group mt-10">
        {/* Glow Effects */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-amber-500/5 rounded-full blur-3xl group-hover:bg-amber-500/10 transition-colors duration-700"></div>

        <div className="relative z-10 flex flex-col items-center">
          <div className="w-24 h-24 mb-6 relative">
            <div className="absolute inset-0 bg-gradient-to-tr from-white/5 to-white/10 border border-white/10 rounded-2xl rotate-3 group-hover:rotate-6 transition-transform duration-500"></div>
            <div className="absolute inset-0 bg-black/40 border border-white/10 rounded-2xl -rotate-3 group-hover:-rotate-6 transition-transform duration-500"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <Settings className="w-10 h-10 text-white/40 group-hover:text-amber-500 transition-colors duration-500 animate-spin-slow" />
            </div>
          </div>
          
          <h2 className="text-2xl font-black text-white mb-3">Settings Module Offline</h2>
          <p className="text-white/40 max-w-sm mx-auto font-medium text-sm mb-8 leading-relaxed">
            The advanced configuration panel is currently locked for maintenance and feature upgrades.
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <div className="flex items-center gap-2 bg-black/30 border border-white/5 px-4 py-2.5 rounded-xl">
              <Shield className="w-4 h-4 text-emerald-400" />
              <span className="text-xs font-bold text-white/60">Security Policies</span>
            </div>
            <div className="flex items-center gap-2 bg-black/30 border border-white/5 px-4 py-2.5 rounded-xl">
              <Bell className="w-4 h-4 text-blue-400" />
              <span className="text-xs font-bold text-white/60">Notifications</span>
            </div>
            <div className="flex items-center gap-2 bg-black/30 border border-white/5 px-4 py-2.5 rounded-xl">
              <Key className="w-4 h-4 text-purple-400" />
              <span className="text-xs font-bold text-white/60">API Keys</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
