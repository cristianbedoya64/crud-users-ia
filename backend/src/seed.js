// seed.js
// Script para poblar roles y permisos básicos en la base de datos
const { sequelize, Role, Permission, User, UserRole } = require('./models');
const { Op } = require('sequelize');

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

    // Usuarios de ejemplo
    const exampleNames = [
      'Ana Torres', 'Luis Gomez', 'Maria Perez', 'Carlos Ruiz', 'Lucia Fernandez',
      'Pedro Ramirez', 'Sofia Herrera', 'Javier Diaz', 'Valentina Castro', 'Miguel Morales',
      'Camila Rojas', 'Andres Vargas', 'Paula Mendoza', 'Diego Salazar', 'Gabriela Leon',
      'Mateo Ortega', 'Isabella Silva', 'Tomas Aguirre', 'Martina Paredes', 'Emilio Cordero',
      'Sebastian Meza', 'Angela Rios', 'Fernando Acosta', 'Patricia Luna', 'Raul Serrano',
      'Natalia Prieto', 'Hector Andrade', 'Carolina Quintero', 'Julian Cano', 'Laura Gallego',
      'Ricardo Lozano', 'Daniela Duarte', 'Sergio Camacho', 'Manuela Ocampo', 'Felipe Suarez',
      'Lorena Beltran', 'Esteban Parra', 'Vanesa Molina', 'Oscar Romero', 'Luisa Arias',
      'Nicolas Pardo', 'Karina Mendez', 'Victor Alvarez', 'Elena Correa', 'Marco Hidalgo',
      'Daniel Soto', 'Monica Rangel', 'Cristian Bedoya', 'Alexis Ramos', 'Yolanda Torres'
    ];
    const exampleEmails = exampleNames.map((n, i) =>
      n.toLowerCase().replace(/ /g, '.') + (i+1) + '@demo.com'
    );
    const exampleDocs = exampleNames.map((_, i) => 'DOC' + (1000 + i));
    // Hash bcrypt válido para todos los usuarios demo (password: Demo123*)
    const examplePw = '$2b$10$EixZaYVK1fsbw1ZfbX3OXePaWxn96p36K7d.vMkaW1YB.qx6.u72.';


    // Limpiar solo usuarios de ejemplo (emails @demo.com)
    await User.destroy({ where: { email: { [Op.like]: '%@demo.com' } } });

    // Obtener roles existentes
    const allRoles = await Role.findAll();
    console.log(`Roles cargados: ${allRoles.length}`);

    let success = 0;
    for (let i = 0; i < exampleNames.length; i++) {
      try {
        const user = await User.create({
          documentId: exampleDocs[i],
          name: exampleNames[i],
          email: exampleEmails[i],
          password: examplePw,
          status: i % 3 === 0 ? 'inactive' : 'active',
          createdBy: null,
          updatedBy: null
        });
        const randomRole = allRoles[Math.floor(Math.random() * allRoles.length)];
        await UserRole.create({ userId: user.id, roleId: randomRole.id });
        success++;
        console.log(`Usuario demo insertado: ${user.name} (${user.email}) con rol ${randomRole?.name}`);
      } catch (err) {
        console.error(`Error insertando usuario demo ${exampleNames[i]}: ${err.message}`);
        if (err.stack) console.error(err.stack);
      }
    }

    const totalUsers = await User.count();
    console.log('Seeders ejecutados correctamente.');
    console.log(`Usuarios insertados en este run: ${success}`);
    console.log(`Total de usuarios en la tabla Users: ${totalUsers}`);
    // Asegurar que los logs se impriman antes de salir
    await new Promise(resolve => setTimeout(resolve, 200));
    process.exit(0);
  } catch (error) {
    console.error('Error al ejecutar seeders:', error);
    process.exit(1);
  }
}

seed();
