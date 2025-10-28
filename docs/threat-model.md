# Threat Model (Draft)

## Assets
- Player identities, authentication tokens and gameplay telemetry.
- Administrative tooling (CLI + dashboard) with elevated permissions.
- Payments data (checkout sessions, receipts).

## Adversaries
- External attackers attempting account takeovers or payment fraud.
- Dishonest players abusing real-time communication to cheat.
- Insider threats from compromised moderator accounts.

## Entry Points
- REST API (`/api/*`) and Socket.IO gateway (`/game`).
- Device code authentication flow and CLI automation endpoints.
- Web application session storage and cross-origin messaging.

## Mitigations
- Enforce OAuth device-code throttling and session expiry via Redis.
- Use TypeORM migrations to ensure principle of least privilege database roles.
- Instrument moderation tooling with audit logging surfaced through the admin module.
- Apply rate limiting and anomaly detection around matchmaking and payments.

## Open Questions
- Integrate Web Application Firewall and bot mitigation services.
- Define policy for AI assistance requests to prevent prompt injection abuse.
