// rolePermissionController.js
const { Role, Permission, RolePermission } = require('../models');

module.exports = {
  // Obtener permisos de un rol
  async getRolePermissions(req, res) {
    const { roleId } = req.params;
    const role = await Role.findByPk(roleId, {
      include: Permission
    });
    if (!role) return res.status(404).json({ error: 'Role not found' });
    res.json(role.Permissions);
  },

  // Asignar permisos a un rol
  async assignPermissions(req, res) {
    const { roleId } = req.params;
    const { permissionIds } = req.body; // Array de IDs
    const role = await Role.findByPk(roleId);
    if (!role) return res.status(404).json({ error: 'Role not found' });
    const updatedBy = req.user ? req.user.id : null;
    await role.setPermissions(permissionIds);
    const { AuditLog } = require('../models');
    await AuditLog.create({
      userId: updatedBy,
      action: 'assign_permission',
      details: `Permisos asignados a rol ${roleId}: ${JSON.stringify(permissionIds)}`,
      createdBy: updatedBy
    });
    const updated = await role.getPermissions();
    res.json(updated);
  },

  // Quitar un permiso de un rol
  async removePermission(req, res) {
    const { roleId, permissionId } = req.params;
    const role = await Role.findByPk(roleId);
    if (!role) return res.status(404).json({ error: 'Role not found' });
    const updatedBy = req.user ? req.user.id : null;
    await role.removePermission(permissionId);
    const { AuditLog } = require('../models');
    await AuditLog.create({
      userId: updatedBy,
      action: 'remove_permission',
      details: `Permiso ${permissionId} removido de rol ${roleId}`,
      createdBy: updatedBy
    });
    const updated = await role.getPermissions();
    res.json(updated);
  }
};
