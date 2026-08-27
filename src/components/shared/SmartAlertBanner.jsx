// src/components/shared/SmartAlertBanner.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../context/useLanguage';
import { AlertTriangle, CheckCircle, ArrowRight } from 'lucide-react';

export default function SmartAlertBanner({ alerts = [] }) {
  const { isHindi } = useLanguage();

  if (!alerts || alerts.length === 0) {
    return (
      <div className="bg-green-50 border border-green-300 rounded-lg p-4 flex items-center gap-3 shadow-xs">
        <CheckCircle className="w-7 h-7 text-green-700 shrink-0" />
        <div className="flex-1">
          <div className="font-bold text-green-900 text-sm">
            {isHindi ? 'सभी जांच सफल — खाता दावा प्रस्तुत करने के लिए तैयार है' : 'All Pre-Checks Passed — Account Ready'}
          </div>
          <div className="text-xs text-green-800 mt-0.5">
            {isHindi 
              ? 'आपके ईपीएफओ और आधार रिकॉर्ड में कोई विसंगति नहीं पाई गई है। आप बिना किसी रुकावट के दावा कर सकते हैं।' 
              : 'Zero KYC discrepancies detected between EPFO, Aadhaar, and Bank records. You are eligible for 1-click claim settlement.'}
          </div>
        </div>
        <Link
          to="/services/claim"
          className="shrink-0 text-xs font-semibold bg-green-700 text-white px-3.5 py-2 rounded shadow-xs hover:bg-green-800 transition-colors flex items-center gap-1.5"
        >
          <span>{isHindi ? 'दावा फाइल करें' : 'File Claim'}</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    );
  }

  const criticalCount = alerts.filter((a) => a.severity === 'CRITICAL').length;

  return (
    <div className="border border-red-300 rounded-lg overflow-hidden shadow-xs bg-white">
      {/* Header Strip */}
      <div className="bg-red-700 text-white px-4 py-2.5 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <AlertTriangle className="w-5 h-5 text-yellow-300 animate-bounce" />
          <span className="font-bold text-sm tracking-wide">
            {isHindi 
              ? `⚠️ ${alerts.length} समस्या पाई गई — तत्काल कार्रवाई आवश्यक`
              : `⚠️ ${alerts.length} Issue${alerts.length > 1 ? 's' : ''} Found — Action Required Before Filing`}
          </span>
        </div>
        {criticalCount > 0 && (
          <span className="bg-red-900 text-yellow-200 text-xs font-semibold px-2.5 py-0.5 rounded-full uppercase tracking-wider">
            {criticalCount} Critical
          </span>
        )}
      </div>

      {/* Alert Items List */}
      <div className="divide-y divide-red-100">
        {alerts.map((alert) => (
          <div
            key={alert.id || alert.title}
            className="p-4 bg-red-50/70 hover:bg-red-50 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-3"
          >
            <div className="flex items-start gap-3">
              <span className="text-xl mt-0.5 shrink-0 select-none">{alert.icon}</span>
              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="font-bold text-sm text-slate-900">{alert.title}</span>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider ${
                    alert.severity === 'CRITICAL' ? 'bg-red-200 text-red-900 border border-red-300' :
                    alert.severity === 'HIGH' ? 'bg-orange-200 text-orange-900 border border-orange-300' :
                    'bg-blue-200 text-blue-900 border border-blue-300'
                  }`}>
                    {alert.severity}
                  </span>
                </div>
                <div className="text-xs text-slate-700 mt-1 leading-relaxed">
                  {alert.detail}
                </div>
              </div>
            </div>

            <Link
              to={alert.route}
              className="shrink-0 self-start sm:self-center text-xs font-semibold bg-[#003399] hover:bg-[#001f6b] text-white px-3.5 py-2 rounded shadow-xs transition-colors flex items-center gap-1.5"
            >
              <span>{alert.action}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
