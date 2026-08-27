// src/components/PreCheckWizard/ExitDateCheck.jsx
import React, { useState } from 'react';
import { 
  Calendar, 
  CheckCircle2, 
  ArrowRight, 
  ArrowLeft,
  Mail, 
  Clock, 
  ExternalLink,
  ShieldCheck
} from 'lucide-react';
import { EmailModal } from '../common/EmailModal';
import { useLanguage } from '../common/useLanguage';
import { getExitDateGuidance } from '../../utils/exitDateGuidance';

export function ExitDateCheck({ data, onBack, onComplete }) {
  const { isHindi } = useLanguage();

  const [hasLeftJob, setHasLeftJob] = useState(data.hasLeftJob || 'yes');
  const [timeLeft, setTimeLeft] = useState(data.timeLeft || '2to6months');
  const [aadhaarLinked, setAadhaarLinked] = useState(data.aadhaarLinked || 'yes');
  const [doeUpdated, setDoeUpdated] = useState(data.doeUpdated || 'no');

  const [isEmailModalOpen, setIsEmailModalOpen] = useState(false);

  const guidance = getExitDateGuidance(timeLeft, aadhaarLinked, doeUpdated, hasLeftJob);

  const handleNext = () => {
    onComplete({
      hasLeftJob,
      timeLeft,
      aadhaarLinked,
      doeUpdated,
      exitGuidance: guidance
    });
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#003399] to-[#002270] text-white px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-white/10 rounded-lg">
            <Calendar className="w-5 h-5 text-[#F97316]" />
          </div>
          <div>
            <h2 className="text-lg font-bold">
              {isHindi ? 'चरण 3: नौकरी छोड़ने की तिथि (Date of Exit) की जांच' : 'Step 3: Has your employer updated your Date of Exit?'}
            </h2>
            <p className="text-xs text-blue-100">
              {isHindi
                ? 'नियोक्ता द्वारा एग्जिट डेट दर्ज न करने पर निकासी पूरी तरह ब्लॉक हो जाती है।'
                : 'Employers must record your exit date in the EPFO database. Without it, full withdrawals remain blocked.'}
            </p>
          </div>
        </div>
        <span className="text-xs bg-white/20 px-2.5 py-1 rounded-full font-semibold">
          3 of 3
        </span>
      </div>

      <div className="p-6 space-y-6">
        {/* Question 1: Left Job */}
        <div>
          <label className="block text-sm font-bold text-slate-800 mb-2">
            {isHindi ? '1. क्या आपने अपनी पिछली नौकरी छोड़ दी है?' : '1. Have you left your job?'}
          </label>
          <div className="grid grid-cols-2 gap-3 max-w-md">
            {[
              { id: 'yes', label: 'Yes, I have left', label_hi: 'हाँ, नौकरी छोड़ दी है' },
              { id: 'no', label: 'No, still working', label_hi: 'नहीं, अभी काम कर रहा हूँ' }
            ].map((opt) => (
              <button
                key={opt.id}
                type="button"
                onClick={() => setHasLeftJob(opt.id)}
                className={`py-3 px-4 rounded-lg border text-xs sm:text-sm font-semibold transition text-center cursor-pointer ${
                  hasLeftJob === opt.id
                    ? 'border-[#003399] bg-blue-50 text-[#003399] ring-2 ring-[#003399]/20'
                    : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                }`}
              >
                {isHindi ? opt.label_hi : opt.label}
              </button>
            ))}
          </div>
        </div>

        {hasLeftJob === 'yes' && (
          <div className="space-y-6 pt-2 border-t border-slate-100">
            {/* Question 2: Time Left */}
            <div>
              <label className="block text-sm font-bold text-slate-800 mb-2">
                {isHindi ? '2. आपको नौकरी छोड़े लगभग कितना समय हुआ है?' : '2. How long ago did you leave? (approximately)'}
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {[
                  { id: 'under2months', label: 'Less than 2 months ago', label_hi: '2 महीने से कम समय हुआ है' },
                  { id: '2to6months', label: '2 to 6 months ago', label_hi: '2 से 6 महीने हुए हैं' },
                  { id: 'over6months', label: 'More than 6 months ago', label_hi: '6 महीने से अधिक समय हुआ है' }
                ].map((opt) => (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => setTimeLeft(opt.id)}
                    className={`p-3 rounded-lg border text-left transition cursor-pointer ${
                      timeLeft === opt.id
                        ? 'border-[#003399] bg-blue-50/70 text-[#003399] font-semibold ring-2 ring-[#003399]/20'
                        : 'border-slate-200 hover:bg-slate-50 text-slate-700 text-xs'
                    }`}
                  >
                    <div className="text-xs sm:text-sm">{isHindi ? opt.label_hi : opt.label}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Question 3: Aadhaar Linked */}
            <div>
              <label className="block text-sm font-bold text-slate-800 mb-2">
                {isHindi ? '3. क्या आपका आधार आपके UAN से लिंक व OTP-सत्यापित है?' : '3. Is your Aadhaar linked to your UAN account?'}
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {[
                  { id: 'yes', label: 'Yes, fully linked & verified', label_hi: 'हाँ, लिंक और सत्यापित है' },
                  { id: 'no', label: 'No, not linked', label_hi: 'नहीं, लिंक नहीं है' },
                  { id: 'notsure', label: "I'm not sure", label_hi: 'मुझे पक्का पता नहीं है' }
                ].map((opt) => (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => setAadhaarLinked(opt.id)}
                    className={`p-3 rounded-lg border text-left transition cursor-pointer ${
                      aadhaarLinked === opt.id
                        ? 'border-[#003399] bg-blue-50/70 text-[#003399] font-semibold ring-2 ring-[#003399]/20'
                        : 'border-slate-200 hover:bg-slate-50 text-slate-700 text-xs'
                    }`}
                  >
                    <div className="text-xs sm:text-sm">{isHindi ? opt.label_hi : opt.label}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Question 4: DOE Status */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-sm font-bold text-slate-800">
                  {isHindi ? '4. क्या आपकी कंपनी ने EPFO में Date of Exit अपडेट कर दिया है?' : '4. Has your employer updated your Date of Exit in EPFO?'}
                </label>
                <a
                  href="https://unifiedportal-mem.epfindia.gov.in/memberinterface/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-blue-600 hover:underline flex items-center gap-1"
                >
                  {isHindi ? 'पोर्टल पर जांचें' : 'Check on Member Portal'} <ExternalLink className="w-3 h-3" />
                </a>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {[
                  { id: 'yes', label: 'Yes — I checked on portal', label_hi: 'हाँ — मैंने पोर्टल पर देखा है' },
                  { id: 'no', label: "No — they haven't updated it", label_hi: 'नहीं — उन्होंने अपडेट नहीं किया' },
                  { id: 'dontknow', label: "I don't know how to check", label_hi: 'मुझे जांचना नहीं आता' }
                ].map((opt) => (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => setDoeUpdated(opt.id)}
                    className={`p-3 rounded-lg border text-left transition cursor-pointer ${
                      doeUpdated === opt.id
                        ? 'border-[#003399] bg-blue-50/70 text-[#003399] font-semibold ring-2 ring-[#003399]/20'
                        : 'border-slate-200 hover:bg-slate-50 text-slate-700 text-xs'
                    }`}
                  >
                    <div className="text-xs sm:text-sm">{isHindi ? opt.label_hi : opt.label}</div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Guidance Card Output */}
        {guidance && (
          <div className="pt-2">
            <div
              className={`rounded-xl p-5 border-2 shadow-xs space-y-4 ${
                guidance.status === 'OK' || guidance.status === 'NOT_APPLICABLE'
                  ? 'bg-emerald-50/80 border-emerald-300 text-emerald-950'
                  : guidance.status === 'SELF_MARK'
                  ? 'bg-blue-50/90 border-blue-300 text-blue-950'
                  : 'bg-amber-50/90 border-amber-300 text-amber-950'
              }`}
            >
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-white shadow-xs flex-shrink-0">
                  {guidance.status === 'OK' || guidance.status === 'NOT_APPLICABLE' ? (
                    <CheckCircle2 className="w-6 h-6 text-emerald-600" />
                  ) : guidance.status === 'SELF_MARK' ? (
                    <ShieldCheck className="w-6 h-6 text-[#003399]" />
                  ) : (
                    <Clock className="w-6 h-6 text-amber-600" />
                  )}
                </div>

                <div className="space-y-1 flex-1">
                  <h3 className="font-bold text-base">
                    {guidance.status === 'OK'
                      ? isHindi ? '✅ Date of Exit ठीक है' : '✅ Date of Exit Clear'
                      : guidance.status === 'SELF_MARK'
                      ? isHindi ? '🚀 आप स्वयं एग्जिट डेट दर्ज कर सकते हैं (Self-Mark Enabled)' : '🚀 Self-Mark Available on Member Portal'
                      : isHindi ? '⏳ प्रतीक्षा अथवा आधार लिंकिंग आवश्यक' : '⏳ Action Required Before Withdrawal'}
                  </h3>
                  <p className="text-xs leading-relaxed font-medium">
                    {isHindi ? guidance.message_hi : guidance.message}
                  </p>
                </div>
              </div>

              {/* Step-by-step instructions if self-mark / link */}
              {guidance.steps && (
                <div className="bg-white/90 rounded-lg p-4 border border-blue-200/80 space-y-2">
                  <div className="font-bold text-xs text-slate-800 uppercase tracking-wider">
                    {isHindi ? 'पोर्टल पर स्वयं एग्जिट डेट दर्ज करने के चरण:' : 'How to Self-Mark on EPFO Portal:'}
                  </div>
                  <ol className="space-y-1.5 text-xs text-slate-700 list-decimal list-inside">
                    {(isHindi ? guidance.steps_hi : guidance.steps).map((st, i) => (
                      <li key={i} className="leading-relaxed">
                        {st}
                      </li>
                    ))}
                  </ol>
                </div>
              )}

              {/* Employer Email / Action Buttons */}
              <div className="flex flex-wrap items-center gap-3 pt-1">
                {guidance.showEmployerEmail && (
                  <button
                    type="button"
                    onClick={() => setIsEmailModalOpen(true)}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-[#F97316] hover:bg-[#C2590F] text-white rounded-lg text-xs font-bold shadow-xs transition cursor-pointer"
                  >
                    <Mail className="w-4 h-4" />
                    <span>{isHindi ? '📧 HR के लिए नोटिस ईमेल बनाएं' : '📧 Generate Email to Send to HR'}</span>
                  </button>
                )}

                <a
                  href="https://unifiedportal-mem.epfindia.gov.in/memberinterface/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-white hover:bg-slate-50 text-slate-700 border border-slate-300 rounded-lg text-xs font-semibold shadow-xs transition"
                >
                  <span>{isHindi ? 'EPFO पोर्टल खोलें' : 'Open Unified Portal'}</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
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
            <span>{isHindi ? '← पीछे' : '← Back to KYC Audit'}</span>
          </button>

          <button
            type="button"
            onClick={handleNext}
            className="inline-flex items-center gap-2 bg-[#003399] hover:bg-[#001f6b] text-white font-semibold px-6 py-3 rounded-lg shadow-sm hover:shadow transition cursor-pointer"
          >
            <span>{isHindi ? 'अंतिम रिपोर्ट व शील्ड देखें →' : 'Generate Pre-Check Report & Shield →'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* HR Email Modal */}
      <EmailModal
        isOpen={isEmailModalOpen}
        onClose={() => setIsEmailModalOpen(false)}
        initialData={data}
      />
    </div>
  );
}
