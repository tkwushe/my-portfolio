import SectionHead from './SectionHead';
import { form } from '../data/profile';

// The pitch is 100 by 46 units. Attack runs left to right.
const W = 100;
const H = 46;
const MID = H / 2;

// Each stage sits a little higher or lower than the last so the run reads as a path, not a row.
const LANES = [30, 17, 29, 16];

// Drawn once, in the hero. The section further down carries the same stages in full.
export function Pitch() {
  const points = form.map((stage, i) => ({ x: stage.x, y: LANES[i % LANES.length] }));
  const path = points.map((p, i) => `${i ? 'L' : 'M'}${p.x} ${p.y}`).join(' ');
  const summary = form.map((stage, i) => `${i + 1}, ${stage.title}`).join('; ');
  return (
    <svg
      className="pitch"
      viewBox={`-1 -1 ${W + 2} ${H + 2}`}
      role="img"
      aria-label={`A football pitch with four positions moving from my own goal to the other end: ${summary}.`}
    >
      <defs>
        <marker id="pitch-arrow" viewBox="0 0 6 6" refX="5" refY="3" markerWidth="5" markerHeight="5" orient="auto">
          <path d="M0 0 L6 3 L0 6 Z" className="pitch__arrowhead" />
        </marker>
      </defs>
      <rect className="pitch__grass" x="0" y="0" width={W} height={H} rx="0.6" />
      {[1, 3, 5, 7].map((band) => (
        <rect key={band} className="pitch__stripe" x={band * 12.5} y="0" width="12.5" height={H} />
      ))}
      <g className="pitch__lines">
        <rect x="0" y="0" width={W} height={H} rx="0.6" />
        <path d={`M${W / 2} 0 V${H}`} />
        <circle cx={W / 2} cy={MID} r="6" />
        <rect x="0" y={MID - 12} width="13" height="24" />
        <rect x="0" y={MID - 5.5} width="4.5" height="11" />
        <rect x={W - 13} y={MID - 12} width="13" height="24" />
        <rect x={W - 4.5} y={MID - 5.5} width="4.5" height="11" />
      </g>
      <text className="pitch__end" x="2" y={H - 2.4}>Reactive</text>
      <text className="pitch__end" x={W - 2} y={H - 2.4} textAnchor="end">Proactive</text>
      <path className="pitch__run" d={path} markerEnd="url(#pitch-arrow)" />
      {points.map((p, i) => (
        <g key={form[i].title} className={`pitch__marker${i === points.length - 1 ? ' pitch__marker--now' : ''}`}>
          <circle cx={p.x} cy={p.y} r="3.6" />
          <text x={p.x} y={p.y + 1.5} textAnchor="middle">{i + 1}</text>
        </g>
      ))}
    </svg>
  );
}

export default function Form() {
  return (
    <section className="section" id="form" aria-labelledby="form-title">
      <SectionHead id="form-title" tab="Form" title="Onto the Front Foot">
        How the way I work has changed. I used to react to things after they happened, and now I try to get ahead of them.
      </SectionHead>

      <div className="frontfoot" data-reveal>
        <ol className="frontfoot__stages">
          {form.map((stage, i) => (
            <li key={stage.title} className={i === form.length - 1 ? 'is-now' : undefined}>
              <span className="frontfoot__num" aria-hidden="true">{i + 1}</span>
              <p className="frontfoot__when">{stage.period} · {stage.where}</p>
              <h3>{stage.title}</h3>
              <p>{stage.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
