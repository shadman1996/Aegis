# Developer Kit — Nexara Platform
# Bengal Bound Ltd | v1.0

---

## 1. Day 1 Setup

### Install (in order)
```
1. Git 2.45+        → git-scm.com
2. Python 3.12      → python.org
3. Node.js 20 LTS   → nodejs.org (use nvm)
4. Flutter 3.22+    → flutter.dev
5. Docker Desktop   → docker.com
6. VS Code          → code.visualstudio.com
```

### VS Code Extensions (Required)
`Python` · `Pylance` · `Ruff` · `Black Formatter` · `ESLint` · `Prettier` · `Flutter` · `Dart` · `GitLens` · `Thunder Client` · `Tailwind CSS IntelliSense`

### Clone & Run
```bash
git clone https://github.com/bengalbound/nexara-platform.git
cd nexara-platform

# API
cd api && python -m venv .venv && .venv\Scripts\activate
pip install -r requirements.txt && cp .env.example .env
python manage.py migrate && python manage.py runserver
# → http://localhost:8000

# Web (Marketing)
cd .. && npm install && npm run dev
# → http://localhost:3000
```

---

## 2. Git Workflow

### Branch Names
```
feature/NEXARA-123-concierge-whatsapp
fix/NEXARA-456-inspector-timeout
hotfix/NEXARA-999-auth-critical
```

### Commit Format (REQUIRED — Conventional Commits)
```
feat: add WhatsApp webhook for Concierge
fix: Inspector timeout causing false blocks
chore: update Gemini SDK to 0.7.2
test: add Inspector compliance unit tests
```

### Rules
- ❌ Never push to `main` directly
- ✅ PR requires 2 approvals + CI pass
- ✅ Include Linear ticket ID in PR description
- ✅ Tests required for all new features

---

## 3. Coding Standards

### Python
```python
# ✅ Type hints everywhere
def check_compliance(action: AgentAction, client_id: str) -> ComplianceResult: ...

# ✅ Filter ALL queries by client_id (row-level security)
agents = Agent.objects.filter(client_id=request.user.client_id)

# ❌ Never: secrets in code, print() statements, raw SQL
# ✅ Always: logging.getLogger(__name__), ORM queries, Secret Manager
```

### TypeScript
```typescript
// ✅ Typed props + React Query for all API calls
const { data } = useQuery({ queryKey: ['agents'], queryFn: api.getAgents });
// ✅ Skeleton loading (not spinners), error boundaries on all pages
// ✅ Mobile-first (test at 375px width first)
```

### Flutter
```dart
// ✅ Riverpod for state, haptic feedback on every tap
HapticFeedback.lightImpact(); // before every onTap action
// ✅ Handle all 3 states: data / loading (skeleton) / error (retry button)
// ✅ Min 48px touch targets everywhere
```

---

## 4. Agent Development Rules

Every agent MUST:
1. ✅ Call Inspector BEFORE any external-system action
2. ✅ Filter all DB queries by `client_id`
3. ✅ Use AI Engine abstraction (never call Gemini/OpenAI directly)
4. ✅ Send user notification on key events
5. ✅ Respect subscription tier limits
6. ✅ Include tests for the "Inspector blocks this" scenario

### New Agent Folder Structure
```
api/agents/your_agent/
├── models.py          ← Config, Session, Log models
├── services.py        ← Main AI logic
├── tasks.py           ← Scheduled jobs
├── views.py           ← API endpoints
├── inspector_rules.py ← Agent-specific compliance rules
├── notifications.py   ← User notification triggers
└── tests/
    ├── test_services.py
    └── test_inspector.py
```

---

## 5. CRM Module Integration

The modular CRM (separate project) maps to agents:

| CRM Module | AI Agent |
|---|---|
| `crm/`, `leads/` | Crux, Lead Hunter, Concierge |
| `email_marketing/` | Iris, Serea |
| `hr/`, `recruitment/`, `payroll/` | Hera, Tempo |
| `accounting/`, `invoicing/`, `expense/` | Finn, Cash, Sage |
| `inventory/`, `delivery/`, `bom/` | Payload, Flux, Merch |
| `reports/`, `ai_analytics/` | Reporting Bot, Nova, Mira |
| `task_board/` | Atlas |
| `quality_control/` | Inspector |
| `booking/` | Concierge, MediBook |
| `contracts/`, `documents/` | Sage, Dox |

Integration via internal REST API only — never expose CRM publicly.

---

## 6. Testing

```bash
# Django
pytest --cov=. --cov-report=html    # Run all + coverage

# Flutter
flutter test                         # All widget tests
```

**Minimum coverage:** 80% overall · 95% for Inspector + Auth

---

## 7. Environment Variables

Get `.env` values from CTO via 1Password. Never commit `.env`.
Key vars: `DJANGO_SECRET_KEY`, `GEMINI_API_KEY`, `FIREBASE_CREDENTIALS_JSON`, `DATABASE_URL`

Dev default: `AI_PROVIDER=gemini`, `DATABASE_URL=sqlite:///db.sqlite3`

---

*Questions → Slack #engineering | Bengal Bound Dev Kit v1.0*
