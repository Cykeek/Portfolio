'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Check, AlertCircle, ArrowLeft, Loader2, CheckCircle2, Minus, Plus } from 'lucide-react';
import Button from '@/components/ui/Button';

interface Service {
  id: string;
  name: string;
  basePrice: number;
  description: string;
  hasQuantity: boolean;
  minQuantity: number;
  maxQuantity: number;
  quantityStep: number;
}

interface FormData {
  name: string;
  email: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
}

type PaymentStatus = 'idle' | 'processing' | 'success' | 'error';

interface CustomQuoteModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SERVICES: Service[] = [
  { id: 'logo', name: 'Logo Design', basePrice: 4999, description: 'Custom logo with brand guidelines', hasQuantity: false, minQuantity: 1, maxQuantity: 1, quantityStep: 1 },
  { id: 'brand', name: 'Brand Identity', basePrice: 6999, description: 'Complete brand guidelines documentation', hasQuantity: false, minQuantity: 1, maxQuantity: 1, quantityStep: 1 },
  { id: 'website-static', name: 'Static Website', basePrice: 499, description: 'Per page, no backend', hasQuantity: true, minQuantity: 1, maxQuantity: 5, quantityStep: 1 },
  { id: 'website-dynamic', name: 'Dynamic Website', basePrice: 9999, description: 'Per page, with backend', hasQuantity: true, minQuantity: 1, maxQuantity: 5, quantityStep: 1 },
  { id: 'design-system', name: 'Design System', basePrice: 9999, description: 'Component library & documentation', hasQuantity: false, minQuantity: 1, maxQuantity: 1, quantityStep: 1 },
  { id: 'social-posts', name: 'Social Media Posts', basePrice: 199, description: 'Per post', hasQuantity: true, minQuantity: 1, maxQuantity: 20, quantityStep: 1 },
  { id: 'seo', name: 'SEO Optimization', basePrice: 1999, description: 'Core Web Vitals & semantic SEO', hasQuantity: false, minQuantity: 1, maxQuantity: 1, quantityStep: 1 },
  {   id: 'maintenance', name: 'Monthly Maintenance', basePrice: 4999, description: 'Per month, max 6 months', hasQuantity: true, minQuantity: 1, maxQuantity: 6, quantityStep: 1 },
];

export default function CustomQuoteModal({ isOpen, onClose }: CustomQuoteModalProps) {
  const [selectedServices, setSelectedServices] = useState<Set<string>>(new Set());
  const [serviceQuantities, setServiceQuantities] = useState<Record<string, number>>({});
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({ name: '', email: '', message: '' });
  const [formErrors, setFormErrors] = useState<FormErrors>({});
  const [paymentStatus, setPaymentStatus] = useState<PaymentStatus>('idle');

  const calculateTotal = () => {
    return SERVICES.filter(s => selectedServices.has(s.id)).reduce((sum, service) => {
      const quantity = serviceQuantities[service.id] || service.minQuantity;
      return sum + (service.basePrice * quantity);
    }, 0);
  };

  const totalAmount = calculateTotal();
  const upfrontAmount = Math.round(totalAmount * 0.5);

  useEffect(() => {
    if (isOpen) {
      const scrollY = window.scrollY;
      document.documentElement.classList.add('modal-open');
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.left = '0';
      document.body.style.right = '0';
      document.body.style.overflow = 'hidden';
      (window as unknown as Record<string, unknown>)._previousScrollY = scrollY;
    } else {
      const scrollY = (window as unknown as Record<string, unknown>)._previousScrollY as number || 0;
      document.documentElement.classList.remove('modal-open');
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.left = '';
      document.body.style.right = '';
      document.body.style.overflow = '';
      window.scrollTo(0, scrollY);
    }
    return () => {
      document.documentElement.classList.remove('modal-open');
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.left = '';
      document.body.style.right = '';
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) {
      setSelectedServices(new Set());
      setServiceQuantities({});
      setAgreedToTerms(false);
      setStep(1);
      setFormData({ name: '', email: '', message: '' });
      setFormErrors({});
      setPaymentStatus('idle');
    }
  }, [isOpen]);

  const toggleService = (id: string) => {
    setSelectedServices(prev => {
      const newSet = new Set(prev);
      const service = SERVICES.find(s => s.id === id);
      if (newSet.has(id)) {
        newSet.delete(id);
        const newQuantities = { ...serviceQuantities };
        delete newQuantities[id];
        setServiceQuantities(newQuantities);
      } else {
        newSet.add(id);
        setServiceQuantities(prev => ({ ...prev, [id]: service?.minQuantity || 1 }));
      }
      return newSet;
    });
  };

  const updateQuantity = (id: string, delta: number) => {
    const service = SERVICES.find(s => s.id === id);
    if (!service) return;

    const current = serviceQuantities[id] || service.minQuantity;
    const newQuantity = current + delta;

    if (newQuantity >= service.minQuantity && newQuantity <= service.maxQuantity) {
      setServiceQuantities(prev => ({ ...prev, [id]: newQuantity }));
    }
  };

  const getServicePrice = (service: Service) => {
    const quantity = serviceQuantities[service.id] || service.minQuantity;
    return service.basePrice * quantity;
  };

  const getQuantityLabel = (service: Service) => {
    if (service.id === 'social-posts') return 'posts';
    if (service.id === 'maintenance') return 'months';
    if (service.id.includes('website')) return 'pages';
    return 'units';
  };

  const validateEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const validateForm = (): boolean => {
    const errors: FormErrors = {};
    if (!formData.name.trim()) errors.name = 'Name is required';
    if (!formData.email.trim()) errors.email = 'Email is required';
    else if (!validateEmail(formData.email)) errors.email = 'Please enter a valid email';
    if (!formData.message.trim()) errors.message = 'Message is required';
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

  const handleContinue = () => {
    if (selectedServices.size > 0) {
      setStep(2);
    }
  };

  const handleBack = () => setStep(1);

  const handlePayment = () => {
    if (validateForm() && agreedToTerms) {
      setPaymentStatus('processing');
    }
  };

  const handleClose = () => {
    if (paymentStatus !== 'processing') {
      onClose();
    }
  };

  const renderAmountSection = () => (
    <div className="bg-white/10 border-t border-white/10 p-4 space-y-2">
      <div className="flex items-center justify-between text-sm">
        <span className="text-muted">Total</span>
        <span className="font-bold text-white">₹{totalAmount.toLocaleString()}</span>
      </div>
      <div className="flex items-center justify-between text-sm">
        <span className="text-muted">Upfront (50%)</span>
        <span className="font-bold text-green-400">₹{upfrontAmount.toLocaleString()}</span>
      </div>
      <p className="text-[10px] text-muted/70 text-center">Pay to start working</p>
    </div>
  );

  const renderServiceItem = (service: Service) => {
    const isSelected = selectedServices.has(service.id);
    const quantity = serviceQuantities[service.id] || service.minQuantity;

    return (
      <div
        key={service.id}
        onClick={() => toggleService(service.id)}
        className={`p-3 rounded-lg border cursor-pointer transition-all ${
          isSelected
            ? 'bg-white/10 border-white/30'
            : 'bg-white/5 border-white/10 hover:border-white/20'
        }`}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className={`w-4 h-4 rounded border flex items-center justify-center ${
              isSelected
                ? 'bg-white border-white'
                : 'border-white/30'
            }`}>
              {isSelected && <Check className="w-2.5 h-2.5 text-black" />}
            </div>
            <div>
              <span className="text-sm font-medium">{service.name}</span>
              <span className="text-xs text-muted block">{service.description}</span>
            </div>
          </div>
          <div className="text-right">
            {service.hasQuantity && isSelected ? (
              <div className="flex items-center gap-2">
                <button
                  onClick={(e) => { e.stopPropagation(); updateQuantity(service.id, -service.quantityStep); }}
                  disabled={quantity <= service.minQuantity}
                  className="w-6 h-6 rounded bg-white/10 hover:bg-white/20 flex items-center justify-center disabled:opacity-30"
                >
                  <Minus className="w-3 h-3" />
                </button>
                <span className="text-sm font-bold w-12 text-center">
                  {quantity} {getQuantityLabel(service).slice(0, 1)}
                </span>
                <button
                  onClick={(e) => { e.stopPropagation(); updateQuantity(service.id, service.quantityStep); }}
                  disabled={quantity >= service.maxQuantity}
                  className="w-6 h-6 rounded bg-white/10 hover:bg-white/20 flex items-center justify-center disabled:opacity-30"
                >
                  <Plus className="w-3 h-3" />
                </button>
              </div>
            ) : (
              <span className="text-sm font-bold">₹{service.basePrice.toLocaleString()}</span>
            )}
            {service.hasQuantity && isSelected && (
              <span className="text-xs text-muted block mt-1">₹{getServicePrice(service).toLocaleString()} total</span>
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            onClick={() => paymentStatus !== 'processing' && onClose()}
          />
          
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="relative ml-auto w-full max-w-md h-full bg-[#0a0a0a] border-l border-white/10 flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between p-4 border-b border-white/10">
              <div className="flex items-center gap-2">
                {step === 2 && paymentStatus !== 'processing' && paymentStatus !== 'success' && (
                  <button onClick={handleBack} className="p-1 -ml-1 text-muted hover:text-white transition-colors">
                    <ArrowLeft className="w-4 h-4" />
                  </button>
                )}
                <div className="flex items-center gap-2">
                  <div className={`flex items-center justify-center w-6 h-6 rounded-full text-xs font-bold ${
                    paymentStatus === 'success' || step > 1 
                      ? 'bg-green-500 text-black' 
                      : step >= 1 ? 'bg-white text-black' : 'bg-white/10 text-white/40'
                  }`}>
                    {paymentStatus === 'success' || step > 1 ? <Check className="w-3.5 h-3.5" /> : 1}
                  </div>
                  <div className={`flex items-center justify-center w-6 h-6 rounded-full text-xs font-bold ${
                    paymentStatus === 'success' ? 'bg-green-500 text-black' : step >= 2 ? 'bg-white text-black' : 'bg-white/10 text-white/40'
                  }`}>
                    {paymentStatus === 'success' ? <Check className="w-3.5 h-3.5" /> : 2}
                  </div>
                </div>
                <h2 className="text-base font-semibold">
                  {paymentStatus === 'processing' ? 'Processing...' : 
                   paymentStatus === 'success' ? 'Done!' : 
                   step === 1 ? 'Select Services' : 'Your Details'}
                </h2>
              </div>
              <button onClick={handleClose} className="p-1.5 text-muted hover:text-white transition-colors">
                <X className="w-4 h-4" />
              </button>
            </div>

            <AnimatePresence mode="wait">
              {paymentStatus === 'processing' ? (
                <motion.div
                  key="processing"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex-1 flex flex-col items-center justify-center p-4"
                >
                  <Loader2 className="w-10 h-10 text-white animate-spin mb-4" />
                  <p className="text-sm text-muted text-center">Processing your request...</p>
                </motion.div>
              ) : paymentStatus === 'success' ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex-1 flex flex-col items-center justify-center p-4"
                >
                  <div className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center mb-4">
                    <CheckCircle2 className="w-8 h-8 text-green-500" />
                  </div>
                  <p className="text-lg font-bold text-white mb-2">Request Submitted!</p>
                  <p className="text-sm text-muted text-center mb-4">
                    We&apos;ll get back to you within 24 hours with your custom quote.
                  </p>
                  <Button variant="secondary" onClick={handleClose} className="!py-2 text-xs">
                    Close
                  </Button>
                </motion.div>
              ) : step === 1 ? (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="flex-1 flex flex-col"
                >
                  <div className="flex-1 p-4 overflow-y-auto space-y-2">
                    {SERVICES.map(renderServiceItem)}
                  </div>
                  {renderAmountSection()}
                </motion.div>
              ) : (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="flex-1 flex flex-col"
                >
                  <div className="flex-1 p-4 overflow-y-auto">
                    <div className="bg-white/5 rounded-lg border border-white/10 p-3 mb-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs text-muted">Selected Services</span>
                        <span className="text-xs font-bold">{selectedServices.size} items</span>
                      </div>
                      <div className="space-y-1 max-h-40 overflow-y-auto">
                        {SERVICES.filter(s => selectedServices.has(s.id)).map(s => (
                          <div key={s.id} className="flex items-center justify-between text-xs">
                            <span className="text-white/70">
                              {s.name}
                              {s.hasQuantity && ` (${serviceQuantities[s.id] || s.minQuantity} ${getQuantityLabel(s).slice(0, 1)})`}
                            </span>
                            <span className="text-white/70">₹{getServicePrice(s).toLocaleString()}</span>
                          </div>
                        ))}
                      </div>
                      <div className="border-t border-white/10 mt-2 pt-2 flex items-center justify-between">
                        <span className="text-sm font-medium">Total</span>
                        <span className="text-sm font-bold">₹{totalAmount.toLocaleString()}</span>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <label className="text-[10px] font-medium tracking-widest text-muted uppercase ml-1">Full Name</label>
                        <input 
                          name="name"
                          type="text" 
                          placeholder="John Doe"
                          value={formData.name}
                          onChange={handleChange}
                          className={`w-full bg-white/5 border rounded-sm px-4 py-3 text-sm mt-1 focus:outline-none transition-colors ${
                            formErrors.name ? 'border-red-500' : 'border-white/10 focus:border-white/30'
                          }`}
                        />
                        {formErrors.name && (
                          <span className="text-red-500 text-[10px] flex items-center gap-1 mt-1">
                            <AlertCircle className="w-3 h-3" />
                            {formErrors.name}
                          </span>
                        )}
                      </div>

                      <div>
                        <label className="text-[10px] font-medium tracking-widest text-muted uppercase ml-1">Email Address</label>
                        <input 
                          name="email"
                          type="email" 
                          placeholder="john@example.com"
                          value={formData.email}
                          onChange={handleChange}
                          className={`w-full bg-white/5 border rounded-sm px-4 py-3 text-sm mt-1 focus:outline-none transition-colors ${
                            formErrors.email ? 'border-red-500' : 'border-white/10 focus:border-white/30'
                          }`}
                        />
                        {formErrors.email && (
                          <span className="text-red-500 text-[10px] flex items-center gap-1 mt-1">
                            <AlertCircle className="w-3 h-3" />
                            {formErrors.email}
                          </span>
                        )}
                      </div>

                      <div>
                        <label className="text-[10px] font-medium tracking-widest text-muted uppercase ml-1">Project Details</label>
                        <textarea 
                          name="message"
                          rows={3}
                          placeholder="Tell us about your project requirements..."
                          value={formData.message}
                          onChange={handleChange}
                          className={`w-full bg-white/5 border rounded-sm px-4 py-3 text-sm mt-1 focus:outline-none transition-colors resize-none ${
                            formErrors.message ? 'border-red-500' : 'border-white/10 focus:border-white/30'
                          }`}
                        />
                        {formErrors.message && (
                          <span className="text-red-500 text-[10px] flex items-center gap-1 mt-1">
                            <AlertCircle className="w-3 h-3" />
                            {formErrors.message}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  {renderAmountSection()}
                </motion.div>
              )}
            </AnimatePresence>

            <div className="p-4 border-t border-white/10 space-y-3">
              {step === 1 ? (
                <Button
                  variant="primary"
                  className="w-full !py-3 text-xs"
                  onClick={handleContinue}
                  disabled={selectedServices.size === 0}
                >
                  Continue ({selectedServices.size} selected)
                </Button>
              ) : (
                <>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <div 
                      className={`w-4 h-4 border rounded flex items-center justify-center transition-colors ${
                        agreedToTerms ? 'bg-white border-white' : 'border-white/30 hover:border-white/50'
                      }`}
                      onClick={() => setAgreedToTerms(!agreedToTerms)}
                    >
                      {agreedToTerms && <Check className="w-2.5 h-2.5 text-black" />}
                    </div>
                    <span className="text-xs text-muted" onClick={() => setAgreedToTerms(!agreedToTerms)}>
                      I agree to pay upfront to start working
                    </span>
                  </label>

                  <Button
                    variant="primary"
                    className="w-full !py-3 text-xs"
                    onClick={handlePayment}
                    disabled={!agreedToTerms}
                  >
                    Submit Request
                  </Button>
                </>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
