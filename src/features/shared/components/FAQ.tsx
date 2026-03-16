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
        { q: "How do you bridge the gap between design and code?", a: "My workflow is integrated. I design with code constraints in mind and develop with design precision. This eliminates the 'translation gap' typically found between agencies, ensuring the final product is a 1:1 reflection of the design." },
        { q: "How do we stay aligned during development?", a: "Transparency is fundamental. I use Slack for async communication and Linear for project tracking. You'll have access to a live staging environment from day one to see the product evolve in real-time." },
        { q: "What is the typical project duration?", a: "Most engagements span 4 to 8 weeks. I prioritize deep work on a limited number of projects at a time to ensure every pixel and line of code receives the attention it deserves." }
      ]
    },
    'CAPABILITIES': {
      icon: Layers,
      questions: [
        { q: "Can you work within an existing tech stack?", a: "While I specialize in the Next.js and TypeScript ecosystem, I am experienced in integrating with existing React-based architectures or helping teams migrate to more performant, modern infrastructures." },
        { q: "Do you build design systems or just one-off pages?", a: "I specialize in scalable design systems. I build accessible, documented component libraries that empower your team to build new features quickly while maintaining perfect visual consistency." },
        { q: "How do you handle performance and SEO?", a: "Speed is a core design principle, not an afterthought. I optimize for Core Web Vitals, accessibility (a11y), and semantic SEO out of the box to ensure your product is fast and discoverable." }
      ]
    },
    'COMMERCIAL': {
      icon: BarChart3,
      questions: [
        { q: "What is your pricing philosophy?", a: "I operate on a fixed-price, project-based model. This provides you with budget certainty and shifts the focus from 'hours billed' to 'value delivered,' aligning our incentives toward the best possible outcome." },
        { q: "Who owns the intellectual property?", a: "Upon final payment, you own 100% of the designs, code, and assets. I provide a clean handover with comprehensive documentation to ensure your team can operate independently." },
        { q: "Do you offer ongoing support after launch?", a: "Yes. I offer maintenance retainers for performance monitoring, security updates, and iterative feature development to ensure your product continues to scale effectively after the initial launch." }
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
