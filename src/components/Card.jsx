import { useId, useState } from 'react';
import { useTilt } from '../hooks/useTilt';
import { cardStats, modules, overall, profile } from '../data/profile';
import profileImage from '../assets/profile-cutout.webp';
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

// The face that is turned away stays in the DOM for the flip, so it is taken out
// of the tab order and the accessibility tree. React 18 needs inert as a string; on React 19 switch to `inert: true`.
const hiddenProps = (hidden) => (hidden ? { inert: '', 'aria-hidden': true } : {});

// Card shell shared by the player card, project cards and in-development cards.
// A `back` turns it into a two-sided card; `flipped` says which side faces out.
export function Card({ tier = 'gold', rating, ratingLabel, position, crest, art, name, stats, stacked = false, note, foot, back, flipped = false, id, className = '' }) {
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
  const flipClass = back ? ` card--flippable${flipped ? ' card--flipped' : ''}` : '';
  return (
    <div ref={ref} id={id} className={`card card--${tier}${flipClass} ${className}`.trim()}>
      <div className="card__body">
        {back ? (
          <div className="card__flip">
            <div className="card__side card__side--front" {...hiddenProps(flipped)}>{front}</div>
            <div className="card__side card__side--back" {...hiddenProps(!flipped)}>
              <div className="card__edge" aria-hidden="true" />
              <div className="card__face card__back">
                <div className="card__rays" aria-hidden="true" />
                {back}
                <Finish />
              </div>
            </div>
          </div>
        ) : (
          front
        )}
      </div>
    </div>
  );
}

// Reverse of the player card: only facts already in profile.js.
function PlayerBack() {
  const facts = [
    ['Nation', profile.nation],
    ['Supports', profile.supports],
    ['Cricket', 'AUS & ZIM'],
    ['Fave', profile.cricketFavourite],
    ['Degree', 'First Class'],
  ];
  return (
    <div className="card__back-inner">
      <p className="card__back-name">{profile.firstName} {profile.lastName}</p>
      <dl className="card__facts">
        {facts.map(([label, value]) => (
          <div key={label}>
            <dt>{label}</dt>
            <dd>{value}</dd>
          </div>
        ))}
      </dl>
      <p className="card__back-kicker">Module marks</p>
      <dl className="card__marks">
        {modules.map((m) => (
          <div key={m.code}>
            <dt>
              <abbr title={m.name}>{m.code}</abbr>
            </dt>
            <dd>{m.mark}</dd>
          </div>
        ))}
        <div className="card__marks-ovr">
          <dt>OVR</dt>
          <dd>{overall}</dd>
        </div>
      </dl>
      {/* Where the season is being played now; dropped on small cards, where there's no room. */}
      <p className="card__back-now">
        <span>Now</span> {profile.study} · Warwick
      </p>
    </div>
  );
}

export function PlayerCard() {
  const [flipped, setFlipped] = useState(false);
  const cardId = useId();
  return (
    <>
      <Card
        tier="icon"
        id={cardId}
        className="card--player"
        rating={overall}
        ratingLabel="OVR"
        position={profile.position}
        crest={
          <>
            <ZimFlag />
            <span className="card__club">{profile.club}</span>
          </>
        }
        art={<img src={profileImage} alt={`${profile.firstName} ${profile.lastName}`} width="480" height="490" {...{ fetchpriority: 'high' }} />}
        name={profile.cardName}
        stats={cardStats}
        foot="Season 26/27"
        back={<PlayerBack />}
        flipped={flipped}
      />
      {/* A real button, not a clickable card: keyboard and touch users get the same control. */}
      <button
        type="button"
        className="card-flip"
        aria-controls={cardId}
        aria-pressed={flipped}
        onClick={() => setFlipped((f) => !f)}
      >
        <svg className="card-flip__icon" viewBox="0 0 20 20" aria-hidden="true" focusable="false">
          <path d="M4 8a6 6 0 0 1 11-2.5M16 12a6 6 0 0 1-11 2.5M15.5 2v4h-4M4.5 18v-4h4" />
        </svg>
        Flip card
      </button>
    </>
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
