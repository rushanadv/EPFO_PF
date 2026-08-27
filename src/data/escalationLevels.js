// src/data/escalationLevels.js

export const ESCALATION_LEVELS = [
  {
    level: 1,
    title: "Level 1: Self-Correction & Portal Pre-Checks",
    daysRange: "0–7 days",
    statusBadge: "COMPLETED",
    description: "Verify your KYC details, audit name discrepancies, self-mark your Date of Exit, and re-check bank IFSC validity.",
    timeframe: "0 to 7 days from filing",
    actions: [
      "Run the KYC Audit on this portal to detect letter-by-letter discrepancies.",
      "Self-mark your Date of Exit using Aadhaar OTP (if 2+ months since last contribution).",
      "Ensure bank account is either Individual or Joint with Spouse only."
    ],
    primaryRoute: "/manage/kyc"
  },
  {
    level: 2,
    title: "Level 2: EPFiGMS Official Grievance",
    daysRange: "7–30 days",
    statusBadge: "ACTIVE_LEVEL",
    description: "EPFO's dedicated grievance portal. By citizen charter rules, regional PFOs are legally mandated to address or resolve grievances within 30 days.",
    timeframe: "7 to 30 days if claim is stuck with no clear update",
    actions: [
      "File online grievance at epfigms.gov.in under 'PF Member' category.",
      "Select correct Regional Office matching establishment prefix (e.g., Bandra/MH or Delhi/DL).",
      "Attach a copy of your Form 19 submission receipt and Aadhaar card."
    ],
    portalUrl: "https://epfigms.gov.in",
    templateType: "epfigms"
  },
  {
    level: 3,
    title: "Level 3: CPGRAMS Central Government Escalation",
    daysRange: "30–60 days",
    statusBadge: "NEXT_STEP",
    description: "Centralized Public Grievance Redress and Monitoring System under Department of Administrative Reforms & Public Grievances (DARPG). Escalates above regional EPFO officers directly to Ministry of Labour.",
    timeframe: "30 to 60 days if EPFiGMS closed without actual resolution",
    actions: [
      "Register at pgportal.gov.in.",
      "Select Ministry: 'Ministry of Labour and Employment' → Department: 'EPFO'.",
      "Quote your previous EPFiGMS registration number and unfulfilled resolution date."
    ],
    portalUrl: "https://pgportal.gov.in",
    templateType: "cpgrams"
  },
  {
    level: 4,
    title: "Level 4: Right to Information (RTI) Application",
    daysRange: "60–90 days",
    statusBadge: "LEGAL_RIGHT",
    description: "Under the RTI Act 2005, public authorities must provide exact reasons, file notings, and responsible officer designations within 30 statutory days.",
    timeframe: "60 to 90 days of unexplained delays",
    actions: [
      "Submit online at rtionline.gov.in with ₹10 statutory fee.",
      "Demand inspection of files and names of Dealing Assistants who delayed the claim.",
      "Non-compliance incurs financial penalties on the Public Information Officer (PIO)."
    ],
    portalUrl: "https://rtionline.gov.in",
    templateType: "rti"
  },
  {
    level: 5,
    title: "Level 5: District Consumer Disputes Redressal Commission",
    daysRange: "90+ days",
    statusBadge: "COMPENSATION",
    description: "Under the Consumer Protection Act 2019, EPF members are legally recognized as 'Consumers'. Delays exceeding statutory limits constitute deficiency in service eligible for interest compensation and damages.",
    timeframe: "90+ days with demonstrable financial loss",
    actions: [
      "File e-daakhil complaint at edaakhil.nic.in.",
      "Claim PF principal + 8.25% interest compounded + compensation for mental harassment.",
      "Supreme Court precedent (Regional Provident Fund Commissioner vs Shiv Kumar Joshi) establishes EPFO liability."
    ],
    portalUrl: "https://edaakhil.nic.in",
    templateType: "consumer"
  }
];

export function generateTemplateText(type, member) {
  const name = member?.name || "Ravi Kumar";
  const uan = member?.uan || "100987654321";
  const memberId = member?.memberId || "MHBAN0027180000012345";
  const employer = member?.establishment || "TechCorp India Pvt Ltd";
  const trackingId = member?.activeClaim?.referenceId || "MHBAN20260402000123";
  const days = member?.activeClaim?.daysAgo || 23;
  const rawStatus = member?.activeClaim?.statusText || "Verification pending. Contact employer.";
  const epfName = member?.kyc?.nameOnEPFO || "RAVI KUMAR SHARMA";
  const aadhaarName = member?.kyc?.nameOnAadhaar || "RAVI KUMAR";

  switch (type) {
    case "epfigms":
      return `To,
The Regional Provident Fund Commissioner,
Regional Office: Bandra, Mumbai (MH)

Subject: Unreasonable delay in settlement of Final PF Claim (${trackingId}) for UAN: ${uan}

Respected Sir/Madam,

I, ${name} (UAN: ${uan}, Member ID: ${memberId}), submitted an online Form 19 withdrawal claim on ${member?.activeClaim?.filedOn || "02/04/2026"}.

It has been ${days} calendar days, and the claim status reflects "${rawStatus}". 
All my KYC documents (Aadhaar, PAN, and Bank Account IFSC) are successfully seeded and verified in the EPFO database. My service tenure with ${employer} is verified.

Under EPFO Citizen's Charter standards, final settlement claims are to be disposed of within 20 working days. The unexplained delay is causing extreme hardship.

I request your urgent intervention to:
1. Specify the exact technical or administrative bottleneck holding the claim.
2. Sanction the claim amount of ₹${member?.balance?.total?.toLocaleString('en-IN') || "4,36,000"} directly to my verified bank account.

Thanking you,
Yours sincerely,
${name}
Mobile: ${member?.mobile || "98XXXXXXXX"}
Email: ${member?.email || "r***@gmail.com"}`;

    case "employer_email":
      return `Subject: URGENT: Correction of Name Record in EPFO Database & Date of Exit for UAN ${uan}

Dear HR / Payroll Team (${employer}),

I hope this email finds you well.

I am writing regarding my Provident Fund records for Member ID: ${memberId} under UAN: ${uan}.

My online PF claim (${trackingId}) has been delayed for ${days} days with status: "${rawStatus}".
Upon auditing my profile records:
- Name in EPFO Database: "${epfName}"
- Name in Aadhaar Database: "${aadhaarName}"

Request to HR:
1. Please confirm if a Joint Declaration Form is required from my end to align my EPFO records with Aadhaar ("${aadhaarName}").
2. Please verify that my Date of Exit (DOE) has been marked in your Employer EPFO Employer Portal.

Kindly advise on the next steps at your earliest convenience so the claim can be processed without rejection.

Regards,
${name}
Former Employee | TechCorp India Pvt Ltd
UAN: ${uan}
Phone: ${member?.mobile || "98XXXXXXXX"}`;

    case "rti":
      return `APPLICATION UNDER SECTION 6(1) OF THE RIGHT TO INFORMATION ACT, 2005

To,
The Central Public Information Officer (CPIO),
Employees' Provident Fund Organisation (EPFO),
Regional Office: Bandra (MH)

Applicant Details:
Name: ${name}
UAN: ${uan}
Member ID: ${memberId}
Claim Reference ID: ${trackingId}

Information Sought under RTI Act, 2005:
1. Daily progress report and file movement history of Claim Reference ID: ${trackingId} from ${member?.activeClaim?.filedOn || "02/04/2026"} to date.
2. Name, designation, and employee code of the Dealing Assistant (DA) / Section Supervisor currently handling the file.
3. Certified copies of all internal notings, audit remarks, and rejection/query sheets raised against this claim.
4. As per EPFO citizen charter, standard turnaround time for Form 19 is 20 days. Kindly state reasons recorded in writing for exceeding this mandate by ${days} days.

Statutory Fee: ₹10 paid via online RTI portal.

Place: Bangalore
Date: ${new Date().toLocaleDateString('en-IN')}`;

    case "cpgrams":
      return `CPGRAMS ESCALATION REGISTRATION

Grievance Description:
EPFO Regional Office has failed to settle Form 19 claim (${trackingId}) for UAN ${uan} despite ${days} days passing.
Previous EPFiGMS complaint filed without resolution.
Citizen Charter limit of 20 days violated.
All KYC records (Aadhaar ${member?.kyc?.aadhaar?.number}, PAN ${member?.kyc?.pan?.number}) verified.
Immediate disbursement of retirement corpus ₹${member?.balance?.total?.toLocaleString('en-IN')} requested.`;

    default:
      return "";
  }
}
