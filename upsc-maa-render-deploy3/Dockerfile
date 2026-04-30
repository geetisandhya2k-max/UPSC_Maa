# ── Stage 1: Build (nothing to transpile — vanilla JS)
FROM node:18-alpine AS base

WORKDIR /app

# Copy backend package files and install
COPY backend/package*.json ./backend/
RUN cd backend && npm ci --only=production

# Copy all source
COPY backend/ ./backend/
COPY frontend/ ./frontend/

# ── Stage 2: Production image
FROM node:18-alpine AS production

WORKDIR /app

# Install dumb-init for proper signal handling
RUN apk add --no-cache dumb-init

# Create non-root user
RUN addgroup -g 1001 -S nodejs && adduser -S appuser -u 1001

# Copy built app
COPY --from=base --chown=appuser:nodejs /app /app

# Set environment
ENV NODE_ENV=production
ENV PORT=5000

# Expose port
EXPOSE 5000

# Switch to non-root
USER appuser

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=30s --retries=3 \
  CMD wget -qO- http://localhost:5000/api/health || exit 1

# Start with dumb-init
WORKDIR /app/backend
ENTRYPOINT ["dumb-init", "--"]
CMD ["node", "server.js"]
