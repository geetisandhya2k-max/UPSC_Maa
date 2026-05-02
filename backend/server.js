require('dotenv').config();
const express   = require('express');
const cors      = require('cors');
const morgan    = require('morgan');
const rateLimit = require('express-rate-limit');
const path      = require('path');
const connectDB = require('./config/db');

connectDB();

const app  = express();
const PORT = process.env.PORT || 5000;

// ── CORS (must be before other middleware) ────────────────
app.use(cors({
  origin: true,          // reflect request origin - works with credentials
  credentials: true,
  methods: ['GET','POST','PUT','PATCH','DELETE','OPTIONS'],
  allowedHeaders: ['Content-Type','Authorization']
}));
app.options('*', cors()); // handle preflight

// ── Body Parsing ──────────────────────────────────────────
app.use(express.json({ limit: '50kb' }));
app.use(express.urlencoded({ extended: true }));

// ── Logging (dev only) ────────────────────────────────────
if (process.env.NODE_ENV !== 'production') app.use(morgan('dev'));

// ── Rate Limiting ─────────────────────────────────────────
app.use('/api/', rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 300,
  standardHeaders: true,
  legacyHeaders: false
}));

// ── API Routes ────────────────────────────────────────────
app.use('/api/auth',          require('./routes/auth'));
app.use('/api/users',         require('./routes/users'));
app.use('/api/user',          require('./routes/users'));
app.use('/api/progress',      require('./routes/progress'));
app.use('/api/quiz',          require('./routes/quiz'));
app.use('/api/notes',         require('./routes/notes'));
app.use('/api/chat',          require('./routes/chat'));
app.use('/api/stats',         require('./routes/stats'));
app.use('/api/notifications', require('./routes/notifications'));

// ── Health Check ──────────────────────────────────────────
app.get('/api/health', function(_req, res) {
  res.json({ status: 'ok', app: 'UPSC Maa', time: new Date() });
});

// ── Serve Frontend Static Files ───────────────────────────
var FRONTEND = path.join(__dirname, '..', 'frontend');
app.use(express.static(FRONTEND));

// SPA fallback
app.get('*', function(req, res) {
  if (req.path.startsWith('/api/')) {
    return res.status(404).json({ error: 'API route not found' });
  }
  res.sendFile(path.join(FRONTEND, 'index.html'));
});

// ── Error Handler ─────────────────────────────────────────
app.use(function(err, _req, res, _next) {
  console.error('[ERROR]', err.message);
  res.status(err.status || 500).json({ error: err.message || 'Internal server error' });
});

// ── Start ─────────────────────────────────────────────────
app.listen(PORT, '0.0.0.0', function() {
  console.log('🚀 UPSC Maa running on port ' + PORT + ' [' + (process.env.NODE_ENV || 'development') + ']');
  console.log('📂 Serving frontend from: ' + FRONTEND);
});

module.exports = app;
