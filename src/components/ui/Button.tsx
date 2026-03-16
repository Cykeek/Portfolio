'use client';

import { motion, Variants } from 'framer-motion';
import { ArrowRight, ChevronRight } from 'lucide-react';
import { SPRING_SNAPPY } from '@/lib/motion';

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
  const isSecondary = variant === 'secondary';
  const isGhost = variant === 'ghost';

  // Faster animation for the text and icons inside
  const contentVariants: Variants = {
    initial: { x: 0 },
    hover: { 
      x: isGhost ? 4 : 0,
      transition: { ...SPRING_SNAPPY, stiffness: 400, damping: 20 }
    }
  };

  // Animation for the background fill - instant response
  const fillVariants: Variants = {
    initial: { x: '-101%' },
    hover: { 
      x: '0%',
      transition: { duration: 0.2, ease: 'easeOut' }
    }
  };

  // Arrow specific hover animation
  const arrowVariants: Variants = {
    initial: { x: 0 },
    hover: { 
      x: 5,
      transition: { ...SPRING_SNAPPY, stiffness: 400, damping: 20 }
    }
  };

  return (
    <motion.button
      initial="initial"
      whileHover="hover"
      whileTap="tap"
      onClick={onClick}
      className={`
        group relative text-[13px] font-medium tracking-widest uppercase rounded-global flex items-center justify-center overflow-hidden
        ${isPrimary ? 'px-10 py-4 bg-white text-black shadow-2xl shadow-white/10 hover:text-white' : ''}
        ${isSecondary ? 'px-8 py-4 text-white border border-white/10 hover:text-black' : ''}
        ${isGhost ? 'px-0 py-2 text-muted hover:text-white' : ''}
        ${className}
      `}
      variants={{
        initial: { scale: 1 },
        hover: { scale: 1.02 },
        tap: { scale: 0.98 }
      }}
      transition={{ duration: 0.15 }}
    >
      {/* Slide Fill for Primary (Black Fill) */}
      {isPrimary && (
        <motion.div
          className="absolute inset-0 bg-black z-0 rounded-global"
          variants={fillVariants}
        />
      )}

      {/* Slide Fill for Secondary (White Fill) */}
      {isSecondary && (
        <motion.div
          className="absolute inset-0 bg-white z-0 rounded-global"
          variants={fillVariants}
        />
      )}

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
    </motion.button>
  );
}
