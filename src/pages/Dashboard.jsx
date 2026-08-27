// src/pages/Dashboard.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { useMember } from '../context/useMember';
import { useLanguage } from '../context/useLanguage';
import SmartAlertBanner from '../components/shared/SmartAlertBanner';
import StatusCard from '../components/shared/StatusCard';
import { 
  User, 
  CreditCard, 
  TrendingUp, 
  CheckCircle2, 
  Clock, 
  Sparkles 
} from 'lucide-react';

export default function Dashboard() {
  const { member, alerts } = useMember();
  const { isHindi, t } = useLanguage();

  const formattedEpf = (member?.balance?.total || 436000).toLocaleString('en-IN');
  const formattedEps = (member?.balance?.pensionCorpus || 84000).toLocaleString('en-IN');
  const formattedEmpShare = (member?.balance?.employeeShare || 312400).toLocaleString('en-IN');
  const formattedEmplrShare = (member?.balance?.employerShare || 89200).toLocaleString('en-IN');

  return (
    <div className="space-y-6">
      {/* 1. Member Profile Details Card */}
      <div className="epfo-card overflow-hidden border-t-4 border-t-[#003399]">
        <div className="bg-[#1a4d8f] text-white px-5 py-3 flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <User className="w-5 h-5 text-yellow-300" />
            <h2 className="font-bold text-sm uppercase tracking-wide">
              {t('member_profile_title')}
            </h2>
          </div>
          <span className="text-[11px] bg-[#001f6b] text-yellow-300 font-mono font-bold px-2.5 py-0.5 rounded border border-blue-400/30">
            UAN: {member?.uan || '100987654321'}
          </span>
        </div>

        <div className="p-5 grid grid-cols-1 md:grid-cols-3 gap-6 bg-white text-xs">
          {/* Col 1: Basic Identity */}
          <div className="space-y-2 border-r border-slate-100 pr-4">
            <div>
              <span className="text-slate-400 block text-[10px] uppercase font-semibold">{t('member_name')}</span>
              <span className="font-bold text-slate-900 text-sm">{member?.name || 'Ravi Kumar'}</span>
            </div>
            <div>
              <span className="text-slate-400 block text-[10px] uppercase font-semibold">{t('dob')}</span>
              <span className="font-semibold text-slate-800">{member?.dob || '15/08/1993'}</span>
            </div>
            <div>
              <span className="text-slate-400 block text-[10px] uppercase font-semibold">{t('registered_contact')}</span>
              <span className="font-medium text-slate-700">{member?.mobile || '98XXXXXXXX'} • {member?.email || 'r***@gmail.com'}</span>
            </div>
          </div>

          {/* Col 2: Service & Establishment */}
          <div className="space-y-2 border-r border-slate-100 pr-4">
            <div>
              <span className="text-slate-400 block text-[10px] uppercase font-semibold">{t('current_establishment')}</span>
              <span className="font-bold text-slate-900">{member?.establishment || 'TechCorp India Pvt Ltd'}</span>
            </div>
            <div>
              <span className="text-slate-400 block text-[10px] uppercase font-semibold">{t('member_id')}</span>
              <span className="font-mono text-slate-800 font-semibold">{member?.memberId || 'MHBAN0027180000012345'}</span>
            </div>
            <div className="flex gap-4">
              <div>
                <span className="text-slate-400 block text-[10px] uppercase font-semibold">{t('doj')}</span>
                <span className="font-medium text-slate-700">{member?.doj || '01/03/2019'}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px] uppercase font-semibold">{t('doe')}</span>
                {member?.doe ? (
                  <span className="font-semibold text-green-700">{member.doe}</span>
                ) : (
                  <span className="font-bold text-red-600 bg-red-50 px-1.5 py-0.5 rounded">{t('not_marked')}</span>
                )}
              </div>
            </div>
          </div>

          {/* Col 3: KYC Verification Badges */}
          <div className="space-y-2.5">
            <span className="text-slate-400 block text-[10px] uppercase font-semibold">{t('seeded_kyc_verification')}</span>
            <div className="space-y-1.5">
              <div className="flex items-center justify-between p-1.5 bg-slate-50 rounded border border-slate-200">
                <span className="text-slate-700 font-medium">{t('kyc_aadhaar')} (UIDAI):</span>
                <span className="font-bold text-[11px] text-green-700 bg-green-100 px-2 py-0.5 rounded flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" /> {member?.kyc?.aadhaar?.status || 'APPROVED'}
                </span>
              </div>
              <div className="flex items-center justify-between p-1.5 bg-slate-50 rounded border border-slate-200">
                <span className="text-slate-700 font-medium">{t('kyc_pan')} (Income Tax):</span>
                <span className="font-bold text-[11px] text-green-700 bg-green-100 px-2 py-0.5 rounded flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" /> {member?.kyc?.pan?.status || 'APPROVED'}
                </span>
              </div>
              <div className="flex items-center justify-between p-1.5 bg-slate-50 rounded border border-slate-200">
                <span className="text-slate-700 font-medium">{t('kyc_bank')} ({member?.kyc?.bank?.bank?.split(' ')[0] || 'SBI'}):</span>
                {member?.kyc?.bank?.type === 'joint_parent' ? (
                  <span className="font-bold text-[11px] text-red-700 bg-red-100 px-2 py-0.5 rounded">
                    INVALID JOINT A/C
                  </span>
                ) : (
                  <span className="font-bold text-[11px] text-green-700 bg-green-100 px-2 py-0.5 rounded flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" /> {member?.kyc?.bank?.status || 'APPROVED'}
                  </span>
                )}
              </div>
            </div>
            <Link
              to="/manage/kyc"
              className="text-[11px] text-[#003399] hover:underline font-bold inline-flex items-center gap-1 pt-1"
            >
              <span>{t('view_full_kyc')}</span>
            </Link>
          </div>
        </div>
      </div>

      {/* 2. Smart Alert Banner */}
      <SmartAlertBanner alerts={alerts} />

      {/* 3. PF Balance Card */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        <div className="md:col-span-8 epfo-card p-5 bg-gradient-to-br from-white to-blue-50/40">
          <div className="flex items-center justify-between border-b border-slate-200 pb-3 mb-4">
            <div className="flex items-center gap-2">
              <CreditCard className="w-5 h-5 text-[#003399]" />
              <h3 className="font-bold text-sm text-slate-900 uppercase tracking-wide">
                {t('dashboard_title')}
              </h3>
            </div>
            <span className="text-xs text-slate-500 font-medium">
              {t('dashboard_last_updated')}: <strong>31/03/2026</strong>
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Main EPF Balance */}
            <div className="bg-white p-4 rounded-lg border border-blue-200 shadow-xs">
              <div className="text-xs text-slate-500 font-semibold uppercase">
                {t('withdrawable_epf_balance')}
              </div>
              <div className="text-2xl sm:text-3xl font-black text-[#003399] mt-1 tracking-tight">
                ₹{formattedEpf}
              </div>
              <div className="mt-2 text-[11px] text-slate-600 space-y-0.5 border-t border-slate-100 pt-2">
                <div className="flex justify-between">
                  <span>{t('employee_share')}:</span>
                  <span className="font-semibold text-slate-800">₹{formattedEmpShare}</span>
                </div>
                <div className="flex justify-between">
                  <span>{t('employer_share')}:</span>
                  <span className="font-semibold text-slate-800">₹{formattedEmplrShare}</span>
                </div>
              </div>
            </div>

            {/* EPS Pension Corpus */}
            <div className="bg-white p-4 rounded-lg border border-slate-200 shadow-xs">
              <div className="text-xs text-slate-500 font-semibold uppercase">
                {t('eps_pension_corpus')}
              </div>
              <div className="text-2xl sm:text-3xl font-black text-slate-800 mt-1 tracking-tight">
                ₹{formattedEps}
              </div>
              <div className="mt-2 text-[11px] text-slate-600 space-y-1 border-t border-slate-100 pt-2">
                <div className="text-slate-500">
                  {t('eps_note')}
                </div>
                <div className="text-[10px] text-amber-700 bg-amber-50 px-1.5 py-0.5 rounded font-medium">
                  {t('eps_withdrawable_note')}
                </div>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-200 flex flex-wrap items-center justify-between gap-2 text-xs">
            <div className="flex items-center gap-1.5 text-green-800 font-semibold">
              <TrendingUp className="w-4 h-4 text-green-600" />
              <span>{t('approved_interest')}</span>
            </div>
            <Link
              to="/passbook"
              className="text-[#003399] hover:underline font-bold flex items-center gap-1"
            >
              <span>{t('download_passbook_pdf')}</span>
            </Link>
          </div>
        </div>

        {/* EPFO 3.0 Fast Settlement Box */}
        <div className="md:col-span-4 epfo-card p-5 bg-gradient-to-br from-[#001f6b] to-[#003399] text-white flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 text-yellow-300 font-bold text-xs uppercase tracking-wider mb-2">
              <Sparkles className="w-4 h-4" />
              <span>{t('epfo3_direct_payout')}</span>
            </div>
            <h4 className="text-base font-bold leading-snug">
              {t('epfo3_auto_settlement_desc')}
            </h4>
            <p className="text-xs text-blue-200 mt-2 leading-relaxed">
              {t('epfo3_bot_desc')}
            </p>
          </div>

          <div className="mt-4 pt-3 border-t border-blue-400/30">
            <Link
              to="/services/claim"
              className="w-full bg-[#F97316] hover:bg-[#C2590F] text-white font-bold text-xs py-2.5 px-4 rounded shadow-sm transition-colors flex items-center justify-center gap-2"
            >
              <span>{t('file_online_claim_now')}</span>
            </Link>
          </div>
        </div>
      </div>

      {/* 4. Active Claim Status Card */}
      {member?.activeClaim && (
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-sm text-slate-900 uppercase tracking-wide flex items-center gap-2">
              <Clock className="w-4 h-4 text-[#003399]" />
              <span>{t('active_claim_heading')}</span>
            </h3>
            <span className="text-xs text-slate-500 font-mono">
              {t('tracking_reference_id')}: <strong>{member.activeClaim.referenceId}</strong>
            </span>
          </div>

          <StatusCard
            statusCode={member.activeClaim.status}
            daysFiled={member.activeClaim.daysAgo}
          />
        </div>
      )}

      {/* 5. Quick Services Grid */}
      <div className="space-y-3">
        <h3 className="font-bold text-sm text-slate-900 uppercase tracking-wide">
          {t('epfo_services_grid')}
        </h3>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            {
              title: isHindi ? 'दावा प्रस्तुत करें' : 'File a Claim',
              sub: 'Form 19, 31, 10C, 10D',
              icon: '📝',
              route: '/services/claim',
              badge: 'Pre-Check'
            },
            {
              title: isHindi ? 'पीएफ ट्रांसफर' : 'Transfer PF',
              sub: 'Form 13 Online Request',
              icon: '🔄',
              route: '/services/transfer'
            },
            {
              title: isHindi ? 'दावा ट्रैक करें' : 'Track Claim',
              sub: 'Journey & Translator',
              icon: '🔍',
              route: '/services/track',
              badge: 'Smart'
            },
            {
              title: isHindi ? 'केवाईसी ऑडिट' : 'KYC Audit ⭐',
              sub: 'Forensic Character Diff',
              icon: '🛡️',
              route: '/manage/kyc',
              highlight: true
            },
            {
              title: isHindi ? 'पासबुक देखें' : 'View Passbook',
              sub: 'Contributions & Projections',
              icon: '📒',
              route: '/passbook'
            },
            {
              title: isHindi ? 'ई-नामांकन' : 'e-Nomination',
              sub: 'Family Digital e-Sign',
              icon: '👥',
              route: '/enomination'
            },
            {
              title: isHindi ? 'कार्यमुक्ति तिथि' : 'Mark Exit Date',
              sub: 'Self-Mark via Aadhaar OTP',
              icon: '🏢',
              route: '/manage/mark-exit'
            },
            {
              title: isHindi ? 'शिकायत निवारण' : 'Escalation Ladder',
              sub: '5 Legal Levels (EPFiGMS/RTI)',
              icon: '⚖️',
              route: '/help/escalation'
            }
          ].map((item, idx) => (
            <Link
              key={idx}
              to={item.route}
              className={`p-4 rounded-lg border transition-all hover:shadow-md hover:-translate-y-0.5 flex flex-col justify-between ${
                item.highlight
                  ? 'bg-amber-50/70 border-amber-300 ring-1 ring-amber-300'
                  : 'bg-white border-slate-200 hover:border-[#003399]'
              }`}
            >
              <div className="flex items-start justify-between">
                <span className="text-2xl mb-2 select-none">{item.icon}</span>
                {item.badge && (
                  <span className="text-[9px] bg-[#003399] text-white font-bold px-1.5 py-0.5 rounded">
                    {item.badge}
                  </span>
                )}
              </div>
              <div>
                <div className="font-bold text-xs text-slate-900">{item.title}</div>
                <div className="text-[10px] text-slate-500 mt-0.5">{item.sub}</div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
