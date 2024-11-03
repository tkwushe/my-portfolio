import React, { useState, useCallback, useEffect } from 'react';
import Header from './Header';
import Home from './Home';
import About from './About';
import Projects from './Projects';
import Contact from './Contact';
import Footer from './Footer';

const Wrapper = () => {
  const [activeArticle, setActiveArticle] = useState('header');

  // Handle body class
  useEffect(() => {
    const isArticleVisible = activeArticle !== 'header';
    document.body.classList.toggle('is-article-visible', isArticleVisible);
    
    // Cleanup
    return () => {
      document.body.classList.remove('is-article-visible');
    };
  }, [activeArticle]);

  // Global escape key handler
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && activeArticle !== 'header') {
        handleClose();
      }
    };

    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [activeArticle]);

  const handleSetActive = useCallback((article) => {
    if (article === activeArticle) return;
    setActiveArticle(article);
  }, [activeArticle]);

  const handleClose = useCallback(() => {
    setActiveArticle('header');
  }, []);

  return (
    <div id="wrapper">
      <Header onSetActive={handleSetActive} />
      <main id="main">
        <Home 
          isActive={activeArticle === 'home'} 
          onClose={handleClose}
        />
        <About 
          isActive={activeArticle === 'about'} 
          onClose={handleClose}
        />
        <Projects 
          isActive={activeArticle === 'projects'} 
          onClose={handleClose}
        />
        <Contact 
          isActive={activeArticle === 'contact'} 
          onClose={handleClose}
        />
      </main>
      <Footer />
    </div>
  );
};

export default React.memo(Wrapper);
