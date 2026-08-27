# PF Saathi — The EPFO Member Portal That Actually Works

> **"Build What Moves India" Hackathon Project** by Varun Mayya | 28 August 2026

---

## 🎯 The Problem
In 2024–25, **174 lakh (17.4 million)** EPFO PF withdrawal claims were rejected. Most members received a single opaque sentence:
> *"Verification pending. Contact employer."*

No reason. No pinpointed mismatch. No action plan. No Dealing Assistant contact.

---

## 🚀 The Solution: PF Saathi v2.0
A complete, high-fidelity **simulated EPFO Member Portal (`unifiedportal-mem.epfindia.gov.in`)** that retains the authentic government interface but embeds forensic validation intelligence into every screen:

- 🛡️ **Forensic KYC Audit & Character Diff**: Visual letter-by-letter comparator between EPFO Master records and UIDAI Aadhaar to catch typos, maiden/married name discrepancies, and prohibited joint bank accounts.
- ⚡ **Pre-Flight Claim Diagnostic**: 5-layer automated inspection that stops members from filing claims guaranteed to be rejected.
- 🔍 **Intelligent Status Translator**: Decodes raw bureaucratic codes (`VERIFICATION_PENDING`, `BANK_INACTIVE`, etc.) into plain English and Hindi with expected resolution times.
- 🏢 **Aadhaar OTP Exit Date Self-Marking**: Guided flow allowing departed employees to mark Date of Exit without employer dependency.
- ⚖️ **5-Level Statutory Escalation Ladder**: Complete legal pathway from Level 1 (Self-Correction) to Level 2 (EPFiGMS), Level 3 (CPGRAMS), Level 4 (RTI Act 2005), and Level 5 (Consumer Court compensation).
- 🚀 **EPFO 3.0 Ready (2026 Guidelines)**: Embedded **Form 121** (replacing 15G/15H for Nil TDS), national helpline **14470**, and auto-settlement readiness diagnostics.

---

## 🖥️ Full 12-Route Simulated Experience

| Route | Page | Purpose |
|---|---|---|
| `/` | **Pre-Login Landing Page** | Authentic EPFO login page with demo mode shortcut and offline balance check guide |
| `/dashboard` | **Member Dashboard** | Member details, dynamic alert engine, PF balance breakdown, and active claim summary |
| `/manage/kyc` | **KYC Management** | Aadhaar, PAN, Bank tabs + **KYC Audit ⭐** with forensic character diff |
| `/manage/profile` | **Member Profile** | Complete official personal, contact, and service history records |
| `/manage/mark-exit` | **Mark Date of Exit** | 4-step guided self-marking wizard with simulated Aadhaar OTP verification |
| `/services/claim` | **File a Claim** | 3-stage flow: Pre-Flight Check → Form Selector → Form 19 with inline bilingual tooltips |
| `/services/transfer` | **PF Transfer** | Form 13 One Member — One EPF Account online transfer request |
| `/services/track` | **Track Claim Status** | 4-stage claim journey stepper, plain language translations, and 8-code status dictionary |
| `/enomination` | **e-Nomination** | Digital nominee percentage allocation with Aadhaar e-Sign |
| `/passbook` | **Member Passbook** | 6-month ledger, annual interest credit, column anatomy guide & 5-year projection calculator |
| `/help/login-issues` | **Login Diagnostic** | Interactive troubleshooter for OTP sync, locked accounts, and peak hour gateways |
| `/help/escalation` | **Escalation Ladder** | 5 legal escalation levels with pre-filled copyable EPFiGMS, Employer Email & RTI drafts |

---

## 🛠️ Tech Stack
- **React 18 + Vite**
- **React Router v6**
- **Tailwind CSS** (EPFO official government theme system)
- **Lucide React** (Government UI icons)
- **Bilingual Engine** (`English` / `हिंदी` with instant toggle)
- **100% Mocked Data & Zero Backend Dependencies**

---

## 🏃 Run Locally
```bash
# Clone the repository
git clone https://github.com/rushanadvani/EPFO_PF.git
cd EPFO_PF

# Install dependencies
npm install

# Start Vite dev server
npm run dev
```

Visit `http://localhost:5173` to explore PF Saathi.
