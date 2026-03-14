'use client';

import { motion } from 'framer-motion';
import Card from '@/components/ui/Card';
import SvglIcon from '@/components/ui/SvglIcon';
import { STAGGER_CONTAINER, SPRING_WEIGHTED } from '@/lib/motion';

interface TechStackProps {
  sectionNumber?: string;
}

export default function TechStack({ sectionNumber = "03" }: TechStackProps) {
  const stack = [
    {
      category: "Design & UX",
      items: [
        { name: "Figma", slug: "figma", desc: "Primary design tool for high-fidelity prototyping and design systems." },
        { name: "Adobe CC", slug: "adobe", desc: "For asset creation, illustration, and branding." },
      ]
    },
    {
      category: "Frontend & Logic",
      items: [
        { name: "Next.js", slug: "nextjs", desc: "React framework for production-grade, performant web applications." },
        { name: "TypeScript", slug: "typescript", desc: "Strong typing for robust, error-free engineering." },
        { name: "Tailwind CSS", slug: "tailwindcss", desc: "Utility-first CSS framework for rapid and modern UI development." },
        { name: "Vercel", slug: "vercel", desc: "Deployment platform for lightning-fast delivery and scaling." },
      ]
    },
    {
      category: "Backend & Systems",
      items: [
        { name: "Node.js", slug: "nodejs", desc: "Cross-platform JavaScript runtime for scalable server-side logic." },
        { name: "PostgreSQL", slug: "postgresql", desc: "The world's most advanced open source relational database." },
        { name: "Prisma", slug: "prisma", desc: "Modern database toolkit for type-safe database access." },
      ]
    }
  ];

  return (
    <section id="stack" className="py-32 px-6 max-w-7xl mx-auto">
      <div className="flex flex-col gap-4 mb-20 items-center text-center">
        <span className="text-[12px] font-medium tracking-[0.3em] text-muted uppercase">{sectionNumber} // SYSTEM STACK</span>
        <h2 className="text-heading">Precision <br /> Infrastructure</h2>
        <p className="text-body max-w-xl text-muted">
          I utilize the most advanced tools and frameworks to ensure your products 
          are not just beautiful, but engineering masterpieces.
        </p>
      </div>

      <motion.div 
        variants={STAGGER_CONTAINER(0.1, 0.2)}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
        className="grid grid-cols-1 md:grid-cols-3 gap-6"
      >
        {stack.map((group, groupIndex) => (
          <motion.div 
            key={group.category}
            variants={{
              initial: { opacity: 0, y: 20 },
              animate: { opacity: 1, y: 0, transition: SPRING_WEIGHTED }
            }}
            className="flex flex-col gap-6"
          >
            <span className="text-[10px] font-bold tracking-[0.3em] text-muted uppercase pl-2">
              {groupIndex + 1}.0 {group.category}
            </span>
            <div className="flex flex-col gap-4">
              {group.items.map((item) => (
                <Card key={item.name} className="p-8 group hover:bg-white/[0.04] transition-all duration-500">
                  <div className="flex flex-col gap-6">
                    <div className="flex items-center justify-between">
                      <div className="w-12 h-12 rounded-global bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-white transition-all duration-500 p-2.5">
                        <SvglIcon 
                          searchTerm={item.slug} 
                          alt={item.name} 
                          className="w-full h-full object-contain filter grayscale brightness-200 group-hover:grayscale-0 group-hover:brightness-100 transition-all duration-500"
                        />
                      </div>
                      <span className="text-[10px] font-mono text-muted opacity-30 tracking-[0.4em] uppercase">active</span>
                    </div>
                    <div className="flex flex-col gap-2">
                      <h3 className="text-xl font-bold tracking-tighter uppercase">{item.name}</h3>
                      <p className="text-muted text-[13px] leading-relaxed font-medium">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
