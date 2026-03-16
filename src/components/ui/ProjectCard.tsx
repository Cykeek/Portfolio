'use client';

import { motion } from 'framer-motion';
import { ArrowUpRight, Dribbble } from 'lucide-react';
import { SPRING_SNAPPY } from '@/lib/motion';
import Card from '@/components/ui/Card';
import Image from 'next/image';

interface ProjectCardProps {
  date: string;
  title: string;
  desc: string;
  category: string;
  image: string;
  className?: string;
}

export default function ProjectCard({ date, title, desc, category, image, className = '' }: ProjectCardProps) {
  return (
    <Card className={`group overflow-hidden ${className}`}>
      {/* Consistent High-End Image Container */}
      <div className={`absolute -bottom-10 -right-10 w-full h-[80%] z-0 pointer-events-none transition-opacity duration-700 ease-[0.33,1,0.68,1] ${title.includes('NextDNS') ? '-right-64' : ''}`}>
<Image 
          src={image} 
          alt={title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-contain object-right-bottom opacity-40 group-hover:opacity-100 transition-opacity duration-700"
          priority={title.includes('NextDNS')}
        />
{/* Balanced Mask Layer */}
        <div className="absolute inset-0 bg-gradient-to-tl from-transparent via-transparent to-transparent opacity-0 group-hover:opacity-0 transition-opacity duration-700" />
      </div>

      <div className="relative z-10 flex flex-col h-full">
        <div className="flex flex-col gap-6 p-8 md:p-12">
          <div className="flex flex-wrap justify-between items-center gap-y-4 gap-x-2">
            <div className="flex flex-wrap gap-2 items-center">
              <span className="px-3 py-1 bg-white/5 backdrop-blur-md border border-white/10 rounded-md text-[11.5px] font-medium tracking-widest text-muted group-hover:text-white transition-colors">
                {category}
              </span>
              <span className="px-3 py-1 bg-white/5 backdrop-blur-md border border-white/10 rounded-md text-[11.5px] font-medium tracking-widest text-muted group-hover:text-white transition-colors flex items-center gap-2">
                <Dribbble className="w-3 h-3 opacity-50 group-hover:opacity-100 transition-opacity" />
                Dribbble
              </span>
            </div>
            <span className="text-[11.5px] font-sans text-muted/50 group-hover:text-white/50 transition-colors">{date}</span>
          </div>
          
          <h3 className="text-3xl md:text-5xl font-bold tracking-tighter leading-[0.9] transition-all group-hover:text-white">
            {title}
          </h3>
        </div>

        <div className="relative z-10 mt-auto flex flex-col gap-8 p-8 md:p-12 pt-0">
          <p className="text-muted text-sm md:text-base leading-relaxed max-w-sm group-hover:text-white/80 transition-colors">
            {desc}
          </p>
          
          <div className="flex items-center gap-2 text-[11.5px] font-medium tracking-[0.2em] uppercase group-hover:text-white transition-colors">
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
      </div>
    </Card>
  );
}
