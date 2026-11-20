import { LabCard } from './Card';
import SectionHead from './SectionHead';
import { lab } from '../data/projects';

export default function Lab() {
  return (
    <section className="section" id="lab" aria-labelledby="lab-title">
      <SectionHead id="lab-title" tab="Warming up" title="In Development">
        What I&apos;m building and reading about at the moment. They don&apos;t have results yet, so they don&apos;t have ratings either.
      </SectionHead>

      <ul className="lab">
        {lab.map((project, i) => (
          <li key={project.name} className="lab__item" data-reveal="deal" style={{ '--d': i }}>
            <div aria-hidden="true">
              <LabCard project={project} />
            </div>
            <div className="lab__body">
              <p className="chip chip--status">{project.status}</p>
              <h3>{project.name}</h3>
              <p>{project.description}</p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
