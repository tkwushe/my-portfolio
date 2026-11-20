import { FaGithub } from 'react-icons/fa';
import { bench } from '../data/projects';

// Shirt numbers are row order only: substitutes start at 12.
const FIRST_NUMBER = 12;

// Substitutes board: smaller builds without a match report.
export default function Bench() {
  return (
    <div className="subs">
      <header className="subs__head">
        <h3 className="subs__title"><span>The Bench</span></h3>
        <p className="subs__count">Substitutes · {String(bench.length).padStart(2, '0')}</p>
      </header>
      <ul className="subs__list">
        {bench.map((project, index) => (
          <li key={project.name} className="subs__row" data-reveal style={{ '--d': index }}>
            <span className="subs__num" aria-hidden="true">{FIRST_NUMBER + index}</span>
            <span className="subs__pos"><span>{project.lang}</span></span>
            <div className="subs__body">
              <h4>{project.name}</h4>
              <p>{project.description}</p>
            </div>
            <a className="subs__link" href={project.github} target="_blank" rel="noopener noreferrer">
              <FaGithub aria-hidden="true" />
              <span>Source<span className="visually-hidden">: {project.name}</span></span>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
