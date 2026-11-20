import { useEffect, useRef, useState } from 'react';

const DURATION_MS = 1100;
const easeOut = (t) => 1 - (1 - t) ** 3;

// Counts the number inside `value` up from zero the first time it scrolls into view,
// keeping any prefix, suffix and decimal places ("0.920", "80.3", "1st"). The final
// value is what renders without JavaScript, without IntersectionObserver, and for
// reduced motion, and screen readers always get the final value.
// `paused` holds the count until something covering the page (the walkout intro) has gone.
export default function CountUp({ value, paused = false }) {
  const text = String(value);
  const match = text.match(/^(\D*)(\d+(?:\.\d+)?)(.*)$/);
  const ref = useRef(null);
  const [shown, setShown] = useState(() => {
    const willAnimate =
      match &&
      typeof IntersectionObserver === 'function' &&
      !window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    if (!willAnimate) return text;
    const [, prefix, number, suffix] = match;
    const places = number.includes('.') ? number.split('.')[1].length : 0;
    return `${prefix}${(0).toFixed(places)}${suffix}`;
  });

  useEffect(() => {
    const el = ref.current;
    if (paused || !match || !el || typeof IntersectionObserver !== 'function') return undefined;
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return undefined;

    const [, prefix, number, suffix] = match;
    const target = Number(number);
    const places = number.includes('.') ? number.split('.')[1].length : 0;
    let frame = 0;

    const run = () => {
      const start = performance.now();
      const step = (now) => {
        const t = Math.min((now - start) / DURATION_MS, 1);
        setShown(`${prefix}${(target * easeOut(t)).toFixed(places)}${suffix}`);
        if (t < 1) frame = requestAnimationFrame(step);
      };
      frame = requestAnimationFrame(step);
    };

    const observer = new IntersectionObserver((entries) => {
      if (entries.some((entry) => entry.isIntersecting)) {
        observer.disconnect();
        run();
      }
    }, { threshold: 0.6 });
    observer.observe(el);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
    // The value is static per mount; re-running on every render would restart the count.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [text, paused]);

  return (
    <>
      <span ref={ref} aria-hidden="true">{shown}</span>
      <span className="visually-hidden">{text}</span>
    </>
  );
}
