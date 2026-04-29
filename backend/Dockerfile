# ── UPSC Maa — Production Dockerfile ──────────────────────
# This file lives in /backend/ so Render finds it when rootDir=backend
# Build context is the entire repo root (set in render.yaml dockerContext)

FROM node:18-alpine

# Install dumb-init for proper signal handling
RUN apk add --no-cache dumb-init

# Create non-root user
RUN addgroup -g 1001 -S nodejs && adduser -S appuser -u 1001

WORKDIR /app

# Copy backend deps and install
COPY backend/package*.json ./backend/
RUN cd backend && npm ci --only=production && npm cache clean --force

# Copy all source files
COPY backend/ ./backend/
COPY frontend/ ./frontend/

# Own files
RUN chown -R appuser:nodejs /app

ENV NODE_ENV=production
ENV PORT=5000

EXPOSE 5000

USER appuser

HEALTHCHECK --interval=30s --timeout=10s --start-period=30s --retries=3 \
  CMD wget -qO- http://localhost:5000/api/health || exit 1

WORKDIR /app/backend
ENTRYPOINT ["dumb-init", "--"]
CMD ["node", "server.js"]
