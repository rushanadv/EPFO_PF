// src/App.jsx
import React from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { LanguageProvider } from './context/LanguageContext';
import { MemberProvider } from './context/MemberContext';
import GlobalHeader from './components/layout/GlobalHeader';
import Sidebar from './components/layout/Sidebar';
import Footer from './components/layout/Footer';
import PersonaSwitcher from './components/shared/PersonaSwitcher';

// Pages
import LandingPage from './pages/LandingPage';
import Dashboard from './pages/Dashboard';
import KYCPage from './pages/KYCPage';
import Profile from './pages/Profile';
import MarkExit from './pages/MarkExit';
import FileClaim from './pages/FileClaim';
import Transfer from './pages/Transfer';
import TrackClaim from './pages/TrackClaim';
import ENomination from './pages/ENomination';
import Passbook from './pages/Passbook';
import LoginDiagnostic from './pages/LoginDiagnostic';
import EscalationLadder from './pages/EscalationLadder';

function PortalLayout({ children }) {
  const location = useLocation();
  const isLanding = location.pathname === '/';

  return (
    <div className="min-h-screen flex flex-col bg-[#F1F5F9] text-slate-900 font-sans">
      {/* Global 4-Strip Header */}
      <GlobalHeader />

      {/* Main App Container */}
      <div id="main-content" className="flex-1 max-w-7xl w-full mx-auto px-3 sm:px-4 py-6">
        {isLanding ? (
          /* Full Width for Pre-Login Landing Page */
          <main className="w-full">
            {children}
          </main>
        ) : (
          /* Standard 75% Main Content + 25% Sidebar for Logged-In Portal */
          <div className="flex flex-col lg:flex-row gap-6 items-start">
            <main className="flex-1 min-w-0 w-full">
              {children}
            </main>
            <Sidebar />
          </div>
        )}
      </div>

      {/* Floating Demo Persona Switcher */}
      <PersonaSwitcher />

      {/* Government Footer */}
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <LanguageProvider>
        <MemberProvider>
          <PortalLayout>
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/manage/kyc" element={<KYCPage />} />
              <Route path="/manage/profile" element={<Profile />} />
              <Route path="/manage/mark-exit" element={<MarkExit />} />
              <Route path="/services/claim" element={<FileClaim />} />
              <Route path="/services/transfer" element={<Transfer />} />
              <Route path="/services/track" element={<TrackClaim />} />
              <Route path="/enomination" element={<ENomination />} />
              <Route path="/passbook" element={<Passbook />} />
              <Route path="/help/login-issues" element={<LoginDiagnostic />} />
              <Route path="/help/escalation" element={<EscalationLadder />} />
              {/* Catch-all fallback */}
              <Route path="*" element={<Dashboard />} />
            </Routes>
          </PortalLayout>
        </MemberProvider>
      </LanguageProvider>
    </BrowserRouter>
  );
}
