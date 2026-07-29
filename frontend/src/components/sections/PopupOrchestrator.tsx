'use client';

import React, { useState, useEffect } from 'react';
import { SuryaGharPopup } from './SuryaGharPopup';
import { SubscriptionPopup } from './SubscriptionPopup';

/**
 * PopupOrchestrator
 * -----------------
 * Sequence on every NEW browser session:
 *   1. Wait 2 seconds → Show SuryaGharPopup
 *   2. User closes SuryaGhar → After 800ms → Show SubscriptionPopup
 *
 * Uses sessionStorage so popups appear once per tab session (not permanently blocked).
 */
export function PopupOrchestrator() {
  const [step, setStep] = useState<'idle' | 'suryaghar' | 'subscription' | 'done'>('idle');

  useEffect(() => {
    // sessionStorage resets every time browser tab is closed — ideal for popups
    const alreadyShown = sessionStorage.getItem('enfinite_popups_shown');
    if (alreadyShown) return;

    const timer = setTimeout(() => {
      setStep('suryaghar');
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const handleSuryaGharClose = () => {
    setStep('idle');
    setTimeout(() => {
      setStep('subscription');
    }, 800);
  };

  const handleSubscriptionClose = () => {
    setStep('done');
    sessionStorage.setItem('enfinite_popups_shown', 'true');
  };

  return (
    <>
      {step === 'suryaghar' && (
        <SuryaGharPopup onClose={handleSuryaGharClose} />
      )}
      <SubscriptionPopup
        show={step === 'subscription'}
        onClose={handleSubscriptionClose}
      />
    </>
  );
}
