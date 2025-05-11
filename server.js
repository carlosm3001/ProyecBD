require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mysql = require('mysql2/promise');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const app = express();
const port = process.env.PORT || 3000;

// Configuración de middlewares
app.use(cors({
  origin: 'http://localhost:3002',
  credentials: true
}));
app.use(express.json());

// Conexión a la base de datos
const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || 'admin',
  database: process.env.DB_NAME || 'veterinaria',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Configuración de JWT
const JWT_SECRET = process.env.JWT_SECRET || 'tu_clave_secreta_fuerte';

// Ruta para obtener servicios - CORREGIDA
app.get('/api/servicios', async (req, res) => {
  try {
    const [servicios] = await pool.query(
      'SELECT * FROM servicio WHERE estado = "activo"'
    );
    
    const serviciosConImagenes = servicios.map(servicio => ({
      id: servicio.id_servicio,
      name: servicio.nombre_servicio,
      price: servicio.costo,
      image: `/img/${servicio.nombre_servicio.toLowerCase().replace(/\s+/g, '_')}.png`
    }));

    res.json(serviciosConImagenes);
  } catch (error) {
    console.error('Error al obtener servicios:', error);
    res.status(500).json({ error: 'Error al obtener servicios' });
  }
});

// Otras rutas básicas
app.get('/api/test', (req, res) => {
  res.json({ message: 'API funcionando', status: 'OK' });
});

// Manejo de errores
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Algo salió mal!');
});

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});