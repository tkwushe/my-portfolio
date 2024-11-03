import React from 'react';
import './CloseButton.css';

const CloseButton = ({ onClick }) => {
  const handleClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    onClick(e);
  };

  return (
    <button 
      className="close-button" 
      onClick={handleClick} 
      aria-label="Close"
      type="button"
    >
      <span className="close-icon"></span>
    </button>
  );
};

export default React.memo(CloseButton);
