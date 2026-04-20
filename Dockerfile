# syntax=docker/dockerfile:1
ARG NODE_VERSION=22
FROM node:${NODE_VERSION}-alpine AS base

# STAGE 1: Install dependencies
FROM base AS deps
RUN apk add --no-cache libc6-compat openssl
WORKDIR /app
COPY package.json package-lock.json* ./
RUN npm ci --frozen-lockfile

# STAGE 2: Build the application
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
ENV NEXT_TELEMETRY_DISABLED=1
ENV NODE_ENV=production
# Placeholder untuk build
ENV PAYLOAD_SECRET=__build_placeholder__
ENV DATABASE_URI=postgresql://placeholder:placeholder@localhost:5432/placeholder
ENV BUILD_SKIP_DB=1
RUN npm run build

# STAGE 3: Production runner
FROM base AS runner
RUN apk add --no-cache libc6-compat openssl ca-certificates libstdc++
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
# Zeabur akan mengisi variabel PORT secara otomatis
ENV PORT=3000
ENV HOSTNAME=0.0.0.0

RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

# Pastikan folder media bisa ditulis
RUN mkdir -p public/media && chown -R nextjs:nodejs public/media

USER nextjs
EXPOSE 3000

# Script start sederhana untuk memastikan variabel terbaca
CMD ["node", "server.js"]
