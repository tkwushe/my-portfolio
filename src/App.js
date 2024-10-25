import React, { useEffect } from 'react';
import Wrapper from './components/Wrapper';
import './App.css';

const App = () => {
  useEffect(() => {
    const removePreloadClass = () => {
      document.body.classList.remove('is-preload');
    };

    // Remove preload class after the page has loaded
    window.addEventListener('load', removePreloadClass);

    // Cleanup the event listener
    return () => {
      window.removeEventListener('load', removePreloadClass);
    };
  }, []);

  return (
    <div>
      <Wrapper />
    </div>
  );
};

export default App;