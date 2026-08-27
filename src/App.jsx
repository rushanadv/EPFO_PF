// src/App.jsx
import React, { useState } from 'react';
import { LanguageProvider } from './components/common/LanguageContext';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { PreCheckWizard } from './components/PreCheckWizard/PreCheckWizard';
import { StatusTranslator } from './components/StatusTranslator/StatusTranslator';
import { GetUnstuck } from './components/GetUnstuck/GetUnstuck';
import { MOCK_USER } from './data/mockUser';

function App() {
  const [activeScreen, setActiveScreen] = useState('screen1'); // 'screen1' | 'screen2' | 'screen3'
  const [currentUser, setCurrentUser] = useState(MOCK_USER);
  const [unstuckInitialTab, setUnstuckInitialTab] = useState('login');

  const handleSelectPreset = (newUserData) => {
    setCurrentUser(newUserData);
  };

  const handleNavigateToScreen = (screenId) => {
    setActiveScreen(screenId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectGrievance = () => {
    setUnstuckInitialTab('escalation');
  };

  return (
    <LanguageProvider>
      <div className="min-h-screen flex flex-col bg-[#F1F5F9] text-[#0F172A] selection:bg-[#003399] selection:text-white font-sans">
        {/* Persistent Official Header & Nav */}
        <Header
          activeScreen={activeScreen}
          setActiveScreen={setActiveScreen}
          currentUser={currentUser}
          onSelectPreset={handleSelectPreset}
        />

        {/* Main Content Area */}
        <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 py-6">
          {activeScreen === 'screen1' && (
            <PreCheckWizard
              currentUser={currentUser}
              onNavigateToStatus={() => handleNavigateToScreen('screen2')}
            />
          )}

          {activeScreen === 'screen2' && (
            <StatusTranslator
              currentUser={currentUser}
              onNavigateToScreen={handleNavigateToScreen}
              onSelectGrievance={handleSelectGrievance}
            />
          )}

          {activeScreen === 'screen3' && (
            <GetUnstuck
              currentUser={currentUser}
              onNavigateToScreen={handleNavigateToScreen}
              initialTab={unstuckInitialTab}
            />
          )}
        </main>

        {/* Persistent Official Footer */}
        <Footer />
      </div>
    </LanguageProvider>
  );
}

export default App;
