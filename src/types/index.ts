export interface Pillar {
  icon: string;
  title: string;
  desc: string;
}

export interface StatItem {
  label: string;
  value: string;
  change?: string;
}

export interface PortfolioInfo {
  greeting: string;
  name: string;
  title: string;
  titles: string[];
  tagline: string;
  shortBio: string;
  avatarUrl: string;
  status: string;
  location: string;
  email: string;
  github: string;
  linkedin: string;
  instagram: string;
  aboutMe: string;
  aboutPillars: Pillar[];
  stats: StatItem[];
}

export interface Project {
  id: string;
  title: string;
  badge?: string;
  tagline?: string;
  category: 'security' | 'ai' | 'web' | string;
  image: string;
  featured?: boolean;
  desc: string;
  whatWasIt?: string;
  whyBuilt?: string;
  objective?: string;
  technologies: string[];
  whatIDid?: string[];
  skillsDeveloped?: string[];
  outcome?: string;
  realWorldRelevance?: string;
  repoUrl?: string;
  demoUrl?: string;
  status?: string;
}

export interface Skill {
  id: string;
  name: string;
  category: string;
  level: number;
  icon?: string;
}

export interface Service {
  id: string;
  icon: string;
  title: string;
  description: string;
}

export interface Message {
  id: string;
  name: string;
  email: string;
  subject?: string;
  message: string;
  createdAt: string;
  read: boolean;
}

export interface DashboardStats {
  totalProjects: number;
  totalSkills: number;
  totalMessages: number;
  unreadMessages: number;
  systemStatus: string;
  uptime: string;
  lastSync?: string;
}

export interface AdminUser {
  email: string;
  name: string;
  role: string;
}
