import React from 'react';
import {
  AlertTriangle,
  ShieldAlert,
  ShieldCheck,
  RefreshCw,
  XCircle,
  Eye,
  CheckCircle2,
  Filter
} from 'lucide-react';
import { useSecurity } from '../context/SecurityContext';

export const ThreatsPage: React.FC = () => {
  const { threats, resolveThreat, dismissThreat, revokeSession, stepUpAuthSession } = useSecurity();

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-mono text-2xl font-bold text-white tracking-wide flex items-center gap-2">
            <AlertTriangle className="w-6 h-6 text-neon-rose animate-pulse" />
            SOC Threat Detection Center
          </h1>
          <p className="text-xs text-slate-400 mt-1 font-mono">
            Automated biometric anomaly alerts, account takeover detection, and incident response
          </p>
        </div>

        <div className="text-xs font-mono text-slate-400 bg-slate-900 px-3 py-1.5 rounded-lg border border-slate-800">
          Active Incident Alerts: <strong className="text-neon-rose">{threats.length}</strong>
        </div>
      </div>

      {/* Threat Incident Feed */}
      <div className="space-y-4">
        {threats.map((threat) => {
          const isResolved = threat.status === 'RESOLVED' || threat.status === 'DISMISSED';

          return (
            <div
              key={threat.id}
              className={`glass-card p-5 border transition-all ${
                isResolved
                  ? 'border-slate-900 bg-slate-950/40 opacity-50'
                  : threat.severity === 'CRITICAL'
                  ? 'border-rose-500/50 bg-rose-950/20 shadow-neon-red/20'
                  : 'border-amber-500/40 bg-amber-950/20'
              }`}
            >
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div className="flex items-start gap-3">
                  <div className={`p-2.5 rounded-xl border mt-0.5 ${
                    threat.severity === 'CRITICAL'
                      ? 'bg-rose-500/20 text-rose-400 border-rose-500/40'
                      : 'bg-amber-500/20 text-amber-400 border-amber-500/40'
                  }`}>
                    <ShieldAlert className="w-6 h-6" />
                  </div>

                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-bold text-neon-cyan">{threat.id}</span>
                      <h3 className="font-mono text-base font-bold text-white">{threat.title}</h3>
                      <span className={`text-[10px] font-mono px-2 py-0.5 rounded font-bold border ${
                        threat.severity === 'CRITICAL' ? 'bg-rose-500/20 text-rose-400 border-rose-500/40' : 'bg-amber-500/20 text-amber-400'
                      }`}>
                        {threat.severity} RISK
                      </span>
                    </div>

                    <p className="text-xs text-slate-300 font-mono mt-1.5 leading-relaxed">{threat.description}</p>
                  </div>
                </div>

                <div className="text-right font-mono text-xs">
                  <span className="text-slate-400">{threat.timestamp}</span>
                  <div className="mt-1 font-bold text-neon-cyan">Risk Score: {threat.riskScore} / 100</div>
                </div>
              </div>

              {/* Threat Context Telemetry */}
              <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs font-mono bg-[#070A12] p-3 rounded-lg border border-slate-800/80">
                <div>
                  <div className="text-[10px] text-slate-500 uppercase">TARGET USER</div>
                  <div className="text-slate-200 font-bold">{threat.userName}</div>
                  <div className="text-[10px] text-slate-400">{threat.userEmail}</div>
                </div>

                <div>
                  <div className="text-[10px] text-slate-500 uppercase">SOURCE IP & DEVICE</div>
                  <div className="text-slate-200 font-bold">{threat.sourceIp}</div>
                  <div className="text-[10px] text-slate-400">{threat.device}</div>
                </div>

                <div>
                  <div className="text-[10px] text-slate-500 uppercase">RECOMMENDED SOC ACTION</div>
                  <div className="text-amber-400 font-bold">{threat.recommendedAction}</div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-4 pt-3 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-3">
                <div className="text-xs font-mono text-slate-400">
                  Incident Status: <strong className="text-slate-200">{threat.status}</strong>
                </div>

                {!isResolved && (
                  <div className="flex items-center gap-2 font-mono text-xs">
                    {threat.sessionId && (
                      <button
                        onClick={() => stepUpAuthSession(threat.sessionId!)}
                        className="px-3 py-1.5 rounded bg-amber-500/10 text-amber-300 hover:bg-amber-500/20 border border-amber-500/30 font-semibold flex items-center gap-1"
                      >
                        <RefreshCw className="w-3.5 h-3.5" />
                        <span>Request Re-Auth</span>
                      </button>
                    )}

                    {threat.sessionId && (
                      <button
                        onClick={() => {
                          revokeSession(threat.sessionId!);
                          resolveThreat(threat.id);
                        }}
                        className="px-3 py-1.5 rounded bg-rose-500/20 text-rose-400 hover:bg-rose-500/30 border border-rose-500/40 font-bold flex items-center gap-1"
                      >
                        <XCircle className="w-3.5 h-3.5" />
                        <span>Terminate Session</span>
                      </button>
                    )}

                    <button
                      onClick={() => resolveThreat(threat.id)}
                      className="px-3 py-1.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-200"
                    >
                      Dismiss Alert
                    </button>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
