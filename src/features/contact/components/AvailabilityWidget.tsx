'use client';

import { useState, useEffect } from 'react';
import Card from '@/components/ui/Card';
import { Clock, MapPin, Zap } from 'lucide-react';

export default function AvailabilityWidget() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formattedTime = time.toLocaleTimeString('en-US', {
    timeZone: 'Asia/Kolkata',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true
  });

  const hour = parseInt(time.toLocaleTimeString('en-US', { timeZone: 'Asia/Kolkata', hour: '2-digit', hour12: false }));
  const day = time.getDay(); // 0 = Sunday, 6 = Saturday

  // Offline: 12:00 AM to 09:59 AM (all days)
  // Available: Sunday(0) & Saturday(6) from 10:00 AM to 11:59 PM
  // Busy: Monday(1) to Friday(5), 24 hours
  let status: 'available' | 'busy' | 'offline';
  
  if (hour >= 0 && hour < 10) {
    status = 'offline';
  } else if (day === 0 || day === 6) {
    // Weekend (Sunday = 0, Saturday = 6)
    status = hour >= 10 ? 'available' : 'offline';
  } else {
    // Monday to Friday
    status = 'busy';
  }

  const statusConfig = {
    available: { color: 'bg-green-500', text: 'Available', pulse: true },
    busy: { color: 'bg-yellow-500', text: 'Busy', pulse: false },
    offline: { color: 'bg-red-500', text: 'Offline', pulse: false },
  };

  const currentStatus = statusConfig[status];

  return (
    <Card className="p-8 flex flex-col gap-8 h-full">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-bold tracking-tighter uppercase">Local Presence</h3>
        <div className="flex items-center gap-2 px-3 py-1 bg-white/5 border border-white/10 rounded-full">
          <div className={`w-1.5 h-1.5 rounded-full ${currentStatus.color} ${currentStatus.pulse ? 'animate-pulse' : ''}`} />
          <span className="text-[10px] font-bold tracking-widest uppercase text-muted">
            {currentStatus.text}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6">
        <div className="flex items-center gap-4 group">
          <div className="w-10 h-10 rounded-global bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all">
            <Clock className="w-4 h-4" />
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] font-bold tracking-widest text-muted uppercase">Current Time</span>
            <span className="text-lg font-medium">{formattedTime} (IST)</span>
          </div>
        </div>

        <div className="flex items-center gap-4 group">
          <div className="w-10 h-10 rounded-global bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all">
            <MapPin className="w-4 h-4" />
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] font-bold tracking-widest text-muted uppercase">Location</span>
            <span className="text-lg font-medium">India</span>
          </div>
        </div>

        <div className="flex items-center gap-4 group">
          <div className="w-10 h-10 rounded-global bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all">
            <Zap className="w-4 h-4" />
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] font-bold tracking-widest text-muted uppercase">Response Time</span>
            <span className="text-lg font-medium">Under 12 Hours</span>
          </div>
        </div>
      </div>
    </Card>
  );
}
