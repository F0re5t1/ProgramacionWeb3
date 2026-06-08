const express = require('express');

const router = express.Router();

const verificarToken = require('../middlewares/auth.middleware');

const productosController = require('../controllers/productos.controller');

router.get(
    "/activos",
    verificarToken,
    productosController.obtenerProductosActivos
);

router.get(
    '/',
    verificarToken,
    productosController.obtenerProductos
);

router.post(
    '/',
    verificarToken,
    productosController.crearProducto
);

router.put(
    '/:id',
    verificarToken,
    productosController.actualizarProducto
);

router.delete(
    '/:id',
    verificarToken,
    productosController.eliminarProducto
);

module.exports = router;