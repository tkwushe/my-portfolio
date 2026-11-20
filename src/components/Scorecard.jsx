import SectionHead from './SectionHead';
import { career, inningsAverage, inningsTotal, japan, modules, profile, seasons, whyML } from '../data/profile';

export default function Scorecard() {
  return (
    <section className="section" id="career" aria-labelledby="career-title">
      <SectionHead id="career-title" tab="Career" title="The Scorecard">
        My degree laid out as a cricket innings, one row per module with the mark as the runs.
      </SectionHead>

      <figure className="notes" data-reveal>
        <figcaption>Programme notes · Why machine learning</figcaption>
        <blockquote>{whyML}</blockquote>
      </figure>

      <div className="scorecard-grid">
        <div className="scorecard" data-reveal>
          <table>
            <caption>
              <span>Anglia Ruskin University</span>
              <span>BSc Software Engineering · 2022–2025</span>
            </caption>
            <thead>
              <tr>
                <th scope="col">Module</th>
                <th scope="col" className="num">Mark</th>
              </tr>
            </thead>
            <tbody>
              {modules.map((module) => (
                <tr key={module.code}>
                  <th scope="row">
                    <span className="scorecard__name">{module.name}</span>
                    <span className="scorecard__note">{module.note}</span>
                    <span className="scorecard__bar" style={{ '--runs': `${module.mark}%` }} aria-hidden="true" />
                  </th>
                  <td className="num scorecard__runs">{module.mark}</td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr>
                <th scope="row">Total <span className="scorecard__note">{modules.length} modules, declared</span></th>
                <td className="num scorecard__runs">{inningsTotal}/{modules.length}d</td>
              </tr>
              <tr>
                <th scope="row">Average</th>
                <td className="num scorecard__runs">{inningsAverage.toFixed(2)}</td>
              </tr>
              <tr className="scorecard__result">
                <th scope="row" colSpan="2">Result: First Class Honours</th>
              </tr>
            </tfoot>
          </table>
        </div>

        <div className="career">
          <h3>Transfer history</h3>
          <ol>
            {career.map((stint, i) => (
              <li key={stint.club} data-reveal style={{ '--d': i }}>
                <p className="career__period">{stint.period}</p>
                <p className="career__club">{stint.club}</p>
                <p className="career__role">{stint.role}</p>
                {stint.detail && <p className="career__detail">{stint.detail}</p>}
              </li>
            ))}
          </ol>
        </div>
      </div>

      <article className="away" data-reveal>
        <p className="chip chip--live">Pegara · Nov 2025 – present</p>
        <h3>{japan.title}</h3>
        <div className="away__body">
          {japan.paragraphs.map((paragraph) => (
            <p key={paragraph.slice(0, 24)}>{paragraph}</p>
          ))}
        </div>
        <p className="away__ambition">{japan.ambition}</p>
        <dl className="away__fixture">
          <div>
            <dt>Home</dt>
            <dd>{profile.location}</dd>
          </div>
          <div>
            <dt>Away</dt>
            <dd>Pegara, a Japanese startup</dd>
          </div>
          <div>
            <dt>Position</dt>
            <dd>{profile.role}</dd>
          </div>
          <div>
            <dt>Since</dt>
            <dd>November 2025</dd>
          </div>
        </dl>
      </article>

      <div className="seasons">
        <h3>Season archive</h3>
        <ul>
          {seasons.map((season, i) => (
            <li key={season.label} data-reveal style={{ '--d': i }}>
              <p className="seasons__label">{season.label} · {season.period}</p>
              <h4>{season.name}</h4>
              <p>{season.detail}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
