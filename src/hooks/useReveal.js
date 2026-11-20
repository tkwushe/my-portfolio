import { useEffect, useRef } from 'react';

// Heads already wiped in during this visit; coming back to the page shows them straight away.
const seen = new Set();

// Adds `is-in` the first time the element scrolls into view, which starts its entrance animation.
// Without IntersectionObserver the element simply stays in its normal, visible state.
export function useReveal(key) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver !== 'function') return undefined;
    if (key && seen.has(key)) {
      el.classList.add('is-in', 'is-instant');
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          el.classList.add('is-in');
          if (key) seen.add(key);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [key]);

  return ref;
}
