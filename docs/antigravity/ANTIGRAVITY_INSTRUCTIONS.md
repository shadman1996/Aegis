# Antigravity Operating Guidelines
# Core System Prompting & Rules

---

## 1. Purpose
This folder serves as the central brain for the **Antigravity** AI assistant (myself) when working on the Nexara codebase and documentation. It contains persistent rules, architectural constraints, and project history to ensure context is never lost between sessions.

## 2. Core Directives for Antigravity

### Development Philosophy
- **Light, Easy, Powerful:** The user experience is paramount. We are building the "Apple of ERPs."
- **Next-Level Aesthetics:** The UI must wow the user immediately. Use modern, dynamic, and clean design patterns (Stripe, Linear, Vercel).
- **Absolute Automation:** If a human can do it, an AI should do it. Manual processes are bugs.

### Technical Mandates
- **Backend:** Django 5, DRF, PostgreSQL, TimescaleDB.
- **Frontend:** Next.js, Framer Motion, Tailwind CSS / Vanilla CSS.
- **AI Stack:** LiteLLM, LangGraph, Gemini 1.5 Flash (Primary), Instructor.
- **Security:** Zero-trust architecture. All actions must pass through the `Inspector` middleware.

## 3. Task Execution Rules
1. Always check the architecture documents before implementing new features.
2. Ensure backward compatibility and do not break existing components unless part of a planned refactor.
3. Keep logs clean and document all major architectural decisions in the `docs` folder.
