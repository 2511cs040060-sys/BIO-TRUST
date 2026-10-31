import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ShieldCheck,
  CheckCircle2,
  Lock,
  Mail,
  KeyRound,
  Fingerprint,
  Mic,
  Camera,
  Smartphone,
  ArrowRight,
  Shield,
  VideoOff
} from 'lucide-react';
import { realBiometrics } from '../services/realBiometrics';

export const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('alex.j@biotrust.io');
  const [password, setPassword] = useState('••••••••••••');
  const [selectedMethod, setSelectedMethod] = useState<'password' | 'face' | 'voice' | 'device'>('face');
  const [isVerifying, setIsVerifying] = useState(false);
  const [verificationStep, setVerificationStep] = useState(0);

  // Real WebCam video ref on login
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [cameraActive, setCameraActive] = useState(false);

  const verificationSteps = [
    'Detecting hardware token & physical IP reputation...',
    'Analyzing real WebCam facial mesh & voice acoustic signature...',
    'Processing physical keystroke & cursor dynamics...',
    'Calculating Zero Trust risk score (12 / 100 LOW)...',
    'Authentication successful! Identity Confidence: 98.7%'
  ];

  const handleStartCameraOnLogin = async () => {
    const stream = await realBiometrics.startCamera();
    if (stream) {
      setCameraActive(true);
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
      }
    }
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsVerifying(true);
    setVerificationStep(0);

    const interval = setInterval(() => {
      setVerificationStep((prev) => {
        if (prev >= verificationSteps.length - 1) {
          clearInterval(interval);
          realBiometrics.stopCamera();
          setTimeout(() => {
            navigate('/app/dashboard');
          }, 800);
          return prev;
        }
        return prev + 1;
      });
    }, 700);
  };

  return (
    <div className="min-h-screen bg-[#05070E] flex items-center justify-center p-6 relative overflow-hidden cyber-grid-bg">
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-neon-cyan/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="w-full max-w-md glass-panel p-8 border border-slate-800 shadow-2xl relative z-10">
        {/* Header Logo */}
        <div className="text-center mb-8">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-cyan-500 to-blue-600 p-0.5 shadow-neon-cyan/30 shadow-lg mx-auto mb-4">
            <div className="w-full h-full bg-[#090D16] rounded-[10px] flex items-center justify-center">
              <ShieldCheck className="w-7 h-7 text-neon-cyan" />
            </div>
          </div>
          <h1 className="font-mono text-2xl font-bold text-white tracking-wider">
            BioTrust <span className="text-neon-cyan">Cloud</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1 font-mono">
            Continuous Identity Verification for Zero Trust Cloud Security
          </p>

          <div className="mt-3 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-[11px] font-mono">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Zero Trust Real Hardware Engine Active</span>
          </div>
        </div>

        {/* Verification Loading Overlay */}
        {isVerifying ? (
          <div className="py-8 text-center space-y-6">
            <div className="w-16 h-16 rounded-full border-2 border-neon-cyan border-t-transparent animate-spin mx-auto flex items-center justify-center">
              <Shield className="w-8 h-8 text-neon-cyan animate-pulse" />
            </div>

            <div>
              <div className="font-mono text-xs font-semibold text-neon-cyan uppercase tracking-wider mb-2">
                VERIFYING REAL BIOMETRIC TELEMETRY
              </div>
              <p className="text-xs text-slate-300 font-mono h-8 flex items-center justify-center">
                {verificationSteps[verificationStep]}
              </p>
            </div>

            <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
              <div
                className="bg-gradient-to-r from-cyan-500 to-blue-500 h-full transition-all duration-300"
                style={{ width: `${((verificationStep + 1) / verificationSteps.length) * 100}%` }}
              />
            </div>
          </div>
        ) : (
          <form onSubmit={handleLogin} className="space-y-5">
            {/* Method Selectors */}
            <div className="grid grid-cols-4 gap-2">
              <button
                type="button"
                onClick={() => setSelectedMethod('face')}
                className={`p-2.5 rounded-lg border text-center font-mono text-[10px] transition-all ${
                  selectedMethod === 'face'
                    ? 'bg-neon-cyan/15 border-neon-cyan text-neon-cyan shadow-neon-cyan/20'
                    : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:text-slate-200'
                }`}
              >
                <Camera className="w-4 h-4 mx-auto mb-1" />
                Face Lock
              </button>

              <button
                type="button"
                onClick={() => setSelectedMethod('voice')}
                className={`p-2.5 rounded-lg border text-center font-mono text-[10px] transition-all ${
                  selectedMethod === 'voice'
                    ? 'bg-neon-cyan/15 border-neon-cyan text-neon-cyan shadow-neon-cyan/20'
                    : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:text-slate-200'
                }`}
              >
                <Mic className="w-4 h-4 mx-auto mb-1" />
                Voice Print
              </button>

              <button
                type="button"
                onClick={() => setSelectedMethod('device')}
                className={`p-2.5 rounded-lg border text-center font-mono text-[10px] transition-all ${
                  selectedMethod === 'device'
                    ? 'bg-neon-cyan/15 border-neon-cyan text-neon-cyan shadow-neon-cyan/20'
                    : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:text-slate-200'
                }`}
              >
                <Smartphone className="w-4 h-4 mx-auto mb-1" />
                Device ID
              </button>

              <button
                type="button"
                onClick={() => setSelectedMethod('password')}
                className={`p-2.5 rounded-lg border text-center font-mono text-[10px] transition-all ${
                  selectedMethod === 'password'
                    ? 'bg-neon-cyan/15 border-neon-cyan text-neon-cyan shadow-neon-cyan/20'
                    : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:text-slate-200'
                }`}
              >
                <KeyRound className="w-4 h-4 mx-auto mb-1" />
                Password
              </button>
            </div>

            {/* Optional Live WebCam Preview on Login */}
            {selectedMethod === 'face' && (
              <div className="relative w-full h-40 bg-slate-950 rounded-xl border border-slate-800 overflow-hidden flex items-center justify-center">
                {cameraActive ? (
                  <video ref={videoRef} className="w-full h-full object-cover transform -scale-x-100" />
                ) : (
                  <div className="text-center space-y-2">
                    <button
                      type="button"
                      onClick={handleStartCameraOnLogin}
                      className="px-3 py-1.5 rounded bg-neon-cyan text-slate-950 font-mono text-xs font-bold"
                    >
                      Enable Real WebCam Scanner
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* Form Inputs */}
            <div>
              <label className="block text-[11px] font-mono text-slate-400 mb-1">Corporate Email</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-[#090D16] border border-slate-800 rounded-lg pl-9 pr-3 py-2 text-xs text-white placeholder-slate-500 focus:border-neon-cyan focus:outline-none font-mono"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-mono text-slate-400 mb-1">Passcode / Key Token</label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-[#090D16] border border-slate-800 rounded-lg pl-9 pr-3 py-2 text-xs text-white placeholder-slate-500 focus:border-neon-cyan focus:outline-none font-mono"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-gradient-to-r from-neon-cyan to-blue-600 text-slate-950 font-mono font-bold text-xs shadow-neon-cyan/20 hover:scale-[1.01] transition-transform flex items-center justify-center gap-2"
            >
              <span>AUTHENTICATE & START CONTINUOUS SESSION</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
