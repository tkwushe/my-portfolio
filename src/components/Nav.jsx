import { overall } from '../data/profile';

const LINKS = [
  { href: '#squad', label: 'Squad' },
  { href: '#lab', label: 'In dev' },
  { href: '#career', label: 'Career' },
  { href: '#contact', label: 'Contact' },
];

// Styled as a broadcast score bug: team block, name block, rating block.
export default function Nav() {
  return (
    <header className="nav">
      <a className="skip-link" href="#main">Skip to content</a>
      <div className="nav__inner">
        <a className="bug" href="#top">
          <span className="bug__team">TW</span>
          <span className="bug__name">Wushe</span>
          <span className="bug__score">{overall}</span>
          <span className="visually-hidden">, home</span>
        </a>
        <nav aria-label="Primary">
          <ul className="nav__links">
            {LINKS.map((link) => (
              <li key={link.href}>
                <a href={link.href}>{link.label}</a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
