'use strict';
const db = require('../db');

// Lista los avisos activos para mostrarlos en el portal.
async function listar(req, res) {
  try {
    const [rows] = await db.query(
      "SELECT * FROM avisos WHERE estado = 'activo' ORDER BY fecha DESC"
    );
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error del servidor' });
  }
}

// Registra un nuevo aviso creado por el administrador.
async function crear(req, res) {
  const { titulo, descripcion, fecha } = req.body;
  if (!titulo || !descripcion) {
    return res.status(400).json({ mensaje: 'Titulo y descripcion son requeridos' });
  }
  const fechaFinal = fecha || new Date().toISOString().split('T')[0];
  try {
    const [result] = await db.query(
      'INSERT INTO avisos (titulo, descripcion, fecha) VALUES (?, ?, ?)',
      [titulo, descripcion, fechaFinal]
    );
    res.status(201).json({ id: result.insertId, mensaje: 'Aviso creado correctamente' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error del servidor' });
  }
}

// Actualiza los datos de un aviso existente.
async function actualizar(req, res) {
  const { titulo, descripcion, fecha, estado } = req.body;
  try {
    await db.query(
      'UPDATE avisos SET titulo = ?, descripcion = ?, fecha = ?, estado = ? WHERE id = ?',
      [titulo, descripcion, fecha, estado || 'activo', req.params.id]
    );
    res.json({ mensaje: 'Aviso actualizado correctamente' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error del servidor' });
  }
}

// Marca un aviso como inactivo para ocultarlo.
async function eliminar(req, res) {
  try {
    await db.query("UPDATE avisos SET estado = 'inactivo' WHERE id = ?", [req.params.id]);
    res.json({ mensaje: 'Aviso eliminado correctamente' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error del servidor' });
  }
}

module.exports = { listar, crear, actualizar, eliminar };
