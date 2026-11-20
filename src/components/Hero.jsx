import { PlayerCard, ZimFlag } from './Card';
import { MdSportsCricket } from 'react-icons/md';
import { FaFileDownload } from 'react-icons/fa';
import { modules, profile } from '../data/profile';
import crest from '../assets/arsenal-crest.svg';


export default function Hero({ entrance = false, waiting = false, returning = false }) {
  return (
    <section className={`hero${entrance ? ' hero--entrance' : ''}${waiting ? ' hero--waiting' : ''}${returning ? ' hero--returning' : ''}`} id="top">
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
            <a className="button" href={profile.cv} download>
              <FaFileDownload aria-hidden="true" /> Download CV
            </a>
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

      {/* What I'm drawn to and open to, ahead of any one project. */}
      <dl className="statbar statbar--words">
        <div>
          <dt>Most interested in</dt>
          <dd>Analysing data</dd>
        </div>
        <div>
          <dt>Also into</dt>
          <dd>Deep learning</dd>
        </div>
        <div>
          <dt>What I like doing</dt>
          <dd>Raw data → meaning</dd>
        </div>
        <div>
          <dt>Open to</dt>
          <dd>DS · DL · Quant</dd>
        </div>
      </dl>
    </section>
  );
}
