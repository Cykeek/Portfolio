'use client';

import { motion } from 'framer-motion';
import Card from '@/components/ui/Card';
import { STAGGER_CONTAINER, SPRING_WEIGHTED } from '@/lib/motion';
import { Search, PenTool, Code, Rocket } from 'lucide-react';

interface RoadmapProps {
  sectionNumber?: string;
}

export default function Roadmap({ sectionNumber = "05" }: RoadmapProps) {
  const steps = [
    {
      phase: "01",
      title: "Strategy",
      desc: "Discovery call, competitor research, and user flow mapping to align goals.",
      icon: Search
    },
    {
      phase: "02",
      title: "Design",
      desc: "From low-fi wireframes to high-fidelity UI systems designed in Figma.",
      icon: PenTool
    },
    {
      phase: "03",
      title: "Build",
      desc: "Precision engineering using Next.js, Framer Motion, and robust backends.",
      icon: Code
    },
    {
      phase: "04",
      title: "Launch",
      desc: "Testing, Vercel deployment, and detailed documentation handoff.",
      icon: Rocket
    }
  ];

  return (
    <section id="roadmap" className="py-24 px-6 max-w-7xl mx-auto overflow-hidden">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
        <div className="flex flex-col gap-4">
          <span className="text-[12px] font-medium tracking-[0.3em] text-muted uppercase">{sectionNumber} // ENGAGEMENT ROADMAP</span>
          <h2 className="text-heading leading-tight">Systematic <br /> Workflow</h2>
        </div>
        <p className="text-body max-w-md text-muted text-sm md:text-base leading-relaxed">
          A transparent, phase-by-phase approach ensures your project moves 
          from concept to reality with absolute precision.
        </p>
      </div>

      <motion.div 
        variants={STAGGER_CONTAINER(0.1, 0.2)}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
      >
        {steps.map((step, index) => (
          <motion.div 
            key={step.phase}
            variants={{
              initial: { opacity: 0, y: 20 },
              animate: { opacity: 1, y: 0, transition: SPRING_WEIGHTED }
            }}
          >
            <Card className="p-8 h-full flex flex-col gap-8 group hover:bg-white/[0.04] transition-all duration-500">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono font-bold tracking-[0.4em] text-muted opacity-50 uppercase">
                  Phase {step.phase}
                </span>
                <div className="w-10 h-10 rounded-global bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all duration-500">
                  <step.icon className="w-4 h-4" strokeWidth={1.5} />
                </div>
              </div>
              <div className="flex flex-col gap-3">
                <h3 className="text-xl font-bold tracking-tighter uppercase">{step.title}</h3>
                <p className="text-muted text-[13px] leading-relaxed font-medium">
                  {step.desc}
                </p>
              </div>
            </Card>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
