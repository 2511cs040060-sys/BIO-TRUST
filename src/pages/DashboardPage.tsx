import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  Users,
  CheckCircle2,
  AlertTriangle,
  ShieldX,
  Gauge,
  Code2,
  Smartphone,
  Activity,
  ArrowUpRight,
  TrendingUp,
  Radio,
  Play
} from 'lucide-react';
import { StatCard } from '../components/ui/StatCard';
import { useSecurity } from '../context/SecurityContext';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, PieChart, Pie, Cell } from 'recharts';

interface DashboardPageProps {
  openSimulationModal: () => void;
}

export const DashboardPage: React.FC<DashboardPageProps> = ({ openSimulationModal }) => {
  const {
    sessions,
    threats,
    avgConfidence,
    activeUsersCount,
    verifiedSessionsCount,
    suspiciousSessionsCount,
    blockedSessionsCount,
    totalApiRequests,
    threatsDetectedCount,
    devicesMonitoredCount,
  } = useSecurity();

  // Chart telemetry data
  const authTrendData = [
    { time: '00:00', verified: 940, suspicious: 12 },
    { time: '04:00', verified: 890, suspicious: 8 },
    { time: '08:00', verified: 1120, suspicious: 15 },
    { time: '12:00', verified: 1284, suspicious: 23 },
    { time: '16:00', verified: 1210, suspicious: 18 },
    { time: '20:00', verified: 1167, suspicious: 23 },
  ];

  const riskDistributionData = [
    { name: 'Low Risk (<30)', value: 1167, color: '#10B981' },
    { name: 'Medium Risk (30-60)', value: 23, color: '#F59E0B' },
    { name: 'High Risk (60-80)', value: 14, color: '#F97316' },
    { name: 'Critical (>80)', value: 9, color: '#EF4444' },
  ];

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-mono text-2xl font-bold text-white tracking-wide">
            Zero Trust Security Overview
          </h1>
          <p className="text-xs text-slate-400 mt-1 font-mono">
            Continuous Biometric Identity Verification & Real-time Telemetry
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={openSimulationModal}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-neon-cyan to-blue-600 text-slate-950 font-mono font-bold text-xs shadow-neon-cyan/20 hover:scale-105 transition-transform"
          >
            <Play className="w-3.5 h-3.5 fill-current" />
            <span>RUN ATTACK SIMULATION</span>
          </button>
        </div>
      </div>

      {/* 8 Main Stat Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Active Users"
          value="1,284"
          change="+8.4%"
          subtext="Enrolled profiles"
          icon={Users}
          iconColor="cyan"
        />
        <StatCard
          title="Verified Sessions"
          value="1,167"
          change="+12.1%"
          subtext="Continuous active auth"
          icon={CheckCircle2}
          iconColor="green"
        />
        <StatCard
          title="Suspicious Sessions"
          value="23"
          change="+3"
          isPositive={false}
          subtext="Step-Up required"
          icon={AlertTriangle}
          iconColor="amber"
        />
        <StatCard
          title="Blocked Sessions"
          value="94"
          change="-5.2%"
          isPositive={true}
          subtext="Quarantined / Revoked"
          icon={ShieldX}
          iconColor="rose"
        />
        <StatCard
          title="Auth Confidence"
          value={`${avgConfidence}%`}
          change="+0.4%"
          subtext="Weighted average"
          icon={Gauge}
          iconColor="green"
        />
        <StatCard
          title="API Requests"
          value="2.8M"
          change="+18.5%"
          subtext="Last 24 hours"
          icon={Code2}
          iconColor="blue"
        />
        <StatCard
          title="Threats Detected"
          value="37"
          change="-12%"
          subtext="SOC active alerts"
          icon={AlertTriangle}
          iconColor="rose"
        />
        <StatCard
          title="Devices Monitored"
          value="1,542"
          change="+42 new"
          subtext="Hardware fingerprinted"
          icon={Smartphone}
          iconColor="purple"
        />
      </div>

      {/* Visual Analytics Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Real-time Auth Trend Chart */}
        <div className="lg:col-span-2 glass-panel p-5 border border-slate-800">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="font-mono text-sm font-bold text-white flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-neon-cyan" />
                Continuous Authentication Stream (24h)
              </h2>
              <p className="text-[11px] text-slate-400 font-mono">Verified vs Suspicious active sessions</p>
            </div>
            <span className="text-[10px] font-mono text-neon-cyan bg-neon-cyan/10 px-2 py-0.5 rounded border border-neon-cyan/30 flex items-center gap-1">
              <Radio className="w-2.5 h-2.5 animate-pulse" /> LIVE STREAM
            </span>
          </div>

          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={authTrendData}>
                <defs>
                  <linearGradient id="verifiedGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#00F0FF" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#00F0FF" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="suspiciousGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#F59E0B" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#F59E0B" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="time" stroke="#475569" fontSize={11} fontFamily="monospace" />
                <YAxis stroke="#475569" fontSize={11} fontFamily="monospace" />
                <Tooltip
                  contentStyle={{ backgroundColor: '#0D1322', borderColor: '#1E293B', borderRadius: '8px', fontSize: '12px' }}
                />
                <Area type="monotone" dataKey="verified" stroke="#00F0FF" fillOpacity={1} fill="url(#verifiedGradient)" strokeWidth={2} />
                <Area type="monotone" dataKey="suspicious" stroke="#F59E0B" fillOpacity={1} fill="url(#suspiciousGradient)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Risk Score Distribution Pie */}
        <div className="glass-panel p-5 border border-slate-800">
          <div className="mb-4">
            <h2 className="font-mono text-sm font-bold text-white flex items-center gap-2">
              <Gauge className="w-4 h-4 text-emerald-400" />
              Active Risk Distribution
            </h2>
            <p className="text-[11px] text-slate-400 font-mono">Sessions by Zero Trust risk tier</p>
          </div>

          <div className="h-48 relative">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={riskDistributionData}
                  cx="50%"
                  cy="50%"
                  innerRadius={55}
                  outerRadius={75}
                  paddingAngle={4}
                  dataKey="value"
                >
                  {riskDistributionData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{ backgroundColor: '#0D1322', borderColor: '#1E293B', borderRadius: '8px', fontSize: '12px' }}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <span className="font-mono text-xl font-bold text-white">1,213</span>
              <span className="text-[10px] font-mono text-slate-400">Total Active</span>
            </div>
          </div>

          <div className="mt-2 space-y-1.5 text-xs font-mono">
            {riskDistributionData.map((item) => (
              <div key={item.name} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                  <span className="text-slate-300 text-[11px]">{item.name}</span>
                </div>
                <span className="font-bold text-slate-200">{item.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Active Continuous Sessions Ticker Table */}
      <div className="glass-panel p-5 border border-slate-800">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="font-mono text-sm font-bold text-white flex items-center gap-2">
              <Activity className="w-4 h-4 text-neon-cyan animate-pulse" />
              Live Continuous Verification Feed
            </h2>
            <p className="text-[11px] text-slate-400 font-mono">Real-time biometric heartbeat telemetry</p>
          </div>
          <NavLink
            to="/app/continuous-auth"
            className="text-xs font-mono text-neon-cyan hover:underline flex items-center gap-1"
          >
            <span>View All Sessions</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </NavLink>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse font-mono text-xs">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400 text-[10px] uppercase">
                <th className="py-2.5 px-3">User</th>
                <th className="py-2.5 px-3">Session ID</th>
                <th className="py-2.5 px-3">Device / OS</th>
                <th className="py-2.5 px-3">Identity Confidence</th>
                <th className="py-2.5 px-3">Risk Score</th>
                <th className="py-2.5 px-3">Status</th>
                <th className="py-2.5 px-3">Last Verified</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {sessions.slice(0, 4).map((s) => (
                <tr key={s.id} className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-3">
                    <div className="font-semibold text-slate-200">{s.userName}</div>
                    <div className="text-[10px] text-slate-500">{s.userEmail}</div>
                  </td>
                  <td className="py-3 px-3 text-neon-cyan font-bold">{s.id}</td>
                  <td className="py-3 px-3 text-slate-300">{s.device}</td>
                  <td className="py-3 px-3">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-emerald-400">{s.identityConfidence}%</span>
                      <div className="w-16 h-1.5 bg-slate-800 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-neon-cyan"
                          style={{ width: `${s.identityConfidence}%` }}
                        />
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-3">
                    <span className={`px-2 py-0.5 rounded font-bold text-[10px] ${
                      s.riskScore > 70 ? 'bg-rose-500/20 text-rose-400' : s.riskScore > 30 ? 'bg-amber-500/20 text-amber-400' : 'bg-emerald-500/20 text-emerald-400'
                    }`}>
                      {s.riskScore} ({s.riskLevel})
                    </span>
                  </td>
                  <td className="py-3 px-3">
                    <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[10px] font-semibold ${
                      s.status === 'ACTIVE' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30' : 'bg-amber-500/10 text-amber-400 border border-amber-500/30'
                    }`}>
                      ● {s.status === 'ACTIVE' ? 'Continuously Verified' : s.status}
                    </span>
                  </td>
                  <td className="py-3 px-3 text-slate-400">{s.lastVerificationSecondsAgo}s ago</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
