# syntax=docker/dockerfile:1

ARG NODE_VERSION=22
ARG PORT=3000

# ============================================================
# STAGE 1 — deps
# ============================================================
FROM node:${NODE_VERSION}-alpine AS deps

# libc6-compat and openssl are often required for native Node addons 
# and secure database connections (PostgreSQL SSL)
RUN apk add --no-cache libc6-compat openssl ca-certificates

WORKDIR /app

COPY package.json package-lock.json* ./

# Install ALL dependencies (devDeps are needed by the build stage).
RUN npm ci --frozen-lockfile

# ============================================================
# STAGE 2 — builder
# ============================================================
FROM node:${NODE_VERSION}-alpine AS builder

RUN apk add --no-cache libc6-compat openssl ca-certificates

WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY . .

ENV NEXT_TELEMETRY_DISABLED=1
ENV NODE_ENV=production

# Placeholder secrets for build-time config parsing.
# Real values MUST be provided at runtime via environment variables.
ENV PAYLOAD_SECRET=__build_placeholder__
ENV DATABASE_URI=postgresql://placeholder:placeholder@localhost:5432/placeholder
ENV BUILD_SKIP_DB=1

RUN npm run build

# ============================================================
# STAGE 3 — runner
# ============================================================
FROM node:${NODE_VERSION}-alpine AS runner

# Ensure runtime has necessary libraries for database and image processing
RUN apk add --no-cache libc6-compat openssl ca-certificates libstdc++

WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ARG PORT
ENV PORT=${PORT}
ENV HOSTNAME=0.0.0.0

# Create a non-root user
RUN addgroup --system --gid 1001 nodejs && \
    adduser  --system --uid 1001 nextjs

# Copy assets
COPY --from=builder --chown=nextjs:nodejs /app/public ./public

# Ensure media upload directory exists
RUN mkdir -p /app/public/media && chown -R nextjs:nodejs /app/public/media

# Copy the standalone server bundle
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE ${PORT}

# IMPORTANT: Ensure DATABASE_URI and PAYLOAD_SECRET are passed at runtime.
# If connecting to a database on the host machine from the container,
# use 'host.docker.internal' instead of 'localhost' in your DATABASE_URI
# and run with --add-host=host.docker.internal:host-gateway.

CMD ["node", "server.js"]
