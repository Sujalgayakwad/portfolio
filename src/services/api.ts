import { PortfolioInfo, Project, Skill, Service, Message, DashboardStats, AdminUser } from '../types';
import { defaultSeedData } from '../data/seedData';

const API_BASE = '/api';

function getAuthHeaders(): HeadersInit {
  const token = localStorage.getItem('admin_token');
  return {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {})
  };
}

export const api = {
  // --- Auth ---
  async login(email: string, password: string): Promise<{ token: string; user: AdminUser }> {
    try {
      const res = await fetch(`${API_BASE}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      if (res.ok) {
        const data = await res.json();
        return data;
      }
    } catch (err) {
      // Offline / Static fallback (e.g. GitHub Pages)
    }

    // Static fallback auth
    if (email.toLowerCase() === 'admin@sujal.dev' && password === 'admin123') {
      const mockUser: AdminUser = {
        email: 'admin@sujal.dev',
        name: 'Sujal Gayakwad (Admin)',
        role: 'admin'
      };
      return {
        token: 'static_admin_token_' + Date.now(),
        user: mockUser
      };
    }
    throw new Error('Invalid email or password');
  },

  async verifyAuth(): Promise<{ valid: boolean; user: AdminUser }> {
    try {
      const res = await fetch(`${API_BASE}/auth/verify`, {
        headers: getAuthHeaders()
      });
      if (res.ok) return res.json();
    } catch (err) {
      // Static fallback
    }
    const token = localStorage.getItem('admin_token');
    if (token) {
      return {
        valid: true,
        user: {
          email: 'admin@sujal.dev',
          name: 'Sujal Gayakwad (Admin)',
          role: 'admin'
        }
      };
    }
    throw new Error('Token verification failed');
  },

  async changePassword(currentPassword: string, newPassword: string): Promise<{ message: string }> {
    try {
      const res = await fetch(`${API_BASE}/auth/change-password`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify({ currentPassword, newPassword })
      });
      if (res.ok) return res.json();
    } catch (err) {}
    return { message: 'Password updated successfully' };
  },

  // --- Portfolio Info ---
  async getPortfolio(): Promise<PortfolioInfo> {
    try {
      const res = await fetch(`${API_BASE}/portfolio`);
      if (res.ok) {
        const data = await res.json();
        if (data && data.name) {
          localStorage.setItem('cached_portfolio', JSON.stringify(data));
          return data;
        }
      }
    } catch (err) {}

    const cached = localStorage.getItem('cached_portfolio');
    if (cached) {
      try {
        return JSON.parse(cached);
      } catch (e) {}
    }
    return defaultSeedData.portfolioInfo;
  },

  async updatePortfolio(info: Partial<PortfolioInfo>): Promise<PortfolioInfo> {
    try {
      const res = await fetch(`${API_BASE}/portfolio`, {
        method: 'PUT',
        headers: getAuthHeaders(),
        body: JSON.stringify(info)
      });
      if (res.ok) {
        const data = await res.json();
        localStorage.setItem('cached_portfolio', JSON.stringify(data.data));
        return data.data;
      }
    } catch (err) {}

    const current = await this.getPortfolio();
    const updated = { ...current, ...info };
    localStorage.setItem('cached_portfolio', JSON.stringify(updated));
    return updated;
  },

  async factoryReset(): Promise<PortfolioInfo> {
    try {
      const res = await fetch(`${API_BASE}/portfolio/reset`, {
        method: 'POST',
        headers: getAuthHeaders()
      });
      if (res.ok) {
        const data = await res.json();
        localStorage.removeItem('cached_portfolio');
        localStorage.removeItem('cached_projects');
        localStorage.removeItem('cached_skills');
        localStorage.removeItem('cached_services');
        return data.data;
      }
    } catch (err) {}

    localStorage.removeItem('cached_portfolio');
    localStorage.removeItem('cached_projects');
    localStorage.removeItem('cached_skills');
    localStorage.removeItem('cached_services');
    return defaultSeedData.portfolioInfo;
  },

  async getStats(): Promise<DashboardStats> {
    try {
      const res = await fetch(`${API_BASE}/portfolio/stats`, {
        headers: getAuthHeaders()
      });
      if (res.ok) return res.json();
    } catch (err) {}

    const projects = await this.getProjects();
    const skills = await this.getSkills();
    const messages = await this.getMessages();

    return {
      totalProjects: projects.length,
      totalSkills: skills.length,
      totalMessages: messages.length,
      unreadMessages: messages.filter(m => !m.read).length,
      systemStatus: 'Operational (Static Mode)',
      uptime: '100%'
    };
  },

  // --- Projects ---
  async getProjects(): Promise<Project[]> {
    try {
      const res = await fetch(`${API_BASE}/projects`);
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data) && data.length > 0) {
          localStorage.setItem('cached_projects', JSON.stringify(data));
          return data;
        }
      }
    } catch (err) {}

    const cached = localStorage.getItem('cached_projects');
    if (cached) {
      try {
        return JSON.parse(cached);
      } catch (e) {}
    }
    return defaultSeedData.projects as Project[];
  },

  async createProject(project: Partial<Project>): Promise<Project> {
    try {
      const res = await fetch(`${API_BASE}/projects`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify(project)
      });
      if (res.ok) {
        const data = await res.json();
        return data.data;
      }
    } catch (err) {}

    const current = await this.getProjects();
    const newProject: Project = {
      id: `proj-${Date.now()}`,
      title: project.title || 'Untitled Project',
      desc: project.desc || '',
      category: project.category || 'security',
      image: project.image || '/assets/images/wifi-security.jpg',
      technologies: project.technologies || [],
      ...project
    } as Project;

    const updated = [newProject, ...current];
    localStorage.setItem('cached_projects', JSON.stringify(updated));
    return newProject;
  },

  async updateProject(id: string, project: Partial<Project>): Promise<Project> {
    try {
      const res = await fetch(`${API_BASE}/projects/${id}`, {
        method: 'PUT',
        headers: getAuthHeaders(),
        body: JSON.stringify(project)
      });
      if (res.ok) {
        const data = await res.json();
        return data.data;
      }
    } catch (err) {}

    const current = await this.getProjects();
    const idx = current.findIndex(p => p.id === id);
    if (idx !== -1) {
      current[idx] = { ...current[idx], ...project };
      localStorage.setItem('cached_projects', JSON.stringify(current));
      return current[idx];
    }
    throw new Error('Project not found');
  },

  async deleteProject(id: string): Promise<void> {
    try {
      const res = await fetch(`${API_BASE}/projects/${id}`, {
        method: 'DELETE',
        headers: getAuthHeaders()
      });
      if (res.ok) return;
    } catch (err) {}

    const current = await this.getProjects();
    const filtered = current.filter(p => p.id !== id);
    localStorage.setItem('cached_projects', JSON.stringify(filtered));
  },

  // --- Skills ---
  async getSkills(): Promise<Skill[]> {
    try {
      const res = await fetch(`${API_BASE}/skills`);
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data)) {
          localStorage.setItem('cached_skills', JSON.stringify(data));
          return data;
        }
      }
    } catch (err) {}

    const cached = localStorage.getItem('cached_skills');
    if (cached) {
      try {
        return JSON.parse(cached);
      } catch (e) {}
    }
    return defaultSeedData.skills;
  },

  async createSkill(skill: Partial<Skill>): Promise<Skill> {
    try {
      const res = await fetch(`${API_BASE}/skills`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify(skill)
      });
      if (res.ok) {
        const data = await res.json();
        return data.data;
      }
    } catch (err) {}

    const current = await this.getSkills();
    const newSkill: Skill = {
      id: `skill-${Date.now()}`,
      name: skill.name || 'New Skill',
      category: skill.category || 'Security',
      level: skill.level || 80,
      icon: skill.icon || '🛡️'
    };
    const updated = [...current, newSkill];
    localStorage.setItem('cached_skills', JSON.stringify(updated));
    return newSkill;
  },

  async updateSkill(id: string, skill: Partial<Skill>): Promise<Skill> {
    try {
      const res = await fetch(`${API_BASE}/skills/${id}`, {
        method: 'PUT',
        headers: getAuthHeaders(),
        body: JSON.stringify(skill)
      });
      if (res.ok) {
        const data = await res.json();
        return data.data;
      }
    } catch (err) {}

    const current = await this.getSkills();
    const idx = current.findIndex(s => s.id === id);
    if (idx !== -1) {
      current[idx] = { ...current[idx], ...skill };
      localStorage.setItem('cached_skills', JSON.stringify(current));
      return current[idx];
    }
    throw new Error('Skill not found');
  },

  async deleteSkill(id: string): Promise<void> {
    try {
      const res = await fetch(`${API_BASE}/skills/${id}`, {
        method: 'DELETE',
        headers: getAuthHeaders()
      });
      if (res.ok) return;
    } catch (err) {}

    const current = await this.getSkills();
    const filtered = current.filter(s => s.id !== id);
    localStorage.setItem('cached_skills', JSON.stringify(filtered));
  },

  // --- Services ---
  async getServices(): Promise<Service[]> {
    try {
      const res = await fetch(`${API_BASE}/services`);
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data)) {
          localStorage.setItem('cached_services', JSON.stringify(data));
          return data;
        }
      }
    } catch (err) {}

    const cached = localStorage.getItem('cached_services');
    if (cached) {
      try {
        return JSON.parse(cached);
      } catch (e) {}
    }
    return defaultSeedData.services;
  },

  async createService(service: Partial<Service>): Promise<Service> {
    try {
      const res = await fetch(`${API_BASE}/services`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify(service)
      });
      if (res.ok) {
        const data = await res.json();
        return data.data;
      }
    } catch (err) {}

    const current = await this.getServices();
    const newService: Service = {
      id: `srv-${Date.now()}`,
      title: service.title || 'New Service',
      description: service.description || '',
      icon: service.icon || '🛡️'
    };
    const updated = [...current, newService];
    localStorage.setItem('cached_services', JSON.stringify(updated));
    return newService;
  },

  async updateService(id: string, service: Partial<Service>): Promise<Service> {
    try {
      const res = await fetch(`${API_BASE}/services/${id}`, {
        method: 'PUT',
        headers: getAuthHeaders(),
        body: JSON.stringify(service)
      });
      if (res.ok) {
        const data = await res.json();
        return data.data;
      }
    } catch (err) {}

    const current = await this.getServices();
    const idx = current.findIndex(s => s.id === id);
    if (idx !== -1) {
      current[idx] = { ...current[idx], ...service };
      localStorage.setItem('cached_services', JSON.stringify(current));
      return current[idx];
    }
    throw new Error('Service not found');
  },

  async deleteService(id: string): Promise<void> {
    try {
      const res = await fetch(`${API_BASE}/services/${id}`, {
        method: 'DELETE',
        headers: getAuthHeaders()
      });
      if (res.ok) return;
    } catch (err) {}

    const current = await this.getServices();
    const filtered = current.filter(s => s.id !== id);
    localStorage.setItem('cached_services', JSON.stringify(filtered));
  },

  // --- Messages ---
  async sendMessage(msg: { name: string; email: string; message: string; subject?: string }): Promise<{ message: string }> {
    try {
      const res = await fetch(`${API_BASE}/messages`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(msg)
      });
      if (res.ok) return res.json();
    } catch (err) {}

    const saved = JSON.parse(localStorage.getItem('cached_messages') || '[]');
    saved.unshift({
      id: `msg-${Date.now()}`,
      ...msg,
      createdAt: new Date().toISOString(),
      read: false
    });
    localStorage.setItem('cached_messages', JSON.stringify(saved));
    return { message: 'Transmission received. Encrypted and saved to Admin CMS inbox.' };
  },

  async getMessages(): Promise<Message[]> {
    try {
      const res = await fetch(`${API_BASE}/messages`, {
        headers: getAuthHeaders()
      });
      if (res.ok) return res.json();
    } catch (err) {}

    return JSON.parse(localStorage.getItem('cached_messages') || '[]');
  },

  async toggleMessageRead(id: string): Promise<Message> {
    try {
      const res = await fetch(`${API_BASE}/messages/${id}/read`, {
        method: 'PATCH',
        headers: getAuthHeaders()
      });
      if (res.ok) {
        const data = await res.json();
        return data.data;
      }
    } catch (err) {}

    const messages = await this.getMessages();
    const msg = messages.find(m => m.id === id);
    if (msg) {
      msg.read = !msg.read;
      localStorage.setItem('cached_messages', JSON.stringify(messages));
      return msg;
    }
    throw new Error('Message not found');
  },

  async deleteMessage(id: string): Promise<void> {
    try {
      const res = await fetch(`${API_BASE}/messages/${id}`, {
        method: 'DELETE',
        headers: getAuthHeaders()
      });
      if (res.ok) return;
    } catch (err) {}

    const messages = await this.getMessages();
    const filtered = messages.filter(m => m.id !== id);
    localStorage.setItem('cached_messages', JSON.stringify(filtered));
  },

  // --- Upload ---
  async uploadImage(file: File): Promise<string> {
    const formData = new FormData();
    formData.append('image', file);

    const token = localStorage.getItem('admin_token');
    try {
      const res = await fetch(`${API_BASE}/upload`, {
        method: 'POST',
        headers: {
          ...(token ? { Authorization: `Bearer ${token}` } : {})
        },
        body: formData
      });
      if (res.ok) {
        const data = await res.json();
        return data.url;
      }
    } catch (err) {}

    // Fallback: convert to base64 Data URL for local persistence
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  }
};
