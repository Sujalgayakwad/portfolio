import React, { useState } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { ExternalLink, Github, Eye, Sparkles } from 'lucide-react';
import { Project } from '../types';

export const ProjectsSection: React.FC = () => {
  const { projects, setActiveProjectModal } = usePortfolio();
  const [filter, setFilter] = useState<'all' | 'security' | 'ai' | 'web'>('all');

  const filteredProjects = projects.filter((p) => {
    if (filter === 'all') return true;
    return p.category?.toLowerCase() === filter.toLowerCase();
  });

  const categories = [
    { label: `All Projects (${projects.length})`, key: 'all' },
    { label: 'Wireless & Cybersecurity', key: 'security' },
    { label: 'AI & Systems', key: 'ai' },
    { label: 'Web Architectures', key: 'web' },
  ];

  return (
    <section id="projects" className="relative z-10 py-24 border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/25 text-cyan-400 text-xs font-mono">
            <span>Core Evidence Portfolio</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white font-sans">
            Technical Projects & <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">Engineering Evidence</span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base">
            Click any project card to inspect full technical objectives, implementation actions, skills acquired, and real-world relevance.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {categories.map((c) => (
            <button
              key={c.key}
              onClick={() => setFilter(c.key as any)}
              className={`px-4 py-2 rounded-xl text-xs font-mono font-medium transition-all ${
                filter === c.key
                  ? 'bg-gradient-to-r from-cyan-400 to-blue-500 text-slate-950 font-semibold shadow-glow-cyan'
                  : 'bg-[#0b132b]/80 border border-slate-800 text-slate-300 hover:border-cyan-500/30 hover:text-white'
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project: Project) => (
            <article
              key={project.id}
              className="flex flex-col rounded-2xl bg-[#091126]/80 border border-slate-800/90 hover:border-cyan-500/40 hover:bg-[#0c1633]/90 transition-all duration-300 shadow-lg hover:shadow-2xl hover:shadow-cyan-500/10 overflow-hidden group"
            >
              {/* Thumbnail Container */}
              <div className="relative aspect-[16/10] overflow-hidden bg-slate-950 border-b border-slate-800/80">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = '/assets/images/wifi-security.jpg';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#091126] via-transparent to-transparent opacity-60" />
                
                {/* Category Badge */}
                {project.badge && (
                  <div className="absolute top-3 left-3 bg-[#030712]/80 backdrop-blur-md border border-cyan-500/30 px-2.5 py-1 rounded-md text-[10px] font-mono text-cyan-300">
                    {project.badge}
                  </div>
                )}

                {/* Status Indicator */}
                {project.status && (
                  <div className="absolute top-3 right-3 bg-slate-900/80 backdrop-blur-md border border-slate-700 px-2 py-0.5 rounded text-[10px] font-mono text-slate-300">
                    {project.status}
                  </div>
                )}
              </div>

              {/* Card Body */}
              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2.5">
                  <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-cyan-300 transition-colors line-clamp-1 font-sans">
                    {project.title}
                  </h3>
                  <p className="text-xs text-slate-400 line-clamp-3 leading-relaxed font-sans">
                    {project.desc}
                  </p>
                </div>

                {/* Technologies Stack Tags */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {project.technologies?.slice(0, 5).map((tech, i) => (
                    <span
                      key={tech}
                      className={`px-2 py-0.5 rounded text-[10px] font-mono border ${
                        i === 0
                          ? 'bg-cyan-500/10 text-cyan-300 border-cyan-500/30'
                          : 'bg-slate-800/60 text-slate-300 border-slate-700/60'
                      }`}
                    >
                      {tech}
                    </span>
                  ))}
                  {project.technologies?.length > 5 && (
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-slate-800/40 text-slate-400">
                      +{project.technologies.length - 5}
                    </span>
                  )}
                </div>

                {/* Card Action Buttons */}
                <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between gap-2">
                  <button
                    onClick={() => setActiveProjectModal(project)}
                    className="flex-1 inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg text-xs font-mono font-semibold bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 hover:bg-cyan-500 hover:text-slate-950 transition-all shadow-sm group/btn"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>Evidence & Details</span>
                  </button>

                  {project.repoUrl && (
                    <a
                      href={project.repoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-lg bg-slate-800/60 border border-slate-700 text-slate-300 hover:text-white hover:border-slate-500 transition-all"
                      title="View GitHub Repository"
                    >
                      <Github className="w-4 h-4" />
                    </a>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>

      </div>
    </section>
  );
};
