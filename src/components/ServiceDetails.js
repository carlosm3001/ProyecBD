import React from 'react';

const ServiceDetails = ({ selectedService, clientData, petData }) => {
  // Contenido específico para cada servicio
  const serviceContent = {
    'Ayudas Diagnósticas': (
      <div>
        <h3>Ayudas Diagnósticas</h3>
        <p>Aquí puedes ver los detalles sobre las ayudas diagnósticas para {petData.name}.</p>
        <p>Realizamos pruebas completas para identificar cualquier problema de salud en tu mascota.</p>
      </div>
    ),
    'Hospitalización': (
      <div>
        <h3>Hospitalización</h3>
        <p>Detalles sobre la hospitalización para {petData.name}.</p>
        <p>Ofrecemos cuidados intensivos y monitoreo constante para asegurar la recuperación de tu mascota.</p>
      </div>
    ),
    'Urgencias 24 Horas': (
      <div>
        <h3>Urgencias 24 Horas</h3>
        <p>Servicio de urgencias disponible las 24 horas para {petData.name}.</p>
        <p>Nuestro equipo está listo para atender cualquier emergencia en cualquier momento.</p>
      </div>
    ),
    'Cirugía Veterinaria': (
      <div>
        <h3>Cirugía Veterinaria</h3>
        <p>Información sobre cirugía veterinaria para {petData.name}.</p>
        <p>Realizamos procedimientos quirúrgicos con el más alto estándar de calidad.</p>
      </div>
    ),
    'Medicina Preventiva': (
      <div>
        <h3>Medicina Preventiva</h3>
        <p>Detalles sobre medicina preventiva para {petData.name}.</p>
        <p>Ofrecemos vacunaciones, chequeos regulares y consejos para mantener la salud de tu mascota.</p>
      </div>
    ),
    'Consulta Veterinaria': (
      <div>
        <h3>Consulta Veterinaria</h3>
        <p>Detalles sobre la consulta veterinaria para {petData.name}.</p>
        <p>Proporcionamos diagnósticos y tratamientos personalizados para tu mascota.</p>
      </div>
    ),
    'Laboratorio Clínico': (
      <div>
        <h3>Laboratorio Clínico</h3>
        <p>Información sobre el laboratorio clínico para {petData.name}.</p>
        <p>Realizamos análisis de sangre, orina y otros exámenes necesarios para diagnosticar a tu mascota.</p>
      </div>
    ),
  };

  return (
    <div className="service-details">
      <h2>Servicio Seleccionado: {selectedService.name}</h2>
      <div className="client-info">
        <h3>Datos del Cliente</h3>
        <p>Nombre: {clientData.name}</p>
      </div>
      <div className="pet-info">
        <h3>Datos de la Mascota</h3>
        <p>Nombre: {petData.name}</p>
        <p>Tipo: {petData.type}</p>
      </div>
      <div className="service-content">
        {serviceContent[selectedService.name]}
      </div>
    </div>
  );
};

export default ServiceDetails;
