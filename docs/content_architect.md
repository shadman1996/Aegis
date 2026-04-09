# Module Requirements: Content Architect — AI Content Specialist
# Bengal Bound Integration

> **Prepared for:** Bengal Bound | **Date:** April 9, 2026 | **Version:** 1.0
> 🔧 Django + DRF — `content_architect` app | 🤖 Gemini 1.5 Flash | ☁️ Google Cloud Run

---

## Section 1: Product Overview

**AI Employee Name:** Content Architect | **Department:** Marketing
**Target Clients:** Digital agencies, e-commerce brands, SaaS companies, bloggers, and any business that needs consistent high-quality content without a full writing team.

**Core Function:** Researches trending topics and generates a full month of SEO-optimized blogs, social captions, email sequences, and ad copy — in the client's brand voice — delivered to a content calendar and published on approval.

**Value Prop:** *"A month of content, researched and written overnight. Your brand voice. Zero writer's block."*

| | Human Content Writer | Content Architect AI |
|---|---|---|
| Monthly Cost | ৳20,000–৳35,000 | ৳2,000 |
| Output/Month | 4–8 blogs | 20+ blogs + social + emails |
| Turnaround | Days | Hours |
| SEO Optimization | Manual | AI-automated |

---

## Section 2: Core Capabilities

1. **Content Research** — Gemini fetches trending topics from Google Trends, Reddit, and competitor blogs for the client's industry
2. **Blog Post Generation** — 800–2,500 word SEO-optimized blog posts with meta titles, descriptions, H1/H2 structure, and internal link suggestions
3. **Social Caption Pack** — 30 days of captions (Instagram, Facebook, LinkedIn, Twitter/X) from each blog post
4. **Email Sequence** — 5-email nurture sequences from any blog topic
5. **Ad Copy** — Google/Meta ad headlines and descriptions (A/B variants)
6. **Content Calendar** — Monthly calendar view of all generated content with publish schedule and platform assignment
7. **Brand Voice Engine** — Client uploads sample content; Gemini learns tone, vocabulary, and style

---

## Section 3: Django Models

```python
class BrandVoice(models.Model):
    client         = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    tone           = models.CharField(max_length=50)       # 'professional', 'casual', 'witty'
    sample_content = models.TextField()
    keywords       = models.JSONField(default=list)
    avoid_words    = models.JSONField(default=list)
    industry       = models.CharField(max_length=100)

class ContentPiece(models.Model):
    TYPE = [('blog','Blog'),('caption','Social Caption'),('email','Email'),('ad','Ad Copy')]
    STATUS = [('draft','Draft'),('approved','Approved'),('published','Published'),('rejected','Rejected')]
    client         = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    content_type   = models.CharField(max_length=20, choices=TYPE)
    platform       = models.CharField(max_length=50, blank=True)  # 'instagram', 'facebook', etc.
    title          = models.CharField(max_length=500)
    body           = models.TextField()
    meta_title     = models.CharField(max_length=60, blank=True)
    meta_description = models.CharField(max_length=160, blank=True)
    seo_keywords   = models.JSONField(default=list)
    word_count     = models.IntegerField(default=0)
    status         = models.CharField(max_length=20, choices=STATUS, default='draft')
    scheduled_for  = models.DateTimeField(null=True, blank=True)
    published_at   = models.DateTimeField(null=True, blank=True)
    generated_at   = models.DateTimeField(auto_now_add=True)

class ContentCalendar(models.Model):
    client         = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    month          = models.DateField()
    pieces         = models.ManyToManyField(ContentPiece, blank=True)
    generated_at   = models.DateTimeField(auto_now_add=True)
```

---

## Section 4: DRF API Endpoints (`/api/v1/content-architect/`)

| Method | Endpoint | Action |
|---|---|---|
| `GET/POST` | `/brand-voice/` | Manage brand voice profile |
| `POST` | `/generate/blog/` | Generate blog post |
| `POST` | `/generate/social-pack/` | Generate 30-day social captions |
| `POST` | `/generate/email-sequence/` | Generate 5-email nurture sequence |
| `POST` | `/generate/ad-copy/` | Generate ad copy variants |
| `GET` | `/content/` | List all content pieces |
| `PATCH` | `/content/{id}/approve/` | Approve content for publishing |
| `GET` | `/calendar/{year}/{month}/` | Monthly content calendar view |
| `GET` | `/analytics/` | Word count, SEO scores, publish rate |

---

## Section 5: Technical Stack

| Layer | Technology | Cost |
|---|---|---|
| AI Engine | Google Gemini 1.5 Flash | ✅ FREE |
| SEO Analysis | `beautifulsoup4` + Google Search API | ✅ FREE tier |
| Trend Research | Google Trends via `pytrends` | ✅ FREE |
| WordPress Publish | WordPress REST API | ✅ FREE |
| Task Queue | `django-apscheduler` | ✅ FREE |
| PDF/DOCX Export | `reportlab` + `python-docx` | ✅ FREE |

**Key Packages:**
```
pip install google-generativeai pytrends beautifulsoup4 python-docx reportlab
```

---

## Section 6: Phased Delivery

| Phase | Scope | Timeline |
|---|---|---|
| Phase 1 | Blog + social caption generation, brand voice setup, approval workflow, content dashboard | Weeks 1–6 |
| Phase 2 | Email sequences, ad copy, content calendar, SEO meta generation, WordPress auto-publish | Weeks 7–12 |
| Phase 3 | Trend-driven topic suggestions, A/B ad variants, performance analytics (CTR, rankings) | Weeks 13–18 |

---

## Section 7: Pricing Tiers

| Tier | Monthly | Content Pieces/mo | Features |
|---|---|---|---|
| Intern | Free | 5 | Blog only, no publishing |
| Entry | ৳2,000 | 20 | Blog + social, approval workflow |
| Mid | ৳5,000 | 60 | All types, calendar, SEO meta |
| Senior | ৳10,000 | Unlimited | Auto-publish, A/B, analytics |

---
*Bengal Bound / NeurolinkIT*
