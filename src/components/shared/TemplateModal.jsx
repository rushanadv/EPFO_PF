// src/components/shared/TemplateModal.jsx
import React, { useState } from 'react';
import { X, Copy, Check, Printer, ExternalLink } from 'lucide-react';
import { useLanguage } from '../../context/useLanguage';

export default function TemplateModal({ isOpen, onClose, title, content, portalUrl, portalName = 'Official Portal' }) {
  const [copied, setCopied] = useState(false);
  const [customText, setCustomText] = useState(null);
  const { isHindi } = useLanguage();

  if (!isOpen) return null;

  const currentText = customText !== null ? customText : (content || '');

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(currentText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch (err) {
      console.error('Failed to copy text', err);
    }
  };

  const handlePrint = () => {
    const printWindow = window.open('', '_blank');
    if (printWindow) {
      printWindow.document.write(`
        <html>
          <head>
            <title>${title}</title>
            <style>
              body { font-family: monospace; padding: 40px; line-height: 1.5; white-space: pre-wrap; font-size: 13px; }
            </style>
          </head>
          <body>${currentText.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</body>
        </html>
      `);
      printWindow.document.close();
      printWindow.focus();
      printWindow.print();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-lg shadow-2xl border border-slate-300 w-full max-w-3xl flex flex-col max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="bg-[#001f6b] text-white px-5 py-3.5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xl">📝</span>
            <h3 className="font-bold text-base">{title}</h3>
          </div>
          <button
            onClick={onClose}
            className="text-slate-300 hover:text-white p-1 rounded hover:bg-white/10 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Action Toolbar */}
        <div className="bg-slate-100 border-b border-slate-200 px-5 py-2.5 flex flex-wrap items-center justify-between gap-2">
          <span className="text-xs text-slate-600 font-medium">
            {isHindi ? 'यह प्रारूप आपके विवरण से स्वतः भरा गया है। आप इसे संपादित भी कर सकते हैं।' : 'Auto-filled with your profile data. You can edit before copying.'}
          </span>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopy}
              className={`text-xs font-bold px-3 py-1.5 rounded flex items-center gap-1.5 transition-all shadow-xs cursor-pointer ${
                copied
                  ? 'bg-green-700 text-white'
                  : 'bg-[#F97316] hover:bg-[#C2590F] text-white'
              }`}
            >
              {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? (isHindi ? 'कॉपी हो गया!' : 'Copied!') : (isHindi ? 'कॉपी करें' : 'Copy Text')}</span>
            </button>

            <button
              onClick={handlePrint}
              className="text-xs font-semibold px-3 py-1.5 rounded bg-white hover:bg-slate-50 border border-slate-300 text-slate-700 flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>{isHindi ? 'प्रिंट करें' : 'Print Draft'}</span>
            </button>

            {portalUrl && (
              <a
                href={portalUrl}
                target="_blank"
                rel="noreferrer"
                className="text-xs font-semibold px-3 py-1.5 rounded bg-[#003399] hover:bg-[#001f6b] text-white flex items-center gap-1.5 transition-colors"
              >
                <span>{portalName}</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}
          </div>
        </div>

        {/* Content Textarea */}
        <div className="p-5 flex-1 overflow-y-auto bg-slate-50">
          <textarea
            value={currentText}
            onChange={(e) => setCustomText(e.target.value)}
            rows={16}
            className="w-full font-mono text-xs text-slate-800 bg-white border border-slate-300 rounded p-4 shadow-inner focus:ring-2 focus:ring-[#003399] focus:outline-none leading-relaxed"
          />
        </div>

        {/* Footer */}
        <div className="bg-slate-100 border-t border-slate-200 px-5 py-3 flex items-center justify-between text-xs text-slate-500">
          <div>Tip: Paste this draft directly into the grievance description or email body.</div>
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-slate-200 hover:bg-slate-300 text-slate-800 font-semibold rounded transition-colors cursor-pointer"
          >
            {isHindi ? 'बंद करें' : 'Close'}
          </button>
        </div>
      </div>
    </div>
  );
}
