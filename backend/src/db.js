// db.js
// Configuración de conexión a PostgreSQL usando Sequelize
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
  process.env.DB_NAME || 'uarp_ai',
  process.env.DB_USER || 'postgres',
  process.env.DB_PASS || 'NoHayMas',
  {
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 5432,
    dialect: 'postgres',
    logging: false,
  }
);

module.exports = sequelize;
