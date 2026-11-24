import React from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { Shield, Cpu, Activity, Award } from 'lucide-react';

export const StatsSection: React.FC = () => {
  const { portfolio } = usePortfolio();

  const stats = portfolio?.stats?.length
    ? portfolio.stats
    : [
        { label: 'Projects & Tools', value: '15+', change: '+3 this quarter' },
        { label: 'Threat Rules Analyzed', value: '500+', change: 'MITRE ATT&CK' },
        { label: 'CTF & Lab Hours', value: '1,200+', change: 'Continuous practice' },
        { label: 'Security Mindset', value: '100%', change: 'Zero-Trust' }
      ];

  const icons = [Shield, Cpu, Activity, Award];

  return (
    <section className="relative z-10 py-10 bg-[#070d1e]/60 border-y border-cyan-500/10 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((item, idx) => {
            const Icon = icons[idx % icons.length];
            return (
              <div
                key={item.label}
                className="flex items-center gap-4 p-4 rounded-xl bg-[#0b132b]/50 border border-slate-800/80 hover:border-cyan-500/30 transition-all hover:bg-[#0f1a38]/60 group"
              >
                <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 group-hover:scale-110 transition-transform">
                  <Icon className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-2xl sm:text-3xl font-extrabold font-mono text-white tracking-tight">
                    {item.value}
                  </div>
                  <div className="text-xs text-slate-400 font-sans">{item.label}</div>
                  {item.change && (
                    <div className="text-[10px] font-mono text-cyan-400/80 mt-0.5">
                      {item.change}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
