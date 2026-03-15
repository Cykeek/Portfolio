'use client';

import { motion } from 'framer-motion';
import { SPRING_WEIGHTED } from '@/lib/motion';
import Button from '@/components/ui/Button';
import Image from 'next/image';

export default function Hero() {
  return (
    <section id="hero" className="relative min-h-screen flex flex-col items-center pt-32 md:pt-48 px-6 overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={SPRING_WEIGHTED}
        className="relative z-10 flex flex-col items-center text-center max-w-4xl"
      >
        {/* Top Badge */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ ...SPRING_WEIGHTED, delay: 0.2 }}
          className="flex items-center gap-2 px-4 py-1.5 rounded-global bg-white/5 border border-white/10 text-[13px] font-medium tracking-wider uppercase text-muted mb-8"
        >
          <span className="w-1.5 h-1.5 rounded-global bg-green-500 animate-pulse" />
          Available for new projects
        </motion.div>

        {/* Main Headline */}
        <h1 className="text-massive tracking-tighter mb-6 uppercase">
          I&apos;m cykeek. <br /> 
          2 years of crafting <span className="text-muted">digital excellence.</span>
        </h1>

        {/* Sub-headline - STANDARDIZED BODY */}
        <p className="text-body max-w-2xl mb-12">
          Product Designer at{' '}
          <span className="inline-flex items-center px-4 py-1.5 bg-white text-black rounded-global transition-transform hover:scale-105 cursor-pointer align-middle mb-1">
            <Image src="/Studio.svg" alt="Studio 1947" width={100} height={16} className="h-4 w-auto brightness-0" />
          </span>
          {' '}where I spend my time bridging the gap between complex engineering and design to build products that people actually love using.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center gap-8">
          <Button variant="primary" icon="arrow">
            View My Work
          </Button>
          <Button variant="secondary" icon="chevron">
            Read My Story
          </Button>
        </div>
      </motion.div>
    </section>
  );
}
