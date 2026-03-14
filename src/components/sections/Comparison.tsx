'use client';

import { motion } from 'framer-motion';
import { Check, Minus } from 'lucide-react';
import { SPRING_WEIGHTED } from '@/lib/motion';

interface ComparisonProps {
  sectionNumber?: string;
}

export default function Comparison({ sectionNumber = "04" }: ComparisonProps) {
  const categories = [
    {
      name: "Core Deliverables",
      features: [
        { name: "Logo & Visual Identity", plans: ["check", "check", "check"] },
        { name: "Brand Guidelines PDF", plans: ["check", "check", "check"] },
        { name: "Website Development", plans: ["minus", "check", "check"] },
        { name: "Backend Integration", plans: ["minus", "minus", "check"] },
        { name: "Social Media Posts", plans: ["2", "10", "20"] },
      ]
    },
    {
      name: "Design & UX",
      features: [
        { name: "Figma Source Files", plans: ["check", "check", "check"] },
        { name: "Responsive Design", plans: ["minus", "check", "check"] },
        { name: "Design System", plans: ["minus", "check", "check"] },
      ]
    },
    {
      name: "Service & Support",
      features: [
        { name: "Revision Rounds", plans: ["1", "3", "5"] },
        { name: "Strategy Call", plans: ["30 Mins", "1 Hour", "Unlimited"] },
        { name: "Turnaround Time", plans: ["1 Week", "2-3 Weeks", "4+ Weeks"] },
        { name: "Priority Support", plans: ["minus", "minus", "24/7"] },
        { name: "Maintenance", plans: ["minus", "1 Month Free", "3 Months Free"] },
      ]
    }
  ];

  return (
    <section id="comparison" className="py-24 px-6 max-w-7xl mx-auto overflow-hidden">
      <div className="flex flex-col gap-4 mb-20">
        <span className="text-[12px] font-medium tracking-[0.3em] text-muted uppercase">{sectionNumber} // FEATURE MATRIX</span>
        <h2 className="text-heading leading-tight">Compare <br /> System Tiers</h2>
      </div>

      <div className="w-full overflow-x-auto">
        <div className="min-w-[800px]">
          {/* Header */}
          <div className="grid grid-cols-[1.5fr_1fr_1fr_1fr] border-b border-white/10 pb-8 px-4">
            <div className="text-[10px] font-bold tracking-[0.4em] text-muted uppercase">Features</div>
            <div className="text-center text-[12px] font-bold tracking-widest uppercase">Brand Setup</div>
            <div className="text-center text-[12px] font-bold tracking-widest uppercase text-white">Startup Plan</div>
            <div className="text-center text-[12px] font-bold tracking-widest uppercase">Growth Plan</div>
          </div>

          {/* Categories */}
          {categories.map((category, catIdx) => (
            <div key={catIdx} className="flex flex-col">
              <div className="bg-white/[0.03] py-4 px-4 text-[10px] font-black tracking-[0.3em] text-muted uppercase">
                {category.name}
              </div>
              {category.features.map((feature, featIdx) => (
                <div 
                  key={featIdx} 
                  className="grid grid-cols-[1.5fr_1fr_1fr_1fr] py-6 px-4 border-b border-white/5 hover:bg-white/[0.02] transition-colors group"
                >
                  <div className="text-sm font-medium text-white/70 group-hover:text-white transition-colors">
                    {feature.name}
                  </div>
                  {feature.plans.map((val, planIdx) => (
                    <div key={planIdx} className="flex justify-center items-center text-sm font-bold tracking-tight">
                      {val === "check" ? (
                        <Check className="w-4 h-4 text-green-500" />
                      ) : val === "minus" ? (
                        <Minus className="w-4 h-4 text-white/10" />
                      ) : (
                        <span className={planIdx === 2 ? "text-white" : "text-muted"}>{val}</span>
                      )}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
