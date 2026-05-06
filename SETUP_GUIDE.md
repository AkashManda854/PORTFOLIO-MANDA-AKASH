# 🚀 Quick Start Guide - Akash Manda Portfolio

## ✅ Completed Implementation

Your interactive parallax portfolio is now ready! Here's what has been set up:

### ✨ Features Implemented
- ✅ GSAP 3.12.2 ScrollTrigger parallax animations
- ✅ Responsive animations.css (400+ lines, all breakpoints)
- ✅ main.js with API integration and fallback data
- ✅ Python Flask backend with resume parsing
- ✅ Docker & Docker Compose configuration
- ✅ GitHub Actions CI/CD workflow
- ✅ Comprehensive README and documentation
- ✅ All changes pushed to GitHub

---

## 🎯 Next Steps (Setup)

### Step 1: Verify Your Resume Path
The backend is configured to read from:
```
C:\Users\manda\Downloads\akki\OneDrive\Desktop\RESUMES\Akash MAnda Resu.pdf
```

If your resume is at a different location, update `backend/.env`:
```bash
RESUME_PATH=your/actual/resume/path.pdf
```

### Step 2: Install Backend Dependencies

**Option A - Using Batch File (Windows)**
```bash
cd backend
run.bat
# This automatically:
# - Creates Python virtual environment
# - Installs all dependencies
# - Starts the Flask server on port 5000
```

**Option B - Manual Setup**
```bash
cd backend
python -m venv venv
venv\Scripts\activate  # Windows
pip install -r requirements.txt
python app.py
```

### Step 3: Start Frontend Server

**Option A - Python Built-in Server**
```bash
# From project root
python -m http.server 8000
# Visit: http://localhost:8000
```

**Option B - VS Code Live Server**
1. Install "Live Server" extension in VS Code
2. Right-click index.html → "Open with Live Server"

**Option C - Docker Compose (Recommended)**
```bash
docker-compose up --build
# Frontend: http://localhost:8000
# Backend: http://localhost:5000
```

### Step 4: Test the Setup

1. **Open Portfolio** (in browser):
   - http://localhost:8000 (if using Python server)
   - http://localhost:8000 (if using Live Server)

2. **Verify API Connection**:
   - Check browser console (F12) for any errors
   - Scroll down the page - animations should work smoothly
   - Your portfolio data should populate automatically

3. **Test Backend API**:
   ```bash
   # In new terminal
   curl http://localhost:5000/api/health
   # Should return: {"status": "healthy", ...}
   
   curl http://localhost:5000/api/portfolio
   # Should return your portfolio data
   ```

4. **Test Resume Download**:
   ```bash
   curl http://localhost:5000/api/resume/download -o resume.pdf
   # Should download your resume
   ```

---

## 📁 Key Files Created

| File | Purpose |
|------|---------|
| `css/animations.css` | GSAP animations, responsive design |
| `js/main.js` | Parallax logic, API integration |
| `backend/app.py` | Flask API server |
| `backend/resume_parser.py` | PDF parsing logic |
| `Dockerfile` | Docker image configuration |
| `docker-compose.yml` | Development setup |
| `.github/workflows/deploy.yml` | CI/CD pipeline |
| `.env` | Backend configuration |

---

## 🌐 API Documentation Quick Reference

| Endpoint | Method | Returns |
|----------|--------|---------|
| `/api/portfolio` | GET | All portfolio data (education, experience, skills, projects, achievements) |
| `/api/health` | GET | API status check |
| `/api/resume/download` | GET | PDF resume file |

**Base URL**: `http://localhost:5000` (development)

---

## 🐛 Troubleshooting

### "Port 5000 already in use"
```bash
# Find what's using port 5000
netstat -ano | findstr :5000

# Kill the process (Windows)
taskkill /PID <PID> /F

# Or use a different port
# Edit backend/.env: PORT=5001
```

### "Cannot find resume file"
- Verify path in `backend/.env`
- Use forward slashes: `C:/Users/manda/Downloads/.../resume.pdf`
- Or use relative path: `./data/resume.pdf`

### "API not responding"
1. Check if backend is running: `curl http://localhost:5000/api/health`
2. Check console for Python errors
3. Verify firewall allows port 5000
4. Try using fallback data (portfolio works without API)

### "GSAP animations not working"
1. Check browser console (F12) for errors
2. Verify GSAP CDN links loaded (Network tab)
3. Try hard refresh: `Ctrl+Shift+R`
4. Check CSS file is loading: `css/animations.css`

---

## 🚀 Deployment Options

### Option 1: GitHub Pages (Free, Frontend Only)
- Automatically deployed via GitHub Actions
- Access at: https://github.com/AkashManda854/PORTFOLIO-MANDA-AKASH
- Custom domain: Set in repository settings

### Option 2: Custom Domain (akashmanda.me)
1. Create `CNAME` file in root with: `akashmanda.me`
2. Update DNS settings at domain registrar (point to GitHub Pages)
3. Enable custom domain in repository settings

### Option 3: Self-Hosted Backend
```bash
# Deploy Docker image to VPS/Cloud:
docker push your-registry/portfolio-backend:latest
# Configure on server and run
```

---

## 📊 Performance Tips

- ✅ GSAP animations optimized for 60fps
- ✅ ScrollTrigger configured for smooth scrolling
- ✅ CSS animations use transforms and opacity (GPU accelerated)
- ✅ API fallback ensures portfolio works without backend

---

## 🔗 Useful Links

- **Repository**: https://github.com/AkashManda854/PORTFOLIO-MANDA-AKASH
- **GSAP Docs**: https://greensock.com/gsap/
- **Flask Docs**: https://flask.palletsprojects.com/
- **Docker Docs**: https://docs.docker.com/

---

## 📝 Configuration Summary

| Setting | Value | Location |
|---------|-------|----------|
| Frontend Port | 8000 | Your browser |
| Backend Port | 5000 | backend/.env |
| API Base URL | http://localhost:5000 | js/main.js (line ~11) |
| Resume Path | Your resume path | backend/.env |
| Debug Mode | False (Dev: True) | backend/.env |

---

## ✉️ Contact & Support

- **Email**: mandaakash33@gmail.com
- **GitHub**: https://github.com/AkashManda854
- **LinkedIn**: https://linkedin.com/in/akash-manda-53654331b/

---

## 🎉 What's Next?

1. ✅ Verify everything works locally
2. ✅ Test on mobile devices
3. ✅ Customize colors/content in main.js SAMPLE_DATA
4. ✅ Deploy to akashmanda.me
5. ✅ Share your portfolio!

**Questions?** Check README.md for detailed documentation.

---

**Portfolio Version**: 1.0.0  
**Last Updated**: January 2024
