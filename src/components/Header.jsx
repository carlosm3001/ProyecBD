import React from 'react';

const Header = () => {
  return (
    <header className="navbar">
      <img src="/img/logo.png" alt="Veterinaria Huellas Felices" className="logo" />
      <nav>
        <ul className="nav-links">
          <li><a href="#inicio">Inicio</a></li>
          <li><a href="#servicios">Servicios</a></li>
          <li><a href="#nosotros">Nosotros</a></li>
          <li><a href="#blog">Blog</a></li>
          <li><a href="#contacto">Contáctanos</a></li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;