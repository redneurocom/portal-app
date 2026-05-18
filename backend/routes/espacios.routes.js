'use strict';
const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/espacios.controller');

// GET /api/espacios: lista espacios.
router.get('/', ctrl.listar);
// GET /api/espacios/:id: obtiene detalle.
router.get('/:id', ctrl.obtener);
// POST /api/espacios: crea espacio.
router.post('/', ctrl.crear);
// PUT /api/espacios/:id: actualiza espacio.
router.put('/:id', ctrl.actualizar);
// DELETE /api/espacios/:id: oculta espacio.
router.delete('/:id', ctrl.eliminar);

module.exports = router;
