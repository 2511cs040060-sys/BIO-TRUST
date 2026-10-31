export type RiskLevel = 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
export type SessionStatus = 'ACTIVE' | 'STEP_UP_REQUIRED' | 'SUSPICIOUS' | 'REVOKED' | 'EXPIRED';
export type DeviceTrustStatus = 'TRUSTED' | 'SUSPICIOUS' | 'UNTRUSTED' | 'QUARANTINED';
export type PolicyStatus = 'ENABLED' | 'DISABLED' | 'AUDIT_ONLY';
export type ThreatSeverity = 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW';

export interface BiometricSignals {
  faceRecognitionConfidence: number; // e.g. 98.4
  voiceRecognitionConfidence: number; // e.g. 96.8
  fingerprintVerified: boolean;
  behavioralBiometricsConfidence: number; // e.g. 94.7
  combinedConfidence: number; // Weighted calculation: 0.40*face + 0.20*voice + 0.20*fingerprint + 0.20*behavior
}

export interface RiskFactorBreakdown {
  deviceTrustScore: number; // 0-100 (higher is better)
  networkReputationScore: number; // 0-100 (higher is safer)
  locationAnomalyScore: number; // 0-100 (higher is riskier)
  behavioralAnomalyScore: number; // 0-100 (higher is riskier)
  biometricConfidenceScore: number; // 0-100 (higher is better)
  keystrokePatternScore: number; // 0-100
  mouseBehaviorScore: number; // 0-100
  overallRiskScore: number; // 0-100 (calculated via formula)
  level: RiskLevel;
}

export interface ActiveSession {
  id: string; // e.g. SES-92831
  userId: string;
  userName: string;
  userEmail: string;
  userAvatar?: string;
  device: string; // e.g. Windows 11 / Chrome
  deviceTrust: number; // e.g. 96
  ipAddress: string;
  location: string;
  identityConfidence: number; // e.g. 98.7
  riskScore: number; // e.g. 18
  riskLevel: RiskLevel;
  status: SessionStatus;
  lastVerificationSecondsAgo: number;
  verificationMethod: string;
  startTime: string;
  biometricBreakdown: BiometricSignals;
  signalsHistory: Array<{ timestamp: string; signal: string; status: 'SUCCESS' | 'WARNING' | 'ALERT' }>;
}

export interface BiometricModule {
  id: string;
  name: string;
  status: 'ACTIVE' | 'MONITORING' | 'VERIFIED' | 'STANDBY';
  weight: number; // e.g. 0.40 for Face
  confidence: number; // e.g. 98.4
  sampleCount: number;
  lastTrained: string;
  description: string;
}

export interface ZeroTrustPolicy {
  id: string;
  code: string; // e.g. POL-01
  name: string;
  description: string;
  condition: string; // e.g. Continuous confidence < 85%
  action: 'STEP_UP_AUTH' | 'BLOCK_ACCESS' | 'REQUIRE_BIOMETRIC' | 'INCREASE_RISK' | 'TERMINATE_SESSION';
  status: PolicyStatus;
  timesEnforced: number;
  lastTriggered?: string;
  severity: ThreatSeverity;
}

export interface DeviceRecord {
  id: string; // e.g. DEV-4902
  name: string; // e.g. Laptop-001
  userId: string;
  userName: string;
  os: string;
  browser: string;
  ipAddress: string;
  location: string;
  trustScore: number; // e.g. 96%
  status: DeviceTrustStatus;
  lastSeen: string;
  isFingerprinted: boolean;
  hardwareSecurityKey: boolean;
}

export interface ThreatAlert {
  id: string;
  timestamp: string;
  severity: ThreatSeverity;
  title: string;
  description: string;
  userName: string;
  userEmail: string;
  sessionId?: string;
  sourceIp: string;
  device: string;
  riskScore: number;
  recommendedAction: 'INVESTIGATE' | 'STEP_UP_AUTH' | 'TERMINATE_SESSION';
  status: 'NEW' | 'INVESTIGATING' | 'RESOLVED' | 'DISMISSED';
}

export interface AuditLogEntry {
  id: string;
  timestamp: string;
  user: string;
  event: 'LOGIN_SUCCESS' | 'BIOMETRIC_VERIFIED' | 'RISK_SCORE_UPDATED' | 'DEVICE_REGISTERED' | 'REAUTH_REQUIRED' | 'SESSION_REVOKED' | 'POLICY_TRIGGERED' | 'API_KEY_CREATED';
  ipAddress: string;
  device: string;
  riskScore: number;
  actionTaken: string;
  result: 'SUCCESS' | 'DENIED' | 'FLAGGED' | 'REVOKED';
}

export interface ApiKeyRecord {
  id: string;
  name: string;
  keyMasked: string; // e.g. bt_live_9f8...a4
  environment: 'PRODUCTION' | 'STAGING' | 'DEVELOPMENT';
  created: string;
  lastUsed: string;
  rateLimit: string;
  status: 'ACTIVE' | 'REVOKED';
}

export interface ApiEndpoint {
  method: 'GET' | 'POST' | 'PUT' | 'DELETE';
  path: string;
  description: string;
  requestBody?: string;
  responseBody: string;
  rateLimit: string;
}

export interface UserRecord {
  id: string;
  name: string;
  email: string;
  role: 'SOC Administrator' | 'Security Engineer' | 'End User' | 'API Consumer';
  registeredDevices: number;
  biometricStatus: 'ENROLLED' | 'PENDING' | 'REVOKED';
  currentRiskLevel: RiskLevel;
  lastAuth: string;
  sessionStatus: 'ACTIVE' | 'INACTIVE' | 'SUSPENDED';
}
