import React, { useState } from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { api } from '../../services/api';
import { Upload, Save, Plus, Trash2, CheckCircle2, User, Image as ImageIcon } from 'lucide-react';
import { PortfolioInfo } from '../../types';

export const HeroEditorTab: React.FC = () => {
  const { portfolio, refreshData, showToast } = usePortfolio();

  const [formData, setFormData] = useState<Partial<PortfolioInfo>>({
    greeting: portfolio?.greeting || '',
    name: portfolio?.name || '',
    title: portfolio?.title || '',
    titles: portfolio?.titles || [],
    tagline: portfolio?.tagline || '',
    shortBio: portfolio?.shortBio || '',
    aboutMe: portfolio?.aboutMe || '',
    avatarUrl: portfolio?.avatarUrl || '/assets/images/avatar.jpg',
    status: portfolio?.status || '',
    location: portfolio?.location || '',
    email: portfolio?.email || '',
    github: portfolio?.github || '',
    linkedin: portfolio?.linkedin || '',
    instagram: portfolio?.instagram || '',
  });

  const [newTitleInput, setNewTitleInput] = useState('');
  const [uploadingImage, setUploadingImage] = useState(false);
  const [saving, setSaving] = useState(false);

  const handleAddTitle = () => {
    if (!newTitleInput.trim()) return;
    const updated = [...(formData.titles || []), newTitleInput.trim()];
    setFormData({ ...formData, titles: updated });
    setNewTitleInput('');
  };

  const handleRemoveTitle = (idx: number) => {
    const updated = (formData.titles || []).filter((_, i) => i !== idx);
    setFormData({ ...formData, titles: updated });
  };

  const handleImageFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setUploadingImage(true);
      const url = await api.uploadImage(file);
      setFormData((prev) => ({ ...prev, avatarUrl: url }));
      showToast('Profile image uploaded! Click Save to apply changes.', 'info');
    } catch (err: any) {
      showToast(err.message || 'Image upload failed', 'error');
    } finally {
      setUploadingImage(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setSaving(true);
      await api.updatePortfolio(formData);
      await refreshData();
      showToast('Hero & Profile information saved successfully!', 'success');
    } catch (err: any) {
      showToast(err.message || 'Failed to update portfolio info', 'error');
    } finally {
      setSaving(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8 max-w-4xl">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold font-mono text-white flex items-center gap-2.5">
            <User className="w-5 h-5 text-cyan-400" />
            <span>Hero & Profile Management</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 font-sans mt-1">
            Update your hero greeting, identity text, live typewriter phrases, and upload a new profile portrait.
          </p>
        </div>

        <button
          type="submit"
          disabled={saving}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-mono font-bold bg-gradient-to-r from-cyan-400 to-blue-500 text-slate-950 hover:from-cyan-300 hover:to-blue-400 shadow-glow-cyan transition-all disabled:opacity-50"
        >
          {saving ? (
            <span className="flex items-center gap-2">
              <span className="w-4 h-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
              Saving...
            </span>
          ) : (
            <>
              <Save className="w-4 h-4" />
              <span>Save Changes</span>
            </>
          )}
        </button>
      </div>

      {/* Avatar Image Upload Card */}
      <div className="p-6 rounded-2xl bg-[#081024]/80 border border-slate-800 space-y-4">
        <h2 className="text-sm font-bold font-mono text-white flex items-center gap-2">
          <ImageIcon className="w-4 h-4 text-cyan-400" />
          <span>Profile Picture & Portrait Glow</span>
        </h2>

        <div className="flex flex-col sm:flex-row items-center gap-6">
          {/* Avatar Preview */}
          <div className="relative w-32 h-32 rounded-full overflow-hidden border-2 border-cyan-400 shadow-glow-cyan flex-shrink-0 bg-slate-950">
            <img
              src={formData.avatarUrl || '/assets/images/avatar.jpg'}
              alt="Avatar preview"
              className="w-full h-full object-cover object-center"
              onError={(e) => {
                (e.target as HTMLImageElement).src = '/assets/images/avatar.jpg';
              }}
            />
          </div>

          {/* Upload Controls */}
          <div className="space-y-3 flex-1 text-center sm:text-left">
            <div className="text-xs text-slate-300 font-sans">
              Current Path / URL: <span className="font-mono text-cyan-300 text-[11px] break-all">{formData.avatarUrl}</span>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <label className="cursor-pointer inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-mono font-semibold bg-cyan-500/15 border border-cyan-500/30 text-cyan-300 hover:bg-cyan-500/25 transition-all">
                <Upload className="w-4 h-4" />
                <span>{uploadingImage ? 'Uploading Image...' : 'Upload New Photo'}</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageFileChange}
                  disabled={uploadingImage}
                  className="hidden"
                />
              </label>

              <button
                type="button"
                onClick={() => setFormData({ ...formData, avatarUrl: '/assets/images/avatar.jpg' })}
                className="px-3 py-2 rounded-xl text-xs font-mono text-slate-400 hover:text-white bg-slate-900 border border-slate-800"
              >
                Reset to Default Portrait
              </button>
            </div>
            <p className="text-[11px] text-slate-500 font-mono">
              Accepts PNG, JPG, WEBP. Max size 10MB. Preserves original resolution and face.
            </p>
          </div>
        </div>
      </div>

      {/* Main Details Form */}
      <div className="p-6 rounded-2xl bg-[#081024]/80 border border-slate-800 space-y-5">
        <h2 className="text-sm font-bold font-mono text-white">Hero Identity & Greeting</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="text-xs font-mono text-slate-300">Terminal Greeting Badge</label>
            <input
              type="text"
              value={formData.greeting || ''}
              onChange={(e) => setFormData({ ...formData, greeting: e.target.value })}
              className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 focus:border-cyan-400 text-xs font-mono text-white outline-none"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-mono text-slate-300">Full Name</label>
            <input
              type="text"
              value={formData.name || ''}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 focus:border-cyan-400 text-xs font-mono text-white outline-none"
            />
          </div>
        </div>

        {/* Rotating Titles Manager */}
        <div className="space-y-2 pt-2">
          <label className="text-xs font-mono text-slate-300">
            Rotating Typewriter Phrases ({formData.titles?.length || 0})
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              value={newTitleInput}
              onChange={(e) => setNewTitleInput(e.target.value)}
              placeholder="e.g. Wi-Fi Security & Radio Spectrum Auditor"
              className="flex-1 px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 focus:border-cyan-400 text-xs font-mono text-white outline-none"
            />
            <button
              type="button"
              onClick={handleAddTitle}
              className="px-4 py-2 rounded-xl text-xs font-mono font-semibold bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 hover:bg-cyan-500/30 flex items-center gap-1.5"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Phrase</span>
            </button>
          </div>

          <div className="flex flex-wrap gap-2 pt-2">
            {formData.titles?.map((title, i) => (
              <span
                key={i}
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-mono bg-slate-900 border border-slate-700 text-slate-200"
              >
                <span>{title}</span>
                <button
                  type="button"
                  onClick={() => handleRemoveTitle(i)}
                  className="text-slate-400 hover:text-rose-400 p-0.5"
                >
                  <Trash2 className="w-3 h-3" />
                </button>
              </span>
            ))}
          </div>
        </div>

        {/* Tagline & Short Bio */}
        <div className="space-y-4 pt-2">
          <div className="space-y-1.5">
            <label className="text-xs font-mono text-slate-300">Tagline / Mission</label>
            <input
              type="text"
              value={formData.tagline || ''}
              onChange={(e) => setFormData({ ...formData, tagline: e.target.value })}
              className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 focus:border-cyan-400 text-xs font-mono text-white outline-none"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-mono text-slate-300">Hero Introduction (Short Bio)</label>
            <textarea
              rows={3}
              value={formData.shortBio || ''}
              onChange={(e) => setFormData({ ...formData, shortBio: e.target.value })}
              className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 focus:border-cyan-400 text-xs text-white outline-none resize-none"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-mono text-slate-300">About Me (Full Narrative)</label>
            <textarea
              rows={4}
              value={formData.aboutMe || ''}
              onChange={(e) => setFormData({ ...formData, aboutMe: e.target.value })}
              className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 focus:border-cyan-400 text-xs text-white outline-none resize-none"
            />
          </div>
        </div>

        {/* Meta & Verified Details */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
          <div className="space-y-1.5">
            <label className="text-xs font-mono text-slate-300">Availability Status</label>
            <input
              type="text"
              value={formData.status || ''}
              onChange={(e) => setFormData({ ...formData, status: e.target.value })}
              className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 focus:border-cyan-400 text-xs font-mono text-white outline-none"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-mono text-slate-300">Base Location</label>
            <input
              type="text"
              value={formData.location || ''}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 focus:border-cyan-400 text-xs font-mono text-white outline-none"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-mono text-slate-300">Contact Email</label>
            <input
              type="email"
              value={formData.email || ''}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 focus:border-cyan-400 text-xs font-mono text-white outline-none"
            />
          </div>
        </div>

        {/* Social URLs */}
        <div className="space-y-3 pt-2">
          <h3 className="text-xs font-mono uppercase text-slate-400">Social URLs</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="space-y-1">
              <label className="text-[11px] font-mono text-slate-400">GitHub URL</label>
              <input
                type="text"
                value={formData.github || ''}
                onChange={(e) => setFormData({ ...formData, github: e.target.value })}
                className="w-full px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-800 focus:border-cyan-400 text-xs font-mono text-white outline-none"
              />
            </div>
            <div className="space-y-1">
              <label className="text-[11px] font-mono text-slate-400">LinkedIn URL</label>
              <input
                type="text"
                value={formData.linkedin || ''}
                onChange={(e) => setFormData({ ...formData, linkedin: e.target.value })}
                className="w-full px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-800 focus:border-cyan-400 text-xs font-mono text-white outline-none"
              />
            </div>
            <div className="space-y-1">
              <label className="text-[11px] font-mono text-slate-400">Instagram URL</label>
              <input
                type="text"
                value={formData.instagram || ''}
                onChange={(e) => setFormData({ ...formData, instagram: e.target.value })}
                className="w-full px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-800 focus:border-cyan-400 text-xs font-mono text-white outline-none"
              />
            </div>
          </div>
        </div>

      </div>

      {/* Bottom Save Bar */}
      <div className="flex justify-end gap-3 pt-4">
        <button
          type="submit"
          disabled={saving}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-xs font-mono font-bold bg-gradient-to-r from-cyan-400 to-blue-500 text-slate-950 hover:from-cyan-300 hover:to-blue-400 shadow-glow-cyan transition-all disabled:opacity-50"
        >
          {saving ? 'Saving...' : 'Save Portfolio Profile'}
        </button>
      </div>

    </form>
  );
};
