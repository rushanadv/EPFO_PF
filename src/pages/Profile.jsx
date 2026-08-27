// src/pages/Profile.jsx
import React from 'react';
import { useMember } from '../context/useMember';
import { useLanguage } from '../context/useLanguage';
import { User, Mail, Building } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Profile() {
  const { member } = useMember();
  const { isHindi } = useLanguage();

  return (
    <div className="space-y-6">
      <div className="border-b border-slate-200 pb-3">
        <h1 className="text-xl font-bold text-slate-900 flex items-center gap-2">
          <User className="w-6 h-6 text-[#003399]" />
          <span>{isHindi ? 'सदस्य प्रोफ़ाइल एवं सेवा विवरण' : 'Member Profile & Service History'}</span>
        </h1>
        <p className="text-xs text-slate-500 mt-0.5">
          Official master profile registered in the EPFO Unified Portal records.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Personal Details */}
        <div className="epfo-card p-5 space-y-4">
          <div className="flex items-center gap-2 border-b border-slate-200 pb-2 text-[#003399]">
            <User className="w-4 h-4" />
            <h3 className="font-bold text-sm uppercase tracking-wide">Personal Details</h3>
          </div>

          <div className="space-y-3 text-xs">
            <div className="grid grid-cols-2 gap-2">
              <span className="text-slate-500">Universal Account Number (UAN):</span>
              <span className="font-mono font-bold text-slate-900">{member?.uan}</span>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <span className="text-slate-500">Full Name (as per EPFO):</span>
              <span className="font-bold text-slate-900">{member?.kyc?.nameOnEPFO || member?.name}</span>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <span className="text-slate-500">Father's / Husband's Name:</span>
              <span className="font-medium text-slate-800">{member?.fatherName || 'SURESH KUMAR SHARMA'}</span>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <span className="text-slate-500">Date of Birth:</span>
              <span className="font-medium text-slate-800">{member?.dob}</span>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <span className="text-slate-500">Gender:</span>
              <span className="font-medium text-slate-800">{member?.gender || 'Male'}</span>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <span className="text-slate-500">Marital Status:</span>
              <span className="font-medium text-slate-800">{member?.maritalStatus || 'Married'}</span>
            </div>
          </div>
        </div>

        {/* Contact & KYC Summary */}
        <div className="epfo-card p-5 space-y-4">
          <div className="flex items-center gap-2 border-b border-slate-200 pb-2 text-[#003399]">
            <Mail className="w-4 h-4" />
            <h3 className="font-bold text-sm uppercase tracking-wide">Contact & Address</h3>
          </div>

          <div className="space-y-3 text-xs">
            <div className="grid grid-cols-2 gap-2">
              <span className="text-slate-500">Mobile Number:</span>
              <span className="font-mono font-bold text-slate-900">{member?.mobile}</span>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <span className="text-slate-500">Email ID:</span>
              <span className="font-medium text-slate-800">{member?.email}</span>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <span className="text-slate-500">Registered Residential Address:</span>
              <span className="font-medium text-slate-700 leading-relaxed">{member?.address}</span>
            </div>
            <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
              <span className="text-slate-500">KYC Status:</span>
              <Link to="/manage/kyc" className="text-xs text-[#003399] font-bold hover:underline">
                View & Audit KYC Details →
              </Link>
            </div>
          </div>
        </div>

        {/* Service Details Card (Full Width) */}
        <div className="md:col-span-2 epfo-card p-5 space-y-4">
          <div className="flex items-center gap-2 border-b border-slate-200 pb-2 text-[#003399]">
            <Building className="w-4 h-4" />
            <h3 className="font-bold text-sm uppercase tracking-wide">Employment & Service Record</h3>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left epfo-table text-xs">
              <thead>
                <tr>
                  <th>Member ID</th>
                  <th>Establishment Name</th>
                  <th>Est. Code</th>
                  <th>Date of Joining</th>
                  <th>Date of Exit</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="font-mono font-bold text-slate-900">{member?.memberId}</td>
                  <td className="font-medium text-slate-900">{member?.establishment}</td>
                  <td className="font-mono text-slate-700">{member?.estCode}</td>
                  <td className="text-slate-700">{member?.doj}</td>
                  <td>
                    {member?.doe ? (
                      <span className="text-green-700 font-semibold">{member.doe}</span>
                    ) : (
                      <span className="text-red-600 font-bold bg-red-50 px-2 py-0.5 rounded text-[11px]">
                        Not Marked
                      </span>
                    )}
                  </td>
                  <td>
                    {!member?.doe ? (
                      <Link
                        to="/manage/mark-exit"
                        className="text-xs bg-[#003399] text-white px-2.5 py-1 rounded hover:bg-[#001f6b] font-medium"
                      >
                        Self-Mark Exit →
                      </Link>
                    ) : (
                      <span className="text-slate-400 text-xs">Completed</span>
                    )}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
