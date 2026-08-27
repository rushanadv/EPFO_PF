// src/components/Footer.jsx
import React from 'react';
import { ExternalLink, ShieldCheck, Award } from 'lucide-react';
import { useLanguage } from './common/useLanguage';

export function Footer() {
  const { isHindi } = useLanguage();

  return (
    <footer className="bg-slate-900 text-slate-400 text-xs mt-12 border-t border-slate-800">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pb-6 border-b border-slate-800 text-slate-300">
          <div>
            <div className="flex items-center gap-2 text-white font-bold text-sm mb-2">
              <Award className="w-4 h-4 text-[#F97316]" />
              <span>Build What Moves India — Hackathon</span>
            </div>
            <p className="text-slate-400 text-[12px] leading-relaxed">
              Designed & engineered by the pair programming team for Varun Mayya's "Build What Moves India" Hackathon.
              Rethinking India's public digital infrastructure for 7+ crore workers.
            </p>
          </div>

          <div>
            <div className="flex items-center gap-2 text-white font-bold text-sm mb-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Official Portals Directory</span>
            </div>
            <ul className="space-y-1 text-[12px]">
              <li>
                <a 
                  href="https://unifiedportal-mem.epfindia.gov.in/memberinterface/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-blue-400 hover:text-blue-300 inline-flex items-center gap-1"
                >
                  EPFO Unified Member Portal <ExternalLink className="w-3 h-3" />
                </a>
              </li>
              <li>
                <a 
                  href="https://passbook.epfindia.gov.in/MemberPassBook/Login" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-blue-400 hover:text-blue-300 inline-flex items-center gap-1"
                >
                  EPFO Passbook Portal <ExternalLink className="w-3 h-3" />
                </a>
              </li>
              <li>
                <a 
                  href="https://epfigms.gov.in" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-blue-400 hover:text-blue-300 inline-flex items-center gap-1"
                >
                  EPFiGMS Grievance Portal <ExternalLink className="w-3 h-3" />
                </a>
              </li>
            </ul>
          </div>

          <div>
            <div className="flex items-center gap-2 text-white font-bold text-sm mb-2">
              <span>National Toll-Free Helpline</span>
            </div>
            <p className="text-[12px] text-slate-400 leading-relaxed mb-2">
              EPFO National Call Center: <strong className="text-amber-400 font-mono">1800-118-005</strong> (Toll Free, Mon–Fri 9:15 AM to 5:45 PM).
            </p>
            <p className="text-[11px] text-slate-500">
              For Aadhaar mobile updates, visit UIDAI enrollment centres or myaadhaar.uidai.gov.in.
            </p>
          </div>
        </div>

        {/* Disclaimer Bar */}
        <div className="pt-6 text-center text-slate-500 space-y-2 text-[11px]">
          <div className="bg-amber-950/40 border border-amber-800/60 text-amber-200/90 rounded-lg p-3 max-w-3xl mx-auto">
            <span className="font-semibold text-amber-300">
              ⚠️ {isHindi ? 'अस्वीकरण (Disclaimer):' : 'DISCLAIMER:'}
            </span>{' '}
            {isHindi ? (
              <span>
                पीएफ साथी (PF Saathi) "Build What Moves India" हैकाथॉन हेतु बनाया गया संकल्पना प्रोटोटाइप है। यह आधिकारिक EPFO उत्पाद नहीं है। सभी डेटा काल्पनिक/डेमो हैं। आधिकारिक सेवाओं हेतु <strong>unifiedportal-mem.epfindia.gov.in</strong> पर जाएं।
              </span>
            ) : (
              <span>
                PF Saathi is a hackathon proof-of-concept built for "Build What Moves India" by Varun Mayya. This is NOT an official EPFO product. All data shown is mocked. For actual EPFO services, visit <strong>unifiedportal-mem.epfindia.gov.in</strong>.
              </span>
            )}
          </div>
          <div>
            © 2026 PF Saathi • Citizen-First Digital Governance Innovation
          </div>
        </div>
      </div>
    </footer>
  );
}
