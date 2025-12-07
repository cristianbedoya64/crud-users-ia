// migrate.js
// Script para sincronizar modelos y crear tablas en PostgreSQL
const { sequelize } = require('./models');

async function migrate() {
  try {
    await sequelize.sync({ alter: true });
    console.log('Database migrated successfully.');
  } catch (err) {
    console.error('Migration error:', err);
  } finally {
    await sequelize.close();
  }
}

migrate();
