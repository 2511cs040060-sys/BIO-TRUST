import React, { useState } from 'react';
import {
  FileText,
  Download,
  Search,
  Filter,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  RotateCcw
} from 'lucide-react';
import { useSecurity } from '../context/SecurityContext';
import { exportAuditLogsToCSV } from '../utils/csvExporter';

export const AuditLogsPage: React.FC = () => {
  const { auditLogs } = useSecurity();
  const [searchQuery, setSearchQuery] = useState('');
  const [eventFilter, setEventFilter] = useState<string>('ALL');

  const filteredLogs = auditLogs.filter(log => {
    const matchesSearch =
      log.user.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.ipAddress.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.device.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.actionTaken.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesEvent = eventFilter === 'ALL' || log.event === eventFilter;

    return matchesSearch && matchesEvent;
  });

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-mono text-2xl font-bold text-white tracking-wide flex items-center gap-2">
            <FileText className="w-6 h-6 text-neon-cyan" />
            Enterprise Security Audit Logs
          </h1>
          <p className="text-xs text-slate-400 mt-1 font-mono">
            Immutable SOC telemetry log trail, compliance tracking, and CSV export
          </p>
        </div>

        <button
          onClick={() => exportAuditLogsToCSV(filteredLogs)}
          className="px-4 py-2 rounded-lg bg-gradient-to-r from-neon-cyan to-blue-600 text-slate-950 font-mono font-bold text-xs shadow-neon-cyan/20 hover:scale-105 transition-transform flex items-center gap-2"
        >
          <Download className="w-4 h-4" />
          <span>EXPORT CSV AUDIT REPORT</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="glass-card p-3 flex flex-wrap items-center justify-between gap-4 bg-[#090D16]">
        <div className="relative flex-1 min-w-[240px]">
          <Search className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder="Search logs by user email, IP address, device, action..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#0D1322] border border-slate-800 rounded-lg pl-9 pr-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-neon-cyan font-mono"
          />
        </div>

        <div className="flex items-center gap-3 font-mono text-xs text-slate-400">
          <Filter className="w-4 h-4 text-neon-cyan" />
          <select
            value={eventFilter}
            onChange={(e) => setEventFilter(e.target.value)}
            className="bg-[#0D1322] border border-slate-800 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none focus:border-neon-cyan"
          >
            <option value="ALL">All Event Types</option>
            <option value="LOGIN_SUCCESS">LOGIN_SUCCESS</option>
            <option value="BIOMETRIC_VERIFIED">BIOMETRIC_VERIFIED</option>
            <option value="RISK_SCORE_UPDATED">RISK_SCORE_UPDATED</option>
            <option value="DEVICE_REGISTERED">DEVICE_REGISTERED</option>
            <option value="REAUTH_REQUIRED">REAUTH_REQUIRED</option>
            <option value="SESSION_REVOKED">SESSION_REVOKED</option>
            <option value="POLICY_TRIGGERED">POLICY_TRIGGERED</option>
          </select>
        </div>
      </div>

      {/* Audit Log Table */}
      <div className="glass-panel p-5 border border-slate-800 overflow-x-auto">
        <table className="w-full text-left border-collapse font-mono text-xs">
          <thead>
            <tr className="border-b border-slate-800 text-slate-400 text-[10px] uppercase">
              <th className="py-2.5 px-3">Timestamp</th>
              <th className="py-2.5 px-3">User</th>
              <th className="py-2.5 px-3">Event Type</th>
              <th className="py-2.5 px-3">IP Address</th>
              <th className="py-2.5 px-3">Device</th>
              <th className="py-2.5 px-3">Risk Score</th>
              <th className="py-2.5 px-3">Action Taken</th>
              <th className="py-2.5 px-3 text-right">Result</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/60">
            {filteredLogs.map((log) => (
              <tr key={log.id} className="hover:bg-slate-800/30 transition-colors">
                <td className="py-3 px-3 text-slate-400 font-mono text-[11px] whitespace-nowrap">{log.timestamp}</td>
                <td className="py-3 px-3 font-semibold text-slate-200">{log.user}</td>
                <td className="py-3 px-3">
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-blue-500/10 text-blue-400 border border-blue-500/30">
                    {log.event}
                  </span>
                </td>
                <td className="py-3 px-3 text-slate-300">{log.ipAddress}</td>
                <td className="py-3 px-3 text-slate-300 max-w-[140px] truncate">{log.device}</td>
                <td className="py-3 px-3">
                  <span className={`px-2 py-0.5 rounded font-bold text-[10px] ${
                    log.riskScore > 70 ? 'bg-rose-500/20 text-rose-400' : log.riskScore > 30 ? 'bg-amber-500/20 text-amber-400' : 'bg-emerald-500/20 text-emerald-400'
                  }`}>
                    {log.riskScore}
                  </span>
                </td>
                <td className="py-3 px-3 text-slate-300 max-w-[240px] truncate">{log.actionTaken}</td>
                <td className="py-3 px-3 text-right">
                  <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                    log.result === 'SUCCESS'
                      ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                      : log.result === 'REVOKED'
                      ? 'bg-rose-500/20 text-rose-400 border border-rose-500/40'
                      : 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                  }`}>
                    {log.result}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
