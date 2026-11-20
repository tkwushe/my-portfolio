import { useEffect, useRef } from 'react';

// Pointer-tracked 3D tilt. Writes CSS custom properties only, so the card
// styles own the actual transform and the foil sheen position.
export function useTilt(maxDegrees = 9) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof window.matchMedia !== 'function') return undefined;
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return undefined;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;

    let frame = 0;

    const handleMove = (event) => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const rect = el.getBoundingClientRect();
        const x = (event.clientX - rect.left) / rect.width;
        const y = (event.clientY - rect.top) / rect.height;
        el.style.setProperty('--ry', `${(x - 0.5) * 2 * maxDegrees}deg`);
        el.style.setProperty('--rx', `${(0.5 - y) * 2 * maxDegrees}deg`);
        el.style.setProperty('--mx', `${x * 100}%`);
        el.style.setProperty('--my', `${y * 100}%`);
      });
    };

    const handleLeave = () => {
      cancelAnimationFrame(frame);
      ['--rx', '--ry', '--mx', '--my'].forEach((name) => el.style.removeProperty(name));
    };

    el.addEventListener('pointermove', handleMove);
    el.addEventListener('pointerleave', handleLeave);
    return () => {
      cancelAnimationFrame(frame);
      el.removeEventListener('pointermove', handleMove);
      el.removeEventListener('pointerleave', handleLeave);
    };
  }, [maxDegrees]);

  return ref;
}
