// src/components/layout/Sidebar.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { 
  BookOpen, 
  Search, 
  ShieldCheck, 
  ExternalLink, 
  PhoneCall, 
  Calendar, 
  Zap, 
  CheckCircle2, 
  Clock, 
  AlertCircle,
  FileSpreadsheet
} from 'lucide-react';
import { useMember } from '../../context/useMember';
import { useLanguage } from '../../context/useLanguage';

export default function Sidebar() {
  const { member } = useMember();
  const { isHindi, t } = useLanguage();

  const isAadhaarApproved = member?.kyc?.aadhaar?.status === 'APPROVED';
  const isPanApproved = member?.kyc?.pan?.status === 'APPROVED';
  const isBankApproved = member?.kyc?.bank?.status === 'APPROVED' && member?.kyc?.bank?.type !== 'joint_parent';
  const isKycComplete = isAadhaarApproved && isPanApproved && isBankApproved;

  return (
    <aside className="w-full lg:w-72 shrink-0 space-y-4">
      {/* Quick Links Card */}
      <div className="epfo-card overflow-hidden">
        <div className="bg-[#003399] text-white px-4 py-2.5 text-xs font-bold uppercase tracking-wider flex items-center justify-between">
          <span>{isHindi ? 'त्वरित लिंक (Quick Links)' : 'Quick Links'}</span>
          <Zap className="w-3.5 h-3.5 text-yellow-300" />
        </div>
        <div className="divide-y divide-slate-100 text-xs">
          <Link
            to="/passbook"
            className="flex items-center gap-2.5 px-4 py-2.5 text-slate-700 hover:bg-[#E8EEF9] hover:text-[#003399] transition-colors font-medium"
          >
            <BookOpen className="w-4 h-4 text-[#003399]" />
            <span>{isHindi ? '📒 पासबुक देखें (View Passbook)' : '📒 View Passbook & Contributions'}</span>
          </Link>

          <Link
            to="/services/track"
            className="flex items-center gap-2.5 px-4 py-2.5 text-slate-700 hover:bg-[#E8EEF9] hover:text-[#003399] transition-colors font-medium"
          >
            <Search className="w-4 h-4 text-[#003399]" />
            <span>{isHindi ? '📋 दावा ट्रैक करें (Track Claim)' : '📋 Track Claim Status & Details'}</span>
          </Link>

          <Link
            to="/manage/kyc"
            className="flex items-center gap-2.5 px-4 py-2.5 text-slate-700 hover:bg-[#E8EEF9] hover:text-[#003399] transition-colors font-medium justify-between"
          >
            <div className="flex items-center gap-2.5">
              <ShieldCheck className="w-4 h-4 text-green-600" />
              <span>{isHindi ? '🛡️ केवाईसी ऑडिट (KYC Audit)' : '🛡️ KYC Audit & Forensic Diff'}</span>
            </div>
            <span className="text-[10px] bg-amber-100 text-amber-800 font-bold px-1.5 py-0.5 rounded">
              ⭐ NEW
            </span>
          </Link>

          <a
            href="https://epfigms.gov.in"
            target="_blank"
            rel="noreferrer"
            className="flex items-center justify-between px-4 py-2.5 text-slate-700 hover:bg-[#E8EEF9] hover:text-[#003399] transition-colors font-medium"
          >
            <div className="flex items-center gap-2.5">
              <FileSpreadsheet className="w-4 h-4 text-[#F97316]" />
              <span>{isHindi ? '📝 शिकायत दर्ज करें (EPFiGMS)' : '📝 Raise EPFiGMS Grievance'}</span>
            </div>
            <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
          </a>

          <a
            href="https://web.umang.gov.in"
            target="_blank"
            rel="noreferrer"
            className="flex items-center justify-between px-4 py-2.5 text-slate-700 hover:bg-[#E8EEF9] hover:text-[#003399] transition-colors font-medium"
          >
            <div className="flex items-center gap-2.5">
              <span className="text-sm">📱</span>
              <span>UMANG App Portal</span>
            </div>
            <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
          </a>
        </div>
      </div>

      {/* Helpline Card */}
      <div className="epfo-card overflow-hidden">
        <div className="bg-[#001f6b] text-white px-4 py-2.5 text-xs font-bold uppercase tracking-wider flex items-center gap-2">
          <PhoneCall className="w-3.5 h-3.5 text-yellow-300" />
          <span>{t('helpline_title')}</span>
        </div>
        <div className="p-4 space-y-2.5 text-xs">
          <div className="flex items-center gap-2 text-[#F97316] font-bold text-lg">
            <span>📞 14470</span>
          </div>
          <div className="text-slate-700 text-xs font-medium">
            {t('helpline_hours')}
          </div>
          <p className="text-slate-500 text-[11px] leading-relaxed">
            {isHindi
              ? 'हिंदी, अंग्रेजी, कन्नड़, तमिल, तेलुगु, मराठी, बंगाली और गुजराती में सहायता उपलब्ध।'
              : 'Support available in Hindi, English, Kannada, Tamil, Telugu, Marathi, Bengali & Gujarati.'}
          </p>
          <div className="pt-2 border-t border-slate-200 text-slate-600 text-[11px]">
            Alt Toll-Free: <strong>1800-118-005</strong><br />
            (Mon–Fri, 9:15 AM – 5:45 PM)
          </div>
        </div>
      </div>

      {/* EPFO 3.0 Readiness Card */}
      <div className="bg-[#E8EEF9] border border-blue-200 rounded-lg p-3.5 shadow-xs space-y-2.5">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-[#003399] uppercase tracking-wide flex items-center gap-1.5">
            <Zap className="w-3.5 h-3.5 text-[#F97316]" />
            <span>{isHindi ? 'ईपीएफओ 3.0 तत्परता' : 'EPFO 3.0 Readiness'}</span>
          </span>
          <span className="text-[10px] bg-blue-200 text-blue-900 font-bold px-2 py-0.5 rounded-full">
            2026 Engine
          </span>
        </div>

        <div className="space-y-2 text-xs bg-white p-3 rounded border border-blue-200/60 divide-y divide-slate-100">
          <div className="flex justify-between items-center pb-1.5">
            <span className="text-slate-700 font-medium">{isHindi ? 'ऑटो-सेटलमेंट (≤ ₹5L)' : 'Auto-Settlement (≤ ₹5L)'}</span>
            <span className="text-green-700 font-bold text-[11px] bg-green-100 px-2 py-0.5 rounded flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3" /> Live
            </span>
          </div>

          <div className="flex justify-between items-center py-1.5">
            <span className="text-slate-700 font-medium">{isHindi ? 'यूपीआई निकासी' : 'UPI Withdrawal'}</span>
            <span className="text-amber-800 font-bold text-[11px] bg-amber-100 px-2 py-0.5 rounded flex items-center gap-1">
              <Clock className="w-3 h-3" /> Q3 2026
            </span>
          </div>

          <div className="flex justify-between items-center py-1.5">
            <span className="text-slate-700 font-medium">{isHindi ? 'एटीएम निकासी कार्ड' : 'ATM Withdrawal Card'}</span>
            <span className="text-amber-800 font-bold text-[11px] bg-amber-100 px-2 py-0.5 rounded flex items-center gap-1">
              <Clock className="w-3 h-3" /> Pilot Phase
            </span>
          </div>

          <div className="flex justify-between items-center pt-1.5">
            <span className="text-slate-700 font-medium">{isHindi ? 'केवाईसी स्थिति' : 'Member KYC Status'}</span>
            {isKycComplete ? (
              <span className="text-green-700 font-bold text-[11px] bg-green-100 px-2 py-0.5 rounded flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3" /> 100% Ready
              </span>
            ) : (
              <span className="text-red-700 font-bold text-[11px] bg-red-100 px-2 py-0.5 rounded flex items-center gap-1">
                <AlertCircle className="w-3 h-3" /> Action Needed
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Important Notices Timeline Card */}
      <div className="epfo-card overflow-hidden">
        <div className="bg-[#1a4d8f] text-white px-4 py-2.5 text-xs font-bold uppercase tracking-wider flex items-center gap-2">
          <Calendar className="w-3.5 h-3.5 text-yellow-300" />
          <span>{isHindi ? 'महत्वपूर्ण सूचनाएं' : 'Important Bulletins'}</span>
        </div>
        <div className="p-3.5 space-y-3">
          {[
            {
              date: isHindi ? 'जुलाई 2026' : 'Jul 2026',
              badge: 'Passbook',
              text: isHindi ? 'सितंबर-अक्टूबर 2025 की पासबुक अपडेट प्रक्रियाधीन है।' : 'Passbook updates for Sep–Oct 2025 under process. Temporary non-visibility expected.'
            },
            {
              date: isHindi ? 'अप्रैल 2026' : 'Apr 2026',
              badge: 'Taxation',
              text: isHindi ? 'फॉर्म 121 ने टीडीएस छूट घोषणा के लिए फॉर्म 15G/15H की जगह ली।' : 'Form 121 officially replaces Forms 15G/15H for Nil/Reduced TDS declaration.'
            },
            {
              date: isHindi ? 'मार्च 2026' : 'Mar 2026',
              badge: 'Interest Rate',
              text: isHindi ? 'वित्त वर्ष 2025-26 के लिए सीबीटी द्वारा 8.25% ब्याज दर घोषित।' : 'CBT announces 8.25% interest rate on EPF accumulations for FY 2025-26.'
            },
            {
              date: isHindi ? 'जनवरी 2026' : 'Jan 2026',
              badge: 'Security',
              text: isHindi ? 'सदस्य पोर्टल लॉगिन के लिए आधार ओटीपी अनिवार्य किया गया।' : 'Dual-factor Aadhaar OTP authentication made mandatory for all Member Portal sign-ins.'
            }
          ].map((item, idx) => (
            <div key={idx} className="border-l-2 border-[#F97316] pl-2.5 py-0.5 text-xs space-y-0.5">
              <div className="flex items-center gap-2">
                <span className="text-[10px] text-slate-500 font-bold">{item.date}</span>
                <span className="text-[9px] bg-slate-200 text-slate-700 font-semibold px-1.5 rounded">
                  {item.badge}
                </span>
              </div>
              <p className="text-slate-700 text-[11px] leading-snug">
                {item.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </aside>
  );
}
