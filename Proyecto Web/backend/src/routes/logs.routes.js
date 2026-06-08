const express = require("express");

const router = express.Router();

const verificarToken = require("../middlewares/auth.middleware");

const logsController = require("../controllers/logs.controller");

router.get(
    "/",
    verificarToken,
    logsController.obtenerLogs
);

module.exports = router;