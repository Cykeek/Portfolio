'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { SPRING_WEIGHTED } from '@/lib/motion';
import { CheckCircle2 } from 'lucide-react';

export default function ContactForm() {
  const [activeService, setActiveService] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const services = [
    "Brand Setup",
    "Startup Plan",
    "Growth Plan",
    "Custom Project"
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setIsSubmitted(true);
    }, 2000);
  };

  return (
    <Card className="p-8 md:p-12 h-full">
      <AnimatePresence mode="wait">
        {!isSubmitted ? (
          <motion.form 
            key="form"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onSubmit={handleSubmit}
            className="flex flex-col gap-10"
          >
            <div className="flex flex-col gap-6">
              <h3 className="text-xl font-bold tracking-tighter uppercase">Project Starter</h3>
              <div className="flex flex-wrap gap-3">
                {services.map((service) => (
                  <button
                    key={service}
                    type="button"
                    onClick={() => setActiveService(service)}
                    className={`px-5 py-2.5 rounded-full text-[11px] font-bold tracking-widest uppercase transition-all duration-300 border ${
                      activeService === service 
                        ? 'bg-white text-black border-white' 
                        : 'bg-white/5 text-muted border-white/10 hover:border-white/20'
                    }`}
                  >
                    {service}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="flex flex-col gap-3">
                <label className="text-[10px] font-bold tracking-[0.3em] text-muted uppercase ml-1">Full Name</label>
                <input 
                  required
                  type="text" 
                  placeholder="John Doe"
                  className="bg-white/5 border border-white/10 rounded-sm px-6 py-4 text-sm focus:outline-none focus:border-white/30 transition-colors"
                />
              </div>
              <div className="flex flex-col gap-3">
                <label className="text-[10px] font-bold tracking-[0.3em] text-muted uppercase ml-1">Email Address</label>
                <input 
                  required
                  type="email" 
                  placeholder="john@example.com"
                  className="bg-white/5 border border-white/10 rounded-sm px-6 py-4 text-sm focus:outline-none focus:border-white/30 transition-colors"
                />
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <label className="text-[10px] font-bold tracking-[0.3em] text-muted uppercase ml-1">Project Details</label>
              <textarea 
                required
                rows={4}
                placeholder="Tell me about your vision..."
                className="bg-white/5 border border-white/10 rounded-sm px-6 py-4 text-sm focus:outline-none focus:border-white/30 transition-colors resize-none"
              />
            </div>

            <Button 
              variant="primary" 
              className="w-full justify-center !py-5" 
              icon={isLoading ? undefined : "arrow"}
            >
              {isLoading ? "Transmitting..." : "Send Message"}
            </Button>
          </motion.form>
        ) : (
          <motion.div 
            key="success"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={SPRING_WEIGHTED}
            className="flex flex-col items-center justify-center text-center py-20 gap-6"
          >
            <div className="w-20 h-20 rounded-full bg-green-500/10 border border-green-500/20 flex items-center justify-center">
              <CheckCircle2 className="w-10 h-10 text-green-500" />
            </div>
            <div className="flex flex-col gap-2">
              <h3 className="text-2xl font-bold tracking-tighter uppercase">Message Received</h3>
              <p className="text-muted text-sm max-w-xs mx-auto">
                Your transmission has been successfully processed. Expect a response within 12 hours.
              </p>
            </div>
            <Button variant="secondary" onClick={() => setIsSubmitted(false)}>
              Send Another
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </Card>
  );
}
