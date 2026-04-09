"""
Aegis — DRF Serializers
========================
Request/response serialization for all Aegis API endpoints.
"""

from rest_framework import serializers

from aegis.models import (
    CreditLedger,
    RemediationJob,
    Scan,
    SimulationResult,
    SOCTicket,
    Vulnerability,
)


# ---------------------------------------------------------------------------
# Vulnerability
# ---------------------------------------------------------------------------

class VulnerabilitySerializer(serializers.ModelSerializer):
    credit_cost = serializers.ReadOnlyField()

    class Meta:
        model = Vulnerability
        fields = [
            "id", "title", "description", "severity", "cvss_score",
            "cve_id", "affected_component", "attack_vector",
            "remediated", "compliance_tags", "credit_cost", "discovered_at",
        ]
        read_only_fields = ["id", "discovered_at", "remediated", "credit_cost"]


class VulnerabilityListSerializer(serializers.ModelSerializer):
    """Lightweight serializer for nested use inside ScanSerializer."""
    credit_cost = serializers.ReadOnlyField()

    class Meta:
        model = Vulnerability
        fields = ["id", "title", "severity", "cvss_score", "remediated", "credit_cost"]


# ---------------------------------------------------------------------------
# Scan
# ---------------------------------------------------------------------------

class ScanSerializer(serializers.ModelSerializer):
    vulnerabilities   = VulnerabilityListSerializer(many=True, read_only=True)
    vulnerability_count = serializers.SerializerMethodField()
    critical_count    = serializers.SerializerMethodField()
    duration_seconds  = serializers.ReadOnlyField()

    class Meta:
        model = Scan
        fields = [
            "id", "target", "scan_depth", "status", "risk_score",
            "gemini_summary", "pdf_report",
            "vulnerability_count", "critical_count",
            "vulnerabilities", "duration_seconds",
            "started_at", "completed_at", "created_at",
        ]
        read_only_fields = [
            "id", "status", "risk_score", "gemini_summary", "pdf_report",
            "started_at", "completed_at", "created_at",
            "vulnerability_count", "critical_count", "duration_seconds",
        ]

    def get_vulnerability_count(self, obj):
        return obj.vulnerabilities.count()

    def get_critical_count(self, obj):
        return obj.vulnerabilities.filter(severity="critical").count()


class ScanCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model  = Scan
        fields = ["target", "scan_depth"]

    def validate_target(self, value):
        value = value.strip()
        if not value:
            raise serializers.ValidationError("Target cannot be empty.")
        return value


# ---------------------------------------------------------------------------
# SimulationResult
# ---------------------------------------------------------------------------

class SimulationResultSerializer(serializers.ModelSerializer):
    failed_stage = serializers.ReadOnlyField()

    class Meta:
        model  = SimulationResult
        fields = [
            "id", "overall_passed", "stage_results", "snapshot_path",
            "gemini_verdict", "failed_stage", "simulated_at",
        ]
        read_only_fields = fields


# ---------------------------------------------------------------------------
# RemediationJob
# ---------------------------------------------------------------------------

class RemediationJobSerializer(serializers.ModelSerializer):
    simulation = SimulationResultSerializer(read_only=True)

    class Meta:
        model  = RemediationJob
        fields = [
            "id", "vulnerability", "status", "fix_command", "fix_diff",
            "gemini_confidence", "credits_charged", "failure_reason",
            "simulation", "created_at", "updated_at",
        ]
        read_only_fields = [
            "id", "status", "fix_command", "fix_diff",
            "gemini_confidence", "credits_charged", "failure_reason",
            "simulation", "created_at", "updated_at",
        ]


class RemediationJobCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model  = RemediationJob
        fields = ["vulnerability"]

    def validate_vulnerability(self, vuln):
        if vuln.remediated:
            raise serializers.ValidationError("This vulnerability has already been remediated.")
        return vuln


# ---------------------------------------------------------------------------
# SOC Ticket
# ---------------------------------------------------------------------------

class SOCTicketSerializer(serializers.ModelSerializer):
    is_sla_breached = serializers.ReadOnlyField()

    class Meta:
        model  = SOCTicket
        fields = [
            "id", "vulnerability", "remediation_job",
            "assigned_analyst", "status", "priority",
            "sla_deadline", "opened_at", "resolved_at",
            "root_cause", "resolution_notes",
            "credits_charged", "is_sla_breached",
        ]
        read_only_fields = [
            "id", "assigned_analyst", "sla_deadline", "opened_at",
            "resolved_at", "credits_charged", "is_sla_breached",
        ]


class SOCTicketCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model  = SOCTicket
        fields = ["vulnerability", "remediation_job", "priority"]


# ---------------------------------------------------------------------------
# Credit Ledger
# ---------------------------------------------------------------------------

class CreditLedgerSerializer(serializers.ModelSerializer):
    class Meta:
        model  = CreditLedger
        fields = [
            "id", "transaction_type", "amount", "balance_after",
            "reference_id", "description", "created_at",
        ]
        read_only_fields = fields


class CreditBalanceSerializer(serializers.Serializer):
    balance = serializers.IntegerField()
    user_id = serializers.IntegerField()


# ---------------------------------------------------------------------------
# Analytics
# ---------------------------------------------------------------------------

class AnalyticsSerializer(serializers.Serializer):
    total_scans         = serializers.IntegerField()
    total_vulnerabilities = serializers.IntegerField()
    critical_open       = serializers.IntegerField()
    high_open           = serializers.IntegerField()
    fix_success_rate    = serializers.FloatField()
    open_soc_tickets    = serializers.IntegerField()
    credits_spent_30d   = serializers.IntegerField()
    mean_time_to_remediation_hrs = serializers.FloatField(allow_null=True)
