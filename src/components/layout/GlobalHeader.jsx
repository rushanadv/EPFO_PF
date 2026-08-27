// src/components/layout/GlobalHeader.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import GovTopBar from './GovTopBar';
import EPFOLogo from './EPFOLogo';
import MainNav from './MainNav';
import MarqueeBar from './MarqueeBar';
import { PhoneCall, Smartphone, HelpCircle } from 'lucide-react';
import { useLanguage } from '../../context/useLanguage';

export default function GlobalHeader() {
  const { language, setLanguage, isHindi, t } = useLanguage();

  return (
    <header className="sticky top-0 z-40 shadow-md">
      {/* Strip 1: Gov India Top Bar */}
      <GovTopBar />

      {/* Strip 2: EPFO Main Header (Dark Blue #001f6b) */}
      <div className="bg-[#001f6b] border-b border-blue-900 py-2 px-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3">
          {/* Logo & Org Brand */}
          <EPFOLogo />

          {/* Quick Header Badges / Helpline & Language Pill Toggle */}
          <div className="hidden md:flex items-center gap-3">
            {/* Bilingual Language Toggle Pill */}
            <div className="flex items-center bg-white/10 rounded-full p-0.5 border border-white/20">
              <button
                type="button"
                onClick={() => setLanguage('en')}
                className={`px-3 py-1 rounded-full text-xs font-bold transition-all cursor-pointer ${
                  language === 'en'
                    ? 'bg-white text-[#003399] shadow-xs'
                    : 'text-white hover:bg-white/10'
                }`}
              >
                EN
              </button>
              <button
                type="button"
                onClick={() => setLanguage('hi')}
                className={`px-3 py-1 rounded-full text-xs font-bold transition-all cursor-pointer font-hindi ${
                  language === 'hi'
                    ? 'bg-white text-[#003399] shadow-xs'
                    : 'text-white hover:bg-white/10'
                }`}
              >
                हिं
              </button>
            </div>

            {/* Helpline Pill */}
            <div className="flex items-center gap-2 bg-[#003399]/80 border border-blue-400/30 px-3 py-1.5 rounded-lg text-white">
              <PhoneCall className="w-4 h-4 text-[#F97316]" />
              <div>
                <div className="text-[10px] text-blue-200 uppercase font-semibold">{t('helpline_title')}</div>
                <div className="text-xs font-bold text-yellow-300">14470 / 1800-118-005</div>
              </div>
            </div>

            {/* UMANG App link */}
            <a
              href="https://web.umang.gov.in"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1.5 bg-white/10 hover:bg-white/20 text-white px-3 py-1.5 rounded-lg border border-white/20 text-xs font-semibold transition-colors"
            >
              <Smartphone className="w-4 h-4 text-green-400" />
              <span>{t('umang_app')}</span>
            </a>

            {/* Help desk link */}
            <Link
              to="/help/login-issues"
              className="flex items-center gap-1.5 bg-[#F97316] hover:bg-[#C2590F] text-white px-3 py-1.5 rounded-lg text-xs font-bold transition-colors shadow-xs"
            >
              <HelpCircle className="w-4 h-4" />
              <span>{isHindi ? 'मदद एवं गाइड' : 'Help & FAQ'}</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Strip 3: Main Nav Bar */}
      <MainNav />

      {/* Strip 4: Marquee Notice Bar */}
      <MarqueeBar />
    </header>
  );
}
