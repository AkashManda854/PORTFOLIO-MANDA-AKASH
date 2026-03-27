# PORTFOLIO-MANDA-AKASH

> **Live site:** [akashmanda.me](https://akashmanda.me)

A fully hand-crafted, single-page personal portfolio for **Akash Manda** — Final Year B.Tech CS student at BIET, Hyderabad — built with pure HTML5, CSS3, and vanilla JavaScript (no frameworks). The design language is **"Cyber-Minimalism meets Bento"**: a dark cyberpunk aesthetic with cyan/violet neon accents, smooth animations, and a responsive bento-grid layout.

---

## 📋 Point-wise Summary — What Was Built (Start → End)

### 1. Project Setup & Hosting
- Single-page application (`index.html`) deployed to **GitHub Pages** with a custom domain configured via `CNAME` (`akashmanda.me`).
- `/.nojekyll` file added so GitHub Pages serves the site without Jekyll preprocessing.

---

### 2. Preloader Screen
- Full-screen loading overlay (`#preloader`) with an animated progress bar.
- Disappears after **1,600 ms** using a CSS transition (`hidden` class) and then triggers the GSAP hero entrance sequence.
- `document.body` overflow is locked to `hidden` while the preloader is active to prevent layout flash.

---

### 3. Animated Particle Canvas Background
- An HTML5 `<canvas id="particles-canvas">` covers the full viewport behind all content.
- **70 floating particles** (cyan, violet, sky-blue) drift slowly and are connected by translucent lines when within 110 px of each other — creating a live "network mesh" effect.
- Canvas auto-resizes on `window.resize`.

---

### 4. Navigation Bar (`#navbar`)
- Sticky top navbar with a **blur/glassmorphism** background that intensifies after 50 px of scroll (`.scrolled` class).
- Nav links: **Home · About · Skills · Projects · Experience · Contact**.
- Active link is highlighted automatically as the user scrolls into each section (Intersection-based `updateActiveNav()`).
- **Hamburger menu** for mobile (<768 px) toggles the nav drawer; closes on outside click or link click.
- **Scroll-progress bar** (`#scroll-progress`) at the very top tracks page read percentage.

---

### 5. Custom Cursor (Desktop)
- Replaces the default OS cursor on screens wider than 768 px.
- A small dot (`.cursor`) follows the mouse exactly; a larger ring (`.cursor-follower`) lags behind with lerp smoothing (`0.12` factor) for a fluid trailing effect.
- Cursor ring expands and changes colour to violet when hovering interactive elements (links, buttons, cards).

---

### 6. Hero Section (`#hero`)
- **SVG cyberpunk geometric background** — hexagonal grid, diagonal scan lines, concentric circles, and corner ornaments — all drawn inline with two `linearGradient` definitions.
- **Status badge** — "Available for Opportunities · Hyderabad, IN" with a pulsing green dot.
- **Glitch-effect hero name** — `Akash Manda` gets a CSS glitch animation on `mouseenter` *and* every **9 seconds** automatically.
- **Typewriter tagline** — five phrases cycle with realistic typing/deleting speeds:
  1. *Engineering secure solutions with Python and C++.*
  2. *Solving complex algorithms with Data Structures.*
  3. *Penetration Testing & Ethical Hacking.*
  4. *Building intelligent ML-powered defences.*
  5. *Full Stack Developer | Cybersecurity Enthusiast.*
- **Magnetic CTA buttons** — "View My Work" and "Download CV (Secure PDF)" use a mouse-proximity pull effect (70 px radius, `0.35` strength).
- **GSAP staggered entrance** — badge → name → tagline → description → buttons → scroll-hint animate in sequence after the preloader exits.
- **Parallax hero background** — SVG layer scrolls at `0.25×` speed to create a depth illusion.
- **Scroll-down hint** with a bouncing arrow.

---

### 7. About Section (`#about`)
- Personal introduction text and a **Bento-style stats row** with animated counters:
  - **3+** Projects
  - **5+** Technologies
  - **2+** Certifications (at time of launch)
- Stats animate from `0` to their target over 50 incremental steps when scrolled into view.

---

### 8. Skill Matrix Section (`#skills`)
- Organised into four **Bento cards** using CSS Grid:

  | Card | Skills |
  |------|--------|
  | **Core Languages** | Python (92 %), C++/DSA (85 %), Java (75 %), Data Structures & Algorithms (88 %), OOP (90 %), Problem Solving (87 %) |
  | **Cybersecurity** | Penetration Testing, Ethical Hacking, OWASP Top 10, Kali Linux, Metasploit, Wireshark, Network Security, Vulnerability Assessment, Burp Suite, NMAP |
  | **Databases** | Oracle SQL (82 %), MySQL (80 %); Query Optimisation, DBMS Concepts, Data Modelling, Normalisation |
  | **Web & DevOps** | JavaScript ES6+, HTML5/CSS3, React.js, Tailwind CSS, Responsive Design, Flask/FastAPI, REST APIs, AWS Basics, Git & GitHub, Linux CLI, Docker Basics |

- **Animated skill bars** — each `<div class="skill-bar-fill">` starts at width 0 and expands to its `data-width` percentage the first time the card enters the viewport (IntersectionObserver).

---

### 9. Interactive Case Studies / Projects (`#projects`)
Four project cards in a responsive CSS Grid, each with hover-reveal GitHub / Live-Demo links and a **3D tilt effect** (mouse-tracking `rotateX`/`rotateY` on desktop):

1. **⭐ AI-Driven Cyber Resilience System** *(Featured)*
   - ML pipeline using TensorFlow trained on the CICIDS dataset.
   - Real-time network traffic classification at **94.7 % accuracy** with sub-50 ms latency.
   - Tags: Python · TensorFlow · CyberSec · ML Pipeline · CICIDS

2. **⚡ Algorithm Optimisation — TCS CodeVita** *(Competitive)*
   - Solved graph/DP problems under contest constraints in C++.
   - Custom Segment Tree with Lazy Propagation reduced query complexity from O(n) to **O(log n)**.
   - Tags: C++ · Data Structures · Graph Theory · DP · Optimisation

3. **🔐 OWASP-Hardened Full-Stack Web App** *(Security)*
   - Flask + React application with OWASP Top 10 mitigations: parameterised queries, JWT auth, CSP headers.
   - Automated vulnerability scanning via **Burp Suite integration**.
   - Tags: Python · Flask · React · OWASP · JWT

4. **🕵️ Automated Network Recon & Pen-Test Toolkit** *(Tool)*
   - Python CLI for port scanning, service fingerprinting, and CVE lookup.
   - Integrates with the **NVD API** for real-time vulnerability intelligence.
   - Tags: Python · NMAP · NVD API · CLI · Recon

---

### 10. Experience & Education Timeline (`#experience`)
Animated vertical timeline (slides in from left/right on scroll) with four milestones:

| Year | Role | Organisation |
|------|------|--------------|
| 2024 · Summer | Emerging Technologies Intern | AICTE — AI/ML, Cloud, Cybersecurity, Python automation |
| 2024–2025 · FYP | Cybersecurity Research Project (AI threat-detection capstone) | BIET, Hyderabad |
| 2024 · Competition | Competitive Programmer — TCS CodeVita | National Programming Contest |
| 2021–2025 · Degree | B.Tech – Computer Science & Engineering | BIET, Hyderabad |

---

### 11. Certifications & Achievements
Five certification cards displayed in a responsive flex-wrap grid:

| # | Certificate | Issuer |
|---|------------|--------|
| 🛡️ | Cybersecurity Essentials | Cisco Networking Academy |
| 🐍 | Python for Everybody | Coursera – University of Michigan |
| ☁️ | AWS Cloud Practitioner Essentials | Amazon Web Services Training |
| 🤖 | Machine Learning Foundations | Google Developers – ML Crash Course |
| 💻 | Data Structures & Algorithms | NPTEL – IIT Certification |

---

### 12. Contact Section (`#contact`)
- Left panel: contact details (email, phone, location — Hyderabad, IN), plus social icon links (GitHub, LinkedIn, Instagram).
- Right panel: **validated contact form** with fields — Name, Email, Subject, Message.
  - Client-side validation on submit.
  - Simulated async send (1,500 ms delay) with button state changes: *"⏳ Sending…"* → *"✅ Message Sent!"*.
  - Success banner auto-hides after 4 seconds.

---

### 13. Footer
- Copyright line with year and name.
- Quick nav links repeated for convenience.
- Social icon bar.

---

### 14. Back-to-Top Button (`#back-to-top`)
- Fixed-position button appears after scrolling **400 px** down.
- Smooth-scrolls back to `top: 0` on click.

---

### 15. CSS Design System (`css/style.css` — 768 lines)
- CSS custom properties (variables): `--cyan`, `--violet`, `--sky`, background colours, nav height, transitions.
- **Dark glassmorphism** cards with `backdrop-filter: blur`.
- **Bento grid** layout for skills section.
- Responsive breakpoints for mobile, tablet, and desktop.
- AOS (Animate On Scroll) integration styles.
- Preloader, cursor, particles, glitch, skill-bar, timeline, cert, contact-form, and footer component styles.

---

### 16. JavaScript Interactivity (`js/script.js` — 391 lines)
All functionality is in a single, strict-mode vanilla JS file with clearly delineated sections:

| Module | Purpose |
|--------|---------|
| Preloader | Hide overlay after delay, trigger GSAP entrance |
| GSAP Hero Entrance | Staggered timeline animation of hero elements |
| Custom Cursor | Dual-element cursor with lerp follower |
| Particles Canvas | `requestAnimationFrame` particle system with mesh lines |
| Navbar | Scroll/active state, hamburger toggle, outside-click close |
| Scroll Progress | Width of `#scroll-progress` = scroll % |
| Typewriter | Multi-phrase type/delete loop |
| Glitch | Hover + periodic CSS class toggle on hero name |
| Magnetic Buttons | Mouse-proximity pull transform |
| Fade-in Observer | IntersectionObserver for `.fade-in` / `.stagger-children` |
| Skill Bar Observer | Animate bars to `data-width` on first viewport entry |
| Timeline Observer | Add `.visible` class to timeline items |
| Counter Observer | Animate stat numbers from 0 to target |
| Back to Top | Show/hide and smooth-scroll |
| Smooth Scroll | All `<a href="#...">` anchors respect nav height offset |
| 3D Card Tilt | Mouse-tracking perspective transform on project cards |
| Contact Form | Simulated async submit with state feedback |
| Download Resume | Button text feedback on click |
| AOS Init | Initialise Animate-On-Scroll library |
| Parallax Hero | Hero SVG background moves at 0.25× scroll speed |

---

### 17. Third-party Libraries (CDN — no local bundle)
- **GSAP** (GreenSock) — hero entrance timeline
- **AOS** (Animate On Scroll) — scroll-triggered fade/slide animations
- **Ionicons** — icon set used throughout nav, cards, and footer

---

## 🗂️ Repository File Structure

```
PORTFOLIO-MANDA-AKASH/
├── index.html        # Single-page HTML — all sections
├── css/
│   └── style.css     # Complete design system & component styles
├── js/
│   └── script.js     # All interactivity (vanilla JS, strict mode)
├── CNAME             # Custom domain: akashmanda.me
├── .nojekyll         # Disable Jekyll on GitHub Pages
└── README.md         # This file
```