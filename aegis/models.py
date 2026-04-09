"""
Aegis — Django ORM Models
=========================
All data models for the Aegis cybersecurity remediation module.
Tables are created via standard Django migrations (makemigrations / migrate).

Models:
  Scan               — A vulnerability scan against a target
  Vulnerability      — An individual finding from a scan
  RemediationJob     — An AI fix request for a vulnerability
  SimulationResult   — Zero-Breakage sim outcome linked to a RemediationJob
  SOCTicket          — Human SOC analyst escalation ticket
  CreditLedger       — Append-only credit transaction log per user
"""

from django.conf import settings
from django.db import models
from django.utils import timezone


# ---------------------------------------------------------------------------
# Choices
# ---------------------------------------------------------------------------

class SeverityChoice(models.TextChoices):
    CRITICAL = "critical", "Critical"
    HIGH     = "high",     "High"
    MEDIUM   = "medium",   "Medium"
    LOW      = "low",      "Low"
    INFO     = "info",     "Info"


class ScanStatus(models.TextChoices):
    PENDING    = "pending",    "Pending"
    RUNNING    = "running",    "Running"
    COMPLETED  = "completed",  "Completed"
    FAILED     = "failed",     "Failed"


class JobStatus(models.TextChoices):
    PENDING   = "pending",   "Pending"
    RUNNING   = "running",   "Running"
    SIM_PASS  = "sim_pass",  "Simulation Passed"
    SIM_FAIL  = "sim_fail",  "Simulation Failed"
    APPLIED   = "applied",   "Applied to Production"
    ROLLED_BACK = "rolled_back", "Rolled Back"
    CANCELLED = "cancelled", "Cancelled"


class TicketStatus(models.TextChoices):
    OPEN        = "open",        "Open"
    IN_PROGRESS = "in_progress", "In Progress"
    RESOLVED    = "resolved",    "Resolved"
    CLOSED      = "closed",      "Closed"


class TicketPriority(models.TextChoices):
    P1 = "P1", "Critical (< 15 min)"
    P2 = "P2", "High (< 1 hr)"
    P3 = "P3", "Medium (< 4 hrs)"
    P4 = "P4", "Low (< 24 hrs)"


class TransactionType(models.TextChoices):
    PURCHASE = "purchase", "Purchase"
    DEBIT    = "debit",    "Debit"
    REFUND   = "refund",   "Refund"
    BONUS    = "bonus",    "Bonus"


# ---------------------------------------------------------------------------
# Scan
# ---------------------------------------------------------------------------

class Scan(models.Model):
    """A full vulnerability scan run against a target IP / hostname."""

    SCAN_DEPTH = [
        ("quick",    "Quick (~2 min)"),
        ("standard", "Standard (~10 min)"),
        ("deep",     "Deep (~45 min)"),
    ]

    user         = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="aegis_scans",
    )
    target       = models.CharField(max_length=500, help_text="IP address, hostname, or CIDR range")
    scan_depth   = models.CharField(max_length=10, choices=SCAN_DEPTH, default="standard")
    status       = models.CharField(max_length=20, choices=ScanStatus.choices, default=ScanStatus.PENDING)
    risk_score   = models.FloatField(null=True, blank=True, help_text="0–100 overall risk score")
    raw_output   = models.JSONField(default=dict, blank=True)    # aggregated scanner JSON
    gemini_summary = models.TextField(blank=True)                # AI executive summary
    pdf_report   = models.FileField(upload_to="aegis/reports/", null=True, blank=True)
    started_at   = models.DateTimeField(null=True, blank=True)
    completed_at = models.DateTimeField(null=True, blank=True)
    created_at   = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["-created_at"]
        verbose_name = "Scan"
        verbose_name_plural = "Scans"

    def __str__(self):
        return f"Scan #{self.pk} — {self.target} [{self.status}]"

    @property
    def duration_seconds(self):
        if self.started_at and self.completed_at:
            return (self.completed_at - self.started_at).seconds
        return None


# ---------------------------------------------------------------------------
# Vulnerability
# ---------------------------------------------------------------------------

class Vulnerability(models.Model):
    """An individual finding produced by a scan."""

    scan          = models.ForeignKey(Scan, on_delete=models.CASCADE, related_name="vulnerabilities")
    title         = models.CharField(max_length=300)
    description   = models.TextField()                          # plain-English explanation
    severity      = models.CharField(max_length=10, choices=SeverityChoice.choices)
    cvss_score    = models.FloatField(null=True, blank=True)
    cve_id        = models.CharField(max_length=50, blank=True) # e.g. CVE-2024-1234
    affected_component = models.CharField(max_length=300, blank=True)
    attack_vector = models.CharField(max_length=100, blank=True)
    remediated    = models.BooleanField(default=False)
    compliance_tags = models.JSONField(
        default=list,
        blank=True,
        help_text="e.g. ['SOC2-CC6.1', 'ISO27001-A.12.6', 'NIST-SI-2']",
    )
    raw_finding   = models.JSONField(default=dict, blank=True)  # scanner raw output for this vuln
    discovered_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["-cvss_score", "severity"]
        verbose_name = "Vulnerability"
        verbose_name_plural = "Vulnerabilities"

    def __str__(self):
        return f"[{self.severity.upper()}] {self.title}"

    @property
    def credit_cost(self):
        """Credits required to auto-fix this vulnerability."""
        costs = {
            SeverityChoice.CRITICAL: 3,
            SeverityChoice.HIGH:     3,
            SeverityChoice.MEDIUM:   2,
            SeverityChoice.LOW:      1,
            SeverityChoice.INFO:     0,
        }
        return costs.get(self.severity, 1)


# ---------------------------------------------------------------------------
# RemediationJob
# ---------------------------------------------------------------------------

class RemediationJob(models.Model):
    """
    An AI-generated fix request for a specific vulnerability.
    Credits are only deducted after simulation passes AND fix is applied.
    """

    vulnerability  = models.ForeignKey(Vulnerability, on_delete=models.CASCADE, related_name="jobs")
    requested_by   = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="aegis_jobs",
    )
    status         = models.CharField(max_length=20, choices=JobStatus.choices, default=JobStatus.PENDING)
    fix_command    = models.TextField(blank=True)    # AI-generated bash/config patch
    fix_diff       = models.TextField(blank=True)    # Human-readable diff preview
    gemini_confidence = models.FloatField(null=True, blank=True, help_text="0.0–1.0")
    credits_charged = models.IntegerField(default=0)
    failure_reason = models.TextField(blank=True)    # If sim failed or job cancelled
    created_at     = models.DateTimeField(auto_now_add=True)
    updated_at     = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["-created_at"]
        verbose_name = "Remediation Job"
        verbose_name_plural = "Remediation Jobs"

    def __str__(self):
        return f"Job #{self.pk} — {self.vulnerability.title} [{self.status}]"


# ---------------------------------------------------------------------------
# SimulationResult
# ---------------------------------------------------------------------------

class SimulationResult(models.Model):
    """Zero-Breakage simulation outcome for a RemediationJob."""

    remediation_job = models.OneToOneField(
        RemediationJob,
        on_delete=models.CASCADE,
        related_name="simulation",
    )
    overall_passed  = models.BooleanField(default=False)
    stage_results   = models.JSONField(
        default=list,
        help_text=(
            "List of stage dicts: "
            "[{stage, passed, detail, duration_ms}, ...]"
        ),
    )
    snapshot_path   = models.CharField(max_length=500, blank=True)
    gemini_verdict  = models.TextField(blank=True)   # AI explanation of sim outcome
    simulated_at    = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name = "Simulation Result"
        verbose_name_plural = "Simulation Results"

    def __str__(self):
        result = "PASSED ✅" if self.overall_passed else "FAILED ❌"
        return f"Sim #{self.pk} — Job #{self.remediation_job_id} [{result}]"

    @property
    def failed_stage(self):
        """Return the name of the first failing stage, or None."""
        for stage in self.stage_results:
            if not stage.get("passed"):
                return stage.get("stage")
        return None


# ---------------------------------------------------------------------------
# SOCTicket
# ---------------------------------------------------------------------------

class SOCTicket(models.Model):
    """Human SOC escalation ticket — 50 credits on open."""

    vulnerability    = models.ForeignKey(
        Vulnerability,
        on_delete=models.CASCADE,
        related_name="soc_tickets",
    )
    remediation_job  = models.ForeignKey(
        RemediationJob,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name="soc_ticket",
    )
    opened_by        = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="aegis_tickets",
    )
    assigned_analyst = models.CharField(max_length=100, blank=True)
    status           = models.CharField(max_length=20, choices=TicketStatus.choices, default=TicketStatus.OPEN)
    priority         = models.CharField(max_length=2,  choices=TicketPriority.choices, default=TicketPriority.P2)
    sla_deadline     = models.DateTimeField()
    opened_at        = models.DateTimeField(auto_now_add=True)
    resolved_at      = models.DateTimeField(null=True, blank=True)
    root_cause       = models.TextField(blank=True)
    resolution_notes = models.TextField(blank=True)
    credits_charged  = models.IntegerField(default=50)

    class Meta:
        ordering = ["-opened_at"]
        verbose_name = "SOC Ticket"
        verbose_name_plural = "SOC Tickets"

    def __str__(self):
        return f"Ticket #{self.pk} [{self.priority}] — {self.vulnerability.title} [{self.status}]"

    def save(self, *args, **kwargs):
        # Auto-set SLA deadline based on priority
        if not self.pk and not self.sla_deadline:
            sla_map = {"P1": 15, "P2": 60, "P3": 240, "P4": 1440}  # minutes
            delta_minutes = sla_map.get(self.priority, 60)
            self.sla_deadline = timezone.now() + timezone.timedelta(minutes=delta_minutes)
        super().save(*args, **kwargs)

    @property
    def is_sla_breached(self):
        return timezone.now() > self.sla_deadline and self.status != TicketStatus.RESOLVED


# ---------------------------------------------------------------------------
# CreditLedger
# ---------------------------------------------------------------------------

class CreditLedger(models.Model):
    """
    Append-only credit transaction log.
    Never update or delete rows — always insert new entries.
    Current balance = sum of all `amount` fields for each user.
    """

    user             = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="aegis_credits",
    )
    transaction_type = models.CharField(max_length=20, choices=TransactionType.choices)
    amount           = models.IntegerField(help_text="Positive = credit added, negative = deducted")
    balance_after    = models.IntegerField()
    reference_id     = models.CharField(
        max_length=200,
        blank=True,
        help_text="Stripe PaymentIntent ID or RemediationJob/SOCTicket ID",
    )
    description      = models.TextField()
    created_at       = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["-created_at"]
        verbose_name = "Credit Ledger Entry"
        verbose_name_plural = "Credit Ledger"

    def __str__(self):
        sign = "+" if self.amount >= 0 else ""
        return (
            f"[{self.transaction_type.upper()}] "
            f"User #{self.user_id} {sign}{self.amount} → balance {self.balance_after}"
        )

    @classmethod
    def balance_for(cls, user):
        """Return the current credit balance for a user."""
        entry = cls.objects.filter(user=user).order_by("-created_at").first()
        return entry.balance_after if entry else 0
