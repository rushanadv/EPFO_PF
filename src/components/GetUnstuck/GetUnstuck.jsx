// src/components/GetUnstuck/GetUnstuck.jsx
import React, { useState } from 'react';
import { 
  KeyRound, 
  Building, 
  Repeat, 
  TrendingUp, 
  HelpCircle 
} from 'lucide-react';
import { LoginDiagnostic } from './LoginDiagnostic';
import { EmployerNotResponding } from './EmployerNotResponding';
import { TransferWizard } from './TransferWizard';
import { EscalationLadder } from './EscalationLadder';
import { useLanguage } from '../common/useLanguage';

export function GetUnstuck({ currentUser, onNavigateToScreen, initialTab = 'login' }) {
  const { isHindi } = useLanguage();
  const [activeTab, setActiveTab] = useState(initialTab); // 'login' | 'employer' | 'transfer' | 'escalation'

  const unstuckTabs = [
    {
      id: 'login',
      label: '1. Login Problems',
      label_hi: '1. लॉगिन समस्याएं',
      icon: KeyRound,
      desc: 'OTP & UAN errors'
    },
    {
      id: 'employer',
      label: '2. Employer Stuck',
      label_hi: '2. नियोक्ता असहयोग',
      icon: Building,
      desc: 'Exit date & DSC attestation'
    },
    {
      id: 'transfer',
      label: '3. PF Transfer',
      label_hi: '3. पीएफ ट्रांसफर',
      icon: Repeat,
      desc: 'Form 13 job shift guide'
    },
    {
      id: 'escalation',
      label: '4. Escalation Ladder',
      label_hi: '4. कानूनी समाधान सीढ़ी',
      icon: TrendingUp,
      desc: 'EPFiGMS, RTI & Courts'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-[#003399] to-[#002270] text-white rounded-xl px-6 py-5 shadow-xs flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <div className="p-2.5 bg-white/10 rounded-xl text-[#F97316]">
            <HelpCircle className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold">
              {isHindi ? 'समस्या निवारण एवं सहायता केंद्र (Get Unstuck)' : 'EPFO Resolution & Help Center (Get Unstuck)'}
            </h2>
            <p className="text-xs text-blue-100 mt-0.5">
              {isHindi
                ? 'लॉगिन रुकावटें, नियोक्ता की उदासीनता, ट्रांसफर और कानूनी शिकायतों का सीधा समाधान'
                : 'Actionable solutions for portal bugs, unresponsive HRs, multi-UAN transfers, and legal escalations.'}
            </p>
          </div>
        </div>
      </div>

      {/* 4 Tabs Bar (Side-by-side on desktop, wrapped on mobile) */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5">
        {unstuckTabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;

          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={`p-3.5 rounded-xl border text-left flex items-start gap-3 transition-all ${
                isActive
                  ? 'border-[#003399] bg-[#003399] text-white shadow-sm ring-2 ring-[#003399]/20'
                  : 'border-slate-200 bg-white hover:bg-slate-50 text-slate-800'
              }`}
            >
              <div
                className={`p-2 rounded-lg mt-0.5 ${
                  isActive ? 'bg-white/20 text-[#F97316]' : 'bg-slate-100 text-[#003399]'
                }`}
              >
                <Icon className="w-4 h-4" />
              </div>
              <div className="overflow-hidden">
                <div className="font-bold text-xs sm:text-sm truncate">
                  {isHindi ? tab.label_hi : tab.label}
                </div>
                <div className={`text-[11px] truncate mt-0.5 ${isActive ? 'text-blue-100' : 'text-slate-500'}`}>
                  {tab.desc}
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* Tab Content Components */}
      <div className="animate-in fade-in duration-150">
        {activeTab === 'login' && <LoginDiagnostic />}
        {activeTab === 'employer' && <EmployerNotResponding currentUser={currentUser} />}
        {activeTab === 'transfer' && (
          <TransferWizard
            currentUser={currentUser}
            onNavigateToScreen={onNavigateToScreen}
          />
        )}
        {activeTab === 'escalation' && <EscalationLadder currentUser={currentUser} />}
      </div>
    </div>
  );
}
