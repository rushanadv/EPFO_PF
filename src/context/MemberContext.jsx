// src/context/MemberContext.jsx
import React, { useState, useEffect } from 'react';
import { DEFAULT_MEMBER, MEMBER_PRESETS } from '../data/mockMember';
import { MemberContext } from './MemberContextDefinition';
import { getDashboardAlerts } from './alertsGenerator';

export function MemberProvider({ children }) {
  const [selectedPresetId, setSelectedPresetId] = useState(() => {
    return localStorage.getItem('pf_saathi_preset_id') || 'ravi_mismatch';
  });

  const [member, setMember] = useState(() => {
    const saved = localStorage.getItem('pf_saathi_member_data');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Failed to parse saved member data', e);
      }
    }
    return DEFAULT_MEMBER;
  });

  const [claimWizardStep, setClaimWizardStep] = useState(() => {
    const savedStep = localStorage.getItem('pf_saathi_claim_step');
    return savedStep ? parseInt(savedStep, 10) : 1;
  });

  useEffect(() => {
    localStorage.setItem('pf_saathi_member_data', JSON.stringify(member));
    localStorage.setItem('pf_saathi_preset_id', selectedPresetId);
  }, [member, selectedPresetId]);

  useEffect(() => {
    localStorage.setItem('pf_saathi_claim_step', claimWizardStep.toString());
  }, [claimWizardStep]);

  const switchPreset = (presetId) => {
    const preset = MEMBER_PRESETS.find((p) => p.id === presetId);
    if (preset) {
      setSelectedPresetId(preset.id);
      setMember(JSON.parse(JSON.stringify(preset.data)));
      setClaimWizardStep(1);
    }
  };

  const updateExitDate = (date, reason) => {
    setMember((prev) => ({
      ...prev,
      doe: date,
      exitReason: reason
    }));
  };

  const updateKYC = (field, value) => {
    setMember((prev) => ({
      ...prev,
      kyc: {
        ...prev.kyc,
        [field]: value
      }
    }));
  };

  const alignNameWithAadhaar = () => {
    setMember((prev) => ({
      ...prev,
      kyc: {
        ...prev.kyc,
        nameOnEPFO: prev.kyc.nameOnAadhaar
      }
    }));
  };

  const submitNewClaim = (claimDetails) => {
    setMember((prev) => ({
      ...prev,
      activeClaim: {
        formType: claimDetails.formType || 'Form 19',
        referenceId: `MH${new Date().getFullYear()}${Math.floor(10000000 + Math.random() * 90000000)}`,
        filedOn: new Date().toLocaleDateString('en-GB'),
        daysAgo: 1,
        status: 'UNDER_EXAMINATION',
        statusText: 'Claim submitted online. Under examination by dealing assistant.',
        amount: claimDetails.amount || prev.balance.total,
        history: [
          { step: 'Submitted Online', date: 'Today', done: true },
          { step: 'Field Office Processing', date: 'Expected 3-5 days', done: false, current: true },
          { step: 'DA Approval & Sanction', date: 'Pending', done: false },
          { step: 'NEFT Credit to Bank', date: 'Pending', done: false }
        ]
      }
    }));
  };

  const alerts = getDashboardAlerts(member);

  return (
    <MemberContext.Provider
      value={{
        member,
        setMember,
        selectedPresetId,
        switchPreset,
        updateExitDate,
        updateKYC,
        alignNameWithAadhaar,
        submitNewClaim,
        alerts,
        claimWizardStep,
        setClaimWizardStep,
        presets: MEMBER_PRESETS
      }}
    >
      {children}
    </MemberContext.Provider>
  );
}
