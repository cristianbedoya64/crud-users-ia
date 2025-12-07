// seed.js
// Script para poblar roles y permisos básicos en la base de datos
const { sequelize, Role, Permission } = require('./models');

async function seed() {
  try {
    await sequelize.sync();

    // Roles básicos
    const roles = [
      { name: 'admin', description: 'Administrador del sistema' },
      { name: 'user', description: 'Usuario estándar' },
      { name: 'auditor', description: 'Auditor de operaciones' }
    ];
    for (const role of roles) {
      await Role.findOrCreate({ where: { name: role.name }, defaults: role });
    }

    // Permisos básicos
    const permissions = [
      { name: 'create_user', description: 'Crear usuarios' },
      { name: 'read_user', description: 'Ver usuarios' },
      { name: 'update_user', description: 'Editar usuarios' },
      { name: 'delete_user', description: 'Eliminar usuarios' },
      { name: 'manage_roles', description: 'Gestionar roles' },
      { name: 'view_audit', description: 'Ver auditoría' }
    ];
    for (const perm of permissions) {
      await Permission.findOrCreate({ where: { name: perm.name }, defaults: perm });
    }

    console.log('Seeders ejecutados correctamente.');
    process.exit(0);
  } catch (error) {
    console.error('Error al ejecutar seeders:', error);
    process.exit(1);
  }
}

seed();
