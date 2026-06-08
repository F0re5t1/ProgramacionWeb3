const express = require('express');

const router = express.Router();

const verificarToken = require('../middlewares/auth.middleware');

const pedidosController = require('../controllers/pedidos.controller');

router.get(
    '/',
    verificarToken,
    pedidosController.obtenerPedidos
);

router.post(
    '/',
    verificarToken,
    pedidosController.crearPedido
);

router.put(
    "/:id/estado",
    verificarToken,
    pedidosController.actualizarEstado
);
module.exports = router;