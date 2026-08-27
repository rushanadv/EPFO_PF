// src/components/PreCheckWizard/CharacterDiff.jsx
import React from 'react';
import { characterDiff } from '../../utils/characterDiff';

export function CharacterDiff({ 
  label1 = 'Aadhaar Record', 
  val1 = '', 
  label2 = 'EPFO Record', 
  val2 = '' 
}) {
  const diffItems = characterDiff(val1, val2);

  return (
    <div className="bg-slate-900 text-white rounded-lg p-4 font-mono-diff overflow-x-auto shadow-inner border border-slate-700">
      <div className="text-[11px] font-sans text-slate-400 uppercase tracking-wider mb-3 flex items-center justify-between">
        <span>Character-by-Character Forensic Diff</span>
        <div className="flex items-center gap-3 text-[10px] font-sans">
          <span className="flex items-center gap-1">
            <span className="w-2.5 h-2.5 bg-slate-700 rounded-xs inline-block"></span> Match
          </span>
          <span className="flex items-center gap-1">
            <span className="w-2.5 h-2.5 bg-red-600/80 border border-red-400 rounded-xs inline-block"></span> Mismatch
          </span>
          <span className="flex items-center gap-1">
            <span className="w-2.5 h-2.5 bg-amber-500/30 border border-dashed border-amber-400 rounded-xs inline-block"></span> Extra Char
          </span>
        </div>
      </div>

      {/* Row 1: First string (e.g. Aadhaar) */}
      <div className="mb-3">
        <div className="text-xs text-blue-300 font-sans font-semibold mb-1 flex items-center gap-2">
          <span>{label1}:</span>
          <span className="text-slate-400 text-[11px] font-normal">"{val1}"</span>
        </div>
        <div className="flex flex-wrap gap-1 items-center">
          {diffItems.map((item, idx) => {
            const char = item.c1;
            const isSpace = char === ' ';
            const isNull = char === null;

            let boxClass = "bg-slate-800 text-slate-200 border-slate-700";
            if (isNull) {
              boxClass = "bg-slate-950/50 text-slate-600 border-dashed border-slate-800";
            } else if (item.status === 'mismatch') {
              boxClass = "bg-red-950/80 text-red-300 border-red-500 ring-1 ring-red-500/50";
            } else if (item.status === 'extra') {
              boxClass = "bg-amber-950/80 text-amber-300 border-dashed border-amber-500";
            }

            return (
              <div
                key={`r1-${idx}`}
                className={`w-7 h-8 flex items-center justify-center text-xs font-bold rounded border transition-all ${boxClass}`}
                title={`Index ${idx + 1}: ${isNull ? 'Missing' : char === ' ' ? 'Space' : char}`}
              >
                {isNull ? '·' : isSpace ? '␣' : char}
              </div>
            );
          })}
        </div>
      </div>

      {/* Row 2: Second string (e.g. EPFO) */}
      <div>
        <div className="text-xs text-amber-300 font-sans font-semibold mb-1 flex items-center gap-2">
          <span>{label2}:</span>
          <span className="text-slate-400 text-[11px] font-normal">"{val2}"</span>
        </div>
        <div className="flex flex-wrap gap-1 items-center">
          {diffItems.map((item, idx) => {
            const char = item.c2;
            const isSpace = char === ' ';
            const isNull = char === null;

            let boxClass = "bg-slate-800 text-slate-200 border-slate-700";
            if (isNull) {
              boxClass = "bg-slate-950/50 text-slate-600 border-dashed border-slate-800";
            } else if (item.status === 'mismatch') {
              boxClass = "bg-red-950/80 text-red-300 border-red-500 ring-1 ring-red-500/50";
            } else if (item.status === 'extra') {
              boxClass = "bg-amber-950/80 text-amber-300 border-dashed border-amber-500";
            }

            return (
              <div
                key={`r2-${idx}`}
                className={`w-7 h-8 flex items-center justify-center text-xs font-bold rounded border transition-all ${boxClass}`}
                title={`Index ${idx + 1}: ${isNull ? 'Missing' : char === ' ' ? 'Space' : char}`}
              >
                {isNull ? '·' : isSpace ? '␣' : char}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
