'use client';

import { motion } from 'framer-motion';
import { SPRING_WEIGHTED } from '@/lib/motion';

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

export default function Card({ children, className = '' }: CardProps) {
  return (
    <motion.div 
      initial={{ y: 20, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={SPRING_WEIGHTED}
      whileHover="hover"
      className={`group relative flex flex-col justify-between bg-white/[0.02] backdrop-blur-md border border-white/5 rounded-md overflow-hidden transition-all duration-500 hover:bg-white/[0.04] hover:border-white/10 ${className}`}
    >
      {/* Global Background Glow Effect on Hover */}
      <motion.div 
        className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
      />

      {children}
    </motion.div>
  );
}
