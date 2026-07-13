# =========================================================
# Payload CMS — Dockerfile (multistage: build → runtime)
# =========================================================
# - base: all deps
# - builder: pnpm build
# - runner: pnpm start
# =========================================================

# ---- BASE ----
FROM node:22-alpine AS base
RUN apk add --no-cache libc6-compat
RUN corepack enable && corepack prepare pnpm@latest --activate
WORKDIR /app

# ---- DEPS ----
FROM base AS deps
COPY pnpm-lock.yaml package.json ./
RUN pnpm install --frozen-lockfile --filter=cms

# ---- BUILDER ----
FROM base AS builder
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN pnpm build --filter=cms
RUN pnpm generate:types

# ---- RUNNER ----
FROM base AS runner
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

COPY --from=builder /app/apps/cms/.next ./.next
COPY --from=builder /app/apps/cms/package.json ./package.json
COPY --from=builder /app/apps/cms/payload.config.ts ./payload.config.ts
COPY --from=builder /app/apps/cms/src ./src
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/apps/cms/public ./public

EXPOSE 3001
CMD ["node", "node_modules/.bin/next", "start", "-p", "3001"]
