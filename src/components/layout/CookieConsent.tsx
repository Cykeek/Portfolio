'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Button from '@/components/ui/Button';

export default function CookieConsent() {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('cookie_consent');
    if (!consent) {
      setShowBanner(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookie_consent', 'accepted');
    setShowBanner(false);
  };

  const handleDecline = () => {
    localStorage.setItem('cookie_consent', 'declined');
    setShowBanner(false);
  };

  return (
    <AnimatePresence>
      {showBanner && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          className="fixed bottom-6 left-6 right-6 md:left-auto md:right-6 md:max-w-md z-50"
        >
          <div className="bg-black/90 backdrop-blur-md border border-white/10 rounded-lg p-6 shadow-2xl">
            <h3 className="text-sm font-bold tracking-wider uppercase text-white mb-2">
              Cookie Preferences
            </h3>
            <p className="text-xs text-muted mb-4 leading-relaxed">
              We use analytics cookies to understand how you use our site. 
              Your data is never sold to third parties.
            </p>
            <div className="flex gap-3">
              <Button 
                variant="secondary" 
                className="flex-1 !py-2.5 text-[10px]"
                onClick={handleDecline}
              >
                Decline
              </Button>
              <Button 
                variant="primary" 
                className="flex-1 !py-2.5 text-[10px]"
                onClick={handleAccept}
              >
                Accept
              </Button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
