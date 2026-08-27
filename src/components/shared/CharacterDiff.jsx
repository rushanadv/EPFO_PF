// src/components/shared/CharacterDiff.jsx
import React from 'react';

export default function CharacterDiff({ str1 = '', str2 = '', label1 = 'Source 1 (EPFO)', label2 = 'Source 2 (Aadhaar)' }) {
  const s1 = (str1 || '').trim();
  const s2 = (str2 || '').trim();
  const maxLen = Math.max(s1.length, s2.length);

  if (!maxLen) {
    return (
      <div className="p-3 text-sm text-gray-500 bg-gray-50 rounded border border-gray-200">
        No character data available to compare.
      </div>
    );
  }

  const isExactMatch = s1.toUpperCase() === s2.toUpperCase();

  return (
    <div className="font-mono text-sm bg-slate-50 border border-slate-200 rounded-lg p-4 overflow-x-auto shadow-inner">
      <div className="flex items-center justify-between mb-3">
        <div className="text-xs font-sans text-slate-600 font-medium">
          Forensic Character-by-Character Comparison Grid:
        </div>
        {isExactMatch ? (
          <span className="text-xs font-sans font-bold bg-green-100 text-green-800 px-2 py-0.5 rounded flex items-center gap-1">
            ✓ 100% Exact Match
          </span>
        ) : (
          <span className="text-xs font-sans font-bold bg-red-100 text-red-800 px-2 py-0.5 rounded flex items-center gap-1">
            ✗ Character Discrepancy Found
          </span>
        )}
      </div>

      <div className="inline-block min-w-full">
        {/* Source 1 Row (EPFO) */}
        <div className="flex items-center gap-1 mb-1.5">
          <span className="text-xs font-sans font-semibold text-slate-600 w-32 shrink-0 truncate">
            {label1}:
          </span>
          <div className="flex gap-1">
            {Array.from({ length: maxLen }).map((_, i) => {
              const char1 = s1[i];
              const char2 = s2[i];
              const isMatch = char1 && char2 && char1.toUpperCase() === char2.toUpperCase();
              const isMissing = char1 === undefined;

              return (
                <div
                  key={`s1-${i}`}
                  title={`Pos ${i + 1}: ${char1 ? `'${char1}'` : 'Empty'}`}
                  className={`w-7 h-7 shrink-0 flex items-center justify-center text-xs border font-bold rounded transition-colors ${
                    isMissing
                      ? 'border-dashed border-slate-300 bg-slate-100 text-slate-300'
                      : isMatch
                      ? 'border-slate-300 bg-white text-slate-800'
                      : 'border-red-500 bg-red-100 text-red-700 ring-1 ring-red-400'
                  }`}
                >
                  {char1 === ' ' ? '␣' : char1 || ''}
                </div>
              );
            })}
          </div>
        </div>

        {/* Source 2 Row (Aadhaar) */}
        <div className="flex items-center gap-1 mb-1.5">
          <span className="text-xs font-sans font-semibold text-slate-600 w-32 shrink-0 truncate">
            {label2}:
          </span>
          <div className="flex gap-1">
            {Array.from({ length: maxLen }).map((_, i) => {
              const char1 = s1[i];
              const char2 = s2[i];
              const isMatch = char1 && char2 && char1.toUpperCase() === char2.toUpperCase();
              const isMissing = char2 === undefined;

              return (
                <div
                  key={`s2-${i}`}
                  title={`Pos ${i + 1}: ${char2 ? `'${char2}'` : 'Empty'}`}
                  className={`w-7 h-7 shrink-0 flex items-center justify-center text-xs border font-bold rounded transition-colors ${
                    isMissing
                      ? 'border-dashed border-orange-300 bg-orange-50 text-orange-300'
                      : isMatch
                      ? 'border-slate-300 bg-white text-slate-800'
                      : 'border-red-500 bg-red-100 text-red-700 ring-1 ring-red-400'
                  }`}
                >
                  {char2 === ' ' ? '␣' : char2 || ''}
                </div>
              );
            })}
          </div>
        </div>

        {/* Match / Error Indicator Row */}
        <div className="flex items-center gap-1">
          <span className="w-32 shrink-0 text-xs font-sans text-slate-400">Match Status:</span>
          <div className="flex gap-1">
            {Array.from({ length: maxLen }).map((_, i) => {
              const char1 = s1[i];
              const char2 = s2[i];
              const isMatch = char1 && char2 && char1.toUpperCase() === char2.toUpperCase();

              return (
                <div
                  key={`stat-${i}`}
                  className={`w-7 h-5 shrink-0 flex items-center justify-center text-xs font-black ${
                    isMatch ? 'text-green-600' : 'text-red-600 animate-pulse'
                  }`}
                >
                  {isMatch ? '✓' : '✗'}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="mt-3 pt-2 border-t border-slate-200 text-xs text-slate-500 font-sans flex flex-wrap gap-4 items-center">
        <div className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded bg-white border border-slate-300 inline-block"></span>
          <span>Matched character</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded bg-red-100 border border-red-500 inline-block"></span>
          <span>Mismatched / Extra character</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="text-slate-400">␣</span>
          <span>Space character</span>
        </div>
      </div>
    </div>
  );
}
