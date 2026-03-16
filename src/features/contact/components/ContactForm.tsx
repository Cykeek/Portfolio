'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { SPRING_WEIGHTED } from '@/lib/motion';
import { CheckCircle2, AlertCircle } from 'lucide-react';
import HCaptcha from '@hcaptcha/react-hcaptcha';

const HCAPTCHA_SITE_KEY = process.env.NEXT_PUBLIC_HCAPTCHA_SITE_KEY || '';

interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
}

export default function ContactForm() {
  const [activeService, setActiveService] = useState<string | null>(null);
  const [serviceError, setServiceError] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [hCaptchaToken, setHCaptchaToken] = useState<string | null>(null);
  const [formErrors, setFormErrors] = useState<FormErrors>({});
  const [submitError, setSubmitError] = useState<string | null>(null);
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

  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const validateForm = (): boolean => {
    const errors: FormErrors = {};
    
    if (!formData.name.trim()) {
      errors.name = 'Name is required';
    }
    
    if (!formData.email.trim()) {
      errors.email = 'Email is required';
    } else if (!validateEmail(formData.email)) {
      errors.email = 'Please enter a valid email';
    }
    
    if (!formData.message.trim()) {
      errors.message = 'Message is required';
    } else if (formData.message.trim().length < 10) {
      errors.message = 'Message must be at least 10 characters';
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (formErrors[name as keyof FormErrors]) {
      setFormErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const handleServiceSelect = (service: string) => {
    setActiveService(service);
    setServiceError(false);
  };

  const handleHCaptchaVerify = (token: string) => {
    setHCaptchaToken(token);
    setSubmitError(null);
  };

  const handleHCaptchaExpire = () => {
    setHCaptchaToken(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError(null);
    
    if (!activeService) {
      setServiceError(true);
      return;
    }
    
    if (!validateForm()) {
      return;
    }
    
    if (!hCaptchaToken) {
      setSubmitError('Please complete the captcha verification.');
      return;
    }
    
    setIsLoading(true);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          message: formData.message,
          service: activeService,
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
        setSubmitError(data.error || 'Something went wrong. Please try again.');
      }
    } catch (error) {
      setSubmitError('Network error. Please check your connection and try again.');
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
                  name="name"
                  type="text" 
                  placeholder="John Doe"
                  value={formData.name}
                  onChange={handleChange}
                  className={`bg-white/5 border rounded-sm px-6 py-4 text-sm focus:outline-none transition-colors ${
                    formErrors.name 
                      ? 'border-red-500 focus:border-red-500' 
                      : 'border-white/10 focus:border-white/30'
                  }`}
                />
                {formErrors.name && (
                  <span className="text-red-500 text-[10px] font-medium tracking-widest flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />
                    {formErrors.name}
                  </span>
                )}
              </div>
              <div className="flex flex-col gap-3">
                <label className="text-[10px] font-bold tracking-[0.3em] text-muted uppercase ml-1">Email Address</label>
                <input 
                  name="email"
                  type="email" 
                  placeholder="john@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  className={`bg-white/5 border rounded-sm px-6 py-4 text-sm focus:outline-none transition-colors ${
                    formErrors.email 
                      ? 'border-red-500 focus:border-red-500' 
                      : 'border-white/10 focus:border-white/30'
                  }`}
                />
                {formErrors.email && (
                  <span className="text-red-500 text-[10px] font-medium tracking-widest flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />
                    {formErrors.email}
                  </span>
                )}
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <label className="text-[10px] font-bold tracking-[0.3em] text-muted uppercase ml-1">Project Details</label>
              <textarea 
                name="message"
                rows={4}
                placeholder="Tell me about your vision..."
                value={formData.message}
                onChange={handleChange}
                className={`bg-white/5 border rounded-sm px-6 py-4 text-sm focus:outline-none transition-colors resize-none ${
                  formErrors.message 
                    ? 'border-red-500 focus:border-red-500' 
                    : 'border-white/10 focus:border-white/30'
                }`}
              />
              {formErrors.message && (
                <span className="text-red-500 text-[10px] font-medium tracking-widest flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" />
                  {formErrors.message}
                </span>
              )}
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

            {submitError && (
              <div className="flex items-center gap-2 p-4 bg-red-500/10 border border-red-500/20 rounded-sm">
                <AlertCircle className="w-4 h-4 text-red-500 flex-shrink-0" />
                <span className="text-red-500 text-xs font-medium">{submitError}</span>
              </div>
            )}

            <div className="flex items-center gap-2 text-[10px] text-muted/50">
              <span className="tracking-wider">Rate limited to 5 messages per hour</span>
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
