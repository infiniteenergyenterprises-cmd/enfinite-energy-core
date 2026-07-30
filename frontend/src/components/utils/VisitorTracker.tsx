'use client';

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';

export function VisitorTracker() {
  const pathname = usePathname();
  const hasTrackedSession = useRef(false);

  useEffect(() => {
    // Only track once per session to avoid spamming the database on every page navigation
    if (hasTrackedSession.current) return;

    const trackVisit = async () => {
      try {
        await fetch((process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api') + '/visitors/track', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            path: pathname || '/',
            userAgent: navigator.userAgent
          }),
        });
        hasTrackedSession.current = true;
      } catch (error) {
        console.error('Failed to track visitor:', error);
      }
    };

    // Small delay to ensure it doesn't block critical rendering path
    const timeout = setTimeout(trackVisit, 2000);
    return () => clearTimeout(timeout);
  }, []);

  return null; // Silent component
}
