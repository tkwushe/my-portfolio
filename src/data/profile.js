import season1Landing from '../assets/season1-1.jpg';
import season1Projects from '../assets/season1-2.jpg';
import season1Cases from '../assets/season1-3.jpg';

// Single source of truth for everything personal on the site.
// Card ratings are real module marks; nothing here is invented.

export const profile = {
  firstName: 'Takudzwa',
  lastName: 'Wushe',
  role: 'Assistant Data Scientist',
  // The hero shows the field, not the job title; the title stays in the career history.
  heroRole: 'Data Scientist',
  study: 'MSc Applied AI',
  position: 'DS',
  nation: 'Zimbabwe',
  location: 'Coventry, UK',
  // The card's club is where I play now.
  club: 'PEG',
  supports: 'Arsenal',
  cricket: 'Australia & Zimbabwe',
  cricketFavourite: 'Steve Smith',
  football: 'Watches loads of football',
  tagline: "I'm most interested in analysing data and in deep learning, especially taking messy raw data and getting something useful out of it. I'm open to data science, deep learning and quantitative research roles.",
  // The public CV: the master CV with the phone number taken out.
  cv: '/Takudzwa-Wushe-CV.pdf',
  // Where I want to go next, said the same way wherever it comes up.
  nextStep: 'data science, deep learning and quantitative research roles',
  email: 'tk.wushe@gmail.com',
  links: {
    github: 'https://github.com/tkwushe',
    linkedin: 'https://www.linkedin.com/in/takudzwa-wushe-5a874b30a',
  },
  formEndpoint: 'https://formspree.io/f/xwpkkvpv',
};

// The rolling "latest" bar at the bottom of the screen.
export const ticker = [
  'Animal detector at Pegara: F1 0.920 on 687 held-out clips',
  'Around 10,000 synthetic one-second clips generated with custom ComfyUI pipelines',
  'MSc Applied AI at Warwick: Applied Statistics for AI in progress',
  'In development: Mine Surveillance, satellite change detection for Zimbabwe',
  'In development: an AI production system for a sports show, working as a demo',
  'Current interest: knowledge distillation',
  'Interests: football and cricket',
];

// How the interest in machine learning started, in my own words.
export const whyML =
  "In the second year of my degree, one module went worse than the others, so I focused my dissertation on machine learning to prove I could do it. That's how I got into data science and deep learning.";

// The away fixture: what working for a Japanese startup has taught me.
export const japan = {
  title: 'The away fixture: Japan',
  paragraphs: [
    'Working for a Japanese startup has meant learning in a different environment and a different work culture. The Japanese work style is strict, and it has made me more organised and more thoughtful about how I do things.',
    'Being at a startup adds to that. You are more accountable, and you are involved in a lot of things early on. It has improved my flexibility, because I have had to understand many different areas and not just my own corner.',
  ],
  ambition: 'In the end, I want to be independent, start projects that are meaningful, and leave an impact.',
};

// The innings: BSc Software Engineering, Anglia Ruskin University.
export const modules = [
  { code: 'OPS', name: 'Operating Systems', mark: 87, note: 'System processes and resource management' },
  { code: 'SYS', name: 'Computer Systems', mark: 86, note: 'Hardware-software integration' },
  { code: 'MTH', name: 'Core Mathematics for Computing', mark: 85, note: 'Analytical problem-solving' },
  { code: 'ALG', name: 'Algorithm Analysis and Data Structures', mark: 82, note: 'Complex algorithms, efficient data structures' },
  { code: 'SWP', name: 'Software Principles', mark: 77, note: 'Theory applied to practical computing' },
  { code: 'DBS', name: 'Database Design', mark: 75, note: 'Database architecture and implementation' },
  { code: 'OOP', name: 'Object-Oriented Programming', mark: 70, note: 'Modular, reusable code' },
];

export const inningsTotal = modules.reduce((sum, m) => sum + m.mark, 0);
export const inningsAverage = inningsTotal / modules.length;
export const overall = Math.round(inningsAverage);

export const career = [
  {
    period: 'Expected 2027',
    club: 'University of Warwick, UK',
    role: 'MSc Applied Artificial Intelligence',
    detail: 'One-year programme. Currently studying Applied Statistics for AI.',
  },
  {
    period: 'Nov 2025 – present',
    club: 'Pegara',
    role: 'Assistant Data Scientist',
    detail: 'Working on the animal detector, which our CTO trusted me to lead from February 2026. The full story is in its match report.',
  },
  {
    period: '2022 – 2025',
    club: 'Anglia Ruskin University, UK',
    role: 'BSc Software Engineering',
    detail: 'Graduated with First Class Honours.',
  },
  {
    period: 'Feb – Aug 2022',
    club: 'Tano Digital, Zimbabwe',
    role: 'Software Development Intern',
    detail: 'Built full-stack web applications with Python and Django, contributed to internal tooling, and worked through the full software development lifecycle.',
  },
  {
    period: '2016 – 2021',
    club: "St George's Senior School, Zimbabwe",
    role: 'A Levels',
    detail: '',
  },
];

// This site, season by season.
export const seasons = [
  {
    label: 'Season 2',
    period: '2026 –',
    name: 'Matchday',
    detail: "The site you're on. I rebuilt it as a static React and Vite site around football cards and cricket scorecards, so there's no server to pay for.",
  },
  {
    label: 'Season 1',
    period: '2024 – 2026',
    name: 'The full-stack years',
    detail: 'A React front end with an Express and MySQL back end, plus an admin panel behind a JWT login for managing projects. Building it taught me how the whole stack fits together, and the code is still in the repository history.',
    // Screenshots of the Season 1 build, taken from the main branch on 20 Nov 2026.
    shots: [
      { src: season1Landing, alt: 'Season 1 landing page: name, a long intro paragraph and five navigation buttons', caption: 'The landing page, with everything behind five buttons.' },
      { src: season1Projects, alt: 'Season 1 projects list served from the MySQL database', caption: 'Quick Projects, loaded live from the MySQL database through the Express API.' },
      { src: season1Cases, alt: 'Season 1 case studies page with four project tiles', caption: 'The first versions of the case studies that are now match reports.' },
    ],
  },
];

export const attributes = [
  { group: 'Deep learning', items: ['PyTorch', 'Video classification', 'Frozen vision encoders', 'Temporal models', 'Synthetic video in ComfyUI', 'Dataset versioning', 'Locked evaluation', 'ONNX export'] },
  { group: 'Data & ML', items: ['Applied statistics', 'Machine learning', 'Feature engineering', 'XGBoost', 'Random Forest', 'SHAP', 'Scikit-learn', 'Pandas', 'NumPy'] },
  { group: 'Languages', items: ['Python', 'JavaScript', 'Java', 'C', 'SQL', 'HTML/CSS'] },
  { group: 'Web', items: ['React', 'Node.js', 'Express', 'RESTful APIs', 'Full-stack development'] },
  { group: 'Databases', items: ['Database design', 'Data modelling', 'ER diagrams', 'JSON', 'NoSQL'] },
  { group: 'Visualisation', items: ['Matplotlib', 'Seaborn', 'Interactive dashboards', 'Geospatial visualisation'] },
  { group: 'Tooling', items: ['Git', 'GitHub', 'Command line', 'VS Code', 'Jupyter'] },
];

export const interests = [
  "The areas I care about most are where data can help people make better decisions, mainly in sustainability and social development, and more and more in finance. Quantitative research appeals to me because it rewards the same careful testing I do on the detector.",
  "Longer term, I want to help grow tech in Zimbabwe. My water points dissertation is a small example of what I mean, and I'd like to build more things like it there, especially around resource management and access to basic services.",
];

// Form: how the way I work has changed, from reacting to things to getting ahead of them.
// Each stage is drawn as a position further up the pitch. `x` is that position, 0 to 100.
export const form = [
  {
    x: 14,
    period: '2022 – 2025',
    where: 'BSc at Anglia Ruskin',
    title: 'Reacting',
    text: 'In my second year one module went worse than the others, so I chose a machine learning dissertation to prove I could do it. The choice was a reaction to a bad result.',
  },
  {
    x: 38,
    period: 'November 2025',
    where: 'Joined Pegara',
    title: 'Getting organised',
    text: 'The Japanese work style is strict, and it made me more organised and more thoughtful about how I do things. At a startup I was also accountable early on.',
  },
  {
    x: 62,
    period: 'February 2026',
    where: 'Leading the detector',
    title: 'Planning ahead',
    text: 'Our CTO trusted me to lead the animal detector. I now set up the evaluation before I choose a model, and every change is tested against the same locked clips.',
  },
  {
    x: 86,
    period: '2026 onwards',
    where: 'My own projects',
    title: 'On the front foot',
    text: 'I start things myself now: Mine Surveillance, the AI sports show and my reading on knowledge distillation. I want to be independent and start projects that are meaningful.',
  },
];
