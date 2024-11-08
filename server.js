const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const cors = require('cors'); // Importar cors

const app = express();
app.use(bodyParser.json()); // Parsear JSON

// Habilitar CORS para permitir solicitudes desde cualquier origen
app.use(cors());

// Conexión a la base de datos
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '', // Cambia la contraseña según tu configuración
  database: 'database'
});

// Verificar la conexión
connection.connect(error => {
  if (error) {
    console.error('Error al conectarse a la base de datos:', error);
  } else {
    console.log('Conectado a la base de datos');
  }
});

// Ruta para guardar el puntaje
app.post('/guardar-puntaje', (req, res) => {
  const { nickname, ranking } = req.body;

  const query = 'INSERT INTO Usuarios (Nickname, Ranking) VALUES (?, ?)';
  connection.query(query, [nickname, ranking], (error, results) => {
    if (error) {
      console.error('Error al guardar los datos:', error);
      res.status(500).send('Error al guardar los datos');
    } else {
      console.log('Puntaje registrado en la base de datos:', results);
      res.status(200).send({ message: 'Puntaje registrado con éxito' });
    }
  });
});

// Endpoint para obtener el histórico
app.get('/historico', (req, res) => {
  // Consulta SQL para obtener los 10 mejores usuarios por ranking
  const sql = 'SELECT Nickname, Ranking FROM usuarios ORDER BY Ranking DESC LIMIT 10';
  
  // Ejecutar la consulta
  connection.query(sql, (err, results) => {
      if (err) {
          console.error('Error al obtener el histórico: ', err);
          return res.status(500).send('Error al obtener el histórico');
      }
      // Enviar el resultado como JSON
      res.json(results);
  });
});

// Iniciar el servidor
app.listen(3000, () => {
  console.log('Servidor escuchando en el puerto 3000');
});
