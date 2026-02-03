// middleware/permission.js
// Verifica si el usuario tiene el permiso requerido
const { User, Role, Permission } = require('../models');

const permissionCache = new Map();
const DEFAULT_TTL_MS = 60_000;

module.exports = function(requiredPermission) {
  return async function(req, res, next) {
    try {
      // Permitir saltar validación solo en no producción si se define SKIP_AUTH=true
      if (process.env.NODE_ENV !== 'production' && process.env.SKIP_AUTH === 'true') return next();

      const user = req.user;
      if (!user) return res.status(401).json({ error: 'No autenticado.' });
      const ttlMs = parseInt(process.env.PERMISSION_CACHE_TTL_MS || '', 10) || DEFAULT_TTL_MS;
      const cached = permissionCache.get(user.id);
      const now = Date.now();

      let permissionsSet = null;
      if (cached && cached.expiresAt > now) {
        permissionsSet = cached.permissions;
      } else {
        // Obtener roles del usuario
        const dbUser = await User.findByPk(user.id, {
          include: [{ model: Role, include: [Permission] }]
        });
        if (!dbUser) return res.status(401).json({ error: 'Usuario no encontrado.' });

        permissionsSet = new Set();
        (dbUser.Roles || []).forEach(role => {
          (role.Permissions || []).forEach(perm => {
            if (perm?.name) permissionsSet.add(perm.name);
          });
        });

        permissionCache.set(user.id, {
          permissions: permissionsSet,
          expiresAt: now + ttlMs
        });
      }

      const hasPermission = permissionsSet.has(requiredPermission);
      if (!hasPermission) {
        return res.status(403).json({ error: 'No tienes el permiso requerido: ' + requiredPermission });
      }
      next();
    } catch (err) {
      res.status(500).json({ error: 'Error de validación de permisos.', details: err.message });
    }
  };
};
