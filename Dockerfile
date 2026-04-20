# syntax=docker/dockerfile:1

ARG NODE_VERSION=22
ARG PORT=3000

# ============================================================
# STAGE 1 — deps
# Install production dependencies separately so they can be
# cached independently from the source rebuild layer.
# ============================================================
FROM node:${NODE_VERSION}-alpine AS deps

# libc6-compat is required for some native Node addons on Alpine
RUN apk add --no-cache libc6-compat

WORKDIR /app

# Copy only the manifest files first so Docker layer-caches
# the npm install step until these files change.
COPY package.json package-lock.json* ./

# Install ALL dependencies (devDeps are needed by the build stage).
# Using --frozen-lockfile ensures reproducible builds.
RUN npm ci --frozen-lockfile

# ============================================================
# STAGE 2 — builder
# Compile Next.js + Payload CMS.
# payload-types.ts is already committed, so no DB is needed
# here.  All env vars are runtime-only except PAYLOAD_SECRET
# which Payload reads during its config init at build time.
# Provide a non-empty placeholder so the build does not
# fail; the real value is supplied at runtime via docker run -e.
# ============================================================
FROM node:${NODE_VERSION}-alpine AS builder

RUN apk add --no-cache libc6-compat

WORKDIR /app

# Bring in node_modules from the deps stage
COPY --from=deps /app/node_modules ./node_modules

# Copy the full source tree
COPY . .

# Ensure Next.js produces a standalone output bundle.
# We inject this via an environment variable that next.config.ts
# can read, OR we rely on the explicit output setting below.
# Because the project's next.config.ts does not set
# `output: 'standalone'` we tell Next.js via the env var
# NEXT_PRIVATE_STANDALONE (supported in Next 15) — but the
# most reliable approach is to set it in next.config.ts.
# The Dockerfile therefore documents that next.config.ts MUST
# include `output: 'standalone'` (see notes at bottom).
ENV NEXT_TELEMETRY_DISABLED=1
ENV NODE_ENV=production

# Placeholder secrets — only needed so Payload can parse its
# config during the Next.js build graph analysis.
# Do NOT put real credentials here; they will bake into the
# image layer.  Real values come from docker run -e at runtime.
ENV PAYLOAD_SECRET=__build_placeholder__
ENV DATABASE_URI=postgresql://placeholder:placeholder@placeholder:5432/placeholder

RUN npm run build

# ============================================================
# STAGE 3 — runner
# Minimal production image.  Only the standalone bundle,
# static assets, and the public directory are copied in.
# Node modules are NOT copied — the standalone bundle already
# includes every server-side dependency it needs.
# ============================================================
FROM node:${NODE_VERSION}-alpine AS runner

RUN apk add --no-cache libc6-compat

WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ARG PORT
ENV PORT=${PORT}
ENV HOSTNAME=0.0.0.0

# Create a non-root user for the running process
RUN addgroup --system --gid 1001 nodejs && \
    adduser  --system --uid 1001 nextjs

# Copy public assets
COPY --from=builder /app/public ./public

# Copy the standalone server bundle (includes all server-side deps)
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./

# Copy static client assets into the location the standalone
# server expects them: .next/static
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

# payload-types.ts is a source file consumed at runtime by
# Payload's admin UI import map; copy it to the app root so
# relative paths resolve correctly inside the standalone bundle.
COPY --from=builder --chown=nextjs:nodejs /app/payload-types.ts ./payload-types.ts

USER nextjs

EXPOSE ${PORT}

# The standalone output places the entrypoint at server.js
# in the root of the standalone directory.
CMD ["node", "server.js"]
