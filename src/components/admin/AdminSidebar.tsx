import React from 'react';
import { 
  LayoutDashboard, 
  User, 
  FolderGit2, 
  Wrench, 
  Mail, 
  Settings, 
  LogOut, 
  ExternalLink,
  ShieldAlert
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { usePortfolio } from '../../context/PortfolioContext';

interface AdminSidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  unreadCount: number;
}

export const AdminSidebar: React.FC<AdminSidebarProps> = ({
  activeTab,
  setActiveTab,
  unreadCount
}) => {
  const { user, logout } = useAuth();
  const { setIsAdminOpen } = usePortfolio();

  const navItems = [
    { id: 'overview', label: 'Overview', icon: LayoutDashboard },
    { id: 'hero', label: 'Hero & Profile', icon: User },
    { id: 'projects', label: 'Projects CMS', icon: FolderGit2 },
    { id: 'skills', label: 'Skills & Services', icon: Wrench },
    { id: 'messages', label: 'Inquiries Inbox', icon: Mail, badge: unreadCount },
    { id: 'settings', label: 'Settings & Reset', icon: Settings },
  ];

  const handleExit = () => {
    logout();
    setIsAdminOpen(false);
  };

  return (
    <aside className="w-64 bg-[#060b1c] border-r border-cyan-500/15 flex flex-col justify-between h-full flex-shrink-0 select-none">
      
      {/* Sidebar Header */}
      <div>
        <div className="p-5 border-b border-slate-800/80 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center text-cyan-400">
              <ShieldAlert className="w-4 h-4" />
            </div>
            <div>
              <div className="font-mono font-bold text-sm text-white">Portfolio CMS</div>
              <div className="text-[10px] font-mono text-cyan-400">Admin Control Panel</div>
            </div>
          </div>

          <button
            onClick={handleExit}
            className="text-slate-400 hover:text-white p-1 rounded-md hover:bg-slate-800 text-xs font-mono"
            title="Log Out & View Live Site"
          >
            <ExternalLink className="w-4 h-4" />
          </button>
        </div>

        {/* Navigation Items */}
        <nav className="p-3 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-mono font-medium transition-all ${
                  isActive
                    ? 'bg-gradient-to-r from-cyan-500/20 to-blue-500/10 text-cyan-300 border border-cyan-500/30 shadow-sm'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className={`w-4 h-4 ${isActive ? 'text-cyan-400' : 'text-slate-500'}`} />
                  <span>{item.label}</span>
                </div>
                {item.badge !== undefined && item.badge > 0 && (
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-cyan-500 text-slate-950 animate-pulse">
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Sidebar Footer / User Profile & Logout */}
      <div className="p-4 border-t border-slate-800/80 bg-[#040814]">
        <div className="flex items-center justify-between mb-3">
          <div className="truncate">
            <div className="text-xs font-semibold text-white truncate font-sans">
              {user?.name || 'Administrator'}
            </div>
            <div className="text-[10px] font-mono text-cyan-400 truncate">
              {user?.email || 'admin@sujal.dev'}
            </div>
          </div>
          <span className="px-1.5 py-0.5 rounded text-[9px] font-mono bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
            Online
          </span>
        </div>

        <button
          onClick={handleExit}
          className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded-lg text-xs font-mono text-rose-400 bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/20 transition-all"
        >
          <LogOut className="w-3.5 h-3.5" />
          <span>Exit Admin Session</span>
        </button>
      </div>

    </aside>
  );
};
