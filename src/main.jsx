import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './styles/global.css';
import './styles/card.css';
import './styles/card-art.css';
import './styles/broadcast-sections.css';
import './styles/formation.css';
import './styles/case-extra.css';
import './styles/form.css';
import './styles/motion.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
);
