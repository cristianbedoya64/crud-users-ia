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
    await role.setPermissions(permissionIds);
    const updated = await role.getPermissions();
    res.json(updated);
  },

  // Quitar un permiso de un rol
  async removePermission(req, res) {
    const { roleId, permissionId } = req.params;
    const role = await Role.findByPk(roleId);
    if (!role) return res.status(404).json({ error: 'Role not found' });
    await role.removePermission(permissionId);
    const updated = await role.getPermissions();
    res.json(updated);
  }
};
