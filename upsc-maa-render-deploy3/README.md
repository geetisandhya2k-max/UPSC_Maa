# 🕉️ UPSC Maa — Complete IAS Study Companion

> *"Beta, IAS banana hai toh Maa ke saath padho!"* ❤️

A full-stack PWA (Progressive Web App) that acts as your personal AI-powered Indian mother helping you crack the UPSC Civil Services exam. Built with Node.js, Express, MongoDB, and Claude AI.

---

## 📸 Features

| Feature | Description |
|---------|-------------|
| 🔐 **Auth** | Register / Login with email + password (JWT) |
| ⚡ **Adaptive Plan** | 8 tiers from 30 min/day to 12 hrs/day — tasks auto-adjust |
| 📅 **365-Day Plan** | Complete UPSC syllabus mapped across 1 year |
| 📚 **420 Topics** | Full UPSC syllabus — History, Polity, Geography, Economy, Environment, Science, Governance, Ethics, IR, CSAT |
| 🧠 **Flashcards** | 60 cards across all 8 subjects with tap-to-flip |
| ⏱️ **Study Timer** | Tracks daily study hours, syncs to MongoDB |
| 🔥 **Streaks** | Daily streak tracking stored in database |
| 📊 **Stats Dashboard** | Weekly chart, syllabus coverage, quiz averages |
| 💬 **AI Maa Chat** | Real Claude AI in Hinglish — asks about UPSC, gets answers like from a mother |
| 🔔 **Push Notifications** | Server-side cron sends alarms even when app is closed |
| 📲 **PWA** | Installable on Android (Chrome) and iPhone (Safari) |
| 📝 **Notes** | Per-task notes saved to database |
| 🎯 **Quiz Engine** | MCQs after every lesson, results stored and analysed |
| 🎉 **Celebrations** | Confetti + Maa's love when tasks complete |

---

## 🏗️ Tech Stack

### Backend
- **Runtime:** Node.js 18+
- **Framework:** Express.js
- **Database:** MongoDB (Mongoose ODM)
- **Auth:** JWT (jsonwebtoken) + bcryptjs
- **Validation:** Joi + express-validator
- **Push Notifications:** web-push (VAPID)
- **Scheduling:** node-cron
- **Security:** helmet, cors, express-rate-limit
- **AI:** Anthropic Claude API (claude-sonnet-4)

### Frontend
- **Pure HTML5 + CSS3 + Vanilla JavaScript** (no React/Vue needed)
- **PWA:** Web App Manifest + Service Worker ready
- **Fonts:** Google Fonts (Baloo 2, Noto Sans)
- **Design:** Dark theme, orange accent, mobile-first

### Infrastructure
- **Hosting:** Render.com (Web Service)
- **Database:** MongoDB Atlas (M0 Free Tier)
- **Docker:** Alpine-based, non-root user, health checks

---

## 📁 Project Structure

```
upsc-maa/
│
├── README.md                    ← You are here
├── Dockerfile                   ← Production Docker image
├── .dockerignore                ← Docker build exclusions
├── .gitignore                   ← Git exclusions (protects .env)
├── render.yaml                  ← Render Blueprint (one-click deploy)
├── DEPLOY.md                    ← Step-by-step deployment guide
│
├── backend/                     ← Node.js + Express API
│   ├── server.js                ← Main entry: routes + static frontend serving
│   ├── package.json             ← Dependencies + scripts
│   ├── .env.example             ← Environment variable template
│   │
│   ├── config/
│   │   └── db.js                ← MongoDB Atlas connection
│   │
│   ├── middleware/
│   │   └── auth.js              ← JWT protect + admin guard
│   │
│   ├── models/
│   │   ├── User.js              ← User schema (bcrypt password, alarms, settings)
│   │   ├── Progress.js          ← DailyProgress + Streak schemas
│   │   ├── Note.js              ← Per-task study notes
│   │   ├── QuizResult.js        ← Quiz attempt history
│   │   ├── ChatHistory.js       ← AI Maa conversation log
│   │   ├── Notification.js      ← Push notification log
│   │   └── StudyLog.js          ← Daily study time log
│   │
│   └── routes/
│       ├── auth.js              ← POST /register, /login | GET /me
│       ├── users.js             ← Profile, hours, alarms, push subscription
│       ├── progress.js          ← Task done, timer sync, history
│       ├── quiz.js              ← Submit quiz, get stats
│       ├── notes.js             ← CRUD study notes
│       ├── chat.js              ← AI Maa (Claude API proxy)
│       ├── stats.js             ← Dashboard aggregation
│       ├── notifications.js     ← Web Push + cron alarm scheduler
│       └── syllabus.js          ← Syllabus metadata
│
└── frontend/                    ← PWA (served as static files by Express)
    ├── index.html               ← App shell (loads all CSS + JS)
    ├── manifest.json            ← PWA manifest (installable)
    │
    ├── css/
    │   ├── base.css             ← CSS variables, reset, layout skeleton
    │   ├── components.css       ← All reusable UI components
    │   └── pages.css            ← Page-specific styles (plan, stats, settings)
    │
    └── js/
        ├── config.js            ← API URL (auto-detects Render vs localhost)
        ├── api.js               ← All backend API calls (silent fallback if offline)
        ├── auth.js              ← Login/Register (localStorage + server)
        ├── syllabus.js          ← 420-topic UPSC syllabus data array
        ├── lessons.js           ← Full lesson content + MCQ quizzes (14 subjects)
        ├── flashcards.js        ← 60 flashcards + render logic
        ├── tasks.js             ← Adaptive task generation (8 tiers)
        ├── timer.js             ← Study timer + 30s server sync
        ├── plan.js              ← 365-day plan rendering
        ├── stats.js             ← Stats page (server + local fallback)
        ├── settings.js          ← Hour slider + alarm settings
        ├── chat.js              ← AI chat interface
        ├── notifications.js     ← Browser push + in-app alarm ticks
        └── app.js               ← Main orchestrator + boot sequence
```

---

## 🚀 Quick Start — Local Development

### Prerequisites
- Node.js 18+
- MongoDB (local or Atlas free cluster)
- Anthropic API key (for AI chat)

### 1. Clone & Install

```bash
git clone https://github.com/YOUR_USERNAME/upsc-maa.git
cd upsc-maa/backend
npm install
```

### 2. Configure Environment

```bash
cp .env.example .env
```

Edit `.env`:
```env
PORT=5000
NODE_ENV=development
MONGO_URI=mongodb://localhost:27017/upsc_maa
JWT_SECRET=your_random_64_char_string_here
ANTHROPIC_API_KEY=sk-ant-api03-YOUR_KEY
ALLOWED_ORIGINS=http://localhost:5000
```

### 3. Run

```bash
# Backend (serves frontend too at localhost:5000)
npm run dev

# Open browser
open http://localhost:5000
```

That's it! Register → Study → Track progress 🎉

---

## 🌐 Deploy to Render (Free)

See **[DEPLOY.md](./DEPLOY.md)** for the complete step-by-step guide.

**Quick version:**
1. Push to GitHub
2. Create free MongoDB Atlas cluster → get connection string
3. New Web Service on render.com → connect repo
4. Set env vars: `MONGO_URI`, `JWT_SECRET`, `ANTHROPIC_API_KEY`
5. Build: `npm ci --only=production` | Start: `node server.js` | Root: `backend`
6. Deploy → live in ~3 minutes ✅

---

## 🐳 Docker

```bash
# Build
docker build -t upsc-maa .

# Run
docker run -p 5000:5000 \
  -e MONGO_URI="mongodb+srv://..." \
  -e JWT_SECRET="your_secret" \
  -e ANTHROPIC_API_KEY="sk-ant-..." \
  -e NODE_ENV=production \
  upsc-maa

# App live at http://localhost:5000
```

---

## 🔌 API Reference

All endpoints require `Authorization: Bearer <token>` except auth routes.

### Auth
```
POST   /api/auth/register    { name, email, password, hoursPerDay }
POST   /api/auth/login       { email, password }
GET    /api/auth/me
```

### User
```
GET    /api/users/profile
PUT    /api/users/profile    { name, hoursPerDay, alarms }
PUT    /api/users/hours      { hoursPerDay }
PATCH  /api/users/settings   { alarmMorning, alarmAfternoon, alarmNight, alarmsActive }
PUT    /api/users/push-subscription  { subscription }
```

### Progress
```
GET    /api/progress/today
POST   /api/progress/task-done    { taskId, dayInPlan, tasksTotal }
POST   /api/progress/timer        { seconds, dayOfWeek }
GET    /api/progress/history      ?days=30
```

### Quiz
```
POST   /api/quiz/submit    { lessonKey, subject, questions[], score, timeTaken }
GET    /api/quiz/stats
```

### Notes
```
GET    /api/notes           ?subject=history&pinned=true
POST   /api/notes           { taskId, content, subject, dayInPlan }
PUT    /api/notes/:id/pin
DELETE /api/notes/:id
```

### Chat (AI Maa)
```
POST   /api/chat/message    { message, conversationHistory[] }
GET    /api/chat/history
```

### Stats
```
GET    /api/stats/dashboard
```

### Notifications
```
GET    /api/notifications
PUT    /api/notifications/read-all
GET    /api/notifications/vapid-key
```

### Health
```
GET    /api/health     → { status: "ok", app: "UPSC Maa", time: "..." }
```

---

## 🗄️ Database Schema

### Collections

| Collection | Purpose |
|-----------|---------|
| `users` | Account info, settings, alarms, push subscription |
| `dailyprogresses` | One record per user per day — tasks, timer, quiz |
| `streaks` | Rolling streak counter, weekly hours, total stats |
| `quizresults` | Every quiz attempt with Q&A details |
| `notes` | Per-task study notes with tags and pin support |
| `chathistories` | AI Maa conversation per user per day |
| `notifications` | Push notification delivery log |

### Relationships
```
users (1) ──┬── (many) dailyprogresses
            ├── (1)    streaks
            ├── (many) quizresults
            ├── (many) notes
            ├── (many) chathistories
            └── (many) notifications
```

---

## 📚 UPSC Syllabus Coverage

The app covers the **complete UPSC Civil Services syllabus**:

| Subject | Topics | GS Paper |
|---------|--------|----------|
| History + Art & Culture | 45 | GS Paper 1 |
| Indian Polity | 30 | GS Paper 2 |
| Geography | 27 | GS Paper 1 |
| Indian Economy | 25 | GS Paper 3 |
| Environment & Ecology | 23 | GS Paper 3 |
| Science & Technology | 15 | GS Paper 3 |
| Governance & Social Justice | 15 | GS Paper 2 |
| International Relations | 10 | GS Paper 2 |
| Ethics & Integrity | 13 | GS Paper 4 |
| CSAT & Answer Writing | 10 | CSAT Paper 2 |
| **Total** | **420** | |

---

## ⚙️ Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `PORT` | No | Server port (default: 5000) |
| `NODE_ENV` | Yes | `development` or `production` |
| `MONGO_URI` | Yes | MongoDB Atlas connection string |
| `JWT_SECRET` | Yes | Random 64-char string for signing tokens |
| `JWT_EXPIRE` | No | Token expiry (default: `30d`) |
| `ANTHROPIC_API_KEY` | Yes | Claude API key for AI chat |
| `ALLOWED_ORIGINS` | Yes | Comma-separated allowed CORS origins |
| `VAPID_PUBLIC_KEY` | No | For web push notifications |
| `VAPID_PRIVATE_KEY` | No | For web push notifications |
| `VAPID_EMAIL` | No | Contact email for push (default: mailto:admin@upsemaa.com) |

---

## 🔒 Security Features

- Passwords hashed with **bcrypt** (12 rounds)
- JWT tokens with configurable expiry
- **Helmet.js** security headers
- **CORS** restricted to allowed origins
- **Rate limiting**: 300 req/15min general, 30 req/min for chat
- Input validation with **Joi**
- Non-root Docker user
- `.env` never committed (protected by `.gitignore`)

---

## 📱 PWA Installation

**Android (Chrome):**
1. Open app in Chrome
2. Tap ⋮ menu → "Add to Home Screen"
3. Tap "Install"

**iPhone (Safari):**
1. Open app in Safari
2. Tap Share button 📤
3. Tap "Add to Home Screen"
4. Tap "Add"

**After installing:** Tap "Allow Notifications" in Settings tab for daily alarms from Maa! 🔔

---

## 🤝 Contributing

1. Fork the repo
2. Create feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push: `git push origin feature/amazing-feature`
5. Open a Pull Request

---

## 📄 License

MIT License — free to use, modify, and distribute.

---

## 🙏 Acknowledgements

- **Anthropic Claude** — AI backbone for Maa's intelligence
- **UPSC aspirants everywhere** — you are the reason this exists
- **MongoDB Atlas** — free database for student projects
- **Render.com** — free hosting for developers

---

> *"Beta, UPSC ek marathon hai sprint nahi. Consistent raho — yahi winners ka ek raaz hai."* 🔥
>
> — UPSC Maa ❤️
