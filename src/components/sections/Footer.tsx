'use client';

import Card from '@/components/ui/Card';
import { useEffect, useState } from 'react';
import { LayoutGrid, Briefcase, DollarSign, Mail, MapPin, Zap } from 'lucide-react';

export default function Footer() {
  const [time, setTime] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(new Intl.DateTimeFormat('en-US', {
        timeZone: 'Asia/Kolkata',
        hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false
      }).format(now));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const links = [
    { name: 'WORKS', href: '/#works', icon: LayoutGrid },
    { name: 'SERVICES', href: '/#services', icon: Briefcase },
    { name: 'PRICING', href: '/pricing', icon: DollarSign },
    { name: 'CONTACT', href: '/contact', icon: Mail },
  ];

  return (
    <footer id="contact" className="py-32 px-6 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Column 1: Core Brand */}
        <Card className="p-10 flex flex-col justify-between min-h-[350px]">
          <div className="flex flex-col gap-6">
            <span className="text-[12px] font-black tracking-[0.3em] text-white">CYKEEK</span>
            <p className="text-muted text-base leading-relaxed max-w-xs">
              Designing digital excellence. Focused on high-fidelity products at the intersection of aesthetics and engineering.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <span className="text-[10px] font-medium tracking-widest text-muted uppercase">Core Active</span>
          </div>
        </Card>

        {/* Column 2: System Navigation */}
        <Card className="p-10 flex flex-col gap-8 min-h-[350px]">
          <span className="text-[10px] font-medium tracking-widest text-muted uppercase opacity-50">Sitemap</span>
          <nav className="flex flex-col gap-4">
            {links.map((link) => (
              <a 
                key={link.name}
                href={link.href}
                className="flex items-center gap-3 group text-muted hover:text-white transition-colors"
              >
                <link.icon className="w-4 h-4 opacity-50 group-hover:opacity-100" strokeWidth={1.5} />
                <span className="text-[13px] font-bold tracking-widest">{link.name}</span>
              </a>
            ))}
          </nav>
        </Card>

        {/* Column 3: Live Readout */}
        <Card className="p-10 flex flex-col justify-between min-h-[350px]">
          <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-1">
              <span className="text-[10px] font-medium tracking-widest text-muted uppercase flex items-center gap-2">
                <MapPin className="w-3 h-3" /> Location
              </span>
              <span className="text-[12px] font-bold tracking-tighter uppercase">KOLKATA, INDIA</span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-[10px] font-medium tracking-widest text-muted uppercase flex items-center gap-2">
                <Zap className="w-3 h-3" /> Status
              </span>
              <span className="text-[12px] font-bold tracking-tighter uppercase">V1.0</span>
            </div>
          </div>

          <div className="flex flex-col gap-1 pt-8 border-t border-white/5">
            <span className="text-[10px] font-medium tracking-widest text-muted uppercase">System Time</span>
            <span className="text-4xl font-bold tracking-tighter font-sans">{time}</span>
          </div>
        </Card>

      </div>

      {/* Deep Footer */}
      <div className="mt-20 flex flex-col md:flex-row justify-between items-center gap-8 text-[10px] font-medium tracking-[0.2em] text-muted opacity-30 uppercase">
        <span>© 2024 SOUMAJIT DAS</span>
        <div className="flex gap-10">
          <a href="#" className="hover:text-white transition-colors">Privacy</a>
          <a href="#" className="hover:text-white transition-colors">Terms</a>
        </div>
      </div>
    </footer>
  );
}
