'use strict';
const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/reservas.controller');

router.get('/', ctrl.listarTodas);
router.get('/usuario/:usuarioId', ctrl.listarPorUsuario);
router.post('/', ctrl.crear);
router.put('/:id/cancelar', ctrl.cancelar);

module.exports = router;
