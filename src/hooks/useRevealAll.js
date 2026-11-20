import { useEffect } from 'react';

// One observer for the whole page: any element with `data-reveal` gets `is-in` the first
// time it scrolls into view, which plays its entrance (see styles/motion.css). Elements are
// only hidden once the `motion-ready` class is on <html>, so the page is complete at rest
// without JavaScript, without IntersectionObserver, and for reduced motion.
export function useRevealAll(routeKey) {
  useEffect(() => {
    if (typeof IntersectionObserver !== 'function') return undefined;
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return undefined;

    const root = document.documentElement;
    const targets = [...document.querySelectorAll('[data-reveal]:not(.is-in)')];
    // Anything already on screen when the page loads shows straight away instead of animating.
    const fold = window.innerHeight;
    targets.forEach((el) => {
      if (el.getBoundingClientRect().top < fold * 0.9) el.classList.add('is-in');
    });
    root.classList.add('motion-ready');

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add('is-in');
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.18, rootMargin: '0px 0px -8% 0px' }
    );
    targets.forEach((el) => {
      if (!el.classList.contains('is-in')) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [routeKey]);
}
