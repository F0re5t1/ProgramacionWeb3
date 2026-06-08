const connection = require('../config/db');

const bcrypt = require('bcryptjs');

const jwt = require('jsonwebtoken');

const { registrarLog } = require('./logs.controller');

const registrar = async (req, res) => {

    try {

        const {
            nombre,
            email,
            password,
            rol
        } = req.body;

        const passwordHash = await bcrypt.hash(password, 10);

        const sql = `
            INSERT INTO usuarios
            (nombre, email, password, rol)
            VALUES (?, ?, ?, ?)
        `;

        connection.query(
            sql,
            [nombre, email, passwordHash, rol || 'admin'],
            (error) => {

                if (error) {
                    return res.status(500).json(error);
                }

                res.json({
                    mensaje: 'Usuario registrado'
                });
            }
        );

    } catch (error) {

        console.log(error);

        res.status(500).json({
            mensaje: 'Error en servidor'
        });
    }
};

const login = (req, res) => {

    const { email, password } = req.body;

    const sql = `
        SELECT * FROM usuarios
        WHERE email = ?
    `;

    connection.query(sql, [email], async (error, results) => {

        if (error) {
            return res.status(500).json(error);
        }

        if (results.length === 0) {

            return res.status(401).json({
                mensaje: 'Usuario no encontrado'
            });
        }

        const usuario = results[0];

        const passwordValido = await bcrypt.compare(
            password,
            usuario.password
        );

        if (!passwordValido) {

            return res.status(401).json({
                mensaje: 'Contraseña incorrecta'
            });
        }

        const token = jwt.sign(
            {
                id: usuario.id,
                email: usuario.email,
                rol: usuario.rol
            },
            'secreto_restaurante',
            {
                expiresIn: '8h'
            }
        );

        registrarLog(
            usuario.nombre,
            req.ip,
            'ingreso',
            req.headers['user-agent']
        );

        res.json({
            mensaje: 'Login exitoso',
            token,
            usuario: {
                id: usuario.id,
                nombre: usuario.nombre,
                email: usuario.email,
                rol: usuario.rol
            }
        });
    });
};

const logout = (req, res) => {

    registrarLog(
        req.usuario.email,
        req.ip,
        'salida',
        req.headers['user-agent']
    );

    res.json({
        mensaje: 'Logout exitoso'
    });
};

module.exports = {
    registrar,
    login,
    logout
};