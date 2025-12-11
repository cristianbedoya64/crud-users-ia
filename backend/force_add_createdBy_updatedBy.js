const { sequelize } = require('./src/models');

async function deleteMigrationMetaAndAddColumns() {
  try {
    // Eliminar el registro de la migración en SequelizeMeta
    await sequelize.query('DELETE FROM "SequelizeMeta" WHERE name = \'20251212-add-createdBy-updatedBy-to-users.js\';');
    // Agregar las columnas createdBy y updatedBy si no existen
    await sequelize.query('ALTER TABLE "Users" ADD COLUMN IF NOT EXISTS "createdBy" INTEGER NULL;');
    await sequelize.query('ALTER TABLE "Users" ADD COLUMN IF NOT EXISTS "updatedBy" INTEGER NULL;');
    console.log('Columnas createdBy y updatedBy agregadas correctamente a Users.');
  } catch (err) {
    console.error('Error al agregar las columnas:', err);
  } finally {
    await sequelize.close();
  }
}

deleteMigrationMetaAndAddColumns();
