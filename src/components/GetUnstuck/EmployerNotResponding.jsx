// src/components/GetUnstuck/EmployerNotResponding.jsx
import React, { useState } from 'react';
import { 
  Calendar, 
  FileCheck, 
  Mail, 
  ExternalLink, 
  Clock 
} from 'lucide-react';
import { CopyButton } from '../common/CopyButton';
import { EmailModal } from '../common/EmailModal';
import { useLanguage } from '../common/useLanguage';

export function EmployerNotResponding({ currentUser }) {
  const { isHindi } = useLanguage();
  const [selectedSubTab, setSelectedSubTab] = useState('exit_date'); // 'exit_date' | 'attestation'
  const [isEmailModalOpen, setIsEmailModalOpen] = useState(false);

  const grievanceDateOfExit = `COMPLAINT UNDER EPFIGMS — NON-COMPLIANCE BY EMPLOYER TO MARK DATE OF EXIT

To,
The Regional P.F. Commissioner,
Employees' Provident Fund Organisation (EPFO)

Subject: Employer not updating Date of Exit — blocking legitimate PF withdrawal under Section 17A

1. Complainant Name: ${currentUser.name || 'Ravi Kumar'}
2. UAN: ${currentUser.uan || '100987654321'}
3. Employer Name: ${currentUser.employer || 'TechCorp India Pvt Ltd'}
4. Establishment ID: ${currentUser.establishmentId || 'MH/BAN/0012345/000'}

Respected Sir/Madam,

I was employed with the above establishment from ${currentUser.dateOfJoining || '01/03/2019'} until my resignation/last working day on ${currentUser.dateOfExit || '31/01/2026'}.

Despite repeated reminders and formal email requests, the employer establishment has failed to mark and update my Date of Exit on the EPFO Employer Portal under Section 17A of the EPF & MP Act, 1952. Consequently, my statutory PF withdrawal claim is completely blocked.

I respectfully request EPFO to:
1. Issue a formal directive to the employer to update my Date of Exit within 7 working days.
2. If the employer fails to respond or comply, exercise the statutory powers of the Commissioner to record my Date of Exit based on the enclosed relieving letter and settle my claim.

Enclosures:
- Resignation Acceptance & Relieving Letter
- Self-attested copy of Aadhaar and Bank Passbook

Regards,
${currentUser.name || 'Ravi Kumar'}
Mobile: ${currentUser.mobileAadhaar || '9876543210'}`;

  const grievanceAttestation = `COMPLAINT UNDER EPFIGMS — DELAY IN EMPLOYER ATTESTATION / DSC APPROVAL

To,
The Regional P.F. Commissioner,
Employees' Provident Fund Organisation (EPFO)

Subject: Employer not attesting claim / pending digital signature (DSC) on Employer Portal

1. Complainant Name: ${currentUser.name || 'Ravi Kumar'}
2. UAN: ${currentUser.uan || '100987654321'}
3. Tracking ID: ${currentUser.trackingId || 'MH1908264789'}
4. Employer: ${currentUser.employer || 'TechCorp India Pvt Ltd'}

Respected Sir/Madam,

I filed my PF withdrawal/transfer claim over ${currentUser.daysFiled || 23} days ago. The claim is currently stalled at "Employer Attestation Pending / Digital Signature Authorization". 

The employer HR/Authorized Signatory has failed to log into the EPFO Employer Portal to authorize and sign the claim.

I request EPFO to issue an urgent notice to the establishment to approve the claim, or process the claim under non-attestation provisions as per EPFO Master Circular.

Yours faithfully,
${currentUser.name || 'Ravi Kumar'}
Contact: ${currentUser.mobileAadhaar || '9876543210'}`;

  return (
    <div className="space-y-6">
      {/* 2 Sub-Scenario Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <button
          type="button"
          onClick={() => setSelectedSubTab('exit_date')}
          className={`p-5 rounded-xl border text-left transition-all cursor-pointer ${
            selectedSubTab === 'exit_date'
              ? 'border-[#003399] bg-blue-50/80 ring-2 ring-[#003399]/20 shadow-xs'
              : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50'
          }`}
        >
          <div className="flex items-center gap-3 mb-2">
            <div className={`p-2 rounded-lg ${selectedSubTab === 'exit_date' ? 'bg-[#003399] text-white' : 'bg-slate-100 text-slate-600'}`}>
              <Calendar className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-sm sm:text-base text-slate-900">
                {isHindi ? 'केस A: Date of Exit अपडेट नहीं कर रहे' : 'Case A: Update my Date of Exit'}
              </h3>
              <span className="text-[11px] text-slate-500">
                {isHindi ? 'नौकरी छोड़ने की तारीख दर्ज करने का दबाव' : 'Employer hasn’t recorded your last working day'}
              </span>
            </div>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed">
            {isHindi
              ? 'यदि 2 महीने बीत चुके हैं तो स्वयं दर्ज करें, HR को कानूनी नोटिस ईमेल भेजें या EPFiGMS पर शिकायत करें।'
              : 'Self-mark instructions, Section 17A HR legal email notice, and pre-filled EPFiGMS grievance text.'}
          </p>
        </button>

        <button
          type="button"
          onClick={() => setSelectedSubTab('attestation')}
          className={`p-5 rounded-xl border text-left transition-all cursor-pointer ${
            selectedSubTab === 'attestation'
              ? 'border-[#003399] bg-blue-50/80 ring-2 ring-[#003399]/20 shadow-xs'
              : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50'
          }`}
        >
          <div className="flex items-center gap-3 mb-2">
            <div className={`p-2 rounded-lg ${selectedSubTab === 'attestation' ? 'bg-[#003399] text-white' : 'bg-slate-100 text-slate-600'}`}>
              <FileCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-sm sm:text-base text-slate-900">
                {isHindi ? 'केस B: दावे का डिजिटल सत्यापन (DSC) नहीं कर रहे' : 'Case B: Approve / Attest my claim'}
              </h3>
              <span className="text-[11px] text-slate-500">
                {isHindi ? 'नियोक्ता पोर्टल पर DSC हस्ताक्षर लंबित' : 'Employer attestation / DSC pending in employer portal'}
              </span>
            </div>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed">
            {isHindi
              ? 'नियोक्ता के लिए DSC पोर्टल निर्देश और 15 दिन बाद कमिश्नर को शिकायत दर्ज करने का प्रारूप।'
              : 'Employer portal approval guide, 15-day timeline, and non-attestation grievance escalation.'}
          </p>
        </button>
      </div>

      {/* Sub-scenario Content */}
      {selectedSubTab === 'exit_date' && (
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden p-6 space-y-6">
          <div className="flex items-center justify-between border-b border-slate-200 pb-3">
            <div className="flex items-center gap-2.5">
              <span className="p-1.5 bg-[#F97316]/10 text-[#F97316] rounded-lg">
                <Calendar className="w-5 h-5" />
              </span>
              <h3 className="font-bold text-base text-slate-900">
                {isHindi ? 'Date of Exit निवारण मार्गदर्शिका' : 'Date of Exit Resolution Blueprint'}
              </h3>
            </div>
            <button
              type="button"
              onClick={() => setIsEmailModalOpen(true)}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-[#F97316] hover:bg-[#C2590F] text-white rounded-lg text-xs font-bold shadow-xs transition cursor-pointer"
            >
              <Mail className="w-3.5 h-3.5" />
              <span>{isHindi ? '📧 HR को नोटिस भेजें' : '📧 Generate HR Email'}</span>
            </button>
          </div>

          {/* 3 Step Strategy Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-blue-50/60 border border-blue-200 p-4 rounded-xl space-y-2">
              <div className="text-[11px] font-bold text-[#003399] uppercase tracking-wider">
                Step 1: Check Self-Mark
              </div>
              <h4 className="font-bold text-slate-900 text-sm">
                {isHindi ? 'स्वयं दर्ज करें (2+ माह बाद)' : 'Self-Mark on Member Portal'}
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                If 60 days have passed since your last salary and Aadhaar is OTP-linked, go to "Manage" → "Mark Exit" on the portal. No employer approval needed!
              </p>
            </div>

            <div className="bg-orange-50/60 border border-orange-200 p-4 rounded-xl space-y-2">
              <div className="text-[11px] font-bold text-[#F97316] uppercase tracking-wider">
                Step 2: Statutory Email
              </div>
              <h4 className="font-bold text-slate-900 text-sm">
                {isHindi ? 'HR को कानूनी नोटिस ईमेल' : '7-Day Legal Email to HR'}
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Cite Section 17A of the EPF Act. Give them 7 working days before escalating to the regional Provident Fund Commissioner.
              </p>
            </div>

            <div className="bg-emerald-50/60 border border-emerald-200 p-4 rounded-xl space-y-2">
              <div className="text-[11px] font-bold text-emerald-800 uppercase tracking-wider">
                Step 3: EPFiGMS Grievance
              </div>
              <h4 className="font-bold text-slate-900 text-sm">
                {isHindi ? 'आधिकारिक शिकायत दर्ज करें' : 'File Official EPFiGMS Complaint'}
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                If HR does not act within 7 days, paste our ready template below on epfigms.gov.in. EPFO will issue a legal show-cause notice.
              </p>
            </div>
          </div>

          {/* Grievance Template Box */}
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div>
                <h4 className="font-bold text-xs uppercase tracking-wider text-slate-800">
                  {isHindi ? 'EPFiGMS शिकायत प्रारूप (Date of Exit)' : 'Ready-to-Paste EPFiGMS Grievance Text'}
                </h4>
                <p className="text-[11px] text-slate-500">
                  Copy and paste directly into the description box on epfigms.gov.in
                </p>
              </div>

              <div className="flex items-center gap-2">
                <a
                  href="https://epfigms.gov.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 px-3 py-1.5 bg-white hover:bg-slate-100 text-slate-700 border border-slate-300 rounded text-xs font-semibold shadow-xs transition"
                >
                  <span>Open epfigms.gov.in</span>
                  <ExternalLink className="w-3 h-3" />
                </a>

                <CopyButton
                  text={grievanceDateOfExit}
                  label="📋 Copy Grievance Text"
                  label_hi="📋 शिकायत कॉपी करें"
                  variant="primary"
                  size="sm"
                />
              </div>
            </div>

            <pre className="bg-slate-900 text-slate-100 p-4 rounded-lg font-mono text-xs whitespace-pre-wrap leading-relaxed border border-slate-700 max-h-56 overflow-y-auto select-all">
              {grievanceDateOfExit}
            </pre>
          </div>
        </div>
      )}

      {selectedSubTab === 'attestation' && (
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden p-6 space-y-6">
          <div className="flex items-center justify-between border-b border-slate-200 pb-3">
            <div className="flex items-center gap-2.5">
              <span className="p-1.5 bg-[#003399]/10 text-[#003399] rounded-lg">
                <FileCheck className="w-5 h-5" />
              </span>
              <h3 className="font-bold text-base text-slate-900">
                {isHindi ? 'नियोक्ता डिजिटल हस्ताक्षर (DSC) सत्यापन मार्गदर्शन' : 'Employer Claim Attestation & DSC Authorization'}
              </h3>
            </div>
          </div>

          {/* Employer Steps Instruction */}
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 space-y-3">
            <h4 className="font-bold text-xs uppercase tracking-wider text-slate-800">
              {isHindi ? 'HR / नियोक्ता को क्या करना होगा:' : 'What Your Employer HR Needs to Do on Employer Portal:'}
            </h4>
            <div className="space-y-2 text-xs text-slate-700">
              <div className="flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-full bg-[#003399] text-white flex items-center justify-center font-bold text-[10px] flex-shrink-0">1</span>
                <span>Employer logs into <strong>unifiedportal-emp.epfindia.gov.in</strong> using establishment admin credentials.</span>
              </div>
              <div className="flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-full bg-[#003399] text-white flex items-center justify-center font-bold text-[10px] flex-shrink-0">2</span>
                <span>Clicks on top navigation menu: <strong>"Online Services" → "Claim (Transfer/Withdrawal) Verification"</strong>.</span>
              </div>
              <div className="flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-full bg-[#003399] text-white flex items-center justify-center font-bold text-[10px] flex-shrink-0">3</span>
                <span>Inserts their registered Digital Signature USB Dongle (DSC) or e-Sign PIN and clicks <strong>"Approve & Sign"</strong>.</span>
              </div>
            </div>
          </div>

          {/* 15 Days Escalation Rule */}
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex items-start gap-3 text-xs text-amber-950">
            <Clock className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
            <div>
              <strong className="text-sm">15-Day Statutory Escalation Rule:</strong>
              <p className="mt-1 leading-relaxed">
                Under EPFO guidelines, employers are given a maximum of 15 working days to approve claims. If they do not act within 15 days, you can lodge an EPFiGMS grievance and request direct processing under the Commissioner's jurisdiction.
              </p>
            </div>
          </div>

          {/* Grievance Template for Attestation */}
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div>
                <h4 className="font-bold text-xs uppercase tracking-wider text-slate-800">
                  {isHindi ? 'EPFiGMS शिकायत प्रारूप (हस्ताक्षर विलंब)' : 'Ready-to-Paste EPFiGMS Grievance (Attestation Delay)'}
                </h4>
                <p className="text-[11px] text-slate-500">
                  File under Category: "Employer not attesting claim form"
                </p>
              </div>

              <div className="flex items-center gap-2">
                <a
                  href="https://epfigms.gov.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 px-3 py-1.5 bg-white hover:bg-slate-100 text-slate-700 border border-slate-300 rounded text-xs font-semibold shadow-xs transition"
                >
                  <span>Open epfigms.gov.in</span>
                  <ExternalLink className="w-3 h-3" />
                </a>

                <CopyButton
                  text={grievanceAttestation}
                  label="📋 Copy Grievance Text"
                  label_hi="📋 शिकायत कॉपी करें"
                  variant="primary"
                  size="sm"
                />
              </div>
            </div>

            <pre className="bg-slate-900 text-slate-100 p-4 rounded-lg font-mono text-xs whitespace-pre-wrap leading-relaxed border border-slate-700 max-h-56 overflow-y-auto select-all">
              {grievanceAttestation}
            </pre>
          </div>
        </div>
      )}

      {/* Modal */}
      <EmailModal
        isOpen={isEmailModalOpen}
        onClose={() => setIsEmailModalOpen(false)}
        initialData={currentUser}
      />
    </div>
  );
}
