// src/pages/EscalationLadder.jsx
import React, { useState } from 'react';
import { useMember } from '../context/useMember';
import { useLanguage } from '../context/useLanguage';
import { ESCALATION_LEVELS, generateTemplateText } from '../data/escalationLevels';
import TemplateModal from '../components/shared/TemplateModal';
import { 
  Scale, 
  FileText, 
  ExternalLink, 
  ArrowRight
} from 'lucide-react';

export default function EscalationLadder() {
  const { member } = useMember();
  const { isHindi } = useLanguage();

  const [daysStuck, setDaysStuck] = useState(member?.activeClaim?.daysAgo || 23);
  const [activeModalType, setActiveModalType] = useState(null);

  // Compute active level based on days stuck
  const currentLevelNumber = daysStuck <= 7 ? 1 : daysStuck <= 30 ? 2 : daysStuck <= 60 ? 3 : daysStuck <= 90 ? 4 : 5;

  const modalConfig = {
    epfigms: {
      title: 'EPFiGMS Official Grievance Draft',
      content: generateTemplateText('epfigms', { ...member, activeClaim: { ...member.activeClaim, daysAgo: daysStuck } }),
      portalUrl: 'https://epfigms.gov.in',
      portalName: 'Open EPFiGMS Portal'
    },
    employer_email: {
      title: 'Official Email to Employer HR / Payroll',
      content: generateTemplateText('employer_email', { ...member, activeClaim: { ...member.activeClaim, daysAgo: daysStuck } }),
      portalUrl: null
    },
    rti: {
      title: 'RTI Application Draft under Section 6(1)',
      content: generateTemplateText('rti', { ...member, activeClaim: { ...member.activeClaim, daysAgo: daysStuck } }),
      portalUrl: 'https://rtionline.gov.in',
      portalName: 'Open RTI Online Portal'
    },
    cpgrams: {
      title: 'CPGRAMS Central Govt Grievance Draft',
      content: generateTemplateText('cpgrams', { ...member, activeClaim: { ...member.activeClaim, daysAgo: daysStuck } }),
      portalUrl: 'https://pgportal.gov.in',
      portalName: 'Open CPGRAMS Portal'
    }
  };

  return (
    <div className="space-y-6">
      {/* Title */}
      <div className="border-b border-slate-200 pb-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <Scale className="w-6 h-6 text-[#003399]" />
            <span>{isHindi ? 'कानूनी शिकायत निवारण सीढ़ी (5-Level Escalation Ladder)' : 'Legal Escalation Ladder (From Stuck to Settled)'}</span>
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            When standard portal processes stall, follow your statutory rights from Level 1 self-audit to Level 5 Consumer Court.
          </p>
        </div>

        <span className="text-xs bg-red-100 text-red-800 font-bold px-3 py-1 rounded">
          Citizen Charter Mandate: 20 Days
        </span>
      </div>

      {/* Situation Calculator Card */}
      <div className="epfo-card p-5 bg-gradient-to-r from-slate-50 to-blue-50/60 border border-blue-200">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              Your Current Situation:
            </div>
            <div className="flex items-center gap-3">
              <span className="text-xs text-slate-700">Days since claim filed:</span>
              <input
                type="number"
                min={1}
                max={365}
                value={daysStuck}
                onChange={(e) => setDaysStuck(parseInt(e.target.value, 10) || 1)}
                className="w-20 px-3 py-1.5 border border-slate-300 rounded font-bold font-mono text-center text-sm focus:ring-2 focus:ring-[#003399]"
              />
              <span className="text-xs text-slate-600 font-medium">calendar days</span>
            </div>
          </div>

          <div className="p-3 bg-white rounded-lg border border-slate-200 shadow-xs flex items-center gap-3">
            <div className="text-right text-xs">
              <div className="text-slate-500 text-[10px] uppercase font-semibold">Recommended Legal Stage:</div>
              <div className="font-black text-sm text-[#003399]">
                Level {currentLevelNumber}: {ESCALATION_LEVELS[currentLevelNumber - 1]?.title.split(':')[1]?.trim() || 'EPFiGMS'}
              </div>
            </div>
            <span className="w-8 h-8 rounded-full bg-[#003399] text-white font-black flex items-center justify-center text-sm">
              {currentLevelNumber}
            </span>
          </div>
        </div>
      </div>

      {/* 5-Level Stepper Ladder */}
      <div className="space-y-4">
        {ESCALATION_LEVELS.map((lvl) => {
          const isCurrent = lvl.level === currentLevelNumber;
          const isCompleted = lvl.level < currentLevelNumber;

          return (
            <div
              key={lvl.level}
              className={`epfo-card p-5 border-2 transition-all ${
                isCurrent
                  ? 'border-[#003399] bg-blue-50/40 shadow-md ring-1 ring-[#003399]'
                  : isCompleted
                  ? 'border-green-200 bg-slate-50/50'
                  : 'border-slate-200 bg-white opacity-85'
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200/80 pb-3 mb-3">
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-full font-bold text-xs flex items-center justify-center shrink-0 ${
                    isCurrent
                      ? 'bg-[#003399] text-white ring-4 ring-blue-100 animate-pulse'
                      : isCompleted
                      ? 'bg-green-600 text-white'
                      : 'bg-slate-200 text-slate-700'
                  }`}>
                    {isCompleted ? '✓' : lvl.level}
                  </div>

                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-bold text-sm text-slate-900">{lvl.title}</h3>
                      {isCurrent && (
                        <span className="text-[10px] bg-red-600 text-white font-extrabold px-2 py-0.5 rounded uppercase tracking-wider">
                          YOU ARE HERE
                        </span>
                      )}
                      {isCompleted && (
                        <span className="text-[10px] bg-green-100 text-green-800 font-bold px-2 py-0.5 rounded">
                          COMPLETED
                        </span>
                      )}
                    </div>
                    <div className="text-[11px] text-slate-500 mt-0.5">
                      Statutory Timeframe: <strong>{lvl.daysRange}</strong>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  {lvl.templateType && (
                    <button
                      onClick={() => setActiveModalType(lvl.templateType)}
                      className="text-xs font-bold bg-white hover:bg-slate-50 border border-slate-300 text-slate-800 px-3 py-1.5 rounded shadow-xs flex items-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <FileText className="w-3.5 h-3.5 text-[#003399]" />
                      <span>Generate Template</span>
                    </button>
                  )}

                  {lvl.portalUrl && (
                    <a
                      href={lvl.portalUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="text-xs font-bold bg-[#003399] hover:bg-[#001f6b] text-white px-3 py-1.5 rounded shadow-xs flex items-center gap-1.5 transition-colors"
                    >
                      <span>Open Portal</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  )}
                </div>
              </div>

              <p className="text-xs text-slate-700 leading-relaxed mb-3">
                {lvl.description}
              </p>

              <div className="space-y-1.5 text-xs bg-white p-3 rounded border border-slate-200/80">
                <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                  Key Action Items:
                </div>
                {lvl.actions.map((act, i) => (
                  <div key={i} className="flex items-start gap-2 text-slate-700 text-[11px]">
                    <span className="text-slate-400 font-bold">•</span>
                    <span>{act}</span>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Pre-Filled Template Quick Launcher */}
      <div className="epfo-card p-5 bg-slate-50 space-y-3">
        <h3 className="font-bold text-xs text-[#003399] uppercase tracking-wider">
          Legal Correspondence Drafts & Templates (Pre-Filled with Ravi Kumar's Details)
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
          <button
            onClick={() => setActiveModalType('epfigms')}
            className="p-3 bg-white rounded-lg border border-slate-200 hover:border-[#003399] text-left transition-all hover:shadow-xs group cursor-pointer"
          >
            <div className="font-bold text-slate-900 group-hover:text-[#003399] flex items-center justify-between">
              <span>📝 EPFiGMS Grievance</span>
              <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:translate-x-1 transition-transform" />
            </div>
            <div className="text-[11px] text-slate-500 mt-1">Official complaint to Regional PF Commissioner</div>
          </button>

          <button
            onClick={() => setActiveModalType('employer_email')}
            className="p-3 bg-white rounded-lg border border-slate-200 hover:border-[#003399] text-left transition-all hover:shadow-xs group cursor-pointer"
          >
            <div className="font-bold text-slate-900 group-hover:text-[#003399] flex items-center justify-between">
              <span>📧 Employer HR Notice</span>
              <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:translate-x-1 transition-transform" />
            </div>
            <div className="text-[11px] text-slate-500 mt-1">Joint declaration & Date of Exit compliance letter</div>
          </button>

          <button
            onClick={() => setActiveModalType('rti')}
            className="p-3 bg-white rounded-lg border border-slate-200 hover:border-[#003399] text-left transition-all hover:shadow-xs group cursor-pointer"
          >
            <div className="font-bold text-slate-900 group-hover:text-[#003399] flex items-center justify-between">
              <span>⚖️ RTI 2005 Application</span>
              <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:translate-x-1 transition-transform" />
            </div>
            <div className="text-[11px] text-slate-500 mt-1">Demand Dealing Assistant name and daily file log</div>
          </button>
        </div>
      </div>

      {/* Active Modal */}
      {activeModalType && (
        <TemplateModal
          isOpen={Boolean(activeModalType)}
          onClose={() => setActiveModalType(null)}
          title={modalConfig[activeModalType]?.title}
          content={modalConfig[activeModalType]?.content}
          portalUrl={modalConfig[activeModalType]?.portalUrl}
          portalName={modalConfig[activeModalType]?.portalName}
        />
      )}
    </div>
  );
}
