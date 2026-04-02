<div align="center">

<br />

<img src="https://img.shields.io/badge/AEGIS-SECURITY-00D8FF?style=for-the-badge&labelColor=050A14&color=00D8FF" height="36" alt="Aegis"/>

<br /><br />

# 🛡️ AEGIS

### *Enterprise Security. Zero Breakage. One Click.*

**The AI-powered B2B SaaS cybersecurity platform that automatically remediates your vulnerabilities — simulated first, applied only when safe. Backed by a 24/7 human SOC team.**

<br />

![Next.js](https://img.shields.io/badge/Next.js_16-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_v4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-0055FF?style=for-the-badge&logo=framer&logoColor=white)
![Python](https://img.shields.io/badge/FastAPI_(Phase_2)-009688?style=for-the-badge&logo=fastapi&logoColor=white)

<br />

[![Live Site](https://img.shields.io/badge/▶_Live_Site-00D8FF?style=flat-square&logoColor=white)](https://aegis.security)
[![Admin Panel](https://img.shields.io/badge/⚙_Admin_Panel-8B5CF6?style=flat-square)](https://aegis.security/admin)
[![GitHub Repo](https://img.shields.io/badge/GitHub-shadman1996%2FAegis-181717?style=flat-square&logo=github)](https://github.com/shadman1996/Aegis)

</div>

---

## ✦ What Is Aegis?

Aegis is a **Product-Led Growth (PLG) B2B SaaS** cybersecurity platform built on top of the OpenClaw Sentinel engine. It enables enterprise teams to go from exposed to secured in minutes — with no security expertise required.

| Layer | What It Does |
|---|---|
| 🔍 **Free Scanner** | Instant network & cloud audit — ports, CVEs, firewall, SSL, misconfigs |
| 📋 **AI Report** | GPT-4o generates plain-English vulnerability reports, severity-ranked |
| ⚡ **AI Auto-Fix** | One click remediates vulnerabilities using AI credits |
| 🧪 **Zero-Breakage Sim** | Every fix is simulated before application — rejected if unsafe, zero cost |
| 🧑‍💻 **Human SOC Escalation** | Complex issues routed to our 24/7 Dhaka, Bangladesh SOC team (50 credits) |

---

## ✦ Platform Screenshots

<table>
<tr>
<td width="50%" align="center">
  <img src="https://placehold.co/600x380/050A14/00D8FF?text=🛡+Hero+Section" width="100%" alt="Hero Section"/>
  <br/><sub><b>Hero — Enterprise Security. Zero Breakage. One Click.</b></sub>
</td>
<td width="50%" align="center">
  <img src="https://placehold.co/600x380/050A14/8B5CF6?text=⚡+Pricing+%26+Credits" width="100%" alt="Pricing Section"/>
  <br/><sub><b>Pricing — AI Credit Tiers from $14 to $299/mo</b></sub>
</td>
</tr>
<tr>
<td width="50%" align="center">
  <img src="https://placehold.co/600x380/030710/00D8FF?text=🔬+Zero-Breakage+Sim" width="100%" alt="Zero Breakage"/>
  <br/><sub><b>Zero-Breakage — Digital Twin simulation engine</b></sub>
</td>
<td width="50%" align="center">
  <img src="https://placehold.co/600x380/030710/10B981?text=📊+Admin+Dashboard" width="100%" alt="Admin Panel"/>
  <br/><sub><b>Admin Panel — Live KPIs, SOC queue, revenue chart</b></sub>
</td>
</tr>
</table>

---

## ✦ How It Works

```
┌──────────────────────────────────────────────────────────────────────┐
│                         AEGIS PLATFORM FLOW                          │
│                                                                      │
│  [Client] ──► Free Scan ──► AI Report (plain English, ranked)        │
│                                  │                                   │
│                    ┌─────────────┴──────────────┐                   │
│                    ▼                            ▼                   │
│            AI Auto-Fix                  SOC Escalation              │
│           (1–3 Credits)                 (50 Credits)                │
│                    │                            │                   │
│                    ▼                            ▼                   │
│         Digital Twin Sim              Dhaka SOC Analyst             │
│         ┌────────────────┐            (< 15 min response)           │
│         │ SIM PASSED ✅  │──► Applied to production                 │
│         │ SIM FAILED ❌  │──► Rejected, zero credits charged        │
│         └────────────────┘                                          │
└──────────────────────────────────────────────────────────────────────┘
```

---

## ✦ Tech Stack

### Marketing Site (This Repo)

| Technology | Version | Purpose |
|---|---|---|
| **Next.js** | 16.2.2 | App Router, SSG, SEO |
| **TypeScript** | 5.x | Type safety |
| **Tailwind CSS** | v4 | Utility-first styling |
| **Framer Motion** | 11.x | Scroll animations, micro-interactions |
| **Lucide React** | 0.417 | Icon system |
| **Google Fonts** | — | Space Grotesk + Inter |

### SaaS Backend (Phase 2 — `api/`)

| Technology | Purpose |
|---|---|
| **FastAPI (Python)** | REST API backend |
| **Supabase** | PostgreSQL + Auth (JWT / Google OAuth) |
| **OpenAI GPT-4o** | AI remediation engine |
| **Stripe** | Credit purchase & webhook billing |
| **SendGrid** | SOC escalation email alerts |
| **Google Cloud Run** | Serverless API deployment |

---

## ✦ Project Structure

```
Aegis/
├── app/
│   ├── layout.tsx          # Root layout, fonts, SEO metadata
│   ├── page.tsx            # Landing page (assembles all sections)
│   ├── globals.css         # Design tokens, animations, glassmorphism
│   └── admin/
│       └── page.tsx        # Admin dashboard route → /admin
│
├── components/
│   ├── Navbar.tsx          # Sticky glassmorphism nav + mobile drawer
│   ├── HeroSection.tsx     # Animated hero, stats strip, dual CTAs
│   ├── HowItWorks.tsx      # 3-step Scan → Report → Fix process cards
│   ├── ZeroBreakage.tsx    # Digital twin simulation flow diagram
│   ├── SOCBacking.tsx      # 24/7 SOC stats + escalation workflow
│   ├── PricingSection.tsx  # 4 credit tier cards ($14 – $299/mo)
│   ├── Footer.tsx          # Links, trust badges, copyright
│   └── admin/
│       └── AdminDashboard.tsx  # Full 3-tab admin panel
│
├── public/                 # Static assets
├── .gitignore
├── next.config.ts
├── tailwind.config.ts
└── package.json
```

---

## ✦ Getting Started

### Prerequisites

- Node.js `>= 18`
- npm `>= 9`

### Install & Run

```bash
# Clone the repo
git clone https://github.com/shadman1996/Aegis.git
cd Aegis

# Install dependencies
npm install

# Start the development server
npm run dev
```

Open **[http://localhost:3000](http://localhost:3000)** for the marketing site.  
Open **[http://localhost:3000/admin](http://localhost:3000/admin)** for the admin panel.

### Build for Production

```bash
npm run build
npm start
```

---

## ✦ Credit System

The platform uses an **AI Credit** model. Scanning is always 100% free.

| Action | Credit Cost |
|---|---|
| Run vulnerability scanner | **Free** |
| Standard AI auto-fix | **1 credit** |
| Complex AI auto-fix | **3 credits** |
| Human SOC escalation | **50 credits** |

| Plan | Credits | Price |
|---|---|---|
| Pay-As-You-Go | 10 | $14 one-time |
| Starter | 25 / mo | $29 / mo |
| Pro | 100 / mo | $79 / mo |
| Enterprise | 500 / mo | $299 / mo |

> ✅ If the Zero-Breakage simulation rejects a fix, **zero credits are deducted**. Period.

---

## ✦ Admin Panel

Navigate to `/admin` for the internal operations dashboard:

- **Overview** — KPI cards (users, scans, MRR, open tickets), 7-month revenue bar chart, recent scan table, vulnerability severity breakdown
- **SOC Tickets** — Live ticket queue with priority indicators, analyst assignment, SLA countdown, status (open / in progress / resolved)
- **Remediation Log** — Full history of AI fix attempts, simulation pass/fail outcomes, and SOC escalations with credit tracking

---

## ✦ Zero-Breakage Guarantee — How It Works

Every AI-generated fix runs through a **multi-stage static analysis engine** before touching production:

1. **Syntax Validation** — Parses bash/config patches for syntax errors
2. **Port Conflict Detector** — Checks that no fix blocks ports used by critical services
3. **Firewall Rule Diff** — Visualizes exactly which rules are added or removed
4. **Service Dependency Map** — Cross-references changes against known service dependencies
5. **Rollback Snapshot** — Config is snapshotted before every change for instant revert

If the simulation fails **any** check → fix is rejected, no credits deducted.

---

## ✦ SOC Team

Aegis is backed by a dedicated **Security Operations Center** in Dhaka, Bangladesh:

- 🟢 **12 analysts** online 24/7/365
- ⚡ **< 15 minute** average first response
- 📋 Full **root cause analysis** delivered with every resolved ticket
- 🇺🇸 US-based HQ in **Minnetonka, Minnesota**

---

## ✦ Roadmap

- [x] **Phase 1** — Marketing landing page + admin panel (this repo)
- [ ] **Phase 2** — FastAPI backend: auth, scanner API, AI engine, Stripe billing
- [ ] **Phase 3** — OpenClaw Agent cloud-report mode (extends existing Python agent)
- [ ] **Phase 4** — Full Digital Twin VM sandbox (GCP/AWS ephemeral environments)
- [ ] **Phase 5** — Compliance report generation (SOC 2, ISO 27001, GDPR)

---

## ✦ Built With

> **OpenClaw Sentinel Engine** — The battle-tested Python cybersecurity core powering Aegis's network scanning and telemetry layer.

---

<div align="center">

**© 2026 Aegis Security, Inc. · Minnetonka, Minnesota, US**

*Enterprise-grade AI cyber remediation. Zero Breakage. Backed by humans.*

</div>
