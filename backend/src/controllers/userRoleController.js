// userRoleController.js
const { User, Role } = require('../models');

module.exports = {
  // Obtener roles de un usuario
  async getUserRoles(req, res) {
    const { userId } = req.params;
    const user = await User.findByPk(userId, { include: Role });
    if (!user) return res.status(404).json({ error: 'Usuario no encontrado' });
    res.json(user.Roles);
  },

  // Asignar roles a un usuario
  async assignRoles(req, res) {
    const { userId } = req.params;
    const { roleIds } = req.body; // Array de IDs
    const user = await User.findByPk(userId);
    if (!user) return res.status(404).json({ error: 'Usuario no encontrado' });
    const updatedBy = req.user ? req.user.id : null;
    await user.setRoles(roleIds);
    const { AuditLog } = require('../models');
    await AuditLog.create({
      userId: updatedBy,
      action: 'assign_role',
      details: `Roles asignados a usuario ${userId}: ${JSON.stringify(roleIds)}`,
      createdBy: updatedBy
    });
    // Opcional: registrar en tabla intermedia si se requiere
    const updated = await user.getRoles();
    res.json(updated);
  },

  // Quitar un rol de un usuario
  async removeRole(req, res) {
    const { userId, roleId } = req.params;
    const user = await User.findByPk(userId);
    if (!user) return res.status(404).json({ error: 'Usuario no encontrado' });
    const updatedBy = req.user ? req.user.id : null;
    await user.removeRole(roleId);
    const { AuditLog } = require('../models');
    await AuditLog.create({
      userId: updatedBy,
      action: 'remove_role',
      details: `Rol ${roleId} removido de usuario ${userId}`,
      createdBy: updatedBy
    });
    const updated = await user.getRoles();
    res.json(updated);
  }
};
