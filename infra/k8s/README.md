# Kubernetes Deployment Plan

Kubernetes manifests will describe the frontend, backend, CLI cron-jobs and supporting services.

Planned structure:

- `deployments/` for the web and API workloads with horizontal pod autoscaling.
- `jobs/` for scheduled CLI runs (leaderboard recalculations, ticket sweeps).
- `config/` for ConfigMaps and Secrets referencing Terraform outputs.
- `observability/` for Prometheus rules, Grafana dashboards and logging configuration.

The manifests will be templated with Helm or Kustomize once requirements stabilise.
