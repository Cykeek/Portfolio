'use client';

import Navbar from '@/components/layout/Navbar';
import Pricing from '@/components/sections/Pricing';
import Guarantees from '@/components/sections/Guarantees';
import Comparison from '@/components/sections/Comparison';
import TechStack from '@/components/sections/TechStack';
import Roadmap from '@/components/sections/Roadmap';
import FAQ from '@/components/sections/FAQ';
import Footer from '@/components/sections/Footer';

export default function PricingPage() {
  return (
    <main className="min-h-screen selection:bg-white selection:text-black pt-20">
      <Navbar />
      
      <Pricing sectionNumber="03" />

      <Guarantees sectionNumber="04" />

      <Comparison sectionNumber="05" />

      <TechStack sectionNumber="06" />

      <Roadmap sectionNumber="07" />

      <FAQ sectionNumber="08" />

      <Footer />
    </main>
  );
}
