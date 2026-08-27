// src/components/common/useLanguage.js
import { useContext } from 'react';
import { LanguageContext } from './contextDefinition';

export function useLanguage() {
  return useContext(LanguageContext);
}
