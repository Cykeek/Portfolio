'use client';

import { motion } from 'framer-motion';
import Card from '@/components/ui/Card';

interface ServiceItemProps {
  title: string;
  desc: string;
  tools: string[];
  className?: string;
  illustration?: React.ReactNode;
}

export default function ServiceItem({ title, desc, tools, className = '', illustration }: ServiceItemProps) {
  return (
    <Card className={`group min-h-[320px] ${className}`}>
      <div className="relative z-10 flex h-full">
        {/* Left Content */}
        <div className="flex flex-col justify-between p-8 md:p-10 w-full md:w-3/5">
          <div className="flex flex-col gap-4">
            <h3 className="text-xl md:text-2xl font-bold tracking-tighter uppercase transition-all group-hover:pl-2">{title}</h3>
            <p className="text-muted text-base leading-relaxed max-w-[280px]">
              {desc}
            </p>
          </div>

          <div className="flex flex-wrap gap-2 pt-8">
            {tools.map((tool) => (
              <span 
                key={tool} 
                className="px-3 py-1 bg-white/5 border border-white/10 rounded-global text-[11px] font-medium tracking-widest text-muted group-hover:text-white group-hover:border-white/20 transition-all"
              >
                {tool}
              </span>
            ))}
          </div>
        </div>

        {/* Right Illustration Area */}
        {illustration && (
          <div className="hidden md:flex absolute right-0 top-0 bottom-0 w-2/5 items-center justify-center overflow-hidden pointer-events-none border-l border-white/5">
            <div className="relative w-full h-full opacity-40 group-hover:opacity-100 transition-opacity duration-700">
              {illustration}
            </div>
          </div>
        )}
      </div>

      {/* Background Grid Pattern */}
      <div className="absolute top-0 right-0 w-32 h-32 opacity-[0.03] group-hover:opacity-[0.05] transition-opacity pointer-events-none">
        <svg width="100%" height="100%" viewBox="0 0 100 100">
          <defs>
            <pattern id="grid-service" width="10" height="10" patternUnits="userSpaceOnUse">
              <path d="M 10 0 L 0 0 0 10" fill="none" stroke="white" strokeWidth="0.5"/>
            </pattern>
          </defs>
          <rect width="100" height="100" fill="url(#grid-service)" />
        </svg>
      </div>
    </Card>
  );
}
