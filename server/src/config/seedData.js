export const defaultSeedData = {
  portfolioInfo: {
    greeting: "system_status: operational • sec_ops",
    name: "Sujal Gayakwad",
    title: "Cybersecurity Analyst & Threat Hunter",
    titles: [
      "Cybersecurity Analyst & Threat Hunter",
      "Wi-Fi Security & Radio Spectrum Auditor",
      "Full-Stack Developer & Secure Architect",
      "Defensive Tooling & Python Automation"
    ],
    tagline: "Security • Engineering • Research • Innovation",
    shortBio: "A personal cybersecurity project hub demonstrating hands-on technical evidence. Specializing in wireless threat posture auditing, automated reconnaissance tooling, defensive network security, and secure software engineering.",
    avatarUrl: "/assets/images/avatar.jpg",
    status: "Available for Roles & Security Audits",
    location: "India (Open to Global Remote & Relocation)",
    email: "Sujalgayakwad119@gmail.com",
    github: "https://github.com/Sujalgayakwad",
    linkedin: "https://www.linkedin.com/in/sujal-gayakwad-4758a3319/",
    instagram: "https://www.instagram.com/sujal._gayakwad/",
    aboutMe: "I am a security-focused technologist with a deep curiosity for understanding how protocols break and how defensive architectures withstand modern adversaries. Rather than viewing security as an afterthought, I approach engineering with a security-first, zero-trust mindset. My core technical fascination lies in wireless radio frequency auditing, rogue access point heuristics, and password entropy thermodynamics.",
    aboutPillars: [
      {
        icon: "🛰️",
        title: "RF & Wireless Auditing",
        desc: "Passive 802.11 netsh hooks, spectrum overlap detection, and rogue AP heuristics."
      },
      {
        icon: "🔐",
        title: "Applied Cryptography",
        desc: "Shannon entropy evaluation, pre-shared key resistance, and cipher downgrade defense."
      },
      {
        icon: "🧱",
        title: "Secure Full-Stack Dev",
        desc: "Defending against OWASP Top 10 vulnerabilities, strict RBAC, and input sanitization."
      },
      {
        icon: "🧪",
        title: "Adversary Emulation",
        desc: "Hands-on CTF exploration, lateral movement analysis, and defensive blue-team hardening."
      }
    ],
    stats: [
      { label: "Projects & Tools", value: "15+", change: "+3 this quarter" },
      { label: "Threat Rules Analyzed", value: "500+", change: "MITRE ATT&CK" },
      { label: "CTF & Lab Hours", value: "1,200+", change: "Continuous practice" },
      { label: "Security Mindset", value: "100%", change: "Zero-Trust" }
    ]
  },

  projects: [
    {
      id: "sharex",
      title: "ShareX - Android P2P Local File Sharing System",
      badge: "P2P Wireless & Android System",
      tagline: "Zero-Cloud Offline Direct P2P Transfer via Wi-Fi Direct & Nearby Connections",
      category: "security",
      image: "/uploads/ShareX-1793726839700-232963870.jpg",
      featured: true,
      desc: "High-speed, private, zero-cloud Android peer-to-peer file transfer engine utilizing Google's Nearby Connections API over Wi-Fi Direct and Bluetooth. Delivers secure direct device-to-device transfers with zero internet dependency.",
      whatWasIt: "ShareX is a fast, privacy-first, fully local Android file-sharing application designed to transfer files directly between devices without requiring an internet connection or cloud intermediaries. It leverages Google's Nearby Connections API to establish high-bandwidth, direct peer-to-peer connections over Wi-Fi Direct and Bluetooth Low Energy (BLE).",
      whyBuilt: "Transferring files between nearby mobile devices usually relies on cloud storage uploads, exposing private documents to external servers and consuming cellular data. Native Bluetooth transfers are prohibitively slow for large media. ShareX was engineered to provide high-speed, direct local transfers with zero cloud footprint, complete data privacy, and explicit receiver authorization.",
      objective: "To build a resilient, offline-first peer-to-peer transfer platform with sub-second device discovery, high-throughput payload streaming via Wi-Fi Direct, full transfer auditing via a local SQLite/Room database, and modern Jetpack Compose UI.",
      technologies: ["Kotlin", "Jetpack Compose", "Google Nearby Connections", "Wi-Fi Direct & BLE", "Room Database (SQLite)", "Coroutines & StateFlow", "Storage Access Framework"],
      whatIDid: [
        "Integrated Google Nearby Connections API with Star and Cluster topologies for low-latency peer discovery and high-bandwidth payload streaming.",
        "Engineered asymmetric P2P handshakes requiring explicit receiver cryptographic token verification and consent prior to data transmission.",
        "Implemented non-blocking payload streaming using Nearby Connections Payload.fromFile over Wi-Fi Direct sockets.",
        "Architected reactive UI state machines and clean send/receive screens using Kotlin Coroutines, StateFlow, and Jetpack Compose Material 3.",
        "Constructed a local transfer history audit trail with Android Room (SQLite), tracking bytes transferred, timestamps, and device identifiers.",
        "Implemented Android Storage Access Framework (SAF) integration for secure, scoped storage file selection and direct Downloads folder persistence."
      ],
      skillsDeveloped: ["Peer-to-Peer Wireless Networking (Wi-Fi Direct, BLE)", "Local Discovery & Connection Handshaking", "Android Jetpack Compose & Modern Architecture (MVI/MVVM)", "Kotlin Coroutines & Asynchronous Flow Management", "Scoped Storage & File Streaming Optimization", "Offline-First Embedded Persistence (Room DB)"],
      outcome: "A robust Android application capable of transferring large files at Wi-Fi Direct speeds entirely offline, maintaining 100% transfer privacy with zero network telemetry or cloud reliance.",
      realWorldRelevance: "Addresses critical privacy requirements for air-gapped environments, disaster scenarios with zero cellular infrastructure, and secure enterprise device-to-device document sharing.",
      repoUrl: "https://github.com/Sujalgayakwad/sharex",
      demoUrl: "https://github.com/Sujalgayakwad/sharex",
      status: "Active"
    },
    {
      id: "wifi-security",
      title: "CyberShield - Wi-Fi Security Analyser & Spectrum Auditor",
      badge: "Flagship Cybersecurity Project",
      tagline: "Windows WLAN Security Engine & Evil Twin Threat Detector",
      category: "security",
      image: "/assets/images/wifi-security.jpg",
      featured: true,
      desc: "High-performance Windows wireless security engine performing passive 802.11 spectrum analysis, automated threat index grading, Evil-Twin rogue AP detection, and WPA pre-shared key entropy cracking tests.",
      whatWasIt: "CyberShield is an enterprise-grade radio frequency spectrum auditor and wireless vulnerability assessment engine designed for Windows environments. It audits nearby 802.11 wireless networks, analyzes cryptographic suites, uncovers rogue access points (Evil Twins), evaluates channel collisions across 2.4 GHz & 5 GHz bands, and computes cryptographic entropy on WPA pre-shared keys.",
      whyBuilt: "Public and corporate Wi-Fi airspaces are plagued by weak encryption configurations, rogue clones intercepting traffic, and severe channel congestion. Most native OS utilities hide vital cryptographic parameters or require complex Linux driver setups. CyberShield was engineered to bridge this gap on Windows using native Netsh hooks, giving security analysts immediate airspace visibility.",
      objective: "To provide automated, zero-packet-injection passive wireless auditing, score airspace threat indices (0-100), identify deauthentication or spoofing vulnerabilities, and verify WPA3 migration readiness.",
      technologies: ["Python 3.11", "Flask REST", "Netsh WLAN", "HTML5 Canvas", "Cryptography"],
      whatIDid: [
        "Engineered a native Windows Netsh WLAN parser extracting BSSID, SSID, signal dBm, channel frequency, and 802.11 standard.",
        "Constructed an Automated Threat Grading algorithm scoring networks from A+ down to F based on NIST & Wi-Fi Alliance compliance.",
        "Developed Evil-Twin heuristics detecting rogue clones broadcasting identical SSIDs with mismatched encryption ciphers or suspicious MAC vendors.",
        "Created an interactive Canvas spectrum analyzer rendering real-time overlapping parabolic curves for 2.4 GHz and 5 GHz channels.",
        "Integrated an IEEE OUI vendor registry resolving MAC addresses to physical device manufacturers.",
        "Built a WPA Pre-Shared Key Entropy Lab calculating Shannon entropy bits and estimating brute-force cracking costs."
      ],
      skillsDeveloped: ["Wireless Protocol Analysis (802.11)", "Cryptographic Cipher Auditing", "Heuristic Rogue Detection", "Passive Network Reconnaissance", "Windows System API Interfacing"],
      outcome: "A completely autonomous, standalone Wi-Fi auditing application providing instant security metrics, automated audit exports, and actionable mitigation recommendations.",
      realWorldRelevance: "Directly addresses enterprise airspace compliance (CIS Controls 9.4, NIST SP 800-153) and protects remote workers from rogue AP credential theft.",
      repoUrl: "https://github.com/Sujalgayakwad/Wi-Fi-Security-Analyser",
      demoUrl: "https://github.com/Sujalgayakwad/Wi-Fi-Security-Analyser",
      status: "Active"
    },
    {
      id: "study-buddy",
      title: "Study Buddy AI - Academic Copilot & Knowledge Synthesis",
      badge: "Applied AI & Knowledge Retrieval",
      tagline: "RAG-Powered Intelligent Study Assistant with Interactive Knowledge Graph",
      category: "ai",
      image: "/assets/images/study-buddy.jpg",
      featured: true,
      desc: "Deterministic RAG platform ingesting technical RFCs, security standards, and courseware into vector search to generate hallucination-resistant Socratic tutoring dialogues, spaced-repetition flashcards, and concept graphs.",
      whatWasIt: "Study Buddy AI is an adaptive academic assistant that combines Large Language Models with Retrieval Augmented Generation (RAG) to transform dense academic papers and technical documentation into interactive concept maps, Socratic tutoring dialogues, and auto-generated spaced repetition flashcards.",
      whyBuilt: "Technical students and cybersecurity researchers face information overload when digesting RFC standards, threat reports, and cryptographic papers. Traditional chatbots hallucinate or lose contextual citations. Study Buddy AI grounds all responses in verified source documents with cryptographic hash verification.",
      objective: "To create a deterministic, hallucination-resistant knowledge copilot that extracts core competencies and generates active-recall study exercises dynamically.",
      technologies: ["FastAPI", "LangChain / RAG", "Vector DB", "React.js", "Canvas Graphs"],
      whatIDid: [
        "Built an asynchronous document chunking and embedding pipeline supporting PDF, Markdown, and RFC specifications.",
        "Created an interactive Socratic dialogue interface that guides users toward answers rather than merely spitting solutions.",
        "Designed an active-recall flashcard generator with SM-2 spaced repetition interval calculation.",
        "Implemented an interactive 2D node-edge knowledge graph mapping semantic prerequisites across subjects."
      ],
      skillsDeveloped: ["Vector Similarity Search", "RAG Pipeline Architecture", "Context Window Optimization", "Interactive Node Graph Visualization", "RESTful API Engineering"],
      outcome: "Over 40% reduction in revision time during internal testing, with high user retention and zero out-of-context hallucinations on indexed technical material.",
      realWorldRelevance: "Demonstrates scalable ingestion of security documentation (MITRE ATT&CK frameworks, CVE feeds) into queryable vector intelligence.",
      repoUrl: "https://github.com/Sujalgayakwad",
      demoUrl: "https://github.com/Sujalgayakwad",
      status: "Active"
    },
    {
      id: "movie-streaming",
      title: "CineStream - Next-Gen Cinema Streaming Hub",
      badge: "High-Performance Web Architecture",
      tagline: "Dynamic Catalog Discovery with Fluid 60FPS Video Interactions",
      category: "web",
      image: "/assets/images/movie-streaming.jpg",
      featured: true,
      desc: "Fluid, client-side streaming entertainment interface with 60FPS video trailer carousels, genre-specific discovery, debounced REST API queries, progressive blur-up image caching, and accessible media controls.",
      whatWasIt: "CineStream is a digital cinema entertainment platform featuring high-framerate trailer carousels, genre channels (Sci-Fi, Cyberpunk, Documentary, Action), client-side metadata caching, and a customized keyboard-navigable video playback engine.",
      whyBuilt: "To master client-side performance, responsive asset loading, API rate limiting, and seamless user interaction without relying on heavy third-party UI libraries.",
      objective: "Build an ultra-responsive, accessible media discovery interface capable of rendering hundreds of dynamic cards with zero layout shifts or dropped frames.",
      technologies: ["JavaScript (ES6+)", "HTML5 Video", "CSS3 Glass", "REST API", "Web Storage"],
      whatIDid: [
        "Developed fluid media sliders with responsive touch and mouse dragging interactions.",
        "Implemented progressive image loading with blur-up placeholders to preserve bandwidth on mobile networks.",
        "Constructed a lightweight custom video player with picture-in-picture, keyboard playback shortcuts, and volume persistence.",
        "Engineered dynamic search and multi-criteria genre filters with debounced API queries."
      ],
      skillsDeveloped: ["Asynchronous DOM Rendering", "Media Streaming UI Design", "Client-side State Caching", "Performance Budgeting (Lighthouse 95+)"],
      outcome: "A polished, production-ready frontend experience loading in under 1.2 seconds with intuitive navigation across desktop and mobile screens.",
      realWorldRelevance: "Showcases frontend performance optimization, secure external API communication, and responsive UI engineering vital for consumer-facing platforms.",
      repoUrl: "https://github.com/Sujalgayakwad",
      demoUrl: "https://github.com/Sujalgayakwad",
      status: "Active"
    },
    {
      id: "hostel-management",
      title: "HostelEase - Campus Resident & Security Management Portal",
      badge: "Identity & Access Control",
      tagline: "Role-Based Access Control, Resident Auditing & Floor Map Allocation",
      category: "web",
      image: "/assets/images/hostel-management.jpg",
      featured: true,
      desc: "Campus housing administration system featuring strict Role-Based Access Control (RBAC), biometric resident attendance logging, interactive visual floor-map room allocation, and automated invoice audit trails.",
      whatWasIt: "HostelEase is an administrative campus housing portal engineered to manage resident registrations, visual room bed allocations, biometric attendance logging, maintenance tickets, and automated invoice billing for modern educational institutions.",
      whyBuilt: "Paper logs and disparate spreadsheets create data leakage, room over-allocation, and untracked visitor access risks. HostelEase centralizes dormitory operations under secure, role-restricted administrative controls.",
      objective: "Eliminate administrative overhead, provide real-time occupancy floor maps, and ensure verifiable audit trails for all resident movements and financial transactions.",
      technologies: ["Node.js / Express", "PostgreSQL", "JWT Auth", "RBAC Security", "Chart.js Analytics"],
      whatIDid: [
        "Designed a relational database schema normalized to 3NF handling students, rooms, wardens, invoices, and grievance tickets.",
        "Implemented Role-Based Access Control (RBAC) separating Student, Warden, and SuperAdmin privileges with signed JWT tokens.",
        "Engineered an interactive 2D floor-by-floor floor plan with color-coded bed occupancy and status tooltips.",
        "Created automated monthly invoice and receipt generation with printable PDF output."
      ],
      skillsDeveloped: ["Database Schema Normalization", "Role-Based Authorization & Session Security", "Data Validation & Sanitization", "Audit Logging & Financial Reporting"],
      outcome: "A robust campus administrative portal that reduced room allocation errors to zero and streamlined student grievance resolution.",
      realWorldRelevance: "Directly mirrors enterprise identity and access management (IAM), physical facility asset tracking, and verifiable compliance recordkeeping.",
      repoUrl: "https://github.com/Sujalgayakwad/Hostel-management-system",
      demoUrl: "https://github.com/Sujalgayakwad/Hostel-management-system",
      status: "Active"
    },
    {
      id: "upvoid-technologies",
      title: "Upvoid Technologies - Digital Services & Experience Hub",
      badge: "Modern Web Platform & Services",
      tagline: "Building Digital Experiences Through Technology & Innovation",
      category: "web",
      image: "/assets/images/upvoid-technologies.jpg",
      featured: true,
      desc: "Modern, responsive corporate agency and digital service showcase engineered with React 18, Vite, and Tailwind CSS. Features interactive service detail pages, animated UI transitions, client reviews, and contact capture workflows.",
      whatWasIt: "Upvoid Technologies is a modern, responsive digital technology services portal designed to showcase engineering solutions through an interactive, high-performance web experience. It features modular service exploration, client-side routing, interest submission workflows, and customer reviews.",
      whyBuilt: "Engineered to deliver a fast, responsive, and engaging digital services showcase with modular React components, smooth Framer Motion animations, and clean UX design without heavy third-party framework overhead.",
      objective: "To build an ultra-responsive, modern agency platform with intuitive service discovery, dynamic service detail views, customer testimonial carousels, and verified transmission channels.",
      technologies: ["React.js", "Vite", "Tailwind CSS", "Framer Motion", "EmailJS", "Axios"],
      whatIDid: [
        "Architected an intuitive multi-section frontend featuring modern hero, about, service catalog, and customer review sections.",
        "Engineered dedicated dynamic service detail pages with comprehensive feature breakdowns and technical capabilities.",
        "Implemented interactive interest capture and contact inquiry forms with client-side validation and EmailJS dispatch.",
        "Designed fluid micro-interactions, smooth scroll navigation, and responsive mobile layouts using Tailwind CSS and Framer Motion.",
        "Optimized frontend build efficiency and bundle size with Vite modern ES module bundling."
      ],
      skillsDeveloped: ["React.js & Modular Component Design", "Tailwind CSS & Responsive Layouts", "Client-Side Routing & Navigation", "Framer Motion UI Animations", "REST & Form Integration"],
      outcome: "A production-grade, highly responsive web application achieving sub-second page loads, seamless navigation across devices, and verified customer inquiry flow.",
      realWorldRelevance: "Demonstrates scalable frontend architecture, modern component design patterns, and responsive UI engineering essential for enterprise client portals and commercial SaaS platforms.",
      repoUrl: "https://github.com/Sujalgayakwad/Upvoid-Technologies",
      demoUrl: "https://github.com/Sujalgayakwad/Upvoid-Technologies",
      status: "Active"
    },
    {
      id: "coming-soon-2",
      title: "Zero-Trust Cloud Mesh & Policy Auditor",
      badge: "Architecture & Research Phase",
      tagline: "Continuous Cloud Security Posture & Least-Privilege IAM Enforcement",
      category: "security",
      image: "/assets/images/coming-soon-2.jpg",
      featured: false,
      desc: "Zero-Trust Cloud Mesh & Policy Auditor — An upcoming cloud security posture auditor providing continuous Kubernetes container validation, microservice authorization, and least-privilege verification.",
      whatWasIt: "An upcoming cloud-native security posture auditor and zero-trust verification platform. Continuously scans microservices, container networks, and IAM role hierarchies for privilege bloat, leaky S3 buckets, and unencrypted ingress vectors.",
      whyBuilt: "Cloud misconfigurations represent the leading vector in modern data breaches. This project was conceived to provide real-time zero-trust compliance posture audits with zero external infrastructure overhead.",
      objective: "Deliver automated continuous cloud compliance (CIS Benchmarks, NIST 800-53) and cryptographic verification of inter-service communication policies.",
      technologies: ["Go / Python", "Zero-Trust", "Kubernetes", "eBPF", "Cloud Sec"],
      whatIDid: [
        "Prototyping eBPF kernel probes for zero-overhead container network flow inspection.",
        "Building continuous authorization checks enforcing least-privilege service-to-service communication.",
        "Integrating automated CIS benchmark verification against cloud workload manifests.",
        "Developing an interactive risk topology graph rendering active network attack surfaces."
      ],
      skillsDeveloped: ["Cloud Security Posture Management", "eBPF Kernel Probing", "Zero-Trust Architecture", "Kubernetes RBAC Hardening"],
      outcome: "Active research prototypes achieving sub-millisecond policy evaluation latency across test clusters.",
      realWorldRelevance: "Enables cloud architects to mathematically prove zero-trust compliance across multi-tenant production clusters.",
      repoUrl: "https://github.com/Sujalgayakwad",
      demoUrl: "https://github.com/Sujalgayakwad",
      status: "Research Phase"
    }
  ],

  skills: [
    { id: "1", name: "Wi-Fi Protocol 802.11 Auditing", category: "Cybersecurity", level: 95, icon: "Radio" },
    { id: "2", name: "Cryptographic Analysis & Entropy", category: "Cybersecurity", level: 90, icon: "KeyRound" },
    { id: "3", name: "Rogue AP & Evil-Twin Detection", category: "Cybersecurity", level: 92, icon: "ShieldAlert" },
    { id: "4", name: "Network Packet Analysis (Wireshark/Zeek)", category: "Cybersecurity", level: 88, icon: "Network" },
    { id: "5", name: "Python Security Tooling & Automation", category: "Development", level: 94, icon: "Code2" },
    { id: "6", name: "Full-Stack Web (React, Node, Express)", category: "Development", level: 90, icon: "Layers" },
    { id: "7", name: "Database Engineering (PostgreSQL, Mongo)", category: "Development", level: 85, icon: "Database" },
    { id: "8", name: "JWT Auth & RBAC Architecture", category: "Security Engineering", level: 92, icon: "Lock" },
    { id: "9", name: "RAG & Vector Search Systems", category: "AI & Systems", level: 86, icon: "Cpu" },
    { id: "10", name: "Linux Administration & Bash", category: "DevOps & Tools", level: 88, icon: "Terminal" },
    { id: "11", name: "Docker Containerization", category: "DevOps & Tools", level: 82, icon: "Box" },
    { id: "12", name: "Threat Intelligence & MITRE ATT&CK", category: "Cybersecurity", level: 87, icon: "Target" }
  ],

  services: [
    {
      id: "srv-1",
      icon: "Radio",
      title: "RF & Wireless Airspace Auditing",
      description: "Passive 802.11 spectrum analysis, channel congestion evaluation, rogue AP detection, and WPA enterprise pre-shared key entropy assessment."
    },
    {
      id: "srv-2",
      icon: "ShieldCheck",
      title: "Applied Cryptography & Security Verification",
      description: "Cryptographic protocol review, Shannon entropy analysis, TLS/WPA cipher downgrade resistance testing, and secure credential handling."
    },
    {
      id: "srv-3",
      icon: "Layers",
      title: "Secure Full-Stack Software Engineering",
      description: "Building production-grade web applications with strict OWASP Top 10 defense, zero-trust RBAC access controls, and sanitized APIs."
    },
    {
      id: "srv-4",
      icon: "Terminal",
      title: "Automated Reconnaissance & Security Tooling",
      description: "Developing custom defensive utilities, SIEM telemetry pipelines, automated threat scoring engines, and incident response playbooks."
    }
  ],

  messages: [
    {
      id: "msg-demo-1",
      name: "Marcus Vance",
      email: "m.vance@defense-systems.io",
      subject: "Security Research Collaboration",
      message: "Hello Sujal, reviewed your CyberShield Wi-Fi security analyzer repository. Very impressive work with Windows Netsh hooks. Would like to discuss an opportunity regarding wireless threat telemetry.",
      createdAt: new Date(Date.now() - 86400000 * 2).toISOString(),
      read: false
    },
    {
      id: "msg-demo-2",
      name: "Sarah Lin",
      email: "sarah.lin@techventures.com",
      subject: "Full-Stack Security Developer Role",
      message: "Hi Sujal! We have an opening for a Security-Focused Full-Stack Engineer working with React, Node, and Cloud security. Loved your portfolio CMS!",
      createdAt: new Date(Date.now() - 86400000).toISOString(),
      read: true
    }
  ]
};
