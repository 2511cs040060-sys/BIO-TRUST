import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import {
  ActiveSession,
  BiometricModule,
  ZeroTrustPolicy,
  DeviceRecord,
  ThreatAlert,
  AuditLogEntry,
  UserRecord,
  RiskLevel
} from '../types/security';
import {
  INITIAL_SESSIONS,
  INITIAL_BIOMETRIC_MODULES,
  INITIAL_POLICIES,
  INITIAL_DEVICES,
  INITIAL_THREATS,
  INITIAL_AUDIT_LOGS,
  MOCK_USERS
} from '../data/mockData';
import { realBiometrics, KeystrokeMetrics, MouseMetrics, VoiceMetrics } from '../services/realBiometrics';

export interface SimulatorParams {
  ipReputationRisk: number; // 0-100 (0 clean, 100 bad)
  deviceTrust: number; // 0-100 (100 high trust, 0 untrusted)
  locationAnomaly: number; // 0-100 (0 normal, 100 impossible travel)
  behavioralAnomaly: number; // 0-100 (0 normal, 100 random)
  biometricConfidence: number; // 0-100 (100 verified match, 0 match fail)
}

interface SecurityContextType {
  sessions: ActiveSession[];
  biometricModules: BiometricModule[];
  policies: ZeroTrustPolicy[];
  devices: DeviceRecord[];
  threats: ThreatAlert[];
  auditLogs: AuditLogEntry[];
  users: UserRecord[];
  
  // Real Hardware Telemetry
  realKeystrokeMetrics: KeystrokeMetrics;
  realMouseMetrics: MouseMetrics;
  realVoiceMetrics: VoiceMetrics;

  // Risk simulator
  simulatorParams: SimulatorParams;
  calculatedRiskScore: number;
  calculatedRiskLevel: RiskLevel;
  updateSimulatorParams: (params: Partial<SimulatorParams>) => void;
  
  // Actions
  revokeSession: (sessionId: string) => void;
  stepUpAuthSession: (sessionId: string) => void;
  togglePolicy: (policyId: string) => void;
  trustDevice: (deviceId: string) => void;
  quarantineDevice: (deviceId: string) => void;
  resolveThreat: (threatId: string) => void;
  dismissThreat: (threatId: string) => void;
  addAuditLog: (entry: Omit<AuditLogEntry, 'id' | 'timestamp'>) => void;
  
  // Attack Simulation
  isSimulationRunning: boolean;
  simulationPhase: number; // 0 (idle), 1 (normal), 2 (anomaly), 3 (step-up), 4 (terminated)
  startAttackSimulation: () => void;
  stopAttackSimulation: () => void;
  
  // System Metrics
  activeUsersCount: number;
  verifiedSessionsCount: number;
  suspiciousSessionsCount: number;
  blockedSessionsCount: number;
  avgConfidence: number;
  totalApiRequests: string;
  threatsDetectedCount: number;
  devicesMonitoredCount: number;
}

const SecurityContext = createContext<SecurityContextType | undefined>(undefined);

export const calculateRisk = (params: SimulatorParams): { score: number; level: RiskLevel } => {
  const { biometricConfidence, deviceTrust, ipReputationRisk, behavioralAnomaly, locationAnomaly } = params;
  
  // riskScore = (100 - biometricConfidence) * 0.35 + (100 - deviceTrust) * 0.20 + networkRisk * 0.15 + behaviorRisk * 0.20 + locationRisk * 0.10
  const score = Math.round(
    (100 - biometricConfidence) * 0.35 +
    (100 - deviceTrust) * 0.20 +
    ipReputationRisk * 0.15 +
    behavioralAnomaly * 0.20 +
    locationAnomaly * 0.10
  );

  const normalizedScore = Math.max(0, Math.min(100, score));

  let level: RiskLevel = 'LOW';
  if (normalizedScore > 80) level = 'CRITICAL';
  else if (normalizedScore > 60) level = 'HIGH';
  else if (normalizedScore > 30) level = 'MEDIUM';

  return { score: normalizedScore, level };
};

export const SecurityProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [sessions, setSessions] = useState<ActiveSession[]>(INITIAL_SESSIONS);
  const [biometricModules, setBiometricModules] = useState<BiometricModule[]>(INITIAL_BIOMETRIC_MODULES);
  const [policies, setPolicies] = useState<ZeroTrustPolicy[]>(INITIAL_POLICIES);
  const [devices, setDevices] = useState<DeviceRecord[]>(INITIAL_DEVICES);
  const [threats, setThreats] = useState<ThreatAlert[]>(INITIAL_THREATS);
  const [auditLogs, setAuditLogs] = useState<AuditLogEntry[]>(INITIAL_AUDIT_LOGS);
  const [users, setUsers] = useState<UserRecord[]>(MOCK_USERS);

  // Real Hardware Telemetry States
  const [realKeystrokeMetrics, setRealKeystrokeMetrics] = useState<KeystrokeMetrics>(realBiometrics.getKeystrokeMetrics());
  const [realMouseMetrics, setRealMouseMetrics] = useState<MouseMetrics>(realBiometrics.getMouseMetrics());
  const [realVoiceMetrics, setRealVoiceMetrics] = useState<VoiceMetrics>(realBiometrics.getVoiceMetrics());

  // Risk simulator state
  const [simulatorParams, setSimulatorParams] = useState<SimulatorParams>({
    biometricConfidence: 98.7,
    deviceTrust: 96,
    ipReputationRisk: 10,
    behavioralAnomaly: 12,
    locationAnomaly: 5,
  });

  const { score: calculatedRiskScore, level: calculatedRiskLevel } = calculateRisk(simulatorParams);

  // Attack Simulation State
  const [isSimulationRunning, setIsSimulationRunning] = useState(false);
  const [simulationPhase, setSimulationPhase] = useState(0);

  // Update simulator parameters
  const updateSimulatorParams = (params: Partial<SimulatorParams>) => {
    setSimulatorParams(prev => ({ ...prev, ...params }));
  };

  // Add audit log helper
  const addAuditLog = useCallback((entry: Omit<AuditLogEntry, 'id' | 'timestamp'>) => {
    const newLog: AuditLogEntry = {
      id: `AUD-${Date.now().toString().slice(-4)}`,
      timestamp: new Date().toISOString().replace('T', ' ').slice(0, 19),
      ...entry
    };
    setAuditLogs(prev => [newLog, ...prev]);
  }, []);

  // Real Hardware Telemetry & Continuous Auth Heartbeat Ticker
  useEffect(() => {
    const interval = setInterval(() => {
      // 1. Fetch real physical hardware metrics
      const keyM = realBiometrics.getKeystrokeMetrics();
      const mouseM = realBiometrics.getMouseMetrics();
      const voiceM = realBiometrics.getVoiceMetrics();

      setRealKeystrokeMetrics(keyM);
      setRealMouseMetrics(mouseM);
      setRealVoiceMetrics(voiceM);

      // 2. Update active sessions using live physical telemetry
      setSessions(prevSessions =>
        prevSessions.map(session => {
          if (session.status === 'REVOKED') return session;

          const newSecondsAgo = (session.lastVerificationSecondsAgo % 15) + 2;

          // For Alex Johnson (primary user SES-92831), combine real physical inputs!
          if (session.id === 'SES-92831') {
            const liveBehaviorConf = +((keyM.rhythmScore * 0.5 + mouseM.smoothnessScore * 0.5)).toFixed(1);
            const liveCombinedConf = +((
              session.biometricBreakdown.faceRecognitionConfidence * 0.40 +
              session.biometricBreakdown.voiceRecognitionConfidence * 0.20 +
              99.5 * 0.20 +
              liveBehaviorConf * 0.20
            )).toFixed(1);

            return {
              ...session,
              lastVerificationSecondsAgo: newSecondsAgo,
              identityConfidence: liveCombinedConf,
              biometricBreakdown: {
                ...session.biometricBreakdown,
                behavioralBiometricsConfidence: liveBehaviorConf,
                combinedConfidence: liveCombinedConf
              }
            };
          }

          // Jitter for secondary sessions
          const jitter = (Math.random() - 0.5) * 0.4;
          const updatedConf = Math.min(100, Math.max(30, +(session.identityConfidence + jitter).toFixed(1)));

          return {
            ...session,
            lastVerificationSecondsAgo: newSecondsAgo,
            identityConfidence: updatedConf,
          };
        })
      );
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  // Action Handlers
  const revokeSession = (sessionId: string) => {
    setSessions(prev =>
      prev.map(s => {
        if (s.id === sessionId) {
          addAuditLog({
            user: s.userEmail,
            event: 'SESSION_REVOKED',
            ipAddress: s.ipAddress,
            device: s.device,
            riskScore: s.riskScore,
            actionTaken: `Session ${sessionId} terminated by administrator`,
            result: 'REVOKED'
          });
          return { ...s, status: 'REVOKED', riskScore: 100, riskLevel: 'CRITICAL' };
        }
        return s;
      })
    );
  };

  const stepUpAuthSession = (sessionId: string) => {
    setSessions(prev =>
      prev.map(s => {
        if (s.id === sessionId) {
          addAuditLog({
            user: s.userEmail,
            event: 'REAUTH_REQUIRED',
            ipAddress: s.ipAddress,
            device: s.device,
            riskScore: s.riskScore,
            actionTaken: `Step-Up Biometric challenge requested for session ${sessionId}`,
            result: 'FLAGGED'
          });
          return { ...s, status: 'STEP_UP_REQUIRED' };
        }
        return s;
      })
    );
  };

  const togglePolicy = (policyId: string) => {
    setPolicies(prev =>
      prev.map(p => {
        if (p.id === policyId) {
          const newStatus = p.status === 'ENABLED' ? 'DISABLED' : 'ENABLED';
          addAuditLog({
            user: 'admin@biotrust.io',
            event: 'POLICY_TRIGGERED',
            ipAddress: '127.0.0.1',
            device: 'SOC Console',
            riskScore: 0,
            actionTaken: `Policy ${p.code} status changed to ${newStatus}`,
            result: 'SUCCESS'
          });
          return { ...p, status: newStatus };
        }
        return p;
      })
    );
  };

  const trustDevice = (deviceId: string) => {
    setDevices(prev =>
      prev.map(d => (d.id === deviceId ? { ...d, status: 'TRUSTED', trustScore: 95 } : d))
    );
  };

  const quarantineDevice = (deviceId: string) => {
    setDevices(prev =>
      prev.map(d => (d.id === deviceId ? { ...d, status: 'QUARANTINED', trustScore: 15 } : d))
    );
  };

  const resolveThreat = (threatId: string) => {
    setThreats(prev => prev.map(t => (t.id === threatId ? { ...t, status: 'RESOLVED' } : t)));
  };

  const dismissThreat = (threatId: string) => {
    setThreats(prev => prev.map(t => (t.id === threatId ? { ...t, status: 'DISMISSED' } : t)));
  };

  // Attack Simulation Controller
  const startAttackSimulation = () => {
    setIsSimulationRunning(true);
    setSimulationPhase(1);

    setSimulatorParams({
      biometricConfidence: 98.7,
      deviceTrust: 96,
      ipReputationRisk: 10,
      behavioralAnomaly: 12,
      locationAnomaly: 5,
    });

    setTimeout(() => {
      setSimulationPhase(2);
      setSimulatorParams({
        biometricConfidence: 72.0,
        deviceTrust: 45,
        ipReputationRisk: 65,
        behavioralAnomaly: 58,
        locationAnomaly: 60,
      });
    }, 2500);

    setTimeout(() => {
      setSimulationPhase(3);
      setSimulatorParams({
        biometricConfidence: 54.0,
        deviceTrust: 30,
        ipReputationRisk: 80,
        behavioralAnomaly: 75,
        locationAnomaly: 85,
      });
    }, 5500);

    setTimeout(() => {
      setSimulationPhase(4);
      setSimulatorParams({
        biometricConfidence: 22.0,
        deviceTrust: 10,
        ipReputationRisk: 95,
        behavioralAnomaly: 90,
        locationAnomaly: 95,
      });

      const alertId = `TRT-SIM-${Date.now().toString().slice(-4)}`;
      const newThreat: ThreatAlert = {
        id: alertId,
        timestamp: new Date().toISOString().replace('T', ' ').slice(0, 19),
        severity: 'CRITICAL',
        title: 'Attack Simulation: Rogue Session Hijack Terminated',
        description: 'Biometric confidence collapsed to 22.0% with impossible travel anomaly. Session SES-SIM-X terminated automatically.',
        userName: 'Simulated Target User',
        userEmail: 'simulated.target@biotrust.io',
        sessionId: 'SES-SIM-X',
        sourceIp: '185.220.101.99',
        device: 'Rogue Device / VPN Exit Node',
        riskScore: 92,
        recommendedAction: 'TERMINATE_SESSION',
        status: 'NEW'
      };

      setThreats(prev => [newThreat, ...prev]);
      addAuditLog({
        user: 'simulated.target@biotrust.io',
        event: 'SESSION_REVOKED',
        ipAddress: '185.220.101.99',
        device: 'Rogue Device',
        riskScore: 92,
        actionTaken: 'Zero Trust Policy POL-02 & POL-05 triggered -> Session terminated automatically',
        result: 'REVOKED'
      });
    }, 8500);
  };

  const stopAttackSimulation = () => {
    setIsSimulationRunning(false);
    setSimulationPhase(0);
    setSimulatorParams({
      biometricConfidence: 98.7,
      deviceTrust: 96,
      ipReputationRisk: 10,
      behavioralAnomaly: 12,
      locationAnomaly: 5,
    });
  };

  // Metrics computation
  const activeUsersCount = users.length;
  const verifiedSessionsCount = sessions.filter(s => s.status === 'ACTIVE').length;
  const suspiciousSessionsCount = sessions.filter(s => s.status === 'STEP_UP_REQUIRED' || s.status === 'SUSPICIOUS').length;
  const blockedSessionsCount = sessions.filter(s => s.status === 'REVOKED').length + 94;
  const avgConfidence = +(sessions.reduce((acc, s) => acc + s.identityConfidence, 0) / sessions.length).toFixed(1);
  const totalApiRequests = '2.8M';
  const threatsDetectedCount = threats.filter(t => t.status !== 'RESOLVED' && t.status !== 'DISMISSED').length;
  const devicesMonitoredCount = devices.length + 1537;

  return (
    <SecurityContext.Provider
      value={{
        sessions,
        biometricModules,
        policies,
        devices,
        threats,
        auditLogs,
        users,
        realKeystrokeMetrics,
        realMouseMetrics,
        realVoiceMetrics,
        simulatorParams,
        calculatedRiskScore,
        calculatedRiskLevel,
        updateSimulatorParams,
        revokeSession,
        stepUpAuthSession,
        togglePolicy,
        trustDevice,
        quarantineDevice,
        resolveThreat,
        dismissThreat,
        addAuditLog,
        isSimulationRunning,
        simulationPhase,
        startAttackSimulation,
        stopAttackSimulation,
        activeUsersCount,
        verifiedSessionsCount,
        suspiciousSessionsCount,
        blockedSessionsCount,
        avgConfidence,
        totalApiRequests,
        threatsDetectedCount,
        devicesMonitoredCount,
      }}
    >
      {children}
    </SecurityContext.Provider>
  );
};

export const useSecurity = () => {
  const context = useContext(SecurityContext);
  if (!context) {
    throw new Error('useSecurity must be used within a SecurityProvider');
  }
  return context;
};
