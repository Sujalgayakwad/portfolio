import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { usePortfolio } from '../../context/PortfolioContext';
import { api } from '../../services/api';
import { Project } from '../../types';
import { AdminSidebar } from './AdminSidebar';
import { OverviewTab } from './OverviewTab';
import { HeroEditorTab } from './HeroEditorTab';
import { ProjectsTab } from './ProjectsTab';
import { SkillsTab } from './SkillsTab';
import { MessagesTab } from './MessagesTab';
import { SettingsTab } from './SettingsTab';
import { ProjectFormModal } from './ProjectFormModal';
import { X, Lock, ShieldCheck, Key, ArrowRight, Eye, EyeOff } from 'lucide-react';

export const AdminModal: React.FC = () => {
  const { isAdminOpen, setIsAdminOpen, showToast } = usePortfolio();
  const { isAuthenticated, login, logout } = useAuth();

  const [activeTab, setActiveTab] = useState('overview');
  const [unreadCount, setUnreadCount] = useState(0);

  // Login form state
  const [email, setEmail] = useState('admin@sujal.dev');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loggingIn, setLoggingIn] = useState(false);
  const [loginError, setLoginError] = useState<string | null>(null);

  // Project editing modal state
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [isNewProjectModalOpen, setIsNewProjectModalOpen] = useState(false);

  const handleClose = () => {
    logout();
    setPassword('');
    setLoginError(null);
    setIsAdminOpen(false);
  };

  // Fetch unread count
  useEffect(() => {
    if (isAuthenticated && isAdminOpen) {
      api.getMessages()
        .then((msgs) => {
          setUnreadCount(msgs.filter((m) => !m.read).length);
        })
        .catch(() => {});
    }
  }, [isAuthenticated, isAdminOpen, activeTab]);

  // Handle ESC key to close & logout
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isAdminOpen && !isNewProjectModalOpen && !editingProject) {
        handleClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isAdminOpen, isNewProjectModalOpen, editingProject]);

  if (!isAdminOpen) return null;

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError(null);
    try {
      setLoggingIn(true);
      await login(email, password);
      showToast('Welcome, Administrator. Admin session authenticated.', 'success');
    } catch (err: any) {
      setLoginError(err.message || 'Invalid admin credentials');
    } finally {
      setLoggingIn(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-0 sm:p-4 overflow-hidden">
      {/* Dark backdrop */}
      <div
        className="fixed inset-0 bg-[#02050f]/85 backdrop-blur-xl transition-opacity"
        onClick={handleClose}
      />

      {/* Main CMS Container */}
      <div className="relative w-full h-full sm:h-[92vh] sm:max-w-6xl bg-[#050a18] border border-cyan-500/25 sm:rounded-3xl shadow-2xl shadow-cyan-500/10 z-10 flex flex-col overflow-hidden">
        
        {/* Top Header Bar */}
        <div className="px-5 py-3.5 bg-[#030612] border-b border-slate-800 flex items-center justify-between flex-shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-cyan-500/15 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div className="flex items-center gap-2">
              <span className="font-mono font-bold text-xs text-white">Sujal Portfolio CMS</span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-300 border border-cyan-500/20">
                v2.4 SecOps
              </span>
            </div>
          </div>

          <button
            onClick={handleClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white bg-slate-900 border border-slate-800 hover:border-cyan-500/40 transition-all flex items-center gap-1.5 text-xs font-mono"
            title="Log Out & Close Dashboard"
          >
            <span>Close Dashboard</span>
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content Area */}
        {!isAuthenticated ? (
          /* ================= LOGIN DIALOG ================= */
          <div className="flex-1 flex items-center justify-center p-6 overflow-y-auto">
            <div className="w-full max-w-md p-8 rounded-2xl bg-[#081024]/90 border border-cyan-500/30 shadow-2xl space-y-6">
              
              <div className="text-center space-y-2">
                <div className="w-14 h-14 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 flex items-center justify-center mx-auto shadow-glow-cyan">
                  <Lock className="w-7 h-7" />
                </div>
                <h2 className="text-xl font-bold font-mono text-white">Administrator Access</h2>
                <p className="text-xs text-slate-400 font-sans">
                  Authenticate to access the custom CMS, manage projects, and view transmission messages.
                </p>
              </div>

              {loginError && (
                <div className="p-3 rounded-xl bg-rose-500/15 border border-rose-500/30 text-rose-300 text-xs font-mono text-center">
                  {loginError}
                </div>
              )}

              <form onSubmit={handleLoginSubmit} className="space-y-4 text-xs font-mono">
                <div className="space-y-1.5">
                  <label className="text-slate-300">Admin Email</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="admin@sujal.dev"
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 focus:border-cyan-400 text-white outline-none"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-slate-300">Password</label>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="sujal"
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 focus:border-cyan-400 text-white outline-none pr-10"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loggingIn}
                  className="w-full py-3 rounded-xl text-xs font-mono font-bold bg-gradient-to-r from-cyan-400 to-blue-500 text-slate-950 hover:from-cyan-300 hover:to-blue-400 shadow-glow-cyan transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {loggingIn ? (
                    <span className="flex items-center gap-2">
                      <span className="w-4 h-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
                      Verifying Signature...
                    </span>
                  ) : (
                    <>
                      <span>Authenticate Session</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>

            </div>
          </div>
        ) : (
          /* ================= AUTHENTICATED DASHBOARD ================= */
          <div className="flex-1 flex overflow-hidden">
            {/* Sidebar */}
            <AdminSidebar
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              unreadCount={unreadCount}
            />

            {/* Main Tab View Area */}
            <main className="flex-1 overflow-y-auto p-6 sm:p-8 bg-[#040816]">
              {activeTab === 'overview' && (
                <OverviewTab
                  setActiveTab={setActiveTab}
                  onOpenNewProject={() => setIsNewProjectModalOpen(true)}
                />
              )}
              {activeTab === 'hero' && <HeroEditorTab />}
              {activeTab === 'projects' && (
                <ProjectsTab
                  onEditProject={(p) => setEditingProject(p)}
                  onNewProject={() => setIsNewProjectModalOpen(true)}
                />
              )}
              {activeTab === 'skills' && <SkillsTab />}
              {activeTab === 'messages' && <MessagesTab />}
              {activeTab === 'settings' && <SettingsTab />}
            </main>
          </div>
        )}

      </div>

      {/* Project Form Modal for Add or Edit */}
      {(isNewProjectModalOpen || editingProject) && (
        <ProjectFormModal
          project={editingProject}
          onClose={() => {
            setIsNewProjectModalOpen(false);
            setEditingProject(null);
          }}
        />
      )}

    </div>
  );
};
