// src/data/mockMember.js

export const DEFAULT_MEMBER = {
  name: "Ravi Kumar",
  uan: "100987654321",
  memberId: "MHBAN0027180000012345",
  establishment: "TechCorp India Pvt Ltd",
  estCode: "MHBAN0027180",
  doj: "01/03/2019", // Date of Joining
  doe: null, // Date of Exit — intentionally null for demo
  dob: "15/08/1993",
  mobile: "98XXXXXX21",
  email: "r***@gmail.com",
  gender: "Male",
  fatherName: "SURESH KUMAR SHARMA",
  maritalStatus: "Married",
  address: "Flat 402, Green Meadows, Electronic City, Bangalore - 560100",

  // KYC STATUS
  kyc: {
    aadhaar: { 
      status: "APPROVED", 
      number: "XXXX-XXXX-4521", 
      linkedDate: "15 Jan 2025", 
      verifiedBy: "UIDAI" 
    },
    pan: { 
      status: "APPROVED", 
      number: "BXXPK7654H", 
      linkedDate: "10 Mar 2023", 
      verifiedBy: "Income Tax Dept" 
    },
    bank: { 
      status: "APPROVED", 
      bank: "State Bank of India", 
      account: "35782910034521", 
      ifsc: "SBIN0012345",
      type: "individual", // 'individual' | 'joint_spouse' | 'joint_parent'
      linkedDate: "22 Nov 2024",
      verifiedBy: "PFMS / Bank"
    },
    // Intentional mismatch for demo:
    nameOnAadhaar: "RAVI KUMAR",
    nameOnEPFO: "RAVI KUMAR SHARMA", // Mismatch
    nameOnBank: "RAVI KUMAR",
    dobOnAadhaar: "15/08/1993",
    dobOnEPFO: "15/08/1993",
    mobileOnAadhaar: "98XXXXXX21",
    mobileOnUAN: "98XXXXXX21"
  },

  // BALANCE
  balance: {
    employeeShare: 312400, // in rupees
    employerShare: 89200,
    pensionCorpus: 84000, // EPS — not withdrawable as cash if 10+ yrs
    interest: 34400,
    total: 436000, // EPF balance (employee + employer share + interest)
    lastUpdated: "31/03/2026"
  },

  // CONTRIBUTION HISTORY (last 6 months for passbook + yearly interest)
  contributions: [
    { month: "Mar 2026", employeeShare: 4800, employerShare: 1380, eps: 1250, interest: 0, balance: 436000 },
    { month: "Feb 2026", employeeShare: 4800, employerShare: 1380, eps: 1250, interest: 0, balance: 429820 },
    { month: "Jan 2026", employeeShare: 4800, employerShare: 1380, eps: 1250, interest: 0, balance: 423640 },
    { month: "Dec 2025", employeeShare: 4800, employerShare: 1380, eps: 1250, interest: 0, balance: 417460 },
    { month: "Nov 2025", employeeShare: 4800, employerShare: 1380, eps: 1250, interest: 0, balance: 411280 },
    { month: "Oct 2025", employeeShare: 4800, employerShare: 1380, eps: 1250, interest: 0, balance: 405100 },
    { month: "Mar 2025", employeeShare: 0, employerShare: 0, eps: 0, interest: 34400, balance: 398920 }
  ],

  // ACTIVE CLAIM
  activeClaim: {
    formType: "Form 19",
    referenceId: "MHBAN20260402000123",
    filedOn: "02/04/2026",
    daysAgo: 23,
    status: "VERIFICATION_PENDING",
    statusText: "Verification pending. Contact employer.",
    amount: 436000,
    history: [
      { step: "Submitted Online", date: "02 Apr 2026", done: true },
      { step: "Field Office Processing", date: "08 Apr 2026", done: false, current: true },
      { step: "DA Approval & Sanction", date: "Pending", done: false },
      { step: "NEFT Credit to Bank", date: "Pending", done: false }
    ]
  },

  // E-NOMINATION
  nomination: {
    status: "PENDING",
    nominees: [
      { name: "Pooja Sharma", relation: "Spouse", dob: "12/06/1995", share: 100, aadhaar: "XXXX-XXXX-8821" }
    ]
  }
};

export const MEMBER_PRESETS = [
  {
    id: "ravi_mismatch",
    label: "Ravi Kumar (Demo Default — Name Mismatch + Missing Exit Date)",
    description: "Claim stuck for 23 days due to 'RAVI KUMAR SHARMA' vs 'RAVI KUMAR' on Aadhaar and missing Date of Exit.",
    data: { ...DEFAULT_MEMBER }
  },
  {
    id: "priya_all_clear",
    label: "Priya Patel (100% Ready — All Checks Passed)",
    description: "KYC perfectly aligned, Exit date updated, 3.5 years service, ready for 1-click claim submission.",
    data: {
      ...DEFAULT_MEMBER,
      name: "Priya Patel",
      uan: "101234567890",
      memberId: "DLCPM00987650000054321",
      establishment: "Infosystems Global Ltd",
      estCode: "DLCPM0098765",
      doj: "15/06/2021",
      doe: "31/01/2026",
      dob: "22/04/1996",
      mobile: "97XXXXXX88",
      email: "p***@gmail.com",
      kyc: {
        aadhaar: { status: "APPROVED", number: "XXXX-XXXX-9912", linkedDate: "12 Feb 2024", verifiedBy: "UIDAI" },
        pan: { status: "APPROVED", number: "PXXPP1234K", linkedDate: "18 Aug 2023", verifiedBy: "Income Tax Dept" },
        bank: { 
          status: "APPROVED", 
          bank: "HDFC Bank", 
          account: "91827364501234", 
          ifsc: "HDFC0001234",
          type: "individual",
          linkedDate: "05 Jan 2025",
          verifiedBy: "PFMS / Bank"
        },
        nameOnAadhaar: "PRIYA PATEL",
        nameOnEPFO: "PRIYA PATEL",
        nameOnBank: "PRIYA PATEL",
        dobOnAadhaar: "22/04/1996",
        dobOnEPFO: "22/04/1996",
        mobileOnAadhaar: "97XXXXXX88",
        mobileOnUAN: "97XXXXXX88"
      },
      balance: {
        employeeShare: 215000,
        employerShare: 70000,
        pensionCorpus: 52000,
        interest: 21500,
        total: 285000,
        lastUpdated: "31/03/2026"
      },
      activeClaim: {
        formType: "Form 19",
        referenceId: "DL20260420004512",
        filedOn: "20/04/2026",
        daysAgo: 5,
        status: "UNDER_EXAMINATION",
        statusText: "Claim is under examination by dealing hand.",
        amount: 285000,
        history: [
          { step: "Submitted Online", date: "20 Apr 2026", done: true },
          { step: "Field Office Processing", date: "22 Apr 2026", done: false, current: true },
          { step: "DA Approval & Sanction", date: "Expected in 4 days", done: false },
          { step: "NEFT Credit to Bank", date: "Expected 30 Apr", done: false }
        ]
      }
    }
  },
  {
    id: "amit_joint_account",
    label: "Amit Singh (Critical Error — Joint Account with Parent)",
    description: "Claim rejected because bank account is joint with Father instead of Individual / Joint with Spouse.",
    data: {
      ...DEFAULT_MEMBER,
      name: "Amit Singh",
      uan: "100876543219",
      memberId: "KABLR0045678000009988",
      establishment: "Metro Logistics India Ltd",
      estCode: "KABLR0045678",
      doj: "01/01/2018",
      doe: null,
      dob: "10/11/1990",
      mobile: "99XXXXXX33",
      kyc: {
        aadhaar: { status: "APPROVED", number: "XXXX-XXXX-3344", linkedDate: "10 Jan 2022", verifiedBy: "UIDAI" },
        pan: { status: "APPROVED", number: "AXXPS9876M", linkedDate: "15 Feb 2022", verifiedBy: "Income Tax Dept" },
        bank: { 
          status: "APPROVED", 
          bank: "Punjab National Bank", 
          account: "12345678901234", 
          ifsc: "PUNB0012300",
          type: "joint_parent", // Critical rule violation
          linkedDate: "14 Jun 2023",
          verifiedBy: "PFMS"
        },
        nameOnAadhaar: "AMIT SINGH",
        nameOnEPFO: "AMIT SINGH",
        nameOnBank: "AMIT SINGH / RAM SINGH",
        dobOnAadhaar: "10/11/1990",
        dobOnEPFO: "10/11/1991", // DOB mismatch
        mobileOnAadhaar: "99XXXXXX33",
        mobileOnUAN: "99XXXXXX33"
      },
      balance: {
        employeeShare: 440000,
        employerShare: 170000,
        pensionCorpus: 120000,
        interest: 48000,
        total: 610000,
        lastUpdated: "31/03/2026"
      },
      activeClaim: {
        formType: "Form 19",
        referenceId: "KA20260315002234",
        filedOn: "15/03/2026",
        daysAgo: 42,
        status: "REJECTED_KYC",
        statusText: "Claim rejected due to invalid Bank KYC / Name mismatch with joint holder.",
        amount: 610000,
        history: [
          { step: "Submitted Online", date: "15 Mar 2026", done: true },
          { step: "Field Office Processing", date: "22 Mar 2026", done: true },
          { step: "Rejection Sanctioned", date: "28 Mar 2026", done: true, failed: true },
          { step: "NEFT Credit to Bank", date: "Rejected", done: false }
        ]
      }
    }
  }
];
