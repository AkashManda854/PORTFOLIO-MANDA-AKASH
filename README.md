# 🚀 Akash Manda Portfolio

Interactive, animated portfolio with GSAP parallax scrolling, full-stack architecture, and dynamic content loading from backend API.

**Live Demo:** https://akashmanda.me  
**GitHub:** https://github.com/AkashManda854/PORTFOLIO-MANDA-AKASH

---

## ✨ Features

- **🎨 Advanced Animations**: GSAP ScrollTrigger parallax effects, smooth transitions, and scroll-triggered animations
- **🏗️ Full-Stack Architecture**: Separate frontend (HTML/CSS/JS) and backend (Python Flask) with API integration
- **📄 Dynamic Resume Integration**: Automatic PDF parsing and content population from resume file
- **📱 Responsive Design**: Mobile-first design with breakpoints at 768px and 490px
- **🚀 Fast Performance**: Optimized animations, lazy loading, and efficient DOM updates
- **🔗 API-Driven Content**: Portfolio data served from backend API with graceful fallback to sample data
- **🌐 SEO Optimized**: Structured data (schema.org), meta tags, and semantic HTML

---

## 🛠️ Tech Stack

### Frontend
- HTML5 / CSS3 / JavaScript (Vanilla)
- GSAP 3.12.2 with ScrollTrigger plugin
- Responsive Design (Mobile-first)
- Google Fonts (Poppins, JetBrains Mono)

### Backend
- Python 3.9+
- Flask 2.3.3
- Flask-CORS for API access
- PyPDF2 for resume parsing
- Gunicorn for production serving

### Deployment
- GitHub Pages (Frontend)
- Docker & Docker Compose (Backend)
- GitHub Actions (CI/CD)
- Custom Domain (akashmanda.me)

---

## 📦 Installation & Setup

### Prerequisites
- **Node.js 18+** (for local development)
- **Python 3.9+** (for backend)
- **Git** (for version control)

### Quick Start

#### 1️⃣ Clone Repository
```bash
git clone https://github.com/AkashManda854/PORTFOLIO-MANDA-AKASH.git
cd PORTFOLIO-MANDA-AKASH
```

#### 2️⃣ Frontend Setup (No installation needed)
Frontend files are standalone HTML/CSS/JS. Just open in browser:
```bash
# Using Python's built-in server
python -m http.server 8000

# Or using Live Server (VS Code Extension)
# Install "Live Server" extension and click "Go Live"
```

#### 3️⃣ Backend Setup

**Windows:**
```bash
cd backend
run.bat  # Automatically creates venv, installs dependencies, and starts server
```

**Linux/macOS:**
```bash
cd backend
chmod +x run.sh
./run.sh  # Automatically creates venv, installs dependencies, and starts server
```

**Manual Setup (Any OS):**
```bash
cd backend

# Create virtual environment
python -m venv venv

# Activate virtual environment
# Windows
venv\Scripts\activate
# Linux/macOS
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Copy .env template
cp .env.example .env

# Update .env with resume path
# RESUME_PATH=path/to/your/resume.pdf

# Run Flask server
python app.py
```

#### 4️⃣ Configure Resume Path

Update `.env` file in `backend/` directory:
```env
RESUME_PATH=C:\Users\manda\Downloads\akki\OneDrive\Desktop\RESUMES\Akash MAnda Resu.pdf
```

#### 5️⃣ Test API Endpoints

```bash
# Health check
curl http://localhost:5000/api/health

# Get portfolio data
curl http://localhost:5000/api/portfolio

# Download resume
curl http://localhost:5000/api/resume/download -o resume.pdf
```

---

## 🐳 Docker Setup

### Using Docker Compose (Recommended for local development)

```bash
# Start both frontend and backend
docker-compose up --build

# Access:
# Frontend: http://localhost:8000
# Backend API: http://localhost:5000
```

### Using Docker only

```bash
# Build image
docker build -t portfolio-backend:latest .

# Run container
docker run -p 5000:5000 \
  -v $(pwd)/data:/app/data \
  -e RESUME_PATH=/app/data/resume.pdf \
  portfolio-backend:latest

# Or on Windows
docker run -p 5000:5000 ^
  -v %cd%/data:/app/data ^
  -e RESUME_PATH=/app/data/resume.pdf ^
  portfolio-backend:latest
```

---

## 📁 Project Structure

```
PORTFOLIO-MANDA-AKASH/
├── index.html                  # Main portfolio page
├── css/
│   ├── style.css              # Base styles (existing)
│   └── animations.css         # GSAP animations & responsive design
├── js/
│   ├── script.js              # Original functionality (existing)
│   └── main.js                # GSAP parallax & API integration
├── backend/
│   ├── app.py                 # Flask application & API routes
│   ├── resume_parser.py       # PDF resume parser
│   ├── requirements.txt        # Python dependencies
│   ├── .env.example           # Environment variables template
│   ├── run.sh                 # Linux/macOS startup script
│   └── run.bat                # Windows startup script
├── data/
│   └── resume.pdf             # Resume file (add your resume here)
├── Dockerfile                  # Docker image configuration
├── docker-compose.yml         # Docker Compose configuration
├── .github/
│   └── workflows/
│       └── deploy.yml         # GitHub Actions CI/CD
└── README.md                  # This file
```

---

## 🔌 API Documentation

### Base URL
- **Development**: `http://localhost:5000`
- **Production**: `https://api.akashmanda.me` (configure in `main.js`)

### Endpoints

#### 1. Get Portfolio Data
```
GET /api/portfolio

Response:
{
  "success": true,
  "data": {
    "education": [...],
    "experience": [...],
    "skills": { backend: [...], frontend: [...], data: [...] },
    "projects": [...],
    "achievements": [...],
    "contact": { email, phone, location }
  },
  "timestamp": "2024-01-15T10:30:00"
}
```

#### 2. Get Education
```
GET /api/portfolio/education

Response:
{
  "success": true,
  "data": [
    {
      "degree": "B.Tech in Computer Science",
      "institution": "BIET",
      "year": "2024"
    }
  ]
}
```

#### 3. Get Experience
```
GET /api/portfolio/experience

Response:
{
  "success": true,
  "data": [
    {
      "role": "Software Engineering Intern",
      "company": "Tech Company",
      "duration": "6 months"
    }
  ]
}
```

#### 4. Get Skills
```
GET /api/portfolio/skills

Response:
{
  "success": true,
  "data": {
    "backend": ["Java", "Python", "Spring Boot", ...],
    "frontend": ["React", "JavaScript", "HTML5", ...],
    "data": ["Machine Learning", "TensorFlow", ...]
  }
}
```

#### 5. Get Projects
```
GET /api/portfolio/projects

Response:
{
  "success": true,
  "data": [
    {
      "title": "Project Name",
      "description": "Project description",
      "link": "https://project-link.com",
      "github": "https://github.com/project"
    }
  ]
}
```

#### 6. Download Resume
```
GET /api/resume/download

Response: PDF file
```

#### 7. Health Check
```
GET /api/health

Response:
{
  "status": "healthy",
  "service": "Portfolio API",
  "version": "1.0.0",
  "timestamp": "2024-01-15T10:30:00"
}
```

---

## 🎨 Customization

### Changing API Base URL
Edit `js/main.js`:
```javascript
const CONFIG = {
    API_BASE: 'https://your-api-domain.com/api'  // Change this
};
```

### Updating Portfolio Data
1. **Via PDF Resume** (Automatic):
   - Place your resume at path specified in `.env`
   - API automatically extracts and serves data

2. **Via Fallback Data** (When API is unavailable):
   - Edit `SAMPLE_DATA` object in `js/main.js`
   - Update education, experience, skills, projects, achievements

### Customizing Colors
Edit CSS variables in `css/animations.css`:
```css
:root {
    --primary-gradient: #667eea → #764ba2;
    --secondary-gradient: #f093fb → #f5576c;
    --accent-color: #667eea;
    --text-dark: #2d3436;
    --text-light: #ffffff;
    --bg-light: #f9fafb;
}
```

---

## 🚀 Deployment

### Option 1: GitHub Pages (Frontend Only)
```bash
git add .
git commit -m "feat: Implement interactive parallax portfolio"
git push origin main

# GitHub Actions automatically deploys to:
# https://github.com/AkashManda854/PORTFOLIO-MANDA-AKASH
```

### Option 2: Custom Domain (akashmanda.me)
1. Add CNAME file to root:
```
akashmanda.me
```

2. Update DNS settings at domain registrar:
   - Type: CNAME
   - Name: @
   - Value: AkashManda854.github.io

3. Enable GitHub Pages in repository settings

### Option 3: Self-Hosted Backend
```bash
# Build Docker image
docker build -t portfolio-backend:latest .

# Push to Docker Hub or registry
docker push your-registry/portfolio-backend:latest

# Deploy to VPS/Cloud:
# Docker, Kubernetes, AWS, Heroku, etc.
```

---

## 🧪 Testing

### Frontend Testing
1. Open browser DevTools (F12)
2. Check Network tab - verify API calls to backend
3. Check Console - should see no errors
4. Scroll through page - verify animations work smoothly
5. Test responsive design - resize browser or test on mobile

### Backend Testing
```bash
# Run API tests
cd backend
python -m pytest tests/

# Or manually test endpoints:
curl http://localhost:5000/api/portfolio
curl http://localhost:5000/api/health
curl http://localhost:5000/api/resume/download -o test.pdf
```

---

## 📊 Performance

- **Lighthouse Score**: Target 95+ (Performance, Accessibility, Best Practices, SEO)
- **Core Web Vitals**: LCP < 2.5s, FID < 100ms, CLS < 0.1
- **Animation FPS**: 60fps (GSAP optimized)
- **API Response Time**: < 200ms

---

## 🐛 Troubleshooting

### API Connection Failed
1. Ensure backend is running on port 5000
2. Check `.env` file has correct RESUME_PATH
3. Verify firewall allows port 5000
4. Check browser console for error messages

### Resume Not Parsing
1. Verify resume file path in `.env`
2. Ensure resume is in PDF format
3. Check PyPDF2 is installed: `pip show PyPDF2`
4. Review console logs for parsing errors

### GSAP Animations Not Working
1. Verify GSAP CDN links load correctly (Network tab)
2. Check ScrollTrigger plugin is registered
3. Ensure browser supports ES6+ JavaScript
4. Check if any CSS conflicts with animation styles

### CORS Errors
```
Access-Control-Allow-Origin: *
```
Already configured in `app.py`. If still getting errors:
1. Check Flask-CORS is installed
2. Verify API_BASE URL in `main.js` is correct
3. Ensure backend is running

---

## 👨‍💻 Author

**Akash Manda**
- 📧 Email: mandaakash33@gmail.com
- 🐙 GitHub: https://github.com/AkashManda854
- 💼 LinkedIn: https://linkedin.com/in/akash-manda-53654331b/
- 🌐 Website: https://akashmanda.me

---

## 📄 License

This project is open source and available under the MIT License.

---

## 🙏 Acknowledgments

- **GSAP** - Animation library by GreenSock
- **Flask** - Python web framework
- **GitHub Pages** - Free hosting & deployment

---

## 🎯 Future Enhancements

- [ ] Add blog section with markdown support
- [ ] Implement contact form with email notifications
- [ ] Add dark/light theme toggle
- [ ] Integrate analytics (Google Analytics, Mixpanel)
- [ ] Add testimonials section
- [ ] Implement social media feeds
- [ ] Create admin panel for content management
- [ ] Add i18n for multiple languages

---

**Last Updated**: January 2024  
**Version**: 1.0.0