import React, { useState } from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { api } from '../../services/api';
import { Skill, Service } from '../../types';
import { Wrench, Plus, Trash2, Edit2, Save, Shield, Radio, KeyRound, Code2, Layers } from 'lucide-react';

export const SkillsTab: React.FC = () => {
  const { skills, services, refreshData, showToast } = usePortfolio();

  // Skill state
  const [newSkillName, setNewSkillName] = useState('');
  const [newSkillCategory, setNewSkillCategory] = useState('Cybersecurity');
  const [newSkillLevel, setNewSkillLevel] = useState(85);
  const [newSkillIcon, setNewSkillIcon] = useState('Shield');
  const [addingSkill, setAddingSkill] = useState(false);

  // Service state
  const [newSrvTitle, setNewSrvTitle] = useState('');
  const [newSrvDesc, setNewSrvDesc] = useState('');
  const [newSrvIcon, setNewSrvIcon] = useState('ShieldCheck');
  const [addingSrv, setAddingSrv] = useState(false);

  const handleCreateSkill = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSkillName.trim()) return;

    try {
      setAddingSkill(true);
      await api.createSkill({
        name: newSkillName.trim(),
        category: newSkillCategory,
        level: Number(newSkillLevel),
        icon: newSkillIcon
      });
      await refreshData();
      showToast(`Skill "${newSkillName}" created!`, 'success');
      setNewSkillName('');
    } catch (err: any) {
      showToast(err.message || 'Failed to create skill', 'error');
    } finally {
      setAddingSkill(false);
    }
  };

  const handleDeleteSkill = async (id: string, name: string) => {
    if (!window.confirm(`Delete skill "${name}"?`)) return;
    try {
      await api.deleteSkill(id);
      await refreshData();
      showToast(`Skill "${name}" deleted`, 'info');
    } catch (err: any) {
      showToast(err.message || 'Failed to delete skill', 'error');
    }
  };

  const handleCreateService = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSrvTitle.trim() || !newSrvDesc.trim()) return;

    try {
      setAddingSrv(true);
      await api.createService({
        title: newSrvTitle.trim(),
        description: newSrvDesc.trim(),
        icon: newSrvIcon
      });
      await refreshData();
      showToast(`Service "${newSrvTitle}" added!`, 'success');
      setNewSrvTitle('');
      setNewSrvDesc('');
    } catch (err: any) {
      showToast(err.message || 'Failed to create service', 'error');
    } finally {
      setAddingSrv(false);
    }
  };

  const handleDeleteService = async (id: string, title: string) => {
    if (!window.confirm(`Delete service "${title}"?`)) return;
    try {
      await api.deleteService(id);
      await refreshData();
      showToast(`Service "${title}" deleted`, 'info');
    } catch (err: any) {
      showToast(err.message || 'Failed to delete service', 'error');
    }
  };

  return (
    <div className="space-y-10 max-w-4xl">
      
      {/* Header */}
      <div className="pb-6 border-b border-slate-800">
        <h1 className="text-xl sm:text-2xl font-bold font-mono text-white flex items-center gap-2.5">
          <Wrench className="w-5 h-5 text-cyan-400" />
          <span>Skills & Services Management</span>
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 font-sans mt-1">
          Add or remove technical competencies and engineering service deliverables.
        </p>
      </div>

      {/* SECTION 1: Technical Skills Management */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-bold font-mono text-white">
            1. Technical Skills ({skills.length})
          </h2>
        </div>

        {/* Add Skill Form */}
        <form onSubmit={handleCreateSkill} className="p-5 rounded-2xl bg-[#081024]/80 border border-slate-800 space-y-4">
          <h3 className="text-xs font-mono uppercase text-cyan-400">Add New Skill Record</h3>
          
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 text-xs font-mono">
            <div className="sm:col-span-2 space-y-1">
              <label className="text-slate-300">Skill Name *</label>
              <input
                type="text"
                required
                value={newSkillName}
                onChange={(e) => setNewSkillName(e.target.value)}
                placeholder="e.g. Wi-Fi Protocol 802.11 Auditing"
                className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white outline-none focus:border-cyan-400"
              />
            </div>

            <div className="space-y-1">
              <label className="text-slate-300">Category</label>
              <select
                value={newSkillCategory}
                onChange={(e) => setNewSkillCategory(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white outline-none focus:border-cyan-400"
              >
                <option value="Cybersecurity">Cybersecurity</option>
                <option value="Development">Development</option>
                <option value="Security Engineering">Security Engineering</option>
                <option value="AI & Systems">AI & Systems</option>
                <option value="DevOps & Tools">DevOps & Tools</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-slate-300">Level ({newSkillLevel}%)</label>
              <input
                type="range"
                min="30"
                max="100"
                value={newSkillLevel}
                onChange={(e) => setNewSkillLevel(Number(e.target.value))}
                className="w-full accent-cyan-400 mt-2"
              />
            </div>
          </div>

          <div className="flex justify-end pt-1">
            <button
              type="submit"
              disabled={addingSkill}
              className="inline-flex items-center gap-2 px-5 py-2 rounded-xl text-xs font-mono font-bold bg-cyan-500 text-slate-950 hover:bg-cyan-400 shadow-glow-cyan transition-all"
            >
              <Plus className="w-4 h-4" />
              <span>{addingSkill ? 'Adding...' : 'Add Skill'}</span>
            </button>
          </div>
        </form>

        {/* Existing Skills Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {skills.map((skill) => (
            <div
              key={skill.id}
              className="p-3.5 rounded-xl bg-[#081024]/60 border border-slate-800 flex items-center justify-between gap-3 text-xs font-mono"
            >
              <div className="truncate">
                <div className="font-semibold text-white truncate font-sans">{skill.name}</div>
                <div className="text-[10px] text-cyan-400 mt-0.5">{skill.category} • {skill.level}%</div>
              </div>
              <button
                onClick={() => handleDeleteSkill(skill.id, skill.name)}
                className="p-1.5 rounded-lg text-slate-500 hover:text-rose-400 hover:bg-rose-500/10 transition-all"
                title="Delete Skill"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* SECTION 2: Services Management */}
      <div className="space-y-6 pt-6 border-t border-slate-800">
        <h2 className="text-base font-bold font-mono text-white">
          2. Services & Engineering Deliverables ({services.length})
        </h2>

        {/* Add Service Form */}
        <form onSubmit={handleCreateService} className="p-5 rounded-2xl bg-[#081024]/80 border border-slate-800 space-y-4">
          <h3 className="text-xs font-mono uppercase text-cyan-400">Add New Service</h3>
          
          <div className="space-y-3 text-xs font-mono">
            <div className="space-y-1">
              <label className="text-slate-300">Service Title *</label>
              <input
                type="text"
                required
                value={newSrvTitle}
                onChange={(e) => setNewSrvTitle(e.target.value)}
                placeholder="e.g. RF & Wireless Airspace Auditing"
                className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white outline-none focus:border-cyan-400"
              />
            </div>

            <div className="space-y-1">
              <label className="text-slate-300">Description *</label>
              <textarea
                required
                rows={2}
                value={newSrvDesc}
                onChange={(e) => setNewSrvDesc(e.target.value)}
                placeholder="Outline deliverables, methodology, and outcome..."
                className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white outline-none focus:border-cyan-400 resize-none font-sans"
              />
            </div>
          </div>

          <div className="flex justify-end pt-1">
            <button
              type="submit"
              disabled={addingSrv}
              className="inline-flex items-center gap-2 px-5 py-2 rounded-xl text-xs font-mono font-bold bg-cyan-500 text-slate-950 hover:bg-cyan-400 shadow-glow-cyan transition-all"
            >
              <Plus className="w-4 h-4" />
              <span>{addingSrv ? 'Adding...' : 'Add Service'}</span>
            </button>
          </div>
        </form>

        {/* Existing Services List */}
        <div className="space-y-3">
          {services.map((srv) => (
            <div
              key={srv.id}
              className="p-4 rounded-xl bg-[#081024]/60 border border-slate-800 flex items-start justify-between gap-4"
            >
              <div className="space-y-1">
                <h4 className="text-sm font-bold text-white font-sans">{srv.title}</h4>
                <p className="text-xs text-slate-400 font-sans leading-relaxed">{srv.description}</p>
              </div>
              <button
                onClick={() => handleDeleteService(srv.id, srv.title)}
                className="p-2 rounded-lg text-slate-500 hover:text-rose-400 hover:bg-rose-500/10 transition-all flex-shrink-0"
                title="Delete Service"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
