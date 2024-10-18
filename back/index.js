const express = require('express');
const sequelize = require('./config/database');
const cors = require('cors')
const { register, login } = require('./controller/auth');
const userRoutes = require('./controller/user');

const app = express();
app.use(cors());
app.use(express.json()); 

app.post('/api/register', register);

app.post('/api/login', login);

app.use('/api/user', userRoutes);

sequelize.authenticate()
    .then(() => {
        console.log('Conexión a la base de datos establecida correctamente.');
    })
    .catch((error) => {
        console.error('No se pudo conectar a la base de datos:', error);
    });

const Usuario = require('./model/user');
Usuario.sync()
    .then(() => {
        console.log('Tabla de usuarios creada correctamente.');
    })
    .catch((error) => {
        console.error('Error al crear la tabla de usuarios:', error);
    });

const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});
