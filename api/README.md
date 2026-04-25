# Nexara API — Django Backend
# Built by NeurolinkIT

## Stack
- Django 5 + Django REST Framework
- Python 3.12
- PostgreSQL 16
- Google Cloud Run (serverless)
- Gemini 1.5 Flash/Pro (AI engine)
- Firebase Auth (JWT)

## Structure
```
api/
├── nexara/              ← Django project settings
│   ├── settings/
│   │   ├── base.py      ← Shared settings
│   │   ├── dev.py       ← Local dev (SQLite)
│   │   └── prod.py      ← Production (PostgreSQL + Cloud Run)
│   ├── urls.py
│   └── wsgi.py
│
├── core/                ← Auth, users, billing, notifications
├── inspector/           ← Compliance watchdog (ALWAYS LOADED)
├── veritas/             ← KYB client onboarding
├── ai_engine/           ← AI provider abstraction layer
│
└── agents/              ← All AI agent apps
    ├── concierge/
    ├── serea/
    ├── lead_hunter/
    ├── content_architect/
    ├── ad_optimizer/
    ├── reporting_bot/
    ├── oracle/
    ├── aria/
    ├── kai/
    ├── sage/
    ├── hera/
    ├── finn/
    ├── plex/
    ├── iris/
    ├── crux/
    ├── medibook/
    ├── realt/
    ├── merch/
    ├── babel/
    ├── nova/
    ├── mira/
    ├── shield_helpdesk/
    ├── pulse/
    ├── scout/
    ├── luma/
    ├── atlas/
    ├── cash/
    ├── dox/
    ├── tempo/
    ├── flux/
    ├── nexus/
    ├── payload/
    └── clarity/
```

## Setup (Local Dev)
```bash
python -m venv .venv
source .venv/bin/activate      # Windows: .venv\Scripts\activate
pip install -r requirements.txt
cp .env.example .env
python manage.py migrate
python manage.py createsuperuser
python manage.py runserver
```

## Environment Variables (.env)
```
# Django
DJANGO_SECRET_KEY=
DJANGO_DEBUG=True
DJANGO_ALLOWED_HOSTS=localhost,127.0.0.1

# Database (dev uses SQLite automatically)
DATABASE_URL=postgresql://user:pass@localhost:5432/nexara

# Firebase
FIREBASE_PROJECT_ID=
FIREBASE_CREDENTIALS_JSON=

# AI Engine
AI_PROVIDER=gemini          # gemini | ollama | openai_compat
GEMINI_API_KEY=
OLLAMA_HOST=http://localhost:11434
OLLAMA_MODEL=llama3

# Google Cloud
GOOGLE_CLOUD_PROJECT=nexara-prod
GOOGLE_CLOUD_STORAGE_BUCKET=nexara-files

# Notifications
SENDGRID_API_KEY=
SLACK_WEBHOOK_URL=          # Dev security alerts
PAGERDUTY_KEY=              # Critical incident alerts

# Payments
NOWPAYMENTS_API_KEY=
STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=
```

## Deploy to Cloud Run
```bash
cd api
gcloud builds submit --tag gcr.io/nexara-prod/nexara-api
gcloud run deploy nexara-api \
  --image gcr.io/nexara-prod/nexara-api \
  --platform managed \
  --region europe-west1 \
  --min-instances 1 \
  --set-secrets DJANGO_SECRET_KEY=django-secret:latest
```
