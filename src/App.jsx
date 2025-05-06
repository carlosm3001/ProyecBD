import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import ServicesSection from './components/ServicesSection';
import WelcomeSection from './components/WelcomeSection';
import FloatingButtons from './components/FloatingButtons';
import AnimatedForms from './components/AnimatedForms/AnimatedForms';
import ServiceDetails from './components/ServiceDetails';
import './styles.css';

const Home = () => (
  <div>
    <HeroSection />
    <WelcomeSection />
    <FloatingButtons />
  </div>
);

const About = () => <div>Página de Nosotros</div>;
const Blog = () => <div>Página de Blog</div>;
const Contact = () => <div>Página de Contáctanos</div>;

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [selectedService, setSelectedService] = useState(null);
  const [clientData, setClientData] = useState(null);
  const [petData, setPetData] = useState(null);

  const handleServiceClick = (service) => {
    setSelectedService(service);
  };

  const handleLoginSuccess = (clientData, petData) => {
    setClientData(clientData);
    setPetData(petData);
    setIsAuthenticated(true);
  };

  return (
    <Router>
      <div className="app">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/nosotros" element={<About />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/contacto" element={<Contact />} />
          <Route path="/servicios" element={
            <ServicesSection onServiceClick={handleServiceClick} />
          } />
          <Route path="/detalles" element={
            isAuthenticated ? (
              <ServiceDetails
                selectedService={selectedService}
                clientData={clientData}
                petData={petData}
              />
            ) : (
              <Navigate to="/login" />
            )
          } />
          <Route path="/login" element={<AnimatedForms onLoginSuccess={handleLoginSuccess} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
