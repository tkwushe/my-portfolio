import { FaArrowLeft, FaCheck, FaExternalLinkAlt, FaGithub, FaMapMarkedAlt } from 'react-icons/fa';
import { ProjectCard } from './Card';
import { squad } from '../data/projects';

export default function CaseStudy({ project }) {
  const index = squad.findIndex((p) => p.slug === project.slug);
  const next = squad[(index + 1) % squad.length];
  const { links, comparison } = project;

  return (
    <article className="case">
      <a className="case__back" href={`#slot-${project.slug}`}>
        <FaArrowLeft aria-hidden="true" /> Back to squad
      </a>

      <header className="case__head">
        <div className="case__head-card" data-vt-card={project.slug}>
          <ProjectCard project={project} />
        </div>
        <div className="case__head-text">
          <p className="chip chip--live">Match report · {project.category}</p>
          <h1 tabIndex={-1}>{project.title}</h1>
          {!project.report && <p className="section__lead">{project.summary}</p>}
          <div className="case__actions">
            {links.live && (
              <a className="button button--primary" href={links.live} target="_blank" rel="noopener noreferrer">
                <FaExternalLinkAlt aria-hidden="true" /> {links.liveLabel}
              </a>
            )}
            {links.github && (
              <a className="button" href={links.github} target="_blank" rel="noopener noreferrer">
                <FaGithub aria-hidden="true" /> View on GitHub
              </a>
            )}
            {links.demo && (
              <a className="button" href={links.demo} target="_blank" rel="noopener noreferrer">
                <FaMapMarkedAlt aria-hidden="true" /> Open the map
              </a>
            )}
          </div>
        </div>
      </header>

      <dl className="facts" data-reveal>
        <div>
          <dt>The problem</dt>
          <dd>{project.report.problem}</dd>
        </div>
        <div>
          <dt>The approach</dt>
          <dd>{project.report.approach}</dd>
        </div>
        <div>
          <dt>The result</dt>
          <dd>{project.report.result}</dd>
        </div>
      </dl>

      {project.image && (
        <figure className="case__shot">
          <img src={project.image.src} alt={project.image.alt} width="1280" height="800" loading="lazy" />
          <figcaption>{project.image.caption}</figcaption>
        </figure>
      )}

      {project.diagram && (
        <figure className="board" data-reveal>
          <figcaption>
            <h2 className="board__title">{project.diagram.title}</h2>
            <span className="board__caption">{project.diagram.caption}</span>
          </figcaption>
          <div className="board__groups">
            {project.diagram.groups.map((group) => (
              <section key={group.name} className="board__group" aria-label={group.name}>
                <h3>{group.name}</h3>
                <ul>
                  {group.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </section>
            ))}
          </div>
        </figure>
      )}

      {comparison && (
        <div className="league">
          <div className="league__scroll" role="region" aria-label={comparison.title} tabIndex={0}>
            <table>
              <caption>
                <span>{comparison.title}</span>
                <span>{comparison.intro}</span>
              </caption>
              <thead>
                <tr>
                  {comparison.columns.map((column) => (
                    <th key={column} scope="col">{column}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {comparison.rows.map((row) => (
                  <tr key={row.name} className={row.selected ? 'league__row--selected' : undefined}>
                    <th scope="row">{row.name}</th>
                    <td>{row.result}</td>
                    <td className="league__outcome">
                      {row.selected && <FaCheck aria-hidden="true" />}
                      {row.outcome}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="league__note">{comparison.footnote}</p>
        </div>
      )}

      <div className="case__grid">
        <div className="case__body">
          {project.body.map((paragraph, i) => (
            <p key={i}>{paragraph}</p>
          ))}

          {project.runNote && (
            <aside className="case__note">
              <h2>How to play</h2>
              <p>{project.runNote}</p>
            </aside>
          )}
        </div>

        <aside className="case__side" aria-label="Project summary">
          <h2>Kit list</h2>
          <ul className="chips">
            {project.technologies.map((tech) => (
              <li key={tech}>{tech}</li>
            ))}
          </ul>
          <h2>Next fixture</h2>
          <a className="side-next" href={`#/case/${next.slug}`}>
            <span className="side-next__pos">{next.position}</span>
            <span className="side-next__name">{next.name}</span>
            <span className="side-next__summary">{next.summary}</span>
          </a>
        </aside>
      </div>


      {links.demo && (
        <section className="case__demo" aria-labelledby="demo-title">
          <h2 id="demo-title">Interactive demo</h2>
          <iframe src={links.demo} title={links.demoTitle} width="1280" height="580" loading="lazy" />
          <a href={links.demo} target="_blank" rel="noopener noreferrer">
            Open the demo in a new tab <FaExternalLinkAlt aria-hidden="true" />
          </a>
        </section>
      )}

    </article>
  );
}
