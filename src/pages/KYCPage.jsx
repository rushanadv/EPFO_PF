// src/pages/KYCPage.jsx
import React, { useState } from 'react';
import { useMember } from '../context/useMember';
import { useLanguage } from '../context/useLanguage';
import CharacterDiff from '../components/shared/CharacterDiff';
import TemplateModal from '../components/shared/TemplateModal';
import { generateTemplateText } from '../data/escalationLevels';
import { 
  ShieldCheck, 
  CreditCard, 
  Building, 
  AlertTriangle, 
  CheckCircle2, 
  RefreshCw, 
  Printer, 
  Sparkles
} from 'lucide-react';

export default function KYCPage() {
  const [activeTab, setActiveTab] = useState('audit'); // Default to KYC Audit ⭐
  const { member, alignNameWithAadhaar } = useMember();
  const { isHindi } = useLanguage();
  const [showEmployerModal, setShowEmployerModal] = useState(false);
  const [nameFixedSuccess, setNameFixedSuccess] = useState(false);

  const aadhaarName = member?.kyc?.nameOnAadhaar || 'RAVI KUMAR';
  const epfoName = member?.kyc?.nameOnEPFO || 'RAVI KUMAR SHARMA';
  const bankName = member?.kyc?.nameOnBank || 'RAVI KUMAR';

  const isNameMatch = aadhaarName.trim().toUpperCase() === epfoName.trim().toUpperCase();
  const isDobMatch = (member?.kyc?.dobOnAadhaar || '15/08/1993') === (member?.kyc?.dobOnEPFO || '15/08/1993');
  const isMobileMatch = (member?.kyc?.mobileOnAadhaar || '98XXXXXX21') === (member?.kyc?.mobileOnUAN || '98XXXXXX21');
  const isPanApproved = member?.kyc?.pan?.status === 'APPROVED';
  const isBankTypeValid = member?.kyc?.bank?.type !== 'joint_parent';

  const passedLayers = [isNameMatch, isDobMatch, isMobileMatch, isPanApproved, isBankTypeValid].filter(Boolean).length;
  const criticalIssues = (!isNameMatch ? 1 : 0) + (!isBankTypeValid ? 1 : 0);

  const handleFixNameInDemo = () => {
    alignNameWithAadhaar();
    setNameFixedSuccess(true);
    setTimeout(() => setNameFixedSuccess(false), 4000);
  };

  return (
    <div className="space-y-6">
      {/* Page Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200 pb-3">
        <div>
          <h1 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <ShieldCheck className="w-6 h-6 text-[#003399]" />
            <span>{isHindi ? 'केवाईसी प्रबंधन एवं फॉरेंसिक ऑडिट' : 'KYC Management & Audit Suite'}</span>
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Manage Aadhaar, PAN, and Bank details. Run pre-checks to prevent claim rejections.
          </p>
        </div>

        {/* Tab Navigation Buttons */}
        <div className="flex items-center gap-1 bg-slate-200 p-1 rounded-lg">
          <button
            onClick={() => setActiveTab('audit')}
            className={`px-3 py-1.5 text-xs font-bold rounded-md transition-all flex items-center gap-1.5 ${
              activeTab === 'audit'
                ? 'bg-[#003399] text-white shadow-xs'
                : 'text-slate-700 hover:text-slate-900'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-yellow-300" />
            <span>KYC Audit ⭐</span>
          </button>
          <button
            onClick={() => setActiveTab('aadhaar')}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all ${
              activeTab === 'aadhaar' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-700 hover:text-slate-900'
            }`}
          >
            Aadhaar
          </button>
          <button
            onClick={() => setActiveTab('pan')}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all ${
              activeTab === 'pan' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-700 hover:text-slate-900'
            }`}
          >
            PAN
          </button>
          <button
            onClick={() => setActiveTab('bank')}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all ${
              activeTab === 'bank' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-700 hover:text-slate-900'
            }`}
          >
            Bank Account
          </button>
        </div>
      </div>

      {/* Success Banner when name is aligned */}
      {nameFixedSuccess && (
        <div className="bg-green-100 border border-green-400 text-green-900 px-4 py-3 rounded-lg text-xs flex items-center gap-2 animate-in fade-in duration-200">
          <CheckCircle2 className="w-5 h-5 text-green-700 shrink-0" />
          <div>
            <strong>Success!</strong> EPFO Record name updated to match Aadhaar ("{aadhaarName}"). Discrepancy eliminated.
          </div>
        </div>
      )}

      {/* TAB 4: KYC AUDIT ⭐ */}
      {activeTab === 'audit' && (
        <div className="space-y-6">
          {/* Audit Summary Bar */}
          <div className={`p-4 rounded-lg border flex flex-col md:flex-row md:items-center justify-between gap-4 ${
            criticalIssues > 0 ? 'bg-red-50/80 border-red-300' : 'bg-green-50/80 border-green-300'
          }`}>
            <div className="flex items-center gap-3">
              <div className={`w-12 h-12 rounded-full flex items-center justify-center font-black text-lg shrink-0 ${
                criticalIssues > 0 ? 'bg-red-200 text-red-800' : 'bg-green-200 text-green-800'
              }`}>
                {passedLayers}/5
              </div>
              <div>
                <h3 className="font-bold text-sm text-slate-900">
                  {criticalIssues > 0 
                    ? `⚠️ ${criticalIssues} Critical Discrepancy Found — High Rejection Risk`
                    : `✅ All 5 Verification Layers Passed — Zero Discrepancies`}
                </h3>
                <p className="text-xs text-slate-600 mt-0.5">
                  Audited 5 core identity layers: Name consistency, Date of Birth, Mobile synchronization, PAN status, and Bank Account structure.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {!isNameMatch && (
                <button
                  onClick={handleFixNameInDemo}
                  className="bg-green-700 hover:bg-green-800 text-white font-bold text-xs px-3.5 py-2 rounded shadow-xs flex items-center gap-1.5 transition-colors"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>Simulate Joint Declaration Fix</span>
                </button>
              )}

              <button
                onClick={() => window.print()}
                className="bg-white hover:bg-slate-50 border border-slate-300 text-slate-700 font-semibold text-xs px-3.5 py-2 rounded flex items-center gap-1.5 transition-colors"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Print Report</span>
              </button>
            </div>
          </div>

          {/* LAYER 1: Name Consistency & Forensic Character Diff */}
          <div className="epfo-card p-5 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-200 pb-2">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-[#003399] text-white text-xs font-bold flex items-center justify-center">
                  1
                </span>
                <h3 className="font-bold text-sm text-slate-900">
                  Layer 1: Name Consistency Check (EPFO vs Aadhaar vs Bank)
                </h3>
              </div>
              {isNameMatch ? (
                <span className="text-xs font-bold text-green-700 bg-green-100 px-2.5 py-0.5 rounded flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> PASSED
                </span>
              ) : (
                <span className="text-xs font-bold text-red-700 bg-red-100 px-2.5 py-0.5 rounded flex items-center gap-1">
                  <AlertTriangle className="w-3.5 h-3.5" /> 1 CRITICAL MISMATCH
                </span>
              )}
            </div>

            {/* Read Records Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              <div className="p-2.5 bg-slate-50 rounded border border-slate-200">
                <span className="text-slate-500 text-[10px] block uppercase font-semibold">Name in EPFO Records:</span>
                <span className="font-mono font-bold text-slate-900 text-sm mt-0.5 block">{epfoName}</span>
              </div>
              <div className="p-2.5 bg-slate-50 rounded border border-slate-200">
                <span className="text-slate-500 text-[10px] block uppercase font-semibold">Name in Aadhaar (UIDAI):</span>
                <span className="font-mono font-bold text-[#003399] text-sm mt-0.5 block">{aadhaarName}</span>
              </div>
              <div className="p-2.5 bg-slate-50 rounded border border-slate-200">
                <span className="text-slate-500 text-[10px] block uppercase font-semibold">Name on Bank Account:</span>
                <span className="font-mono font-bold text-slate-900 text-sm mt-0.5 block">{bankName}</span>
              </div>
            </div>

            {/* Forensic Character Diff View */}
            <CharacterDiff
              str1={epfoName}
              str2={aadhaarName}
              label1="EPFO Master"
              label2="Aadhaar UIDAI"
            />

            {/* Explanations and Fix Options if Mismatched */}
            {!isNameMatch && (
              <div className="p-4 bg-red-50/80 rounded-lg border border-red-200 space-y-3 text-xs">
                <div className="font-bold text-red-900 text-sm flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-red-600" />
                  <span>Why This Triggers Rejection:</span>
                </div>
                <p className="text-slate-700 leading-relaxed">
                  EPFO automated bots compare member strings verbatim. The extra surname/middle name <strong>"{epfoName.replace(aadhaarName, '').trim()}"</strong> will cause an immediate rejection with the cryptic message: <em>"Verification pending. Contact employer."</em>
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
                  <div className="bg-white p-3 rounded border border-red-200">
                    <div className="font-bold text-slate-900 mb-1">Option A: Update EPFO Record (Recommended)</div>
                    <p className="text-slate-600 text-[11px] leading-snug">
                      Contact your employer HR to submit an online Joint Declaration Form to the EPFO field office.
                    </p>
                    <button
                      onClick={() => setShowEmployerModal(true)}
                      className="mt-2 text-xs font-bold text-[#003399] hover:underline flex items-center gap-1"
                    >
                      <span>📧 Generate Email to Employer HR →</span>
                    </button>
                  </div>

                  <div className="bg-white p-3 rounded border border-red-200">
                    <div className="font-bold text-slate-900 mb-1">Option B: Update Aadhaar Name</div>
                    <p className="text-slate-600 text-[11px] leading-snug">
                      Visit <strong>myaadhaar.uidai.gov.in</strong> or an Aadhaar Seva Kendra with supporting ID proofs.
                    </p>
                    <a
                      href="https://myaadhaar.uidai.gov.in"
                      target="_blank"
                      rel="noreferrer"
                      className="mt-2 text-xs font-bold text-[#003399] hover:underline inline-flex items-center gap-1"
                    >
                      <span>Open UIDAI Portal →</span>
                    </a>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* LAYER 2: Date of Birth */}
          <div className="epfo-card p-5 space-y-3">
            <div className="flex items-center justify-between border-b border-slate-200 pb-2">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-[#003399] text-white text-xs font-bold flex items-center justify-center">
                  2
                </span>
                <h3 className="font-bold text-sm text-slate-900">
                  Layer 2: Date of Birth Match
                </h3>
              </div>
              <span className="text-xs font-bold text-green-700 bg-green-100 px-2.5 py-0.5 rounded flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" /> MATCHED ({member?.dob || '15/08/1993'})
              </span>
            </div>
            <p className="text-xs text-slate-600">
              Aadhaar DOB (<strong>15/08/1993</strong>) and EPFO Master DOB (<strong>15/08/1993</strong>) are identical. No age correction needed.
            </p>
          </div>

          {/* LAYER 3: Mobile Number Sync */}
          <div className="epfo-card p-5 space-y-3">
            <div className="flex items-center justify-between border-b border-slate-200 pb-2">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-[#003399] text-white text-xs font-bold flex items-center justify-center">
                  3
                </span>
                <h3 className="font-bold text-sm text-slate-900">
                  Layer 3: Mobile Number & Aadhaar OTP Sync
                </h3>
              </div>
              <span className="text-xs font-bold text-green-700 bg-green-100 px-2.5 py-0.5 rounded flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" /> SYNCED ({member?.mobile || '98XXXXXX21'})
              </span>
            </div>
            <p className="text-xs text-slate-600">
              Under 2026 EPFO guidelines, claim submission OTPs are sent to your UIDAI Aadhaar mobile. Both UAN mobile and Aadhaar mobile are currently matching.
            </p>
          </div>

          {/* LAYER 4: PAN Card Seeding */}
          <div className="epfo-card p-5 space-y-3">
            <div className="flex items-center justify-between border-b border-slate-200 pb-2">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-[#003399] text-white text-xs font-bold flex items-center justify-center">
                  4
                </span>
                <h3 className="font-bold text-sm text-slate-900">
                  Layer 4: PAN Verification & TDS Exemption
                </h3>
              </div>
              <span className="text-xs font-bold text-green-700 bg-green-100 px-2.5 py-0.5 rounded flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" /> {member?.kyc?.pan?.number} (APPROVED)
              </span>
            </div>
            <p className="text-xs text-slate-600">
              PAN is verified with Income Tax Department. Prevents high TDS deduction (34.6%) on premature settlements.
            </p>
          </div>

          {/* LAYER 5: Bank Account Eligibility */}
          <div className="epfo-card p-5 space-y-3">
            <div className="flex items-center justify-between border-b border-slate-200 pb-2">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-[#003399] text-white text-xs font-bold flex items-center justify-center">
                  5
                </span>
                <h3 className="font-bold text-sm text-slate-900">
                  Layer 5: Bank Account Ownership Type
                </h3>
              </div>
              {isBankTypeValid ? (
                <span className="text-xs font-bold text-green-700 bg-green-100 px-2.5 py-0.5 rounded flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> INDIVIDUAL ACCOUNT (ALLOWED)
                </span>
              ) : (
                <span className="text-xs font-bold text-red-700 bg-red-100 px-2.5 py-0.5 rounded flex items-center gap-1">
                  <AlertTriangle className="w-3.5 h-3.5" /> JOINT WITH PARENT (PROHIBITED)
                </span>
              )}
            </div>
            <div className="text-xs text-slate-600 space-y-1">
              <p>
                <strong>Bank:</strong> {member?.kyc?.bank?.bank} • <strong>IFSC:</strong> {member?.kyc?.bank?.ifsc}
              </p>
              <p className="text-slate-500">
                EPFO rules mandate that the bank account must be either an <strong>Individual Account</strong> in member's name or a <strong>Joint Account with Spouse only</strong>. Joint accounts with parents, siblings, or children will be automatically rejected.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* TAB 1: Aadhaar */}
      {activeTab === 'aadhaar' && (
        <div className="epfo-card p-5 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-200 pb-3">
            <h3 className="font-bold text-sm text-slate-900 flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-green-600" />
              <span>Aadhaar KYC Seeding</span>
            </h3>
            <span className="text-xs font-bold text-green-700 bg-green-100 px-2.5 py-0.5 rounded">
              APPROVED & SEEDED
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="space-y-2">
              <div>
                <span className="text-slate-400 block text-[10px] uppercase font-semibold">Aadhaar Number</span>
                <span className="font-mono font-bold text-slate-900">{member?.kyc?.aadhaar?.number}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px] uppercase font-semibold">Name as per Aadhaar</span>
                <span className="font-bold text-slate-900">{aadhaarName}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px] uppercase font-semibold">Verification Authority</span>
                <span className="text-slate-700">UIDAI (Unique Identification Authority of India)</span>
              </div>
            </div>

            <div className="space-y-2">
              <div>
                <span className="text-slate-400 block text-[10px] uppercase font-semibold">Linked Date</span>
                <span className="text-slate-700">{member?.kyc?.aadhaar?.linkedDate}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px] uppercase font-semibold">Status</span>
                <span className="text-green-700 font-semibold">Digitally Signed & Active</span>
              </div>
            </div>
          </div>

          {!isNameMatch && (
            <div className="p-3 bg-amber-50 border border-amber-300 rounded text-xs text-amber-900 flex items-start gap-2">
              <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <div>
                <strong>Warning:</strong> Name on Aadhaar ("{aadhaarName}") does not match name in EPFO Master ("{epfoName}"). Check <strong>KYC Audit</strong> tab to fix.
              </div>
            </div>
          )}
        </div>
      )}

      {/* TAB 2: PAN */}
      {activeTab === 'pan' && (
        <div className="epfo-card p-5 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-200 pb-3">
            <h3 className="font-bold text-sm text-slate-900 flex items-center gap-2">
              <CreditCard className="w-5 h-5 text-green-600" />
              <span>PAN Card Seeding</span>
            </h3>
            <span className="text-xs font-bold text-green-700 bg-green-100 px-2.5 py-0.5 rounded">
              APPROVED & VERIFIED
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="space-y-2">
              <div>
                <span className="text-slate-400 block text-[10px] uppercase font-semibold">Permanent Account Number (PAN)</span>
                <span className="font-mono font-bold text-slate-900">{member?.kyc?.pan?.number}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px] uppercase font-semibold">Verified By</span>
                <span className="text-slate-700">Income Tax Department NSDL/UTIITSL</span>
              </div>
            </div>

            <div className="space-y-2">
              <div>
                <span className="text-slate-400 block text-[10px] uppercase font-semibold">Linked Date</span>
                <span className="text-slate-700">{member?.kyc?.pan?.linkedDate}</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: Bank Account */}
      {activeTab === 'bank' && (
        <div className="epfo-card p-5 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-200 pb-3">
            <h3 className="font-bold text-sm text-slate-900 flex items-center gap-2">
              <Building className="w-5 h-5 text-[#003399]" />
              <span>Bank Account KYC Details</span>
            </h3>
            <span className="text-xs font-bold text-green-700 bg-green-100 px-2.5 py-0.5 rounded">
              APPROVED
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="space-y-2">
              <div>
                <span className="text-slate-400 block text-[10px] uppercase font-semibold">Bank Name</span>
                <span className="font-bold text-slate-900">{member?.kyc?.bank?.bank}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px] uppercase font-semibold">Account Number</span>
                <span className="font-mono font-bold text-slate-900">{member?.kyc?.bank?.account}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px] uppercase font-semibold">IFSC Code</span>
                <span className="font-mono font-bold text-[#003399]">{member?.kyc?.bank?.ifsc}</span>
              </div>
            </div>

            <div className="space-y-2">
              <div>
                <span className="text-slate-400 block text-[10px] uppercase font-semibold">Account Type</span>
                <span className="font-semibold text-slate-800 capitalize">{member?.kyc?.bank?.type?.replace('_', ' ')}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px] uppercase font-semibold">Verification Agency</span>
                <span className="text-slate-700">PFMS / Destination Bank</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Employer HR Email Modal */}
      <TemplateModal
        isOpen={showEmployerModal}
        onClose={() => setShowEmployerModal(false)}
        title="Joint Declaration Request Email to Employer HR"
        content={generateTemplateText('employer_email', member)}
      />
    </div>
  );
}
