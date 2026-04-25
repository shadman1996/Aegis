# Legal, Licensing & Global Registration Guide
# Bengal Bound Ltd → Nexara Product
**Version:** 1.0 | **Date:** April 2026
**Classification:** Confidential — Legal & Management Reference

---

## 1. Company Structure

```
Bengal Bound Ltd (Bangladesh — Operating Entity)
    │
    ├── Nexara (Product)
    │       └── AI-as-Employee SaaS Platform
    │
    └── Bengal Bound Inc / Pte Ltd (US/Singapore — International Entity)
            └── Used for: Stripe, US clients, App Store, investor relations
```

**Why two entities?**
- Bangladesh entity = operations, development team, local revenue
- US/Singapore entity = international payments, enterprise contracts, fundraising
- This is the standard structure for BD tech companies going global (e.g., ShopUp, Shajgoj)

---

## 2. Bangladesh Legal Requirements

### 2.1 Company Registration (RJSC)
- **Entity Type:** Private Limited Company (already: Bengal Bound Ltd)
- **Regulator:** Registrar of Joint Stock Companies & Firms (RJSC)
- **Required Documents:**
  - Memorandum of Association (MoA)
  - Articles of Association (AoA)
  - Certificate of Incorporation
  - Trade License (City Corporation/Municipality)
  - TIN Certificate
  - VAT Registration

### 2.2 ICT/Software Export Registration
| Registration | Authority | Purpose |
|---|---|---|
| **BASIS Membership** | Bangladesh Association of Software & IT Services | Industry recognition, export benefits |
| **BOESL Registration** | Bangladesh Overseas Employment & Services Ltd | Tech export compliance |
| **ICT Division Registration** | Ministry of Posts, Telecom & IT | Startup recognition, tax benefits |
| **Software Export Certificate** | Export Promotion Bureau (EPB) | Revenue repatriation proof |
| **Export Registration Certificate (ERC)** | Office of Chief Controller of Imports & Exports | Required for receiving foreign currency |

### 2.3 Bangladesh Bank Approvals
| Requirement | Details |
|---|---|
| **Foreign Currency Account** | Open FC account at a scheduled bank to receive USD/EUR payments |
| **Export Retention Quota** | Retain up to 70% of export earnings in FC account |
| **Remittance Approval** | PayPal/Stripe/Wise remittances covered under Software Export category |
| **NBR Tax Exemption** | IT/ITES sector enjoys 0% tax until 2031 under Finance Act |

---

## 3. US Entity (Recommended: Wyoming LLC)

### Why Wyoming LLC?
- No state income tax
- No requirement to disclose members publicly
- Cheapest to form and maintain ($100/year)
- Stripe, PayPal, US bank account, Apple Developer all accept Wyoming LLC

### Formation Steps
| Step | Service | Cost | Timeline |
|---|---|---|---|
| Form Wyoming LLC | Stripe Atlas / Doola / Northwest Registered Agent | $100–$500 | 1–3 days |
| EIN (Tax ID) | IRS SS-4 form (free) | Free | 1–4 weeks |
| US Business Bank Account | Mercury Bank (remote, no visit needed) | Free | 3–7 days |
| Stripe Account | stripe.com (requires US entity + EIN) | Free | 1 day |
| Virtual US Address | Northwest Registered Agent | $125/year | Immediate |

**Total cost:** ~$500–700 one-time + ~$225/year maintenance

### Alternative: Singapore Pte Ltd
- Better for SE Asia clients, easier banking, strong IP laws
- Cost: ~SGD 1,000–1,500 to form
- Recommended if targeting Singapore/Malaysia/Indonesia heavily

---

## 4. Platform-Specific Accounts & Licenses Needed

### 4.1 App Stores (Mobile)
| Platform | Account | Cost | Requirements |
|---|---|---|---|
| **Google Play Store** | Google Play Developer | $25 one-time | Google account + credit card |
| **Apple App Store** | Apple Developer Program | $99/year | Apple ID + DUNS number (free) |
| **Microsoft Store** | Microsoft Partner Center | Free | Microsoft account |
| **Mac App Store** | Same as Apple Developer | Included in $99 | Same as above |

### 4.2 Payment Processing
| Service | Requirements | Notes |
|---|---|---|
| **Stripe** | US/UK/EU/SG entity + bank account | Best for global card payments |
| **NowPayments** | Email + website | Crypto + 150+ payment methods, BD-friendly |
| **bKash Business** | NID + trade license + bKash agreement | Bangladesh mobile payments |
| **Nagad Business** | NID + trade license | Bangladesh mobile payments |
| **PayPal Business** | Business email + US/EU entity | Widely used globally |
| **Wise Business** | Company documents | Best for receiving international bank transfers |

### 4.3 Google Platform Agreements
| Service | Requirements | Needed For |
|---|---|---|
| **Google Cloud** | Billing account + credit card | Cloud Run, PostgreSQL, Storage, APIs |
| **Google Workspace Marketplace** | Google Cloud project + OAuth verification | List Nexara as Google Workspace add-on |
| **Firebase** | Google account | Auth, FCM push, Analytics |
| **Google Ads API** | Google Ads account + developer token | Ad Optimizer agent |
| **Google Search Console API** | Site verification | Oracle SEO agent |
| **Gmail API (OAuth)** | Google Cloud OAuth consent screen | Iris email agent |
| **Google Calendar API** | Same OAuth | Concierge booking |

### 4.4 Microsoft / Azure Agreements
| Service | Requirements | Needed For |
|---|---|---|
| **Microsoft Azure** | Microsoft account + billing | Azure AD (SSO), Outlook API |
| **Microsoft Partner Network (MPN)** | Business registration | List on Microsoft AppSource |
| **Microsoft 365 API (Graph API)** | Azure App Registration | Iris (Outlook), Teams integration |
| **Microsoft Sign-In** | Azure AD B2C | "Sign in with Microsoft" button |

### 4.5 Meta (Facebook/Instagram) Platform
| Service | Requirements | Needed For |
|---|---|---|
| **Meta for Developers** | Facebook account + app review | Serea, Ad Optimizer, Concierge |
| **WhatsApp Business API** | Verified Meta Business account + phone number | Concierge WhatsApp |
| **Meta Marketing API** | Ad account + app review | Ad Optimizer |
| **Instagram Graph API** | Business account + app review | Serea, Luma |

### 4.6 Other Key Platform Accounts
| Platform | Purpose | Cost |
|---|---|---|
| **Twilio** | Voice (Aria), SMS alerts | Pay-as-you-go |
| **HubSpot Developer** | CRM integration (Crux, Lead Hunter) | Free developer account |
| **LinkedIn API** | Lead Hunter, Scout, Luma | Apply via LinkedIn Developer |
| **Twitter/X API** | Pulse, Scout, Serea | Basic: $100/month |
| **Slack API** | Admin + dev notifications | Free |
| **OpenCorporates API** | Veritas KYB | $29+/month |
| **OpenSanctions** | Veritas sanctions screening | Free (open data) |
| **AbuseIPDB** | Security: IP reputation | Free 1,000/day |
| **Sentry** | Error monitoring | Free tier |
| **PagerDuty** | Dev incident alerting | Free tier |

---

## 5. Data Protection Registrations

| Jurisdiction | Requirement | Action |
|---|---|---|
| **EU (GDPR)** | DPA (Data Processing Agreement) with all EU clients | Include in TOS — done via Veritas |
| **EU (GDPR)** | EU Representative (if serving EU clients without EU entity) | Appoint via services like DataRep (~€399/year) |
| **UK (UK GDPR)** | Register with ICO (Information Commissioner's Office) | £40/year |
| **Bangladesh (PDPA/DSA)** | Digital Security Act 2018 + upcoming PDPA compliance | Documented in Inspector |
| **USA (CCPA)** | Privacy Policy must include CCPA rights | Done in Privacy Policy doc |
| **India (DPDPA)** | Data Fiduciary registration (when Indian clients onboarded) | Pending regulation |

---

## 6. Licenses Needed to SELL the Product Globally

### 6.1 Software & IP Licenses
| License | Purpose | Action |
|---|---|---|
| **Proprietary Software License** | Your TOS grants clients a license to USE Nexara (not own it) | Written in TOS |
| **Trademark Registration** | "Nexara" brand protection | Apply to BTRB (Bangladesh) + USPTO (US) + EUIPO (EU) |
| **Patent** | AI agent architecture (optional, expensive) | Consult IP lawyer if warranted |
| **Copyright** | Source code + documentation | Automatic upon creation |

### 6.2 Financial Services Caution
- ❌ **Nexara is NOT a financial advisor** — Finn/Cash/Nova agents generate information, NOT regulated financial advice
- ❌ **Nexara is NOT a legal services provider** — Sage generates information, NOT legal advice
- ❌ **Nexara is NOT a healthcare provider** — MediBook schedules, NOT medical advice
- ✅ All agents must include **disclaimer text** in their outputs (Inspector enforces this)
- ✅ TOS must clearly state: "AI outputs are informational only and not professional advice"

### 6.3 AI-Specific Regulatory Licenses
| Regulation | Requirement | Timeline |
|---|---|---|
| **EU AI Act** | High-risk AI system registration (if applicable) | 2025–2027 (phased) |
| **UK AI Regulations** | Self-attestation of safety practices | 2025 |
| **US Executive Order on AI** | Safety practices documentation | Now |
| **Bangladesh ICT Policy** | AI ethics compliance | Register with ICT Division |

---

## 7. Required Legal Documents (to create before launch)

| Document | Purpose | Status |
|---|---|---|
| **Terms of Service (TOS)** | Client agreement for using Nexara | 📝 Draft needed |
| **Privacy Policy** | GDPR/CCPA/PDPA compliant data practices | 📝 Draft needed |
| **Data Processing Agreement (DPA)** | GDPR requirement for EU clients | 📝 Draft needed |
| **Acceptable Use Policy (AUP)** | What clients cannot use agents for | 📝 Draft needed |
| **AI Ethics Agreement** | Clients agree to ethical AI use | 📝 Draft needed |
| **Refund Policy** | Subscription refund terms | 📝 Draft needed |
| **Cookie Policy** | GDPR cookie consent | 📝 Draft needed |
| **NDA Template** | For enterprise clients and partners | 📝 Draft needed |
| **Partnership Agreement** | For white-label resellers | 📝 Draft needed |
| **Employment Contracts** | For Bengal Bound dev team | 📝 Draft needed |
| **IP Assignment Agreement** | Devs assign IP to Bengal Bound | 📝 Draft needed |

---

## 8. Go-Live Checklist (Bangladesh → Global, 2026)

### Pre-Launch (by September 2026)
- [ ] Bengal Bound Ltd — confirm all RJSC documents current
- [ ] ERC (Export Registration Certificate) obtained
- [ ] FC (Foreign Currency) bank account open at Dutch Bangla/Brac/City Bank
- [ ] BASIS membership active
- [ ] TIN + VAT registered
- [ ] Wyoming LLC formed (for Stripe + Apple Developer)
- [ ] Stripe account live (via Wyoming LLC)
- [ ] NowPayments account live
- [ ] bKash Business account active
- [ ] Google Play Developer account ($25)
- [ ] Apple Developer account ($99)
- [ ] Nexara trademark filed (BTRB Bangladesh)
- [ ] TOS + Privacy Policy + DPA published on nexara.io
- [ ] Cookie consent banner live
- [ ] Meta Business account verified
- [ ] WhatsApp Business API approved
- [ ] Google Cloud OAuth consent screen verified
- [ ] Penetration test completed
- [ ] Inspector running (24/7)
- [ ] Sentry + PagerDuty monitoring active

### At Launch
- [ ] First 5–10 BD clients onboarded via Veritas KYB
- [ ] Press release to Daily Star Tech, Prothom Alo, Tech Shohor
- [ ] Product Hunt launch scheduled
- [ ] LinkedIn announcement from Bengal Bound page

---

*Bengal Bound Ltd — Nexara Legal & Licensing Guide v1.0*
*Prepared for management, legal counsel, and investors.*
*This is not legal advice — consult a qualified attorney for jurisdiction-specific requirements.*
