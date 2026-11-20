// Single source of truth for everything personal on the site.
// Card ratings are real module marks; nothing here is invented.

export const profile = {
  firstName: 'Takudzwa',
  lastName: 'Wushe',
  role: 'Assistant Data Scientist',
  study: 'MSc Applied AI',
  position: 'DS',
  // The name printed on the front of the player card: my nickname.
  cardName: 'Taku',
  nation: 'Zimbabwe',
  location: 'Coventry, UK',
  // The card's club is where I play now.
  club: 'PEG',
  supports: 'Arsenal',
  cricket: 'Australia & Zimbabwe',
  cricketFavourite: 'Steve Smith',
  football: 'Watches loads of football',
  tagline: "I'm an assistant data scientist at Pegara, a startup where I work in a team of three on an animal detector. I build its datasets, generate synthetic video for the scenes it struggles with, and test every change against the same clips.",
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
  'In development: an AI radio station',
  'Current interest: knowledge distillation',
  'Football: supports Arsenal and watches loads of it',
  'Cricket: Australia and Zimbabwe, favourite player Steve Smith',
];

// How the interest in machine learning started, in my own words.
export const whyML =
  "In the second year of my degree, one module went worse than the others, so I focused my dissertation on machine learning to prove I could do it. That's what pulled me into practical data science, deep learning and Python.";

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

// UK university bands: 70+ is a First (A).
export const gradeFor = (mark) => (mark >= 70 ? 'A' : mark >= 60 ? 'B' : mark >= 50 ? 'C' : mark >= 40 ? 'D' : 'F');

export const inningsTotal = modules.reduce((sum, m) => sum + m.mark, 0);
export const inningsAverage = inningsTotal / modules.length;
export const overall = Math.round(inningsAverage);

// Six face stats, as on a FUT card. Software Principles sits on the scorecard only.
export const cardStats = ['ALG', 'SYS', 'OPS', 'MTH', 'DBS', 'OOP'].map((code) => {
  const m = modules.find((x) => x.code === code);
  return { label: code, value: m.mark, title: m.name };
});

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
    detail: "A startup, so I'm part of a team of three and involved in a lot early on. In February 2026 our CTO trusted me to lead the animal detector project for two to three months. I build and version the clip datasets, generate synthetic video with custom ComfyUI pipelines, and test every change against fixed evaluation and test clips.",
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
    club: 'St. Georges Senior School, Zimbabwe',
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
  },
];

export const attributes = [
  { group: 'Deep learning', items: ['Video classification', 'Frozen vision encoders', 'Temporal models', 'Synthetic video in ComfyUI', 'Dataset versioning', 'Locked evaluation', 'ONNX export'] },
  { group: 'Data & ML', items: ['Applied statistics', 'Machine learning', 'Feature engineering', 'XGBoost', 'Random Forest', 'SHAP', 'Scikit-learn', 'Pandas', 'NumPy'] },
  { group: 'Languages', items: ['Python', 'JavaScript', 'Java', 'C', 'SQL', 'HTML/CSS'] },
  { group: 'Web', items: ['React', 'Node.js', 'Express', 'RESTful APIs', 'Full-stack development'] },
  { group: 'Databases', items: ['Database design', 'Data modelling', 'ER diagrams', 'JSON', 'NoSQL'] },
  { group: 'Visualisation', items: ['Matplotlib', 'Seaborn', 'Interactive dashboards', 'Geospatial visualisation'] },
  { group: 'Tooling', items: ['Git', 'GitHub', 'Command line', 'VS Code', 'Jupyter'] },
  { group: 'Dressing room', items: ['Problem-solving', 'Communication', 'Teamwork', 'Leadership', 'Research', 'Technical writing'] },
];

export const interests = [
  "I like using technology on problems that actually matter, and for me that mostly means data and machine learning. I'm most interested in how data can help people make better decisions, especially in sustainability, finance and social development, because a good model can make a practical difference there. Quantitative research appeals to me for the same reason, and it rewards the kind of careful testing I do on the detector.",
  "Longer term, I want to help grow tech in Zimbabwe. My water points dissertation is a small example of what I mean, and I'd like to build more things like it there, especially around resource management and access to basic services.",
];
