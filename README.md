# Takudzwa Wushe · Portfolio

A static React site themed around football cards and cricket scorecards. No backend, no database, no environment variables.

## Commands

```bash
npm install
npm run dev      # Vite dev server on http://localhost:3000
npm run build    # production build into build/
npm run preview  # serve the production build
npm test         # Vitest
npm run lint     # ESLint
```

## Structure

```
index.html              Vite entry, loads fonts and src/main.jsx
src/
  main.jsx              mounts <App />
  App.jsx               hash routing: sections on the home page, #/case/<slug> for case studies
  data/
    profile.js          personal details, module marks, career, skills
    projects.js         squad (case-study projects) and bench (smaller builds)
    caseStudies.js      long-form case study text, keyed by slug
  components/           Nav, Hero, Card, Squad, Scorecard, Attributes, Contact, CaseStudy, Footer
  hooks/useTilt.js      pointer-tracked card tilt
  styles/
    global.css          design tokens, layout, sections
    card.css            the shield card and its tiers
public/                 favicon, manifest, robots.txt
netlify.toml            build command and publish directory
```

## Editing content

All content lives in `src/data/`. Components only render it.

- **Add a case study:** add an entry to `squad` in `projects.js` and its text to `caseStudies.js` under the same slug.
- **Add a smaller project:** add an entry to `bench` in `projects.js`.
- **Update career or skills:** edit `career` and `attributes` in `profile.js`.

Every number on a card is a real figure. The player card ratings are module marks, and the overall rating is their average, computed in `profile.js`.

## Deployment

Any static host works. Build command `npm run build`, publish directory `build`. `netlify.toml` already sets this for Netlify.

## History

Version 1 of this site was a full-stack app: React, Express, MySQL and a JWT-protected admin panel, hosted on Railway and Netlify. That version is preserved in git history on `main` before the `redesign/fifa-cards` branch.
