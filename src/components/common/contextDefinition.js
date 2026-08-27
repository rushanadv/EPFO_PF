// src/components/common/contextDefinition.js
import { createContext } from 'react';

export const LanguageContext = createContext({
  language: 'en',
  setLanguage: () => {},
  t: () => '',
  isHindi: false
});
