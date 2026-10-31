import React from 'react';
import {
  Shield,
  Lock,
  Key,
  CheckCircle2,
  FileCheck,
  EyeOff,
  Server,
  Zap
} from 'lucide-react';

export const PrivacySecurityPage: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="font-mono text-2xl font-bold text-white tracking-wide flex items-center gap-2">
          <Shield className="w-6 h-6 text-neon-cyan" />
          Biometric Privacy & Security Specification
        </h1>
        <p className="text-xs text-slate-400 mt-1 font-mono">
          Cryptographic guarantees, zero raw data storage policy, and enterprise compliance standards
        </p>
      </div>

      {/* Primary Privacy Highlights Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="glass-panel p-6 border border-emerald-500/30 bg-[#090D16] space-y-3">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
              <EyeOff className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-mono text-base font-bold text-white">Raw Biometric Data: NEVER STORED</h3>
              <p className="text-xs text-slate-400 font-mono">Irreversible Vector Hashes Only</p>
            </div>
          </div>
          <p className="text-xs text-slate-300 font-mono leading-relaxed pt-2">
            BioTrust Cloud never stores raw facial images, voice recordings, or fingerprint scans. All biometric inputs are processed on the client edge into mathematical feature vectors, encrypted via non-reversible SHA-256 homomorphic hashes.
          </p>
        </div>

        <div className="glass-panel p-6 border border-cyan-500/30 bg-[#090D16] space-y-3">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-cyan-500/10 text-neon-cyan border border-cyan-500/30">
              <Lock className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-mono text-base font-bold text-white">Encryption & Transit Security</h3>
              <p className="text-xs text-slate-400 font-mono">TLS 1.3 & AES-256 GCM</p>
            </div>
          </div>
          <p className="text-xs text-slate-300 font-mono leading-relaxed pt-2">
            All telemetry streams use TLS 1.3 transport encryption with perfect forward secrecy. Stored templates are encrypted at rest using AES-256 GCM with rotating hardware keys stored in AWS KMS / GCP Cloud KMS.
          </p>
        </div>
      </div>

      {/* Compliance Standards Table */}
      <div className="glass-panel p-6 border border-slate-800 space-y-4">
        <h2 className="font-mono text-base font-bold text-white flex items-center gap-2">
          <FileCheck className="w-5 h-5 text-neon-cyan" />
          Enterprise Compliance & Privacy Frameworks
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono text-xs">
          <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-bold text-white">GDPR Compliance</span>
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            </div>
            <p className="text-[11px] text-slate-400">
              Article 9 Special Category Data compliance. Supports instant user consent revocation and right-to-be-forgotten vector purging.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-bold text-white">CCPA / BIPA Compliant</span>
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            </div>
            <p className="text-[11px] text-slate-400">
              Illinois Biometric Information Privacy Act (BIPA) standards enforced with strict 3-year data destruction timelines.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-bold text-white">SOC 2 Type II Certified</span>
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            </div>
            <p className="text-[11px] text-slate-400">
              Audited security control policies covering availability, confidentiality, and processing integrity of continuous authentication endpoints.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
