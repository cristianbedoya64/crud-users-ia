// middleware/logFailedAccess.js
const { AuditLog } = require('../models');

module.exports = async function logFailedAccess(req, res, next) {
  // Solo registrar si la respuesta es 401 o 403
  res.on('finish', async () => {
    if ([401, 403].includes(res.statusCode)) {
      try {
        await AuditLog.create({
          userId: req.user ? req.user.id : null,
          action: 'failed_access',
          details: `Intento fallido: ${req.method} ${req.originalUrl} - IP: ${req.ip}`,
          createdBy: req.user ? req.user.id : null
        });
      } catch (err) {
        // No romper el flujo por error de auditoría
        console.error('Error registrando intento fallido:', err);
      }
    }
  });
  next();
};
