import { AuditLogEntry } from '../types/security';

export function exportAuditLogsToCSV(logs: AuditLogEntry[], filename = 'biotrust-audit-logs.csv') {
  if (!logs || logs.length === 0) return;

  const headers = ['ID', 'Timestamp', 'User', 'Event', 'IP Address', 'Device', 'Risk Score', 'Action Taken', 'Result'];
  
  const rows = logs.map(log => [
    log.id,
    `"${log.timestamp}"`,
    `"${log.user}"`,
    log.event,
    log.ipAddress,
    `"${log.device}"`,
    log.riskScore,
    `"${log.actionTaken.replace(/"/g, '""')}"`,
    log.result
  ]);

  const csvContent = [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', filename);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
