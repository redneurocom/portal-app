'use strict';
const db = require('../db');

async function listarTodas(req, res) {
  try {
    const [rows] = await db.query(`
      SELECT r.*, u.nombre AS nombre_usuario, e.nombre AS nombre_espacio
      FROM reservas r
      JOIN usuarios u ON r.usuario_id = u.id
      JOIN espacios e ON r.espacio_id = e.id
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
    const [rows] = await db.query(`
      SELECT r.*, e.nombre AS nombre_espacio, e.es_pago
      FROM reservas r
      JOIN espacios e ON r.espacio_id = e.id
      WHERE r.usuario_id = ?
      ORDER BY r.fecha DESC
    `, [req.params.usuarioId]);
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error del servidor' });
  }
}

async function crear(req, res) {
  const { usuario_id, espacio_id, fecha, hora } = req.body;
  if (!usuario_id || !espacio_id || !fecha || !hora) {
    return res.status(400).json({ mensaje: 'Todos los campos son requeridos' });
  }
  try {
    const [existente] = await db.query(
      "SELECT id FROM reservas WHERE espacio_id = ? AND fecha = ? AND hora = ? AND estado = 'confirmada'",
      [espacio_id, fecha, hora]
    );
    if (existente.length > 0) {
      return res.status(409).json({ mensaje: 'Ya existe una reserva para ese espacio, fecha y hora' });
    }

    const [espacio] = await db.query('SELECT es_pago FROM espacios WHERE id = ?', [espacio_id]);
    const estado_pago = espacio[0].es_pago ? 'pendiente' : 'no_aplica';

    const [result] = await db.query(
      "INSERT INTO reservas (usuario_id, espacio_id, fecha, hora, estado, estado_pago) VALUES (?, ?, ?, ?, 'confirmada', ?)",
      [usuario_id, espacio_id, fecha, hora, estado_pago]
    );
    res.status(201).json({ id: result.insertId, mensaje: 'Reserva creada correctamente' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error del servidor' });
  }
}

async function cancelar(req, res) {
  try {
    await db.query("UPDATE reservas SET estado = 'cancelada' WHERE id = ?", [req.params.id]);
    res.json({ mensaje: 'Reserva cancelada correctamente' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error del servidor' });
  }
}

module.exports = { listarTodas, listarPorUsuario, crear, cancelar };
