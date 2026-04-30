require('dotenv').config();
const express   = require('express');
const cors      = require('cors');
const helmet    = require('helmet');
const morgan    = require('morgan');
const rateLimit = require('express-rate-limit');
const path      = require('path');
const connectDB = require('./config/db');

// ── Connect MongoDB ──────────────────────────────────────
connectDB();

const app  = express();
const PORT = process.env.PORT || 5000;

// ── Security ─────────────────────────────────────────────
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc:  ["'self'", "'unsafe-inline'", "fonts.googleapis.com"],
      styleSrc:   ["'self'", "'unsafe-inline'", "fonts.googleapis.com", "fonts.gstatic.com"],
      fontSrc:    ["'self'", "fonts.gstatic.com"],
      connectSrc: ["'self'", "https://api.anthropic.com"],
      imgSrc:     ["'self'", "data:", "blob:"],
    }
  }
}));

app.use(cors({
  origin: process.env.ALLOWED_ORIGINS
    ? process.env.ALLOWED_ORIGINS.split(',').map(s => s.trim())
    : '*',
  methods:       ['GET','POST','PUT','PATCH','DELETE','OPTIONS'],
  allowedHeaders:['Content-Type','Authorization'],
  credentials:   true
}));

// ── Rate Limiting ─────────────────────────────────────────
app.use('/api/', rateLimit({
  windowMs: 15 * 60 * 1000, max: 300,
  standardHeaders: true, legacyHeaders: false
}));
app.use('/api/chat/', rateLimit({ windowMs: 60 * 1000, max: 30 }));

// ── Body Parsing ──────────────────────────────────────────
app.use(express.json({ limit: '50kb' }));
app.use(express.urlencoded({ extended: true }));
if (process.env.NODE_ENV !== 'production') app.use(morgan('dev'));

// ── API Routes ────────────────────────────────────────────
app.use('/api/auth',          require('./routes/auth'));
app.use('/api/users',         require('./routes/users'));
app.use('/api/user',          require('./routes/users'));   // alias
app.use('/api/progress',      require('./routes/progress'));
app.use('/api/quiz',          require('./routes/quiz'));
app.use('/api/notes',         require('./routes/notes'));
app.use('/api/chat',          require('./routes/chat'));
app.use('/api/stats',         require('./routes/stats'));
app.use('/api/notifications', require('./routes/notifications'));

// ── Health Check ──────────────────────────────────────────
app.get('/api/health', (_req, res) =>
  res.json({ status: 'ok', app: 'UPSC Maa', time: new Date(), env: process.env.NODE_ENV })
);

// ── Serve Frontend Static Files ───────────────────────────
// __dirname = /app/backend  (on Render) or ./backend (local)
// frontend  = /app/frontend (on Render) or ./frontend (local)
const FRONTEND_PATH = path.join(__dirname, '..', 'frontend');
app.use(express.static(FRONTEND_PATH));

// SPA fallback — send index.html for all non-API routes
app.get('*', (req, res) => {
  if (req.path.startsWith('/api/')) {
    return res.status(404).json({ error: 'API route not found' });
  }
  res.sendFile(path.join(FRONTEND_PATH, 'index.html'));
});

// ── Global Error Handler ──────────────────────────────────
app.use((err, _req, res, _next) => {
  console.error('[ERROR]', err.message);
  res.status(err.status || 500).json({ error: err.message || 'Internal server error' });
});

// ── Start ─────────────────────────────────────────────────
app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 UPSC Maa running on port ${PORT} [${process.env.NODE_ENV || 'development'}]`);
  console.log(`📂 Serving frontend from: ${FRONTEND_PATH}`);
});

module.exports = app;
