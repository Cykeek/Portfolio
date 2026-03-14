'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';

const phases = [
  "Discovery", 
  "Planning", 
  "Wireframing", 
  "Design System", 
  "Design", 
  "Developer Handoff", 
  "Polishing", 
  "Launch"
];

export default function Preloader() {
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const [hex, setHex] = useState('0x0000');

  // Derive current phase index
  const index = Math.min(
    Math.floor((progress / 100) * phases.length),
    phases.length - 1
  );

  useEffect(() => {
    const totalDuration = 8000; // 8 seconds
    const startTime = Date.now();

    const updateProgress = () => {
      const elapsed = Date.now() - startTime;
      const newProgress = Math.min((elapsed / totalDuration) * 100, 100);
      setProgress(newProgress);

      if (newProgress < 100) {
        requestAnimationFrame(updateProgress);
      } else {
        setTimeout(() => setIsVisible(false), 800);
      }
    };

    // Flicker hex code for technical feel
    const hexInterval = setInterval(() => {
      setHex(`0x${Math.floor(Math.random() * 65536).toString(16).toUpperCase().padStart(4, '0')}`);
    }, 100);

    requestAnimationFrame(updateProgress);
    return () => clearInterval(hexInterval);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="fixed inset-0 z-[999] bg-[#050505] flex flex-col items-center justify-center pointer-events-none p-6"
        >
          <div className="relative flex flex-col items-center gap-16 w-full max-w-sm">
            
            {/* Phase Content Block */}
            <div className="flex flex-col items-center gap-8 w-full">
              <div className="h-24 md:h-32 flex items-center justify-center w-full relative">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={phases[index]}
                    initial={{ y: 40, opacity: 0, filter: "blur(10px)" }}
                    animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
                    exit={{ y: -40, opacity: 0, filter: "blur(10px)" }}
                    transition={{ duration: 0.5, ease: [0.33, 1, 0.68, 1] }}
                    className="text-3xl md:text-6xl font-bold tracking-tighter uppercase text-white text-center leading-none px-4"
                  >
                    {phases[index]}
                  </motion.span>
                </AnimatePresence>
              </div>

              {/* Refinement 2: Binary Sub-Feed */}
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex items-center gap-3"
              >
                <span className="text-[10px] font-mono text-muted/50 tracking-widest uppercase">Process_UID:</span>
                <span className="text-[10px] font-mono text-white tracking-widest">{hex}</span>
              </motion.div>
            </div>

            {/* Refinement 3: Glowing Glass Track */}
            <div className="w-full flex flex-col gap-6 items-center">
              <div className="w-full h-[3px] bg-white/[0.03] backdrop-blur-sm relative overflow-hidden rounded-global border border-white/5">
                <motion.div 
                  className="absolute inset-y-0 left-0 bg-white shadow-[0_0_20px_rgba(255,255,255,0.8)]"
                  style={{ width: `${progress}%` }}
                />
              </div>
              
              <div className="flex justify-between w-full text-[10px] font-medium tracking-[0.4em] text-muted uppercase">
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                  <span>Asset_Compiler_V1.0</span>
                </div>
                <span className="font-mono">{Math.floor(progress)}%</span>
              </div>
            </div>

          </div>

          {/* Background Decorative Grid */}
          <div className="absolute inset-0 opacity-[0.02] pointer-events-none">
            <div className="absolute inset-0" style={{
              backgroundImage: `linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)`,
              backgroundSize: '100px 100px'
            }} />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
