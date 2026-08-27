// src/data/mockUser.js
export const MOCK_USER = {
  name: 'Ravi Kumar',
  uan: '100987654321',
  aadhaarName: 'RAVI KUMAR',
  epfoName: 'RAVI KUMAR SHARMA', // intentional mismatch for demo
  bankName: 'RAVI KUMAR',
  bankAccount: '35782910034521',
  bankIFSC: 'SBIN0012345',
  accountType: 'individual', // 'individual' | 'joint_spouse' | 'joint_parent'
  dobAadhaar: '15/08/1993',
  dobEPFO: '15/08/1993',
  mobileAadhaar: '98XXXXXX21',
  employer: 'TechCorp India Pvt Ltd',
  establishmentId: 'MH/BAN/0012345/000',
  epfBalance: 436000,
  epsBalance: 84000,
  serviceYears: 5.1,
  dateOfJoining: '01/03/2019',
  dateOfExit: null, // intentionally null — to demo the exit date issue
  daysFiled: 23,
  currentStatus: 'VERIFICATION_PENDING',
  claimType: 'Form 19 & 10C',
  trackingId: 'MH1908264789'
};

// Alternative presets for quick interactive testing in demo
export const DEMO_PRESETS = [
  {
    id: 'ravi_mismatch',
    label: 'Ravi Kumar (Name Mismatch + Missing Exit Date)',
    data: { ...MOCK_USER }
  },
  {
    id: 'priya_all_clear',
    label: 'Priya Patel (100% Ready - Green Shield Pass)',
    data: {
      name: 'Priya Patel',
      uan: '101234567890',
      aadhaarName: 'PRIYA PATEL',
      epfoName: 'PRIYA PATEL',
      bankName: 'PRIYA PATEL',
      bankAccount: '91827364501234',
      bankIFSC: 'HDFC0001234',
      accountType: 'individual',
      dobAadhaar: '22/04/1996',
      dobEPFO: '22/04/1996',
      mobileAadhaar: '97XXXXXX88',
      employer: 'Infosystems Global Ltd',
      establishmentId: 'DL/CPM/0098765/000',
      epfBalance: 285000,
      epsBalance: 52000,
      serviceYears: 3.5,
      dateOfJoining: '15/06/2021',
      dateOfExit: '31/01/2026',
      daysFiled: 5,
      currentStatus: 'UNDER_EXAMINATION',
      claimType: 'Form 19 & 10C',
      trackingId: 'DL2601994512'
    }
  },
  {
    id: 'amit_joint_account',
    label: 'Amit Singh (Parent Joint A/c + Invalid IFSC)',
    data: {
      name: 'Amit Singh',
      uan: '100876543219',
      aadhaarName: 'AMIT SINGH',
      epfoName: 'AMIT SINGH',
      bankName: 'AMIT SINGH / RAM SINGH',
      bankAccount: '123456', // Too short
      bankIFSC: 'INVALID_IFSC',
      accountType: 'joint_parent',
      dobAadhaar: '10/11/1990',
      dobEPFO: '10/11/1991', // DOB mismatch
      mobileAadhaar: '99XXXXXX33',
      employer: 'Metro Logistics India',
      establishmentId: 'KA/BLR/0045678/000',
      epfBalance: 610000,
      epsBalance: 120000,
      serviceYears: 8.2,
      dateOfJoining: '01/01/2018',
      dateOfExit: null,
      daysFiled: 32,
      currentStatus: 'BANK_INACTIVE',
      claimType: 'Form 19',
      trackingId: 'KA1801223401'
    }
  }
];
