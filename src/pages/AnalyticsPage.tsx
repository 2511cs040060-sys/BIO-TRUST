import React, { useState } from 'react';
import { BarChart3, TrendingUp, Calendar, Zap, Activity } from 'lucide-react';
import { ANALYTICS_SERIES } from '../data/mockData';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid
} from 'recharts';

export const AnalyticsPage: React.FC = () => {
  const [timeframe, setTimeframe] = useState<'24h' | '7d' | '30d'>('7d');
  const data = ANALYTICS_SERIES[timeframe];

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-mono text-2xl font-bold text-white tracking-wide flex items-center gap-2">
            <BarChart3 className="w-6 h-6 text-neon-cyan" />
            Security Analytics & Telemetry Metrics
          </h1>
          <p className="text-xs text-slate-400 mt-1 font-mono">
            Historical trends across identity confidence, threat volume, and API requests
          </p>
        </div>

        {/* Timeframe Filter Buttons */}
        <div className="flex items-center gap-1.5 glass-card p-1 bg-[#090D16] border border-slate-800 font-mono text-xs">
          <button
            onClick={() => setTimeframe('24h')}
            className={`px-3 py-1.5 rounded-lg transition-colors ${
              timeframe === '24h' ? 'bg-neon-cyan text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
            }`}
          >
            24 Hours
          </button>
          <button
            onClick={() => setTimeframe('7d')}
            className={`px-3 py-1.5 rounded-lg transition-colors ${
              timeframe === '7d' ? 'bg-neon-cyan text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
            }`}
          >
            7 Days
          </button>
          <button
            onClick={() => setTimeframe('30d')}
            className={`px-3 py-1.5 rounded-lg transition-colors ${
              timeframe === '30d' ? 'bg-neon-cyan text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
            }`}
          >
            30 Days
          </button>
        </div>
      </div>

      {/* Grid of 4 Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Chart 1: API Request Volume */}
        <div className="glass-panel p-5 border border-slate-800">
          <h3 className="font-mono text-sm font-bold text-white mb-1">API Request Volume Throughput</h3>
          <p className="text-[11px] text-slate-400 font-mono mb-4">Total REST & WebSocket authentication requests</p>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1E293B" />
                <XAxis dataKey="time" stroke="#475569" fontSize={11} fontFamily="monospace" />
                <YAxis stroke="#475569" fontSize={11} fontFamily="monospace" />
                <Tooltip contentStyle={{ backgroundColor: '#0D1322', borderColor: '#1E293B', borderRadius: '8px', fontSize: '12px' }} />
                <Bar dataKey="requests" fill="#00F0FF" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Chart 2: Average Biometric Confidence */}
        <div className="glass-panel p-5 border border-slate-800">
          <h3 className="font-mono text-sm font-bold text-white mb-1">Average Biometric Identity Confidence</h3>
          <p className="text-[11px] text-slate-400 font-mono mb-4">Mean multi-modal confidence percentage</p>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1E293B" />
                <XAxis dataKey="time" stroke="#475569" fontSize={11} fontFamily="monospace" />
                <YAxis domain={[90, 100]} stroke="#475569" fontSize={11} fontFamily="monospace" />
                <Tooltip contentStyle={{ backgroundColor: '#0D1322', borderColor: '#1E293B', borderRadius: '8px', fontSize: '12px' }} />
                <Line type="monotone" dataKey="confidence" stroke="#10B981" strokeWidth={3} dot={{ fill: '#10B981' }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Chart 3: Zero Trust Risk Score Trend */}
        <div className="glass-panel p-5 border border-slate-800">
          <h3 className="font-mono text-sm font-bold text-white mb-1">Mean Zero Trust Risk Score</h3>
          <p className="text-[11px] text-slate-400 font-mono mb-4">Lower score indicates higher security trust</p>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1E293B" />
                <XAxis dataKey="time" stroke="#475569" fontSize={11} fontFamily="monospace" />
                <YAxis domain={[0, 50]} stroke="#475569" fontSize={11} fontFamily="monospace" />
                <Tooltip contentStyle={{ backgroundColor: '#0D1322', borderColor: '#1E293B', borderRadius: '8px', fontSize: '12px' }} />
                <Area type="monotone" dataKey="riskAvg" stroke="#F59E0B" fill="#F59E0B" fillOpacity={0.2} strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Chart 4: Detected Threat Incidents */}
        <div className="glass-panel p-5 border border-slate-800">
          <h3 className="font-mono text-sm font-bold text-white mb-1">SOC Threat Alert Incidents</h3>
          <p className="text-[11px] text-slate-400 font-mono mb-4">Total anomaly & attack triggers</p>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1E293B" />
                <XAxis dataKey="time" stroke="#475569" fontSize={11} fontFamily="monospace" />
                <YAxis stroke="#475569" fontSize={11} fontFamily="monospace" />
                <Tooltip contentStyle={{ backgroundColor: '#0D1322', borderColor: '#1E293B', borderRadius: '8px', fontSize: '12px' }} />
                <Bar dataKey="threats" fill="#EF4444" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};
