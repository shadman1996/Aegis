# Module Requirements: Nexus — AI Training & L&D Coordinator
# Nexara Integration

> **Prepared for:** Nexara | **Date:** April 2026 | **Version:** 1.0
> 🔧 Django + DRF — `nexus` app | 🤖 Gemini 1.5 Flash | ☁️ Google Cloud Run

---

## Section 1: Overview

**AI Employee Name:** Nexus | **Department:** Learning & Development
**Core Function:** Designs training programmes, generates course content, manages employee learning paths, tracks completion and skill gaps, and issues certificates — replacing a dedicated L&D coordinator.
**Value Prop:** *"Every employee on a personalised learning path. Skill gaps closed before they hurt performance."*

---

## Section 2: Core Capabilities

1. **Skill Gap Analysis** — Gemini maps job roles vs current employee skills to identify priority learning areas
2. **Course Content Generator** — Creates structured courses (modules, lessons, quizzes) from any topic or document
3. **Learning Path Builder** — Personalised learning paths per employee based on role, seniority, and gaps
4. **Progress Tracking** — Course completion, quiz scores, time spent, certifications earned
5. **Certificate Generator** — Branded PDF certificates auto-generated on completion
6. **Compliance Training Manager** — Tracks mandatory training (data privacy, safety, HR policy); auto-reminds overdue
7. **Manager Dashboard** — Team-level completion rates and skill coverage view
8. **External Links** — Supplements with Coursera/Udemy/LinkedIn Learning course recommendations

---

## Section 3: Django Models

```python
class LearnerProfile(models.Model):
    client          = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    name            = models.CharField(max_length=300)
    email           = models.EmailField()
    department      = models.CharField(max_length=200)
    role            = models.CharField(max_length=200)
    current_skills  = models.JSONField(default=list)
    skill_gaps      = models.JSONField(default=list)

class Course(models.Model):
    TYPES = [('onboarding','Onboarding'),('technical','Technical'),
             ('compliance','Compliance'),('soft_skills','Soft Skills')]
    client          = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    title           = models.CharField(max_length=500)
    course_type     = models.CharField(max_length=20, choices=TYPES)
    description     = models.TextField()
    modules         = models.JSONField(default=list)
    duration_hours  = models.FloatField()
    is_mandatory    = models.BooleanField(default=False)
    compliance_deadline = models.DateField(null=True)

class Enrollment(models.Model):
    STATUS = [('assigned','Assigned'),('in_progress','In Progress'),
              ('completed','Completed'),('overdue','Overdue')]
    employee        = models.ForeignKey(LearnerProfile, on_delete=models.CASCADE)
    course          = models.ForeignKey(Course, on_delete=models.CASCADE)
    status          = models.CharField(max_length=20, choices=STATUS, default='assigned')
    progress_pct    = models.IntegerField(default=0)
    quiz_score      = models.FloatField(null=True)
    due_date        = models.DateField(null=True)
    completed_at    = models.DateTimeField(null=True)
    certificate     = models.FileField(upload_to='certificates/', null=True)
```

---

## Section 4: API Endpoints (`/api/v1/nexus/`)

| Method | Endpoint | Action |
|---|---|---|
| `GET/POST` | `/learners/` | Learner profiles |
| `POST` | `/learners/{id}/analyze-gaps/` | AI skill gap analysis |
| `GET/POST` | `/courses/` | Create and manage courses |
| `POST` | `/courses/{id}/generate/` | AI-generate course content |
| `GET/POST` | `/enrollments/` | Enroll employees |
| `GET` | `/enrollments/overdue/` | Overdue compliance training |
| `POST` | `/enrollments/{id}/complete/` | Complete + issue certificate |
| `GET` | `/analytics/` | Completion rates, skill coverage |

---

## Section 5: Tech Stack & Delivery

```
pip install google-generativeai reportlab django-apscheduler
```

| Phase | Scope | Timeline |
|---|---|---|
| Phase 1 | Learner profiles, course creation, enrollment, tracking | Weeks 1–5 |
| Phase 2 | Skill gaps, compliance manager, certificate generator | Weeks 6–10 |
| Phase 3 | Learning paths, manager dashboard, external recommendations | Weeks 11–15 |

| Tier | Monthly | Employees | Features |
|---|---|---|---|
| Intern | Free | 10 | Courses + tracking |
| Entry | ৳2,000 | 50 | Compliance, certificates |
| Mid | ৳5,000 | 200 | Skill gaps, learning paths |
| Senior | ৳10,000 | Unlimited | Manager dashboard, analytics |

*Nexara / NeurolinkIT*
