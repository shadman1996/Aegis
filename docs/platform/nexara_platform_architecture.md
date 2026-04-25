# Nexara Platform — Full Architecture Overview
# Code Stack · Design Layers · Security Policy
> **Prepared by:** NeurolinkIT Engineering
> **Date:** April 2026 | **Version:** 1.0
> **Classification:** Internal — Engineering & Investor Reference

---

## Part 1: Platform Identity

| Property | Value |
|---|---|
| **Platform Name** | Nexara |
| **Tagline** | *The Next Era of Work — Powered by AI Employees* |
| **Parent Company** | NeurolinkIT |
| **Model** | AI-as-Employee (AIaaE) — Monthly subscription per agent |
| **Target Market** | SMEs, Digital Agencies, Service Businesses — Global |
| **Primary Jurisdictions** | Bangladesh, USA, UK, EU, Singapore, Australia |

---

## Part 2: Full Technology Stack

### 2.1 Frontend

| Layer | Technology | Purpose |
|---|---|---|
| **Framework** | Next.js 16 (App Router) | SSR/SSG marketing site + client console |
| **Language** | TypeScript | Type-safe frontend development |
| **Styling** | Tailwind CSS | Utility-first responsive design |
| **Animations** | Framer Motion | Micro-animations, page transitions |
| **Icons** | Lucide React | Consistent icon system |
| **State Management** | React Context + Zustand (console) | Global state without Redux overhead |
| **Charts** | Recharts / Chart.js | Analytics dashboards |
| **UI Components** | Radix UI (headless) + custom | Accessible, composable components |
| **Fonts** | Google Fonts — Inter, Outfit | Modern, readable typography |
| **Deployment** | Netlify (marketing) + Vercel (console) | Automated CI/CD from GitHub |

### 2.2 Backend

| Layer | Technology | Purpose |
|---|---|---|
| **Framework** | Django 5 + Django REST Framework | Core API, admin, ORM |
| **Language** | Python 3.12 | Primary backend language |
| **API Style** | RESTful JSON API (v1) | Consumed by all frontends + mobile |
| **Authentication** | Firebase Authentication | Email/OTP/Google — JWT to DRF backend |
| **Task Queue** | `django-apscheduler` | Scheduled jobs (polling, reminders, reports) |
| **Cache** | `diskcache` (SQLite-backed) | Session cache, rate limiting, temp storage |
| **ORM** | Django ORM → PostgreSQL | All data persistence |
| **Admin** | Django Admin (customised) | Internal NeurolinkIT operations |

### 2.3 Database

| Layer | Technology | Purpose |
|---|---|---|
| **Primary DB** | PostgreSQL 16 | All production data |
| **Audit DB** | PostgreSQL (append-only tables) | Inspector compliance + immutable audit trail |
| **Dev/Test DB** | SQLite | Local development only |
| **File Storage** | Google Cloud Storage | Documents, payslips, PDFs, CVs |
| **Migrations** | Django Migrations | Schema version control |

### 2.4 AI Engine

| Layer | Technology | Purpose |
|---|---|---|
| **Primary LLM** | Google Gemini 1.5 Flash | All agent reasoning, generation, classification |
| **Fallback LLM** | Google Gemini 1.5 Pro | High-complexity tasks (legal, financial analysis) |
| **STT** | Google Cloud Speech-to-Text | Aria voice receptionist |
| **TTS** | Google Cloud Text-to-Speech | Aria voice responses |
| **Vision/OCR** | Google Cloud Vision API | KYB document verification, receipt scanning |
| **Translation** | Google Cloud Translation API | Babel module primary engine |
| **Translation (Premium)** | DeepL API | Babel module premium fallback |
| **Compliance Reasoning** | Gemini 1.5 Flash | Inspector pre-execution gate |
| **Guardrails** | Inspector module (internal) | Synchronous compliance check before all AI actions |

### 2.5 Third-Party Integrations

| Category | Services |
|---|---|
| **Payments** | NowPayments (crypto/fiat), Stripe (card) |
| **Telephony** | Twilio (Voice + SMS) |
| **Messaging** | WhatsApp Business API (Meta), Slack Webhooks |
| **Email** | Gmail SMTP (free), SendGrid (scale) |
| **Calendar** | Google Calendar API |
| **CRM** | HubSpot API, Pipedrive API, Salesforce API |
| **E-Signature** | DocuSign API |
| **Social** | Meta Graph API, Twitter/X API v2, LinkedIn API |
| **Advertising** | Google Ads API, Meta Marketing API |
| **SEO/Analytics** | Google Search Console, GA4 Data API |
| **Company Registry** | OpenCorporates API (150+ jurisdictions) |
| **Sanctions** | OpenSanctions.org API |
| **Shipping** | DHL API, FedEx API |
| **CI/CD** | GitHub Actions + Netlify/Vercel auto-deploy |

### 2.6 Infrastructure & Hosting

| Layer | Technology | Detail |
|---|---|---|
| **Backend Hosting** | Google Cloud Run | Serverless containers, auto-scaling |
| **Frontend Hosting** | Netlify (marketing) | Auto-deploy from GitHub `main` |
| **Console Hosting** | Vercel (planned) | `console.nexara.io` |
| **File Storage** | Google Cloud Storage | Encrypted at rest |
| **DNS & CDN** | Cloudflare | DDoS protection, WAF, edge caching |
| **Domain** | `nexara.io` (target) | Subdomains: `console.nexara.io`, `workspace.nexara.io` |
| **SSL/TLS** | Cloudflare + Let's Encrypt | TLS 1.3 enforced, HSTS enabled |
| **Container Registry** | Google Artifact Registry | Docker images for Cloud Run |
| **Inspector Instance** | Cloud Run (min instances = 1) | Always warm, never cold start |

---

## Part 3: Design System & Layers

### 3.1 Visual Identity

| Token | Value |
|---|---|
| **Primary Color** | Teal `#63DCB8` → Indigo `#6366F1` gradient |
| **Background** | Deep navy `#0A0F1E` (dark mode primary) |
| **Surface** | `#111827` (glass panels) |
| **Text Primary** | `#F9FAFB` |
| **Text Secondary** | `#9CA3AF` |
| **Success** | `#10B981` |
| **Warning** | `#F59E0B` |
| **Error** | `#EF4444` |
| **Border** | `rgba(255,255,255,0.08)` |
| **Font** | Inter (body) + Outfit (headings) |
| **Radius** | `0.75rem` (cards), `0.5rem` (inputs) |
| **Shadow** | `0 0 40px rgba(99, 220, 184, 0.15)` (glow) |

### 3.2 Design Layers (Frontend Architecture)

```
┌─────────────────────────────────────────────────────────┐
│  LAYER 1: MARKETING SITE (nexara.io)                    │
│  Next.js 16 · Static Export · Netlify CDN              │
│  Pages: Hero, Roster, HowItWorks, Pricing, Contact     │
├─────────────────────────────────────────────────────────┤
│  LAYER 2: CLIENT CONSOLE (console.nexara.io)            │
│  Next.js 16 · SSR · Firebase Auth · Protected Routes   │
│  Pages: Dashboard, Agent Config, Analytics, Billing    │
├─────────────────────────────────────────────────────────┤
│  LAYER 3: AGENT WORKSPACE (workspace.nexara.io)         │
│  Next.js 16 · Real-time · WebSocket / SSE              │
│  Pages: Agent Activity, Approvals Queue, Audit Log     │
├─────────────────────────────────────────────────────────┤
│  LAYER 4: DJANGO REST API (api.nexara.io)               │
│  DRF · JWT Auth · Per-module apps · Inspector gate     │
├─────────────────────────────────────────────────────────┤
│  LAYER 5: AI ENGINE LAYER                               │
│  Gemini 1.5 Flash · STT/TTS · Vision · Translation    │
│  All calls routed through Inspector compliance gate    │
├─────────────────────────────────────────────────────────┤
│  LAYER 6: DATA LAYER                                    │
│  PostgreSQL · Google Cloud Storage · diskcache         │
│  Append-only audit tables · 7-year retention          │
└─────────────────────────────────────────────────────────┘
```

### 3.3 Agent Module Architecture

Each AI agent is a **Django app** following this internal pattern:

```
nexara/
├── core/               # Auth, billing, user management
├── inspector/          # Compliance gate — always runs first
├── veritas/            # KYB client onboarding
├── serea/              # Social media moderator
├── lead_hunter/        # Lead generation
├── concierge/          # Client concierge
├── content_architect/  # Content generation
├── ad_optimizer/       # Paid media
├── reporting_bot/      # Analytics reporting
├── oracle/             # SEO specialist
├── aria/               # Voice receptionist
├── kai/                # DevOps engineer
├── sage/               # Legal reviewer
├── rex/                # Cybersecurity (Aegis)
├── hera/               # HR & recruitment
├── finn/               # Finance & bookkeeping
├── plex/               # Project management
├── iris/               # Email management
├── crux/               # CRM management
├── medibook/           # Healthcare scheduling
├── realt/              # Real estate
├── merch/              # E-commerce
├── babel/              # Translation
├── nova/               # Data science / BI
├── mira/               # Customer success
├── shield_helpdesk/    # IT helpdesk
├── pulse/              # Market research
├── scout/              # Competitor intelligence
├── luma/               # Brand & PR
├── atlas/              # Executive assistant
├── cash/               # Payroll
├── dox/                # Technical writer
├── tempo/              # Event planning
├── flux/               # Logistics
├── nexus/              # Training & L&D
├── payload/            # Procurement
└── clarity/            # UX research
```

---

## Part 4: Security Policy

### 4.1 Authentication & Authorisation

| Control | Implementation |
|---|---|
| **Authentication** | Firebase Auth — Email/Password + Google OAuth2 + OTP |
| **Session Tokens** | Firebase ID Token → verified by `firebase-admin` in DRF |
| **API Authorisation** | JWT Bearer token on every API request |
| **Role-Based Access** | `ADMIN`, `CLIENT_OWNER`, `CLIENT_MEMBER`, `AGENT`, `INTERNAL_OPS` |
| **MFA** | Required for `ADMIN` and `INTERNAL_OPS` roles |
| **Inspector API** | Additional IP whitelist + MFA-gated — NeurolinkIT ops only |
| **Password Policy** | Firebase-enforced: min 12 chars, complexity required |
| **Session Expiry** | ID tokens expire 1 hour; refresh tokens 30 days |

### 4.2 Data Security

| Control | Implementation |
|---|---|
| **Encryption at Rest** | AES-256 — PostgreSQL, Google Cloud Storage |
| **Encryption in Transit** | TLS 1.3 enforced across all services |
| **Sensitive Fields** | OAuth tokens, API keys encrypted at application layer (`cryptography` lib) |
| **PII Minimisation** | Only data required for function stored — GDPR/DPDPA data minimisation |
| **Database Access** | Cloud Run service account with minimal IAM permissions |
| **Secret Management** | Google Cloud Secret Manager — no secrets in code or env files |
| **Backup** | Automated daily PostgreSQL backups — 30-day retention |
| **HSTS** | Strict-Transport-Security enforced via Cloudflare |

### 4.3 AI-Specific Security (OWASP LLM Top 10)

| Threat | Mitigation |
|---|---|
| **LLM01: Prompt Injection** | User input sanitised + hardened system prompt wrapper; Gemini output validated before execution |
| **LLM02: Insecure Output Handling** | All Gemini outputs schema-validated; never executed as code |
| **LLM03: Training Data Poisoning** | Gemini API only — no fine-tuning on client data without explicit consent |
| **LLM04: Model DoS** | Rate limiting per client per agent; token usage capped per tier |
| **LLM05: Supply Chain** | Gemini API version pinned; all third-party API responses validated |
| **LLM06: Sensitive Info Disclosure** | PII scanning on all AI outputs before delivery; redaction applied |
| **LLM07: Insecure Plugin Design** | All integrations via authenticated, scoped API calls only |
| **LLM08: Excessive Agency** | Human approval gates on destructive/financial/legal AI actions |
| **LLM09: Overreliance** | All AI outputs labelled; high-stakes actions require human confirmation |
| **LLM10: Model Theft** | Gemini API accessed via service account — no model weights exposed |

### 4.4 Inspector Security Gate

Every AI agent output passes through Inspector **synchronously** before execution:

```
Agent Output → Inspector Pre-Execution Gate (5 checks) → Execute or Block
```

- **5 checks:** Legal · Ethics & Anti-Discrimination · Cybersecurity Risk · Data Privacy · Harm Prevention
- **Fail-safe:** If Inspector is unreachable → all agents fail closed (action blocked)
- **Audit:** Every check logged to append-only table with SHA-256 chain
- **Retention:** 7 years (SOX, SOC 2, ISO 27001 requirement)

### 4.5 Network Security

| Control | Implementation |
|---|---|
| **WAF** | Cloudflare Web Application Firewall — OWASP ruleset |
| **DDoS Protection** | Cloudflare DDoS mitigation — all tiers |
| **Rate Limiting** | DRF throttling + Cloudflare rate rules per endpoint |
| **CORS** | Strict allowlist — only Nexara subdomains + whitelisted client origins |
| **Content Security Policy** | Strict CSP headers on all pages |
| **IP Restrictions** | Inspector API + Django Admin restricted to NeurolinkIT IP range |
| **Port Exposure** | Only 443 (HTTPS) exposed; Cloud Run internal networking only |
| **VPC** | Cloud Run connected to Google VPC for internal service communication |

### 4.6 Compliance Framework

| Standard | Status |
|---|---|
| GDPR (EU) | ✅ Enforced via Inspector + DPA agreement |
| CCPA (California) | ✅ Enforced via Inspector |
| PDPA (Bangladesh) | ✅ Enforced via Inspector + Cyber Protection Ordinance 2024 |
| DPDPA (India) | ✅ 72-hour breach notification protocol |
| HIPAA | ✅ MediBook module — encrypted, minimum necessary |
| PCI DSS v4 | ✅ No raw card data in any agent; Stripe handles cardholder data |
| ISO/IEC 27001 | 🔄 Target certification — Year 2 |
| SOC 2 Type II | 🔄 Target — Year 2 |
| ISO/IEC 42001 (AI MGMT) | ✅ Inspector + NIST AI RMF enforced now |
| EU AI Act | ✅ Human oversight gates + transparency requirements enforced |

### 4.7 Incident Response

| Phase | Action | SLA |
|---|---|---|
| **Detect** | Inspector auto-detects + logs | Real-time |
| **Contain** | Agent output blocked; data quarantined | Immediate |
| **Notify** | Client admin + NeurolinkIT ops alerted | < 15 minutes |
| **Assess** | Gemini impact assessment generated | < 1 hour |
| **Report** | Regulatory notification draft (if breach) | < 4 hours |
| **Recover** | Root cause fix + rule strengthened | < 24 hours |
| **Review** | Post-incident report published | < 72 hours |

---

## Part 5: Subscription & Billing Architecture

### 5.1 Tier Model (Per Agent)

| Tier | Price/mo | Access Level |
|---|---|---|
| **Intern** | Free | Limited capacity — demo/trial |
| **Entry** | ৳2,000 (~$18) | Standard features, usage caps |
| **Mid** | ৳5,000 (~$45) | Advanced features, higher limits |
| **Senior** | ৳10,000 (~$90) | Full features, analytics, white-label |

### 5.2 Billing Stack

| Component | Technology |
|---|---|
| Global Payments | NowPayments (crypto + 100+ fiat methods) |
| Card Payments | Stripe (US, UK, EU, SG clients) |
| Local BD Payments | bKash / Nagad (planned) |
| Subscription Logic | Django `subscriptions` app — tier enforcement |
| Usage Metering | Per-agent token + action tracking |
| Invoice Generation | `reportlab` PDF invoices auto-emailed |

---

## Part 6: Deployment & CI/CD Pipeline

```
Developer pushes to GitHub (main branch)
        │
        ├──► Netlify auto-builds marketing site (nexara.io)
        │    Build: next build + next export
        │    Deploy: Netlify CDN global edge
        │
        ├──► Vercel auto-builds console (console.nexara.io)
        │    Build: next build
        │    Deploy: Vercel serverless
        │
        └──► GitHub Actions triggers Cloud Run deploy
             Build: Docker image → Google Artifact Registry
             Deploy: gcloud run deploy → Cloud Run
             Health check: Inspector /health/ must return 200
```

**Zero-downtime deploys:** Cloud Run traffic splitting — new revision receives 0% traffic until health check passes, then 100% cutover.

---

## Part 7: Monitoring & Observability

| Layer | Tool |
|---|---|
| **Uptime Monitoring** | Kai module (internal) + Google Cloud Monitoring |
| **Error Tracking** | Sentry (frontend + backend) |
| **API Logs** | Google Cloud Logging |
| **Performance** | Google Cloud Trace |
| **Security Alerts** | Inspector + PagerDuty |
| **Spend Alerts** | Google Cloud Budget Alerts |
| **Compliance Dashboard** | Inspector internal dashboard (`/internal/inspector/analytics/`) |

---

*Nexara Platform Architecture — NeurolinkIT Engineering*
*Classification: Internal Reference | Next Review: October 2026*
