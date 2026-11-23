import { ZimFlag } from './Card';
import FormBoard from './FormBoard';
import { MdSportsCricket } from 'react-icons/md';
import { FaFileDownload } from 'react-icons/fa';
import { profile } from '../data/profile';
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
            <span>{profile.heroRole}</span>
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
              <MdSportsCricket className="allegiance__icon allegiance__icon--cricket" aria-hidden="true" />
              <span>
                <span className="allegiance__label">Interests</span>
                Football and Cricket
              </span>
            </li>
          </ul>
        </div>

        <FormBoard />
      </div>

      {/* Where I am now and what I work with; the tagline above says what I'm after. */}
      <dl className="statbar statbar--words">
        <div>
          <dt>Open to</dt>
          <dd>DS · DL · Quant roles</dd>
        </div>
        <div>
          <dt>Studying</dt>
          <dd>MSc at Warwick</dd>
        </div>
        <div>
          <dt>Toolkit</dt>
          <dd>PyTorch · Python · SQL</dd>
        </div>
        <div>
          <dt>Before that</dt>
          <dd>BSc, First Class</dd>
        </div>
      </dl>
    </section>
  );
}
