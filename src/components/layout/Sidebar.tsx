import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import {
  ShieldCheck,
  LayoutDashboard,
  Activity,
  Users,
  Fingerprint,
  Gauge,
  Lock,
  Smartphone,
  AlertTriangle,
  Network,
  Code2,
  FileText,
  BarChart3,
  Cpu,
  GitMerge,
  Shield,
  BookOpen,
  Settings,
  X,
  Menu,
  Radio,
  ExternalLink
} from 'lucide-react';
import { useSecurity } from '../../context/SecurityContext';

interface SidebarProps {
  mobileOpen: boolean;
  setMobileOpen: (open: boolean) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ mobileOpen, setMobileOpen }) => {
  const { threatsDetectedCount, suspiciousSessionsCount } = useSecurity();

  const navGroups = [
    {
      title: 'CORE PLATFORM',
      items: [
        { name: 'Overview', path: '/app/dashboard', icon: LayoutDashboard },
        { 
          name: 'Continuous Auth', 
          path: '/app/continuous-auth', 
          icon: Activity,
          badge: suspiciousSessionsCount > 0 ? `${suspiciousSessionsCount} Live` : undefined,
          badgeColor: 'bg-neon-amber/20 text-neon-amber border-neon-amber/30'
        },
        { name: 'Biometric Profiles', path: '/app/biometrics', icon: Fingerprint },
        { name: 'Risk Engine', path: '/app/risk-engine', icon: Gauge },
        { name: 'Zero Trust Policies', path: '/app/policies', icon: Lock },
      ]
    },
    {
      title: 'SECURITY OPERATIONS',
      items: [
        { name: 'User Directory', path: '/app/users', icon: Users },
        { name: 'Device Trust', path: '/app/devices', icon: Smartphone },
        { 
          name: 'Threat Detection', 
          path: '/app/threats', 
          icon: AlertTriangle,
          badge: threatsDetectedCount > 0 ? `${threatsDetectedCount}` : undefined,
          badgeColor: 'bg-neon-rose/20 text-neon-rose border-neon-rose/30'
        },
        { name: 'Session Map', path: '/app/session-map', icon: Network },
        { name: 'Audit Logs', path: '/app/audit-logs', icon: FileText },
        { name: 'Security Analytics', path: '/app/analytics', icon: BarChart3 },
      ]
    },
    {
      title: 'DEVELOPER & SYSTEM',
      items: [
        { name: 'API Management', path: '/app/api-keys', icon: Code2 },
        { name: 'Cloud Architecture', path: '/app/architecture', icon: Cpu },
        { name: 'Auth Flow Spec', path: '/app/auth-flow', icon: GitMerge },
        { name: 'Privacy & Specs', path: '/app/privacy-security', icon: Shield },
        { name: 'Developer Docs', path: '/app/docs', icon: BookOpen },
        { name: 'Settings', path: '/app/settings', icon: Settings },
      ]
    }
  ];

  return (
    <>
      {/* Mobile backdrop */}
      {mobileOpen && (
        <div 
          className="fixed inset-0 z-40 bg-cyber-950/80 backdrop-blur-sm lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      <aside
        className={`fixed top-0 left-0 bottom-0 z-50 w-64 bg-[#0A0E1A] border-r border-slate-800/90 flex flex-col transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          mobileOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Brand Header */}
        <div className="h-16 px-5 border-b border-slate-800/80 flex items-center justify-between">
          <NavLink to="/app/dashboard" className="flex items-center gap-3 group">
            <div className="w-9 h-9 rounded-lg bg-gradient-to-tr from-cyan-500 to-blue-600 p-0.5 shadow-neon-cyan/30 shadow-lg group-hover:scale-105 transition-transform">
              <div className="w-full h-full bg-[#090D16] rounded-[7px] flex items-center justify-center">
                <ShieldCheck className="w-5 h-5 text-neon-cyan" />
              </div>
            </div>
            <div>
              <div className="font-mono font-bold text-lg text-white tracking-wider flex items-center gap-1.5">
                BIOTRUST <span className="text-neon-cyan text-xs px-1.5 py-0.5 rounded bg-neon-cyan/10 border border-neon-cyan/30">CLOUD</span>
              </div>
              <p className="text-[10px] text-slate-400 font-mono tracking-tight">Zero Trust Biometric API</p>
            </div>
          </NavLink>

          <button
            onClick={() => setMobileOpen(false)}
            className="lg:hidden text-slate-400 hover:text-white p-1"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation items */}
        <div className="flex-1 overflow-y-auto px-3 py-4 space-y-6">
          {navGroups.map((group, idx) => (
            <div key={idx}>
              <h3 className="px-3 text-[10px] font-mono font-semibold text-slate-400 uppercase tracking-widest mb-2">
                {group.title}
              </h3>
              <nav className="space-y-1">
                {group.items.map((item) => (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    onClick={() => setMobileOpen(false)}
                    className={({ isActive }) =>
                      `flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium transition-all duration-150 group ${
                        isActive
                          ? 'bg-gradient-to-r from-neon-cyan/15 to-blue-500/5 text-neon-cyan border border-neon-cyan/30 shadow-sm'
                          : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
                      }`
                    }
                  >
                    <div className="flex items-center gap-2.5">
                      <item.icon className="w-4 h-4 transition-transform group-hover:scale-110" />
                      <span>{item.name}</span>
                    </div>
                    {item.badge && (
                      <span className={`px-1.5 py-0.5 text-[10px] font-mono font-semibold rounded border ${item.badgeColor}`}>
                        {item.badge}
                      </span>
                    )}
                  </NavLink>
                ))}
              </nav>
            </div>
          ))}

          {/* External Landing Page Switcher */}
          <div className="pt-2">
            <NavLink
              to="/"
              className="flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium text-slate-400 hover:text-white bg-slate-900/60 border border-slate-800/80 hover:border-slate-700 transition-colors"
            >
              <span className="flex items-center gap-2">
                <ExternalLink className="w-3.5 h-3.5 text-neon-cyan" />
                <span>Public Landing Page</span>
              </span>
              <span className="text-[10px] font-mono text-slate-500">v2.4.0</span>
            </NavLink>
          </div>
        </div>

        {/* System Status Footer */}
        <div className="p-3 border-t border-slate-800/80 bg-[#070A12]/90">
          <div className="glass-card p-2.5 flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
              </span>
              <div className="flex flex-col">
                <span className="font-mono text-[11px] text-slate-200 font-medium leading-none">All Systems OK</span>
                <span className="text-[9px] text-slate-400 font-mono mt-0.5">Latency: 14ms | TLS 1.3</span>
              </div>
            </div>
            <Radio className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
          </div>
        </div>
      </aside>
    </>
  );
};
