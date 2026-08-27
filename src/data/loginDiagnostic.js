// src/data/loginDiagnostic.js
export const LOGIN_DIAGNOSTIC = {
  q1: {
    question: 'What problem are you facing?',
    question_hi: 'आपको किस प्रकार की समस्या आ रही है?',
    options: [
      { id: 'no_otp', label: '📵 OTP not received / not coming', label_hi: '📵 OTP नहीं आ रहा है' },
      { id: 'invalid_cred', label: '🔒 "Invalid credentials" error', label_hi: '🔒 "Invalid Credentials" गलत पासवर्ड त्रुटि' },
      { id: 'kyc_pending', label: '⏳ "KYC pending" error', label_hi: '⏳ "KYC Pending" रुकावट' },
      { id: 'first_time', label: '🆕 Never activated my UAN before', label_hi: '🆕 पहली बार UAN सक्रिय करना है' },
      { id: 'portal_down', label: '💻 Portal not loading / server slow', label_hi: '💻 पोर्टल नहीं खुल रहा / सर्वर धीमा' }
    ]
  },

  answers: {
    no_otp: {
      title: 'OTP Not Received — Step-by-Step Fix',
      title_hi: 'OTP नहीं मिल रहा — चरणबद्ध समाधान',
      steps: [
        {
          step: 1,
          title: 'Check which mobile number is linked to your Aadhaar',
          title_hi: 'जांचें कि आपके आधार से कौन सा मोबाइल नंबर लिंक है',
          detail: 'Since January 2026, EPFO routes all 2-factor OTPs exclusively to your Aadhaar-registered mobile number — NOT the alternate contact you gave your HR. Go to myaadhaar.uidai.gov.in → "Verify Mobile" to confirm which number is registered.',
          detail_hi: 'EPFO सभी OTP सीधे आधार से जुड़े मोबाइल नंबर पर भेजता है। myaadhaar.uidai.gov.in पर जाकर "Verify Mobile" से पुष्टि करें।'
        },
        {
          step: 2,
          title: 'Check if DND (Do Not Disturb) is active on your SIM',
          title_hi: 'जांचें कि आपके नंबर पर DND सक्रिय तो नहीं है',
          detail: 'If strict DND is active on your mobile operator, transactional government OTPs may be filtered. Send an SMS "START" to 1909 from your phone, or open your carrier app (Airtel Thanks, Jio, Vi) and allow service notifications.',
          detail_hi: 'अपने फोन से 1909 पर "START" लिखकर SMS भेजें या टेलीकॉम ऐप में जाकर सरकारी संदेशों को अनुमति दें।'
        },
        {
          step: 3,
          title: 'Did you update your Aadhaar mobile number recently?',
          title_hi: 'क्या आपने हाल ही में आधार मोबाइल नंबर बदला है?',
          detail: 'If yes, UIDAI takes 48–72 hours to synchronize with EPFO servers. Wait 3 days after Aadhaar update before attempting login.',
          detail_hi: 'आधार मोबाइल नंबर बदलने के बाद EPFO डेटाबेस में सिंक होने में 48-72 घंटे लगते हैं। 3 दिन बाद प्रयास करें।'
        },
        {
          step: 4,
          title: 'Use the UMANG Government App as an alternative',
          title_hi: 'वैकल्पिक रूप से आधिकारिक UMANG ऐप का उपयोग करें',
          detail: 'Download the official UMANG app from Google Play Store or Apple App Store. Log in using your MPIN or Aadhaar OTP. UMANG connects through dedicated government gateway servers that often succeed even during website traffic spikes.',
          detail_hi: 'UMANG ऐप डाउनलोड करें। यह अलग सरकारी सर्वर से जुड़ा होता है और पोर्टल व्यस्त होने पर भी सुचारू रूप से कार्य करता है।'
        }
      ]
    },

    invalid_cred: {
      title: '"Invalid Credentials" — Step-by-Step Fix',
      title_hi: '"Invalid Credentials" — समाधान',
      steps: [
        {
          step: 1,
          title: 'Confirm your exact 12-digit UAN',
          title_hi: 'अपने 12-अंकीय UAN की पुष्टि करें',
          detail: 'Your UAN has exactly 12 digits. Verify it from your official salary slip, EPF passbook header, or request it from your HR department.',
          detail_hi: 'UAN 12 अंकों का होता है। अपनी वेतन पर्ची या पासबुक पर दिए नंबर की दोबारा जांच करें।'
        },
        {
          step: 2,
          title: 'Reset your password using OTP',
          title_hi: 'OTP के माध्यम से पासवर्ड रीसेट करें',
          detail: 'Go to unifiedportal-mem.epfindia.gov.in → Click "Forgot Password". Enter your UAN and captcha. An OTP will be dispatched to your Aadhaar-linked mobile to create a fresh password.',
          detail_hi: 'EPFO पोर्टल पर "Forgot Password" पर क्लिक करें। UAN और कैप्चा भरें। आधार मोबाइल पर प्राप्त OTP से नया पासवर्ड बनाएं।'
        },
        {
          step: 3,
          title: 'Check if UAN was ever activated',
          title_hi: 'जांचें कि क्या UAN कभी सक्रिय किया गया था',
          detail: 'If you have never logged in before, the portal does not have your password. Click "Activate UAN" on the portal home screen first.',
          detail_hi: 'यदि आपने कभी लॉगिन नहीं किया, तो पहले मुख्य पृष्ठ पर "Activate UAN" विकल्प पर क्लिक करें।'
        }
      ]
    },

    kyc_pending: {
      title: '"KYC Pending" / Mandatory Aadhaar Seeding — Fix',
      title_hi: '"KYC Pending" / आधार सीडिंग — समाधान',
      steps: [
        {
          step: 1,
          title: 'Link and seed Aadhaar to your UAN',
          title_hi: 'UAN से आधार लिंक करें',
          detail: 'Aadhaar seeding is mandatory for all EPFO claims. Log in → navigate to "Manage" → "KYC" → Select "Aadhaar" → enter 12-digit number and authenticate with OTP.',
          detail_hi: 'पोर्टल में लॉगिन कर "Manage" → "KYC" में जाएं और आधार नंबर दर्ज कर OTP द्वारा सत्यापित करें।'
        },
        {
          step: 2,
          title: 'Allow 2–5 working days for auto-approval',
          title_hi: '2 से 5 कार्यदिवस का समय दें',
          detail: 'Once OTP is validated, UIDAI auto-approves demographic details within 2–5 working days without needing employer signature for Aadhaar.',
          detail_hi: 'OTP सत्यापन के बाद UIDAI द्वारा 2-5 दिनों में डेटा स्वतः सत्यापित हो जाता है।'
        },
        {
          step: 3,
          title: 'Remind employer for bank KYC digital signature',
          title_hi: 'बैंक KYC हेतु नियोक्ता को डिजिटल हस्ताक्षर करने कहें',
          detail: 'While Aadhaar is auto-approved, Bank Account KYC still requires employer digital signature (DSC). Ask HR to approve it under their Employer Portal.',
          detail_hi: 'बैंक खाते के KYC हेतु नियोक्ता द्वारा DSC अनुमोदन आवश्यक होता है। अपने HR से संपर्क करें।'
        }
      ]
    },

    first_time: {
      title: 'First-Time UAN Activation — Complete Guide',
      title_hi: 'पहली बार UAN सक्रिय करना — संपूर्ण गाइड',
      steps: [
        {
          step: 1,
          title: 'Retrieve your UAN from employer / payslip',
          title_hi: 'वेतन पर्ची या HR से 12-अंकीय UAN प्राप्त करें',
          detail: 'Employers are required by law to generate a UAN for every PF-covered employee within 15 days of joining.',
          detail_hi: 'नियोक्ता को जॉइनिंग के 15 दिनों में UAN आवंटित करना अनिवार्य है।'
        },
        {
          step: 2,
          title: 'Open the official Member Portal',
          title_hi: 'आधिकारिक सदस्य पोर्टल खोलें',
          detail: 'Visit: unifiedportal-mem.epfindia.gov.in → Look under the right-hand login box and click "Activate UAN".',
          detail_hi: 'unifiedportal-mem.epfindia.gov.in पर जाएं और "Activate UAN" लिंक पर क्लिक करें।'
        },
        {
          step: 3,
          title: 'Enter matched personal details',
          title_hi: 'आधार के अनुसार सटीक विवरण भरें',
          detail: 'Input UAN, Aadhaar Number, Name (character-by-character as in Aadhaar), Date of Birth, and Aadhaar-linked Mobile Number.',
          detail_hi: 'UAN, आधार नंबर, नाम और जन्मतिथि बिल्कुल आधार कार्ड के अनुसार दर्ज करें।'
        },
        {
          step: 4,
          title: 'Authorize with OTP & Set secure password',
          title_hi: 'OTP सत्यापन व पासवर्ड निर्माण',
          detail: 'Enter the 6-digit OTP received from UIDAI. Set a password (min 8 chars, 1 uppercase, 1 lowercase, 1 special symbol, 1 digit). Your UAN is now permanently active!',
          detail_hi: 'आधार पर प्राप्त 6-अंकीय OTP भरें और सुरक्षित पासवर्ड बनाएं।'
        }
      ]
    },

    portal_down: {
      title: 'EPFO Portal Not Loading / Server Glitches',
      title_hi: 'पोर्टल डाउन या सर्वर समस्या',
      steps: [
        {
          step: 1,
          title: 'Try off-peak hours (Early morning 7–9 AM / Late night 10 PM+)',
          title_hi: 'कम ट्रैफिक वाले समय (सुबह 7-9 बजे या रात 10 बजे बाद) प्रयास करें',
          detail: 'EPFO servers experience peak load between 11 AM and 4 PM on weekdays. Accessing outside business hours dramatically reduces timeout errors.',
          detail_hi: 'कार्यदिवसों में दोपहर 11 से 4 बजे तक अत्यधिक लोड होता है। सुबह या देर रात प्रयास करने से सफलता दर बढ़ती है।'
        },
        {
          step: 2,
          title: 'Use UMANG Mobile App as dedicated pipe',
          title_hi: 'UMANG ऐप का इस्तेमाल करें',
          detail: 'UMANG handles PF passbook, claim filing, and tracking on high-availability dedicated CDN infrastructure.',
          detail_hi: 'UMANG ऐप पर लोड कम होता है और सेवाएं सुचारू रूप से चलती हैं।'
        },
        {
          step: 3,
          title: 'Call the National EPFO Toll-Free Helpline',
          title_hi: 'राष्ट्रीय टोल-फ्री हेल्पलाइन पर संपर्क करें',
          detail: 'Dial 1800-118-005 (toll-free, Monday to Friday 9:15 AM to 5:45 PM) for IVR and operator assistance on claim statuses.',
          detail_hi: 'हेल्पलाइन नंबर 1800-118-005 पर कॉल करके स्थिति की जानकारी प्राप्त करें।'
        }
      ]
    }
  }
};
