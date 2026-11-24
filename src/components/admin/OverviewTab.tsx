import React, { useEffect, useState } from 'react';
import { 
  FolderGit2, 
  Wrench, 
  Mail, 
  ShieldCheck, 
  Activity, 
  Plus, 
  Edit3, 
  RotateCcw,
  Clock,
  ArrowRight
} from 'lucide-react';
import { api } from '../../services/api';
import { DashboardStats, Message } from '../../types';
import { usePortfolio } from '../../context/PortfolioContext';

interface OverviewTabProps {
  setActiveTab: (tab: string) => void;
  onOpenNewProject: () => void;
}

export const OverviewTab: React.FC<OverviewTabProps> = ({
  setActiveTab,
  onOpenNewProject
}) => {
  const { portfolio, projects, skills } = usePortfolio();
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [recentMessages, setRecentMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadStats() {
      try {
        const [statsData, msgs] = await Promise.all([
          api.getStats(),
          api.getMessages()
        ]);
        setStats(statsData);
        setRecentMessages(msgs.slice(0, 4));
      } catch (err) {
        console.error('Failed to load overview data', err);
      } finally {
        setLoading(false);
      }
    }
    loadStats();
  }, [projects, skills]);

  return (
    <div className="space-y-8">
      
      {/* Top Banner */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-[#0b142e] to-[#070d1e] border border-cyan-500/20 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-[11px] font-mono mb-2">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
            Live Full-Stack CMS Active
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white font-sans">
            Welcome back, <span className="text-cyan-400">{portfolio?.name || 'Sujal'}</span>
          </h1>
          <p className="text-slate-400 text-xs sm:text-sm mt-1 font-sans">
            Manage your hero presence, project evidence, technical skills, and incoming client transmissions.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setActiveTab('hero')}
            className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-mono font-semibold bg-cyan-500/15 border border-cyan-500/30 text-cyan-300 hover:bg-cyan-500/25 transition-all"
          >
            <Edit3 className="w-4 h-4" />
            <span>Edit Hero Info</span>
          </button>
          <button
            onClick={onOpenNewProject}
            className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-mono font-semibold bg-gradient-to-r from-cyan-400 to-blue-500 text-slate-950 hover:from-cyan-300 hover:to-blue-400 shadow-glow-cyan transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>Add Project</span>
          </button>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        
        {/* Total Projects */}
        <div className="p-5 rounded-2xl bg-[#081024]/80 border border-slate-800 hover:border-cyan-500/30 transition-all">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-mono text-slate-400">Total Projects</span>
            <div className="p-2 rounded-lg bg-cyan-500/10 text-cyan-400">
              <FolderGit2 className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-mono font-extrabold text-white">
            {stats?.totalProjects ?? projects.length}
          </div>
          <div className="text-[11px] font-mono text-cyan-400/80 mt-1">
            Active in Portfolio
          </div>
        </div>

        {/* Total Skills */}
        <div className="p-5 rounded-2xl bg-[#081024]/80 border border-slate-800 hover:border-cyan-500/30 transition-all">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-mono text-slate-400">Technical Skills</span>
            <div className="p-2 rounded-lg bg-blue-500/10 text-blue-400">
              <Wrench className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-mono font-extrabold text-white">
            {stats?.totalSkills ?? skills.length}
          </div>
          <div className="text-[11px] font-mono text-blue-400/80 mt-1">
            Across 5 categories
          </div>
        </div>

        {/* Inquiries */}
        <div className="p-5 rounded-2xl bg-[#081024]/80 border border-slate-800 hover:border-cyan-500/30 transition-all">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-mono text-slate-400">Inquiries Received</span>
            <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400">
              <Mail className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-mono font-extrabold text-white">
            {stats?.totalMessages ?? 0}
          </div>
          <div className="text-[11px] font-mono text-emerald-400/80 mt-1">
            {stats?.unreadMessages ?? 0} unread transmissions
          </div>
        </div>

        {/* System Uptime */}
        <div className="p-5 rounded-2xl bg-[#081024]/80 border border-slate-800 hover:border-cyan-500/30 transition-all">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-mono text-slate-400">Security Mode</span>
            <div className="p-2 rounded-lg bg-purple-500/10 text-purple-400">
              <ShieldCheck className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-mono font-extrabold text-emerald-400">
            {stats?.uptime || '99.98%'}
          </div>
          <div className="text-[11px] font-mono text-slate-400 mt-1">
            Zero-Trust RBAC Active
          </div>
        </div>

      </div>

      {/* Two Column Section: Recent Messages & Quick Health */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Recent Inquiries Preview (7 Cols) */}
        <div className="lg:col-span-7 p-6 rounded-2xl bg-[#081024]/80 border border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-cyan-400" />
              <h2 className="text-sm font-bold font-mono text-white">
                Recent Inquiries ({recentMessages.length})
              </h2>
            </div>
            <button
              onClick={() => setActiveTab('messages')}
              className="text-xs font-mono text-cyan-400 hover:text-cyan-300 flex items-center gap-1"
            >
              <span>View All</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {recentMessages.length === 0 ? (
            <div className="text-center py-8 text-xs font-mono text-slate-500">
              No transmission messages yet. They will appear here when submitted via the contact form!
            </div>
          ) : (
            <div className="space-y-2.5">
              {recentMessages.map((msg) => (
                <div
                  key={msg.id}
                  onClick={() => setActiveTab('messages')}
                  className={`p-3.5 rounded-xl border transition-all cursor-pointer ${
                    !msg.read
                      ? 'bg-cyan-500/10 border-cyan-500/30 hover:bg-cyan-500/15'
                      : 'bg-slate-900/60 border-slate-800 hover:bg-slate-900'
                  }`}
                >
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-white">{msg.name}</span>
                    <span className="text-[10px] font-mono text-slate-400">
                      {new Date(msg.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="text-xs text-cyan-300/80 font-mono mt-0.5 truncate">
                    {msg.subject || msg.email}
                  </div>
                  <div className="text-xs text-slate-400 line-clamp-1 mt-1 font-sans">
                    {msg.message}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* System Diagnostics & CMS Quick Controls (5 Cols) */}
        <div className="lg:col-span-5 p-6 rounded-2xl bg-[#081024]/80 border border-slate-800 space-y-5">
          <div className="flex items-center gap-2">
            <Activity className="w-4 h-4 text-emerald-400" />
            <h2 className="text-sm font-bold font-mono text-white">System Diagnostics</h2>
          </div>

          <div className="space-y-3 divide-y divide-slate-800 text-xs font-mono">
            <div className="flex justify-between items-center pt-2">
              <span className="text-slate-400">API Gateway</span>
              <span className="text-emerald-400 font-semibold">Online (Port 5000)</span>
            </div>
            <div className="flex justify-between items-center pt-2">
              <span className="text-slate-400">Database Engine</span>
              <span className="text-cyan-400 font-semibold">Synced & Persistent</span>
            </div>
            <div className="flex justify-between items-center pt-2">
              <span className="text-slate-400">File Storage Service</span>
              <span className="text-slate-200">Local Multi-part Uploads</span>
            </div>
            <div className="flex justify-between items-center pt-2">
              <span className="text-slate-400">Live Updates Mode</span>
              <span className="text-cyan-400 font-semibold">Instant Synchronous</span>
            </div>
          </div>

          <div className="pt-2">
            <h3 className="text-xs font-mono uppercase text-slate-400 mb-2.5">
              Quick Management Shortcuts
            </h3>
            <div className="grid grid-cols-2 gap-2 text-xs font-mono">
              <button
                onClick={() => setActiveTab('hero')}
                className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 hover:border-cyan-500/40 text-slate-300 hover:text-white transition-all text-left"
              >
                👤 Update Bio & Photo
              </button>
              <button
                onClick={() => setActiveTab('projects')}
                className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 hover:border-cyan-500/40 text-slate-300 hover:text-white transition-all text-left"
              >
                📁 Manage Projects
              </button>
              <button
                onClick={() => setActiveTab('skills')}
                className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 hover:border-cyan-500/40 text-slate-300 hover:text-white transition-all text-left"
              >
                ⚡ Edit Tech Skills
              </button>
              <button
                onClick={() => setActiveTab('settings')}
                className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 hover:border-cyan-500/40 text-slate-300 hover:text-white transition-all text-left"
              >
                ⚙️ Security & Reset
              </button>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};
