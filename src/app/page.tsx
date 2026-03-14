'use client';

import Navbar from '@/components/layout/Navbar';
import Hero from '@/components/sections/Hero';
import Work from '@/components/sections/Work';
import Services from '@/components/sections/Services';
import TechStack from '@/components/sections/TechStack';
import FAQ from '@/components/sections/FAQ';
import Footer from '@/components/sections/Footer';

export default function Home() {
  return (
    <main className="min-h-screen selection:bg-white selection:text-black">
      <Navbar />
      
      <Hero />

      <Work />
      
      <Services />

      <TechStack sectionNumber="03" />

      <FAQ sectionNumber="04" />

      <Footer />
    </main>
  );
}
