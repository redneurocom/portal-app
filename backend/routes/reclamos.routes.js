'use strict';
const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/reclamos.controller');

// GET /api/reclamos: lista reclamos.
router.get('/', ctrl.listarTodos);
// GET /api/reclamos/usuario/:usuarioId: lista reclamos del usuario.
router.get('/usuario/:usuarioId', ctrl.listarPorUsuario);
// POST /api/reclamos: crea reclamo.
router.post('/', ctrl.crear);
// PUT /api/reclamos/:id: responde o cambia estado.
router.put('/:id', ctrl.actualizar);

module.exports = router;
