import { useState } from 'react';
import { Pitch } from './Form';
import { form } from '../data/profile';

// The hero's tactics board: pick a stage and the board shows that part of the story.
// It opens on the latest stage, which is where I am now.
export default function FormBoard() {
  const [active, setActive] = useState(form.length - 1);
  const stage = form[active];
  return (
    <aside className="hero__board" aria-labelledby="hero-form-title">
      <p className="hero__board-tab">Form</p>
      <h2 id="hero-form-title" className="hero__board-title">Reactive to proactive</h2>
      <Pitch active={active} />
      <ol className="hero__board-list">
        {form.map((item, i) => (
          <li key={item.title} className={i === form.length - 1 ? 'is-now' : undefined}>
            <button type="button" aria-pressed={i === active} onClick={() => setActive(i)}>
              <span className="hero__board-num" aria-hidden="true">{i + 1}</span>
              <span className="hero__board-stage">{item.title}</span>
              <span className="hero__board-when">{item.where}</span>
            </button>
          </li>
        ))}
      </ol>
      <p className="hero__board-story" aria-live="polite">
        <span className="hero__board-period">{stage.period}</span> {stage.text}
      </p>
    </aside>
  );
}
