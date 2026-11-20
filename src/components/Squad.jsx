import { ProjectCard } from './Card';
import Bench from './Bench';
import Lineup from './Lineup';
import SectionHead from './SectionHead';
import { squad } from '../data/projects';

const [keyPlayer, ...lineup] = squad;

export default function Squad() {
  return (
    <section className="section" id="squad" aria-labelledby="squad-title">
      <SectionHead id="squad-title" tab="Starting line-up" title="The Squad">
        Every number on a card comes straight from the match report behind it.
      </SectionHead>

      <div className="keyplayer" id={`slot-${keyPlayer.slug}`} data-reveal>
        {/* The card carries the numbers; screen readers get them in the report instead. */}
        <div aria-hidden="true" data-vt-card={keyPlayer.slug}>
          <ProjectCard project={keyPlayer} className="card--feature" />
        </div>
        <div className="keyplayer__body">
          <p className="chip chip--live">{keyPlayer.tierLabel} · {keyPlayer.category}</p>
          <h3>{keyPlayer.name}</h3>
          <p className="keyplayer__summary">{keyPlayer.summary}</p>
          <a className="button button--primary" href={`#/case/${keyPlayer.slug}`}>
            Read match report<span className="visually-hidden">: {keyPlayer.name}</span>
          </a>
        </div>
      </div>

      <Lineup projects={lineup} />
      <Bench />
    </section>
  );
}
