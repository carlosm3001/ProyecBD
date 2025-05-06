import React, { useState } from 'react';
import './AnimatedForms.css';

const AnimatedForms = ({ onLoginSuccess }) => {
  const [activeForm, setActiveForm] = useState('login');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (activeForm === 'login') {
      onLoginSuccess();
    } else {
      alert('Registro exitoso. Ahora puedes iniciar sesión.');
      setActiveForm('login');
    }
  };

  return (
    <section className="forms-section">
      <h1 className="section-title">Veterinaria Huellas Felices</h1>
      
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
          <fieldset>
            <legend>Por favor, ingresa tus credenciales</legend>
            <div className="input-block">
              <label htmlFor="login-email">Correo Electrónico</label>
              <input 
                id="login-email" 
                type="email" 
                placeholder="ejemplo@correo.com" 
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
          </fieldset>
          <button type="submit" className="btn-login">Ingresar</button>
        </form>
      </div>

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
          <fieldset>
            <legend>Completa tus datos</legend>
            <div className="input-block">
              <label htmlFor="signup-name">Nombre Completo</label>
              <input 
                id="signup-name" 
                type="text" 
                placeholder="Juan Pérez" 
                required 
              />
            </div>
            <div className="input-block">
              <label htmlFor="signup-email">Correo Electrónico</label>
              <input 
                id="signup-email" 
                type="email" 
                placeholder="ejemplo@correo.com" 
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
          </fieldset>
          <button type="submit" className="btn-signup">Registrarse</button>
        </form>
      </div>
    </section>
  );
};

export default AnimatedForms;