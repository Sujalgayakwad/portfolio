# 🛡️ Sujal Gayakwad — Cybersecurity & Full-Stack Portfolio with Custom Admin CMS

> Recreated from the custom Admin Dashboard CMS reference showcase (Kashif-style CMS). Built with **React 18, Vite, Tailwind CSS, Lucide React, Framer Motion, Node.js, Express, and MongoDB** (with zero-config local persistence fallback).

---

## 🌟 Key Features

### 1. 🖥️ Landing Page
- **Dark Navy & Obsidian Cyber Theme**: Styled with electric-cyan (`#00f5b0`) and neon-blue (`#00d2ff`) accents, ambient glow orbs, and cyber grid overlay.
- **Dynamic Particle Matrix Canvas**: Live interactive particle network with node connections, pulsing rays, and cursor tracking.
- **Hero Section**:
  - Greeting terminal badge: `system_status: operational • sec_ops`
  - Name with glowing gradient: **Sujal Gayakwad**
  - Typewriter effect rotating between multiple cybersecurity specializations
  - **Circular Portrait with Glowing Neon Aura**: Displays the original portrait (`avatar.jpg`) with double glowing cyber rings and verified badge.
  - Primary & Secondary Call-To-Action buttons ("Explore Projects & Evidence", "Initiate Transmission")
  - Direct verified social connect pills (GitHub, LinkedIn, Instagram).
- **Statistics Bar**: Real-time stats (15+ Projects & Audits, 500+ Threat Rules, 1,200+ CTF Hours, 100% Zero-Trust Mindset).
- **Personal Introduction & About Pillars**:
  - RF & Wireless Airspace Auditing
  - Applied Cryptography & Shannon Entropy
  - Secure Full-Stack Development (OWASP Top 10, RBAC)
  - Adversary Emulation & CTFs
  - Verified Information card with direct social connect links.
- **Detailed Projects Showcase**:
  - Filter by category: **All Projects**, **Wireless & Cybersecurity**, **AI & Systems**, **Web Architectures**.
  - **Interactive Evidence Modal**: Clicking "Evidence & Details" opens the deep technical breakdown:
    - 01. What was the project?
    - 02. Why did I build it & Primary Objective
    - 03. Implementation Actions (concrete technical steps)
    - 04. Tools & Technologies Employed
    - 05. Core Skills Developed
    - 06. Outcome & Real-World Industry Relevance
    - Verifiable GitHub Repository and Interactive Demo links.
- **Skills & Capabilities**: Categorized skills with mastery percentage indicators and visual progress bars.
- **Services Grid**: 4 core engineering service offerings with neon hover cards.
- **Encrypted Contact Channel**:
  - Direct contact cards (Email with 1-click clipboard copy, Base Location, Availability Status).
  - **Live Contact Form**: Connected directly to the backend Express API (`POST /api/messages`), delivering inquiries straight into the Admin CMS inbox!
- **Footer**: Sleek minimal footer with copyright, links, and floating back-to-top button.

---

### 2. ⚡ Custom Admin Dashboard CMS (Kashif Video Style)
Click the **"CMS"** key button in the top navigation bar (or footer link) to open the Admin CMS:

- **Secure Token-Based Login**: Protected routes using Bcrypt password hashing and JWT authentication.
  - Default Admin Email: `admin@sujal.dev`
  - Default Admin Password: `admin123`
- **Dashboard Overview**:
  - Real-time metric cards (Total Projects, Technical Skills, Inquiries Received, Unread Messages).
  - System health indicators (Uptime 99.98%, SecOps Active).
  - Recent transmission preview.
- **Hero & Profile Editor**:
  - Live text editing: Greeting badge, Full Name, Main Title, Tagline, Short Bio, About Me, Availability Status, Location, and Email.
  - **Dynamic Typewriter Manager**: Add or delete rotating phrases on the fly.
  - **Profile Picture Upload**: Upload a new portrait photo directly from your device via Multer — updates live on the website immediately!
- **Projects Management (Full CRUD)**:
  - Create new projects or edit existing ones.
  - Upload thumbnail images or enter custom paths.
  - Edit all 6 technical evidence sections.
  - Filter and search projects.
  - Delete projects with confirmation prompts.
- **Skills & Services CMS**:
  - Add or remove technical skills with category, icon, and proficiency slider (1–100%).
  - Add or remove service cards.
- **Inquiries / Transmission Inbox**:
  - View all messages submitted through the contact form.
  - Filter between All vs Unread transmissions.
  - Mark messages as Read/Unread.
  - 1-click **Reply via Email** (`mailto:`) button.
  - Purge / delete messages.
- **Settings & "Factory Reset" (Signature Feature)**:
  - System diagnostics and server status.
  - Change Admin Password.
  - **Factory Reset**: As demonstrated in Kashif's video, restores the entire portfolio back to its original factory default state with a single click!

---

## 🛠️ Technology Stack

| Layer | Technologies |
| :--- | :--- |
| **Frontend** | React 18, Vite, TypeScript, Tailwind CSS, Lucide React, Framer Motion |
| **Backend** | Node.js, Express.js, Multer (file uploads), CORS, Dotenv |
| **Authentication** | JSON Web Tokens (JWT), Bcrypt.js |
| **Database** | MongoDB with Mongoose + Automatic Fallback Local JSON Persistence (`store.json`) |
| **Aesthetics** | Cyber Dark Navy (`#030712`), Electric Cyan (`#00f5b0`), Neon Blue (`#00d2ff`) |

> **Zero-Friction Database**: If MongoDB is installed and running, the backend automatically connects to it. If MongoDB is offline, the backend seamlessly switches to persistent local JSON storage (`server/data/store.json`). All edits, uploads, and contact messages persist across restarts!

---

## 🚀 Quick Start & Installation

### 1. Prerequisites
- **Node.js**: v18 or higher (v22 recommended)
- **npm**: v9 or higher

### 2. Install Dependencies
```bash
npm install
```

### 3. Environment Configuration
Create a `.env` file from `.env.example`:
```bash
cp .env.example .env
```
Default `.env` configuration:
```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://127.0.0.1:27017/portfolio_cms
JWT_SECRET=sujal_cyber_security_jwt_secret_token_99182374
ADMIN_EMAIL=admin@sujal.dev
ADMIN_PASSWORD=admin123
VITE_API_URL=/api
```

### 4. Run Locally (Concurrent Frontend & Backend)
```bash
npm run dev
```
This runs both:
- **Express Backend API**: `http://localhost:5000`
- **Vite React Frontend**: `http://localhost:5173` (with `/api` and `/uploads` proxy to port 5000)

### 5. Open in Browser
Open `http://localhost:5173` to explore your live portfolio!

---

## 🔐 Admin CMS Credentials

Click the **"CMS"** button in the navigation bar and log in with:
- **Email:** `admin@sujal.dev`
- **Password:** `admin123`

*(You can change the email and password inside the CMS Settings tab or in `.env`)*

---

## 📦 Available Scripts

| Command | Description |
| :--- | :--- |
| `npm run dev` | Starts both Express backend and Vite frontend concurrently |
| `npm run dev:server` | Starts only the Express backend server on port 5000 |
| `npm run dev:client` | Starts only the Vite frontend dev server on port 5173 |
| `npm run build` | Builds the production bundle into `dist/` |
| `npm run seed` | Seeds or resets the database/store to factory default content |
| `npm start` | Starts the production Express server |

---

## 📁 Project Architecture

```
Portfolio/
├── public/
│   ├── assets/
│   │   └── images/            # Project images & avatar.jpg
│   └── uploads/               # User uploaded images via CMS
├── server/
│   ├── data/
│   │   └── store.json         # Persistent JSON database (auto-created)
│   └── src/
│       ├── config/
│       │   ├── seedData.js    # Default seed portfolio data
│       │   └── seed.js        # Seed script
│       ├── middleware/
│       │   ├── authMiddleware.js
│       │   └── uploadMiddleware.js
│       ├── routes/
│       │   ├── authRoutes.js
│       │   ├── portfolioRoutes.js
│       │   ├── projectRoutes.js
│       │   ├── skillRoutes.js
│       │   ├── serviceRoutes.js
│       │   ├── messageRoutes.js
│       │   └── uploadRoutes.js
│       ├── utils/
│       │   └── dataStore.js   # Unified storage persistence engine
│       └── server.js          # Express entry point
├── src/
│   ├── components/
│   │   ├── admin/             # Complete Admin CMS Suite
│   │   │   ├── AdminModal.tsx
│   │   │   ├── AdminSidebar.tsx
│   │   │   ├── OverviewTab.tsx
│   │   │   ├── HeroEditorTab.tsx
│   │   │   ├── ProjectsTab.tsx
│   │   │   ├── ProjectFormModal.tsx
│   │   │   ├── SkillsTab.tsx
│   │   │   ├── MessagesTab.tsx
│   │   │   └── SettingsTab.tsx
│   │   ├── AboutSection.tsx
│   │   ├── ContactSection.tsx
│   │   ├── Footer.tsx
│   │   ├── Hero.tsx
│   │   ├── MatrixBackground.tsx
│   │   ├── Navbar.tsx
│   │   ├── ProjectModal.tsx
│   │   ├── ProjectsSection.tsx
│   │   ├── ServicesSection.tsx
│   │   └── StatsSection.tsx
│   ├── context/
│   │   ├── AuthContext.tsx
│   │   └── PortfolioContext.tsx
│   ├── services/
│   │   └── api.ts             # Typed REST API client
│   ├── types/
│   │   └── index.ts           # TypeScript interfaces
│   ├── App.tsx
│   ├── index.css              # Custom styling & Tailwind directives
│   └── main.tsx
├── .env.example
├── .env
├── package.json
├── tailwind.config.js
├── tsconfig.json
└── vite.config.ts
```

---

## 🛡️ License & Author
Engineered with ❤️ by **Sujal Gayakwad**.
Released under the MIT License.
