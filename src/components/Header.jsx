import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="navbar">
      <img src="/img/logo.png" alt="Veterinaria Huellas Felices" className="logo" />
      <nav>
        <ul className="nav-links">
          <li><Link to="/">Inicio</Link></li>
          <li><Link to="/servicios">Servicios</Link></li>
          <li><Link to="/nosotros">Nosotros</Link></li>
          <li><Link to="/blog">Blog</Link></li>
          <li><Link to="/contacto">Contáctanos</Link></li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
