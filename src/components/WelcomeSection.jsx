import React from 'react';

const WelcomeSection = () => {
  return (
    <section className="bienvenida">
      <div className="bienvenida-container">
        <h1>¡Bienvenidos a Veterinaria Huellas Felices, Clínica Veterinaria 24 Horas en Florencia!</h1>
        
        <div className="bienvenida-content">
          <p>Entendemos que las emergencias no tienen horario. Nuestra clínica veterinaria está abierta las 24 horas, los 7 días de la semana.</p>
          <p>Contamos con un equipo de auxiliares y profesionales altamente capacitados y es justamente eso lo que distingue a nuestra clínica.</p>
          <p className="destacado">Creemos que cada mascota es única y merece una atención personalizada.</p>
          <button className="btn-info">Quiero más información</button>
        </div>
      </div>
    </section>
  );
};

export default WelcomeSection;