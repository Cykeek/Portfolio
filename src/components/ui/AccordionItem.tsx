'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus } from 'lucide-react';
import { SPRING_WEIGHTED } from '@/lib/motion';

interface AccordionItemProps {
  question: string;
  answer: string;
}

export default function AccordionItem({ question, answer }: AccordionItemProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-border-subtle">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-10 flex justify-between items-center group transition-colors hover:bg-surface px-4"
      >
        <span className="text-xl md:text-2xl font-black uppercase tracking-tighter group-hover:pl-4 transition-all">
          {question}
        </span>
        <motion.div
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={SPRING_WEIGHTED}
        >
          <Plus className="w-8 h-8" />
        </motion.div>
      </button>
      <motion.div
        initial={false}
        animate={{ 
          height: isOpen ? 'auto' : 0, 
          opacity: isOpen ? 1 : 0 
        }}
        transition={SPRING_WEIGHTED}
        className="overflow-hidden bg-surface/50"
      >
        <p className="pb-10 pt-4 px-4 text-muted text-base md:text-lg max-w-2xl uppercase font-medium">
          {answer}
        </p>
      </motion.div>
    </div>
  );
}
