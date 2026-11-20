import { useReveal } from '../hooks/useReveal';

// Broadcast lower-third: a red tab over a white title slab that wipes in on scroll.
export default function SectionHead({ id, tab, title, children }) {
  const ref = useReveal();
  return (
    <header ref={ref} className="l3">
      <p className="l3__tab"><span>{tab}</span></p>
      <h2 id={id} className="l3__title"><span>{title}</span></h2>
      {children && <p className="l3__lead">{children}</p>}
    </header>
  );
}
