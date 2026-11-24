import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import bcrypt from 'bcryptjs';
import { defaultSeedData } from '../config/seedData.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DATA_DIR = path.resolve(__dirname, '../../data');
const STORE_FILE = path.join(DATA_DIR, 'store.json');

// Ensure data folder exists
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

// In-memory cache + file sync
let store = null;
let lastMtime = 0;

function loadStore() {
  if (fs.existsSync(STORE_FILE)) {
    try {
      const stat = fs.statSync(STORE_FILE);
      if (store && stat.mtimeMs === lastMtime) {
        return store;
      }
      const data = fs.readFileSync(STORE_FILE, 'utf-8');
      store = JSON.parse(data);
      lastMtime = stat.mtimeMs;
      return store;
    } catch (err) {
      console.warn('Error reading store.json, reinitializing from defaults', err);
    }
  }

  if (store) return store;

  // Initialize from defaults with hashed admin password
  const salt = bcrypt.genSaltSync(10);
  const hashedPassword = bcrypt.hashSync(process.env.ADMIN_PASSWORD || 'admin123', salt);

  store = {
    ...JSON.parse(JSON.stringify(defaultSeedData)),
    adminUser: {
      email: process.env.ADMIN_EMAIL || 'admin@sujal.dev',
      password: hashedPassword,
      name: 'Sujal Gayakwad (Admin)',
      role: 'admin'
    }
  };

  saveStore();
  return store;
}

function saveStore() {
  try {
    fs.writeFileSync(STORE_FILE, JSON.stringify(store, null, 2), 'utf-8');
    if (fs.existsSync(STORE_FILE)) {
      lastMtime = fs.statSync(STORE_FILE).mtimeMs;
    }
  } catch (err) {
    console.error('Failed to persist store.json:', err);
  }
}

export const DataStore = {
  // --- Admin Auth ---
  async authenticateAdmin(email, password) {
    const s = loadStore();
    const admin = s.adminUser;
    if (!admin) return null;

    if (admin.email.toLowerCase() !== email.toLowerCase()) {
      return null;
    }

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) return null;

    return {
      email: admin.email,
      name: admin.name,
      role: admin.role
    };
  },

  async updateAdminPassword(currentPassword, newPassword) {
    const s = loadStore();
    const admin = s.adminUser;
    const isMatch = await bcrypt.compare(currentPassword, admin.password);
    if (!isMatch) {
      throw new Error('Current password is incorrect');
    }

    const salt = await bcrypt.genSalt(10);
    admin.password = await bcrypt.hash(newPassword, salt);
    saveStore();
    return true;
  },

  // --- Portfolio Info ---
  async getPortfolioInfo() {
    const s = loadStore();
    return s.portfolioInfo;
  },

  async updatePortfolioInfo(newData) {
    const s = loadStore();
    s.portfolioInfo = {
      ...s.portfolioInfo,
      ...newData
    };
    saveStore();
    return s.portfolioInfo;
  },

  // --- Projects ---
  async getProjects() {
    const s = loadStore();
    return s.projects || [];
  },

  async getProjectById(id) {
    const s = loadStore();
    return (s.projects || []).find(p => p.id === id) || null;
  },

  async createProject(projectData) {
    const s = loadStore();
    const newId = projectData.id || `proj-${Date.now()}`;
    const newProject = {
      id: newId,
      featured: false,
      status: 'Active',
      ...projectData
    };
    s.projects.unshift(newProject);
    saveStore();
    return newProject;
  },

  async updateProject(id, projectData) {
    const s = loadStore();
    const index = s.projects.findIndex(p => p.id === id);
    if (index === -1) return null;

    s.projects[index] = {
      ...s.projects[index],
      ...projectData
    };
    saveStore();
    return s.projects[index];
  },

  async deleteProject(id) {
    const s = loadStore();
    const index = s.projects.findIndex(p => p.id === id);
    if (index === -1) return false;

    s.projects.splice(index, 1);
    saveStore();
    return true;
  },

  // --- Skills ---
  async getSkills() {
    const s = loadStore();
    return s.skills || [];
  },

  async createSkill(skillData) {
    const s = loadStore();
    const newSkill = {
      id: `skill-${Date.now()}`,
      category: 'General',
      level: 80,
      icon: 'Shield',
      ...skillData
    };
    s.skills.push(newSkill);
    saveStore();
    return newSkill;
  },

  async updateSkill(id, skillData) {
    const s = loadStore();
    const index = s.skills.findIndex(sk => sk.id === id);
    if (index === -1) return null;

    s.skills[index] = {
      ...s.skills[index],
      ...skillData
    };
    saveStore();
    return s.skills[index];
  },

  async deleteSkill(id) {
    const s = loadStore();
    const index = s.skills.findIndex(sk => sk.id === id);
    if (index === -1) return false;

    s.skills.splice(index, 1);
    saveStore();
    return true;
  },

  // --- Services ---
  async getServices() {
    const s = loadStore();
    return s.services || [];
  },

  async createService(serviceData) {
    const s = loadStore();
    const newService = {
      id: `srv-${Date.now()}`,
      icon: 'ShieldCheck',
      ...serviceData
    };
    s.services.push(newService);
    saveStore();
    return newService;
  },

  async updateService(id, serviceData) {
    const s = loadStore();
    const index = s.services.findIndex(srv => srv.id === id);
    if (index === -1) return null;

    s.services[index] = {
      ...s.services[index],
      ...serviceData
    };
    saveStore();
    return s.services[index];
  },

  async deleteService(id) {
    const s = loadStore();
    const index = s.services.findIndex(srv => srv.id === id);
    if (index === -1) return false;

    s.services.splice(index, 1);
    saveStore();
    return true;
  },

  // --- Messages / Inquiries ---
  async getMessages() {
    const s = loadStore();
    return s.messages || [];
  },

  async createMessage(msgData) {
    const s = loadStore();
    const newMessage = {
      id: `msg-${Date.now()}`,
      name: msgData.name,
      email: msgData.email,
      subject: msgData.subject || 'Portfolio Direct Transmission',
      message: msgData.message,
      createdAt: new Date().toISOString(),
      read: false
    };
    if (!s.messages) s.messages = [];
    s.messages.unshift(newMessage);
    saveStore();
    return newMessage;
  },

  async toggleMessageRead(id) {
    const s = loadStore();
    const msg = (s.messages || []).find(m => m.id === id);
    if (!msg) return null;

    msg.read = !msg.read;
    saveStore();
    return msg;
  },

  async deleteMessage(id) {
    const s = loadStore();
    const index = (s.messages || []).findIndex(m => m.id === id);
    if (index === -1) return false;

    s.messages.splice(index, 1);
    saveStore();
    return true;
  },

  // --- Stats Overview ---
  async getStats() {
    const s = loadStore();
    const totalProjects = (s.projects || []).length;
    const totalSkills = (s.skills || []).length;
    const totalMessages = (s.messages || []).length;
    const unreadMessages = (s.messages || []).filter(m => !m.read).length;

    return {
      totalProjects,
      totalSkills,
      totalMessages,
      unreadMessages,
      systemStatus: 'Operational (SecOps Active)',
      uptime: '99.98%',
      lastSync: new Date().toISOString()
    };
  },

  // --- Factory Reset ---
  async factoryReset() {
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(process.env.ADMIN_PASSWORD || 'admin123', salt);

    store = {
      ...JSON.parse(JSON.stringify(defaultSeedData)),
      adminUser: {
        email: process.env.ADMIN_EMAIL || 'admin@sujal.dev',
        password: hashedPassword,
        name: 'Sujal Gayakwad (Admin)',
        role: 'admin'
      }
    };
    saveStore();
    return true;
  }
};
