// src/pages/Passbook.jsx
import React, { useState } from 'react';
import { useMember } from '../context/useMember';
import { useLanguage } from '../context/useLanguage';
import { 
  BookOpen, 
  Download, 
  Printer, 
  Info, 
  Calculator,
  Calendar
} from 'lucide-react';

export default function Passbook() {
  const { member } = useMember();
  const { isHindi } = useLanguage();
  const [monthlyContribution] = useState(6180); // 4800 + 1380

  const epfBalance = member?.balance?.total || 436000;
  const epsCorpus = member?.balance?.pensionCorpus || 84000;
  const interestRate = 0.0825; // 8.25%

  // Compound balance projection calculator
  const calculateProjection = (years) => {
    let bal = epfBalance;
    const annualDeposit = monthlyContribution * 12;
    for (let i = 0; i < years; i++) {
      bal = (bal + annualDeposit) * (1 + interestRate);
    }
    return Math.round(bal);
  };

  const contributions = member?.contributions || [];

  return (
    <div className="space-y-6">
      {/* Title */}
      <div className="border-b border-slate-200 pb-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <BookOpen className="w-6 h-6 text-[#003399]" />
            <span>{isHindi ? 'सदस्य ई-पासबुक एवं योगदान विवरण' : 'Member Electronic Passbook & Statement'}</span>
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Detailed ledger of monthly employee and employer provident fund contributions and annual interest credits.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => window.print()}
            className="bg-white hover:bg-slate-50 border border-slate-300 text-slate-700 font-semibold text-xs px-3.5 py-2 rounded flex items-center gap-1.5 transition-colors"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print Passbook</span>
          </button>
          <button
            onClick={() => window.print()}
            className="bg-[#003399] hover:bg-[#001f6b] text-white font-bold text-xs px-3.5 py-2 rounded shadow-xs flex items-center gap-1.5 transition-colors"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download PDF</span>
          </button>
        </div>
      </div>

      {/* Account Balance Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
        <div className="epfo-card p-4 bg-gradient-to-br from-blue-50/80 to-white border-blue-200">
          <span className="text-slate-500 block text-[10px] uppercase font-semibold">Total EPF Balance (Withdrawable)</span>
          <div className="text-2xl font-black text-[#003399] mt-1">
            ₹{epfBalance.toLocaleString('en-IN')}
          </div>
          <div className="text-[11px] text-slate-600 mt-1">
            Employee (₹{member?.balance?.employeeShare?.toLocaleString('en-IN')}) + Employer (₹{member?.balance?.employerShare?.toLocaleString('en-IN')})
          </div>
        </div>

        <div className="epfo-card p-4 bg-gradient-to-br from-slate-50 to-white">
          <span className="text-slate-500 block text-[10px] uppercase font-semibold">EPS Pension Corpus</span>
          <div className="text-2xl font-black text-slate-800 mt-1">
            ₹{epsCorpus.toLocaleString('en-IN')}
          </div>
          <div className="text-[11px] text-slate-600 mt-1">
            Pension scheme pool (Non-withdrawable cash if service &gt; 10 years)
          </div>
        </div>

        <div className="epfo-card p-4 bg-gradient-to-br from-green-50/60 to-white border-green-200">
          <span className="text-slate-500 block text-[10px] uppercase font-semibold">FY 2025-26 Approved Interest</span>
          <div className="text-2xl font-black text-green-700 mt-1">
            8.25% p.a.
          </div>
          <div className="text-[11px] text-green-800 mt-1">
            Credited annually by Central Board of Trustees (CBT)
          </div>
        </div>
      </div>

      {/* Passbook Ledger Table */}
      <div className="epfo-card overflow-hidden">
        <div className="bg-[#1a4d8f] text-white px-5 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-yellow-300" />
            <h3 className="font-bold text-xs uppercase tracking-wider">
              Monthly Contribution History (Establishment: {member?.estCode})
            </h3>
          </div>
          <span className="text-[11px] text-blue-200 font-mono">
            {member?.memberId}
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left epfo-table text-xs">
            <thead>
              <tr>
                <th>Wage Month</th>
                <th>Employee Share (12%)</th>
                <th>Employer Share (3.67%)</th>
                <th>Pension Contribution (8.33%)</th>
                <th>Interest Credited</th>
                <th>Running Balance</th>
              </tr>
            </thead>
            <tbody>
              {contributions.map((row, idx) => (
                <tr key={idx} className={row.interest > 0 ? 'bg-green-50/60 font-semibold' : ''}>
                  <td className="font-medium text-slate-900">{row.month}</td>
                  <td className="font-mono text-slate-800">
                    {row.employeeShare > 0 ? `₹${row.employeeShare.toLocaleString('en-IN')}` : '-'}
                  </td>
                  <td className="font-mono text-slate-800">
                    {row.employerShare > 0 ? `₹${row.employerShare.toLocaleString('en-IN')}` : '-'}
                  </td>
                  <td className="font-mono text-slate-800">
                    {row.eps > 0 ? `₹${row.eps.toLocaleString('en-IN')}` : '-'}
                  </td>
                  <td className="font-mono text-green-700">
                    {row.interest > 0 ? `+₹${row.interest.toLocaleString('en-IN')}` : '-'}
                  </td>
                  <td className="font-mono font-bold text-[#003399]">
                    ₹{row.balance.toLocaleString('en-IN')}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Column Explanation Guide */}
      <div className="epfo-card p-5 bg-slate-50 space-y-3 text-xs">
        <h3 className="font-bold text-xs text-[#003399] uppercase tracking-wider flex items-center gap-1.5 border-b border-slate-200 pb-2">
          <Info className="w-4 h-4 text-[#F97316]" />
          <span>EPFO Passbook Column Anatomy Guide (What Each Deduction Means)</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-slate-700">
          <div className="p-3 bg-white rounded border border-slate-200">
            <div className="font-bold text-slate-900 mb-1">Employee Share (12%)</div>
            <p className="text-[11px] text-slate-600 leading-snug">
              Deducted directly from your monthly basic salary. 100% of this goes into your withdrawable EPF accumulation.
            </p>
          </div>

          <div className="p-3 bg-white rounded border border-slate-200">
            <div className="font-bold text-slate-900 mb-1">Employer EPF (3.67%)</div>
            <p className="text-[11px] text-slate-600 leading-snug">
              Out of employer's 12% total contribution, 3.67% goes directly to your EPF balance and earns compound interest.
            </p>
          </div>

          <div className="p-3 bg-white rounded border border-slate-200">
            <div className="font-bold text-slate-900 mb-1">Employer EPS (8.33%)</div>
            <p className="text-[11px] text-slate-600 leading-snug">
              8.33% (capped at ₹1,250/mo) goes to the Employees' Pension Scheme 1995 to fund lifelong monthly pension.
            </p>
          </div>

          <div className="p-3 bg-white rounded border border-slate-200">
            <div className="font-bold text-slate-900 mb-1">Annual Interest Credit</div>
            <p className="text-[11px] text-slate-600 leading-snug">
              Calculated monthly on running balance and compounded once a year on 31st March at CBT notified rate (8.25%).
            </p>
          </div>
        </div>
      </div>

      {/* Projected Balance Calculator */}
      <div className="epfo-card p-5 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 space-y-4">
        <div className="flex items-center justify-between border-b border-blue-200 pb-2">
          <div className="flex items-center gap-2">
            <Calculator className="w-5 h-5 text-[#003399]" />
            <h3 className="font-bold text-sm text-slate-900">
              Future Retirement Corpus Projection Calculator (At 8.25% Interest)
            </h3>
          </div>
          <span className="text-[10px] bg-indigo-100 text-indigo-900 font-bold px-2.5 py-0.5 rounded">
            Compound Growth
          </span>
        </div>

        <p className="text-xs text-slate-600">
          If you and your employer continue contributing at your current pace with annual interest compounding:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
          <div className="bg-white p-4 rounded-lg border border-blue-200 shadow-xs">
            <div className="text-[11px] text-slate-500 font-semibold uppercase">In 1 Year (2027)</div>
            <div className="text-xl font-bold text-slate-900 mt-1">
              ₹{calculateProjection(1).toLocaleString('en-IN')}
            </div>
            <div className="text-[10px] text-green-700 font-medium mt-1">
              +₹{(calculateProjection(1) - epfBalance).toLocaleString('en-IN')} growth
            </div>
          </div>

          <div className="bg-white p-4 rounded-lg border border-blue-300 ring-2 ring-[#003399]/20 shadow-xs">
            <div className="text-[11px] text-[#003399] font-bold uppercase">In 3 Years (2029)</div>
            <div className="text-2xl font-black text-[#003399] mt-1">
              ₹{calculateProjection(3).toLocaleString('en-IN')}
            </div>
            <div className="text-[10px] text-green-700 font-medium mt-1">
              +₹{(calculateProjection(3) - epfBalance).toLocaleString('en-IN')} growth
            </div>
          </div>

          <div className="bg-white p-4 rounded-lg border border-blue-200 shadow-xs">
            <div className="text-[11px] text-slate-500 font-semibold uppercase">In 5 Years (2031)</div>
            <div className="text-xl font-bold text-slate-900 mt-1">
              ₹{calculateProjection(5).toLocaleString('en-IN')}
            </div>
            <div className="text-[10px] text-green-700 font-medium mt-1">
              +₹{(calculateProjection(5) - epfBalance).toLocaleString('en-IN')} growth
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
