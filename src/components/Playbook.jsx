import SectionHead from './SectionHead';
import { playbook } from '../data/profile';

// Chalkboard set pieces, one per rule. Circles are my side, crosses the problem, arrows the move.
const O = (cx, cy, key) => <circle key={key} cx={cx} cy={cy} r="5" className="chalk__o" />;
const X = (cx, cy, key) => (
  <path key={key} className="chalk__x" d={`M${cx - 4} ${cy - 4}L${cx + 4} ${cy + 4}M${cx + 4} ${cy - 4}L${cx - 4} ${cy + 4}`} />
);

const PLAYS = {
  // The goal is fixed before anyone shoots.
  lock: (
    <>
      <path className="chalk__line" d="M92 22V58M92 22H104V58H92" />
      {O(26, 40, 'o')}
      <path className="chalk__run" d="M34 40H84" markerEnd="url(#chalk-arrow)" />
      <path className="chalk__line" d="M58 14V66" strokeDasharray="3 4" />
    </>
  ),
  // Play out from the back, pass by pass.
  build: (
    <>
      {O(18, 58, 'a')}{O(44, 30, 'b')}{O(72, 54, 'c')}{O(100, 24, 'd')}
      <path className="chalk__run" d="M23 53L39 35M49 33L67 50M77 50L95 29" markerEnd="url(#chalk-arrow)" />
    </>
  ),
  // One big player's job handed to a small one.
  small: (
    <>
      <circle cx="30" cy="40" r="16" className="chalk__o" />
      <circle cx="94" cy="40" r="7" className="chalk__o chalk__o--solid" />
      <path className="chalk__run" d="M50 40H82" markerEnd="url(#chalk-arrow)" />
    </>
  ),
  // The move goes through the referee before it counts.
  ref: (
    <>
      {O(20, 56, 'a')}
      <rect x="52" y="22" width="16" height="16" className="chalk__ref" />
      <path className="chalk__run" d="M26 52L50 34" markerEnd="url(#chalk-arrow)" />
      <path className="chalk__run" d="M70 30H100" markerEnd="url(#chalk-arrow)" />
      <path className="chalk__line" d="M108 20V40" />
    </>
  ),
  // A long ball home.
  home: (
    <>
      {O(104, 22, 'a')}
      <path className="chalk__run" d="M98 26C70 30 44 44 22 58" markerEnd="url(#chalk-arrow)" />
      <path className="chalk__line" d="M12 66L22 50L32 66Z" />
    </>
  ),
  // The shot that went wide stays on the board.
  miss: (
    <>
      <path className="chalk__line" d="M88 24V56M88 24H102V56H88" />
      {O(22, 44, 'a')}
      <path className="chalk__run" d="M29 42L80 16" markerEnd="url(#chalk-arrow)" />
      {X(84, 12, 'x')}
    </>
  ),
};

export default function Playbook() {
  return (
    <section className="section" id="playbook" aria-labelledby="playbook-title">
      <SectionHead id="playbook-title" tab="Tactics" title="The Playbook">
        The rules I work by, and where you can see each one.
      </SectionHead>

      {/* One arrowhead shared by every drawing. */}
      <svg width="0" height="0" aria-hidden="true" focusable="false" style={{ position: 'absolute' }}>
        <defs>
          <marker id="chalk-arrow" viewBox="0 0 6 6" refX="5" refY="3" markerWidth="6" markerHeight="6" orient="auto">
            <path d="M0 0 L6 3 L0 6 Z" className="chalk__head" />
          </marker>
        </defs>
      </svg>

      <ol className="playbook">
        {playbook.map((rule, i) => (
          <li key={rule.title} className="playbook__rule" data-reveal style={{ '--d': i % 3 }}>
            <svg className="chalk" viewBox="0 0 120 80" aria-hidden="true" focusable="false">
              {PLAYS[rule.play]}
            </svg>
            <div className="playbook__body">
              <p className="playbook__num">Play {String(i + 1).padStart(2, '0')}</p>
              <h3>{rule.title}</h3>
              <p>{rule.text}</p>
              <a className="playbook__proof" href={rule.proof.href}>
                Seen in: {rule.proof.label}
                <span className="visually-hidden"> (for {rule.title})</span>
              </a>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
