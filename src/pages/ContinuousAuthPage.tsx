import React, { useState } from 'react';
import {
  Activity,
  ShieldCheck,
  AlertTriangle,
  RefreshCw,
  XCircle,
  Clock,
  Radio,
  SlidersHorizontal,
  Search,
  CheckCircle2
} from 'lucide-react';
import { useSecurity } from '../context/SecurityContext';

export const ContinuousAuthPage: React.FC = () => {
  const { sessions, revokeSession, stepUpAuthSession } = useSecurity();
  const [selectedSessionId, setSelectedSessionId] = useState<string>(sessions[0]?.id || 'SES-92831');
  const [filterText, setFilterText] = useState('');

  const selectedSession = sessions.find(s => s.id === selectedSessionId) || sessions[0];

  const filteredSessions = sessions.filter(s =>
    s.userName.toLowerCase().includes(filterText.toLowerCase()) ||
    s.id.toLowerCase().includes(filterText.toLowerCase()) ||
    s.userEmail.toLowerCase().includes(filterText.toLowerCase()) ||
    s.device.toLowerCase().includes(filterText.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-mono text-2xl font-bold text-white tracking-wide flex items-center gap-2">
            <Activity className="w-6 h-6 text-neon-cyan animate-pulse" />
            Continuous Authentication Monitor
          </h1>
          <p className="text-xs text-slate-400 mt-1 font-mono">
            Real-time biometric heartbeat telemetry and session identity evaluation
          </p>
        </div>

        <div className="flex items-center gap-2 font-mono text-xs text-emerald-400 bg-emerald-500/10 px-3 py-1.5 rounded-lg border border-emerald-500/30">
          <Radio className="w-3.5 h-3.5 animate-pulse" />
          <span>LIVE STREAM: {sessions.length} ACTIVE SESSIONS</span>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="glass-card p-3 flex flex-wrap items-center justify-between gap-4 bg-[#090D16]">
        <div className="relative flex-1 min-w-[240px]">
          <Search className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder="Filter sessions by user, ID, device, IP..."
            value={filterText}
            onChange={(e) => setFilterText(e.target.value)}
            className="w-full bg-[#0D1322] border border-slate-800 rounded-lg pl-9 pr-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-neon-cyan font-mono"
          />
        </div>

        <div className="flex items-center gap-3 text-xs font-mono text-slate-400">
          <span>Active Filter: <strong className="text-neon-cyan">All Sessions ({filteredSessions.length})</strong></span>
        </div>
      </div>

      {/* Main Split View: Sessions Grid + Detail Timeline Log */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Active Sessions List */}
        <div className="lg:col-span-2 space-y-4">
          {filteredSessions.map((session) => {
            const isSelected = session.id === selectedSessionId;
            const isRevoked = session.status === 'REVOKED';

            return (
              <div
                key={session.id}
                onClick={() => setSelectedSessionId(session.id)}
                className={`glass-card p-5 cursor-pointer transition-all duration-200 ${
                  isSelected
                    ? 'border-neon-cyan/60 bg-[#0D1527] shadow-neon-cyan/10 scale-[1.01]'
                    : 'hover:border-slate-700 bg-[#0D1322]/80'
                } ${isRevoked ? 'opacity-60 border-rose-500/30' : ''}`}
              >
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-mono text-sm font-bold text-white">{session.userName}</h3>
                      <span className="text-[10px] font-mono text-neon-cyan px-2 py-0.5 bg-neon-cyan/10 rounded border border-neon-cyan/30">
                        {session.id}
                      </span>
                    </div>
                    <p className="text-xs text-slate-400 font-mono mt-0.5">{session.userEmail}</p>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-mono font-bold border ${
                      session.riskLevel === 'CRITICAL'
                        ? 'bg-rose-500/20 text-rose-400 border-rose-500/40'
                        : session.riskLevel === 'HIGH'
                        ? 'bg-amber-500/20 text-amber-400 border-amber-500/40'
                        : 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40'
                    }`}>
                      Risk Score: {session.riskScore} ({session.riskLevel})
                    </span>

                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-mono font-semibold border ${
                      session.status === 'ACTIVE'
                        ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                        : session.status === 'REVOKED'
                        ? 'bg-rose-500/20 text-rose-400 border-rose-500/40'
                        : 'bg-amber-500/10 text-amber-400 border-amber-500/30'
                    }`}>
                      ● {session.status === 'ACTIVE' ? 'Continuously Verified' : session.status}
                    </span>
                  </div>
                </div>

                {/* Session Telemetry Pills */}
                <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-mono bg-[#070A12] p-3 rounded-lg border border-slate-800/80">
                  <div>
                    <div className="text-[10px] text-slate-500 uppercase">Device / Browser</div>
                    <div className="text-slate-200 font-medium truncate mt-0.5">{session.device}</div>
                  </div>

                  <div>
                    <div className="text-[10px] text-slate-500 uppercase">IP & Location</div>
                    <div className="text-slate-200 font-medium truncate mt-0.5">{session.ipAddress}</div>
                  </div>

                  <div>
                    <div className="text-[10px] text-slate-500 uppercase">Identity Confidence</div>
                    <div className="text-neon-cyan font-bold mt-0.5">{session.identityConfidence}%</div>
                  </div>

                  <div>
                    <div className="text-[10px] text-slate-500 uppercase">Last Verification</div>
                    <div className="text-slate-300 mt-0.5 flex items-center gap-1">
                      <Clock className="w-3 h-3 text-slate-400" />
                      <span>{session.lastVerificationSecondsAgo}s ago</span>
                    </div>
                  </div>
                </div>

                {/* Session Action Controls */}
                <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between">
                  <div className="text-[11px] font-mono text-slate-400">
                    Method: <span className="text-slate-200">{session.verificationMethod}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    {!isRevoked && (
                      <>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            stepUpAuthSession(session.id);
                          }}
                          className="px-3 py-1 rounded bg-amber-500/10 text-amber-300 hover:bg-amber-500/20 border border-amber-500/30 text-[11px] font-mono font-semibold transition-colors flex items-center gap-1"
                        >
                          <RefreshCw className="w-3 h-3" />
                          <span>Force Re-Auth</span>
                        </button>

                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            revokeSession(session.id);
                          }}
                          className="px-3 py-1 rounded bg-rose-500/10 text-rose-400 hover:bg-rose-500/20 border border-rose-500/30 text-[11px] font-mono font-semibold transition-colors flex items-center gap-1"
                        >
                          <XCircle className="w-3 h-3" />
                          <span>Terminate</span>
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Selected Session Telemetry & Event Timeline Stream */}
        <div className="space-y-6">
          {/* Biometric Breakdown Panel */}
          <div className="glass-panel p-5 border border-slate-800">
            <h3 className="font-mono text-sm font-bold text-white mb-1 flex items-center justify-between">
              <span>Telemetry: {selectedSession.userName}</span>
              <span className="text-neon-cyan text-xs font-mono">{selectedSession.id}</span>
            </h3>
            <p className="text-[11px] text-slate-400 font-mono mb-4">Multi-Modal Biometric Signals</p>

            <div className="space-y-3 font-mono text-xs">
              <div>
                <div className="flex justify-between text-slate-300 mb-1">
                  <span>3D Face Recognition</span>
                  <span className="text-neon-cyan font-bold">{selectedSession.biometricBreakdown.faceRecognitionConfidence}%</span>
                </div>
                <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                  <div className="bg-neon-cyan h-full" style={{ width: `${selectedSession.biometricBreakdown.faceRecognitionConfidence}%` }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-slate-300 mb-1">
                  <span>Voice Acoustic Print</span>
                  <span className="text-blue-400 font-bold">{selectedSession.biometricBreakdown.voiceRecognitionConfidence}%</span>
                </div>
                <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                  <div className="bg-blue-400 h-full" style={{ width: `${selectedSession.biometricBreakdown.voiceRecognitionConfidence}%` }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-slate-300 mb-1">
                  <span>Behavioral Keystrokes</span>
                  <span className="text-purple-400 font-bold">{selectedSession.biometricBreakdown.behavioralBiometricsConfidence}%</span>
                </div>
                <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                  <div className="bg-purple-400 h-full" style={{ width: `${selectedSession.biometricBreakdown.behavioralBiometricsConfidence}%` }} />
                </div>
              </div>
            </div>
          </div>

          {/* Real-time Verification Stream Log */}
          <div className="glass-panel p-5 border border-slate-800">
            <h3 className="font-mono text-sm font-bold text-white mb-1">Real-Time Event Timeline</h3>
            <p className="text-[11px] text-slate-400 font-mono mb-4">Live continuous authentication log</p>

            <div className="space-y-3 font-mono text-xs relative pl-4 border-l border-slate-800">
              {selectedSession.signalsHistory.map((item, index) => (
                <div key={index} className="relative">
                  <div className={`absolute -left-[21px] top-1 w-2.5 h-2.5 rounded-full ${
                    item.status === 'SUCCESS' ? 'bg-emerald-400 shadow-neon-green' : item.status === 'WARNING' ? 'bg-amber-400' : 'bg-rose-500 shadow-neon-red'
                  }`} />
                  <div className="text-[10px] text-slate-500">{item.timestamp}</div>
                  <div className={`mt-0.5 leading-tight ${
                    item.status === 'SUCCESS' ? 'text-slate-200' : item.status === 'WARNING' ? 'text-amber-300' : 'text-rose-400 font-bold'
                  }`}>
                    {item.signal}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
