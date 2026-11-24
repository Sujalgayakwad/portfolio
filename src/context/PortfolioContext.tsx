import React, { createContext, useContext, useState, useEffect } from 'react';
import { PortfolioInfo, Project, Skill, Service } from '../types';
import { api } from '../services/api';

interface PortfolioContextType {
  portfolio: PortfolioInfo | null;
  projects: Project[];
  skills: Skill[];
  services: Service[];
  loading: boolean;
  error: string | null;
  refreshData: () => Promise<void>;
  activeProjectModal: Project | null;
  setActiveProjectModal: (p: Project | null) => void;
  isAdminOpen: boolean;
  setIsAdminOpen: (open: boolean) => void;
  toast: { message: string; type: 'success' | 'error' | 'info' } | null;
  showToast: (message: string, type?: 'success' | 'error' | 'info') => void;
}

const PortfolioContext = createContext<PortfolioContextType | undefined>(undefined);

export const PortfolioProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [portfolio, setPortfolio] = useState<PortfolioInfo | null>(null);
  const [projects, setProjects] = useState<Project[]>([]);
  const [skills, setSkills] = useState<Skill[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [activeProjectModal, setActiveProjectModal] = useState<Project | null>(null);
  const [isAdminOpen, setIsAdminOpen] = useState<boolean>(false);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' | 'info' } | null>(null);

  const showToast = (message: string, type: 'success' | 'error' | 'info' = 'success') => {
    setToast({ message, type });
    setTimeout(() => {
      setToast(null);
    }, 4000);
  };

  const refreshData = async () => {
    try {
      setLoading(true);
      const [portData, projData, skillData, srvData] = await Promise.all([
        api.getPortfolio(),
        api.getProjects(),
        api.getSkills(),
        api.getServices()
      ]);
      setPortfolio(portData);
      setProjects(projData);
      setSkills(skillData);
      setServices(srvData);
      setError(null);
    } catch (err: any) {
      console.error('Failed to load portfolio data:', err);
      setError(err.message || 'Error loading portfolio data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refreshData();
  }, []);

  return (
    <PortfolioContext.Provider
      value={{
        portfolio,
        projects,
        skills,
        services,
        loading,
        error,
        refreshData,
        activeProjectModal,
        setActiveProjectModal,
        isAdminOpen,
        setIsAdminOpen,
        toast,
        showToast
      }}
    >
      {children}
    </PortfolioContext.Provider>
  );
};

export const usePortfolio = () => {
  const context = useContext(PortfolioContext);
  if (!context) throw new Error('usePortfolio must be used within a PortfolioProvider');
  return context;
};
