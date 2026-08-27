// src/pages/TrackClaim.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMember } from '../context/useMember';
import { useLanguage } from '../context/useLanguage';
import StatusCard from '../components/shared/StatusCard';
import TemplateModal from '../components/shared/TemplateModal';
import { STATUS_DATABASE } from '../data/statusDatabase';
import { generateTemplateText } from '../data/escalationLevels';
import { 
  Search, 
  BookOpen, 
  ChevronDown, 
  ChevronUp 
} from 'lucide-react';

export default function TrackClaim() {
  const { member } = useMember();
  const { isHindi } = useLanguage();

  const [searchClaimId, setSearchClaimId] = useState('');
  const [showDictionary, setShowDictionary] = useState(false);
  const [showGrievanceModal, setShowGrievanceModal] = useState(false);

  const claim = member?.activeClaim || {
    formType: 'Form 19',
    referenceId: 'MHBAN20260402000123',
    filedOn: '02/04/2026',
    daysAgo: 23,
    status: 'VERIFICATION_PENDING',
    statusText: 'Verification pending. Contact employer.',
    amount: 436000
  };

  const isOverdue = claim.daysAgo > 20;

  return (
    <div className="space-y-6">
      {/* Title */}
      <div className="border-b border-slate-200 pb-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <h1 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <Search className="w-6 h-6 text-[#003399]" />
            <span>{isHindi ? 'दावा स्थिति एवं फॉरेंसिक अनुवाद' : 'Track Claim Status & Intelligent Translator'}</span>
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Real-time claim status translated from cryptic EPFO bureaucratic jargon to plain English and Hindi.
          </p>
        </div>

        <span className="text-xs font-mono bg-blue-100 text-[#003399] font-bold px-3 py-1 rounded">
          {claim.referenceId}
        </span>
      </div>

      {/* Active Claim Summary Header */}
      <div className="epfo-card p-5 bg-gradient-to-r from-slate-50 to-blue-50/50">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
          <div>
            <span className="text-slate-400 block text-[10px] uppercase font-semibold">Claim Form Type</span>
            <span className="font-bold text-slate-900 text-sm">{claim.formType}</span>
          </div>
          <div>
            <span className="text-slate-400 block text-[10px] uppercase font-semibold">Submission Date</span>
            <span className="font-semibold text-slate-800">{claim.filedOn} ({claim.daysAgo} days ago)</span>
          </div>
          <div>
            <span className="text-slate-400 block text-[10px] uppercase font-semibold">Claim Amount</span>
            <span className="font-bold text-[#003399] text-sm">₹{claim.amount?.toLocaleString('en-IN')}</span>
          </div>
          <div>
            <span className="text-slate-400 block text-[10px] uppercase font-semibold">Processing Office</span>
            <span className="font-semibold text-slate-800">RO Bandra, Mumbai (MH)</span>
          </div>
        </div>

        {/* Claim Journey Stepper */}
        <div className="mt-6 pt-4 border-t border-slate-200">
          <div className="text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-3">
            Claim Lifecycle Stepper:
          </div>

          <div className="grid grid-cols-4 gap-2 text-center text-xs relative">
            {/* Step 1 */}
            <div className="space-y-1">
              <div className="w-7 h-7 rounded-full bg-green-600 text-white font-bold text-xs flex items-center justify-center mx-auto shadow-xs">
                ✓
              </div>
              <div className="font-bold text-slate-900 text-[11px]">Submitted Online</div>
              <div className="text-[10px] text-slate-500">{claim.filedOn}</div>
            </div>

            {/* Step 2 */}
            <div className="space-y-1">
              <div className="w-7 h-7 rounded-full bg-[#003399] text-white font-bold text-xs flex items-center justify-center mx-auto ring-4 ring-blue-100 animate-pulse">
                2
              </div>
              <div className="font-bold text-[#003399] text-[11px]">Field Examination</div>
              <div className="text-[10px] text-amber-700 font-semibold">Current State (Stuck)</div>
            </div>

            {/* Step 3 */}
            <div className="space-y-1 opacity-50">
              <div className="w-7 h-7 rounded-full bg-slate-200 text-slate-600 font-bold text-xs flex items-center justify-center mx-auto">
                3
              </div>
              <div className="font-semibold text-slate-700 text-[11px]">DA / Commissioner Approval</div>
              <div className="text-[10px] text-slate-400">Pending</div>
            </div>

            {/* Step 4 */}
            <div className="space-y-1 opacity-50">
              <div className="w-7 h-7 rounded-full bg-slate-200 text-slate-600 font-bold text-xs flex items-center justify-center mx-auto">
                4
              </div>
              <div className="font-semibold text-slate-700 text-[11px]">NEFT Bank Credit</div>
              <div className="text-[10px] text-slate-400">Pending</div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Status Translation Card */}
      <StatusCard
        statusCode={claim.status}
        daysFiled={claim.daysAgo}
      />

      {/* Action Plan Checklist */}
      <div className="epfo-card p-5 space-y-3">
        <h3 className="font-bold text-xs text-[#003399] uppercase tracking-wider border-b border-slate-200 pb-2">
          Recommended Action Checklist (In Order of Priority)
        </h3>

        <div className="space-y-2 text-xs">
          <div className="p-3 bg-red-50 rounded border border-red-200 flex items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <span className="font-bold text-red-700">1.</span>
              <span className="text-slate-800 font-medium">Audit and align your name mismatch using the KYC Audit tool.</span>
            </div>
            <Link to="/manage/kyc" className="shrink-0 text-xs font-bold text-[#003399] hover:underline">
              Open KYC Audit →
            </Link>
          </div>

          <div className="p-3 bg-amber-50 rounded border border-amber-200 flex items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <span className="font-bold text-amber-700">2.</span>
              <span className="text-slate-800 font-medium">Verify that your Date of Exit has been updated by employer or self-mark.</span>
            </div>
            <Link to="/manage/mark-exit" className="shrink-0 text-xs font-bold text-[#003399] hover:underline">
              Check Date of Exit →
            </Link>
          </div>

          {isOverdue && (
            <div className="p-3 bg-red-100 rounded border border-red-300 flex items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <span className="font-bold text-red-800">3.</span>
                <span className="text-red-900 font-bold">23 days elapsed without resolution. File a Level 2 EPFiGMS Grievance.</span>
              </div>
              <button
                onClick={() => setShowGrievanceModal(true)}
                className="shrink-0 text-xs font-bold bg-red-700 hover:bg-red-800 text-white px-3 py-1.5 rounded shadow-xs"
              >
                Generate Grievance Draft →
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Track Another Claim Box */}
      <div className="epfo-card p-5 bg-slate-50 border border-slate-300">
        <h3 className="font-bold text-xs text-slate-800 uppercase tracking-wider mb-2">
          Track Another Claim or Transfer Request
        </h3>
        <div className="flex gap-2 max-w-md">
          <input
            type="text"
            value={searchClaimId}
            onChange={(e) => setSearchClaimId(e.target.value)}
            placeholder="Enter Claim Reference ID (e.g. MHBAN2026...)"
            className="flex-1 px-3 py-2 border border-slate-300 rounded text-xs font-mono focus:ring-2 focus:ring-[#003399]"
          />
          <button
            type="button"
            className="bg-[#003399] hover:bg-[#001f6b] text-white font-bold text-xs px-4 py-2 rounded shadow-xs"
          >
            Track Claim
          </button>
        </div>
      </div>

      {/* Expandable Status Dictionary */}
      <div className="epfo-card overflow-hidden">
        <button
          onClick={() => setShowDictionary(!showDictionary)}
          className="w-full bg-[#1a4d8f] text-white px-5 py-3 text-xs font-bold uppercase tracking-wider flex items-center justify-between hover:bg-[#133869] transition-colors"
        >
          <div className="flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-yellow-300" />
            <span>EPFO Status Dictionary (What Every Bureaucratic Status Means)</span>
          </div>
          {showDictionary ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </button>

        {showDictionary && (
          <div className="p-5 divide-y divide-slate-200 text-xs space-y-4 animate-in fade-in-50 duration-150">
            {Object.entries(STATUS_DATABASE).map(([code, item]) => (
              <div key={code} className="pt-3 first:pt-0 space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="font-mono font-bold text-slate-900 text-xs">
                    "{item.display}"
                  </span>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase ${
                    item.status_color === 'red' ? 'bg-red-100 text-red-800' :
                    item.status_color === 'green' ? 'bg-green-100 text-green-800' :
                    item.status_color === 'yellow' ? 'bg-amber-100 text-amber-800' :
                    'bg-blue-100 text-blue-800'
                  }`}>
                    {code}
                  </span>
                </div>
                <div className="text-slate-700 leading-relaxed">
                  <strong>🇬🇧 Meaning:</strong> {item.meaning_en}
                </div>
                <div className="text-slate-600 leading-relaxed font-hindi">
                  <strong>🇮🇳 हिंदी:</strong> {item.meaning_hi}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Grievance Modal */}
      <TemplateModal
        isOpen={showGrievanceModal}
        onClose={() => setShowGrievanceModal(false)}
        title="EPFiGMS Pre-Filled Grievance Complaint"
        content={generateTemplateText('epfigms', member)}
        portalUrl="https://epfigms.gov.in"
        portalName="Open EPFiGMS Portal"
      />
    </div>
  );
}
