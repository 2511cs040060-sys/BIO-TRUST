import React from 'react';
import {
  Smartphone,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  ShieldAlert,
  HardDrive,
  Globe,
  Lock
} from 'lucide-react';
import { useSecurity } from '../context/SecurityContext';

export const DevicesPage: React.FC = () => {
  const { devices, trustDevice, quarantineDevice } = useSecurity();

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="font-mono text-2xl font-bold text-white tracking-wide flex items-center gap-2">
          <Smartphone className="w-6 h-6 text-neon-cyan" />
          Device Trust Management
        </h1>
        <p className="text-xs text-slate-400 mt-1 font-mono">
          Hardware fingerprinting, TPM attestation tokens, and device trust scores
        </p>
      </div>

      {/* Device Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {devices.map((device) => {
          const isTrusted = device.status === 'TRUSTED';
          const isQuarantined = device.status === 'QUARANTINED';

          return (
            <div
              key={device.id}
              className={`glass-card p-5 border transition-all duration-200 ${
                isTrusted
                  ? 'border-slate-800 bg-[#0D1322]/80'
                  : isQuarantined
                  ? 'border-rose-500/40 bg-rose-950/20'
                  : 'border-amber-500/40 bg-amber-950/20'
              }`}
            >
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold text-neon-cyan">{device.id}</span>
                    <h3 className="font-mono text-sm font-bold text-white">{device.name}</h3>
                  </div>
                  <p className="text-xs text-slate-400 font-mono mt-0.5">Owner: {device.userName}</p>
                </div>

                <span className={`px-2.5 py-1 rounded-full text-[10px] font-mono font-bold border ${
                  device.trustScore >= 80
                    ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30'
                    : 'bg-rose-500/20 text-rose-400 border-rose-500/30'
                }`}>
                  Trust: {device.trustScore}% ({device.status})
                </span>
              </div>

              {/* Hardware Telemetry Details */}
              <div className="mt-4 grid grid-cols-2 gap-3 text-xs font-mono bg-[#070A12] p-3 rounded-lg border border-slate-800/80">
                <div>
                  <div className="text-[10px] text-slate-500 uppercase">OS / BROWSER</div>
                  <div className="text-slate-200 font-semibold truncate mt-0.5">{device.os}</div>
                  <div className="text-slate-400 text-[10px] truncate">{device.browser}</div>
                </div>

                <div>
                  <div className="text-[10px] text-slate-500 uppercase">IP & GEOLOCATION</div>
                  <div className="text-slate-200 font-semibold truncate mt-0.5">{device.ipAddress}</div>
                  <div className="text-slate-400 text-[10px] truncate">{device.location}</div>
                </div>
              </div>

              {/* Hardware Attestation Flags */}
              <div className="mt-3 flex items-center justify-between text-[11px] font-mono text-slate-400">
                <div className="flex items-center gap-3">
                  <span className={device.isFingerprinted ? 'text-emerald-400' : 'text-slate-500'}>
                    ✓ Hardware Fingerprinted
                  </span>
                  <span className={device.hardwareSecurityKey ? 'text-neon-cyan' : 'text-slate-500'}>
                    ✓ TPM / WebAuthn Key
                  </span>
                </div>
                <span>Last seen: {device.lastSeen}</span>
              </div>

              {/* Action Buttons */}
              <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-end gap-2">
                {!isTrusted && (
                  <button
                    onClick={() => trustDevice(device.id)}
                    className="px-3 py-1 rounded bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20 border border-emerald-500/30 text-xs font-mono font-semibold"
                  >
                    Trust Device
                  </button>
                )}

                {!isQuarantined && (
                  <button
                    onClick={() => quarantineDevice(device.id)}
                    className="px-3 py-1 rounded bg-rose-500/10 text-rose-400 hover:bg-rose-500/20 border border-rose-500/30 text-xs font-mono font-semibold"
                  >
                    Quarantine Device
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
