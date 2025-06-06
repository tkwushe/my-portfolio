import React, { useEffect } from 'react';
import Wrapper from './components/Wrapper';
import './App.css';

const App = () => {
  useEffect(() => {
    const removePreloadClass = () => {
      document.body.classList.remove('is-preload');
    };

    const initializeApp = () => {
      // Remove preload class immediately
      removePreloadClass();
      
      // Force a repaint to ensure mobile layout is properly rendered
      if (window.innerWidth <= 736) {
        // Mobile-specific initialization
        document.body.style.minHeight = '100vh';
        document.body.style.backgroundColor = '#0a0b0c';
        
        // Force re-render after a short delay to ensure layout is correct
        setTimeout(() => {
          const wrapper = document.getElementById('wrapper');
          const header = document.getElementById('header');
          const main = document.getElementById('main');
          
          if (wrapper) {
            wrapper.style.display = 'flex';
            wrapper.style.flexDirection = 'column';
            wrapper.style.minHeight = '100vh';
          }
          
          if (header) {
            header.style.position = 'relative';
            header.style.opacity = '1';
            header.style.visibility = 'visible';
            header.style.transform = 'none';
            header.style.filter = 'none';
          }
          
          if (main) {
            main.style.position = 'relative';
            main.style.display = 'flex';
            main.style.flexDirection = 'column';
            main.style.flexGrow = '1';
          }
        }, 100);
      }
    };

    // Remove preload class immediately
    initializeApp();

    // Also remove on window load as backup
    window.addEventListener('load', removePreloadClass);
    
    // Remove preload class after a timeout as fallback
    const timeoutId = setTimeout(removePreloadClass, 500);

    // Cleanup
    return () => {
      window.removeEventListener('load', removePreloadClass);
      clearTimeout(timeoutId);
    };
  }, []);

  return (
    <div>
      <Wrapper />
    </div>
  );
};

export default App;