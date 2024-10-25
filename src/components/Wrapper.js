import React, { useState, useEffect, useCallback, useLayoutEffect } from 'react';
import Header from './Header';
import Home from './Home';
import About from './About';
import Projects from './Projects';
import Contact from './Contact';
import Footer from './Footer';

const Wrapper = () => {
  const [activeArticle, setActiveArticle] = useState('header');
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Optimize the setActive handler with transition state
  const handleSetActive = useCallback((article) => {
    setIsTransitioning(true);
    setActiveArticle(article);
    // Reset transition state after a short delay
    setTimeout(() => setIsTransitioning(false), 200);
  }, []);

  // Optimize close handler for immediate response
  const handleClose = useCallback((e) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    
    // Immediately remove visible class before state update
    document.body.classList.remove('is-article-visible');
    setIsTransitioning(true);
    
    // Immediate state update
    setActiveArticle('header');
    
    // Reset transition state
    setTimeout(() => setIsTransitioning(false), 200);
  }, []);

  // Use useLayoutEffect for synchronous DOM updates
  useLayoutEffect(() => {
    if (!isTransitioning) {
      document.body.classList.toggle('is-article-visible', activeArticle !== 'header');
    }
  }, [activeArticle, isTransitioning]);

  return (
    <div id="wrapper" className={isTransitioning ? 'is-transitioning' : ''}>
      <Header onSetActive={handleSetActive} />
      <div id="main">
        <Home 
          isActive={activeArticle === 'home'} 
          onClose={handleClose}
          isTransitioning={isTransitioning} 
        />
        <About 
          isActive={activeArticle === 'about'} 
          onClose={handleClose}
          isTransitioning={isTransitioning} 
        />
        <Projects 
          isActive={activeArticle === 'projects'} 
          onClose={handleClose}
          isTransitioning={isTransitioning} 
        />
        <Contact 
          isActive={activeArticle === 'contact'} 
          onClose={handleClose}
          isTransitioning={isTransitioning} 
        />
      </div>
      <Footer />
    </div>
  );
};

export default React.memo(Wrapper);
