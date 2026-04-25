# Modular CRM Platform — Requirements Specification
# Bengal Bound Ltd — Internal Operations System
# Nexara Integration Ready
**Version:** 1.0 | **Date:** April 2026

---

## Overview

The Modular CRM is Bengal Bound's internal business operating system — a Django-based platform with 35+ independent modules covering every business function. **Nexara AI agents will be embedded into this platform** as AI-powered co-workers that autonomously operate each module.

**Architecture principle:** Every module is a self-contained Django app. Nexara AI agents are additional Django apps that READ from and WRITE to CRM modules via the internal API bridge (never direct DB access from Nexara).

---

## Module Map & Nexara AI Integration

### GROUP 1: Customer & Sales
| Module | Purpose | Nexara Agent | AI Automation |
|---|---|---|---|
| `crm/` | Contact & pipeline management | **Crux** | Auto-update contacts, stage moves, follow-up reminders |
| `leads/` | Lead capture & scoring | **Lead Hunter** + **Concierge** | Auto-qualify, score, assign leads |
| `email_marketing/` | Campaign management | **Iris** + **Serea** | Generate campaigns, schedule, personalise at scale |
| `loyalty/` | Customer retention & points | **Mira** | Churn prediction, re-engagement triggers |
| `ecommerce/` | Online store management | **Merch** | Product listings, price optimisation, stock alerts |

### GROUP 2: Finance & Accounting
| Module | Purpose | Nexara Agent | AI Automation |
|---|---|---|---|
| `accounting/` | Chart of accounts, P&L | **Finn** + **Sage** | Auto-categorise transactions, flag anomalies |
| `invoicing/` | Invoice generation & tracking | **Finn** | Auto-generate, send, chase overdue invoices |
| `expense/` | Expense claims & approvals | **Finn** + **Cash** | OCR receipts, auto-categorise, flag policy violations |
| `budgeting/` | Budget planning & monitoring | **Finn** + **Nova** | Variance alerts, forecast adjustments |
| `payroll/` | Salary processing | **Hera** + **Finn** | Payslip generation, tax calculations, bank file export |

### GROUP 3: Human Resources
| Module | Purpose | Nexara Agent | AI Automation |
|---|---|---|---|
| `hr/` | Employee records & profiles | **Hera** | Onboarding checklists, policy distribution |
| `recruitment/` | Job posts, CVs, interviews | **Hera** | CV screening, shortlisting, interview scheduling |
| `attendance/` | Time tracking & leave | **Hera** + **Tempo** | Anomaly detection, leave approval routing |
| `shift_planning/` | Roster & shift management | **Tempo** | Auto-generate rosters, conflict detection |
| `training/` | Learning & development | All agents | Knowledge base content for each module |

### GROUP 4: Operations & Supply Chain
| Module | Purpose | Nexara Agent | AI Automation |
|---|---|---|---|
| `inventory/` | Stock levels & locations | **Payload** + **Merch** | Reorder alerts, dead stock flagging |
| `bom/` | Bill of Materials | **Payload** | Component cost analysis, supplier comparison |
| `delivery/` | Shipment & logistics | **Flux** | Route optimisation, ETA tracking, delay alerts |
| `order_mgmt/` | Order processing | **Merch** + **Flux** | Auto-process, fulfil, update customers |
| `production/` | Manufacturing tracking | **Flux** + **Payload** | Bottleneck detection, capacity planning |
| `maintenance/` | Asset maintenance | **Rex** + **Kai** | Predictive maintenance alerts, ticket creation |

### GROUP 5: Projects & Collaboration
| Module | Purpose | Nexara Agent | AI Automation |
|---|---|---|---|
| `task_board/` | Kanban task management | **Atlas** | Task assignment, deadline tracking, progress reports |
| `team_chat/` | Internal messaging | Inspector (monitoring) | Flag policy violations in comms |
| `announcements/` | Company news & updates | **Pulse** | Curate external news, internal announcement drafts |
| `documents/` | Document management | **Dox** | Auto-tag, summarise, version control |
| `contracts/` | Contract lifecycle | **Sage** + **Dox** | AI review, risk flags, expiry alerts |

### GROUP 6: Analytics & Intelligence
| Module | Purpose | Nexara Agent | AI Automation |
|---|---|---|---|
| `reports/` | Custom report builder | **Reporting Bot** | Auto-generate weekly/monthly reports |
| `ai_analytics/` | AI-powered insights | **Nova** + **Mira** | Predictive analytics, anomaly detection |
| `dashboard_pro/` | Executive dashboards | All agents | Real-time KPI feeds from all modules |

### GROUP 7: Quality & Compliance
| Module | Purpose | Nexara Agent | AI Automation |
|---|---|---|---|
| `quality_control/` | QC checks & non-conformances | **Inspector** | Automated compliance verification |

### GROUP 8: Other
| Module | Purpose | Nexara Agent | AI Automation |
|---|---|---|---|
| `booking/` | Appointment scheduling | **Concierge** + **MediBook** | AI booking, calendar management |
| `pos/` | Point of sale | **Merch** + **Cash** | Transaction processing, till reconciliation |
| `table_mgmt/` | Restaurant/hospitality tables | **Concierge** | Reservation management |
| `website/` | CMS & web presence | **Content Architect** + **Oracle** | Content generation, SEO |

---

## Module Requirements (Standard Template)

Each module MUST implement:

### Data Layer
```python
# Every module model MUST have:
class ModuleRecord(models.Model):
    client_id = models.ForeignKey('core.Client', on_delete=models.CASCADE)
    created_by = models.ForeignKey('core.User', ...)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    is_active = models.BooleanField(default=True)

    class Meta:
        # Row-level security enforced at QuerySet level
        indexes = [models.Index(fields=['client_id'])]
```

### API Layer
```
GET    /api/v1/{module}/                 List (filtered by client_id)
POST   /api/v1/{module}/                 Create
GET    /api/v1/{module}/{id}/            Detail
PATCH  /api/v1/{module}/{id}/            Update
DELETE /api/v1/{module}/{id}/            Soft delete (is_active=False)
GET    /api/v1/{module}/analytics/       Module KPI summary
```

### Nexara Integration Points
```python
# Every module exposes these for AI agent integration:
class ModuleNexaraInterface:
    def get_ai_context(self, client_id: str) -> dict:
        """Returns relevant module data for AI agent context window"""

    def apply_ai_action(self, action: AgentAction, client_id: str) -> dict:
        """Entry point for Nexara agent writes — goes through Inspector"""

    def get_kpi_summary(self, client_id: str, period: str) -> dict:
        """Returns module KPIs for dashboard_pro and Reporting Bot"""
```

---

## CRM ↔ Nexara Integration Architecture

```
NEXARA (ai.bengalbound.com)
    │
    │  Internal API Bridge (private network)
    │  Bearer token auth (service account)
    │  All writes pass Inspector first
    │
    ▼
CRM PLATFORM (crm.bengalbound.com)
    │
    ├── /api/internal/crm/
    ├── /api/internal/leads/
    ├── /api/internal/hr/
    └── ... (all modules)
```

**Client onboarding via CRM:**
1. Client signs up on nexara.io → Veritas KYB
2. On approval → Client record created in CRM (`crm/` module)
3. Nexara agents linked to client's CRM workspace
4. All agent actions visible in CRM dashboard_pro

---

## Non-Functional Requirements (CRM)

| Requirement | Target |
|---|---|
| Page load time | < 2 seconds |
| API response time | < 500ms |
| Concurrent users per client | Up to 50 |
| Data isolation | Per-client row-level security |
| Backup frequency | Daily automated |
| Audit trail | All CRM writes logged |
| Mobile responsive | Yes (same breakpoints as Nexara) |
| Dark mode | Supported |

---

## Tech Stack (CRM Platform)

| Layer | Technology |
|---|---|
| Framework | Django 5 + DRF |
| Database | PostgreSQL 16 |
| Frontend | Next.js / React (or Django Templates for rapid modules) |
| Auth | Firebase Auth (same as Nexara — unified SSO) |
| Hosting | Google Cloud Run |
| File storage | Google Cloud Storage |
| Real-time | Django Channels / SSE |
| Charts | Recharts / Nivo |

---

*Bengal Bound Ltd — CRM Platform Requirements v1.0*
