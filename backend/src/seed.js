// seed.js
// Script para poblar roles y permisos básicos en la base de datos
const { sequelize, Role, Permission, User, UserRole, RefreshToken } = require('./models');
const { Op } = require('sequelize');

async function seed() {
  try {
    await sequelize.sync();

    const RESET_DEMO = process.env.SEED_RESET_DEMO === 'true';

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
      { name: 'manage_roles', description: 'Gestionar roles y permisos' },
      { name: 'view_audit', description: 'Ver auditoría' }
    ];
    for (const perm of permissions) {
      await Permission.findOrCreate({ where: { name: perm.name }, defaults: perm });
    }

    // Asignar permisos a roles (matriz básica)
    const allPermissions = await Permission.findAll();
    const permMap = Object.fromEntries(allPermissions.map(p => [p.name, p]));
    const adminRole = await Role.findOne({ where: { name: 'admin' } });
    const userRole = await Role.findOne({ where: { name: 'user' } });
    const auditorRole = await Role.findOne({ where: { name: 'auditor' } });

    if (adminRole) {
      await adminRole.setPermissions(allPermissions);
    }
    if (userRole) {
      const userPerms = ['read_user'].map(name => permMap[name]).filter(Boolean);
      await userRole.setPermissions(userPerms);
    }
    if (auditorRole) {
      const auditorPerms = ['read_user', 'view_audit'].map(name => permMap[name]).filter(Boolean);
      await auditorRole.setPermissions(auditorPerms);
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
    // Hash bcrypt para "password"
    const examplePw = '$2b$10$dRqs3pNn02DXa7kRA9faXOs/xDonwVPcHDvXjhc0x6fWkQpBR9RxK';

    // Opcional: resetear usuarios demo para repoblar en entornos de prueba
    if (RESET_DEMO) {
      const demoUsers = await User.findAll({
        where: {
          [Op.and]: [
            { email: { [Op.like]: '%@demo.com' } },
            { email: { [Op.ne]: 'admin@demo.com' } }
          ]
        },
        attributes: ['id']
      });
      const demoUserIds = demoUsers.map(u => u.id);
      if (demoUserIds.length > 0) {
        await RefreshToken.destroy({ where: { userId: { [Op.in]: demoUserIds } } });
        await UserRole.destroy({ where: { userId: { [Op.in]: demoUserIds } } });
        await User.destroy({ where: { id: { [Op.in]: demoUserIds } } });
      }
    }

    // Crear usuario admin fijo para acceso inicial (password = "password")
    const [adminUser] = await User.findOrCreate({
      where: { email: 'admin@demo.com' },
      defaults: {
        documentId: '00000001',
        name: 'Admin Demo',
        email: 'admin@demo.com',
        password: examplePw,
        status: 'active'
      }
    });
    if (adminRole) {
      await UserRole.findOrCreate({ where: { userId: adminUser.id, roleId: adminRole.id } });
    }

    // Crear usuario usuariodemo fijo (password = "password")
    const [usuariodemoUser] = await User.findOrCreate({
      where: { email: 'usuariodemo@demo.com' },
      defaults: {
        documentId: '00000002',
        name: 'Usuario Demo',
        email: 'usuariodemo@demo.com',
        password: examplePw,
        status: 'active'
      }
    });
    if (adminRole) {
      await UserRole.findOrCreate({ where: { userId: usuariodemoUser.id, roleId: adminRole.id } });
    }

    // Obtener roles existentes
    const allRoles = await Role.findAll();
    console.log(`Roles cargados: ${allRoles.length}`);

    let success = 0;
    for (let i = 0; i < exampleNames.length; i++) {
      try {
        const [user, created] = await User.findOrCreate({
          where: { email: exampleEmails[i] },
          defaults: {
            documentId: exampleDocs[i],
            name: exampleNames[i],
            email: exampleEmails[i],
            password: examplePw,
            status: i % 3 === 0 ? 'inactive' : 'active',
            createdBy: null,
            updatedBy: null
          }
        });
        if (created) {
          const randomRole = allRoles[Math.floor(Math.random() * allRoles.length)];
          if (randomRole) {
            await UserRole.findOrCreate({ where: { userId: user.id, roleId: randomRole.id } });
          }
          success++;
          console.log(`Usuario demo insertado: ${user.name} (${user.email}) con rol ${randomRole?.name}`);
        }
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
