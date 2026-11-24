import React from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { Radio, ShieldCheck, Layers, Terminal, Shield } from 'lucide-react';

export const ServicesSection: React.FC = () => {
  const { services } = usePortfolio();

  const iconMap: Record<string, any> = {
    Radio,
    ShieldCheck,
    Layers,
    Terminal,
    Shield
  };

  return (
    <section id="services" className="relative z-10 py-24 border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/25 text-cyan-400 text-xs font-mono">
            <span>Engineering Offerings</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white font-sans">
            Services & <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">Professional Focus</span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base">
            High-impact technical deliverables across wireless airspace auditing, cryptography validation, and resilient systems.
          </p>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {services.map((service, idx) => {
            const Icon = (service.icon && iconMap[service.icon]) || ShieldCheck;
            return (
              <div
                key={service.id || idx}
                className="p-8 rounded-2xl bg-[#091126]/70 border border-slate-800/80 hover:border-cyan-500/40 hover:bg-[#0c1633] transition-all group relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/5 rounded-full blur-2xl group-hover:bg-cyan-500/10 transition-colors pointer-events-none" />
                
                <div className="w-14 h-14 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 mb-6 group-hover:scale-110 group-hover:shadow-glow-cyan transition-all">
                  <Icon className="w-7 h-7" />
                </div>

                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-cyan-300 transition-colors font-sans">
                  {service.title}
                </h3>

                <p className="text-slate-400 text-sm leading-relaxed font-sans">
                  {service.description}
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
