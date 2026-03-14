'use client';

import { motion } from 'framer-motion';
import Card from '@/components/ui/Card';
import { STAGGER_CONTAINER, SPRING_WEIGHTED } from '@/lib/motion';
import { Zap, Code2, ShieldCheck, Smartphone } from 'lucide-react';

interface GuaranteesProps {
  sectionNumber?: string;
}

export default function Guarantees({ sectionNumber = "04" }: GuaranteesProps) {
  const items = [
    {
      title: "95+ Score",
      desc: "Blazing fast performance scores across all Lighthouse metrics for better SEO.",
      icon: Zap
    },
    {
      title: "Clean Code",
      desc: "Scalable, type-safe Next.js architecture that any developer can maintain.",
      icon: Code2
    },
    {
      title: "Fixed Pricing",
      desc: "No hidden fees or surprise invoices. What you see is exactly what you pay.",
      icon: ShieldCheck
    },
    {
      title: "Pixel Perfect",
      desc: "Responsive design systems that feel flawless on every screen size and device.",
      icon: Smartphone
    }
  ];

  return (
    <section id="guarantees" className="py-24 px-6 max-w-7xl mx-auto overflow-hidden">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
        <div className="flex flex-col gap-4">
          <span className="text-[12px] font-medium tracking-[0.3em] text-muted uppercase">{sectionNumber} // PERFORMANCE GURANTEES</span>
          <h2 className="text-heading leading-tight">Built for <br /> Excellence</h2>
        </div>
        <p className="text-body max-w-md text-muted text-sm md:text-base leading-relaxed">
          I don't just design interfaces; I engineer high-performance digital products 
          that provide a competitive edge for your business.
        </p>
      </div>

      <motion.div 
        variants={STAGGER_CONTAINER(0.1, 0.2)}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
      >
        {items.map((item, index) => (
          <motion.div 
            key={index}
            variants={{
              initial: { opacity: 0, y: 20 },
              animate: { opacity: 1, y: 0, transition: SPRING_WEIGHTED }
            }}
          >
            <Card className="p-8 h-full flex flex-col gap-6 group hover:bg-white/[0.04] transition-all duration-500">
              <div className="w-12 h-12 rounded-global bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all duration-500">
                <item.icon className="w-5 h-5" strokeWidth={1.5} />
              </div>
              <div className="flex flex-col gap-2">
                <h3 className="text-lg font-bold tracking-tighter uppercase">{item.title}</h3>
                <p className="text-muted text-[13px] leading-relaxed font-medium">
                  {item.desc}
                </p>
              </div>
            </Card>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
