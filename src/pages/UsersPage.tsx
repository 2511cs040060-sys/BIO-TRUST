import React, { useState } from 'react';
import {
  Users,
  Search,
  Shield,
  RefreshCw,
  XCircle,
  CheckCircle2,
  AlertTriangle,
  UserCheck,
  MoreVertical,
  SlidersHorizontal,
  X
} from 'lucide-react';
import { useSecurity } from '../context/SecurityContext';
import { UserRecord } from '../types/security';

export const UsersPage: React.FC = () => {
  const { users, revokeSession, addAuditLog } = useSecurity();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUser, setSelectedUser] = useState<UserRecord | null>(null);

  const filteredUsers = users.filter(u =>
    u.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    u.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    u.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleResetBiometrics = (user: UserRecord) => {
    addAuditLog({
      user: user.email,
      event: 'BIOMETRIC_VERIFIED',
      ipAddress: '127.0.0.1',
      device: 'Admin Console',
      riskScore: 0,
      actionTaken: `Biometric enrollment reset requested for ${user.email}`,
      result: 'SUCCESS'
    });
    alert(`Biometric vector profile reset link sent to ${user.email}`);
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-mono text-2xl font-bold text-white tracking-wide flex items-center gap-2">
            <Users className="w-6 h-6 text-neon-cyan" />
            User Identity Directory
          </h1>
          <p className="text-xs text-slate-400 mt-1 font-mono">
            Enrolled biometric user profiles, security clearance levels, and session states
          </p>
        </div>

        <div className="text-xs font-mono text-slate-400 bg-slate-900 px-3 py-1.5 rounded-lg border border-slate-800">
          Enrolled Profiles: <strong className="text-neon-cyan">{users.length}</strong>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="glass-card p-3 flex items-center justify-between gap-4 bg-[#090D16]">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder="Search users by name, email, role..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-[#0D1322] border border-slate-800 rounded-lg pl-9 pr-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-neon-cyan font-mono"
          />
        </div>
      </div>

      {/* User Table */}
      <div className="glass-panel p-5 border border-slate-800 overflow-x-auto">
        <table className="w-full text-left border-collapse font-mono text-xs">
          <thead>
            <tr className="border-b border-slate-800 text-slate-400 text-[10px] uppercase">
              <th className="py-2.5 px-3">User Profile</th>
              <th className="py-2.5 px-3">Role</th>
              <th className="py-2.5 px-3">Devices</th>
              <th className="py-2.5 px-3">Biometrics</th>
              <th className="py-2.5 px-3">Risk Level</th>
              <th className="py-2.5 px-3">Last Auth</th>
              <th className="py-2.5 px-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/60">
            {filteredUsers.map((u) => (
              <tr key={u.id} className="hover:bg-slate-800/30 transition-colors">
                <td className="py-3 px-3">
                  <div className="font-semibold text-slate-200">{u.name}</div>
                  <div className="text-[10px] text-slate-500">{u.email}</div>
                </td>
                <td className="py-3 px-3 text-slate-300">{u.role}</td>
                <td className="py-3 px-3 text-slate-300">{u.registeredDevices} devices</td>
                <td className="py-3 px-3">
                  <span className={`px-2 py-0.5 rounded text-[10px] font-semibold ${
                    u.biometricStatus === 'ENROLLED' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30' : 'bg-rose-500/10 text-rose-400'
                  }`}>
                    ● {u.biometricStatus}
                  </span>
                </td>
                <td className="py-3 px-3">
                  <span className={`px-2 py-0.5 rounded font-bold text-[10px] ${
                    u.currentRiskLevel === 'CRITICAL'
                      ? 'bg-rose-500/20 text-rose-400'
                      : u.currentRiskLevel === 'HIGH'
                      ? 'bg-amber-500/20 text-amber-400'
                      : 'bg-emerald-500/20 text-emerald-400'
                  }`}>
                    {u.currentRiskLevel}
                  </span>
                </td>
                <td className="py-3 px-3 text-slate-400">{u.lastAuth}</td>
                <td className="py-3 px-3 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <button
                      onClick={() => setSelectedUser(u)}
                      className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 text-[11px]"
                    >
                      View Drawer
                    </button>
                    <button
                      onClick={() => handleResetBiometrics(u)}
                      className="px-2.5 py-1 rounded bg-amber-500/10 text-amber-300 hover:bg-amber-500/20 text-[11px]"
                    >
                      Reset Bio
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* User Detail Side Drawer */}
      {selectedUser && (
        <div className="fixed inset-0 z-50 flex justify-end bg-cyber-950/70 backdrop-blur-sm">
          <div className="w-full max-w-md bg-[#0A0E1A] border-l border-slate-800 p-6 space-y-6 overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div>
                <h2 className="font-mono text-base font-bold text-white">{selectedUser.name}</h2>
                <p className="text-xs text-slate-400 font-mono">{selectedUser.email}</p>
              </div>
              <button onClick={() => setSelectedUser(null)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4 font-mono text-xs">
              <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
                <div className="text-slate-400 uppercase text-[10px]">SECURITY ROLE</div>
                <div className="text-slate-200 font-bold">{selectedUser.role}</div>
                <div className="text-slate-400 uppercase text-[10px] pt-2">BIOMETRIC ENROLLMENT</div>
                <div className="text-emerald-400 font-bold">{selectedUser.biometricStatus}</div>
              </div>

              <div className="space-y-2">
                <button
                  onClick={() => {
                    handleResetBiometrics(selectedUser);
                    setSelectedUser(null);
                  }}
                  className="w-full py-2 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30 font-bold text-xs"
                >
                  Reset Biometric Template Vectors
                </button>

                <button
                  onClick={() => {
                    alert(`Account suspended for ${selectedUser.email}`);
                    setSelectedUser(null);
                  }}
                  className="w-full py-2 rounded bg-rose-500/20 text-rose-400 border border-rose-500/30 font-bold text-xs"
                >
                  Disable Account Access
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
