'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Button from '@/components/ui/Button';
import { SPRING_WEIGHTED } from '@/lib/motion';

export default function NotFound() {
  return (
    <main className="min-h-screen selection:bg-white selection:text-black flex items-center justify-center px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={SPRING_WEIGHTED}
        className="flex flex-col items-center text-center max-w-lg"
      >
        {/* Error Code */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ ...SPRING_WEIGHTED, delay: 0.2 }}
          className="text-[120px] md:text-[180px] font-bold tracking-tighter leading-none text-white/5"
        >
          404
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...SPRING_WEIGHTED, delay: 0.3 }}
          className="text-4xl md:text-5xl font-bold tracking-tighter uppercase mb-4"
        >
          Lost in Space
        </motion.h1>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...SPRING_WEIGHTED, delay: 0.4 }}
          className="text-muted text-base md:text-lg mb-10 max-w-sm"
        >
          The page you&apos;re looking for doesn&apos;t exist or has been moved. Let&apos;s get you back on track.
        </motion.p>

        {/* Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...SPRING_WEIGHTED, delay: 0.5 }}
          className="flex flex-col sm:flex-row gap-4"
        >
          <Link href="/">
            <Button variant="primary" icon="arrow">
              Go Home
            </Button>
          </Link>
          <Link href="/contact">
            <Button variant="secondary">
              Contact
            </Button>
          </Link>
        </motion.div>
      </motion.div>
    </main>
  );
}
