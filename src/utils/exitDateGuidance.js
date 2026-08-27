// src/utils/exitDateGuidance.js

export function getExitDateGuidance(timeLeft, aadhaarLinked, doeUpdated, hasLeftJob) {
  if (hasLeftJob === 'no') {
    return {
      status: 'NOT_APPLICABLE',
      message: 'Not applicable — since you are currently employed, you do not need a Date of Exit for advance/transfer requests.',
      message_hi: 'लागू नहीं — चूंकि आप वर्तमान में कार्यरत हैं, इसलिए अग्रिम निकासी हेतु एग्जिट डेट की आवश्यकता नहीं है।',
      action: null,
      showEmployerEmail: false
    };
  }

  if (doeUpdated === 'yes') {
    return {
      status: 'OK',
      message: 'Great — your Date of Exit is officially updated in EPFO records. This will not block your claim.',
      message_hi: 'उत्कृष्ट — आपकी नौकरी छोड़ने की तिथि EPFO में दर्ज है। इससे आपका दावा नहीं रुकेगा।',
      action: null,
      showEmployerEmail: false
    };
  }

  if (timeLeft === 'under2months') {
    return {
      status: 'WAIT',
      message: 'Statutory 2-Month Cooling Rule: You must wait until 60 full days have elapsed from your last salary date before the portal allows self-marking or full withdrawal.',
      message_hi: 'कानूनी 2-माह प्रतीक्षा नियम: अंतिम वेतन के बाद 60 दिन पूरे होने पर ही आप स्वयं एग्जिट डेट दर्ज कर सकते हैं।',
      action: 'Come back after 2 months. Use this waiting window to rectify any KYC mismatches in advance.',
      action_hi: '2 माह पूरे होने पर प्रयास करें। इस दौरान अपने KYC बेमेल को सुधार लें।',
      showEmployerEmail: true
    };
  }

  if (doeUpdated === 'no' || doeUpdated === 'dontknow') {
    if (aadhaarLinked === 'yes' && timeLeft !== 'under2months') {
      return {
        status: 'SELF_MARK',
        message: 'You can self-mark your Date of Exit directly on the EPFO portal since 2+ months have passed and your Aadhaar is OTP-linked!',
        message_hi: 'आप स्वयं EPFO पोर्टल पर अपनी एग्जिट डेट दर्ज कर सकते हैं, क्योंकि 2 महीने बीत चुके हैं और आधार लिंक है!',
        steps: [
          'Visit unifiedportal-mem.epfindia.gov.in and log in with your UAN & password',
          'Navigate to top menu: "Manage" → "Mark Exit"',
          'Select your previous establishment from the dropdown',
          'Enter your Date of Exit matching your relieving letter, select reason: "Ceasion (Short Service) / Resignation"',
          'Authenticate with Aadhaar OTP and click "Update"'
        ],
        steps_hi: [
          'unifiedportal-mem.epfindia.gov.in पर UAN से लॉगिन करें',
          'ऊपरी मेनू में जाएं: "Manage" → "Mark Exit"',
          'ड्रॉपडाउन से अपनी पिछली कंपनी चुनें',
          'रिलीविंग लेटर के अनुसार एग्जिट डेट भरें और कारण "Resignation" चुनें',
          'आधार OTP दर्ज कर "Update" पर क्लिक करें'
        ],
        showEmployerEmail: true,
        showGrievance: true
      };
    }

    if (aadhaarLinked === 'no' || aadhaarLinked === 'notsure') {
      return {
        status: 'LINK_FIRST',
        message: 'You must link your Aadhaar to your UAN first before the system permits self-marking of Date of Exit.',
        message_hi: 'स्वयं एग्जिट डेट दर्ज करने से पहले आपको अपने UAN से आधार लिंक करना होगा।',
        steps: [
          'Log in to Unified Member Portal with UAN',
          'Click "Manage" → "KYC" → Select "Aadhaar"',
          'Enter your 12-digit Aadhaar number and submit',
          'Authenticate the instant OTP sent to your Aadhaar-linked mobile',
          'Once seeded, return to "Manage" → "Mark Exit" to record exit date'
        ],
        steps_hi: [
          'UAN से सदस्य पोर्टल पर लॉगिन करें',
          '"Manage" → "KYC" → "Aadhaar" चुनें',
          '12-अंकीय आधार नंबर दर्ज करें',
          'आधार मोबाइल पर प्राप्त OTP द्वारा सत्यापित करें',
          'सीड होने के बाद "Manage" → "Mark Exit" में जाकर एग्जिट डेट दर्ज करें'
        ],
        showEmployerEmail: true,
        showGrievance: false
      };
    }
  }

  return null;
}
