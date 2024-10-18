// models/usuario.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const bcrypt = require('bcrypt');

// Definición del modelo Usuario
const Usuario = sequelize.define('Usuario', {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true, // Asegura que el correo sea único
        validate: {
            isEmail: true, // Valida que el formato sea de correo
        },
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {
    hooks: {
        beforeCreate: async (usuario) => {
            if (usuario.password) {
                const salt = await bcrypt.genSalt(10);
                usuario.password = await bcrypt.hash(usuario.password, salt);
            }
        },
    },
    tableName: 'usuarios',
});

// Sincroniza el modelo con la base de datos (crea la tabla si no existe)
Usuario.sync()
    .then(() => {
        console.log('Tabla de usuarios creada correctamente.');
    })
    .catch((error) => {
        console.error('Error al crear la tabla de usuarios:', error);
    });

module.exports = Usuario;
