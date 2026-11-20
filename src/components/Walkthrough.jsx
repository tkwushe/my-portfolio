import { useState } from 'react';
import { FaExpand } from 'react-icons/fa';

// A step-through of screenshots, like flicking through match highlights.
// The season's text and the step buttons sit on one side, the current shot on the other.
export default function Walkthrough({ title, shots, children }) {
  const [step, setStep] = useState(0);
  const shot = shots[step];
  return (
    <div className="walkthrough">
      <div className="walkthrough__side">
        {children}
        <div className="walkthrough__steps" role="group" aria-label={`${title}: choose a screenshot`}>
          {shots.map((s, i) => (
            <button
              key={s.caption}
              type="button"
              className="walkthrough__step"
              aria-pressed={i === step}
              onClick={() => setStep(i)}
            >
              <img loading="lazy" width="1280" height="800" src={s.src} alt="" />
              <span className="visually-hidden">{s.caption}</span>
            </button>
          ))}
        </div>
      </div>
      <figure className="walkthrough__figure">
        <a className="walkthrough__frame" href={shot.src} target="_blank" rel="noopener noreferrer">
          <img loading="lazy" width="1280" height="800" src={shot.src} alt={shot.alt} />
          <span className="walkthrough__expand">
            <FaExpand aria-hidden="true" /> Full size<span className="visually-hidden"> (opens in a new tab)</span>
          </span>
        </a>
        <figcaption className="walkthrough__caption" aria-live="polite">
          <span className="walkthrough__count">{step + 1} / {shots.length}</span> {shot.caption}
        </figcaption>
      </figure>
    </div>
  );
}
