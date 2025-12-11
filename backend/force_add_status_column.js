const { sequelize } = require('./src/models');

async function forceAddStatusColumn() {
  try {
    // Eliminar el tipo ENUM si existe (por intentos fallidos previos)
    await sequelize.query("DO $$ BEGIN IF EXISTS (SELECT 1 FROM pg_type WHERE typname = 'enum_Users_status') THEN DROP TYPE \"enum_Users_status\"; END IF; END $$;");
    // Agregar la columna status como VARCHAR temporalmente
    await sequelize.query("ALTER TABLE \"Users\" ADD COLUMN \"status\" VARCHAR(16) NOT NULL DEFAULT 'active';");
    console.log('Columna status agregada correctamente a Users.');
  } catch (err) {
    console.error('Error al agregar la columna status:', err);
  } finally {
    await sequelize.close();
  }
}

forceAddStatusColumn();
