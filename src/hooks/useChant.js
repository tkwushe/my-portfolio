import { useEffect, useState } from 'react';

// Type the word anywhere on the page (not in a form field) and it fires once.
export function useChant(word, ms = 2600) {
  const [on, setOn] = useState(false);
  useEffect(() => {
    let typed = '';
    let timer;
    const onKey = (event) => {
      const el = event.target;
      const typing = el instanceof HTMLElement && (el.isContentEditable || ['INPUT', 'TEXTAREA', 'SELECT'].includes(el.tagName));
      if (typing || event.key.length !== 1) return;
      typed = (typed + event.key.toLowerCase()).slice(-word.length);
      if (typed !== word) return;
      typed = '';
      setOn(true);
      clearTimeout(timer);
      timer = setTimeout(() => setOn(false), ms);
    };
    window.addEventListener('keydown', onKey);
    return () => {
      clearTimeout(timer);
      window.removeEventListener('keydown', onKey);
    };
  }, [word, ms]);
  return on;
}
