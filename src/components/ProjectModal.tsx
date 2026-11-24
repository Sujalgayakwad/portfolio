import React, { useEffect } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { X, Github, ExternalLink, ShieldAlert, CheckCircle2, Terminal } from 'lucide-react';

export const ProjectModal: React.FC = () => {
  const { activeProjectModal, setActiveProjectModal } = usePortfolio();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setActiveProjectModal(null);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [setActiveProjectModal]);

  if (!activeProjectModal) return null;

  const p = activeProjectModal;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-[#030712]/80 backdrop-blur-md transition-opacity"
        onClick={() => setActiveProjectModal(null)}
      />

      {/* Modal Dialog Container */}
      <div className="relative w-full max-w-3xl my-8 bg-[#091126] border border-cyan-500/30 rounded-2xl shadow-2xl shadow-cyan-500/10 z-10 overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Close Button */}
        <button
          onClick={() => setActiveProjectModal(null)}
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-slate-900/80 border border-slate-700 text-slate-300 hover:text-white hover:border-cyan-400 transition-all shadow-lg"
          aria-label="Close modal window"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Image Header */}
        <div className="relative aspect-[21/9] sm:aspect-[24/9] w-full overflow-hidden bg-slate-950 flex-shrink-0 border-b border-slate-800">
          <img
            src={p.image}
            alt={p.title}
            className="w-full h-full object-cover object-center"
            onError={(e) => {
              (e.target as HTMLImageElement).src = '/assets/images/wifi-security.jpg';
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#091126] via-[#091126]/40 to-transparent" />
          
          <div className="absolute bottom-4 left-6 right-16">
            {p.badge && (
              <span className="inline-block px-2.5 py-0.5 rounded text-[11px] font-mono bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 mb-1.5">
                {p.badge}
              </span>
            )}
            <h2 className="text-xl sm:text-2xl font-extrabold text-white font-sans drop-shadow-md">
              {p.title}
            </h2>
            {p.tagline && (
              <p className="text-xs sm:text-sm text-cyan-300 font-mono drop-shadow">
                {p.tagline}
              </p>
            )}
          </div>
        </div>

        {/* Modal Scrollable Content */}
        <div className="p-6 sm:p-8 space-y-6 overflow-y-auto text-sm text-slate-300 leading-relaxed font-sans">
          
          {/* 01. What was the project? */}
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs font-mono font-semibold text-cyan-400 uppercase tracking-wider">
              <Terminal className="w-4 h-4" />
              <span>01. What was the project?</span>
            </div>
            <p className="text-slate-300">{p.whatWasIt || p.desc}</p>
          </div>

          {/* 02. Why did I build it & Objective */}
          {(p.whyBuilt || p.objective) && (
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-xs font-mono font-semibold text-cyan-400 uppercase tracking-wider">
                <ShieldAlert className="w-4 h-4" />
                <span>02. Why did I build it & Objective</span>
              </div>
              {p.whyBuilt && <p className="text-slate-300 mb-1">{p.whyBuilt}</p>}
              {p.objective && (
                <p className="font-medium text-white bg-slate-900/60 p-3 rounded-lg border border-slate-800">
                  <span className="text-cyan-400 font-mono">Objective: </span>
                  {p.objective}
                </p>
              )}
            </div>
          )}

          {/* 03. Implementation Details */}
          {p.whatIDid && p.whatIDid.length > 0 && (
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-xs font-mono font-semibold text-cyan-400 uppercase tracking-wider">
                <CheckCircle2 className="w-4 h-4" />
                <span>03. Implementation Details (Technical Actions)</span>
              </div>
              <ul className="space-y-2">
                {p.whatIDid.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-2 flex-shrink-0" />
                    <span className="text-slate-200">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* 04. Tools & Technologies */}
          <div className="space-y-2">
            <div className="text-xs font-mono font-semibold text-cyan-400 uppercase tracking-wider">
              04. Tools & Technologies Employed
            </div>
            <div className="flex flex-wrap gap-2">
              {p.technologies?.map((tech) => (
                <span
                  key={tech}
                  className="px-2.5 py-1 rounded-md text-xs font-mono bg-cyan-500/10 text-cyan-300 border border-cyan-500/20"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* 05. Core Skills Developed */}
          {p.skillsDeveloped && p.skillsDeveloped.length > 0 && (
            <div className="space-y-2">
              <div className="text-xs font-mono font-semibold text-cyan-400 uppercase tracking-wider">
                05. Core Skills Developed
              </div>
              <div className="flex flex-wrap gap-2">
                {p.skillsDeveloped.map((skill) => (
                  <span
                    key={skill}
                    className="px-2.5 py-1 rounded-md text-xs font-mono bg-slate-800 text-slate-300 border border-slate-700"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* 06. Outcome & Real-World Relevance */}
          {(p.outcome || p.realWorldRelevance) && (
            <div className="space-y-2 bg-[#060c1d] p-4 rounded-xl border border-cyan-500/20">
              <div className="text-xs font-mono font-semibold text-cyan-400 uppercase tracking-wider">
                06. Outcome & Real-World Industry Relevance
              </div>
              {p.outcome && <p className="text-slate-300 text-xs sm:text-sm">{p.outcome}</p>}
              {p.realWorldRelevance && (
                <p className="text-emerald-400 text-xs sm:text-sm font-medium mt-1">
                  🛡️ {p.realWorldRelevance}
                </p>
              )}
            </div>
          )}

        </div>

        {/* Modal Bottom Action Bar */}
        <div className="p-4 sm:p-6 bg-[#060b1a] border-t border-slate-800 flex flex-wrap items-center justify-between gap-3">
          {p.repoUrl ? (
            <a
              href={p.repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-mono font-semibold bg-gradient-to-r from-cyan-400 to-blue-500 text-slate-950 hover:from-cyan-300 hover:to-blue-400 shadow-glow-cyan transition-all"
            >
              <Github className="w-4 h-4" />
              <span>GitHub Repository</span>
            </a>
          ) : (
            <div />
          )}

          <div className="flex items-center gap-2">
            <button
              onClick={() => alert(`Technical documentation and architecture write-up for ${p.title} is available in repository README.`)}
              className="px-3.5 py-2 rounded-lg text-xs font-mono text-slate-300 bg-slate-800 hover:bg-slate-700 border border-slate-700 transition-all"
            >
              📄 Technical Docs
            </button>
            <button
              onClick={() => alert(`Live interactive demo running locally in portfolio workspace.`)}
              className="px-3.5 py-2 rounded-lg text-xs font-mono text-cyan-300 bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/30 transition-all"
            >
              ⚡ Interactive Demo
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
