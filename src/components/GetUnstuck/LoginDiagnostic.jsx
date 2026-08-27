// src/components/GetUnstuck/LoginDiagnostic.jsx
import React, { useState } from 'react';
import { 
  KeyRound, 
  Smartphone, 
  Lock, 
  UserCheck, 
  Sparkles, 
  ServerCrash, 
  ExternalLink, 
  PhoneCall,
  Download
} from 'lucide-react';
import { LOGIN_DIAGNOSTIC } from '../../data/loginDiagnostic';
import { useLanguage } from '../common/useLanguage';

export function LoginDiagnostic() {
  const { isHindi } = useLanguage();
  const [selectedIssue, setSelectedIssue] = useState('no_otp');

  const answer = LOGIN_DIAGNOSTIC.answers[selectedIssue];

  const issueIcons = {
    no_otp: Smartphone,
    invalid_cred: Lock,
    kyc_pending: UserCheck,
    first_time: Sparkles,
    portal_down: ServerCrash
  };

  return (
    <div className="space-y-6">
      {/* Problem Selector Buttons */}
      <div>
        <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-3">
          {isHindi ? 'आपको लॉगिन में किस प्रकार की परेशानी आ रही है?' : 'Select the exact login barrier you are facing:'}
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {LOGIN_DIAGNOSTIC.q1.options.map((opt) => {
            const isSelected = selectedIssue === opt.id;
            const Icon = issueIcons[opt.id] || KeyRound;

            return (
              <button
                key={opt.id}
                type="button"
                onClick={() => setSelectedIssue(opt.id)}
                className={`p-3.5 rounded-xl border text-left flex items-start gap-3 transition-all cursor-pointer ${
                  isSelected
                    ? 'border-[#003399] bg-blue-50/80 text-[#003399] ring-2 ring-[#003399]/20 shadow-xs'
                    : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50 text-slate-700'
                }`}
              >
                <div
                  className={`p-2 rounded-lg mt-0.5 flex-shrink-0 ${
                    isSelected ? 'bg-[#003399] text-white' : 'bg-slate-100 text-slate-600'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                </div>
                <div>
                  <div className="font-bold text-xs sm:text-sm text-slate-900">
                    {isHindi ? opt.label_hi : opt.label}
                  </div>
                  <div className="text-[11px] text-slate-500 mt-0.5">
                    {opt.id === 'no_otp'
                      ? 'Aadhaar link / DND issue'
                      : opt.id === 'invalid_cred'
                      ? 'Password / UAN reset'
                      : opt.id === 'kyc_pending'
                      ? 'Mandatory Aadhaar seeding'
                      : opt.id === 'first_time'
                      ? 'Step-by-step activation'
                      : 'Server traffic & UMANG backup'}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Step-by-Step Diagnostic Resolution Cards */}
      {answer && (
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden animate-in fade-in duration-200">
          <div className="bg-slate-900 text-white px-6 py-4 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <KeyRound className="w-5 h-5 text-[#F97316]" />
              <h3 className="font-bold text-sm sm:text-base">
                {isHindi ? answer.title_hi : answer.title}
              </h3>
            </div>
            <span className="text-xs text-slate-400 font-medium">
              {answer.steps.length} {isHindi ? 'आसान चरण' : 'Diagnostic Steps'}
            </span>
          </div>

          <div className="p-6 space-y-4">
            <div className="space-y-3">
              {answer.steps.map((st) => (
                <div
                  key={st.step}
                  className="bg-slate-50 hover:bg-slate-100/80 transition p-4 rounded-xl border border-slate-200 flex items-start gap-4"
                >
                  <div className="w-7 h-7 rounded-full bg-[#003399] text-white font-bold text-xs flex items-center justify-center flex-shrink-0 mt-0.5 shadow-xs">
                    {st.step}
                  </div>

                  <div className="space-y-1 flex-1 text-xs sm:text-sm">
                    <h4 className="font-bold text-slate-900">
                      {isHindi ? st.title_hi : st.title}
                    </h4>
                    <p className="text-slate-600 text-xs leading-relaxed">
                      {isHindi ? st.detail_hi : st.detail}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Quick External Helper Shortcuts */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-slate-200">
              <div className="flex items-center gap-2 text-xs text-slate-600">
                <PhoneCall className="w-4 h-4 text-emerald-600" />
                <span>
                  EPFO Helpline: <strong className="text-slate-900 font-mono">1800-118-005</strong>
                </span>
              </div>

              <div className="flex items-center gap-2">
                <a
                  href="https://myaadhaar.uidai.gov.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white hover:bg-slate-50 text-slate-700 border border-slate-300 rounded text-xs font-semibold shadow-xs transition"
                >
                  <span>Verify Aadhaar Mobile</span>
                  <ExternalLink className="w-3 h-3" />
                </a>

                <a
                  href="https://web.umang.gov.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#003399] hover:bg-[#001f6b] text-white rounded text-xs font-semibold shadow-xs transition"
                >
                  <Download className="w-3 h-3 text-[#F97316]" />
                  <span>Open UMANG Portal</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
