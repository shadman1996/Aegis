# Module Requirements: Finn — AI Finance & Bookkeeper
# Bengal Bound Integration

> **Prepared for:** Bengal Bound | **Date:** April 9, 2026 | **Version:** 1.0
> 🔧 Django + DRF — `finn` app | 🤖 Gemini 1.5 Flash | ☁️ Google Cloud Run
> 🔗 QuickBooks API, Xero API, Bank Statement parsing (PDF/CSV)

---

## Section 1: Product Overview

**AI Employee Name:** Finn | **Department:** Finance & Accounting
**Target Clients:** SMEs, freelancers, agencies, and startups that need bookkeeping and financial reporting without a full-time accountant.

**Core Function:** Categorizes expenses, reconciles accounts, generates monthly P&L, balance sheet, and cash flow statements, flags anomalies, and keeps the business audit-ready — automatically.

**Value Prop:** *"Always audit-ready. Always up-to-date. No accountant on retainer needed."*

| | Human Bookkeeper | Finn AI |
|---|---|---|
| Monthly Cost | ৳30,000–৳50,000 | ৳2,000 |
| Reconciliation | Weekly/Monthly | Daily |
| Report Generation | Days | Minutes |
| Anomaly Detection | Reactive | Real-time |

---

## Section 2: Core Capabilities

1. **Bank Statement Import** — Upload CSV/PDF bank statements; Finn parses and categorizes every transaction with Gemini
2. **Expense Categorization** — Auto-assigns categories (payroll, cloud services, marketing, rent) with configurable chart of accounts
3. **Account Reconciliation** — Matches transactions against invoices and receipts; flags unmatched items
4. **Monthly P&L Report** — Auto-generates Profit & Loss, Balance Sheet, and Cash Flow Statement in PDF
5. **Anomaly Detection** — Flags unusual expenses (sudden spikes, duplicate charges, unknown vendors)
6. **Invoice Tracking** — Tracks unpaid invoices and sends automatic payment reminders to clients
7. **Tax Preparation Summary** — Generates year-end expense summary by tax category for accountant handoff

---

## Section 3: Django Models

```python
class FinancialAccount(models.Model):
    TYPES = [('bank','Bank Account'),('credit','Credit Card'),('loan','Loan')]
    client           = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    name             = models.CharField(max_length=200)
    account_type     = models.CharField(max_length=20, choices=TYPES)
    currency         = models.CharField(max_length=10, default='BDT')
    opening_balance  = models.DecimalField(max_digits=14, decimal_places=2)
    current_balance  = models.DecimalField(max_digits=14, decimal_places=2)
    connected_to     = models.CharField(max_length=50, blank=True)   # 'quickbooks', 'xero', 'manual'

class Transaction(models.Model):
    TYPES = [('income','Income'),('expense','Expense'),('transfer','Transfer')]
    account          = models.ForeignKey(FinancialAccount, on_delete=models.CASCADE)
    date             = models.DateField()
    description      = models.TextField()
    amount           = models.DecimalField(max_digits=14, decimal_places=2)
    transaction_type = models.CharField(max_length=20, choices=TYPES)
    category         = models.CharField(max_length=100)            # AI-assigned category
    vendor           = models.CharField(max_length=300, blank=True)
    is_reconciled    = models.BooleanField(default=False)
    is_flagged       = models.BooleanField(default=False)
    flag_reason      = models.TextField(blank=True)
    ai_confidence    = models.FloatField(null=True)                # Category confidence 0–1
    imported_at      = models.DateTimeField(auto_now_add=True)

class FinancialReport(models.Model):
    TYPES = [('pnl','P&L'),('balance_sheet','Balance Sheet'),('cashflow','Cash Flow'),('tax_summary','Tax Summary')]
    client           = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    report_type      = models.CharField(max_length=30, choices=TYPES)
    period_start     = models.DateField()
    period_end       = models.DateField()
    data             = models.JSONField()       # Structured financial data
    pdf_file         = models.FileField(upload_to='reports/financial/', null=True)
    generated_at     = models.DateTimeField(auto_now_add=True)

class Invoice(models.Model):
    STATUS = [('draft','Draft'),('sent','Sent'),('paid','Paid'),('overdue','Overdue')]
    client           = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    customer_name    = models.CharField(max_length=300)
    customer_email   = models.EmailField()
    amount           = models.DecimalField(max_digits=14, decimal_places=2)
    due_date         = models.DateField()
    status           = models.CharField(max_length=20, choices=STATUS, default='draft')
    reminder_count   = models.IntegerField(default=0)
    paid_at          = models.DateTimeField(null=True, blank=True)
```

---

## Section 4: DRF API Endpoints (`/api/v1/finn/`)

| Method | Endpoint | Action |
|---|---|---|
| `GET/POST` | `/accounts/` | Manage financial accounts |
| `POST` | `/transactions/import/` | Upload bank statement (CSV/PDF) |
| `GET` | `/transactions/` | List transactions (filterable) |
| `PATCH` | `/transactions/{id}/categorize/` | Override AI category |
| `GET` | `/transactions/flagged/` | Review flagged anomalies |
| `POST` | `/reports/generate/` | Generate P&L / Balance Sheet / Cash Flow |
| `GET` | `/reports/` | List all generated reports |
| `GET/POST` | `/invoices/` | Manage client invoices |
| `POST` | `/invoices/{id}/send-reminder/` | Send payment reminder |
| `GET` | `/analytics/` | Revenue, expenses, profit trends |
| `GET` | `/tax-summary/{year}/` | Year-end tax summary |

---

## Section 5: Technical Stack

| Layer | Technology | Cost |
|---|---|---|
| AI Engine | Google Gemini 1.5 Flash (categorization) | ✅ FREE |
| PDF Parsing | `pdfplumber` | ✅ FREE |
| CSV Parsing | `pandas` | ✅ FREE |
| QuickBooks | QuickBooks Online API | 💲 $15/mo per company |
| Xero | Xero API | ✅ FREE |
| PDF Reports | `reportlab` | ✅ FREE |
| Email | Gmail SMTP | ✅ FREE |

**Key Packages:**
```
pip install google-generativeai pdfplumber pandas reportlab requests
```

---

## Section 6: Phased Delivery

| Phase | Scope | Timeline |
|---|---|---|
| Phase 1 | Bank statement import (CSV), AI categorization, manual reconciliation, P&L report PDF | Weeks 1–6 |
| Phase 2 | PDF statement parsing, anomaly detection, invoice tracking, payment reminders, balance sheet | Weeks 7–12 |
| Phase 3 | QuickBooks/Xero integration, cash flow report, tax summary, multi-currency support | Weeks 13–18 |

---

## Section 7: Pricing Tiers

| Tier | Monthly | Transactions/mo | Features |
|---|---|---|---|
| Intern | Free | 100 | Basic categorization, dashboard |
| Entry | ৳2,000 | 500 | P&L report, anomaly alerts |
| Mid | ৳5,000 | 2,000 | All reports, invoice tracking, PDF export |
| Senior | ৳10,000 | Unlimited | QuickBooks/Xero sync, tax summary, multi-account |

---
*Bengal Bound / NeurolinkIT*
