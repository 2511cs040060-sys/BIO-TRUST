import React, { useState } from 'react';
import {
  Code2,
  Key,
  Copy,
  Check,
  Zap,
  Globe,
  Plus,
  Trash2,
  Play,
  Terminal
} from 'lucide-react';
import { MOCK_API_KEYS, MOCK_API_ENDPOINTS } from '../data/mockData';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip } from 'recharts';

export const ApiManagementPage: React.FC = () => {
  const [copiedKeyId, setCopiedKeyId] = useState<string | null>(null);
  const [selectedEndpointIndex, setSelectedEndpointIndex] = useState(0);

  const usageData = [
    { hour: '00:00', requests: 120000 },
    { hour: '04:00', requests: 95000 },
    { hour: '08:00', requests: 280000 },
    { hour: '12:00', requests: 410000 },
    { hour: '16:00', requests: 380000 },
    { hour: '20:00', requests: 290000 },
  ];

  const handleCopyKey = (id: string, keyMasked: string) => {
    navigator.clipboard.writeText(keyMasked);
    setCopiedKeyId(id);
    setTimeout(() => setCopiedKeyId(null), 2000);
  };

  const selectedEndpoint = MOCK_API_ENDPOINTS[selectedEndpointIndex];

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="font-mono text-2xl font-bold text-white tracking-wide flex items-center gap-2">
          <Code2 className="w-6 h-6 text-neon-cyan" />
          Authentication REST & WebSocket API Portal
        </h1>
        <p className="text-xs text-slate-400 mt-1 font-mono">
          Developer API endpoints, API key provisioning, rate limits, and latency telemetry
        </p>
      </div>

      {/* Top 4 API Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 font-mono">
        <div className="glass-card p-4 bg-[#090D16]">
          <div className="text-[10px] text-slate-400 uppercase">24H TOTAL API REQUESTS</div>
          <div className="text-2xl font-bold text-white mt-1">2.8M</div>
          <div className="text-[10px] text-emerald-400 mt-1">↑ +18.5% throughput</div>
        </div>

        <div className="glass-card p-4 bg-[#090D16]">
          <div className="text-[10px] text-slate-400 uppercase">AVG API RESPONSE TIME</div>
          <div className="text-2xl font-bold text-neon-cyan mt-1">14 ms</div>
          <div className="text-[10px] text-slate-400 mt-1">Edge latency optimal</div>
        </div>

        <div className="glass-card p-4 bg-[#090D16]">
          <div className="text-[10px] text-slate-400 uppercase">GLOBAL ERROR RATE</div>
          <div className="text-2xl font-bold text-emerald-400 mt-1">0.02%</div>
          <div className="text-[10px] text-slate-400 mt-1">99.98% SLA Uptime</div>
        </div>

        <div className="glass-card p-4 bg-[#090D16]">
          <div className="text-[10px] text-slate-400 uppercase">ACTIVE API KEYS</div>
          <div className="text-2xl font-bold text-blue-400 mt-1">3 Provisioned</div>
          <div className="text-[10px] text-slate-400 mt-1">Rate limit enforcement ok</div>
        </div>
      </div>

      {/* API Key Management Table */}
      <div className="glass-panel p-5 border border-slate-800 space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="font-mono text-sm font-bold text-white flex items-center gap-2">
            <Key className="w-4 h-4 text-neon-cyan" />
            API Key Management
          </h2>

          <button
            onClick={() => alert('New API Key generated: bt_live_' + Math.random().toString(36).substring(2, 10))}
            className="px-3.5 py-1.5 rounded-lg bg-neon-cyan text-slate-950 font-mono font-bold text-xs shadow-neon-cyan/20 hover:scale-105 transition-transform flex items-center gap-1.5"
          >
            <Plus className="w-4 h-4" />
            <span>Generate New API Key</span>
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse font-mono text-xs">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400 text-[10px] uppercase">
                <th className="py-2.5 px-3">Key Identifier</th>
                <th className="py-2.5 px-3">Masked API Key Token</th>
                <th className="py-2.5 px-3">Environment</th>
                <th className="py-2.5 px-3">Rate Limit</th>
                <th className="py-2.5 px-3">Last Used</th>
                <th className="py-2.5 px-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {MOCK_API_KEYS.map((k) => (
                <tr key={k.id} className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-3 font-bold text-white">{k.name}</td>
                  <td className="py-3 px-3 text-neon-cyan font-mono">{k.keyMasked}</td>
                  <td className="py-3 px-3">
                    <span className="px-2 py-0.5 rounded text-[10px] bg-blue-500/10 text-blue-400 border border-blue-500/30">
                      {k.environment}
                    </span>
                  </td>
                  <td className="py-3 px-3 text-slate-300">{k.rateLimit}</td>
                  <td className="py-3 px-3 text-slate-400">{k.lastUsed}</td>
                  <td className="py-3 px-3 text-right">
                    <button
                      onClick={() => handleCopyKey(k.id, k.keyMasked)}
                      className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 text-[11px] inline-flex items-center gap-1"
                    >
                      {copiedKeyId === k.id ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copiedKeyId === k.id ? 'Copied' : 'Copy Key'}</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Endpoints & Interactive JSON Viewer */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Endpoint Selector List */}
        <div className="glass-panel p-4 border border-slate-800 space-y-2">
          <h3 className="font-mono text-xs font-bold text-slate-400 uppercase mb-3">CORE REST API ENDPOINTS</h3>
          {MOCK_API_ENDPOINTS.map((ep, idx) => {
            const isSelected = selectedEndpointIndex === idx;
            return (
              <div
                key={ep.path}
                onClick={() => setSelectedEndpointIndex(idx)}
                className={`p-3 rounded-lg border font-mono text-xs cursor-pointer transition-all ${
                  isSelected
                    ? 'bg-[#0D1527] border-neon-cyan text-white shadow-neon-cyan/10'
                    : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:text-slate-200'
                }`}
              >
                <div className="flex items-center gap-2">
                  <span className={`px-1.5 py-0.5 text-[9px] font-bold rounded ${
                    ep.method === 'POST' ? 'bg-blue-500/20 text-blue-400' : 'bg-emerald-500/20 text-emerald-400'
                  }`}>
                    {ep.method}
                  </span>
                  <span className="font-semibold text-slate-200 truncate">{ep.path}</span>
                </div>
                <p className="text-[10px] text-slate-500 mt-1.5 line-clamp-1">{ep.description}</p>
              </div>
            );
          })}
        </div>

        {/* JSON Response & Request Viewer */}
        <div className="lg:col-span-2 glass-panel p-6 border border-slate-800 bg-[#070A12] space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="font-mono text-sm font-bold text-white flex items-center gap-2">
              <span className="px-2 py-0.5 rounded bg-blue-500/20 text-blue-400 text-xs font-bold">
                {selectedEndpoint.method}
              </span>
              <span>{selectedEndpoint.path}</span>
            </div>
            <span className="text-xs font-mono text-slate-400">Rate Limit: {selectedEndpoint.rateLimit}</span>
          </div>

          <p className="text-xs text-slate-400 font-mono">{selectedEndpoint.description}</p>

          {selectedEndpoint.requestBody && (
            <div className="space-y-1 font-mono text-xs">
              <div className="text-[10px] text-slate-500 uppercase">SAMPLE REQUEST BODY:</div>
              <pre className="p-4 rounded-lg bg-[#0A0E1A] border border-slate-800 text-cyan-300 overflow-x-auto leading-relaxed">
                {selectedEndpoint.requestBody}
              </pre>
            </div>
          )}

          <div className="space-y-1 font-mono text-xs">
            <div className="text-[10px] text-slate-500 uppercase">SAMPLE JSON RESPONSE PAYLOAD:</div>
            <pre className="p-4 rounded-lg bg-[#0A0E1A] border border-slate-800 text-emerald-400 overflow-x-auto leading-relaxed">
              {selectedEndpoint.responseBody}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
};
