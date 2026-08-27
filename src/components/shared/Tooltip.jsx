// src/components/shared/Tooltip.jsx
import React, { useState, useRef, useEffect } from 'react';
import { HelpCircle, X } from 'lucide-react';

export default function Tooltip({ textEn = '', textHi = '', label = 'Field Help' }) {
  const [isOpen, setIsOpen] = useState(false);
  const popoverRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (popoverRef.current && !popoverRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div className="relative inline-block ml-1.5 align-middle" ref={popoverRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="text-[#003399] hover:text-[#F97316] transition-colors focus:outline-none cursor-pointer"
        title="Click for plain language field explanation"
        aria-label={label}
      >
        <HelpCircle className="w-4 h-4" />
      </button>

      {isOpen && (
        <div className="absolute z-50 bottom-full left-1/2 -translate-x-1/2 mb-2 w-72 sm:w-80 bg-slate-900 text-white rounded-lg shadow-xl p-3.5 text-xs border border-slate-700 animate-in fade-in zoom-in-95 duration-150">
          <div className="flex items-center justify-between border-b border-slate-700 pb-1.5 mb-2">
            <span className="font-bold text-[#F97316] flex items-center gap-1">
              💡 {label}
            </span>
            <button
              onClick={() => setIsOpen(false)}
              className="text-slate-400 hover:text-white p-0.5"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="space-y-2">
            <div>
              <div className="text-[10px] uppercase font-bold text-blue-300 mb-0.5">🇬🇧 English:</div>
              <p className="text-slate-200 leading-relaxed font-sans">
                {textEn}
              </p>
            </div>

            {textHi && (
              <div className="border-t border-slate-800 pt-1.5">
                <div className="text-[10px] uppercase font-bold text-orange-300 mb-0.5">🇮🇳 हिंदी:</div>
                <p className="text-slate-300 leading-relaxed font-hindi">
                  {textHi}
                </p>
              </div>
            )}
          </div>

          {/* Arrow */}
          <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-slate-900"></div>
        </div>
      )}
    </div>
  );
}
