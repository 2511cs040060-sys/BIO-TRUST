import React from 'react';
import {
  ShieldAlert,
  Play,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  Zap,
  RotateCcw,
  X,
  Activity,
  ArrowRight,
  Lock,
  Radio
} from 'lucide-react';
import { useSecurity } from '../../context/SecurityContext';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AttackSimulationModal: React.FC<ModalProps> = ({ isOpen, onClose }) => {
  const {
    isSimulationRunning,
    simulationPhase,
    startAttackSimulation,
    stopAttackSimulation,
    simulatorParams,
    calculatedRiskScore,
    calculatedRiskLevel
  } = useSecurity();

  if (!isOpen) return null;

  const phases = [
    {
      phase: 1,
      title: 'Normal User Authenticated',
      desc: 'Legitimate user session active. Multi-modal biometric confidence high (98.7%), risk score low (12). Continuous verification active.',
      confidence: '98.7%',
      risk: '12 / 100',
      status: 'Trusted Session',
      statusColor: 'text-emerald-400 border-emerald-500/30 bg-emerald-500/10'
    },
    {
      phase: 2,
      title: 'Context Anomaly & Device Shift',
      desc: 'Device trust drops, IP reputation degrades, mouse micro-movements deviate from baseline pattern.',
      confidence: '72.0%',
      risk: '48 / 100',
      status: 'Medium Risk Warning',
      statusColor: 'text-amber-400 border-amber-500/30 bg-amber-500/10'
    },
    {
      phase: 3,
      title: 'Behavioral Anomaly & Step-Up Auth',
      desc: 'Biometric confidence plummets to 54.0%. Zero Trust Policy POL-01 triggers automatic Step-Up Authentication challenge.',
      confidence: '54.0%',
      risk: '74 / 100',
      status: 'Step-Up Challenge Issued',
      statusColor: 'text-rose-400 border-rose-500/30 bg-rose-500/10'
    },
    {
      phase: 4,
      title: 'Attack Detected & Session Revoked',
      desc: 'Step-up biometric verification fails. Risk score hits 92 (CRITICAL). Policy POL-05 terminates session immediately and alerts SOC.',
      confidence: '22.0%',
      risk: '92 / 100',
      status: 'Session Terminated & SOC Alerted',
      statusColor: 'text-red-500 border-red-500/50 bg-red-500/20 font-bold animate-pulse'
    }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-cyber-950/80 backdrop-blur-md">
      <div className="w-full max-w-3xl glass-panel border border-neon-cyan/40 shadow-neon-cyan/20 overflow-hidden">
        {/* Modal Header */}
        <div className="p-5 border-b border-slate-800 flex items-center justify-between bg-slate-900/80">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-neon-cyan/10 border border-neon-cyan/30 text-neon-cyan">
              <Zap className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <h2 className="font-mono text-base font-bold text-white tracking-wide">
                ZERO TRUST SECURITY ATTACK SIMULATOR
              </h2>
              <p className="text-xs text-slate-400">
                Interactive real-time demonstration of continuous biometric threat mitigation
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-6 space-y-6">
          {/* Controls Bar */}
          <div className="glass-card p-4 flex flex-wrap items-center justify-between gap-4 bg-[#090D16]/90">
            <div>
              <div className="text-xs font-mono font-semibold text-slate-300">
                SIMULATION STATUS:{' '}
                <span className={isSimulationRunning ? 'text-amber-400 animate-pulse' : 'text-emerald-400'}>
                  {isSimulationRunning ? `EXECUTING PHASE ${simulationPhase} OF 4` : 'IDLE / READY'}
                </span>
              </div>
              <p className="text-[11px] text-slate-500 mt-0.5">
                Watch how BioTrust Cloud automatically mitigates account takeover in real time.
              </p>
            </div>

            <div className="flex items-center gap-3">
              {!isSimulationRunning ? (
                <button
                  onClick={startAttackSimulation}
                  className="flex items-center gap-2 px-5 py-2 rounded-lg bg-gradient-to-r from-neon-cyan to-blue-600 text-slate-950 font-mono font-bold text-xs shadow-neon-cyan/30 hover:scale-105 transition-all"
                >
                  <Play className="w-4 h-4 fill-current" />
                  START SIMULATION RUN
                </button>
              ) : (
                <button
                  onClick={stopAttackSimulation}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-800 text-slate-200 border border-slate-700 hover:bg-slate-700 font-mono text-xs"
                >
                  <RotateCcw className="w-4 h-4 text-amber-400" />
                  RESET SIMULATOR
                </button>
              )}
            </div>
          </div>

          {/* Phase Sequence Timeline */}
          <div className="space-y-3">
            {phases.map((p) => {
              const isActive = simulationPhase === p.phase;
              const isPast = simulationPhase > p.phase;

              return (
                <div
                  key={p.phase}
                  className={`p-4 rounded-xl border transition-all duration-300 ${
                    isActive
                      ? 'bg-slate-900/90 border-neon-cyan/60 shadow-neon-cyan/10 scale-[1.01]'
                      : isPast
                      ? 'bg-slate-900/40 border-slate-800/80 opacity-80'
                      : 'bg-slate-950/40 border-slate-900 opacity-50'
                  }`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-start gap-3">
                      <div className={`w-7 h-7 rounded-full flex items-center justify-center font-mono font-bold text-xs shrink-0 ${
                        isActive
                          ? 'bg-neon-cyan text-slate-950 shadow-neon-cyan/40 shadow-md animate-bounce'
                          : isPast
                          ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                          : 'bg-slate-800 text-slate-500'
                      }`}>
                        {isPast ? <CheckCircle2 className="w-4 h-4" /> : p.phase}
                      </div>

                      <div>
                        <h4 className="font-mono text-xs font-semibold text-slate-200 flex items-center gap-2">
                          {p.title}
                          {isActive && (
                            <span className="flex h-2 w-2 relative">
                              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                              <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
                            </span>
                          )}
                        </h4>
                        <p className="text-[11px] text-slate-400 mt-1 leading-relaxed">{p.desc}</p>
                      </div>
                    </div>

                    <div className="text-right shrink-0">
                      <span className={`inline-block px-2 py-0.5 text-[10px] font-mono rounded border ${p.statusColor}`}>
                        {p.status}
                      </span>
                      <div className="text-[10px] font-mono text-slate-400 mt-1">
                        Biometric Conf: <span className="text-slate-200">{p.confidence}</span>
                      </div>
                      <div className="text-[10px] font-mono text-slate-400">
                        Risk Score: <span className="text-slate-200">{p.risk}</span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Current Live Telemetry Bar */}
          <div className="glass-card p-4 border border-slate-800 bg-[#070A12] grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div>
              <div className="text-[10px] font-mono text-slate-400 uppercase">Identity Confidence</div>
              <div className="font-mono text-lg font-bold text-neon-cyan mt-1">
                {simulatorParams.biometricConfidence.toFixed(1)}%
              </div>
            </div>

            <div>
              <div className="text-[10px] font-mono text-slate-400 uppercase">Device Trust</div>
              <div className="font-mono text-lg font-bold text-blue-400 mt-1">
                {simulatorParams.deviceTrust}%
              </div>
            </div>

            <div>
              <div className="text-[10px] font-mono text-slate-400 uppercase">Calculated Risk</div>
              <div className={`font-mono text-lg font-bold mt-1 ${
                calculatedRiskScore > 70 ? 'text-neon-rose' : calculatedRiskScore > 40 ? 'text-neon-amber' : 'text-emerald-400'
              }`}>
                {calculatedRiskScore} / 100
              </div>
            </div>

            <div>
              <div className="text-[10px] font-mono text-slate-400 uppercase">Policy Evaluation</div>
              <div className="font-mono text-xs font-semibold text-slate-200 mt-2">
                {calculatedRiskScore > 80 ? 'REVOKE & ALERT' : calculatedRiskScore > 60 ? 'STEP_UP_AUTH' : 'PASS'}
              </div>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t border-slate-800 bg-slate-900/60 flex items-center justify-between">
          <div className="text-[11px] text-slate-400 font-mono">
            Zero Trust Engine: <span className="text-neon-cyan">Continuous Biometric API</span>
          </div>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-slate-800 text-slate-200 hover:bg-slate-700 text-xs font-mono"
          >
            Close Window
          </button>
        </div>
      </div>
    </div>
  );
};
