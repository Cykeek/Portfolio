'use client';

import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { PricingSection } from '@/features/pricing';
import { Comparison } from '@/features/pricing';
import { TechStack, Guarantees, Roadmap, FAQ } from '@/features/shared';

export default function PricingPage() {
  return (
    <main className="min-h-screen selection:bg-white selection:text-black pt-20">
      <Navbar />
      
      <PricingSection sectionNumber="03" />

      <Guarantees sectionNumber="04" />

      <Comparison sectionNumber="05" />

      <TechStack sectionNumber="06" />

      <Roadmap sectionNumber="07" />

      <FAQ sectionNumber="08" />

      <Footer />
    </main>
  );
}
