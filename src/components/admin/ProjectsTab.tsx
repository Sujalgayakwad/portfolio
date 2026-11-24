import React, { useState } from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { api } from '../../services/api';
import { Project } from '../../types';
import { Plus, Search, Edit2, Trash2, ExternalLink, Github, FolderGit2 } from 'lucide-react';

interface ProjectsTabProps {
  onEditProject: (project: Project) => void;
  onNewProject: () => void;
}

export const ProjectsTab: React.FC<ProjectsTabProps> = ({
  onEditProject,
  onNewProject
}) => {
  const { projects, refreshData, showToast } = usePortfolio();
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const filteredProjects = projects.filter((p) => {
    const matchesSearch =
      p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.desc.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.technologies?.some((t) => t.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCat = categoryFilter === 'all' || p.category === categoryFilter;
    return matchesSearch && matchesCat;
  });

  const handleDelete = async (id: string, title: string) => {
    if (!window.confirm(`Are you sure you want to permanently delete "${title}"?`)) {
      return;
    }

    try {
      setDeletingId(id);
      await api.deleteProject(id);
      await refreshData();
      showToast(`Project "${title}" deleted successfully`, 'info');
    } catch (err: any) {
      showToast(err.message || 'Failed to delete project', 'error');
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Top Header & New Button */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold font-mono text-white flex items-center gap-2.5">
            <FolderGit2 className="w-5 h-5 text-cyan-400" />
            <span>Projects Management ({projects.length})</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 font-sans mt-1">
            Create, edit, reorder, or delete technical project records and detailed evidence write-ups.
          </p>
        </div>

        <button
          onClick={onNewProject}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-mono font-bold bg-gradient-to-r from-cyan-400 to-blue-500 text-slate-950 hover:from-cyan-300 hover:to-blue-400 shadow-glow-cyan transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>Create New Project</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-xl bg-[#081024]/80 border border-slate-800">
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
          <input
            type="text"
            placeholder="Search projects by title, tech..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-lg bg-slate-950 border border-slate-800 focus:border-cyan-400 text-xs font-mono text-white placeholder-slate-500 outline-none"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0">
          {['all', 'security', 'ai', 'web'].map((cat) => (
            <button
              key={cat}
              onClick={() => setCategoryFilter(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono capitalize transition-all ${
                categoryFilter === cat
                  ? 'bg-cyan-500 text-slate-950 font-bold'
                  : 'bg-slate-900 text-slate-400 hover:text-white'
              }`}
            >
              {cat === 'all' ? 'All' : cat}
            </button>
          ))}
        </div>
      </div>

      {/* Projects List / Table */}
      {filteredProjects.length === 0 ? (
        <div className="text-center py-16 bg-[#081024]/50 rounded-2xl border border-dashed border-slate-800 space-y-3">
          <FolderGit2 className="w-10 h-10 text-slate-600 mx-auto" />
          <div className="text-sm font-mono text-slate-400">No projects found matching criteria</div>
          <button
            onClick={onNewProject}
            className="text-xs font-mono text-cyan-400 hover:text-cyan-300 underline"
          >
            Create your first project now
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="p-5 rounded-2xl bg-[#081024]/90 border border-slate-800 hover:border-cyan-500/30 transition-all flex flex-col md:flex-row items-start md:items-center justify-between gap-5 group"
            >
              {/* Left: Thumbnail & Details */}
              <div className="flex items-start sm:items-center gap-4">
                <div className="relative w-24 h-16 rounded-xl overflow-hidden bg-slate-950 border border-slate-700 flex-shrink-0">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover object-center"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = '/assets/images/wifi-security.jpg';
                    }}
                  />
                  {project.status && (
                    <div className="absolute bottom-1 right-1 px-1 rounded text-[8px] font-mono bg-slate-900/90 text-cyan-300">
                      {project.status}
                    </div>
                  )}
                </div>

                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm sm:text-base font-bold text-white group-hover:text-cyan-300 transition-colors font-sans">
                      {project.title}
                    </h3>
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-cyan-500/10 text-cyan-300 border border-cyan-500/20">
                      {project.category}
                    </span>
                  </div>

                  <p className="text-xs text-slate-400 line-clamp-1 max-w-xl font-sans">
                    {project.desc}
                  </p>

                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {project.technologies?.slice(0, 4).map((tech) => (
                      <span key={tech} className="px-1.5 py-0.5 rounded text-[10px] font-mono bg-slate-900 text-slate-400 border border-slate-800">
                        {tech}
                      </span>
                    ))}
                    {project.technologies?.length > 4 && (
                      <span className="text-[10px] font-mono text-slate-500">
                        +{project.technologies.length - 4} more
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Right: Actions */}
              <div className="flex items-center gap-2 w-full md:w-auto justify-end border-t md:border-t-0 pt-3 md:pt-0 border-slate-800">
                {project.repoUrl && (
                  <a
                    href={project.repoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:border-slate-600 transition-all"
                    title="View GitHub Repository"
                  >
                    <Github className="w-4 h-4" />
                  </a>
                )}

                <button
                  onClick={() => onEditProject(project)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-medium bg-cyan-500/10 text-cyan-300 border border-cyan-500/30 hover:bg-cyan-500 hover:text-slate-950 transition-all"
                >
                  <Edit2 className="w-3.5 h-3.5" />
                  <span>Edit</span>
                </button>

                <button
                  onClick={() => handleDelete(project.id, project.title)}
                  disabled={deletingId === project.id}
                  className="p-2 rounded-lg bg-rose-500/10 border border-rose-500/20 text-rose-400 hover:bg-rose-500 hover:text-white transition-all disabled:opacity-50"
                  title="Delete Project"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

    </div>
  );
};
