# Module Requirements: Iris — AI Email Manager
# Bengal Bound Integration

> **Prepared for:** Bengal Bound | **Date:** April 9, 2026 | **Version:** 1.0
> 🔧 Django + DRF — `iris` app | 🤖 Gemini 1.5 Flash | ☁️ Google Cloud Run
> 🔗 Gmail API (OAuth2), Outlook API, IMAP/SMTP

---

## Section 1: Overview

**AI Employee Name:** Iris | **Department:** Communications
**Core Function:** Triages inboxes, drafts replies in the client's tone, unsubscribes from spam, flags urgent emails, and archives everything else — achieving inbox zero automatically, every day.
**Value Prop:** *"Wake up to a clean inbox. Every. Single. Day."*

| | Human EA (Email) | Iris AI |
|---|---|---|
| Monthly Cost | ৳15,000–৳25,000 | ৳2,000 |
| Response Drafting | Hours | Seconds |
| Spam Removal | Manual | Automated |
| Priority Detection | Human judgment | AI-scored urgency |

---

## Section 2: Core Capabilities

1. **Inbox Triage** — Every incoming email scored for urgency (0–100) and category (support, sales, internal, spam, newsletter)
2. **Reply Drafting** — Gemini drafts contextual replies matching the client's writing style; human approves before sending
3. **One-Click Unsubscribe** — Automatically identifies and unsubscribes from marketing/newsletter emails
4. **Priority Inbox** — Only truly urgent emails surfaced to the client; everything else handled or archived
5. **Follow-Up Tracker** — Tracks emails awaiting reply and nudges the client (or auto-sends a follow-up)
6. **Spam & Phishing Shield** — Detects and quarantines phishing attempts, social engineering emails
7. **Daily Digest** — Morning email: 5 most important threads, 3 drafts ready to send, inbox stats

---

## Section 3: Django Models

```python
class EmailAccount(models.Model):
    PROVIDERS = [('gmail','Gmail'),('outlook','Outlook'),('imap','Custom IMAP')]
    client           = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    provider         = models.CharField(max_length=20, choices=PROVIDERS)
    email_address    = models.EmailField()
    access_token     = models.TextField()          # Encrypted OAuth2 tokens
    refresh_token    = models.TextField(blank=True)
    is_active        = models.BooleanField(default=True)
    connected_at     = models.DateTimeField(auto_now_add=True)

class EmailItem(models.Model):
    CATEGORIES = [('urgent','Urgent'),('sales','Sales'),('support','Support'),
                  ('internal','Internal'),('newsletter','Newsletter'),('spam','Spam'),('other','Other')]
    account          = models.ForeignKey(EmailAccount, on_delete=models.CASCADE)
    message_id       = models.CharField(max_length=500, unique=True)
    subject          = models.CharField(max_length=1000)
    sender           = models.EmailField()
    preview          = models.TextField()
    urgency_score    = models.IntegerField()       # 0–100
    category         = models.CharField(max_length=20, choices=CATEGORIES)
    is_read          = models.BooleanField(default=False)
    is_archived      = models.BooleanField(default=False)
    is_spam          = models.BooleanField(default=False)
    received_at      = models.DateTimeField()
    processed_at     = models.DateTimeField(auto_now_add=True)

class ReplyDraft(models.Model):
    email_item       = models.ForeignKey(EmailItem, on_delete=models.CASCADE)
    draft_body       = models.TextField()
    tone_used        = models.CharField(max_length=50)   # 'professional', 'friendly'
    approved         = models.BooleanField(null=True)    # None=pending, True/False
    sent_at          = models.DateTimeField(null=True)
    generated_at     = models.DateTimeField(auto_now_add=True)

class FollowUpTracker(models.Model):
    email_item       = models.ForeignKey(EmailItem, on_delete=models.CASCADE)
    follow_up_due    = models.DateTimeField()
    reminder_sent    = models.BooleanField(default=False)
    auto_follow_up   = models.BooleanField(default=False)
    resolved         = models.BooleanField(default=False)
```

---

## Section 4: DRF API Endpoints (`/api/v1/iris/`)

| Method | Endpoint | Action |
|---|---|---|
| `POST` | `/accounts/connect/` | Connect email account via OAuth |
| `GET` | `/inbox/` | Triaged inbox list |
| `GET` | `/inbox/urgent/` | Urgent emails only |
| `GET` | `/inbox/{id}/draft/` | View Gemini reply draft |
| `POST` | `/inbox/{id}/send-draft/` | Approve and send draft |
| `POST` | `/inbox/{id}/archive/` | Archive email |
| `POST` | `/unsubscribe/scan/` | Scan and list unsubscribable emails |
| `POST` | `/unsubscribe/execute/` | Execute bulk unsubscribe |
| `GET` | `/follow-ups/` | Pending follow-ups |
| `GET` | `/analytics/` | Emails processed, spam removed, response time |

---

## Section 5: Technical Stack

| Layer | Technology | Cost |
|---|---|---|
| AI Engine | Google Gemini 1.5 Flash | ✅ FREE |
| Gmail | Gmail API (`google-api-python-client`) | ✅ FREE |
| Outlook | Microsoft Graph API (`msal`) | ✅ FREE |
| IMAP | Python `imaplib` | ✅ FREE |
| Task Queue | `django-apscheduler` | ✅ FREE |

```
pip install google-generativeai google-api-python-client google-auth msal django-apscheduler
```

---

## Section 6: Phased Delivery

| Phase | Scope | Timeline |
|---|---|---|
| Phase 1 | Gmail connect, triage + urgency scoring, reply drafts, daily digest | Weeks 1–6 |
| Phase 2 | Unsubscribe automation, follow-up tracker, Outlook support, spam/phishing shield | Weeks 7–12 |
| Phase 3 | Multi-account management, shared inbox (team), email analytics dashboard | Weeks 13–18 |

---

## Section 7: Pricing Tiers

| Tier | Monthly | Emails/mo | Features |
|---|---|---|---|
| Intern | Free | 200 | Triage + urgency scoring |
| Entry | ৳2,000 | 1,000 | Draft replies, daily digest |
| Mid | ৳5,000 | 5,000 | Unsubscribe, follow-up tracker, Outlook |
| Senior | ৳10,000 | Unlimited | Multi-account, team inbox, analytics |

---
*Bengal Bound / NeurolinkIT*
