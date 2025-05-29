import React, { useState, useCallback, useEffect } from 'react';
import Header from './Header';
import Home from './Home';
import About from './About';
import Projects from './Projects';
import Contact from './Contact';
import AdminProjects from './AdminProjects';
import Footer from './Footer';

const Wrapper = () => {
  const [activeArticle, setActiveArticle] = useState('header');

  const handleClose = useCallback(() => {
    setActiveArticle('header');
    window.location.hash = '';
  }, []);

  // Handle body class
  useEffect(() => {
    const isArticleVisible = activeArticle !== 'header';
    document.body.classList.toggle('is-article-visible', isArticleVisible);
    
    // Cleanup
    return () => {
      document.body.classList.remove('is-article-visible');
    };
  }, [activeArticle]);

  // Handle URL hash changes and initial URL
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash) {
        const article = hash.substring(1); // Remove the # character
        if (['home', 'about', 'projects', 'contact', 'admin'].includes(article)) {
          console.log('Setting active article from URL hash:', article);
          setActiveArticle(article);
        }
      } else {
        setActiveArticle('header');
      }
    };

    // Handle initial URL hash
    handleHashChange();

    // Listen for hash changes
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Global escape key handler
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && activeArticle !== 'header') {
        handleClose();
      }
    };

    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [activeArticle, handleClose]);

  const handleSetActive = useCallback((article) => {
    if (article === activeArticle) return;
    setActiveArticle(article);
    window.location.hash = article === 'header' ? '' : article;
  }, [activeArticle]);

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
        <AdminProjects 
          isActive={activeArticle === 'admin'} 
          onClose={handleClose}
        />
      </main>
      <Footer />
    </div>
  );
};

export default React.memo(Wrapper);
