import React, { useState, useEffect } from 'react';
import { Shield, Menu, X, Lock, ExternalLink } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';
import { useAuth } from '../context/AuthContext';

export const Navbar: React.FC = () => {
  const { portfolio, setIsAdminOpen } = usePortfolio();
  const { isAuthenticated } = useAuth();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Home', href: '#home' },
    { label: 'About', href: '#about' },
    { label: 'Projects', href: '#projects' },
    { label: 'Skills', href: '#skills' },
    { label: 'Services', href: '#services' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled
          ? 'bg-[#030712]/80 backdrop-blur-md border-b border-cyan-500/15 py-3 shadow-lg shadow-black/40'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo with Secret Triple-Click Admin Trigger */}
        <div
          onClick={() => {
            const now = Date.now();
            const last = (window as any).__lastLogoClick || 0;
            const count = ((window as any).__logoClicks || 0) + 1;
            (window as any).__lastLogoClick = now;
            (window as any).__logoClicks = count;

            if (now - last > 1200) {
              (window as any).__logoClicks = 1;
            } else if (count >= 3) {
              (window as any).__logoClicks = 0;
              setIsAdminOpen(true);
            }
          }}
          className="flex items-center gap-2.5 group cursor-pointer"
        >
          <a href="#home" className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center text-slate-950 shadow-glow-cyan transition-transform group-hover:scale-105">
              <Shield className="w-5 h-5 fill-slate-950 stroke-slate-950" />
            </div>
            <div className="flex flex-col">
              <span className="font-mono font-bold tracking-tight text-lg text-white">
                Cyber<span className="text-cyan-400">.Sujal</span>
              </span>
              <span className="text-[10px] font-mono tracking-widest text-slate-400 uppercase -mt-1">
                Security Hub
              </span>
            </div>
          </a>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-1 bg-[#0b1329]/70 border border-slate-800/80 rounded-full px-4 py-1.5 backdrop-blur-md shadow-inner">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="px-3.5 py-1.5 text-xs font-mono font-medium text-slate-300 hover:text-cyan-300 hover:bg-cyan-500/10 rounded-full transition-all"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Action Controls */}
        <div className="flex items-center gap-2.5">
          {/* Contact CTA */}
          <a
            href="#contact"
            className="flex items-center gap-1.5 px-4 py-1.5 rounded-lg text-xs font-mono font-semibold bg-gradient-to-r from-cyan-400 to-blue-500 text-slate-950 hover:from-cyan-300 hover:to-blue-400 shadow-glow-cyan transition-all transform hover:-translate-y-0.5"
          >
            <span>Get In Touch</span>
          </a>

          {/* Mobile Hamburger Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-slate-400 hover:text-white rounded-lg bg-slate-900/70 border border-slate-800"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#070d1e]/95 backdrop-blur-xl border-b border-cyan-500/20 px-6 py-5 mt-2 space-y-3">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block text-sm font-mono text-slate-300 hover:text-cyan-400 py-1"
            >
              {link.label}
            </a>
          ))}
          <div className="pt-3 border-t border-slate-800 flex flex-col gap-2">
            <a
              href="#contact"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full text-center py-2 text-xs font-mono font-bold rounded-lg bg-gradient-to-r from-cyan-400 to-blue-500 text-slate-950"
            >
              Get In Touch
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
