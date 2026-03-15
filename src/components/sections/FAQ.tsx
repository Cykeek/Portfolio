'use client';

import { motion, AnimatePresence } from 'framer-motion';
import Card from '@/components/ui/Card';
import { SPRING_WEIGHTED } from '@/lib/motion';
import { useState } from 'react';
import { Activity, Layers, BarChart3 } from 'lucide-react';

interface FAQProps {
  sectionNumber?: string;
}

export default function FAQ({ sectionNumber = "03" }: FAQProps) {
  const [activeCategory, setActiveCategory] = useState('PROCESS');

  const faqData = {
    'PROCESS': {
      icon: Activity,
      questions: [
        { q: "How do I get started?", a: "Simply send me an email or click 'Wanna Chat?' to start a conversation about your project." },
        { q: "How long does it take?", a: "Typically between 3 to 6 weeks depending on the complexity of the project." }
      ]
    },
    'CAPABILITIES': {
      icon: Layers,
      questions: [
        { q: "Do you build the websites too?", a: "Yes, I build fully responsive and high-performance websites using Framer and Next.js." },
        { q: "Do you offer branding services?", a: "I focus primarily on digital product design, but I can assist with visual identity systems." }
      ]
    },
    'COMMERCIAL': {
      icon: BarChart3,
      questions: [
        { q: "What is your pricing model?", a: "I offer project-based pricing tailored to the specific needs and goals of your product." },
        { q: "Do you take monthly retainers?", a: "Yes, for established products needing ongoing design engineering support." }
      ]
    }
  };

  const categories = Object.keys(faqData) as Array<keyof typeof faqData>;

  return (
    <section id="faq" className="py-32 px-6 max-w-7xl mx-auto">
      <div className="flex flex-col gap-4 mb-20 items-center text-center">
        <span className="text-[12px] font-medium tracking-[0.3em] text-muted uppercase">{sectionNumber}{' // INQUIRIES'}</span>
        <h2 className="text-heading">System <br /> Insights</h2>
      </div>

      <Card className="min-h-[500px]">
        <div className="flex flex-col md:flex-row h-full">
          
          {/* Left Column: Category Selection */}
          <div className="w-full md:w-1/3 border-b md:border-b-0 md:border-r border-white/5 p-6 md:p-12 flex flex-col gap-2 md:gap-4 overflow-x-auto md:overflow-x-visible relative z-20">
            <span className="text-[10px] font-medium tracking-widest text-muted uppercase mb-4 opacity-50 hidden md:block">Filter by category</span>
            <div className="flex flex-row md:flex-col gap-2 md:gap-4 min-w-max md:min-w-0">
              {categories.map((cat) => {
                const CategoryIcon = faqData[cat].icon;
                return (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    aria-pressed={activeCategory === cat}
                    className={`relative z-30 text-left px-6 py-4 rounded-global border transition-all duration-300 flex-1 md:flex-none flex items-center gap-3 ${activeCategory === cat ? 'bg-white text-black border-white shadow-xl scale-[1.02]' : 'text-muted border-white/5 hover:border-white/10 hover:text-white hover:bg-white/5'}`}
                  >
                    {activeCategory === cat && (
                      <motion.div
                        layoutId="activeCategoryPill"
                        className="absolute inset-0 bg-white rounded-global -z-10"
                        transition={{ type: "spring", stiffness: 400, damping: 30 }}
                      />
                    )}
                    <CategoryIcon className={`w-4 h-4 ${activeCategory === cat ? 'text-black' : 'text-muted opacity-50 group-hover:opacity-100'}`} strokeWidth={2} />
                    <span className="text-[12px] font-medium tracking-tight uppercase whitespace-nowrap">{cat}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right Column: Dynamic Q&A Feed */}
          <div className="w-full md:w-2/3 p-8 md:p-12 text-left">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeCategory}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={SPRING_WEIGHTED}
                className="flex flex-col gap-12"
              >
                {faqData[activeCategory as keyof typeof faqData].questions.map((item, i) => (
                  <div key={i} className="flex flex-col gap-4 group">
                    <span className="text-[10px] font-sans text-muted opacity-50">0{i + 1}{' // QUESTION'}</span>
                    <h3 className="text-2xl md:text-3xl font-bold tracking-tighter">
                      {item.q}
                    </h3>
                    <p className="text-muted text-base md:text-lg leading-relaxed max-w-xl font-medium">
                      {item.a}
                    </p>
                  </div>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>

        </div>
      </Card>
    </section>
  );
}
