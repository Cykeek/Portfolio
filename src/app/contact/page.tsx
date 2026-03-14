'use client';

import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/sections/Footer';
import Card from '@/components/ui/Card';
import { Mail, Github, Twitter, Linkedin } from 'lucide-react';

export default function ContactPage() {
  return (
    <main className="min-h-screen selection:bg-white selection:text-black pt-20">
      <Navbar />
      
      <section className="py-32 px-6 max-w-7xl mx-auto">
        <div className="flex flex-col gap-4 mb-20">
          <span className="text-[12px] font-medium tracking-[0.3em] text-muted uppercase">05 // CONTACT</span>
          <h2 className="text-heading">Let's build <br /> something great</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="p-12 flex flex-col gap-8">
            <h3 className="text-2xl font-bold tracking-tighter">Get in touch</h3>
            <p className="text-muted text-lg leading-relaxed">
              Have a project in mind or just want to say hi? Feel free to reach out through any of these platforms.
            </p>
            <div className="flex flex-col gap-4">
              <a href="mailto:hello@cykeek.com" className="flex items-center gap-4 text-white hover:text-muted transition-colors group">
                <div className="w-12 h-12 rounded-global bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all">
                  <Mail className="w-5 h-5" />
                </div>
                <span className="text-lg font-medium">hello@cykeek.com</span>
              </a>
            </div>
          </Card>

          <Card className="p-12 flex flex-col gap-8">
            <h3 className="text-2xl font-bold tracking-tighter">Social Systems</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { name: 'Github', icon: Github, href: '#' },
                { name: 'Twitter', icon: Twitter, href: '#' },
                { name: 'LinkedIn', icon: Linkedin, href: '#' },
              ].map((social) => (
                <a 
                  key={social.name} 
                  href={social.href}
                  className="flex items-center gap-4 p-4 rounded-global border border-white/5 bg-white/[0.02] hover:bg-white/[0.05] transition-all group"
                >
                  <social.icon className="w-5 h-5 text-muted group-hover:text-white transition-colors" />
                  <span className="text-[12px] font-bold tracking-widest uppercase">{social.name}</span>
                </a>
              ))}
            </div>
          </Card>
        </div>
      </section>

      <Footer />
    </main>
  );
}
