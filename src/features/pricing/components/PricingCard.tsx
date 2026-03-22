'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import Button from '@/components/ui/Button';
import { SPRING_WEIGHTED } from '@/lib/motion';
import { useRazorpay } from '@/hooks/useRazorpay';
import PrePaymentModal from './PrePaymentModal';

const WEB3FORMS_ACCESS_KEY = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY || '';
const WEB3FORMS_SUBMIT_URL = 'https://api.web3forms.com/submit';

async function notifyPaymentEmail(params: {
  title: string;
  formData: LeadFormData;
  amountInRs: number;
  paymentId: string;
}): Promise<void> {
  if (!WEB3FORMS_ACCESS_KEY) return;

  const { title, formData, amountInRs, paymentId } = params;
  const response = await fetch(WEB3FORMS_SUBMIT_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify({
      access_key: WEB3FORMS_ACCESS_KEY,
      subject: `💰 Payment Received - ${title} - ₹${amountInRs}`,
      from_name: formData.name,
      email: formData.email,
      message: `${formData.message}\n\n---\nService: ${title}\nAmount Paid: ₹${amountInRs}\nPayment ID: ${paymentId}\nStatus: Payment Successful`,
      botcheck: '',
    }),
  });

  const raw = await response.text();
  try {
    const data = JSON.parse(raw) as { success?: boolean; message?: string };
    if (!data.success) {
      console.error('Web3Forms payment notify:', data.message || raw.slice(0, 200));
    }
  } catch {
    console.error('Web3Forms payment notify: non-JSON response', response.status);
  }
}

interface PricingCardProps {
  title: string;
  price: string;
  amount: number;
  description: string;
  features: string[];
  isPopular?: boolean;
  ctaText?: string;
}

interface LeadFormData {
  name: string;
  email: string;
  message: string;
}

export default function PricingCard({
  title,
  price,
  amount,
  description,
  features,
  isPopular = false,
  ctaText = "Get Started"
}: PricingCardProps) {
  const [isProcessing, setIsProcessing] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const { openCheckout, onDismiss } = useRazorpay();

  const upfrontAmount = Math.round(amount * 0.5);

  const handleProceedToPayment = async (
    formData: LeadFormData,
    onPaymentSuccess: () => void,
    onPaymentError: () => void,
    onPaymentCancel: () => void
  ) => {
    if (isProcessing) return;
    
    setIsProcessing(true);

    onDismiss(() => {
      setIsProcessing(false);
      onPaymentCancel();
    });

    try {
      const orderResponse = await fetch('/api/razorpay/order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          planName: title,
          isPartialPayment: true,
        }),
      });

      const orderData = await orderResponse.json();

      if (!orderResponse.ok || orderData.error) {
        throw new Error(orderData.error || 'Failed to create order');
      }

      await openCheckout({
        key: orderData.keyId,
        amount: orderData.amount,
        currency: orderData.currency,
        name: 'Cykeek Design',
        description: `${title} - 50% Upfront (₹${orderData.amountInRs.toLocaleString()})`,
        order_id: orderData.orderId,
        theme: {
          color: '#ffffff',
        },
        handler: async (response) => {
          const verifyResponse = await fetch('/api/razorpay/verify', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            }),
          });

          let verifyData: { verified?: boolean; error?: string };
          try {
            verifyData = (await verifyResponse.json()) as typeof verifyData;
          } catch {
            onPaymentError();
            return;
          }

          if (verifyResponse.ok && verifyData.verified) {
            try {
              await notifyPaymentEmail({
                title,
                formData,
                amountInRs: orderData.amountInRs,
                paymentId: response.razorpay_payment_id,
              });
            } catch (e) {
              console.error('Payment confirmation email failed:', e);
            }
            onPaymentSuccess();
          } else {
            onPaymentError();
          }
        },
      });
    } catch (error) {
      console.error('Payment error:', error);
      onPaymentError();
    } finally {
      setIsProcessing(false);
    }
  };

  const handleButtonClick = () => {
    setShowModal(true);
  };

  return (
    <motion.div
      variants={{
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0, transition: SPRING_WEIGHTED }
      }}
      className={`relative flex flex-col p-8 rounded-md border ${
        isPopular ? 'bg-white/[0.04] border-white/20' : 'bg-white/[0.02] border-white/5'
      } group hover:bg-white/[0.06] transition-all duration-500`}
    >
      {isPopular && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-white text-black text-[10px] font-bold tracking-widest uppercase rounded-full">
          Most Popular
        </div>
      )}

      <div className="mb-8">
        <h3 className="text-[12px] font-medium tracking-[0.3em] text-muted uppercase mb-4">{title}</h3>
        <div className="flex items-baseline gap-1">
          <span className="text-4xl font-bold tracking-tighter">{price}</span>
          <span className="text-muted text-sm">/project</span>
        </div>
        <p className="text-muted text-sm mt-4 leading-relaxed">
          {description}
        </p>
      </div>

      <div className="flex-1 flex flex-col gap-4 mb-8">
        {features.map((feature, index) => (
          <div key={index} className="flex items-start gap-3 text-sm text-white/70">
            <Check className="w-4 h-4 mt-[2px] shrink-0 text-white/40" />
            <span className="leading-snug">{feature}</span>
          </div>
        ))}
      </div>

      <Button 
        variant={isPopular ? "primary" : "secondary"} 
        className="w-full justify-center"
        icon="arrow"
        onClick={handleButtonClick}
      >
        {ctaText}
      </Button>

      <PrePaymentModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onConfirm={handleProceedToPayment}
        planName={title}
        totalAmount={amount}
        upfrontAmount={upfrontAmount}
      />
    </motion.div>
  );
}
