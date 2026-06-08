const connection = require('../config/db');

const registrarLog = (
    usuario,
    ip,
    evento,
    navegador
) => {

    const sql = `
        INSERT INTO logs_acceso
        (usuario, ip, evento, navegador)
        VALUES (?, ?, ?, ?)
    `;

    connection.query(
        sql,
        [usuario, ip, evento, navegador],
        (error) => {

            if (error) {
                console.log(
                    "Error al registrar log:",
                    error
                );
            }
        }
    );
};

const obtenerLogs = (req, res) => {

    const sql = `
        SELECT *
        FROM logs_acceso
        ORDER BY fecha_hora DESC
    `;

    connection.query(
        sql,
        (error, results) => {

            if (error) {

                return res.status(500).json(error);

            }

            res.json(results);

        }
    );
};

module.exports = {
    registrarLog,
    obtenerLogs
};