import { useTilt } from '../hooks/useTilt';
import CardArt from './CardArt';

// The card silhouette, in objectBoundingBox units so one definition fits every size.
// Rendered once near the root; cards reference it with clip-path: url(#card-shield).
export function CardDefs() {
  return (
    <svg width="0" height="0" aria-hidden="true" focusable="false" style={{ position: 'absolute' }}>
      <defs>
        <clipPath id="card-shield" clipPathUnits="objectBoundingBox">
          <path d="M0.06,0.085 Q0.25,0.085 0.36,0.03 Q0.5,-0.012 0.64,0.03 Q0.75,0.085 0.94,0.085 Q1,0.085 1,0.13 L1,0.8 Q1,0.86 0.93,0.885 L0.56,0.985 Q0.5,1.005 0.44,0.985 L0.07,0.885 Q0,0.86 0,0.8 L0,0.13 Q0,0.085 0.06,0.085 Z" />
        </clipPath>
      </defs>
    </svg>
  );
}

// Simplified Zimbabwe flag: seven stripes, hoist triangle, red star.
export function ZimFlag({ className = 'card__flag' }) {
  const stripes = ['#319208', '#FFD200', '#DE2010', '#000000', '#DE2010', '#FFD200', '#319208'];
  return (
    <svg className={className} viewBox="0 0 42 28" role="img" aria-label="Zimbabwe">
      {stripes.map((fill, i) => (
        <rect key={i} x="0" y={i * 4} width="42" height="4" fill={fill} />
      ))}
      <path d="M0 0 L17 14 L0 28 Z" fill="#fff" stroke="#000" strokeWidth="1" />
      <path d="M6 9.5 l1.3 3.6 h3.8 l-3.1 2.3 1.2 3.7 -3.2 -2.3 -3.2 2.3 1.2 -3.7 -3.1 -2.3 h3.8 z" fill="#DE2010" />
    </svg>
  );
}

// Finish layers shared by every face: print grain, holo foil, pointer glare, light sweep.
function Finish() {
  return (
    <>
      <div className="card__grain" aria-hidden="true" />
      <div className="card__foil" aria-hidden="true" />
      <div className="card__glare" aria-hidden="true" />
      <div className="card__shine" aria-hidden="true" />
    </>
  );
}

// Card shell shared by project cards and in-development cards.
export function Card({ tier = 'gold', rating, ratingLabel, position, crest, art, name, stats, stacked = false, note, foot, className = '' }) {
  const ref = useTilt();
  const front = (
    <>
      <div className="card__edge" aria-hidden="true" />
      <div className="card__face">
        <div className="card__rays" aria-hidden="true" />
        <div className="card__art">{art}</div>
        <div className="card__id">
          <span className="card__rating">{rating}</span>
          <span className="card__rating-label">{ratingLabel}</span>
          {position && <span className="card__position">{position}</span>}
          {crest}
        </div>
        <div className="card__lower">
          <p className="card__name" style={{ '--name-len': Math.max(name.length, 13) }}>{name}</p>
          <dl className={`card__stats${stacked ? ' card__stats--stacked' : ''}`}>
            {stats.map((stat) => (
              <div key={stat.label} className="card__stat" title={stat.title}>
                <dt>{stat.label}</dt>
                <dd>{stat.value}</dd>
              </div>
            ))}
          </dl>
          {note && <p className="card__note">{note}</p>}
          {foot && <p className="card__foot">{foot}</p>}
        </div>
        <Finish />
      </div>
    </>
  );
  return (
    <div ref={ref} className={`card card--${tier} ${className}`.trim()}>
      <div className="card__body">{front}</div>
    </div>
  );
}

export function ProjectCard({ project, className }) {
  return (
    <Card
      tier={project.tier}
      className={className}
      rating={project.headline.value}
      ratingLabel={project.headline.label}
      position={project.position}
      art={<CardArt name={project.icon} />}
      name={project.name}
      stats={project.stats}
      foot={project.tierLabel}
      stacked
    />
  );
}

// Projects still being built: no rating yet, so the card says so.
export function LabCard({ project }) {
  return (
    <Card
      tier="dev"
      rating="?"
      ratingLabel="TBC"
      art={<CardArt name={project.icon} />}
      name={project.name}
      stats={project.stats}
      note={project.cardLine}
      foot="In the lab"
      stacked
    />
  );
}
