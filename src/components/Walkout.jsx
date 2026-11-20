import { useEffect, useRef } from 'react';
import { ZimFlag } from './Card';
import crest from '../assets/arsenal-crest.svg';
import { overall, profile } from '../data/profile';

const DURATION_MS = 2700;

// Pack-walkout intro: nation, club allegiance, position, rating, then the curtain lifts on the card.
// Shown once per browser session; App decides whether to mount it at all.
export default function Walkout({ onDone }) {
  const skipRef = useRef(null);

  useEffect(() => {
    // Keyboard users can leave straight away.
    skipRef.current?.focus();
  }, []);

  useEffect(() => {
    const timer = setTimeout(onDone, DURATION_MS);
    const handleKey = (event) => {
      if (event.key === 'Escape') onDone();
    };
    window.addEventListener('keydown', handleKey);
    return () => {
      clearTimeout(timer);
      window.removeEventListener('keydown', handleKey);
    };
  }, [onDone]);

  return (
    <div className="walkout">
      <div className="walkout__beam walkout__beam--left" aria-hidden="true" />
      <div className="walkout__beam walkout__beam--right" aria-hidden="true" />
      <div className="walkout__stage" aria-hidden="true">
        <div className="walkout__step walkout__step--1">
          <ZimFlag className="walkout__flag" />
        </div>
        <div className="walkout__step walkout__step--2">
          <img className="walkout__crest" src={crest} alt="" width="292" height="343" />
        </div>
        <p className="walkout__step walkout__step--3">{profile.position}</p>
        <p className="walkout__step walkout__step--4">{overall}</p>
      </div>
      <button ref={skipRef} type="button" className="walkout__skip" onClick={onDone}>
        Skip intro
      </button>
    </div>
  );
}
