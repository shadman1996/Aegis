# AI & Agent Framework Strategy
# Bengal Bound Ltd — Nexara Platform

---

## 1. Overview
This folder contains the core strategy, prompt libraries, and behavioral guidelines for the AI agents operating within the Nexara platform.

## 2. Agent Ecosystem
Nexara relies on an ecosystem of specialized agents, each designed for a specific business vertical (HR, Sales, Cybersecurity, DevOps).

### Core Principles
- **No Hallucination Allowed:** Agents must use structured outputs (via Instructor/Pydantic) and rely entirely on factual context provided via RAG or APIs.
- **Fail-Closed Operations:** If an agent is uncertain about an action, it must escalate to a human via the dashboard, never guessing or bypassing the `Inspector` compliance gate.

## 3. Key Agents
- **Veritas:** KYB & Onboarding
- **Inspector:** Compliance Gatekeeper
- **Rex:** Cybersecurity Guard
- **Kai:** DevOps Engineer
- **Concierge:** Lead Qualifier
- **Nova:** Data Scientist
