# Nexara Platform

> **The Next Era of Work — Powered by AI Employees**
> Built by NeurolinkIT

[![Netlify](https://img.shields.io/badge/Marketing-Live-brightgreen)](https://nexara.io)
[![License](https://img.shields.io/badge/License-Proprietary-red)](./LICENSE)
[![Stack](https://img.shields.io/badge/Stack-Next.js%20%7C%20Django%20%7C%20Flutter%20%7C%20Gemini-blue)](./docs/nexara_platform_architecture.md)

---

## What is Nexara?

Nexara is an **AI-as-Employee (AIaaE)** marketplace. Businesses hire AI employees — not chatbots, not automations — autonomous AI agents that hold actual job roles, complete tasks, report results, and operate 24/7 within a strict global compliance framework enforced by Inspector.

**30+ AI Employees available:** Concierge · Serea · Lead Hunter · Content Architect · Aria · Kai · Hera · Finn · Nova · Rex · and more.

**Every agent is supervised by Inspector** — an always-on internal compliance watchdog enforcing 40+ global laws (GDPR, HIPAA, EU AI Act, PDPA, and more).

---

## Monorepo Structure

```
nexara-platform/
│
├── 📁 web/                     ← Marketing website (Next.js 16 — nexara.io)
│   ├── app/                    ← Next.js App Router pages
│   ├── components/             ← React components (Hero, Navbar, Pricing, etc.)
│   ├── public/                 ← Static assets
│   └── package.json
│
├── 📁 console/                 ← Client dashboard (Next.js 16 — console.nexara.io)
│   ├── app/                    ← Protected dashboard pages
│   ├── components/             ← Dashboard UI components
│   └── package.json
│
├── 📁 api/                     ← Backend API (Django 5 + DRF — api.nexara.io)
│   ├── nexara/                 ← Django project root
│   │   ├── settings/           ← Dev / staging / prod settings
│   │   ├── urls.py
│   │   └── wsgi.py
│   ├── core/                   ← Auth, billing, users, notifications
│   ├── inspector/              ← Compliance watchdog (always-on)
│   ├── veritas/                ← KYB client onboarding
│   ├── agents/                 ← All AI agent Django apps
│   │   ├── concierge/
│   │   ├── serea/
│   │   ├── lead_hunter/
│   │   └── ...                 ← (30+ agents)
│   ├── ai_engine/              ← AI provider abstraction (Gemini/Ollama/vLLM)
│   ├── requirements.txt
│   ├── manage.py
│   └── Dockerfile
│
├── 📁 app/                     ← Flutter cross-platform app
│   ├── lib/
│   │   ├── core/               ← Auth, API client, notifications
│   │   ├── features/           ← Dashboard, agents, approvals, billing
│   │   └── main.dart
│   ├── android/
│   ├── ios/
│   ├── macos/
│   ├── windows/
│   ├── linux/
│   └── pubspec.yaml
│
├── 📁 docs/                    ← All module requirement docs
│   ├── nexara_platform_architecture.md
│   ├── inspector_compliance_monitor.md
│   ├── veritas_client_kyb_onboarding.md
│   └── ...                     ← (30+ agent docs)
│
├── 📁 infra/                   ← Infrastructure & deployment
│   ├── docker/                 ← Dockerfiles
│   ├── cloudrun/               ← Cloud Run service configs
│   └── scripts/                ← Deployment helper scripts
│
├── 📁 .github/
│   └── workflows/
│       ├── deploy-web.yml      ← Netlify deploy (marketing)
│       ├── deploy-api.yml      ← Cloud Run deploy (Django API)
│       ├── deploy-console.yml  ← Vercel deploy (console)
│       └── build-app.yml       ← Flutter builds (all 5 platforms)
│
├── .gitignore
├── README.md                   ← This file
└── LICENSE
```

---

## Quick Start

### Prerequisites
- Node.js 20+
- Python 3.12+
- Flutter 3+
- Docker
- Google Cloud CLI (`gcloud`)

### Marketing Website (web/)
```bash
cd web
npm install
npm run dev
# → http://localhost:3000
```

### Django API (api/)
```bash
cd api
python -m venv .venv
source .venv/bin/activate  # Windows: .venv\Scripts\activate
pip install -r requirements.txt
cp .env.example .env        # Fill in your API keys
python manage.py migrate
python manage.py runserver
# → http://localhost:8000
```

### Flutter App (app/)
```bash
cd app
flutter pub get
flutter run                  # Runs on connected device/emulator
flutter run -d chrome        # Web preview
flutter run -d windows       # Windows desktop
```

### Console Dashboard (console/)
```bash
cd console
npm install
npm run dev
# → http://localhost:3001
```

---

## AI Employee Roster

| Employee | Role | Status |
|---|---|---|
| **Concierge** | WhatsApp Lead Qualifier | 🟢 Live |
| **Serea** | Social Media Moderator | 🟢 Live |
| **Lead Hunter** | B2B Lead Generator | 🔵 Aegis Module |
| **Content Architect** | Content Generator | 🔵 Aegis Module |
| **Ad Optimizer** | Paid Media Manager | 🔵 Aegis Module |
| **Reporting Bot** | Analytics Reporter | 🔵 Aegis Module |
| **Oracle** | SEO Specialist | 🔵 Aegis Module |
| **Aria** | Voice Receptionist | 🔜 Coming Soon |
| **Kai** | DevOps Engineer | 🔜 Coming Soon |
| **Sage** | Legal Reviewer | 🔜 Coming Soon |
| **Hera** | HR & Recruiter | 🔜 Coming Soon |
| **Finn** | Financial Analyst | 🔜 Coming Soon |
| *+ 20 more...* | | 🔮 Future |

---

## Security & Compliance

- **Inspector** — always-on AI compliance watchdog, pre-execution gate on all AI actions
- **Veritas** — KYB client verification before any agent activates
- **40+ global laws** enforced: GDPR, HIPAA, PDPA, DPDPA, CCPA, PCI DSS, EU AI Act
- **OWASP LLM Top 10** — all 10 threats mitigated
- **Immutable audit trail** — SHA-256 chained, append-only, 7-year retention
- **MFA** — TOTP (Google Authenticator / Authy), biometric (Face ID / Touch ID)
- **TLS 1.3** everywhere · AES-256 at rest · Cloudflare WAF

See full security policy: [docs/nexara_platform_architecture.md](./docs/nexara_platform_architecture.md)

---

## Tech Stack

| Layer | Technology |
|---|---|
| Marketing Site | Next.js 16 · TypeScript · Tailwind · Framer Motion |
| Client Console | Next.js 16 · TypeScript · Radix UI · Recharts · Nivo |
| Mobile + Desktop | Flutter 3 (Android · iOS · macOS · Windows · Linux) |
| Backend API | Django 5 · DRF · Python 3.12 |
| AI Engine | Gemini 1.5 Flash/Pro (swappable → Ollama / vLLM) |
| Auth | Firebase Auth · JWT · TOTP MFA · WebAuthn |
| Database | PostgreSQL 16 · diskcache · Google Cloud Storage |
| Hosting | Netlify (web) · Vercel (console) · Google Cloud Run (API) |
| CDN / Security | Cloudflare WAF · DDoS · TLS 1.3 |

---

## Documentation

All module documentation is in `/docs/`:

- [Platform Architecture](./docs/nexara_platform_architecture.md)
- [Inspector — Compliance Monitor](./docs/inspector_compliance_monitor.md)
- [Veritas — KYB Onboarding](./docs/veritas_client_kyb_onboarding.md)
- [All Agent Docs](./docs/)

---

## Roadmap

- **Phase 0** (Weeks 1–4): Django API scaffold · Inspector · Veritas KYB
- **Phase 1** (Weeks 5–12): Console dashboard · Concierge + Serea live · First clients
- **Phase 2** (Weeks 13–24): 6 core agents · Flutter app (Android + iOS)
- **Phase 3** (Weeks 25–48): 30+ agents · Desktop apps · White-label · Enterprise

---

## License

Proprietary — NeurolinkIT © 2026. All rights reserved.
