// src/components/PreCheckWizard/FormSelector.jsx
import React, { useState } from 'react';
import { 
  FileText, 
  AlertTriangle, 
  CheckCircle2, 
  ArrowRight, 
  Info, 
  Briefcase, 
  Home, 
  Repeat 
} from 'lucide-react';
import { useLanguage } from '../common/useLanguage';
import { getRecommendedForms } from '../../utils/formSelection';

export function FormSelector({ data, onComplete }) {
  const { isHindi } = useLanguage();

  const [situation, setSituation] = useState(data.situation || 'full');
  const [serviceYears, setServiceYears] = useState(data.serviceYearsOption || '5to10');
  const [joiningNewJob, setJoiningNewJob] = useState(data.joiningNewJob || 'no');

  const recommendation = getRecommendedForms(situation, serviceYears, joiningNewJob);

  const handleNext = () => {
    onComplete({
      situation,
      serviceYearsOption: serviceYears,
      joiningNewJob,
      recommendedForms: recommendation?.forms || ['Form 19', 'Form 10C']
    });
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
      {/* Card Header */}
      <div className="bg-gradient-to-r from-[#003399] to-[#002270] text-white px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-white/10 rounded-lg">
            <FileText className="w-5 h-5 text-[#F97316]" />
          </div>
          <div>
            <h2 className="text-lg font-bold">
              {isHindi ? 'चरण 1: आपको कौन सा फॉर्म भरना चाहिए?' : 'Step 1: Which form should you file?'}
            </h2>
            <p className="text-xs text-blue-100">
              {isHindi 
                ? 'गलत फॉर्म चुनने पर 35% दावे खारिज हो जाते हैं। अपनी स्थिति चुनें:' 
                : 'Over 35% of claim rejections happen due to applying with the wrong form. Let’s pick the right one.'}
            </p>
          </div>
        </div>
        <span className="text-xs bg-white/20 px-2.5 py-1 rounded-full font-semibold">
          1 of 3
        </span>
      </div>

      <div className="p-6 space-y-6">
        {/* Question 1 */}
        <div>
          <label className="block text-sm font-bold text-slate-800 mb-2">
            {isHindi ? '1. आपकी वर्तमान स्थिति क्या है?' : '1. What is your current situation?'}
          </label>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <button
              type="button"
              onClick={() => setSituation('full')}
              className={`p-4 rounded-lg border text-left flex flex-col justify-between transition-all cursor-pointer ${
                situation === 'full'
                  ? 'border-[#003399] bg-blue-50/70 ring-2 ring-[#003399]/20 shadow-xs'
                  : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50'
              }`}
            >
              <div className="flex items-center gap-2 mb-2 text-slate-900 font-semibold text-sm">
                <Home className={`w-4 h-4 ${situation === 'full' ? 'text-[#003399]' : 'text-slate-500'}`} />
                <span>{isHindi ? 'नौकरी छोड़ दी है' : 'I left my job'}</span>
              </div>
              <p className="text-xs text-slate-500">
                {isHindi ? 'पूर्ण पीएफ एवं पेंशन फंड निकालना चाहते हैं' : 'Want to withdraw my full accumulated PF & EPS balance'}
              </p>
            </button>

            <button
              type="button"
              onClick={() => setSituation('partial')}
              className={`p-4 rounded-lg border text-left flex flex-col justify-between transition-all cursor-pointer ${
                situation === 'partial'
                  ? 'border-[#003399] bg-blue-50/70 ring-2 ring-[#003399]/20 shadow-xs'
                  : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50'
              }`}
            >
              <div className="flex items-center gap-2 mb-2 text-slate-900 font-semibold text-sm">
                <Briefcase className={`w-4 h-4 ${situation === 'partial' ? 'text-[#003399]' : 'text-slate-500'}`} />
                <span>{isHindi ? 'अभी कार्यरत हूँ (Advance)' : "I'm still employed"}</span>
              </div>
              <p className="text-xs text-slate-500">
                {isHindi ? 'आपातकाल/मकान/शिक्षा हेतु आंशिक अग्रिम चाहिए' : 'Need a partial advance for medical, house, or education'}
              </p>
            </button>

            <button
              type="button"
              onClick={() => setSituation('transfer')}
              className={`p-4 rounded-lg border text-left flex flex-col justify-between transition-all cursor-pointer ${
                situation === 'transfer'
                  ? 'border-[#003399] bg-blue-50/70 ring-2 ring-[#003399]/20 shadow-xs'
                  : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50'
              }`}
            >
              <div className="flex items-center gap-2 mb-2 text-slate-900 font-semibold text-sm">
                <Repeat className={`w-4 h-4 ${situation === 'transfer' ? 'text-[#003399]' : 'text-slate-500'}`} />
                <span>{isHindi ? 'पीएफ ट्रांसफर करना है' : 'Transfer to new employer'}</span>
              </div>
              <p className="text-xs text-slate-500">
                {isHindi ? 'पुरानी कंपनी से नए खाते में बैलेंस ट्रांसफर करना है' : 'Shift old PF balance into new employer account safely'}
              </p>
            </button>
          </div>
        </div>

        {/* Conditional Questions (Only if Left Job) */}
        {situation === 'full' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2 border-t border-slate-100">
            {/* Question 2 */}
            <div>
              <label className="block text-sm font-bold text-slate-800 mb-2">
                {isHindi ? '2. आपने कुल कितने वर्ष नौकरी की?' : '2. How many total years did you work at this job?'}
              </label>
              <div className="space-y-2">
                {[
                  { id: 'under5', label: 'Less than 5 years', label_hi: '5 वर्ष से कम (TDS लागू हो सकता है)' },
                  { id: '5to10', label: '5 to 10 years', label_hi: '5 से 10 वर्ष (टैक्स-फ्री निकासी)' },
                  { id: 'over10', label: 'More than 10 years', label_hi: '10 वर्ष से अधिक (मासिक पेंशन हेतु पात्र)' }
                ].map((opt) => (
                  <label
                    key={opt.id}
                    className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition ${
                      serviceYears === opt.id
                        ? 'border-[#003399] bg-blue-50/50 text-[#003399] font-medium'
                        : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                    }`}
                  >
                    <input
                      type="radio"
                      name="serviceYears"
                      value={opt.id}
                      checked={serviceYears === opt.id}
                      onChange={() => setServiceYears(opt.id)}
                      className="text-[#003399] focus:ring-[#003399] h-4 w-4"
                    />
                    <span className="text-xs sm:text-sm">{isHindi ? opt.label_hi : opt.label}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Question 3 */}
            <div>
              <label className="block text-sm font-bold text-slate-800 mb-2">
                {isHindi ? '3. क्या आप 2 महीने के भीतर नई नौकरी शुरू कर रहे हैं?' : '3. Are you joining a new job within 2 months?'}
              </label>
              <div className="space-y-2">
                {[
                  { id: 'yes', label: 'Yes, joining soon (Transfer recommended)', label_hi: 'हाँ, जल्द जॉइन कर रहा हूँ (ट्रांसफर बेहतर)' },
                  { id: 'no', label: 'No, currently unemployed / taking break', label_hi: 'नहीं, अभी बेरोजगार हूँ / ब्रेक पर हूँ' }
                ].map((opt) => (
                  <label
                    key={opt.id}
                    className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition ${
                      joiningNewJob === opt.id
                        ? 'border-[#003399] bg-blue-50/50 text-[#003399] font-medium'
                        : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                    }`}
                  >
                    <input
                      type="radio"
                      name="joiningNewJob"
                      value={opt.id}
                      checked={joiningNewJob === opt.id}
                      onChange={() => setJoiningNewJob(opt.id)}
                      className="text-[#003399] focus:ring-[#003399] h-4 w-4"
                    />
                    <span className="text-xs sm:text-sm">{isHindi ? opt.label_hi : opt.label}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Form Recommendation Output Card */}
        {recommendation && (
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50/50 border-2 border-blue-200 rounded-xl p-5 shadow-xs space-y-3">
            <div className="flex items-center justify-between border-b border-blue-200/80 pb-3">
              <div className="flex items-center gap-2">
                <span className="text-lg">📋</span>
                <h3 className="font-bold text-slate-900 text-sm sm:text-base">
                  {isHindi ? 'अनुशंसित फॉर्म (Recommended Forms)' : 'Recommended Forms to File'}
                </h3>
              </div>
              <span className="bg-emerald-100 text-emerald-800 text-xs font-semibold px-2.5 py-0.5 rounded-full flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                {isHindi ? 'सत्यापित सलाह' : 'Auto-Computed'}
              </span>
            </div>

            {/* List of recommended forms */}
            <div className="flex flex-wrap gap-2 pt-1">
              {recommendation.forms.map((form) => (
                <div 
                  key={form} 
                  className="bg-white border border-[#003399]/30 shadow-xs px-3 py-2 rounded-lg flex items-center gap-2"
                >
                  <span className="text-emerald-600 font-bold">✅</span>
                  <div>
                    <span className="font-bold text-[#003399] text-sm">{form}</span>
                    <span className="text-xs text-slate-600 ml-1.5">
                      {form === 'Form 19' ? '— Full EPF Withdrawal' : form === 'Form 10C' ? '— EPS Pension Withdrawal' : form === 'Form 13' ? '— Online PF Transfer' : '— Partial Advance'}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Warnings / Special Tax Notes */}
            {recommendation.warning && (
              <div className="flex items-start gap-2 bg-amber-50 border border-amber-200 text-amber-900 rounded-lg p-3 text-xs leading-relaxed">
                <AlertTriangle className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold">{isHindi ? 'सावधानी / चेतावनी: ' : 'Important Warning: '}</span>
                  {isHindi ? recommendation.warning_hi : recommendation.warning}
                </div>
              </div>
            )}

            {/* Helpful Filing Note */}
            {recommendation.note && (
              <div className="flex items-start gap-2 bg-blue-100/60 border border-blue-200 text-blue-950 rounded-lg p-3 text-xs leading-relaxed">
                <Info className="w-4 h-4 text-[#003399] flex-shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold">{isHindi ? 'सलाह: ' : 'Filing Sequence: '}</span>
                  {isHindi ? recommendation.note_hi : recommendation.note}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Next Button */}
        <div className="flex items-center justify-end pt-4 border-t border-slate-100">
          <button
            type="button"
            onClick={handleNext}
            className="inline-flex items-center gap-2 bg-[#003399] hover:bg-[#001f6b] text-white font-semibold px-6 py-3 rounded-lg shadow-sm hover:shadow transition cursor-pointer"
          >
            <span>{isHindi ? 'अगला: KYC सत्यापन जांचें' : 'Next: Check KYC Mismatches'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
