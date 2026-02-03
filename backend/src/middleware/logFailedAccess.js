// middleware/logFailedAccess.js
const { AuditLog } = require('../models');

module.exports = async function logFailedAccess(req, res, next) {
  // Solo registrar si la respuesta es 401 o 403
  res.on('finish', async () => {
    if ([401, 403].includes(res.statusCode)) {
      try {
        const userId = req.user ? req.user.id : 0;
        await AuditLog.create({
          userId,
          action: 'failed_access',
          details: `Intento fallido: ${req.method} ${req.originalUrl} - IP: ${req.ip} - userId: ${userId}`,
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
