'use client';

import LogoMarquee from '@/components/ui/LogoMarquee';

interface TechStackProps {
  sectionNumber?: string;
}

export default function TechStack({ sectionNumber = "03" }: TechStackProps) {
  const allTools = [
    { name: "Figma", slug: "figma" },
    { name: "Adobe CC", slug: "adobe" },
    { name: "Next.js", slug: "nextjs" },
    { name: "TypeScript", slug: "typescript" },
    { name: "React", slug: "react" },
    { name: "Tailwind CSS", slug: "tailwindcss" },
    { name: "Node.js", slug: "nodejs" },
    { name: "PostgreSQL", slug: "postgresql" },
    { name: "Prisma", slug: "prisma" },
    { name: "Vercel", slug: "vercel" },
    { name: "Supabase", slug: "supabase" },
    { name: "MongoDB", slug: "mongodb" },
    { name: "Lottielab", slug: "lottielab" },
    { name: "Google Cloud", slug: "gcp" },
    { name: "Meta", slug: "meta" },
    { name: "Instagram", slug: "instagram" },
  ];

  return (
    <section id="stack" className="py-24 max-w-7xl mx-auto overflow-hidden">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16 px-6">
        <div className="flex flex-col gap-4">
          <span className="text-[12px] font-medium tracking-[0.3em] text-muted uppercase">{sectionNumber} {"//"} SYSTEM STACK</span>
          <h2 className="text-heading leading-tight">Precision <br /> Infrastructure</h2>
        </div>
        <p className="text-body max-w-md text-muted text-sm md:text-base leading-relaxed">
          I utilize the most advanced tools and frameworks to ensure your products 
          are not just beautiful, but engineering masterpieces.
        </p>
      </div>

      <div className="relative flex flex-col gap-2">
        <LogoMarquee items={allTools} speed={40} />
        <LogoMarquee items={allTools} speed={50} reverse />
      </div>
    </section>
  );
}
