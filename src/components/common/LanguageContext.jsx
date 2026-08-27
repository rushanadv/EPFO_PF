// src/components/common/LanguageContext.jsx
import React, { useState } from 'react';
import { TRANSLATIONS } from '../../data/translations';
import { LanguageContext } from './contextDefinition';

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState('en');

  const t = (key) => {
    if (TRANSLATIONS[language] && TRANSLATIONS[language][key]) {
      return TRANSLATIONS[language][key];
    }
    return TRANSLATIONS['en'][key] || key;
  };

  const isHindi = language === 'hi';

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, isHindi }}>
      {children}
    </LanguageContext.Provider>
  );
}
