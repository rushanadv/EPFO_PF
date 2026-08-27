// src/components/layout/MarqueeBar.jsx
import React from 'react';
import { Megaphone } from 'lucide-react';
import { useLanguage } from '../../context/useLanguage';

export default function MarqueeBar() {
  const { isHindi } = useLanguage();

  const notices = isHindi ? [
    "⚡ ईपीएफओ 3.0: ₹5 लाख तक के दावों का स्वतः निपटान (Auto-settlement) अब चालू — पात्र दावों के लिए नियोक्ता सत्यापन की आवश्यकता नहीं।",
    "📊 वित्त वर्ष 2025-26 के लिए ईपीएफ ब्याज दर: 8.25% प्रति वर्ष (2 मार्च 2026 को अनुमोदित)।",
    "📋 अप्रैल 2026 से फॉर्म 15G और 15H के स्थान पर 'फॉर्म 121' लागू कर दिया गया है। टीडीएस छूट घोषणा के लिए फॉर्म 121 का उपयोग करें।",
    "🏦 ईपीएफओ 3.0 के तहत यूपीआई (UPI) और एटीएम से पीएफ निकासी जल्द शुरू हो रही है — सुनिश्चित करें कि आपकी केवाईसी पूरी है।",
    "📞 नया बहुभाषी हेल्पलाइन नंबर: 14470 (सुबह 7:00 बजे से रात 9:00 बजे तक, टोल-फ्री)।"
  ] : [
    "⚡ EPFO 3.0: Auto-settlement of claims up to ₹5 lakh now live — no employer attestation needed for eligible claims.",
    "📊 EPF Interest Rate for FY 2025-26: 8.25% per annum (approved 2 Mar 2026).",
    "📋 Form 121 has replaced Forms 15G and 15H from April 2026. Use Form 121 for TDS exemption declarations.",
    "🏦 UPI and ATM-based PF withdrawal under EPFO 3.0 coming soon — ensure your KYC is complete.",
    "📞 New national helpline number: 14470 (7 AM – 9 PM, toll-free, multilingual)."
  ];

  return (
    <div className="bg-[#F97316] text-white py-1.5 px-4 shadow-inner flex items-center overflow-hidden border-b border-orange-600/40">
      <div className="bg-[#C2590F] text-white text-[11px] font-bold uppercase tracking-wider px-2 py-0.5 rounded shrink-0 mr-3 flex items-center gap-1 shadow-xs select-none">
        <Megaphone className="w-3.5 h-3.5" />
        <span>{isHindi ? 'नवीनतम सूचनाएं' : 'EPFO Alerts'}</span>
      </div>

      <div className="overflow-hidden whitespace-nowrap flex-1">
        <div className="animate-marquee inline-block text-xs font-medium text-white/95 hover:text-white">
          {notices.join('     ●     ')}
        </div>
      </div>
    </div>
  );
}
