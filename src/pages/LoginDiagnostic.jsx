// src/pages/LoginDiagnostic.jsx
import React, { useState } from 'react';
import { useLanguage } from '../context/useLanguage';
import { LOGIN_DIAGNOSTIC_DATA } from '../data/loginDiagnostic';
import { 
  KeyRound, 
  ChevronRight, 
  PhoneCall, 
  Smartphone, 
  ShieldAlert
} from 'lucide-react';
import { Link } from 'react-router-dom';

export default function LoginDiagnostic() {
  const { isHindi } = useLanguage();
  const [selectedIssueId, setSelectedIssueId] = useState(LOGIN_DIAGNOSTIC_DATA[0].id);

  const activeIssue = LOGIN_DIAGNOSTIC_DATA.find((i) => i.id === selectedIssueId) || LOGIN_DIAGNOSTIC_DATA[0];

  return (
    <div className="space-y-6">
      {/* Title */}
      <div className="border-b border-slate-200 pb-3">
        <h1 className="text-xl font-bold text-slate-900 flex items-center gap-2">
          <KeyRound className="w-6 h-6 text-[#003399]" />
          <span>{isHindi ? 'लॉगिन निदान एवं समस्या निवारण' : 'Login Diagnostic Suite & Troubleshooting Guide'}</span>
        </h1>
        <p className="text-xs text-slate-500 mt-0.5">
          Step-by-step diagnostic guide for Aadhaar OTP delivery failures, credential locks, and peak server timeouts.
        </p>
      </div>

      {/* 2026 Security Alert */}
      <div className="p-4 bg-amber-50 rounded-lg border border-amber-300 text-xs flex items-start gap-3">
        <ShieldAlert className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
        <div>
          <strong className="text-amber-900 font-bold">Important 2026 Security Architecture:</strong>
          <p className="text-amber-800 mt-0.5 leading-relaxed">
            Since January 2026, member portal sign-in uses dual-factor authentication. Your login OTP is delivered exclusively to the mobile number registered in UIDAI Aadhaar records, not legacy UAN records.
          </p>
        </div>
      </div>

      {/* Interactive Decision Split */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Col: Issue Selector (5 Cols) */}
        <div className="lg:col-span-5 space-y-2">
          <div className="text-xs font-bold text-[#003399] uppercase tracking-wider mb-2">
            Select the Problem You Are Facing:
          </div>

          <div className="space-y-1.5">
            {LOGIN_DIAGNOSTIC_DATA.map((issue) => {
              const isSelected = issue.id === selectedIssueId;
              return (
                <button
                  key={issue.id}
                  onClick={() => setSelectedIssueId(issue.id)}
                  className={`w-full text-left p-3.5 rounded-lg border transition-all flex items-center justify-between gap-3 text-xs cursor-pointer ${
                    isSelected
                      ? 'bg-[#003399] text-white border-[#003399] shadow-sm'
                      : 'bg-white text-slate-800 border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <span className="text-lg select-none">{issue.icon}</span>
                    <span className="font-semibold leading-snug">
                      {isHindi ? issue.titleHi : issue.title}
                    </span>
                  </div>
                  <ChevronRight className={`w-4 h-4 shrink-0 ${isSelected ? 'text-yellow-300' : 'text-slate-400'}`} />
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Col: Resolution Steps (7 Cols) */}
        <div className="lg:col-span-7">
          <div className="epfo-card p-5 space-y-4 border-t-4 border-t-[#003399]">
            <div className="border-b border-slate-200 pb-3">
              <div className="flex items-center gap-2 text-[#003399] mb-1">
                <span className="text-xl">{activeIssue.icon}</span>
                <h3 className="font-bold text-sm text-slate-900">
                  {isHindi ? activeIssue.titleHi : activeIssue.title}
                </h3>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                {activeIssue.summary}
              </p>
            </div>

            {/* Steps Stepper */}
            <div className="space-y-3">
              <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                Step-by-Step Resolution:
              </div>

              {activeIssue.steps.map((s) => (
                <div key={s.step} className="p-3.5 bg-slate-50 rounded-lg border border-slate-200 text-xs flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-[#003399] text-white font-bold flex items-center justify-center shrink-0 text-[11px] mt-0.5">
                    {s.step}
                  </span>
                  <div>
                    <div className="font-bold text-slate-900 mb-0.5">{s.title}</div>
                    <div className="text-slate-600 leading-relaxed text-[11px]">{s.desc}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Quick Links inside Diagnostic */}
            <div className="pt-3 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3 text-xs">
              <Link
                to="/"
                className="bg-[#003399] hover:bg-[#001f6b] text-white font-bold px-4 py-2 rounded shadow-xs flex items-center gap-1.5 cursor-pointer"
              >
                <span>Return to Sign In →</span>
              </Link>

              <a
                href="https://myaadhaar.uidai.gov.in"
                target="_blank"
                rel="noreferrer"
                className="text-[#003399] hover:underline font-semibold"
              >
                Open UIDAI Portal (Verify Mobile) ↗
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Helplines Box */}
      <div className="epfo-card p-5 bg-gradient-to-r from-slate-50 to-blue-50/50 border border-blue-200">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-blue-100 text-[#003399] flex items-center justify-center shrink-0">
              <PhoneCall className="w-5 h-5" />
            </div>
            <div>
              <div className="font-bold text-slate-900">National EPFO Toll-Free Helpline</div>
              <div className="text-base font-black text-[#F97316]">14470</div>
              <div className="text-slate-500 text-[11px]">7:00 AM – 9:00 PM • Multilingual assistance</div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-green-100 text-green-700 flex items-center justify-center shrink-0">
              <Smartphone className="w-5 h-5" />
            </div>
            <div>
              <div className="font-bold text-slate-900">Official UMANG Government App</div>
              <div className="text-xs text-slate-700 mt-0.5">Alternative gateway during peak server congestion (10th-20th of month)</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
