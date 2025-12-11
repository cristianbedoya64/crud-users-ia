// middleware/audit.js
const { AuditLog } = require('../models');

// Middleware para registrar acciones en la tabla AuditLog
module.exports = function(action, getDetails) {
  return async function(req, res, next) {
    res.on('finish', async () => {
      // Solo registrar si la acción fue exitosa (2xx)
      if (res.statusCode >= 200 && res.statusCode < 300 && req.user) {
        try {
          await AuditLog.create({
            userId: req.user.id,
            action,
            details: typeof getDetails === 'function' ? getDetails(req, res) : getDetails
          });
        } catch (err) {
          // No romper el flujo por error de auditoría
          console.error('Error registrando auditoría:', err);
        }
      }
    });
    next();
  };
};
