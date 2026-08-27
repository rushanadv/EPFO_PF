// src/data/loginDiagnostic.js

export const LOGIN_DIAGNOSTIC_DATA = [
  {
    id: "otp_issues",
    title: "OTP not received or coming to old/wrong mobile number",
    titleHi: "OTP नहीं आ रहा है या पुराने/गलत मोबाइल नंबर पर जा रहा है",
    icon: "📱",
    severity: "CRITICAL",
    summary: "Since Jan 2026, EPFO requires dual OTP: Member login OTP goes to Aadhaar-linked mobile, not the old UAN mobile.",
    steps: [
      {
        step: 1,
        title: "Verify Aadhaar-Linked Mobile",
        desc: "Go to UIDAI portal (myaadhaar.uidai.gov.in) → Click 'Verify Mobile Number' to confirm which SIM is currently linked to your Aadhaar."
      },
      {
        step: 2,
        title: "Check DND / SMS Blocking",
        desc: "Send SMS 'START' to 1909 to remove carrier promo blocking. EPFO sender header is typically 'VK-EPFOHO' or 'VM-EPFOHO'."
      },
      {
        step: 3,
        title: "Recent Aadhaar Mobile Update Delay",
        desc: "If you updated your mobile number at an Aadhaar Seva Kendra within the last 48 hours, wait 3 business days for UIDAI-EPFO API synchronization."
      },
      {
        step: 4,
        title: "Peak Hour Fallback: Use UMANG App",
        desc: "During server congestion (10 AM - 4 PM), UMANG app uses an alternate government gateway with 40% higher OTP success rate."
      }
    ]
  },
  {
    id: "invalid_credentials",
    title: "Error: 'Invalid UAN / Password' or Account Locked",
    titleHi: "त्रुटि: 'Invalid UAN / Password' या खाता लॉक हो गया है",
    icon: "🔑",
    severity: "HIGH",
    summary: "After 3 incorrect attempts, the account is temporarily locked for 24 hours unless reset via Forgot Password.",
    steps: [
      {
        step: 1,
        title: "Use Forgot Password on Pre-Login",
        desc: "Click 'Forgot Password' on the main landing page. Enter your UAN and Captcha."
      },
      {
        step: 2,
        title: "OTP Verification",
        desc: "Password reset OTP will be sent to the mobile registered in UAN records. Complete identity verification."
      },
      {
        step: 3,
        title: "New Password Rules",
        desc: "Password must be 8-25 characters, contain at least 1 uppercase, 1 lowercase, 1 number, and 1 special character (e.g. #, @, $)."
      }
    ]
  },
  {
    id: "kyc_pending",
    title: "Error: 'KYC not verified / Aadhaar not seeded' error on login",
    titleHi: "त्रुटि: 'KYC not verified' या 'आधार लिंक नहीं है'",
    icon: "🛡️",
    severity: "HIGH",
    summary: "EPFO 3.0 regulations enforce mandatory Aadhaar seeding before member portal access is granted.",
    steps: [
      {
        step: 1,
        title: "Direct Seeding via UMANG",
        desc: "If you cannot login to the web portal, open UMANG App → EPFO → 'e-KYC Services' → 'Aadhaar Seeding' using your UAN."
      },
      {
        step: 2,
        title: "Employer Digital Signature Approval",
        desc: "Once seeded, inform your employer's HR payroll admin to approve the digital signature request in their employer portal."
      }
    ]
  },
  {
    id: "first_time_user",
    title: "First time user — Never activated UAN",
    titleHi: "पहली बार उपयोगकर्ता — UAN सक्रिय नहीं किया है",
    icon: "👤",
    severity: "MEDIUM",
    summary: "New joining members must activate their 12-digit UAN before first login.",
    steps: [
      {
        step: 1,
        title: "Locate UAN on Salary Slip",
        desc: "Find your 12-digit Universal Account Number printed on your monthly payslip or ask HR."
      },
      {
        step: 2,
        title: "Click 'Activate UAN'",
        desc: "On landing page, click 'Activate UAN'. Provide UAN, Aadhaar, Name (exact match as per Aadhaar), Date of Birth, and Mobile."
      },
      {
        step: 3,
        title: "2026 Face Auth / OTP Verification",
        desc: "Authorize using Aadhaar OTP or UMANG Face Authentication to receive your default login password via SMS."
      }
    ]
  },
  {
    id: "portal_down",
    title: "EPFO Portal not loading / Gateway Timeout 504",
    titleHi: "EPFO पोर्टल लोड नहीं हो रहा / Gateway Timeout 504",
    icon: "🌐",
    severity: "MEDIUM",
    summary: "EPFO servers experience peak load between 10th-20th of every month during employer ECR return filing.",
    steps: [
      {
        step: 1,
        title: "Optimal Access Window",
        desc: "Access the portal between 7:00 AM – 9:30 AM or 8:30 PM – 11:00 PM when server traffic drops by 65%."
      },
      {
        step: 2,
        title: "Offline Balance Check (No Portal Needed)",
        desc: "Give a missed call to 9966044425 from your registered mobile or SMS 'EPFOHO UAN ENG' to 7738299899."
      },
      {
        step: 3,
        title: "EPFO National Helpline",
        desc: "Dial 14470 (Toll-Free, 7:00 AM – 9:00 PM, available in 10 Indian languages)."
      }
    ]
  }
];
