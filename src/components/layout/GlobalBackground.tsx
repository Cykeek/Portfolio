'use client';

import { useEffect, useRef } from 'react';
import { useMotionValue, useSpring, useScroll, useTransform } from 'framer-motion';

class Star {
  x: number;
  y: number;
  z: number;
  pz: number;

  constructor(width: number, height: number) {
    this.x = Math.random() * width - width / 2;
    this.y = Math.random() * height - height / 2;
    this.z = Math.random() * width;
    this.pz = this.z;
  }

  update(speed: number, width: number, height: number) {
    this.z = this.z - speed;
    if (this.z < 1) {
      this.z = width;
      this.x = Math.random() * width - width / 2;
      this.y = Math.random() * height - height / 2;
      this.pz = this.z;
    }
  }

  draw(context: CanvasRenderingContext2D, width: number, height: number, centerX: number, centerY: number, speed: number) {
    const sx = (this.x / this.z) * width + centerX;
    const sy = (this.y / this.z) * height + centerY;

    const r = (1 - this.z / width) * 2; 
    
    const px = (this.x / this.pz) * width + centerX;
    const py = (this.y / this.pz) * height + centerY;

    context.beginPath();
    // Brighten stars as they get faster/closer
    context.strokeStyle = `rgba(255, 255, 255, ${Math.min(1, (1 - this.z / width) * (1 + speed / 10))})`;
    context.lineWidth = r;
    context.moveTo(px, py);
    context.lineTo(sx, sy);
    context.stroke();

    this.pz = this.z;
  }
}

export default function GlobalBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Scroll tracking
  const { scrollYProgress } = useScroll();
  
  // Map scroll progress (0 to 1) to star velocity (2 to 20)
  // As you reach the bottom, the speed increases dramatically
  const starVelocity = useTransform(scrollYProgress, [0, 1], [2, 20]);
  
  // Smooth mouse follow
  const springX = useSpring(mouseX, { stiffness: 50, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 50, damping: 20 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let stars: Star[] = [];
    const starCount = 200; // Increased count for better warp feel
    let width = window.innerWidth;
    let height = window.innerHeight;

    const init = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
      stars = Array.from({ length: starCount }, () => new Star(width, height));
    };

    const animate = () => {
      // Trail fade - adjusted for speed
      const currentSpeed = starVelocity.get();
      ctx.fillStyle = `rgba(5, 5, 5, ${Math.max(0.1, 0.3 - currentSpeed / 100)})`; 
      ctx.fillRect(0, 0, width, height);

      const mX = (springX.get() / width - 0.5) * 150;
      const mY = (springY.get() / height - 0.5) * 150;
      
      const centerX = width / 2 + mX;
      const centerY = height / 2 + mY;

      stars.forEach(star => {
        star.update(currentSpeed, width, height);
        star.draw(ctx, width, height, centerX, centerY, currentSpeed);
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    const handleResize = () => init();
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);
    
    init();
    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, [mouseX, mouseY, springX, springY, starVelocity]);

  return (
    <div className="fixed inset-0 z-[-1] overflow-hidden bg-[#050505] pointer-events-none">
      <canvas ref={canvasRef} className="absolute inset-0" />
      <div className="absolute inset-0 bg-glow opacity-30" />
    </div>
  );
}
