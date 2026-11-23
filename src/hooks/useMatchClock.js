import { useEffect, useState } from 'react';

// How far down the page you are, as a match minute: kick-off at the top, 90 at the bottom.
export function minuteFor(scrollTop, scrollable) {
  if (scrollable <= 0) return 0;
  return Math.max(0, Math.min(90, Math.round((scrollTop / scrollable) * 90)));
}

export function useMatchClock() {
  const [minute, setMinute] = useState(0);
  useEffect(() => {
    let frame = 0;
    const read = () => {
      frame = 0;
      const root = document.documentElement;
      setMinute(minuteFor(window.scrollY, root.scrollHeight - window.innerHeight));
    };
    // One read per frame at most, however fast the scroll events arrive.
    const onScroll = () => { if (!frame) frame = requestAnimationFrame(read); };
    read();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);
  return minute;
}
