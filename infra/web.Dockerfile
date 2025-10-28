# syntax=docker/dockerfile:1.7
FROM node:20-alpine AS base
WORKDIR /app

FROM base AS deps
COPY package.json package-lock.json* ./
COPY apps/web/package.json apps/web/package-lock.json* ./apps/web/
RUN npm install --workspace @tryfy/web --legacy-peer-deps

FROM base AS builder
COPY . .
RUN npm run build --workspace @tryfy/web

FROM base AS runner
ENV NODE_ENV=production
WORKDIR /app
COPY --from=builder /app/apps/web/.next ./.next
COPY --from=builder /app/apps/web/public ./public
COPY --from=builder /app/apps/web/package.json ./package.json
RUN npm install --production --ignore-scripts --prefer-offline
EXPOSE 3000
CMD ["npx", "next", "start", "-p", "3000"]
