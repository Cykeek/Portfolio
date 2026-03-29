'use client';

import { motion } from 'framer-motion';
import ServiceItem from './ServiceItem';
import { STAGGER_CONTAINER, SPRING_WEIGHTED } from '@/lib/motion';

/**
 * UIUXIllustration: Abstract 1px interface schematic.
 */
function UIUXIllustration() {
  return (
    <div className="w-full h-full p-8 flex flex-col gap-4">
      <div className="w-full h-4 border border-white/10 rounded-global flex items-center px-2 gap-1">
        <div className="w-1 h-1 rounded-full bg-white/20" />
        <div className="w-1 h-1 rounded-full bg-white/20" />
        <div className="flex-1" />
        <div className="w-4 h-1 bg-white/10 rounded-full" />
      </div>
      <div className="flex gap-4 h-full">
        <div className="w-12 h-full border border-white/10 rounded-md flex flex-col gap-2 p-2">
          <div className="w-full aspect-square bg-white/5 rounded-md" />
          <div className="w-full h-1 bg-white/5 rounded-full" />
          <div className="w-full h-1 bg-white/5 rounded-full" />
        </div>
        <div className="flex-1 flex flex-col gap-4">
          <div className="w-full h-24 border border-white/10 rounded-md bg-white/[0.02]" />
          <div className="grid grid-cols-2 gap-4">
            <div className="h-16 border border-white/10 rounded-md" />
            <div className="h-16 border border-white/10 rounded-md" />
          </div>
        </div>
      </div>
      <motion.div 
        animate={{ x: [0, 40, -20, 0], y: [0, -30, 20, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/2 left-1/2 w-3 h-3 border border-white/40 flex items-center justify-center"
      >
        <div className="w-[1px] h-full bg-white/20 absolute" />
        <div className="h-[1px] w-full bg-white/20 absolute" />
      </motion.div>
    </div>
  );
}

/**
 * EngineeringIllustration: Abstract code schematic.
 */
function EngineeringIllustration() {
  return (
    <div className="w-full h-full p-8 flex flex-col gap-3 font-mono text-[8px] text-white/20">
      <div className="flex gap-2">
        <span className="text-white/40">01</span>
        <span>import {'{'} motion {'}'} from &apos;framer-motion&apos;;</span>
      </div>
      <div className="flex gap-2">
        <span className="text-white/40">02</span>
        <span>export function App() {'{'}</span>
      </div>
      <div className="flex gap-2 pl-4">
        <span className="text-white/40">03</span>
        <div className="flex flex-col gap-2 w-full">
          <div className="h-1.5 w-3/4 bg-white/10 rounded-full" />
          <div className="h-1.5 w-1/2 bg-white/5 rounded-full" />
        </div>
      </div>
      <div className="flex gap-2 pl-4">
        <span className="text-white/40">04</span>
        <div className="flex gap-1 items-center">
          <span>return (</span>
          <motion.div 
            animate={{ opacity: [0, 1, 0] }}
            transition={{ duration: 0.8, repeat: Infinity }}
            className="w-1 h-3 bg-white/40"
          />
        </div>
      </div>
      <div className="flex gap-2 pl-8">
        <span className="text-white/40">05</span>
        <div className="w-full h-12 border border-white/10 rounded-md bg-white/[0.02]" />
      </div>
      <div className="flex gap-2">
        <span className="text-white/40">06</span>
        <span>{'}'}</span>
      </div>
      
      {/* Decorative Syntax Highlight Glow */}
      <motion.div 
        animate={{ opacity: [0.1, 0.3, 0.1], x: [0, 20, 0] }}
        transition={{ duration: 4, repeat: Infinity }}
        className="absolute top-1/2 right-0 w-24 h-24 bg-blue-500/10 blur-2xl rounded-full"
      />
    </div>
  );
}

interface ServicesProps {
  sectionNumber?: string;
}

export default function Services({ sectionNumber = "01" }: ServicesProps) {
  const services = [
    {
      title: "UI/UX DESIGN",
      desc: "Crafting intuitive, high-fidelity interfaces for mobile and desktop platforms.",
      tools: ["WIREFRAMING", "RESEARCH", "PLANNING", "DESIGNING", "HANDOFF"],
      illustration: <UIUXIllustration />
    },
    {
      title: "WEB ENGINEERING",
      desc: "Building responsive, performance-first websites with modern tech stacks.",
      tools: ["DEVELOPMENT", "ANIMATIONS", "CMS SETUP", "SEO", "OPTIMIZATION"],
      illustration: <EngineeringIllustration />
    }
  ];

  return (
    <section id="services" className="py-32 px-6 max-w-7xl mx-auto">
      <div className="flex flex-col gap-4 mb-20">
        <span className="text-[12px] font-medium tracking-[0.3em] text-muted uppercase">{sectionNumber} {"//"} CAPABILITIES</span>
        <h2 className="text-heading">System <br /> Standards</h2>
      </div>

      <motion.div 
        variants={STAGGER_CONTAINER(0.1, 0.2)}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
        className="grid grid-cols-1 md:grid-cols-4 gap-6"
      >
        {/* Metric Card 1 */}
        <motion.div 
          variants={{ initial: { y: 20, opacity: 0 }, animate: { y: 0, opacity: 1, transition: SPRING_WEIGHTED }}}
          className="md:col-span-1 bg-white/[0.02] border border-white/5 rounded-sm p-8 flex flex-col justify-between group hover:bg-white/[0.04] transition-all duration-500"
        >
          <span className="text-[12px] font-medium tracking-widest text-muted uppercase">Project Load</span>
          <div className="flex flex-col gap-1">
            <span className="text-6xl font-bold tracking-tighter transition-colors">37+</span>
            <span className="text-[12px] font-medium text-muted uppercase">Successful Deliveries</span>
          </div>
        </motion.div>

        {/* Service Card 1 */}
        <ServiceItem 
          {...services[0]}
          className="md:col-span-3"
        />

        {/* Service Card 2 */}
        <ServiceItem 
          {...services[1]}
          className="md:col-span-3"
        />

        {/* Metric Card 2 */}
        <motion.div 
          variants={{ initial: { y: 20, opacity: 0 }, animate: { y: 0, opacity: 1, transition: SPRING_WEIGHTED }}}
          className="md:col-span-1 bg-white/[0.02] border border-white/5 rounded-sm p-8 flex flex-col justify-between group hover:bg-white/[0.04] transition-all duration-500"
        >
          <span className="text-[12px] font-medium tracking-widest text-muted uppercase">Global Reach</span>
          <div className="flex flex-col gap-1">
            <span className="text-6xl font-bold tracking-tighter transition-colors">12</span>
            <span className="text-[12px] font-medium text-muted uppercase">Framer Websites Live</span>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
