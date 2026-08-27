// src/components/shared/EPFOAlertModal.jsx
import React, { useState, useEffect } from 'react';
import { useLanguage } from '../../context/useLanguage';

export default function EPFOAlertModal() {
  const [visible, setVisible] = useState(false);
  const { language, t } = useLanguage();

  useEffect(() => {
    const dismissed = sessionStorage.getItem('epfo_alert_dismissed');
    if (!dismissed) {
      // Short delay so page loads and renders first
      const timer = setTimeout(() => setVisible(true), 900);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleOK = () => {
    sessionStorage.setItem('epfo_alert_dismissed', 'true');
    setVisible(false);
  };

  if (!visible) return null;

  const isHindi = language === 'hi';

  const tips = isHindi
    ? [
        t('alert_tip1') || 'अपने सिस्टम (कंप्यूटर/लैपटॉप/स्मार्टफोन) पर लाइसेंस प्राप्त एंटीवायरस/एंटी-मैलवेयर इंस्टॉल करें।',
        t('alert_tip2') || 'सिस्टम को अपडेट और पैच रखें।',
        t('alert_tip3') || 'एक जटिल पासवर्ड बनाए रखें।',
        t('alert_tip4') || 'अपना पासवर्ड किसी के साथ साझा न करें।'
      ]
    : [
        'Install a licensed Anti-Virus/ Anti-Malware on your systems (Computer/Laptop /Smartphone).',
        'Keep system updated and patched.',
        'Maintain a complex password.',
        'Do not share passwords.'
      ];

  return (
    // Backdrop — semi-transparent, blurs everything behind
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs p-4 animate-in fade-in duration-200">
      {/* Modal box */}
      <div className="bg-white rounded-lg shadow-2xl w-full max-w-2xl mx-auto overflow-hidden border border-slate-300">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 bg-white">
          <div className="flex items-center gap-3">
            {/* Orange triangle warning icon */}
            <span className="text-2xl select-none">⚠️</span>
            <span className="text-xl font-bold text-orange-700">
              {isHindi ? t('alert_title') : 'Alert'}
            </span>
          </div>
          {/* X close button — top right */}
          <button
            type="button"
            onClick={handleOK}
            className="text-gray-500 hover:text-gray-800 text-2xl font-light leading-none p-1 rounded hover:bg-slate-100 transition-colors cursor-pointer"
            aria-label="Close alert"
          >
            ✕
          </button>
        </div>

        {/* Body */}
        <div className="px-6 py-5 space-y-4 bg-white">
          {/* Pink alert box — "Dear Employers" */}
          <div className="bg-red-50 border border-red-200 rounded-md px-5 py-4">
            <div className="flex items-start gap-3">
              {/* Circular info icon */}
              <div className="mt-0.5 shrink-0 w-5 h-5 rounded-full bg-red-800 text-white flex items-center justify-center text-xs font-bold select-none">
                i
              </div>
              <div>
                <p className="text-red-900 font-bold text-base">
                  {isHindi ? t('alert_dear') : 'Dear Employers,'}
                </p>
                <p className="text-red-900 font-bold text-base mt-1 leading-snug">
                  {isHindi
                    ? t('alert_message')
                    : 'Be vigilant against your credential theft/loss that may lead to cyber frauds.'}
                </p>
              </div>
            </div>
          </div>

          {/* Light blue tips box */}
          <div className="bg-cyan-50 border border-cyan-200 rounded-md px-5 py-4">
            <ul className="space-y-3">
              {tips.map((tip, i) => (
                <li key={i} className="flex items-start gap-3 text-teal-900 font-semibold text-sm sm:text-base leading-snug">
                  {/* Thumbs-up icon — matching original */}
                  <span className="text-teal-700 text-lg shrink-0 select-none">👍</span>
                  <span>{tip}</span>
                </li>
              ))}
            </ul>
            {/* -EPFO signature, right-aligned */}
            <p className="text-right text-teal-900 font-bold text-base mt-4">-EPFO</p>
          </div>
        </div>

        {/* Footer — OK button */}
        <div className="flex justify-end px-6 py-4 border-t border-gray-200 bg-slate-50">
          <button
            type="button"
            onClick={handleOK}
            className="bg-red-600 hover:bg-red-700 text-white font-bold px-8 py-2 rounded text-base transition-colors shadow-sm cursor-pointer"
          >
            {isHindi ? t('alert_ok') : 'OK'}
          </button>
        </div>
      </div>
    </div>
  );
}
