// src/components/shared/PersonaSwitcher.jsx
import React, { useState } from 'react';
import { useMember } from '../../context/useMember';
import { Users, Check, ChevronDown, ChevronUp, Sparkles } from 'lucide-react';

export default function PersonaSwitcher() {
  const { member, selectedPresetId, switchPreset, presets } = useMember();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-4 right-4 z-40">
      {isOpen && (
        <div className="mb-2 w-80 sm:w-96 bg-white border-2 border-[#003399] rounded-lg shadow-2xl overflow-hidden animate-in slide-in-from-bottom-2 duration-200">
          <div className="bg-[#001f6b] text-white px-4 py-2.5 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-yellow-300" />
              <span className="font-bold text-xs uppercase tracking-wider">
                Hackathon Demo Persona Switcher
              </span>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-slate-300 hover:text-white text-xs cursor-pointer"
            >
              ✕
            </button>
          </div>

          <div className="p-3 bg-slate-50 text-xs text-slate-600 border-b border-slate-200">
            Switch test personas to evaluate how the portal adapts to different rejection triggers:
          </div>

          <div className="divide-y divide-slate-200 max-h-72 overflow-y-auto">
            {presets.map((preset) => {
              const isSelected = preset.id === selectedPresetId;
              return (
                <button
                  key={preset.id}
                  onClick={() => {
                    switchPreset(preset.id);
                    setIsOpen(false);
                  }}
                  className={`w-full text-left p-3 transition-colors flex items-start justify-between gap-2 cursor-pointer ${
                    isSelected ? 'bg-blue-50/80 border-l-4 border-l-[#003399]' : 'hover:bg-slate-100'
                  }`}
                >
                  <div>
                    <div className="font-bold text-xs text-slate-900 flex items-center gap-1.5">
                      <span>{preset.label}</span>
                    </div>
                    <div className="text-[11px] text-slate-600 mt-1 leading-snug">
                      {preset.description}
                    </div>
                  </div>
                  {isSelected && (
                    <Check className="w-4 h-4 text-[#003399] shrink-0 mt-0.5" />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}

      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-[#001f6b] hover:bg-[#003399] text-white px-3.5 py-2.5 rounded-full shadow-lg border border-yellow-400/40 flex items-center gap-2 text-xs font-bold transition-transform hover:scale-105 active:scale-95 cursor-pointer"
      >
        <Users className="w-4 h-4 text-yellow-400" />
        <span>Demo Persona: {member.name}</span>
        {isOpen ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronUp className="w-3.5 h-3.5" />}
      </button>
    </div>
  );
}
