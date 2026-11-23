// A burst of red and white ticker tape when "coyg" is typed. Decorative: the status line
// tells screen reader users what happened, and reduced motion gets the line without the tape.
const PIECES = Array.from({ length: 36 }, (_, i) => ({
  left: (i * 37) % 100,
  delay: (i % 9) * 60,
  turn: (i * 47) % 360,
  red: i % 3 !== 0,
}));

export default function Chant() {
  return (
    <div className="chant">
      <p className="chant__line" role="status">Come on you Gunners!</p>
      <div className="chant__tape" aria-hidden="true">
        {PIECES.map((piece, i) => (
          <span
            key={i}
            className={piece.red ? 'is-red' : undefined}
            style={{ left: `${piece.left}%`, animationDelay: `${piece.delay}ms`, '--turn': `${piece.turn}deg` }}
          />
        ))}
      </div>
    </div>
  );
}
