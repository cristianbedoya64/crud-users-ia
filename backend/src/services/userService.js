// userService.js
const { User, Role, AuditLog } = require('../models');
const validator = require('validator');
const bcrypt = require('bcrypt');

const userService = {
  async list({ page = 1, limit = 20, search = '', status }) {
    const offset = (parseInt(page) - 1) * parseInt(limit);
    const where = {};
    if (search) {
      where[Symbol.for('or')] = [
        { name: { [Symbol.for('like')]: `%${search}%` } },
        { email: { [Symbol.for('like')]: `%${search}%` } },
        { documentId: { [Symbol.for('like')]: `%${search}%` } }
      ];
    }
    if (status) {
      where.status = status;
    } else {
      where.status = 'active';
    }
    const { count, rows } = await User.findAndCountAll({
      where,
      include: [{ model: Role, through: { attributes: [] } }],
      offset,
      limit: parseInt(limit)
    });
    return { total: count, page: parseInt(page), limit: parseInt(limit), users: rows };
  },

  async detail(id) {
    const user = await User.findByPk(id, { include: [{ model: Role, through: { attributes: [] } }] });
    if (!user) throw new Error('Usuario no encontrado.');
    return user;
  },

  async create({ documentId, name, email, password, roles, createdBy }) {
    // Sanitización básica
    documentId = validator.trim(validator.escape(documentId || ''));
    name = validator.trim(validator.escape(name || ''));
    email = validator.trim(email || '');
    password = validator.trim(password || '');
    // Validación de campos obligatorios
    if (!documentId || !name || !email || !password) {
      let missing = [];
      if (!documentId) missing.push('documento');
      if (!name) missing.push('nombre');
      if (!email) missing.push('email');
      if (!password) missing.push('contraseña');
      throw new Error(`Faltan los siguientes campos obligatorios: ${missing.join(', ')}.`);
    }
    if (!roles || !Array.isArray(roles) || roles.length === 0) {
      throw new Error('Debes seleccionar al menos un rol válido. Si no hay roles disponibles, crea uno primero.');
    }
    const nameRegex = /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s'-]+$/;
    if (!nameRegex.test(name)) {
      throw new Error('El nombre contiene caracteres inválidos.');
    }
    const emailRegex = /^[\w-.]+@[\w-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
      throw new Error('El formato del email no es válido.');
    }
    const existsEmail = await User.findOne({ where: { email } });
    if (existsEmail) throw new Error('El email ya está registrado.');
    const existsName = await User.findOne({ where: { name } });
    if (existsName) throw new Error('El nombre ya está registrado.');
    const docRegex = /^\d{6,12}$/;
    if (!docRegex.test(documentId)) {
      throw new Error('El documento debe ser solo números y tener entre 6 y 12 dígitos.');
    }
    const existsDoc = await User.findOne({ where: { documentId } });
    if (existsDoc) throw new Error('El documento ya está registrado.');
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{8,}$/;
    if (!passwordRegex.test(password)) {
      throw new Error('La contraseña debe tener al menos 8 caracteres, una minúscula, una mayúscula, un número y un símbolo.');
    }
    const existsPassword = await User.findOne({ where: { password } });
    if (existsPassword) throw new Error('La contraseña ya está en uso. Elija una diferente.');
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const createdUser = await User.create({ documentId, name, email, password: hashedPassword, createdBy });
    const user = await User.findByPk(createdUser.id);
    if (roles && Array.isArray(roles) && roles.length > 0) {
      const foundRoles = await Role.findAll({ where: { id: roles } });
      await user.addRoles(foundRoles);
    }
    await AuditLog.create({
      userId: user.id,
      action: 'create_user',
      details: `Usuario creado: ${user.name} (${user.email})`
    });
    const userWithRoles = await User.findByPk(user.id, { include: [{ model: Role, through: { attributes: [] } }] });
    return { message: 'Usuario creado exitosamente.', user: userWithRoles };
  },

  // ...otros métodos complejos (update, delete, etc.)
};

module.exports = userService;
