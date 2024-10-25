import React, { useState, useEffect } from 'react';
import Header from './Header';
import About from './About';
import Projects from './Projects';
import Contact from './Contact';
import Home from './Home';
import Footer from './Footer';


const Wrapper = () => {
  const [activeArticle, setActiveArticle] = useState('header');

  // Handle setting active article and adding class to body
  const handleSetActive = (article) => {
    setActiveArticle(article);

    // Scroll the active article to the top of the page
    if (article !== 'header') {
      const targetArticle = document.getElementById(article);
      if (targetArticle) {
        targetArticle.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const handleClose = () => {
    setActiveArticle('header');
    // Scroll back to the top of the page when closing an article
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  // Add or remove class from the body based on active article
  useEffect(() => {
    const body = document.querySelector('body');
    if (activeArticle !== 'header') {
      body.classList.add('is-article-visible');
    } else {
      body.classList.remove('is-article-visible');
    }
  }, [activeArticle]);

  return (
    
    <div id="wrapper">
      <Header onSetActive={handleSetActive} />
      <body className="is-article-visible">
      <Home isActive={activeArticle === 'home'} onClose={handleClose} />
      <About isActive={activeArticle === 'about'} onClose={handleClose} />
      <Projects isActive={activeArticle === 'projects'} onClose={handleClose} />
      <Contact isActive={activeArticle === 'contact'} onClose={handleClose} />
      </body>
      <Footer />
    </div>
   
   
  );
};

export default Wrapper;
