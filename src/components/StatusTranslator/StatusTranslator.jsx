// src/components/StatusTranslator/StatusTranslator.jsx
import React, { useState } from 'react';
import { 
  FileSearch, 
  Clock, 
  AlertTriangle, 
  CheckCircle2, 
  ArrowRight, 
  ExternalLink,
  Sparkles
} from 'lucide-react';
import { STATUS_DATABASE } from '../../data/statusMessages';
import { useLanguage } from '../common/useLanguage';

export function StatusTranslator({ currentUser, onNavigateToScreen, onSelectGrievance }) {
  const { isHindi } = useLanguage();

  const [selectedCode, setSelectedCode] = useState(currentUser.currentStatus || 'VERIFICATION_PENDING');
  const [customText, setCustomText] = useState('');
  const [daysFiled, setDaysFiled] = useState(currentUser.daysFiled || 23);
  const [activeStatus, setActiveStatus] = useState(
    STATUS_DATABASE.find((s) => s.code === (currentUser.currentStatus || 'VERIFICATION_PENDING')) || STATUS_DATABASE[6]
  );

  const handleTranslate = () => {
    let matched = STATUS_DATABASE.find((s) => s.code === selectedCode);
    if (customText.trim()) {
      const lower = customText.toLowerCase();
      const found = STATUS_DATABASE.find((s) =>
        s.display.toLowerCase().includes(lower) || s.code.toLowerCase().includes(lower)
      );
      if (found) matched = found;
    }
    if (matched) {
      setActiveStatus(matched);
    }
  };

  // Determine stage for progress bar
  const stages = [
    { id: 0, label: 'Claim Filed', label_hi: 'दावा प्रस्तुत' },
    { id: 1, label: 'Under Process', label_hi: 'सत्यापन जारी' },
    { id: 2, label: 'Field Approved', label_hi: 'स्वीकृत' },
    { id: 3, label: 'Bank Credited', label_hi: 'खाते में जमा' }
  ];

  const currentStage = activeStatus?.current_stage !== undefined ? activeStatus.current_stage : 1;

  // Check if overdue for escalation
  const isOverdue =
    activeStatus?.escalate_after_days !== null &&
    daysFiled > activeStatus?.escalate_after_days;

  return (
    <div className="space-y-6">
      {/* Search / Input Box */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="bg-gradient-to-r from-[#003399] to-[#002270] text-white px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-white/10 rounded-lg">
              <FileSearch className="w-5 h-5 text-[#F97316]" />
            </div>
            <div>
              <h2 className="text-lg font-bold">
                {isHindi ? 'EPFO दावा स्थिति अनुवादक' : 'EPFO Plain-Language Status Translator'}
              </h2>
              <p className="text-xs text-blue-100">
                {isHindi
                  ? 'अपने पोर्टल पर दिखाई देने वाले अस्पष्ट संदेश का वास्तविक अर्थ और अगला कदम समझें'
                  : 'Decode cryptic government error messages into simple English, Hindi, and actionable next steps.'}
              </p>
            </div>
          </div>
        </div>

        <div className="p-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Status Dropdown */}
            <div className="md:col-span-2">
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                {isHindi ? '1. EPFO पोर्टल पर आपका स्टेटस क्या दिखा रहा है?' : '1. What does your EPFO claim status say?'}
              </label>
              <select
                value={selectedCode}
                onChange={(e) => {
                  setSelectedCode(e.target.value);
                  const matched = STATUS_DATABASE.find((s) => s.code === e.target.value);
                  if (matched) setActiveStatus(matched);
                }}
                className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3.5 py-2.5 text-xs sm:text-sm font-medium focus:bg-white focus:border-[#003399] focus:ring-2 focus:ring-[#003399]/20 outline-none cursor-pointer"
              >
                {STATUS_DATABASE.map((st) => (
                  <option key={st.code} value={st.code}>
                    {st.display}
                  </option>
                ))}
              </select>
            </div>

            {/* Days filed counter */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                {isHindi ? '2. दावा जमा किए कितने दिन हुए?' : '2. Days since you filed claim'}
              </label>
              <div className="relative">
                <input
                  type="number"
                  min="1"
                  max="365"
                  value={daysFiled}
                  onChange={(e) => setDaysFiled(Math.max(1, parseInt(e.target.value) || 1))}
                  className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3.5 py-2.5 text-sm font-semibold focus:bg-white focus:border-[#003399] focus:ring-2 focus:ring-[#003399]/20 outline-none"
                />
                <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs text-slate-500 font-medium">
                  {isHindi ? 'दिन' : 'days ago'}
                </span>
              </div>
            </div>
          </div>

          {/* Optional Text Search Box */}
          <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
            <div className="w-full relative">
              <input
                type="text"
                value={customText}
                onChange={(e) => setCustomText(e.target.value)}
                placeholder={isHindi ? 'या पोर्टल का स्टेटस संदेश यहां टाइप/सर्च करें...' : 'Or type keywords from your status text here...'}
                className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3.5 py-2 text-xs focus:bg-white focus:border-[#003399] focus:ring-1 focus:ring-[#003399] outline-none"
              />
            </div>

            <button
              type="button"
              onClick={handleTranslate}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#003399] hover:bg-[#001f6b] text-white font-bold px-6 py-2 rounded-lg text-xs sm:text-sm whitespace-nowrap shadow-xs transition cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-[#F97316]" />
              <span>{isHindi ? 'अनुवाद करें →' : 'Translate Status →'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Translated Status Card Output */}
      {activeStatus && (
        <div className="bg-white rounded-xl border border-slate-200 shadow-md overflow-hidden animate-in fade-in duration-200">
          {/* Card Top Title Bar */}
          <div
            className={`px-6 py-4 flex flex-wrap items-center justify-between gap-3 border-b ${
              activeStatus.status_color === 'red'
                ? 'bg-red-50/80 border-red-200 text-red-950'
                : activeStatus.status_color === 'orange'
                ? 'bg-orange-50/80 border-orange-200 text-orange-950'
                : activeStatus.status_color === 'yellow'
                ? 'bg-amber-50/80 border-amber-200 text-amber-950'
                : 'bg-blue-50/80 border-blue-200 text-blue-950'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <span
                className={`text-[10px] font-extrabold uppercase px-2.5 py-1 rounded-full ${
                  activeStatus.status_color === 'red'
                    ? 'bg-red-600 text-white'
                    : activeStatus.status_color === 'orange'
                    ? 'bg-[#F97316] text-white'
                    : activeStatus.status_color === 'yellow'
                    ? 'bg-amber-500 text-slate-900'
                    : 'bg-[#003399] text-white'
                }`}
              >
                {isHindi ? activeStatus.badge_label_hi || 'स्थिति' : activeStatus.badge_label || activeStatus.status_color.toUpperCase()}
              </span>
              <h3 className="font-bold text-sm sm:text-base">
                "{activeStatus.display}"
              </h3>
            </div>

            <div className="flex items-center gap-2 text-xs font-semibold">
              <Clock className="w-4 h-4 text-slate-500" />
              <span>
                {isHindi ? 'अपेक्षित प्रतीक्षा: ' : 'Expected wait: '}
                <strong>{activeStatus.typical_wait}</strong>
              </span>
            </div>
          </div>

          <div className="p-6 space-y-6">
            {/* Visual Claim Journey Progress Bar */}
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
              <div className="text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-3 flex items-center justify-between">
                <span>{isHindi ? 'दावा प्रगति चरण (Claim Lifecycle Progress)' : 'Claim Lifecycle Tracking'}</span>
                <span className="text-[#003399] font-bold">
                  {isHindi ? 'आप इस चरण पर हैं' : 'Stage'}: {stages[currentStage]?.label}
                </span>
              </div>

              <div className="relative flex items-center justify-between max-w-xl mx-auto py-2">
                {/* Connecting Track */}
                <div className="absolute top-1/2 left-4 right-4 -translate-y-1/2 h-1.5 bg-slate-200 z-0"></div>
                <div
                  className="absolute top-1/2 left-4 -translate-y-1/2 h-1.5 bg-[#003399] transition-all duration-500 z-0"
                  style={{ width: `${(currentStage / (stages.length - 1)) * 100}%` }}
                ></div>

                {stages.map((stg, idx) => {
                  const isDone = idx < currentStage;
                  const isCurr = idx === currentStage;
                  return (
                    <div key={stg.id} className="flex flex-col items-center relative z-10">
                      <div
                        className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                          isDone
                            ? 'bg-[#003399] text-white shadow-xs'
                            : isCurr
                            ? 'bg-[#F97316] text-white ring-4 ring-orange-200 scale-110 shadow-sm'
                            : 'bg-white text-slate-400 border-2 border-slate-300'
                        }`}
                      >
                        {isDone ? <CheckCircle2 className="w-4 h-4" /> : idx + 1}
                      </div>
                      <span
                        className={`text-[11px] mt-1.5 font-medium text-center whitespace-nowrap ${
                          isCurr ? 'text-[#F97316] font-bold' : isDone ? 'text-[#003399]' : 'text-slate-500'
                        }`}
                      >
                        {isHindi ? stg.label_hi : stg.label}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Bilingual Meaning Sections */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* English Explanation */}
              <div className={`p-4 rounded-xl border ${isHindi ? 'order-2 bg-slate-50/70 border-slate-200' : 'order-1 bg-blue-50/50 border-blue-200'}`}>
                <div className="flex items-center gap-2 font-bold text-slate-900 text-xs uppercase tracking-wider mb-2">
                  <span>🇬🇧</span>
                  <span>What This Means (Plain English)</span>
                </div>
                <p className="text-slate-800 text-xs sm:text-sm leading-relaxed">
                  {activeStatus.meaning_en}
                </p>
              </div>

              {/* Hindi Explanation */}
              <div className={`p-4 rounded-xl border ${isHindi ? 'order-1 bg-amber-50/50 border-amber-200' : 'order-2 bg-slate-50/70 border-slate-200'}`}>
                <div className="flex items-center gap-2 font-bold text-slate-900 text-xs uppercase tracking-wider mb-2">
                  <span>🇮🇳</span>
                  <span>इसका वास्तविक मतलब (सरल हिंदी)</span>
                </div>
                <p className="text-slate-800 text-xs sm:text-sm leading-relaxed">
                  {activeStatus.meaning_hi}
                </p>
              </div>
            </div>

            {/* Action Required Box */}
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 space-y-3">
              <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#003399]" />
                  <span>{isHindi ? 'आपको क्या कार्रवाई करनी चाहिए:' : 'What You Should Do Now:'}</span>
                </h4>
                <span className="text-xs text-slate-500 font-medium">
                  {isHindi ? `आपने ${daysFiled} दिन पहले दावा किया था` : `You filed ${daysFiled} days ago`}
                </span>
              </div>

              {activeStatus.action_required ? (
                <div className="space-y-2">
                  <p className="text-xs sm:text-sm font-semibold text-red-900 bg-red-50 p-3 rounded-lg border border-red-200">
                    {isHindi ? activeStatus.action_text_hi : activeStatus.action_text}
                  </p>
                  {activeStatus.next_step && (
                    <p className="text-xs text-slate-700">
                      <strong>Next step:</strong> {isHindi ? activeStatus.next_step_hi || activeStatus.next_step : activeStatus.next_step}
                    </p>
                  )}
                </div>
              ) : (
                <div className="space-y-2">
                  <p className="text-xs sm:text-sm text-slate-800 bg-emerald-50 p-3 rounded-lg border border-emerald-200">
                    {isHindi
                      ? `✅ वर्तमान में आपको कुछ करने की आवश्यकता नहीं है। सामान्य प्रतीक्षा अवधि (${activeStatus.typical_wait}) पूरी होने दें।`
                      : `✅ No urgent manual action required right now. This is a normal stage in the queue. Allow the standard wait window of ${activeStatus.typical_wait}.`}
                  </p>
                  <p className="text-xs text-slate-600">
                    {isHindi ? activeStatus.next_step_hi : activeStatus.next_step}
                  </p>
                </div>
              )}

              {/* Special CTA if Verification Pending */}
              {activeStatus.code === 'VERIFICATION_PENDING' && (
                <div className="pt-2">
                  <button
                    type="button"
                    onClick={() => onNavigateToScreen('screen1')}
                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#003399] hover:bg-[#001f6b] text-white font-bold rounded-lg text-xs sm:text-sm shadow-xs transition cursor-pointer"
                  >
                    <span>{isHindi ? '🔍 Pre-Check Wizard चलाएं (सटीक बेमेल खोजें)' : '🔍 Run Pre-Check Wizard (Diagnose Exact Mismatch)'}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>

            {/* Escalation Prompt Banner (Automatic if daysFiled > escalate_after_days) */}
            {isOverdue && (
              <div className="bg-gradient-to-r from-amber-500 to-orange-600 text-white rounded-xl p-5 shadow-sm space-y-3 animate-in slide-in-from-bottom-2">
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-white/20 rounded-lg flex-shrink-0">
                    <AlertTriangle className="w-5 h-5 text-white" />
                  </div>
                  <div className="space-y-1 flex-1">
                    <h4 className="font-bold text-sm sm:text-base">
                      {isHindi
                        ? `⏰ आपका दावा ${daysFiled} दिनों से लंबित है — यह सामान्य अवधि (${activeStatus.escalate_after_days} दिन) से अधिक है!`
                        : `⏰ You have been at this stage for ${daysFiled} days — longer than the statutory threshold (${activeStatus.escalate_after_days} days)!`}
                    </h4>
                    <p className="text-xs text-orange-100 leading-relaxed font-normal">
                      {activeStatus.escalation_action || 'Under the Citizen Charter, you are legally entitled to raise an official EPFiGMS grievance against this unexplained delay.'}
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-3 pt-1 border-t border-white/20">
                  <button
                    type="button"
                    onClick={() => {
                      onNavigateToScreen('screen3');
                      if (onSelectGrievance) onSelectGrievance();
                    }}
                    className="inline-flex items-center gap-2 bg-white text-[#C2590F] hover:bg-orange-50 font-bold px-4 py-2 rounded-lg text-xs sm:text-sm shadow-xs transition cursor-pointer"
                  >
                    <span>{isHindi ? '📝 EPFiGMS शिकायत टेम्पलेट बनाएं →' : '📝 Generate EPFiGMS Grievance →'}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  <a
                    href="https://epfigms.gov.in"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs text-white hover:text-orange-100 font-semibold underline"
                  >
                    <span>epfigms.gov.in</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
