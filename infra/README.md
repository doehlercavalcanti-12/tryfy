# Tryfy Infrastructure Overview

This directory groups container images, local orchestration and future infrastructure-as-code for the platform.

- `web.Dockerfile` packages the Next.js frontend for production deployment.
- `server.Dockerfile` builds the NestJS API with database and Redis clients.
- `cli.Dockerfile` bundles the Node.js command line for automation jobs.
- `docker-compose.dev.yml` wires PostgreSQL, Redis, the API server and the web client for local development.
- `terraform/` and `k8s/` currently hold documentation stubs that outline how infrastructure will evolve.

## Domains

Production services are planned to front the `tryfy.fun` zone, with `tryfy.online` acting as a warm-standby and staging surface. API traffic resolves to `api.tryfy.fun`/`api.tryfy.online`, the web client to `app.tryfy.fun`/`app.tryfy.online`, and checkout flows originate from `payments.tryfy.fun`.
