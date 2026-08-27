// src/utils/formSelection.js

export function getRecommendedForms(situation, serviceYears, joiningNewJob) {
  if (!situation) return null;

  if (situation === 'transfer') {
    return {
      forms: ['Form 13'],
      forms_hi: ['फॉर्म 13 — पीएफ ट्रांसफर (स्थानांतरण)'],
      title: 'Form 13 — Online PF Transfer',
      title_hi: 'फॉर्म 13 — ऑनलाइन पीएफ ट्रांसफर',
      warning: 'Wait for your new employer to make the first PF deposit before initiating transfer.',
      warning_hi: 'स्थानांतरण शुरू करने से पहले अपने नए नियोक्ता द्वारा पहली पीएफ जमा (deposit) करने की प्रतीक्षा करें।',
      note: 'Both old and new employer establishments will approve this digitally.',
      note_hi: 'पुराने और नए दोनों नियोक्ता इसे डिजिटल रूप से सत्यापित करेंगे।'
    };
  }

  if (situation === 'partial') {
    return {
      forms: ['Form 31'],
      forms_hi: ['फॉर्म 31 — अग्रिम (Partial Advance) निकासी'],
      title: 'Form 31 — Advance / Partial Withdrawal',
      title_hi: 'फॉर्म 31 — अग्रिम / आंशिक निकासी',
      warning: 'You must still be employed. Eligible reasons: medical emergency, house purchase/construction, higher education, or marriage.',
      warning_hi: 'इसके लिए आपका कार्यरत होना आवश्यक है। मान्य कारण: चिकित्सा आपातकाल, आवास निर्माण, उच्च शिक्षा या विवाह।',
      note: 'No tax deduction (TDS) applies on Form 31 non-refundable advances.',
      note_hi: 'फॉर्म 31 के अग्रिम भुगतान पर कोई टीडीएस (TDS) नहीं कटता है।'
    };
  }

  if (situation === 'full') {
    if (joiningNewJob === 'yes') {
      return {
        forms: ['Form 13'],
        forms_hi: ['फॉर्म 13 — पीएफ ट्रांसफर'],
        title: 'Form 13 — Transfer Recommended Instead of Withdrawal',
        title_hi: 'फॉर्म 13 — निकासी के बजाय ट्रांसफर की सलाह',
        warning: 'Since you are joining a new job, TRANSFER your PF (Form 13) instead of withdrawing. Withdrawals before 5 years of service attract TDS (tax deduction).',
        warning_hi: 'चूंकि आप नई नौकरी शुरू कर रहे हैं, इसलिए निकासी के स्थान पर ट्रांसफर (Form 13) चुनें। 5 वर्ष से कम सेवा पर टीडीएस कटता है।',
        note: 'Transferring preserves your continuous service credit for pension eligibility.',
        note_hi: 'ट्रांसफर करने से आपकी पेंशन सेवा अवधि सुरक्षित रहती है।'
      };
    }

    if (serviceYears === 'under5') {
      return {
        forms: ['Form 19', 'Form 10C'],
        forms_hi: ['फॉर्म 19 — पूर्ण पीएफ निकासी', 'फॉर्म 10C — ईपीएस पेंशन निकासी'],
        title: 'Form 19 (EPF) + Form 10C (EPS Pension)',
        title_hi: 'फॉर्म 19 (EPF फंड) + फॉर्म 10C (EPS पेंशन)',
        warning: 'Withdrawals before 5 cumulative years of service attract 10% to 20% TDS. Consider submitting Form 15G / 15H if your annual income is below taxable limits.',
        warning_hi: '5 वर्ष से कम सेवा पर निकासी में TDS कट सकता है। यदि कुल आय कर सीमा से कम है तो Form 15G / 15H संलग्न करें।',
        note: '⚠️ File Form 19 first. After it is settled, file Form 10C for the EPS (pension) component separately.',
        note_hi: '⚠️ पहले फॉर्म 19 जमा करें। उसका निपटान होने के बाद ईपीएस पेंशन हेतु अलग से फॉर्म 10C जमा करें।'
      };
    }

    if (serviceYears === '5to10') {
      return {
        forms: ['Form 19', 'Form 10C'],
        forms_hi: ['फॉर्म 19 — पूर्ण पीएफ निकासी', 'फॉर्म 10C — ईपीएस पेंशन निकासी'],
        title: 'Form 19 (EPF) + Form 10C (EPS Pension)',
        title_hi: 'फॉर्म 19 (EPF फंड) + फॉर्म 10C (EPS पेंशन)',
        warning: null,
        note: 'File Form 19 first, then Form 10C. If your combined service across all jobs exceeds 10 years, you will receive a Scheme Certificate instead of EPS lump sum.',
        note_hi: 'पहले फॉर्म 19, फिर फॉर्म 10C भरें। यदि कुल सेवा 10 वर्ष से अधिक हो तो EPS नकद के बजाय स्कीम सर्टिफिकेट मिलता है।'
      };
    }

    if (serviceYears === 'over10') {
      return {
        forms: ['Form 19'],
        forms_hi: ['फॉर्म 19 — ईपीएफ पूर्ण निकासी'],
        title: 'Form 19 — EPF Withdrawal (Pension Scheme Certificate Issued Separately)',
        title_hi: 'फॉर्म 19 — ईपीएफ निकासी (पेंशन सर्टिफिकेट अलग से जारी होगा)',
        warning: null,
        note: 'Since you have 10+ years of total service, you are eligible for a monthly pension at age 58. You will receive a Scheme Certificate instead of EPS cash. Only file Form 19 for the EPF component.',
        note_hi: '10+ वर्ष की सेवा के कारण आप 58 वर्ष की आयु में मासिक पेंशन के पात्र हैं। ईपीएस नकद नहीं निकाला जा सकता, केवल फॉर्म 19 भरें।'
      };
    }
  }

  return null;
}
