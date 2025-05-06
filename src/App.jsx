import React, { useState } from 'react';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import ServicesSection from './components/ServicesSection';
import WelcomeSection from './components/WelcomeSection';
import FloatingButtons from './components/FloatingButtons';
import AnimatedForms from './components/AnimatedForms/AnimatedForms';
import './styles.css';

function App() {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [selectedService, setSelectedService] = useState(null);

  // Función para manejar el clic en servicios
  const handleServiceClick = (service) => {
    setSelectedService(service);
    setShowLoginModal(true);
  };

  // Función para manejar login exitoso
  const handleLoginSuccess = () => {
    alert(`¡Bienvenido! Ahora puedes acceder a: ${selectedService.name}`);
    setShowLoginModal(false);
  };

  return (
    <div className="app">
      <Header />
      <HeroSection />
      <ServicesSection onServiceClick={handleServiceClick} />
      <WelcomeSection />
      <FloatingButtons />

      {/* Modal de Login */}
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
    </div>
  );
}

export default App;