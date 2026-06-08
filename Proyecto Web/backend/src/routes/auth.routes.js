const express = require('express');

const router = express.Router();

const authController = require('../controllers/auth.controller');

const verificarToken = require('../middlewares/auth.middleware');

router.post('/register', authController.registrar);

router.post('/login', authController.login);

router.post(
    '/logout',
    verificarToken,
    authController.logout
);

module.exports = router;