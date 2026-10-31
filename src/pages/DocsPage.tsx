import React, { useState } from 'react';
import {
  BookOpen,
  Code2,
  Copy,
  Check,
  Terminal,
  Shield,
  Zap,
  Globe,
  Key,
  Layers,
  Search
} from 'lucide-react';

export const DocsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'js' | 'python' | 'curl'>('js');
  const [copied, setCopied] = useState(false);
  const [activeSection, setActiveSection] = useState('intro');

  const docSections = [
    { id: 'intro', title: '1. Introduction' },
    { id: 'auth', title: '2. Authentication' },
    { id: 'apikeys', title: '3. API Keys & Authorization' },
    { id: 'biometric', title: '4. Biometric Verification API' },
    { id: 'continuous', title: '5. Continuous Session Stream' },
    { id: 'risk', title: '6. Risk Scoring Engine' },
    { id: 'sessions', title: '7. Session Control & Revocation' },
    { id: 'webhooks', title: '8. SOC Webhooks & Events' },
    { id: 'errors', title: '9. Error Codes Reference' },
    { id: 'sdks', title: '10. SDK Libraries (Node / Python)' },
  ];

  const codeSnippets = {
    js: `// BioTrust Cloud Node.js / JavaScript SDK
import { BioTrustClient } from '@biotrust/sdk';

const biotrust = new BioTrustClient({
  apiKey: process.env.BIOTRUST_API_KEY,
  environment: 'production'
});

// Continuously verify an active session heartbeat
async function verifyActiveSession(sessionId, telemetryData) {
  const response = await biotrust.session.verify({
    sessionId: sessionId,
    telemetry: {
      keystrokeDynamics: { dwellMs: 74, flightMs: 112 },
      mouseVelocity: 420
    }
  });

  console.log("Identity Confidence:", response.identityConfidence);
  console.log("Risk Score:", response.riskScore);
  
  if (response.riskScore > 80) {
    await biotrust.session.revoke(sessionId, "HIGH_RISK_EXCEEDED");
  }
}`,
    python: `# BioTrust Cloud Python SDK Example
from biotrust import BioTrustClient

client = BioTrustClient(api_key="bt_live_9f83a...91a2")

# Verify continuous session telemetry
response = client.session.verify(
    session_id="SES-92831",
    biometric_telemetry={
        "keystroke_dwell_avg": 74,
        "mouse_velocity": 420
    }
)

print(f"Confidence: {response.identity_confidence}%")
print(f"Risk Score: {response.risk_score}")

if response.risk_score > 60:
    client.session.reauthenticate(session_id="SES-92831")`,
    curl: `# cURL Command Line Request
curl -X POST https://api.biotrust.cloud/v1/session/verify \\
  -H "Authorization: Bearer bt_live_9f83a...91a2" \\
  -H "Content-Type: application/json" \\
  -d '{
    "sessionId": "SES-92831",
    "keystrokeDynamics": { "dwellAvg": 74, "flightAvg": 110 },
    "mouseVelocity": 420
  }'`
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(codeSnippets[activeTab]);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="font-mono text-2xl font-bold text-white tracking-wide flex items-center gap-2">
          <BookOpen className="w-6 h-6 text-neon-cyan" />
          Developer Documentation & Integration Guide
        </h1>
        <p className="text-xs text-slate-400 mt-1 font-mono">
          REST API reference, SDK quickstarts, and code examples in JavaScript, Python, and cURL
        </p>
      </div>

      {/* Main Docs Split View */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Docs Navigation Sidebar */}
        <div className="glass-panel p-4 border border-slate-800 space-y-1 font-mono text-xs">
          <div className="text-[10px] text-slate-500 uppercase px-2 mb-2 font-bold">DOCUMENTATION SECTIONS</div>
          {docSections.map((sec) => (
            <button
              key={sec.id}
              onClick={() => setActiveSection(sec.id)}
              className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
                activeSection === sec.id
                  ? 'bg-neon-cyan/15 text-neon-cyan border border-neon-cyan/30 font-bold'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
              }`}
            >
              {sec.title}
            </button>
          ))}
        </div>

        {/* Documentation Content Area */}
        <div className="lg:col-span-3 space-y-6">
          {/* Code Snippets Section */}
          <div className="glass-panel p-6 border border-slate-800 bg-[#070A12] space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-3">
              <h2 className="font-mono text-base font-bold text-white flex items-center gap-2">
                <Code2 className="w-5 h-5 text-neon-cyan" />
                Continuous Auth Verification Code Example
              </h2>

              {/* Language Switcher Tabs */}
              <div className="flex items-center gap-1 font-mono text-xs">
                <button
                  onClick={() => setActiveTab('js')}
                  className={`px-3 py-1 rounded transition-colors ${
                    activeTab === 'js' ? 'bg-neon-cyan text-slate-950 font-bold' : 'bg-slate-800 text-slate-300'
                  }`}
                >
                  JavaScript
                </button>
                <button
                  onClick={() => setActiveTab('python')}
                  className={`px-3 py-1 rounded transition-colors ${
                    activeTab === 'python' ? 'bg-neon-cyan text-slate-950 font-bold' : 'bg-slate-800 text-slate-300'
                  }`}
                >
                  Python
                </button>
                <button
                  onClick={() => setActiveTab('curl')}
                  className={`px-3 py-1 rounded transition-colors ${
                    activeTab === 'curl' ? 'bg-neon-cyan text-slate-950 font-bold' : 'bg-slate-800 text-slate-300'
                  }`}
                >
                  cURL
                </button>
              </div>
            </div>

            {/* Code Block Container */}
            <div className="relative">
              <button
                onClick={handleCopy}
                className="absolute right-3 top-3 px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-mono flex items-center gap-1 border border-slate-700 z-10"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied!' : 'Copy Code'}</span>
              </button>

              <pre className="p-4 rounded-xl bg-[#090D16] border border-slate-800 text-cyan-300 font-mono text-xs overflow-x-auto leading-relaxed">
                {codeSnippets[activeTab]}
              </pre>
            </div>
          </div>

          {/* Section Explanations */}
          <div className="glass-panel p-6 border border-slate-800 space-y-4 font-mono text-xs text-slate-300">
            <h3 className="text-base font-bold text-white">Overview & Integration Workflow</h3>
            <p className="leading-relaxed text-slate-400">
              The BioTrust Cloud API enables applications to continuously evaluate user identity without forcing repetitive login prompts. By sending periodic telemetry signals (keystroke timing, mouse velocity, WebAuthn attestations), your app receives instantaneous risk scores and step-up auth directives.
            </p>

            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
              <div className="font-bold text-neon-cyan">Base API Endpoint URI:</div>
              <code className="text-white bg-slate-950 px-2 py-1 rounded border border-slate-800 block w-fit">
                https://api.biotrust.cloud/v1
              </code>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
