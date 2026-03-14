'use client';

export default function GridOverlay() {
  return (
    <div 
      className="fixed inset-0 z-[100] pointer-events-none opacity-20"
      style={{
        backgroundImage: `
          linear-gradient(to right, var(--color-grid) 1px, transparent 1px),
          linear-gradient(to bottom, var(--color-grid) 1px, transparent 1px)
        `,
        backgroundSize: 'var(--grid-size) var(--grid-size)'
      }}
      aria-hidden="true"
    />
  );
}
