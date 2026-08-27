// src/components/PreCheckWizard/StepIndicator.jsx
import React from 'react';
import { Check } from 'lucide-react';
import { useLanguage } from '../common/useLanguage';

export function StepIndicator({ currentStep, setStep }) {
  const { isHindi } = useLanguage();

  const steps = [
    { id: 1, label: 'Which Form?', label_hi: 'कौन सा फॉर्म?' },
    { id: 2, label: 'KYC Audit', label_hi: 'KYC सत्यापन' },
    { id: 3, label: 'Exit Date', label_hi: 'एग्जिट डेट' },
    { id: 'result', label: 'Report & Shield', label_hi: 'डायग्नोस्टिक रिपोर्ट' }
  ];

  const getStepNumber = (s) => {
    if (s === 'result') return 4;
    return s;
  };

  const currNum = getStepNumber(currentStep);

  return (
    <div className="w-full bg-white p-4 rounded-xl border border-slate-200 shadow-xs mb-6">
      <div className="flex items-center justify-between max-w-2xl mx-auto relative">
        {/* Connecting Line Background */}
        <div className="absolute top-1/2 left-6 right-6 -translate-y-1/2 h-1 bg-slate-200 z-0"></div>
        {/* Active Line Progress */}
        <div 
          className="absolute top-1/2 left-6 -translate-y-1/2 h-1 bg-[#003399] transition-all duration-300 z-0"
          style={{
            width: `${((currNum - 1) / (steps.length - 1)) * 100}%`
          }}
        ></div>

        {steps.map((step, index) => {
          const stepNum = index + 1;
          const isCompleted = currNum > stepNum;
          const isCurrent = currNum === stepNum;

          return (
            <div 
              key={step.id} 
              className="flex flex-col items-center relative z-10 cursor-pointer group"
              onClick={() => {
                if (isCompleted || isCurrent) {
                  setStep(step.id);
                }
              }}
            >
              {/* Circle Indicator */}
              <div
                className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-200 shadow-xs ${
                  isCompleted
                    ? 'bg-[#003399] text-white ring-4 ring-blue-100'
                    : isCurrent
                    ? 'bg-[#F97316] text-white ring-4 ring-orange-200 scale-110'
                    : 'bg-slate-100 text-slate-400 border-2 border-slate-300 group-hover:border-slate-400'
                }`}
              >
                {isCompleted ? (
                  <Check className="w-5 h-5 text-white stroke-[2.5]" />
                ) : (
                  <span>{index + 1}</span>
                )}
              </div>

              {/* Step Label */}
              <span
                className={`mt-2 text-xs font-semibold text-center whitespace-nowrap transition-colors ${
                  isCurrent
                    ? 'text-[#F97316] font-bold'
                    : isCompleted
                    ? 'text-[#003399]'
                    : 'text-slate-500'
                }`}
              >
                {isHindi ? step.label_hi : step.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
