'use client';

import { motion } from 'framer-motion';
import ProjectCard from '@/components/ui/ProjectCard';
import Button from '@/components/ui/Button';
import { Dribbble } from 'lucide-react';

interface WorkProps {
  sectionNumber?: string;
}

export default function Work({ sectionNumber = "01" }: WorkProps) {
  const projects = [
    {
      date: "2024",
      category: "UI REDESIGN",
      title: "NextDNS: SECURE UI",
      desc: "Transforming complex network security into a minimal and intuitive experience.",
      image: "/projects/nextdns.png",
      redirectUrl: "https://dribbble.com/shots/25489879-NextDNS-Redesigned-UI"
    },
    {
      date: "2024",
      category: "FINTECH",
      title: "Indipay Mobile",
      desc: "Reimagining traditional finance as a social and engaging platform.",
      image: "/projects/Indipay.png",
      redirectUrl: "https://dribbble.com/shots/25402935-Indipay-A-unique-Payment-App-for-Gen-Z-s"
    },
    {
      date: "2023",
      category: "UTILITY",
      title: "CESC App",
      desc: "Modernizing traditional utility services for a digital-first world.",
      image: "/projects/cesc.png",
      redirectUrl: "https://dribbble.com/shots/25454203-CESC-Mobile-App-UI-Redesigned"
    }
  ];

  const dribbbleUrl = 'https://dribbble.com/cykeek';

  return (
    <section id="works" className="py-32 px-6 max-w-7xl mx-auto">
      <div className="flex justify-between items-end mb-20">
        <div className="flex flex-col gap-4">
          <span className="text-[12px] font-medium tracking-[0.3em] text-muted uppercase">{sectionNumber} {"//"} SELECTED ARCHIVE</span>
          <h2 className="text-heading">Featured <br /> Projects</h2>
        </div>
        <span className="hidden md:block text-muted font-sans text-[12px] opacity-50 tracking-widest">(2022-2024)</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-6 gap-6">
        <ProjectCard {...projects[0]} className="md:col-span-4 min-h-[500px]" redirectUrl={projects[0].redirectUrl} />
        <ProjectCard {...projects[1]} className="md:col-span-2 min-h-[500px]" redirectUrl={projects[1].redirectUrl} />
        <ProjectCard {...projects[2]} className="md:col-span-3 min-h-[400px]" redirectUrl={projects[2].redirectUrl} />

        <a 
          href={dribbbleUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="md:col-span-3 min-h-[400px] border border-white/5 rounded-sm flex flex-col items-center justify-center gap-8 bg-white/[0.01] group cursor-pointer hover:bg-white/[0.02] transition-all duration-500 relative overflow-hidden"
        >
          {/* Animated gradient background on hover */}
          <div className="absolute inset-0 bg-gradient-to-br from-pink-500/10 via-transparent to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
          
          {/* Dribbble Icon with animation */}
          <motion.div 
            className="relative z-10"
            whileHover={{ scale: 1.1 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <Dribbble className="w-16 h-16 text-muted group-hover:text-pink-400 transition-colors duration-500" />
          </motion.div>

          {/* Text content */}
          <div className="relative z-10 flex flex-col items-center gap-4 text-center">
            <span className="text-[14px] font-medium tracking-[0.15em] text-muted group-hover:text-white transition-colors duration-500">
              Explore More Work on
            </span>
            <span className="text-xl font-bold tracking-tight text-white group-hover:text-pink-400 transition-colors duration-500">
              Dribbble
            </span>
          </div>

          {/* CTA Button */}
          <div className="relative z-10">
            <Button variant="secondary" icon="arrow">
              Visit Dribbble
            </Button>
          </div>

          {/* URL display */}
          <span className="relative z-10 text-[11px] text-muted/40 group-hover:text-muted/60 transition-colors">
            dribbble.com/cykeek
          </span>
        </a>
      </div>
    </section>
  );
}
