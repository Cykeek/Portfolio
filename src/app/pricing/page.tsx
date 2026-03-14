'use client';

import Navbar from '@/components/layout/Navbar';
import Pricing from '@/components/sections/Pricing';
import TechStack from '@/components/sections/TechStack';
import FAQ from '@/components/sections/FAQ';
import Footer from '@/components/sections/Footer';

export default function PricingPage() {
  return (
    <main className="min-h-screen selection:bg-white selection:text-black pt-20">
      <Navbar />
      
      <Pricing sectionNumber="03" />

      <TechStack sectionNumber="04" />

      <FAQ sectionNumber="05" />

      <Footer />
    </main>
  );
}
