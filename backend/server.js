
// Importamos librerias 
const express = require('express');
const mysql = require('mysql2');
const  cors = require('cors');

const app = express();

// Midddlewar: CORS y lectura de JSON 
app.use(cors());
app.use(express.json());


// Conexion a MYSQL DB Local
// Prueba entorno local
const db = mysql.createConnection({
    host:'localhost', //Direccion de nuestro servidor 
    user: 'usuario1', // Usuario que creamos 
    password: 'contraseña123', // Contraseña del usuario 
    database:'dbregistros' // Nombre de nuestra base de datos 

});

// Conectar y Verficar 
db.connect(err => {
    if (err) {
        console.error('Error de conexión a MySQL:', err);
        return;
    }
    console.log('Conectado a MySQL');
});

// Ruta POST para registrar usuarios
app.post('/register', (req, res) => {
    const { nombre, correo } = req.body; // Tomamos datos enviados por React
    if (!nombre || !correo) {
        return res.status(400).send('Faltan campos: nombre y correo son requeridos');
    }
    const sql = 'INSERT INTO usuarios (nombre, correo) VALUES (?, ?)'; // Consulta preparada
    db.query(sql, [nombre, correo], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Error al registrar usuario');
        }
        res.send('Usuario registrado con éxito'); // Respuesta a React
    });
});

// Levantar servidor en puerto 5000
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Servidor corriendo en http://localhost:${PORT}`));

// Ruta GET para obtener todos los usuarios
app.get('/usuarios', (req, res) => {
    const sql = 'SELECT * FROM usuarios';
    db.query(sql, (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Error al obtener usuarios');
        }
        res.json(result); // Devolvemos JSON a React
    });
});

// Actualizar usuario (solo nombre y correo)
app.put('/api/usuario/:id', (req, res) => {
  const { id } = req.params;
  const { nombre, correo } = req.body; // 👈 correo en vez de email

  db.query(
    'UPDATE usuarios SET nombre = ?, correo = ? WHERE id = ?',
    [nombre, correo, id],
    (err, result) => {
      if (err) return res.status(500).send('Error al actualizar usuario');
      res.send('Usuario actualizado');
    }
  );
});



// Traer usuario por ID
app.get('/api/usuario/:id', (req, res) => {
  const { id } = req.params;
  db.query('SELECT * FROM usuarios WHERE id = ?', [id], (err, result) => {
    if (err) return res.status(500).send('Error al buscar usuario');
    if (result.length === 0) return res.status(404).send('Usuario no encontrado');
    res.json(result[0]);
  });
});
