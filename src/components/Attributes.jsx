import SectionHead from './SectionHead';
import { attributes, interests } from '../data/profile';

const [lead, ...rest] = attributes;

// The numerals are counts of listed items, never a rating.
const count = (items) => String(items.length).padStart(2, '0');

export default function Attributes() {
  return (
    <section className="section" id="attributes" aria-labelledby="attributes-title">
      <SectionHead id="attributes-title" tab="Scouting report" title="Attributes" />

      <div className="scout">
        <div className="scout__lead" data-reveal>
          <div className="scout__lead-head">
            <p className="scout__kicker">Main focus</p>
            <h3>{lead.group}</h3>
            <p className="scout__lead-count">
              <span className="scout__numeral">{count(lead.items)}</span>
              <span>listed</span>
            </p>
          </div>
          <ul className="scout__lead-list">
            {lead.items.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>

        <div className="scout__table" data-reveal>
          <p className="scout__cols" aria-hidden="true">
            <span>Area</span>
            <span>In the locker</span>
            <span>Listed</span>
          </p>
          {rest.map((panel) => (
            <div key={panel.group} className="scout__row">
              <h3>{panel.group}</h3>
              <ul>
                {panel.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <p className="scout__n">
                <span className="scout__numeral" aria-hidden="true">{count(panel.items)}</span>
                <span className="visually-hidden">{panel.items.length} listed</span>
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="tactics" data-reveal>
        <h3 className="tactics__title"><span>Game plan</span></h3>
        <div className="tactics__body">
          {interests.map((paragraph) => (
            <p key={paragraph.slice(0, 24)}>{paragraph}</p>
          ))}
        </div>
      </div>
    </section>
  );
}
