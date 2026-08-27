// src/context/alertsGenerator.js

export function getDashboardAlerts(member) {
  if (!member) return [];
  const alerts = [];

  const norm = (s) => (s || '').trim().toUpperCase().replace(/\s+/g, ' ');

  // Alert 1: Name mismatch
  if (norm(member.kyc?.nameOnAadhaar) !== norm(member.kyc?.nameOnEPFO)) {
    alerts.push({
      id: 'name_mismatch',
      severity: 'CRITICAL',
      icon: '🔴',
      title: 'Critical Name Mismatch Detected',
      detail: `EPFO record has "${member.kyc?.nameOnEPFO}" but Aadhaar has "${member.kyc?.nameOnAadhaar}". This will trigger an immediate claim rejection.`,
      action: 'Fix in KYC Audit',
      route: '/manage/kyc'
    });
  }

  // Alert 2: Bank Account Type Issue (e.g. Joint with Parent)
  if (member.kyc?.bank?.type === 'joint_parent') {
    alerts.push({
      id: 'bank_type_invalid',
      severity: 'CRITICAL',
      icon: '🔴',
      title: 'Ineligible Bank Account Type',
      detail: 'Joint account with Parents/Others is strictly prohibited under EPFO rules. Only Individual or Joint with Spouse is accepted.',
      action: 'Update Bank Account',
      route: '/manage/kyc'
    });
  }

  // Alert 3: Date of Exit missing while having active claim or trying to withdraw
  if (!member.doe && member.activeClaim) {
    alerts.push({
      id: 'missing_exit_date',
      severity: 'HIGH',
      icon: '🟠',
      title: 'Date of Exit Not Marked',
      detail: 'Your employer has not updated your exit date in the portal. Withdrawal claims cannot be settled without an exit date.',
      action: 'Self-Mark Exit Date',
      route: '/manage/mark-exit'
    });
  }

  // Alert 4: Active Claim Stuck Overdue
  if (member.activeClaim && member.activeClaim.daysAgo > 20 && member.activeClaim.status === 'VERIFICATION_PENDING') {
    alerts.push({
      id: 'claim_stuck_overdue',
      severity: 'HIGH',
      icon: '⏰',
      title: `Claim Pending for ${member.activeClaim.daysAgo} Days (Overdue)`,
      detail: `Your ${member.activeClaim.formType} claim exceeds the 20-day EPFO Citizen Charter limit with zero actionable feedback.`,
      action: 'Escalate to EPFiGMS',
      route: '/services/track'
    });
  }

  // Alert 5: EPFO 3.0 Readiness Check
  const epfo3Ready = member.kyc?.aadhaar?.status === 'APPROVED' &&
                     member.kyc?.pan?.status === 'APPROVED' &&
                     member.kyc?.bank?.status === 'APPROVED';
  if (!epfo3Ready) {
    alerts.push({
      id: 'epfo3_not_ready',
      severity: 'MEDIUM',
      icon: '🔵',
      title: 'Action Needed for EPFO 3.0 Instant Withdrawal',
      detail: 'Complete all 3 KYC seedings (Aadhaar, PAN, Bank) to qualify for upcoming UPI and ATM-based PF settlements.',
      action: 'Complete KYC',
      route: '/manage/kyc'
    });
  }

  return alerts;
}
