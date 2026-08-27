// src/pages/ENomination.jsx
import React, { useState } from 'react';
import { useMember } from '../context/useMember';
import { useLanguage } from '../context/useLanguage';
import { 
  Users, 
  CheckCircle2, 
  Lock
} from 'lucide-react';

export default function ENomination() {
  const { member } = useMember();
  const { isHindi } = useLanguage();

  const [hasFamily, setHasFamily] = useState('yes');
  const [nominees] = useState([
    { name: 'Pooja Sharma', relation: 'Spouse', dob: '12/06/1995', share: 100, aadhaar: 'XXXX-XXXX-8821' }
  ]);
  const [otpSent, setOtpSent] = useState(false);
  const [otpVal, setOtpVal] = useState('');
  const [isSigned, setIsSigned] = useState(false);
  const [nominationId, setNominationId] = useState('');

  const handleSendOtp = () => {
    setOtpSent(true);
    setOtpVal('582910');
  };

  const handleESign = (e) => {
    e.preventDefault();
    setNominationId(`NOM-2026-${Math.floor(100000 + Math.random() * 900000)}`);
    setIsSigned(true);
  };

  return (
    <div className="space-y-6">
      <div className="border-b border-slate-200 pb-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <h1 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <Users className="w-6 h-6 text-[#003399]" />
            <span>{isHindi ? 'ई-नामांकन एवं डिजिटल हस्ताक्षर' : 'e-Nomination (EPF & EPS Digital Nominee Filing)'}</span>
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            File social security nominee declarations digitally under Form 2 (Revised) with Aadhaar e-Sign.
          </p>
        </div>

        {isSigned ? (
          <span className="text-xs bg-green-100 text-green-800 font-bold px-3 py-1 rounded flex items-center gap-1">
            <CheckCircle2 className="w-4 h-4" /> e-Signed & Active
          </span>
        ) : (
          <span className="text-xs bg-amber-100 text-amber-800 font-bold px-3 py-1 rounded">
            Nomination Pending e-Sign
          </span>
        )}
      </div>

      {isSigned ? (
        <div className="epfo-card p-6 text-center space-y-3 bg-green-50 border border-green-300">
          <div className="w-12 h-12 bg-green-100 text-green-700 rounded-full flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <h2 className="font-bold text-base text-slate-900">
            e-Nomination Successfully Registered & Digitally Signed!
          </h2>
          <p className="text-xs text-slate-600 max-w-md mx-auto">
            Nomination Reference ID: <strong>{nominationId}</strong>.
            Your digital nomination is permanently active in EPFO master database.
          </p>
        </div>
      ) : (
        <form onSubmit={handleESign} className="space-y-6 text-xs">
          {/* Family Declaration */}
          <div className="epfo-card p-5 space-y-3 bg-slate-50">
            <h3 className="font-bold text-xs text-[#003399] uppercase tracking-wider border-b border-slate-200 pb-1.5">
              1. Family Declaration (Section 2(g) of EPF Scheme)
            </h3>
            <div className="flex items-center gap-4">
              <span className="font-bold text-slate-800">Having Family?</span>
              <label className="flex items-center gap-1.5 cursor-pointer">
                <input
                  type="radio"
                  name="hasFamily"
                  value="yes"
                  checked={hasFamily === 'yes'}
                  onChange={() => setHasFamily('yes')}
                />
                <span>Yes (Spouse / Children / Dependent Parents)</span>
              </label>
              <label className="flex items-center gap-1.5 cursor-pointer">
                <input
                  type="radio"
                  name="hasFamily"
                  value="no"
                  checked={hasFamily === 'no'}
                  onChange={() => setHasFamily('no')}
                />
                <span>No</span>
              </label>
            </div>
          </div>

          {/* Nominee Table */}
          <div className="epfo-card p-5 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-200 pb-2">
              <h3 className="font-bold text-xs text-[#003399] uppercase tracking-wider">
                2. Nominee Details (EPF & EPS Share)
              </h3>
              <span className="text-[10px] text-slate-500 font-medium">Total Share must equal 100%</span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left epfo-table text-xs">
                <thead>
                  <tr>
                    <th>Nominee Name</th>
                    <th>Relationship</th>
                    <th>Date of Birth</th>
                    <th>Aadhaar Number</th>
                    <th>Share Percentage</th>
                  </tr>
                </thead>
                <tbody>
                  {nominees.map((n, idx) => (
                    <tr key={idx}>
                      <td className="font-bold text-slate-900">{n.name}</td>
                      <td className="text-slate-700">{n.relation}</td>
                      <td className="text-slate-700">{n.dob}</td>
                      <td className="font-mono text-slate-700">{n.aadhaar}</td>
                      <td className="font-bold text-green-700">{n.share}%</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* e-Sign with Aadhaar */}
          <div className="epfo-card p-5 space-y-4 bg-gradient-to-r from-blue-50/60 to-slate-50 border border-blue-200">
            <div className="flex items-center gap-2 border-b border-blue-200 pb-2">
              <Lock className="w-4 h-4 text-[#003399]" />
              <h3 className="font-bold text-xs text-[#003399] uppercase tracking-wider">
                3. Aadhaar e-Sign Authentication
              </h3>
            </div>

            <p className="text-xs text-slate-600">
              Under Information Technology Act 2000, physical employer signature is no longer required for e-Nomination. Authenticate with UIDAI OTP.
            </p>

            {!otpSent ? (
              <button
                type="button"
                onClick={handleSendOtp}
                className="bg-[#003399] hover:bg-[#001f6b] text-white font-bold text-xs px-4 py-2 rounded shadow-xs cursor-pointer"
              >
                Proceed to Aadhaar e-Sign OTP ({member?.mobile})
              </button>
            ) : (
              <div className="flex items-center gap-3">
                <input
                  type="text"
                  value={otpVal}
                  onChange={(e) => setOtpVal(e.target.value)}
                  placeholder="Enter 6-digit OTP"
                  className="w-40 px-3 py-2 border border-slate-300 rounded font-mono font-bold text-center text-xs"
                  required
                />
                <button
                  type="submit"
                  className="bg-green-700 hover:bg-green-800 text-white font-bold text-xs px-5 py-2 rounded shadow-xs cursor-pointer"
                >
                  Confirm & e-Sign e-Nomination →
                </button>
              </div>
            )}
          </div>
        </form>
      )}
    </div>
  );
}
