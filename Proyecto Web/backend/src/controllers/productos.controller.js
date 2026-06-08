const connection = require('../config/db');

const obtenerProductosActivos = (req, res) => {

    const sql = `
        SELECT *
        FROM productos
        WHERE estado = 1
        ORDER BY nombre
    `;

    connection.query(sql, (error, results) => {

        if (error) {
            return res.status(500).json(error);
        }

        res.json(results);
    });
};

const obtenerProductos = (req, res) => {

    const sql = `
        SELECT *
        FROM productos
        WHERE estado = 1
        ORDER BY id DESC
    `;

    connection.query(sql, (error, results) => {

        if (error) {
            return res.status(500).json(error);
        }

        res.json(results);
    });
};

const crearProducto = (req, res) => {

    const {
        nombre,
        descripcion,
        precio,
        stock,
        categoria,
        imagen
    } = req.body;

    const sql = `
        INSERT INTO productos
        (nombre, descripcion, precio, stock, categoria, imagen)
        VALUES (?, ?, ?, ?, ?, ?)
    `;

    connection.query(
        sql,
        [nombre, descripcion, precio, stock, categoria, imagen],
        (error, result) => {

            if (error) {
                return res.status(500).json(error);
            }

            res.json({
                mensaje: 'Producto creado',
                id: result.insertId
            });
        }
    );
};

const actualizarProducto = (req, res) => {

    const { id } = req.params;

    const {
        nombre,
        descripcion,
        precio,
        stock,
        categoria,
        imagen
    } = req.body;

    const sql = `
        UPDATE productos
        SET nombre=?, descripcion=?, precio=?, stock=?, categoria=?, imagen=?
        WHERE id=?
    `;

    connection.query(
        sql,
        [nombre, descripcion, precio, stock, categoria, imagen, id],
        (error) => {

            if (error) {
                return res.status(500).json(error);
            }

            res.json({
                mensaje: 'Producto actualizado'
            });
        }
    );
};

const eliminarProducto = (req, res) => {

    const { id } = req.params;

const sql = `
    UPDATE productos
    SET estado = 0
    WHERE id = ?
`;

    connection.query(sql, [id], (error) => {

        if (error) {
            return res.status(500).json(error);
        }

        res.json({
            mensaje: 'Producto eliminado'
        });
    });
};

module.exports = {
    obtenerProductos,
    obtenerProductosActivos,
    crearProducto,
    actualizarProducto,
    eliminarProducto
};