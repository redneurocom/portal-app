'use strict';
const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/reservas.controller');

// GET /api/reservas: lista reservas.
router.get('/', ctrl.listarTodas);
// GET /api/reservas/usuario/:usuarioId: lista reservas del usuario.
router.get('/usuario/:usuarioId', ctrl.listarPorUsuario);
// POST /api/reservas: crea reserva.
router.post('/', ctrl.crear);
// PUT /api/reservas/:id/cancelar: cancela reserva.
router.put('/:id/cancelar', ctrl.cancelar);

module.exports = router;
