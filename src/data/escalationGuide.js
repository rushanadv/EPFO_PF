// src/data/escalationGuide.js
export const ESCALATION_LEVELS = [
  {
    level: 1,
    title: 'Fix It Yourself',
    title_hi: 'स्वयं सुधार करें',
    time: 'Immediate to 7 days',
    time_hi: 'तुरंत से 7 दिन',
    color: 'green',
    icon: 'Wrench',
    description: 'Most issues can be resolved directly by fixing KYC mismatches, updating bank IFSC, or marking your Date of Exit yourself.',
    description_hi: 'अधिकांश समस्याएं KYC बेमेल को ठीक करके, बैंक विवरण अपडेट करके या खुद एग्जिट डेट दर्ज करके हल की जा सकती हैं।',
    recommended_for: 'Issues < 7 days old or unfiled claims with mismatches',
    recommended_for_hi: '7 दिन से कम पुराने मामले या बेमेल वाले बिना जमा दावे',
    actions: [
      'Run our Pre-Check Wizard on Screen 1 to identify exact mismatches',
      'Update Aadhaar name at UIDAI (myaadhaar.uidai.gov.in) if misspelled',
      'Reactivate dormant bank account at your local branch',
      'Self-mark Date of Exit on EPFO portal (if 2+ months have passed since leaving job)'
    ],
    actions_hi: [
      'Pre-Check विजार्ड चलाकर सटीक बेमेल खोजें',
      'यदि आधार में वर्तनी गलत है तो UIDAI पर सुधारें',
      'अपनी बैंक शाखा में जाकर निष्क्रिय खाता पुनः सक्रिय करें',
      'नौकरी छोड़े 2 माह बीत चुके हों तो EPFO पोर्टल पर स्वयं एग्जिट डेट दर्ज करें'
    ]
  },
  {
    level: 2,
    title: 'EPFiGMS Grievance',
    title_hi: 'EPFiGMS आधिकारिक शिकायत',
    time: '30 days (EPFO is legally required to respond)',
    time_hi: '30 दिन (EPFO कानूनी रूप से उत्तर देने हेतु बाध्य है)',
    color: 'blue',
    icon: 'FileText',
    description: "If self-fix didn't work or your employer is unresponsive after 7-15 days, file an official grievance. EPFO must legally respond within 30 days.",
    description_hi: 'यदि नियोक्ता उत्तर नहीं दे रहा या सामान्य तरीके से काम नहीं हो रहा, तो EPFiGMS पर आधिकारिक शिकायत दर्ज करें।',
    recommended_for: 'Issues unresolved after 7 to 30 days',
    recommended_for_hi: '7 से 30 दिनों से लंबित मामले',
    link: 'https://epfigms.gov.in',
    actions: [
      'Go to epfigms.gov.in portal',
      'Register with your UAN and OTP-verified mobile',
      'Choose grievance category (PF Withdrawal / Employer not responding)',
      'Paste our pre-filled grievance template below',
      'Upload supporting documents (resignation letter, relieving letter, passbook)'
    ],
    actions_hi: [
      'epfigms.gov.in पोर्टल पर जाएं',
      'UAN और मोबाइल नंबर से पंजीकरण करें',
      'शिकायत श्रेणी चुनें (PF निकासी / नियोक्ता असहयोग)',
      'नीचे दिया गया शिकायत प्रारूप कॉपी करके पेस्ट करें',
      'सहायक दस्तावेज (त्यागपत्र, रिलीविंग लेटर, पासबुक) अपलोड करें'
    ],
    template_available: true,
    template: `Subject: Grievance regarding delay in PF settlement & unresponsive employer — UAN: [UAN_NUMBER]

Respected Regional P.F. Commissioner,

I, [MEMBER_NAME], holding UAN [UAN_NUMBER], was employed with [EMPLOYER_NAME] (Establishment ID: [ESTABLISHMENT_ID]) from [DATE_OF_JOINING] to [LAST_WORKING_DAY].

My claim / exit date update has been pending for over [DAYS_FILED] days without resolution. I have repeatedly reached out to my employer HR, but no corrective action has been taken.

I respectfully request EPFO to:
1. Direct the employer to verify and approve the pending KYC / Date of Exit within 7 working days.
2. In the event of continued non-compliance by the employer, process and settle my legitimate PF withdrawal claim directly under the powers vested in the Commissioner.

Enclosures:
1. Copy of Resignation Acceptance / Relieving Letter
2. Copy of Aadhaar and Bank Passbook / Cancelled Cheque

Thanking you,
Yours sincerely,
[MEMBER_NAME]
Contact: [MOBILE_NUMBER]`
  },
  {
    level: 3,
    title: 'CPGRAMS Central Govt Escalation',
    title_hi: 'CPGRAMS केंद्र सरकार स्तर पर शिकायत',
    time: '30–45 days',
    time_hi: '30–45 दिन',
    color: 'yellow',
    icon: 'Building2',
    description: 'If your EPFiGMS grievance was ignored or closed without resolution after 30 days, escalate to the Prime Minister & Central Public Grievance Portal.',
    description_hi: 'यदि 30 दिनों बाद भी EPFiGMS शिकायत का समाधान नहीं हुआ, तो सीधे भारत सरकार के CPGRAMS पोर्टल पर अपील करें।',
    recommended_for: 'Issues unresolved after 30 to 60 days',
    recommended_for_hi: '30 से 60 दिनों से लंबित मामले',
    link: 'https://pgportal.gov.in',
    actions: [
      'Visit pgportal.gov.in and log in with your mobile number',
      'Select Ministry: "Ministry of Labour and Employment" → Sub-department: "EPFO"',
      'Reference your previous EPFiGMS Registration / Grievance Number',
      'Upload the unsatisfactory response or non-action proof',
      'Submit grievance to Central Cabinet Secretariat monitoring queue'
    ],
    actions_hi: [
      'pgportal.gov.in पर जाएं और लॉगिन करें',
      'मंत्रालय चुनें: "श्रम एवं रोजगार मंत्रालय" → उप-विभाग: "EPFO"',
      'पिछली EPFiGMS शिकायत संख्या का संदर्भ दें',
      'असंतोषजनक उत्तर या विलंब का विवरण जोड़ें',
      'केंद्रीय कैबिनेट सचिवालय निगरानी में शिकायत दर्ज करें'
    ]
  },
  {
    level: 4,
    title: 'RTI Application (Right to Information)',
    title_hi: 'सूचना का अधिकार (RTI) आवेदन',
    time: '30 days by law',
    time_hi: 'कानूनन 30 दिन में अनिवार्य उत्तर',
    color: 'orange',
    icon: 'ShieldAlert',
    cost: '₹10 application fee',
    description: "Use the RTI Act 2005 to legally compel EPFO to disclose the exact file notings, reasons for non-settlement, and the name of the officer holding your file. Penalties apply to officers who fail to respond.",
    description_hi: 'RTI अधिनियम 2005 के तहत EPFO को फाइल नोटिंग, देरी का कारण और संबंधित अधिकारी का नाम उजागर करने हेतु बाध्य करें।',
    recommended_for: 'Cases stuck 60 to 90 days with no clear reasons',
    recommended_for_hi: '60 से 90 दिनों से बिना कारण अटके मामले',
    link: 'https://rtionline.gov.in',
    actions: [
      'Go to rtionline.gov.in',
      'Create account or log in as Indian Citizen',
      'Select Ministry: "Ministry of Labour and Employment" → Public Authority: "Employees Provident Fund Organisation"',
      'Pay standard ₹10 statutory fee online (UPI/NetBanking)',
      'Paste the Section 6(1) text template below and submit'
    ],
    actions_hi: [
      'rtionline.gov.in पर जाएं',
      'पंजीकरण करें और लॉगिन करें',
      'प्राधिकरण चुनें: "Employees Provident Fund Organisation"',
      '₹10 का वैधानिक शुल्क ऑनलाइन (UPI/कार्ड) अदा करें',
      'धारा 6(1) के अंतर्गत दिया गया प्रारूप पेस्ट करें'
    ],
    template_available: true,
    template: `APPLICATION UNDER SECTION 6(1) OF THE RIGHT TO INFORMATION ACT, 2005

To,
The Central Public Information Officer (CPIO),
Employees' Provident Fund Organisation (EPFO),
Regional Office: [FIELD_OFFICE_OR_REGION]

1. Name of Applicant: [MEMBER_NAME]
2. UAN Number: [UAN_NUMBER]
3. Claim / Tracking ID: [TRACKING_ID] (Filing Date: [DAYS_FILED] days ago)

Information Sought:
1. Please provide the certified copy of daily progress and file notings regarding my PF claim/grievance under UAN [UAN_NUMBER].
2. Name, designation, and office address of the dealing assistant/officer in whose custody my claim is currently pending.
3. The specific recorded reasons for delay beyond the Citizen Charter timeline (20 days).
4. The date by which my claim is scheduled for final settlement and disbursement.

I have deposited the requisite RTI application fee of ₹10 online.

Date: [CURRENT_DATE]
Applicant: [MEMBER_NAME]
Contact: [MOBILE_NUMBER]`
  },
  {
    level: 5,
    title: 'Consumer Protection Act Complaint (e-Daakhil)',
    title_hi: 'उपभोक्ता आयोग में शिकायत (e-Daakhil)',
    time: '60–90 days for hearing',
    time_hi: 'सुनवाई हेतु 60–90 दिन',
    color: 'red',
    icon: 'Scale',
    description: 'If withdrawal is delayed 90+ days without valid statutory cause, and has caused financial loss (bounced EMI penalties, medical debt, school fee delays), EPFO can be held liable for deficiency in service with interest & compensation.',
    description_hi: '90+ दिन की अकारण देरी और वित्तीय नुकसान (ईएमआई बाउंस, चिकित्सा व्यय) होने पर उपभोक्ता संरक्षण अधिनियम 2019 के तहत क्षतिपूर्ति हेतु केस दर्ज करें।',
    recommended_for: 'Severe delays (> 90 days) resulting in financial injury',
    recommended_for_hi: '90 दिन से अधिक गंभीर विलंब व आर्थिक क्षति',
    link: 'https://edaakhil.nic.in',
    eligibility: [
      '90+ days delay from complete claim application submission',
      'Proof of financial loss or penalty (bounced EMI charges, hospital bills, high-interest emergency loan receipts)',
      'Documented evidence of previous follow-ups (EPFiGMS grievance IDs, RTI replies, emails)'
    ],
    eligibility_hi: [
      'पूर्ण आवेदन जमा करने के 90 से अधिक दिन बाद भी भुगतान न होना',
      'वित्तीय नुकसान का प्रमाण (ईएमआई बाउंस शुल्क, आपातकालीन ऋण रसीद, चिकित्सा बिल)',
      'पूर्व में की गई शिकायतों का रिकॉर्ड (EPFiGMS संख्या, RTI पत्राचार)'
    ],
    actions: [
      'Compile audit trail of all applications, grievance numbers, and bank statements',
      'Gather proof of consequential financial damages and loss of interest',
      'Go to edaakhil.nic.in (National Consumer Disputes Redressal Commission e-filing portal)',
      'File formal petition against "Employees Provident Fund Organisation" for deficiency in service',
      'Claim principal amount + 18% statutory interest + compensation for mental harassment'
    ],
    actions_hi: [
      'सभी आवेदनों, शिकायतों व बैंक विवरणों का लेखा-जोखा तैयार करें',
      'ब्याज हानि व आर्थिक नुकसान के प्रमाण संलग्न करें',
      'edaakhil.nic.in पोर्टल पर जाएं',
      'EPFO के विरुद्ध "सेवा में कमी (Deficiency in Service)" हेतु ऑनलाइन परिवाद दाखिल करें',
      'मूल राशि + 18% ब्याज + मानसिक प्रताड़ना हेतु हर्जाने की मांग करें'
    ]
  }
];
