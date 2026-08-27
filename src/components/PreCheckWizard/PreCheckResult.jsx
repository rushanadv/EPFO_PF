// src/components/PreCheckWizard/PreCheckResult.jsx
import React, { useEffect } from 'react';
import { 
  ShieldCheck, 
  ShieldAlert, 
  ShieldX, 
  Download, 
  RotateCcw, 
  CheckCircle2, 
  AlertTriangle, 
  FileText, 
  Printer,
  Clock,
  ArrowRight
} from 'lucide-react';
import confetti from 'canvas-confetti';
import jsPDF from 'jspdf';
import { useLanguage } from '../common/useLanguage';

export function PreCheckResult({ formData = {}, auditResult = {}, onReset, onNavigateToStatus }) {
  const { isHindi } = useLanguage();

  const issues = auditResult?.issues || [];
  const criticalCount = auditResult?.criticalCount || 0;
  const highCount = auditResult?.highCount || 0;
  const totalIssues = issues.length;

  const isReady = totalIssues === 0;
  const isCritical = criticalCount > 0;

  // Trigger celebration confetti if 100% all clear!
  useEffect(() => {
    if (isReady) {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    }
  }, [isReady]);

  // Forms recommended
  const forms = formData.recommendedForms || ['Form 19', 'Form 10C'];
  const exitStatus = formData.exitGuidance?.status || 'OK';

  // Calculate estimated total resolution time
  let totalEstimatedDays = '0 days (Ready immediately)';
  let totalEstimatedDaysHi = '0 दिन (तत्काल जमा करने योग्य)';
  if (isCritical) {
    totalEstimatedDays = '7–15 working days';
    totalEstimatedDaysHi = '7–15 कार्यदिवस';
  } else if (!isCritical && highCount > 0) {
    totalEstimatedDays = '3–5 working days';
    totalEstimatedDaysHi = '3–5 कार्यदिवस';
  }

  const currentDate = new Date().toLocaleDateString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric'
  });

  const downloadPDFReport = () => {
    try {
      const doc = new jsPDF();
      doc.setFont('helvetica');

      // Title & Header
      doc.setFillColor(0, 51, 153);
      doc.rect(0, 0, 210, 30, 'F');
      doc.setTextColor(255, 255, 255);
      doc.setFontSize(16);
      doc.text('PF SAATHI — EPFO PRE-CHECK AUDIT REPORT', 14, 15);
      doc.setFontSize(10);
      doc.text('Citizens Digital Verification Diagnostic Summary', 14, 23);

      // Metadata
      doc.setTextColor(30, 41, 59);
      doc.setFontSize(11);
      doc.text(`Generated Date: ${currentDate}`, 14, 40);
      doc.text(`Member Name: ${formData.aadhaarName || formData.name || 'Ravi Kumar'}`, 14, 48);
      doc.text(`UAN: ${formData.uan || '100987654321'}`, 14, 56);
      doc.text(`Employer: ${formData.employer || 'TechCorp India Pvt Ltd'}`, 14, 64);

      // Verdict Box
      doc.setDrawColor(203, 213, 225);
      const bgR = isReady ? 240 : (isCritical ? 254 : 255);
      const bgG = isReady ? 253 : (isCritical ? 242 : 247);
      const bgB = isReady ? 244 : (isCritical ? 242 : 237);
      doc.setFillColor(bgR, bgG, bgB);
      doc.roundedRect(14, 72, 182, 24, 3, 3, 'FD');

      doc.setFontSize(13);
      const textR = isReady ? 21 : (isCritical ? 220 : 217);
      const textG = isReady ? 128 : (isCritical ? 38 : 119);
      const textB = isReady ? 61 : (isCritical ? 38 : 6);
      doc.setTextColor(textR, textG, textB);
      const verdict = isReady 
        ? 'VERDICT: 100% READY TO SUBMIT — ALL CHECKS PASSED' 
        : isCritical 
        ? 'VERDICT: CRITICAL ACTION REQUIRED BEFORE SUBMISSION' 
        : 'VERDICT: ISSUES DETECTED — RECTIFICATION RECOMMENDED';
      doc.text(verdict, 20, 86);

      // Summary Table
      doc.setTextColor(15, 23, 42);
      doc.setFontSize(11);
      doc.text('1. Recommended Claim Forms:', 14, 110);
      doc.setFontSize(10);
      doc.text(`   • ${forms.join(', ')}`, 14, 118);

      doc.setFontSize(11);
      doc.text('2. KYC & Demographic Audit Status:', 14, 130);
      doc.setFontSize(10);
      doc.text(`   • Critical Mismatches: ${criticalCount}`, 14, 138);
      doc.text(`   • High Severity Issues: ${highCount}`, 14, 145);
      doc.text(`   • Total Discrepancies: ${totalIssues}`, 14, 152);

      // Issues breakdown
      if (issues.length > 0) {
        doc.setFontSize(11);
        doc.text('3. Detailed Issue Discrepancies & Resolution:', 14, 166);
        let y = 176;
        issues.forEach((iss) => {
          if (y > 270) {
            doc.addPage();
            y = 20;
          }
          doc.setFontSize(10);
          doc.setTextColor(220, 38, 38);
          doc.text(`   [${iss.severity}] ${iss.title}`, 14, y);
          y += 6;
          doc.setTextColor(71, 85, 105);
          doc.setFontSize(9);
          doc.text(`   Detail: ${iss.detail}`, 18, y);
          y += 5;
          doc.text(`   Action: ${iss.fix}`, 18, y, { maxWidth: 170 });
          y += 12;
        });
      }

      // Footer
      doc.setFontSize(8);
      doc.setTextColor(148, 163, 184);
      doc.text('PF Saathi Hackathon PoC • Unofficial citizen guide • epfindia.gov.in', 14, 285);

      doc.save(`PF_Saathi_PreCheck_Report_${formData.uan || '100987654321'}.pdf`);
    } catch (err) {
      console.error('Failed to generate PDF:', err);
      window.print();
    }
  };

  return (
    <div className="space-y-6">
      {/* Signature Pre-Check Pass/Fail Shield Banner */}
      <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-md text-center flex flex-col items-center justify-center relative overflow-hidden">
        {/* Glow backdrop circles */}
        <div
          className={`absolute -top-24 -left-24 w-72 h-72 rounded-full blur-3xl opacity-30 pointer-events-none ${
            isReady ? 'bg-emerald-400' : isCritical ? 'bg-red-400' : 'bg-orange-400'
          }`}
        ></div>

        {/* The Animated Shield SVG */}
        <div className="relative mb-4">
          <div
            className={`w-28 h-28 sm:w-32 sm:h-32 rounded-3xl flex items-center justify-center transition-all ${
              isReady
                ? 'bg-gradient-to-b from-emerald-500 to-green-700 text-white shadow-emerald-300 animate-shield-green'
                : isCritical
                ? 'bg-gradient-to-b from-red-500 to-rose-700 text-white shadow-red-300 animate-shield-red'
                : 'bg-gradient-to-b from-orange-500 to-amber-600 text-white shadow-orange-300 animate-shield-orange'
            }`}
          >
            {isReady ? (
              <ShieldCheck className="w-16 h-16 sm:w-20 sm:h-20 stroke-[2.2]" />
            ) : isCritical ? (
              <ShieldX className="w-16 h-16 sm:w-20 sm:h-20 stroke-[2.2]" />
            ) : (
              <ShieldAlert className="w-16 h-16 sm:w-20 sm:h-20 stroke-[2.2]" />
            )}
          </div>
        </div>

        {/* Shield Status Text */}
        <div className="space-y-1 max-w-lg">
          <h2
            className={`text-2xl sm:text-3xl font-extrabold tracking-tight ${
              isReady ? 'text-emerald-700' : isCritical ? 'text-red-600' : 'text-orange-600'
            }`}
          >
            {isReady
              ? isHindi ? '✅ दावा जमा करने हेतु पूर्णतः तैयार' : '✅ Ready to Submit'
              : isCritical
              ? isHindi ? '⚠️ जमा करने से पहले अनिवार्य सुधार आवश्यक' : '⚠️ Fix Required Before Submitting'
              : isHindi ? '⚠️ समस्याएं मिलीं — सुधार की सलाह' : '⚠️ Issues Found — Fix Before Submitting'}
          </h2>
          <p className="text-sm text-slate-600 font-medium">
            {isReady
              ? isHindi
                ? 'सभी 6 सत्यापन पास हो चुके हैं। आपका दावा 100% बिना अस्वीकृति के प्रोसेस होगा।'
                : 'All 6 critical checks passed. Your claim has zero demographic or establishment mismatch risk.'
              : isHindi
              ? `कुल ${totalIssues} विसंगतियां मिली हैं (${criticalCount} गंभीर)। इन्हें ठीक किए बिना दावा करने पर रिजेक्शन निश्चित है।`
              : `${totalIssues} issue(s) detected (${criticalCount} Critical). Submitting now will trigger rejection code "Verification Pending".`}
          </p>
        </div>

        {/* Top Quick Actions */}
        <div className="flex flex-wrap items-center justify-center gap-3 mt-6">
          <button
            type="button"
            onClick={downloadPDFReport}
            className="inline-flex items-center gap-2 bg-[#003399] hover:bg-[#001f6b] text-white font-semibold px-5 py-2.5 rounded-lg shadow-sm hover:shadow transition text-xs sm:text-sm cursor-pointer"
          >
            <Download className="w-4 h-4 text-[#F97316]" />
            <span>{isHindi ? '📄 आधिकारिक PDF रिपोर्ट डाउनलोड करें' : '📄 Download Report as PDF'}</span>
          </button>

          <button
            type="button"
            onClick={() => window.print()}
            className="inline-flex items-center gap-2 bg-white hover:bg-slate-50 text-slate-700 border border-slate-300 font-semibold px-4 py-2.5 rounded-lg shadow-xs transition text-xs sm:text-sm no-print cursor-pointer"
          >
            <Printer className="w-4 h-4 text-slate-500" />
            <span>{isHindi ? 'प्रिंट करें' : 'Print Summary'}</span>
          </button>

          <button
            type="button"
            onClick={onReset}
            className="inline-flex items-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold px-4 py-2.5 rounded-lg transition text-xs sm:text-sm no-print cursor-pointer"
          >
            <RotateCcw className="w-4 h-4" />
            <span>{isHindi ? 'पुनः जांच शुरू करें' : 'Edit Input Details'}</span>
          </button>
        </div>
      </div>

      {/* Structured Pre-Check Report Card */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden font-sans">
        {/* Report Top Header */}
        <div className="bg-slate-900 text-white px-6 py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 border-b border-slate-800">
          <div>
            <div className="text-[10px] uppercase font-bold tracking-widest text-[#F97316]">
              {isHindi ? 'नागरिक डायग्नोस्टिक रिपोर्ट' : 'OFFICIAL AUDIT SUMMARY'}
            </div>
            <h3 className="text-base font-bold">
              {isHindi ? 'पूर्व-जांच डायग्नोस्टिक रिपोर्ट' : 'Pre-Check Diagnostic Report'}
            </h3>
          </div>
          <div className="flex items-center gap-4 text-xs text-slate-300 font-mono">
            <span>Generated: {currentDate}</span>
            <span>UAN: {formData.uan || '100987654321'}</span>
          </div>
        </div>

        {/* 3 Summary Grid Columns */}
        <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-slate-200 bg-slate-50/60 border-b border-slate-200">
          <div className="p-4 space-y-1">
            <div className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
              {isHindi ? 'अनुशंसित फॉर्म' : 'Recommended Forms'}
            </div>
            <div className="font-bold text-[#003399] text-base flex items-center gap-1.5">
              <FileText className="w-4 h-4 text-[#F97316]" />
              <span>{forms.join(' + ')}</span>
            </div>
            <p className="text-[11px] text-slate-500">
              {forms.includes('Form 19') ? 'Full EPF + EPS Settlement' : 'Transfer / Advance Mode'}
            </p>
          </div>

          <div className="p-4 space-y-1">
            <div className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
              {isHindi ? 'KYC विसंगतियां' : 'KYC Issues Detected'}
            </div>
            <div className="font-bold text-slate-900 text-base flex items-center gap-1.5">
              {criticalCount > 0 ? (
                <AlertTriangle className="w-4 h-4 text-red-600" />
              ) : (
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              )}
              <span className={criticalCount > 0 ? 'text-red-600' : 'text-emerald-700'}>
                {totalIssues} {isHindi ? 'मिलीं' : 'Found'} ({criticalCount} {isHindi ? 'गंभीर' : 'Critical'})
              </span>
            </div>
            <p className="text-[11px] text-slate-500">
              {criticalCount > 0 ? 'Will trigger immediate rejection' : 'Demographic checks clear'}
            </p>
          </div>

          <div className="p-4 space-y-1">
            <div className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
              {isHindi ? 'एग्जिट डेट स्थिति' : 'Exit Date Status'}
            </div>
            <div className="font-bold text-slate-900 text-base flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-[#003399]" />
              <span>
                {exitStatus === 'OK'
                  ? isHindi ? 'अपडेटेड' : 'Updated'
                  : exitStatus === 'SELF_MARK'
                  ? isHindi ? 'स्वयं दर्ज करें' : 'Self-Mark Required'
                  : isHindi ? '2 माह प्रतीक्षा' : '2-Month Wait'}
              </span>
            </div>
            <p className="text-[11px] text-slate-500">
              {exitStatus === 'SELF_MARK' ? 'Actionable on portal right now' : 'Verified'}
            </p>
          </div>
        </div>

        {/* Detailed Issues Checklist */}
        <div className="p-6 space-y-4">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700">
            {isHindi ? 'समस्याओं की विस्तृत सूची एवं समाधान' : 'Detailed Itemized Diagnosis:'}
          </h4>

          {issues.length === 0 ? (
            <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4 text-emerald-900 text-xs flex items-center gap-3">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0" />
              <div>
                <strong>{isHindi ? 'कोई समस्या नहीं:' : 'All Clean:'}</strong>{' '}
                {isHindi
                  ? 'आपके सभी दस्तावेज़ (आधार, EPFO, बैंक पासबुक) 100% सुसंगत हैं।'
                  : 'Your Aadhaar, EPFO record, Bank passbook, IFSC code, and Date of Exit are in 100% compliance.'}
              </div>
            </div>
          ) : (
            <div className="space-y-3">
              {issues.map((iss, index) => (
                <div
                  key={iss.id}
                  className={`p-4 rounded-lg border flex flex-col sm:flex-row sm:items-start justify-between gap-3 text-xs ${
                    iss.severity === 'CRITICAL'
                      ? 'bg-red-50/50 border-red-200 text-red-950'
                      : 'bg-amber-50/50 border-amber-200 text-amber-950'
                  }`}
                >
                  <div className="space-y-1 flex-1">
                    <div className="flex items-center gap-2">
                      <span className="font-bold font-mono">#{index + 1}</span>
                      <span
                        className={`text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full ${
                          iss.severity === 'CRITICAL'
                            ? 'bg-red-100 text-red-700 border border-red-300'
                            : 'bg-amber-100 text-amber-800 border border-amber-300'
                        }`}
                      >
                        {iss.severity}
                      </span>
                      <strong className="text-slate-900 text-sm">
                        {isHindi ? iss.title_hi : iss.title}
                      </strong>
                    </div>
                    <p className="text-slate-700 font-medium pl-6">
                      {isHindi ? iss.detail_hi : iss.detail}
                    </p>
                    <p className="text-slate-900 bg-white/80 p-2.5 rounded border border-slate-200 pl-3 mt-2">
                      <strong>Fix:</strong> {isHindi ? iss.fix_hi : iss.fix}
                    </p>
                  </div>

                  <div className="text-right flex-shrink-0 pl-6 sm:pl-0">
                    <div className="text-[11px] text-slate-500">Fix Duration</div>
                    <div className="font-bold text-slate-900">{isHindi ? iss.days_hi : iss.days}</div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Bottom Time & Next Action Banner */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2.5 text-slate-800">
              <Clock className="w-5 h-5 text-[#003399] flex-shrink-0" />
              <div>
                <span className="font-bold">
                  {isHindi ? 'सभी सुधारों का अनुमानित कुल समय: ' : 'Estimated time to fix all detected issues: '}
                </span>
                <strong className="text-[#003399] text-sm">
                  {isHindi ? totalEstimatedDaysHi : totalEstimatedDays}
                </strong>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={onNavigateToStatus}
                className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#F97316] hover:bg-[#C2590F] text-white font-bold rounded-lg shadow-xs transition cursor-pointer"
              >
                <span>{isHindi ? 'स्थिति अनुवादक देखें →' : "Translate What's My Status →"}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
