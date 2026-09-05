# Multi-stage build for the Coolify deployment.
#
# Uses Next's `output: "standalone"` (see next.config.js) so the runtime image
# carries only the server and the node_modules it actually imports, rather than
# the whole dependency tree.

FROM node:20-alpine AS deps
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci

FROM node:20-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
# NEXT_PUBLIC_* values are inlined at build time, so they must be present here,
# not only at runtime. Coolify passes build args from the service's env vars.
ARG NEXT_PUBLIC_STRAPI_URL
ARG NEXT_PUBLIC_STRAPI_ASSET_URL
ARG STRAPI_TOKEN
ENV NEXT_PUBLIC_STRAPI_URL=$NEXT_PUBLIC_STRAPI_URL \
    NEXT_PUBLIC_STRAPI_ASSET_URL=$NEXT_PUBLIC_STRAPI_ASSET_URL \
    STRAPI_TOKEN=$STRAPI_TOKEN \
    NEXT_TELEMETRY_DISABLED=1
RUN npm run build

FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production NEXT_TELEMETRY_DISABLED=1 PORT=3000 HOSTNAME=0.0.0.0
RUN addgroup -g 1001 -S nodejs && adduser -S nextjs -u 1001

COPY --from=builder /app/public ./public
# Next writes the standalone server without its static assets; they have to be
# placed beside it or every CSS and JS chunk 404s.
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs
EXPOSE 3000
CMD ["node", "server.js"]
