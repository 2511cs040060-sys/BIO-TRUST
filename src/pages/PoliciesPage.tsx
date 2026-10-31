import React from 'react';
import {
  Lock,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Shield,
  Zap,
  Sliders
} from 'lucide-react';
import { useSecurity } from '../context/SecurityContext';

export const PoliciesPage: React.FC = () => {
  const { policies, togglePolicy } = useSecurity();

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="font-mono text-2xl font-bold text-white tracking-wide flex items-center gap-2">
          <Lock className="w-6 h-6 text-neon-cyan" />
          Zero Trust Policy Engine
        </h1>
        <p className="text-xs text-slate-400 mt-1 font-mono">
          Automated identity policy enforcement rules and continuous condition evaluation
        </p>
      </div>

      {/* Policy Rules Grid */}
      <div className="space-y-4">
        {policies.map((policy) => {
          const isEnabled = policy.status === 'ENABLED';

          return (
            <div
              key={policy.id}
              className={`glass-card p-5 transition-all duration-200 ${
                isEnabled ? 'border-slate-800 bg-[#0D1322]/80' : 'border-slate-900 bg-slate-950/40 opacity-60'
              }`}
            >
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div className="flex items-start gap-3">
                  <div className={`p-2.5 rounded-xl border mt-0.5 ${
                    policy.severity === 'CRITICAL'
                      ? 'bg-rose-500/10 text-rose-400 border-rose-500/30'
                      : policy.severity === 'HIGH'
                      ? 'bg-amber-500/10 text-amber-400 border-amber-500/30'
                      : 'bg-cyan-500/10 text-neon-cyan border-cyan-500/30'
                  }`}>
                    <Shield className="w-5 h-5" />
                  </div>

                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-bold text-neon-cyan">{policy.code}</span>
                      <h3 className="font-mono text-sm font-bold text-white">{policy.name}</h3>
                      <span className={`text-[9px] font-mono px-2 py-0.5 rounded border ${
                        policy.severity === 'CRITICAL' ? 'bg-rose-500/20 text-rose-400 border-rose-500/30' : 'bg-amber-500/20 text-amber-400'
                      }`}>
                        {policy.severity} SEVERITY
                      </span>
                    </div>
                    <p className="text-xs text-slate-400 font-mono mt-1">{policy.description}</p>
                  </div>
                </div>

                {/* Status Toggle Switch */}
                <div className="flex items-center gap-3">
                  <span className="text-xs font-mono text-slate-400">
                    Status: <strong className={isEnabled ? 'text-emerald-400' : 'text-slate-500'}>{policy.status}</strong>
                  </span>
                  <button
                    onClick={() => togglePolicy(policy.id)}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none ${
                      isEnabled ? 'bg-neon-cyan' : 'bg-slate-800'
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-slate-950 transition-transform ${
                        isEnabled ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>
              </div>

              {/* Condition & Action Telemetry Bar */}
              <div className="mt-4 pt-4 border-t border-slate-800/80 grid grid-cols-1 md:grid-cols-3 gap-4 font-mono text-xs bg-[#070A12] p-3 rounded-lg border border-slate-800/80">
                <div>
                  <div className="text-[10px] text-slate-500 uppercase">RULE CONDITION</div>
                  <div className="text-slate-200 font-semibold mt-0.5">{policy.condition}</div>
                </div>

                <div>
                  <div className="text-[10px] text-slate-500 uppercase">ENFORCEMENT ACTION</div>
                  <div className="text-neon-cyan font-bold mt-0.5">{policy.action}</div>
                </div>

                <div>
                  <div className="text-[10px] text-slate-500 uppercase">TIMES ENFORCED</div>
                  <div className="text-slate-300 mt-0.5">
                    <strong className="text-emerald-400">{policy.timesEnforced}</strong> triggers ({policy.lastTriggered || 'Never'})
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
