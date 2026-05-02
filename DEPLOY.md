# 🚀 UPSC Maa — Render Deployment Guide

## How it works on Render
- **One Web Service** runs Node.js from the `backend/` folder
- Express serves the `frontend/` as static files at `/`
- API routes live at `/api/*`
- No Docker needed — Render's Node runtime handles everything

---

## Step 1 — MongoDB Atlas (Free Database)

1. Go to **https://cloud.mongodb.com** → Sign up free
2. Create **Free Cluster** (M0 Sandbox) → Choose any region
3. **Database Access** → Add Database User
   - Username: `upscmaa`
   - Password: (generate a strong one, save it)
   - Role: `Atlas Admin`
4. **Network Access** → Add IP Address → **Allow Access from Anywhere** (`0.0.0.0/0`)
   - ⚠️ This is required for Render to connect
5. **Connect** → **Drivers** → Copy the connection string
6. Replace `<password>` with your actual password

Your `MONGO_URI` will look like:
```
mongodb+srv://upscmaa:YourPassword@cluster0.abc123.mongodb.net/upsc_maa?retryWrites=true&w=majority
```

---

## Step 2 — Push to GitHub

```bash
# In the project root (where README.md is)
git init
git add .
git commit -m "UPSC Maa - initial deploy"
git branch -M main

# Create a new repo on github.com first, then:
git remote add origin https://github.com/YOUR_USERNAME/upsc-maa.git
git push -u origin main
```

---

## Step 3 — Deploy on Render

1. Go to **https://dashboard.render.com** → Sign up free
2. Click **New +** → **Web Service**
3. Click **Connect a repository** → select your GitHub repo
4. Configure the service:

| Setting | Value |
|---------|-------|
| **Name** | `upsc-maa-app` |
| **Region** | Singapore |
| **Branch** | `main` |
| **Root Directory** | `backend` |
| **Runtime** | `Node` |
| **Build Command** | `npm ci --only=production` |
| **Start Command** | `node server.js` |
| **Plan** | Free |

5. Scroll down to **Environment Variables** → add these:

| Key | Value |
|-----|-------|
| `NODE_ENV` | `production` |
| `PORT` | `5000` |
| `MONGO_URI` | Your Atlas connection string from Step 1 |
| `JWT_SECRET` | Any long random string (e.g. run `node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"`) |
| `JWT_EXPIRE` | `30d` |
| `ANTHROPIC_API_KEY` | Your key from https://console.anthropic.com |
| `ALLOWED_ORIGINS` | `https://upsc-maa-app.onrender.com` (your URL — update after first deploy) |

6. Click **Create Web Service**
7. Wait ~3 minutes for first deploy ✅

---

## Step 4 — After Deploy

- Your app URL: `https://upsc-maa-app.onrender.com`
- Update `ALLOWED_ORIGINS` in Render env vars to match your exact URL
- Click **Manual Deploy** → **Deploy latest commit** to apply

---

## Using Docker on Render (Alternative)

If you prefer Docker:

1. In Render → New Web Service → **Deploy from Docker Hub** OR
2. In settings change **Runtime** to `Docker`
3. Render will use `backend/Dockerfile` automatically (since Root Directory = `backend`)

The `backend/Dockerfile` is already configured correctly.

---

## Local Development

```bash
cd backend
cp .env.example .env
# Edit .env with your values

npm install
npm run dev
# App runs at http://localhost:5000
```

---

## Troubleshooting

| Error | Fix |
|-------|-----|
| `failed to read dockerfile` | Make sure **Runtime = Node** (not Docker) in Render settings |
| `MongoServerError: bad auth` | Check MONGO_URI password — no special chars unescaped |
| `Network timeout to MongoDB` | In Atlas → Network Access → add `0.0.0.0/0` |
| `CORS error in browser` | Set ALLOWED_ORIGINS to your exact Render URL (no trailing slash) |
| `Cannot GET /` | Check Root Directory is set to `backend` in Render |
| App shows old version | Go to Render → Manual Deploy → Deploy latest commit |

---

## Free Tier Limitations

- Render free web services **sleep after 15 min of inactivity**
- First request after sleep takes ~30 seconds (cold start)
- **Fix:** Use https://uptimerobot.com (free) to ping `/api/health` every 10 min
- MongoDB Atlas M0 is **always free**, never sleeps

---

## Upgrade for Production

- Render **Starter plan ($7/mo)** = no sleep, faster
- MongoDB **M2 ($9/mo)** = more storage + dedicated cluster
- Add a custom domain in Render → Settings → Custom Domains
