// src/context/useLanguage.js
import { useContext } from 'react';
import { LanguageContext } from './LanguageContextDefinition';

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
