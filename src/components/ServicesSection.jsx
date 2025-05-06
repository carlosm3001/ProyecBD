import React, { useState } from 'react';
import AnimatedForms from './AnimatedForms/AnimatedForms';
import './ServicesSection.css';

const ServicesSection = ({ onServiceClick }) => {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [selectedService, setSelectedService] = useState(null);

  const services = [
    { id: 1, image: '/img/diagnostico.png', name: 'Ayudas Diagnósticas' },
    { id: 2, image: '/img/hospital.png', name: 'Hospitalización' },
    { id: 3, image: '/img/urgencias.png', name: 'Urgencias 24 Horas' },
    { id: 4, image: '/img/cirugia.png', name: 'Cirugía Veterinaria' },
    { id: 5, image: '/img/preventiva.png', name: 'Medicina Preventiva' },
    { id: 6, image: '/img/consulta.png', name: 'Consulta Veterinaria' },
    { id: 7, image: '/img/laboratorio.png', name: 'Laboratorio Clínico' }
  ];

  const handleServiceClick = (service) => {
    setSelectedService(service);
    setShowLoginModal(true);
    if (onServiceClick) {
      onServiceClick(service);
    }
  };
  
  const handleLoginSuccess = () => {
    alert(`¡Bienvenido! Ahora puedes acceder a: ${selectedService.name}`);
    setShowLoginModal(false);
  };

  return (
    <section className="veterinaria" id="servicios">
      <h2>Veterinaria 24 Horas en Florencia</h2>
      <div className="contenedor-servicios">
        {services.map(service => (
          <div 
            className="servicio" 
            key={service.id}
            onClick={() => handleServiceClick(service)}
          >
            <div className="servicio-img-container">
              <img src={service.image} alt={service.name} loading="lazy" />
            </div>
            <p>{service.name}</p>
          </div>
        ))}
      </div>

      {showLoginModal && (
        <div className="login-modal-overlay">
          <div className="login-modal-content">
            <button 
              className="close-login-modal" 
              onClick={() => setShowLoginModal(false)}
            >
              ×
            </button>
            <AnimatedForms onLoginSuccess={handleLoginSuccess} />
          </div>
        </div>
      )}
    </section>
  );
};

export default ServicesSection;