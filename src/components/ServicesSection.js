import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import './ServicesSection.css';

const ServicesSection = ({ onServiceClick }) => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const serviceImageMap = {
    'Ayudas Diagnósticas': 'ayudas_diagnosticas.png',
    'Hospitalización': 'hospitalizacion.png',
    'Urgencias 24 Horas': 'urgencias_24_horas.png',
    'Cirugía Veterinaria': 'cirugia_veterinaria.png',
    'Medicina Preventiva': 'medicina_preventiva.png',
    'Consulta Veterinaria': 'consulta_veterinaria.png',
    'Laboratorio Clínico': 'laboratorio_clinico.png'
  };

  // Precarga de imágenes
  useEffect(() => {
    Object.values(serviceImageMap).forEach(image => {
      new Image().src = `/img/${image}`;
    });
    new Image().src = '/img/default.png';
  }, []);

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    const fetchServices = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Intenta con varios endpoints alternativos
        const endpoints = [
          'http://localhost:3000/api/servicios',
          'http://127.0.0.1:3000/api/servicios',
          '/api/servicios' // Ruta relativa para producción
        ];

        let lastError = null;
        
        for (const endpoint of endpoints) {
          try {
            const response = await fetch(endpoint, {
              signal,
              headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
              },
              credentials: 'include'
            });

            if (!response.ok) {
              throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            
            const validatedServices = data.map(service => ({
              id: service.id || 0,
              name: service.name || 'Servicio sin nombre',
              price: service.price || 0,
              image: service.image || `/img/${serviceImageMap[service.name] || 'default.png'}`,
              description: service.description || 'Descripción no disponible'
            }));
            
            setServices(validatedServices);
            return; // Salir del bucle si tiene éxito
          } catch (err) {
            lastError = err;
            console.warn(`Intento fallido con ${endpoint}:`, err);
            // Continuar con el siguiente endpoint
          }
        }

        throw lastError || new Error('Todos los endpoints fallaron');

      } catch (err) {
        if (err.name !== 'AbortError') {
          console.error('Error al cargar servicios:', err);
          setError(`Error al cargar servicios: ${err.message}`);
          
          // Datos de respaldo robustos
          setServices([
            { id: 1, name: 'Ayudas Diagnósticas', price: 30000, image: '/img/ayudas_diagnosticas.png', description: 'Servicios de diagnóstico por imágenes y laboratorio' },
            { id: 2, name: 'Hospitalización', price: 30000, image: '/img/hospitalizacion.png', description: 'Cuidado y monitoreo de mascotas hospitalizadas' },
            { id: 3, name: 'Urgencias 24 Horas', price: 30000, image: '/img/urgencias_24_horas.png', description: 'Atención de emergencias veterinarias' },
            { id: 4, name: 'Cirugía Veterinaria', price: 30000, image: '/img/cirugia_veterinaria.png', description: 'Procedimientos quirúrgicos para mascotas' },
            { id: 5, name: 'Medicina Preventiva', price: 30000, image: '/img/medicina_preventiva.png', description: 'Vacunación y prevención de enfermedades' },
            { id: 6, name: 'Consulta Veterinaria', price: 30000, image: '/img/consulta_veterinaria.png', description: 'Consulta general con veterinario' },
            { id: 7, name: 'Laboratorio Clínico', price: 30000, image: '/img/laboratorio_clinico.png', description: 'Análisis clínicos y pruebas de laboratorio' }
          ]);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchServices();

    return () => controller.abort();
  }, []);

  const handleServiceClick = (service) => {
    if (!service) return;
    
    if (onServiceClick) {
      onServiceClick(service);
    }
    
    navigate('/login', {
      state: { 
        selectedService: service,
        from: 'services' 
      }
    });
  };

  if (loading) {
    return (
      <div className="loading-services">
        <div className="spinner"></div>
        <p>Cargando servicios...</p>
      </div>
    );
  }

  return (
    <section className="veterinaria" id="servicios">
      <h2>Nuestros Servicios Veterinarios</h2>
      {error && (
        <div className="error-services">
          <p>{error}</p>
          <p>Mostrando datos de respaldo</p>
        </div>
      )}
      <div className="contenedor-servicios">
        {services.map(service => (
          <ServiceCard 
            key={service.id} 
            service={service}
            onClick={() => handleServiceClick(service)}
            imageMap={serviceImageMap}
          />
        ))}
      </div>
    </section>
  );
};

const ServiceCard = ({ service, onClick, imageMap }) => {
  const [imgSrc, setImgSrc] = useState(service.image || `/img/${imageMap[service.name] || 'default.png'}`);

  const handleImageError = () => {
    setImgSrc('/img/default.png');
  };

  return (
    <div className="servicio" onClick={onClick}>
      <div className="servicio-img-container">
        <img
          src={imgSrc}
          alt={service.name || 'Servicio veterinario'}
          loading="lazy"
          onError={handleImageError}
        />
      </div>
      <p className="servicio-nombre">{service.name || 'Servicio sin nombre'}</p>
      <p className="servicio-precio">
        Precio: {service.price != null 
          ? `$${Number(service.price).toLocaleString()}` 
          : 'Consultar'}
      </p>
      <p className="servicio-descripcion">{service.description}</p>
    </div>
  );
};

ServiceCard.propTypes = {
  service: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number,
    image: PropTypes.string,
    description: PropTypes.string
  }).isRequired,
  onClick: PropTypes.func.isRequired,
  imageMap: PropTypes.object.isRequired
};

export default ServicesSection;