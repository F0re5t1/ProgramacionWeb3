const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'restaurante_db'
});

connection.connect((error) => {
    if (error) {
        console.log('Error de conexión:', error);
    } else {
        console.log('Base de datos conectada');
    }
});

module.exports = connection;