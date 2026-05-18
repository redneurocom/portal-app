'use strict';
const db = require('../db');

// Valida usuario y contrasena para iniciar sesion.
async function login(req, res) {
  const correo = (req.body.correo || '').trim().toLowerCase();
  const contrasena = (req.body.contrasena || '').trim();

  if (!correo || !contrasena) {
    return res.status(400).json({ mensaje: 'Correo y contrasena son requeridos' });
  }
  try {
    const [rows] = await db.query(
      'SELECT id, nombre, correo, rol FROM usuarios WHERE correo = ? AND contrasena = ?',
      [correo, contrasena]
    );
    if (rows.length === 0) {
      console.log(`Login FAIL: ${correo}`);
      return res.status(401).json({ mensaje: 'Credenciales incorrectas' });
    }
    console.log(`Login OK: ${correo}`);
    res.json(rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error del servidor' });
  }
}

module.exports = { login };
