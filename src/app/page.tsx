'use client';

import Navbar from '@/components/layout/Navbar';
import Hero from '@/components/sections/Hero';
import Work from '@/components/sections/Work';
import Services from '@/components/sections/Services';
import FAQ from '@/components/sections/FAQ';
import Footer from '@/components/sections/Footer';

export default function Home() {
  return (
    <main className="min-h-screen selection:bg-white selection:text-black">
      <Navbar />
      
      <Hero />

      <Work />
      
      <Services />

      <FAQ sectionNumber="03" />

      <Footer />
    </main>
  );
}
