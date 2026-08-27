// src/context/LanguageContext.jsx
import React, { useState, useEffect } from 'react';
import { translations } from '../i18n/translations';
import { LABELS } from '../data/labels';
import { LanguageContext } from './LanguageContextDefinition';

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState(() => {
    return localStorage.getItem('pf_saathi_lang') || 'en';
  });

  const [fontScale, setFontScale] = useState(() => {
    return localStorage.getItem('pf_saathi_font_scale') || 'normal';
  });

  useEffect(() => {
    localStorage.setItem('pf_saathi_lang', language);
  }, [language]);

  useEffect(() => {
    localStorage.setItem('pf_saathi_font_scale', fontScale);
    document.body.classList.remove('text-scale-small', 'text-scale-normal', 'text-scale-large');
    document.body.classList.add(`text-scale-${fontScale}`);
  }, [fontScale]);

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === 'en' ? 'hi' : 'en'));
  };

  const t = (key) => {
    const currentDict = translations[language] || {};
    const fallbackDict = translations.en || {};
    const legacyDict = LABELS[language] || {};
    const legacyFallback = LABELS.en || {};

    return (
      currentDict[key] ||
      legacyDict[key] ||
      fallbackDict[key] ||
      legacyFallback[key] ||
      key
    );
  };

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage,
        toggleLanguage,
        isHindi: language === 'hi',
        t,
        fontScale,
        setFontScale
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
}
