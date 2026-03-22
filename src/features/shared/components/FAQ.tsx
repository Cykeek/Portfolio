'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { SPRING_WEIGHTED } from '@/lib/motion';
import { useState } from 'react';
import { Activity, Layers, BarChart3, Plus, Minus } from 'lucide-react';

interface FAQProps {
  sectionNumber?: string;
}

export default function FAQ({ sectionNumber = "03" }: FAQProps) {
  const [activeCategory, setActiveCategory] = useState('PROCESS');
  const [expandedQuestion, setExpandedQuestion] = useState<number | null>(null);

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

  const toggleQuestion = (index: number) => {
    setExpandedQuestion(expandedQuestion === index ? null : index);
  };

  return (
    <section id="faq" className="py-32 px-6 max-w-7xl mx-auto">
      <div className="flex flex-col gap-4 mb-20 items-center text-center">
        <span className="text-[12px] font-medium tracking-[0.3em] text-muted uppercase">{sectionNumber}{' // INQUIRIES'}</span>
        <h2 className="text-heading">System <br /> Insights</h2>
      </div>

      {/* Category Tabs */}
      <div className="flex flex-wrap justify-center gap-3 mb-12">
        {categories.map((cat) => {
          const CategoryIcon = faqData[cat].icon;
          return (
            <button
              key={cat}
              onClick={() => {
                setActiveCategory(cat);
                setExpandedQuestion(null);
              }}
              aria-pressed={activeCategory === cat}
              className={`relative px-6 py-3 rounded-global border transition-all duration-300 flex items-center gap-2 ${
                activeCategory === cat 
                  ? 'bg-white text-black border-white shadow-xl' 
                  : 'text-muted border-white/5 hover:border-white/10 hover:text-white hover:bg-white/5'
              }`}
            >
              {activeCategory === cat && (
                <motion.div
                  layoutId="activeCategoryPill"
                  className="absolute inset-0 bg-white rounded-global -z-10"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
              <CategoryIcon className={`w-4 h-4`} strokeWidth={2} />
              <span className="text-[12px] font-medium tracking-tight uppercase">{cat}</span>
            </button>
          );
        })}
      </div>

      {/* Accordion Q&A */}
      <div className="flex flex-col gap-4 max-w-4xl mx-auto">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={SPRING_WEIGHTED}
            className="flex flex-col gap-4"
          >
            {faqData[activeCategory as keyof typeof faqData].questions.map((item, i) => (
              <div 
                key={i} 
                className={`overflow-hidden transition-all duration-300 rounded-sm bg-white/[0.02] backdrop-blur-md border ${
                  expandedQuestion === i 
                    ? 'border-white/10' 
                    : 'border-white/5 hover:border-white/10'
                }`}
              >
                <button
                  onClick={() => toggleQuestion(i)}
                  className="w-full text-left p-6 md:p-8 flex items-start justify-between gap-4 group"
                  aria-expanded={expandedQuestion === i}
                >
                  <div className="flex flex-col gap-3 flex-1">
                    <span className="text-[10px] font-sans text-muted opacity-50">0{i + 1}{' // QUESTION'}</span>
                    <h3 className={`text-xl md:text-2xl font-bold tracking-tighter transition-colors ${
                      expandedQuestion === i ? 'text-white' : 'text-muted group-hover:text-white'
                    }`}>
                      {item.q}
                    </h3>
                  </div>
                  <motion.div
                    className="flex-shrink-0 mt-1"
                    animate={{ rotate: expandedQuestion === i ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    {expandedQuestion === i ? (
                      <Minus className="w-5 h-5 text-white" />
                    ) : (
                      <Plus className="w-5 h-5 text-muted group-hover:text-white" />
                    )}
                  </motion.div>
                </button>
                
                <AnimatePresence>
                  {expandedQuestion === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: 'easeInOut' }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 md:px-8 pb-6 md:pb-8 pt-0">
                        <div className="h-px w-full bg-gradient-to-r from-white/10 via-white/5 to-transparent mb-6" />
                        <p className="text-muted text-base md:text-lg leading-relaxed font-medium">
                          {item.a}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
