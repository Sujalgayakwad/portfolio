import React, { useState, useEffect } from 'react';
import { ArrowRight, Send, Github, Linkedin, Instagram, ShieldCheck, Terminal } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';

export const Hero: React.FC = () => {
  const { portfolio } = usePortfolio();

  const titles = portfolio?.titles?.length
    ? portfolio.titles
    : [
        'Cybersecurity Analyst & Threat Hunter',
        'Wi-Fi Security & Radio Spectrum Auditor',
        'Full-Stack Developer & Secure Architect',
        'Defensive Tooling & Python Automation'
      ];

  const [currentTitleIdx, setCurrentTitleIdx] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    const fullText = titles[currentTitleIdx] || '';

    if (!isDeleting) {
      if (displayedText.length < fullText.length) {
        timer = setTimeout(() => {
          setDisplayedText(fullText.substring(0, displayedText.length + 1));
        }, 65);
      } else {
        timer = setTimeout(() => setIsDeleting(true), 2400);
      }
    } else {
      if (displayedText.length > 0) {
        timer = setTimeout(() => {
          setDisplayedText(fullText.substring(0, displayedText.length - 1));
        }, 35);
      } else {
        setIsDeleting(false);
        setCurrentTitleIdx((prev) => (prev + 1) % titles.length);
      }
    }

    return () => clearTimeout(timer);
  }, [displayedText, isDeleting, currentTitleIdx, titles]);

  const avatarSrc = portfolio?.avatarUrl || '/assets/images/avatar.jpg';

  return (
    <section id="home" className="relative min-h-[92vh] flex items-center justify-center pt-28 pb-16 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Text & Content (7 Cols) */}
          <div className="lg:col-span-7 flex flex-col items-start space-y-6 text-left">
            
            {/* Terminal Status Badge */}
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-[#0a1226]/80 border border-cyan-500/30 text-cyan-400 text-xs font-mono shadow-sm shadow-cyan-500/10">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
              </span>
              <span>{portfolio?.greeting || 'system_status: operational • sec_ops'}</span>
            </div>

            {/* Hero Main Name */}
            <div className="space-y-1">
              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-[1.08]">
                {portfolio?.name?.split(' ')[0] || 'Sujal'}{' '}
                <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-400 bg-clip-text text-transparent drop-shadow-sm">
                  {portfolio?.name?.split(' ').slice(1).join(' ') || 'Gayakwad'}
                </span>
              </h1>
            </div>

            {/* Dynamic Rotating Terminal Title Box */}
            <div className="w-full max-w-xl flex items-center gap-2.5 px-4 py-2.5 rounded-lg bg-[#070e24]/90 border border-cyan-500/20 border-l-4 border-l-cyan-400 font-mono text-sm sm:text-base text-cyan-300 shadow-inner">
              <Terminal className="w-4 h-4 text-cyan-400 flex-shrink-0" />
              <span className="truncate">
                {displayedText}
                <span className="inline-block w-2 h-4 bg-cyan-400 ml-1 animate-pulse" />
              </span>
            </div>

            {/* Short Bio */}
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-2xl font-sans">
              {portfolio?.shortBio ||
                'A personal cybersecurity project hub demonstrating hands-on technical evidence. Specializing in wireless threat posture auditing, automated reconnaissance tooling, defensive network security, and secure software engineering.'}
            </p>

            {/* CTA Button Group */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <a
                href="#projects"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-mono text-xs sm:text-sm font-semibold bg-gradient-to-r from-cyan-400 to-blue-500 text-slate-950 hover:from-cyan-300 hover:to-blue-400 shadow-glow-cyan transition-all transform hover:-translate-y-0.5"
              >
                <span>Explore Projects & Evidence</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <a
                href="#contact"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-mono text-xs sm:text-sm font-medium bg-slate-900/80 hover:bg-slate-800 text-slate-200 hover:text-cyan-300 border border-slate-700/80 hover:border-cyan-500/40 backdrop-blur-md transition-all"
              >
                <span>Initiate Transmission</span>
                <Send className="w-4 h-4 text-cyan-400" />
              </a>
            </div>

            {/* Social Links */}
            <div className="pt-2 flex items-center gap-3">
              {portfolio?.github && (
                <a
                  href={portfolio.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-mono text-slate-300 bg-slate-900/60 border border-slate-800 hover:border-cyan-500/40 hover:text-cyan-300 transition-all"
                >
                  <Github className="w-4 h-4" />
                  <span>GitHub</span>
                </a>
              )}
              {portfolio?.linkedin && (
                <a
                  href={portfolio.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-mono text-slate-300 bg-slate-900/60 border border-slate-800 hover:border-cyan-500/40 hover:text-cyan-300 transition-all"
                >
                  <Linkedin className="w-4 h-4 text-cyan-400" />
                  <span>LinkedIn</span>
                </a>
              )}
              {portfolio?.instagram && (
                <a
                  href={portfolio.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-mono text-slate-300 bg-slate-900/60 border border-slate-800 hover:border-cyan-500/40 hover:text-cyan-300 transition-all"
                >
                  <Instagram className="w-4 h-4 text-pink-400" />
                  <span>Instagram</span>
                </a>
              )}
            </div>

          </div>

          {/* Right Column: Circular Portrait with Electric Glowing Aura (5 Cols) */}
          <div className="lg:col-span-5 flex justify-center items-center">
            <div className="relative group">
              
              {/* Outer Glowing Neon Aura Rings */}
              <div className="absolute -inset-4 rounded-full bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-600 opacity-60 blur-xl group-hover:opacity-85 transition-opacity duration-500 animate-pulse-slow" />
              
              {/* Cyber Ring Border Overlay */}
              <div className="absolute -inset-1 rounded-full bg-gradient-to-tr from-cyan-400 via-sky-300 to-blue-500 p-[3px] shadow-glow-cyan">
                <div className="w-full h-full rounded-full bg-[#030712]" />
              </div>

              {/* Verified Badge Icon */}
              <div className="absolute -bottom-2 -right-2 z-20 bg-gradient-to-br from-cyan-400 to-blue-600 p-2.5 rounded-full shadow-lg shadow-cyan-500/30 border-2 border-[#030712] flex items-center justify-center">
                <ShieldCheck className="w-5 h-5 text-slate-950" />
              </div>

              {/* Portrait Container - Circular preserving original face */}
              <div className="relative w-64 h-64 sm:w-80 sm:h-80 md:w-92 md:h-92 rounded-full overflow-hidden border-4 border-slate-900 shadow-2xl z-10 bg-slate-950">
                <img
                  src={avatarSrc}
                  alt={portfolio?.name || 'Sujal Gayakwad Portrait'}
                  className="w-full h-full object-cover object-center filter contrast-105 transition-transform duration-700 group-hover:scale-105"
                  onError={(e) => {
                    // Fallback to local avatar if image load fails
                    (e.target as HTMLImageElement).src = '/assets/images/avatar.jpg';
                  }}
                />
              </div>

              {/* Floating Status Pill */}
              <div className="absolute -top-3 -left-4 z-20 bg-[#070e24]/90 border border-cyan-500/30 backdrop-blur-md px-3.5 py-1.5 rounded-full shadow-lg shadow-black/50 text-[11px] font-mono text-cyan-300 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
                <span>Zero-Trust Mindset</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
