const { sequelize } = require('./src/models');

async function deleteMigrationMeta() {
  try {
    await sequelize.query('DELETE FROM "SequelizeMeta" WHERE name = \'20251212-add-status-to-users.js\';');
    console.log('Registro de migración eliminado de SequelizeMeta.');
  } catch (err) {
    console.error('Error al eliminar el registro:', err);
  } finally {
    await sequelize.close();
  }
}

deleteMigrationMeta();
