'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { SPRING_WEIGHTED } from '@/lib/motion';
import { CheckCircle2 } from 'lucide-react';
import HCaptcha from '@hcaptcha/react-hcaptcha';

const HCAPTCHA_SITE_KEY = '50b2fe65-b00b-4b9e-ad62-3ba471098be2';

export default function ContactForm() {
  const [activeService, setActiveService] = useState<string | null>(null);
  const [serviceError, setServiceError] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [hCaptchaToken, setHCaptchaToken] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const services = [
    "Brand Setup",
    "Startup Plan",
    "Growth Plan",
    "Custom Project"
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleServiceSelect = (service: string) => {
    setActiveService(service);
    setServiceError(false);
  };

  const handleHCaptchaVerify = (token: string) => {
    setHCaptchaToken(token);
  };

  const handleHCaptchaExpire = () => {
    setHCaptchaToken(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!activeService) {
      setServiceError(true);
      return;
    }
    
    if (!hCaptchaToken) {
      alert('Please complete the captcha verification.');
      return;
    }
    
    setIsLoading(true);

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          access_key: process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY,
          subject: `New Project Inquiry - ${activeService || 'General'}`,
          from_name: formData.name,
          email: formData.email,
          message: `${formData.message}\n\nService: ${activeService || 'Not specified'}`,
          botcheck: '',
          'h-captcha-response': hCaptchaToken,
        }),
      });

      const data = await response.json();

      if (data.success) {
        setIsSubmitted(true);
        setFormData({ name: '', email: '', message: '' });
        setActiveService(null);
        setHCaptchaToken(null);
        setServiceError(false);
      } else {
        console.error('Web3Forms error:', data);
        alert('Something went wrong. Please try again.');
      }
    } catch (error) {
      console.error('Form submission error:', error);
      alert('Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
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
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                <h3 className="text-xl font-bold tracking-tighter uppercase">Project Starter</h3>
                {serviceError && (
                  <span className="text-red-500 text-[10px] font-medium tracking-widest uppercase">
                    Please select a service
                  </span>
                )}
              </div>
              <div className="flex flex-wrap gap-3">
                {services.map((service) => (
                  <button
                    key={service}
                    type="button"
                    onClick={() => handleServiceSelect(service)}
                    className={`px-5 py-2.5 rounded-full text-[11px] font-bold tracking-widest uppercase transition-all duration-300 border ${
                      activeService === service 
                        ? 'bg-white text-black border-white' 
                        : serviceError
                          ? 'bg-red-500/10 text-red-500 border-red-500/30 hover:border-red-500/50'
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
                  name="name"
                  type="text" 
                  placeholder="John Doe"
                  value={formData.name}
                  onChange={handleChange}
                  className="bg-white/5 border border-white/10 rounded-sm px-6 py-4 text-sm focus:outline-none focus:border-white/30 transition-colors"
                />
              </div>
              <div className="flex flex-col gap-3">
                <label className="text-[10px] font-bold tracking-[0.3em] text-muted uppercase ml-1">Email Address</label>
                <input 
                  required
                  name="email"
                  type="email" 
                  placeholder="john@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  className="bg-white/5 border border-white/10 rounded-sm px-6 py-4 text-sm focus:outline-none focus:border-white/30 transition-colors"
                />
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <label className="text-[10px] font-bold tracking-[0.3em] text-muted uppercase ml-1">Project Details</label>
              <textarea 
                required
                name="message"
                rows={4}
                placeholder="Tell me about your vision..."
                value={formData.message}
                onChange={handleChange}
                className="bg-white/5 border border-white/10 rounded-sm px-6 py-4 text-sm focus:outline-none focus:border-white/30 transition-colors resize-none"
              />
            </div>

            <div className="flex justify-center md:justify-start w-full">
              <div className="transform scale-[0.85] sm:scale-100 origin-center md:origin-left">
                <HCaptcha
                  sitekey={HCAPTCHA_SITE_KEY}
                  theme="dark"
                  reCaptchaCompat={false}
                  onVerify={handleHCaptchaVerify}
                  onExpire={handleHCaptchaExpire}
                />
              </div>
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
