import React from 'react';

const FloatingButtons = () => {
  return (
    <div className="floating-buttons">
      <a href="tel:+573214002119" className="call-btn">📞 Llámanos</a>
      <a 
        href="https://wa.me/573214002119" 
        className="whatsapp-btn" 
        target="_blank"
        rel="noopener noreferrer"
      >
        💬 Escríbenos
      </a>
    </div>
  );
};

export default FloatingButtons;