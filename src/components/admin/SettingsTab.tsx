import React, { useState } from 'react';
import { api } from '../../services/api';
import { usePortfolio } from '../../context/PortfolioContext';
import { Settings, Lock, RotateCcw, ShieldAlert, CheckCircle2, Server, Key } from 'lucide-react';

export const SettingsTab: React.FC = () => {
  const { refreshData, showToast } = usePortfolio();

  // Password state
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [updatingPass, setUpdatingPass] = useState(false);

  // Factory reset state
  const [resetting, setResetting] = useState(false);
  const [confirmResetOpen, setConfirmResetOpen] = useState(false);

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentPassword || !newPassword) {
      showToast('Please fill out all password fields', 'error');
      return;
    }

    if (newPassword !== confirmPassword) {
      showToast('New passwords do not match', 'error');
      return;
    }

    if (newPassword.length < 6) {
      showToast('Password must be at least 6 characters', 'error');
      return;
    }

    try {
      setUpdatingPass(true);
      await api.changePassword(currentPassword, newPassword);
      showToast('Admin password changed successfully!', 'success');
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } catch (err: any) {
      showToast(err.message || 'Failed to update password', 'error');
    } finally {
      setUpdatingPass(false);
    }
  };

  const handleFactoryReset = async () => {
    try {
      setResetting(true);
      await api.factoryReset();
      await refreshData();
      showToast('Factory Reset Complete! Portfolio restored to default state.', 'success');
      setConfirmResetOpen(false);
    } catch (err: any) {
      showToast(err.message || 'Factory reset failed', 'error');
    } finally {
      setResetting(false);
    }
  };

  return (
    <div className="space-y-10 max-w-4xl">
      
      {/* Header */}
      <div className="pb-6 border-b border-slate-800">
        <h1 className="text-xl sm:text-2xl font-bold font-mono text-white flex items-center gap-2.5">
          <Settings className="w-5 h-5 text-cyan-400" />
          <span>System Settings & Security</span>
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 font-sans mt-1">
          Admin authentication credentials, system diagnostics, and emergency factory restore.
        </p>
      </div>

      {/* SECTION 1: Change Admin Password */}
      <div className="p-6 rounded-2xl bg-[#081024]/80 border border-slate-800 space-y-5">
        <h2 className="text-sm font-bold font-mono text-white flex items-center gap-2">
          <Lock className="w-4 h-4 text-cyan-400" />
          <span>Change Admin Password</span>
        </h2>

        <form onSubmit={handlePasswordChange} className="space-y-4 max-w-md text-xs font-mono">
          <div className="space-y-1">
            <label className="text-slate-300">Current Password *</label>
            <input
              type="password"
              required
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white outline-none focus:border-cyan-400"
            />
          </div>

          <div className="space-y-1">
            <label className="text-slate-300">New Password (min 6 chars) *</label>
            <input
              type="password"
              required
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white outline-none focus:border-cyan-400"
            />
          </div>

          <div className="space-y-1">
            <label className="text-slate-300">Confirm New Password *</label>
            <input
              type="password"
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white outline-none focus:border-cyan-400"
            />
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={updatingPass}
              className="px-5 py-2.5 rounded-xl font-bold bg-cyan-500 text-slate-950 hover:bg-cyan-400 shadow-glow-cyan transition-all disabled:opacity-50"
            >
              {updatingPass ? 'Updating...' : 'Update Password'}
            </button>
          </div>
        </form>
      </div>

      {/* SECTION 2: System Health Diagnostics */}
      <div className="p-6 rounded-2xl bg-[#081024]/80 border border-slate-800 space-y-4">
        <h2 className="text-sm font-bold font-mono text-white flex items-center gap-2">
          <Server className="w-4 h-4 text-emerald-400" />
          <span>Server Architecture & Storage Status</span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono">
          <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-850">
            <div className="text-slate-400">Backend Server Port</div>
            <div className="text-white font-bold text-sm mt-0.5">5000 (Express REST API)</div>
          </div>
          <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-850">
            <div className="text-slate-400">Database Engine</div>
            <div className="text-cyan-400 font-bold text-sm mt-0.5">MongoDB + Local Store Sync</div>
          </div>
          <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-850">
            <div className="text-slate-400">Auth Mechanism</div>
            <div className="text-purple-400 font-bold text-sm mt-0.5">Bcrypt + Signed JWT Tokens</div>
          </div>
          <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-850">
            <div className="text-slate-400">Asset Uploads Directory</div>
            <div className="text-slate-200 font-bold text-sm mt-0.5">/public/uploads</div>
          </div>
        </div>
      </div>

      {/* SECTION 3: FACTORY RESET (Kashif's Video Feature!) */}
      <div className="p-6 rounded-2xl bg-rose-950/20 border border-rose-500/30 space-y-4">
        <div className="flex items-center gap-2.5 text-rose-400">
          <RotateCcw className="w-5 h-5" />
          <h2 className="text-base font-bold font-mono">Emergency Factory Reset</h2>
        </div>

        <p className="text-xs text-slate-300 font-sans leading-relaxed">
          As demonstrated in the reference video: This action performs a complete factory reset of your portfolio content. It will restore all original default hero text, project records, skills, services, and original portrait assets, while preserving your database structure.
        </p>

        <div className="pt-2">
          <button
            type="button"
            onClick={() => setConfirmResetOpen(true)}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-mono font-bold bg-rose-500 text-white hover:bg-rose-600 shadow-lg shadow-rose-500/20 transition-all"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Factory Reset Portfolio</span>
          </button>
        </div>
      </div>

      {/* Confirmation Dialog Modal */}
      {confirmResetOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-black/80 backdrop-blur-md" onClick={() => setConfirmResetOpen(false)} />
          <div className="relative w-full max-w-md p-6 rounded-2xl bg-[#091126] border border-rose-500/50 shadow-2xl z-10 space-y-4 text-center">
            <div className="w-12 h-12 rounded-full bg-rose-500/10 border border-rose-500/30 text-rose-400 flex items-center justify-center mx-auto">
              <ShieldAlert className="w-6 h-6" />
            </div>

            <h3 className="text-lg font-bold font-mono text-white">
              Confirm Factory Reset?
            </h3>

            <p className="text-xs text-slate-300 font-sans leading-relaxed">
              Are you sure you want to reset all portfolio content to factory defaults? Any custom projects, hero edits, or custom skills you created will be reverted to the seed data.
            </p>

            <div className="flex items-center justify-center gap-3 pt-3">
              <button
                type="button"
                onClick={() => setConfirmResetOpen(false)}
                className="px-4 py-2 rounded-xl text-xs font-mono text-slate-400 hover:text-white bg-slate-900 border border-slate-800"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleFactoryReset}
                disabled={resetting}
                className="px-5 py-2 rounded-xl text-xs font-mono font-bold bg-rose-500 text-white hover:bg-rose-600 shadow-md transition-all disabled:opacity-50"
              >
                {resetting ? 'Resetting...' : 'Yes, Restore Defaults'}
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
