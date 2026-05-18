'use strict';
const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// Registra en consola cada peticion recibida.
app.use((req, res, next) => {
  res.on('finish', () => {
    console.log(`${new Date().toLocaleTimeString()} ${req.method} ${req.originalUrl} ${res.statusCode}`);
  });
  next();
});

// Rutas principales de la API REST.
app.use('/api/auth', require('./routes/auth.routes'));
app.use('/api/espacios', require('./routes/espacios.routes'));
app.use('/api/reservas', require('./routes/reservas.routes'));
app.use('/api/avisos', require('./routes/avisos.routes'));
app.use('/api/reclamos', require('./routes/reclamos.routes'));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
