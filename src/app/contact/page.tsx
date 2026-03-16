'use client';

import { motion } from 'framer-motion';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Card from '@/components/ui/Card';
import { ContactForm, AvailabilityWidget } from '@/features/contact';
import { MessageSquare, Calendar, Sparkles } from 'lucide-react';
import { GitHub } from '@/components/ui/icons/GitHub';
import { Instagram } from '@/components/ui/icons/Instagram';
import { XformerlyTwitter } from '@/components/ui/icons/XformerlyTwitter';
import { LinkedIn } from '@/components/ui/icons/LinkedIn';
import { STAGGER_CONTAINER, SPRING_WEIGHTED } from '@/lib/motion';

export default function ContactPage() {
  const process = [
    {
      title: "Alignment",
      desc: "We discuss your vision and goals in a brief 15-min discovery call.",
      icon: MessageSquare
    },
    {
      title: "Strategy",
      desc: "I provide a detailed proposal and fixed-price roadmap for your project.",
      icon: Calendar
    },
    {
      title: "Execution",
      desc: "We start building with regular updates and feedback loops.",
      icon: Sparkles
    }
  ];

  return (
    <main className="min-h-screen selection:bg-white selection:text-black pt-20">
      <Navbar />
      
      <section className="py-20 md:py-32 px-6 max-w-7xl mx-auto">
        <div className="flex flex-col gap-4 mb-12 md:mb-20">
          <span className="text-[12px] font-medium tracking-[0.3em] text-muted uppercase">05 // CONTACT</span>
          <h2 className="text-heading">Initiate <br /> Transmission</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16 md:mb-24">
          <ContactForm />
          
          <div className="flex flex-col gap-6">
            <AvailabilityWidget />
            
            <Card className="p-8 flex flex-col gap-8 h-full">
              <h3 className="text-xl font-bold tracking-tighter uppercase">Social Systems</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { name: 'Github', icon: GitHub, href: 'https://github.com/Cykeek' },
                  { name: 'Instagram', icon: Instagram, href: 'https://www.instagram.com/cykeek_sensei/' },
                  { name: 'X (Twitter)', icon: XformerlyTwitter, href: 'https://x.com/cykeekgit' },
                  { name: 'LinkedIn', icon: LinkedIn, href: 'https://www.linkedin.com/in/soumajit-das-2ba2a1219/' },
                ].map((social) => (
                  <a 
                    key={social.name} 
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 p-4 rounded-global border border-white/5 bg-white/[0.02] hover:bg-white/[0.05] transition-all group"
                  >
                    <social.icon className="w-5 h-5 text-muted group-hover:text-white transition-colors" />
                    <span className="text-[12px] font-bold tracking-widest uppercase">{social.name}</span>
                  </a>
                ))}
              </div>
            </Card>
          </div>
        </div>

        {/* Trust Markers / Process */}
        <div className="flex flex-col gap-12 pt-24 border-t border-white/5">
          <div className="flex flex-col gap-4">
            <span className="text-[10px] font-bold tracking-[0.4em] text-muted uppercase">Post-Contact Process</span>
            <h3 className="text-3xl font-bold tracking-tighter uppercase">What happens next?</h3>
          </div>

          <motion.div 
            variants={STAGGER_CONTAINER(0.1, 0.2)}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-12"
          >
            {process.map((item, index) => (
              <motion.div 
                key={index}
                variants={{
                  initial: { opacity: 0, x: -20 },
                  animate: { opacity: 1, x: 0, transition: SPRING_WEIGHTED }
                }}
                className="flex flex-col gap-6 relative"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-white text-black flex items-center justify-center font-bold text-lg">
                    {index + 1}
                  </div>
                  <div className="h-[1px] flex-1 bg-white/10 hidden md:block" />
                </div>
                <div className="flex flex-col gap-3">
                  <h4 className="text-xl font-bold tracking-tighter uppercase flex items-center gap-3">
                    <item.icon className="w-5 h-5 text-muted" />
                    {item.title}
                  </h4>
                  <p className="text-muted text-sm leading-relaxed font-medium">
                    {item.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
