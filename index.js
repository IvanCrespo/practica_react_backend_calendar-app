// Configuración basica de Express
const express = require('express');
require('dotenv').config();
const { dbConnection } = require('./database/config')

// Import CORS
const cors = require('cors');

// Crear el servidor de Express
const app = express();

// Base de datos
dbConnection();

// CORS
app.use(cors());

// Directorio public
app.use(express.static('public'));

// Lectura y parseo del Body
app.use(express.json());

// Rutas
app.use('/api/auth', require('./routes/auth'));
// TODO: CRUD Eventos
app.use('/api/events', require('./routes/events'));
app.get('*', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

// Escuchar peticiones
app.listen(process.env.PORT, () => {
    console.log(`Servidor corriendo en puerto ${process.env.PORT}`);
})