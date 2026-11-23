import { overall } from '../data/profile';
import { useMatchClock } from '../hooks/useMatchClock';

const LINKS = [
  { href: '#squad', label: 'Squad' },
  { href: '#lab', label: 'In dev' },
  { href: '#career', label: 'Career' },
  { href: '#form', label: 'Form', wide: true },
  { href: '#contact', label: 'Contact' },
];

// Styled as a broadcast score bug: team block, name block, rating block.
export default function Nav() {
  const minute = useMatchClock();
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
        {/* The match clock runs with the page: kick-off at the top, full time at the bottom. */}
        <span className="nav__clock" aria-hidden="true">{minute >= 90 ? 'FT' : `${minute}'`}</span>
        <nav aria-label="Primary">
          <ul className="nav__links">
            {LINKS.map((link) => (
              <li key={link.href} className={link.wide ? 'nav__wide' : undefined}>
                <a href={link.href}>{link.label}</a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      <span className="nav__progress" aria-hidden="true" style={{ '--played': minute / 90 }} />
    </header>
  );
}
