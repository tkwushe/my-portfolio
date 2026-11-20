import { PlayerCard, ZimFlag } from './Card';
import CountUp from './CountUp';
import { MdSportsCricket } from 'react-icons/md';
import { modules, profile } from '../data/profile';
import { squad } from '../data/projects';
import crest from '../assets/arsenal-crest.svg';

const keyPlayer = squad[0];

export default function Hero({ entrance = false, waiting = false }) {
  return (
    <section className={`hero${entrance ? ' hero--entrance' : ''}${waiting ? ' hero--waiting' : ''}`} id="top">
      <div className="hero__beam hero__beam--left" aria-hidden="true" />
      <div className="hero__beam hero__beam--right" aria-hidden="true" />

      <div className="hero__inner">
        <div className="hero__copy">
          <p className="live">
            <span className="live__dot" aria-hidden="true" />
            Live · {profile.location}
          </p>
          <h1 className="hero__title" tabIndex={-1}>
            <span className="hero__first">{profile.firstName}</span>
            <span className="hero__last">{profile.lastName}</span>
          </h1>
          <p className="hero__role">
            <span>{profile.role}</span>
            <span>{profile.study}</span>
          </p>
          <p className="hero__tagline">{profile.tagline}</p>
          <div className="hero__actions">
            <a className="button button--primary" href="#squad">View the squad</a>
            <a className="button" href="#contact">Transfer enquiries</a>
          </div>
          <ul className="allegiance">
            <li>
              <ZimFlag className="allegiance__icon" />
              <span>
                <span className="allegiance__label">Nation</span>
                {profile.nation}
              </span>
            </li>
            <li>
              <img className="allegiance__icon allegiance__icon--crest" src={crest} alt="" width="292" height="343" />
              <span>
                <span className="allegiance__label">Supports</span>
                {profile.supports}
              </span>
            </li>
            <li>
              <MdSportsCricket className="allegiance__icon allegiance__icon--cricket" aria-hidden="true" />
              <span>
                <span className="allegiance__label">Cricket · fave {profile.cricketFavourite}</span>
                {profile.cricket}
              </span>
            </li>
          </ul>
        </div>

        <div className="hero__card">
          <div className="hero__cardwrap">
            {/* The club badge pinned to the card, the way a sticker sits on a collected card. */}
            <img className="hero__crest" src={crest} alt="" width="292" height="343" />
            <PlayerCard />
          </div>
          <p className="hero__footnote">
            Ratings are real module marks. OVR is the average across {modules.length} modules.
          </p>
        </div>
      </div>

      <dl className="statbar">
        <div>
          <dt>{keyPlayer.name}, locked-test F1</dt>
          <dd><CountUp value={keyPlayer.stats[0].value} paused={waiting} /></dd>
        </div>
        <div>
          <dt>Degree</dt>
          <dd>1st</dd>
        </div>
        <div>
          <dt>Dataset rows, zero split overlap</dt>
          <dd><CountUp value="1,391" paused={waiting} /></dd>
        </div>
        <div>
          <dt>Synthetic clips, ComfyUI</dt>
          <dd><CountUp value="~10k" paused={waiting} /></dd>
        </div>
      </dl>
    </section>
  );
}
