// index.js
const express = require('express');
const sequelize = require('./config/database');
const { register, login } = require('./controller/auth');
const userRoutes = require('./controller/user');

const app = express();
app.use(express.json()); // Middleware para analizar cuerpos JSON

// Ruta para el registro de usuario
app.post('/api/register', register);



// Ruta para el inicio de sesión de usuario
app.post('/api/login', login);

app.use('/api/user', userRoutes);

// Probar la conexión a la base de datos
sequelize.authenticate()
    .then(() => {
        console.log('Conexión a la base de datos establecida correctamente.');
    })
    .catch((error) => {
        console.error('No se pudo conectar a la base de datos:', error);
    });

// Sincronizar el modelo para crear la tabla si no existe
const Usuario = require('./model/user');
Usuario.sync()
    .then(() => {
        console.log('Tabla de usuarios creada correctamente.');
    })
    .catch((error) => {
        console.error('Error al crear la tabla de usuarios:', error);
    });

// Iniciar el servidor
const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});
