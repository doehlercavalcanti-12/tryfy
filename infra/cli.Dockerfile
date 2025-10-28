# syntax=docker/dockerfile:1.7
FROM node:20-alpine AS base
WORKDIR /app

COPY package.json package-lock.json* ./
COPY apps/cli/package.json apps/cli/package-lock.json* ./apps/cli/
RUN npm install --workspace @tryfy/cli --legacy-peer-deps

COPY . .
RUN npm run build --workspace @tryfy/cli

ENTRYPOINT ["node", "apps/cli/dist/index.js"]
