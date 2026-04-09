# Module Requirements: Hera — AI HR & Recruitment Manager
# Bengal Bound Integration

> **Prepared for:** Bengal Bound
> **Prepared by:** [Your Name / Company]
> **Date:** April 9, 2026
> **Version:** 1.0

> 🔧 **Backend:** Django + DRF — `hera` app
> 🤖 **AI Engine:** Google Gemini 1.5 Flash — CV screening, JD generation, interview question sets
> 🔗 **Integrations:** Gmail/Outlook (email), Google Calendar, LinkedIn Jobs API, WhatsApp Business
> ☁️ **Hosting:** Google Cloud Run
> 💳 **Billing:** Subscription tiers via NowPayments / Stripe

---

## Page 1 — Overview

### Section 1: Product Overview

**Module Name:** Bengal Bound — Hera HR & Recruitment Module
**AI Employee Name:** Hera
**Department:** Human Resources
**Target Clients:** SMEs, agencies, startups, and enterprises that hire regularly but can't afford a full-time HR team or dedicated recruitment software.

**Core Function:** Hera manages the entire recruitment lifecycle — from job description generation to CV screening, interview scheduling, offer letter drafting, and new hire onboarding checklists — all autonomously, with human approval gates at key decision points.

**The One-Line Value Prop:** *"Post a job today. Have 5 qualified candidates shortlisted by morning."*

**Monthly Cost:**
| | Human HR/Recruiter | Hera AI |
|---|---|---|
| Monthly Cost | ৳25,000–৳45,000 | ৳2,000 |
| CVs Screened/Day | 20–30 | 500+ |
| Interview Scheduling | 2–4 hrs/hire | 2 mins/hire |
| Offer Letter | 30 mins | 30 seconds |

---

### Section 2: Core Capabilities

**Capability 1 — Job Description Generator:**
- Client inputs: role, seniority, key skills, budget
- Gemini generates SEO-optimized JD in brand voice
- Posted automatically to LinkedIn Jobs (via API), Bdjobs, and client career page

**Capability 2 — CV Screening & Scoring:**
- Inbound CVs (email or upload) parsed and scored against JD requirements
- Gemini extracts: skills match, experience years, education, red flags
- Score 0–100 per candidate — only 70+ shortlisted (threshold configurable)
- Rejection emails drafted and sent automatically to below-threshold applicants

**Capability 3 — Interview Scheduling:**
- Shortlisted candidates receive automated email with Calendly-style scheduling link
- Interview booked directly into interviewer's Google Calendar
- Reminder emails sent 24 hrs and 1 hr before interview
- Post-interview feedback form sent to interviewer automatically

**Capability 4 — Offer Letter & Onboarding:**
- Gemini drafts personalized offer letters based on role + package parameters
- Offer sent via email with digital signature link (DocuSign or internal)
- On acceptance: onboarding checklist generated (IT setup, docs, introductions)
- Day-1 welcome email and equipment checklist sent to new hire

---

## Page 2 — Django Models & API

### Section 3: Django Data Models

```python
class JobOpening(models.Model):
    STATUS = [('draft','Draft'),('active','Active'),('closed','Closed'),('on_hold','On Hold')]
    client          = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    title           = models.CharField(max_length=300)
    department      = models.CharField(max_length=100)
    seniority       = models.CharField(max_length=50)
    location        = models.CharField(max_length=200)
    salary_range    = models.CharField(max_length=100)
    required_skills = models.JSONField()
    job_description = models.TextField()     # AI-generated
    status          = models.CharField(max_length=20, choices=STATUS, default='draft')
    posted_at       = models.DateTimeField(null=True)
    linkedin_job_id = models.CharField(max_length=100, blank=True)
    applications    = models.IntegerField(default=0)
    created_at      = models.DateTimeField(auto_now_add=True)

class Candidate(models.Model):
    STATUS = [('applied','Applied'),('screened','AI Screened'),
              ('shortlisted','Shortlisted'),('interviewing','Interviewing'),
              ('offered','Offered'),('hired','Hired'),('rejected','Rejected')]
    job_opening     = models.ForeignKey(JobOpening, on_delete=models.CASCADE)
    name            = models.CharField(max_length=200)
    email           = models.EmailField()
    phone           = models.CharField(max_length=30, blank=True)
    linkedin_url    = models.URLField(blank=True)
    cv_file         = models.FileField(upload_to='cvs/')
    ai_score        = models.IntegerField(null=True)      # 0–100
    ai_summary      = models.TextField(blank=True)        # Gemini CV summary
    skills_matched  = models.JSONField(default=list)
    skills_missing  = models.JSONField(default=list)
    red_flags       = models.TextField(blank=True)
    status          = models.CharField(max_length=20, choices=STATUS, default='applied')
    applied_at      = models.DateTimeField(auto_now_add=True)

class Interview(models.Model):
    candidate       = models.ForeignKey(Candidate, on_delete=models.CASCADE)
    interviewer     = models.CharField(max_length=200)
    scheduled_at    = models.DateTimeField()
    calendar_event  = models.CharField(max_length=200, blank=True)  # Google Calendar ID
    meeting_link    = models.URLField(blank=True)
    feedback_score  = models.IntegerField(null=True)    # 1–5
    feedback_notes  = models.TextField(blank=True)
    outcome         = models.CharField(max_length=20, blank=True)   # 'proceed','reject'

class OfferLetter(models.Model):
    candidate       = models.ForeignKey(Candidate, on_delete=models.CASCADE)
    content         = models.TextField()                # AI-generated offer letter
    salary          = models.CharField(max_length=100)
    start_date      = models.DateField()
    sent_at         = models.DateTimeField(null=True)
    signed_at       = models.DateTimeField(null=True)
    accepted        = models.BooleanField(null=True)
```

---

### Section 4: DRF API Endpoints

All endpoints under `/api/v1/hera/`

| Method | Endpoint | Action |
|---|---|---|
| `GET/POST` | `/jobs/` | Manage job openings |
| `POST` | `/jobs/{id}/generate-jd/` | AI-generate job description |
| `POST` | `/jobs/{id}/post/` | Post to LinkedIn + Bdjobs |
| `GET` | `/candidates/` | List candidates (filterable by job, status, score) |
| `GET` | `/candidates/{id}/` | Candidate detail + AI screening summary |
| `PATCH` | `/candidates/{id}/status/` | Update status (shortlist/reject) |
| `POST` | `/candidates/{id}/schedule-interview/` | Schedule interview |
| `POST` | `/candidates/{id}/send-offer/` | Generate + send offer letter |
| `GET` | `/interviews/` | List all scheduled interviews |
| `PATCH` | `/interviews/{id}/feedback/` | Submit post-interview feedback |
| `GET` | `/analytics/` | Hiring funnel, time-to-hire, offer acceptance rate |

---

## Page 3 — Technical Stack & Delivery

### Section 5: Technical Stack

| Layer | Technology | Cost |
|---|---|---|
| **AI Engine** | Google Gemini 1.5 Flash | ✅ FREE |
| **CV Parsing** | `pdfplumber` + `python-docx` | ✅ FREE |
| **Email** | Gmail SMTP | ✅ FREE |
| **Calendar** | Google Calendar API | ✅ FREE |
| **LinkedIn Jobs** | LinkedIn Job Posting API | 💲 Partner approval needed |
| **E-Signature** | DocuSign API (or self-built) | 💲 $25/mo starter |
| **Task Queue** | `django-apscheduler` | ✅ FREE |

**Key Python Packages:**
```
pip install djangorestframework
pip install google-generativeai
pip install pdfplumber                # CV PDF parsing
pip install python-docx               # CV Word doc parsing
pip install google-auth               # Google Calendar OAuth
pip install google-api-python-client  # Google Calendar API
```

---

### Section 6: Phased Delivery

| Phase | Scope | Timeline |
|---|---|---|
| **Phase 1** | JD generation, CV upload + AI scoring, shortlist email, manual interview scheduling, offer letter draft | Weeks 1–6 |
| **Phase 2** | Google Calendar integration, automated scheduling, LinkedIn job posting, rejection emails, feedback forms | Weeks 7–12 |
| **Phase 3** | DocuSign integration, onboarding checklist, hiring analytics dashboard, Slack notifications | Weeks 13–18 |

---

### Section 7: Pricing Tiers

| Tier | Monthly | Active Jobs | CVs/mo | Features |
|---|---|---|---|---|
| **Intern** | Free | 1 | 20 | AI screening only |
| **Entry** | ৳2,000 | 3 | 100 | + Scheduling, offer letters |
| **Mid** | ৳5,000 | 10 | 500 | + LinkedIn posting, analytics |
| **Senior** | ৳10,000 | Unlimited | Unlimited | + Onboarding, white-label |

---

*Prepared by:* [Your Name], CEO · Bengal Bound / NeurolinkIT
