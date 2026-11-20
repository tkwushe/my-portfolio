import { useState } from 'react';
import { FaArrowRight, FaEnvelope, FaFileDownload, FaGithub, FaLinkedin } from 'react-icons/fa';
import SectionHead from './SectionHead';
import { profile } from '../data/profile';

const METHODS = [
  { icon: FaEnvelope, title: 'Email', value: profile.email, href: `mailto:${profile.email}` },
  { icon: FaLinkedin, title: 'LinkedIn', value: 'Takudzwa Wushe', href: profile.links.linkedin },
  { icon: FaGithub, title: 'GitHub', value: '@tkwushe', href: profile.links.github },
  { icon: FaFileDownload, title: 'CV', value: 'Download as PDF', href: profile.cv, download: true },
];

// The deal sheet strip: "Window: Open" restates the open-to-roles line above; the rest comes from the profile.
const DEAL = [
  { label: 'Window', value: 'Open' },
  { label: 'Player', value: `${profile.firstName} ${profile.lastName}` },
  { label: 'Role', value: profile.role },
  { label: 'Based', value: profile.location },
];

const STATUS_TEXT = {
  sending: 'Sending...',
  sent: "Deal agreed. Thanks, I'll get back to you soon.",
  error: `That didn't send. Please email me at ${profile.email} instead.`,
};

export default function Contact() {
  const [status, setStatus] = useState('idle');

  // Sends in place so the visitor stays on the page. Without JavaScript the form
  // still posts straight to the endpoint.
  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    setStatus('sending');
    try {
      const response = await fetch(form.action, {
        method: 'POST',
        body: new FormData(form),
        headers: { Accept: 'application/json' },
      });
      if (!response.ok) throw new Error(String(response.status));
      form.reset();
      setStatus('sent');
    } catch {
      setStatus('error');
    }
  };

  return (
    <section className="section" id="contact" aria-labelledby="contact-title">
      <SectionHead id="contact-title" tab="Transfer window" title="Contact">
        If you want to talk about a role or a project, send me a message or use any of the links below.
      </SectionHead>

      <div className="deal" data-reveal>
        <dl className="deal__strip">
          {DEAL.map(({ label, value }) => (
            <div key={label}>
              <dt>{label}</dt>
              <dd>{value}</dd>
            </div>
          ))}
        </dl>

        <div className="deal__grid">
          <form className="deal__form" action={profile.formEndpoint} method="POST" onSubmit={handleSubmit}>
            <h3 className="deal__heading">Make an approach</h3>
            {/* Spam trap: people never see or fill this, bots often do. */}
            <input type="text" name="_gotcha" tabIndex={-1} autoComplete="off" aria-hidden="true" className="visually-hidden" />
            <div className="deal__field">
              <label htmlFor="name">Name</label>
              <input type="text" id="name" name="name" autoComplete="name" required />
            </div>
            <div className="deal__field">
              <label htmlFor="email">Email</label>
              <input type="email" id="email" name="email" autoComplete="email" required />
            </div>
            <div className="deal__field deal__field--wide">
              <label htmlFor="message">Message</label>
              <textarea id="message" name="message" rows="5" required />
            </div>
            <button type="submit" className="button button--primary deal__submit" disabled={status === 'sending'}>
              Send message
            </button>
            <p className={`deal__status deal__status--${status}`} role="status">
              {STATUS_TEXT[status] ?? ''}
            </p>
          </form>

          <div className="deal__lines">
            <h3 className="deal__heading">Direct lines</h3>
            <ul>
              {METHODS.map(({ icon: Icon, title, value, href, download }) => (
                <li key={title}>
                  <a
                    href={href}
                    {...(download ? { download: true } : href.startsWith('mailto:') ? {} : { target: '_blank', rel: 'noopener noreferrer' })}
                  >
                    <span className="deal__icon"><Icon aria-hidden="true" /></span>
                    <span className="deal__text">
                      <span className="deal__label">{title}</span>
                      <span className="deal__value">{value}</span>
                    </span>
                    <FaArrowRight className="deal__arrow" aria-hidden="true" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
