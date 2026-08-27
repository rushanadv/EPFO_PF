// src/context/useMember.js
import { useContext } from 'react';
import { MemberContext } from './MemberContextDefinition';

export function useMember() {
  const context = useContext(MemberContext);
  if (!context) {
    throw new Error('useMember must be used within a MemberProvider');
  }
  return context;
}
