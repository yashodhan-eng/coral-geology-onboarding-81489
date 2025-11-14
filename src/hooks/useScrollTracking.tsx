import { useEffect, useRef } from 'react';

export const useScrollTracking = () => {
  const scrollDepthsTracked = useRef<Set<number>>(new Set());

  useEffect(() => {
    const handleScroll = () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollTop = window.scrollY;
      const scrollPercent = Math.round((scrollTop / (documentHeight - windowHeight)) * 100);

      // Track at 25%, 50%, 75%, and 100%
      const milestones = [25, 50, 75, 100];
      
      milestones.forEach((milestone) => {
        if (scrollPercent >= milestone && !scrollDepthsTracked.current.has(milestone)) {
          scrollDepthsTracked.current.add(milestone);
          
          // Track in GA4
          window.dataLayer = window.dataLayer || [];
          window.dataLayer.push({
            event: 'Geology_onboarding_scroll_depth',
            scroll_depth: milestone
          });
          
          // Track in Clarity
          if (window.clarity) {
            window.clarity('event', `Geology_onboarding_scroll_depth_${milestone}`);
          }
          
          console.log(`Scroll depth tracked: ${milestone}%`);
        }
      });
    };

    // Add scroll listener
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    // Check initial position
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
};
