# Data Retention (Draft)

| Data Type | Purpose | Retention Policy |
|-----------|---------|------------------|
| Authentication device codes | Completing device login flow | Ephemeral (5 minutes) stored in Redis |
| Match history | Player progression, leaderboards | 24 months with quarterly aggregation |
| Payments receipts | Financial reconciliation | 7 years to satisfy compliance |
| Moderation reports | Abuse investigations | 18 months or until case closure |
| AI assist requests | Model improvement | 30 days with PII redaction |

Next steps:
- Finalize data processing agreements and lawful bases (GDPR/LGPD).
- Automate purging policies using database jobs and Redis key TTLs.
- Document data subject access and deletion request workflows.
