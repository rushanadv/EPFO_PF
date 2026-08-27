// src/components/Header.jsx
import React, { useState } from 'react';
import { 
  ShieldCheck, 
  HelpCircle, 
  FileSearch, 
  User, 
  ChevronDown, 
  CheckCircle2, 
  AlertTriangle
} from 'lucide-react';
import { useLanguage } from './common/useLanguage';
import { DEMO_PRESETS } from '../data/mockUser';

export function Header({ activeScreen, setActiveScreen, currentUser, onSelectPreset }) {
  const { language, setLanguage, isHindi } = useLanguage();
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);

  const navTabs = [
    {
      id: 'screen1',
      label: 'Check Before Submit',
      label_hi: 'जमा करने से पहले जांचें',
      icon: ShieldCheck,
      badge: isHindi ? 'अस्वीकृति रोकें' : 'Prevent Rejection'
    },
    {
      id: 'screen2',
      label: "What's My Status?",
      label_hi: 'मेरी स्थिति क्या है?',
      icon: FileSearch,
      badge: isHindi ? 'सरल अनुवाद' : 'Plain Translation'
    },
    {
      id: 'screen3',
      label: 'Help Me Get Unstuck',
      label_hi: 'मुझे मदद चाहिए',
      icon: HelpCircle,
      badge: isHindi ? 'शिकायत व समाधान' : 'Grievance & Ladder'
    }
  ];

  return (
    <header className="bg-[#003399] text-white shadow-md select-none sticky top-0 z-40">
      {/* Topmost National Bar */}
      <div className="bg-[#001f6b] text-[11px] text-blue-100 py-1 px-4 border-b border-blue-900/50">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="font-semibold tracking-wide flex items-center gap-1.5 text-slate-200">
              <span className="inline-block w-2.5 h-2.5 rounded-full bg-[#F97316]"></span>
              {isHindi ? 'भारत सरकार | श्रम एवं रोजगार मंत्रालय' : 'GOVERNMENT OF INDIA • MINISTRY OF LABOUR & EMPLOYMENT'}
            </span>
          </div>

          <div className="flex items-center gap-4">
            {/* Quick Demo Preset Switcher */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                className="flex items-center gap-1.5 bg-blue-950/80 hover:bg-blue-900 px-2.5 py-0.5 rounded border border-blue-700/60 text-[11px] text-blue-100 transition cursor-pointer"
              >
                <User className="w-3 h-3 text-[#F97316]" />
                <span className="truncate max-w-[130px] sm:max-w-none font-medium">
                  {currentUser.name} (UAN: {currentUser.uan.slice(0, 4)}...)
                </span>
                <ChevronDown className="w-3 h-3 text-blue-300" />
              </button>

              {profileDropdownOpen && (
                <div 
                  className="absolute right-0 mt-1 w-72 bg-white text-slate-900 rounded-lg shadow-xl border border-slate-200 py-1.5 z-50 text-xs"
                  onMouseLeave={() => setProfileDropdownOpen(false)}
                >
                  <div className="px-3 py-1.5 border-b border-slate-100 text-[11px] font-semibold text-slate-500 uppercase tracking-wider flex items-center justify-between">
                    <span>{isHindi ? 'डेमो टेस्ट प्रोफाइल चुनें' : 'Switch Test Scenario'}</span>
                    <span className="text-[10px] bg-blue-50 text-blue-700 px-1.5 py-0.5 rounded">Mock</span>
                  </div>
                  {DEMO_PRESETS.map((preset) => (
                    <button
                      key={preset.id}
                      onClick={() => {
                        onSelectPreset(preset.data);
                        setProfileDropdownOpen(false);
                      }}
                      className={`w-full text-left px-3 py-2 hover:bg-blue-50 flex items-start gap-2 transition cursor-pointer ${
                        currentUser.uan === preset.data.uan ? 'bg-blue-50/70 font-semibold text-[#003399]' : ''
                      }`}
                    >
                      <div className="mt-0.5">
                        {preset.id.includes('clear') ? (
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                        ) : (
                          <AlertTriangle className="w-3.5 h-3.5 text-[#F97316]" />
                        )}
                      </div>
                      <div>
                        <div className="text-slate-800 leading-snug">{preset.label}</div>
                        <div className="text-[10px] text-slate-500 mt-0.5">
                          EPF: ₹{(preset.data.epfBalance / 1000).toFixed(0)}k • {preset.data.serviceYears} yrs service
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Language Switcher */}
            <div className="flex items-center bg-blue-950/70 rounded p-0.5 border border-blue-800">
              <button
                type="button"
                onClick={() => setLanguage('en')}
                className={`px-2 py-0.5 text-[11px] font-semibold rounded transition cursor-pointer ${
                  language === 'en' ? 'bg-[#F97316] text-white' : 'text-blue-200 hover:text-white'
                }`}
              >
                EN
              </button>
              <button
                type="button"
                onClick={() => setLanguage('hi')}
                className={`px-2 py-0.5 text-[11px] font-semibold rounded transition cursor-pointer ${
                  language === 'hi' ? 'bg-[#F97316] text-white' : 'text-blue-200 hover:text-white'
                }`}
              >
                हिं
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Official Header Brand */}
      <div className="max-w-6xl mx-auto px-4 py-3.5 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
        <div className="flex items-center gap-3.5">
          {/* Ashoka Chakra & EPFO Emblem Logo Motif */}
          <div className="relative flex-shrink-0">
            <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center p-1 shadow-md border-2 border-amber-400">
              <svg viewBox="0 0 100 100" className="w-full h-full text-[#003399]" fill="currentColor">
                <circle cx="50" cy="50" r="46" fill="#003399" />
                <circle cx="50" cy="50" r="38" fill="#ffffff" />
                <circle cx="50" cy="50" r="32" fill="#003399" />
                <circle cx="50" cy="50" r="8" fill="#F97316" />
                {[0, 15, 30, 45, 60, 75, 90, 105, 120, 135, 150, 165, 180, 195, 210, 225, 240, 255, 270, 285, 300, 315, 330, 345].map((deg) => (
                  <line
                    key={deg}
                    x1="50"
                    y1="50"
                    x2={50 + 24 * Math.cos((deg * Math.PI) / 180)}
                    y2={50 + 24 * Math.sin((deg * Math.PI) / 180)}
                    stroke="#ffffff"
                    strokeWidth="1.5"
                  />
                ))}
              </svg>
            </div>
            <span className="absolute -bottom-1 -right-1 bg-[#F97316] text-[9px] font-bold px-1 rounded text-white shadow-xs">
              2.0
            </span>
          </div>

          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white leading-tight">
                {isHindi ? 'कर्मचारी भविष्य निधि संगठन' : "Employees' Provident Fund Organisation"}
              </h1>
              <span className="hidden sm:inline-block bg-[#F97316] text-white text-[10px] uppercase font-extrabold px-2 py-0.5 rounded-full tracking-wider shadow-xs">
                PF Saathi
              </span>
            </div>
            <p className="text-xs text-blue-100 font-normal mt-0.5">
              {isHindi
                ? 'श्रम एवं रोजगार मंत्रालय, भारत सरकार • नागरिक सेवा साथी'
                : 'Ministry of Labour & Employment, Govt of India • Next-Gen Member Portal'}
            </p>
          </div>
        </div>

        {/* Member Financial Overview Pill (Desktop) */}
        <div className="hidden lg:flex items-center gap-3 bg-white/10 backdrop-blur-xs border border-white/15 px-3.5 py-1.5 rounded-lg text-xs">
          <div>
            <div className="text-[10px] text-blue-200 uppercase font-semibold">
              {isHindi ? 'सदस्य नाम' : 'Member'}
            </div>
            <div className="font-bold text-white truncate max-w-[120px]">{currentUser.name}</div>
          </div>
          <div className="h-6 w-px bg-white/20"></div>
          <div>
            <div className="text-[10px] text-blue-200 uppercase font-semibold">
              {isHindi ? 'EPF शेष' : 'EPF Balance'}
            </div>
            <div className="font-bold text-emerald-300">
              ₹{currentUser.epfBalance.toLocaleString('en-IN')}
            </div>
          </div>
          <div className="h-6 w-px bg-white/20"></div>
          <div>
            <div className="text-[10px] text-blue-200 uppercase font-semibold">
              {isHindi ? 'EPS पेंशन' : 'EPS Balance'}
            </div>
            <div className="font-bold text-amber-300">
              ₹{currentUser.epsBalance.toLocaleString('en-IN')}
            </div>
          </div>
        </div>
      </div>

      {/* Nav Tab Bar */}
      <div className="bg-[#1a4d8f] border-t border-blue-800/80 px-2 sm:px-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between sm:justify-start gap-1 sm:gap-4 overflow-x-auto">
          {navTabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeScreen === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveScreen(tab.id)}
                className={`flex items-center gap-2 py-3 px-3 sm:px-5 font-semibold text-xs sm:text-sm transition-all border-b-[3px] whitespace-nowrap relative cursor-pointer ${
                  isActive
                    ? 'border-[#F97316] text-white bg-white/10'
                    : 'border-transparent text-blue-100 hover:text-white hover:bg-white/5'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-[#F97316]' : 'text-blue-200'}`} />
                <span>{isHindi ? tab.label_hi : tab.label}</span>
                {isActive && (
                  <span className="hidden md:inline-block text-[10px] font-normal bg-[#F97316]/30 text-orange-200 px-1.5 py-0.2 rounded ml-1">
                    {tab.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </header>
  );
}
