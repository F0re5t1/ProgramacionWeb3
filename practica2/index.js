import express from 'express';
import mysql from 'mysql2/promise';

const app = express();

app.use(express.json());

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'basededatos'
});

app.get('/', (req, res) => {
    res.send('Servidor funcionando');
});

/* ejercicio 1 */

app.post('/categorias', async (req, res) => {

    try {

        const { nombre, descripcion } = req.body;

        const [resultado] = await pool.query(
            'INSERT INTO categorias(nombre, descripcion) VALUES (?, ?)',
            [nombre, descripcion]
        );

        res.json({
            mensaje: 'Categoría registrada correctamente',
            idInsertado: resultado.insertId
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            mensaje: 'Error al registrar categoría'
        });
    }

});

/* ejercicio 2 */

app.get('/categorias', async (req, res) => {

    try {

        const [filas] = await pool.query(
            'SELECT id, nombre, descripcion FROM categorias'
        );

        res.json(filas);

    } catch (error) {

        console.log(error);

        res.status(500).json({
            mensaje: 'Error al obtener categorías'
        });
    }

});

 /* ejercicio 3 */

app.get('/categorias/:id', async (req, res) => {

    try {

        const { id } = req.params;

        const [categoria] = await pool.query(
            'SELECT id, nombre, descripcion FROM categorias WHERE id = ?',
            [id]
        );

        if (categoria.length === 0) {

            return res.status(404).json({
                mensaje: 'Categoría no encontrada'
            });
        }

        const [productos] = await pool.query(
            'SELECT id, nombre, precio FROM productosp WHERE categoria_id = ?',
            [id]
        );

        res.json({
            categoria: categoria[0],
            productos: productos
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            mensaje: 'Error al obtener categoría'
        });
    }

});

/* ejercicio 4 */

app.patch('/categorias/:id', async (req, res) => {

    try {

        const { id } = req.params;

        const { nombre, descripcion } = req.body;

        const [resultado] = await pool.query(
            'UPDATE categorias SET nombre = ?, descripcion = ? WHERE id = ?',
            [nombre, descripcion, id]
        );


        if (resultado.affectedRows === 0) {

            return res.status(404).json({
                mensaje: 'Categoría no encontrada'
            });
        }

        res.json({
            mensaje: 'Categoría actualizada correctamente'
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            mensaje: 'Error al actualizar categoría'
        });
    }

});

/* ejercicio 5 */

app.delete('/categorias/:id', async (req, res) => {

    try {

        const { id } = req.params;

        const [resultado] = await pool.query(
            'DELETE FROM categorias WHERE id = ?',
            [id]
        );

        if (resultado.affectedRows === 0) {

            return res.status(404).json({
                mensaje: 'Categoría no encontrada'
            });
        }

        res.json({
            mensaje: 'Categoría eliminada correctamente'
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            mensaje: 'Error al eliminar categoría'
        });
    }

});


const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});