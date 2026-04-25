# Bengal Bound OS — Internal AI Command Center
# For Bengal Bound Employees ONLY
**Version:** 1.0 | Classification: Internal — Confidential
**Access:** Bengal Bound employees only (company email @bengalbound.com required)

---

## What Is Bengal Bound OS?

Bengal Bound OS is the **internal version of Nexara** — used by the Bengal Bound team
to run their own business. It is:

- **Free** for all Bengal Bound employees (unlimited access, all agents)
- The **CEO's personal command centre** — ask any AI to do any task
- The **testing ground** — we use our own product = we know every bug
- The **proof of concept** — we show clients a company actually run by Nexara AI

> *"We don't just sell AI employees. We use them ourselves. Every day."*

---

## CEO Personal Dashboard

The CEO gets a dedicated AI command centre with:

### CEO AI Assistant (Always Available)
```
CEO types: "Nexara, what are our key metrics this week?"
→ AI pulls: MRR, active clients, inspector violations, agent uptime,
            new signups, churn, team tasks completed

CEO types: "Ask Hera to review all open job applications today"
→ Hera activated → screens CVs → presents shortlist to CEO by EOD

CEO types: "Get Finn to prepare this month's P&L summary"
→ Finn pulls from accounting module → generates report → CEO receives it

CEO types: "Tell Iris to send a personalised check-in email to all 50 clients"
→ Iris generates personalised emails → Inspector approves → sent
```

### CEO Dashboard Widgets
```
┌─────────────────────────────────────────────────────────────────┐
│  BENGAL BOUND OS — CEO VIEW                                     │
│                                                                  │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐          │
│  │ MRR          │  │ Active       │  │ Team Tasks   │          │
│  │ $12,450      │  │ Clients: 87  │  │ 34 open      │          │
│  │ ↑ 12% MoM   │  │ ↑ 9 new     │  │ 12 due today │          │
│  └──────────────┘  └──────────────┘  └──────────────┘          │
│                                                                  │
│  ┌──────────────────────────────────────────────────────┐       │
│  │  Ask Nexara anything...                              │       │
│  │  "What should I focus on today?"                    │       │
│  └──────────────────────────────────────────────────────┘       │
│                                                                  │
│  TODAY'S AI BRIEFING (from Nova):                               │
│  • 3 client approvals pending — review by 2pm                   │
│  • Serea flagged a social media crisis for Client XYZ           │
│  • Finn: Invoice #456 overdue 30 days — follow up?             │
│  • Hera: 2 new CVs for Senior Dev role — shortlisted           │
│  • Rex: 1 suspicious login attempt blocked at 3am               │
└─────────────────────────────────────────────────────────────────┘
```

---

## Employee AI Access (Bengal Bound Internal)

| Role | AI Agents Available | Access Level |
|---|---|---|
| **CEO** | ALL 30+ agents + full analytics | Admin |
| **CTO** | Kai, Rex, Atlas, Reporting Bot, Nova | Technical Admin |
| **Lead Dev** | Kai, Atlas, Shield, Dox | Developer |
| **Flutter Dev** | Kai, Atlas, Dox | Developer |
| **QA Engineer** | Atlas, Shield, Dox, Reporting Bot | QA |
| **Marketing** | Content Architect, Serea, Luma, Oracle, Pulse, Scout | Marketing |
| **Operations** | Finn, Hera, Tempo, Cash, Payload | Operations |
| **Support** | Concierge, Iris, Shield, Crux | Support |
| **HR** | Hera, Tempo, Cash, Sage | HR |
| **Finance** | Finn, Cash, Sage, Nova | Finance |

**How to get access:**
1. Join Bengal Bound → HR issues @bengalbound.com Google Workspace account
2. Sign into Bengal Bound OS with company Google account
3. Your role is set by CTO → appropriate agents unlocked automatically
4. No subscription fee — completely free for all employees

---

## Internal Agents in Action (Daily Operations)

### CEO + Concierge
- Every morning: Concierge summarises overnight WhatsApp enquiries
- "3 new leads came in. 2 qualified. 1 needs CEO callback."

### CEO + Nova (Data Scientist)
- Weekly: "Here's your business performance vs. last week + forecast"
- Monthly: "Revenue forecast for next 3 months based on growth trajectory"

### CTO + Kai (DevOps)
- Kai monitors GitHub Actions — alerts CTO on failed builds instantly
- "Build failed on nexara-api. Error: missing env variable. Fixed it automatically."

### Marketing Team + Content Architect
- "Write 3 LinkedIn posts for this week based on our latest blog article"
- "Suggest 10 keywords we should target for Bangladesh market SEO"

### HR + Hera
- "Here are the 5 most qualified CVs for the Flutter Dev role, ranked by our criteria"
- "Tomorrow's schedule: 3 interviews at 10am, 11am, 2pm. Calendar invites sent."

### Finance + Finn
- "Monthly payroll calculated. All employee salaries ready for bank transfer approval."
- "Q1 tax filing summary ready for your review."

### Ops + Atlas
- "Sprint 4 tasks: 12 completed, 3 in progress, 2 blocked. 2 engineers need unblocking."
- "Project timeline shows we'll miss launch by 3 days. Here are options to recover."

---

## Bengal Bound OS Architecture

```
@bengalbound.com Google account
      │
      ▼
Firebase Auth (Google Sign-In)
      │
      ▼
Bengal Bound OS Console
(Separate tenant on Nexara — client_id = bengalbound_internal)
      │
      ├── Inspector gate (still active — company policy enforced)
      ├── All 30+ agents available
      ├── No usage limits (internal tier = unlimited)
      ├── No billing (internal account = $0)
      │
      ▼
Same Nexara API → Same Django backend
(Agents treat Bengal Bound as any other client — but free)
```

---

## Internal Knowledge Base (Feeds All Agents)

Bengal Bound employees feed this knowledge base — agents use it:

```
bengalbound_internal/knowledge_base/
├── company_policies/          ← HR policies, code of conduct
├── product_documentation/     ← Nexara docs, agent specs
├── client_playbooks/          ← How to handle different client types
├── sales_scripts/             ← For Concierge + Iris to use
├── brand_guidelines/          ← Logo, colours, tone of voice
├── legal_templates/           ← TOS, NDA templates
├── financial_targets/         ← Budgets, targets (CEO only)
└── team_contacts/             ← Internal directory
```

---

## Why This Matters for Sales

When a potential client asks "Does this actually work?", the CEO can say:

> *"Yes. I run my entire company on Nexara. My HR, finance, marketing,
> operations — all AI-powered. Our marketing agent writes our content,
> our finance agent does our bookkeeping, our HR agent shortlists CVs.
> We are the proof of concept."*

This is the most powerful sales tool we have.
**We are Nexara's most important client.**

---

*Bengal Bound Ltd — Internal OS Spec v1.0*
*Every Bengal Bound employee is both a Nexara user and a Nexara builder.*
