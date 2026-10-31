import React from 'react';
import { LucideIcon } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string | number;
  subtext?: string;
  change?: string;
  isPositive?: boolean;
  icon: LucideIcon;
  iconColor?: 'cyan' | 'green' | 'amber' | 'rose' | 'blue' | 'purple';
}

export const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  subtext,
  change,
  isPositive = true,
  icon: Icon,
  iconColor = 'cyan'
}) => {
  const colorMap = {
    cyan: 'bg-cyan-500/10 text-neon-cyan border-cyan-500/30 shadow-neon-cyan/20',
    green: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30 shadow-neon-green/20',
    amber: 'bg-amber-500/10 text-amber-400 border-amber-500/30',
    rose: 'bg-rose-500/10 text-rose-400 border-rose-500/30 shadow-neon-red/20',
    blue: 'bg-blue-500/10 text-blue-400 border-blue-500/30 shadow-neon-blue/20',
    purple: 'bg-purple-500/10 text-purple-400 border-purple-500/30',
  };

  return (
    <div className="glass-card p-5 relative overflow-hidden group">
      {/* Background ambient glow effect */}
      <div className="absolute -right-6 -bottom-6 w-24 h-24 rounded-full bg-neon-cyan/5 blur-2xl group-hover:bg-neon-cyan/10 transition-all pointer-events-none" />

      <div className="flex items-start justify-between">
        <div>
          <span className="text-[11px] font-mono font-medium text-slate-400 uppercase tracking-wider">
            {title}
          </span>
          <div className="font-mono text-2xl font-bold text-white mt-1 tracking-tight">
            {value}
          </div>
        </div>

        <div className={`p-2.5 rounded-xl border ${colorMap[iconColor]} transition-transform group-hover:scale-110`}>
          <Icon className="w-5 h-5" />
        </div>
      </div>

      <div className="mt-3 flex items-center justify-between text-xs">
        {change && (
          <span className={`font-mono text-[11px] font-semibold flex items-center gap-1 ${
            isPositive ? 'text-emerald-400' : 'text-rose-400'
          }`}>
            {isPositive ? '↑' : '↓'} {change}
          </span>
        )}
        {subtext && <span className="text-[10px] text-slate-500 font-mono">{subtext}</span>}
      </div>
    </div>
  );
};
