import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  ShieldCheck,
  Activity,
  Fingerprint,
  Gauge,
  Lock,
  Cpu,
  Code2,
  ArrowRight,
  Shield,
  Zap,
  CheckCircle2,
  Server,
  Play,
  Key,
  Database,
  Globe,
  Radio
} from 'lucide-react';

interface LandingPageProps {
  openSimulationModal: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ openSimulationModal }) => {
  return (
    <div className="min-h-screen bg-[#05070E] text-slate-100 selection:bg-neon-cyan/30 selection:text-neon-cyan">
      {/* Top Header Navigation */}
      <header className="sticky top-0 z-40 bg-[#070A12]/80 backdrop-blur-md border-b border-slate-800/80 px-6 lg:px-12 h-20 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 to-blue-600 p-0.5 shadow-neon-cyan/30 shadow-lg">
            <div className="w-full h-full bg-[#090D16] rounded-[10px] flex items-center justify-center">
              <ShieldCheck className="w-6 h-6 text-neon-cyan" />
            </div>
          </div>
          <div>
            <div className="font-mono font-bold text-xl text-white tracking-wider flex items-center gap-2">
              BIOTRUST <span className="text-neon-cyan text-xs px-2 py-0.5 rounded bg-neon-cyan/10 border border-neon-cyan/30">CLOUD</span>
            </div>
            <p className="text-[11px] text-slate-400 font-mono">Continuous Biometric Authentication API</p>
          </div>
        </div>

        <nav className="hidden md:flex items-center gap-8 text-xs font-mono font-medium text-slate-300">
          <a href="#features" className="hover:text-neon-cyan transition-colors">Features</a>
          <a href="#how-it-works" className="hover:text-neon-cyan transition-colors">How It Works</a>
          <a href="#architecture" className="hover:text-neon-cyan transition-colors">Architecture</a>
          <a href="#api" className="hover:text-neon-cyan transition-colors">Developer API</a>
          <NavLink to="/app/docs" className="hover:text-neon-cyan transition-colors">Documentation</NavLink>
        </nav>

        <div className="flex items-center gap-4">
          <NavLink
            to="/login"
            className="px-4 py-2 rounded-lg text-xs font-mono font-medium text-slate-300 hover:text-white border border-slate-800 hover:border-slate-700 bg-slate-900/60 transition-all"
          >
            Sign In
          </NavLink>

          <NavLink
            to="/app/dashboard"
            className="px-5 py-2 rounded-lg text-xs font-mono font-bold bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-neon-cyan/20 border border-neon-cyan/40 hover:scale-105 transition-transform"
          >
            Explore Dashboard
          </NavLink>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative pt-20 pb-24 px-6 lg:px-12 max-w-7xl mx-auto text-center cyber-grid-bg">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-neon-cyan/10 border border-neon-cyan/30 text-neon-cyan text-xs font-mono font-semibold mb-8">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
          </span>
          Next-Gen Zero Trust Continuous Identity Engine
        </div>

        <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-white max-w-4xl mx-auto leading-tight">
          Never Trust. <br />
          <span className="cyber-gradient-text">Always Verify.</span>
        </h1>

        <p className="mt-6 text-base md:text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed">
          Cloud-native continuous biometric authentication platform that actively verifies user identity every second using facial 3D mesh, acoustic voice, and behavioral keystroke dynamics.
        </p>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-4 font-mono">
          <NavLink
            to="/app/dashboard"
            className="flex items-center gap-2 px-7 py-3.5 rounded-xl bg-gradient-to-r from-neon-cyan to-blue-600 text-slate-950 font-bold text-sm shadow-neon-cyan/30 hover:scale-105 transition-all"
          >
            <span>EXPLORE PLATFORM</span>
            <ArrowRight className="w-4 h-4" />
          </NavLink>

          <NavLink
            to="/app/docs"
            className="flex items-center gap-2 px-6 py-3.5 rounded-xl bg-[#0D1322] border border-slate-800 hover:border-slate-700 text-slate-200 text-sm font-semibold hover:bg-slate-900 transition-all"
          >
            <Code2 className="w-4 h-4 text-neon-cyan" />
            <span>VIEW API DOCUMENTATION</span>
          </NavLink>

          <button
            onClick={openSimulationModal}
            className="flex items-center gap-2 px-6 py-3.5 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-400 text-sm font-semibold hover:bg-rose-500/20 transition-all"
          >
            <Play className="w-4 h-4 fill-current" />
            <span>LAUNCH DEMO SIMULATION</span>
          </button>
        </div>

        {/* Live Security Console Preview Card */}
        <div className="mt-16 max-w-5xl mx-auto glass-panel p-4 md:p-6 border border-neon-cyan/30 shadow-neon-cyan/10">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-6">
            <div className="flex items-center gap-3">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-rose-500/80"></div>
                <div className="w-3 h-3 rounded-full bg-amber-500/80"></div>
                <div className="w-3 h-3 rounded-full bg-emerald-500/80"></div>
              </div>
              <span className="font-mono text-xs text-slate-400">biotrust-soc-console-v2.4.0</span>
            </div>
            <div className="flex items-center gap-2 text-[11px] font-mono text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded border border-emerald-500/20">
              <Radio className="w-3 h-3 animate-pulse" /> CONTINUOUS STREAM ACTIVE
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-left">
            <div className="glass-card p-4 bg-[#070A12]">
              <div className="text-[10px] font-mono text-slate-400">SESSION ID</div>
              <div className="font-mono text-sm font-bold text-neon-cyan mt-1">SES-92831 (Alex Johnson)</div>
              <div className="mt-3 text-xs text-slate-300 font-mono">Biometric Confidence: <span className="text-emerald-400 font-bold">98.7%</span></div>
              <div className="w-full h-1.5 bg-slate-800 rounded-full mt-1.5 overflow-hidden">
                <div className="h-full bg-neon-cyan w-[98.7%] shadow-neon-cyan"></div>
              </div>
            </div>

            <div className="glass-card p-4 bg-[#070A12]">
              <div className="text-[10px] font-mono text-slate-400">ZERO TRUST RISK SCORE</div>
              <div className="font-mono text-sm font-bold text-emerald-400 mt-1">12 / 100 (LOW RISK)</div>
              <div className="mt-3 text-xs text-slate-300 font-mono">Device Trust: <span className="text-blue-400 font-bold">96%</span></div>
              <div className="w-full h-1.5 bg-slate-800 rounded-full mt-1.5 overflow-hidden">
                <div className="h-full bg-emerald-400 w-[88%]"></div>
              </div>
            </div>

            <div className="glass-card p-4 bg-[#070A12]">
              <div className="text-[10px] font-mono text-slate-400">POLICY EVALUATION</div>
              <div className="font-mono text-xs font-semibold text-slate-200 mt-1">● POL-01 Continuous Biometrics: PASS</div>
              <div className="font-mono text-xs font-semibold text-slate-200 mt-1">● POL-02 Untrusted Device: PASS</div>
              <div className="mt-2 text-[10px] font-mono text-slate-400">Last verified: 4s ago</div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Pillars */}
      <section id="features" className="py-20 px-6 lg:px-12 max-w-7xl mx-auto border-t border-slate-800/80">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-3xl font-extrabold text-white font-mono">Why Continuous Biometric Zero Trust?</h2>
          <p className="mt-3 text-slate-400 text-sm">Static session tokens leave enterprise systems vulnerable to session hijacking and stolen cookies. BioTrust Cloud solves this by continuously verifying identity during every active second.</p>
        </div>

        <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="glass-card p-6 relative">
            <div className="p-3 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-neon-cyan w-fit mb-4">
              <Activity className="w-6 h-6" />
            </div>
            <h3 className="font-mono text-lg font-bold text-white">Continuous Identity Stream</h3>
            <p className="text-slate-400 text-xs mt-2 leading-relaxed">
              Instead of verifying identity once at login, BioTrust streams real-time biometric and behavioral vectors to ensure the active user remains authorized.
            </p>
          </div>

          <div className="glass-card p-6 relative">
            <div className="p-3 rounded-xl bg-blue-500/10 border border-blue-500/30 text-blue-400 w-fit mb-4">
              <Fingerprint className="w-6 h-6" />
            </div>
            <h3 className="font-mono text-lg font-bold text-white">Multi-Modal Biometrics</h3>
            <p className="text-slate-400 text-xs mt-2 leading-relaxed">
              Combines 3D Face Mesh, Voice Spectral Prints, Hardware Fingerprint, and Keystroke/Mouse Dynamics using a weighted confidence scoring engine.
            </p>
          </div>

          <div className="glass-card p-6 relative">
            <div className="p-3 rounded-xl bg-purple-500/10 border border-purple-500/30 text-purple-400 w-fit mb-4">
              <Gauge className="w-6 h-6" />
            </div>
            <h3 className="font-mono text-lg font-bold text-white">Adaptive Risk Engine</h3>
            <p className="text-slate-400 text-xs mt-2 leading-relaxed">
              Dynamically evaluates device trust, IP reputation, impossible travel, and behavioral anomalies to trigger instant Step-Up auth or session termination.
            </p>
          </div>
        </div>
      </section>

      {/* Cloud Architecture Overview */}
      <section id="architecture" className="py-20 px-6 lg:px-12 max-w-7xl mx-auto border-t border-slate-800/80">
        <div className="text-center max-w-3xl mx-auto">
          <div className="text-xs font-mono text-neon-cyan uppercase tracking-widest mb-2">ENTERPRISE CLOUD ARCHITECTURE</div>
          <h2 className="text-3xl font-extrabold text-white font-mono">Microservices & API Gateway</h2>
        </div>

        <div className="mt-12 glass-panel p-8 text-center border border-slate-800">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-xs font-mono">
            <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800">
              <Server className="w-6 h-6 text-neon-cyan mx-auto mb-2" />
              <div className="font-bold text-white">API Gateway</div>
              <div className="text-[10px] text-slate-400 mt-1">REST / WebSocket Router</div>
            </div>

            <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800">
              <Fingerprint className="w-6 h-6 text-emerald-400 mx-auto mb-2" />
              <div className="font-bold text-white">Biometric Engine</div>
              <div className="text-[10px] text-slate-400 mt-1">Neural Vector Matcher</div>
            </div>

            <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800">
              <Gauge className="w-6 h-6 text-amber-400 mx-auto mb-2" />
              <div className="font-bold text-white">Risk Scoring Engine</div>
              <div className="text-[10px] text-slate-400 mt-1">Weighted Anomaly Calculator</div>
            </div>

            <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800">
              <Lock className="w-6 h-6 text-rose-400 mx-auto mb-2" />
              <div className="font-bold text-white">Policy Engine</div>
              <div className="text-[10px] text-slate-400 mt-1">Session Controller</div>
            </div>
          </div>
        </div>
      </section>

      {/* Developer API Preview */}
      <section id="api" className="py-20 px-6 lg:px-12 max-w-7xl mx-auto border-t border-slate-800/80">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="text-xs font-mono text-neon-cyan uppercase tracking-widest mb-2">DEVELOPER FRIENDLY</div>
            <h2 className="text-3xl font-extrabold text-white font-mono">Simple REST & WebSocket API Integration</h2>
            <p className="mt-4 text-slate-400 text-sm leading-relaxed">
              Integrate BioTrust Cloud into your React, Node.js, Python, or mobile applications with minimal code. SDKs support automatic telemetry collection and seamless JWT token validation.
            </p>

            <div className="mt-6 space-y-3 font-mono text-xs text-slate-300">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-neon-cyan" />
                <span>REST API for biometric sample verification</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-neon-cyan" />
                <span>WebSocket endpoints for streaming continuous auth</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-neon-cyan" />
                <span>Encrypted templates - Raw biometrics never stored</span>
              </div>
            </div>

            <div className="mt-8">
              <NavLink
                to="/app/docs"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-neon-cyan text-slate-950 font-mono font-bold text-xs shadow-neon-cyan/20 hover:scale-105 transition-transform"
              >
                <span>EXPLORE API DOCS</span>
                <ArrowRight className="w-4 h-4" />
              </NavLink>
            </div>
          </div>

          <div className="glass-panel p-6 border border-slate-800 bg-[#070A12]">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-4 font-mono text-xs text-slate-400">
              <span>POST /api/v1/session/verify</span>
              <span className="text-neon-cyan">JavaScript SDK</span>
            </div>
            <pre className="font-mono text-xs text-cyan-300 overflow-x-auto leading-relaxed">
{`fetch("https://api.biotrust.cloud/v1/session/verify", {
  method: "POST",
  headers: {
    "Authorization": "Bearer API_KEY",
    "Content-Type": "application/json"
  },
  body: JSON.stringify({
    sessionId: "SES-92831",
    biometricTelemetry: {
      keystrokeDynamics: { dwellMs: 74 },
      mouseVelocity: 420
    }
  })
})
.then(res => res.json())
.then(data => console.log("Confidence:", data.identityConfidence));`}
            </pre>
          </div>
        </div>
      </section>

      {/* CTA Footer */}
      <footer className="py-16 px-6 lg:px-12 max-w-7xl mx-auto border-t border-slate-800/80 text-center">
        <h2 className="text-3xl font-extrabold text-white font-mono">Secure Every Session. Verify Every Moment.</h2>
        <p className="mt-3 text-slate-400 text-sm max-w-xl mx-auto">Experience modern Zero Trust continuous biometric security today.</p>

        <div className="mt-8">
          <NavLink
            to="/app/dashboard"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-neon-cyan to-blue-600 text-slate-950 font-mono font-extrabold text-sm shadow-neon-cyan/30 hover:scale-105 transition-transform"
          >
            <span>LAUNCH BIOTRUST CLOUD</span>
            <ArrowRight className="w-4 h-4" />
          </NavLink>
        </div>

        <div className="mt-12 text-xs font-mono text-slate-600">
          © 2026 BioTrust Cloud. All rights reserved. Zero Trust Continuous Biometric Security.
        </div>
      </footer>
    </div>
  );
};
