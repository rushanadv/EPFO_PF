// src/pages/Transfer.jsx
import React, { useState } from 'react';
import { useMember } from '../context/useMember';
import { useLanguage } from '../context/useLanguage';
import { 
  ArrowRightLeft, 
  Building, 
  CheckCircle2, 
  Lock
} from 'lucide-react';

export default function Transfer() {
  const { member } = useMember();
  const { isHindi } = useLanguage();

  const [prevEstCode, setPrevEstCode] = useState('DLCPM0012345000');
  const [prevMemberId, setPrevMemberId] = useState('DLCPM00123450000045678');
  const [attestationEmployer, setAttestationEmployer] = useState('present'); // 'present' | 'previous'
  const [otpSent, setOtpSent] = useState(false);
  const [otpValue, setOtpValue] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [transferId, setTransferId] = useState('');

  const handleSendOtp = () => {
    setOtpSent(true);
    setOtpValue('839201');
  };

  const handleSubmitTransfer = (e) => {
    e.preventDefault();
    setTransferId(`TR-2026-MH-${Math.floor(100000 + Math.random() * 900000)}`);
    setIsSuccess(true);
  };

  return (
    <div className="space-y-6">
      <div className="border-b border-slate-200 pb-3">
        <h1 className="text-xl font-bold text-slate-900 flex items-center gap-2">
          <ArrowRightLeft className="w-6 h-6 text-[#003399]" />
          <span>{isHindi ? 'ऑनलाइन पीएफ ट्रांसफर (Form 13 Transfer Request)' : 'One Member — One EPF Account (Online Transfer Form 13)'}</span>
        </h1>
        <p className="text-xs text-slate-500 mt-0.5">
          Transfer your accumulated Provident Fund balance and service tenure from previous establishment to current account.
        </p>
      </div>

      {isSuccess ? (
        <div className="epfo-card p-6 text-center space-y-3 bg-green-50 border border-green-300">
          <div className="w-12 h-12 rounded-full bg-green-100 text-green-700 flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <h2 className="font-bold text-base text-slate-900">
            Form 13 Transfer Request Submitted Successfully!
          </h2>
          <p className="text-xs text-slate-600 max-w-md mx-auto">
            Transfer Tracking ID: <strong>{transferId}</strong>.
            Your {attestationEmployer === 'present' ? 'Present Employer' : 'Previous Employer'} has been notified to digitally authenticate the request.
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmitTransfer} className="space-y-6 text-xs">
          {/* Step 1: Present Account (Destination) */}
          <div className="epfo-card p-5 space-y-3 bg-slate-50">
            <h3 className="font-bold text-xs text-[#003399] uppercase tracking-wider border-b border-slate-200 pb-1.5 flex items-center gap-1.5">
              <Building className="w-4 h-4" />
              <span>Step 1: Present Account Details (Destination Account)</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <span className="text-slate-500 block text-[10px]">Establishment:</span>
                <span className="font-bold text-slate-900">{member?.establishment}</span>
              </div>
              <div>
                <span className="text-slate-500 block text-[10px]">Present Member ID:</span>
                <span className="font-mono font-bold text-slate-900">{member?.memberId}</span>
              </div>
              <div>
                <span className="text-slate-500 block text-[10px]">Date of Joining:</span>
                <span className="font-medium text-slate-800">{member?.doj}</span>
              </div>
            </div>
          </div>

          {/* Step 2: Previous Account (Source) */}
          <div className="epfo-card p-5 space-y-4">
            <h3 className="font-bold text-xs text-[#003399] uppercase tracking-wider border-b border-slate-200 pb-1.5 flex items-center gap-1.5">
              <Building className="w-4 h-4" />
              <span>Step 2: Previous Account Details (Source Account to Transfer From)</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Previous Member ID / Account Number <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={prevMemberId}
                  onChange={(e) => setPrevMemberId(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded font-mono text-xs focus:ring-2 focus:ring-[#003399]"
                  required
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Previous Establishment Code <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={prevEstCode}
                  onChange={(e) => setPrevEstCode(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded font-mono text-xs focus:ring-2 focus:ring-[#003399]"
                  required
                />
              </div>
            </div>
          </div>

          {/* Step 3: Attestation Authority */}
          <div className="epfo-card p-5 space-y-3">
            <h3 className="font-bold text-xs text-[#003399] uppercase tracking-wider border-b border-slate-200 pb-1.5">
              Step 3: Attestation of Transfer Claim Through
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <label className={`p-3.5 rounded-lg border-2 cursor-pointer flex items-start gap-2.5 ${
                attestationEmployer === 'present' ? 'border-[#003399] bg-blue-50/50' : 'border-slate-200'
              }`}>
                <input
                  type="radio"
                  name="attestation"
                  value="present"
                  checked={attestationEmployer === 'present'}
                  onChange={() => setAttestationEmployer('present')}
                  className="mt-0.5"
                />
                <div>
                  <div className="font-bold text-slate-900">Present Employer (Recommended)</div>
                  <div className="text-slate-600 text-[11px] mt-0.5">
                    Fastest route. TechCorp India Pvt Ltd HR digital signature will authorize.
                  </div>
                </div>
              </label>

              <label className={`p-3.5 rounded-lg border-2 cursor-pointer flex items-start gap-2.5 ${
                attestationEmployer === 'previous' ? 'border-[#003399] bg-blue-50/50' : 'border-slate-200'
              }`}>
                <input
                  type="radio"
                  name="attestation"
                  value="previous"
                  checked={attestationEmployer === 'previous'}
                  onChange={() => setAttestationEmployer('previous')}
                  className="mt-0.5"
                />
                <div>
                  <div className="font-bold text-slate-900">Previous Employer</div>
                  <div className="text-slate-600 text-[11px] mt-0.5">
                    Authorized if present employer is closed or uncooperative.
                  </div>
                </div>
              </label>
            </div>
          </div>

          {/* Step 4: Aadhaar OTP Authentication */}
          <div className="epfo-card p-5 space-y-3">
            <h3 className="font-bold text-xs text-[#003399] uppercase tracking-wider border-b border-slate-200 pb-1.5 flex items-center gap-1.5">
              <Lock className="w-4 h-4" />
              <span>Step 4: Authenticate with Aadhaar OTP</span>
            </h3>

            {!otpSent ? (
              <button
                type="button"
                onClick={handleSendOtp}
                className="bg-[#003399] hover:bg-[#001f6b] text-white font-bold text-xs px-4 py-2 rounded shadow-xs cursor-pointer"
              >
                Get Aadhaar OTP ({member?.mobile})
              </button>
            ) : (
              <div className="flex items-center gap-3">
                <input
                  type="text"
                  value={otpValue}
                  onChange={(e) => setOtpValue(e.target.value)}
                  placeholder="Enter 6-digit OTP"
                  className="w-40 px-3 py-2 border border-slate-300 rounded font-mono font-bold text-center text-xs"
                  required
                />
                <button
                  type="submit"
                  className="bg-green-700 hover:bg-green-800 text-white font-bold text-xs px-5 py-2 rounded shadow-xs cursor-pointer"
                >
                  Submit Form 13 Transfer Request →
                </button>
              </div>
            )}
          </div>
        </form>
      )}
    </div>
  );
}
