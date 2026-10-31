import {
  ActiveSession,
  BiometricModule,
  ZeroTrustPolicy,
  DeviceRecord,
  ThreatAlert,
  AuditLogEntry,
  ApiKeyRecord,
  ApiEndpoint,
  UserRecord
} from '../types/security';

export const INITIAL_SESSIONS: ActiveSession[] = [
  {
    id: 'SES-92831',
    userId: 'USR-101',
    userName: 'Alex Johnson',
    userEmail: 'alex.j@biotrust.io',
    device: 'Windows 11 / Chrome 124',
    deviceTrust: 96,
    ipAddress: '198.51.100.42',
    location: 'San Francisco, US',
    identityConfidence: 98.7,
    riskScore: 12,
    riskLevel: 'LOW',
    status: 'ACTIVE',
    lastVerificationSecondsAgo: 4,
    verificationMethod: 'Multi-Modal Continuous',
    startTime: '2026-10-06T18:30:00Z',
    biometricBreakdown: {
      faceRecognitionConfidence: 99.1,
      voiceRecognitionConfidence: 97.4,
      fingerprintVerified: true,
      behavioralBiometricsConfidence: 96.8,
      combinedConfidence: 98.7,
    },
    signalsHistory: [
      { timestamp: '10:42:51', signal: 'Identity confirmed via Continuous Biometrics', status: 'SUCCESS' },
      { timestamp: '10:42:39', signal: 'Risk score updated: 12 (LOW)', status: 'SUCCESS' },
      { timestamp: '10:42:27', signal: 'Behavioral keystroke dynamics verified', status: 'SUCCESS' },
      { timestamp: '10:42:15', signal: 'Device Hardware Security Token verified', status: 'SUCCESS' },
      { timestamp: '10:42:03', signal: 'Face 3D Mesh & Liveness verified', status: 'SUCCESS' },
    ]
  },
  {
    id: 'SES-88219',
    userId: 'USR-102',
    userName: 'Sarah Chen',
    userEmail: 'sarah.chen@enterprise.org',
    device: 'macOS Sonoma / Safari 17.4',
    deviceTrust: 98,
    ipAddress: '203.0.113.88',
    location: 'Seattle, US',
    identityConfidence: 96.4,
    riskScore: 18,
    riskLevel: 'LOW',
    status: 'ACTIVE',
    lastVerificationSecondsAgo: 8,
    verificationMethod: 'Face + Keystroke Dynamics',
    startTime: '2026-10-06T17:15:00Z',
    biometricBreakdown: {
      faceRecognitionConfidence: 97.8,
      voiceRecognitionConfidence: 94.5,
      fingerprintVerified: true,
      behavioralBiometricsConfidence: 95.2,
      combinedConfidence: 96.4,
    },
    signalsHistory: [
      { timestamp: '10:42:48', signal: 'Mouse cursor micro-trajectory matched baseline', status: 'SUCCESS' },
      { timestamp: '10:42:30', signal: 'TLS 1.3 Client Certificate verified', status: 'SUCCESS' },
      { timestamp: '10:42:10', signal: 'Face recognition confidence 97.8%', status: 'SUCCESS' },
    ]
  },
  {
    id: 'SES-77312',
    userId: 'USR-103',
    userName: 'Marcus Vance',
    userEmail: 'marcus.vance@fintech.net',
    device: 'Linux Ubuntu / Firefox 125',
    deviceTrust: 64,
    ipAddress: '185.220.101.5',
    location: 'Frankfurt, DE (Tor Exit Node Flagged)',
    identityConfidence: 54.2,
    riskScore: 74,
    riskLevel: 'HIGH',
    status: 'STEP_UP_REQUIRED',
    lastVerificationSecondsAgo: 1,
    verificationMethod: 'Behavioral Anomaly Triggered',
    startTime: '2026-10-06T19:40:00Z',
    biometricBreakdown: {
      faceRecognitionConfidence: 52.0,
      voiceRecognitionConfidence: 58.3,
      fingerprintVerified: false,
      behavioralBiometricsConfidence: 51.5,
      combinedConfidence: 54.2,
    },
    signalsHistory: [
      { timestamp: '10:42:55', signal: 'CRITICAL: Keystroke cadence mismatch (34% similarity)', status: 'ALERT' },
      { timestamp: '10:42:40', signal: 'IP reputation flagged as VPN/Tor relay node', status: 'WARNING' },
      { timestamp: '10:42:25', signal: 'Step-Up Biometric Verification Challenge issued', status: 'WARNING' },
    ]
  },
  {
    id: 'SES-61044',
    userId: 'USR-104',
    userName: 'Elena Rostova',
    userEmail: 'elena.r@globalcorp.io',
    device: 'iOS 17.5 / Mobile App',
    deviceTrust: 94,
    ipAddress: '198.51.100.199',
    location: 'London, UK',
    identityConfidence: 99.2,
    riskScore: 8,
    riskLevel: 'LOW',
    status: 'ACTIVE',
    lastVerificationSecondsAgo: 12,
    verificationMethod: 'Touch ID + FaceID Secure Enclave',
    startTime: '2026-10-06T19:00:00Z',
    biometricBreakdown: {
      faceRecognitionConfidence: 99.6,
      voiceRecognitionConfidence: 98.9,
      fingerprintVerified: true,
      behavioralBiometricsConfidence: 98.2,
      combinedConfidence: 99.2,
    },
    signalsHistory: [
      { timestamp: '10:42:43', signal: 'iOS Biometrics Secure Enclave validation ok', status: 'SUCCESS' },
      { timestamp: '10:42:20', signal: 'Device Integrity & Jailbreak check passed', status: 'SUCCESS' },
    ]
  },
  {
    id: 'SES-50912',
    userId: 'USR-105',
    userName: 'David Kim',
    userEmail: 'david.k@cyberlabs.com',
    device: 'Windows 11 / Edge 124',
    deviceTrust: 24,
    ipAddress: '103.22.180.12',
    location: 'Tokyo, JP (Impossible Travel Anomaly)',
    identityConfidence: 38.0,
    riskScore: 91,
    riskLevel: 'CRITICAL',
    status: 'SUSPICIOUS',
    lastVerificationSecondsAgo: 2,
    verificationMethod: 'Failed Biometric Match',
    startTime: '2026-10-06T20:05:00Z',
    biometricBreakdown: {
      faceRecognitionConfidence: 34.0,
      voiceRecognitionConfidence: 41.0,
      fingerprintVerified: false,
      behavioralBiometricsConfidence: 39.0,
      combinedConfidence: 38.0,
    },
    signalsHistory: [
      { timestamp: '10:42:58', signal: 'ALERT: Session flagged for immediate SOC review', status: 'ALERT' },
      { timestamp: '10:42:50', signal: 'Impossible travel detected: NYC -> Tokyo in 15 mins', status: 'ALERT' },
      { timestamp: '10:42:35', signal: 'Unrecognized facial biometrics signature', status: 'ALERT' },
    ]
  }
];

export const INITIAL_BIOMETRIC_MODULES: BiometricModule[] = [
  {
    id: 'MOD-FACE',
    name: 'Face Recognition & Liveness',
    status: 'ACTIVE',
    weight: 0.40,
    confidence: 98.4,
    sampleCount: 142850,
    lastTrained: '2026-10-05',
    description: '3D facial depth mapping, infra-red liveness detection, and anti-spoofing neural network.'
  },
  {
    id: 'MOD-VOICE',
    name: 'Voice Acoustic Print',
    status: 'ACTIVE',
    weight: 0.20,
    confidence: 96.8,
    sampleCount: 89400,
    lastTrained: '2026-10-04',
    description: 'Vocal tract geometry, formant spectral analysis, and background noise filtering.'
  },
  {
    id: 'MOD-FINGER',
    name: 'Fingerprint & WebAuthn',
    status: 'VERIFIED',
    weight: 0.20,
    confidence: 99.5,
    sampleCount: 210000,
    lastTrained: '2026-10-06',
    description: 'FIDO2 / WebAuthn cryptographically backed hardware fingerprint enclave.'
  },
  {
    id: 'MOD-BEHAVIOR',
    name: 'Behavioral Dynamics',
    status: 'MONITORING',
    weight: 0.20,
    confidence: 94.7,
    sampleCount: 540200,
    lastTrained: '2026-10-06',
    description: 'Keystroke timing interval (flight/dwell times), mouse velocity, and touch dynamics.'
  }
];

export const INITIAL_POLICIES: ZeroTrustPolicy[] = [
  {
    id: 'POL-01',
    code: 'POL-01',
    name: 'Continuous Biometric Verification',
    description: 'Enforce continuous multi-modal biometric evaluation for active sessions.',
    condition: 'Continuous identity confidence < 85%',
    action: 'STEP_UP_AUTH',
    status: 'ENABLED',
    timesEnforced: 142,
    lastTriggered: '10 mins ago',
    severity: 'HIGH'
  },
  {
    id: 'POL-02',
    code: 'POL-02',
    name: 'Untrusted Device Protection',
    description: 'Automatically isolate sessions attempting access from untrusted or un-fingerprinted hardware.',
    condition: 'Device trust score < 60%',
    action: 'BLOCK_ACCESS',
    status: 'ENABLED',
    timesEnforced: 89,
    lastTriggered: '25 mins ago',
    severity: 'CRITICAL'
  },
  {
    id: 'POL-03',
    code: 'POL-03',
    name: 'Impossible Travel Detection',
    description: 'Detect physical velocity anomalies between subsequent geolocation logins.',
    condition: 'Physical travel velocity > 800 km/h between auth events',
    action: 'REQUIRE_BIOMETRIC',
    status: 'ENABLED',
    timesEnforced: 37,
    lastTriggered: '1 hour ago',
    severity: 'CRITICAL'
  },
  {
    id: 'POL-04',
    code: 'POL-04',
    name: 'Behavioral Anomaly Quarantine',
    description: 'Flag sessions where mouse/keystroke cadence deviates drastically from baseline.',
    condition: 'Behavioral pattern deviation > 45%',
    action: 'INCREASE_RISK',
    status: 'ENABLED',
    timesEnforced: 214,
    lastTriggered: '5 mins ago',
    severity: 'MEDIUM'
  },
  {
    id: 'POL-05',
    code: 'POL-05',
    name: 'High Risk IP Reputation Block',
    description: 'Instantly revoke active API tokens associated with known botnet or malicious exit nodes.',
    condition: 'IP Risk Level == CRITICAL',
    action: 'TERMINATE_SESSION',
    status: 'ENABLED',
    timesEnforced: 94,
    lastTriggered: '3 hours ago',
    severity: 'CRITICAL'
  }
];

export const INITIAL_DEVICES: DeviceRecord[] = [
  {
    id: 'DEV-4902',
    name: 'Laptop-001 (Corporate Mac)',
    userId: 'USR-101',
    userName: 'Alex Johnson',
    os: 'macOS Sonoma 14.5',
    browser: 'Chrome 124.0.0',
    ipAddress: '198.51.100.42',
    location: 'San Francisco, USA',
    trustScore: 98,
    status: 'TRUSTED',
    lastSeen: '2 seconds ago',
    isFingerprinted: true,
    hardwareSecurityKey: true
  },
  {
    id: 'DEV-8812',
    name: 'Unknown-Device-22',
    userId: 'USR-103',
    userName: 'Marcus Vance',
    os: 'Linux x86_64',
    browser: 'Firefox 125.0',
    ipAddress: '185.220.101.5',
    location: 'Frankfurt, DE',
    trustScore: 24,
    status: 'SUSPICIOUS',
    lastSeen: 'Just now',
    isFingerprinted: false,
    hardwareSecurityKey: false
  },
  {
    id: 'DEV-3301',
    name: 'Workstation-Win11',
    userId: 'USR-102',
    userName: 'Sarah Chen',
    os: 'Windows 11 Pro',
    browser: 'Edge 124.0',
    ipAddress: '203.0.113.88',
    location: 'Seattle, USA',
    trustScore: 95,
    status: 'TRUSTED',
    lastSeen: '1 minute ago',
    isFingerprinted: true,
    hardwareSecurityKey: true
  },
  {
    id: 'DEV-9021',
    name: 'Mobile-Pixel-8',
    userId: 'USR-104',
    userName: 'Elena Rostova',
    os: 'Android 14',
    browser: 'Mobile Chrome 124',
    ipAddress: '198.51.100.199',
    location: 'London, UK',
    trustScore: 92,
    status: 'TRUSTED',
    lastSeen: '12 seconds ago',
    isFingerprinted: true,
    hardwareSecurityKey: true
  },
  {
    id: 'DEV-1104',
    name: 'Rogue-Node-89',
    userId: 'USR-105',
    userName: 'David Kim',
    os: 'Unknown OS',
    browser: 'Headless Chrome',
    ipAddress: '103.22.180.12',
    location: 'Tokyo, JP',
    trustScore: 10,
    status: 'UNTRUSTED',
    lastSeen: '4 seconds ago',
    isFingerprinted: false,
    hardwareSecurityKey: false
  }
];

export const INITIAL_THREATS: ThreatAlert[] = [
  {
    id: 'TRT-9001',
    timestamp: '2026-10-06 20:12:04',
    severity: 'CRITICAL',
    title: 'Biometric Confidence Sudden Drop',
    description: 'Identity confidence plummeted from 98.7% to 54.2% within 30 seconds for session SES-77312.',
    userName: 'Marcus Vance',
    userEmail: 'marcus.vance@fintech.net',
    sessionId: 'SES-77312',
    sourceIp: '185.220.101.5',
    device: 'Linux Ubuntu / Firefox 125',
    riskScore: 74,
    recommendedAction: 'STEP_UP_AUTH',
    status: 'NEW'
  },
  {
    id: 'TRT-9002',
    timestamp: '2026-10-06 20:08:15',
    severity: 'HIGH',
    title: 'Impossible Travel Velocity Anomaly',
    description: 'User authenticated from Tokyo, JP 15 mins after active session in NYC, USA.',
    userName: 'David Kim',
    userEmail: 'david.k@cyberlabs.com',
    sessionId: 'SES-50912',
    sourceIp: '103.22.180.12',
    device: 'Unknown-Device-22',
    riskScore: 91,
    recommendedAction: 'TERMINATE_SESSION',
    status: 'NEW'
  },
  {
    id: 'TRT-9003',
    timestamp: '2026-10-06 19:54:22',
    severity: 'MEDIUM',
    title: 'Unusual Keystroke Flight Time Anomaly',
    description: 'Keystroke dwell/flight times deviated by 48% from baseline pattern.',
    userName: 'Sarah Chen',
    userEmail: 'sarah.chen@enterprise.org',
    sessionId: 'SES-88219',
    sourceIp: '203.0.113.88',
    device: 'macOS Sonoma / Safari',
    riskScore: 35,
    recommendedAction: 'INVESTIGATE',
    status: 'INVESTIGATING'
  },
  {
    id: 'TRT-9004',
    timestamp: '2026-10-06 18:30:11',
    severity: 'HIGH',
    title: 'Untrusted Hardware Device Registration Attempt',
    description: 'Attempted login from unverified device ID without valid hardware attestation token.',
    userName: 'Unknown Attacker',
    userEmail: 'attacker@unknown-net.org',
    sourceIp: '45.142.120.9',
    device: 'Headless Chrome / Automated Script',
    riskScore: 88,
    recommendedAction: 'TERMINATE_SESSION',
    status: 'RESOLVED'
  }
];

export const INITIAL_AUDIT_LOGS: AuditLogEntry[] = [
  {
    id: 'AUD-1001',
    timestamp: '2026-10-06 20:12:04',
    user: 'marcus.vance@fintech.net',
    event: 'RISK_SCORE_UPDATED',
    ipAddress: '185.220.101.5',
    device: 'Linux Ubuntu',
    riskScore: 74,
    actionTaken: 'Policy POL-01 triggered -> Issued Step-Up Biometric Challenge',
    result: 'FLAGGED'
  },
  {
    id: 'AUD-1002',
    timestamp: '2026-10-06 20:08:15',
    user: 'david.k@cyberlabs.com',
    event: 'POLICY_TRIGGERED',
    ipAddress: '103.22.180.12',
    device: 'Unknown-Device-22',
    riskScore: 91,
    actionTaken: 'Policy POL-03 Impossible Travel -> Session Quarantined',
    result: 'DENIED'
  },
  {
    id: 'AUD-1003',
    timestamp: '2026-10-06 20:00:00',
    user: 'alex.j@biotrust.io',
    event: 'BIOMETRIC_VERIFIED',
    ipAddress: '198.51.100.42',
    device: 'Laptop-001',
    riskScore: 12,
    actionTaken: 'Continuous Face + Keystroke Verification passed (98.7%)',
    result: 'SUCCESS'
  },
  {
    id: 'AUD-1004',
    timestamp: '2026-10-06 19:45:10',
    user: 'sarah.chen@enterprise.org',
    event: 'DEVICE_REGISTERED',
    ipAddress: '203.0.113.88',
    device: 'macOS Sonoma',
    riskScore: 18,
    actionTaken: 'WebAuthn hardware token registered to user profile',
    result: 'SUCCESS'
  },
  {
    id: 'AUD-1005',
    timestamp: '2026-10-06 19:12:00',
    user: 'admin@biotrust.io',
    event: 'API_KEY_CREATED',
    ipAddress: '198.51.100.42',
    device: 'Admin Console',
    riskScore: 5,
    actionTaken: 'Created Production API key bt_live_prod_89a...',
    result: 'SUCCESS'
  },
  {
    id: 'AUD-1006',
    timestamp: '2026-10-06 18:50:33',
    user: 'elena.r@globalcorp.io',
    event: 'LOGIN_SUCCESS',
    ipAddress: '198.51.100.199',
    device: 'Mobile-Pixel-8',
    riskScore: 8,
    actionTaken: 'Multi-Factor Biometric authentication completed',
    result: 'SUCCESS'
  },
  {
    id: 'AUD-1007',
    timestamp: '2026-10-06 18:22:15',
    user: 'attacker@unknown-net.org',
    event: 'SESSION_REVOKED',
    ipAddress: '45.142.120.9',
    device: 'Headless Chrome',
    riskScore: 98,
    actionTaken: 'Automatic session kill triggered by SOC policy engine',
    result: 'REVOKED'
  }
];

export const MOCK_USERS: UserRecord[] = [
  {
    id: 'USR-101',
    name: 'Alex Johnson',
    email: 'alex.j@biotrust.io',
    role: 'SOC Administrator',
    registeredDevices: 2,
    biometricStatus: 'ENROLLED',
    currentRiskLevel: 'LOW',
    lastAuth: 'Just now',
    sessionStatus: 'ACTIVE'
  },
  {
    id: 'USR-102',
    name: 'Sarah Chen',
    email: 'sarah.chen@enterprise.org',
    role: 'Security Engineer',
    registeredDevices: 3,
    biometricStatus: 'ENROLLED',
    currentRiskLevel: 'LOW',
    lastAuth: '8 mins ago',
    sessionStatus: 'ACTIVE'
  },
  {
    id: 'USR-103',
    name: 'Marcus Vance',
    email: 'marcus.vance@fintech.net',
    role: 'End User',
    registeredDevices: 1,
    biometricStatus: 'ENROLLED',
    currentRiskLevel: 'HIGH',
    lastAuth: '1 min ago',
    sessionStatus: 'ACTIVE'
  },
  {
    id: 'USR-104',
    name: 'Elena Rostova',
    email: 'elena.r@globalcorp.io',
    role: 'End User',
    registeredDevices: 2,
    biometricStatus: 'ENROLLED',
    currentRiskLevel: 'LOW',
    lastAuth: '12 mins ago',
    sessionStatus: 'ACTIVE'
  },
  {
    id: 'USR-105',
    name: 'David Kim',
    email: 'david.k@cyberlabs.com',
    role: 'API Consumer',
    registeredDevices: 1,
    biometricStatus: 'REVOKED',
    currentRiskLevel: 'CRITICAL',
    lastAuth: '2 mins ago',
    sessionStatus: 'SUSPENDED'
  }
];

export const MOCK_API_KEYS: ApiKeyRecord[] = [
  {
    id: 'KEY-01',
    name: 'Production Auth Gateway',
    keyMasked: 'bt_live_9f83a...91a2',
    environment: 'PRODUCTION',
    created: '2026-01-15',
    lastUsed: '2 seconds ago',
    rateLimit: '10,000 req/min',
    status: 'ACTIVE'
  },
  {
    id: 'KEY-02',
    name: 'Staging Integration Cluster',
    keyMasked: 'bt_stg_4a71b...88f4',
    environment: 'STAGING',
    created: '2026-03-10',
    lastUsed: '15 minutes ago',
    rateLimit: '2,500 req/min',
    status: 'ACTIVE'
  },
  {
    id: 'KEY-03',
    name: 'Legacy Mobile SDK Token',
    keyMasked: 'bt_dev_11c0e...00d1',
    environment: 'DEVELOPMENT',
    created: '2025-11-01',
    lastUsed: '3 days ago',
    rateLimit: '500 req/min',
    status: 'REVOKED'
  }
];

export const MOCK_API_ENDPOINTS: ApiEndpoint[] = [
  {
    method: 'POST',
    path: '/api/v1/authenticate',
    description: 'Initial login & biometric identity assertion.',
    requestBody: `{\n  "email": "user@biotrust.io",\n  "passwordHash": "sha256:...",\n  "biometricPayload": {\n    "faceFeatureVector": [...],\n    "livenessScore": 0.99\n  }\n}`,
    responseBody: `{\n  "authenticated": true,\n  "sessionId": "SES-92831",\n  "jwt": "eyJhbGciOi...",\n  "identityConfidence": 98.7,\n  "riskScore": 12,\n  "status": "trusted"\n}`,
    rateLimit: '1,000 / min'
  },
  {
    method: 'POST',
    path: '/api/v1/biometric/verify',
    description: 'Verify specific biometric sample (Face, Voice, Fingerprint, Behavior).',
    requestBody: `{\n  "sessionId": "SES-92831",\n  "modality": "FACE",\n  "sampleData": "base64:..."\n}`,
    responseBody: `{\n  "verified": true,\n  "modalityConfidence": 98.4,\n  "livenessDetected": true,\n  "templateMatchHash": "e3b0c442..."\n}`,
    rateLimit: '500 / min'
  },
  {
    method: 'POST',
    path: '/api/v1/session/verify',
    description: 'Continuously verify active session heartbeat telemetry.',
    requestBody: `{\n  "sessionId": "SES-92831",\n  "keystrokeDynamics": { "dwellAvg": 74, "flightAvg": 110 },\n  "mouseVelocity": 420,\n  "deviceToken": "attest:..."\n}`,
    responseBody: `{\n  "sessionId": "SES-92831",\n  "continuousVerification": "PASSED",\n  "identityConfidence": 98.7,\n  "riskScore": 12,\n  "actionRequired": "NONE"\n}`,
    rateLimit: '5,000 / min'
  },
  {
    method: 'GET',
    path: '/api/v1/risk/{sessionId}',
    description: 'Retrieve real-time risk score breakdown for an active session.',
    responseBody: `{\n  "sessionId": "SES-92831",\n  "riskScore": 18,\n  "riskLevel": "LOW",\n  "factors": {\n    "deviceTrust": 98,\n    "networkReputation": 95,\n    "locationAnomaly": 0,\n    "biometricConfidence": 98.7\n  }\n}`,
    rateLimit: '2,000 / min'
  },
  {
    method: 'POST',
    path: '/api/v1/session/reauthenticate',
    description: 'Trigger step-up biometric re-authentication for suspicious active session.',
    requestBody: `{\n  "sessionId": "SES-77312",\n  "reason": "BEHAVIORAL_ANOMALY"\n}`,
    responseBody: `{\n  "challengeIssued": true,\n  "challengeId": "CHG-9901",\n  "requiredModalities": ["FACE", "VOICE"]\n}`,
    rateLimit: '100 / min'
  },
  {
    method: 'POST',
    path: '/api/v1/session/revoke',
    description: 'Immediately terminate and invalidate session token across API gateways.',
    requestBody: `{\n  "sessionId": "SES-50912",\n  "reason": "CRITICAL_RISK_EXCEEDED"\n}`,
    responseBody: `{\n  "sessionId": "SES-50912",\n  "revoked": true,\n  "timestamp": "2026-10-06T20:14:00Z"\n}`,
    rateLimit: '100 / min'
  }
];

export const ANALYTICS_SERIES = {
  '24h': [
    { time: '00:00', requests: 120000, confidence: 98.2, riskAvg: 14, threats: 2 },
    { time: '04:00', requests: 95000, confidence: 97.9, riskAvg: 16, threats: 1 },
    { time: '08:00', requests: 280000, confidence: 98.5, riskAvg: 12, threats: 4 },
    { time: '12:00', requests: 410000, confidence: 97.4, riskAvg: 19, threats: 8 },
    { time: '16:00', requests: 380000, confidence: 98.0, riskAvg: 15, threats: 5 },
    { time: '20:00', requests: 290000, confidence: 97.8, riskAvg: 18, threats: 3 },
  ],
  '7d': [
    { time: 'Mon', requests: 2400000, confidence: 98.1, riskAvg: 15, threats: 28 },
    { time: 'Tue', requests: 2800000, confidence: 97.8, riskAvg: 17, threats: 37 },
    { time: 'Wed', requests: 2650000, confidence: 98.4, riskAvg: 13, threats: 19 },
    { time: 'Thu', requests: 2900000, confidence: 97.5, riskAvg: 19, threats: 42 },
    { time: 'Fri', requests: 3100000, confidence: 98.0, riskAvg: 14, threats: 31 },
    { time: 'Sat', requests: 1800000, confidence: 98.7, riskAvg: 11, threats: 12 },
    { time: 'Sun', requests: 1500000, confidence: 98.9, riskAvg: 10, threats: 9 },
  ],
  '30d': [
    { time: 'Week 1', requests: 18400000, confidence: 97.9, riskAvg: 16, threats: 140 },
    { time: 'Week 2', requests: 19200000, confidence: 98.2, riskAvg: 14, threats: 122 },
    { time: 'Week 3', requests: 20100000, confidence: 97.7, riskAvg: 18, threats: 168 },
    { time: 'Week 4', requests: 17800000, confidence: 98.5, riskAvg: 12, threats: 95 },
  ]
};
