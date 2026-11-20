import { caseStudies } from './caseStudies';
import bayNoakesShot from '../assets/shot-bay-noakes.jpg';
import waterPointsShot from '../assets/shot-water-points.jpg';

// Starting line-up: projects with a full case study.
// `headline` is the big number on the card; every figure comes from the write-up itself.
// `report` is the three-line summary shown above each case study.
export const squad = [
  {
    slug: 'animal-detector',
    report: {
      problem: 'Decide, one second at a time, whether a particular animal is in a video frame.',
      approach: 'Versioned clip datasets with strict splits, synthetic one-second clips from custom ComfyUI pipelines for the scenes it struggled with, and every change tested against the same evaluation and test clips.',
      result: 'F1 0.920 on 687 held-out clips, plus a real-world check on around 670 clips of 10 seconds each. A 1,658-clip synthetic set, scored with the frozen detector, reached F1 0.909. A hard-case retest reached 93.3 percent against a 95 percent target.',
    },
    name: 'Animal Detector',
    title: 'Animal Detector: taking a video detection model from dataset to locked evaluation',
    summary: 'My work at Pegara: a deep learning model that watches video and decides, second by second, whether a particular animal is in frame.',
    category: 'Deep Learning',
    position: 'DL',
    tier: 'special',
    tierLabel: 'Key player',
    icon: 'paw',
    headline: { value: '92', label: 'F1 %' },
    // Only figures already cleared for the site; no species, names or data details.
    diagram: {
      title: 'How the detector is built',
      caption: 'From clips to a locked test, in the order the work happened.',
      groups: [
        { name: '1 · Data', items: ['Versioned clip datasets', 'Strict train, validation and test splits', '1,391-row build with zero split overlap'] },
        { name: '2 · Synthetic video', items: ['Around 10,000 one-second clips', 'Custom ComfyUI pipelines and nodes', 'Aimed at the scenes it struggled with'] },
        { name: '3 · Model', items: ['DINOv3 ConvNeXt-Base encoder', 'BiGRU temporal head', 'Three encoders tried'] },
        { name: '4 · Testing', items: ['Threshold fixed on validation', 'Locked one-second test set', 'Real-world 10-second clips', 'Separate hard-case retest'] },
      ],
    },
    stats: [
      { value: '687', label: 'Test clips' },
      { value: '3', label: 'Encoders' },
      { value: '~10k', label: 'Synthetic' },
      { value: '~670', label: 'Real clips' },
    ],
    technologies: ['Deep Learning', 'DINOv3', 'ConvNeXt', 'BiGRU', 'ComfyUI', 'Synthetic Video', 'Locked Evaluation', 'ONNX'],
    links: {},
    // Owner-approved figures and wording only. Do not add ranks, totals or other numbers.
    comparison: {
      title: 'Encoder comparison',
      intro: 'Each encoder sat under the same temporal head, though they weren\'t all scored on the same clips.',
      columns: ['Encoder', 'Result', 'Outcome'],
      rows: [
        {
          name: 'DINOv3 ConvNeXt-Base',
          result: 'F1 0.920 on the locked test',
          outcome: 'Selected',
          selected: true,
        },
        {
          name: 'Perception Encoder',
          result: '95.3% balanced accuracy at 15 fps, 2.4 points above the DINOv3 baseline',
          outcome: 'Not selected: a 30 fps run missed the 90% recall gate',
        },
        {
          name: 'Vision-language encoder',
          result: '13 false positives on a 29-clip showcase',
          outcome: 'Rejected: it confused other animals with the target',
        },
      ],
      footnote: 'These figures come from different evaluation sets and are not directly comparable. The locked-test F1 is the headline result.',
    },
  },
  {
    slug: 'bay-noakes',
    report: {
      problem: 'A boutique hotel in Harare needed a site that wins real bookings, mostly from phones.',
      approach: 'React, TypeScript and Vite, a lazy-loaded gallery, code splitting, deferred analytics and SEO fixes.',
      result: 'Lighthouse performance from 48 to 75 and above. Largest Contentful Paint from over 23 seconds to just over 4.',
    },
    name: '19 On Bay Noakes',
    title: 'Building 19 On Bay Noakes: from idea to a high-performance hotel website',
    summary: 'A production website for a boutique hotel in Harare, built for mobile, speed and bookings.',
    category: 'Full-Stack Development',
    position: 'FS',
    tier: 'gold',
    tierLabel: 'Live',
    icon: 'hotel',
    headline: { value: '75', label: 'PERF' },
    stats: [
      { value: 'Mid-90s', label: 'SEO' },
      { value: '>23s→4s', label: 'LCP' },
      { value: '250ms', label: 'Blocking' },
      { value: '−15%', label: 'JS bundle' },
    ],
    technologies: ['React 18', 'TypeScript', 'Vite', 'Tailwind CSS', 'Shadcn/ui', 'React Router', 'Supabase', 'Netlify', 'Google Analytics', 'SEO'],
    links: { live: 'https://19onbaynoakes.com', liveLabel: 'Visit 19onbaynoakes.com' },
    // Figures from the owner's write-up of the site.
    diagram: {
      title: 'Before and after',
      caption: 'Lighthouse and loading figures from my write-up: the first test, then the finished site.',
      groups: [
        { name: 'Before', items: ['Lighthouse performance 48', 'Largest Contentful Paint over 23s', 'Blocking time 680ms'] },
        { name: 'What I changed', items: ['Lazy-loaded the gallery', 'Split the JavaScript', 'Loaded analytics after the page', 'Fixed robots.txt and crawlable links'] },
        { name: 'After', items: ['Lighthouse performance 75 and above', 'Largest Contentful Paint just over 4s', 'Blocking time 250ms', 'JavaScript bundle 15% smaller', 'SEO and accessibility in the mid-90s'] },
      ],
    },
    image: { src: bayNoakesShot, alt: 'Home page of the 19 On Bay Noakes hotel website', caption: 'The live site, 19onbaynoakes.com' },
  },
  {
    slug: 'water-points',
    report: {
      problem: "Rural water points in Zimbabwe often break down, and it's hard to know which ones will fail next.",
      approach: 'Borehole, rainfall and hydrogeological data, around 20 engineered features, XGBoost and Random Forest with SMOTE, explained with SHAP.',
      result: '78 percent accuracy and a ROC-AUC of 0.93 on a held-out test set.',
    },
    name: 'Water Points ML',
    title: 'Machine learning framework for water point functionality prediction in Zimbabwe',
    summary: 'My dissertation: predicting which rural water points will fail, and explaining why, so repairs can happen first.',
    category: 'Machine Learning',
    position: 'ML',
    tier: 'inform',
    tierLabel: 'Dissertation',
    icon: 'water',
    headline: { value: '93', label: 'AUC %' },
    stats: [
      { value: 'SMOTE', label: 'Class balance' },
      { value: '78%', label: 'Accuracy' },
      { value: '~20', label: 'Features' },
      { value: '3', label: 'Datasets' },
    ],
    technologies: ['Python', 'XGBoost', 'Random Forest', 'SHAP', 'SMOTE', 'Feature Engineering'],
    links: {
      github: 'https://github.com/tkwushe/ml-final-year-project',
      demo: 'https://tkwushe.github.io/water-points-map/',
      demoTitle: 'Water point prediction interactive map',
    },
    // Stages and figures from the owner's dissertation write-up.
    diagram: {
      title: 'How the framework fits together',
      caption: 'From raw records to a map decision-makers can use.',
      groups: [
        { name: '1 · Data', items: ['Water Point Data Exchange records', 'CHIRPS rainfall', 'Hydrogeological attributes'] },
        { name: '2 · Features', items: ['Around 20 engineered features', '3, 6 and 12-month rainfall totals', 'Pump technology and infrastructure age'] },
        { name: '3 · Models', items: ['XGBoost and Random Forest', 'SMOTE for class imbalance', 'Tuned with RandomizedSearchCV'] },
        { name: '4 · Results', items: ['78% accuracy', 'ROC-AUC 0.93 on a held-out test set'] },
        { name: '5 · Explain', items: ['SHAP for every prediction', 'Feature ablation study'] },
      ],
    },
    image: { src: waterPointsShot, alt: 'Interactive map of predicted water point clusters across Zimbabwe', caption: 'The interactive water points map, tkwushe.github.io/water-points-map' },
  },
  {
    slug: 'fantasy-dungeon',
    report: {
      problem: 'Show how design patterns work together inside one large Java application.',
      approach: 'Event-driven design with Observer, a central GameEngine, Factory-built items, procedural levels and SQLite saves.',
      result: 'A complete dungeon crawler whose codebase shows Singleton, Factory, Observer and Facade working together.',
    },
    name: 'Fantasy Dungeon',
    title: 'Fantasy Dungeon Adventure: a deep dive into software architecture',
    summary: 'A Java dungeon crawler used as a working demonstration of layered, event-driven architecture.',
    category: 'Software Engineering',
    position: 'SWE',
    tier: 'silver',
    tierLabel: 'University',
    icon: 'dungeon',
    headline: { value: '4', label: 'PATTERNS' },
    stats: [
      { value: 'Observer', label: 'Events' },
      { value: 'SQLite', label: 'Saves' },
      { value: 'Swing', label: 'Renderer' },
      { value: 'JUnit 5', label: 'Tests' },
    ],
    technologies: ['Java', 'Design Patterns', 'Event-Driven Architecture', 'Swing', 'SQLite', 'JUnit', 'Procedural Generation', 'Multi-threading'],
    links: { github: 'https://github.com/tkwushe/Fantasy-Dungeon-Game' },
    // Taken from the repository's src/main/java/com/game packages.
    diagram: {
      title: 'How the code is organised',
      caption: 'Packages and classes in the Fantasy Dungeon repository.',
      groups: [
        { name: 'engine', items: ['GameEngine'] },
        { name: 'event', items: ['GameEvent', 'GameEventDispatcher', 'GameEventHandler', 'GameEventType', 'GameStateEventHandler', 'UIEventHandler'] },
        { name: 'item', items: ['Item', 'ItemType', 'HealingItem', 'ToolItem', 'NegativeItem', 'ItemFactory', 'DefaultItemFactory', 'ItemBuilder', 'ItemStats', 'ItemBehavior', 'HealingBehavior', 'DamageBehavior', 'ToolBehavior', 'Usable', 'Valuable'] },
        { name: 'database', items: ['DatabaseConfig', 'GameDatabaseService', 'GameState'] },
        { name: 'gui', items: ['GameWindow', 'MapPanel', 'InventoryPanel'] },
        { name: 'world', items: ['Level', 'Room', 'Puzzle', 'Player', 'Inventory'] },
      ],
    },
    runNote: 'This is a Java desktop application, so it cannot run in the browser. Clone the repository, open it in an IDE such as IntelliJ or Eclipse with Java 8+ installed, and run Main.java.',
  },
  {
    slug: 'mindcare-db',
    report: {
      problem: 'A mental health chatbot needs somewhere safe and structured to keep everything its conversations generate.',
      approach: 'Conceptual, logical and physical design across fifteen tables, JSON columns for attributes that evolve, audit logging and Faker test data.',
      result: 'Fifteen linked tables and five complex queries that answer real business and clinical questions.',
    },
    name: 'MindCareDB',
    title: 'MindCareDB: relational database for AI-driven mental health support',
    summary: 'The data backbone for a mental health chatbot: chat logs, mood tracking, therapist recommendations and crisis alerts.',
    category: 'Database Design',
    position: 'DB',
    tier: 'silver',
    tierLabel: 'University',
    icon: 'database',
    headline: { value: '15', label: 'TABLES' },
    stats: [
      { value: 'JSON', label: 'Flex columns' },
      { value: '5', label: 'Queries' },
      { value: 'GDPR', label: 'Privacy' },
      { value: 'Faker', label: 'Test data' },
    ],
    technologies: ['SQL', 'Database Design', 'Data Modelling', 'Python', 'Data Ethics'],
    links: { github: 'https://github.com/tkwushe/MindcareDatabase' },
    // Table names from mindcareDB_full_no_data_population.sql in the repository.
    diagram: {
      title: 'The fifteen tables',
      caption: 'Every table in the MindCareDB schema, grouped by what it holds.',
      groups: [
        { name: 'People', items: ['users', 'therapists', 'user_therapist_relationships'] },
        { name: 'Conversations and mood', items: ['chatbot_interactions', 'mood_tracking', 'therapist_recommendations'] },
        { name: 'Safety', items: ['crisis_alerts', 'mental_health_resources', 'resource_engagements'] },
        { name: 'Archive', items: ['archived_chatbot_interactions', 'archived_crisis_alerts', 'archived_mood_tracking'] },
        { name: 'Governance', items: ['data_audit_log', 'status_types', 'enum_usage_tracking'] },
      ],
    },
  },
].map((project) => ({ ...project, body: caseStudies[project.slug].split('\n\n') }));

// In development and current interests. Nothing here makes a results claim yet.
export const lab = [
  {
    name: 'Mine Surveillance',
    icon: 'satellite',
    status: 'In development',
    description: 'Detecting possible artisanal-mining disturbance in Zimbabwe from Sentinel-1 and Sentinel-2 satellite change signals. An offline demo runs on test data, and a person makes every final decision.',
    cardLine: 'Spotting mining scars in Sentinel-1 and -2 change',
    stats: [{ value: 'Demo', label: 'Stage' }],
  },
  {
    name: 'AI Radio Station',
    icon: 'radio',
    status: 'Planning',
    description: 'An AI-assisted production system for a sports radio show in Zimbabwe.',
    cardLine: 'AI help behind a Zimbabwean sports show',
    stats: [{ value: 'Planning', label: 'Stage' }],
  },
  {
    name: 'Knowledge Distillation',
    icon: 'distill',
    status: 'Current interest',
    description: "Training small models to do what large ones can, so useful AI can run on cheap hardware where it's needed. I'd like to use it in my next projects.",
    cardLine: 'Big-model skill in small, cheap models',
    stats: [{ value: 'Reading', label: 'Stage' }],
  },
];

// The bench: smaller builds without a write-up.
export const bench = [
  {
    name: 'Fridge Store Database',
    lang: 'SQL',
    description: 'MySQL inventory system with normalised tables, stored procedures, automated reorder triggers and JOIN-heavy reporting.',
    github: 'https://github.com/tkwushe/FridgeStoreDatabase',
  },
  {
    name: 'Intellicraft Educational Game',
    lang: 'Java',
    description: 'Educational Java game teaching computational thinking through crafting, with user authentication, dynamic difficulty and progress tracking.',
    github: 'https://github.com/tkwushe/Intellicraft-Game-',
  },
  {
    name: 'Car Sales Management System',
    lang: 'C',
    description: 'Dealership management in C: inventory tracking, sales processing, pricing calculations and business reports.',
    github: 'https://github.com/tkwushe/CarSales',
  },
];

export const findProject = (slug) => squad.find((project) => project.slug === slug);
