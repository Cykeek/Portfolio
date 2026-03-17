'use client';

import { useCallback, useRef } from 'react';

interface RazorpayOptions {
  key: string;
  amount: number;
  currency: string;
  name: string;
  description: string;
  order_id: string;
  prefill?: {
    name?: string;
    email?: string;
    contact?: string;
  };
  theme?: {
    color?: string;
  };
  handler?: (response: {
    razorpay_payment_id: string;
    razorpay_order_id: string;
    razorpay_signature: string;
  }) => void;
  modal?: {
    ondismiss?: () => void;
  };
}

interface UseRazorpayReturn {
  openCheckout: (options: RazorpayOptions) => void;
  isLoading: boolean;
  error: string | null;
  onDismiss: (callback: () => void) => void;
}

declare global {
  interface Window {
    Razorpay: new (options: RazorpayOptions) => {
      open: () => void;
      close: () => void;
    };
  }
}

export function useRazorpay(): UseRazorpayReturn {
  const isLoadingRef = useRef(false);
  const errorRef = useRef<string | null>(null);
  const onDismissRef = useRef<(() => void) | null>(null);

  const openCheckout = useCallback(async (options: RazorpayOptions) => {
    if (isLoadingRef.current) return;

    isLoadingRef.current = true;
    errorRef.current = null;

    try {
      if (!window.Razorpay) {
        const script = document.createElement('script');
        script.src = 'https://checkout.razorpay.com/v1/checkout.js';
        script.async = true;
        document.body.appendChild(script);

        await new Promise((resolve, reject) => {
          script.onload = resolve;
          script.onerror = () => reject(new Error('Failed to load Razorpay script'));
        });
      }

      const razorpay = new window.Razorpay({
        ...options,
        handler: options.handler,
        modal: {
          ondismiss: () => {
            isLoadingRef.current = false;
            if (onDismissRef.current) {
              onDismissRef.current();
            }
          },
        },
      });
      razorpay.open();
    } catch (error) {
      errorRef.current = error instanceof Error ? error.message : 'Payment failed';
      console.error('Razorpay error:', error);
      isLoadingRef.current = false;
    }
  }, []);

  const onDismiss = useCallback((callback: () => void) => {
    onDismissRef.current = callback;
  }, []);

  return {
    openCheckout,
    isLoading: isLoadingRef.current,
    error: errorRef.current,
    onDismiss,
  };
}
