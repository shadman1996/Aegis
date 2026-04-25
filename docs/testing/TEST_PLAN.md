# Test Plan — Nexara + CRM Platform
# Bengal Bound Ltd | ISO 29119 Aligned | v1.0

---

## 1. Scope

This test plan covers all components of the Nexara platform and the Modular CRM:
- Django REST API (Backend)
- Next.js Console (Frontend)
- Flutter App (Mobile + Desktop)
- Marketing Website (Next.js)
- Inspector compliance gate
- Nexara ↔ CRM integration bridge

---

## 2. Test Types

### 2.1 Unit Tests
**Tool:** pytest (Django) · Jest (Next.js) · flutter_test (Flutter)
**Coverage target:** 80% overall · 95% for Inspector, Auth, Veritas

```python
# Example: Inspector unit test
class TestInspector:
    def test_blocks_gdpr_violation(self):
        action = AgentAction(type="delete_user_data", payload={...})
        result = Inspector.evaluate(action, client_id="test-client")
        assert result.decision == "BLOCKED"
        assert "GDPR" in result.laws_cited

    def test_passes_safe_action(self):
        action = AgentAction(type="send_welcome_email", payload={...})
        result = Inspector.evaluate(action, client_id="test-client")
        assert result.decision == "APPROVED"

    def test_fails_closed_when_unavailable(self):
        # Inspector must return 403 if its own AI service is down
        with mock.patch("inspector.services.gemini_client") as m:
            m.side_effect = Exception("API unavailable")
            result = Inspector.evaluate(action, client_id="test-client")
            assert result.decision == "BLOCKED"
            assert result.reason == "Inspector unavailable — fail closed"
```

### 2.2 Integration Tests
**Tool:** pytest-django · Playwright
**Scope:** API endpoint → DB → response chain

| Test Scenario | Expected Result |
|---|---|
| Client signs up → email verified → KYB submitted | KYB record created, status=PENDING |
| Agent hired → payment processed → agent activated | agent.status = ACTIVE |
| Agent action → Inspector blocks → audit log created | AuditLog entry created, action not executed |
| Notification triggered → FCM sent → DB record created | notification.status = SENT |
| CRM lead created via Concierge → appears in CRM leads/ | CRM lead record exists with correct client_id |

### 2.3 End-to-End Tests (E2E)
**Tool:** Playwright (Web/Console) · Appium / flutter_driver (App)

| Test Flow | Steps |
|---|---|
| **Full onboarding** | Visit nexara.io → Sign up → Verify email → KYB → Sign agreements → Hire agent → Configure → Agent live |
| **MFA setup** | Login → Settings → Enable MFA → Scan QR → Enter code → Verify active |
| **Approval flow** | Agent queues action → Notification sent → User clicks Approve → Action executes |
| **Password reset** | Login page → Forgot password → Email received → Click link → Set new password → Login |
| **Mobile onboarding** | Install app → Sign up → Biometric setup → Dashboard visible |

### 2.4 Security Tests
**Tool:** Bandit (SAST) · OWASP ZAP (DAST) · Trivy (containers)

| Test | Tool | Frequency |
|---|---|---|
| Python static analysis | Bandit | Every CI build |
| Dependency CVE scan | Trivy + Dependabot | Daily automated |
| API penetration test | OWASP ZAP + manual | Before launch + quarterly |
| SQL injection test | OWASP ZAP | Before launch |
| JWT token manipulation | Manual | Before launch |
| Rate limit test | Custom script (50 req/s) | Before launch |
| Inspector bypass attempt | Manual | Before launch + monthly |
| XSS / CSRF test | OWASP ZAP | Before launch |

### 2.5 Performance Tests
**Tool:** Locust (API) · Lighthouse (Web) · GTmetrix

| Test | Target | Alert |
|---|---|---|
| API p95 response | < 800ms | > 1200ms |
| Inspector gate | < 500ms | > 800ms |
| 50 concurrent users | No degradation | > 20% slowdown |
| Marketing site Lighthouse | > 90 | < 80 |
| Console first load | < 2 seconds | > 3 seconds |
| Flutter app startup | < 3 seconds cold | > 5 seconds |

### 2.6 Compliance Tests
**Tool:** Manual + Inspector test suite

| Test | Expected |
|---|---|
| Agent sends GDPR-violating prompt | Inspector BLOCKS, audit log entry created |
| Agent attempts to access another client's data | 403 Forbidden (row-level security) |
| Unauthenticated API request | 401 Unauthorized |
| Expired JWT token | 401, redirect to login |
| MFA bypass attempt | Account lockout after 3 attempts |

---

## 3. Test Environments

| Environment | URL | Purpose |
|---|---|---|
| **Local** | localhost:8000 | Developer testing |
| **Staging** | staging.api.nexara.io | QA testing before production |
| **Production** | api.nexara.io | Live system (no test data) |

---

## 4. Test Data Policy

- ✅ Use `factory_boy` to generate test data (never real client data)
- ✅ Staging DB is seeded fresh before each test run
- ❌ Never use production data in tests
- ❌ Never commit real API keys, credentials, or PII in test files

---

## 5. Bug Severity Classification

| Severity | Definition | Response SLA |
|---|---|---|
| **Critical** | Security breach, data loss, Inspector bypass, platform down | Fix within 4 hours |
| **High** | Feature broken, payment failing, notifications not sending | Fix within 24 hours |
| **Medium** | UI broken, chart not loading, minor functionality | Fix within 72 hours |
| **Low** | Cosmetic, typo, minor UX | Next sprint |

---

## 6. Definition of Done (DoD)

A feature is complete when:
- [ ] Unit tests written and passing (≥ 80% coverage)
- [ ] Integration tests passing
- [ ] Code reviewed by 2 engineers
- [ ] QA signed off in staging
- [ ] Inspector integration tested (if AI action involved)
- [ ] Mobile responsive verified (if UI change)
- [ ] Documentation updated (if API change)
- [ ] No Critical or High severity bugs open

---

## 7. Test Schedule

| Phase | Test Types | Timeline |
|---|---|---|
| Phase 0 | Unit + Integration for Inspector, Veritas, Auth | Weeks 1–4 |
| Phase 1 | E2E for full onboarding flow, Playwright setup | Weeks 5–12 |
| Phase 2 | Performance test, Security audit, Mobile testing | Weeks 13–24 |
| Pre-launch | Full regression + penetration test | Week before launch |
| Post-launch | Ongoing automated tests + monthly security scan | Continuous |

---

*Bengal Bound Ltd — Test Plan v1.0 | ISO 29119 Aligned*
