import React, { useState } from 'react';
import { Project } from '../../types';
import { api } from '../../services/api';
import { usePortfolio } from '../../context/PortfolioContext';
import { X, Upload, Plus, Trash2, Save, Image as ImageIcon } from 'lucide-react';

interface ProjectFormModalProps {
  project: Project | null;
  onClose: () => void;
}

export const ProjectFormModal: React.FC<ProjectFormModalProps> = ({
  project,
  onClose
}) => {
  const { refreshData, showToast } = usePortfolio();
  const isEditing = !!project;

  const [formData, setFormData] = useState<Partial<Project>>({
    id: project?.id || `proj-${Date.now()}`,
    title: project?.title || '',
    badge: project?.badge || '',
    tagline: project?.tagline || '',
    category: project?.category || 'security',
    status: project?.status || 'Active',
    image: project?.image || '/assets/images/wifi-security.jpg',
    desc: project?.desc || '',
    whatWasIt: project?.whatWasIt || '',
    whyBuilt: project?.whyBuilt || '',
    objective: project?.objective || '',
    technologies: project?.technologies || [],
    whatIDid: project?.whatIDid || [],
    skillsDeveloped: project?.skillsDeveloped || [],
    outcome: project?.outcome || '',
    realWorldRelevance: project?.realWorldRelevance || '',
    repoUrl: project?.repoUrl || 'https://github.com/Sujalgayakwad',
    demoUrl: project?.demoUrl || '#',
  });

  const [techInput, setTechInput] = useState('');
  const [actionInput, setActionInput] = useState('');
  const [skillInput, setSkillInput] = useState('');
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);

  const handleAddTech = () => {
    if (!techInput.trim()) return;
    setFormData({
      ...formData,
      technologies: [...(formData.technologies || []), techInput.trim()]
    });
    setTechInput('');
  };

  const handleRemoveTech = (index: number) => {
    setFormData({
      ...formData,
      technologies: (formData.technologies || []).filter((_, i) => i !== index)
    });
  };

  const handleAddAction = () => {
    if (!actionInput.trim()) return;
    setFormData({
      ...formData,
      whatIDid: [...(formData.whatIDid || []), actionInput.trim()]
    });
    setActionInput('');
  };

  const handleRemoveAction = (index: number) => {
    setFormData({
      ...formData,
      whatIDid: (formData.whatIDid || []).filter((_, i) => i !== index)
    });
  };

  const handleAddSkill = () => {
    if (!skillInput.trim()) return;
    setFormData({
      ...formData,
      skillsDeveloped: [...(formData.skillsDeveloped || []), skillInput.trim()]
    });
    setSkillInput('');
  };

  const handleRemoveSkill = (index: number) => {
    setFormData({
      ...formData,
      skillsDeveloped: (formData.skillsDeveloped || []).filter((_, i) => i !== index)
    });
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setUploading(true);
      const url = await api.uploadImage(file);
      setFormData((prev) => ({ ...prev, image: url }));
      showToast('Image uploaded and set as thumbnail!', 'info');
    } catch (err: any) {
      showToast(err.message || 'Image upload failed', 'error');
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.desc) {
      showToast('Project title and summary description are required', 'error');
      return;
    }

    try {
      setSaving(true);
      if (isEditing && project) {
        await api.updateProject(project.id, formData);
        showToast(`Project "${formData.title}" updated successfully!`, 'success');
      } else {
        await api.createProject(formData);
        showToast(`New project "${formData.title}" created successfully!`, 'success');
      }
      await refreshData();
      onClose();
    } catch (err: any) {
      showToast(err.message || 'Failed to save project', 'error');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      <div className="fixed inset-0 bg-[#030712]/80 backdrop-blur-md" onClick={onClose} />

      <div className="relative w-full max-w-3xl my-8 bg-[#091126] border border-cyan-500/30 rounded-2xl shadow-2xl z-10 overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="p-5 border-b border-slate-800 flex items-center justify-between bg-[#060b1c]">
          <div>
            <h2 className="text-base sm:text-lg font-bold font-mono text-white">
              {isEditing ? `Edit: ${project.title}` : 'Create New Project Record'}
            </h2>
            <p className="text-xs text-slate-400 font-sans">
              Enter complete technical specifications, actions, and evidence.
            </p>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-lg text-slate-400 hover:text-white bg-slate-900 border border-slate-800">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6 overflow-y-auto text-xs font-mono">
          
          {/* Top Row: Title, Category, Status */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="sm:col-span-2 space-y-1.5">
              <label className="text-slate-300 font-semibold">Project Title *</label>
              <input
                type="text"
                required
                value={formData.title || ''}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="e.g. CyberShield - Wi-Fi Security Analyser"
                className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 focus:border-cyan-400 text-white outline-none"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-slate-300 font-semibold">Category *</label>
              <select
                value={formData.category || 'security'}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 focus:border-cyan-400 text-white outline-none"
              >
                <option value="security">Wireless & Cybersecurity</option>
                <option value="ai">AI & Systems</option>
                <option value="web">Web Architectures</option>
              </select>
            </div>
          </div>

          {/* Row 2: Badge, Tagline, Status */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="space-y-1.5">
              <label className="text-slate-300">Category Badge</label>
              <input
                type="text"
                value={formData.badge || ''}
                onChange={(e) => setFormData({ ...formData, badge: e.target.value })}
                placeholder="e.g. Flagship Cybersecurity"
                className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 focus:border-cyan-400 text-white outline-none"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-slate-300">Tagline</label>
              <input
                type="text"
                value={formData.tagline || ''}
                onChange={(e) => setFormData({ ...formData, tagline: e.target.value })}
                placeholder="e.g. Windows WLAN Security Engine"
                className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 focus:border-cyan-400 text-white outline-none"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-slate-300">Development Status</label>
              <select
                value={formData.status || 'Active'}
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 focus:border-cyan-400 text-white outline-none"
              >
                <option value="Active">Active</option>
                <option value="In Development">In Development</option>
                <option value="Research Phase">Research Phase</option>
              </select>
            </div>
          </div>

          {/* Thumbnail Image Picker & Upload */}
          <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-slate-300 font-semibold flex items-center gap-1.5">
                <ImageIcon className="w-4 h-4 text-cyan-400" />
                <span>Thumbnail Image</span>
              </label>

              <label className="cursor-pointer inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs bg-cyan-500/15 border border-cyan-500/30 text-cyan-300 hover:bg-cyan-500/25 transition-all">
                <Upload className="w-3.5 h-3.5" />
                <span>{uploading ? 'Uploading...' : 'Upload Image'}</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  disabled={uploading}
                  className="hidden"
                />
              </label>
            </div>

            <input
              type="text"
              value={formData.image || ''}
              onChange={(e) => setFormData({ ...formData, image: e.target.value })}
              placeholder="/assets/images/wifi-security.jpg"
              className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-white outline-none"
            />
          </div>

          {/* Summary Description */}
          <div className="space-y-1.5">
            <label className="text-slate-300 font-semibold">Summary Description (Portfolio Card) *</label>
            <textarea
              required
              rows={3}
              value={formData.desc || ''}
              onChange={(e) => setFormData({ ...formData, desc: e.target.value })}
              className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white outline-none resize-none"
            />
          </div>

          {/* 01. What was the project */}
          <div className="space-y-1.5">
            <label className="text-cyan-400 font-semibold">01. What was the project? (Detailed Overview)</label>
            <textarea
              rows={3}
              value={formData.whatWasIt || ''}
              onChange={(e) => setFormData({ ...formData, whatWasIt: e.target.value })}
              className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white outline-none resize-none"
            />
          </div>

          {/* 02. Why built & Objective */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-cyan-400 font-semibold">02a. Why did I build it?</label>
              <textarea
                rows={3}
                value={formData.whyBuilt || ''}
                onChange={(e) => setFormData({ ...formData, whyBuilt: e.target.value })}
                className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white outline-none resize-none"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-cyan-400 font-semibold">02b. Primary Objective</label>
              <textarea
                rows={3}
                value={formData.objective || ''}
                onChange={(e) => setFormData({ ...formData, objective: e.target.value })}
                className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white outline-none resize-none"
              />
            </div>
          </div>

          {/* 03. Implementation Actions List */}
          <div className="space-y-2">
            <label className="text-cyan-400 font-semibold">03. Implementation Actions (Evidence Bullets)</label>
            <div className="flex gap-2">
              <input
                type="text"
                value={actionInput}
                onChange={(e) => setActionInput(e.target.value)}
                placeholder="e.g. Engineered native Windows Netsh WLAN parser extracting BSSID..."
                className="flex-1 px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white outline-none"
              />
              <button
                type="button"
                onClick={handleAddAction}
                className="px-3.5 py-2 rounded-xl bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 hover:bg-cyan-500/30"
              >
                Add Action
              </button>
            </div>
            <div className="space-y-1 pt-1">
              {formData.whatIDid?.map((act, i) => (
                <div key={i} className="flex items-center justify-between p-2 rounded-lg bg-slate-950 border border-slate-850">
                  <span className="text-slate-300 truncate pr-2">{act}</span>
                  <button type="button" onClick={() => handleRemoveAction(i)} className="text-slate-500 hover:text-rose-400">
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* 04. Technologies Stack */}
          <div className="space-y-2">
            <label className="text-cyan-400 font-semibold">04. Technologies Used</label>
            <div className="flex gap-2">
              <input
                type="text"
                value={techInput}
                onChange={(e) => setTechInput(e.target.value)}
                placeholder="e.g. Python 3.11"
                className="flex-1 px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white outline-none"
              />
              <button
                type="button"
                onClick={handleAddTech}
                className="px-3.5 py-2 rounded-xl bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 hover:bg-cyan-500/30"
              >
                Add Tech
              </button>
            </div>
            <div className="flex flex-wrap gap-1.5 pt-1">
              {formData.technologies?.map((tech, i) => (
                <span key={i} className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-slate-900 border border-slate-700 text-cyan-300">
                  <span>{tech}</span>
                  <button type="button" onClick={() => handleRemoveTech(i)} className="text-slate-500 hover:text-rose-400">
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}
            </div>
          </div>

          {/* 05. Core Skills Developed */}
          <div className="space-y-2">
            <label className="text-cyan-400 font-semibold">05. Core Skills Developed</label>
            <div className="flex gap-2">
              <input
                type="text"
                value={skillInput}
                onChange={(e) => setSkillInput(e.target.value)}
                placeholder="e.g. Wireless Protocol Analysis"
                className="flex-1 px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white outline-none"
              />
              <button
                type="button"
                onClick={handleAddSkill}
                className="px-3.5 py-2 rounded-xl bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 hover:bg-cyan-500/30"
              >
                Add Skill
              </button>
            </div>
            <div className="flex flex-wrap gap-1.5 pt-1">
              {formData.skillsDeveloped?.map((skill, i) => (
                <span key={i} className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-slate-900 border border-slate-700 text-slate-300">
                  <span>{skill}</span>
                  <button type="button" onClick={() => handleRemoveSkill(i)} className="text-slate-500 hover:text-rose-400">
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}
            </div>
          </div>

          {/* 06. Outcome & Real-World Relevance */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-cyan-400 font-semibold">Outcome</label>
              <textarea
                rows={2}
                value={formData.outcome || ''}
                onChange={(e) => setFormData({ ...formData, outcome: e.target.value })}
                className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white outline-none resize-none"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-cyan-400 font-semibold">Real-World Relevance</label>
              <textarea
                rows={2}
                value={formData.realWorldRelevance || ''}
                onChange={(e) => setFormData({ ...formData, realWorldRelevance: e.target.value })}
                className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white outline-none resize-none"
              />
            </div>
          </div>

          {/* GitHub Repo URL */}
          <div className="space-y-1.5">
            <label className="text-slate-300">GitHub Repository URL</label>
            <input
              type="text"
              value={formData.repoUrl || ''}
              onChange={(e) => setFormData({ ...formData, repoUrl: e.target.value })}
              className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white outline-none"
            />
          </div>

          {/* Bottom Action */}
          <div className="pt-4 border-t border-slate-800 flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl text-slate-400 hover:text-white bg-slate-900 border border-slate-800"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 text-slate-950 hover:from-cyan-300 hover:to-blue-400 shadow-glow-cyan transition-all disabled:opacity-50"
            >
              <Save className="w-4 h-4" />
              <span>{saving ? 'Saving...' : isEditing ? 'Save Changes' : 'Create Project'}</span>
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};
