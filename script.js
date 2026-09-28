/**
 * CYBERSECURITY PORTFOLIO JAVASCRIPT ENGINE
 * Author: Sujal Gayakwad
 * Deployable: Static GitHub Pages Compatible (Zero Backend Required)
 */

document.addEventListener('DOMContentLoaded', () => {
  initParticleCanvas();
  initTerminalTyping();
  initScrollNav();
  initProjectSystem();
  initTiltEffect();
  initContactForm();
  initCopyButtons();
  initSoundToggle();
  initMobileMenu();
});

/* ================= 1. NETWORK MATRIX CANVAS PARTICLES & AMBIENCE ================= */
function initParticleCanvas() {
  const canvas = document.getElementById('bg-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const mouseGlow = document.getElementById('mouse-glow');

  let width = window.innerWidth;
  let height = window.innerHeight;
  let dpr = Math.min(window.devicePixelRatio || 1, 2);

  function resizeCanvas() {
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.scale(dpr, dpr);
  }
  resizeCanvas();

  const isMobile = window.innerWidth <= 768;
  const nodeDensity = isMobile ? 22000 : 14000;
  const maxNodes = isMobile ? 36 : 85;
  const nodes = [];
  const nodeCount = Math.min(Math.floor((width * height) / nodeDensity), maxNodes);
  const maxDistance = isMobile ? 110 : 145;
  const mouse = { x: null, y: null, radius: isMobile ? 120 : 170 };

  // Pointer & Glow Handler
  function handlePointerMove(clientX, clientY) {
    mouse.x = clientX;
    mouse.y = clientY;
    if (mouseGlow) {
      mouseGlow.style.left = `${clientX}px`;
      mouseGlow.style.top = `${clientY}px`;
      mouseGlow.classList.add('active');
    }
  }

  // Mouse Glow & Cursor Tracking
  window.addEventListener('mousemove', (e) => {
    handlePointerMove(e.clientX, e.clientY);
  });

  window.addEventListener('mouseout', () => {
    mouse.x = null;
    mouse.y = null;
    if (mouseGlow) {
      mouseGlow.classList.remove('active');
    }
  });

  // Touch Support for Mobile Devices
  window.addEventListener('touchmove', (e) => {
    if (e.touches && e.touches[0]) {
      handlePointerMove(e.touches[0].clientX, e.touches[0].clientY);
    }
  }, { passive: true });

  window.addEventListener('touchend', () => {
    mouse.x = null;
    mouse.y = null;
    if (mouseGlow) mouseGlow.classList.remove('active');
  });

  window.addEventListener('resize', () => {
    resizeCanvas();
  });

  // EMP Radar Ripples on Click / Tap
  const ripples = [];
  function triggerRipple(x, y) {
    ripples.push({
      x,
      y,
      radius: 5,
      maxRadius: isMobile ? 120 : 180,
      alpha: 0.85,
      color: Math.random() > 0.5 ? '0, 242, 254' : '168, 85, 247'
    });
  }

  window.addEventListener('click', (e) => {
    triggerRipple(e.clientX, e.clientY);
  });

  window.addEventListener('touchstart', (e) => {
    if (e.touches && e.touches[0]) {
      triggerRipple(e.touches[0].clientX, e.touches[0].clientY);
    }
  }, { passive: true });

  // Data Packets traveling along network connections
  const packets = [];
  const maxPackets = 22;

  // Floating Cyber Micro-Dust
  const dustParticles = [];
  const dustCount = 35;
  for (let d = 0; d < dustCount; d++) {
    dustParticles.push({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.3,
      vy: -(Math.random() * 0.4 + 0.15),
      size: Math.random() * 1.5 + 0.5,
      alpha: Math.random() * 0.5 + 0.15,
      color: Math.random() > 0.6 ? '#00f2fe' : (Math.random() > 0.5 ? '#10b981' : '#a855f7')
    });
  }

  class NetworkNode {
    constructor() {
      this.x = Math.random() * width;
      this.y = Math.random() * height;
      this.vx = (Math.random() - 0.5) * 0.55;
      this.vy = (Math.random() - 0.5) * 0.55;
      const typeRoll = Math.random();
      if (typeRoll > 0.85) {
        this.type = 'gateway'; // Emerald security hub
        this.radius = Math.random() * 1.5 + 3;
        this.colorRgb = '16, 185, 129';
      } else if (typeRoll > 0.65) {
        this.type = 'crypto'; // Purple sentry
        this.radius = Math.random() * 1.2 + 2.4;
        this.colorRgb = '168, 85, 247';
      } else {
        this.type = 'node'; // Cyan cyber terminal
        this.radius = Math.random() * 1.2 + 1.6;
        this.colorRgb = '0, 242, 254';
      }
      this.pulse = Math.random() * Math.PI * 2;
      this.pulseSpeed = 0.03 + Math.random() * 0.02;
      this.neighbors = [];
    }

    update() {
      this.x += this.vx;
      this.y += this.vy;
      this.pulse += this.pulseSpeed;

      if (this.x < 0) { this.x = 0; this.vx *= -1; }
      else if (this.x > width) { this.x = width; this.vx *= -1; }
      if (this.y < 0) { this.y = 0; this.vy *= -1; }
      else if (this.y > height) { this.y = height; this.vy *= -1; }

      // Smooth magnetic repulsion near mouse
      if (mouse.x !== null && mouse.y !== null) {
        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const dist = Math.hypot(dx, dy);

        if (dist < mouse.radius && dist > 0) {
          const force = (mouse.radius - dist) / mouse.radius;
          const angle = Math.atan2(dy, dx);
          this.x -= Math.cos(angle) * force * 2.2;
          this.y -= Math.sin(angle) * force * 2.2;
        }
      }
    }

    draw() {
      // Pulsing outer sonar ring for gateway hubs
      if (this.type === 'gateway') {
        const ringScale = Math.sin(this.pulse) * 5 + 8;
        const ringAlpha = Math.max(0, 0.4 - (ringScale / 20));
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius + ringScale, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(${this.colorRgb}, ${ringAlpha})`;
        ctx.lineWidth = 1;
        ctx.stroke();
      }

      // Center glowing core
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fillStyle = `rgb(${this.colorRgb})`;
      ctx.shadowColor = `rgba(${this.colorRgb}, 0.8)`;
      ctx.shadowBlur = this.type === 'gateway' ? 12 : 6;
      ctx.fill();
      ctx.shadowBlur = 0; // reset
    }
  }

  for (let i = 0; i < nodeCount; i++) {
    nodes.push(new NetworkNode());
  }

  function render() {
    ctx.clearRect(0, 0, width, height);

    // 1. Draw & Update Cyber Micro-Dust Embers
    for (let d = 0; d < dustParticles.length; d++) {
      const p = dustParticles[d];
      p.x += p.vx;
      p.y += p.vy;
      if (p.y < 0) {
        p.y = height + 10;
        p.x = Math.random() * width;
      }
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fillStyle = p.color;
      ctx.globalAlpha = p.alpha;
      ctx.fill();
      ctx.globalAlpha = 1.0;
    }

    // 2. Draw & Update Nodes
    for (let i = 0; i < nodes.length; i++) {
      nodes[i].neighbors = [];
      nodes[i].update();
      nodes[i].draw();

      // Connect nodes within maxDistance
      for (let j = i + 1; j < nodes.length; j++) {
        const dx = nodes[i].x - nodes[j].x;
        const dy = nodes[i].y - nodes[j].y;
        const dist = Math.hypot(dx, dy);

        if (dist < maxDistance) {
          nodes[i].neighbors.push(j);
          nodes[j].neighbors.push(i);

          const alpha = (1 - dist / maxDistance) * 0.28;
          ctx.beginPath();
          ctx.moveTo(nodes[i].x, nodes[i].y);
          ctx.lineTo(nodes[j].x, nodes[j].y);

          // Subtle neon dual-color line
          if (nodes[i].type === 'crypto' || nodes[j].type === 'crypto') {
            ctx.strokeStyle = `rgba(168, 85, 247, ${alpha})`;
          } else if (nodes[i].type === 'gateway' || nodes[j].type === 'gateway') {
            ctx.strokeStyle = `rgba(16, 185, 129, ${alpha})`;
          } else {
            ctx.strokeStyle = `rgba(0, 242, 254, ${alpha})`;
          }
          ctx.lineWidth = 0.85;
          ctx.stroke();
        }
      }

      // Laser link to mouse
      if (mouse.x !== null && mouse.y !== null) {
        const dx = mouse.x - nodes[i].x;
        const dy = mouse.y - nodes[i].y;
        const dist = Math.hypot(dx, dy);

        if (dist < mouse.radius) {
          const alpha = (1 - dist / mouse.radius) * 0.55;
          ctx.beginPath();
          ctx.moveTo(nodes[i].x, nodes[i].y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.strokeStyle = `rgba(0, 242, 254, ${alpha})`;
          ctx.lineWidth = 1.2;
          ctx.stroke();
        }
      }
    }

    // 3. Spawn & Animate Traveling Data Packets
    if (packets.length < maxPackets && Math.random() < 0.25) {
      const sourceIdx = Math.floor(Math.random() * nodes.length);
      const source = nodes[sourceIdx];
      if (source && source.neighbors.length > 0) {
        const targetIdx = source.neighbors[Math.floor(Math.random() * source.neighbors.length)];
        packets.push({
          sourceIdx,
          targetIdx,
          progress: 0,
          speed: Math.random() * 0.016 + 0.012,
          color: source.type === 'crypto' ? '#d8b4fe' : (source.type === 'gateway' ? '#6ee7b7' : '#e0f2fe')
        });
      }
    }

    for (let p = packets.length - 1; p >= 0; p--) {
      const pkt = packets[p];
      pkt.progress += pkt.speed;

      if (pkt.progress >= 1) {
        packets.splice(p, 1);
        continue;
      }

      const nodeA = nodes[pkt.sourceIdx];
      const nodeB = nodes[pkt.targetIdx];
      if (!nodeA || !nodeB) {
        packets.splice(p, 1);
        continue;
      }

      const px = nodeA.x + (nodeB.x - nodeA.x) * pkt.progress;
      const py = nodeA.y + (nodeB.y - nodeA.y) * pkt.progress;

      // Draw packet pulse with luminous glow
      ctx.beginPath();
      ctx.arc(px, py, 2.2, 0, Math.PI * 2);
      ctx.fillStyle = pkt.color;
      ctx.shadowColor = pkt.color;
      ctx.shadowBlur = 9;
      ctx.fill();
      ctx.shadowBlur = 0;
    }

    // 4. Update & Draw EMP Click Shockwaves
    for (let r = ripples.length - 1; r >= 0; r--) {
      const rip = ripples[r];
      rip.radius += 3.8;
      rip.alpha *= 0.945;

      if (rip.alpha <= 0.02 || rip.radius >= rip.maxRadius) {
        ripples.splice(r, 1);
        continue;
      }

      ctx.beginPath();
      ctx.arc(rip.x, rip.y, rip.radius, 0, Math.PI * 2);
      ctx.strokeStyle = `rgba(${rip.color}, ${rip.alpha})`;
      ctx.lineWidth = 1.8;
      ctx.stroke();
    }

    requestAnimationFrame(render);
  }

  render();
}

/* ================= 2. TERMINAL TYPING EFFECT ================= */
function initTerminalTyping() {
  const element = document.getElementById('terminal-typing');
  if (!element) return;

  const phrases = [
    'Cybersecurity Analyst & Threat Hunter',
    'Wi-Fi Security & Radio Spectrum Auditor',
    'Full-Stack Developer & Secure Architect',
    'Defensive Tooling & Python Automation'
  ];

  let phraseIdx = 0;
  let charIdx = 0;
  let isBackspacing = false;
  let speed = 90;

  function typeStep() {
    const text = phrases[phraseIdx];

    if (isBackspacing) {
      element.textContent = text.substring(0, charIdx - 1);
      charIdx--;
      speed = 45;
    } else {
      element.textContent = text.substring(0, charIdx + 1);
      charIdx++;
      speed = 100;
    }

    if (!isBackspacing && charIdx === text.length) {
      speed = 2200;
      isBackspacing = true;
    } else if (isBackspacing && charIdx === 0) {
      isBackspacing = false;
      phraseIdx = (phraseIdx + 1) % phrases.length;
      speed = 400;
    }

    setTimeout(typeStep, speed);
  }

  typeStep();
}

/* ================= 3. SCROLL NAVIGATION & PROGRESS ================= */
function initScrollNav() {
  const navbar = document.querySelector('.navbar');
  const progressBar = document.querySelector('.scroll-indicator-bar');
  const backToTop = document.querySelector('.back-to-top');
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');
  const dockItems = document.querySelectorAll('.dock-item');

  window.addEventListener('scroll', () => {
    const scrollY = window.pageYOffset;
    const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
    const percentage = totalHeight > 0 ? (scrollY / totalHeight) * 100 : 0;

    if (progressBar) progressBar.style.width = `${percentage}%`;

    if (navbar) {
      if (scrollY > 40) navbar.classList.add('scrolled');
      else navbar.classList.remove('scrolled');
    }

    if (backToTop) {
      if (scrollY > 400) backToTop.classList.add('visible');
      else backToTop.classList.remove('visible');
    }

    sections.forEach((sec) => {
      const top = sec.offsetTop - 140;
      const height = sec.offsetHeight;
      const id = sec.getAttribute('id');

      if (scrollY >= top && scrollY < top + height) {
        navLinks.forEach((link) => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          }
        });

        dockItems.forEach((dock) => {
          dock.classList.remove('active');
          if (dock.getAttribute('data-dock') === id) {
            dock.classList.add('active');
          }
        });
      }
    });
  });

  // Dock items tap handler
  dockItems.forEach((dock) => {
    dock.addEventListener('click', (e) => {
      const targetId = dock.getAttribute('href');
      if (targetId && targetId.startsWith('#')) {
        const targetEl = document.querySelector(targetId);
        if (targetEl) {
          e.preventDefault();
          dockItems.forEach((d) => d.classList.remove('active'));
          dock.classList.add('active');
          targetEl.scrollIntoView({ behavior: 'smooth' });
          if (typeof playSynthesizedBeep === 'function') {
            playSynthesizedBeep();
          }
        }
      }
    });
  });

  if (backToTop) {
    backToTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
}

/* ================= 4. COMPREHENSIVE CYBERSECURITY PROJECT DATA ================= */
const cybersecurityProjects = {
  'wifi-security': {
    title: 'CyberShield - Wi-Fi Security Analyser & Spectrum Auditor',
    badge: 'Flagship Cybersecurity Project',
    tagline: 'Windows WLAN Security Engine & Evil Twin Threat Detector',
    image: './assets/images/wifi-security.jpg',
    whatWasIt: 'CyberShield is an enterprise-grade radio frequency spectrum auditor and wireless vulnerability assessment engine designed for Windows environments. It audits nearby 802.11 wireless networks, analyzes cryptographic suites, uncovers rogue access points (Evil Twins), evaluates channel collisions across 2.4 GHz & 5 GHz bands, and computes cryptographic entropy on WPA pre-shared keys.',
    whyBuilt: 'Public and corporate Wi-Fi airspaces are plagued by weak encryption configurations, rogue clones intercepting traffic, and severe channel congestion. Most native OS utilities hide vital cryptographic parameters or require complex Linux driver setups. CyberShield was engineered to bridge this gap on Windows using native Netsh hooks, giving security analysts immediate airspace visibility.',
    objective: 'To provide automated, zero-packet-injection passive wireless auditing, score airspace threat indices (0-100), identify deauthentication or spoofing vulnerabilities, and verify WPA3 migration readiness.',
    tools: ['Python 3.11', 'Flask REST API', 'Netsh WLAN Core', 'Cryptography Library', 'HTML5 Canvas 2D', 'CSS3 Dark HUD'],
    whatIDid: [
      'Engineered a native Windows Netsh WLAN parser extracting BSSID, SSID, signal dBm, channel frequency, and 802.11 standard.',
      'Constructed an Automated Threat Grading algorithm scoring networks from A+ down to F based on NIST & Wi-Fi Alliance compliance.',
      'Developed Evil-Twin heuristics detecting rogue clones broadcasting identical SSIDs with mismatched encryption ciphers or suspicious MAC vendors.',
      'Created an interactive Canvas spectrum analyzer rendering real-time overlapping parabolic curves for 2.4 GHz and 5 GHz channels.',
      'Integrated an IEEE OUI vendor registry resolving MAC addresses to physical device manufacturers (Ubiquiti, Cisco, Realtek, Apple).',
      'Built a WPA Pre-Shared Key Entropy Lab calculating Shannon entropy bits and estimating brute-force cracking costs against multi-GPU clusters.'
    ],
    skillsDeveloped: ['Wireless Protocol Analysis (802.11b/g/n/ac/ax)', 'Cryptographic Cipher Auditing (WEP, WPA2-CCMP, WPA3-SAE)', 'Heuristic Rogue Detection', 'Passive Network Reconnaissance', 'Windows System API Interfacing', 'Threat Intelligence Scoring'],
    outcome: 'A completely autonomous, standalone Wi-Fi auditing application providing instant security metrics, automated PDF/JSON audit exports, and actionable mitigation recommendations.',
    realWorldRelevance: 'Directly addresses enterprise airspace compliance (CIS Controls 9.4, NIST SP 800-153) and protects remote workers from rogue AP credential theft in coffee shops, airports, and corporate campuses.',
    repoUrl: 'https://github.com/Sujagayakwad',
    demoUrl: '#',
    writeupUrl: '#',
    docsUrl: '#'
  },
  'study-buddy': {
    title: 'Study Buddy AI - Academic Copilot & Knowledge Synthesis System',
    badge: 'Applied AI & Knowledge Retrieval',
    tagline: 'RAG-Powered Intelligent Study Assistant with Interactive Knowledge Graph',
    image: './assets/images/study-buddy.jpg',
    whatWasIt: 'Study Buddy AI is an adaptive academic assistant that combines Large Language Models with Retrieval Augmented Generation (RAG) to transform dense academic papers and technical documentation into interactive concept maps, Socratic tutoring dialogues, and auto-generated spaced repetition flashcards.',
    whyBuilt: 'Technical students and cybersecurity researchers face information overload when digesting RFC standards, threat reports, and cryptographic papers. Traditional chatbots hallucinate or lose contextual citations. Study Buddy AI grounds all responses in verified source documents with cryptographic hash verification.',
    objective: 'To create a deterministic, hallucination-resistant knowledge copilot that extracts core competencies and generates active-recall study exercises dynamically.',
    tools: ['Python / FastAPI', 'React.js', 'Vector Database (ChromaDB / Pinecone)', 'LangChain / RAG', 'Canvas Knowledge Graph', 'Tailwind CSS'],
    whatIDid: [
      'Built an asynchronous document chunking and embedding pipeline supporting PDF, Markdown, and RFC specifications.',
      'Created an interactive Socratic dialogue interface that guides users toward answers rather than merely spitting solutions.',
      'Designed an active-recall flashcard generator with SM-2 spaced repetition interval calculation.',
      'Implemented an interactive 2D node-edge knowledge graph mapping semantic prerequisites across subjects.'
    ],
    skillsDeveloped: ['Vector Similarity Search', 'RAG Pipeline Architecture', 'Context Window Optimization', 'Interactive Node Graph Visualization', 'RESTful API Engineering'],
    outcome: 'Over 40% reduction in revision time during internal testing, with high user retention and zero out-of-context hallucinations on indexed technical material.',
    realWorldRelevance: 'Demonstrates scalable ingestion of security documentation (MITRE ATT&CK frameworks, CVE feeds) into queryable vector intelligence.',
    repoUrl: 'https://github.com/Sujagayakwad',
    demoUrl: '#',
    writeupUrl: '#',
    docsUrl: '#'
  },
  'movie-streaming': {
    title: 'CineStream - Next-Gen Cinema Streaming Hub',
    badge: 'High-Performance Web Architecture',
    tagline: 'Dynamic Catalog Discovery with Fluid 60FPS Video Interactions',
    image: './assets/images/movie-streaming.jpg',
    whatWasIt: 'CineStream is a digital cinema entertainment platform featuring high-framerate trailer carousels, genre channels (Sci-Fi, Cyberpunk, Documentary, Action), client-side metadata caching, and a customized keyboard-navigable video playback engine.',
    whyBuilt: 'To master client-side performance, responsive asset loading, API rate limiting, and seamless user interaction without relying on heavy third-party UI libraries.',
    objective: 'Build an ultra-responsive, accessible media discovery interface capable of rendering hundreds of dynamic cards with zero layout shifts or dropped frames.',
    tools: ['Modern JavaScript (ES6+)', 'HTML5 Semantic UI', 'CSS3 Glassmorphism', 'Web Storage API', 'RESTful Movie Database API'],
    whatIDid: [
      'Developed fluid media sliders with responsive touch and mouse dragging interactions.',
      'Implemented progressive image loading with blur-up placeholders to preserve bandwidth on mobile networks.',
      'Constructed a lightweight custom video player with picture-in-picture, keyboard playback shortcuts, and volume persistence.',
      'Engineered dynamic search and multi-criteria genre filters with debounced API queries.'
    ],
    skillsDeveloped: ['Asynchronous DOM Rendering', 'Media Streaming UI Design', 'Client-side State Caching', 'Performance Budgeting (Lighthouse 95+)'],
    outcome: 'A polished, production-ready frontend experience loading in under 1.2 seconds with intuitive navigation across desktop and mobile screens.',
    realWorldRelevance: 'Showcases frontend performance optimization, secure external API communication, and responsive UI engineering vital for consumer-facing platforms.',
    repoUrl: 'https://github.com/Sujagayakwad',
    demoUrl: '#',
    writeupUrl: '#',
    docsUrl: '#'
  },
  'hostel-management': {
    title: 'HostelEase - University Dormitory & Resident Security Portal',
    badge: 'Full-Stack Management & Security',
    tagline: 'Role-Based Access Control, Resident Auditing & Floor Map Allocation',
    image: './assets/images/hostel-management.jpg',
    whatWasIt: 'HostelEase is an administrative campus housing portal engineered to manage resident registrations, visual room bed allocations, biometric attendance logging, maintenance tickets, and automated invoice billing for modern educational institutions.',
    whyBuilt: 'Paper logs and disparate spreadsheets create data leakage, room over-allocation, and untracked visitor access risks. HostelEase centralizes dormitory operations under secure, role-restricted administrative controls.',
    objective: 'Eliminate administrative overhead, provide real-time occupancy floor maps, and ensure verifiable audit trails for all resident movements and financial transactions.',
    tools: ['JavaScript / Node.js', 'PostgreSQL / SQL', 'Express.js', 'JWT Authentication', 'Chart.js Visual Analytics', 'CSS Grid'],
    whatIDid: [
      'Designed a relational database schema normalized to 3NF handling students, rooms, wardens, invoices, and grievance tickets.',
      'Implemented Role-Based Access Control (RBAC) separating Student, Warden, and SuperAdmin privileges with signed JWT tokens.',
      'Engineered an interactive 2D floor-by-floor floor plan with color-coded bed occupancy and status tooltips.',
      'Created automated monthly invoice and receipt generation with printable PDF output.',
      'Added an emergency notification and missing student attendance escalation system.'
    ],
    skillsDeveloped: ['Database Schema Normalization', 'Role-Based Authorization & Session Security', 'Data Validation & Sanitization', 'Audit Logging & Financial Reporting'],
    outcome: 'A robust campus administrative portal that reduced room allocation errors to zero and streamlined student grievance resolution.',
    realWorldRelevance: 'Directly mirrors enterprise identity and access management (IAM), physical facility asset tracking, and verifiable compliance recordkeeping.',
    repoUrl: 'https://github.com/Sujagayakwad',
    demoUrl: '#',
    writeupUrl: '#',
    docsUrl: '#'
  },
  'coming-soon-1': {
    title: 'Coming Soon - Autonomous Threat Hunting & SIEM Pipeline',
    badge: 'Under Active Engineering',
    tagline: 'Defensive Event Correlation & Automated Incident Response Engine',
    image: './assets/images/coming-soon-1.jpg',
    whatWasIt: 'An upcoming enterprise-scale defensive cybersecurity tool currently under development. Engineered to ingest disparate endpoint telemetry (Sysmon, Windows Event Logs, Zeek network connections) and identify lateral movement and adversary tradecraft.',
    whyBuilt: 'Modern Security Operations Centers (SOCs) are overwhelmed with false-positive alert fatigue. This project is built to deliver low-noise, high-fidelity threat correlation using deterministic rule graphs and automated forensic artifact packaging.',
    objective: 'To provide a lightweight, cross-platform security monitoring agent that detects anomalous privilege escalations, C2 beaconing patterns, and suspicious process executions in real time.',
    tools: ['Python 3.12', 'FastAPI', 'Elasticsearch / OpenSearch', 'Sysmon & Zeek', 'Docker Containers', 'Tailwind HUD'],
    whatIDid: [
      'Architecting the real-time event streaming pipeline using asynchronous message queuing.',
      'Constructing correlation heuristics mapped to MITRE ATT&CK Enterprise matrices (T1059, T1078, T1071).',
      'Developing automated containment playbooks for instant host isolation and forensic triage snapshots.',
      'Designing an interactive terminal-inspired SOC telemetry dashboard with live graph visualizations.'
    ],
    skillsDeveloped: ['SOC Blue Team Automation', 'Threat Telemetry Parsing', 'MITRE ATT&CK Mapping', 'eBPF & Sysmon Auditing', 'Containerized Pipeline Deployment'],
    outcome: 'Expected release: Q4 2026 with full open-source repository, interactive sandbox demo, and comprehensive threat simulation test suite.',
    realWorldRelevance: 'Addresses the urgent enterprise need for automated Tier-1/Tier-2 SOC triage and rapid defensive incident containment.',
    repoUrl: 'https://github.com/Sujagayakwad',
    demoUrl: '#',
    writeupUrl: '#',
    docsUrl: '#'
  },
  'coming-soon-2': {
    title: 'Coming Soon - Zero-Trust Cloud Armor & Policy Mesh',
    badge: 'Architecture & Research Phase',
    tagline: 'Continuous Cloud Security Posture & Least-Privilege IAM Enforcement',
    image: './assets/images/coming-soon-2.jpg',
    whatWasIt: 'An upcoming cloud-native security posture auditor and zero-trust verification platform. Continuously scans microservices, container networks, and IAM role hierarchies for privilege bloat, leaky S3 buckets, and unencrypted ingress vectors.',
    whyBuilt: 'Cloud misconfigurations represent the leading vector in modern data breaches. This project was conceived to provide real-time zero-trust compliance posture audits with zero external infrastructure overhead.',
    objective: 'Deliver automated continuous cloud compliance (CIS Benchmarks, NIST 800-53) and cryptographic verification of inter-service communication policies.',
    tools: ['Go / Python', 'Kubernetes Core', 'eBPF Network Probes', 'Open Policy Agent (OPA)', 'PostgreSQL', 'Chart.js'],
    whatIDid: [
      'Prototyping eBPF kernel probes for zero-overhead container network flow inspection.',
      'Implementing automated Rego policy evaluation for Kubernetes pod security standards.',
      'Developing an IAM blast-radius graph calculating effective permissions across cross-account roles.',
      'Creating interactive audit summary reports with prioritized vulnerability remediation playbooks.'
    ],
    skillsDeveloped: ['Cloud Security Posture Management (CSPM)', 'Kubernetes Hardening', 'Zero-Trust Architecture', 'eBPF Kernel Probing', 'Policy as Code (OPA)'],
    outcome: 'Expected release: Q4 2026 featuring one-click Helm deployment and comprehensive CIS benchmark validation.',
    realWorldRelevance: 'Aligns directly with cloud engineering and DevSecOps requirements to secure multi-tenant infrastructure and container meshes.',
    repoUrl: 'https://github.com/Sujagayakwad',
    demoUrl: '#',
    writeupUrl: '#',
    docsUrl: '#'
  }
};

/* ================= 5. PROJECT SYSTEM & DETAILED MODAL ================= */
function initProjectSystem() {
  const modalBackdrop = document.getElementById('project-modal');
  const modalContainer = modalBackdrop ? modalBackdrop.querySelector('.modal-container') : null;
  const closeBtn = document.getElementById('modal-close-btn');
  const triggerButtons = document.querySelectorAll('[data-project-id]');
  const filterButtons = document.querySelectorAll('.project-filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  // Filter Projects
  filterButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      filterButtons.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      projectCards.forEach((card) => {
        const cat = card.getAttribute('data-category');
        if (filter === 'all' || cat === filter) {
          card.style.display = 'flex';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 30);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(16px)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 250);
        }
      });
    });
  });

  // Open Modal with structured technical evidence
  function openModal(id) {
    const data = cybersecurityProjects[id];
    if (!data || !modalBackdrop) return;

    document.getElementById('modal-img').src = data.image;
    document.getElementById('modal-img').alt = data.title;
    document.getElementById('modal-badge').textContent = data.badge;
    document.getElementById('modal-title').textContent = data.title;
    document.getElementById('modal-tagline').textContent = data.tagline;

    document.getElementById('modal-what').textContent = data.whatWasIt;
    document.getElementById('modal-why').textContent = data.whyBuilt;
    document.getElementById('modal-obj').textContent = data.objective;
    document.getElementById('modal-outcome').textContent = data.outcome;
    document.getElementById('modal-relevance').textContent = data.realWorldRelevance;

    // Populate What I Did
    const whatList = document.getElementById('modal-what-list');
    whatList.innerHTML = '';
    data.whatIDid.forEach((item) => {
      const li = document.createElement('li');
      li.className = 'technical-evidence-item';
      li.innerHTML = `
        <span class="evidence-bullet">▹</span>
        <span>${item}</span>
      `;
      whatList.appendChild(li);
    });

    // Populate Skills Developed
    const skillsList = document.getElementById('modal-skills-list');
    skillsList.innerHTML = '';
    data.skillsDeveloped.forEach((skill) => {
      const span = document.createElement('span');
      span.className = 'tech-tag';
      span.textContent = skill;
      skillsList.appendChild(span);
    });

    // Populate Tools
    const toolsList = document.getElementById('modal-tools-list');
    toolsList.innerHTML = '';
    data.tools.forEach((tool) => {
      const span = document.createElement('span');
      span.className = 'tech-tag cyan';
      span.textContent = tool;
      toolsList.appendChild(span);
    });

    // Evidence links
    const repoBtn = document.getElementById('modal-repo-btn');
    if (repoBtn) repoBtn.href = data.repoUrl;

    // Close mobile nav if open
    if (typeof window.closeMobileNav === 'function') {
      window.closeMobileNav();
    }

    modalBackdrop.classList.add('active');
    document.body.classList.add('modal-open');
  }

  function closeModal() {
    if (!modalBackdrop) return;
    modalBackdrop.classList.remove('active');
    document.body.classList.remove('modal-open');
  }

  triggerButtons.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const id = btn.getAttribute('data-project-id');
      openModal(id);
    });
  });

  if (closeBtn) closeBtn.addEventListener('click', closeModal);

  if (modalBackdrop) {
    modalBackdrop.addEventListener('click', (e) => {
      if (e.target === modalBackdrop) closeModal();
    });

    // Mobile Bottom-Sheet Pull Down to Dismiss
    const modalContainer = modalBackdrop.querySelector('.modal-container');
    if (modalContainer) {
      let startY = 0;
      let currentY = 0;
      let isDragging = false;

      modalContainer.addEventListener('touchstart', (e) => {
        if (modalContainer.scrollTop <= 0 && e.touches.length === 1) {
          startY = e.touches[0].clientY;
          isDragging = true;
        }
      }, { passive: true });

      modalContainer.addEventListener('touchmove', (e) => {
        if (!isDragging || modalContainer.scrollTop > 0) return;
        currentY = e.touches[0].clientY;
        const diffY = currentY - startY;
        if (diffY > 0 && diffY < 180) {
          modalContainer.style.transform = `translateY(${diffY}px)`;
        }
      }, { passive: true });

      modalContainer.addEventListener('touchend', () => {
        if (!isDragging) return;
        isDragging = false;
        const diffY = currentY - startY;
        if (diffY > 75) {
          closeModal();
        }
        modalContainer.style.transform = '';
        startY = 0;
        currentY = 0;
      });
    }
  }

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalBackdrop && modalBackdrop.classList.contains('active')) {
      closeModal();
    }
  });
}

/* ================= 7. 3D TILT EFFECT ================= */
function initTiltEffect() {
  const elements = document.querySelectorAll('[data-tilt]');

  // Disable tilt on touch devices or screens under 1024px to prevent jitter and maintain buttery smooth scroll
  const isTouchDevice = () => window.innerWidth < 1024 || window.matchMedia('(pointer: coarse)').matches;

  elements.forEach((el) => {
    el.addEventListener('mousemove', (e) => {
      if (isTouchDevice()) return;

      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const midX = rect.width / 2;
      const midY = rect.height / 2;

      const rotX = ((y - midY) / midY) * -6;
      const rotY = ((x - midX) / midX) * 6;

      el.style.transform = `perspective(1000px) rotateX(${rotX}deg) rotateY(${rotY}deg) translateY(-4px)`;
    });

    el.addEventListener('mouseleave', () => {
      el.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0)';
    });
  });
}

/* ================= 8. CONTACT FORM & NOTIFICATIONS ================= */
function initContactForm() {
  const form = document.getElementById('contact-form');
  const submitBtn = document.getElementById('form-submit-btn');
  const statusBox = document.getElementById('form-status');

  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const subject = form.subject.value.trim();
    const message = form.message.value.trim();

    if (!name || !email || !message) {
      displayStatus('Please complete all required fields.', 'error');
      return;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      displayStatus('Please enter a valid email address.', 'error');
      return;
    }

    submitBtn.disabled = true;
    submitBtn.innerHTML = `
      <svg class="spinner" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="animation: spin 1s linear infinite;">
        <circle cx="12" cy="12" r="10" stroke-opacity="0.25"></circle>
        <path d="M12 2a10 10 0 0 1 10 10"></path>
      </svg>
      Encrypting & Sending...
    `;

    setTimeout(() => {
      submitBtn.disabled = false;
      submitBtn.innerHTML = `
        <span>Send Transmission</span>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <line x1="22" y1="2" x2="11" y2="13"></line>
          <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
        </svg>
      `;

      form.reset();
      triggerToast(`Transmission received from ${name}! Sujal will respond soon.`);
      displayStatus('Message successfully delivered. Thank you!', 'success');
      playSynthesizedChime();
    }, 1100);
  });

  function displayStatus(msg, type) {
    if (!statusBox) return;
    statusBox.textContent = msg;
    statusBox.className = `form-status ${type}`;
    setTimeout(() => {
      statusBox.textContent = '';
      statusBox.className = 'form-status';
    }, 5500);
  }
}

function triggerToast(text) {
  let toast = document.getElementById('toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'toast';
    toast.className = 'toast-notification';
    document.body.appendChild(toast);
  }

  toast.innerHTML = `
    <svg class="toast-icon" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
      <polyline points="22 4 12 14.01 9 11.01"></polyline>
    </svg>
    <span>${text}</span>
  `;

  toast.classList.add('show');
  setTimeout(() => {
    toast.classList.remove('show');
  }, 4500);
}

/* ================= 9. AUDIO FEEDBACK ================= */
let soundOn = true;
let audioContext = null;

function initSoundToggle() {
  const toggle = document.getElementById('sound-toggle');
  if (!toggle) return;

  toggle.addEventListener('click', () => {
    soundOn = !soundOn;
    toggle.classList.toggle('muted', !soundOn);
    triggerToast(soundOn ? '🔊 Audio feedback active' : '🔇 Audio feedback muted');
  });

  document.querySelectorAll('button, .btn, .social-pill, .nav-link, .dock-item, .project-filter-btn, .social-connect-card').forEach((b) => {
    b.addEventListener('click', () => {
      playSynthesizedBeep();
    });
  });
}

function getAudioContext() {
  if (!audioContext) {
    const Ctx = window.AudioContext || window.webkitAudioContext;
    if (Ctx) audioContext = new Ctx();
  }
  if (audioContext && audioContext.state === 'suspended') {
    audioContext.resume();
  }
  return audioContext;
}

function playSynthesizedBeep() {
  if (!soundOn) return;
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(950, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(450, ctx.currentTime + 0.04);

    gain.gain.setValueAtTime(0.035, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.04);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + 0.04);
  } catch (err) {}
}

function playSynthesizedChime() {
  if (!soundOn) return;
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    const t = ctx.currentTime;
    [523.25, 659.25, 783.99, 1046.5].forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, t + idx * 0.08);

      gain.gain.setValueAtTime(0.05, t + idx * 0.08);
      gain.gain.exponentialRampToValueAtTime(0.001, t + idx * 0.08 + 0.25);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(t + idx * 0.08);
      osc.stop(t + idx * 0.08 + 0.25);
    });
  } catch (err) {}
}

/* ================= 10. CLIPBOARD COPY BUTTONS ================= */
function initCopyButtons() {
  document.querySelectorAll('[data-copy]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const text = btn.getAttribute('data-copy');
      navigator.clipboard.writeText(text).then(() => {
        const prev = btn.textContent;
        btn.textContent = 'Copied!';
        btn.style.color = '#10b981';
        triggerToast(`Copied "${text}" to clipboard!`);
        setTimeout(() => {
          btn.textContent = prev;
          btn.style.color = '';
        }, 2200);
      });
    });
  });
}

/* ================= 11. MOBILE MENU ================= */
function initMobileMenu() {
  const btn = document.getElementById('mobile-menu-btn') || document.querySelector('.mobile-menu-btn');
  const menu = document.getElementById('nav-menu') || document.querySelector('.nav-menu');
  const backdrop = document.getElementById('nav-backdrop');
  const links = document.querySelectorAll('.nav-link, .mobile-nav-cta');

  if (!btn || !menu) return;

  function openMenu() {
    menu.classList.add('open');
    btn.classList.add('active');
    btn.setAttribute('aria-expanded', 'true');
    if (backdrop) backdrop.classList.add('active');
    document.body.classList.add('nav-open');
  }

  function closeMenu() {
    menu.classList.remove('open');
    btn.classList.remove('active');
    btn.setAttribute('aria-expanded', 'false');
    if (backdrop) backdrop.classList.remove('active');
    document.body.classList.remove('nav-open');
  }

  function toggleMenu() {
    if (menu.classList.contains('open')) {
      closeMenu();
    } else {
      openMenu();
    }
  }

  window.closeMobileNav = closeMenu;

  btn.addEventListener('click', (e) => {
    e.stopPropagation();
    toggleMenu();
  });

  if (backdrop) {
    backdrop.addEventListener('click', closeMenu);
  }

  links.forEach((l) => {
    l.addEventListener('click', () => {
      closeMenu();
    });
  });

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && menu.classList.contains('open')) {
      closeMenu();
    }
  });

  window.addEventListener('resize', () => {
    if (window.innerWidth > 860 && menu.classList.contains('open')) {
      closeMenu();
    }
  });
}
