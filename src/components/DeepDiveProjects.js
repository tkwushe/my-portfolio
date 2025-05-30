import React, { useState } from 'react';
import CloseButton from './CloseButton';
import './DeepDiveProjects.css';

const DeepDiveProjects = ({ isActive, onClose }) => {
  const [activeProject, setActiveProject] = useState(null);
  
  const projects = [
    {
      id: 2,
      title: "Machine Learning Framework for Water Point Functionality Prediction in Zimbabwe",
      shortDescription: "Developed a machine learning framework to predict water point functionality in Zimbabwe, addressing the critical issue of functional water scarcity.",
      live_demo_url: "https://tkwushe.github.io/water-points-map/",
      github_link: "https://github.com/tkwushe/ml-final-year-project",
      technologies: ["Machine Learning", "Python", "XGBoost", "Data Science", "SHAP", "Feature Engineering"],
      image_url: "",
      category: "Machine Learning",
      fullDescription: `This was my dissertation project and easily the most impactful and ambitious work I have done so far. The main goal was to predict the functionality of rural water points in Zimbabwe, essentially figuring out which boreholes or wells are likely to break down, when, and why, so repairs can be made before they actually fail.

The context here is deeply personal to me because Zimbabwe faces a unique challenge. There are enough renewable water resources on paper, and the country has a large network of water infrastructure. Yet much of it is broken down or unreliable due to years of underfunding, drought, and management issues. This leads to what is known as functional water scarcity, where water exists but does not reach the people who need it.

My objective was to bridge the gap between data and practical decision-making for water resource managers, NGOs, and policymakers. The solution I came up with was to develop the first machine learning framework tailored to Zimbabwe's situation, using a mix of environmental data like rainfall and geology, technical data such as pump type and age, and some socio-economic factors as well.

I started by integrating multiple datasets, including the Water Point Data Exchange which logs borehole details, CHIRPS rainfall data, and hydrogeological attributes. I spent a lot of time cleaning, validating, and aligning them both geographically and temporally, which meant dealing with missing values, matching districts to standard codes, and filtering out unreliable records.

Next, I engineered around 20 high-value features, such as 3, 6, and 12-month rainfall totals, pump technology, and infrastructure age. The aim was to capture the factors that genuinely influence whether a water point will keep working or fail. For model development, I trained and compared Gradient Boosted Trees (XGBoost) and Random Forest models, using robust cross-validation and SMOTE to address class imbalance. Hyperparameters were tuned using RandomizedSearchCV. The models were thoroughly evaluated with a held-out test set, and the best model, XGBoost, achieved an accuracy of 78 percent and a ROC-AUC of 0.93. This is a big jump over what previous studies in the region have managed.

A key focus was on making the model explainable and actionable, not just accurate. I used SHAP values to break down the impact of each variable, both for the whole dataset and for individual predictions. This allowed me to show, for example, that hand pumps are much more reliable than rope-and-bucket systems under certain conditions, or that rainfall variability over the past year is a major driver of failure. I also did a feature ablation study to demonstrate what happens when certain predictors are removed, showing the critical role played by infrastructure features.

The final result is a framework that lets decision-makers see which water points are most at risk, understand the reasons, and take targeted action. Beyond the technical achievement, I made sure to address ethical considerations throughout, such as transparency, fairness, and reproducibility, and I archived all the code and processing steps for others to review.

This work means a lot to me because it is not just academic. It has real potential to help communities, save resources, and bring Zimbabwe closer to the goal of clean water and sanitation for all. I see it as a clear example of how AI and data science can make a real difference for some of the most important challenges in places like Zimbabwe.`,
    },
    {
      id: 3,
      title: "Fantasy Dungeon Adventure: A Deep Dive into Software Architecture",
      shortDescription: "Developed a comprehensive Java game application demonstrating enterprise-level software architecture and design patterns.",
      github_link: "https://github.com/tkwushe/Fantasy-Dungeon-Game",
      play_instructions: "To play this game: 1) Clone the repository, 2) Open in an IDE like IntelliJ or Eclipse, 3) Ensure Java 8+ is installed, 4) Run the Main.java file to start the adventure!",
      technologies: ["Java", "Design Patterns", "Object-Oriented Programming", "Event-Driven Architecture", "Swing GUI", "SQLite", "JUnit", "Procedural Generation", "Multi-threading", "Software Architecture", "Dependency Management"],
      image_url: "",
      category: "Software Engineering",
      fullDescription: `This project was my first major undertaking in my final year, and it marks the most in-depth exploration I have done in software architecture and design patterns using Java. What started as a simple text-based adventure quickly turned into a serious exercise in enterprise-level software engineering. I wanted to go beyond the usual CRUD apps and test myself with something much more involved, with layered architecture, event-driven logic, multiple design patterns, and real persistence. My goal was not just to make a game, but to create a comprehensive educational resource that shows how to structure a substantial Java application in a way that reflects industry standards.

I have always been passionate about clean code and scalable systems, and I chose a game for this project because it brings together so many interesting challenges: managing state, handling real-time user input, creating procedural content, and delivering a smooth, responsive user experience. I saw a real opportunity to bring patterns like Singleton, Factory, and Observer together in a single, functional application, which felt much more realistic than the isolated code samples you find in most tutorials. I wanted to build something that actually demonstrates how best practices work together, just like they do in professional software. And because it was my first final-year project, I made sure to polish every part of it to meet the higher expectations for graduation.

Early on, I made some key architectural decisions that shaped everything else. Instead of writing a monolithic game loop, I organised the code around event-driven design using the Observer pattern, which meant different components could communicate without being tightly connected. The GameEngine serves as a central point of control, handling everything from player actions and level changes to updating the interface. For saving and loading game state, I implemented a SQLite-based save system using Java serialization, balancing the need for simplicity with future flexibility. Save states are stored as BLOBs, making the system efficient but still easy to query and manage.

One of the most interesting parts of the project was procedural generation. I built an algorithm to generate dungeon levels that are always solvable and balanced in terms of challenge, which meant validating every layout so players could always reach the treasure and face a fair mix of obstacles. The GUI was another area that stretched my skills. I created a custom map renderer with double buffering to get rid of flickering and make sure updates happened in real time as players explored. That took careful memory management and efficient drawing logic, which was genuinely satisfying to get right in Swing.

The item factory system is another highlight. I designed an interface that lets the game generate different item types with varying properties depending on difficulty, which really shows how the Factory pattern can make object creation clean and scalable. My event system is also something I am proud of. I created type-safe event handlers, so the GUI and other components can respond to changes in the game state without needing to know the inner workings of the game logic. This keeps everything clean and easy to extend.

I put a lot of effort into code quality and maintainability. Every class is focused on a single responsibility and the structure of the codebase is logical and easy to navigate. I used proper error handling, logging, and made sure database connections are always managed safely. The GUI code respects thread safety, using Swing's Event Dispatch Thread for updates. I also started a testing strategy with JUnit 5, especially for the core components, and wrote detailed documentation so other developers can pick up the project easily.

The end result is a complete dungeon crawler where players explore random levels, solve puzzles, manage inventory, and save progress. But the real value is in the architecture: the codebase is a working demonstration of how patterns like Singleton, Factory, Observer, and Facade can work together in a maintainable and extensible way. The application runs efficiently, manages memory well, and is genuinely responsive because of the attention to UI and event handling. New features are easy to add, and debugging or extending the system is much smoother thanks to the foundation I put in place.

This project pushed me to think like a professional software engineer rather than just a coder. It taught me that smart architectural decisions made at the start really pay off as the project grows. Seeing how well everything fit together as I added features was incredibly rewarding, and I feel proud of the result both as a fun game and as a showcase of solid software engineering.`,
    },
    {
      id: 1,
      title: "MindCareDB: Advanced Relational Database for AI-Driven Mental Health Support",
      shortDescription: "Designed and implemented a comprehensive relational database to support an AI-driven mental health chatbot application.",
      github_link: "https://github.com/tkwushe/MindcareDatabase",
      technologies: ["SQL", "Database Design", "Data Modeling", "Python", "Data Ethics"],
      image_url: "",
      category: "Database Design",
      fullDescription: `This was a project where I designed and implemented a relational database called MindCareDB, which serves as the backbone for a mental health chatbot application. The aim was to provide a robust, scalable, and secure way to manage all the data generated from user interactions with an AI-driven mental health chatbot. That includes everything from chat logs and mood tracking to therapist recommendations and crisis alerts.

What really motivated this project was the growing importance of digital mental health support, especially as demand for mental health services increases and resources are stretched thin. I wanted to build something that did more than just store data. The goal was to enable in-depth analysis so we could answer real business and clinical questions such as what mental health issues are most common among users or how effective therapist recommendations are in improving user mood. This approach ensures that data directly informs better interventions.

The process started with business analysis, understanding who the users would be, like end users, therapists, and admins, and considering the sensitive nature of the data as well as all the compliance requirements around regulations like GDPR. This shaped a detailed conceptual design. I mapped out the main entities: users, chatbot interactions, mood tracking entries, therapist recommendations, crisis alerts, mental health resources, and therapists themselves. I worked through how these tables would relate to each other, making sure referential integrity and access privileges were well-defined from the start.

From there, I developed a logical and then a physical schema, which involved making some tough decisions. For instance, I chose to include JSON columns for attributes that might evolve over time, such as user preferences, so the system would remain flexible and scalable. I also implemented relationship management tables to keep track of the dynamics between users and therapists, instead of relying on static foreign keys. To keep everything secure and auditable, I set up audit logging and archiving of sensitive data.

Populating the database presented its own challenges. I used Python and the Faker library to generate realistic test data across all fifteen tables, making sure all the data linked together properly for advanced query testing. With this dataset, I developed and validated five complex SQL queries, each reflecting real business needs, from tracking mood changes after chatbot conversations to measuring therapist response effectiveness and analysing trends in crisis alerts.

A lot of consideration went into performance and future-proofing. I made sure heavily used tables were indexed, anticipated high user volumes, and included multilingual support and inclusive gender options. Ethical considerations were at the forefront too, like pseudonymising user data and building privacy-first principles into every step.

In the end, MindCareDB is not just a technical artefact. It is a foundation that can genuinely support and improve mental health outcomes at scale. By making the data accessible and useful for analysis, it empowers organisations to make evidence-based decisions and continually improve their digital health services.`
    }
  ];

  // Handle escape key
  React.useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isActive) {
        if (activeProject) {
          setActiveProject(null); // First close the active project
        } else {
          onClose(); // Then close the section
        }
      }
    };

    if (isActive) {
      window.addEventListener('keydown', handleEscape);
    }

    return () => window.removeEventListener('keydown', handleEscape);
  }, [isActive, onClose, activeProject]);

  const handleProjectClick = (project) => {
    setActiveProject(project);
    // Scroll to top when viewing a project
    window.scrollTo(0, 0);
  };

  const handleBackClick = () => {
    setActiveProject(null);
  };

  return (
    <article 
      id="deep-dive-projects" 
      className={isActive ? 'active' : ''}
      role="dialog"
      aria-modal="true"
    >
      <CloseButton onClick={onClose} />

      {!activeProject ? (
        <>
          <h2 className="major">In-Depth Project Case Studies</h2>
          <p>
            These case studies provide detailed insights into my most complex and impactful projects,
            showcasing the complete journey from problem definition to implementation and results.
          </p>

          <div className="deep-dive-projects-grid">
            {projects.map(project => (
              <div key={project.id} className="deep-dive-project-card">
                <h3>{project.title}</h3>
                <p>{project.shortDescription}</p>
                <div className="tech-tags">
                  {project.technologies.slice(0, 3).map((tech, index) => (
                    <span key={index} className="tech-tag">{tech}</span>
                  ))}
                  {project.technologies.length > 3 && <span className="tech-tag">+{project.technologies.length - 3}</span>}
                </div>
                <button 
                  className="read-more-button"
                  onClick={() => handleProjectClick(project)}
                >
                  Read Case Study
                </button>
              </div>
            ))}
          </div>
        </>
      ) : (
        <div className="project-deep-dive">
          <button className="back-button" onClick={handleBackClick}>
            ← Back to Projects
          </button>
          
          <h2>{activeProject.title}</h2>
          
          <div className="project-meta">
            <div className="tech-tags">
              {activeProject.technologies.map((tech, index) => (
                <span key={index} className="tech-tag">{tech}</span>
              ))}
            </div>
            
            {activeProject.github_link && (
              <a 
                href={activeProject.github_link} 
                target="_blank" 
                rel="noopener noreferrer"
                className="github-link"
              >
                View on GitHub
              </a>
            )}
          </div>
          
          {activeProject.fullDescription.split('\n\n').map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
          
          {/* Embedded GitHub Website for Machine Learning Project */}
          {activeProject.id === 2 && activeProject.live_demo_url && (
            <div className="embedded-demo-container">
              <h3>Interactive Demo</h3>
              <p>Below is an interactive visualization of the machine learning model and water point data:</p>
              <iframe 
                src={activeProject.live_demo_url}
                title="Water Point Prediction Interactive Demo"
                className="embedded-demo"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          )}
          
          {activeProject.id === 3 && activeProject.play_instructions && (
            <div className="game-instructions-container">
              <h3>How to Play</h3>
              <div className="note-box">
                <p><strong>Note:</strong> This is a Java desktop application that cannot run directly in the browser.</p>
                <p>{activeProject.play_instructions}</p>
                <a 
                  href={activeProject.github_link} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="download-button"
                >
                  Download Source Code
                </a>
              </div>
              <div className="screenshots-container">
                <p>See the GitHub repository for screenshots and more details about this desktop application.</p>
              </div>
            </div>
          )}
        </div>
      )}
    </article>
  );
};

export default React.memo(DeepDiveProjects);
