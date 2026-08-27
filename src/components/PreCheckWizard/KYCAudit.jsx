// src/components/PreCheckWizard/KYCAudit.jsx
import React, { useState } from 'react';
import { 
  ShieldAlert, 
  ChevronDown, 
  ChevronUp, 
  ExternalLink, 
  ArrowRight, 
  ArrowLeft,
  Clock,
  Sparkles,
  Check
} from 'lucide-react';
import { CharacterDiff } from './CharacterDiff';
import { useLanguage } from '../common/useLanguage';
import { runKYCAudit } from '../../utils/kycValidation';

export function KYCAudit({ data, onBack, onComplete }) {
  const { isHindi } = useLanguage();

  const [formData, setFormData] = useState({
    aadhaarName: data.aadhaarName || 'RAVI KUMAR',
    epfoName: data.epfoName || 'RAVI KUMAR SHARMA',
    bankName: data.bankName || 'RAVI KUMAR',
    bankAccount: data.bankAccount || '35782910034521',
    bankIFSC: data.bankIFSC || data.ifsc || 'SBIN0012345',
    dobAadhaar: data.dobAadhaar || '15/08/1993',
    dobEPFO: data.dobEPFO || '15/08/1993',
    accountType: data.accountType || 'individual'
  });

  const [expandedIssue, setExpandedIssue] = useState('KYC_001'); // open first issue by default

  // Derive audit result during render
  const auditResult = runKYCAudit(formData);

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleRunAudit = () => {
    if (auditResult.issues.length > 0) {
      setExpandedIssue(auditResult.issues[0].id);
    }
  };

  const handleNext = () => {
    onComplete(formData, auditResult);
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#003399] to-[#002270] text-white px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-white/10 rounded-lg">
            <ShieldAlert className="w-5 h-5 text-[#F97316]" />
          </div>
          <div>
            <h2 className="text-lg font-bold">
              {isHindi ? 'चरण 2: KYC व जनसांख्यिकी सत्यापन जांच' : "Step 2: Let's check your KYC for mismatches"}
            </h2>
            <p className="text-xs text-blue-100">
              {isHindi
                ? 'दावा अस्वीकृति का #1 कारण नाम या बैंक विवरण बेमेल होना है।'
                : 'The #1 reason PF claims are rejected is a name or bank detail mismatch. Enter details exactly as in records.'}
            </p>
          </div>
        </div>
        <span className="text-xs bg-white/20 px-2.5 py-1 rounded-full font-semibold">
          2 of 3
        </span>
      </div>

      <div className="p-6 space-y-6">
        {/* Form Inputs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-slate-50/70 p-4 rounded-xl border border-slate-200">
          {/* Aadhaar Name */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              {isHindi ? 'नाम (आधार कार्ड के अनुसार)' : 'Your name exactly as in Aadhaar'}
              <span className="text-red-500 ml-1">*</span>
            </label>
            <input
              type="text"
              value={formData.aadhaarName}
              onChange={(e) => handleChange('aadhaarName', e.target.value)}
              placeholder="e.g. RAVI KUMAR"
              className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-sm font-medium focus:border-[#003399] focus:ring-2 focus:ring-[#003399]/20 outline-none"
            />
          </div>

          {/* EPFO Name */}
          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                {isHindi ? 'नाम (EPFO रिकॉर्ड के अनुसार)' : 'Your name exactly as in EPFO records'}
                <span className="text-red-500 ml-1">*</span>
              </label>
              <a
                href="https://passbook.epfindia.gov.in"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[11px] text-blue-600 hover:underline flex items-center gap-0.5 font-normal"
              >
                passbook.epfindia.gov.in <ExternalLink className="w-2.5 h-2.5" />
              </a>
            </div>
            <input
              type="text"
              value={formData.epfoName}
              onChange={(e) => handleChange('epfoName', e.target.value)}
              placeholder="e.g. RAVI KUMAR SHARMA"
              className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-sm font-medium focus:border-[#003399] focus:ring-2 focus:ring-[#003399]/20 outline-none"
            />
          </div>

          {/* Bank Passbook Name */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              {isHindi ? 'नाम (बैंक पासबुक/चेक के अनुसार)' : 'Your name exactly as in Bank Passbook'}
              <span className="text-red-500 ml-1">*</span>
            </label>
            <input
              type="text"
              value={formData.bankName}
              onChange={(e) => handleChange('bankName', e.target.value)}
              placeholder="e.g. RAVI KUMAR"
              className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-sm font-medium focus:border-[#003399] focus:ring-2 focus:ring-[#003399]/20 outline-none"
            />
          </div>

          {/* Bank Account Number */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              {isHindi ? 'बैंक खाता संख्या (Bank Account Number)' : 'Bank Account Number'}
              <span className="text-red-500 ml-1">*</span>
            </label>
            <input
              type="text"
              value={formData.bankAccount}
              onChange={(e) => handleChange('bankAccount', e.target.value)}
              placeholder="9 to 18 digits"
              className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-sm font-medium focus:border-[#003399] focus:ring-2 focus:ring-[#003399]/20 outline-none font-mono"
            />
          </div>

          {/* IFSC Code */}
          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                {isHindi ? 'बैंक IFSC कोड (11 अक्षर)' : 'IFSC Code (11 characters)'}
                <span className="text-red-500 ml-1">*</span>
              </label>
              <span className="text-[10px] text-slate-500">e.g. SBIN0012345</span>
            </div>
            <input
              type="text"
              value={formData.bankIFSC}
              onChange={(e) => handleChange('bankIFSC', e.target.value.toUpperCase())}
              placeholder="11 alphanumeric chars"
              className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-sm font-medium focus:border-[#003399] focus:ring-2 focus:ring-[#003399]/20 outline-none font-mono uppercase"
            />
          </div>

          {/* Bank Account Type */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              {isHindi ? 'खाता प्रकार (Bank Account Type)' : 'Bank Account Type'}
              <span className="text-red-500 ml-1">*</span>
            </label>
            <select
              value={formData.accountType}
              onChange={(e) => handleChange('accountType', e.target.value)}
              className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-sm font-medium focus:border-[#003399] focus:ring-2 focus:ring-[#003399]/20 outline-none cursor-pointer"
            >
              <option value="individual">Individual (Only in my single name) — Allowed ✅</option>
              <option value="joint_spouse">Joint with Spouse (Legal partner) — Allowed ✅</option>
              <option value="joint_parent">Joint with Parent, Sibling or Other — NOT ALLOWED ❌</option>
            </select>
          </div>

          {/* DOB Aadhaar */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              {isHindi ? 'जन्मतिथि (आधार के अनुसार) DD/MM/YYYY' : 'Date of Birth (as in Aadhaar) DD/MM/YYYY'}
              <span className="text-red-500 ml-1">*</span>
            </label>
            <input
              type="text"
              value={formData.dobAadhaar}
              onChange={(e) => handleChange('dobAadhaar', e.target.value)}
              placeholder="15/08/1993"
              className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-sm font-medium focus:border-[#003399] focus:ring-2 focus:ring-[#003399]/20 outline-none"
            />
          </div>

          {/* DOB EPFO */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              {isHindi ? 'जन्मतिथि (EPFO रिकॉर्ड के अनुसार) DD/MM/YYYY' : 'Date of Birth (as in EPFO) DD/MM/YYYY'}
              <span className="text-red-500 ml-1">*</span>
            </label>
            <input
              type="text"
              value={formData.dobEPFO}
              onChange={(e) => handleChange('dobEPFO', e.target.value)}
              placeholder="15/08/1993"
              className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-sm font-medium focus:border-[#003399] focus:ring-2 focus:ring-[#003399]/20 outline-none"
            />
          </div>
        </div>

        {/* Audit Results Section */}
        {auditResult && (
          <div className="space-y-4 pt-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-slate-900 text-sm sm:text-base">
                  {isHindi ? 'जांच परिणाम (Audit Findings):' : 'Audit Findings & Anomaly Detection:'}
                </h3>
                <span
                  className={`text-xs font-bold px-2.5 py-0.5 rounded-full ${
                    auditResult.issues.length === 0
                      ? 'bg-emerald-100 text-emerald-800'
                      : auditResult.criticalCount > 0
                      ? 'bg-red-100 text-red-800'
                      : 'bg-amber-100 text-amber-800'
                  }`}
                >
                  {auditResult.issues.length === 0
                    ? isHindi ? '0 त्रुटियां (ऑल क्लियर)' : '0 Issues (All Clear)'
                    : `${auditResult.issues.length} ${isHindi ? 'समस्याएं मिलीं' : 'Issues Found'}`}
                </span>
              </div>

              <button
                type="button"
                onClick={handleRunAudit}
                className="text-xs text-[#003399] hover:underline font-semibold flex items-center gap-1 cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5" />
                {isHindi ? 'पुनः जांचें' : 'Re-run Audit'}
              </button>
            </div>

            {/* If No Issues */}
            {auditResult.issues.length === 0 && (
              <div className="bg-emerald-50 border border-emerald-300 rounded-xl p-5 flex items-center gap-3.5 text-emerald-900 shadow-xs">
                <div className="w-10 h-10 rounded-full bg-emerald-600 text-white flex items-center justify-center flex-shrink-0">
                  <Check className="w-6 h-6 stroke-[3]" />
                </div>
                <div>
                  <h4 className="font-bold text-sm">
                    {isHindi ? 'उत्कृष्ट! कोई बेमेल नहीं मिला।' : 'Perfect! Zero KYC Discrepancies Found.'}
                  </h4>
                  <p className="text-xs text-emerald-800 mt-0.5">
                    {isHindi
                      ? 'आपका नाम, बैंक विवरण, IFSC और जन्मतिथि सभी रिकॉर्ड में पूर्णतः मेल खाते हैं।'
                      : 'All records (Aadhaar, EPFO, Bank account) match 100%. Your claim will not face KYC rejection.'}
                  </p>
                </div>
              </div>
            )}

            {/* List of Issue Cards */}
            {auditResult.issues.map((issue) => {
              const isExpanded = expandedIssue === issue.id;
              const isCritical = issue.severity === 'CRITICAL';
              const isHigh = issue.severity === 'HIGH';

              const borderClass = isCritical
                ? 'border-l-4 border-l-red-600 border-t border-r border-b border-red-200 bg-red-50/30'
                : isHigh
                ? 'border-l-4 border-l-[#F97316] border-t border-r border-orange-200 bg-orange-50/20'
                : 'border-l-4 border-l-amber-500 border-t border-r border-amber-200 bg-amber-50/20';

              const badgeClass = isCritical
                ? 'bg-red-100 text-red-700 border border-red-300'
                : isHigh
                ? 'bg-orange-100 text-orange-800 border border-orange-300'
                : 'bg-amber-100 text-amber-800 border border-amber-300';

              return (
                <div key={issue.id} className={`rounded-lg overflow-hidden shadow-xs transition-all ${borderClass}`}>
                  {/* Issue Header */}
                  <div
                    className="p-4 cursor-pointer flex items-start justify-between gap-3 select-none"
                    onClick={() => setExpandedIssue(isExpanded ? null : issue.id)}
                  >
                    <div className="space-y-1.5 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className={`text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full ${badgeClass}`}>
                          {issue.severity}
                        </span>
                        <h4 className="font-bold text-slate-900 text-sm">
                          {isHindi ? issue.title_hi : issue.title}
                        </h4>
                      </div>
                      <p className="text-xs text-slate-700 font-medium">
                        {isHindi ? issue.detail_hi : issue.detail}
                      </p>
                      {issue.commonCause && (
                        <p className="text-[11px] text-slate-500 italic">
                          💡 Cause: {issue.commonCause}
                        </p>
                      )}
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-xs text-slate-500 font-medium hidden sm:inline">
                        {isExpanded ? (isHindi ? 'संक्षिप्त करें' : 'Hide Fix') : (isHindi ? 'सुधार देखें' : 'How to fix ↓')}
                      </span>
                      <div className="p-1 rounded-full bg-slate-100 text-slate-600">
                        {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                      </div>
                    </div>
                  </div>

                  {/* Character Diff if enabled */}
                  {issue.diff && (
                    <div className="px-4 pb-3">
                      <CharacterDiff
                        label1={issue.diffLabel1}
                        val1={issue.diffVal1}
                        label2={issue.diffLabel2}
                        val2={issue.diffVal2}
                      />
                    </div>
                  )}

                  {/* Accordion Expand Content */}
                  {isExpanded && (
                    <div className="bg-white px-4 py-4 border-t border-slate-200 text-xs space-y-3">
                      <div>
                        <div className="font-bold text-slate-900 mb-1 flex items-center gap-1.5">
                          <span className="text-[#003399]">🛠️</span>
                          <span>{isHindi ? 'इस समस्या को कैसे ठीक करें:' : 'Step-by-Step Fix Instructions:'}</span>
                        </div>
                        <p className="text-slate-800 leading-relaxed bg-blue-50/60 p-3 rounded-lg border border-blue-200">
                          {isHindi ? issue.fix_hi : issue.fix}
                        </p>
                      </div>

                      <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
                        <div className="flex items-center gap-1.5 text-slate-600 text-[11px]">
                          <Clock className="w-3.5 h-3.5 text-amber-600" />
                          <span>
                            {isHindi ? 'अनुमानित समाधान समय: ' : 'Estimated resolution time: '}
                            <strong className="text-slate-900">{isHindi ? issue.days_hi : issue.days}</strong>
                          </span>
                        </div>

                        {issue.link && (
                          <a
                            href={issue.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#003399] hover:bg-[#001f6b] text-white rounded text-xs font-semibold shadow-xs transition"
                          >
                            <span>{issue.linkLabel || 'Open Official Portal'}</span>
                            <ExternalLink className="w-3.5 h-3.5" />
                          </a>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex items-center justify-between pt-4 border-t border-slate-100">
          <button
            type="button"
            onClick={onBack}
            className="inline-flex items-center gap-1.5 px-4 py-2.5 text-sm font-semibold text-slate-700 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>{isHindi ? '← पीछे' : '← Back to Step 1'}</span>
          </button>

          <button
            type="button"
            onClick={handleNext}
            className="inline-flex items-center gap-2 bg-[#003399] hover:bg-[#001f6b] text-white font-semibold px-6 py-3 rounded-lg shadow-sm hover:shadow transition cursor-pointer"
          >
            <span>{isHindi ? 'अगला: एग्जिट डेट जांचें' : 'Next: Check Exit Date Status'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
