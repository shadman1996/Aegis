# Module Requirements: Plex — AI Project Manager
# Bengal Bound Integration

> **Prepared for:** Bengal Bound | **Date:** April 9, 2026 | **Version:** 1.0
> 🔧 Django + DRF — `plex` app | 🤖 Gemini 1.5 Flash | ☁️ Google Cloud Run
> 🔗 Jira API, Notion API, Asana API, Slack Webhooks, Google Calendar

---

## Section 1: Overview

**AI Employee Name:** Plex | **Department:** Operations / Project Management
**Core Function:** Monitors tasks across Jira, Notion, and Asana; sends intelligent deadline alerts; auto-generates weekly status reports; identifies blockers before they delay delivery; and keeps the entire team synchronized without a human PM chasing updates.
**Value Prop:** *"Every project, on track. Every blocker caught before it's a crisis."*

| | Human PM | Plex AI |
|---|---|---|
| Monthly Cost | ৳35,000–৳55,000 | ৳2,000 |
| Status Updates | Manual (weekly) | Automated (daily) |
| Blocker Detection | Reactive | Proactive (AI risk scoring) |
| Reporting | Hours to prepare | Seconds |

---

## Section 2: Core Capabilities

1. **Multi-Tool Sync** — Connects to Jira, Notion, Asana, Trello, and Monday.com via APIs
2. **Deadline Intelligence** — AI analyzes task velocity and team capacity to predict deadline risk (on-track / at-risk / overdue)
3. **Automated Status Reports** — Daily standup summary + weekly project status report auto-generated and sent
4. **Blocker Detection** — Gemini identifies tasks with no updates for 48+ hrs, flagged dependencies, or velocity drops
5. **Task Assignment Suggestions** — Analyzes team workload and suggests who should own new tasks
6. **Client-Facing Progress Reports** — Generates branded project update emails for external clients
7. **Meeting Summarizer** — Paste meeting notes → Gemini extracts action items and assigns them

---

## Section 3: Django Models

```python
class ProjectIntegration(models.Model):
    TOOLS = [('jira','Jira'),('notion','Notion'),('asana','Asana'),
             ('trello','Trello'),('monday','Monday.com')]
    client           = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    tool             = models.CharField(max_length=20, choices=TOOLS)
    api_key          = models.TextField()           # Encrypted
    workspace_id     = models.CharField(max_length=200, blank=True)
    is_active        = models.BooleanField(default=True)
    last_synced      = models.DateTimeField(null=True)

class Project(models.Model):
    STATUS = [('active','Active'),('at_risk','At Risk'),('delayed','Delayed'),('completed','Completed')]
    client           = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    integration      = models.ForeignKey(ProjectIntegration, on_delete=models.SET_NULL, null=True)
    external_id      = models.CharField(max_length=200)
    name             = models.CharField(max_length=500)
    deadline         = models.DateField(null=True)
    status           = models.CharField(max_length=20, choices=STATUS, default='active')
    ai_risk_score    = models.IntegerField(null=True)   # 0–100
    last_updated     = models.DateTimeField(null=True)

class Task(models.Model):
    RISK = [('low','Low'),('medium','Medium'),('high','High'),('blocked','Blocked')]
    project          = models.ForeignKey(Project, on_delete=models.CASCADE)
    external_id      = models.CharField(max_length=200)
    title            = models.TextField()
    assignee         = models.CharField(max_length=200, blank=True)
    due_date         = models.DateField(null=True)
    completed        = models.BooleanField(default=False)
    days_stale       = models.IntegerField(default=0)
    risk_level       = models.CharField(max_length=20, choices=RISK, default='low')
    blocker_reason   = models.TextField(blank=True)

class WeeklyReport(models.Model):
    client           = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    week_start       = models.DateField()
    summary          = models.TextField()           # Gemini-generated
    completed_tasks  = models.IntegerField()
    at_risk_tasks    = models.IntegerField()
    blockers_logged  = models.IntegerField()
    pdf_file         = models.FileField(upload_to='reports/projects/', null=True)
    sent_at          = models.DateTimeField(null=True)
```

---

## Section 4: DRF API Endpoints (`/api/v1/plex/`)

| Method | Endpoint | Action |
|---|---|---|
| `GET/POST` | `/integrations/` | Connect project management tools |
| `GET` | `/projects/` | List all synced projects with risk scores |
| `GET` | `/projects/{id}/tasks/` | List tasks with blocker flags |
| `GET` | `/blockers/` | All current blockers across all projects |
| `GET` | `/reports/daily/` | Today's standup summary |
| `GET` | `/reports/weekly/` | Weekly status report (latest) |
| `POST` | `/reports/weekly/generate/` | Trigger weekly report generation |
| `POST` | `/meeting/summarize/` | Extract action items from meeting notes |
| `GET` | `/analytics/` | Velocity, on-time delivery rate, blocker frequency |

---

## Section 5: Technical Stack

| Layer | Technology | Cost |
|---|---|---|
| AI Engine | Google Gemini 1.5 Flash | ✅ FREE |
| Jira | Jira REST API (`jira` Python library) | ✅ FREE |
| Notion | Notion API (`notion-client`) | ✅ FREE |
| Asana | Asana API (`asana` Python library) | ✅ FREE |
| Slack Notifications | Slack Webhooks | ✅ FREE |
| PDF Reports | `reportlab` | ✅ FREE |
| Task Queue | `django-apscheduler` | ✅ FREE |

```
pip install google-generativeai jira notion-client asana reportlab django-apscheduler
```

---

## Section 6: Phased Delivery

| Phase | Scope | Timeline |
|---|---|---|
| Phase 1 | Jira + Asana sync, deadline risk scoring, daily standup email, blocker detection | Weeks 1–6 |
| Phase 2 | Notion integration, weekly PDF report, Slack notifications, meeting summarizer | Weeks 7–12 |
| Phase 3 | Trello + Monday.com, client-facing report generator, task assignment suggestions | Weeks 13–18 |

---

## Section 7: Pricing Tiers

| Tier | Monthly | Projects | Features |
|---|---|---|---|
| Intern | Free | 1 | Sync + dashboard only |
| Entry | ৳2,000 | 5 | Daily standup, blockers, alerts |
| Mid | ৳5,000 | 20 | Weekly reports, Slack, meeting summary |
| Senior | ৳10,000 | Unlimited | Client reports, analytics, all integrations |

---
*Bengal Bound / NeurolinkIT*
