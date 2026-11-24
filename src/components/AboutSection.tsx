import React from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { Radio, Lock, Layers, FlaskConical, ExternalLink, Github, Linkedin, Instagram } from 'lucide-react';

export const AboutSection: React.FC = () => {
  const { portfolio } = usePortfolio();

  const defaultPillars = [
    {
      icon: '🛰️',
      title: 'RF & Wireless Auditing',
      desc: 'Passive 802.11 netsh hooks, spectrum overlap detection, and rogue AP heuristics.'
    },
    {
      icon: '🔐',
      title: 'Applied Cryptography',
      desc: 'Shannon entropy evaluation, pre-shared key resistance, and cipher downgrade defense.'
    },
    {
      icon: '🧱',
      title: 'Secure Full-Stack Dev',
      desc: 'Defending against OWASP Top 10 vulnerabilities, strict RBAC, and input sanitization.'
    },
    {
      icon: '🧪',
      title: 'Adversary Emulation',
      desc: 'Hands-on CTF exploration, lateral movement analysis, and defensive blue-team hardening.'
    }
  ];

  const pillars = portfolio?.aboutPillars?.length ? portfolio.aboutPillars : defaultPillars;

  return (
    <section id="about" className="relative z-10 py-24 border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/25 text-cyan-400 text-xs font-mono">
            <span>Personal Introduction</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white font-sans">
            Beyond the CV: <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">Who I Am & What Drives Me</span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base">
            A look into my cybersecurity interests, engineering approach, and active technical exploration.
          </p>
        </div>

        {/* 2-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left Column: Narrative & Pillars (7 Cols) */}
          <div className="lg:col-span-7 space-y-6">
            <div className="prose prose-invert max-w-none text-slate-300 space-y-4 text-sm sm:text-base leading-relaxed">
              <p>
                {portfolio?.aboutMe ||
                  'I am a security-focused technologist with a deep curiosity for understanding how protocols break and how defensive architectures withstand modern adversaries. Rather than viewing security as an afterthought, I approach engineering with a security-first, zero-trust mindset.'}
              </p>
              <p>
                My core technical focus centers on <strong>wireless radio frequency auditing, rogue access point heuristics, and password entropy thermodynamics</strong>. I enjoy dissecting 802.11 spectrum traffic, exploring WPA2 vs WPA3-SAE, and engineering native operating system utilities that transform passive reconnaissance into automated threat indices.
              </p>
            </div>

            {/* 4 Pillars Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
              {pillars.map((pillar) => (
                <div
                  key={pillar.title}
                  className="p-4 rounded-xl bg-[#0b1329]/70 border border-slate-800 hover:border-cyan-500/40 hover:bg-[#0e1936]/80 transition-all group"
                >
                  <div className="text-2xl mb-2 group-hover:scale-110 transition-transform inline-block">
                    {pillar.icon}
                  </div>
                  <h3 className="text-sm font-semibold text-white font-sans mb-1 group-hover:text-cyan-300">
                    {pillar.title}
                  </h3>
                  <p className="text-xs text-slate-400 leading-relaxed font-sans">
                    {pillar.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Verified Identity & Profile Card (5 Cols) */}
          <div className="lg:col-span-5 p-6 rounded-2xl bg-[#081024]/80 border border-cyan-500/20 shadow-xl space-y-6 backdrop-blur-md">
            
            <div className="space-y-4 divide-y divide-slate-800/80">
              <div className="flex justify-between items-center text-xs font-mono pt-1">
                <span className="text-slate-400">Name</span>
                <span className="text-white font-semibold">{portfolio?.name || 'Sujal Gayakwad'}</span>
              </div>
              <div className="flex justify-between items-center text-xs font-mono pt-3">
                <span className="text-slate-400">Specialization</span>
                <span className="text-cyan-400">Cybersecurity & Wireless Systems</span>
              </div>
              <div className="flex justify-between items-center text-xs font-mono pt-3">
                <span className="text-slate-400">Core Languages</span>
                <span className="text-slate-200">Python, JavaScript, SQL, Bash</span>
              </div>
              <div className="flex justify-between items-center text-xs font-mono pt-3">
                <span className="text-slate-400">Base Location</span>
                <span className="text-slate-200">{portfolio?.location || 'India (Open to Global Remote)'}</span>
              </div>
              <div className="flex justify-between items-center text-xs font-mono pt-3">
                <span className="text-slate-400">Availability</span>
                <span className="text-emerald-400 flex items-center gap-1.5 font-medium">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                  {portfolio?.status || 'Open for Roles & Security Audits'}
                </span>
              </div>
            </div>

            <div className="pt-2 border-t border-slate-800">
              <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-3">
                Verified Communication & Profiles
              </h4>
              <div className="space-y-2.5">
                {portfolio?.linkedin && (
                  <a
                    href={portfolio.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-3 rounded-xl bg-slate-900/60 border border-slate-800 hover:border-cyan-500/40 hover:bg-[#0b1736] text-slate-200 transition-all group"
                  >
                    <div className="flex items-center gap-3">
                      <Linkedin className="w-5 h-5 text-cyan-400" />
                      <div>
                        <div className="text-xs font-semibold text-white group-hover:text-cyan-300">LinkedIn</div>
                        <div className="text-[11px] text-slate-400">Professional Identity & Endorsements</div>
                      </div>
                    </div>
                    <ExternalLink className="w-4 h-4 text-slate-500 group-hover:text-cyan-400" />
                  </a>
                )}

                {portfolio?.github && (
                  <a
                    href={portfolio.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-3 rounded-xl bg-slate-900/60 border border-slate-800 hover:border-cyan-500/40 hover:bg-[#0b1736] text-slate-200 transition-all group"
                  >
                    <div className="flex items-center gap-3">
                      <Github className="w-5 h-5 text-slate-300" />
                      <div>
                        <div className="text-xs font-semibold text-white group-hover:text-cyan-300">GitHub</div>
                        <div className="text-[11px] text-slate-400">Source Code & Security Tools</div>
                      </div>
                    </div>
                    <ExternalLink className="w-4 h-4 text-slate-500 group-hover:text-cyan-400" />
                  </a>
                )}

                {portfolio?.instagram && (
                  <a
                    href={portfolio.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-3 rounded-xl bg-slate-900/60 border border-slate-800 hover:border-cyan-500/40 hover:bg-[#0b1736] text-slate-200 transition-all group"
                  >
                    <div className="flex items-center gap-3">
                      <Instagram className="w-5 h-5 text-pink-400" />
                      <div>
                        <div className="text-xs font-semibold text-white group-hover:text-cyan-300">Instagram</div>
                        <div className="text-[11px] text-slate-400">Personal Updates & Community</div>
                      </div>
                    </div>
                    <ExternalLink className="w-4 h-4 text-slate-500 group-hover:text-cyan-400" />
                  </a>
                )}
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
