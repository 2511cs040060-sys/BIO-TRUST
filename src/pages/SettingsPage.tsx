import React, { useState } from 'react';
import { Settings, Sliders, Bell, Shield, Database, Save, Check } from 'lucide-react';

export const SettingsPage: React.FC = () => {
  const [saved, setSaved] = useState(false);
  const [splunkWebhook, setSplunkWebhook] = useState('https://splunk.corp.internal/hec/v1/biotrust');
  const [datadogApiKey, setDatadogApiKey] = useState('dd_api_key_••••••••••••');
  const [autoKillThreshold, setAutoKillThreshold] = useState(85);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-mono text-2xl font-bold text-white tracking-wide flex items-center gap-2">
            <Settings className="w-6 h-6 text-neon-cyan" />
            Platform & SOC Engine Preferences
          </h1>
          <p className="text-xs text-slate-400 mt-1 font-mono">
            Integrations, SIEM webhooks, automated threat thresholds, and alerting sensitivity
          </p>
        </div>

        <button
          onClick={handleSave}
          className="px-4 py-2 rounded-lg bg-gradient-to-r from-neon-cyan to-blue-600 text-slate-950 font-mono font-bold text-xs shadow-neon-cyan/20 hover:scale-105 transition-transform flex items-center gap-2"
        >
          {saved ? <Check className="w-4 h-4 text-slate-950" /> : <Save className="w-4 h-4" />}
          <span>{saved ? 'SETTINGS SAVED' : 'SAVE CHANGES'}</span>
        </button>
      </div>

      {/* Settings Sections */}
      <div className="space-y-6 font-mono text-xs">
        {/* Section 1: SIEM & Webhooks */}
        <div className="glass-panel p-6 border border-slate-800 space-y-4">
          <h2 className="text-sm font-bold text-white flex items-center gap-2">
            <Database className="w-4 h-4 text-neon-cyan" />
            SIEM & Security Telemetry Integrations
          </h2>

          <div className="space-y-4">
            <div>
              <label className="block text-slate-400 mb-1">Splunk HEC Webhook URL</label>
              <input
                type="text"
                value={splunkWebhook}
                onChange={(e) => setSplunkWebhook(e.target.value)}
                className="w-full bg-[#070A12] border border-slate-800 rounded-lg p-2.5 text-white font-mono focus:border-neon-cyan focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-slate-400 mb-1">Datadog Log API Key</label>
              <input
                type="password"
                value={datadogApiKey}
                onChange={(e) => setDatadogApiKey(e.target.value)}
                className="w-full bg-[#070A12] border border-slate-800 rounded-lg p-2.5 text-white font-mono focus:border-neon-cyan focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* Section 2: Automated Threat Thresholds */}
        <div className="glass-panel p-6 border border-slate-800 space-y-4">
          <h2 className="text-sm font-bold text-white flex items-center gap-2">
            <Sliders className="w-4 h-4 text-rose-400" />
            Automated Session Kill Risk Threshold
          </h2>

          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-slate-300">Auto Session Revoke Risk Threshold</span>
              <span className="text-rose-400 font-bold">{autoKillThreshold} / 100</span>
            </div>
            <input
              type="range"
              min="70"
              max="95"
              value={autoKillThreshold}
              onChange={(e) => setAutoKillThreshold(parseInt(e.target.value))}
              className="w-full accent-rose-400 bg-slate-800 rounded h-2"
            />
            <p className="text-[11px] text-slate-500">
              Sessions exceeding risk score of {autoKillThreshold} will be terminated automatically by the policy engine.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
