import { FaArrowRight } from 'react-icons/fa';
import { ProjectCard } from './Card';

// Where each position lines up on the pitch. Play runs left to right,
// so the back two sit on the left and the forward on the right.
const SLOTS = { SWE: 'back-top', DB: 'back-bottom', FS: 'midfield', ML: 'forward' };
const SPARE_SLOTS = ['midfield', 'forward', 'back-top', 'back-bottom'];

// The rest of the squad after the key player, set out as a pre-match formation graphic.
// Every project must stay reachable through a link to `#/case/<slug>`.
export default function Lineup({ projects }) {
  return (
    <div className="formation">
      <div className="formation__pitch" aria-hidden="true">
        <span className="formation__halfway" />
        <span className="formation__circle" />
        <span className="formation__box formation__box--home" />
        <span className="formation__box formation__box--away" />
      </div>

      <ol className="formation__list">
        {projects.map((project, i) => (
          <li
            key={project.slug}
            id={`slot-${project.slug}`}
            className={`formation__player formation__player--${SLOTS[project.position] ?? SPARE_SLOTS[i % SPARE_SLOTS.length]}`}
            data-reveal="deal"
            style={{ '--d': i }}
          >
            <a className="formation__link" href={`#/case/${project.slug}`}>
              {/* The card repeats the report's numbers; the plate below names the link. */}
              <div className="formation__card" aria-hidden="true" style={{ viewTransitionName: `card-${project.slug}` }}>
                <ProjectCard project={project} />
              </div>
              <span className="formation__plate">
                <span className="formation__pos" aria-hidden="true">{project.position}</span>
                <span className="formation__name">
                  {project.name}
                  <span className="visually-hidden">: read match report</span>
                </span>
                <FaArrowRight className="formation__arrow" aria-hidden="true" />
              </span>
            </a>
            <div className="formation__sheet">
              <p className="formation__category">{project.category}</p>
              <p className="formation__summary">{project.summary}</p>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}
