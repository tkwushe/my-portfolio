import { useState } from 'react';
import { ticker } from '../data/profile';

// Rolling news bar pinned to the bottom of the screen. The list is rendered twice
// so the loop is seamless; the copy is hidden from assistive tech. The label doubles
// as a pause button, so touch and keyboard users can stop it too.
export default function Ticker() {
  const [paused, setPaused] = useState(false);
  // Nothing moves under reduced motion, so there is no pause control to offer.
  const still = typeof window.matchMedia === 'function' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  return (
    <aside className={`ticker${paused ? ' is-paused' : ''}`} aria-label="Latest">
      {still ? (
        <p className="ticker__label">Latest</p>
      ) : (
      <button type="button" className="ticker__label" aria-pressed={paused} onClick={() => setPaused((p) => !p)}>
        Latest
        <svg className="ticker__state" viewBox="0 0 12 12" aria-hidden="true" focusable="false">
          {paused ? <path d="M3 1.5 10.5 6 3 10.5Z" /> : <path d="M2.5 1.5h2.6v9H2.5zM6.9 1.5h2.6v9H6.9z" />}
        </svg>
        <span className="visually-hidden">: pause ticker</span>
      </button>
      )}
      <div className="ticker__window">
        <div className="ticker__track">
          {[false, true].map((isCopy) => (
            <ul key={String(isCopy)} aria-hidden={isCopy || undefined}>
              {ticker.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          ))}
        </div>
      </div>
    </aside>
  );
}
