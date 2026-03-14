import { Variants } from 'framer-motion';

/**
 * SPRING_WEIGHTED: Premium, liquid-like feel. 
 * Heavy mass, moderate damping for smooth deceleration.
 */
export const SPRING_WEIGHTED = {
  type: "spring",
  stiffness: 100,
  damping: 20,
  mass: 1.2,
} as const;

/**
 * SPRING_SNAPPY: Fast, mechanical feel.
 * High stiffness, high damping for immediate response without bounce.
 */
export const SPRING_SNAPPY = {
  type: "spring",
  stiffness: 200,
  damping: 30,
  mass: 1,
} as const;

/**
 * BASE_VARIANTS: Standard entrance pattern.
 * Rises from 40px below with a fade-in.
 */
export const BASE_VARIANTS: Variants = {
  initial: { y: 40, opacity: 0 },
  animate: {
    y: 0,
    opacity: 1,
    transition: SPRING_WEIGHTED
  }
};

/**
 * GRID_STAGGER: Staggered reveal logic.
 * Default staggerChildren for container variants.
 */
export const STAGGER_CONTAINER = (staggerDelay = 0.1, delayChildren = 0.4): Variants => ({
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: {
      staggerChildren: staggerDelay,
      delayChildren: delayChildren,
    }
  }
});

/**
 * INVERSION_VARIANTS: High-contrast hover logic.
 * Simple black/white inversion.
 */
export const INVERSION_VARIANTS: Variants = {
  initial: { backgroundColor: 'transparent', color: 'var(--color-foreground)' },
  hover: { 
    backgroundColor: 'var(--color-foreground)', 
    color: 'var(--color-background)',
    transition: SPRING_SNAPPY
  }
};
