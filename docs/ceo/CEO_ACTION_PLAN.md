# CEO Master Action Plan — Bengal Bound Ltd
# Nexara Product Launch: Bangladesh → Global
**Owner:** CEO / Founder
**Starting Point:** Trade License obtained ✅
**Goal:** Go live with Nexara by October 2026

---

> **HOW TO USE THIS:** Work through each week's tasks in order.
> Tick each box when done. Share status in weekly team meeting.
> This document is your operating manual for the next 12 months.

---

## MONTH 1 — Legal Foundation (Weeks 1–4)

### Week 1: Company & Tax Setup
- [ ] **Collect Trade License** (if not yet in hand — call municipality)
- [ ] **Apply for TIN (Tax Identification Number)**
  - Where: National Board of Revenue (NBR) → [etaxnbr.gov.bd](https://etaxnbr.gov.bd)
  - Bring: Trade License + NID + Passport photo
  - Cost: Free
  - Time: 1–3 days
- [ ] **Apply for VAT Registration**
  - Where: Local VAT Circle Office or VAT online portal
  - Bring: TIN + Trade License + Bank statement
  - Cost: Free
  - Time: 7–14 days
- [ ] **Confirm company address** on all documents (must match trade license address)
  - If home/rented office — ensure lease agreement available
- [ ] **Open Bengal Bound company email**
  - Recommended: Google Workspace (info@bengalbound.com, ceo@bengalbound.com)
  - Cost: $6/user/month

### Week 2: Bank Account
- [ ] **Open Business Bank Account** (see Banking Guide below)
  - Recommended banks: Dutch-Bangla Bank / City Bank / BRAC Bank
  - Account type: Current Account (for business)
  - Required documents (see DOCUMENTS_CHECKLIST.md)
- [ ] **Apply for Foreign Currency (FC) Account**
  - Same bank, same visit — ask for USD account alongside BDT account
  - This is ESSENTIAL for receiving international client payments
- [ ] **Set up mobile banking** (bKash Business or Nagad Business for local payments)

### Week 3: Digital Presence
- [ ] **Register nexara.io domain** (if not done)
  - Registrar: Cloudflare, Namecheap, or GoDaddy (~$10–15/year)
- [ ] **Register bengalbound.com** (company website)
  - Or bengalbound.io / bengalbound.co
- [ ] **Set up Google Workspace** for company email
- [ ] **Create company social profiles:**
  - LinkedIn Company Page (Bengal Bound)
  - LinkedIn Page (Nexara)
  - Facebook Page (Nexara)
  - Twitter/X (@nexaraio)
  - Instagram (@nexara.io)
- [ ] **Set up Google Analytics + Search Console** on nexara.io

### Week 4: Industry Registration
- [ ] **Apply for BASIS Membership**
  - Where: [basis.org.bd](https://basis.org.bd)
  - Required: Trade License, TIN, incorporation docs
  - Cost: ৳5,000–15,000/year
  - Benefit: Industry credibility, export support, networking events
- [ ] **Apply for ICT Division Startup Registration**
  - Where: startup.gov.bd
  - Benefit: Possible grant/seed funding from government
- [ ] **Apply for Export Registration Certificate (ERC)**
  - Where: Office of Chief Controller of Imports & Exports (CCI&E)
  - Required: Trade License + TIN + Bank certificate
  - Cost: ৳500–2,000
  - ESSENTIAL for receiving foreign payments legally

---

## MONTH 2 — Technology & Team (Weeks 5–8)

### Week 5: Cloud & Development Infrastructure
- [ ] **Create Google Cloud account** → set up `nexara-prod` project
  - Enable billing (add company card or Bangladesh Debit card)
  - Services to enable: Cloud Run, Cloud SQL, Cloud Storage, Vision AI, Speech-to-Text
- [ ] **Create Firebase project** (nexara-prod)
  - Enable: Authentication, Firestore, Cloud Messaging
- [ ] **Set up GitHub organisation** → `bengalbound` or `nexara-platform`
- [ ] **Set up Netlify** (for marketing site deploy) → connect to GitHub
- [ ] **Set up Vercel** (for console deploy, Phase 1) → connect to GitHub
- [ ] **Set up Cloudflare** → add nexara.io, bengalbound.com → enable WAF

### Week 6: Host PC / Server Setup (Development)
- [ ] **Development server spec** (office host PC for local dev):
  - CPU: AMD Ryzen 9 or Intel i9 (for running Ollama locally)
  - RAM: 32GB minimum (64GB preferred)
  - Storage: 1TB NVMe SSD + 2TB HDD backup
  - GPU: RTX 3090 or 4090 (for local Ollama AI models — optional Phase 1)
  - OS: Ubuntu 22.04 LTS Server or Windows 11 Pro with WSL2
- [ ] **Set up local dev environment:**
  - Install: Git, Python 3.12, Node.js 20, Flutter 3, Docker Desktop
  - Clone Nexara repo
  - Run dev server locally (verify everything works)
- [ ] **Set up Tailscale** (VPN for team access to office server)
- [ ] **Set up UPS (Uninterruptible Power Supply)** for office server
- [ ] **Purchase .bd backup SIM** (Grameenphone/Robi) for backup internet

### Week 7: Team Hiring
- [ ] **Post job ads** on:
  - LinkedIn Jobs
  - Bdjobs.com
  - TechHub Bangladesh Facebook group
  - BASIS job portal
- [ ] **Required hires:**
  - Senior Full-Stack Developer (Django + React) — ৳80,000/mo
  - Senior Full-Stack Developer (Django + React) — ৳80,000/mo
  - Flutter Developer — ৳70,000/mo
  - QA Engineer — ৳50,000/mo
- [ ] **Prepare employment contracts** (include IP Assignment clause)
- [ ] **Register employees with Social Security (if applicable)**

### Week 8: Payment & Legal
- [ ] **Set up Stripe account** (requires Wyoming LLC — see LEGAL guide)
  - OR use NowPayments first (works without US entity)
- [ ] **Set up NowPayments** → crypto + bank transfer for international clients
- [ ] **Register bKash Business** → for Bangladesh client payments
- [ ] **Draft TOS + Privacy Policy + DPA** (hire local lawyer for review)
  - Budget: ৳20,000–50,000 for legal review
- [ ] **File trademark for "Nexara"** with BTRB Bangladesh
  - Cost: ~৳5,000–10,000
  - Timeline: 6–12 months
- [ ] **Form Wyoming LLC** (for Stripe, Apple Developer, US banking)
  - Service: Stripe Atlas ($500) or Doola ($297)
  - Then open Mercury Bank account (free, remote, 1 week)

---

## MONTH 3–4 — Product Development Begins (Weeks 9–16)

- [ ] Development team start on Phase 0 (Django API + Inspector + Veritas)
- [ ] **Weekly stand-ups** (Monday 10am)
- [ ] **Set up project management** → Linear.app or Jira (Linear recommended)
- [ ] **Set up internal communication** → Slack workspace (Bengal Bound)
- [ ] **Set up code review process** → GitHub Pull Request reviews (2 approvals needed)
- [ ] **Set up CI/CD** → GitHub Actions pipelines (all automated)
- [ ] **Apply for Google Play Developer account** ($25)
- [ ] **Apply for Apple Developer account** ($99) — needs US entity or DUNS
- [ ] **Get DUNS number** (for Apple) → apply at dnb.com (free, 30 days)

---

## MONTH 5–6 — Beta & First Clients (Weeks 17–24)

- [ ] Phase 1 complete → Console + Concierge + Serea ready
- [ ] **Recruit 5 beta clients** from personal/professional network
  - Offer: 3 months free in exchange for testimonial + feedback
- [ ] **Complete Veritas KYB** for each beta client
- [ ] **Run beta programme:** track issues, collect NPS scores weekly
- [ ] **Prepare launch materials:**
  - Demo video (3 minutes, showcasing 3 agents)
  - One-page investor deck summary
  - Full pitch deck (15 slides)
- [ ] **Schedule Product Hunt launch** for end of Month 6

---

## MONTH 7–12 — Growth & Fundraising

- [ ] Scale to 50 clients
- [ ] Submit Nexara to:
  - Product Hunt
  - Hacker News (Show HN)
  - BetaList
  - AlternativeTo
  - Trustpilot (start collecting reviews)
- [ ] **Begin fundraising:**
  - Approach BASIS Venture fund
  - Apply to BD Startup Bangladesh (government fund)
  - Reach out to international angel investors via AngelList
  - Prepare full investor data room (Docsend)
- [ ] **Launch Flutter app** on Google Play + App Store
- [ ] **File annual return** with RJSC (required every year)
- [ ] **File tax return** with NBR

---

## WEEKLY CEO ROUTINE

| Day | Task |
|---|---|
| Monday | Team stand-up · Review sprint progress · Unblock team |
| Tuesday | Client calls · Partnership outreach · LinkedIn content |
| Wednesday | Investor / legal meetings · Document reviews |
| Thursday | Product review · QA check · Marketing review |
| Friday | Weekly report · Plan next week · Financial review |
| Saturday | Strategic thinking · Read industry news · Team recognition |

---

## KEY CONTACTS TO BUILD (First 6 Months)

| Contact | Why | How to Reach |
|---|---|---|
| BASIS Executive Director | Industry support + introductions | basis.org.bd |
| ICT Division Programme Officer | Government grants + startup support | startup.gov.bd |
| BD Bank Relationship Manager | FC account + SWIFT advice | Your chosen bank branch |
| Stripe Atlas support | US entity + payment setup | atlas.stripe.com |
| Google Cloud for Startups | Up to $100K in cloud credits | cloud.google.com/startup |
| Firebase Startup Programme | Additional Firebase credits | Apply via Google Cloud |
| Meta Business Partner | WhatsApp API priority access | business.facebook.com |
| BASIS legal panel lawyer | TOS, trademark, IP | basis.org.bd member directory |

---

## MONTHLY FINANCIAL TRACKING

Track these every month 1st:

| Metric | Month 1 | Month 2 | Month 3 | Target Month 12 |
|---|---|---|---|---|
| Paying clients | 0 | 0 | 5 | 50 |
| Monthly Recurring Revenue (MRR) | $0 | $0 | $450 | $9,000 |
| Total agent subscriptions | 0 | 0 | 8 | 150 |
| Burn rate | — | — | $2,800 | $4,000 |
| Runway remaining | — | — | — | > 6 months |
| NPS score | — | — | — | > 40 |

---

*Bengal Bound Ltd — CEO Action Plan v1.0*
*Update this document weekly. Review monthly with the full team.*
