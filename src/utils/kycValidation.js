// src/utils/kycValidation.js

export function getNameMismatchCause(name1 = '', name2 = '') {
  const n1 = (name1 || '').toLowerCase().trim();
  const n2 = (name2 || '').toLowerCase().trim();
  if (n1.split(' ').length !== n2.split(' ').length) {
    return 'One record contains extra words or initials — commonly maiden vs married surname, or middle name omitted in one portal.';
  }
  return 'Spelling discrepancy, typo, or special character/spacing variation.';
}

export function runKYCAudit(data) {
  const issues = [];
  const normalize = (s) => (s || '').toLowerCase().replace(/\s+/g, ' ').trim();

  // Check 1: Aadhaar name vs EPFO name
  const normAadhaar = normalize(data.aadhaarName);
  const normEpfo = normalize(data.epfoName);
  if (normAadhaar !== normEpfo) {
    issues.push({
      id: 'KYC_001',
      severity: 'CRITICAL',
      title: 'Name mismatch: Aadhaar vs EPFO Member Profile',
      title_hi: 'नाम बेमेल: आधार रिकॉर्ड बनाम EPFO सदस्य रिकॉर्ड',
      detail: `Your Aadhaar has "${data.aadhaarName}" but EPFO records show "${data.epfoName}"`,
      detail_hi: `आपके आधार में "${data.aadhaarName}" है परंतु EPFO रिकॉर्ड में "${data.epfoName}" दर्ज है।`,
      diff: true,
      diffVal1: data.aadhaarName,
      diffVal2: data.epfoName,
      diffLabel1: 'Aadhaar Name',
      diffLabel2: 'EPFO Name',
      commonCause: getNameMismatchCause(data.aadhaarName, data.epfoName),
      fix: 'Submit a Joint Declaration with your employer HR on the Unified Member Portal OR visit your regional EPFO Field Office with Aadhaar and salary slips.',
      fix_hi: 'अपने नियोक्ता HR से संपर्क कर संयुक्त घोषणा (Joint Declaration) प्रस्तुत करें अथवा आधार व वेतन पर्ची लेकर क्षेत्रीय EPFO कार्यालय जाएं।',
      link: 'https://unifiedportal-mem.epfindia.gov.in/memberinterface/',
      linkLabel: 'EPFO Joint Declaration Portal',
      days: '3–7 working days',
      days_hi: '3–7 कार्यदिवस'
    });
  }

  // Check 2: Aadhaar name vs Bank name
  const normBank = normalize(data.bankName);
  if (normAadhaar !== normBank) {
    issues.push({
      id: 'KYC_002',
      severity: 'HIGH',
      title: 'Name mismatch: Aadhaar vs Bank Account Name',
      title_hi: 'नाम बेमेल: आधार रिकॉर्ड बनाम बैंक खाता धारक नाम',
      detail: `Your Aadhaar has "${data.aadhaarName}" but Bank passbook shows "${data.bankName}"`,
      detail_hi: `आधार में "${data.aadhaarName}" है परंतु बैंक पासबुक में "${data.bankName}" दर्ज है।`,
      diff: true,
      diffVal1: data.aadhaarName,
      diffVal2: data.bankName,
      diffLabel1: 'Aadhaar Name',
      diffLabel2: 'Bank Name',
      fix: 'Visit your bank branch with your original Aadhaar card and request an immediate demographic name correction in CBS records.',
      fix_hi: 'मूल आधार कार्ड के साथ अपनी बैंक शाखा में जाएं और बैंक रिकॉर्ड में नाम सुधार का आवेदन करें।',
      link: 'https://myaadhaar.uidai.gov.in',
      linkLabel: 'UIDAI Aadhaar Portal',
      days: '1–3 working days',
      days_hi: '1–3 कार्यदिवस'
    });
  }

  // Check 3: Date of Birth mismatch
  if ((data.dobAadhaar || '').trim() !== (data.dobEPFO || '').trim()) {
    issues.push({
      id: 'KYC_003',
      severity: 'CRITICAL',
      title: 'Date of Birth mismatch: Aadhaar vs EPFO Records',
      title_hi: 'जन्मतिथि बेमेल: आधार बनाम EPFO रिकॉर्ड',
      detail: `Aadhaar DOB: "${data.dobAadhaar}" | EPFO Record DOB: "${data.dobEPFO}"`,
      detail_hi: `आधार जन्मतिथि: "${data.dobAadhaar}" | EPFO जन्मतिथि: "${data.dobEPFO}"`,
      diff: false,
      fix: 'If discrepancy is less than 3 years, correct it online via Member Portal KYC using Aadhaar OTP. If more than 3 years, submit Joint Declaration with 10th marksheet or birth certificate.',
      fix_hi: 'यदि अंतर 3 वर्ष से कम है, तो पोर्टल पर आधार OTP से ऑनलाइन सुधार करें। 3 वर्ष से अधिक अंतर हेतु 10वीं की अंकसूची के साथ संयुक्त घोषणा जमा करें।',
      link: 'https://unifiedportal-mem.epfindia.gov.in/memberinterface/',
      linkLabel: 'Submit DOB Correction',
      days: '7–15 working days',
      days_hi: '7–15 कार्यदिवस'
    });
  }

  // Check 4: Account Type
  if (data.accountType === 'joint_parent') {
    issues.push({
      id: 'KYC_004',
      severity: 'CRITICAL',
      title: 'Disallowed Bank Account Type (Joint with Parent/Third Party)',
      title_hi: 'अमान्य बैंक खाता प्रकार (माता-पिता/अन्य के साथ संयुक्त खाता)',
      detail: 'EPFO statutory regulations strictly disallow credits to joint accounts held with parents, siblings, or friends. Claims to such accounts are rejected automatically.',
      detail_hi: 'EPFO नियमों के अनुसार माता-पिता या अन्य रिश्तेदारों के साथ संयुक्त खाते में भुगतान वर्जित है। ऐसे दावे स्वतः निरस्त हो जाते हैं।',
      diff: false,
      fix: 'Open a single individual savings account in your name OR link a joint account held solely with your spouse (legal partner). Upload the fresh cheque leaf to EPFO.',
      fix_hi: 'अपने नाम से एकल बचत खाता खोलें अथवा केवल पति/पत्नी के साथ संयुक्त खाते का उपयोग करें और पोर्टल पर नया चेक लीफ अपलोड करें।',
      link: 'https://unifiedportal-mem.epfindia.gov.in/memberinterface/',
      linkLabel: 'Update Bank KYC',
      days: '1–2 working days',
      days_hi: '1–2 कार्यदिवस'
    });
  }

  // Check 5: IFSC format
  const ifscClean = (data.bankIFSC || data.ifsc || '').trim().toUpperCase();
  const ifscRegex = /^[A-Z]{4}0[A-Z0-9]{6}$/;
  if (!ifscRegex.test(ifscClean)) {
    issues.push({
      id: 'KYC_005',
      severity: 'HIGH',
      title: 'Invalid IFSC Code Format',
      title_hi: 'अमान्य IFSC कोड प्रारूप',
      detail: `"${ifscClean}" does not match standard 11-digit RBI IFSC format (e.g. SBIN0012345). The 5th character must be zero '0'.`,
      detail_hi: `"${ifscClean}" भारतीय रिजर्व बैंक के 11-अंकीय IFSC प्रारूप से मेल नहीं खाता। 5वां अक्षर शून्य '0' होना आवश्यक है।`,
      diff: false,
      fix: 'Verify the active RTGS/NEFT IFSC on your bank cheque book or bank app. Many banks updated IFSCs following national bank mergers.',
      fix_hi: 'अपनी चेकबुक या पासबुक से सही IFSC कोड की पुष्टि करें। बैंकों के विलय के बाद कई शाखाओं के IFSC बदल गए हैं।',
      link: 'https://rbi.org.in/Scripts/IFSCMICRDetails.aspx',
      linkLabel: 'RBI Official IFSC Finder',
      days: 'Immediate (correct input)',
      days_hi: 'तत्काल'
    });
  }

  // Check 6: Bank account length
  const accClean = (data.bankAccount || '').trim();
  if (accClean.length < 9 || accClean.length > 18 || !/^\d+$/.test(accClean)) {
    issues.push({
      id: 'KYC_006',
      severity: 'HIGH',
      title: 'Unusual Bank Account Number Length',
      title_hi: 'बैंक खाता संख्या की असामान्य लंबाई',
      detail: `Entered account number has ${accClean.length} digits. Valid Indian bank accounts must be 9–18 numeric digits without dashes or spaces.`,
      detail_hi: `दर्ज खाता संख्या में ${accClean.length} अंक हैं। भारतीय बैंक खाते 9 से 18 अंकों के होने चाहिए।`,
      diff: false,
      fix: 'Double-check your bank passbook or net banking profile to ensure no digits are missing.',
      fix_hi: 'पासबुक देखकर सुनिश्चित करें कि कोई अंक छूटा तो नहीं है।',
      link: null,
      days: 'Immediate (correct input)',
      days_hi: 'तत्काल'
    });
  }

  const criticalCount = issues.filter((i) => i.severity === 'CRITICAL').length;
  const highCount = issues.filter((i) => i.severity === 'HIGH').length;

  return {
    issues,
    passed: criticalCount === 0 && highCount === 0,
    criticalCount,
    highCount,
    readyToSubmit: issues.length === 0,
    timestamp: new Date().toISOString()
  };
}
