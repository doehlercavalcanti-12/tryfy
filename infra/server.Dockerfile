# syntax=docker/dockerfile:1.7
FROM node:20-alpine AS base
WORKDIR /app

FROM base AS deps
COPY package.json package-lock.json* ./
COPY apps/server/package.json apps/server/package-lock.json* ./apps/server/
RUN npm install --workspace @tryfy/server --legacy-peer-deps

FROM base AS builder
COPY . .
RUN npm run build --workspace @tryfy/server

FROM base AS runner
ENV NODE_ENV=production
WORKDIR /app
COPY --from=builder /app/apps/server/dist ./dist
COPY --from=builder /app/apps/server/package.json ./package.json
RUN npm install --production --ignore-scripts --prefer-offline
EXPOSE 3000
CMD ["node", "dist/main.js"]
