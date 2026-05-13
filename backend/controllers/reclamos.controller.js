'use strict';
const db = require('../db');

async function listarTodos(req, res) {
  try {
    const [rows] = await db.query(`
      SELECT r.*, u.nombre AS nombre_usuario
      FROM reclamos r
      JOIN usuarios u ON r.usuario_id = u.id
      ORDER BY r.fecha_creacion DESC
    `);
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error del servidor' });
  }
}

async function listarPorUsuario(req, res) {
  try {
    const [rows] = await db.query(
      'SELECT * FROM reclamos WHERE usuario_id = ? ORDER BY fecha_creacion DESC',
      [req.params.usuarioId]
    );
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error del servidor' });
  }
}

async function crear(req, res) {
  const { usuario_id, categoria, descripcion } = req.body;
  if (!usuario_id || !categoria || !descripcion) {
    return res.status(400).json({ mensaje: 'Todos los campos son requeridos' });
  }
  try {
    const [result] = await db.query(
      "INSERT INTO reclamos (usuario_id, categoria, descripcion) VALUES (?, ?, ?)",
      [usuario_id, categoria, descripcion]
    );
    res.status(201).json({ id: result.insertId, mensaje: 'Reclamo registrado correctamente' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error del servidor' });
  }
}

async function actualizar(req, res) {
  const { estado, respuesta } = req.body;
  try {
    await db.query(
      'UPDATE reclamos SET estado = ?, respuesta = ? WHERE id = ?',
      [estado, respuesta || null, req.params.id]
    );
    res.json({ mensaje: 'Reclamo actualizado correctamente' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error del servidor' });
  }
}

module.exports = { listarTodos, listarPorUsuario, crear, actualizar };
