'use client';

import { motion, useScroll, useMotionValueEvent } from 'framer-motion';
import { SPRING_WEIGHTED } from '@/lib/motion';
import Button from '@/components/ui/Button';
import { LayoutGrid, Briefcase, DollarSign, Mail } from 'lucide-react';
import { useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { useLenis } from 'lenis/react';

const navItems = [
  { name: 'WORKS', id: 'works', icon: LayoutGrid, isPage: false },
  { name: 'SERVICES', id: 'services', icon: Briefcase, isPage: false },
  { name: 'PRICING', id: 'pricing', icon: DollarSign, isPage: true },
  { name: 'CONTACT', id: 'contact', icon: Mail, isPage: true },
];

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const lenis = useLenis();
  const [scrollActiveItem, setScrollActiveItem] = useState<string | null>(null);
  const { scrollY } = useScroll();

  const activeItem = pathname === '/' 
    ? scrollActiveItem 
    : navItems.find(item => item.isPage && pathname === `/${item.id}`)?.name || null;

  // Sync active state with scroll position (only on home page)
  useMotionValueEvent(scrollY, "change", (latest) => {
    if (pathname !== '/') return;

    if (latest < 200) {
      setScrollActiveItem(null); 
      return;
    }

    navItems.forEach((item) => {
      if (item.isPage) return; 
      const element = document.getElementById(item.id);
      if (element) {
        const rect = element.getBoundingClientRect();
        if (rect.top >= -100 && rect.top <= 400) {
          setScrollActiveItem(item.name);
        }
      }
    });
  });

  const handleLogoClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (pathname === '/') {
      if (lenis) {
        lenis.scrollTo('#hero', { duration: 1.5 });
      } else {
        document.getElementById('hero')?.scrollIntoView({ behavior: 'smooth' });
      }
      setScrollActiveItem(null);
    } else {
      router.push('/');
    }
  };

  const handleNavClick = (e: React.MouseEvent, item: typeof navItems[0]) => {
    if (!item.isPage && pathname === '/') {
      e.preventDefault();
      lenis?.scrollTo(`#${item.id}`, { duration: 1.5 });
      setScrollActiveItem(item.name);
    }
  };

  const islandVariants = {
    initial: { y: -20, opacity: 0 },
    animate: { y: 0, opacity: 1 }
  };

  return (
    <>
      {/* Desktop Top Navbar */}
      <div className="fixed top-0 left-0 w-full z-50 hidden md:flex justify-between items-start px-12 py-8 pointer-events-none">
        <motion.a 
          href="/"
          onClick={handleLogoClick}
          variants={islandVariants}
          initial="initial"
          animate="animate"
          transition={SPRING_WEIGHTED}
          className="pointer-events-auto bg-white/[0.03] backdrop-blur-md border border-white/10 rounded-global px-6 py-3 shadow-xl hover:bg-white/[0.05] transition-colors cursor-pointer"
        >
          <span className="text-[12px] font-medium tracking-[0.2em] uppercase text-white">CYKEEK</span>
        </motion.a>

        <motion.nav 
          variants={islandVariants}
          initial="initial"
          animate="animate"
          transition={{ ...SPRING_WEIGHTED, delay: 0.1 }}
          className="pointer-events-auto relative bg-white/[0.03] backdrop-blur-md border border-white/10 rounded-global px-2 py-2 shadow-xl flex items-center gap-2"
        >
          {navItems.map((item) => (
            <a
              key={item.name}
              href={item.isPage ? `/${item.id}` : `/#${item.id}`}
              onClick={(e) => handleNavClick(e, item)}
              className={`relative px-6 py-2 text-[12px] font-bold tracking-widest transition-colors duration-500 z-10 ${activeItem === item.name ? 'text-black' : 'text-white hover:text-muted'}`}
            >
              {activeItem === item.name && (
                <motion.div
                  layoutId="activePillDesktop"
                  className="absolute inset-0 bg-white rounded-global -z-10"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
              {item.name}
            </a>
          ))}
        </motion.nav>

        <motion.div
          variants={islandVariants}
          initial="initial"
          animate="animate"
          transition={{ ...SPRING_WEIGHTED, delay: 0.2 }}
          className="pointer-events-auto"
        >
          <Button variant="primary" className="!px-8 !py-3" onClick={() => router.push('/contact')}>
            WANNA CHAT?
          </Button>
        </motion.div>
      </div>

      {/* Mobile Top Header */}
      <div className="fixed top-0 left-0 w-full z-50 md:hidden flex justify-between items-center px-6 py-6 pointer-events-none">
        <motion.a 
          href="/"
          onClick={handleLogoClick}
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="pointer-events-auto bg-white/[0.03] backdrop-blur-md border border-white/10 rounded-global px-5 py-2.5 cursor-pointer"
        >
          <span className="text-[11px] font-medium tracking-[0.2em] uppercase text-white">CYKEEK</span>
        </motion.a>
        
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="pointer-events-auto"
        >
          <Button variant="primary" className="!px-6 !py-2.5 !text-[10px]" onClick={() => router.push('/contact')}>
            CHAT
          </Button>
        </motion.div>
      </div>

      {/* Mobile Bottom Dock */}
      <div className="fixed bottom-8 left-0 w-full z-50 md:hidden flex justify-center px-6 pointer-events-none">
        <motion.nav 
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ ...SPRING_WEIGHTED, delay: 0.3 }}
          className="pointer-events-auto relative bg-white/[0.05] backdrop-blur-2xl border border-white/10 rounded-global px-2 py-2 flex items-center gap-1 shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
        >
          {navItems.map((item) => (
            <a
              key={item.name}
              href={item.isPage ? `/${item.id}` : `/#${item.id}`}
              onClick={(e) => handleNavClick(e, item)}
              className="relative flex flex-col items-center justify-center w-20 h-14 gap-1 group"
            >
              {activeItem === item.name && (
                <motion.div
                  layoutId="activePillMobile"
                  className="absolute inset-0 bg-white rounded-global z-0"
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                />
              )}

              <item.icon 
                className={`relative z-10 w-5 h-5 transition-colors duration-500 ${activeItem === item.name ? 'text-black' : 'text-muted group-hover:text-white'}`} 
                strokeWidth={1.5} 
              />
              <span 
                className={`relative z-10 text-[8px] font-black tracking-widest transition-colors duration-500 ${activeItem === item.name ? 'text-black' : 'text-muted group-hover:text-white'}`}
              >
                {item.name}
              </span>
            </a>
          ))}
        </motion.nav>
      </div>
    </>
  );
}
