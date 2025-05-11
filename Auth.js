// config/auth.js
const jwt = require('jsonwebtoken');
require('dotenv').config();

const generarToken = (usuario) => {
  return jwt.sign(
    { 
      id: usuario.id, 
      nombre: usuario.nombre,
      rol: usuario.rol 
    }, 
    process.env.JWT_SECRET, 
    { expiresIn: '1h' }
  );
};

const verificarToken = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1];
  
  if (!token) {
    return res.status(403).json({ error: 'Token requerido' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ error: 'Token inválido o expirado' });
    }
    req.usuario = decoded;
    next();
  });
};

module.exports = { generarToken, verificarToken };