// src/components/layout/GovTopBar.jsx
import React from 'react';
import { useLanguage } from '../../context/useLanguage';

export default function GovTopBar() {
  const { language, toggleLanguage, isHindi, fontScale, setFontScale, t } = useLanguage();

  return (
    <div className="bg-black text-white text-[11px] py-1 px-4 border-b border-neutral-800">
      <div className="max-w-7xl mx-auto flex flex-wrap justify-between items-center gap-2">
        {/* Left: Gov emblem & title */}
        <div className="flex items-center gap-2">
          <span className="text-sm select-none">🇮🇳</span>
          <span className="font-medium text-slate-200">
            {t('govIndia')}
          </span>
          <span className="text-neutral-600 hidden sm:inline">|</span>
          <span className="text-neutral-300 hidden sm:inline">
            {t('org_ministry')}
          </span>
          <span className="text-neutral-600 hidden md:inline">|</span>
          <a
            href="#main-content"
            className="text-neutral-400 hover:text-white transition-colors underline hidden md:inline"
          >
            {t('skipToMain')}
          </a>
        </div>

        {/* Right: Font sizing & Language toggle */}
        <div className="flex items-center gap-3">
          {/* Font Sizing Controls */}
          <div className="flex items-center gap-1.5 border-r border-neutral-700 pr-3">
            <span className="text-neutral-400 mr-1 text-[10px]">Font:</span>
            <button
              type="button"
              onClick={() => setFontScale('small')}
              className={`px-1.5 py-0.5 rounded text-[10px] cursor-pointer ${
                fontScale === 'small' ? 'bg-white text-black font-bold' : 'text-neutral-400 hover:text-white'
              }`}
              title="Small text"
            >
              A-
            </button>
            <button
              type="button"
              onClick={() => setFontScale('normal')}
              className={`px-1.5 py-0.5 rounded text-xs cursor-pointer ${
                fontScale === 'normal' ? 'bg-white text-black font-bold' : 'text-neutral-300 hover:text-white font-medium'
              }`}
              title="Normal text"
            >
              A
            </button>
            <button
              type="button"
              onClick={() => setFontScale('large')}
              className={`px-1.5 py-0.5 rounded text-sm cursor-pointer ${
                fontScale === 'large' ? 'bg-white text-black font-bold' : 'text-neutral-400 hover:text-white'
              }`}
              title="Large text"
            >
              A+
            </button>
          </div>

          {/* Language Toggle Button */}
          <button
            type="button"
            onClick={toggleLanguage}
            className="flex items-center gap-1.5 bg-neutral-800 hover:bg-neutral-700 text-yellow-300 font-bold px-2.5 py-0.5 rounded border border-neutral-600 transition-colors cursor-pointer"
            title="Toggle Hindi / English"
          >
            <span className="text-xs">{isHindi ? 'English' : 'हिंदी'}</span>
            <span className="text-[10px] bg-yellow-400/20 text-yellow-200 px-1 rounded uppercase">
              {language}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
