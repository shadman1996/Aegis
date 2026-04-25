# CTO Action Plan & Technical Roadmap
# Bengal Bound Ltd — Nexara Platform
**Owner:** CTO
**Target:** September 2026 Bangladesh Launch

---

## CTO Immediate Priorities (First 30 Days)

### Week 1 — Architecture Lock-in
- [ ] **Review and sign off** on `docs/nexara_platform_architecture.md`
- [ ] **Confirm tech stack** — no changes after this point without full team review
- [ ] **Set up GitHub organisation** — create `bengalbound` org → invite all devs
- [ ] **Create branch protection rules** on `main`:
  - Require 2 PR approvals
  - Require CI to pass before merge
  - No force push on main
  - Auto-delete merged branches
- [ ] **Set up Linear.app** for sprint management
  - Create teams: Backend, Frontend, Flutter, QA, DevOps
  - Import WBS tasks from `docs/NEXARA_WBS_MANHOURS.md`
- [ ] **Set up Slack workspace** — channels:
  - `#general`, `#engineering`, `#deployments`, `#alerts-security`, `#alerts-inspector`, `#random`
- [ ] **Define coding standards** — enforce via CI:
  - Python: Black + Ruff (zero warnings policy)
  - TypeScript: ESLint + Prettier
  - Flutter: `flutter_lints` + custom lint rules
  - Commit format: Conventional Commits (`feat:`, `fix:`, `chore:`, etc.)

### Week 2 — Infrastructure Setup
- [ ] **Google Cloud project** (`nexara-prod` + `nexara-dev`)
  - Enable: Cloud Run, Cloud SQL, Cloud Storage, Secret Manager, Cloud Build
  - Set up IAM: each dev gets least-privilege service account
- [ ] **Set up Secret Manager** — all secrets stored here, zero in code
  - `GEMINI_API_KEY`, `DJANGO_SECRET_KEY`, `FIREBASE_CREDENTIALS`, etc.
- [ ] **Set up Cloudflare** — WAF rules, DDoS protection, SSL
- [ ] **Set up Sentry** — error monitoring for API + Console + Flutter
- [ ] **Set up Uptime monitoring** — Better Uptime or UptimeRobot
  - Monitor: API health, Inspector endpoint, Console
  - Alert to Slack #alerts-deployments
- [ ] **Set up PagerDuty** — on-call rotation for critical alerts
  - Page CTO for: Inspector down, security breach, database failure

### Week 3 — Development Environment Standards
- [ ] **Create `dev/DEV_KIT.md`** (see separate file) — distributed to all devs
- [ ] **Create `.env.example`** files for API, Console, Web
- [ ] **Set up pre-commit hooks** (husky for JS, pre-commit for Python):
  - Auto-format on save
  - Block commits with secrets (detect-secrets)
  - Block `console.log` / `print` statements in production code
- [ ] **Set up Dependabot** (GitHub) — weekly dependency updates
- [ ] **Set up Trivy** (Docker image scanning in CI)
- [ ] **Set up CodeQL** (GitHub Advanced Security — free for public repos)

### Week 4 — Phase 0 Development Start
- [ ] **Sprint planning** — assign Phase 0 tasks from WBS
- [ ] **Daily stand-ups** — 15 min at 10am
- [ ] **Weekly retrospectives** — Friday 4pm (30 min)
- [ ] **Architecture decision records (ADRs)** — document all major decisions in `docs/adr/`

---

## CTO Technical Decision Register

| Decision | Choice | Rationale | Decided |
|---|---|---|---|
| Backend framework | Django 5 + DRF | Team expertise, batteries-included, ORM | April 2026 |
| AI provider | Gemini 1.5 Flash (primary) | Cost-efficient, best-in-class for BD market | April 2026 |
| AI abstraction | Custom `AIProvider` interface | Swap to Ollama/vLLM without code changes | April 2026 |
| Mobile | Flutter 3 | Single codebase for 5 platforms | April 2026 |
| Database | PostgreSQL 16 | Row-level security, JSONB, full-text search | April 2026 |
| Cache (Phase 0-2) | diskcache | No Redis server needed, $0 cost | April 2026 |
| Cache (Phase 3+) | Redis | When diskcache bottlenecks | TBD |
| Task queue (Phase 0-2) | django-apscheduler | No Celery overhead at small scale | April 2026 |
| Task queue (Phase 3+) | Celery + Cloud Tasks | When job volume demands it | TBD |
| Auth | Firebase Auth + JWT | Best cross-platform SDK, Google reliability | April 2026 |
| File storage | Google Cloud Storage | Cheap, reliable, integrates with Vision API | April 2026 |
| Hosting (API) | Cloud Run | Serverless, scales to zero, $0 idle cost | April 2026 |
| Hosting (Web) | Netlify | Free for static + Next.js | April 2026 |
| Hosting (Console) | Vercel | Free tier, best Next.js support | April 2026 |
| Monitoring | Sentry + Cloud Monitoring | Best-in-class error tracking | April 2026 |

---

## CRM Integration Architecture

The dev team is building a modular Django CRM. Here's how Nexara AI agents map to each CRM module:

```
CRM Module          ← AI Agent(s) That Power It
─────────────────────────────────────────────────────
crm/                ← Crux (CRM Manager), Lead Hunter
leads/              ← Lead Hunter, Concierge
email_marketing/    ← Iris (email), Serea (social)
ecommerce/          ← Merch (product listing), Flux (operations)
inventory/          ← Payload (procurement), Merch
invoicing/          ← Finn (finance), Cash
accounting/         ← Finn, Sage (compliance review)
payroll/            ← Hera (HR), Finn
hr/                 ← Hera
recruitment/        ← Hera
attendance/         ← Hera, Tempo (scheduling)
shift_planning/     ← Tempo
task_board/         ← Atlas (project management)
reports/            ← Reporting Bot, Nova (forecasting)
ai_analytics/       ← Nova, Mira (retention)
ai_assistant/       ← All agents (unified assistant interface)
booking/            ← Concierge, MediBook, Realt
contracts/          ← Sage (legal review), Dox
documents/          ← Dox (document management), Sage
budgeting/          ← Finn, Nova
expense/            ← Finn, Cash
quality_control/    ← Inspector (automated compliance checks)
loyalty/            ← Mira (customer retention)
training/           ← All agents' knowledge base content
website/            ← Content Architect, Oracle
announcements/      ← Pulse (news monitoring)
maintenance/        ← Rex (infrastructure monitoring), Kai (DevOps)
production/         ← Flux, Payload
delivery/           ← Flux (supply chain)
bom/                ← Payload (bill of materials)
order_mgmt/         ← Merch, Flux
pos/                ← Merch, Cash
table_mgmt/         ← Concierge (hospitality)
team_chat/          ← Inspector (monitors internal comms for compliance)
dashboard_pro/      ← All agents contribute real-time KPIs
```

**Integration approach:**
- CRM exposes internal REST API endpoints
- Nexara agents call CRM API via service account (not client API)
- Inspector gates all AI-initiated CRM writes
- CRM module data flows to Nexara analytics via read-only DB views

---

## Security Checklist (CTO Signs Off Before Launch)

- [ ] All secrets in Secret Manager (none in code or .env files committed)
- [ ] Django Admin restricted to: VPN/IP whitelist + MFA
- [ ] All API endpoints authenticated (no public unauthenticated endpoints except /health)
- [ ] Rate limiting active on all public endpoints
- [ ] HTTPS enforced everywhere (HSTS preload)
- [ ] Cloudflare WAF rules active
- [ ] Database: no direct public internet access (Cloud SQL Private IP only)
- [ ] Inspector fail-closed tested (returns 403 when unavailable)
- [ ] Audit log chain verified (SHA-256 integrity check passing)
- [ ] Penetration test completed (external vendor)
- [ ] Dependency CVE scan clean (Trivy + Dependabot)
- [ ] SSL certificates monitored (alert at 30 days expiry)
- [ ] PagerDuty on-call rotation active

---

## Monthly CTO Metrics Dashboard

Track these every sprint review:

| Metric | Target | Alert Threshold |
|---|---|---|
| API p95 latency | < 800ms | > 1200ms |
| Inspector gate latency | < 500ms | > 800ms |
| Error rate | < 0.1% | > 0.5% |
| Deployment frequency | Weekly | < Monthly |
| MTTR (Mean Time to Recovery) | < 2 hours | > 4 hours |
| Test coverage (API) | > 80% | < 60% |
| Dependabot PRs unresolved | < 7 days | > 14 days |
| Inspector uptime | 99.99% | < 99.9% |

---

*Bengal Bound Ltd — CTO Kit v1.0*
