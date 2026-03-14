'use client';

import { motion } from 'framer-motion';
import { ArrowUpRight, Dribbble } from 'lucide-react';
import { SPRING_SNAPPY } from '@/lib/motion';
import Card from '@/components/ui/Card';

interface ProjectCardProps {
  date: string;
  title: string;
  desc: string;
  category: string;
  className?: string;
}

export default function ProjectCard({ date, title, desc, category, className = '' }: ProjectCardProps) {
  return (
    <Card className={className}>
      <div className="relative z-10 flex flex-col gap-6 p-8 md:p-12">
        <div className="flex flex-wrap justify-between items-center gap-y-4 gap-x-2">
          <div className="flex flex-wrap gap-2 items-center">
            <span className="px-3 py-1 bg-white/5 border border-white/10 rounded-md text-[11.5px] font-medium tracking-widest text-muted group-hover:text-white transition-colors">
              {category}
            </span>
            <span className="px-3 py-1 bg-white/5 border border-white/10 rounded-md text-[11.5px] font-medium tracking-widest text-muted group-hover:text-white transition-colors flex items-center gap-2">
              <Dribbble className="w-3 h-3 opacity-50 group-hover:opacity-100 transition-opacity" />
              Available on Dribbble
            </span>
          </div>
          <span className="text-[11.5px] font-sans text-muted/50">{date}</span>
        </div>
        
        <h3 className="text-3xl md:text-5xl font-bold tracking-tighter leading-[0.9] transition-all">
          {title}
        </h3>
      </div>

      <div className="relative z-10 mt-auto flex flex-col gap-8 p-8 md:p-12 pt-0">
        <p className="text-muted text-sm md:text-base leading-relaxed max-w-sm">
          {desc}
        </p>
        
        <div className="flex items-center gap-2 text-[11.5px] font-medium tracking-[0.2em] uppercase">
          Explore Project 
          <motion.div
            variants={{
              hover: { x: 4, y: -4 }
            }}
            transition={SPRING_SNAPPY}
          >
            <ArrowUpRight className="w-4 h-4" />
          </motion.div>
        </div>
      </div>

      {/* Decorative Mockup Element (Abstract Glass Shape) */}
      <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-white/5 rounded-md rotate-12 group-hover:rotate-6 transition-transform duration-700 pointer-events-none" />
    </Card>
  );
}
