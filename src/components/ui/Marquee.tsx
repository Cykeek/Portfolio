'use client';

import { motion, useScroll, useTransform } from 'framer-motion';

interface MarqueeProps {
  text: string;
  speed?: number;
}

export default function Marquee({ text, speed = 20 }: MarqueeProps) {
  const { scrollYProgress } = useScroll();
  
  // Dynamic 3D rotation based on scroll
  const rotateZ = useTransform(scrollYProgress, [0, 1], [-2, 2]);
  const skewX = useTransform(scrollYProgress, [0, 1], [5, -5]);

  return (
    <div className="relative w-full overflow-hidden py-32 perspective-[1000px]">
      <motion.div 
        style={{ rotateZ, skewX }}
        className="w-[120%] -ml-[10%] py-10 bg-white text-black border-y-2 border-black flex items-center shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
      >
        <motion.div
          animate={{ x: [0, -1000] }}
          transition={{
            duration: speed,
            repeat: Infinity,
            ease: "linear",
          }}
          className="flex whitespace-nowrap"
        >
          {[...Array(10)].map((_, i) => (
            <span key={i} className="text-[8rem] md:text-[12rem] font-black uppercase tracking-tighter leading-none mx-8">
              {text} — {text} —
            </span>
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
}
