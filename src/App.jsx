import { useCallback, useEffect, useRef, useState } from 'react';
import { flushSync } from 'react-dom';
import Nav from './components/Nav';
import Hero from './components/Hero';
import Squad from './components/Squad';
import Lab from './components/Lab';
import Scorecard from './components/Scorecard';
import Attributes from './components/Attributes';
import Contact from './components/Contact';
import Footer from './components/Footer';
import CaseStudy from './components/CaseStudy';
import Ticker from './components/Ticker';
import Walkout from './components/Walkout';
import { CardDefs } from './components/Card';
import { findProject } from './data/projects';
import { useRevealAll } from './hooks/useRevealAll';

const SITE_TITLE = 'Takudzwa Wushe · Data Science & Deep Learning';
const WALKOUT_KEY = 'walkout-seen';

// Hash routing: `#/case/<slug>` opens a case study, any other hash is a section anchor.
const readRoute = () => {
  const hash = window.location.hash;
  const match = hash.match(/^#\/case\/([\w-]+)$/);
  const project = match ? findProject(match[1]) : undefined;
  return { project, anchor: project ? '' : hash.slice(1) };
};

// The intro plays once per session, only on a plain landing, and never for reduced motion or data saver.
const shouldWalkout = () => {
  if (typeof window.matchMedia !== 'function') return false;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return false;
  if (navigator.connection?.saveData) return false;
  if (window.location.hash) return false;
  try {
    return !window.sessionStorage.getItem(WALKOUT_KEY);
  } catch {
    return false;
  }
};

export default function App() {
  const [route, setRoute] = useState(readRoute);
  useRevealAll(route.project ? route.project.slug : 'home');
  const [playedIntro] = useState(shouldWalkout);
  const [walkoutOpen, setWalkoutOpen] = useState(playedIntro);

  const closeWalkout = useCallback(() => {
    try {
      window.sessionStorage.setItem(WALKOUT_KEY, '1');
    } catch {
      // Storage can be blocked; the intro then simply plays again next visit.
    }
    setWalkoutOpen(false);
    // Hand keyboard focus to the page once the intro has gone.
    requestAnimationFrame(() => document.querySelector('.hero__title')?.focus({ preventScroll: true }));
  }, []);

  useEffect(() => {
    // Where the browser supports it, the route swap runs as a view transition, so a project
    // card grows into the card on its match report and back again.
    const handleHashChange = () => {
      const reduce = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
      const next = readRoute();
      const sameView = next.project?.slug === route.project?.slug;
      if (!document.startViewTransition || reduce || sameView) {
        setRoute(next);
        return;
      }
      document.startViewTransition(() => {
        flushSync(() => setRoute(next));
        // Land in the right place before the new view is captured, so the card has somewhere
        // on screen to grow into: the top of a report, or the project's own slot going back.
        if (next.project) window.scrollTo({ top: 0, behavior: 'instant' });
        else document.getElementById(next.anchor)?.scrollIntoView({ block: 'center', behavior: 'instant' });
      });
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, [route]);

  const firstRoute = useRef(true);

  useEffect(() => {
    document.title = route.project ? `${route.project.name} · Takudzwa Wushe` : SITE_TITLE;
    // After a route change, move keyboard focus to where the reader now is.
    const moveFocus = !firstRoute.current;
    firstRoute.current = false;
    if (route.project) {
      window.scrollTo({ top: 0, behavior: 'instant' });
      if (moveFocus) document.querySelector('.case h1')?.focus({ preventScroll: true });
      return;
    }
    // Returning from a case study remounts the sections, so the browser's own anchor jump has nothing to land on.
    const target = route.anchor && !route.anchor.startsWith('/') ? document.getElementById(route.anchor) : null;
    target?.scrollIntoView?.({ block: target.id.startsWith('slot-') ? 'center' : 'start' });
    if (moveFocus && target?.id.startsWith('slot-')) target.querySelector('a')?.focus({ preventScroll: true });
  }, [route]);

  return (
    <>
      <CardDefs />
      {walkoutOpen && <Walkout onDone={closeWalkout} />}
      {/* While the intro plays, the page behind it can't be reached by keyboard or screen reader. */}
      <div inert={walkoutOpen ? '' : undefined}>
        <Nav />
        <main id="main">
          {route.project ? (
            <CaseStudy project={route.project} />
          ) : (
            <>
              <Hero entrance={playedIntro && !walkoutOpen} waiting={walkoutOpen} />
              <Squad />
              <Lab />
              <Scorecard />
              <Attributes />
              <Contact />
            </>
          )}
        </main>
        <Footer />
        <Ticker />
      </div>
    </>
  );
}
