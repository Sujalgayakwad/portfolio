import React, { useState, useEffect } from 'react';
import { Shield, ArrowUp, Github, Linkedin, Instagram } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';

export const Footer: React.FC = () => {
  const { portfolio, setIsAdminOpen } = usePortfolio();
  const [showTopBtn, setShowTopBtn] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowTopBtn(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative z-10 bg-[#02050e] border-t border-slate-800/80 py-12 text-slate-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-slate-800/60">
          {/* Logo & Tagline */}
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center text-slate-950 shadow-glow-cyan">
              <Shield className="w-5 h-5 fill-slate-950 stroke-slate-950" />
            </div>
            <div>
              <span className="font-mono font-bold text-white text-base">
                {portfolio?.name || 'Sujal Gayakwad'}
              </span>
              <span className="block text-[11px] font-mono text-cyan-400">
                {portfolio?.tagline || 'Security • Engineering • Research • Innovation'}
              </span>
            </div>
          </div>

          {/* Quick Nav Links */}
          <div className="flex flex-wrap items-center gap-6 text-xs font-mono">
            <a href="#home" className="hover:text-cyan-300 transition-colors">Home</a>
            <a href="#about" className="hover:text-cyan-300 transition-colors">About</a>
            <a href="#projects" className="hover:text-cyan-300 transition-colors">Projects</a>
            <a href="#skills" className="hover:text-cyan-300 transition-colors">Skills</a>
            <a href="#services" className="hover:text-cyan-300 transition-colors">Services</a>
            <a href="#contact" className="hover:text-cyan-300 transition-colors">Contact</a>
          </div>
        </div>

        {/* Bottom Credits & Copyright */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 text-xs font-mono">
          <p className="text-slate-500 text-center sm:text-left">
            &copy; {new Date().getFullYear()} {portfolio?.name || 'Sujal Gayakwad'}. Engineered with React, Node.js & Custom CMS.
          </p>

          <div className="flex items-center gap-4 text-slate-400">
            {portfolio?.github && (
              <a href={portfolio.github} target="_blank" rel="noopener noreferrer" className="hover:text-cyan-400 transition-colors" title="GitHub">
                <Github className="w-4 h-4" />
              </a>
            )}
            {portfolio?.linkedin && (
              <a href={portfolio.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-cyan-400 transition-colors" title="LinkedIn">
                <Linkedin className="w-4 h-4" />
              </a>
            )}
            {portfolio?.instagram && (
              <a href={portfolio.instagram} target="_blank" rel="noopener noreferrer" className="hover:text-cyan-400 transition-colors" title="Instagram">
                <Instagram className="w-4 h-4" />
              </a>
            )}
          </div>
        </div>

      </div>

      {/* Floating Back to Top Button */}
      {showTopBtn && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 z-40 p-3 rounded-full bg-slate-900/90 border border-cyan-500/40 text-cyan-300 hover:bg-cyan-500 hover:text-slate-950 shadow-glow-cyan transition-all transform hover:-translate-y-1"
          aria-label="Back to top"
        >
          <ArrowUp className="w-4 h-4" />
        </button>
      )}
    </footer>
  );
};
