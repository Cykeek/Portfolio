'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Check, AlertCircle, ArrowLeft, Loader2, CheckCircle2 } from 'lucide-react';
import Button from '@/components/ui/Button';

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

interface PrePaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (formData: FormData, onPaymentSuccess: () => void, onPaymentError: () => void, onPaymentCancel: () => void) => void;
  planName: string;
  totalAmount: number;
  upfrontAmount: number;
}

export default function PrePaymentModal({
  isOpen,
  onClose,
  onConfirm,
  planName,
  totalAmount,
  upfrontAmount,
}: PrePaymentModalProps) {
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({ name: '', email: '', message: '' });
  const [formErrors, setFormErrors] = useState<FormErrors>({});
  const [paymentStatus, setPaymentStatus] = useState<PaymentStatus>('idle');

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
      setAgreedToTerms(false);
      setStep(1);
      setFormData({ name: '', email: '', message: '' });
      setFormErrors({});
      setPaymentStatus('idle');
    }
  }, [isOpen]);

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

  const handleContinue = () => {
    setStep(2);
  };

  const handleBack = () => {
    setStep(1);
  };

  const handlePayment = () => {
    if (validateForm() && agreedToTerms) {
      setPaymentStatus('processing');

      onConfirm(
        formData,
        () => setPaymentStatus('success'),
        () => {
          setPaymentStatus('error');
          setStep(2);
        },
        () => {
          setPaymentStatus('idle');
          setStep(2);
        }
      );
    }
  };

  const handleClose = () => {
    if (paymentStatus !== 'processing') {
      onClose();
    }
  };

  const resetModal = () => {
    setPaymentStatus('idle');
    setStep(1);
    setFormData({ name: '', email: '', message: '' });
    setFormErrors({});
    setAgreedToTerms(false);
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
            onClick={() => {
              if (paymentStatus !== 'processing') {
                onClose();
              }
            }}
          />
          
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            data-modal-content
            className="relative ml-auto w-full max-w-sm h-full bg-[#0a0a0a] border-l border-white/10 flex flex-col"
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
                      : step >= 1 
                        ? 'bg-white text-black' 
                        : 'bg-white/10 text-white/40'
                  }`}>
                    {paymentStatus === 'success' || step > 1 ? <Check className="w-3.5 h-3.5" /> : 1}
                  </div>
                  <div className={`flex items-center justify-center w-6 h-6 rounded-full text-xs font-bold ${
                    paymentStatus === 'success'
                      ? 'bg-green-500 text-black'
                      : step > 2 
                        ? 'bg-green-500 text-black' 
                        : step >= 2 
                          ? 'bg-white text-black' 
                          : 'bg-white/10 text-white/40'
                  }`}>
                    {paymentStatus === 'success' ? <Check className="w-3.5 h-3.5" /> : step > 2 ? <Check className="w-3.5 h-3.5" /> : 2}
                  </div>
                </div>
                <h2 className="text-base font-semibold">
                  {paymentStatus === 'processing' ? 'Processing...' : paymentStatus === 'success' ? 'Payment Done!' : step === 1 ? 'Checkout' : step > 1 ? 'Complete Payment' : 'Your Details'}
                </h2>
              </div>
              <button
                onClick={() => {
                  if (paymentStatus === 'processing' || paymentStatus === 'error') {
                    setPaymentStatus('idle');
                    setStep(2);
                  } else {
                    onClose();
                  }
                }}
                className={`p-1.5 text-muted hover:text-white transition-colors ${paymentStatus === 'success' ? 'pointer-events-none opacity-50' : ''}`}
              >
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
                  <p className="text-sm text-muted text-center">Processing your payment...</p>
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
                  <p className="text-lg font-bold text-white mb-2">Payment Successful!</p>
                  <p className="text-sm text-muted text-center mb-4">
                    ₹{upfrontAmount.toLocaleString()} received.<br />
                    Remaining ₹{(totalAmount - upfrontAmount).toLocaleString()} due before delivery.
                  </p>
                  <p className="text-sm text-white/70 text-center mb-4">
                    Please check your email for the invoice.
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
                  data-lenis-prevent
                  className="flex-1 p-4 overflow-y-auto"
                  onWheel={(e) => e.stopPropagation()}
                >
                  <div className="mb-4">
                    <span className="text-[10px] font-medium tracking-widest text-muted uppercase">Selected Plan</span>
                  </div>
                  
                  <div className="bg-white/5 rounded-lg border border-white/10 p-3 mb-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">{planName}</span>
                      <span className="text-sm font-bold">₹{totalAmount.toLocaleString()}</span>
                    </div>
                  </div>

                  <div className="space-y-3 mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-5 h-5 rounded-full bg-green-500/20 flex items-center justify-center">
                        <Check className="w-3 h-3 text-green-500" />
                      </div>
                      <span className="text-xs text-muted">Contact within 24 hours</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-5 h-5 rounded-full bg-green-500/20 flex items-center justify-center">
                        <Check className="w-3 h-3 text-green-500" />
                      </div>
                      <span className="text-xs text-muted">Project starts immediately</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-5 h-5 rounded-full bg-green-500/20 flex items-center justify-center">
                        <Check className="w-3 h-3 text-green-500" />
                      </div>
                      <span className="text-xs text-muted">Balance due before delivery</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-xs mb-2">
                    <span className="text-muted">Due Now</span>
                    <span className="text-green-400 font-bold">₹{upfrontAmount.toLocaleString()}</span>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  data-lenis-prevent
                  className="flex-1 p-4 overflow-y-auto"
                  onWheel={(e) => e.stopPropagation()}
                >
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
                        placeholder="Tell me about your project..."
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
                </motion.div>
              )}
            </AnimatePresence>

            <div className="p-4 border-t border-white/10 space-y-3">
              {step === 1 ? (
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
                      I agree to the terms
                    </span>
                  </label>

                  <Button
                    variant="primary"
                    className="w-full !py-3 text-xs"
                    onClick={handleContinue}
                    disabled={!agreedToTerms}
                  >
                    Continue
                  </Button>
                </>
              ) : (
                <>
                  <div className="flex items-center justify-between text-xs mb-2">
                    <span className="text-muted">Amount to Pay</span>
                    <span className="text-green-400 font-bold">₹{upfrontAmount.toLocaleString()}</span>
                  </div>

                  <Button
                    variant="primary"
                    className="w-full !py-3 text-xs"
                    onClick={handlePayment}
                    icon="arrow"
                  >
                    Pay ₹{upfrontAmount.toLocaleString()}
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
