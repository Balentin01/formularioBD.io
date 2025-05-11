const express = require('express');
const cors = require('cors');
const app = express();
const db = require('./db');

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// Crear
app.post('/api/usuarios', (req, res) => {
  const { nombre, email } = req.body;
  db.query('INSERT INTO usuarios (nombre, email) VALUES (?, ?)', [nombre, email], (err, result) => {
    if (err) return res.status(500).send(err);
    res.send({ id: result.insertId, nombre, email });
  });
});

// Leer
app.get('/api/usuarios', (req, res) => {
  db.query('SELECT * FROM usuarios', (err, results) => {
    if (err) return res.status(500).send(err);
    res.send(results);
  });
});

// Actualizar
app.put('/api/usuarios/:id', (req, res) => {
  const { id } = req.params;
  const { nombre, email } = req.body;
  db.query('UPDATE usuarios SET nombre = ?, email = ? WHERE id = ?', [nombre, email, id], (err) => {
    if (err) return res.status(500).send(err);
    res.send({ id, nombre, email });
  });
});

// Eliminar
app.delete('/api/usuarios/:id', (req, res) => {
  const { id } = req.params;
  db.query('DELETE FROM usuarios WHERE id = ?', [id], (err) => {
    if (err) return res.status(500).send(err);
    res.send({ id });
  });
});

app.listen(3000, '0.0.0.0', () => {
  console.log('Servidor accesible desde red local...');
});
