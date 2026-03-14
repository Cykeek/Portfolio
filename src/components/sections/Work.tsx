'use client';

import ProjectCard from '@/components/ui/ProjectCard';

export default function Work() {
  const projects = [
    {
      date: "2024",
      category: "UI REDESIGN",
      title: "NextDNS: SECURE UI",
      desc: "Transforming complex network security into a minimal and intuitive experience."
    },
    {
      date: "2024",
      category: "FINTECH",
      title: "Indipay Mobile",
      desc: "Reimagining traditional finance as a social and engaging platform."
    },
    {
      date: "2023",
      category: "UTILITY",
      title: "CESC App",
      desc: "Modernizing traditional utility services for a digital-first world."
    }
  ];

  return (
    <section id="works" className="py-32 px-6 max-w-7xl mx-auto">
      <div className="flex justify-between items-end mb-20">
        <div className="flex flex-col gap-4">
          <span className="text-[12px] font-medium tracking-[0.3em] text-muted uppercase">01 // SELECTED ARCHIVE</span>
          <h2 className="text-heading">Featured <br /> Projects</h2>
        </div>
        <span className="hidden md:block text-muted font-sans text-[12px] opacity-50 tracking-widest">(2022-2024)</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-6 gap-6">
        <ProjectCard {...projects[0]} className="md:col-span-4 min-h-[500px]" />
        <ProjectCard {...projects[1]} className="md:col-span-2 min-h-[500px]" />
        <ProjectCard {...projects[2]} className="md:col-span-3 min-h-[400px]" />

        <div className="md:col-span-3 min-h-[400px] border border-white/5 rounded-md flex items-center justify-center bg-white/[0.01] group cursor-pointer hover:bg-white/[0.02] transition-colors duration-500">
          <span className="text-[12px] font-medium tracking-[0.2em] text-muted group-hover:text-white transition-colors">MORE PROJECTS COMING SOON</span>
        </div>
      </div>
    </section>
  );
}
