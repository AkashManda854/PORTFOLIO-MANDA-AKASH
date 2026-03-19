/* ===================================================
   Akash Manda Portfolio – script.js
   Cyber-Minimalism meets Bento
   =================================================== */
'use strict';

// ─── PRELOADER ────────────────────────────────────────────────────────────────
window.addEventListener('load', () => {
  const preloader = document.getElementById('preloader');
  if (preloader) {
    setTimeout(() => {
      preloader.classList.add('hidden');
      document.body.style.overflow = '';
      // Trigger GSAP hero entrance after preloader
      initHeroEntrance();
    }, 1500);
  }
});
document.body.style.overflow = 'hidden';

// ─── GSAP HERO ENTRANCE ──────────────────────────────────────────────────────
function initHeroEntrance() {
  if (typeof gsap === 'undefined') return;
  const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
  tl.from('.hero-badge',    { y: 30, opacity: 0, duration: 0.7 })
    .from('.hero-name',     { y: 40, opacity: 0, duration: 0.8 }, '-=0.4')
    .from('.hero-tagline',  { y: 30, opacity: 0, duration: 0.7 }, '-=0.5')
    .from('.hero-desc',     { y: 24, opacity: 0, duration: 0.6 }, '-=0.5')
    .from('.btn-group',     { y: 20, opacity: 0, duration: 0.6 }, '-=0.4')
    .from('.hero-scroll-hint', { y: 16, opacity: 0, duration: 0.5 }, '-=0.3');
}

// ─── CUSTOM CURSOR ───────────────────────────────────────────────────────────
const cursor = document.querySelector('.cursor');
const cursorFollower = document.querySelector('.cursor-follower');

if (cursor && cursorFollower && window.innerWidth > 768) {
  let mouseX = 0, mouseY = 0, followerX = 0, followerY = 0;

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX; mouseY = e.clientY;
    cursor.style.left = mouseX + 'px'; cursor.style.top = mouseY + 'px';
  });

  (function animateFollower() {
    followerX += (mouseX - followerX) * 0.12;
    followerY += (mouseY - followerY) * 0.12;
    cursorFollower.style.left = followerX + 'px';
    cursorFollower.style.top  = followerY + 'px';
    requestAnimationFrame(animateFollower);
  })();

  document.querySelectorAll('a, button, .project-card, .bento-card, .cert-card').forEach(el => {
    el.addEventListener('mouseenter', () => {
      cursor.style.width  = '18px'; cursor.style.height  = '18px';
      cursorFollower.style.width  = '52px'; cursorFollower.style.height = '52px';
      cursorFollower.style.borderColor = 'rgba(167,139,250,0.6)';
    });
    el.addEventListener('mouseleave', () => {
      cursor.style.width  = '10px'; cursor.style.height  = '10px';
      cursorFollower.style.width  = '32px'; cursorFollower.style.height = '32px';
      cursorFollower.style.borderColor = 'rgba(34,211,238,0.4)';
    });
  });
}

// ─── PARTICLES CANVAS ────────────────────────────────────────────────────────
const canvas = document.getElementById('particles-canvas');
if (canvas) {
  const ctx = canvas.getContext('2d');
  let particles = [];

  function resizeCanvas() { canvas.width = window.innerWidth; canvas.height = window.innerHeight; }
  resizeCanvas();
  window.addEventListener('resize', resizeCanvas);

  class Particle {
    constructor() { this.reset(); }
    reset() {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
      this.size = Math.random() * 1.8 + 0.3;
      this.speedX = (Math.random() - 0.5) * 0.35;
      this.speedY = (Math.random() - 0.5) * 0.35;
      this.opacity = Math.random() * 0.45 + 0.08;
      const cols = ['34, 211, 238', '167, 139, 250', '56, 189, 248'];
      this.color = cols[Math.floor(Math.random() * cols.length)];
    }
    update() {
      this.x += this.speedX; this.y += this.speedY;
      if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
      if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
    }
    draw() {
      ctx.beginPath(); ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${this.color}, ${this.opacity})`; ctx.fill();
    }
  }

  function initParticles() {
    const count = Math.min(70, Math.floor(canvas.width * canvas.height / 18000));
    particles = Array.from({ length: count }, () => new Particle());
  }

  function drawConnections() {
    const maxDist = 110;
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx*dx + dy*dy);
        if (dist < maxDist) {
          const alpha = (1 - dist / maxDist) * 0.12;
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(34, 211, 238, ${alpha})`;
          ctx.lineWidth = 0.7; ctx.stroke();
        }
      }
    }
  }

  function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => { p.update(); p.draw(); });
    drawConnections();
    requestAnimationFrame(animateParticles);
  }

  initParticles(); animateParticles();
}

// ─── NAVBAR ───────────────────────────────────────────────────────────────────
const navbar   = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const navMenu  = document.getElementById('nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
  if (navbar) {
    navbar.classList.toggle('scrolled', window.scrollY > 50);
  }
  updateActiveNav();
  updateScrollProgress();
  toggleBackToTop();
});

if (hamburger && navMenu) {
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('open');
  });
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('active');
      navMenu.classList.remove('open');
    });
  });
  document.addEventListener('click', (e) => {
    if (navbar && !navbar.contains(e.target)) {
      hamburger.classList.remove('active');
      navMenu.classList.remove('open');
    }
  });
}

function updateActiveNav() {
  const scrollPos = window.scrollY + 100;
  document.querySelectorAll('section[id]').forEach(section => {
    const top = section.offsetTop;
    const bottom = top + section.offsetHeight;
    const id = section.getAttribute('id');
    const link = document.querySelector(`.nav-link[href="#${id}"]`);
    if (link) {
      link.classList.toggle('active', scrollPos >= top && scrollPos < bottom);
    }
  });
}

// ─── SCROLL PROGRESS BAR ─────────────────────────────────────────────────────
const progressBar = document.getElementById('scroll-progress');
function updateScrollProgress() {
  if (!progressBar) return;
  const scrollTop  = document.documentElement.scrollTop || document.body.scrollTop;
  const scrollH    = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  progressBar.style.width = (scrollTop / scrollH * 100) + '%';
}

// ─── TYPEWRITER ───────────────────────────────────────────────────────────────
const typeEl = document.querySelector('.typewriter-text');
if (typeEl) {
  const phrases = [
    'Engineering secure solutions with Python and C++.',
    'Solving complex algorithms with Data Structures.',
    'Penetration Testing & Ethical Hacking.',
    'Building intelligent ML-powered defenses.',
    'Full Stack Developer | Cybersecurity Enthusiast.'
  ];
  let pi = 0, ci = 0, deleting = false;
  function type() {
    const phrase = phrases[pi];
    typeEl.textContent = deleting
      ? phrase.substring(0, ci - 1)
      : phrase.substring(0, ci + 1);
    deleting ? ci-- : ci++;
    let delay = deleting ? 45 : 90;
    if (!deleting && ci === phrase.length) { delay = 2200; deleting = true; }
    else if (deleting && ci === 0) { deleting = false; pi = (pi + 1) % phrases.length; delay = 400; }
    setTimeout(type, delay);
  }
  type();
}

// ─── GLITCH ON HERO NAME ─────────────────────────────────────────────────────
const heroName = document.querySelector('.hero-name');
if (heroName) {
  heroName.addEventListener('mouseenter', () => {
    heroName.classList.add('glitch');
    setTimeout(() => heroName.classList.remove('glitch'), 220);
  });
  // Also random periodic glitch
  setInterval(() => {
    heroName.classList.add('glitch');
    setTimeout(() => heroName.classList.remove('glitch'), 220);
  }, 9000);
}

// ─── MAGNETIC BUTTONS (50px radius pull) ─────────────────────────────────────
document.querySelectorAll('.magnetic-btn').forEach(btn => {
  btn.addEventListener('mousemove', (e) => {
    const rect = btn.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = e.clientX - cx;
    const dy = e.clientY - cy;
    const dist = Math.sqrt(dx*dx + dy*dy);
    if (dist < 70) {
      const pull = (1 - dist / 70);
      btn.style.transform = `translate(${dx * pull * 0.35}px, ${dy * pull * 0.35}px) translateY(-3px)`;
    }
  });
  btn.addEventListener('mouseleave', () => {
    btn.style.transform = '';
  });
});

// ─── INTERSECTION OBSERVER – FADE-IN ─────────────────────────────────────────
const fadeObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) { entry.target.classList.add('visible'); }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -50px 0px' });

document.querySelectorAll('.fade-in, .fade-in-left, .fade-in-right, .stagger-children').forEach(el => {
  fadeObserver.observe(el);
});

// ─── SKILL BAR ANIMATION ─────────────────────────────────────────────────────
const skillObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.querySelectorAll('.skill-bar-fill').forEach(bar => {
        const target = bar.getAttribute('data-width');
        setTimeout(() => { bar.style.width = target + '%'; }, 250);
      });
      skillObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.2 });
document.querySelectorAll('.bento-card').forEach(c => skillObserver.observe(c));

// ─── TIMELINE ANIMATION ──────────────────────────────────────────────────────
const tlObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) { entry.target.classList.add('visible'); }
  });
}, { threshold: 0.15 });
document.querySelectorAll('.timeline-item').forEach(item => tlObserver.observe(item));

// ─── COUNTER ANIMATION ───────────────────────────────────────────────────────
const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.querySelectorAll('[data-count]').forEach(el => {
        const target = parseInt(el.getAttribute('data-count'));
        const suffix = el.getAttribute('data-suffix') || '';
        let current = 0;
        const inc = target / 50;
        const timer = setInterval(() => {
          current += inc;
          if (current >= target) { current = target; clearInterval(timer); }
          el.textContent = Math.floor(current) + suffix;
        }, 40);
      });
      counterObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });
document.querySelectorAll('.about-stats').forEach(el => counterObserver.observe(el));

// ─── BACK TO TOP ─────────────────────────────────────────────────────────────
const backToTopBtn = document.getElementById('back-to-top');
function toggleBackToTop() {
  if (backToTopBtn) backToTopBtn.classList.toggle('visible', window.scrollY > 400);
}
if (backToTopBtn) {
  backToTopBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
}

// ─── SMOOTH SCROLL ───────────────────────────────────────────────────────────
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const href = this.getAttribute('href');
    if (href === '#') return;
    const target = document.querySelector(href);
    if (target) {
      e.preventDefault();
      const top = target.getBoundingClientRect().top + window.scrollY - 72;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});

// ─── PROJECT CARD 3D TILT ────────────────────────────────────────────────────
if (window.innerWidth > 768) {
  document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width  - 0.5;
      const y = (e.clientY - rect.top)  / rect.height - 0.5;
      card.style.transform = `translateY(-8px) rotateX(${-y*6}deg) rotateY(${x*6}deg) scale(1.015)`;
      card.style.transition = 'transform 0.08s ease';
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = ''; card.style.transition = 'all 0.4s cubic-bezier(0.4,0,0.2,1)';
    });
  });
}

// ─── CONTACT FORM ────────────────────────────────────────────────────────────
const contactForm = document.getElementById('contact-form');
const formSuccess = document.getElementById('form-success');
if (contactForm) {
  contactForm.addEventListener('submit', function (e) {
    e.preventDefault();
    const submitBtn = this.querySelector('.form-submit');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '⏳ Sending...'; submitBtn.disabled = true;
    setTimeout(() => {
      submitBtn.innerHTML = '✅ Message Sent!';
      if (formSuccess) formSuccess.style.display = 'block';
      contactForm.reset();
      setTimeout(() => {
        submitBtn.innerHTML = originalText; submitBtn.disabled = false;
        if (formSuccess) formSuccess.style.display = 'none';
      }, 4000);
    }, 1500);
  });
}

// ─── DOWNLOAD RESUME FEEDBACK ────────────────────────────────────────────────
document.querySelectorAll('.download-resume').forEach(btn => {
  btn.addEventListener('click', (e) => {
    e.preventDefault();
    const orig = btn.innerHTML;
    btn.innerHTML = '✅ Downloaded!';
    setTimeout(() => { btn.innerHTML = orig; }, 2200);
  });
});

// ─── AOS INIT (if library loaded) ────────────────────────────────────────────
window.addEventListener('load', () => {
  if (typeof AOS !== 'undefined') {
    AOS.init({ duration: 700, once: true, offset: 60, easing: 'ease-out-cubic' });
  }
});

// ─── PARALLAX HERO BG ────────────────────────────────────────────────────────
window.addEventListener('scroll', () => {
  const heroBg = document.querySelector('.hero-bg');
  if (heroBg && window.scrollY < window.innerHeight) {
    heroBg.style.transform = `translateY(${window.scrollY * 0.25}px)`;
  }
});
