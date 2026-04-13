/* ===================================================
   Akash Manda Portfolio – script.js
   Cyber-Minimalism meets Bento
   =================================================== */
'use strict';

// ─── CONSTANTS ───────────────────────────────────────────────────────────────
const PRELOADER_DELAY  = 1600;  // ms — slightly after loader bar fills (1400ms CSS)
const GLITCH_DURATION  = 220;   // ms — glitch animation length
const GLITCH_INTERVAL  = 9000;  // ms — periodic glitch interval

// ─── PRELOADER ────────────────────────────────────────────────────────────────
window.addEventListener('load', () => {
  const preloader = document.getElementById('preloader');
  if (preloader) {
    setTimeout(() => {
      preloader.classList.add('hidden');
      document.body.style.overflow = '';
      // Trigger GSAP hero entrance after preloader
      initHeroEntrance();
    }, PRELOADER_DELAY);
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
    .from('.hero-socials',  { y: 16, opacity: 0, duration: 0.5 }, '-=0.35')
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
    setTimeout(() => heroName.classList.remove('glitch'), GLITCH_DURATION);
  });
  // Also random periodic glitch
  setInterval(() => {
    heroName.classList.add('glitch');
    setTimeout(() => heroName.classList.remove('glitch'), GLITCH_DURATION);
  }, GLITCH_INTERVAL);
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
const NAV_HEIGHT = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-height')) || 72;
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const href = this.getAttribute('href');
    if (href === '#') return;
    const target = document.querySelector(href);
    if (target) {
      e.preventDefault();
      const top = target.getBoundingClientRect().top + window.scrollY - NAV_HEIGHT;
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
  btn.addEventListener('click', () => {
    const orig = btn.innerHTML;
    btn.innerHTML = '<ion-icon name="checkmark-circle-outline" aria-hidden="true"></ion-icon> Opening CV…';
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

// ═══════════════════════════════════════════════════════════════════════════
//  NEW FEATURES — UI/UX Overhaul (Phase 1–5)
// ═══════════════════════════════════════════════════════════════════════════

// Shared breakpoint constant (avoids duplication across feature modules)
const DESKTOP_MIN = 900;

// ─── PHASE 1: GSAP SCROLLTRIGGER — HORIZONTAL TIMELINE ────────────────────
(function initHorizontalTimeline() {
  const track = document.getElementById('timeline-h-track');
  const outer = document.getElementById('timeline-h-outer');
  if (!track || !outer || window.innerWidth <= DESKTOP_MIN) return;

  function setup() {
    if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;
    gsap.registerPlugin(ScrollTrigger);

    const totalShift = () => -(track.scrollWidth - outer.clientWidth + 32);

    gsap.to(track, {
      x: totalShift,
      ease: 'none',
      scrollTrigger: {
        trigger: outer,
        pin: true,
        pinSpacing: true,
        scrub: 1.2,
        start: 'top top',
        end: () => '+=' + Math.abs(totalShift()),
        invalidateOnRefresh: true,
      },
    });

    // Stagger cards in as the track scrolls
    gsap.from('.timeline-h-card', {
      opacity: 0,
      y: 40,
      stagger: 0.18,
      duration: 0.8,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: outer,
        start: 'top 80%',
        toggleActions: 'play none none none',
      },
    });
  }

  // GSAP + ScrollTrigger are already loaded via CDN before this script
  if (typeof ScrollTrigger !== 'undefined') {
    setup();
  } else {
    window.addEventListener('load', setup);
  }
})();

// ─── PHASE 2: THREE.JS HERO 3D NEURAL NETWORK ─────────────────────────────
(function initHero3D() {
  const heroCanvas = document.getElementById('hero-3d-canvas');
  if (!heroCanvas || window.innerWidth <= DESKTOP_MIN) return;

  function buildScene() {
    if (typeof THREE === 'undefined') return;
    const W = heroCanvas.clientWidth;
    const H = heroCanvas.clientHeight;

    const renderer = new THREE.WebGLRenderer({ canvas: heroCanvas, alpha: true, antialias: true });
    renderer.setSize(W, H);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, W / H, 0.1, 100);
    camera.position.z = 6;

    // Node positions
    const nodeCount = 24;
    const positions = Array.from({ length: nodeCount }, () => new THREE.Vector3(
      (Math.random() - 0.5) * 7,
      (Math.random() - 0.5) * 6,
      (Math.random() - 0.5) * 2.5
    ));

    // Nodes (spheres)
    const group = new THREE.Group();
    const nodeGeo = new THREE.SphereGeometry(0.072, 10, 10);
    positions.forEach(pos => {
      const mat = new THREE.MeshBasicMaterial({
        color: Math.random() > 0.5 ? 0x22d3ee : 0xa78bfa,
      });
      const mesh = new THREE.Mesh(nodeGeo, mat);
      mesh.position.copy(pos);
      group.add(mesh);
    });

    // Edges (lines between nearby nodes)
    const edgeMat = new THREE.LineBasicMaterial({
      color: 0x22d3ee,
      transparent: true,
      opacity: 0.18,
    });
    for (let i = 0; i < nodeCount; i++) {
      for (let j = i + 1; j < nodeCount; j++) {
        if (positions[i].distanceTo(positions[j]) < 3.2) {
          const geo = new THREE.BufferGeometry().setFromPoints([positions[i], positions[j]]);
          group.add(new THREE.Line(geo, edgeMat));
        }
      }
    }

    scene.add(group);

    // Mouse interaction
    let targetRX = 0, targetRY = 0;
    document.addEventListener('mousemove', (e) => {
      targetRY = ((e.clientX / window.innerWidth) - 0.5) * 0.7;
      targetRX = ((e.clientY / window.innerHeight) - 0.5) * -0.4;
    });

    let animId;
    function animate() {
      animId = requestAnimationFrame(animate);
      group.rotation.y += (targetRY - group.rotation.y) * 0.04;
      group.rotation.x += (targetRX - group.rotation.x) * 0.04;
      group.rotation.z += 0.0015;
      renderer.render(scene, camera);
    }
    animate();

    // Resize handler
    window.addEventListener('resize', () => {
      if (window.innerWidth <= 900) {
        cancelAnimationFrame(animId);
        renderer.dispose();
        return;
      }
      const nW = heroCanvas.clientWidth;
      const nH = heroCanvas.clientHeight;
      camera.aspect = nW / nH;
      camera.updateProjectionMatrix();
      renderer.setSize(nW, nH);
    });
  }

  // Lazy-load Three.js after page load
  window.addEventListener('load', () => {
    const s = document.createElement('script');
    s.src = 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r134/three.min.js';
    s.onload = buildScene;
    document.head.appendChild(s);
  });
})();

// ─── PHASE 3: INTERACTIVE TERMINAL ────────────────────────────────────────
(function initTerminal() {
  const overlay   = document.getElementById('terminal-overlay');
  const closeBtn  = document.getElementById('terminal-close');
  const inputEl   = document.getElementById('terminal-input');
  const outputEl  = document.getElementById('terminal-output');
  if (!overlay || !inputEl || !outputEl) return;

  const COMMANDS = {
    help: () => [
      '<span style="color:var(--cyan);font-weight:600">Available commands</span>',
      '  <span class="t-cmd">whoami</span>                  — Display user profile',
      '  <span class="t-cmd">cat skills.txt</span>          — List all skills',
      '  <span class="t-cmd">ls projects/</span>            — Show all projects',
      '  <span class="t-cmd">run tcs_codevita.py</span>     — Execute algorithm solver',
      '  <span class="t-cmd">init cyber_resilience.sh</span>— Boot AI cyber system',
      '  <span class="t-cmd">clear</span>                   — Clear terminal',
      '  <span class="t-cmd">exit</span>                    — Close terminal',
    ],
    whoami: () => [
      '┌─ USER PROFILE ─────────────────────────────────',
      '│  Name     : <span style="color:var(--white)">Akash Manda</span>',
      '│  Role     : Python Developer &amp; Cybersecurity Engineer',
      '│  Degree   : B.Tech CS @ BIET Hyderabad (2021–2025)',
      '│  Status   : <span style="color:#22c55e">● Available for Opportunities</span>',
      '│  Location : Hyderabad, Telangana, IN',
      '│  Email    : mandaakash33@gmail.com',
      '│  GitHub   : github.com/AkashManda854',
      '└────────────────────────────────────────────────',
    ],
    'cat skills.txt': () => [
      '<span style="color:var(--cyan)">[LANGUAGES] </span> Python(92%) · C++(85%) · Java(75%)',
      '<span style="color:var(--violet)">[SECURITY]  </span> Pen Testing · OWASP · Kali · Metasploit · Burp Suite',
      '<span style="color:var(--cyan)">[WEB]       </span> React · Flask · FastAPI · REST APIs · JWT',
      '<span style="color:var(--violet)">[DATA/AI]   </span> TensorFlow · Pandas · NumPy · Oracle SQL · MySQL',
      '<span style="color:var(--cyan)">[CLOUD]     </span> AWS Basics · Docker · Git &amp; GitHub · Linux CLI',
    ],
    'ls projects/': () => [
      '<span style="color:var(--cyan)">drwxr-xr-x</span>  ai_cyber_resilience/    <span style="color:#94a3b8">← Featured ⭐</span>',
      '<span style="color:var(--cyan)">drwxr-xr-x</span>  tcs_codevita_solutions/',
      '<span style="color:var(--cyan)">drwxr-xr-x</span>  owasp_webapp/',
      '<span style="color:var(--cyan)">drwxr-xr-x</span>  pen_test_toolkit/',
      '',
      '<span style="color:#94a3b8">4 directories</span>',
    ],
    'run tcs_codevita.py': () => [
      '<span style="color:var(--violet)">$ python tcs_codevita.py --problem="Graph Traversal"</span>',
      'Initialising Segment Tree with Lazy Propagation…',
      'Loading 500-node competitive test case…',
      'Running BFS/DFS optimisation pass…',
      '<span style="color:#22c55e">✓ Query complexity: O(n) → O(log n)</span>',
      '<span style="color:#22c55e">✓ All test cases PASSED (500/500)</span>',
      '<span style="color:var(--cyan)">Execution time: 47ms  |  Memory: 2.1 MB</span>',
    ],
    'init cyber_resilience.sh': () => [
      '<span style="color:var(--violet)">$ bash cyber_resilience.sh --mode=live</span>',
      'Loading TensorFlow model weights (CICIDS-2017 dataset)…',
      'Initialising real-time network traffic pipeline…',
      'Calibrating anomaly thresholds…',
      '<span style="color:#22c55e">✓ Model loaded — detection accuracy: 94.7%</span>',
      '<span style="color:#22c55e">✓ Inference latency: &lt;50ms per packet</span>',
      '<span style="color:var(--cyan)">🛡️  AI Cyber Resilience System ONLINE</span>',
    ],
  };

  function appendLines(lines) {
    lines.forEach(html => {
      const p = document.createElement('p');
      p.className = 't-line';
      p.innerHTML = html;
      outputEl.appendChild(p);
    });
    outputEl.scrollTop = outputEl.scrollHeight;
  }

  function runCommand(raw) {
    const cmd = raw.trim().toLowerCase();
    // Echo the command
    const echo = document.createElement('p');
    echo.className = 't-line t-echo-cmd';
    echo.textContent = 'akash@portfolio:~$ ' + raw.trim();
    outputEl.appendChild(echo);

    if (cmd === '') { /* noop */ }
    else if (cmd === 'clear') {
      outputEl.innerHTML = '';
    } else if (cmd === 'exit') {
      closeTerminal();
    } else if (COMMANDS[cmd]) {
      appendLines(COMMANDS[cmd]());
    } else {
      const err = document.createElement('p');
      err.className = 't-line t-error';
      err.textContent = 'command not found: ' + raw.trim() + '. Type help for available commands.';
      outputEl.appendChild(err);
    }
    outputEl.scrollTop = outputEl.scrollHeight;
  }

  function openTerminal() {
    overlay.hidden = false;
    overlay.removeAttribute('hidden');
    requestAnimationFrame(() => { if (inputEl) inputEl.focus(); });
  }

  function closeTerminal() {
    overlay.hidden = true;
    overlay.setAttribute('hidden', '');
  }

  // Keyboard trigger
  document.addEventListener('keydown', (e) => {
    // Backtick (`) or Ctrl+Alt+T
    if ((e.key === '`' && !e.ctrlKey && !e.altKey && !e.metaKey && e.target.tagName !== 'INPUT' && e.target.tagName !== 'TEXTAREA') ||
        (e.key === 't' && e.ctrlKey && e.altKey)) {
      e.preventDefault();
      overlay.hidden ? openTerminal() : closeTerminal();
    }
    if (e.key === 'Escape' && !overlay.hidden) {
      closeTerminal();
    }
  });

  // Close button
  if (closeBtn) closeBtn.addEventListener('click', closeTerminal);

  // Click outside to close
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) closeTerminal();
  });

  // Command submission
  inputEl.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      const val = inputEl.value;
      inputEl.value = '';
      runCommand(val);
    }
  });
})();

// ─── PHASE 3: KONAMI CODE EASTER EGG ─────────────────────────────────────
(function initKonami() {
  const KONAMI = ['ArrowUp','ArrowUp','ArrowDown','ArrowDown','ArrowLeft','ArrowRight','ArrowLeft','ArrowRight','b','a'];
  let idx = 0;

  document.addEventListener('keydown', (e) => {
    if (e.key === KONAMI[idx]) {
      idx++;
      if (idx === KONAMI.length) {
        idx = 0;
        triggerHackerMode();
      }
    } else {
      idx = (e.key === KONAMI[0]) ? 1 : 0;
    }
  });

  function triggerHackerMode() {
    const flash = document.getElementById('hacker-flash');
    if (!flash) return;

    // Show flash overlay
    flash.hidden = false;
    flash.removeAttribute('hidden');

    // Brief hacker mode theme on body
    document.body.classList.add('hacker-mode');

    setTimeout(() => {
      flash.hidden = true;
      flash.setAttribute('hidden', '');
    }, 2200);

    setTimeout(() => {
      document.body.classList.remove('hacker-mode');
    }, 2500);
  }
})();

// ─── PHASE 4: ENHANCED CURSOR — contextual states ─────────────────────────
(function initEnhancedCursor() {
  if (window.innerWidth <= DESKTOP_MIN) return;

  // Inject the VIEW label element
  const viewLabel = document.createElement('div');
  viewLabel.className = 'cursor-view-label';
  viewLabel.textContent = 'VIEW';
  document.body.appendChild(viewLabel);

  // Track mouse for VIEW label
  let mx = 0, my = 0;
  document.addEventListener('mousemove', (e) => {
    mx = e.clientX; my = e.clientY;
    viewLabel.style.left = mx + 'px';
    viewLabel.style.top  = my + 'px';
  });

  // Project card hover → show "VIEW" + expand follower
  document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
      viewLabel.classList.add('visible');
      const cf = document.querySelector('.cursor-follower');
      if (cf) {
        cf.style.width  = '68px';
        cf.style.height = '68px';
        cf.style.background = 'rgba(34,211,238,0.08)';
      }
    });
    card.addEventListener('mouseleave', () => {
      viewLabel.classList.remove('visible');
      const cf = document.querySelector('.cursor-follower');
      if (cf) {
        cf.style.width  = '32px';
        cf.style.height = '32px';
        cf.style.background = '';
      }
    });
  });

  // Text hover → mix-blend-mode difference on cursor dot
  const cursorDot = document.querySelector('.cursor');
  document.querySelectorAll('h1, h2, h3, p, .section-title').forEach(el => {
    el.addEventListener('mouseenter', () => {
      if (cursorDot) {
        cursorDot.style.width  = '28px';
        cursorDot.style.height = '28px';
        cursorDot.style.mixBlendMode = 'difference';
        cursorDot.style.background = '#ffffff';
      }
    });
    el.addEventListener('mouseleave', () => {
      if (cursorDot) {
        cursorDot.style.width  = '10px';
        cursorDot.style.height = '10px';
        cursorDot.style.mixBlendMode = 'screen';
        cursorDot.style.background = 'var(--cyan)';
      }
    });
  });
})();

// ─── PHASE 4: THEME SWITCHER (Cyber ↔ Corporate) ─────────────────────────
(function initThemeSwitcher() {
  const btn  = document.getElementById('theme-toggle');
  const icon = document.getElementById('theme-icon');
  if (!btn) return;

  const STORAGE_KEY = 'am-theme';
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved === 'corporate') {
    document.documentElement.classList.add('theme-corporate');
    if (icon) icon.setAttribute('name', 'moon-outline');
  }

  btn.addEventListener('click', () => {
    const isCorp = document.documentElement.classList.toggle('theme-corporate');
    localStorage.setItem(STORAGE_KEY, isCorp ? 'corporate' : 'cyber');
    if (icon) icon.setAttribute('name', isCorp ? 'moon-outline' : 'sunny-outline');
  });
})();

// ─── PHASE 5: GITHUB REST API — LIVE ACTIVITY ─────────────────────────────
(function fetchGitHubActivity() {
  const container = document.getElementById('github-activity');
  if (!container) return;

  // Use cached result within the same session to avoid rate-limit churn
  const CACHE_KEY = 'am-gh-repos';
  const cached = sessionStorage.getItem(CACHE_KEY);
  if (cached) { renderRepos(JSON.parse(cached)); return; }

  fetch('https://api.github.com/users/AkashManda854/repos?sort=updated&per_page=6')
    .then(r => {
      if (!r.ok) throw new Error('GitHub API ' + r.status);
      return r.json();
    })
    .then(repos => {
      if (!Array.isArray(repos) || !repos.length) throw new Error('empty');
      sessionStorage.setItem(CACHE_KEY, JSON.stringify(repos));
      renderRepos(repos);
    })
    .catch(() => {
      container.innerHTML = '<span class="gh-empty">Activity unavailable — visit <a href="https://github.com/AkashManda854" target="_blank" rel="noopener noreferrer" style="color:var(--cyan)">github.com/AkashManda854</a></span>';
    });

  function renderRepos(repos) {
    container.innerHTML = repos
      .filter(r => !r.fork)
      .slice(0, 4)
      .map(r => {
        const updated = new Date(r.updated_at).toLocaleDateString(navigator.language, { day: 'numeric', month: 'short', year: 'numeric' });
        const stars   = r.stargazers_count || 0;
        const lang    = r.language || '—';
        // Sanitise repo name for safe HTML insertion
        const safeName = r.name.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
        const safeUrl  = r.html_url.startsWith('https://github.com/') ? r.html_url : '#';
        return `
            <a href="${safeUrl}" target="_blank" rel="noopener noreferrer" class="gh-commit-card">
              <span class="gh-commit-dot">⬡</span>
              <div>
                <div class="gh-commit-msg">${safeName}</div>
                <div class="gh-commit-meta">${lang} · ⭐${stars} · ${updated}</div>
              </div>
            </a>`;
      })
      .join('');
  }
})();
