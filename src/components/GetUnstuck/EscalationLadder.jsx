// src/components/GetUnstuck/EscalationLadder.jsx
import React, { useState } from 'react';
import { 
  TrendingUp, 
  Wrench, 
  FileText, 
  Building2, 
  ShieldAlert, 
  Scale, 
  ChevronDown, 
  ChevronUp, 
  ExternalLink, 
  Clock, 
  CheckCircle2, 
  AlertTriangle
} from 'lucide-react';
import { ESCALATION_LEVELS } from '../../data/escalationGuide';
import { CopyButton } from '../common/CopyButton';
import { useLanguage } from '../common/useLanguage';

export function EscalationLadder({ currentUser }) {
  const { isHindi } = useLanguage();

  const [expandedLevel, setExpandedLevel] = useState(2); // Level 2 open by default
  const [selectedTimeframe, setSelectedTimeframe] = useState('7to30'); // '<7' | '7to30' | '30to60' | '60to90' | '90plus'

  const timeframeMapping = {
    '<7': 1,
    '7to30': 2,
    '30to60': 3,
    '60to90': 4,
    '90plus': 5
  };

  const recommendedLevel = timeframeMapping[selectedTimeframe] || 2;

  const getIcon = (iconName) => {
    switch (iconName) {
      case 'Wrench': return Wrench;
      case 'FileText': return FileText;
      case 'Building2': return Building2;
      case 'ShieldAlert': return ShieldAlert;
      case 'Scale': return Scale;
      default: return TrendingUp;
    }
  };

  // Replace placeholders in templates with currentUser data
  const renderFormattedTemplate = (tpl) => {
    if (!tpl) return '';
    return tpl
      .replace(/\[MEMBER_NAME\]/g, currentUser.name || 'Ravi Kumar')
      .replace(/\[UAN_NUMBER\]/g, currentUser.uan || '100987654321')
      .replace(/\[EMPLOYER_NAME\]/g, currentUser.employer || 'TechCorp India Pvt Ltd')
      .replace(/\[ESTABLISHMENT_ID\]/g, currentUser.establishmentId || 'MH/BAN/0012345/000')
      .replace(/\[DATE_OF_JOINING\]/g, currentUser.dateOfJoining || '01/03/2019')
      .replace(/\[LAST_WORKING_DAY\]/g, currentUser.dateOfExit || '31/01/2026')
      .replace(/\[DAYS_FILED\]/g, String(currentUser.daysFiled || 23))
      .replace(/\[MOBILE_NUMBER\]/g, currentUser.mobileAadhaar || '9876543210')
      .replace(/\[TRACKING_ID\]/g, currentUser.trackingId || 'MH1908264789')
      .replace(/\[FIELD_OFFICE_OR_REGION\]/g, 'Bandra Regional Office, Mumbai')
      .replace(/\[CURRENT_DATE\]/g, new Date().toLocaleDateString('en-IN'));
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-200 pb-4">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-[#F97316]/10 rounded-lg text-[#F97316]">
            <TrendingUp className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-bold text-base sm:text-lg text-slate-900">
              {isHindi ? 'कानूनी समाधान सीढ़ी (Escalation Ladder)' : 'Statutory Escalation Ladder (5 Progressive Levels)'}
            </h3>
            <p className="text-xs text-slate-500">
              {isHindi
                ? 'यदि सामान्य पोर्टल से काम न हो, तो कानूनन अनिवार्य स्तरों का क्रमिक उपयोग करें'
                : 'From instant self-repair to binding Consumer Court actions. Never get stuck without a clear escalation path.'}
            </p>
          </div>
        </div>
      </div>

      {/* "Where Am I?" Timeframe Selector */}
      <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 space-y-3">
        <div className="flex items-center justify-between">
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
            {isHindi ? '🎯 आपकी समस्या कितने समय से अनसुलझी है?' : '🎯 "Where Am I?" — How long has your issue been stuck?'}
          </label>
          <span className="text-xs text-[#003399] font-bold">
            {isHindi ? `सुझाव: स्तर ${recommendedLevel}` : `Recommended: Level ${recommendedLevel}`}
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
          {[
            { id: '<7', label: '< 7 Days', sub: 'Start at Level 1', level: 1 },
            { id: '7to30', label: '7–30 Days', sub: 'Try Level 2 (EPFiGMS)', level: 2 },
            { id: '30to60', label: '30–60 Days', sub: 'Level 3 (CPGRAMS)', level: 3 },
            { id: '60to90', label: '60–90 Days', sub: 'Level 4 (RTI Act)', level: 4 },
            { id: '90plus', label: '90+ Days', sub: 'Level 5 (e-Daakhil)', level: 5 }
          ].map((tf) => {
            const isSelected = selectedTimeframe === tf.id;
            return (
              <button
                key={tf.id}
                type="button"
                onClick={() => {
                  setSelectedTimeframe(tf.id);
                  setExpandedLevel(tf.level);
                }}
                className={`p-3 rounded-lg border text-center transition cursor-pointer ${
                  isSelected
                    ? 'border-[#003399] bg-[#003399] text-white shadow-xs'
                    : 'border-slate-200 bg-white hover:bg-slate-100 text-slate-700'
                }`}
              >
                <div className="font-bold text-xs sm:text-sm">{tf.label}</div>
                <div className={`text-[10px] mt-0.5 ${isSelected ? 'text-blue-100' : 'text-slate-500'}`}>
                  {tf.sub}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* 5 Rungs of the Escalation Ladder */}
      <div className="space-y-3.5">
        {ESCALATION_LEVELS.map((levelItem) => {
          const isExpanded = expandedLevel === levelItem.level;
          const isRecommended = recommendedLevel === levelItem.level;
          const LevelIcon = getIcon(levelItem.icon);

          const colorStyles = {
            green: {
              border: 'border-l-emerald-600',
              badge: 'bg-emerald-100 text-emerald-800 border-emerald-300',
              iconBg: 'bg-emerald-600 text-white',
              openBg: 'bg-emerald-50/30'
            },
            blue: {
              border: 'border-l-[#003399]',
              badge: 'bg-blue-100 text-blue-900 border-blue-300',
              iconBg: 'bg-[#003399] text-white',
              openBg: 'bg-blue-50/30'
            },
            yellow: {
              border: 'border-l-amber-500',
              badge: 'bg-amber-100 text-amber-900 border-amber-300',
              iconBg: 'bg-amber-500 text-slate-900',
              openBg: 'bg-amber-50/30'
            },
            orange: {
              border: 'border-l-[#F97316]',
              badge: 'bg-orange-100 text-orange-900 border-orange-300',
              iconBg: 'bg-[#F97316] text-white',
              openBg: 'bg-orange-50/30'
            },
            red: {
              border: 'border-l-red-600',
              badge: 'bg-red-100 text-red-900 border-red-300',
              iconBg: 'bg-red-600 text-white',
              openBg: 'bg-red-50/30'
            }
          }[levelItem.color];

          const formattedTemplate = renderFormattedTemplate(levelItem.template);

          return (
            <div
              key={levelItem.level}
              className={`rounded-xl border border-slate-200 overflow-hidden shadow-2xs border-l-4 transition-all ${
                colorStyles.border
              } ${isExpanded ? colorStyles.openBg : 'bg-white'}`}
            >
              {/* Closed / Title Header */}
              <div
                className="p-4 cursor-pointer flex items-center justify-between gap-3 select-none"
                onClick={() => setExpandedLevel(isExpanded ? null : levelItem.level)}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold text-xs shadow-xs ${colorStyles.iconBg}`}>
                    <LevelIcon className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <h4 className="font-bold text-slate-900 text-sm sm:text-base">
                        {isHindi ? levelItem.title_hi : levelItem.title}
                      </h4>
                      {isRecommended && (
                        <span className="bg-[#F97316] text-white text-[10px] font-extrabold px-2 py-0.5 rounded-full uppercase tracking-wider">
                          Current Match
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-3 text-xs text-slate-500 mt-0.5">
                      <span className="flex items-center gap-1 font-medium text-slate-700">
                        <Clock className="w-3.5 h-3.5 text-slate-400" />
                        {isHindi ? levelItem.time_hi : levelItem.time}
                      </span>
                      {levelItem.cost && (
                        <span className="text-amber-700 font-semibold bg-amber-50 px-1.5 py-0.2 rounded border border-amber-200">
                          {levelItem.cost}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <div className="p-1 rounded-full bg-slate-100 text-slate-600">
                    {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </div>
                </div>
              </div>

              {/* Expanded Card Body */}
              {isExpanded && (
                <div className="p-5 pt-1 border-t border-slate-200 bg-white space-y-4 text-xs sm:text-sm">
                  <p className="text-slate-700 leading-relaxed font-normal">
                    {isHindi ? levelItem.description_hi : levelItem.description}
                  </p>

                  {/* Eligibility / Pre-requisites if any */}
                  {levelItem.eligibility && (
                    <div className="bg-red-50/70 border border-red-200 rounded-lg p-3.5 space-y-1.5 text-xs text-red-950">
                      <div className="font-bold uppercase tracking-wider flex items-center gap-1.5 text-red-800">
                        <AlertTriangle className="w-3.5 h-3.5" />
                        <span>Legal Eligibility Criteria (Consumer Court):</span>
                      </div>
                      <ul className="list-disc list-inside space-y-1 text-slate-800 pl-1">
                        {(isHindi ? levelItem.eligibility_hi || levelItem.eligibility : levelItem.eligibility).map((el, i) => (
                          <li key={i}>{el}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Actions checklist */}
                  <div className="space-y-2">
                    <h5 className="font-bold text-xs uppercase tracking-wider text-slate-800 flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4 text-[#003399]" />
                      <span>{isHindi ? 'कार्रवाई सूची (Step-by-Step Actions):' : 'Action Checklist:'}</span>
                    </h5>
                    <div className="grid grid-cols-1 gap-2">
                      {(isHindi ? levelItem.actions_hi : levelItem.actions).map((act, i) => (
                        <div
                          key={i}
                          className="flex items-start gap-2.5 bg-slate-50 p-2.5 rounded-lg border border-slate-200 text-xs text-slate-800"
                        >
                          <span className="w-4 h-4 rounded-full bg-[#003399]/10 text-[#003399] flex items-center justify-center font-bold text-[10px] flex-shrink-0 mt-0.5">
                            {i + 1}
                          </span>
                          <span>{act}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Pre-filled Template Box if available */}
                  {formattedTemplate && (
                    <div className="space-y-2 pt-2">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-xs uppercase tracking-wider text-slate-700">
                          {levelItem.level === 4 ? 'Section 6(1) RTI Legal Notice Text:' : 'Official Grievance Draft:'}
                        </span>
                        <CopyButton
                          text={formattedTemplate}
                          label={levelItem.level === 4 ? '📋 Copy RTI Text' : '📋 Copy Grievance Text'}
                          label_hi="📋 ड्राफ्ट कॉपी करें"
                          variant="primary"
                          size="sm"
                        />
                      </div>
                      <pre className="bg-slate-900 text-slate-100 p-4 rounded-lg font-mono text-xs whitespace-pre-wrap leading-relaxed max-h-56 overflow-y-auto select-all border border-slate-700">
                        {formattedTemplate}
                      </pre>
                    </div>
                  )}

                  {/* Portal Link CTA */}
                  {levelItem.link && (
                    <div className="pt-2 flex justify-end">
                      <a
                        href={levelItem.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-4 py-2 bg-[#003399] hover:bg-[#001f6b] text-white rounded-lg text-xs font-bold shadow-xs transition"
                      >
                        <span>Open {levelItem.link.replace('https://', '')}</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
