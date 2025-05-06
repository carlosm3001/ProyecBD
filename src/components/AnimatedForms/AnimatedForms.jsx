import React, { useState } from 'react';
import './AnimatedForms.css';

const AnimatedForms = ({ onLoginSuccess }) => {
  const [activeForm, setActiveForm] = useState('login');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (activeForm === 'login') {
      // Aquí iría tu lógica de autenticación real
      onLoginSuccess();
    } else {
      alert('Registro exitoso. Ahora puedes iniciar sesión.');
      setActiveForm('login');
    }
  };

  return (
    <section className="forms-section">
      <h1 className="section-title">Veterinaria Huellas Felices</h1>
      
      <div className="forms">
        {/* Formulario de Login */}
        <div className={`form-wrapper ${activeForm === 'login' ? 'is-active' : ''}`}>
          <button 
            type="button"
            className="switcher switcher-login"
            onClick={() => setActiveForm('login')}
          >
            INICIAR SESIÓN
            <span className="underline"></span>
          </button>
          
          <form className="form form-login" onSubmit={handleSubmit}>
            <div className="input-block">
              <label htmlFor="login-email">Correo Electrónico</label>
              <input 
                id="login-email" 
                type="email" 
                placeholder="tucorreo@ejemplo.com" 
                required 
              />
            </div>
            <div className="input-block">
              <label htmlFor="login-password">Contraseña</label>
              <input 
                id="login-password" 
                type="password" 
                placeholder="••••••••" 
                required 
              />
            </div>
            <button type="submit" className="btn-login">INGRESAR</button>
          </form>
        </div>

        {/* Formulario de Registro */}
        <div className={`form-wrapper ${activeForm === 'signup' ? 'is-active' : ''}`}>
          <button 
            type="button"
            className="switcher switcher-signup"
            onClick={() => setActiveForm('signup')}
          >
            REGISTRARSE
            <span className="underline"></span>
          </button>
          
          <form className="form form-signup" onSubmit={handleSubmit}>
            <div className="input-block">
              <label htmlFor="signup-name">Nombre Completo</label>
              <input 
                id="signup-name" 
                type="text" 
                placeholder="Ej: Juan Pérez" 
                required 
              />
            </div>
            <div className="input-block">
              <label htmlFor="signup-email">Correo Electrónico</label>
              <input 
                id="signup-email" 
                type="email" 
                placeholder="tucorreo@ejemplo.com" 
                required 
              />
            </div>
            <div className="input-block">
              <label htmlFor="signup-password">Contraseña</label>
              <input 
                id="signup-password" 
                type="password" 
                placeholder="••••••••" 
                required 
                minLength="6"
              />
            </div>
            <div className="input-block">
              <label htmlFor="signup-confirm">Confirmar Contraseña</label>
              <input 
                id="signup-confirm" 
                type="password" 
                placeholder="••••••••" 
                required 
              />
            </div>
            <button type="submit" className="btn-signup">REGISTRARSE</button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default AnimatedForms;