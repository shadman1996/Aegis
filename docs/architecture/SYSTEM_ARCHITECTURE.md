# System Architecture & Diagrams
# Nexara — Bengal Bound Ltd
**Version:** 1.0 | ISO/IEC 25010 Aligned

---

## 1. Platform Overview

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                         NEXARA PLATFORM                                     │
│                      Powered by Bengal Bound Ltd                            │
└─────────────────────────────────────────────────────────────────────────────┘

  CLIENT TOUCHPOINTS                  NEXARA CORE                   EXTERNAL
  ─────────────────                   ────────────              ──────────────
  nexara.io          ──────────►  [Marketing Site]
  (Next.js 16)                         │
                                        │ Sign Up
  console.nexara.io  ──────────►  [Client Console]  ◄──────  Firebase Auth
  (Next.js 16)                         │                      Google OAuth
                                        │ REST API
  Flutter App        ──────────►  [Django REST API]           Google Cloud
  (Android/iOS/                        │                         Run
   macOS/Win/Linux)                    │
                                   ┌───▼───────────────┐
                                   │    INSPECTOR       │ ◄── Gemini AI
                                   │  (Always-On Gate)  │     (compliance)
                                   └───┬───────────────┘
                                       │ If PASS
                                   ┌───▼───────────────┐
                                   │   AI ENGINE LAYER  │
                                   │  Gemini / Ollama   │ ◄── Self-hosted GPU
                                   │  / OpenAI-compat   │     (Phase 3)
                                   └───┬───────────────┘
                                       │
            ┌──────────────────────────┼──────────────────────────┐
            ▼                          ▼                           ▼
     [Concierge]              [Lead Hunter]               [Serea]  ...30+
     WhatsApp Leads           B2B Prospecting             Social Media
            │                          │                           │
            └──────────────────────────┴──────────────────────────┘
                                       │
                               ┌───────▼───────┐
                               │  PostgreSQL 16  │
                               │  Cloud Storage  │
                               └───────────────┘
```

---

## 2. Request Flow Diagram (Every AI Action)

```
Client Console / App
        │
        │ POST /api/v1/agents/{id}/execute/
        ▼
 ┌─────────────┐
 │ Django API   │
 │ Auth Check   │ ──── FAIL ──► 401 Unauthorized
 └──────┬──────┘
        │ PASS
        ▼
 ┌─────────────┐
 │ Tier Check  │ ──── FAIL ──► 402 Limit Reached
 └──────┬──────┘
        │ PASS
        ▼
 ┌─────────────┐        ┌────────────────────────┐
 │  INSPECTOR  │──────► │ 5-Check Pipeline:       │
 │    GATE     │        │ 1. Legal compliance     │
 └──────┬──────┘        │ 2. Ethics check         │
        │               │ 3. Cybersecurity risk   │
        │               │ 4. Data privacy         │
        │               │ 5. Harm prevention      │
        │               └────────────┬───────────┘
        │                            │
        │          ┌─────────────────┴──────────────┐
        │          │                                  │
        │        PASS                               BLOCK
        │          │                                  │
        │          │                    ┌─────────────▼──────────┐
        │          │                    │ Log to Audit Trail      │
        │          │                    │ Notify Admin (Slack)    │
        │          │                    │ Return 403 to Agent     │
        │          │                    │ Notify Client (in-app)  │
        │          │                    └─────────────────────────┘
        │          │
        ▼          ▼
 ┌─────────────────────┐
 │  AI Engine Layer     │
 │  (Gemini API call)   │
 └──────────┬──────────┘
            │
            ▼
 ┌─────────────────────┐
 │  Agent Executes      │
 │  Action              │
 └──────────┬──────────┘
            │
            ▼
 ┌─────────────────────┐
 │  Log to AgentLog     │
 │  Send Notification   │
 │  Return Result       │
 └─────────────────────┘
```

---

## 3. Client Onboarding Flow

```
         nexara.io
            │
            ▼
    ┌───────────────┐
    │   Sign Up     │ ─── Google OAuth OR Email+Password
    └───────┬───────┘
            │
            ▼
    ┌───────────────┐
    │Email Verified?│ ── NO ──► Send verification email → Wait
    └───────┬───────┘
            │ YES
            ▼
    ┌───────────────────────────┐
    │   VERITAS KYB GATE        │
    │ Company name + country    │
    │ Registration number       │
    │ Director NID/Passport     │
    │ Document upload           │
    └───────────┬───────────────┘
                │
      ┌─────────┼──────────┐
      ▼         ▼          ▼
   🟢 AUTO   🟡 MANUAL   🔴 REJECT
   APPROVE    REVIEW        │
      │         │           ▼
      │      48hr SLA    Email reason
      │         │        + appeal form
      │         ▼
      │      Admin reviews
      │      (Console)
      │         │
      └────┬────┘
           ▼
    ┌──────────────┐
    │ Sign TOS +   │
    │ DPA + AUP +  │
    │ AI Ethics    │
    └──────┬───────┘
           ▼
    ┌──────────────┐
    │  Agent Store │
    │  Browse 30+  │
    │  agents      │
    └──────┬───────┘
           ▼
    ┌──────────────┐
    │  Payment     │ ─── Stripe / NowPayments / bKash
    └──────┬───────┘
           ▼
    ┌──────────────┐
    │  Configure   │ ─── Connect accounts, brand voice,
    │  Agent       │     knowledge base, approvals
    └──────┬───────┘
           ▼
    ┌──────────────┐
    │  AGENT LIVE  │ ─── First notification to client
    └──────────────┘     Day 1, 7, 30 onboarding emails
```

---

## 4. Nexara ↔ CRM Integration Flow

```
    ┌─────────────────────────────────────────────────────────┐
    │                  MODULAR CRM PLATFORM                    │
    │              (Dev's Django Project)                      │
    │                                                          │
    │  crm/ │ leads/ │ hr/ │ payroll/ │ accounting/ │ ...     │
    └──────────────────────┬──────────────────────────────────┘
                           │
                   Internal API Bridge
                   (Private network only)
                           │
    ┌──────────────────────▼──────────────────────────────────┐
    │                  NEXARA PLATFORM                         │
    │                                                          │
    │   Concierge ──────────────────► crm/leads/              │
    │   Lead Hunter ─────────────────► crm/leads/contacts/    │
    │   Crux (CRM Mgr) ──────────────► crm/                   │
    │   Hera (HR) ───────────────────► hr/recruitment/payroll/ │
    │   Finn (Finance) ──────────────► accounting/invoicing/  │
    │   Reporting Bot ───────────────► reports/               │
    │   Nova (Analytics) ────────────► ai_analytics/          │
    │   Iris (Email) ────────────────► email_marketing/       │
    │   Atlas (Projects) ────────────► task_board/            │
    │   Sage (Legal) ────────────────► contracts/documents/   │
    │   Rex (Security) ──────────────► maintenance/ quality/  │
    │                                                          │
    │   ⚠️ ALL WRITES PASS THROUGH INSPECTOR FIRST            │
    └──────────────────────────────────────────────────────────┘
```

---

## 5. Multi-Tenant Data Architecture

```
PostgreSQL 16
│
├── Table: clients
│       id │ company_name │ status │ kyb_risk │ subscription_tier
│
├── Table: agents (with client_id FK)
│       id │ client_id │ agent_type │ status │ config_json │ tier
│
├── Table: agent_logs (append-only, client_id FK)
│       id │ client_id │ agent_id │ action │ inspector_result │ timestamp
│
├── Table: inspector_audit (append-only, immutable)
│       id │ action_hash │ result │ law_references │ sha256_chain │ timestamp
│
├── Table: notifications
│       id │ client_id │ user_id │ type │ channel │ read │ created_at
│
└── Table: approval_queue
        id │ client_id │ agent_id │ action │ deadline │ status

Row-Level Security: Every query includes WHERE client_id = request.user.client_id
Audit tables: INSERT only, no UPDATE or DELETE ever
```

---

## 6. Security Architecture

```
INTERNET
    │
    ▼
┌─────────────────────────────┐
│  Cloudflare (Edge Layer)     │
│  WAF + DDoS + Bot Protection │
│  SSL Termination (TLS 1.3)  │
│  Rate Limiting at Edge       │
└────────────┬────────────────┘
             │
    ┌────────▼─────────┐    ┌────────────────────┐
    │  Cloud Run (API)  │    │  Netlify (Web)      │
    │  HTTPS Only       │    │  Vercel (Console)   │
    │  Non-root user    │    │  CDN + HTTPS        │
    │  Read-only FS     │    └────────────────────┘
    └────────┬──────────┘
             │ Private network only
    ┌────────▼──────────┐
    │  Cloud SQL         │
    │  Private IP only   │
    │  AES-256 at rest   │
    │  Encrypted backups │
    └────────────────────┘

Auth layers:
  Browser/App → Firebase Auth → JWT → Django API
  Admin panel → VPN + MFA only
  Secrets     → Google Secret Manager (never in code)
```

---

## 7. Flutter App Screen Architecture

```
App Launch
    │
    ├─── First time? ──► Onboarding Screens (3 slides)
    │                           │
    │                           ▼
    │                    Login / Sign Up
    │
    └─── Returning? ──► Biometric Check (Face ID / Fingerprint)
                                │
                                ▼
                         Dashboard (Home)
                         ┌──────────────────────────────┐
                         │  Agent Status Grid            │
                         │  Recent Activity Feed         │
                         │  Approval Queue Badge         │
                         └────────────┬─────────────────┘
                                      │
            ┌─────────────────────────┼─────────────────────────┐
            ▼                         ▼                          ▼
     [Agents Tab]            [Notifications Tab]         [Settings Tab]
     Agent store             Approval queue              Profile
     Config wizard           Activity feed               MFA setup
     Analytics               Action buttons              Team mgmt
                                                         Billing
                                                         Support/FAQ

Navigation: Bottom tab bar (mobile) | Left sidebar (tablet/desktop)
Back: System back (Android) | Swipe left (iOS) | Logo tap → Home
```

---

## 8. Notification Flow Architecture

```
Event Occurs (e.g., "Lead qualified by Concierge")
    │
    ▼
Notification Service (Django)
    │
    ├── Type: USER notification
    │   ├── In-app (SSE stream to Console/App)
    │   ├── FCM Push → Flutter app (all platforms)
    │   └── WhatsApp (if client enabled)
    │
    └── Type: ADMIN/SECURITY notification
        ├── Slack #alerts-security (< 60 seconds)
        ├── PagerDuty (Critical only, on-call rotation)
        └── Email (security@nexara.io)

Approval notifications:
    │
    ├── Inline Approve/Reject buttons (Console + App)
    ├── 24-hour deadline countdown shown
    └── Auto-expire: action cancelled after 24h with no response
```

---

## 9. Deployment Pipeline (CI/CD)

```
Developer pushes code
    │
    ▼
GitHub Actions triggered
    │
    ├── Lint + Format check (Black, Ruff, ESLint)
    ├── Unit tests (pytest + Jest)
    ├── Security scan (CodeQL + Trivy)
    ├── Dependency CVE check (Dependabot)
    │
    ├─── Tests FAIL → Block merge → Notify dev on Slack
    │
    └─── Tests PASS
              │
              ├── Branch: main
              │   ├── Deploy API → Cloud Run (production)
              │   ├── Deploy Console → Vercel (production)
              │   ├── Deploy Web → Netlify (production)
              │   └── Notify team: "Deployed successfully ✅"
              │
              └── Branch: develop
                  ├── Deploy API → Cloud Run (staging)
                  └── Deploy Console → Vercel (preview URL)
```

---

*Bengal Bound Ltd — Nexara Architecture v1.0*
*Diagrams use ASCII art for universal compatibility (no tool dependencies)*
