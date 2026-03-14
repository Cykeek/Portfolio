'use client';

import { useState, useEffect } from 'react';

interface SvglIconProps {
  searchTerm: string;
  alt: string;
  className?: string;
}

interface SvglResponse {
  title: string;
  route: string;
  wordmark?: string;
}

export default function SvglIcon({ searchTerm, alt, className }: SvglIconProps) {
  const [iconUrl, setIconUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchIcon() {
      try {
        const response = await fetch(`https://api.svgl.app?search=${searchTerm}`);
        const data: SvglResponse[] = await response.json();
        
        if (data && data.length > 0) {
          // Priority: Wordmark (if available and not Figma/Adobe where logo is better) 
          // vs Route (Standard Logo)
          const match = data.find(i => i.title.toLowerCase().includes(searchTerm.toLowerCase())) || data[0];
          setIconUrl(match.route);
        }
      } catch (error) {
        console.error(`Error fetching icon for ${searchTerm}:`, error);
      } finally {
        setLoading(false);
      }
    }

    fetchIcon();
  }, [searchTerm]);

  if (loading) {
    return <div className={`animate-pulse bg-white/5 rounded-md ${className}`} />;
  }

  if (!iconUrl) {
    return <div className={`bg-white/5 rounded-md flex items-center justify-center ${className}`}>
      <span className="text-[8px] text-muted opacity-30 uppercase">{alt[0]}</span>
    </div>;
  }

  return (
    <img 
      src={iconUrl} 
      alt={alt} 
      className={className}
      loading="lazy"
    />
  );
}
