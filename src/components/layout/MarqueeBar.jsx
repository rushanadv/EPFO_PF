// src/components/layout/MarqueeBar.jsx
import React from 'react';
import { Megaphone } from 'lucide-react';
import { useLanguage } from '../../context/useLanguage';
import { tickerItems } from '../../data/noticeTickerItems';

export default function MarqueeBar() {
  const { language, isHindi } = useLanguage();

  const notices = tickerItems[language] || tickerItems.en;

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
