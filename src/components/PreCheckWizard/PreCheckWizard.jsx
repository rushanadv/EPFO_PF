// src/components/PreCheckWizard/PreCheckWizard.jsx
import React, { useState } from 'react';
import { StepIndicator } from './StepIndicator';
import { FormSelector } from './FormSelector';
import { KYCAudit } from './KYCAudit';
import { ExitDateCheck } from './ExitDateCheck';
import { PreCheckResult } from './PreCheckResult';
import { runKYCAudit } from '../../utils/kycValidation';

export function PreCheckWizard({ currentUser, onNavigateToStatus }) {
  const [step, setStep] = useState(1); // 1 | 2 | 3 | 'result'
  const [userKey, setUserKey] = useState(currentUser.uan);

  // Form State
  const [formData, setFormData] = useState(() => ({
    ...currentUser,
    situation: 'full',
    serviceYearsOption: currentUser.serviceYears > 10 ? 'over10' : currentUser.serviceYears >= 5 ? '5to10' : 'under5',
    joiningNewJob: 'no',
    hasLeftJob: 'yes',
    timeLeft: '2to6months',
    aadhaarLinked: 'yes',
    doeUpdated: currentUser.dateOfExit ? 'yes' : 'no'
  }));

  const [auditResult, setAuditResult] = useState(() => runKYCAudit(currentUser));

  // If user changed preset in header, sync state
  if (currentUser.uan !== userKey) {
    setUserKey(currentUser.uan);
    const updated = {
      ...currentUser,
      situation: 'full',
      serviceYearsOption: currentUser.serviceYears > 10 ? 'over10' : currentUser.serviceYears >= 5 ? '5to10' : 'under5',
      joiningNewJob: 'no',
      hasLeftJob: 'yes',
      timeLeft: '2to6months',
      aadhaarLinked: 'yes',
      doeUpdated: currentUser.dateOfExit ? 'yes' : 'no'
    };
    setFormData(updated);
    setAuditResult(runKYCAudit(updated));
    setStep(1);
  }

  const handleStep1Complete = (step1Data) => {
    setFormData((prev) => ({ ...prev, ...step1Data }));
    setStep(2);
  };

  const handleStep2Complete = (step2Data, result) => {
    setFormData((prev) => ({ ...prev, ...step2Data }));
    setAuditResult(result);
    setStep(3);
  };

  const handleStep3Complete = (step3Data) => {
    const finalData = { ...formData, ...step3Data };
    setFormData(finalData);
    setAuditResult(runKYCAudit(finalData));
    setStep('result');
  };

  const handleReset = () => {
    setStep(1);
  };

  return (
    <div className="space-y-6">
      {/* Step Indicator */}
      <StepIndicator currentStep={step} setStep={setStep} />

      {/* Step 1: Form Selector */}
      {step === 1 && (
        <FormSelector
          data={formData}
          onComplete={handleStep1Complete}
        />
      )}

      {/* Step 2: KYC Audit */}
      {step === 2 && (
        <KYCAudit
          data={formData}
          onBack={() => setStep(1)}
          onComplete={handleStep2Complete}
        />
      )}

      {/* Step 3: Exit Date Check */}
      {step === 3 && (
        <ExitDateCheck
          data={formData}
          onBack={() => setStep(2)}
          onComplete={handleStep3Complete}
        />
      )}

      {/* Step 'result': Final Pre-Check Diagnostic Report */}
      {step === 'result' && (
        <PreCheckResult
          formData={formData}
          auditResult={auditResult}
          onReset={handleReset}
          onNavigateToStatus={onNavigateToStatus}
        />
      )}
    </div>
  );
}
