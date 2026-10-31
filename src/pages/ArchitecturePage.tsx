import React from 'react';
import {
  Cpu,
  Server,
  Globe,
  Database,
  Lock,
  Activity,
  ShieldCheck,
  Zap,
  Radio,
  FileText,
  BarChart3,
  AlertTriangle
} from 'lucide-react';

export const ArchitecturePage: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="font-mono text-2xl font-bold text-white tracking-wide flex items-center gap-2">
          <Cpu className="w-6 h-6 text-neon-cyan" />
          Enterprise Cloud Architecture & Microservices Map
        </h1>
        <p className="text-xs text-slate-400 mt-1 font-mono">
          High-availability distributed microservices topology for AWS, Azure, and Google Cloud Platform
        </p>
      </div>

      {/* Visual Cloud Topology Architecture Map */}
      <div className="glass-panel p-8 border border-slate-800 bg-[#070A12] space-y-10 relative overflow-hidden">
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div className="flex items-center gap-2 font-mono text-xs text-neon-cyan">
            <Radio className="w-4 h-4 animate-pulse" />
            <span>CLOUD DISTRIBUTED ARCHITECTURE PIPELINE</span>
          </div>
          <span className="text-[10px] font-mono text-slate-400">REST & WebSocket Telemetry Stream</span>
        </div>

        {/* Tier 1: Client Tier */}
        <div className="text-center">
          <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">TIER 1: CLIENT EDGE TELEMETRY</span>
          <div className="mt-3 flex justify-center gap-6">
            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 font-mono text-xs w-48 shadow-lg">
              <Globe className="w-5 h-5 text-neon-cyan mx-auto mb-1" />
              <div className="font-bold text-white">Web / React App</div>
              <div className="text-[10px] text-slate-400">JS Telemetry SDK</div>
            </div>

            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 font-mono text-xs w-48 shadow-lg">
              <Globe className="w-5 h-5 text-blue-400 mx-auto mb-1" />
              <div className="font-bold text-white">Mobile iOS / Android</div>
              <div className="text-[10px] text-slate-400">Biometric Enclave SDK</div>
            </div>
          </div>
        </div>

        {/* Downward Connector Arrow */}
        <div className="w-0.5 h-8 bg-neon-cyan/40 mx-auto animate-pulse" />

        {/* Tier 2: Cloud API Gateway */}
        <div className="text-center">
          <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">TIER 2: API GATEWAY & ROUTER</span>
          <div className="mt-3 max-w-md mx-auto p-4 rounded-xl bg-gradient-to-r from-neon-cyan/10 to-blue-500/10 border border-neon-cyan/40 font-mono text-xs shadow-neon-cyan/10">
            <Server className="w-6 h-6 text-neon-cyan mx-auto mb-1 animate-pulse" />
            <div className="font-bold text-white text-sm">Cloud API Gateway</div>
            <div className="text-[10px] text-slate-400 mt-1">TLS 1.3 Termination, Rate Limiting, JWT Auth Router</div>
          </div>
        </div>

        {/* Downward Connector Arrow */}
        <div className="w-0.5 h-8 bg-neon-cyan/40 mx-auto animate-pulse" />

        {/* Tier 3: Core Microservices Grid */}
        <div className="text-center space-y-3">
          <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">TIER 3: ZERO TRUST CORE MICROSERVICES ENGINE</span>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 font-mono text-xs">
            <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800">
              <ShieldCheck className="w-5 h-5 text-emerald-400 mx-auto mb-1" />
              <div className="font-bold text-white">Auth & Identity</div>
              <div className="text-[10px] text-slate-400 mt-1">OAuth2 / JWT Token Service</div>
            </div>

            <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800">
              <Activity className="w-5 h-5 text-neon-cyan mx-auto mb-1" />
              <div className="font-bold text-white">Biometric Matcher</div>
              <div className="text-[10px] text-slate-400 mt-1">Neural Vector Comparison</div>
            </div>

            <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800">
              <Zap className="w-5 h-5 text-amber-400 mx-auto mb-1" />
              <div className="font-bold text-white">Risk Scoring Engine</div>
              <div className="text-[10px] text-slate-400 mt-1">Weighted Anomaly Math</div>
            </div>

            <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800">
              <Lock className="w-5 h-5 text-rose-400 mx-auto mb-1" />
              <div className="font-bold text-white">Policy Engine</div>
              <div className="text-[10px] text-slate-400 mt-1">Session Controller & Kill</div>
            </div>
          </div>
        </div>

        {/* Downward Connector Arrow */}
        <div className="w-0.5 h-8 bg-neon-cyan/40 mx-auto animate-pulse" />

        {/* Tier 4: Storage & Monitoring Support Services */}
        <div className="text-center">
          <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">TIER 4: STORAGE & SECURITY ANALYTICS PLATFORM</span>
          <div className="mt-3 grid grid-cols-1 sm:grid-cols-4 gap-4 font-mono text-xs">
            <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
              <Database className="w-5 h-5 text-purple-400 mx-auto mb-1" />
              <div className="font-bold text-slate-200">PostgreSQL / Redis</div>
              <div className="text-[10px] text-slate-500">Encrypted Vectors & Sessions</div>
            </div>

            <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
              <FileText className="w-5 h-5 text-blue-400 mx-auto mb-1" />
              <div className="font-bold text-slate-200">Audit Log Service</div>
              <div className="text-[10px] text-slate-500">Immutable Compliance Trail</div>
            </div>

            <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
              <AlertTriangle className="w-5 h-5 text-rose-400 mx-auto mb-1" />
              <div className="font-bold text-slate-200">Threat Detection</div>
              <div className="text-[10px] text-slate-500">SIEM / SOC Integration</div>
            </div>

            <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
              <BarChart3 className="w-5 h-5 text-emerald-400 mx-auto mb-1" />
              <div className="font-bold text-slate-200">Security Analytics</div>
              <div className="text-[10px] text-slate-500">Real-time Metrics Pipeline</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
