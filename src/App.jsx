// src/App.jsx
import React from 'react';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import ServicesSection from './components/ServicesSection';
import WelcomeSection from './components/WelcomeSection';
import FloatingButtons from './components/FloatingButtons';
import './styles.css';

function App() {
  return (
    <div className="app">
      <Header />
      <HeroSection />
      <ServicesSection />
      <WelcomeSection />
      <FloatingButtons />
    </div>
  );
}

export default App;