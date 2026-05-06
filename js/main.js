// ═══════════════════════════════════════════════════════════
// INTERACTIVE PARALLAX PORTFOLIO
// GSAP ScrollTrigger Animations
// ═══════════════════════════════════════════════════════════

// Register GSAP Plugin
gsap.registerPlugin(ScrollTrigger);

// Configuration
const CONFIG = {
    speed: 100,
    animationDuration: 0.8,
    staggerAmount: 0.1,
    API_BASE: 'http://localhost:5000/api'
};

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    initializeParallax();
    loadPortfolioData();
    setupScrollAnimations();
    setupInteractions();
});

/**
 * Initialize Parallax SVG Animations
 */
function initializeParallax() {
    const svg = document.querySelector('svg.parallax');
    if (!svg) return;
    
    const height = svg.getBBox().height;
    
    // Set initial states
    gsap.set(['#dinoL', '#dinoR'], { y: 80 });
    gsap.set('#dinoL', { x: -10 });
    gsap.set('#bg_grad', { attr: { cy: '-50' } });
    
    // Scene 1: Day Transition
    const scene1 = gsap.timeline();
    ScrollTrigger.create({
        animation: scene1,
        trigger: '.scrollElement',
        start: 'top top',
        end: '45% 100%',
        scrub: 3
    });
    
    // Hills parallax movement
    const hills = ['#h1-1', '#h1-2', '#h1-3', '#h1-4', '#h1-5', '#h1-6', '#h1-7', '#h1-8', '#h1-9'];
    hills.forEach((hill, index) => {
        scene1.to(hill, {
            y: (3 - index * 0.2) * CONFIG.speed,
            x: Math.random() * 2 * CONFIG.speed - CONFIG.speed,
            ease: 'power1.in'
        }, index * 0.03);
    });
    
    // Cloud animations
    scene1.to('#cloudStart-L', { x: -300 }, 0);
    scene1.to('#cloudStart-R', { x: 300 }, 0);
    scene1.to(['#cloudsBig-L', '#cloudsBig-R'], { y: 4.5 * CONFIG.speed, x: -0.2 * CONFIG.speed }, 0);
    
    // Animate info text
    scene1.to('#info', { y: 8 * CONFIG.speed }, 0);
    
    // Sun and background gradient animation
    const sunTimeline = gsap.timeline();
    ScrollTrigger.create({
        animation: sunTimeline,
        trigger: '.scrollElement',
        start: '1% top',
        end: '2150 100%',
        scrub: 2
    });
    
    sunTimeline.fromTo('#bg_grad', 
        { attr: { cy: '-50' } }, 
        { attr: { cy: '330' } }, 
        0
    );
}

/**
 * Load Portfolio Data from Backend API
 */
async function loadPortfolioData() {
    try {
        // Try to fetch from backend, fallback to sample data
        const data = await fetchPortfolioData();
        populatePortfolioContent(data);
    } catch (error) {
        console.warn('Backend not available, using sample data:', error);
        populatePortfolioContent(SAMPLE_DATA);
    }
}

/**
 * Fetch portfolio data from API
 */
async function fetchPortfolioData() {
    try {
        const response = await fetch(`${CONFIG.API_BASE}/portfolio`);
        if (!response.ok) throw new Error('API not available');
        return await response.json();
    } catch (error) {
        throw error;
    }
}

/**
 * Populate portfolio content
 */
function populatePortfolioContent(data) {
    // Education
    const educationEl = document.getElementById('education-content');
    if (educationEl && data.education) {
        educationEl.innerHTML = data.education.map(edu => 
            `<strong>${edu.degree}</strong> from ${edu.institution} (${edu.year})`
        ).join('<br>');
    }
    
    // Experience
    const experienceEl = document.getElementById('experience-content');
    if (experienceEl && data.experience) {
        experienceEl.innerHTML = data.experience.map(exp =>
            `<strong>${exp.role}</strong> at ${exp.company} (${exp.duration})`
        ).join('<br>');
    }
    
    // Skills
    populateSkills(data.skills);
    
    // Projects
    populateProjects(data.projects);
    
    // Achievements
    const achievementsEl = document.getElementById('achievements-content');
    if (achievementsEl && data.achievements) {
        achievementsEl.innerHTML = data.achievements.join('<br>');
    }
}

/**
 * Populate skills section
 */
function populateSkills(skills) {
    const backendSkills = document.getElementById('backend-skills');
    const frontendSkills = document.getElementById('frontend-skills');
    const dataSkills = document.getElementById('data-skills');
    
    if (backendSkills && skills.backend) {
        backendSkills.innerHTML = skills.backend
            .map(skill => `<span class="skill-tag">${skill}</span>`)
            .join('');
    }
    
    if (frontendSkills && skills.frontend) {
        frontendSkills.innerHTML = skills.frontend
            .map(skill => `<span class="skill-tag">${skill}</span>`)
            .join('');
    }
    
    if (dataSkills && skills.data) {
        dataSkills.innerHTML = skills.data
            .map(skill => `<span class="skill-tag">${skill}</span>`)
            .join('');
    }
}

/**
 * Populate projects section
 */
function populateProjects(projects) {
    const projectsContainer = document.getElementById('projects-content');
    if (!projectsContainer) return;
    
    projectsContainer.innerHTML = projects.map(project => `
        <div class="project-card">
            <h3>${project.title}</h3>
            <p>${project.description}</p>
            <div>
                ${project.link ? `<a href="${project.link}" target="_blank" class="project-link">View Project →</a>` : ''}
                ${project.github ? `<a href="${project.github}" target="_blank" class="project-link">GitHub →</a>` : ''}
            </div>
        </div>
    `).join('');
}

/**
 * Setup Scroll Animations
 */
function setupScrollAnimations() {
    // Animate sections on scroll
    const sections = document.querySelectorAll('.section');
    sections.forEach((section, index) => {
        gsap.from(section, {
            scrollTrigger: {
                trigger: section,
                start: 'top 80%',
                end: 'bottom 20%',
                toggleActions: 'play none none reverse'
            },
            opacity: 0,
            y: 50,
            duration: 0.8,
            delay: index * 0.1
        });
    });
    
    // Animate content inside sections
    const cards = document.querySelectorAll('.about-card, .project-card, .skill-category');
    cards.forEach((card, index) => {
        gsap.from(card, {
            scrollTrigger: {
                trigger: card,
                start: 'top 85%',
                toggleActions: 'play none none reverse'
            },
            opacity: 0,
            y: 30,
            duration: 0.6,
            delay: (index % 3) * 0.1
        });
    });
}

/**
 * Setup Interactive Features
 */
function setupInteractions() {
    // Smooth scroll for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
    
    // Scroll progress indicator
    window.addEventListener('scroll', updateScrollProgress);
    
    // Download resume button
    const downloadBtn = document.querySelector('.download-resume');
    if (downloadBtn) {
        downloadBtn.addEventListener('click', downloadResume);
    }
}

/**
 * Update Scroll Progress Bar
 */
function updateScrollProgress() {
    const scrollProgress = document.getElementById('scroll-progress');
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrolled = (scrollTop / docHeight) * 100;
    
    if (scrollProgress) {
        scrollProgress.style.width = scrolled + '%';
    }
}

/**
 * Download Resume
 */
async function downloadResume() {
    try {
        const response = await fetch(`${CONFIG.API_BASE}/resume/download`, {
            method: 'GET'
        });
        
        if (!response.ok) throw new Error('Could not download resume');
        
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'Akash_Manda_Resume.pdf';
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
    } catch (error) {
        console.error('Error downloading resume:', error);
        alert('Resume download not available. Please check back later.');
    }
}

/**
 * Sample Portfolio Data (Fallback)
 */
const SAMPLE_DATA = {
    education: [
        {
            degree: 'B.Tech in Computer Science & Engineering',
            institution: 'Bharat Institute of Engineering & Technology (BIET)',
            year: '2024'
        }
    ],
    experience: [
        {
            role: 'Software Engineering Intern',
            company: 'Tech Company',
            duration: '6 months'
        }
    ],
    achievements: [
        '🏆 Strong foundation in backend systems and data analytics',
        '📊 Experience with machine learning and data science',
        '🚀 Full-stack development capabilities'
    ],
    skills: {
        backend: [
            'Java',
            'Python',
            'Spring Boot',
            'RESTful APIs',
            'Microservices',
            'SQL',
            'PostgreSQL'
        ],
        frontend: [
            'React.js',
            'HTML5',
            'CSS3',
            'JavaScript',
            'GSAP',
            'Responsive Design'
        ],
        data: [
            'Machine Learning',
            'Data Analytics',
            'TensorFlow',
            'Pandas',
            'NumPy',
            'Scikit-learn'
        ]
    },
    projects: [
        {
            title: 'E-Commerce Backend System',
            description: 'Scalable microservices-based backend for e-commerce platform using Spring Boot and PostgreSQL.',
            link: '#',
            github: 'https://github.com/AkashManda854'
        },
        {
            title: 'Machine Learning Prediction Model',
            description: 'Advanced ML model for data prediction and analysis using TensorFlow and Python.',
            link: '#',
            github: 'https://github.com/AkashManda854'
        },
        {
            title: 'Interactive Portfolio (This Site)',
            description: 'Modern parallax portfolio built with GSAP, ScrollTrigger, and full-stack architecture.',
            link: '#',
            github: 'https://github.com/AkashManda854/PORTFOLIO-MANDA-AKASH'
        }
    ]
};

// Reset scroll on page refresh
window.addEventListener('beforeunload', () => {
    window.scrollTo(0, 0);
});

// Log on load
console.log('🚀 Akash Manda Portfolio Loaded');
console.log('📧 Contact: mandaakash33@gmail.com');
console.log('💼 LinkedIn: https://linkedin.com/in/akash-manda-53654331b/');
console.log('🐙 GitHub: https://github.com/AkashManda854');
