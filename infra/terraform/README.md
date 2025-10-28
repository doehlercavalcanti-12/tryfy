# Terraform Plan

The Terraform configuration will provision the managed PostgreSQL instance, Redis cache and Kubernetes cluster required for Tryfy. Modules will wrap:

- `networking/` for VPC, subnets and load balancers.
- `database/` for managed PostgreSQL with automated backups and PITR.
- `cache/` for Redis or Valkey with alerting hooks.
- `compute/` for the Kubernetes control plane (EKS/GKE/AKS to be decided).

State will be stored remotely (e.g. Terraform Cloud or S3) with per-environment workspaces.
