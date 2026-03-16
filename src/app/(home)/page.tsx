'use client';

import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Hero, Services } from '@/features/home';
import { Work, TechStack, Guarantees, Roadmap, FAQ } from '@/features/shared';

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
