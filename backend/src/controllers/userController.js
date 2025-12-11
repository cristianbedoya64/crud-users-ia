// userController.js
const { User, Role, UserRole, AuditLog } = require('../models');
const { Op } = require('sequelize');

module.exports = {
  async list(req, res) {
    try {
      const { page = 1, limit = 20, search = '', status } = req.query;
      const offset = (parseInt(page) - 1) * parseInt(limit);
      const where = {};
      if (search) {
        where[Op.or] = [
          { name: { [Op.like]: `%${search}%` } },
          { email: { [Op.like]: `%${search}%` } },
          { documentId: { [Op.like]: `%${search}%` } }
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
      res.json({
        total: count,
        page: parseInt(page),
        limit: parseInt(limit),
        users: rows
      });
    } catch (err) {
      res.status(500).json({ error: 'Error al listar usuarios.', details: err.message });
    }
  },
  async detail(req, res) {
    try {
      const { id } = req.params;
      const user = await User.findByPk(id, { include: [{ model: Role, through: { attributes: [] } }] });
      if (!user) {
        return res.status(404).json({ error: 'Usuario no encontrado.' });
      }
      res.json(user);
    } catch (err) {
      res.status(500).json({ error: 'Error al obtener detalle de usuario.', details: err.message });
    }
  },
  async create(req, res) {
    try {
      const validator = require('validator');
      let { documentId, name, email, password, roles } = req.body;
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
        return res.status(400).json({ error: `Faltan los siguientes campos obligatorios: ${missing.join(', ')}.` });
      }
      if (!roles || !Array.isArray(roles) || roles.length === 0) {
        return res.status(400).json({ error: 'Debes seleccionar al menos un rol válido. Si no hay roles disponibles, crea uno primero.' });
      }
      // Validación de nombre (no vacío, sin caracteres inválidos)
      const nameRegex = /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s'-]+$/;
      if (!nameRegex.test(name)) {
        return res.status(400).json({ error: 'El nombre contiene caracteres inválidos.' });
      }
      // Validación de email (formato)
      const emailRegex = /^[\w-.]+@[\w-]+\.[a-zA-Z]{2,}$/;
      if (!emailRegex.test(email)) {
        return res.status(400).json({ error: 'El formato del email no es válido.' });
      }
      // Validación de email único
      const existsEmail = await User.findOne({ where: { email } });
      if (existsEmail) {
        return res.status(409).json({ error: 'El email ya está registrado.' });
      }
      // Validación de nombre único
      const existsName = await User.findOne({ where: { name } });
      if (existsName) {
        return res.status(409).json({ error: 'El nombre ya está registrado.' });
      }
      // Validación de formato de documento (solo números, 6-12 dígitos)
      const docRegex = /^\d{6,12}$/;
      if (!docRegex.test(documentId)) {
        return res.status(400).json({ error: 'El documento debe ser solo números y tener entre 6 y 12 dígitos.' });
      }
      // Validación de documento único
      const existsDoc = await User.findOne({ where: { documentId } });
      if (existsDoc) {
        return res.status(409).json({ error: 'El documento ya está registrado.' });
      }
      // Validación de contraseña segura y no duplicada
      // Debe tener al menos una minúscula, una mayúscula, un número y un símbolo
      const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{8,}$/;
      if (!passwordRegex.test(password)) {
        return res.status(400).json({ error: 'La contraseña debe tener al menos 8 caracteres, una minúscula, una mayúscula, un número y un símbolo.' });
      }
      console.log('--- CREAR USUARIO ---');
      console.log('Datos recibidos:', { documentId, name, email, password, roles });
      const existsPassword = await User.findOne({ where: { password } });
      if (existsPassword) {
        return res.status(409).json({ error: 'La contraseña ya está en uso. Elija una diferente.' });
      }
      const bcrypt = require('bcrypt');
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(password, saltRounds);
      const createdBy = req.user ? req.user.id : null;
      const createdUser = await User.create({ documentId, name, email, password: hashedPassword, createdBy });
      // Recuperar instancia con métodos de asociación
      const user = await User.findByPk(createdUser.id);
      // Asignar roles si se envían
      if (roles && Array.isArray(roles) && roles.length > 0) {
        const foundRoles = await Role.findAll({ where: { id: roles } });
        console.log('Intentando asociar roles al usuario:', { userId: user.id, roleIds: foundRoles.map(r => r.id) });
        try {
          await user.addRoles(foundRoles);
          const userRoles = await user.getRoles();
          console.log('Roles asociados al usuario (addRoles):', userRoles.map(r => r.id));
        } catch (err) {
          console.error('Error al asociar roles con addRoles:', err);
        }
      }
      // Registrar evento de auditoría
      await AuditLog.create({
        userId: user.id,
        action: 'create_user',
        details: `Usuario creado: ${user.name} (${user.email})`
      });
      // Devolver usuario con roles
      const userWithRoles = await User.findByPk(user.id, { include: [{ model: Role, through: { attributes: [] } }] });
      res.status(201).json({ message: 'Usuario creado exitosamente.', user: userWithRoles });
    } catch (err) {
      const isProduction = process.env.NODE_ENV === 'production';
      res.status(500).json({
        error: 'Error al crear usuario.',
        ...(isProduction ? {} : { details: err.message })
      });
    }
  },
  async update(req, res) {
    try {
      const { id } = req.params;
      const { documentId, name, email, password, roles } = req.body;
      if (!documentId || !name || !email) {
        return res.status(400).json({ error: 'Documento, nombre y email son obligatorios.' });
      }
      // Validación de nombre (no vacío, sin caracteres inválidos)
      const nameRegex = /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s'-]+$/;
      if (!nameRegex.test(name)) {
        return res.status(400).json({ error: 'El nombre contiene caracteres inválidos.' });
      }
      // Validación de email (formato)
      const emailRegex = /^[\w-.]+@[\w-]+\.[a-zA-Z]{2,}$/;
      if (!emailRegex.test(email)) {
        return res.status(400).json({ error: 'El formato del email no es válido.' });
      }
      // Validación de email único (si cambia el email)
      const userToUpdate = await User.findByPk(id);
      if (!userToUpdate) {
        return res.status(404).json({ error: 'Usuario no encontrado.' });
      }
      if (userToUpdate.email !== email) {
        const exists = await User.findOne({ where: { email } });
        if (exists) {
          return res.status(409).json({ error: 'El email ya está registrado.' });
        }
      }
      // Validación de formato de documento (solo números, 6-12 dígitos)
      const docRegex = /^\d{6,12}$/;
      if (!docRegex.test(documentId)) {
        return res.status(400).json({ error: 'El documento debe ser solo números y tener entre 6 y 12 dígitos.' });
      }
      // Validación de documento único (si cambia el documento)
      if (userToUpdate.documentId !== documentId) {
        const existsDoc = await User.findOne({ where: { documentId } });
        if (existsDoc) {
          return res.status(409).json({ error: 'El documento ya está registrado.' });
        }
      }
      // Validación de contraseña segura (si se envía y no está vacía)
      const updateData = { documentId, name, email };
      if (password && password.trim() !== '') {
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{8,}$/;
        if (!passwordRegex.test(password)) {
          return res.status(400).json({ error: 'La contraseña debe tener al menos 8 caracteres, una minúscula, una mayúscula, un número y un símbolo.' });
        }
        const bcrypt = require('bcrypt');
        const saltRounds = 10;
        updateData.password = await bcrypt.hash(password, saltRounds);
      }
      updateData.updatedBy = req.user ? req.user.id : null;
      await User.update(updateData, { where: { id } });
      const user = await User.findByPk(id);
      // Actualizar roles si se envían
      if (roles && Array.isArray(roles)) {
        const foundRoles = await Role.findAll({ where: { id: roles } });
        await user.setRoles(foundRoles);
      }
      // Registrar evento de auditoría
      await AuditLog.create({
        userId: user.id,
        action: 'update_user',
        details: `Usuario actualizado: ${user.name} (${user.email})`
      });
      // Devolver usuario con roles
      const userWithRoles = await User.findByPk(user.id, { include: [{ model: Role, through: { attributes: [] } }] });
      res.json({ message: 'Usuario actualizado exitosamente.', user: userWithRoles });
    } catch (err) {
      res.status(500).json({ error: 'Error al actualizar usuario.', details: err.message });
    }
  },
  async restore(req, res) {
    const { id } = req.params;
    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({ error: 'Usuario no encontrado.' });
    }
    await User.update({ status: 'active' }, { where: { id } });
    await AuditLog.create({
      userId: user.id,
      action: 'restore_user',
      details: `Usuario restaurado: ${user.name} (${user.email})`,
      createdBy: req.user ? req.user.id : null
    });
    res.status(200).json({ message: 'Usuario restaurado correctamente.' });
  },
    // Soft delete user
    deleteUser: async (req, res) => {
      try {
        const { id } = req.params;
        const user = await User.findByPk(id);
        if (!user) {
          return res.status(404).json({ error: 'Usuario no encontrado.' });
        }
        await User.update({ status: 'inactive' }, { where: { id } });
        await AuditLog.create({
          userId: user.id,
          action: 'delete_user',
          details: `Usuario desactivado (soft delete): ${user.name} (${user.email})`
        });
        res.status(200).json({ message: 'Usuario desactivado correctamente.' });
      } catch (error) {
        res.status(500).json({ error: 'Error al desactivar el usuario.' });
      }
    }
  };
