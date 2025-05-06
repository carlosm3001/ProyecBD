import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AnimatedForms.css';

const AnimatedForms = ({ onLoginSuccess }) => {
  const [activeForm, setActiveForm] = useState('login');
  const [showAdditionalDataForm, setShowAdditionalDataForm] = useState(false);
  const [showDataSummary, setShowDataSummary] = useState(false);
  const [clientData, setClientData] = useState({});
  const [petData, setPetData] = useState({});
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (activeForm === 'login') {
      setShowAdditionalDataForm(true);
    } else {
      alert('Registro exitoso. Ahora puedes iniciar sesión.');
      setActiveForm('login');
    }
  };

  const handleAdditionalDataSubmit = (e) => {
    e.preventDefault();
    const clientName = e.target.elements['client-name'].value;
    const petName = e.target.elements['pet-name'].value;
    const petType = e.target.elements['pet-type'].value;

    setClientData({ name: clientName });
    setPetData({ name: petName, type: petType });

    setShowDataSummary(true); // Muestra el resumen de datos
  };

  const handleAccept = () => {
    onLoginSuccess(clientData, petData);
    navigate('/detalles'); // Redirige a la vista de detalles del servicio
  };

  return (
    <section className="forms-section">
      <h1 className="section-title">Veterinaria Huellas Felices</h1>
      <div className="forms">
        {!showAdditionalDataForm ? (
          <>
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
          </>
        ) : (
          showDataSummary ? (
            <div className="data-summary">
              <h2>Resumen de Datos</h2>
              <p><strong>Nombre del Cliente:</strong> {clientData.name}</p>
              <p><strong>Nombre de la Mascota:</strong> {petData.name}</p>
              <p><strong>Tipo de Mascota:</strong> {petData.type}</p>
              <button onClick={handleAccept} className="btn-accept">ACEPTAR</button>
            </div>
          ) : (
            <form className="form form-additional" onSubmit={handleAdditionalDataSubmit}>
              <h2>Datos Adicionales</h2>
              <div className="input-block">
                <label htmlFor="client-name">Nombre del Cliente</label>
                <input
                  id="client-name"
                  type="text"
                  placeholder="Nombre completo"
                  required
                />
              </div>
              <div className="input-block">
                <label htmlFor="pet-name">Nombre de la Mascota</label>
                <input
                  id="pet-name"
                  type="text"
                  placeholder="Nombre de la mascota"
                  required
                />
              </div>
              <div className="input-block">
                <label htmlFor="pet-type">Tipo de Mascota</label>
                <input
                  id="pet-type"
                  type="text"
                  placeholder="Ej: Perro, Gato"
                  required
                />
              </div>
              <button type="submit" className="btn-submit">ENVIAR</button>
            </form>
          )
        )}
      </div>
    </section>
  );
};

export default AnimatedForms;
