import React from 'react';

const services = [
  { id: 1, image: '/img/diagnostico.png', name: 'Ayudas Diagnósticas' },
  { id: 2, image: '/img/hospital.png', name: 'Hospitalización' },
  { id: 3, image: '/img/urgencias.png', name: 'Urgencias 24 Horas' },
  { id: 4, image: '/img/cirugia.png', name: 'Cirugía Veterinaria' },
  { id: 5, image: '/img/preventiva.png', name: 'Medicina Preventiva' },
  { id: 6, image: '/img/consulta.png', name: 'Consulta Veterinaria' },
  { id: 7, image: '/img/laboratorio.png', name: 'Laboratorio Clínico' }
];

const ServicesSection = () => {
  return (
    <section className="veterinaria" id="servicios">
      <h2>Veterinaria 24 Horas en Florencia</h2>
      <div className="contenedor-servicios">
        {services.map(service => (
          <div className="servicio" key={service.id}>
            <div className="servicio-img-container">
              <img src={service.image} alt={service.name} loading="lazy" />
            </div>
            <p>{service.name}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ServicesSection;