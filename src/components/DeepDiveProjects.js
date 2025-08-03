import React, { useState } from 'react';
import CloseButton from './CloseButton';
import './DeepDiveProjects.css';

const DeepDiveProjects = ({ isActive, onClose }) => {
  const [activeProject, setActiveProject] = useState(null);
  
  const projects = [
    {
      id: 4,
      title: "Building 19 On Bay Noakes – From Idea to a High-Performance Hotel Website",
      shortDescription: "Developed a high-performance hotel website focusing on real-world usability, mobile optimization, and conversion-driven design.",
      live_demo_url: "https://19onbaynoakes.com",
      github_link: "", // Add if you have a public repo
      technologies: ["React 18", "TypeScript", "Vite", "Tailwind CSS", "Shadcn/ui", "React Router", "Supabase", "Netlify", "Google Analytics", "Performance Optimization", "SEO", "Responsive Design"],
      image_url: "",
      category: "Full-Stack Development",
      fullDescription: `When I took on the 19 On Bay Noakes website, I knew I wanted it to do more than just impress at first glance. The goal was to help this boutique hotel in Harare get real bookings and create an online experience that actually lived up to the luxury brand. That meant I needed to combine great design with proper performance, which ended up teaching me loads along the way.

Before jumping into code, I spent some time researching the best hotel websites out there. I looked closely at sites for big names like Marriott and Radisson, picking out what made them work so well for guests. I noticed that everything from the booking process to the way they used images and trust signals played a big part in getting people to convert. I took all that on board and used it to shape my own design and layout choices.

On the technical side, I went with React 18 and TypeScript to keep everything clean and manageable, Vite for speedy builds and development, Tailwind CSS and Shadcn/ui for styling, React Router for easy navigation, Supabase to handle bookings behind the scenes, Netlify for hassle-free hosting, and Google Analytics so I could track and improve the site as I went.

I also made sure to follow the brand manual the hotel provided. That really helped keep the look and feel consistent across every page, from colours to logos and typography. It's a simple thing, but sticking to those guidelines made the whole site look much more professional.

My design principles were pretty clear: focus on mobile first since nearly everyone checks hotel sites on their phone, prioritise speed over any flashy effects, and every part of the site needed to guide visitors towards making a booking.

I set up the core pages based on how real guests would move through the site: Homepage with a video, quick room previews, trust signals, and an immediate booking call-to-action; Rooms page with all the details and pricing; Gallery split into easy-to-navigate categories like breakfast, rooms, and the property itself; Contact page with phone, email, and location details; and a Booking page.

I wanted to build a smooth, in-house booking page like you see on the top hotel sites. I even designed and built a proper booking form and page for the hotel. But I quickly realised synchronising everything with the NightsBridge system was a challenge. There isn't a simple plug-and-play API that I could use right away, at least not without a lot more time and possibly support from the NightsBridge team.

For now, I swapped out my custom booking page for a clear hyperlink that takes guests to the official NightsBridge booking portal. It's not my dream solution, but it works reliably and means guests can still book without any hassle. I plan to revisit the full integration once the site gets more traction and I've had a chance to look into API options or other ways to connect directly.

I built out the main pages around the guest journey, always thinking about what would be easiest and most appealing for people coming to the site. The client gave me lots of amazing photos, but I quickly found that some were huge files – over 3MB. Loading them all at once would have slowed the site to a crawl, so I set up lazy loading so that images only load when needed. This really helped speed up the site.

When I first tested the site with Lighthouse, the results weren't great: Performance score was only 48 out of 100, Largest Contentful Paint was above 23 seconds, and Blocking time was 680ms. I realised quickly that nobody would wait that long. I sorted this by fixing the gallery so only the images people are about to view are loaded, splitting up the JavaScript code so only essentials load first, and making sure Google Analytics loads after the rest of the page is ready.

On mobile, I noticed the homepage video wasn't autoplaying like it should. I found that mobile browsers are really strict about autoplay unless videos are muted and set up correctly. After tweaking the settings, the video now runs smoothly on all devices.

I also fixed some smaller things that made a big difference: making sure all navigation links take you to the top of the page not halfway down, showing breakfast images first in the gallery because those always help, and replacing inactive social links with only the ones that actually work.

During my SEO checks, I saw that robots.txt was set up wrong, which meant search engines weren't seeing the site as they should. A quick fix there made the site much more visible. Some of the navigation links weren't being picked up properly by search engines due to how the UI library worked. Once I updated the code, search engines could see everything they needed to.

With the site ready, I sorted the domain, SSL, DNS, and swapped all the references to the new .com address. I set up Google Analytics to track things like page load speed, how people use the site, and what devices they're on. I'm still learning more about analytics every week and using those insights to keep improving the site.

The results speak for themselves: Lighthouse performance went from 48 up to 75 and above, Largest Contentful Paint dropped to just over 4 seconds, Blocking time was reduced to 250ms, the JavaScript bundle is now 15 percent smaller, and SEO and accessibility scores are both now in the mid-90s. The website is now quick, mobile-friendly, and ready for guests, with a booking system that's reliable, even if it's just a link for now.

There's still plenty I want to do: bring back the full custom booking page once I figure out a good way to sync with NightsBridge using an API or another direct method, add support for multiple languages for international guests, make the site even more accessible especially for those using screen readers, try out new image formats for better loading like WebP and AVIF, and maybe add a live chat so guests can ask questions in real time.

Building the 19 On Bay Noakes website has been a real mix of research, creative design, and proper technical problem-solving. By looking at the best hotels out there and sticking to a consistent brand manual, I was able to create something that looks the part and actually works for real people. There have been plenty of challenges along the way, but every one has made the site better. You can see the finished product at 19onbaynoakes.com, and I'm excited to keep pushing it forward.`,
    },
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

  // Scroll to top when article becomes active
  React.useEffect(() => {
    if (isActive) {
      setTimeout(() => {
        const article = document.getElementById('deep-dive-projects');
        if (article) {
          article.scrollTop = 0;
        }
      }, 100); // Small delay to ensure article is rendered
    }
  }, [isActive]);

  const handleProjectClick = (project) => {
    setActiveProject(project);
    // Scroll the article container to top when viewing a project
    setTimeout(() => {
      const article = document.getElementById('deep-dive-projects');
      if (article) {
        article.scrollTop = 0;
      }
    }, 0);
  };

  const handleBackClick = () => {
    setActiveProject(null);
    // Scroll the article container to top when going back to project list
    setTimeout(() => {
      const article = document.getElementById('deep-dive-projects');
      if (article) {
        article.scrollTop = 0;
      }
    }, 0);
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
          
          {/* Live Website Demo for Hotel Project */}
          {activeProject.id === 4 && activeProject.live_demo_url && (
            <div className="live-website-container">
              <h3>Live Website</h3>
              <p>Visit the live hotel website to see the full implementation in action:</p>
              <a 
                href={activeProject.live_demo_url}
                target="_blank" 
                rel="noopener noreferrer"
                className="live-demo-button"
              >
                Visit 19onbaynoakes.com
              </a>
            </div>
          )}

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
