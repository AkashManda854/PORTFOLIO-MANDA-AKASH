# 🚀 Deployment Guide - Akash Manda Portfolio

## Quick Deployment (5 minutes)

### Option 1: Frontend on GitHub Pages + Backend on Heroku (RECOMMENDED)

---

## Part 1: Frontend Deployment (GitHub Pages)

### Step 1: Enable GitHub Pages in Repository

1. Go to: https://github.com/AkashManda854/PORTFOLIO-MANDA-AKASH
2. Click **Settings** → **Pages** (left sidebar)
3. Under "Source", select **Deploy from a branch**
4. Select branch: **main**
5. Select folder: **/ (root)**
6. Click **Save**

✅ Your portfolio is now live at: **https://AkashManda854.github.io/PORTFOLIO-MANDA-AKASH/**

---

## Part 2: Backend Deployment on Heroku

### Prerequisites
- Heroku account (free): https://www.heroku.com
- Heroku CLI installed: https://devcenter.heroku.com/articles/heroku-cli

### Step 1: Install Heroku CLI

```bash
# Windows - Download from above link or use package manager
# Or via npm (if you have Node.js)
npm install -g heroku

# Verify installation
heroku --version
```

### Step 2: Login to Heroku

```bash
heroku login
# This opens a browser window - click "Login"
```

### Step 3: Create Heroku App

```bash
cd c:\Users\manda\Downloads\PORTFOLIO-MANDA-AKASH

# Create new Heroku app
heroku create portfolio-akash-manda
# This creates: https://portfolio-akash-manda.herokuapp.com

# If you want a specific custom name:
heroku create your-custom-app-name
```

### Step 4: Set Environment Variables

```bash
# Set resume path on Heroku
heroku config:set RESUME_PATH="./resume.pdf" --app portfolio-akash-manda

# Set Flask environment
heroku config:set FLASK_ENV="production" --app portfolio-akash-manda

# View all variables
heroku config --app portfolio-akash-manda
```

### Step 5: Copy Resume to Data Directory

```bash
# Create data folder
mkdir data

# Copy your resume to data folder
copy "C:\Users\manda\Downloads\akki\OneDrive\Desktop\RESUMES\Akash MAnda Resu.pdf" data\resume.pdf

# Add to git
git add data\resume.pdf
git commit -m "add: Include resume for backend processing"
git push origin main
```

### Step 6: Deploy to Heroku

```bash
# Deploy to Heroku
git push heroku main

# View deployment logs
heroku logs --tail --app portfolio-akash-manda

# Test the deployment
heroku open --app portfolio-akash-manda
```

✅ Your backend API is now live at: **https://portfolio-akash-manda.herokuapp.com/api**

---

## Part 3: Update Frontend to Use Production API

### Step 1: Update API Base URL

Edit `js/main.js` and change:

```javascript
// FROM:
const CONFIG = {
    API_BASE: 'http://localhost:5000/api'
};

// TO:
const CONFIG = {
    API_BASE: 'https://portfolio-akash-manda.herokuapp.com/api'
};
```

### Step 2: Commit and Push

```bash
git add js/main.js
git commit -m "config: Update API base URL for production"
git push origin main
```

✅ GitHub Pages automatically deploys the updated frontend

---

## Part 4: Configure Custom Domain (akashmanda.me)

### Option A: Point to GitHub Pages (Free)

1. Go to your domain registrar (GoDaddy, Namecheap, etc.)
2. Update DNS settings:
   - **CNAME Record**: `www` → `AkashManda854.github.io`
   - Or **A Records** (GitHub IPs):
     ```
     185.199.108.153
     185.199.109.153
     185.199.110.153
     185.199.111.153
     ```

3. In GitHub repository:
   - Settings → Pages → Custom domain
   - Enter: `akashmanda.me`
   - Wait for DNS verification (5-15 mins)

✅ Portfolio accessible at: **https://akashmanda.me**

---

## Part 5: Test Everything

```bash
# Test Health Check
curl https://portfolio-akash-manda.herokuapp.com/api/health

# Test Portfolio Data
curl https://portfolio-akash-manda.herokuapp.com/api/portfolio

# Test Resume Download
curl https://portfolio-akash-manda.herokuapp.com/api/resume/download -o resume.pdf

# Visit frontend
# https://akashmanda.me (or GitHub Pages URL)
```

---

## Summary of URLs

| Component | URL | Status |
|-----------|-----|--------|
| Frontend | https://akashmanda.me | ✅ GitHub Pages |
| Frontend (Backup) | https://AkashManda854.github.io/PORTFOLIO-MANDA-AKASH | ✅ GitHub Pages |
| Backend API | https://portfolio-akash-manda.herokuapp.com/api | ✅ Heroku |
| Health Check | https://portfolio-akash-manda.herokuapp.com/api/health | ✅ Heroku |

---

## Monitoring & Maintenance

### Check Heroku Deployment Status
```bash
# View logs
heroku logs --tail --app portfolio-akash-manda

# Restart app
heroku restart --app portfolio-akash-manda

# Check app status
heroku status --app portfolio-akash-manda

# View config variables
heroku config --app portfolio-akash-manda
```

### Update Code on Heroku
```bash
# Make changes locally
# Commit to git
git add .
git commit -m "Update portfolio"

# Push to Heroku
git push heroku main

# View deployment
heroku logs --tail --app portfolio-akash-manda
```

---

## Troubleshooting

### Heroku App Not Starting
```bash
# Check logs
heroku logs --app portfolio-akash-manda

# Common issues:
# 1. Missing dependencies → pip install -r backend/requirements.txt
# 2. Wrong Python version → Check runtime.txt
# 3. Port not set → Heroku uses PORT env var (already in app.py)
```

### API Not Responding
```bash
# Test endpoint
curl https://portfolio-akash-manda.herokuapp.com/api/health

# If 503/504:
# - App might be sleeping (free tier)
# - Wait 30 seconds and try again
# - Or upgrade to paid tier
```

### Resume Not Found
```bash
# Verify file location
heroku run python backend/resume_parser.py --app portfolio-akash-manda

# Check if resume.pdf is in data/ folder
git ls-files | grep resume
```

### Custom Domain Not Working
```bash
# Check DNS propagation (takes 5-15 mins)
# Command: nslookup akashmanda.me
# Should resolve to GitHub IPs

# Verify CNAME in GitHub:
# Settings → Pages → Custom domain should show akashmanda.me
```

---

## Cost Breakdown

| Service | Cost | Details |
|---------|------|---------|
| GitHub Pages | **FREE** | Unlimited bandwidth |
| Heroku Dyno (Free) | **FREE** | 550 hours/month* |
| Domain | **Paid** | ~$10/year (your current domain) |
| **TOTAL** | **~$10/year** | Only domain cost! |

*Free tier auto-sleeps after 30 minutes. Wake-up on first request takes ~10 seconds.

**Upgrade to Pro ($7/month) if you need:**
- Always-on (no sleep)
- Better performance
- 1000 hours/month

---

## Next Steps

1. ✅ Install Heroku CLI
2. ✅ Run: `heroku login`
3. ✅ Run: `heroku create portfolio-akash-manda`
4. ✅ Update `js/main.js` with your Heroku URL
5. ✅ Run: `git push heroku main`
6. ✅ Configure custom domain in DNS
7. ✅ Test all endpoints

**Questions?** Check logs with: `heroku logs --tail`

---

**Deployment Status**: Ready to deploy! ✅

