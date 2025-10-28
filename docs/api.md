# API Notes (Draft)

## REST
- Base URLs: production `https://api.tryfy.fun`, staging `https://api.tryfy.online`, local development `https://api.tryfy.local`.
- `POST /api/auth/device/code` — issue device code for CLI login.
- `POST /api/auth/device/token` — poll to exchange device code for tokens.
- `POST /api/game/queue` — enqueue a player for matchmaking.
- `POST /api/game/complete` — mark a match as completed and award tickets.
- `GET /api/game/history/:playerId` — fetch match history aligned with `@tryfy/contracts` schemas.
- `GET /api/leaderboard` — list top players ordered by rating.
- `GET /api/admin/sessions` and `GET /api/admin/audit` — administrative visibility endpoints.

## WebSocket
- Namespace `/game` uses Socket.IO for match start/end notifications matching `websocketEventSchema`.

## Authentication
- Device code flow seeds JWT issuance; future work will integrate with OAuth provider and refresh token storage.

## Roadmap
- Harden payment webhooks and integrate fraud detection.
- Expand AI module endpoints for inference workloads.
- Document rate limiting and quota strategies in `infra/` once services are connected.
