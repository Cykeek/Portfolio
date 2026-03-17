'use client';

import dynamic from 'next/dynamic';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Hero } from '@/features/home';

const Services = dynamic(() => import('@/features/home/components/Services'), {
  ssr: true,
  loading: () => <div className="h-96" />,
});

const TechStack = dynamic(() => import('@/features/shared/components/TechStack'), {
  ssr: true,
  loading: () => <div className="h-64" />,
});

const Work = dynamic(() => import('@/features/shared/components/Work'), {
  ssr: true,
  loading: () => <div className="h-64" />,
});

const Guarantees = dynamic(() => import('@/features/shared/components/Guarantees'), {
  ssr: true,
  loading: () => <div className="h-64" />,
});

const Roadmap = dynamic(() => import('@/features/shared/components/Roadmap'), {
  ssr: true,
  loading: () => <div className="h-64" />,
});

const FAQ = dynamic(() => import('@/features/shared/components/FAQ'), {
  ssr: true,
  loading: () => <div className="h-64" />,
});

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
