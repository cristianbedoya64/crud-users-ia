// migrate.js
// Script para sincronizar modelos y crear tablas en PostgreSQL
const { sequelize } = require('./models');
const { DataTypes } = require('sequelize');

async function ensureAuditLogColumns() {
  const queryInterface = sequelize.getQueryInterface();
  const columns = await queryInterface.describeTable('AuditLogs');

  if (!columns.createdBy) {
    await queryInterface.addColumn('AuditLogs', 'createdBy', {
      type: DataTypes.INTEGER,
      allowNull: true
    });
  }

  if (!columns.updatedAt) {
    await queryInterface.addColumn('AuditLogs', 'updatedAt', {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
    });
  }
}

async function migrate() {
  try {
    const isProduction = process.env.NODE_ENV === 'production';
    const mode = process.env.MIGRATE_MODE || (isProduction ? 'migrations' : 'sync');

    if (mode === 'sync') {
      if (isProduction) {
        throw new Error('Sync no permitido en producción. Usa migraciones.');
      }
      const useAlter = process.env.MIGRATE_ALTER !== 'false';
      await sequelize.sync(useAlter ? { alter: true } : {});
      await ensureAuditLogColumns();
      console.log(`Database migrated successfully (sync${useAlter ? '/alter' : ''}).`);
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
