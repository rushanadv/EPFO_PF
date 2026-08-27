// src/pages/LandingPage.jsx
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useMember } from '../context/useMember';
import { useLanguage } from '../context/useLanguage';
import { 
  Lock, 
  User, 
  Key, 
  Sparkles, 
  ArrowRight, 
  PhoneCall, 
  ShieldCheck, 
  AlertCircle,
  FileCheck,
  Zap,
  Info
} from 'lucide-react';

export default function LandingPage() {
  const navigate = useNavigate();
  const { member } = useMember();
  const { isHindi } = useLanguage();
  const [uanInput, setUanInput] = useState(member?.uan || '100987654321');
  const [passwordInput, setPasswordInput] = useState('••••••••••••');
  const [captchaInput, setCaptchaInput] = useState('7K9P');
  const [captchaCode, setCaptchaCode] = useState('7K9P');
  const [showUanGuide, setShowUanGuide] = useState(false);

  const handleSignIn = (e) => {
    if (e) e.preventDefault();
    navigate('/dashboard');
  };

  const refreshCaptcha = () => {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
    let res = '';
    for (let i = 0; i < 4; i++) {
      res += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setCaptchaCode(res);
    setCaptchaInput(res);
  };

  return (
    <div className="space-y-6">
      {/* Hackathon Judge Banner */}
      <div className="bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 rounded-lg p-5 text-white shadow-lg border border-amber-400">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-yellow-200 animate-spin" />
              <span className="font-extrabold text-sm uppercase tracking-wider text-yellow-100">
                "Build What Moves India" Hackathon Showcase
              </span>
            </div>
            <h2 className="text-xl font-black tracking-tight">
              PF SAATHI — The Intelligent EPFO Member Experience
            </h2>
            <p className="text-xs text-amber-100 max-w-3xl leading-relaxed">
              This demo is loaded with the real-world profile of <strong>Ravi Kumar</strong> whose claim is stuck due to a cryptic 
              <em>"Verification pending"</em> notice. Experience how PF Saathi decodes root causes and prevents 17.4 million rejections.
            </p>
          </div>

          <button
            onClick={handleSignIn}
            className="shrink-0 bg-white hover:bg-yellow-50 text-slate-900 font-extrabold text-sm px-5 py-3 rounded-lg shadow-md hover:shadow-xl transition-all transform hover:-translate-y-0.5 flex items-center gap-2 cursor-pointer"
          >
            <span>▶ Enter Demo Portal</span>
            <ArrowRight className="w-4 h-4 text-[#003399]" />
          </button>
        </div>
      </div>

      {/* Main Pre-Login Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Official News & Bulletins (7 Cols) */}
        <div className="lg:col-span-7 space-y-4">
          {/* Welcome Card */}
          <div className="epfo-card p-5 border-t-4 border-t-[#003399]">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-full bg-[#E8EEF9] flex items-center justify-center text-[#003399]">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-base font-bold text-slate-900">
                  {isHindi ? 'सदस्य ई-सेवा पोर्टल में आपका स्वागत है' : 'Member Unified Portal (Member e-Sewa)'}
                </h2>
                <div className="text-xs text-slate-500">
                  Universal Account Number (UAN) Single-Sign-On Platform
                </div>
              </div>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Unified Portal for all Provident Fund, Pension (EPS), and Insurance (EDLI) services.
              Manage your KYC, download passbooks, transfer PF between establishments, and track withdrawal claims in real time.
            </p>
          </div>

          {/* Key 2026 Bulletins */}
          <div className="epfo-card p-5">
            <div className="flex items-center justify-between border-b border-slate-200 pb-2.5 mb-3">
              <span className="text-xs font-bold text-[#003399] uppercase tracking-wider flex items-center gap-1.5">
                <Info className="w-4 h-4 text-[#F97316]" />
                <span>{isHindi ? 'महत्वपूर्ण सूचनाएं एवं 2026 सुधार' : 'Important Instructions & 2026 Directives'}</span>
              </span>
              <span className="text-[10px] bg-red-100 text-red-800 font-bold px-2 py-0.5 rounded">
                CRITICAL
              </span>
            </div>

            <div className="space-y-3 text-xs">
              <div className="p-3 bg-blue-50/70 border border-blue-200 rounded-md">
                <div className="font-bold text-[#003399] flex items-center gap-1.5 mb-1">
                  <Zap className="w-3.5 h-3.5 text-[#F97316]" />
                  <span>EPFO 3.0 Instant Auto-Settlement Live (April 2026)</span>
                </div>
                <p className="text-slate-700 text-[11px] leading-relaxed">
                  Claims up to ₹5,00,000 for Form 31 (Advance) and Form 19 (Final Settlement) are processed automatically without employer physical attestation if Aadhaar, PAN, and Bank are KYC verified.
                </p>
              </div>

              <div className="p-3 bg-amber-50/70 border border-amber-200 rounded-md">
                <div className="font-bold text-amber-900 flex items-center gap-1.5 mb-1">
                  <FileCheck className="w-3.5 h-3.5 text-amber-700" />
                  <span>Form 121 Replaces Forms 15G / 15H</span>
                </div>
                <p className="text-slate-700 text-[11px] leading-relaxed">
                  Income tax declaration for Nil TDS deduction on premature PF withdrawals (service &lt; 5 years) must now be submitted via the new unified <strong>Form 121</strong>.
                </p>
              </div>

              <div className="p-3 bg-slate-50 border border-slate-200 rounded-md">
                <div className="font-bold text-slate-800 flex items-center gap-1.5 mb-1">
                  <Lock className="w-3.5 h-3.5 text-[#003399]" />
                  <span>Mandatory Aadhaar OTP Verification for Sign-In</span>
                </div>
                <p className="text-slate-600 text-[11px] leading-relaxed">
                  Since January 2026, logging into your UAN requires dual-factor verification. Login OTP will be delivered directly to the mobile number registered in your UIDAI Aadhaar record.
                </p>
              </div>
            </div>
          </div>

          {/* Offline Balance Options */}
          <div className="epfo-card p-4 bg-gradient-to-r from-blue-50 to-slate-50 border border-blue-200">
            <div className="text-xs font-bold text-slate-900 mb-2 flex items-center gap-2">
              <PhoneCall className="w-4 h-4 text-[#003399]" />
              <span>{isHindi ? 'पोर्टल के बिना बैलेंस चेक करें (SMS / Missed Call)' : 'Check Balance Without Internet / Login'}</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="bg-white p-2.5 rounded border border-slate-200">
                <div className="text-[10px] text-slate-500 font-semibold uppercase">Missed Call Service</div>
                <div className="text-sm font-bold text-[#003399] mt-0.5">📞 9966044425</div>
                <div className="text-[10px] text-slate-600 mt-1">From UAN-registered mobile. Toll-free.</div>
              </div>
              <div className="bg-white p-2.5 rounded border border-slate-200">
                <div className="text-[10px] text-slate-500 font-semibold uppercase">SMS Service</div>
                <div className="text-sm font-bold text-[#F97316] mt-0.5">📱 7738299899</div>
                <div className="text-[10px] text-slate-600 mt-1">SMS "EPFOHO UAN ENG" to get SMS balance.</div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Member Sign In Box (5 Cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="epfo-card overflow-hidden shadow-md border-2 border-slate-300">
            {/* Sign In Header */}
            <div className="bg-[#003399] text-white px-5 py-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Lock className="w-4 h-4 text-yellow-300" />
                <h3 className="font-bold text-sm">
                  {isHindi ? 'सदस्य लॉगिन (Member Sign In)' : 'Member Sign In'}
                </h3>
              </div>
              <span className="text-[10px] bg-blue-900 text-blue-200 px-2 py-0.5 rounded font-mono">
                SSL 256-Bit
              </span>
            </div>

            {/* Form */}
            <form onSubmit={handleSignIn} className="p-5 space-y-4 bg-white">
              {/* UAN Field */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Universal Account Number (UAN) <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                    <User className="w-4 h-4" />
                  </div>
                  <input
                    type="text"
                    value={uanInput}
                    onChange={(e) => setUanInput(e.target.value)}
                    placeholder="Enter 12-digit UAN"
                    className="w-full pl-9 pr-3 py-2 text-xs border border-slate-300 rounded focus:ring-2 focus:ring-[#003399] focus:outline-none font-mono"
                    required
                  />
                </div>
              </div>

              {/* Password Field */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Password <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                    <Key className="w-4 h-4" />
                  </div>
                  <input
                    type="password"
                    value={passwordInput}
                    onChange={(e) => setPasswordInput(e.target.value)}
                    placeholder="Enter Password"
                    className="w-full pl-9 pr-3 py-2 text-xs border border-slate-300 rounded focus:ring-2 focus:ring-[#003399] focus:outline-none font-mono"
                    required
                  />
                </div>
              </div>

              {/* Captcha */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Captcha Code <span className="text-red-500">*</span>
                </label>
                <div className="flex items-center gap-2">
                  <div className="bg-slate-200 border border-slate-400 px-4 py-2 font-mono font-black text-slate-800 tracking-widest text-sm rounded select-none line-through decoration-slate-400">
                    {captchaCode}
                  </div>
                  <button
                    type="button"
                    onClick={refreshCaptcha}
                    className="text-xs text-[#003399] hover:underline font-semibold cursor-pointer"
                  >
                    🔄 Refresh
                  </button>
                </div>
                <input
                  type="text"
                  value={captchaInput}
                  onChange={(e) => setCaptchaInput(e.target.value)}
                  placeholder="Enter characters shown"
                  className="w-full mt-2 px-3 py-2 text-xs border border-slate-300 rounded focus:ring-2 focus:ring-[#003399] focus:outline-none font-mono uppercase"
                  required
                />
              </div>

              {/* Sign In CTA */}
              <button
                type="submit"
                className="w-full bg-[#003399] hover:bg-[#001f6b] text-white font-bold text-xs py-2.5 rounded shadow-sm transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>{isHindi ? 'लॉगिन करें (Sign In)' : 'Sign In'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              {/* Sub-links */}
              <div className="pt-2 border-t border-slate-200 flex flex-wrap items-center justify-between text-[11px] text-slate-600 gap-2">
                <Link to="/help/login-issues" className="text-[#003399] hover:underline font-medium">
                  Forgot Password?
                </Link>
                <span className="text-slate-300">|</span>
                <button
                  type="button"
                  onClick={() => setShowUanGuide(!showUanGuide)}
                  className="text-[#003399] hover:underline font-medium cursor-pointer"
                >
                  Activate UAN / Know UAN
                </button>
              </div>
            </form>
          </div>

          {/* Troubleshooting Shortcut */}
          <div className="epfo-card p-4 bg-amber-50/80 border border-amber-300 space-y-2">
            <div className="flex items-start gap-2.5">
              <AlertCircle className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
              <div>
                <div className="text-xs font-bold text-amber-900">
                  {isHindi ? 'लॉगिन करने में समस्या आ रही है?' : 'Having Trouble Logging In?'}
                </div>
                <div className="text-[11px] text-amber-800 mt-0.5 leading-snug">
                  OTP not coming to mobile? Password locked? Aadhaar mismatch?
                </div>
              </div>
            </div>
            <Link
              to="/help/login-issues"
              className="inline-flex items-center gap-1 text-xs font-bold text-[#003399] hover:underline pt-1"
            >
              <span>{isHindi ? 'लॉगिन निदान सहायता गाइड खोलें →' : 'Launch Interactive Login Diagnostic Guide →'}</span>
            </Link>
          </div>

          {/* UAN Guide Accordion */}
          {showUanGuide && (
            <div className="epfo-card p-4 bg-white border border-slate-300 text-xs space-y-2 animate-in fade-in-50 duration-150">
              <div className="font-bold text-slate-900 border-b border-slate-200 pb-1">
                How to Find or Activate Your UAN:
              </div>
              <ol className="list-decimal pl-4 space-y-1 text-slate-600 text-[11px]">
                <li>Check your monthly salary payslip under "UAN / PF Number".</li>
                <li>Ask your Employer HR Payroll Department for your 12-digit number.</li>
                <li>Visit <em>Know Your UAN</em> and verify using Aadhaar OTP.</li>
                <li>Click <em>Activate UAN</em> on UMANG App with Face Auth.</li>
              </ol>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
