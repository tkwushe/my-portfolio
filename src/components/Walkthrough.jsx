import { useState } from 'react';

// A step-through of screenshots, like flicking through match highlights.
// Every step is a real button; the image and caption change together.
export default function Walkthrough({ title, shots }) {
  const [step, setStep] = useState(0);
  const shot = shots[step];
  return (
    <figure className="walkthrough">
      <div className="walkthrough__frame">
        <img src={shot.src} alt={shot.alt} width="1280" height="800" loading="lazy" />
      </div>
      <figcaption className="walkthrough__caption" aria-live="polite">
        <span className="walkthrough__count">{step + 1} / {shots.length}</span> {shot.caption}
      </figcaption>
      <div className="walkthrough__steps" role="group" aria-label={`${title}: choose a screenshot`}>
        {shots.map((s, i) => (
          <button
            key={s.caption}
            type="button"
            className="walkthrough__step"
            aria-pressed={i === step}
            onClick={() => setStep(i)}
          >
            <img src={s.src} alt="" width="1280" height="800" loading="lazy" />
            <span className="visually-hidden">{s.caption}</span>
          </button>
        ))}
      </div>
    </figure>
  );
}
