const jwt = require('jsonwebtoken');

const verificarToken = (req, res, next) => {

    const authHeader = req.headers['authorization'];

    if (!authHeader) {

        return res.status(401).json({
            mensaje: 'Token requerido'
        });
    }

    const token = authHeader.split(' ')[1];

    if (!token) {

        return res.status(401).json({
            mensaje: 'Token inválido'
        });
    }

    try {

        const decoded = jwt.verify(
            token,
            'secreto_restaurante'
        );

        req.usuario = decoded;

        next();

    } catch (error) {

        return res.status(401).json({
            mensaje: 'Token no válido'
        });
    }
};

module.exports = verificarToken;