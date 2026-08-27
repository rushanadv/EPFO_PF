// src/components/layout/EPFOLogo.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../context/useLanguage';

export default function EPFOLogo() {
  const { t } = useLanguage();

  return (
    <Link to="/dashboard" className="flex items-center gap-3 group focus:outline-none">
      {/* Authentic EPFO Gear Logo SVG */}
      <div className="shrink-0">
        <svg width="52" height="52" viewBox="0 0 60 60" className="drop-shadow-xs">
          {/* Outer circle with saffron stroke */}
          <circle cx="30" cy="30" r="27" fill="#001f6b" stroke="#F97316" strokeWidth="2.5" />
          
          {/* Saffron Gear Teeth */}
          {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => (
            <rect
              key={angle}
              x="27.5"
              y="1.5"
              width="5"
              height="6.5"
              rx="1"
              fill="#F97316"
              transform={`rotate(${angle} 30 30)`}
            />
          ))}
          
          {/* Inner blue badge */}
          <circle cx="30" cy="30" r="19" fill="#003399" stroke="#ffffff" strokeWidth="1" />
          
          {/* Central Ashok Chakra motif lines */}
          <circle cx="30" cy="30" r="14" fill="none" stroke="#F97316" strokeWidth="0.5" strokeDasharray="2,2" />
          
          {/* EPFO Bold Text */}
          <text
            x="30"
            y="35"
            textAnchor="middle"
            fill="#ffffff"
            fontSize="10.5"
            fontWeight="bold"
            letterSpacing="0.5"
            fontFamily="system-ui, sans-serif"
          >
            EPFO
          </text>
        </svg>
      </div>

      {/* Typography */}
      <div>
        <div className="text-white font-bold text-base sm:text-lg leading-tight tracking-tight group-hover:text-blue-100 transition-colors">
          {t('org_name_en')}
        </div>
        <div className="text-blue-200 text-xs font-normal mt-0.5 leading-snug">
          {t('org_ministry')}
        </div>
        <div className="text-[#F97316] font-bold text-[10px] uppercase tracking-wider mt-0.5 font-hindi">
          {t('org_name_hi')}
        </div>
      </div>
    </Link>
  );
}
