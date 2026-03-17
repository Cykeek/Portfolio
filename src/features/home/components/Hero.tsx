'use client';

import { motion } from 'framer-motion';
import { SPRING_WEIGHTED, STAGGER_CONTAINER } from '@/lib/motion';
import Button from '@/components/ui/Button';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function Hero() {
  const router = useRouter();

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
          Design Engineering <br /> 
          <span className="text-muted">for Global Brands.</span>
        </h1>

        {/* Sub-headline - STANDARDIZED BODY */}
        <p className="text-body max-w-2xl mb-12">
          Product Designer at{' '}
          <span className="inline-flex items-center px-4 py-1.5 bg-white text-black rounded-global transition-transform hover:scale-105 cursor-pointer align-middle mb-1">
            <Image src="/Studio.svg" alt="Studio 1947" width={100} height={16} className="h-4 w-auto brightness-0" priority fetchPriority="high" sizes="100px" />
          </span>
          {' '}where I spend my time bridging the gap between complex engineering and design to build products that people actually love using.
        </p>

        {/* CTAs */}
        <motion.div 
          variants={STAGGER_CONTAINER(0.1, 0.4)}
          initial="initial"
          animate="animate"
          className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6"
        >
          <motion.div variants={STAGGER_CONTAINER()}>
            <Button 
              variant="primary" 
              icon="arrow"
              onClick={() => {
                const el = document.getElementById('works');
                el?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              View My Work
            </Button>
          </motion.div>
          
<motion.div variants={STAGGER_CONTAINER()}>
            <Button 
              variant="secondary"
              onClick={() => router.push('/pricing', { scroll: false })}
            >
              View Pricing
            </Button>
          </motion.div>
        </motion.div>

        {/* Quick Stats */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...SPRING_WEIGHTED, delay: 0.6 }}
          className="flex items-center gap-8 mt-16 text-[12px] font-medium tracking-widest text-muted uppercase"
        >
          <div className="flex flex-col items-center">
            <span className="text-white text-2xl font-bold">50+</span>
            <span>Projects</span>
          </div>
          <div className="w-px h-8 bg-white/10" />
          <div className="flex flex-col items-center">
            <span className="text-white text-2xl font-bold">2+</span>
            <span>Years</span>
          </div>
          <div className="w-px h-8 bg-white/10" />
          <div className="flex flex-col items-center">
            <span className="text-white text-2xl font-bold">100%</span>
            <span>Satisfaction</span>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
