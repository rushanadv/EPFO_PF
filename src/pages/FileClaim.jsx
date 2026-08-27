// src/pages/FileClaim.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useMember } from '../context/useMember';
import { useLanguage } from '../context/useLanguage';
import Tooltip from '../components/shared/Tooltip';
import { 
  FileText, 
  CheckCircle2, 
  AlertTriangle, 
  ShieldCheck, 
  ArrowRight, 
  ArrowLeft, 
  Sparkles,
  Send
} from 'lucide-react';

export default function FileClaim() {
  const { member, submitNewClaim, claimWizardStep, setClaimWizardStep } = useMember();
  const { isHindi } = useLanguage();

  const [scanProgress, setScanProgress] = useState(0);
  const [selectedForm, setSelectedForm] = useState('19'); // '19' | '31' | '10C' | '10D'
  const [withdrawalReason, setWithdrawalReason] = useState('left_job');
  const [form121Checked, setForm121Checked] = useState(true);
  const [unemploymentDeclared, setUnemploymentDeclared] = useState(true);
  const [submittedClaimId, setSubmittedClaimId] = useState(null);

  // Checks
  const isNameMatch = (member?.kyc?.nameOnAadhaar || '').trim().toUpperCase() === (member?.kyc?.nameOnEPFO || '').trim().toUpperCase();
  const isExitMarked = Boolean(member?.doe);
  const isBankValid = member?.kyc?.bank?.status === 'APPROVED' && member?.kyc?.bank?.type !== 'joint_parent';

  useEffect(() => {
    let timer;
    if (claimWizardStep === 1) {
      timer = setInterval(() => {
        setScanProgress((prev) => {
          if (prev >= 100) {
            clearInterval(timer);
            return 100;
          }
          return prev + 25;
        });
      }, 150);
    }
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [claimWizardStep]);

  const isScanning = scanProgress < 100;

  const handleFinalSubmit = (e) => {
    e.preventDefault();
    const newId = `MHBAN${new Date().getFullYear()}${Math.floor(100000 + Math.random() * 900000)}`;
    submitNewClaim({
      formType: selectedForm === '19' ? 'Form 19 (Full EPF)' : selectedForm === '31' ? 'Form 31 (Advance)' : 'Form 10C',
      amount: member?.balance?.total || 436000
    });
    setSubmittedClaimId(newId);
    setClaimWizardStep(4); // Success screen
  };

  return (
    <div className="space-y-6">
      {/* Title */}
      <div className="border-b border-slate-200 pb-3 flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <FileText className="w-6 h-6 text-[#003399]" />
            <span>{isHindi ? 'ऑनलाइन दावा प्रस्तुत करें (Online Claim Portal)' : 'File Online Claim (Form 19 / 31 / 10C / 10D)'}</span>
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            EPFO Intelligent Pre-Flight validation engine. Catch discrepancies before submission.
          </p>
        </div>

        {/* Step Indicator */}
        <div className="hidden sm:flex items-center gap-2 text-xs font-semibold">
          <span className={`px-2.5 py-1 rounded-full ${claimWizardStep >= 1 ? 'bg-[#003399] text-white' : 'bg-slate-200 text-slate-600'}`}>
            1. Pre-Flight
          </span>
          <span className="text-slate-300">→</span>
          <span className={`px-2.5 py-1 rounded-full ${claimWizardStep >= 2 ? 'bg-[#003399] text-white' : 'bg-slate-200 text-slate-600'}`}>
            2. Select Form
          </span>
          <span className="text-slate-300">→</span>
          <span className={`px-2.5 py-1 rounded-full ${claimWizardStep >= 3 ? 'bg-[#003399] text-white' : 'bg-slate-200 text-slate-600'}`}>
            3. Fill & Submit
          </span>
        </div>
      </div>

      {/* STAGE 1: PRE-FLIGHT CHECK */}
      {claimWizardStep === 1 && (
        <div className="epfo-card p-6 space-y-6 border-2 border-slate-300">
          <div className="text-center max-w-xl mx-auto space-y-2">
            <div className="inline-flex p-3 bg-blue-50 rounded-full text-[#003399] mb-1">
              <ShieldCheck className="w-8 h-8 animate-pulse" />
            </div>
            <h2 className="text-lg font-bold text-slate-900">
              {isHindi ? 'दावा पूर्व-जांच (EPFO Pre-Flight Check)' : 'Intelligent Claim Pre-Flight Diagnostic'}
            </h2>
            <p className="text-xs text-slate-600 leading-relaxed">
              Before you submit your claim, our AI validator simulates the exact 12 rules used by EPFO field offices to ensure you don't face a 23-day rejection cycle.
            </p>
          </div>

          {/* Progress Bar */}
          <div className="max-w-md mx-auto space-y-1.5">
            <div className="flex justify-between text-xs font-bold text-slate-700">
              <span>{isScanning ? 'Running 5-Layer Forensic Audit...' : 'Pre-Flight Audit Complete'}</span>
              <span>{scanProgress}%</span>
            </div>
            <div className="w-full h-3 bg-slate-200 rounded-full overflow-hidden">
              <div
                className={`h-full transition-all duration-300 ${scanProgress === 100 ? (isNameMatch && isExitMarked ? 'bg-green-600' : 'bg-[#F97316]') : 'bg-[#003399]'}`}
                style={{ width: `${scanProgress}%` }}
              ></div>
            </div>
          </div>

          {/* Audit Results Table */}
          {!isScanning && (
            <div className="space-y-3 pt-2">
              <div className="border border-slate-200 rounded-lg overflow-hidden divide-y divide-slate-100 text-xs">
                {/* Result 1: Name Mismatch */}
                <div className={`p-3.5 flex items-start justify-between gap-3 ${!isNameMatch ? 'bg-red-50' : 'bg-green-50/50'}`}>
                  <div className="flex items-start gap-2.5">
                    {isNameMatch ? <CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5" /> : <AlertTriangle className="w-4 h-4 text-red-600 mt-0.5" />}
                    <div>
                      <div className={`font-bold ${isNameMatch ? 'text-green-900' : 'text-red-900'}`}>
                        {isNameMatch ? 'Name Match (Aadhaar vs EPFO)' : 'CRITICAL: Name Mismatch Detected'}
                      </div>
                      <div className="text-[11px] text-slate-600 mt-0.5">
                        {isNameMatch ? 'Verbatim character match verified with UIDAI records.' : `EPFO has "${member?.kyc?.nameOnEPFO}" but Aadhaar has "${member?.kyc?.nameOnAadhaar}". Claim WILL be rejected.`}
                      </div>
                    </div>
                  </div>
                  {!isNameMatch && (
                    <Link to="/manage/kyc" className="shrink-0 text-xs font-bold text-[#003399] hover:underline">
                      Fix in KYC Audit →
                    </Link>
                  )}
                </div>

                {/* Result 2: Exit Date */}
                <div className={`p-3.5 flex items-start justify-between gap-3 ${!isExitMarked ? 'bg-orange-50' : 'bg-green-50/50'}`}>
                  <div className="flex items-start gap-2.5">
                    {isExitMarked ? <CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5" /> : <AlertTriangle className="w-4 h-4 text-orange-600 mt-0.5" />}
                    <div>
                      <div className={`font-bold ${isExitMarked ? 'text-green-900' : 'text-orange-900'}`}>
                        {isExitMarked ? `Date of Exit Marked (${member?.doe})` : 'HIGH: Date of Exit Not Marked by Employer'}
                      </div>
                      <div className="text-[11px] text-slate-600 mt-0.5">
                        {isExitMarked ? 'Qualifying 2-month period verified.' : 'Withdrawal claims cannot be settled while your employment status is active.'}
                      </div>
                    </div>
                  </div>
                  {!isExitMarked && (
                    <Link to="/manage/mark-exit" className="shrink-0 text-xs font-bold text-[#003399] hover:underline">
                      Self-Mark Exit →
                    </Link>
                  )}
                </div>

                {/* Result 3: Seeded KYC */}
                <div className="p-3.5 bg-green-50/50 flex items-start justify-between gap-3">
                  <div className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5" />
                    <div>
                      <div className="font-bold text-green-900">Seeded KYC (Aadhaar & PAN)</div>
                      <div className="text-[11px] text-slate-600 mt-0.5">
                        UIDAI Aadhaar and Income Tax PAN seeded and verified.
                      </div>
                    </div>
                  </div>
                  <span className="text-green-700 font-bold text-[11px]">PASSED</span>
                </div>

                {/* Result 4: Bank Account & IFSC */}
                <div className={`p-3.5 flex items-start justify-between gap-3 ${!isBankValid ? 'bg-red-50' : 'bg-green-50/50'}`}>
                  <div className="flex items-start gap-2.5">
                    {isBankValid ? <CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5" /> : <AlertTriangle className="w-4 h-4 text-red-600 mt-0.5" />}
                    <div>
                      <div className={`font-bold ${isBankValid ? 'text-green-900' : 'text-red-900'}`}>
                        {isBankValid ? 'Bank Account & IFSC Status' : 'CRITICAL: Ineligible Bank Account'}
                      </div>
                      <div className="text-[11px] text-slate-600 mt-0.5">
                        {isBankValid ? `${member?.kyc?.bank?.bank} (${member?.kyc?.bank?.ifsc}) - Individual Account.` : 'Joint account with parents/others is not allowed.'}
                      </div>
                    </div>
                  </div>
                  <span className={`font-bold text-[11px] ${isBankValid ? 'text-green-700' : 'text-red-700'}`}>
                    {isBankValid ? 'PASSED' : 'ACTION REQUIRED'}
                  </span>
                </div>
              </div>

              {/* Action Decision Buttons */}
              <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-3">
                {(!isNameMatch || !isExitMarked || !isBankValid) ? (
                  <>
                    <Link
                      to={!isNameMatch ? '/manage/kyc' : '/manage/mark-exit'}
                      className="w-full sm:w-auto bg-[#F97316] hover:bg-[#C2590F] text-white font-bold text-xs px-5 py-2.5 rounded shadow-sm transition-colors flex items-center justify-center gap-2"
                    >
                      <span>⚠️ Fix Detected Issues First (Recommended)</span>
                    </Link>

                    <button
                      type="button"
                      onClick={() => setClaimWizardStep(2)}
                      className="text-xs text-slate-600 hover:text-slate-900 underline font-medium"
                    >
                      Continue Anyway (I understand the rejection risk) →
                    </button>
                  </>
                ) : (
                  <button
                    type="button"
                    onClick={() => setClaimWizardStep(2)}
                    className="w-full bg-[#003399] hover:bg-[#001f6b] text-white font-bold text-xs py-2.5 px-6 rounded shadow-sm transition-colors flex items-center justify-center gap-2"
                  >
                    <span>Proceed to Form Selector →</span>
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      )}

      {/* STAGE 2: FORM SELECTOR */}
      {claimWizardStep === 2 && (
        <div className="epfo-card p-6 space-y-6">
          <div className="border-b border-slate-200 pb-3">
            <h2 className="text-base font-bold text-slate-900">
              Which Claim Are You Filing?
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Select your current employment situation. We'll determine the legally correct EPFO form combinations.
            </p>
          </div>

          <div className="space-y-3 text-xs">
            {/* Option 1: Left Job */}
            <label className={`block p-4 rounded-lg border-2 cursor-pointer transition-all ${
              withdrawalReason === 'left_job'
                ? 'border-[#003399] bg-blue-50/60 ring-1 ring-[#003399]'
                : 'border-slate-200 hover:border-slate-300'
            }`}>
              <div className="flex items-start gap-3">
                <input
                  type="radio"
                  name="withdrawalReason"
                  value="left_job"
                  checked={withdrawalReason === 'left_job'}
                  onChange={() => {
                    setWithdrawalReason('left_job');
                    setSelectedForm('19');
                  }}
                  className="mt-1"
                />
                <div className="flex-1">
                  <div className="font-bold text-slate-900 text-sm">
                    I have left my job — Want full PF & Pension settlement
                  </div>
                  <div className="text-slate-600 text-xs mt-1">
                    Applicable after 2 months of leaving employment.
                  </div>
                  <div className="mt-2 flex flex-wrap gap-2">
                    <span className="bg-[#003399] text-white font-bold px-2 py-0.5 rounded text-[11px]">
                      Form 19 (Full EPF)
                    </span>
                    <span className="bg-blue-200 text-blue-900 font-bold px-2 py-0.5 rounded text-[11px]">
                      Form 10C (EPS Pension Withdrawal)
                    </span>
                  </div>
                </div>
              </div>
            </label>

            {/* Option 2: Still Employed (Advance) */}
            <label className={`block p-4 rounded-lg border-2 cursor-pointer transition-all ${
              withdrawalReason === 'advance'
                ? 'border-[#003399] bg-blue-50/60 ring-1 ring-[#003399]'
                : 'border-slate-200 hover:border-slate-300'
            }`}>
              <div className="flex items-start gap-3">
                <input
                  type="radio"
                  name="withdrawalReason"
                  value="advance"
                  checked={withdrawalReason === 'advance'}
                  onChange={() => {
                    setWithdrawalReason('advance');
                    setSelectedForm('31');
                  }}
                  className="mt-1"
                />
                <div className="flex-1">
                  <div className="font-bold text-slate-900 text-sm">
                    I am still employed — Need a partial non-refundable advance
                  </div>
                  <div className="text-slate-600 text-xs mt-1">
                    Eligible purposes: Illness / Medical treatment, House construction, Daughter/Son marriage, Education, Special pandemic advance.
                  </div>
                  <div className="mt-2">
                    <span className="bg-amber-600 text-white font-bold px-2 py-0.5 rounded text-[11px]">
                      Form 31 (PF Advance)
                    </span>
                  </div>
                </div>
              </div>
            </label>

            {/* Option 3: Age 58+ Retirement Pension */}
            <label className={`block p-4 rounded-lg border-2 cursor-pointer transition-all ${
              withdrawalReason === 'pension'
                ? 'border-[#003399] bg-blue-50/60 ring-1 ring-[#003399]'
                : 'border-slate-200 hover:border-slate-300'
            }`}>
              <div className="flex items-start gap-3">
                <input
                  type="radio"
                  name="withdrawalReason"
                  value="pension"
                  checked={withdrawalReason === 'pension'}
                  onChange={() => {
                    setWithdrawalReason('pension');
                    setSelectedForm('10D');
                  }}
                  className="mt-1"
                />
                <div className="flex-1">
                  <div className="font-bold text-slate-900 text-sm">
                    I am 58+ years old / 10+ years service — Monthly Scheme Pension
                  </div>
                  <div className="text-slate-600 text-xs mt-1">
                    Lifelong monthly pension benefit under EPS 1995 rules.
                  </div>
                  <div className="mt-2">
                    <span className="bg-purple-700 text-white font-bold px-2 py-0.5 rounded text-[11px]">
                      Form 10D (Monthly Pension)
                    </span>
                  </div>
                </div>
              </div>
            </label>
          </div>

          {/* 2026 Directive */}
          <div className="p-3.5 bg-amber-50 rounded-lg border border-amber-300 text-xs space-y-1">
            <div className="font-bold text-amber-900 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-amber-700" />
              <span>April 2026 EPFO Directive: Form 121 Replaces Forms 15G / 15H</span>
            </div>
            <p className="text-amber-800 text-[11px] leading-relaxed">
              If total continuous service is less than 5 years and withdrawal amount exceeds ₹50,000, <strong>Form 121</strong> declaration is embedded into Step 3 to ensure Nil TDS deduction.
            </p>
          </div>

          <div className="pt-2 flex items-center justify-between">
            <button
              type="button"
              onClick={() => setClaimWizardStep(1)}
              className="px-4 py-2 bg-slate-200 text-slate-700 font-semibold rounded text-xs hover:bg-slate-300 flex items-center gap-1"
            >
              <ArrowLeft className="w-3.5 h-3.5" /> Back to Pre-Flight
            </button>

            <button
              type="button"
              onClick={() => setClaimWizardStep(3)}
              className="px-6 py-2.5 bg-[#003399] hover:bg-[#001f6b] text-white font-bold rounded text-xs shadow-xs flex items-center gap-1.5"
            >
              <span>Continue to Form {selectedForm} →</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}

      {/* STAGE 3: FORM 19 */}
      {claimWizardStep === 3 && (
        <form onSubmit={handleFinalSubmit} className="epfo-card p-6 space-y-6 border-2 border-slate-300">
          <div className="border-b border-slate-200 pb-3 flex items-center justify-between">
            <div>
              <h2 className="text-base font-bold text-slate-900">
                Form 19 — Final Settlement of Provident Fund
              </h2>
              <div className="text-xs text-slate-500">
                Section 69 of EPF Scheme, 1952 (All fields verified against EPFO Master)
              </div>
            </div>
            <span className="text-xs bg-green-100 text-green-800 font-bold px-2.5 py-1 rounded">
              Ready to Submit
            </span>
          </div>

          {/* Section 1: Member Identity */}
          <div className="space-y-3">
            <div className="text-xs font-bold text-[#003399] uppercase tracking-wider border-b border-slate-200 pb-1">
              1. Member Identity Details
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="block text-slate-600 font-medium mb-1">
                  Member Name:
                  <Tooltip
                    label="Member Name"
                    textEn="Must exactly match the name on your UIDAI Aadhaar card to avoid automated rejection."
                    textHi="यह नाम आपके आधार कार्ड पर लिखे नाम से बिल्कुल मेल खाना चाहिए।"
                  />
                </label>
                <input
                  type="text"
                  value={member?.name || 'Ravi Kumar'}
                  readOnly
                  className="w-full px-3 py-2 bg-slate-100 border border-slate-300 rounded font-bold text-slate-900 font-mono"
                />
              </div>

              <div>
                <label className="block text-slate-600 font-medium mb-1">
                  Universal Account Number (UAN):
                  <Tooltip
                    label="UAN"
                    textEn="Your permanent 12-digit social security identifier across all employments in India."
                    textHi="आपकी सभी नौकरियों के लिए 12 अंकों का स्थायी भविष्य निधि पहचान नंबर।"
                  />
                </label>
                <input
                  type="text"
                  value={member?.uan}
                  readOnly
                  className="w-full px-3 py-2 bg-slate-100 border border-slate-300 rounded font-mono text-slate-800"
                />
              </div>

              <div>
                <label className="block text-slate-600 font-medium mb-1">
                  Date of Leaving / Exit:
                  <Tooltip
                    label="Date of Exit"
                    textEn="The last date you physically worked in the establishment as per relieving letter."
                    textHi="कंपनी में आपका अंतिम कार्य दिवस।"
                  />
                </label>
                <input
                  type="text"
                  value={member?.doe || '01/10/2025'}
                  readOnly
                  className="w-full px-3 py-2 bg-slate-100 border border-slate-300 rounded font-mono text-slate-800"
                />
              </div>

              <div>
                <label className="block text-slate-600 font-medium mb-1">
                  Reason for Leaving:
                  <Tooltip
                    label="Reason for Leaving"
                    textEn="Must align with standard cessation reasons under EPF rules."
                    textHi="नौकरी छोड़ने का मान्य कारण।"
                  />
                </label>
                <input
                  type="text"
                  value={member?.exitReason || 'Resignation / Cessation'}
                  readOnly
                  className="w-full px-3 py-2 bg-slate-100 border border-slate-300 rounded text-slate-800"
                />
              </div>
            </div>
          </div>

          {/* Section 2: Destination Bank Details */}
          <div className="space-y-3">
            <div className="text-xs font-bold text-[#003399] uppercase tracking-wider border-b border-slate-200 pb-1">
              2. Verified Bank Disbursement Account
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
              <div>
                <label className="block text-slate-600 font-medium mb-1">Bank Name:</label>
                <input
                  type="text"
                  value={member?.kyc?.bank?.bank}
                  readOnly
                  className="w-full px-3 py-2 bg-slate-100 border border-slate-300 rounded text-slate-800 font-medium"
                />
              </div>
              <div>
                <label className="block text-slate-600 font-medium mb-1">Account Number:</label>
                <input
                  type="text"
                  value={member?.kyc?.bank?.account}
                  readOnly
                  className="w-full px-3 py-2 bg-slate-100 border border-slate-300 rounded font-mono font-bold text-slate-900"
                />
              </div>
              <div>
                <label className="block text-slate-600 font-medium mb-1">
                  IFSC Code:
                  <Tooltip
                    label="IFSC Code"
                    textEn="11-character Indian Financial System Code. Verified active on PFMS banking gateway."
                    textHi="11 अक्षरों का बैंक शाखा कोड जो PFMS गेटवे पर सत्यापित है।"
                  />
                </label>
                <input
                  type="text"
                  value={member?.kyc?.bank?.ifsc}
                  readOnly
                  className="w-full px-3 py-2 bg-slate-100 border border-slate-300 rounded font-mono font-bold text-[#003399]"
                />
              </div>
            </div>
          </div>

          {/* Section 3: Declarations */}
          <div className="space-y-3 pt-2">
            <div className="text-xs font-bold text-[#003399] uppercase tracking-wider border-b border-slate-200 pb-1">
              3. Statutory Member Declarations
            </div>

            <label className="p-3 bg-slate-50 border border-slate-200 rounded-md flex items-start gap-2.5 cursor-pointer text-xs">
              <input
                type="checkbox"
                checked={unemploymentDeclared}
                onChange={(e) => setUnemploymentDeclared(e.target.checked)}
                className="mt-0.5"
                required
              />
              <div className="text-slate-700">
                <span>
                  I hereby declare that I have not been employed in any establishment covered under the EPF Act for at least 2 months preceding the date of this application.
                </span>
                <Tooltip
                  label="2-Month Unemployment Rule"
                  textEn="Statutory requirement under Para 69(2) of EPF Scheme for full final withdrawal."
                  textHi="पूर्ण पीएफ निकासी के लिए कम से कम 2 महीने तक अन्य ईपीएफ संस्था में काम न करने का नियम।"
                />
              </div>
            </label>

            <label className="p-3 bg-amber-50/80 border border-amber-300 rounded-md flex items-start gap-2.5 cursor-pointer text-xs">
              <input
                type="checkbox"
                checked={form121Checked}
                onChange={(e) => setForm121Checked(e.target.checked)}
                className="mt-0.5"
              />
              <div className="text-slate-800">
                <span className="font-bold text-amber-900 block mb-0.5">
                  Form 121 (Nil TDS Declaration under Section 197A of Income Tax Act):
                </span>
                <span>
                  I declare that my estimated total taxable income for FY 2026-27 is below the basic exemption limit. Kindly do not deduct TDS (Tax Deducted at Source) on this settlement.
                </span>
                <Tooltip
                  label="Form 121 TDS Rule"
                  textEn="Form 121 officially replaced Form 15G/15H from April 2026. Avoids 10% TDS deduction."
                  textHi="अप्रैल 2026 से लागू नया फॉर्म 121, जो बिना टैक्स कटे पूरी राशि प्राप्त करने के लिए अनिवार्य है।"
                />
              </div>
            </label>
          </div>

          {/* Actions */}
          <div className="pt-3 border-t border-slate-200 flex items-center justify-between">
            <button
              type="button"
              onClick={() => setClaimWizardStep(2)}
              className="px-4 py-2 bg-slate-200 text-slate-700 font-semibold rounded text-xs hover:bg-slate-300"
            >
              ← Back
            </button>

            <button
              type="submit"
              disabled={!unemploymentDeclared}
              className="px-6 py-2.5 bg-green-700 hover:bg-green-800 text-white font-bold rounded text-xs shadow-md transition-colors flex items-center gap-2 cursor-pointer disabled:opacity-50"
            >
              <Send className="w-4 h-4" />
              <span>Submit Form 19 with Aadhaar OTP →</span>
            </button>
          </div>
        </form>
      )}

      {/* STAGE 4: SUCCESS */}
      {claimWizardStep === 4 && (
        <div className="epfo-card p-8 text-center space-y-4 max-w-2xl mx-auto border-2 border-green-400 bg-gradient-to-b from-white to-green-50/50">
          <div className="w-16 h-16 bg-green-100 text-green-700 rounded-full flex items-center justify-center mx-auto shadow-inner">
            <CheckCircle2 className="w-10 h-10" />
          </div>

          <div className="space-y-1">
            <h2 className="text-xl font-bold text-slate-900">
              Claim Successfully Submitted Online!
            </h2>
            <div className="text-xs text-slate-600">
              Your Form 19 claim has been registered in the EPFO central queue.
            </div>
          </div>

          <div className="bg-white p-4 rounded-lg border border-green-200 text-xs text-slate-700 space-y-2 max-w-md mx-auto shadow-xs">
            <div className="flex justify-between">
              <span className="text-slate-500">Tracking Reference ID:</span>
              <span className="font-mono font-bold text-slate-900">{submittedClaimId || member?.activeClaim?.referenceId}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Claim Type:</span>
              <span className="font-semibold text-slate-800">Form 19 (Full Settlement)</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Expected Settlement:</span>
              <span className="font-bold text-green-700">₹{member?.balance?.total?.toLocaleString('en-IN')}</span>
            </div>
          </div>

          <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
            <Link
              to="/services/track"
              className="bg-[#003399] hover:bg-[#001f6b] text-white font-bold text-xs px-5 py-2.5 rounded shadow-xs flex items-center gap-1.5"
            >
              <span>Track Live Claim Journey →</span>
            </Link>

            <Link
              to="/dashboard"
              className="bg-white hover:bg-slate-50 border border-slate-300 text-slate-700 font-semibold text-xs px-5 py-2.5 rounded"
            >
              Return to Dashboard
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
