# Module Requirements: Serea — AI Social Media Moderator
# Bengal Bound Integration

> **Prepared for:** Bengal Bound
> **Prepared by:** [Your Name / Company]
> **Date:** April 9, 2026
> **Version:** 1.0 — Bengal Bound Edition

> ⚠️ **Integration Note:** Serea is a Django app (`serea`) inside the Bengal Bound platform. It is **not** a standalone product. All auth, billing, and storage use existing Bengal Bound infrastructure.
>
> 🔑 **Authentication:** Firebase Authentication — Email/Password + Google Sign-In via `firebase-admin` DRF backend
> 💾 **Cache:** `diskcache` (replaces Redis — free, SQLite-backed)
> 🔧 **Backend:** Django + Django REST Framework — new `serea` app
> 🤖 **AI Engine:** Google Gemini 1.5 Flash — content moderation, sentiment analysis, response drafting
> 🔗 **Integrations:** Meta Graph API (Facebook/Instagram), Twitter/X API v2, WhatsApp Business API
> ☁️ **Hosting:** Google Cloud Run
> 💳 **Billing:** NowPayments (global crypto/fiat) + Stripe — subscription tiers

---

## Page 1 — Overview & Core System

### Section 1: Product Overview

**Module Name:** Bengal Bound — Serea Social Media Moderation Module
**AI Employee Name:** Serea
**Department:** Community & Brand Management
**Target Clients:** Digital marketing agencies, e-commerce brands, SaaS companies, media publishers, and any business with active social media communities.

**Core Function:** Serea is an autonomous AI social media moderator that monitors all connected social channels in real time — filtering harmful content, engaging with comments, routing support queries, and detecting sentiment crises before they escalate.

**The One-Line Value Prop:** *"Your brand never sleeps, never snaps, and never misses a crisis — Serea handles it."*

**Monthly Cost Comparison:**
| | Human Social Media Manager | Serea AI |
|---|---|---|
| Monthly Cost | ৳15,000–৳30,000 | ৳2,000 |
| Availability | 40 hrs/week | 168 hrs/week (24/7) |
| Response Time | Hours | Seconds |
| Consistency | Variable | 100% brand-consistent |

---

### Section 2: Core Capabilities

```
┌─────────────────────────────────────────────────────┐
│                  SEREA WORKFLOW                     │
│                                                     │
│  [Social Post/Comment] ──► Serea Monitoring Layer  │
│                │                                   │
│    ┌───────────┼───────────────┐                   │
│    ▼           ▼               ▼                   │
│  Filter    Auto-Reply     Crisis Alert              │
│  Harmful   Positive       (Escalate to             │
│  Content   Comments       Admin)                   │
│    │           │               │                   │
│    ▼           ▼               ▼                   │
│  Hide/Delete  Published  Notification              │
│  + Log        Response   + Dashboard               │
└─────────────────────────────────────────────────────┘
```

**Capability 1 — Content Moderation:**
- Detect and hide/delete: hate speech, spam, offensive language, competitor mentions (configurable)
- Custom keyword blocklist per client brand
- Confidence scoring — only auto-action above threshold (default: 90%)
- Borderline content flagged for human review queue

**Capability 2 — Community Engagement:**
- Auto-reply to positive comments with brand-voice responses
- FAQs answered automatically from client knowledge base
- Product question routing to support channel
- Contest and giveaway comment tracking

**Capability 3 — Sentiment Crisis Monitoring:**
- Real-time sentiment scoring across all posts and comments
- Alert thresholds: Warning (sentiment drops 20%), Crisis (40% drop in 30 mins)
- Instant admin notification with crisis summary + suggested response
- Competitor mention tracking and sentiment comparison

**Capability 4 — Customer Support Routing:**
- Identify support-intent comments ("my order is late", "I need help")
- Auto-acknowledge with ETA message, then route to support team
- Tag and log for CRM integration

---

### Section 3: Supported Platforms

| Platform | Features Supported |
|---|---|
| **Facebook Pages** | Post moderation, comment replies, DM routing, page insights |
| **Instagram Business** | Comment moderation, story mention tracking, DM auto-reply |
| **Twitter / X** | Mention monitoring, reply management, hashtag tracking |
| **WhatsApp Business** | Message routing, FAQ auto-reply, ticket creation |
| **LinkedIn Company Page** | Comment moderation, post engagement tracking |
| **YouTube** | Comment moderation, spam filtering |

---

## Page 2 — Django Models & API

### Section 4: Django Data Models

```python
class SocialAccount(models.Model):
    """Client's connected social media account"""
    client         = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    platform       = models.CharField(max_length=30)  # 'facebook', 'instagram', 'twitter'
    account_name   = models.CharField(max_length=200)
    access_token   = models.TextField()               # Encrypted at rest
    token_expiry   = models.DateTimeField(null=True)
    is_active      = models.BooleanField(default=True)
    connected_at   = models.DateTimeField(auto_now_add=True)

class ModerationEvent(models.Model):
    """Log of every moderation action taken"""
    ACTIONS = [('hidden','Hidden'),('deleted','Deleted'),('replied','Replied'),
               ('escalated','Escalated'),('flagged','Flagged for Review')]
    social_account = models.ForeignKey(SocialAccount, on_delete=models.CASCADE)
    content_id     = models.CharField(max_length=200)   # Platform's post/comment ID
    content_text   = models.TextField()
    action_taken   = models.CharField(max_length=20, choices=ACTIONS)
    confidence     = models.FloatField()                 # AI confidence 0.0–1.0
    sentiment      = models.CharField(max_length=10)     # 'positive','neutral','negative'
    gemini_reason  = models.TextField()                  # Gemini's explanation
    actioned_at    = models.DateTimeField(auto_now_add=True)
    reviewed_by    = models.CharField(max_length=100, blank=True)  # Human reviewer

class CrisisAlert(models.Model):
    """Fired when sentiment drops past threshold"""
    STATUS = [('active','Active'),('acknowledged','Acknowledged'),('resolved','Resolved')]
    social_account      = models.ForeignKey(SocialAccount, on_delete=models.CASCADE)
    trigger_type        = models.CharField(max_length=30)  # 'sentiment_drop', 'viral_negative'
    sentiment_before    = models.FloatField()
    sentiment_after     = models.FloatField()
    drop_percentage     = models.FloatField()
    summary             = models.TextField()               # Gemini crisis summary
    suggested_response  = models.TextField()               # Gemini suggested brand response
    status              = models.CharField(max_length=20, choices=STATUS, default='active')
    fired_at            = models.DateTimeField(auto_now_add=True)
    resolved_at         = models.DateTimeField(null=True, blank=True)

class AutoReplyTemplate(models.Model):
    """Brand-voice reply templates per client"""
    client        = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    trigger_type  = models.CharField(max_length=50)   # 'positive_comment', 'faq', 'support'
    template_text = models.TextField()
    platform      = models.CharField(max_length=30, blank=True)  # platform-specific or global
    is_active     = models.BooleanField(default=True)

class KnowledgeBase(models.Model):
    """Client's FAQ / product knowledge for Serea to use"""
    client    = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    question  = models.TextField()
    answer    = models.TextField()
    platform  = models.CharField(max_length=30, blank=True)
    is_active = models.BooleanField(default=True)
```

---

### Section 5: DRF API Endpoints

All endpoints under `/api/v1/serea/`

| Method | Endpoint | Action |
|---|---|---|
| `POST` | `/accounts/connect/` | Connect a social media account (OAuth flow) |
| `GET` | `/accounts/` | List all connected accounts |
| `DELETE` | `/accounts/{id}/` | Disconnect an account |
| `GET` | `/moderation/events/` | List all moderation events (filterable) |
| `PATCH` | `/moderation/events/{id}/review/` | Human review override |
| `GET` | `/moderation/queue/` | Items flagged for human review |
| `GET` | `/sentiment/live/` | Real-time sentiment scores per account |
| `GET` | `/crisis/alerts/` | List all crisis alerts |
| `PATCH` | `/crisis/alerts/{id}/resolve/` | Mark crisis as resolved |
| `GET/POST` | `/templates/` | Manage auto-reply templates |
| `GET/POST` | `/knowledge-base/` | Manage FAQ knowledge base |
| `GET` | `/analytics/` | Engagement metrics, moderation counts, sentiment trends |
| `GET` | `/analytics/report/` | PDF/CSV export of weekly report |

---

## Page 3 — AI Engine & Notifications

### Section 6: Gemini AI Integration

**Content Moderation Prompt:**
- Input: Comment/post text + brand context + blocklist
- Task: Classify as safe/unsafe, assign sentiment, suggest action
- Output: `{action, confidence, sentiment, reason}`

**Auto-Reply Generation:**
- Input: Comment text + knowledge base + brand voice guidelines
- Task: Draft a natural, on-brand reply
- Output: Reply text (reviewed by human if confidence < 85%)

**Crisis Summary Prompt:**
- Input: Last 50 comments + sentiment trend data
- Task: Summarize the crisis, identify root cause, suggest brand response
- Output: Crisis summary + suggested public response

---

### Section 7: Notifications

| Trigger | Channel | Recipient |
|---|---|---|
| Crisis alert fired | Email + Push | Client admin |
| Content deleted (batch summary) | Email | Client admin (daily digest) |
| Human review queue > 10 items | Email | Client admin |
| Account token expiry in 7 days | Email | Client admin |
| Weekly moderation report | Email + PDF | Client admin |

---

## Page 4 — Technical Stack & Phased Delivery

### Section 8: Technical Stack

| Layer | Technology | Cost |
|---|---|---|
| **Backend** | Django + DRF — new `serea` app | ✅ FREE |
| **AI Engine** | Google Gemini 1.5 Flash | ✅ FREE tier |
| **Task Queue** | `django-apscheduler` (replaces Celery) | ✅ FREE |
| **Cache** | `diskcache` | ✅ FREE |
| **Facebook/Instagram** | Meta Graph API | ✅ FREE (rate limited) |
| **Twitter/X** | Twitter API v2 (Basic tier) | 💲 $100/mo for write access |
| **WhatsApp** | WhatsApp Business API (via Meta) | 💲 Per message after free tier |
| **Auth** | Firebase Authentication | ✅ FREE |
| **Hosting** | Google Cloud Run | ✅ FREE tier |
| **Email** | Gmail SMTP | ✅ FREE |

**Key Python Packages:**
```
pip install djangorestframework
pip install firebase-admin
pip install diskcache
pip install django-apscheduler
pip install google-generativeai         # Gemini
pip install requests                    # Meta Graph API
pip install tweepy                      # Twitter/X API
pip install cryptography                # Token encryption at rest
pip install reportlab                   # PDF weekly reports
```

---

### Section 9: Phased Delivery

| Phase | Scope | Timeline |
|---|---|---|
| **Phase 1 — MVP** | Facebook + Instagram moderation, Gemini content classification, auto-reply from templates, human review queue, crisis alert (email), Django admin, basic dashboard | Weeks 1–6 |
| **Phase 2 — Expansion** | Twitter/X integration, WhatsApp Business, knowledge base FAQ, sentiment trend charts, PDF weekly reports, bulk moderation actions | Weeks 7–12 |
| **Phase 3 — Intelligence** | AI brand-voice learning (fine-tuned on client's past posts), competitor sentiment tracking, LinkedIn + YouTube support, giveaway/contest tracking | Weeks 13–20 |

---

### Section 10: Pricing (Seniority Tiers)

| Tier | Monthly | Token Capacity | Features |
|---|---|---|---|
| **Intern** | Free | Limited | 1 platform, 500 moderation events/mo |
| **Entry** | ৳2,000 | Standard | 2 platforms, 5,000 events/mo, basic crisis alerts |
| **Mid** | ৳5,000 | High | 4 platforms, 20,000 events/mo, sentiment charts, PDF reports |
| **Senior** | ৳10,000 | Maximum | All platforms, unlimited events, brand-voice AI, priority support |

---

## Page 5 — Closing

**Open Items Before Development:**
- [ ] Confirm Meta Developer App credentials (Facebook App ID + Secret)
- [ ] Confirm Twitter/X API tier (Basic $100/mo needed for write access)
- [ ] Confirm WhatsApp Business Account setup
- [ ] Confirm brand-voice guidelines format for each client
- [ ] Confirm moderation confidence threshold (default: 90%)
- [ ] Confirm crisis alert threshold (default: 20% sentiment drop)
- [ ] Confirm human review queue SLA (how quickly must a human review flagged content?)
- [ ] Confirm data retention policy for moderation logs

---

*Prepared by:* [Your Name], CEO
*Company:* Bengal Bound / NeurolinkIT
*Email:* [your@email.com]
*Location:* Minnetonka, Minnesota, US
