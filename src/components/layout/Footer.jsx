// src/components/layout/Footer.jsx
import React from 'react';
import { ExternalLink, ShieldAlert } from 'lucide-react';
import { useLanguage } from '../../context/useLanguage';

export default function Footer() {
  const { isHindi } = useLanguage();

  return (
    <footer className="bg-[#001f6b] text-white mt-12 border-t-4 border-[#F97316]">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-xs mb-8">
          {/* Col 1: Government Portals */}
          <div>
            <div className="font-bold text-sm mb-3 text-[#F97316] uppercase tracking-wider">
              {isHindi ? 'संबंधित सरकारी पोर्टल' : 'Related Government Links'}
            </div>
            <ul className="space-y-1.5 text-blue-200">
              <li>
                <a href="https://epfindia.gov.in" target="_blank" rel="noreferrer" className="hover:text-white flex items-center gap-1">
                  <span>epfindia.gov.in (Official Main Portal)</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
              <li>
                <a href="https://epfigms.gov.in" target="_blank" rel="noreferrer" className="hover:text-white flex items-center gap-1">
                  <span>epfigms.gov.in (EPF Grievance Portal)</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
              <li>
                <a href="https://pgportal.gov.in" target="_blank" rel="noreferrer" className="hover:text-white flex items-center gap-1">
                  <span>pgportal.gov.in (CPGRAMS Central Govt)</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
              <li>
                <a href="https://rtionline.gov.in" target="_blank" rel="noreferrer" className="hover:text-white flex items-center gap-1">
                  <span>rtionline.gov.in (Online RTI Portal)</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
              <li>
                <a href="https://edaakhil.nic.in" target="_blank" rel="noreferrer" className="hover:text-white flex items-center gap-1">
                  <span>edaakhil.nic.in (Consumer Disputes Commission)</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
            </ul>
          </div>

          {/* Col 2: Social Security Schemes */}
          <div>
            <div className="font-bold text-sm mb-3 text-[#F97316] uppercase tracking-wider">
              {isHindi ? 'सामाजिक सुरक्षा योजनाएं' : 'Social Security Schemes'}
            </div>
            <ul className="space-y-1.5 text-blue-200">
              <li><strong>EPF Scheme 1952:</strong> {isHindi ? 'भविष्य निधि सेवानिवृत्ति संचय एवं निकासी' : 'Provident fund retirement accumulation & withdrawal'}</li>
              <li><strong>EPS Scheme 1995:</strong> {isHindi ? '10+ वर्ष सेवा पर मासिक पेंशन लाभ' : 'Monthly pension benefit for 10+ years qualifying service'}</li>
              <li><strong>EDLI Scheme 1976:</strong> {isHindi ? 'सदस्य के निधन पर ₹7 लाख तक का बीमा लाभ' : 'Assurance benefit up to ₹7 lakh in case of member demise'}</li>
              <li><strong>EPFO 3.0 Framework:</strong> {isHindi ? 'फास्ट-ट्रैक ऑटो-सेटलमेंट इंजन' : 'Fast-track claim auto-settlement engine'}</li>
            </ul>
          </div>

          {/* Col 3: Contact & Zonal Support */}
          <div>
            <div className="font-bold text-sm mb-3 text-[#F97316] uppercase tracking-wider">
              {isHindi ? 'संपर्क एवं सहायता' : 'Contact & Assistance'}
            </div>
            <ul className="space-y-1.5 text-blue-200">
              <li>📞 <strong>National Helpline:</strong> 14470 (7 AM – 9 PM)</li>
              <li>📞 <strong>Toll-Free Backup:</strong> 1800-118-005</li>
              <li>📧 <strong>Helpdesk Email:</strong> uanepf@epfindia.gov.in</li>
              <li>🏢 <strong>Head Office:</strong> Bhavishya Nidhi Bhawan, 14, Bhikaiji Cama Place, New Delhi - 110066</li>
            </ul>
          </div>

          {/* Col 4: Hackathon Project Info */}
          <div>
            <div className="font-bold text-sm mb-3 text-yellow-300 uppercase tracking-wider">
              PF SAATHI PROTOTYPE
            </div>
            <p className="text-blue-200 leading-relaxed mb-2">
              Designed & built for <strong>"Build What Moves India"</strong> Hackathon by Varun Mayya (28 Aug 2026).
            </p>
            <div className="bg-blue-950/80 p-2.5 rounded border border-blue-800 text-[11px] text-blue-300">
              <strong>Objective:</strong> {isHindi
                ? 'वास्तविक समय फॉरेंसिक प्री-चेक और सरल भाषा अनुवाद द्वारा 1.74 करोड़ रिजेक्शन्स को समाप्त करना।'
                : 'Eliminating 17.4 million blind claim rejections through real-time forensic pre-checks and plain-language legal clarity.'}
            </div>
          </div>
        </div>

        {/* Legal & Hackathon Disclaimer */}
        <div className="border-t border-blue-900 pt-5 text-center text-xs text-blue-300 space-y-2">
          <div className="flex flex-wrap items-center justify-center gap-2">
            <span>© 2026 Employees' Provident Fund Organisation (EPFO), India. All Rights Reserved.</span>
          </div>

          <div className="p-3 bg-yellow-950/60 border border-yellow-500/40 rounded-lg text-yellow-200 text-xs max-w-4xl mx-auto flex items-center justify-center gap-2">
            <ShieldAlert className="w-4 h-4 text-yellow-400 shrink-0" />
            <span>
              <strong>HACKATHON DEMO DISCLAIMER:</strong> PF Saathi is an educational and UX proof-of-concept prototype.
              All data shown is mocked. For real government transactions, always visit the official portal at <strong>unifiedportal-mem.epfindia.gov.in</strong>.
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
