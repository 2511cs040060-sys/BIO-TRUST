import React from 'react';
import {
  Gauge,
  Sliders,
  AlertTriangle,
  CheckCircle2,
  ShieldAlert,
  HelpCircle,
  Activity,
  RotateCcw
} from 'lucide-react';
import { useSecurity } from '../context/SecurityContext';
import { ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Tooltip } from 'recharts';

export const RiskEnginePage: React.FC = () => {
  const {
    simulatorParams,
    updateSimulatorParams,
    calculatedRiskScore,
    calculatedRiskLevel
  } = useSecurity();

  const radarData = [
    { factor: 'Identity', score: simulatorParams.biometricConfidence },
    { factor: 'Device', score: simulatorParams.deviceTrust },
    { factor: 'Network', score: 100 - simulatorParams.ipReputationRisk },
    { factor: 'Behavior', score: 100 - simulatorParams.behavioralAnomaly },
    { factor: 'Location', score: 100 - simulatorParams.locationAnomaly },
    { factor: 'Session', score: 95 },
  ];

  const resetSliders = () => {
    updateSimulatorParams({
      biometricConfidence: 98.7,
      deviceTrust: 96,
      ipReputationRisk: 10,
      behavioralAnomaly: 12,
      locationAnomaly: 5,
    });
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-mono text-2xl font-bold text-white tracking-wide flex items-center gap-2">
            <Gauge className="w-6 h-6 text-neon-cyan" />
            Continuous Risk Assessment & Simulator
          </h1>
          <p className="text-xs text-slate-400 mt-1 font-mono">
            Dynamic risk engine calculating continuous Zero Trust security scores
          </p>
        </div>

        <button
          onClick={resetSliders}
          className="px-3.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-mono border border-slate-700 transition-colors flex items-center gap-1.5"
        >
          <RotateCcw className="w-3.5 h-3.5 text-amber-400" />
          <span>Reset Defaults</span>
        </button>
      </div>

      {/* Primary Score & Radar Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Risk Gauge Header Card */}
        <div className="glass-panel p-6 border border-slate-800 flex flex-col justify-between space-y-6 bg-[#090D16]">
          <div>
            <span className="text-[10px] font-mono uppercase text-slate-400">CALCULATED CONTINUOUS RISK</span>
            <div className="flex items-baseline gap-3 mt-2">
              <span className={`font-mono text-5xl font-extrabold ${
                calculatedRiskScore > 80
                  ? 'text-rose-500 animate-pulse'
                  : calculatedRiskScore > 60
                  ? 'text-amber-500'
                  : calculatedRiskScore > 30
                  ? 'text-amber-400'
                  : 'text-emerald-400'
              }`}>
                {calculatedRiskScore}
              </span>
              <span className="font-mono text-slate-500 text-lg">/ 100</span>
            </div>

            <div className="mt-3">
              <span className={`inline-block px-3 py-1 rounded-full text-xs font-mono font-bold border ${
                calculatedRiskLevel === 'CRITICAL'
                  ? 'bg-rose-500/20 text-rose-400 border-rose-500/40'
                  : calculatedRiskLevel === 'HIGH'
                  ? 'bg-amber-500/20 text-amber-400 border-amber-500/40'
                  : calculatedRiskLevel === 'MEDIUM'
                  ? 'bg-amber-500/10 text-amber-300 border-amber-500/30'
                  : 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40'
              }`}>
                ● {calculatedRiskLevel} RISK STATUS
              </span>
            </div>
          </div>

          {/* Action Policy Mapping */}
          <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 space-y-2 text-xs font-mono">
            <div className="text-[10px] text-slate-400 uppercase">SYSTEM ACTION DECISION:</div>
            <div className="font-bold text-slate-200">
              {calculatedRiskScore > 85 ? (
                <span className="text-rose-400 flex items-center gap-1.5">
                  <ShieldAlert className="w-4 h-4" /> Terminate Session & Alert SOC immediately
                </span>
              ) : calculatedRiskScore > 60 ? (
                <span className="text-amber-400 flex items-center gap-1.5">
                  <AlertTriangle className="w-4 h-4" /> Force Step-Up Biometric Re-auth
                </span>
              ) : calculatedRiskScore > 30 ? (
                <span className="text-amber-300 flex items-center gap-1.5">
                  <AlertTriangle className="w-4 h-4" /> Request Soft Biometric Check
                </span>
              ) : (
                <span className="text-emerald-400 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4" /> Allow Session (Continuous Monitoring)
                </span>
              )}
            </div>
          </div>

          <div className="text-[11px] text-slate-500 font-mono leading-relaxed">
            Normalized Formula: <br />
            <code className="text-neon-cyan">
              Risk = (100-Bio)*0.35 + (100-Dev)*0.20 + Net*0.15 + Beh*0.20 + Loc*0.10
            </code>
          </div>
        </div>

        {/* Radar Chart Component */}
        <div className="lg:col-span-2 glass-panel p-6 border border-slate-800">
          <h3 className="font-mono text-sm font-bold text-white mb-1">Risk Dimension Topology Radar</h3>
          <p className="text-[11px] text-slate-400 font-mono mb-4">Multi-vector confidence vs anomaly mapping</p>

          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData}>
                <PolarGrid stroke="#334155" />
                <PolarAngleAxis dataKey="factor" stroke="#94A3B8" fontSize={11} fontFamily="monospace" />
                <PolarRadiusAxis angle={30} domain={[0, 100]} stroke="#475569" fontSize={10} />
                <Radar name="Trust Score" dataKey="score" stroke="#00F0FF" fill="#00F0FF" fillOpacity={0.3} />
                <Tooltip contentStyle={{ backgroundColor: '#0D1322', borderColor: '#1E293B', borderRadius: '8px', fontSize: '12px' }} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Interactive Risk Simulator Sliders */}
      <div className="glass-panel p-6 border border-slate-800 space-y-6">
        <div>
          <h2 className="font-mono text-base font-bold text-white flex items-center gap-2">
            <Sliders className="w-5 h-5 text-neon-cyan" />
            Interactive Risk Simulator Controls
          </h2>
          <p className="text-xs text-slate-400 font-mono mt-1">
            Adjust the telemetry sliders below to simulate changing conditions and evaluate risk recalculation.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 font-mono text-xs">
          {/* Biometric Confidence Slider */}
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-slate-300">Biometric Confidence Score (Weight 35%)</span>
              <span className="text-neon-cyan font-bold">{simulatorParams.biometricConfidence}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={simulatorParams.biometricConfidence}
              onChange={(e) => updateSimulatorParams({ biometricConfidence: parseFloat(e.target.value) })}
              className="w-full accent-neon-cyan bg-slate-800 rounded h-2"
            />
          </div>

          {/* Device Trust Slider */}
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-slate-300">Device Trust Score (Weight 20%)</span>
              <span className="text-blue-400 font-bold">{simulatorParams.deviceTrust}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={simulatorParams.deviceTrust}
              onChange={(e) => updateSimulatorParams({ deviceTrust: parseFloat(e.target.value) })}
              className="w-full accent-blue-400 bg-slate-800 rounded h-2"
            />
          </div>

          {/* IP Reputation Risk Slider */}
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-slate-300">IP / Network Reputation Risk (Weight 15%)</span>
              <span className="text-amber-400 font-bold">{simulatorParams.ipReputationRisk}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={simulatorParams.ipReputationRisk}
              onChange={(e) => updateSimulatorParams({ ipReputationRisk: parseFloat(e.target.value) })}
              className="w-full accent-amber-400 bg-slate-800 rounded h-2"
            />
          </div>

          {/* Behavioral Anomaly Slider */}
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-slate-300">Behavioral Pattern Anomaly (Weight 20%)</span>
              <span className="text-purple-400 font-bold">{simulatorParams.behavioralAnomaly}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={simulatorParams.behavioralAnomaly}
              onChange={(e) => updateSimulatorParams({ behavioralAnomaly: parseFloat(e.target.value) })}
              className="w-full accent-purple-400 bg-slate-800 rounded h-2"
            />
          </div>

          {/* Location Anomaly Slider */}
          <div className="space-y-2 md:col-span-2">
            <div className="flex justify-between">
              <span className="text-slate-300">Location / Impossible Travel Anomaly (Weight 10%)</span>
              <span className="text-rose-400 font-bold">{simulatorParams.locationAnomaly}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={simulatorParams.locationAnomaly}
              onChange={(e) => updateSimulatorParams({ locationAnomaly: parseFloat(e.target.value) })}
              className="w-full accent-rose-400 bg-slate-800 rounded h-2"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
