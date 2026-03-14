'use client';

import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import Button from '@/components/ui/Button';
import { SPRING_WEIGHTED } from '@/lib/motion';

interface PricingCardProps {
  title: string;
  price: string;
  description: string;
  features: string[];
  isPopular?: boolean;
  ctaText?: string;
}

export default function PricingCard({
  title,
  price,
  description,
  features,
  isPopular = false,
  ctaText = "Get Started"
}: PricingCardProps) {
  return (
    <motion.div
      variants={{
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0, transition: SPRING_WEIGHTED }
      }}
      className={`relative flex flex-col p-8 rounded-md border ${
        isPopular ? 'bg-white/[0.04] border-white/20' : 'bg-white/[0.02] border-white/5'
      } group hover:bg-white/[0.06] transition-all duration-500`}
    >
      {isPopular && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-white text-black text-[10px] font-bold tracking-widest uppercase rounded-full">
          Most Popular
        </div>
      )}

      <div className="mb-8">
        <h3 className="text-[12px] font-medium tracking-[0.3em] text-muted uppercase mb-4">{title}</h3>
        <div className="flex items-baseline gap-1">
          <span className="text-4xl font-bold tracking-tighter">{price}</span>
          <span className="text-muted text-sm">/project</span>
        </div>
        <p className="text-muted text-sm mt-4 leading-relaxed">
          {description}
        </p>
      </div>

      <div className="flex-1 flex flex-col gap-4 mb-8">
        {features.map((feature, index) => (
          <div key={index} className="flex items-start gap-3 text-sm text-white/70">
            <Check className="w-4 h-4 mt-[2px] shrink-0 text-white/40" />
            <span className="leading-snug">{feature}</span>
          </div>
        ))}
      </div>

      <Button 
        variant={isPopular ? "primary" : "secondary"} 
        className="w-full justify-center"
        icon="arrow"
      >
        {ctaText}
      </Button>
    </motion.div>
  );
}
