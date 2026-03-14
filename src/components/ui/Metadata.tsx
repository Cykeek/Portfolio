'use client';

interface MetadataProps {
  label: string;
  value: string;
}

export default function Metadata({ label, value }: MetadataProps) {
  return (
    <div className="flex flex-col gap-1 font-sans uppercase">
      <span className="text-[12px] text-muted tracking-widest">{label}</span>
      <span className="text-technical font-bold tracking-tighter">{value}</span>
    </div>
  );
}
