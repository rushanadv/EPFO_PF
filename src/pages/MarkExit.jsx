// src/pages/MarkExit.jsx
import React, { useState } from 'react';
import { useMember } from '../context/useMember';
import { useLanguage } from '../context/useLanguage';
import TemplateModal from '../components/shared/TemplateModal';
import { generateTemplateText } from '../data/escalationLevels';
import { 
  Building2, 
  Calendar, 
  CheckCircle2, 
  AlertTriangle, 
  Lock, 
  Mail, 
  FileText, 
  ArrowRight,
  ShieldCheck
} from 'lucide-react';

export default function MarkExit() {
  const { member, updateExitDate } = useMember();
  const { isHindi } = useLanguage();

  const [exitDate, setExitDate] = useState('2025-10-01');
  const [reason, setReason] = useState('Resignation / Cessation (Short Service)');
  const [otpSent, setOtpSent] = useState(false);
  const [otpInput, setOtpInput] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [showEmployerModal, setShowEmployerModal] = useState(false);
  const [showGrievanceModal, setShowGrievanceModal] = useState(false);

  const handleSendOtp = () => {
    setOtpSent(true);
    setOtpInput('492810'); // Pre-fill mock OTP for smooth demo
  };

  const handleSubmitExit = (e) => {
    e.preventDefault();
    if (!otpInput) return;
    setIsSubmitting(true);

    setTimeout(() => {
      const parts = exitDate.split('-');
      const formatted = parts.length === 3 ? `${parts[2]}/${parts[1]}/${parts[0]}` : exitDate;
      updateExitDate(formatted, reason);
      setIsSubmitting(false);
      setSuccess(true);
    }, 800);
  };

  return (
    <div className="space-y-6">
      {/* Title */}
      <div className="border-b border-slate-200 pb-3">
        <h1 className="text-xl font-bold text-slate-900 flex items-center gap-2">
          <Calendar className="w-6 h-6 text-[#003399]" />
          <span>{isHindi ? 'कार्यमुक्ति तिथि दर्ज करें (Mark Date of Exit)' : 'Mark Date of Exit (Self-Marking via Aadhaar OTP)'}</span>
        </h1>
        <p className="text-xs text-slate-500 mt-0.5">
          If your employer has not updated your last working day, you can self-mark your Date of Exit after 2 months of leaving.
        </p>
      </div>

      {/* Success Notification */}
      {success && (
        <div className="bg-green-100 border border-green-400 text-green-900 p-4 rounded-lg text-xs space-y-1 shadow-sm animate-in fade-in duration-200">
          <div className="font-bold text-sm flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-green-700" />
            <span>Date of Exit Successfully Marked in EPFO Records!</span>
          </div>
          <p>
            Your Date of Exit for <strong>{member?.establishment}</strong> has been updated to <strong>{member?.doe}</strong>. You can now proceed to submit Form 19 for full settlement.
          </p>
        </div>
      )}

      {/* Current Employment Status Card */}
      <div className="epfo-card p-5 bg-gradient-to-r from-slate-50 to-blue-50/40">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 pb-3 mb-3">
          <div className="flex items-center gap-2.5">
            <Building2 className="w-5 h-5 text-[#003399]" />
            <div>
              <div className="text-xs text-slate-500 font-semibold uppercase">Establishment Name</div>
              <div className="font-bold text-sm text-slate-900">{member?.establishment}</div>
            </div>
          </div>

          <div className="text-right">
            <div className="text-[10px] text-slate-500 uppercase font-semibold">Current Exit Status:</div>
            {member?.doe ? (
              <span className="font-bold text-xs text-green-700 bg-green-100 px-2.5 py-0.5 rounded inline-block mt-0.5">
                UPDATED: {member.doe}
              </span>
            ) : (
              <span className="font-bold text-xs text-red-600 bg-red-100 px-2.5 py-0.5 rounded inline-block mt-0.5">
                ⚠️ NOT UPDATED BY EMPLOYER
              </span>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
          <div>
            <span className="text-slate-400 block text-[10px]">Member ID:</span>
            <span className="font-mono font-semibold text-slate-800">{member?.memberId}</span>
          </div>
          <div>
            <span className="text-slate-400 block text-[10px]">Date of Joining (DOJ):</span>
            <span className="font-semibold text-slate-800">{member?.doj}</span>
          </div>
          <div>
            <span className="text-slate-400 block text-[10px]">Last Contribution Month:</span>
            <span className="font-semibold text-slate-800">March 2026</span>
          </div>
        </div>
      </div>

      {/* Eligibility Checklist */}
      <div className="epfo-card p-5 space-y-3">
        <h3 className="font-bold text-xs text-[#003399] uppercase tracking-wider flex items-center gap-1.5 border-b border-slate-200 pb-2">
          <ShieldCheck className="w-4 h-4 text-green-600" />
          <span>Self-Marking Eligibility Criteria</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
          <div className="p-3 bg-green-50 rounded border border-green-200 flex items-start gap-2">
            <CheckCircle2 className="w-4 h-4 text-green-600 shrink-0 mt-0.5" />
            <div>
              <div className="font-bold text-green-900">Aadhaar Linked to UAN</div>
              <div className="text-[11px] text-green-800 mt-0.5">Verified with UIDAI OTP service</div>
            </div>
          </div>

          <div className="p-3 bg-green-50 rounded border border-green-200 flex items-start gap-2">
            <CheckCircle2 className="w-4 h-4 text-green-600 shrink-0 mt-0.5" />
            <div>
              <div className="font-bold text-green-900">2-Month Cooling Period</div>
              <div className="text-[11px] text-green-800 mt-0.5">&gt; 60 days since last employer PF deposit</div>
            </div>
          </div>

          <div className="p-3 bg-green-50 rounded border border-green-200 flex items-start gap-2">
            <CheckCircle2 className="w-4 h-4 text-green-600 shrink-0 mt-0.5" />
            <div>
              <div className="font-bold text-green-900">Direct Self-Mark Eligible</div>
              <div className="text-[11px] text-green-800 mt-0.5">Authorized under Section 26B rules</div>
            </div>
          </div>
        </div>
      </div>

      {/* Guided Self-Marking Form */}
      <div className="epfo-card p-5 space-y-4 border-2 border-slate-300">
        <div className="border-b border-slate-200 pb-2 flex items-center justify-between">
          <h3 className="font-bold text-sm text-slate-900">
            {isHindi ? 'स्वयं कार्यमुक्ति तिथि दर्ज करें (चरण दर चरण)' : 'Self-Mark Your Exit (Step-by-Step Form)'}
          </h3>
          <span className="text-[10px] bg-blue-100 text-[#003399] font-bold px-2 py-0.5 rounded">
            EPFO 3.0 Engine
          </span>
        </div>

        <form onSubmit={handleSubmitExit} className="space-y-4 text-xs">
          {/* Step 1 */}
          <div className="p-3 bg-slate-50 rounded border border-slate-200 space-y-2">
            <label className="block font-bold text-slate-800">
              Step 1: Select Your Actual Date of Exit (Last Working Day) <span className="text-red-500">*</span>
            </label>
            <input
              type="date"
              value={exitDate}
              onChange={(e) => setExitDate(e.target.value)}
              className="px-3 py-2 border border-slate-300 rounded text-xs focus:ring-2 focus:ring-[#003399] focus:outline-none font-mono"
              required
            />
            <p className="text-[11px] text-slate-500">
              Tip: Enter the last working date specified in your official company Relieving Letter.
            </p>
          </div>

          {/* Step 2 */}
          <div className="p-3 bg-slate-50 rounded border border-slate-200 space-y-2">
            <label className="block font-bold text-slate-800">
              Step 2: Select Reason for Leaving <span className="text-red-500">*</span>
            </label>
            <select
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              className="w-full sm:w-96 px-3 py-2 border border-slate-300 rounded text-xs focus:ring-2 focus:ring-[#003399] focus:outline-none"
            >
              <option value="Resignation / Cessation (Short Service)">Resignation / Cessation (Short Service)</option>
              <option value="Retrenchment / Layoff">Retrenchment / Layoff</option>
              <option value="Superannuation / Retirement (Age 58+)">Superannuation / Retirement (Age 58+)</option>
              <option value="Permanent Incapacity">Permanent Incapacity</option>
              <option value="Contract Expiry">Contract Expiry</option>
            </select>
          </div>

          {/* Step 3: Aadhaar OTP Verification */}
          <div className="p-3 bg-slate-50 rounded border border-slate-200 space-y-3">
            <label className="block font-bold text-slate-800">
              Step 3: Authorize with Aadhaar OTP Verification <span className="text-red-500">*</span>
            </label>

            {!otpSent ? (
              <button
                type="button"
                onClick={handleSendOtp}
                className="bg-[#003399] hover:bg-[#001f6b] text-white font-bold text-xs px-4 py-2 rounded shadow-xs transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <Lock className="w-3.5 h-3.5" />
                <span>Request Aadhaar OTP ({member?.mobile})</span>
              </button>
            ) : (
              <div className="space-y-2">
                <div className="text-[11px] text-green-700 font-semibold flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>OTP sent to Aadhaar-linked mobile ({member?.mobile}). Demo OTP: <strong>492810</strong></span>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={otpInput}
                    onChange={(e) => setOtpInput(e.target.value)}
                    placeholder="Enter 6-digit OTP"
                    className="w-48 px-3 py-2 border border-slate-300 rounded text-xs font-mono font-bold tracking-widest text-center"
                    maxLength={6}
                    required
                  />
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="bg-green-700 hover:bg-green-800 text-white font-bold text-xs px-5 py-2 rounded shadow-xs transition-colors flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
                  >
                    <span>{isSubmitting ? 'Verifying...' : 'Confirm & Save Exit Date'}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            )}
          </div>
        </form>
      </div>

      {/* Fallback Escalate to Employer HR */}
      <div className="epfo-card p-5 bg-slate-50 border border-slate-300 space-y-3 text-xs">
        <div className="font-bold text-slate-900 text-sm flex items-center gap-2">
          <AlertTriangle className="w-4 h-4 text-[#F97316]" />
          <span>If Employer Has Not Updated and You Cannot Self-Mark:</span>
        </div>
        <p className="text-slate-600 leading-relaxed">
          If less than 2 months have passed since your exit, self-marking is locked by statute. You can dispatch an official pre-filled compliance email to your HR payroll admin or file an EPFiGMS non-compliance complaint.
        </p>

        <div className="flex flex-wrap items-center gap-3 pt-1">
          <button
            onClick={() => setShowEmployerModal(true)}
            className="bg-[#003399] hover:bg-[#001f6b] text-white font-bold text-xs px-3.5 py-2 rounded shadow-xs flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <Mail className="w-3.5 h-3.5" />
            <span>📧 Generate Email to Employer HR</span>
          </button>

          <button
            onClick={() => setShowGrievanceModal(true)}
            className="bg-white hover:bg-slate-100 border border-slate-300 text-slate-700 font-semibold text-xs px-3.5 py-2 rounded flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <FileText className="w-3.5 h-3.5" />
            <span>📝 Draft EPFiGMS Grievance</span>
          </button>
        </div>
      </div>

      {/* Modals */}
      <TemplateModal
        isOpen={showEmployerModal}
        onClose={() => setShowEmployerModal(false)}
        title="Official Exit Date Request to Employer Payroll"
        content={generateTemplateText('employer_email', member)}
      />

      <TemplateModal
        isOpen={showGrievanceModal}
        onClose={() => setShowGrievanceModal(false)}
        title="EPFiGMS Complaint for Employer Non-Marking of Exit Date"
        content={generateTemplateText('epfigms', member)}
        portalUrl="https://epfigms.gov.in"
        portalName="Open EPFiGMS"
      />
    </div>
  );
}
