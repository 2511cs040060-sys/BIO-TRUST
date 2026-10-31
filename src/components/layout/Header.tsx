import React, { useState } from 'react';
import {
  Menu,
  Play,
  Bell,
  Search,
  Shield,
  Zap,
  CheckCircle2,
  AlertTriangle,
  X,
  Keyboard,
  MousePointer,
  Smartphone
} from 'lucide-react';
import { useSecurity } from '../../context/SecurityContext';

interface HeaderProps {
  setMobileOpen: (open: boolean) => void;
  openSimulationModal: () => void;
  openMobileModal: () => void;
}

export const Header: React.FC<HeaderProps> = ({ setMobileOpen, openSimulationModal, openMobileModal }) => {
  const {
    threatsDetectedCount,
    threats,
    isSimulationRunning,
    realKeystrokeMetrics,
    realMouseMetrics
  } = useSecurity();

  const [showNotifications, setShowNotifications] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <header className="sticky top-0 z-30 h-16 bg-[#090D16]/90 backdrop-blur-md border-b border-slate-800/80 px-4 lg:px-8 flex items-center justify-between">
      {/* Left section: Mobile toggle & Search */}
      <div className="flex items-center gap-4">
        <button
          onClick={() => setMobileOpen(true)}
          className="lg:hidden text-slate-400 hover:text-white p-1.5 rounded-lg border border-slate-800 bg-slate-900/60"
        >
          <Menu className="w-5 h-5" />
        </button>

        {/* Global Search Bar */}
        <div className="relative hidden md:block w-64">
          <Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-500" />
          <input
            type="text"
            placeholder="Search telemetry, IP, user..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={() => setSearchOpen(true)}
            onBlur={() => setTimeout(() => setSearchOpen(false), 200)}
            className="w-full bg-[#0D1322] border border-slate-800 rounded-lg pl-9 pr-8 py-1.5 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-neon-cyan/50 font-mono"
          />
          <span className="absolute right-2.5 top-2 px-1.5 py-0.5 text-[9px] font-mono text-slate-500 bg-slate-800/60 rounded border border-slate-700/50">
            ⌘K
          </span>
        </div>

        {/* Real Hardware Telemetry Quick HUD */}
        <div className="hidden xl:flex items-center gap-3 px-3 py-1 rounded-lg bg-[#070A12] border border-slate-800/80 font-mono text-[11px]">
          <div className="flex items-center gap-1 text-purple-400">
            <Keyboard className="w-3.5 h-3.5" />
            <span>{realKeystrokeMetrics.dwellTimeAvg}ms Dwell</span>
          </div>
          <span className="text-slate-700">|</span>
          <div className="flex items-center gap-1 text-amber-400">
            <MousePointer className="w-3.5 h-3.5" />
            <span>{realMouseMetrics.velocityAvg} px/ms</span>
          </div>
        </div>
      </div>

      {/* Right section: Action Buttons & User Menu */}
      <div className="flex items-center gap-3">
        {/* Mobile Authenticator Button */}
        <button
          onClick={openMobileModal}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 hover:bg-emerald-500/20 text-xs font-mono font-semibold transition-all"
        >
          <Smartphone className="w-4 h-4 text-emerald-400" />
          <span className="hidden sm:inline">PAIR MOBILE TOUCH ID</span>
        </button>

        {/* Launch Security Simulation CTA Button */}
        <button
          onClick={openSimulationModal}
          className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-mono font-semibold transition-all duration-200 shadow-md ${
            isSimulationRunning
              ? 'bg-amber-500/20 text-amber-300 border border-amber-500/50 animate-pulse'
              : 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white hover:from-cyan-400 hover:to-blue-500 shadow-neon-cyan/20 border border-neon-cyan/40 hover:scale-[1.02]'
          }`}
        >
          {isSimulationRunning ? (
            <>
              <Zap className="w-4 h-4 text-amber-400 animate-bounce" />
              <span>SIMULATION IN PROGRESS</span>
            </>
          ) : (
            <>
              <Play className="w-3.5 h-3.5 fill-current" />
              <span>SIMULATION</span>
            </>
          )}
        </button>

        {/* Threat Notifications Bell */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="relative p-2 rounded-lg bg-[#0D1322] border border-slate-800 text-slate-300 hover:text-white hover:border-slate-700 transition-colors"
          >
            <Bell className="w-4 h-4" />
            {threatsDetectedCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-neon-rose text-white text-[9px] font-mono font-bold flex items-center justify-center animate-pulse">
                {threatsDetectedCount}
              </span>
            )}
          </button>

          {showNotifications && (
            <div className="absolute right-0 top-full mt-2 w-80 bg-[#0D1322] border border-slate-800 rounded-xl shadow-glass z-50 overflow-hidden">
              <div className="p-3 border-b border-slate-800 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-neon-rose" />
                  <span className="font-mono text-xs font-semibold text-white">Active Threat Alerts</span>
                </div>
                <button onClick={() => setShowNotifications(false)} className="text-slate-500 hover:text-slate-300">
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="max-h-72 overflow-y-auto divide-y divide-slate-800/60">
                {threats.slice(0, 4).map((threat) => (
                  <div key={threat.id} className="p-3 hover:bg-slate-800/40 transition-colors text-xs">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-mono font-semibold text-slate-200 text-[11px] truncate max-w-[180px]">
                        {threat.title}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-400 line-clamp-2 leading-relaxed">{threat.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Profile Avatar */}
        <div className="flex items-center gap-2 pl-2 border-l border-slate-800">
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-cyan-500 to-indigo-600 p-0.5 flex items-center justify-center">
            <div className="w-full h-full rounded-full bg-[#0A0E1A] flex items-center justify-center font-mono font-bold text-xs text-neon-cyan">
              AJ
            </div>
          </div>
          <div className="hidden xl:block text-left">
            <div className="text-xs font-semibold text-slate-200 leading-tight">Alex Johnson</div>
            <div className="text-[10px] text-emerald-400 font-mono flex items-center gap-1">
              <CheckCircle2 className="w-2.5 h-2.5" /> SOC Administrator
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
