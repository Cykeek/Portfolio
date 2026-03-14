'use client';

import { motion, Variants } from 'framer-motion';
import { ArrowRight, ChevronRight } from 'lucide-react';

interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'ghost';
  icon?: 'arrow' | 'chevron';
  className?: string;
  onClick?: () => void;
}

export default function Button({ 
  children, 
  variant = 'primary', 
  icon, 
  className = '', 
  onClick 
}: ButtonProps) {
  
  const isPrimary = variant === 'primary';
  const isGhost = variant === 'ghost';

  // Instant hover for text/icon container to avoid CSS interference
  const contentVariants: Variants = {
    initial: { letterSpacing: '0.1em' },
    hover: { 
      letterSpacing: variant !== 'primary' ? '0.25em' : '0.1em',
      transition: { duration: 0.2, ease: "easeOut" as any } 
    }
  };

  // Arrow specific hover animation
  const arrowVariants: Variants = {
    initial: { x: 0 },
    hover: { 
      x: [0, 5, 0],
      transition: { repeat: Infinity, duration: 0.8, ease: "easeInOut" as any }
    }
  };

  return (
    <motion.button
      initial="initial"
      whileHover="hover"
      whileTap="tap"
      onClick={onClick}
      className={`
        group relative text-[13px] font-medium tracking-widest uppercase rounded-global flex items-center justify-center
        ${isPrimary ? 'px-10 py-4 bg-white text-black shadow-2xl shadow-white/10' : ''}
        ${variant === 'secondary' ? 'px-8 py-4 text-muted border border-white/5 hover:border-white/20 hover:text-white' : ''}
        ${isGhost ? 'px-0 py-2 text-muted hover:text-white' : ''}
        ${className}
      `}
      variants={{
        initial: { scale: 1 },
        hover: { scale: 1.05 },
        tap: { scale: 0.95 }
      }}
      transition={{ type: "spring", stiffness: 800, damping: 15 }}
    >
      <motion.span 
        variants={contentVariants}
        className="relative z-10 flex items-center gap-3"
      >
        {children}
        
        {/* Animated Icons */}
        {icon === 'arrow' && (
          <motion.div variants={arrowVariants}>
            <ArrowRight className="w-4 h-4" />
          </motion.div>
        )}
        
        {icon === 'chevron' && (
          <motion.div variants={{ hover: { x: 4 } }}>
            <ChevronRight className={`w-4 h-4 transition-transform ${isGhost ? 'opacity-100' : 'opacity-50'}`} />
          </motion.div>
        )}
      </motion.span>

      {/* No background sweep for secondary */}
    </motion.button>
  );
}
