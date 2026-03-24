'use client';

import { useState, useEffect, lazy, Suspense } from 'react';
import { motion } from 'framer-motion';
import { STAGGER_CONTAINER, SPRING_WEIGHTED } from '@/lib/motion';
import PricingCard from './PricingCard';
import Button from '@/components/ui/Button';

const CustomQuoteModal = lazy(() => 
  import('./CustomQuoteModal').then((module) => ({ default: module.default }))
);

interface PricingProps {
  sectionNumber?: string;
}

export default function Pricing({ sectionNumber = "03" }: PricingProps) {
  const [showCustomQuoteModal, setShowCustomQuoteModal] = useState(false);

  const plans = [
    {
      title: "Brand Setup",
      price: "₹4,999",
      amount: 4999,
      description: "Establish a professional visual identity with a custom logo and comprehensive brand guidelines.",
      features: [
        "Logo & Brand Guideline Documentation",
        "1 Revision",
        "2 Social Media Posts",
        "Deliverables within 1 Week",
        "30-Min Strategy Call",
        "Assets delivered after full payment"
      ]
    },
    {
      title: "Startup Plan",
      price: "₹14,999",
      amount: 14999,
      description: "A comprehensive design solution for early-stage startups needing a complete digital presence.",
      features: [
        "Logo & Brand Guideline Documentation",
        "3 Revisions",
        "10 Social Media Posts",
        "Static Website upto 5 page ( Without any Automation )",
        "Design System & Component Library",
        "Developer-Handoff Ready Documentation",
        "1 Month Free Maintenance",
        "Assets delivered after full payment"
      ],
      isPopular: true
    },
    {
      title: "Growth Plan",
      price: "₹49,999",
      amount: 49999,
      description: "The ultimate scale-up solution with full-stack development, expanded content, and priority support.",
      features: [
        "Everything under Startup Plan",
        "5 Revisions",
        "20 Social Media Posts",
        "Full Functional Website with Backend",
        "24/7 Priority Support",
        "3 Months Free Maintenance",
        "Assets & Handoff delivered after full payment"
      ]
    }
  ];

  return (
    <section id="pricing" className="py-32 px-6 max-w-7xl mx-auto">
      <div className="flex flex-col gap-4 mb-20">
        <span className="text-[12px] font-medium tracking-[0.3em] text-muted uppercase">{sectionNumber} {"//"} PRICING</span>
        <h2 className="text-heading">Strategic <br /> Investment</h2>
        <p className="text-body max-w-xl text-muted">
          Transparent pricing tailored to the scope of your project. 
          No hidden fees, just high-quality results.
        </p>
      </div>

      <motion.div 
        variants={STAGGER_CONTAINER(0.1, 0.2)}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
        className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
      >
        {plans.map((plan, index) => (
          <PricingCard key={index} {...plan} />
        ))}
      </motion.div>

      {/* Custom Pricing CTA */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ ...SPRING_WEIGHTED, delay: 0.4 }}
        className="bg-white/[0.02] border border-white/5 rounded-md p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8 group hover:bg-white/[0.04] transition-all duration-500"
      >
        <div className="flex flex-col gap-4 text-center md:text-left">
          <h3 className="text-2xl md:text-3xl font-bold tracking-tighter">Have a different plan in mind?</h3>
          <p className="text-muted text-sm md:text-base max-w-xl">
            We provide custom pricing for unique projects that don&apos;t fit into our standard tiers. 
            Let&apos;s discuss your specific requirements and build a tailored solution.
          </p>
        </div>
        <Button 
          variant="primary" 
          className="whitespace-nowrap !px-12"
          onClick={() => setShowCustomQuoteModal(true)}
          icon="arrow"
        >
          Get Custom Quote
        </Button>
      </motion.div>

      {showCustomQuoteModal && (
        <Suspense fallback={null}>
          <CustomQuoteModal
            isOpen={showCustomQuoteModal}
            onClose={() => setShowCustomQuoteModal(false)}
          />
        </Suspense>
      )}
    </section>
  );
}
