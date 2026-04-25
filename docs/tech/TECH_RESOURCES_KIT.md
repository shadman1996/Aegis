# Tech Resources Kit
# Bengal Bound Ltd — Nexara + CRM Platform | v1.0

---

## Quick Reference — All Tools & Services

### AI & Machine Learning
| Tool | Purpose | Docs | Cost |
|---|---|---|---|
| LiteLLM | AI provider abstraction | litellm.ai/docs | Free + usage |
| LangGraph | Agent state machines | langchain-ai.github.io/langgraph | Free |
| CrewAI | Multi-agent collaboration | docs.crewai.com | Free |
| Pydantic AI | Structured AI outputs | ai.pydantic.dev | Free |
| Instructor | JSON from LLMs | python.useinstructor.com | Free |
| Gemini 1.5 Flash | Primary AI model | ai.google.dev | $0.075/1M tokens |
| Ollama | Local AI fallback | ollama.ai | Free (self-hosted) |
| Qdrant | Vector database | qdrant.tech/documentation | Free + cloud |

### Backend
| Tool | Purpose | Docs | Cost |
|---|---|---|---|
| Django 5 | API framework | docs.djangoproject.com | Free |
| DRF | REST API | django-rest-framework.org | Free |
| Celery | Task queue (Phase 2) | docs.celeryq.dev | Free |
| APScheduler | Scheduler (Phase 0) | apscheduler.readthedocs.io | Free |
| PostgreSQL 16 | Primary database | postgresql.org/docs | Free |
| TimescaleDB | Time-series data | docs.timescale.com | Free |
| diskcache | Cache (Phase 0) | grantjenks.com/docs/diskcache | Free |
| Redis | Cache (Phase 2+) | redis.io/docs | $29/mo |

### Frontend / Console
| Tool | Purpose | Docs | Cost |
|---|---|---|---|
| Next.js 15 | Console framework | nextjs.org/docs | Free |
| React 19 | UI library | react.dev | Free |
| Framer Motion | Animations | framer.com/motion | Free |
| Lucide React | Icons | lucide.dev | Free |
| Recharts | Charts | recharts.org | Free |
| Space Grotesk | Headline font | fonts.google.com | Free |
| Inter | Body font | fonts.google.com | Free |

### Mobile App
| Tool | Purpose | Docs | Cost |
|---|---|---|---|
| Flutter 3.22 | Cross-platform app | flutter.dev/docs | Free |
| Riverpod | State management | riverpod.dev | Free |
| go_router | Navigation | pub.dev/packages/go_router | Free |
| dio | HTTP client | pub.dev/packages/dio | Free |
| geolocator | GPS | pub.dev/packages/geolocator | Free |
| local_auth | Biometrics | pub.dev/packages/local_auth | Free |

### Infrastructure
| Tool | Purpose | Docs | Cost |
|---|---|---|---|
| Google Cloud Run | API hosting | cloud.google.com/run/docs | ~$0 at start |
| Vercel | Console hosting | vercel.com/docs | Free |
| Netlify | Marketing site | docs.netlify.com | Free |
| Cloudflare | CDN + WAF | developers.cloudflare.com | Free |
| Google Secret Manager | Secrets | cloud.google.com/secret-manager | $0.06/secret/mo |
| Firebase Auth | Authentication | firebase.google.com/docs/auth | Free |
| Firebase FCM | Push notifications | firebase.google.com/docs/cloud-messaging | Free |

### IoT & Connectivity
| Tool | Purpose | Docs | Cost |
|---|---|---|---|
| EMQX Cloud | MQTT broker | docs.emqx.com | Free (1M msg/mo) |
| Paho MQTT | Python MQTT client | eclipse.dev/paho | Free |
| AWS IoT Core | Enterprise IoT | docs.aws.amazon.com/iot | Pay per message |
| Azure IoT Hub | Enterprise IoT | learn.microsoft.com/azure/iot-hub | Pay per message |

### Payments
| Tool | Purpose | Docs | Cost |
|---|---|---|---|
| Stripe | Global cards | stripe.com/docs | 2.9% + 30¢ |
| bKash PGW | Bangladesh | pgw.bkash.com | Negotiated |
| Nagad | Bangladesh | developer.nagad.com.bd | Negotiated |
| Razorpay | India | razorpay.com/docs | 2% |
| Flutterwave | Africa | developer.flutterwave.com | 1.4% |
| NowPayments | Crypto | nowpayments.io/docs | 0.5% |

### Security & Monitoring
| Tool | Purpose | Docs | Cost |
|---|---|---|---|
| OpenClaw | Threat intelligence | Internal | Free (own) |
| Bandit | Python SAST | bandit.readthedocs.io | Free |
| Trivy | Container CVE scan | aquasecurity.github.io/trivy | Free |
| OWASP ZAP | DAST / pen test | zaproxy.org | Free |
| Sentry | Error tracking | docs.sentry.io | Free |
| MaxMind GeoIP2 | IP geolocation | maxmind.com/en/geoip2 | Free (GeoLite2) |

### Dev Tools
| Tool | Purpose | Docs | Cost |
|---|---|---|---|
| Black | Python formatter | black.readthedocs.io | Free |
| Ruff | Python linter | docs.astral.sh/ruff | Free |
| pre-commit | Git hooks | pre-commit.com | Free |
| pytest | Python testing | docs.pytest.org | Free |
| factory_boy | Test data | factoryboy.readthedocs.io | Free |
| Playwright | E2E testing | playwright.dev | Free |
| GitHub Actions | CI/CD | docs.github.com/actions | Free (2000 min/mo) |

---

## Local Dev Setup (All Platforms)

```bash
# 1. Clone repo
git clone https://github.com/bengalbound/nexara-platform
cd nexara-platform

# 2. API (Django)
cd api
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
pip install -r requirements.txt
cp .env.example .env  # Fill in your secrets
python manage.py migrate
python manage.py runserver

# 3. Console (Next.js)
cd ../console
npm install
npm run dev

# 4. App (Flutter)
cd ../app
flutter pub get
flutter run

# 5. Marketing site
cd ../web
npm install
npm run dev
```

---

## Environment Variables Quick Ref

```bash
# Core
SECRET_KEY=                    # Django secret key (50+ chars)
DEBUG=False                    # Never True in production
DATABASE_URL=                  # PostgreSQL connection string
ALLOWED_HOSTS=                 # Comma-separated hostnames

# AI
GEMINI_API_KEY=                # Google AI Studio
AI_MODEL=gemini/gemini-1.5-flash  # Switch to ollama/llama3 for free
QDRANT_URL=                    # Vector DB

# Auth
FIREBASE_PROJECT_ID=
FIREBASE_PRIVATE_KEY=
FIREBASE_CLIENT_EMAIL=

# Payments
STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=
BKASH_APP_KEY=
BKASH_APP_SECRET=

# IoT
EMQX_BROKER_URL=
EMQX_USERNAME=
EMQX_PASSWORD=

# Security
OPENCLAW_API_KEY=
CLOUDFLARE_API_TOKEN=

# Notifications
SLACK_WEBHOOK_URL=
PAGERDUTY_API_KEY=
```

---

*Bengal Bound Ltd — Tech Resources Kit v1.0*
