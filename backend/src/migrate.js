// migrate.js
// Script para sincronizar modelos y crear tablas en PostgreSQL
const { sequelize } = require('./models');

async function migrate() {
  try {
    const isProduction = process.env.NODE_ENV === 'production';
    const mode = process.env.MIGRATE_MODE || (isProduction ? 'migrations' : 'sync');

    if (mode === 'sync') {
      if (isProduction) {
        throw new Error('Sync no permitido en producción. Usa migraciones.');
      }
      await sequelize.sync({ alter: true });
      console.log('Database migrated successfully (sync/alter).');
      return;
    }

    console.log('Migration mode set to "migrations". Ejecuta migraciones desde backend/migrations con sequelize-cli.');
  } catch (err) {
    console.error('Migration error:', err);
  } finally {
    await sequelize.close();
  }
}

migrate();
