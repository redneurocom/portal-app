'use strict';
const db = require('../db');

// Lista los espacios activos disponibles.
async function listar(req, res) {
  try {
    const [rows] = await db.query("SELECT * FROM espacios WHERE estado = 'activo' ORDER BY nombre");
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error del servidor' });
  }
}

// Busca un espacio por su id.
async function obtener(req, res) {
  try {
    const [rows] = await db.query('SELECT * FROM espacios WHERE id = ?', [req.params.id]);
    if (rows.length === 0) {
      return res.status(404).json({ mensaje: 'Espacio no encontrado' });
    }
    res.json(rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error del servidor' });
  }
}

// Crea un nuevo espacio comun.
async function crear(req, res) {
  const { nombre, descripcion, categoria, capacidad, ubicacion, precio, es_pago, imagen } = req.body;
  if (!nombre || !categoria || !capacidad) {
    return res.status(400).json({ mensaje: 'Nombre, categoria y capacidad son requeridos' });
  }
  try {
    const [result] = await db.query(
      'INSERT INTO espacios (nombre, descripcion, categoria, capacidad, ubicacion, precio, es_pago, imagen) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
      [nombre, descripcion || '', categoria, capacidad, ubicacion || '', precio || 0, es_pago ? 1 : 0, imagen || '']
    );
    res.status(201).json({ id: result.insertId, mensaje: 'Espacio creado correctamente' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error del servidor' });
  }
}

// Actualiza los datos de un espacio.
async function actualizar(req, res) {
  const { nombre, descripcion, categoria, capacidad, ubicacion, precio, es_pago, imagen } = req.body;
  try {
    await db.query(
      'UPDATE espacios SET nombre=?, descripcion=?, categoria=?, capacidad=?, ubicacion=?, precio=?, es_pago=?, imagen=? WHERE id=?',
      [nombre, descripcion, categoria, capacidad, ubicacion, precio, es_pago ? 1 : 0, imagen, req.params.id]
    );
    res.json({ mensaje: 'Espacio actualizado correctamente' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error del servidor' });
  }
}

// Marca un espacio como inactivo.
async function eliminar(req, res) {
  try {
    await db.query("UPDATE espacios SET estado = 'inactivo' WHERE id = ?", [req.params.id]);
    res.json({ mensaje: 'Espacio eliminado correctamente' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error del servidor' });
  }
}

module.exports = { listar, obtener, crear, actualizar, eliminar };
