'use client';

import Navbar from '@/components/layout/Navbar';
import Hero from '@/components/sections/Hero';
import Work from '@/components/sections/Work';
import Services from '@/components/sections/Services';
import FAQ from '@/components/sections/FAQ';
import Footer from '@/components/sections/Footer';
import TechStack from '@/components/sections/TechStack';
import Guarantees from '@/components/sections/Guarantees';
import Roadmap from '@/components/sections/Roadmap';

export default function Home() {
  return (
    <main className="min-h-screen selection:bg-white selection:text-black">
      <Navbar />
      
      <Hero />

      <Services sectionNumber="01" />

      <TechStack sectionNumber="02" />

      <Work sectionNumber="03" />
      
      <Guarantees sectionNumber="04" />

      <Roadmap sectionNumber="05" />

      <FAQ sectionNumber="06" />

      <Footer />
    </main>
  );
}
