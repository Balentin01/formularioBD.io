const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '', // pon tu contraseña si la tienes
  database: 'formulario_db'
});

connection.connect((err) => {
  if (err) throw err;
  console.log('Conectado a MySQL');
});

module.exports = connection;
