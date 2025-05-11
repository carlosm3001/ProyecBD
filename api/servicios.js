const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Servir archivos estáticos desde /public/img
app.use('/img', express.static('public/img'));

// Lista de servicios con imagen y precio
const servicios = [
  {
    id: 1,
    name: 'Ayudas Diagnósticas',
    price: 30000,
    image: '/img/ayudas_diagnosticas.png'
  },
  {
    id: 2,
    name: 'Hospitalización',
    price: 30000,
    image: '/img/hospitalizacion.png'
  },
  {
    id: 3,
    name: 'Urgencias 24 Horas',
    price: 30000,
    image: '/img/urgencias_24_horas.png'
  },
  {
    id: 4,
    name: 'Cirugía Veterinaria',
    price: 30000,
    image: '/img/cirugia_veterinaria.png'
  },
  {
    id: 5,
    name: 'Medicina Preventiva',
    price: 30000,
    image: '/img/medicina_preventiva.png'
  },
  {
    id: 6,
    name: 'Consulta Veterinaria',
    price: 30000,
    image: '/img/consulta_veterinaria.png'
  },
  {
    id: 7,
    name: 'Laboratorio Clínico',
    price: 30000,
    image: '/img/laboratorio_clinico.png'
  }
];

// Ruta para obtener los servicios
app.get('/api/servicios', (req, res) => {
  res.json(servicios);
});

// Iniciar servidor
app.listen(port, () => {
  console.log(`Servidor Express escuchando en http://localhost:${port}`);
});
