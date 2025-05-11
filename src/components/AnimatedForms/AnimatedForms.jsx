import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AnimatedForms.css';

const API_BASE_URL = 'http://localhost:3000/api';

const AnimatedForms = ({ onLoginSuccess }) => {
  const [activeForm, setActiveForm] = useState('login');
  const [showAdditionalDataForm, setShowAdditionalDataForm] = useState(false);
  const [showDataSummary, setShowDataSummary] = useState(false);
  const [clientData, setClientData] = useState({});
  const [petData, setPetData] = useState({});
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());

    // Validaciones del frontend
    if (data['signup-password'] !== data['signup-confirm']) {
      setError('Las contraseñas no coinciden');
      setIsLoading(false);
      return;
    }

    if (data['signup-password'].length < 6) {
      setError('La contraseña debe tener al menos 6 caracteres');
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/registro`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nombres: data['signup-name'].split(' ')[0],
          apellidos: data['signup-name'].split(' ').slice(1).join(' ') || data['signup-name'].split(' ')[0],
          correo: data['signup-email'],
          password: data['signup-password'],
          telefono: data['signup-phone'] || '0000000000',
          direccion: data['signup-address'] || 'Dirección no especificada',
          tipo_documento: 1
        }),
      });

      // Verificar si la respuesta es JSON
      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        const text = await response.text();
        throw new Error(text || 'Respuesta no JSON del servidor');
      }

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Error en el registro');
      }

      // Guardar token y datos de usuario
      localStorage.setItem('token', result.token);
      localStorage.setItem('user', JSON.stringify(result.user));
      
      setClientData({
        name: data['signup-name'],
        email: data['signup-email'],
        phone: data['signup-phone'],
        address: data['signup-address']
      });

      setShowAdditionalDataForm(true);
    } catch (err) {
      setError(err.message.includes('Unexpected token') 
        ? 'Error en el servidor. Por favor intenta más tarde.'
        : err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());

    try {
      const response = await fetch(`${API_BASE_URL}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          correo: data['login-email'],
          password: data['login-password']
        }),
      });

      // Verificar si la respuesta es JSON
      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        const text = await response.text();
        throw new Error(text || 'Respuesta no JSON del servidor');
      }

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Credenciales incorrectas');
      }

      // Guardar token y datos de usuario
      localStorage.setItem('token', result.token);
      localStorage.setItem('user', JSON.stringify(result.user));
      
      // Obtener datos completos del usuario
      const userResponse = await fetch(`${API_BASE_URL}/user`, {
        headers: {
          'Authorization': `Bearer ${result.token}`
        }
      });

      if (!userResponse.ok) {
        throw new Error('Error al obtener datos del usuario');
      }

      const userData = await userResponse.json();
      
      setClientData({
        name: `${userData.nombres} ${userData.apellidos}`,
        email: userData.correo,
        phone: userData.telefono,
        address: userData.direccion
      });

      setShowAdditionalDataForm(true);
    } catch (err) {
      setError(err.message.includes('Unexpected token') 
        ? 'Error en el servidor. Por favor intenta más tarde.'
        : err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAdditionalDataSubmit = (e) => {
    e.preventDefault();
    const petName = e.target.elements['pet-name'].value;
    const petType = e.target.elements['pet-type'].value;

    setPetData({ 
      name: petName, 
      type: petType 
    });
    setShowDataSummary(true);
  };

  const handleAccept = () => {
    onLoginSuccess(clientData, petData);
    navigate('/detalles');
  };

  return (
    <section className="forms-section">
      <h1 className="section-title">Veterinaria Huellas Felices</h1>
      {error && <div className="error-message">{error}</div>}
      {isLoading && <div className="loading-indicator">Cargando...</div>}
      
      <div className="forms">
        {!showAdditionalDataForm ? (
          <>
            <div className={`form-wrapper ${activeForm === 'login' ? 'is-active' : ''}`}>
              <button
                type="button"
                className="switcher switcher-login"
                onClick={() => setActiveForm('login')}
                disabled={isLoading}
              >
                INICIAR SESIÓN
                <span className="underline"></span>
              </button>
              <form className="form form-login" onSubmit={handleLogin}>
                <div className="input-block">
                  <label htmlFor="login-email">Correo Electrónico</label>
                  <input
                    id="login-email"
                    name="login-email"
                    type="email"
                    placeholder="tucorreo@ejemplo.com"
                    required
                    disabled={isLoading}
                  />
                </div>
                <div className="input-block">
                  <label htmlFor="login-password">Contraseña</label>
                  <input
                    id="login-password"
                    name="login-password"
                    type="password"
                    placeholder="••••••••"
                    required
                    disabled={isLoading}
                  />
                </div>
                <button 
                  type="submit" 
                  className="btn-login"
                  disabled={isLoading}
                >
                  {isLoading ? 'CARGANDO...' : 'INGRESAR'}
                </button>
              </form>
            </div>
            <div className={`form-wrapper ${activeForm === 'signup' ? 'is-active' : ''}`}>
              <button
                type="button"
                className="switcher switcher-signup"
                onClick={() => setActiveForm('signup')}
                disabled={isLoading}
              >
                REGISTRARSE
                <span className="underline"></span>
              </button>
              <form className="form form-signup" onSubmit={handleRegister}>
                <div className="input-block">
                  <label htmlFor="signup-name">Nombre Completo</label>
                  <input
                    id="signup-name"
                    name="signup-name"
                    type="text"
                    placeholder="Ej: Juan Pérez"
                    required
                    disabled={isLoading}
                  />
                </div>
                <div className="input-block">
                  <label htmlFor="signup-email">Correo Electrónico</label>
                  <input
                    id="signup-email"
                    name="signup-email"
                    type="email"
                    placeholder="tucorreo@ejemplo.com"
                    required
                    disabled={isLoading}
                  />
                </div>
                <div className="input-block">
                  <label htmlFor="signup-phone">Teléfono</label>
                  <input
                    id="signup-phone"
                    name="signup-phone"
                    type="tel"
                    placeholder="Ej: 3214002119"
                    disabled={isLoading}
                  />
                </div>
                <div className="input-block">
                  <label htmlFor="signup-address">Dirección</label>
                  <input
                    id="signup-address"
                    name="signup-address"
                    type="text"
                    placeholder="Tu dirección"
                    disabled={isLoading}
                  />
                </div>
                <div className="input-block">
                  <label htmlFor="signup-password">Contraseña (mínimo 6 caracteres)</label>
                  <input
                    id="signup-password"
                    name="signup-password"
                    type="password"
                    placeholder="••••••••"
                    required
                    minLength="6"
                    disabled={isLoading}
                  />
                </div>
                <div className="input-block">
                  <label htmlFor="signup-confirm">Confirmar Contraseña</label>
                  <input
                    id="signup-confirm"
                    name="signup-confirm"
                    type="password"
                    placeholder="••••••••"
                    required
                    disabled={isLoading}
                  />
                </div>
                <button 
                  type="submit" 
                  className="btn-signup"
                  disabled={isLoading}
                >
                  {isLoading ? 'REGISTRANDO...' : 'REGISTRARSE'}
                </button>
              </form>
            </div>
          </>
        ) : (
          showDataSummary ? (
            <div className="data-summary">
              <h2>Resumen de Datos</h2>
              <p><strong>Nombre del Cliente:</strong> {clientData.name}</p>
              <p><strong>Correo Electrónico:</strong> {clientData.email}</p>
              <p><strong>Teléfono:</strong> {clientData.phone || 'No especificado'}</p>
              <p><strong>Dirección:</strong> {clientData.address || 'No especificada'}</p>
              <p><strong>Nombre de la Mascota:</strong> {petData.name}</p>
              <p><strong>Tipo de Mascota:</strong> {petData.type}</p>
              <button 
                onClick={handleAccept} 
                className="btn-accept"
                disabled={isLoading}
              >
                ACEPTAR
              </button>
            </div>
          ) : (
            <form className="form form-additional" onSubmit={handleAdditionalDataSubmit}>
              <h2>Datos de tu Mascota</h2>
              <div className="input-block">
                <label htmlFor="pet-name">Nombre de la Mascota</label>
                <input
                  id="pet-name"
                  name="pet-name"
                  type="text"
                  placeholder="Nombre de la mascota"
                  required
                  disabled={isLoading}
                />
              </div>
              <div className="input-block">
                <label htmlFor="pet-type">Tipo de Mascota</label>
                <select
                  id="pet-type"
                  name="pet-type"
                  required
                  disabled={isLoading}
                >
                  <option value="">Selecciona...</option>
                  <option value="Perro">Perro</option>
                  <option value="Gato">Gato</option>
                  <option value="Ave">Ave</option>
                  <option value="Roedor">Roedor</option>
                  <option value="Reptil">Reptil</option>
                  <option value="Otro">Otro</option>
                </select>
              </div>
              <button 
                type="submit" 
                className="btn-submit"
                disabled={isLoading}
              >
                {isLoading ? 'GUARDANDO...' : 'CONTINUAR'}
              </button>
            </form>
          )
        )}
      </div>
    </section>
  );
};

export default AnimatedForms;