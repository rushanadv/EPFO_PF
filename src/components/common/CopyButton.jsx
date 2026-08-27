// src/components/common/CopyButton.jsx
import React, { useState } from 'react';
import { Copy, Check } from 'lucide-react';
import { useLanguage } from './useLanguage';

export function CopyButton({ 
  text, 
  label = 'Copy', 
  label_hi = 'कॉपी करें', 
  className = '',
  size = 'md', // 'sm' | 'md' | 'lg'
  variant = 'primary' // 'primary' | 'secondary' | 'outline'
}) {
  const [copied, setCopied] = useState(false);
  const { isHindi } = useLanguage();

  const handleCopy = async () => {
    try {
      if (navigator?.clipboard?.writeText) {
        await navigator.clipboard.writeText(text);
      } else {
        const textarea = document.createElement('textarea');
        textarea.value = text;
        textarea.style.position = 'fixed';
        textarea.style.opacity = '0';
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
      }
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text:', err);
    }
  };

  const baseStyles = "inline-flex items-center justify-center font-medium rounded transition-all focus:outline-none focus:ring-2 focus:ring-offset-2";
  
  const sizeStyles = {
    sm: "px-2.5 py-1 text-xs gap-1.5",
    md: "px-3.5 py-1.5 text-sm gap-2",
    lg: "px-5 py-2.5 text-base gap-2.5"
  };

  const variantStyles = {
    primary: "bg-[#003399] hover:bg-[#001f6b] text-white focus:ring-[#003399]",
    secondary: "bg-[#F97316] hover:bg-[#C2590F] text-white focus:ring-[#F97316]",
    outline: "bg-white hover:bg-slate-50 text-slate-700 border border-slate-300 focus:ring-slate-400 shadow-sm"
  };

  const displayText = isHindi ? label_hi : label;

  return (
    <button
      type="button"
      onClick={handleCopy}
      className={`${baseStyles} ${sizeStyles[size]} ${copied ? 'bg-emerald-700 text-white hover:bg-emerald-800' : variantStyles[variant]} ${className}`}
      title={copied ? "Copied!" : "Click to copy text"}
    >
      {copied ? (
        <>
          <Check className="w-4 h-4 text-emerald-300 animate-in zoom-in" />
          <span className="font-semibold">{isHindi ? 'कॉपी हो गया! ✅' : 'Copied! ✅'}</span>
        </>
      ) : (
        <>
          <Copy className="w-4 h-4" />
          <span>{displayText}</span>
        </>
      )}
    </button>
  );
}
