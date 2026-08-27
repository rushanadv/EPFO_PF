// src/components/GetUnstuck/TransferWizard.jsx
import React, { useState } from 'react';
import { 
  Repeat, 
  CheckCircle2, 
  AlertTriangle, 
  Info, 
  Clock
} from 'lucide-react';
import { CopyButton } from '../common/CopyButton';
import { useLanguage } from '../common/useLanguage';

export function TransferWizard({ currentUser }) {
  const { isHindi } = useLanguage();

  const [jobCount, setJobCount] = useState('2'); // '1' | '2' | '3plus'
  const [hasMultipleUAN, setHasMultipleUAN] = useState('no'); // 'yes' | 'no' | 'notsure'
  const [firstDepositDone, setFirstDepositDone] = useState('yes'); // 'yes' | 'no' | 'dontknow'

  const [checklist, setChecklist] = useState({
    deposit: true,
    exitDate: true,
    aadhaar: true,
    bank: true,
    kyc: true
  });

  const uanMergeEmail = `Subject: Request to deactivate previous UAN and merge accounts — UAN: [OLD_UAN]

To: uanepf@epfindia.gov.in
Cc: [YOUR_PERSONAL_EMAIL]

Respected EPFO Helpdesk / Technical Support,

I hold multiple Universal Account Numbers (UAN) generated across different employment tenures. I request you to deactivate my previous/old UAN and retain my current active UAN.

1. Active / Current UAN (To Keep): ${currentUser.uan || '100987654321'}
2. Previous / Inactive UAN (To Deactivate): [ENTER_OLD_UAN_HERE]
3. Member Name: ${currentUser.name || 'Ravi Kumar'}
4. Aadhaar Number: [ENTER_AADHAAR_LAST_4]
5. Current Employer: ${currentUser.employer || 'TechCorp India Pvt Ltd'}

After deactivation of the old UAN, I will initiate an online Form 13 transfer of accumulated balances to my current UAN.

Thanking you,
${currentUser.name || 'Ravi Kumar'}
Mobile: ${currentUser.mobileAadhaar || '9876543210'}`;

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-200 pb-4">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-[#003399]/10 rounded-lg text-[#003399]">
            <Repeat className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-bold text-base sm:text-lg text-slate-900">
              {isHindi ? 'ऑनलाइन PF ट्रांसफर विजार्ड (फॉर्म 13)' : 'Online PF Transfer Wizard (Form 13)'}
            </h3>
            <p className="text-xs text-slate-500">
              {isHindi
                ? 'नौकरी बदली है? पुरानी कंपनी से नए खाते में बिना टैक्स कटे फंड ट्रांसफर करें।'
                : 'Changed companies? Transfer your balance to keep your continuous service intact and avoid TDS.'}
            </p>
          </div>
        </div>
      </div>

      {/* Step 1: Job Count */}
      <div className="space-y-2">
        <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
          {isHindi ? 'चरण 1: आपने अब तक कुल कितनी कंपनियों में काम किया है?' : 'Step 1: How many total jobs have you had with PF deductions?'}
        </label>
        <div className="grid grid-cols-3 gap-3 max-w-md">
          {[
            { id: '1', label: '1 Job only', label_hi: '1 कंपनी' },
            { id: '2', label: '2 Jobs', label_hi: '2 कंपनियां' },
            { id: '3plus', label: '3+ Jobs', label_hi: '3 या अधिक' }
          ].map((opt) => (
            <button
              key={opt.id}
              type="button"
              onClick={() => setJobCount(opt.id)}
              className={`p-3 rounded-lg border text-xs sm:text-sm font-semibold transition cursor-pointer ${
                jobCount === opt.id
                  ? 'border-[#003399] bg-blue-50 text-[#003399] ring-2 ring-[#003399]/20'
                  : 'border-slate-200 hover:bg-slate-50 text-slate-700'
              }`}
            >
              {isHindi ? opt.label_hi : opt.label}
            </button>
          ))}
        </div>
      </div>

      {/* Step 2: Multiple UANs */}
      <div className="space-y-2 pt-2 border-t border-slate-100">
        <div className="flex items-center justify-between">
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
            {isHindi ? 'चरण 2: क्या आपके पास एक से अधिक UAN नंबर हैं?' : 'Step 2: Do you have multiple Universal Account Numbers (UAN)?'}
          </label>
          <span className="text-[11px] text-slate-500">Each UAN = 1 master account</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {[
            { id: 'no', label: 'No, Single UAN (Standard)', label_hi: 'नहीं, केवल एक UAN है' },
            { id: 'yes', label: 'Yes, Multiple UANs allocated', label_hi: 'हाँ, एक से अधिक UAN हैं' },
            { id: 'notsure', label: "Not sure — how to check", label_hi: 'पता नहीं — कैसे जांचें' }
          ].map((opt) => (
            <button
              key={opt.id}
              type="button"
              onClick={() => setHasMultipleUAN(opt.id)}
              className={`p-3 rounded-lg border text-left text-xs sm:text-sm font-semibold transition cursor-pointer ${
                hasMultipleUAN === opt.id
                  ? 'border-[#003399] bg-blue-50 text-[#003399] ring-2 ring-[#003399]/20'
                  : 'border-slate-200 hover:bg-slate-50 text-slate-700'
              }`}
            >
              {isHindi ? opt.label_hi : opt.label}
            </button>
          ))}
        </div>

        {/* Multi-UAN Deactivation Guidance */}
        {hasMultipleUAN === 'yes' && (
          <div className="bg-amber-50 border border-amber-300 rounded-xl p-4 space-y-3 mt-3 text-xs text-amber-950">
            <div className="flex items-center gap-2 font-bold text-sm text-amber-900">
              <AlertTriangle className="w-4 h-4 text-amber-600" />
              <span>{isHindi ? 'मल्टीपल UAN मर्ज प्रक्रिया (Merge Required):' : 'Mandatory UAN Merge Protocol:'}</span>
            </div>
            <p className="leading-relaxed">
              Having two active UANs will block online transfers. You must retain your latest UAN and deactivate previous ones via email.
            </p>
            <ol className="list-decimal list-inside space-y-1 font-medium text-slate-800">
              <li>Keep your MOST RECENT active UAN linked to your current employer.</li>
              <li>Send an official email to <strong>uanepf@epfindia.gov.in</strong> using the copyable template below.</li>
              <li>EPFO technical team deactivates the old UAN within 7–15 working days.</li>
              <li>Once deactivated, submit Form 13 transfer under the single retained UAN.</li>
            </ol>

            <div className="pt-2">
              <div className="flex items-center justify-between mb-1.5">
                <span className="font-bold text-[11px] text-slate-700 uppercase">UAN Merge Email Template:</span>
                <CopyButton
                  text={uanMergeEmail}
                  label="📋 Copy Merge Email"
                  label_hi="📋 ईमेल कॉपी करें"
                  variant="outline"
                  size="sm"
                />
              </div>
              <pre className="bg-slate-900 text-slate-100 p-3 rounded-lg font-mono text-[11px] whitespace-pre-wrap max-h-36 overflow-y-auto">
                {uanMergeEmail}
              </pre>
            </div>
          </div>
        )}

        {hasMultipleUAN === 'notsure' && (
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 text-xs text-blue-950 flex items-start gap-2.5 mt-3">
            <Info className="w-4 h-4 text-[#003399] flex-shrink-0 mt-0.5" />
            <div>
              <strong>How to check for multiple UANs:</strong> Check salary slips from all previous employers. If the 12-digit UAN printed is different from your current company payslip, you have multiple UANs.
            </div>
          </div>
        )}
      </div>

      {/* Step 3: First Deposit Check */}
      <div className="space-y-2 pt-2 border-t border-slate-100">
        <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
          {isHindi ? 'चरण 3: क्या आपके नए नियोक्ता ने पहली PF जमा (First Deposit) कर दी है?' : 'Step 3: Has your new employer made their first PF deposit for you?'}
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {[
            { id: 'yes', label: 'Yes, first deposit confirmed in passbook', label_hi: 'हाँ, पहली जमा हो चुकी है' },
            { id: 'no', label: 'No, joined recently (less than 45 days)', label_hi: 'नहीं, हाल ही में जॉइन किया है' },
            { id: 'dontknow', label: "I don't know / Not checked", label_hi: 'पता नहीं / पासबुक नहीं देखी' }
          ].map((opt) => (
            <button
              key={opt.id}
              type="button"
              onClick={() => setFirstDepositDone(opt.id)}
              className={`p-3 rounded-lg border text-left text-xs sm:text-sm font-semibold transition cursor-pointer ${
                firstDepositDone === opt.id
                  ? 'border-[#003399] bg-blue-50 text-[#003399] ring-2 ring-[#003399]/20'
                  : 'border-slate-200 hover:bg-slate-50 text-slate-700'
              }`}
            >
              {isHindi ? opt.label_hi : opt.label}
            </button>
          ))}
        </div>

        {firstDepositDone !== 'yes' && (
          <div className="bg-amber-50 border border-amber-300 rounded-xl p-4 text-xs text-amber-950 flex items-start gap-2.5 mt-3">
            <Clock className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
            <div>
              <strong>Transfer Prerequisite Block:</strong> You CANNOT initiate a Form 13 PF transfer until your new employer has credited at least one monthly PF contribution to your new Member ID. This usually takes 45–60 days from joining. Wait for your first EPF passbook update.
            </div>
          </div>
        )}
      </div>

      {/* Form 13 Checklist & Step Breakdown */}
      {firstDepositDone === 'yes' && hasMultipleUAN !== 'yes' && (
        <div className="space-y-4 pt-2 border-t border-slate-100">
          <div className="bg-emerald-50 border border-emerald-300 rounded-xl p-5 space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="font-bold text-sm text-emerald-950 uppercase tracking-wider flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>{isHindi ? 'फॉर्म 13 ट्रांसफर प्री-चेकलिस्ट' : 'Form 13 Transfer Readiness Checklist'}</span>
              </h4>
              <span className="text-xs bg-emerald-200/80 text-emerald-900 font-bold px-2 py-0.5 rounded-full">
                Eligible
              </span>
            </div>

            <div className="space-y-2 text-xs">
              <label className="flex items-center gap-2.5 text-slate-800 cursor-pointer">
                <input
                  type="checkbox"
                  checked={checklist.deposit}
                  onChange={(e) => setChecklist({ ...checklist, deposit: e.target.checked })}
                  className="rounded text-[#003399] focus:ring-[#003399]"
                />
                <span>✅ New employer has deposited first month contribution</span>
              </label>
              <label className="flex items-center gap-2.5 text-slate-800 cursor-pointer">
                <input
                  type="checkbox"
                  checked={checklist.exitDate}
                  onChange={(e) => setChecklist({ ...checklist, exitDate: e.target.checked })}
                  className="rounded text-[#003399] focus:ring-[#003399]"
                />
                <span>✅ Previous employer has marked Date of Exit on EPFO portal</span>
              </label>
              <label className="flex items-center gap-2.5 text-slate-800 cursor-pointer">
                <input
                  type="checkbox"
                  checked={checklist.aadhaar}
                  onChange={(e) => setChecklist({ ...checklist, aadhaar: e.target.checked })}
                  className="rounded text-[#003399] focus:ring-[#003399]"
                />
                <span>✅ Aadhaar is seeded and OTP-verified on UAN</span>
              </label>
              <label className="flex items-center gap-2.5 text-slate-800 cursor-pointer">
                <input
                  type="checkbox"
                  checked={checklist.bank}
                  onChange={(e) => setChecklist({ ...checklist, bank: e.target.checked })}
                  className="rounded text-[#003399] focus:ring-[#003399]"
                />
                <span>✅ Active Bank Account KYC is digitally approved</span>
              </label>
              <label className="flex items-center gap-2.5 text-slate-800 cursor-pointer">
                <input
                  type="checkbox"
                  checked={checklist.kyc}
                  onChange={(e) => setChecklist({ ...checklist, kyc: e.target.checked })}
                  className="rounded text-[#003399] focus:ring-[#003399]"
                />
                <span>✅ No name/DOB discrepancies (Run Pre-Check to be 100% sure)</span>
              </label>
            </div>

            {/* Step-by-Step Portal Action */}
            <div className="bg-white p-4 rounded-lg border border-emerald-200 mt-3 space-y-2 text-xs text-slate-700">
              <div className="font-bold text-slate-900 uppercase tracking-wider text-[11px]">
                How to Submit Form 13 on EPFO Portal:
              </div>
              <ol className="list-decimal list-inside space-y-1 leading-relaxed">
                <li>Log in to <strong>unifiedportal-mem.epfindia.gov.in</strong>.</li>
                <li>Go to top menu: <strong>"Online Services" → "One Member - One EPF Account (Transfer Request)"</strong>.</li>
                <li>Verify your current personal details and previous account details.</li>
                <li>Select whether you want Previous or Present employer to attest (Present employer is recommended).</li>
                <li>Click <strong>"Get OTP"</strong>, enter Aadhaar OTP, and click <strong>"Submit"</strong>.</li>
              </ol>
            </div>
          </div>
        </div>
      )}

      {/* Visual Transfer Timeline Tracker */}
      <div className="bg-slate-50 p-5 rounded-xl border border-slate-200 space-y-3">
        <div className="text-xs font-bold uppercase tracking-wider text-slate-700">
          {isHindi ? 'पीएफ ट्रांसफर जीवनचक्र टाइमलाइन (Timeline Tracker):' : 'Official Form 13 Transfer Approval Journey:'}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-4 gap-2 text-center text-xs">
          <div className="bg-white p-3 rounded-lg border border-slate-200 shadow-2xs space-y-1">
            <div className="w-6 h-6 rounded-full bg-[#003399] text-white flex items-center justify-center mx-auto text-xs font-bold">
              1
            </div>
            <div className="font-bold text-slate-900">Submitted</div>
            <div className="text-[10px] text-slate-500">Instant via Portal</div>
          </div>

          <div className="bg-white p-3 rounded-lg border border-slate-200 shadow-2xs space-y-1">
            <div className="w-6 h-6 rounded-full bg-blue-100 text-[#003399] flex items-center justify-center mx-auto text-xs font-bold">
              2
            </div>
            <div className="font-bold text-slate-900">Employer Attested</div>
            <div className="text-[10px] text-slate-500">Typically 7–15 days</div>
          </div>

          <div className="bg-white p-3 rounded-lg border border-slate-200 shadow-2xs space-y-1">
            <div className="w-6 h-6 rounded-full bg-blue-100 text-[#003399] flex items-center justify-center mx-auto text-xs font-bold">
              3
            </div>
            <div className="font-bold text-slate-900">EPFO Field Audit</div>
            <div className="text-[10px] text-slate-500">Typically 7–15 days</div>
          </div>

          <div className="bg-white p-3 rounded-lg border border-slate-200 shadow-2xs space-y-1">
            <div className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center mx-auto text-xs font-bold">
              4
            </div>
            <div className="font-bold text-emerald-800">Amount Transferred</div>
            <div className="text-[10px] text-slate-500">2–5 days after audit</div>
          </div>
        </div>
      </div>
    </div>
  );
}
