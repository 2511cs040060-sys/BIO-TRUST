import React from 'react';
import {
  GitMerge,
  ArrowRight,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  ShieldCheck,
  Activity,
  Gauge,
  Lock,
  RefreshCw
} from 'lucide-react';

export const AuthFlowPage: React.FC = () => {
  const steps = [
    { num: 1, title: 'User Login', desc: 'Credentials or initial OAuth token assertion.' },
    { num: 2, title: 'Initial Auth', desc: 'Validates primary password & email authentication.' },
    { num: 3, title: 'Device Verification', desc: 'Fingerprints hardware ID & attests TPM keys.' },
    { num: 4, title: 'Biometric Verification', desc: 'Validates 3D Face & Voice acoustic match.' },
    { num: 5, title: 'Session Created', desc: 'Issues short-lived JWT & registers WebSocket stream.' },
    { num: 6, title: 'Continuous Monitoring', desc: 'Streams mouse & keystroke micro-telemetry.' },
    { num: 7, title: 'Behavior Analysis', desc: 'Compares real-time cadence to user baseline.' },
    { num: 8, title: 'Risk Calculation', desc: 'Evaluates weighted Zero Trust risk score (0-100).' },
    { num: 9, title: 'Policy Evaluation', desc: 'Checks score against active Zero Trust policies.' },
  ];

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="font-mono text-2xl font-bold text-white tracking-wide flex items-center gap-2">
          <GitMerge className="w-6 h-6 text-neon-cyan" />
          Continuous Authentication Lifecycle Flow Spec
        </h1>
        <p className="text-xs text-slate-400 mt-1 font-mono">
          Step-by-step decision matrix from initial login through continuous biometric stream evaluation
        </p>
      </div>

      {/* Sequential Workflow Lifecycle */}
      <div className="glass-panel p-6 border border-slate-800 space-y-6 bg-[#070A12]">
        <h2 className="font-mono text-sm font-bold text-white uppercase text-slate-300">
          EXECUTION SEQUENCE STEPS
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {steps.map((s) => (
            <div key={s.num} className="glass-card p-4 border border-slate-800 space-y-2">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-neon-cyan/20 text-neon-cyan border border-neon-cyan/40 font-mono text-xs font-bold flex items-center justify-center">
                  {s.num}
                </span>
                <h3 className="font-mono text-xs font-bold text-white">{s.title}</h3>
              </div>
              <p className="text-[11px] text-slate-400 font-mono leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>

        {/* Final Decision Branching Card */}
        <div className="mt-8 pt-6 border-t border-slate-800 space-y-4">
          <h3 className="font-mono text-xs font-bold text-slate-300 uppercase">
            POLICY DECISION MATRIX BRANCHES
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono text-xs">
            {/* Branch 1: Low Risk */}
            <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 space-y-2">
              <div className="flex items-center gap-2 text-emerald-400 font-bold">
                <CheckCircle2 className="w-5 h-5" />
                <span>Score &lt; 30: CONTINUE SESSION</span>
              </div>
              <p className="text-[11px] text-slate-300">
                Session remains active. Continuous biometric heartbeat ticker updates background telemetry seamlessly.
              </p>
            </div>

            {/* Branch 2: Medium/High Risk */}
            <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 space-y-2">
              <div className="flex items-center gap-2 text-amber-400 font-bold">
                <RefreshCw className="w-5 h-5" />
                <span>Score 30–80: STEP-UP AUTH</span>
              </div>
              <p className="text-[11px] text-slate-300">
                Issues mandatory biometric re-verification challenge (3D Face Mesh or Touch ID) to verify active user.
              </p>
            </div>

            {/* Branch 3: Critical Risk */}
            <div className="p-4 rounded-xl bg-rose-500/20 border border-rose-500/40 space-y-2">
              <div className="flex items-center gap-2 text-rose-400 font-bold">
                <XCircle className="w-5 h-5" />
                <span>Score &gt; 80: TERMINATE SESSION</span>
              </div>
              <p className="text-[11px] text-slate-300">
                Immediately revokes session token across API gateways, isolates device IP, and emits critical SOC threat alert.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
