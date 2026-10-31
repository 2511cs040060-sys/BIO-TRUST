import React, { useState } from 'react';
import {
  Network,
  User,
  Smartphone,
  Server,
  ShieldCheck,
  Cpu,
  Layers,
  ArrowRight,
  Activity,
  X
} from 'lucide-react';
import { useSecurity } from '../context/SecurityContext';
import { ActiveSession } from '../types/security';

export const SessionMapPage: React.FC = () => {
  const { sessions } = useSecurity();
  const [selectedSession, setSelectedSession] = useState<ActiveSession | null>(sessions[0]);

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="font-mono text-2xl font-bold text-white tracking-wide flex items-center gap-2">
          <Network className="w-6 h-6 text-neon-cyan animate-pulse" />
          Active Session Network Topology Map
        </h1>
        <p className="text-xs text-slate-400 mt-1 font-mono">
          Visual topology vector path: User → Device → Cloud Gateway → BioTrust API → Target App
        </p>
      </div>

      {/* Network Topology Visual Pipeline */}
      <div className="glass-panel p-6 border border-slate-800 space-y-8 bg-[#070A12]">
        <div className="text-xs font-mono text-slate-400 flex items-center justify-between">
          <span>ZERO TRUST NODE MAP (Click session below to inspect route payload)</span>
          <span className="text-neon-cyan">5 Active Connection Paths</span>
        </div>

        {/* Node Pipeline Diagram */}
        <div className="grid grid-cols-5 gap-2 md:gap-4 text-center font-mono text-xs">
          <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 flex flex-col items-center">
            <User className="w-6 h-6 text-neon-cyan mb-2" />
            <span className="font-bold text-slate-200">1. Authenticated User</span>
            <span className="text-[10px] text-slate-500 mt-0.5">Biometric Profile</span>
          </div>

          <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 flex flex-col items-center">
            <Smartphone className="w-6 h-6 text-blue-400 mb-2" />
            <span className="font-bold text-slate-200">2. Device Hardware</span>
            <span className="text-[10px] text-slate-500 mt-0.5">TPM / Fingerprint</span>
          </div>

          <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 flex flex-col items-center">
            <Server className="w-6 h-6 text-purple-400 mb-2" />
            <span className="font-bold text-slate-200">3. Cloud Gateway</span>
            <span className="text-[10px] text-slate-500 mt-0.5">TLS 1.3 Proxy</span>
          </div>

          <div className="p-3 rounded-xl bg-slate-900 border border-neon-cyan/40 flex flex-col items-center shadow-neon-cyan/10">
            <Cpu className="w-6 h-6 text-neon-cyan mb-2 animate-pulse" />
            <span className="font-bold text-white">4. BioTrust Engine</span>
            <span className="text-[10px] text-neon-cyan mt-0.5">Risk & Policy</span>
          </div>

          <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 flex flex-col items-center">
            <Layers className="w-6 h-6 text-emerald-400 mb-2" />
            <span className="font-bold text-slate-200">5. Target Enterprise App</span>
            <span className="text-[10px] text-slate-500 mt-0.5">Secured Resource</span>
          </div>
        </div>

        {/* Active Vector Connection Paths */}
        <div className="space-y-3 pt-4 border-t border-slate-800">
          <h3 className="font-mono text-xs font-bold text-slate-300">ACTIVE SESSION CONNECTION VECTORS</h3>

          {sessions.map((session) => {
            const isSelected = selectedSession?.id === session.id;
            const isTrusted = session.riskScore <= 30;
            const isHighRisk = session.riskScore > 60;

            return (
              <div
                key={session.id}
                onClick={() => setSelectedSession(session)}
                className={`p-4 rounded-xl border font-mono text-xs cursor-pointer transition-all ${
                  isSelected
                    ? 'bg-[#0D1527] border-neon-cyan shadow-neon-cyan/10'
                    : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
                }`}
              >
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className={`w-3 h-3 rounded-full ${
                      isHighRisk ? 'bg-rose-500 animate-ping' : isTrusted ? 'bg-emerald-400' : 'bg-amber-400'
                    }`} />
                    <div>
                      <span className="font-bold text-white">{session.userName}</span>
                      <span className="text-[10px] text-slate-400 ml-2">({session.id})</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-slate-400 text-[11px]">
                    <span>{session.device}</span>
                    <ArrowRight className="w-3.5 h-3.5 text-neon-cyan" />
                    <span>{session.ipAddress}</span>
                    <ArrowRight className="w-3.5 h-3.5 text-neon-cyan" />
                    <span className="text-emerald-400 font-bold">{session.identityConfidence}% Conf</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Selected Session Inspector Modal/Drawer */}
      {selectedSession && (
        <div className="glass-panel p-6 border border-neon-cyan/30 bg-[#090D16] space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <h3 className="font-mono text-sm font-bold text-white flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-neon-cyan" />
              Route Telemetry Payload Inspector: {selectedSession.id}
            </h3>
            <button onClick={() => setSelectedSession(null)} className="text-slate-400 hover:text-white">
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 font-mono text-xs">
            <div>
              <div className="text-[10px] text-slate-500">USER IDENTIFIER</div>
              <div className="font-bold text-white mt-1">{selectedSession.userName}</div>
              <div className="text-[10px] text-slate-400">{selectedSession.userEmail}</div>
            </div>

            <div>
              <div className="text-[10px] text-slate-500">DEVICE HARDWARE</div>
              <div className="font-bold text-white mt-1">{selectedSession.device}</div>
              <div className="text-[10px] text-emerald-400">Trust Score: {selectedSession.deviceTrust}%</div>
            </div>

            <div>
              <div className="text-[10px] text-slate-500">ZERO TRUST RISK SCORE</div>
              <div className="font-bold text-neon-cyan mt-1">{selectedSession.riskScore} / 100</div>
              <div className="text-[10px] text-slate-400">Level: {selectedSession.riskLevel}</div>
            </div>

            <div>
              <div className="text-[10px] text-slate-500">IDENTITY CONFIDENCE</div>
              <div className="font-bold text-emerald-400 mt-1">{selectedSession.identityConfidence}%</div>
              <div className="text-[10px] text-slate-400">Status: {selectedSession.status}</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
