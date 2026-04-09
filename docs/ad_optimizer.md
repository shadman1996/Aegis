# Module Requirements: Ad Optimizer — AI Performance Marketer
# Bengal Bound Integration

> **Prepared for:** Bengal Bound | **Date:** April 9, 2026 | **Version:** 1.0
> 🔧 Django + DRF — `ad_optimizer` app | 🤖 Gemini 1.5 Flash | ☁️ Google Cloud Run
> 🔗 Google Ads API, Meta Marketing API

---

## Section 1: Product Overview

**AI Employee Name:** Ad Optimizer | **Department:** Paid Media
**Target Clients:** Digital agencies managing client ad budgets, e-commerce brands, and any business running Google or Meta ad campaigns.

**Core Function:** Connects to Google Ads and Meta Ads accounts, monitors campaign performance in real time, automatically pauses underperforming creatives, reallocates budget to winners, and delivers daily performance briefs with AI-powered recommendations.

**Value Prop:** *"Your ad budget stops bleeding at midnight. Ad Optimizer keeps only winners running."*

| | Human Performance Marketer | Ad Optimizer AI |
|---|---|---|
| Monthly Cost | ৳30,000–৳50,000 | ৳2,000 |
| Monitoring Frequency | 1–2x daily | Every 30 minutes |
| Budget Optimization | Weekly manual | Real-time automatic |
| Reporting | Manual | Auto-generated daily |

---

## Section 2: Core Capabilities

1. **Real-Time Campaign Monitoring** — Connects via API to Google Ads + Meta Ads, polls performance every 30 mins
2. **Auto-Pause Low Performers** — Pauses ad sets with CPC > threshold or CTR < threshold (configurable per client)
3. **Budget Reallocation** — Shifts budget from paused ad sets to best performers automatically
4. **Daily Performance Brief** — Morning email with: spend, ROAS, CPC, CTR, conversions, and AI recommendations
5. **Anomaly Alerts** — Immediate notification if spend spikes or ROAS drops by 30%+ unexpectedly
6. **Creative Fatigue Detection** — Identifies when an ad creative's CTR is declining due to audience fatigue and suggests refresh
7. **Weekly Strategy Report** — PDF with campaign summary, winner/loser analysis, and next-week strategy

---

## Section 3: Django Models

```python
class AdAccount(models.Model):
    PLATFORMS = [('google','Google Ads'),('meta','Meta Ads')]
    client           = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    platform         = models.CharField(max_length=20, choices=PLATFORMS)
    account_id       = models.CharField(max_length=100)
    account_name     = models.CharField(max_length=300)
    access_token     = models.TextField()          # Encrypted
    refresh_token    = models.TextField(blank=True)
    is_active        = models.BooleanField(default=True)
    connected_at     = models.DateTimeField(auto_now_add=True)

class Campaign(models.Model):
    ad_account       = models.ForeignKey(AdAccount, on_delete=models.CASCADE)
    platform_id      = models.CharField(max_length=100)
    name             = models.CharField(max_length=500)
    status           = models.CharField(max_length=20)     # 'active','paused','removed'
    daily_budget     = models.DecimalField(max_digits=10, decimal_places=2)
    objective        = models.CharField(max_length=100)    # 'conversions','traffic','leads'
    last_synced      = models.DateTimeField(null=True)

class PerformanceSnapshot(models.Model):
    campaign         = models.ForeignKey(Campaign, on_delete=models.CASCADE)
    date             = models.DateField()
    spend            = models.DecimalField(max_digits=10, decimal_places=2)
    impressions      = models.IntegerField()
    clicks           = models.IntegerField()
    conversions      = models.IntegerField()
    ctr              = models.FloatField()
    cpc              = models.FloatField()
    roas             = models.FloatField()
    recorded_at      = models.DateTimeField(auto_now_add=True)

class OptimizationAction(models.Model):
    ACTIONS = [('paused','Paused Ad Set'),('budget_shift','Budget Reallocated'),
               ('alert','Alert Fired'),('creative_flag','Creative Fatigue Flagged')]
    campaign         = models.ForeignKey(Campaign, on_delete=models.SET_NULL, null=True)
    action_type      = models.CharField(max_length=30, choices=ACTIONS)
    reason           = models.TextField()                  # Gemini explanation
    amount_before    = models.DecimalField(max_digits=10, decimal_places=2, null=True)
    amount_after     = models.DecimalField(max_digits=10, decimal_places=2, null=True)
    actioned_at      = models.DateTimeField(auto_now_add=True)
    reverted         = models.BooleanField(default=False)
```

---

## Section 4: DRF API Endpoints (`/api/v1/ad-optimizer/`)

| Method | Endpoint | Action |
|---|---|---|
| `POST` | `/accounts/connect/` | Connect Google/Meta ad account |
| `GET` | `/accounts/` | List connected ad accounts |
| `GET` | `/campaigns/` | List all synced campaigns |
| `POST` | `/campaigns/sync/` | Force sync campaign data now |
| `GET` | `/performance/` | Performance snapshots (filterable by date, platform) |
| `GET` | `/actions/` | Log of all optimization actions taken |
| `POST` | `/actions/{id}/revert/` | Revert an optimization action |
| `GET` | `/reports/daily/` | Today's performance brief |
| `GET` | `/reports/weekly/` | Weekly strategy PDF |
| `GET` | `/analytics/` | ROAS trends, spend efficiency, save estimate |
| `PATCH` | `/settings/thresholds/` | Configure CPC/CTR thresholds |

---

## Section 5: Technical Stack

| Layer | Technology | Cost |
|---|---|---|
| AI Engine | Google Gemini 1.5 Flash | ✅ FREE |
| Google Ads | Google Ads API (`google-ads` library) | ✅ FREE (API access) |
| Meta Ads | Meta Marketing API (`facebook-business` SDK) | ✅ FREE |
| Task Queue | `django-apscheduler` (30-min polling) | ✅ FREE |
| Email Reports | Gmail SMTP | ✅ FREE |
| PDF Reports | `reportlab` | ✅ FREE |

**Key Packages:**
```
pip install google-ads facebook-business google-generativeai reportlab django-apscheduler
```

---

## Section 6: Phased Delivery

| Phase | Scope | Timeline |
|---|---|---|
| Phase 1 | Google Ads + Meta connect, 30-min sync, auto-pause rules, daily email brief | Weeks 1–6 |
| Phase 2 | Budget reallocation, creative fatigue alerts, weekly PDF, anomaly alerts, optimization log | Weeks 7–12 |
| Phase 3 | AI strategy recommendations, competitor ad intelligence, multi-account dashboard | Weeks 13–18 |

---

## Section 7: Pricing Tiers

| Tier | Monthly | Ad Accounts | Features |
|---|---|---|---|
| Intern | Free | 1 | Read-only monitoring, daily brief |
| Entry | ৳2,000 | 2 | Auto-pause, budget reallocation |
| Mid | ৳5,000 | 5 | Creative fatigue, weekly reports, alerts |
| Senior | ৳10,000 | Unlimited | AI strategy, multi-client dashboard |

---
*Bengal Bound / NeurolinkIT*
