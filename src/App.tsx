import React from 'react';
import { AuthProvider } from './context/AuthContext';
import { PortfolioProvider, usePortfolio } from './context/PortfolioContext';
import { MatrixBackground } from './components/MatrixBackground';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { StatsSection } from './components/StatsSection';
import { AboutSection } from './components/AboutSection';
import { ProjectsSection } from './components/ProjectsSection';
import { SkillsSection } from './components/SkillsSection';
import { ServicesSection } from './components/ServicesSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { ProjectModal } from './components/ProjectModal';
import { AdminModal } from './components/admin/AdminModal';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

const ToastNotification: React.FC = () => {
  const { toast } = usePortfolio();
  if (!toast) return null;

  const bgStyles = {
    success: 'bg-[#091f1a] border-emerald-500/40 text-emerald-300 shadow-emerald-500/20',
    error: 'bg-[#250d15] border-rose-500/40 text-rose-300 shadow-rose-500/20',
    info: 'bg-[#0a1733] border-cyan-500/40 text-cyan-300 shadow-cyan-500/20',
  }[toast.type];

  const Icon = {
    success: CheckCircle2,
    error: AlertCircle,
    info: Info,
  }[toast.type];

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 animate-bounce">
      <div className={`flex items-center gap-2.5 px-4 py-2.5 rounded-xl border shadow-xl text-xs font-mono backdrop-blur-md ${bgStyles}`}>
        <Icon className="w-4 h-4 flex-shrink-0" />
        <span>{toast.message}</span>
      </div>
    </div>
  );
};

const PortfolioApp: React.FC = () => {
  const { setIsAdminOpen, isAdminOpen } = usePortfolio();

  // Secret Triggers: Keyboard Shortcut (Ctrl+Shift+A / Ctrl+Shift+S), typing "ananya" / "admin", or URL hash #admin / #ananya
  React.useEffect(() => {
    let keyBuffer = '';

    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignore if user is typing in an input or textarea
      const target = e.target as HTMLElement;
      const isInput = target?.tagName === 'INPUT' || target?.tagName === 'TEXTAREA' || target?.isContentEditable;

      // 1. Hotkey Shortcut: Ctrl + Shift + A or Ctrl + Shift + S (or Cmd on Mac)
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key.toLowerCase() === 'a' || e.key.toLowerCase() === 's')) {
        e.preventDefault();
        setIsAdminOpen(true);
        return;
      }

      if (isInput || isAdminOpen) return;

      // 2. Secret Keyword detection: typing "admin" or "ananya" anywhere on the page
      keyBuffer += e.key.toLowerCase();
      if (keyBuffer.length > 10) {
        keyBuffer = keyBuffer.slice(-10);
      }

      if (keyBuffer.endsWith('ananya') || keyBuffer.endsWith('admin')) {
        setIsAdminOpen(true);
        keyBuffer = '';
      }
    };

    // 3. Secret URL hash: #admin or #ananya
    const checkHash = () => {
      if (window.location.hash === '#admin' || window.location.hash === '#ananya' || window.location.hash === '#sujal') {
        setIsAdminOpen(true);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('hashchange', checkHash);
    checkHash();

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('hashchange', checkHash);
    };
  }, [setIsAdminOpen, isAdminOpen]);

  return (
    <div className="min-h-screen bg-[#030712] text-slate-200 relative">
      {/* Dynamic Background */}
      <MatrixBackground />

      {/* Navigation */}
      <Navbar />

      {/* Main Portfolio Sections */}
      <main className="relative z-10">
        <Hero />
        <StatsSection />
        <AboutSection />
        <ProjectsSection />
        <SkillsSection />
        <ServicesSection />
        <ContactSection />
      </main>

      {/* Footer */}
      <Footer />

      {/* Modals & Dialogs */}
      <ProjectModal />
      <AdminModal />
      <ToastNotification />
    </div>
  );
};

export default function App() {
  return (
    <AuthProvider>
      <PortfolioProvider>
        <PortfolioApp />
      </PortfolioProvider>
    </AuthProvider>
  );
}
