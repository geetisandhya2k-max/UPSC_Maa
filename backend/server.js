require('dotenv').config();
const express   = require('express');
const cors      = require('cors');
const helmet    = require('helmet');
const morgan    = require('morgan');
const rateLimit = require('express-rate-limit');
const path      = require('path');
const connectDB = require('./config/db');

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

// ── CORS — fixed: credentials:true is incompatible with origin:'*'
// Since frontend and backend are on same domain on Render, we allow same origin
app.use(cors({
  origin: function(origin, callback) {
    // Allow requests with no origin (mobile apps, curl, same-origin)
    if (!origin) return callback(null, true);
    // Allow the Render domain and localhost
    var allowed = [
      'https://upsc-maa-1b3y.onrender.com',
      'http://localhost:5000',
      'http://localhost:3000'
    ];
    // Also allow any onrender.com subdomain
    if (origin.includes('onrender.com') || origin.includes('localhost')) {
      return callback(null, true);
    }
    // Allow if ALLOWED_ORIGINS env var set
    if (process.env.ALLOWED_ORIGINS) {
      var list = process.env.ALLOWED_ORIGINS.split(',').map(function(s){ return s.trim(); });
      if (list.indexOf(origin) !== -1) return callback(null, true);
    }
    callback(null, true); // Allow all for now — tighten in production
  },
  methods:       ['GET','POST','PUT','PATCH','DELETE','OPTIONS'],
  allowedHeaders:['Content-Type','Authorization'],
  credentials:   true
}));

// ── Rate Limiting ─────────────────────────────────────────
app.use('/api/', rateLimit({
  windowMs: 15 * 60 * 1000, max: 300,
  standardHeaders: true, legacyHeaders: false
}));

// ── Body Parsing ──────────────────────────────────────────
app.use(express.json({ limit: '50kb' }));
app.use(express.urlencoded({ extended: true }));
if (process.env.NODE_ENV !== 'production') app.use(morgan('dev'));

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
  res.json({ status: 'ok', app: 'UPSC Maa', time: new Date(), env: process.env.NODE_ENV });
});

// ── Serve Frontend ────────────────────────────────────────
var FRONTEND_PATH = path.join(__dirname, '..', 'frontend');
app.use(express.static(FRONTEND_PATH));

app.get('*', function(req, res) {
  if (req.path.startsWith('/api/')) {
    return res.status(404).json({ error: 'API route not found' });
  }
  res.sendFile(path.join(FRONTEND_PATH, 'index.html'));
});

// ── Error Handler ─────────────────────────────────────────
app.use(function(err, _req, res, _next) {
  console.error('[ERROR]', err.message);
  res.status(err.status || 500).json({ error: err.message || 'Internal server error' });
});

app.listen(PORT, '0.0.0.0', function() {
  console.log('🚀 UPSC Maa running on port ' + PORT + ' [' + (process.env.NODE_ENV || 'development') + ']');
  console.log('📂 Serving frontend from: ' + FRONTEND_PATH);
});

module.exports = app;
