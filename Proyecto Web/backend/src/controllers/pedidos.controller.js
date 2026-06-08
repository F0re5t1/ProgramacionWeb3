const connection = require('../config/db');

const obtenerPedidos = (req, res) => {

    const sql = `
        SELECT *
        FROM pedidos
        ORDER BY fecha DESC
    `;

    connection.query(sql, (error, results) => {

        if (error) {
            return res.status(500).json(error);
        }

        res.json(results);
    });
};

const crearPedido = (req, res) => {

    const {
        producto,
        cantidad
    } = req.body;

    const buscarProducto = `
        SELECT *
        FROM productos
        WHERE nombre = ?
        AND estado = 1
    `;

    connection.query(
        buscarProducto,
        [producto],
        (error, productos) => {

            if (error) {
                return res.status(500).json(error);
            }

            if (productos.length === 0) {

                return res.status(404).json({
                    mensaje: "Producto no encontrado"
                });
            }

            const prod = productos[0];

            if (prod.stock < Number(cantidad)) {

                return res.status(400).json({
                    mensaje: "Stock insuficiente"
                });
            }

            const precio = prod.precio;

            const total =
                Number(precio) * Number(cantidad);

            const sqlPedido = `
                INSERT INTO pedidos
                (
                    producto,
                    cantidad,
                    precio,
                    total,
                    estado
                )
                VALUES (?, ?, ?, ?, ?)
            `;

            connection.query(
                sqlPedido,
                [
                    producto,
                    cantidad,
                    precio,
                    total,
                    "Pendiente"
                ],
                (error, result) => {

                    if (error) {
                        return res.status(500).json(error);
                    }

                    const actualizarStock = `
                        UPDATE productos
                        SET stock = stock - ?
                        WHERE id = ?
                    `;

                    connection.query(
                        actualizarStock,
                        [
                            Number(cantidad),
                            prod.id
                        ],
                        (errorStock) => {

                            if (errorStock) {
                                console.log(errorStock);
                            }
                        }
                    );

                    res.json({
                        mensaje: "Pedido registrado",
                        id: result.insertId
                    });
                }
            );
        }
    );
};

const actualizarEstado = (req, res) => {

    const { id } = req.params;

    const { estado } = req.body;

    const sql = `
        UPDATE pedidos
        SET estado = ?
        WHERE id = ?
    `;

    connection.query(
        sql,
        [estado, id],
        (error) => {

            if (error) {
                return res.status(500).json(error);
            }

            res.json({
                mensaje: "Estado actualizado"
            });
        }
    );
};

module.exports = {
    obtenerPedidos,
    crearPedido,
    actualizarEstado
};