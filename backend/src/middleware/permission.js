// middleware/permission.js
// Verifica si el usuario tiene el permiso requerido
const { User, Role, Permission } = require('../models');

module.exports = function(requiredPermission) {
  return async function(req, res, next) {
    try {
      const user = req.user;
      if (!user) return res.status(401).json({ error: 'No autenticado.' });
      // Obtener roles del usuario
      const dbUser = await User.findByPk(user.id, {
        include: [{ model: Role, include: [Permission] }]
      });
      if (!dbUser) return res.status(401).json({ error: 'Usuario no encontrado.' });
      // Buscar si alguno de los roles tiene el permiso
      const hasPermission = dbUser.Roles.some(role =>
        role.Permissions.some(perm => perm.name === requiredPermission)
      );
      if (!hasPermission) {
        return res.status(403).json({ error: 'No tienes el permiso requerido: ' + requiredPermission });
      }
      next();
    } catch (err) {
      res.status(500).json({ error: 'Error de validación de permisos.', details: err.message });
    }
  };
};
