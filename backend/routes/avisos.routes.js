'use strict';
const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/avisos.controller');

// GET /api/avisos: lista avisos activos.
router.get('/', ctrl.listar);
// POST /api/avisos: crea aviso.
router.post('/', ctrl.crear);
// PUT /api/avisos/:id: actualiza aviso.
router.put('/:id', ctrl.actualizar);
// DELETE /api/avisos/:id: oculta aviso.
router.delete('/:id', ctrl.eliminar);

module.exports = router;
