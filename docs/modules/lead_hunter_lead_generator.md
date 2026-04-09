# Module Requirements: Lead Hunter — AI Lead Generator
# Bengal Bound Integration

> **Prepared for:** Bengal Bound
> **Prepared by:** [Your Name / Company]
> **Date:** April 9, 2026
> **Version:** 1.0 — Bengal Bound Edition

> 🔧 **Backend:** Django + DRF — `lead_hunter` app
> 🤖 **AI Engine:** Google Gemini 1.5 Flash — intent scoring, lead summarization, outreach drafting
> 🔗 **Integrations:** LinkedIn Sales Navigator API, Apollo.io API, Google Search API, HubSpot/Pipedrive CRM
> ☁️ **Hosting:** Google Cloud Run
> 💳 **Billing:** Subscription tiers via NowPayments / Stripe

---

## Page 1 — Overview & Core System

### Section 1: Product Overview

**Module Name:** Bengal Bound — Lead Hunter AI Lead Generation Module
**AI Employee Name:** Lead Hunter
**Department:** Sales
**Target Clients:** B2B service providers, digital marketing agencies, SaaS companies, consulting firms, and freelancers who need a consistent pipeline of qualified leads without manual prospecting.

**Core Function:** Lead Hunter monitors social signals, LinkedIn activity, web data, and job board postings to surface 20+ ready-to-buy B2B prospects daily — pre-qualified, enriched, and delivered directly to the client's CRM with outreach drafts ready to send.

**The One-Line Value Prop:** *"20 qualified B2B leads in your CRM every morning — before your sales team has had their first coffee."*

**Monthly Cost Comparison:**
| | Human Lead Generator | Lead Hunter AI |
|---|---|---|
| Monthly Cost | ৳25,000–৳40,000 | ৳2,000 |
| Leads Generated/Day | 5–10 (manual research) | 20+ (automated) |
| Qualification Accuracy | Variable | AI-scored intent signals |
| CRM Entry | Manual | Automatic |

---

### Section 2: Core Capabilities

```
┌─────────────────────────────────────────────────────────┐
│                LEAD HUNTER WORKFLOW                     │
│                                                         │
│  [Signal Sources] ──► Lead Hunter Monitoring Engine    │
│  LinkedIn / Apollo / Google / Job Boards               │
│                │                                        │
│    ┌───────────┼────────────────┐                      │
│    ▼           ▼                ▼                      │
│  Scrape    Intent Score    Enrich Profile              │
│  Signals   (Gemini AI)     (Company/Contact)          │
│    │           │                │                      │
│    ▼           ▼                ▼                      │
│  Filter    Priority        Draft Outreach              │
│  Quality   Ranking         Email/LinkedIn              │
│    │           │                │                      │
│    └───────────┴────────────────┘                      │
│                │                                        │
│          Push to CRM (HubSpot/Pipedrive)               │
└─────────────────────────────────────────────────────────┘
```

**Capability 1 — Signal Monitoring:**
- Track LinkedIn posts from target ICD (Ideal Customer Profile)
- Monitor job board postings (companies hiring = companies with budget)
- Track tech stack changes via BuiltWith/Wappalyzer signals
- Monitor funding announcements, expansions, new market entries

**Capability 2 — AI Intent Scoring:**
- Gemini scores each lead 0–100 for purchase intent
- Signals weighted: hiring activity, recent funding, tech stack, engagement, company size
- Configurable ICP filters: industry, size, geography, revenue
- Only leads scoring 70+ pushed to CRM (threshold configurable)

**Capability 3 — Profile Enrichment:**
- Company: name, size, industry, revenue estimate, LinkedIn URL, website
- Decision maker: name, title, email (via Apollo.io), LinkedIn profile
- Recent activity: posts, news mentions, funding events

**Capability 4 — Outreach Drafting:**
- Gemini drafts personalized LinkedIn messages and emails per lead
- Uses lead's recent activity as conversation opener
- Tone configurable per client (formal/casual/consultative)
- One-click send from the Bengal Bound console (human approval required)

---

## Page 2 — Django Models & API

### Section 3: Django Data Models

```python
class ICPProfile(models.Model):
    """Ideal Customer Profile configuration per client"""
    client          = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    name            = models.CharField(max_length=200)
    industries      = models.JSONField()          # ['SaaS', 'Agency', 'E-commerce']
    company_sizes   = models.JSONField()          # ['11-50', '51-200']
    geographies     = models.JSONField()          # ['US', 'UK', 'BD']
    min_revenue     = models.IntegerField(null=True, blank=True)
    intent_threshold = models.IntegerField(default=70)  # Min score to push to CRM
    is_active       = models.BooleanField(default=True)

class Lead(models.Model):
    """A discovered and enriched lead"""
    STATUS = [('new','New'),('contacted','Contacted'),('qualified','Qualified'),
              ('rejected','Rejected'),('converted','Converted')]
    client          = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    icp_profile     = models.ForeignKey(ICPProfile, on_delete=models.SET_NULL, null=True)
    company_name    = models.CharField(max_length=300)
    company_size    = models.CharField(max_length=50)
    industry        = models.CharField(max_length=100)
    website         = models.URLField(blank=True)
    linkedin_url    = models.URLField(blank=True)
    contact_name    = models.CharField(max_length=200)
    contact_title   = models.CharField(max_length=200)
    contact_email   = models.EmailField(blank=True)
    contact_linkedin = models.URLField(blank=True)
    intent_score    = models.IntegerField()       # 0–100
    trigger_signal  = models.TextField()          # What signal triggered this lead
    enrichment_data = models.JSONField(default=dict)
    status          = models.CharField(max_length=20, choices=STATUS, default='new')
    crm_id          = models.CharField(max_length=200, blank=True)  # HubSpot/Pipedrive ID
    discovered_at   = models.DateTimeField(auto_now_add=True)

class OutreachDraft(models.Model):
    """AI-generated outreach message for a lead"""
    CHANNELS = [('email','Email'),('linkedin','LinkedIn DM'),('whatsapp','WhatsApp')]
    lead        = models.ForeignKey(Lead, on_delete=models.CASCADE)
    channel     = models.CharField(max_length=20, choices=CHANNELS)
    subject     = models.CharField(max_length=300, blank=True)
    body        = models.TextField()
    sent        = models.BooleanField(default=False)
    sent_at     = models.DateTimeField(null=True, blank=True)
    opened      = models.BooleanField(default=False)
    replied     = models.BooleanField(default=False)
    generated_at = models.DateTimeField(auto_now_add=True)
```

---

### Section 4: DRF API Endpoints

All endpoints under `/api/v1/lead-hunter/`

| Method | Endpoint | Action |
|---|---|---|
| `GET/POST` | `/icp/` | Manage ICP profiles |
| `GET` | `/leads/` | List all leads (filter by status, score, date) |
| `GET` | `/leads/{id}/` | Lead detail with enrichment data |
| `PATCH` | `/leads/{id}/status/` | Update lead status |
| `POST` | `/leads/{id}/push-to-crm/` | Manually push lead to CRM |
| `GET` | `/leads/{id}/outreach/` | View AI outreach drafts for lead |
| `POST` | `/leads/{id}/outreach/send/` | Send outreach (human approval) |
| `GET` | `/analytics/` | Daily lead counts, intent score distribution, conversion rates |
| `POST` | `/scan/trigger/` | Manually trigger a lead scan now |

---

## Page 3 — Technical Stack & Phased Delivery

### Section 5: Technical Stack

| Layer | Technology | Cost |
|---|---|---|
| **Backend** | Django + DRF — `lead_hunter` app | ✅ FREE |
| **AI Engine** | Google Gemini 1.5 Flash | ✅ FREE tier |
| **LinkedIn Data** | Apollo.io API (contact enrichment) | 💲 $49/mo starter |
| **Email Finder** | Hunter.io API or Apollo | 💲 $49/mo |
| **Task Queue** | `django-apscheduler` | ✅ FREE |
| **CRM Push** | HubSpot API (free CRM) or Pipedrive | ✅ HubSpot FREE |
| **Auth** | Firebase Authentication | ✅ FREE |
| **Hosting** | Google Cloud Run | ✅ FREE tier |
| **Email** | Gmail SMTP | ✅ FREE |

**Key Python Packages:**
```
pip install djangorestframework
pip install firebase-admin
pip install diskcache
pip install django-apscheduler
pip install google-generativeai
pip install requests                  # Apollo.io, HubSpot API calls
pip install hubspot-api-client        # HubSpot CRM integration
```

---

### Section 6: Phased Delivery

| Phase | Scope | Timeline |
|---|---|---|
| **Phase 1** | ICP profile setup, Apollo.io enrichment, intent scoring (Gemini), daily lead delivery to dashboard, CRM push (HubSpot), basic outreach drafts | Weeks 1–6 |
| **Phase 2** | LinkedIn signal monitoring, job board triggers, outreach tracking (open/reply), A/B outreach variants, Pipedrive integration | Weeks 7–14 |
| **Phase 3** | Automated send (with approval flow), multi-channel sequences (email → LinkedIn → WhatsApp), conversion analytics | Weeks 15–20 |

---

### Section 7: Pricing Tiers

| Tier | Monthly | Leads/Day | Features |
|---|---|---|---|
| **Intern** | Free | 3 leads | Dashboard only, no CRM push |
| **Entry** | ৳2,000 | 10 leads | CRM push, basic outreach drafts |
| **Mid** | ৳5,000 | 25 leads | Multi-channel outreach, intent scoring |
| **Senior** | ৳10,000 | 50+ leads | Full automation, conversion analytics, white-label |

---

*Prepared by:* [Your Name], CEO · Bengal Bound / NeurolinkIT
