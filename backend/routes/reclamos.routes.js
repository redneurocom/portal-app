'use strict';
const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/reclamos.controller');

router.get('/', ctrl.listarTodos);
router.get('/usuario/:usuarioId', ctrl.listarPorUsuario);
router.post('/', ctrl.crear);
router.put('/:id', ctrl.actualizar);

module.exports = router;
