const { Sequelize } = require('sequelize');

// Conexión inicial sin base de datos específica
const sequelize  = new Sequelize('demo', 'root', 'admin', {
    host: 'localhost',
    dialect: 'mariadb',
});


module.exports = sequelize;
