// src/components/shared/StatusCard.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { STATUS_DATABASE } from '../../data/statusDatabase';
import { useLanguage } from '../../context/useLanguage';
import { AlertCircle, Clock, ArrowRight } from 'lucide-react';

export default function StatusCard({ statusCode = 'VERIFICATION_PENDING', daysFiled = 23 }) {
  const { isHindi } = useLanguage();
  const s = STATUS_DATABASE[statusCode] || STATUS_DATABASE.VERIFICATION_PENDING;
  const isOverdue = daysFiled > (s.escalate_after_days || 20);

  const styleMap = {
    red: {
      border: 'border-l-4 border-l-red-600 border-red-200 bg-red-50/50',
      badge: 'bg-red-100 text-red-800 border-red-300',
      icon: 'text-red-600'
    },
    blue: {
      border: 'border-l-4 border-l-blue-600 border-blue-200 bg-blue-50/50',
      badge: 'bg-blue-100 text-blue-800 border-blue-300',
      icon: 'text-blue-600'
    },
    green: {
      border: 'border-l-4 border-l-green-600 border-green-200 bg-green-50/50',
      badge: 'bg-green-100 text-green-800 border-green-300',
      icon: 'text-green-600'
    },
    yellow: {
      border: 'border-l-4 border-l-amber-500 border-amber-200 bg-amber-50/50',
      badge: 'bg-amber-100 text-amber-800 border-amber-300',
      icon: 'text-amber-600'
    }
  };

  const currentStyle = styleMap[s.status_color] || styleMap.blue;

  return (
    <div className={`epfo-card border ${currentStyle.border} p-5 space-y-4 shadow-sm`}>
      {/* Raw Status Strip */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200/80 pb-3">
        <div>
          <span className="text-[11px] font-mono uppercase tracking-wider text-slate-500 font-semibold block">
            Official Raw EPFO Status:
          </span>
          <div className="text-base font-bold text-slate-900 mt-0.5 flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-current inline-block animate-pulse"></span>
            <span>"{s.display}"</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className={`text-xs font-bold px-2.5 py-1 rounded border ${currentStyle.badge}`}>
            {statusCode}
          </span>
          <span className="text-xs text-slate-600 bg-white px-2.5 py-1 rounded border border-slate-200 font-medium">
            Filed: {daysFiled} days ago
          </span>
        </div>
      </div>

      {/* Translations Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* English Translation */}
        <div className="bg-white p-3.5 rounded border border-slate-200">
          <div className="text-xs font-bold uppercase tracking-wider text-[#003399] flex items-center gap-1.5 mb-1.5">
            <span>🇬🇧 Plain English Translation</span>
          </div>
          <p className="text-xs text-slate-700 leading-relaxed">
            {s.meaning_en}
          </p>
        </div>

        {/* Hindi Translation */}
        <div className="bg-white p-3.5 rounded border border-slate-200">
          <div className="text-xs font-bold uppercase tracking-wider text-[#F97316] flex items-center gap-1.5 mb-1.5">
            <span>🇮🇳 सरल हिंदी अर्थ</span>
          </div>
          <p className="text-xs text-slate-700 leading-relaxed font-hindi">
            {s.meaning_hi}
          </p>
        </div>
      </div>

      {/* Typical Wait & Timeline */}
      <div className="flex flex-wrap items-center justify-between gap-3 text-xs bg-slate-100/70 p-3 rounded border border-slate-200">
        <div className="flex items-center gap-2 text-slate-700">
          <Clock className="w-4 h-4 text-slate-500" />
          <span><strong>Expected Resolution Window:</strong> {s.typical_wait}</span>
        </div>
        <div className="text-slate-600">
          Citizen Charter Benchmark: <strong>20 Working Days</strong>
        </div>
      </div>

      {/* Action Required Box */}
      {s.action_required && (
        <div className="p-3.5 bg-amber-50/80 rounded-md border border-amber-300 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-start gap-2.5">
            <AlertCircle className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
            <div>
              <div className="text-xs font-bold text-amber-900 uppercase tracking-wide">
                {isHindi ? 'कार्रवाई आवश्यक (Action Required):' : 'Action Required:'}
              </div>
              <div className="text-xs text-slate-800 mt-0.5">
                {s.action_text}
              </div>
            </div>
          </div>
          <Link
            to={s.action_route || '/manage/kyc'}
            className="shrink-0 text-xs font-semibold bg-[#003399] hover:bg-[#001f6b] text-white px-3.5 py-1.5 rounded transition-colors flex items-center gap-1 self-start sm:self-auto"
          >
            <span>Fix It Now</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      )}

      {/* Overdue Warning & Escalation Trigger */}
      {isOverdue && (
        <div className="p-3.5 bg-red-100/90 rounded-md border border-red-300 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-start gap-2.5">
            <AlertCircle className="w-5 h-5 text-red-700 shrink-0 mt-0.5" />
            <div>
              <div className="text-xs font-bold text-red-900">
                ⏰ Overdue Alert: {daysFiled} days exceeds normal processing threshold!
              </div>
              <div className="text-xs text-red-800 mt-0.5">
                EPFO Citizen Charter mandates 20 days. You are legally entitled to raise an EPFiGMS Level 2 Grievance.
              </div>
            </div>
          </div>
          <Link
            to="/help/escalation"
            className="shrink-0 text-xs font-bold bg-red-700 hover:bg-red-800 text-white px-3.5 py-2 rounded shadow-xs transition-colors flex items-center gap-1.5 self-start sm:self-auto"
          >
            <span>Escalate Grievance →</span>
          </Link>
        </div>
      )}
    </div>
  );
}
