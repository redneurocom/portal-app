'use strict';
const db = require('../db');

async function login(req, res) {
  const { correo, contrasena } = req.body;
  if (!correo || !contrasena) {
    return res.status(400).json({ mensaje: 'Correo y contrasena son requeridos' });
  }
  try {
    const [rows] = await db.query(
      'SELECT id, nombre, correo, rol FROM usuarios WHERE correo = ? AND contrasena = ?',
      [correo, contrasena]
    );
    if (rows.length === 0) {
      return res.status(401).json({ mensaje: 'Credenciales incorrectas' });
    }
    res.json(rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error del servidor' });
  }
}

module.exports = { login };
