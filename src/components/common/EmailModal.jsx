// src/components/common/EmailModal.jsx
import React, { useState } from 'react';
import { X, Mail, Send } from 'lucide-react';
import { CopyButton } from './CopyButton';
import { useLanguage } from './useLanguage';

export function EmailModal({ isOpen, onClose, initialData = {} }) {
  const { isHindi } = useLanguage();
  const [formData, setFormData] = useState({
    name: initialData.name || 'Ravi Kumar',
    uan: initialData.uan || '100987654321',
    company: initialData.employer || 'TechCorp India Pvt Ltd',
    joiningDate: initialData.dateOfJoining || '01/03/2019',
    exitDate: initialData.dateOfExit || '31/01/2026',
    contact: initialData.mobileAadhaar || '9876543210',
    hrEmail: 'hr@company.com'
  });

  if (!isOpen) return null;

  const subject = `Request to Update Date of Exit on EPFO Portal — UAN ${formData.uan || '[UAN]'}`;

  const emailBody = `Subject: ${subject}

Dear HR / Concerned Authority,

I, ${formData.name || '[Your Name]'}, with UAN ${formData.uan || '[UAN Number]'}, worked at ${formData.company || '[Company Name]'} from ${formData.joiningDate || '[Joining Date]'} to ${formData.exitDate || '[Last Working Day]'}.

As per Section 17A of the EPF & MP Act, 1952, the Date of Exit must be updated in the EPFO Employer Portal promptly after an employee's exit. This has not been done, and as a result, my PF withdrawal / transfer claim is blocked.

I request you to update my Date of Exit as ${formData.exitDate || '[Last Working Day]'} on the EPFO Employer Portal under "Member" → "Mark Exit" at the earliest.

If this is not completed within 7 working days of this email, I will be compelled to file a formal grievance on EPFiGMS (epfigms.gov.in) and escalate under the EPF & MP Act.

Attached: Resignation letter / Relieving letter.

Regards,
${formData.name || '[Your Name]'}
Contact: ${formData.contact || '[Your Contact Number]'}`;

  const mailtoUrl = `mailto:${encodeURIComponent(formData.hrEmail)}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(emailBody)}`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-3xl overflow-hidden border border-slate-200 flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="bg-[#003399] text-white px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-white/10 rounded-lg">
              <Mail className="w-5 h-5 text-[#F97316]" />
            </div>
            <div>
              <h3 className="text-lg font-bold">
                {isHindi ? 'HR के लिए आधिकारिक ईमेल ड्राफ्ट' : 'Official HR Email Generator'}
              </h3>
              <p className="text-xs text-blue-100">
                {isHindi 
                  ? 'कर्मचारी भविष्य निधि अधिनियम धारा 17A के तहत कानूनी नोटिस प्रारूप' 
                  : 'Statutory compliance template under Section 17A of the EPF & MP Act, 1952'}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-white/80 hover:text-white p-1.5 rounded-lg hover:bg-white/10 transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-6">
          {/* Quick Edit Inputs */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">
              {isHindi ? 'विवरण संशोधित करें' : '1. Verify & Edit Your Details'}
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 bg-slate-50 p-4 rounded-lg border border-slate-200 text-xs">
              <div>
                <label className="block text-slate-600 font-medium mb-1">Your Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-white border border-slate-300 rounded px-2.5 py-1.5 focus:border-[#003399] focus:ring-1 focus:ring-[#003399] outline-none"
                />
              </div>
              <div>
                <label className="block text-slate-600 font-medium mb-1">UAN Number</label>
                <input
                  type="text"
                  value={formData.uan}
                  onChange={(e) => setFormData({ ...formData, uan: e.target.value })}
                  className="w-full bg-white border border-slate-300 rounded px-2.5 py-1.5 focus:border-[#003399] focus:ring-1 focus:ring-[#003399] outline-none"
                />
              </div>
              <div>
                <label className="block text-slate-600 font-medium mb-1">Company / Employer</label>
                <input
                  type="text"
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  className="w-full bg-white border border-slate-300 rounded px-2.5 py-1.5 focus:border-[#003399] focus:ring-1 focus:ring-[#003399] outline-none"
                />
              </div>
              <div>
                <label className="block text-slate-600 font-medium mb-1">Joining Date (DD/MM/YYYY)</label>
                <input
                  type="text"
                  value={formData.joiningDate}
                  onChange={(e) => setFormData({ ...formData, joiningDate: e.target.value })}
                  className="w-full bg-white border border-slate-300 rounded px-2.5 py-1.5 focus:border-[#003399] focus:ring-1 focus:ring-[#003399] outline-none"
                />
              </div>
              <div>
                <label className="block text-slate-600 font-medium mb-1">Last Working Day</label>
                <input
                  type="text"
                  value={formData.exitDate}
                  onChange={(e) => setFormData({ ...formData, exitDate: e.target.value })}
                  className="w-full bg-white border border-slate-300 rounded px-2.5 py-1.5 focus:border-[#003399] focus:ring-1 focus:ring-[#003399] outline-none"
                  placeholder="e.g. 31/01/2026"
                />
              </div>
              <div>
                <label className="block text-slate-600 font-medium mb-1">Your Mobile / Contact</label>
                <input
                  type="text"
                  value={formData.contact}
                  onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
                  className="w-full bg-white border border-slate-300 rounded px-2.5 py-1.5 focus:border-[#003399] focus:ring-1 focus:ring-[#003399] outline-none"
                />
              </div>
            </div>
          </div>

          {/* Email Preview */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                {isHindi ? '2. तैयार ईमेल संदेश' : '2. Ready Email Message'}
              </h4>
              <span className="text-[11px] text-slate-500">
                {isHindi ? 'सीधे कॉपी करें या ईमेल ऐप में खोलें' : 'Ready to send to HR/Finance team'}
              </span>
            </div>
            <div className="relative">
              <pre className="bg-slate-900 text-slate-100 p-4 rounded-lg font-mono text-xs whitespace-pre-wrap leading-relaxed border border-slate-700 overflow-x-auto select-all max-h-64 overflow-y-auto">
                {emailBody}
              </pre>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="bg-slate-50 px-6 py-3.5 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3">
          <div className="text-xs text-slate-500">
            💡 <strong>Tip:</strong> Always attach your resignation acceptance email as proof.
          </div>
          <div className="flex items-center gap-2.5">
            <button
              onClick={onClose}
              className="px-4 py-2 text-sm text-slate-600 hover:text-slate-800 hover:bg-slate-200 rounded transition cursor-pointer"
            >
              {isHindi ? 'बंद करें' : 'Close'}
            </button>
            <a
              href={mailtoUrl}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 text-sm font-medium bg-white text-slate-700 hover:bg-slate-100 border border-slate-300 rounded shadow-xs transition"
            >
              <Send className="w-4 h-4 text-[#003399]" />
              <span>{isHindi ? 'ईमेल ऐप में खोलें' : 'Open in Email App'}</span>
            </a>
            <CopyButton
              text={emailBody}
              label="📋 Copy Email"
              label_hi="📋 ईमेल कॉपी करें"
              variant="secondary"
              size="md"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
