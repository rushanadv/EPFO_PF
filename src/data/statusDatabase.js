// src/data/statusDatabase.js

export const STATUS_DATABASE = {
  VERIFICATION_PENDING: {
    code: "VERIFICATION_PENDING",
    display: "Verification pending. Contact employer.",
    status_color: "red",
    meaning_en: "EPFO found a mismatch in your KYC records or employer data. The portal does not specify the reason, but it usually indicates a name mismatch between Aadhaar and EPFO records or a missing Date of Exit.",
    meaning_hi: "EPFO को आपके KYC रिकॉर्ड या नियोक्ता डेटा में कोई बेमेल मिला है। आमतौर पर यह आधार और EPFO रिकॉर्ड में नाम के अंतर या एग्जिट डेट के न होने के कारण होता है।",
    typical_wait: "7–15 days before rejection",
    escalate_after_days: 20,
    action_required: true,
    action_text: "1. Check your KYC Name in KYC Audit. 2. Verify Date of Exit is marked. 3. If employer is uncooperative, generate Joint Declaration or EPFiGMS grievance.",
    action_route: "/manage/kyc"
  },
  UNDER_EXAMINATION: {
    code: "UNDER_EXAMINATION",
    display: "Claim is under examination by dealing hand.",
    status_color: "blue",
    meaning_en: "An EPFO Dealing Assistant is actively reviewing your documents and service records. This is standard processing.",
    meaning_hi: "EPFO के डीलिंग असिस्टेंट आपके दस्तावेजों और सेवा रिकॉर्ड की जांच कर रहे हैं। यह सामान्य प्रक्रिया है।",
    typical_wait: "3–7 working days",
    escalate_after_days: 15,
    action_required: false,
    action_text: "No action needed right now. If it stays in this state for more than 15 days, raise a grievance.",
    action_route: "/help/escalation"
  },
  PENDING_AT_DA: {
    code: "PENDING_AT_DA",
    display: "Pending at DA (Dealing Assistant) / Section Supervisor.",
    status_color: "blue",
    meaning_en: "The claim passed initial checks and is awaiting approval by the Section Supervisor or Assistant PF Commissioner.",
    meaning_hi: "दावा प्रारंभिक जांच पास कर चुका है और सेक्शन सुपरवाइजर या असिस्टेंट पीएफ कमिश्नर की मंजूरी की प्रतीक्षा कर रहा है।",
    typical_wait: "2–4 working days",
    escalate_after_days: 10,
    action_required: false,
    action_text: "Standard supervisory queue. Approval should follow shortly.",
    action_route: "/services/track"
  },
  CLAIM_SETTLED: {
    code: "CLAIM_SETTLED",
    display: "Claim Settled. Payment sent via NEFT.",
    status_color: "green",
    meaning_en: "Great news! Your claim has been approved and the funds have been dispatched via NEFT/PFMS to your linked bank account.",
    meaning_hi: "शुभ समाचार! आपका दावा स्वीकृत हो गया है और राशि आपके बैंक खाते में NEFT द्वारा भेज दी गई है।",
    typical_wait: "Funds credit within 1–3 bank working days",
    escalate_after_days: 5,
    action_required: false,
    action_text: "Check your bank passbook/SMS after 2–3 business days. If amount doesn't credit after 5 days, verify UTR with your bank.",
    action_route: "/passbook"
  },
  REJECTED_KYC: {
    code: "REJECTED_KYC",
    display: "Claim rejected: Member name / Father name / Bank details mismatch.",
    status_color: "red",
    meaning_en: "Your claim was formally rejected due to discrepancy between EPFO master data, Aadhaar details, or Bank IFSC/Account number.",
    meaning_hi: "EPFO रिकॉर्ड, आधार या बैंक खाते के विवरण में विसंगति के कारण आपका दावा अस्वीकार कर दिया गया है।",
    typical_wait: "Immediate action required",
    escalate_after_days: 1,
    action_required: true,
    action_text: "Run the KYC Audit tool, identify the exact mismatched characters, submit a correction request, and re-file.",
    action_route: "/manage/kyc"
  },
  REJECTED_SERVICE: {
    code: "REJECTED_SERVICE",
    display: "Claim rejected: Total service less than 5 years / Non-contributory period not certified.",
    status_color: "red",
    meaning_en: "Service history issues detected. Form 19/10C requires valid Date of Exit and contribution certificates from all previous establishments.",
    meaning_hi: "सेवा इतिहास में समस्या। फॉर्म 19/10C के लिए वैध एग्जिट डेट और सभी पूर्व नियोक्ताओं से सेवा प्रमाण पत्र आवश्यक है।",
    typical_wait: "Requires employer rectification",
    escalate_after_days: 3,
    action_required: true,
    action_text: "Contact previous employer to merge service records via Form 13 Transfer or submit non-contributory certification.",
    action_route: "/services/transfer"
  },
  PAYMENT_UNDER_PROCESS: {
    code: "PAYMENT_UNDER_PROCESS",
    display: "Payment is under process. Bank reconciliation pending.",
    status_color: "yellow",
    meaning_en: "Sanction order generated. EPFO's treasury branch has initiated the bank batch file.",
    meaning_hi: "मंजूरी आदेश जारी हो चुका है। EPFO ट्रेजरी शाखा ने बैंक बैच फाइल भेजी है।",
    typical_wait: "24–48 hours",
    escalate_after_days: 4,
    action_required: false,
    action_text: "Payment is in final transit. No action required.",
    action_route: "/services/track"
  },
  BANK_INACTIVE: {
    code: "BANK_INACTIVE",
    display: "Payment returned by destination bank / Account inactive or dormant.",
    status_color: "red",
    meaning_en: "EPFO attempted NEFT credit, but your bank rejected the deposit because the account is dormant, closed, or joint with an unauthorized person (e.g. parents).",
    meaning_hi: "बैंक ने भुगतान वापस कर दिया क्योंकि खाता निष्क्रिय, बंद या अपात्र संयुक्त खाता (जैसे माता-पिता के साथ) है।",
    typical_wait: "Requires new bank KYC seed",
    escalate_after_days: 2,
    action_required: true,
    action_text: "Visit your bank to activate the account OR submit a new active Individual/Spouse Joint savings account on Manage → KYC.",
    action_route: "/manage/kyc"
  }
};
