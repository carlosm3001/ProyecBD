import React from 'react';

const HeroSection = () => {
  return (
    <section className="hero" id="inicio">
      <div className="hero-content">
        <h1>¿Le pasó algo a tu mascota?<br />Estamos aquí para ayudarla</h1>
        <p>Las urgencias no se esperan y en Huellas Felices estamos listos para atenderlas.</p>
        <a href="#contacto" className="btn-primary">¡Visítanos hoy mismo!</a>
      </div>
      <div className="hero-image">
        <img src="/img/perrito.png" alt="Perrito feliz" loading="lazy" />
      </div>
    </section>
  );
};

export default HeroSection;