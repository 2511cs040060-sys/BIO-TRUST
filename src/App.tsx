import React, { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { SecurityProvider } from './context/SecurityContext';
import { Sidebar } from './components/layout/Sidebar';
import { Header } from './components/layout/Header';
import { AttackSimulationModal } from './components/simulation/AttackSimulationModal';
import { MobileAuthenticatorModal } from './components/mobile/MobileAuthenticatorModal';

import { LandingPage } from './pages/LandingPage';
import { LoginPage } from './pages/LoginPage';
import { DashboardPage } from './pages/DashboardPage';
import { ContinuousAuthPage } from './pages/ContinuousAuthPage';
import { BiometricsPage } from './pages/BiometricsPage';
import { RiskEnginePage } from './pages/RiskEnginePage';
import { PoliciesPage } from './pages/PoliciesPage';
import { UsersPage } from './pages/UsersPage';
import { DevicesPage } from './pages/DevicesPage';
import { ThreatsPage } from './pages/ThreatsPage';
import { SessionMapPage } from './pages/SessionMapPage';
import { ApiManagementPage } from './pages/ApiManagementPage';
import { AuditLogsPage } from './pages/AuditLogsPage';
import { AnalyticsPage } from './pages/AnalyticsPage';
import { ArchitecturePage } from './pages/ArchitecturePage';
import { AuthFlowPage } from './pages/AuthFlowPage';
import { PrivacySecurityPage } from './pages/PrivacySecurityPage';
import { DocsPage } from './pages/DocsPage';
import { SettingsPage } from './pages/SettingsPage';

const AppLayout: React.FC<{
  openSimulationModal: () => void;
  openMobileModal: () => void;
}> = ({ openSimulationModal, openMobileModal }) => {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#05070E] flex">
      <Sidebar mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} />

      <div className="flex-1 flex flex-col min-w-0 lg:pl-64">
        <Header
          setMobileOpen={setMobileOpen}
          openSimulationModal={openSimulationModal}
          openMobileModal={openMobileModal}
        />

        <main className="flex-1 p-4 md:p-6 lg:p-8 max-w-7xl w-full mx-auto space-y-6">
          <Routes>
            <Route path="dashboard" element={<DashboardPage openSimulationModal={openSimulationModal} />} />
            <Route path="continuous-auth" element={<ContinuousAuthPage />} />
            <Route path="biometrics" element={<BiometricsPage />} />
            <Route path="risk-engine" element={<RiskEnginePage />} />
            <Route path="policies" element={<PoliciesPage />} />
            <Route path="users" element={<UsersPage />} />
            <Route path="devices" element={<DevicesPage />} />
            <Route path="threats" element={<ThreatsPage />} />
            <Route path="session-map" element={<SessionMapPage />} />
            <Route path="api-keys" element={<ApiManagementPage />} />
            <Route path="audit-logs" element={<AuditLogsPage />} />
            <Route path="analytics" element={<AnalyticsPage />} />
            <Route path="architecture" element={<ArchitecturePage />} />
            <Route path="auth-flow" element={<AuthFlowPage />} />
            <Route path="privacy-security" element={<PrivacySecurityPage />} />
            <Route path="docs" element={<DocsPage />} />
            <Route path="settings" element={<SettingsPage />} />
            <Route path="*" element={<Navigate to="dashboard" replace />} />
          </Routes>
        </main>
      </div>
    </div>
  );
};

export const App: React.FC = () => {
  const [simulationModalOpen, setSimulationModalOpen] = useState(false);
  const [mobileModalOpen, setMobileModalOpen] = useState(false);

  return (
    <SecurityProvider>
      <Routes>
        <Route path="/" element={<LandingPage openSimulationModal={() => setSimulationModalOpen(true)} />} />
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/app/*"
          element={
            <AppLayout
              openSimulationModal={() => setSimulationModalOpen(true)}
              openMobileModal={() => setMobileModalOpen(true)}
            />
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>

      <AttackSimulationModal
        isOpen={simulationModalOpen}
        onClose={() => setSimulationModalOpen(false)}
      />

      <MobileAuthenticatorModal
        isOpen={mobileModalOpen}
        onClose={() => setMobileModalOpen(false)}
      />
    </SecurityProvider>
  );
};

export default App;
