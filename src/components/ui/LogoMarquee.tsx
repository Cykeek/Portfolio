'use client';

import { motion } from 'framer-motion';
import { Figma } from './icons/Figma';
import { Adobe } from './icons/Adobe';
import { Nextjs } from './icons/Nextjs';
import { TypeScript } from './icons/TypeScript';
import { ReactIcon } from './icons/ReactIcon';
import { TailwindCSS } from './icons/TailwindCSS';
import { Nodejs } from './icons/Nodejs';
import { PostgreSQL } from './icons/PostgreSQL';
import { Prisma } from './icons/PrismaIcon';
import { Vercel } from './icons/Vercel';
import { Supabase } from './icons/Supabase';
import { MongoDB } from './icons/MongoDB';
import { Lottielab } from './icons/Lottielab';
import { GoogleCloud } from './icons/GoogleCloud';
import { Meta } from './icons/Meta';
import { Instagram } from './icons/Instagram';

const iconMap: Record<string, any> = {
  figma: Figma,
  adobe: Adobe,
  nextjs: Nextjs,
  typescript: TypeScript,
  react: ReactIcon,
  tailwindcss: TailwindCSS,
  nodejs: Nodejs,
  postgresql: PostgreSQL,
  prisma: Prisma,
  vercel: Vercel,
  supabase: Supabase,
  mongodb: MongoDB,
  lottielab: Lottielab,
  gcp: GoogleCloud,
  meta: Meta,
  instagram: Instagram,
};

interface LogoMarqueeProps {
  items: { name: string; slug: string }[];
  speed?: number;
  reverse?: boolean;
}

export default function LogoMarquee({ items, speed = 40, reverse = false }: LogoMarqueeProps) {
  // Use a smaller set of duplicated items for the mask-based loop
  const displayItems = [...items, ...items];

  return (
    <div className="relative w-full overflow-hidden py-4">
      {/* Fade Edges */}
      <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-[#050505] to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-[#050505] to-transparent z-10 pointer-events-none" />

      <motion.div
        animate={{ 
          x: reverse ? ["-50%", "0%"] : ["0%", "-50%"] 
        }}
        transition={{
          duration: speed,
          repeat: Infinity,
          ease: "linear",
        }}
        className="flex gap-4 w-fit"
      >
        {displayItems.map((item, i) => {
          const IconComponent = iconMap[item.slug];
          return (
            <div 
              key={`${item.slug}-${i}`}
              className="flex items-center gap-4 px-6 py-3 rounded-md border border-white/5 bg-white/[0.02] shrink-0"
            >
              <div className="w-6 h-6 flex items-center justify-center p-1 shrink-0 bg-white/5 rounded-md">
                {IconComponent ? (
                  <IconComponent className="w-full h-full object-contain" />
                ) : (
                  <span className="text-[10px] font-bold opacity-20">{item.name[0]}</span>
                )}
              </div>
              <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-muted">
                {item.name}
              </span>
            </div>
          );
        })}
      </motion.div>
    </div>
  );
}
