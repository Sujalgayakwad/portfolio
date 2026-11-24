import React, { useState } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { Shield, Radio, KeyRound, ShieldAlert, Network, Code2, Layers, Database, Lock, Cpu, Terminal, Box, Target } from 'lucide-react';

export const SkillsSection: React.FC = () => {
  const { skills } = usePortfolio();

  // Group skills by category
  const categories = Array.from(new Set(skills.map((s) => s.category || 'General')));
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const filteredSkills = selectedCategory === 'All'
    ? skills
    : skills.filter((s) => s.category === selectedCategory);

  const iconMap: Record<string, any> = {
    Radio,
    KeyRound,
    ShieldAlert,
    Network,
    Code2,
    Layers,
    Database,
    Lock,
    Cpu,
    Terminal,
    Box,
    Target,
    Shield
  };

  return (
    <section id="skills" className="relative z-10 py-24 border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/25 text-cyan-400 text-xs font-mono">
            <span>Technical Capabilities</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white font-sans">
            Technical Stack & <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">Specializations</span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base">
            Verified competencies across offensive auditing, wireless security, defensive posture, and modern software engineering.
          </p>
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          <button
            onClick={() => setSelectedCategory('All')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-mono transition-all ${
              selectedCategory === 'All'
                ? 'bg-cyan-500 text-slate-950 font-bold shadow-glow-cyan'
                : 'bg-slate-900/80 border border-slate-800 text-slate-300 hover:border-slate-600'
            }`}
          >
            All Skills ({skills.length})
          </button>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-mono transition-all ${
                selectedCategory === cat
                  ? 'bg-cyan-500 text-slate-950 font-bold shadow-glow-cyan'
                  : 'bg-slate-900/80 border border-slate-800 text-slate-300 hover:border-slate-600'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Skills Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSkills.map((skill) => {
            const Icon = (skill.icon && iconMap[skill.icon]) || Shield;
            return (
              <div
                key={skill.id}
                className="p-5 rounded-xl bg-[#091126]/80 border border-slate-800 hover:border-cyan-500/40 hover:bg-[#0c1633] transition-all group"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 group-hover:scale-105 transition-transform">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold text-white group-hover:text-cyan-300 transition-colors font-sans">
                        {skill.name}
                      </h3>
                      <span className="text-[11px] font-mono text-slate-400">
                        {skill.category}
                      </span>
                    </div>
                  </div>
                  <span className="text-xs font-mono font-bold text-cyan-400">
                    {skill.level}%
                  </span>
                </div>

                {/* Animated Level Bar */}
                <div className="w-full bg-slate-950 h-2 rounded-full overflow-hidden border border-slate-800">
                  <div
                    className="h-full bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full transition-all duration-700 shadow-glow-cyan"
                    style={{ width: `${skill.level}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
